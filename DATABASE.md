# FocusForge Database Schema

## Table Relationship Diagram

```
                          ┌──────────────────────┐
                          │        users          │
                          │──────────────────────│
                          │ id (PK)               │
                          │ email                 │
                          │ password              │
                          │ level                 │
                          │ xp_earned             │
                          └──────────┬───────────┘
                                     │
            users.id is referenced by all tables below (1:many)
                                     │
     ┌──────────┬────────────┬───────┼───────┬───────────────┐
     ▼          ▼            ▼       ▼       ▼               ▼
┌─────────┐ ┌────────┐ ┌─────────┐ ┌─────┐ ┌──────────────┐
│ quests  │ │ habits │ │pomodoro │ │time │ │ user         │
│         │ │        │ │_sessions│ │block│ │ _achievements│
└─────────┘ └───┬────┘ └─────────┘ └─────┘ └──────┬───────┘
                │                                   │
                │ 1:many                            │ many:1
                ▼                                   ▼
          ┌───────────┐                     ┌──────────────┐
          │ habit     │                     │ achievements │
          │_completions│                     │ (global)     │
          └───────────┘                     └──────────────┘
```

## Detailed Table Breakdown

### users
The central table. Stores auth credentials and XP/level progression.

| Column    | Type    | Constraints        |
|-----------|---------|--------------------|
| id        | Integer | PK, auto-increment |
| email     | String  | Unique, Not Null   |
| password  | String  | Not Null           |
| level     | Integer | Default: 1         |
| xp_earned | Integer | Default: 0         |

> `xp_to_next_level` is derived as `level * 100` — not stored.

---

### quests
Daily tasks that earn XP on completion.

| Column      | Type    | Constraints                     |
|-------------|---------|---------------------------------|
| id          | Integer | PK, auto-increment              |
| user_id     | Integer | FK → users.id, Indexed, Not Null|
| title       | String  | Not Null                        |
| description | String  | Nullable                        |
| xp_reward   | Integer | Default: 10                     |
| created_at  | Date    | Default: today                  |
| completed   | Boolean | Default: false                  |
| type        | String  | Not Null ("personal" or "work") |

**Relationship:** `users 1 ──── many quests`

---

### habits
Recurring habits a user wants to track daily.

| Column     | Type    | Constraints                      |
|------------|---------|----------------------------------|
| id         | Integer | PK, auto-increment               |
| user_id    | Integer | FK → users.id, Indexed, Not Null |
| title      | String  | Not Null                         |
| created_at | Date    | Default: today                   |

**Relationship:** `users 1 ──── many habits`

---

### habit_completions
Tracks which habit was completed on which day. One entry per habit per day.

| Column       | Type    | Constraints                                |
|--------------|---------|--------------------------------------------|
| id           | Integer | PK, auto-increment                         |
| habit_id     | Integer | FK → habits.id (CASCADE), Indexed, Not Null|
| completed_at | Date    | Default: today, Not Null                   |

**Unique constraint:** `(habit_id, completed_at)` — prevents duplicate completions per day.

**Relationship:** `habits 1 ──── many habit_completions`

> **Why a separate table?** Storing completions as rows (not a boolean) lets you
> query streak history, weekly/monthly stats, and heatmaps without schema changes.

---

### pomodoro_sessions
Logs each completed focus session.

| Column       | Type    | Constraints                      |
|--------------|---------|----------------------------------|
| id           | Integer | PK, auto-increment               |
| user_id      | Integer | FK → users.id, Indexed, Not Null |
| duration     | Integer | Default: 25 (minutes)            |
| completed_at | Date    | Default: today, Not Null         |

**Relationship:** `users 1 ──── many pomodoro_sessions`

---

### time_blocks
Scheduled time blocks for a given day.

| Column     | Type    | Constraints                      |
|------------|---------|----------------------------------|
| id         | Integer | PK, auto-increment               |
| user_id    | Integer | FK → users.id, Indexed, Not Null |
| title      | String  | Not Null                         |
| start_time | Time    | Not Null                         |
| end_time   | Time    | Not Null                         |
| category   | String  | Nullable                         |
| block_date | Date    | Default: today, Not Null         |

**Relationship:** `users 1 ──── many time_blocks`

---

### achievements
Global achievements table. Rows are predefined — not per-user.

| Column          | Type    | Constraints        |
|-----------------|---------|--------------------|
| id              | Integer | PK, auto-increment |
| title           | String  | Unique, Not Null   |
| description     | String  | Nullable           |
| icon            | String  | Nullable           |
| xp_reward       | Integer | Default: 50        |
| condition_type  | String  | Not Null           |
| condition_value | Integer | Not Null           |

**condition_type examples:**
- `"quests_completed"` — unlock when user completes X quests total
- `"habits_streak"` — unlock when user hits X-day streak
- `"pomodoro_sessions"` — unlock when user completes X sessions
- `"level_reached"` — unlock when user reaches level X

---

### user_achievements
Join table linking users to achievements they've unlocked.

| Column         | Type    | Constraints                              |
|----------------|---------|------------------------------------------|
| id             | Integer | PK, auto-increment                       |
| user_id        | Integer | FK → users.id, Indexed, Not Null         |
| achievement_id | Integer | FK → achievements.id, Indexed, Not Null  |
| unlocked_at    | Date    | Default: today, Not Null                 |

**Unique constraint:** `(user_id, achievement_id)` — each achievement unlocked once.

**Relationship:** `users many ──── many achievements` (through user_achievements)

---

## Full Relationship Map

```
users (auth + XP + level)
 ├── 1:N  → quests             (daily tasks)
 ├── 1:N  → habits             (recurring habits)
 │          └── 1:N → habit_completions  (daily check-ins)
 ├── 1:N  → pomodoro_sessions  (focus sessions)
 ├── 1:N  → time_blocks        (scheduled blocks)
 └── M:N  → achievements       (via user_achievements)
```

## XP Flow

```
Quest completed    ──→  +xp_reward  ──→  users.xp_earned
Habit completed    ──→  +5 XP       ──→  users.xp_earned
Pomodoro done      ──→  +10 XP      ──→  users.xp_earned
Achievement unlock ──→  +xp_reward  ──→  users.xp_earned
                                            │
                                  xp_earned >= level * 100?
                                            │
                                      YES → level += 1
                                            xp_earned -= (level - 1) * 100
```
