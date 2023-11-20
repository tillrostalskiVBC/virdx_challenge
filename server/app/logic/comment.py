from sqlalchemy.orm import Session

from app import schemas, models


def create_comment(db: Session, comment: schemas.CommentCreate) -> models.Comment:
    db_comment = models.Comment(**comment.model_dump())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


def update_comment(db: Session, comment_id: int, new_content: str) -> models.Comment:
    db_comment = (
        db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    )
    if db_comment:
        db_comment.content = new_content
        db.commit()
        db.refresh(db_comment)
    return db_comment


def delete_comment(db: Session, comment_id: int):
    db_comment = (
        db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    )
    if db_comment:
        db.delete(db_comment)
        db.commit()
        return True
    return False
