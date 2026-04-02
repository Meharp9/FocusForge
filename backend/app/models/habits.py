from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from app.core.database import Base
from datetime import date

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    created_at = Column(Date, default=date.today)


class HabitCompletion(Base):
    __tablename__ = "habit_completions"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id", ondelete="CASCADE"), nullable=False, index=True)
    completed_at = Column(Date, default=date.today, nullable=False)

    __table_args__ = (
        UniqueConstraint("habit_id", "completed_at", name="uq_habit_completion_per_day"),
    )
