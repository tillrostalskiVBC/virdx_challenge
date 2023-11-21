from datetime import datetime
from pydantic import BaseModel


class CommentBase(BaseModel):
    content: str


class CommentCreate(CommentBase):
    user_id: int
    applicant_id: int


class CommentInDB(CommentBase):
    id: int
    created_at: datetime
