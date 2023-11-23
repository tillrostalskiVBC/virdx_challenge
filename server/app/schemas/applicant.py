from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime

from app.schemas.comment import CommentInDB
from app.schemas.rating import RatingInDB


# Base Applicant Schema
class ApplicantBase(BaseModel):
    github_name: str
    repo_link: Optional[str] = None
    full_name: Optional[str] = None
    comment: Optional[str] = None
    feedback: Optional[str] = None
    accuracy: Optional[float] = None


# Schema for Creating a New Applicant
class ApplicantCreate(ApplicantBase):
    pass


# Schema for Updating an Existing Applicant
class ApplicantUpdate(ApplicantBase):
    pass


# Schema for Applicant Representation in Database
class ApplicantInDB(ApplicantBase):
    id: int
    created_at: datetime
    ratings: Optional[List[RatingInDB]] = []
    discussion: Optional[List[CommentInDB]] = []
