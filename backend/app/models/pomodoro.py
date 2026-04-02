from sqlalchemy import Column, Integer, Date, ForeignKey
from app.core.database import Base
from datetime import date

class PomodoroSession(Base):
    __tablename__ = "pomodoro_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    duration = Column(Integer, default=25)
    completed_at = Column(Date, default=date.today, nullable=False)
