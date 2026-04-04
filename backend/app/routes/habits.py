from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_user
from app.models.habits import Habit, HabitCompletion
from app.models.user import User
from app.schemas.habits import HabitCreate
from datetime import date, timedelta
from typing import Optional

router = APIRouter(prefix="/habits", tags=["Habits"])

def get_streak(habit_id: int, db: Session) -> int:
    streak = 0
    day = date.today()
    while True:
        exists = db.query(HabitCompletion).filter(
            HabitCompletion.habit_id == habit_id,
            HabitCompletion.completed_at == day
        ).first()
        if not exists:
            break
        streak += 1
        day -= timedelta(days=1)
    return streak

@router.get("/list")
def list_habits(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = date.today()
    monday = today - timedelta(days=today.weekday())
    week_days = [monday + timedelta(days=i) for i in range(7)]

    # Only return habits that are active today (started on or before today, not yet ended)
    habits = db.query(Habit).filter(
        Habit.user_id == current_user.id,
        Habit.start_date <= today,
        (Habit.end_date == None) | (Habit.end_date >= today)
    ).all()

    # Fetch all completions for this week in one query
    habit_ids = [h.id for h in habits]
    week_completions = set()
    if habit_ids:
        rows = db.query(HabitCompletion).filter(
            HabitCompletion.habit_id.in_(habit_ids),
            HabitCompletion.completed_at >= monday,
            HabitCompletion.completed_at <= week_days[-1],
        ).all()
        week_completions = {(r.habit_id, r.completed_at) for r in rows}

    result = []
    for h in habits:
        completed_today = (h.id, today) in week_completions
        streak = get_streak(h.id, db)

        week = []
        for day in week_days:
            is_active = h.start_date <= day and (h.end_date is None or h.end_date >= day)
            is_completed = (h.id, day) in week_completions
            if not is_active:
                status = "inactive"
            elif is_completed:
                status = "completed"
            elif day >= today:
                status = "pending"
            else:
                status = "missed"
            week.append({"date": str(day), "status": status})

        result.append({
            "id": h.id,
            "title": h.title,
            "goal_value": h.goal_value,
            "unit": h.unit,
            "start_date": str(h.start_date),
            "end_date": str(h.end_date) if h.end_date else None,
            "completed_today": completed_today,
            "streak": streak,
            "week": week,
        })

    return {"success": True, "habits": result}

@router.post("/add")
def add_habit(body: HabitCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    habit = Habit(
        user_id=current_user.id,
        title=body.title,
        goal_value=body.goal_value,
        unit=body.unit,
        start_date=body.start_date,
        end_date=body.end_date,
    )
    db.add(habit)
    db.commit()
    return {"success": True, "message": "Habit added"}

@router.post("/complete/{habit_id}")
def toggle_habit(
    habit_id: int,
    log_date: Optional[str] = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    target_date = date.fromisoformat(log_date) if log_date else date.today()

    existing = db.query(HabitCompletion).filter(
        HabitCompletion.habit_id == habit_id,
        HabitCompletion.completed_at == target_date,
    ).first()

    if existing:
        db.delete(existing)
        current_user.xp_earned = max(0, current_user.xp_earned - 5)
    else:
        db.add(HabitCompletion(habit_id=habit_id, completed_at=target_date))
        current_user.xp_earned += 5
        while current_user.xp_earned >= current_user.level * 100:
            current_user.xp_earned -= current_user.level * 100
            current_user.level += 1

    db.commit()

    return {
        "success": True,
        "completed": existing is None,
        "xp_earned": current_user.xp_earned,
        "level": current_user.level,
    }

@router.delete("/delete/{habit_id}")
def delete_habit(habit_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(habit)
    db.commit()
    return {"success": True, "message": "Habit deleted"}
