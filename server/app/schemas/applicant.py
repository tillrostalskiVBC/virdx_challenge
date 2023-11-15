from typing import Optional
from pydantic import BaseModel


class ApplicantBase(BaseModel):
    github_name: str
    full_name: Optional[str] = None
    accuracy: Optional[float] = None
    comment: Optional[str] = None
    feedback: Optional[str] = None
    repo_link: Optional[str] = None
    rating: Optional[int] = None


class ApplicantCreate(ApplicantBase):
    pass


class ApplicantUpdate(ApplicantBase):
    pass


class ApplicantInDB(ApplicantBase):
    id: int
