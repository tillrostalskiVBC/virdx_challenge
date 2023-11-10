from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class Applicant(Base):
    __tablename__ = "applicant"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str]
    github_name: Mapped[Optional[str]]
    accuracy: Mapped[Optional[float]]
