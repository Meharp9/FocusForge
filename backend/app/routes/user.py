from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.deps import get_db, get_current_user
from app.core.security import hash_password, verify_password
from app.core.auth import create_access_token
from app.schemas.user import UserCreate

router = APIRouter(prefix="/user", tags=["User"])

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
  existing_user = db.query(User).filter(User.email == user.email).first()
  if existing_user:
    raise HTTPException(status_code=400, detail="Email already registered")

  hashed_password = hash_password(user.password)

  new_user = User(email=user.email, password=hashed_password)
  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  token = create_access_token({"sub": new_user.email})

  return {
    "success": True,
    "access_token": token,
    "user": {
      "id": new_user.id,
      "email": new_user.email
    }
  }


@router.post("/signin")
def signin(user: UserCreate, db: Session = Depends(get_db)):
  existing_user = db.query(User).filter(User.email == user.email).first()
  if not existing_user:
    raise HTTPException(status_code=400, detail="Invalid email or password")

  if not verify_password(user.password, existing_user.password):
    raise HTTPException(status_code=400, detail="Invalid email or password")

  token = create_access_token({"sub": existing_user.email})

  return {
    "success": True,
    "access_token": token,
    "user": {
      "id": existing_user.id,
      "email": existing_user.email
    }
  }


@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
  return {
    "success": True,
    "profile": {
      "id": current_user.id,
      "email": current_user.email,
      "level": current_user.level,
      "xp_earned": current_user.xp_earned,
      "xp_to_next_level": current_user.level * 100
    }
  }
