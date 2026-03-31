from fastapi import FastAPI
from app.core.database import engine, Base
from app.routes import user, quests

app = FastAPI(title="FocusForge")

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(quests.router)

@app.get("/")
def root():
    return {"message": "API is running 🚀"}