from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.database import engine, Base

# Import all models so Base.metadata.create_all picks them up
from app.models import user, quests, habits, pomodoro, time_blocks  # noqa: F401

from app.routes import user as user_routes
from app.routes import quests as quest_routes
from app.routes import pomodoro as pomodoro_routes
from app.routes import time_blocks as time_block_routes
from app.routes import habits as habit_routes
from app.routes import stats as stats_routes

app = FastAPI(title="FocusForge")

import os

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Fix any users whose xp_earned should have triggered a level-up
with Session(engine) as db:
    from app.models.user import User as UserModel
    stale_users = db.query(UserModel).filter(UserModel.xp_earned >= UserModel.level * 100).all()
    for u in stale_users:
        while u.xp_earned >= u.level * 100:
            u.xp_earned -= u.level * 100
            u.level += 1
    if stale_users:
        db.commit()

app.include_router(user_routes.router)
app.include_router(quest_routes.router)
app.include_router(pomodoro_routes.router)
app.include_router(time_block_routes.router)
app.include_router(habit_routes.router)
app.include_router(stats_routes.router)

@app.get("/")
def root():
    return {"message": "API is running"}
