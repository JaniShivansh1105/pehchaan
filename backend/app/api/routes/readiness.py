from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.readiness import ReadinessAssessment, ReadinessFactor
from app.schemas import ReadinessResponse, ReadinessFactorResponse

router = APIRouter()

@router.get("/users/{user_id}/readiness/latest", response_model=ReadinessResponse)
def get_latest_readiness(user_id: str, db: Session = Depends(get_db)):
    assessment = db.query(ReadinessAssessment).filter(
        ReadinessAssessment.user_id == user_id
    ).order_by(ReadinessAssessment.assessment_date.desc()).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="No assessments found for this user")
    return assessment

@router.get("/users/{user_id}/readiness/history", response_model=List[ReadinessResponse])
def get_readiness_history(user_id: str, db: Session = Depends(get_db)):
    assessments = db.query(ReadinessAssessment).filter(
        ReadinessAssessment.user_id == user_id
    ).order_by(ReadinessAssessment.assessment_date.asc()).all()
    
    return assessments

@router.get("/assessments/{assessment_id}/factors", response_model=List[ReadinessFactorResponse])
def get_assessment_factors(assessment_id: str, db: Session = Depends(get_db)):
    factors = db.query(ReadinessFactor).filter(
        ReadinessFactor.assessment_id == assessment_id
    ).all()
    
    return factors
