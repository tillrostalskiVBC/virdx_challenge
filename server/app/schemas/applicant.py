from typing import Optional
from pydantic import BaseModel


class ApplicantBase(BaseModel):
    full_name: str
    github_name: str
    accuracy: Optional[float] = None


class ApplicantCreate(ApplicantBase):
    pass


class ApplicantUpdate(ApplicantBase):
    pass


class ApplicantInDB(ApplicantBase):
    id: int
