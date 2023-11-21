from typing import Any, Optional

from sqlalchemy.orm import Session

from app import schemas, models
from app.core.security import get_password_hash, verify_password


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    db_user = models.User(
        email=user.email,
        full_name=user.full_name,
        is_superuser=user.is_superuser,
        hashed_password=get_password_hash(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == id).first()


def update_user(
    db: Session, user_id: int, updated_data: schemas.UserUpdate
) -> models.User:
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        for key, value in updated_data.dict(exclude_unset=True).items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


def authenticate(db: Session, *, email: str, password: str) -> Optional[models.User]:
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def is_superuser(user: models.User) -> bool:
    return user.is_superuser
