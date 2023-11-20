from enum import Enum

from pydantic import BaseModel


class RatingType(str, Enum):
    GENERAL = "general"
    CODE_QUALITY = "code_quality"
    APPROACH = "approach"


class RatingBase(BaseModel):
    score: float
    type: RatingType


class RatingCreate(RatingBase):
    user_id: int
    applicant_id: int


class RatingInDB(RatingBase):
    id: int
