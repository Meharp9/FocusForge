# FocusForge — Backend

FastAPI application for FocusForge. Provides a REST API for authentication, user data, quests, habits, pomodoro sessions, time blocks, and stats.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| FastAPI | 0.135 | API framework |
| SQLAlchemy | 2.0 | ORM |
| PostgreSQL | — | Database (hosted on Neon) |
| psycopg2 | 2.9 | PostgreSQL driver |
| python-jose | 3.5 | JWT creation and verification |
| passlib + bcrypt | — | Password hashing |
| Pydantic | 2 | Request/response validation |
| Uvicorn | 0.42 | ASGI server |

---

## Project Structure

```
app/
├── main.py                 # App entry point — registers routers, runs migrations, configures CORS
│
├── core/
│   ├── database.py         # SQLAlchemy engine + session factory
│   ├── deps.py             # FastAPI dependencies (get_db, get_current_user)
│   ├── auth.py             # JWT creation
│   ├── security.py         # Password hashing / verification
│   └── config.py           # Environment variable loading
│
├── models/                 # SQLAlchemy ORM models (table definitions)
│   ├── user.py
│   ├── quests.py
│   ├── habits.py           # Habit + HabitCompletion
│   ├── pomodoro.py
│   └── time_blocks.py
│
├── schemas/                # Pydantic models (request body validation)
│   ├── user.py
│   ├── quests.py
│   ├── habits.py           # HabitCreate, HabitLog
│   ├── pomodoro.py
│   └── time_blocks.py
│
└── routes/                 # API route handlers
    ├── user.py             # /user — signup, signin, profile
    ├── quests.py           # /quests — CRUD + toggle complete
    ├── habits.py           # /habits — CRUD + value-based logging
    ├── pomodoro.py         # /pomodoro — session logging
    ├── time_blocks.py      # /time-blocks — CRUD
    └── stats.py            # /stats — overview, habit heatmap
```

---

## Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| email | String | Unique |
| password | String | Bcrypt hashed |
| level | Integer | Default 1 |
| xp_earned | Integer | XP within current level |

XP to next level = `level × 100`. This is computed, never stored.

### `quests`
| Column | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| user_id | Integer | FK → users |
| title | String | — |
| type | String | `personal` or `work` |
| xp_reward | Integer | Default 10 |
| completed | Boolean | Default false |
| created_at | Date | Used to filter today's quests |

### `habits`
| Column | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| user_id | Integer | FK → users |
| title | String | — |
| goal_value | Integer | Daily target (e.g. 10 pages) |
| unit | String | e.g. `pages/day` |
| start_date | Date | Habit active from this date |
| end_date | Date | Nullable — no end if null |

### `habit_completions`
| Column | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| habit_id | Integer | FK → habits (CASCADE delete) |
| completed_at | Date | One record per habit per day (unique constraint) |
| value | Integer | Amount logged (e.g. 5 pages) |

### `pomodoro_sessions`
| Column | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| user_id | Integer | FK → users |
| duration | Integer | Minutes (default 25) |
| completed_at | Date | — |

### `time_blocks`
| Column | Type | Notes |
|---|---|---|
| id | Integer | Primary key |
| user_id | Integer | FK → users |
| title | String | — |
| category | String | — |
| start_time | String | HH:MM format |
| end_time | String | HH:MM format |

---

## API Endpoints

### Auth — `/user`
| Method | Path | Description |
|---|---|---|
| POST | `/user/signup` | Register new user |
| POST | `/user/signin` | Sign in, returns JWT |
| GET | `/user/profile` | Get level + XP (auth required) |

### Quests — `/quests`
| Method | Path | Description |
|---|---|---|
| GET | `/quests/list` | Today's quests for current user |
| POST | `/quests/add` | Add a quest |
| POST | `/quests/complete/{id}` | Toggle complete — awards/deducts XP |
| DELETE | `/quests/delete/{id}` | Delete a quest |

### Habits — `/habits`
| Method | Path | Description |
|---|---|---|
| GET | `/habits/list` | Active habits for today + weekly completion data |
| POST | `/habits/add` | Create a habit |
| POST | `/habits/log/{id}` | Log a value for a given date |
| DELETE | `/habits/delete/{id}` | Delete a habit |

### Pomodoro — `/pomodoro`
| Method | Path | Description |
|---|---|---|
| GET | `/pomodoro/sessions` | Today's session count |
| POST | `/pomodoro/complete` | Log a completed session (+15 XP) |

### Time Blocks — `/time-blocks`
| Method | Path | Description |
|---|---|---|
| GET | `/time-blocks/list` | Today's time blocks |
| POST | `/time-blocks/add` | Add a time block |
| DELETE | `/time-blocks/delete/{id}` | Delete a time block |

### Stats — `/stats`
| Method | Path | Description |
|---|---|---|
| GET | `/stats/overview` | Quests completed, XP earned, habit streaks for period |
| GET | `/stats/habits` | All habits (for dropdown) |
| GET | `/stats/habit-heatmap` | Day-by-day completion grid for a habit |

---

## XP System

XP is awarded per action and deducted on reversal:

| Action | XP |
|---|---|
| Complete a quest | `quest.xp_reward` (default 10) |
| Undo a quest | `-quest.xp_reward` |
| Fully complete a habit goal | +5 |
| Log below goal (partial) | 0 |
| Drop from complete to partial | -5 |
| Complete a Pomodoro session | +15 |

**Level-up logic** — runs inline after any XP change:
```python
while current_user.xp_earned >= current_user.level * 100:
    current_user.xp_earned -= current_user.level * 100
    current_user.level += 1
```
Remaining XP carries over so no progress is lost on level-up.

---

## Habit Streak Logic

Streak counts consecutive days where `value >= goal_value`, starting from today if completed, or from yesterday if today isn't done yet (so the streak stays intact until end of day).

Only habits active for the queried day (`start_date <= day <= end_date`) count.

---

## Key Design Decisions

**`pool_pre_ping=True`** on the SQLAlchemy engine — recovers stale SSL connections to Neon without crashing.

**No `completed_at` on quests** — quests are daily by design (`created_at` is used as the date proxy). Stats filter completed quests by `created_at`.

**Startup XP migration** — on boot, `main.py` scans for any users whose `xp_earned >= level * 100` (stale data from before level-up logic was added) and corrects them.

**Habit log is an upsert** — `POST /habits/log/{id}` creates or updates the `HabitCompletion` row for the given date. Setting `value = 0` deletes the record.

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://user:password@host/dbname
SECRET_KEY=your-secret-key
```

---

## Running Locally

```bash
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`.  
Interactive docs available at `http://localhost:8000/docs`.

---

## Database Migrations

SQLAlchemy runs `Base.metadata.create_all()` on startup — this creates missing tables automatically. For column additions on existing tables, run `ALTER TABLE` manually in your Neon SQL editor. Required migrations:

```sql
-- Habit fields
ALTER TABLE habits ADD COLUMN IF NOT EXISTS goal_value INTEGER NOT NULL DEFAULT 1;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS unit VARCHAR NOT NULL DEFAULT 'times/day';
ALTER TABLE habits ADD COLUMN IF NOT EXISTS start_date DATE NOT NULL DEFAULT CURRENT_DATE;
ALTER TABLE habits ADD COLUMN IF NOT EXISTS end_date DATE;

-- Habit completion value
ALTER TABLE habit_completions ADD COLUMN IF NOT EXISTS value INTEGER NOT NULL DEFAULT 1;
```
