from pydantic import BaseModel
from datetime import date

class QuestCreate(BaseModel):
  title: str
  description: str = None
  xp_reward: int = 10
  created_at: date = date.today()
  completed: bool = False
  type: str