from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.improvement import ImprovementAction
from app.schemas import ImprovementResponse, ImprovementUpdate

router = APIRouter()

@router.get("/users/{user_id}/improvement-actions", response_model=List[ImprovementResponse])
def get_improvement_actions(user_id: str, db: Session = Depends(get_db)):
    actions = db.query(ImprovementAction).filter(
        ImprovementAction.user_id == user_id
    ).order_by(ImprovementAction.created_at.desc()).all()
    
    return actions

@router.patch("/improvement-actions/{action_id}", response_model=ImprovementResponse)
def update_improvement_action(action_id: str, action_in: ImprovementUpdate, db: Session = Depends(get_db)):
    action = db.query(ImprovementAction).filter(ImprovementAction.id == action_id).first()
    if not action:
        raise HTTPException(status_code=404, detail="Improvement action not found")
        
    valid_statuses = ["Not Started", "In Progress", "Completed"]
    if action_in.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
        
    action.status = action_in.status
    if action_in.status == "Completed":
        from app.models.user import utc_now
        action.completed_at = utc_now()
        
    db.commit()
    db.refresh(action)
    return action
