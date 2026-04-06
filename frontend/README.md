# FocusForge — Frontend

Next.js application for FocusForge. Handles all UI, client-side state, and communication with the FastAPI backend.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16 | App framework (App Router) |
| React | 19 | UI rendering |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Redux Toolkit | 2 | Global state management |
| Lucide React | — | Icons |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page
│   ├── auth/page.tsx           # Sign in / Sign up
│   ├── not-found.tsx           # Custom 404
│   └── dashboard/
│       ├── layout.tsx          # Shared dashboard layout (sidebar + header)
│       ├── page.tsx            # Overview
│       ├── daily-quests/
│       ├── habits/
│       ├── pomodoro/
│       ├── time-blocks/
│       └── stats/
│
├── components/
│   ├── common/                 # Reusable UI primitives
│   │   ├── InputField.tsx      # Input with password toggle + type passthrough
│   │   ├── SoftCard.tsx        # Rounded card wrapper
│   │   ├── TaskCard.tsx        # Quest item row
│   │   └── LevelTag.tsx        # Level badge in header
│   ├── auth/                   # Sign in / Sign up forms
│   ├── dashboard/              # Feature components
│   │   ├── Main.tsx            # Overview layout (stat cards + quests + habits)
│   │   ├── DailyQuests.tsx     # Quest list with add/complete/delete
│   │   ├── HabitTracker.tsx    # Habit list with weekly ring progress
│   │   ├── TimeBlocks.tsx      # Day schedule planner
│   │   ├── Timer.tsx           # Pomodoro timer (assembled from sub-components)
│   │   ├── Sidebar.tsx         # Fixed nav sidebar with sign out
│   │   └── Header.tsx          # Fixed top bar with level tag
│   └── landing/                # Landing page sections
│
├── store/                      # Redux Toolkit
│   ├── store.ts                # Root store
│   ├── hooks.ts                # Typed useAppDispatch / useAppSelector
│   ├── StoreProvider.tsx       # Redux provider + JWT expiry check on mount
│   └── slices/
│       ├── authSlice.ts        # User profile, level, XP
│       ├── questSlice.ts       # Quests with optimistic complete/undo
│       ├── habitSlice.ts       # Habits with optimistic value-based logging
│       ├── pomodoroSlice.ts    # Session count, timer state
│       └── timeBlockSlice.ts  # Time blocks CRUD
│
├── lib/
│   └── api.ts                  # All API calls — single source of truth
│
├── hooks/
│   └── usePomodoro.ts          # Pomodoro timer logic (countdown, session XP)
│
├── types/
│   ├── tasks.ts                # Habit, Quest, TimeBlock, HabitWeekDay types
│   └── timer.ts                # Timer mode types
│
├── constants/
│   ├── menu.tsx                # Sidebar nav items
│   ├── tasks.ts                # Task category constants
│   └── timer.ts                # Pomodoro durations
│
└── utils.ts                    # Shared utility functions
```

---

## State Management

Redux Toolkit manages all server-derived state. Each feature has its own slice.

### Optimistic Updates
Quests and habits use an optimistic update pattern — the UI updates immediately and reverts if the API call fails:

```
dispatch(optimisticAction()) → API call → success: dispatch(fetchAll()) | fail: revert + fetchAll()
```

### Auth Gate
`StoreProvider.tsx` runs a one-time JWT expiry check on app mount using a `useRef` guard (safe under React Strict Mode double-mount). If the token is expired, it clears localStorage and redirects to `/auth`.

---

## API Layer

All backend communication lives in `src/lib/api.ts`. Every authenticated call runs `handleUnauthorized(res)` before parsing the response — a 401 or 403 clears the token and redirects to `/auth` automatically.

```ts
// Pattern used across all authenticated endpoints
const res = await fetch(url, { headers: getAuthHeaders() });
handleUnauthorized(res);
const data = await res.json();
```

---

## Authentication

- Token stored in `localStorage` as `access_token`
- Sent as `Authorization: Bearer <token>` on every API request
- Expiry checked once on app load in `StoreProvider`
- 401 responses from the server trigger immediate redirect to `/auth`

---

## Key Design Decisions

**Dates use local timezone** — `new Date().toLocaleDateString('en-CA')` is used instead of `toISOString()` to avoid UTC offset issues (e.g. a user in IST at midnight would get yesterday's date from `toISOString()`).

**No Redux for stats page** — the stats page is read-only and uses local `useState` + `useEffect` rather than a Redux slice to keep things simple.

**Habit rings use SVG** — the weekly progress rings in `HabitTracker` are plain SVG circles with `strokeDashoffset` for the arc, referencing `var(--color-primary)` and `var(--color-border)` from the CSS theme directly.

**Dashboard layout is fixed** — the sidebar and header use `position: fixed`. Only the content area scrolls (`overflow-y-auto`), preventing the nav from disappearing on long pages.

---

## Environment Variables

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Running Locally

```bash
npm install
npm run dev       # development server at http://localhost:3000
npm run build     # production build
npm run lint      # lint check
```
