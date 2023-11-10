from fastapi import APIRouter

from app.api.api_v1.endpoints import applicants

api_router = APIRouter()
api_router.include_router(applicants.router, prefix="/applicants", tags=["github"])
