from pydantic import BaseModel

class QuestCreate(BaseModel):
    title: str
    description: str = None
    xp_reward: int = 10
    type: str
