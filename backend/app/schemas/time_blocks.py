from pydantic import BaseModel

class TimeBlockCreate(BaseModel):
    title: str
    start_time: str
    end_time: str
    category: str = None
    block_date: str = None
