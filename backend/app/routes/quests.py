from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db
from app.models.quests import Quest
from app.schemas.quests import QuestCreate
from datetime import date

router = APIRouter(prefix="/quests", tags=["Quests"])
    
@router.post("/add")
def add_quest(task:QuestCreate, db: Session = Depends(get_db)):
  try:
    new_quest = Quest(
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
def list_quests(db: Session = Depends(get_db)):
  try:
    quests = db.query(Quest).filter(Quest.created_at == date.today()).all()
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
def complete_quest(quest_id: int, db: Session = Depends(get_db)):
  try:
    quest = db.query(Quest).filter(Quest.id == quest_id).first()
    if not quest:
      raise HTTPException(status_code=404, detail="Quest not found")
    
    quest.completed = True
    db.commit()
    db.refresh(quest)

    return {
      "success": True,
      "message": "Quest marked as completed"
    }
  except Exception as e:
    return {
      "success": False,
      "error": str(e)
    }
  
@router.delete("/delete/{quest_id}")
def delete_quest(quest_id: int, db: Session = Depends(get_db)):
  try:
    quest = db.query(Quest).filter(Quest.id == quest_id).first()
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