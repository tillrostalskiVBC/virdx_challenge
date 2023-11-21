import datetime
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db.base_class import Base


class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(
        String, nullable=False
    )  # or other appropriate length

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    applicant_id: Mapped[int] = mapped_column(
        ForeignKey("applicants.id"), nullable=False
    )

    user = relationship("User", back_populates="comments")
    applicant = relationship("Applicant", back_populates="discussion")

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
