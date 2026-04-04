from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_user
from app.models.habits import Habit, HabitCompletion
from app.models.user import User
from app.schemas.habits import HabitCreate, HabitLog
from datetime import date, timedelta
from typing import Optional

router = APIRouter(prefix="/habits", tags=["Habits"])


def get_streak(habit_id: int, goal_value: int, db: Session) -> int:
    streak = 0
    today = date.today()

    today_completion = db.query(HabitCompletion).filter(
        HabitCompletion.habit_id == habit_id,
        HabitCompletion.completed_at == today,
    ).first()

    # If today is already completed start from today, otherwise start from yesterday
    # so the streak isn't broken just because the user hasn't logged yet today
    day = today if (today_completion and today_completion.value >= goal_value) else today - timedelta(days=1)

    while True:
        completion = db.query(HabitCompletion).filter(
            HabitCompletion.habit_id == habit_id,
            HabitCompletion.completed_at == day,
        ).first()
        if not completion or completion.value < goal_value:
            break
        streak += 1
        day -= timedelta(days=1)
    return streak


@router.get("/list")
def list_habits(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today = date.today()
    monday = today - timedelta(days=today.weekday())
    week_days = [monday + timedelta(days=i) for i in range(7)]

    habits = db.query(Habit).filter(
        Habit.user_id == current_user.id,
        Habit.start_date <= today,
        (Habit.end_date == None) | (Habit.end_date >= today)
    ).all()

    habit_ids = [h.id for h in habits]
    completion_map: dict[tuple, int] = {}
    if habit_ids:
        rows = db.query(HabitCompletion).filter(
            HabitCompletion.habit_id.in_(habit_ids),
            HabitCompletion.completed_at >= monday,
            HabitCompletion.completed_at <= week_days[-1],
        ).all()
        completion_map = {(r.habit_id, r.completed_at): r.value for r in rows}

    result = []
    for h in habits:
        today_value = completion_map.get((h.id, today), 0)
        completed_today = today_value >= h.goal_value
        streak = get_streak(h.id, h.goal_value, db)

        week = []
        for day in week_days:
            is_active = h.start_date <= day and (h.end_date is None or h.end_date >= day)
            val = completion_map.get((h.id, day), 0)
            if not is_active:
                status = "inactive"
            elif val >= h.goal_value:
                status = "completed"
            elif val > 0:
                status = "partial"
            elif day >= today:
                status = "pending"
            else:
                status = "missed"
            week.append({"date": str(day), "status": status, "value": val})

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


@router.post("/log/{habit_id}")
def log_habit(
    habit_id: int,
    body: HabitLog,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    target_date = date.fromisoformat(body.log_date) if body.log_date else date.today()

    existing = db.query(HabitCompletion).filter(
        HabitCompletion.habit_id == habit_id,
        HabitCompletion.completed_at == target_date,
    ).first()

    was_complete = existing is not None and existing.value >= habit.goal_value

    if body.value <= 0:
        if existing:
            if was_complete:
                current_user.xp_earned = max(0, current_user.xp_earned - 5)
            db.delete(existing)
    else:
        if existing:
            existing.value = body.value
        else:
            db.add(HabitCompletion(habit_id=habit_id, completed_at=target_date, value=body.value))

        is_now_complete = body.value >= habit.goal_value
        if is_now_complete and not was_complete:
            current_user.xp_earned += 5
            while current_user.xp_earned >= current_user.level * 100:
                current_user.xp_earned -= current_user.level * 100
                current_user.level += 1
        elif not is_now_complete and was_complete:
            current_user.xp_earned = max(0, current_user.xp_earned - 5)

    db.commit()

    return {
        "success": True,
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
