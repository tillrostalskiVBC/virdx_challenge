from sqlalchemy.orm import Session

from app import schemas
from app.core.config import settings
from app.logic.user import create_user, get_user_by_email  # noqa: F401
from app.db import base
from app.db.session import SessionLocal


def init_db() -> None:
    db = SessionLocal()
    user = get_user_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            full_name=settings.FIRST_SUPERUSER_FULL_NAME,
        )
        user = create_user(db, user=user_in)
