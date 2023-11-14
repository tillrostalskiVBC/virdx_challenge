import datetime

from typing import Optional
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class Applicant(Base):
    __tablename__ = "applicants"

    id: Mapped[int] = mapped_column(primary_key=True)
    github_name: Mapped[Optional[str]]
    full_name: Mapped[Optional[str]]
    comment: Mapped[Optional[str]]
    feedback: Mapped[Optional[str]]
    accuracy: Mapped[Optional[float]]
    repo_link: Mapped[Optional[str]]

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
