from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_user
from app.models.quests import Quest
from app.models.habits import Habit, HabitCompletion
from app.models.pomodoro import PomodoroSession
from app.models.user import User
from app.routes.habits import get_streak
from datetime import date, timedelta

router = APIRouter(prefix="/stats", tags=["Stats"])


def date_range(period: int) -> tuple[date, date]:
    end = date.today()
    start = end - timedelta(days=period - 1)
    return start, end


@router.get("/overview")
def get_overview(
    period: int = Query(default=7),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    start, end = date_range(period)

    # Quests completed in period (created_at is used as a proxy)
    quests_completed = db.query(Quest).filter(
        Quest.user_id == current_user.id,
        Quest.completed == True,
        Quest.created_at >= start,
        Quest.created_at <= end,
    ).count()

    quest_xp_rows = db.query(Quest).filter(
        Quest.user_id == current_user.id,
        Quest.completed == True,
        Quest.created_at >= start,
        Quest.created_at <= end,
    ).all()
    quest_xp = sum(q.xp_reward for q in quest_xp_rows)

    habit_completions_count = (
        db.query(HabitCompletion)
        .join(Habit, HabitCompletion.habit_id == Habit.id)
        .filter(
            Habit.user_id == current_user.id,
            HabitCompletion.completed_at >= start,
            HabitCompletion.completed_at <= end,
        )
        .count()
    )
    habit_xp = habit_completions_count * 5

    pomodoro_count = db.query(PomodoroSession).filter(
        PomodoroSession.user_id == current_user.id,
        PomodoroSession.completed_at >= start,
        PomodoroSession.completed_at <= end,
    ).count()
    pomodoro_xp = pomodoro_count * 15

    total_xp = quest_xp + habit_xp + pomodoro_xp

    habits = db.query(Habit).filter(Habit.user_id == current_user.id).all()
    habit_streaks = []
    for h in habits:
        streak = get_streak(h.id, db)
        if streak > 0:
            habit_streaks.append({"id": h.id, "title": h.title, "streak": streak})
    habit_streaks.sort(key=lambda x: x["streak"], reverse=True)

    return {
        "success": True,
        "quests_completed": quests_completed,
        "total_xp": total_xp,
        "habit_streaks": habit_streaks,
    }


@router.get("/habits")
def list_all_habits(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    habits = db.query(Habit).filter(Habit.user_id == current_user.id).all()
    return {
        "success": True,
        "habits": [{"id": h.id, "title": h.title} for h in habits],
    }


@router.get("/habit-heatmap")
def get_habit_heatmap(
    habit_id: int = Query(...),
    period: int = Query(default=30),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    habit = db.query(Habit).filter(
        Habit.id == habit_id, Habit.user_id == current_user.id
    ).first()
    if not habit:
        return {"success": False, "error": "Habit not found"}

    end = date.today()
    start = end - timedelta(days=period - 1)

    completions = db.query(HabitCompletion).filter(
        HabitCompletion.habit_id == habit_id,
        HabitCompletion.completed_at >= start,
        HabitCompletion.completed_at <= end,
    ).all()
    completed_dates = {c.completed_at for c in completions}

    today = date.today()
    grid = []
    current = start
    while current <= end:
        is_active = habit.start_date <= current and (
            habit.end_date is None or habit.end_date >= current
        )
        is_completed = current in completed_dates
        if not is_active:
            status = "inactive"
        elif is_completed:
            status = "completed"
        elif current > today:
            status = "future"
        else:
            status = "missed"
        grid.append({"date": str(current), "status": status})
        current += timedelta(days=1)

    return {"success": True, "grid": grid}
