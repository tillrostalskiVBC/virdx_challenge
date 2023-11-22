import datetime

from sqlalchemy import DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db.base_class import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True, index=True)
    hashed_password: Mapped[str]
    is_superuser: Mapped[bool] = mapped_column(default=False)

    ratings = relationship(
        "Rating", back_populates="user", cascade="all, delete-orphan"
    )
    comments = relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan"
    )

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
