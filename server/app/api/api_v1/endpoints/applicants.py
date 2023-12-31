from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas, models
from app.db.dependency import get_current_user, get_db
from app.logic.applicant import (
    get_all_comments,
    update_applicant,
    get_applicant_by_github,
    get_all_ratings,
)

router = APIRouter()


@router.get(path="/", response_model=List[schemas.ApplicantInDB])
def read_all(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    return db.query(models.Applicant).offset(skip).limit(limit).all()


@router.get(path="/{id}", response_model=schemas.ApplicantInDB)
def read(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")
    ratings = get_all_ratings(db, id)
    comments = get_all_comments(db, id)
    db_applicant.ratings = ratings
    db_applicant.discussion = comments
    return db_applicant


@router.post(path="/", response_model=schemas.ApplicantCreate)
def create(
    applicant: schemas.ApplicantCreate,
    db: Session = Depends(get_db),
) -> Any:
    db_applicant = models.Applicant(**applicant.model_dump())
    if get_applicant_by_github(db, db_applicant.github_name):
        raise HTTPException(
            status_code=400, detail="Applicant with this github name already exists"
        )
    db.add(db_applicant)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant


@router.post(path="/create-or-update", response_model=schemas.ApplicantCreate)
def create_or_update(
    applicant: schemas.ApplicantCreate,
    db: Session = Depends(get_db),
) -> Any:
    db_applicant = get_applicant_by_github(db, applicant.github_name)
    if db_applicant:
        update_applicant(db, db_applicant, applicant)
    else:
        db_applicant = models.Applicant(**applicant.model_dump())
        db.add(db_applicant)
        db.commit()
        db.refresh(db_applicant)
    return db_applicant


@router.post("/bulk", response_model=List[schemas.ApplicantCreate])
def create_many(
    applicants: List[schemas.ApplicantCreate],
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    db_applicants = [
        models.Applicant(**applicant.model_dump()) for applicant in applicants
    ]
    db.add_all(db_applicants)
    db.commit()
    return db_applicants


@router.post("/{id}/comment", response_model=schemas.CommentInDB)
def add_comment(
    id: int,
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")
    db_comment = models.Comment(**comment.model_dump())
    db_comment.applicant_id = id
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


@router.put("/{id}", response_model=schemas.ApplicantInDB)
def update(
    id: int,
    updated_data: schemas.ApplicantUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")

    return update_applicant(db, db_applicant, updated_data)


@router.delete("/{id}", response_model=schemas.ApplicantInDB)
def delete(
    id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")

    db.delete(db_applicant)
    db.commit()
    return db_applicant


@router.post("/{id}/ratings")
def create_or_update_rating(
    id: int,
    ratings: List[schemas.RatingCreate],
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """Create or update ratings by user for an applicant. If a rating of
    the same type already exists, it will be updated, otherwise a new
    rating will be created."""

    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")

    for rating in ratings:
        db_rating = (
            db.query(models.Rating)
            .filter(
                models.Rating.applicant_id == id,
                models.Rating.user_id == current_user.id,
                models.Rating.type == rating.type,
            )
            .first()
        )
        if db_rating:
            db_rating.score = rating.score
        else:
            db_rating = models.Rating(**rating.model_dump())
            db_rating.applicant_id = id
            db_rating.user_id = current_user.id
            db.add(db_rating)
    db.commit()
    db.refresh(db_applicant)
    return {"message": "Ratings updated successfully"}
