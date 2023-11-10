from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas, models
from app.db.dependency import get_db

router = APIRouter()


@router.get(path="/", response_model=List[schemas.ApplicantInDB])
def read_applicants(
    db: Session = Depends(get_db), skip: int = 0, limit: int = 100
) -> Any:
    return db.query(models.Applicant).offset(skip).limit(limit).all()


@router.get(path="/{id}", response_model=schemas.ApplicantInDB)
def read_applicant(id: int, db: Session = Depends(get_db)) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")
    return db_applicant


@router.post(path="/", response_model=schemas.ApplicantCreate)
def create_applicant(
    applicant: schemas.ApplicantCreate, db: Session = Depends(get_db)
) -> Any:
    db_applicant = models.Applicant(**applicant.model_dump())
    db.add(db_applicant)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant
