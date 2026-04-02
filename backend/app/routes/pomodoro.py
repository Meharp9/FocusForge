from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.deps import get_db, get_current_user
from app.models.pomodoro import PomodoroSession
from app.models.user import User
from app.schemas.pomodoro import PomodoroComplete
from datetime import date

router = APIRouter(prefix="/pomodoro", tags=["Pomodoro"])

@router.get("/sessions")
def get_sessions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    count = db.query(func.count(PomodoroSession.id)).filter(
        PomodoroSession.user_id == current_user.id,
        PomodoroSession.completed_at == date.today()
    ).scalar()

    return {
        "success": True,
        "sessions_today": count
    }

@router.post("/complete")
def complete_session(body: PomodoroComplete, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    session = PomodoroSession(
        user_id=current_user.id,
        duration=body.duration
    )
    db.add(session)

    # Award XP
    current_user.xp_earned += 15
    while current_user.xp_earned >= current_user.level * 100:
        current_user.xp_earned -= current_user.level * 100
        current_user.level += 1

    db.commit()

    count = db.query(func.count(PomodoroSession.id)).filter(
        PomodoroSession.user_id == current_user.id,
        PomodoroSession.completed_at == date.today()
    ).scalar()

    return {
        "success": True,
        "sessions_today": count,
        "xp_earned": current_user.xp_earned,
        "level": current_user.level
    }
