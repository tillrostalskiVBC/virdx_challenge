from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import models, schemas
from app.db.dependency import get_current_user, get_db
from app.core.config import settings
from app.logic.user import authenticate
from app.core.security import create_access_token

router = APIRouter()


@router.post("/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "Bearer",
    }


@router.post("/test-token", response_model=schemas.UserInDB)
def test_token(current_user: models.User = Depends(get_current_user)) -> Any:
    """
    Test access token
    """
    return current_user
