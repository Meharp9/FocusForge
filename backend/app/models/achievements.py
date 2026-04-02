from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint
from app.core.database import Base
from datetime import date

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)
    icon = Column(String, nullable=True)
    xp_reward = Column(Integer, default=50)
    condition_type = Column(String, nullable=False)
    condition_value = Column(Integer, nullable=False)


class UserAchievement(Base):
    __tablename__ = "user_achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    achievement_id = Column(Integer, ForeignKey("achievements.id"), nullable=False, index=True)
    unlocked_at = Column(Date, default=date.today, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "achievement_id", name="uq_user_achievement"),
    )
