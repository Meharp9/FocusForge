from fastapi import FastAPI
from app.core.database import engine, Base
from app.routes import user

app = FastAPI(title="FocusForge")

Base.metadata.create_all(bind=engine)

app.include_router(user.router)

@app.get("/")
def root():
    return {"message": "API is running 🚀"}