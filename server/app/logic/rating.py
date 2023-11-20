from sqlalchemy.orm import Session

from app import schemas, models


def create_rating(db: Session, rating: schemas.RatingCreate) -> models.Rating:
    db_rating = models.Rating(**rating.model_dump())
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)
    return db_rating


def update_rating(
    db: Session, rating_id: int, updated_data: schemas.RatingInDB
) -> models.Rating:
    db_rating = db.query(models.Rating).filter(models.Rating.id == rating_id).first()
    if db_rating:
        for key, value in updated_data.model_dump(exclude_unset=True).items():
            setattr(db_rating, key, value)
        db.commit()
        db.refresh(db_rating)
    return db_rating


def delete_rating(db: Session, rating_id: int):
    db_rating = db.query(models.Rating).filter(models.Rating.id == rating_id).first()
    if db_rating:
        db.delete(db_rating)
        db.commit()
        return True
    return False
