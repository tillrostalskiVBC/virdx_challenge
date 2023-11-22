from fastapi import APIRouter

from app.api.api_v1.endpoints import applicants, login, users
from app.api.api_v1.endpoints import comments

api_router = APIRouter()
api_router.include_router(applicants.router, prefix="/applicants", tags=["github"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(comments.router, prefix="/comments", tags=["comments"])
