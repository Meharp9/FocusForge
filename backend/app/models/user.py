from sqlalchemy import Column, Integer, String
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

class UserInfo(Base):
    __tablename__ = "userInfo"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    level = Column(Integer)
    xp_earned = Column(Integer)