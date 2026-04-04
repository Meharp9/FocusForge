from pydantic import BaseModel
from datetime import date
from typing import Optional

class HabitCreate(BaseModel):
    title: str
    goal_value: int = 1
    unit: str = "times/day"
    start_date: date
    end_date: Optional[date] = None

class HabitLog(BaseModel):
    value: int
    log_date: Optional[str] = None
