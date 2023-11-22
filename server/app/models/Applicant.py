import datetime

from typing import Optional
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_class import Base


class Applicant(Base):
    __tablename__ = "applicants"

    id: Mapped[int] = mapped_column(primary_key=True)
    github_name: Mapped[str] = mapped_column(index=True, unique=True)
    repo_link: Mapped[str] = mapped_column(index=True, unique=True)
    full_name: Mapped[Optional[str]]
    comment: Mapped[Optional[str]]
    feedback: Mapped[Optional[str]]
    accuracy: Mapped[Optional[float]]

    ratings = relationship(
        "Rating", back_populates="applicant", cascade="all, delete-orphan"
    )
    discussion = relationship(
        "Comment", back_populates="applicant", cascade="all, delete-orphan"
    )

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
