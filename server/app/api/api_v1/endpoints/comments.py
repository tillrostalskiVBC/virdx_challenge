from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas
from app import models
from app.db.dependency import get_db


router = APIRouter()


@router.delete(path="/{id}")
def delete_comment(
    id: int,
    db: Session = Depends(get_db),
) -> Any:
    db_comment = db.get(models.Comment, id)
    if not db_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(db_comment)
    db.commit()
    return {"message": "Comment deleted"}
