from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.readiness import ReadinessAssessment
from app.models.improvement import WhatIfScenario
from app.schemas import SimulationRequest, SimulationResponse
from app.models.user import utc_now

router = APIRouter()

@router.post("/users/{user_id}/simulations", response_model=SimulationResponse)
def run_simulation(user_id: str, sim_req: SimulationRequest, db: Session = Depends(get_db)):
    """
    Demo Simulator Service. 
    In the future this will call the ML model to run a what-if analysis.
    """
    latest_assessment = db.query(ReadinessAssessment).filter(
        ReadinessAssessment.user_id == user_id
    ).order_by(ReadinessAssessment.assessment_date.desc()).first()
    
    base_score = latest_assessment.score if latest_assessment else 700
    
    # Very simple deterministic logic for demo purposes
    change = 0
    if sim_req.scenario_id == "improve_payment":
        change = 26
    elif sim_req.scenario_id == "stable_savings":
        change = 18
    elif sim_req.scenario_id == "missed_payment":
        change = -35
    elif "custom_change" in sim_req.inputs:
        change = int(sim_req.inputs["custom_change"])
        
    projected_score = base_score + change
    if projected_score > 900: projected_score = 900
    if projected_score < 300: projected_score = 300
    
    simulation = WhatIfScenario(
        user_id=user_id,
        base_assessment_id=latest_assessment.id if latest_assessment else None,
        scenario_inputs={"scenario_id": sim_req.scenario_id, **sim_req.inputs},
        projected_score=projected_score,
        projected_change=change,
        created_at=utc_now()
    )
    
    db.add(simulation)
    db.commit()
    db.refresh(simulation)
    
    return simulation
