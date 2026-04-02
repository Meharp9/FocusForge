from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from app.core.database import Base
from datetime import date

class TimeBlock(Base):
    __tablename__ = "time_blocks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    category = Column(String, nullable=True)
    block_date = Column(Date, default=date.today, nullable=False)
