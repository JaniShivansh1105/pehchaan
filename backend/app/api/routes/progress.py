from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.improvement import ProgressMilestone
from app.schemas import ProgressMilestoneResponse

router = APIRouter()

@router.get("/{user_id}/progress", response_model=List[ProgressMilestoneResponse])
def get_user_progress(user_id: str, db: Session = Depends(get_db)):
    milestones = db.query(ProgressMilestone).filter(
        ProgressMilestone.user_id == user_id
    ).order_by(ProgressMilestone.achieved_at.desc()).all()
    return milestones
