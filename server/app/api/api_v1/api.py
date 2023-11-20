from fastapi import APIRouter

from app.api.api_v1.endpoints import applicants
from app.api.api_v1.endpoints import login

api_router = APIRouter()
api_router.include_router(applicants.router, prefix="/applicants", tags=["github"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
