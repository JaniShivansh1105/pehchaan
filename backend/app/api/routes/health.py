from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def check_health():
    return {
        "status": "ok",
        "service": "PEHCHAAN API"
    }
