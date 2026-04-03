from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.deps import get_db, get_current_user
from app.models.habits import Habit, HabitCompletion
from app.models.user import User
from app.schemas.habits import HabitCreate
from datetime import date, timedelta

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
    habits = db.query(Habit).filter(Habit.user_id == current_user.id).all()

    today = date.today()
    result = []
    for h in habits:
        completed_today = db.query(HabitCompletion).filter(
            HabitCompletion.habit_id == h.id,
            HabitCompletion.completed_at == today
        ).first() is not None

        streak = get_streak(h.id, db)

        result.append({
            "id": h.id,
            "title": h.title,
            "completed_today": completed_today,
            "streak": streak,
        })

    return {"success": True, "habits": result}

@router.post("/add")
def add_habit(body: HabitCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    habit = Habit(user_id=current_user.id, title=body.title)
    db.add(habit)
    db.commit()
    return {"success": True, "message": "Habit added"}

@router.post("/complete/{habit_id}")
def toggle_habit(habit_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == current_user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    today = date.today()
    existing = db.query(HabitCompletion).filter(
        HabitCompletion.habit_id == habit_id,
        HabitCompletion.completed_at == today
    ).first()

    if existing:
        db.delete(existing)
        current_user.xp_earned = max(0, current_user.xp_earned - 5)
    else:
        db.add(HabitCompletion(habit_id=habit_id))
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
