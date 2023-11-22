from typing import Any
from sqlalchemy.orm import Session

from app import models, schemas


def get_applicant_by_github(db: Session, github_name: str) -> Any:
    return (
        db.query(models.Applicant)
        .filter(models.Applicant.github_name == github_name)
        .first()
    )


def update_applicant(
    db: Session, db_applicant: models.Applicant, updated_data: schemas.ApplicantUpdate
):
    for key, value in updated_data.model_dump().items():
        setattr(db_applicant, key, value)

    db.commit()
    db.refresh(db_applicant)
    return db_applicant


def create_applicant(
    db: Session, applicant: schemas.ApplicantCreate
) -> models.Applicant:
    db_applicant = models.Applicant(**applicant.model_dump())
    db.add(db_applicant)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant


def delete_applicant(db: Session, applicant_id: int):
    db_applicant = (
        db.query(models.Applicant).filter(models.Applicant.id == applicant_id).first()
    )
    if db_applicant:
        db.delete(db_applicant)
        db.commit()
        return True
    return False


def get_all_ratings(db: Session, applicant_id: int) -> list[models.Rating]:
    db_ratings = (
        db.query(models.Rating).filter(models.Rating.applicant_id == applicant_id).all()
    )
    return db_ratings


def get_all_comments(db: Session, applicant_id: int) -> list[models.Comment]:
    db_comments = (
        db.query(models.Comment)
        .filter(models.Comment.applicant_id == applicant_id)
        .all()
    )
    return db_comments
