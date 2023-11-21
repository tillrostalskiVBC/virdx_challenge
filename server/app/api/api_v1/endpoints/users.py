from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.db.dependency import get_current_active_superuser, get_current_user, get_db
from app.logic.user import get_user, get_user_by_email

router = APIRouter()


@router.get("/", response_model=List[schemas.UserInDB])
def read_users(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(get_current_active_superuser),
) -> Any:
    """
    Retrieve users.
    """
    users = get_user_by_email(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.UserInDB)
def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(get_current_active_superuser),
) -> Any:
    """
    Create new user.
    """
    user = get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = create_user(db, obj_in=user_in)
    return user


@router.get("/me", response_model=schemas.UserInDB)
def read_user_me(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.get("/{user_id}", response_model=schemas.UserInDB)
def read_user_by_id(
    user_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Any:
    """
    Get a specific user by id.
    """
    user = get_user(db, id=user_id)
    if user == current_user:
        return user
    if not user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return user


@router.put("/{user_id}", response_model=schemas.UserInDB)
def update_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a user.
    """
    user = get_user(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = update_user(db, db_obj=user, obj_in=user_in)
    return user
