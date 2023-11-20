from sqlalchemy import Float, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ENUM

from app.db.base_class import Base


class Rating(Base):
    __tablename__ = "ratings"

    id: Mapped[int] = mapped_column(primary_key=True)
    score: Mapped[float] = mapped_column(
        Float, nullable=False
    )  # Assuming score is a float

    type: Mapped[str] = mapped_column(
        ENUM("general", "code_quality", "approach", name="rating_type"), nullable=False
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    applicant_id: Mapped[int] = mapped_column(
        ForeignKey("applicants.id"), nullable=False
    )

    user = relationship(
        "User", back_populates="ratings"
    )  # Update these according to actual relationships
    applicant = relationship("Applicant", back_populates="ratings")
