from fastapi import APIRouter
from app.api.routes import health, users, readiness, improvements, consents, progress, simulator

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(users.router, prefix="/users", tags=["Users & Preferences"])
api_router.include_router(readiness.router, tags=["Readiness & Factors"])
api_router.include_router(improvements.router, tags=["Improvement Actions"])
api_router.include_router(consents.router, prefix="/users", tags=["Consent"])
api_router.include_router(progress.router, prefix="/users", tags=["Progress"])
api_router.include_router(simulator.router, tags=["Simulation"])
