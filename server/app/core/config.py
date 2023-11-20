import secrets
from typing import Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # api
    PROJECT_NAME: str = "Virdx Apply"
    API_V1_STR: str = "/api/v1"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SECRET_KEY: str = secrets.token_urlsafe(32)

    # github
    GITHUB_API_TOKEN: str

    # postgres
    POSTGRES_USER: str = "till"
    POSTGRES_PASSWORD: Optional[str] = None
    POSTGRES_DB: str = "virdx_challenge"
    POSTGRES_PORT: str = "5432"
    POSTGRES_HOST: str = "127.0.0.1"

    @property
    def postgres_url(self):
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"


settings = Settings()
