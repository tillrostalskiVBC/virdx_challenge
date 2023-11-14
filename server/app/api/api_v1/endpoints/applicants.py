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


@router.post("/bulk", response_model=List[schemas.ApplicantCreate])
def create_applicants(
    applicants: List[schemas.ApplicantCreate], db: Session = Depends(get_db)
) -> Any:
    db_applicants = [
        models.Applicant(**applicant.model_dump()) for applicant in applicants
    ]
    db.add_all(db_applicants)
    db.commit()
    return db_applicants


@router.put("/{id}", response_model=schemas.ApplicantInDB)
def update_applicant(
    id: int, updated_data: schemas.ApplicantUpdate, db: Session = Depends(get_db)
) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")

    for key, value in updated_data.model_dump().items():
        setattr(db_applicant, key, value)

    db.commit()
    db.refresh(db_applicant)
    return db_applicant


@router.delete("/{id}", response_model=schemas.ApplicantInDB)
def delete_applicant(id: int, db: Session = Depends(get_db)) -> Any:
    db_applicant = db.get(models.Applicant, id)
    if not db_applicant:
        raise HTTPException(status_code=404, detail="Applicant not found")

    db.delete(db_applicant)
    db.commit()
    return db_applicant
