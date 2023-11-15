from typing import Any
from sqlalchemy.orm import Session

from app import models, schemas


def get_applicant_by_github(db: Session, github_name: str) -> Any:
    return (
        db.query(models.Applicant)
        .filter(models.Applicant.github_name == github_name)
        .first()
    )


def _update_applicant(
    db: Session, db_applicant: models.Applicant, updated_data: schemas.ApplicantUpdate
):
    for key, value in updated_data.model_dump().items():
        setattr(db_applicant, key, value)

    db.commit()
    db.refresh(db_applicant)
    return db_applicant
