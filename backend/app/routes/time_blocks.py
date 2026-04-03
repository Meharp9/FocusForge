from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_user
from app.models.time_blocks import TimeBlock
from app.models.user import User
from app.schemas.time_blocks import TimeBlockCreate
from datetime import date, datetime

router = APIRouter(prefix="/time-blocks", tags=["Time Blocks"])

@router.get("/list")
def list_time_blocks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    blocks = db.query(TimeBlock).filter(
        TimeBlock.user_id == current_user.id,
        TimeBlock.block_date == date.today()
    ).order_by(TimeBlock.start_time).all()

    return {
        "success": True,
        "blocks": [
            {
                "id": b.id,
                "title": b.title,
                "start_time": b.start_time.strftime("%I:%M%p").lstrip("0").lower(),
                "end_time": b.end_time.strftime("%I:%M%p").lstrip("0").lower(),
                "category": b.category,
            }
            for b in blocks
        ]
    }

@router.post("/add")
def add_time_block(body: TimeBlockCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    start = datetime.strptime(body.start_time, "%I:%M%p").time()
    end = datetime.strptime(body.end_time, "%I:%M%p").time()

    block = TimeBlock(
        user_id=current_user.id,
        title=body.title,
        start_time=start,
        end_time=end,
        category=body.category,
    )
    db.add(block)
    db.commit()

    return {"success": True, "message": "Time block added"}

@router.delete("/delete/{block_id}")
def delete_time_block(block_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    block = db.query(TimeBlock).filter(TimeBlock.id == block_id, TimeBlock.user_id == current_user.id).first()
    if not block:
        raise HTTPException(status_code=404, detail="Time block not found")

    db.delete(block)
    db.commit()

    return {"success": True, "message": "Time block deleted"}
