from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base

# Import all models so Base.metadata.create_all picks them up
from app.models import user, quests, habits, pomodoro, time_blocks, achievements  # noqa: F401

from app.routes import user as user_routes
from app.routes import quests as quest_routes

app = FastAPI(title="FocusForge")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user_routes.router)
app.include_router(quest_routes.router)

@app.get("/")
def root():
    return {"message": "API is running"}
