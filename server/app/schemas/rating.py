from enum import Enum

from pydantic import BaseModel

from app.schemas.user import UserInDB


class RatingType(str, Enum):
    GENERAL = "general"
    CODE_QUALITY = "code_quality"
    APPROACH = "approach"


class RatingBase(BaseModel):
    score: float
    type: RatingType
    user_id: int
    user: UserInDB
    applicant_id: int


class RatingCreate(RatingBase):
    pass


class RatingInDB(RatingBase):
    id: int
