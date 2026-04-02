from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_user
from app.models.quests import Quest
from app.models.user import User
from app.schemas.quests import QuestCreate
from datetime import date

router = APIRouter(prefix="/quests", tags=["Quests"])

@router.post("/add")
def add_quest(task: QuestCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
  try:
    new_quest = Quest(
      user_id=current_user.id,
      title=task.title,
      description=task.description,
      type=task.type
    )
    db.add(new_quest)
    db.commit()
    db.refresh(new_quest)

    return {
      "success": True,
      "message": "Quest added successfully"
    }
  except Exception as e:
    return {
      "success": False,
      "error": str(e)
    }

@router.get("/list")
def list_quests(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
  try:
    quests = db.query(Quest).filter(
      Quest.user_id == current_user.id,
      Quest.created_at == date.today()
    ).all()
    return {
      "success": True,
      "quests": quests
    }
  except Exception as e:
    return {
      "success": False,
      "error": str(e)
    }

@router.post("/complete/{quest_id}")
def toggle_quest(quest_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
  try:
    quest = db.query(Quest).filter(Quest.id == quest_id, Quest.user_id == current_user.id).first()
    if not quest:
      raise HTTPException(status_code=404, detail="Quest not found")

    quest.completed = not quest.completed

    if quest.completed:
      current_user.xp_earned += quest.xp_reward
    else:
      current_user.xp_earned = max(0, current_user.xp_earned - quest.xp_reward)

    # Level up check
    while current_user.xp_earned >= current_user.level * 100:
      current_user.xp_earned -= current_user.level * 100
      current_user.level += 1

    db.commit()

    return {
      "success": True,
      "completed": quest.completed,
      "xp_earned": current_user.xp_earned,
      "level": current_user.level
    }
  except Exception as e:
    return {
      "success": False,
      "error": str(e)
    }

@router.delete("/delete/{quest_id}")
def delete_quest(quest_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
  try:
    quest = db.query(Quest).filter(Quest.id == quest_id, Quest.user_id == current_user.id).first()
    if not quest:
      raise HTTPException(status_code=404, detail="Quest not found")

    db.delete(quest)
    db.commit()

    return {
      "success": True,
      "message": "Quest deleted successfully"
    }
  except Exception as e:
    return {
      "success": False,
      "error": str(e)
    }