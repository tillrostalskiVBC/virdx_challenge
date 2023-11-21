from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import schemas, models
from app.db.dependency import get_current_user, get_db
from app.logic.applicant import update_applicant, get_applicant_by_github

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
    return db_applicant


@router.post(path="/create-or-update", response_model=schemas.ApplicantCreate)
def create_or_update(
    applicant: schemas.ApplicantCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
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
