from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime
from app.core.database import Base
from datetime import date

class Quest(Base):
    __tablename__ = "quests"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String, nullable=True)
    xp_reward = Column(Integer, default=10)
    created_at = Column(Date, default=date.today)
    completed = Column(Boolean, default=False)
    type = Column(String)