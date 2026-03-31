from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserInfoCreate(BaseModel):
    user_id: int
    level: int
    xp_earned: int