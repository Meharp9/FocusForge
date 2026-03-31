from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User, UserInfo
from app.core.deps import get_db
from app.core.security import hash_password, verify_password
from app.core.auth import create_access_token
from app.schemas.user import UserCreate

router = APIRouter(prefix="/user", tags=["User"])

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
  try:
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
      raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
      
    new_user = User(email=user.email, password=hashed_password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_user_info = UserInfo(user_id=new_user.id, level=1, xp_earned=0)
    db.add(new_user_info)
    db.commit()

    # Create JWT token
    token = create_access_token({"sub": new_user.email})

    return {
      "success": True,
      "access_token": token,
      "user": {
        "id": new_user.id,
        "email": new_user.email
      }
    }
  except Exception as e:
    return {
      "success": False,
      "error": str(e)
    }


@router.post("/signin")
def signin(user: UserCreate, db: Session = Depends(get_db)):
  try:
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Generate token
    token = create_access_token({"sub": existing_user.email})

    return {
        "success": True,
        "access_token": token,
        "user": {
            "id": existing_user.id,
            "email": existing_user.email
        }
    }
  except Exception as e:
    return {
        "success": False,
        "error": str(e)
    }