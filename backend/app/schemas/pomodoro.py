from pydantic import BaseModel

class PomodoroComplete(BaseModel):
    duration: int = 25
