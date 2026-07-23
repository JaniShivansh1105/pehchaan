from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.consent import ConsentPreference
from app.schemas import ConsentResponse, ConsentUpdate

router = APIRouter()

@router.get("/{user_id}/consents", response_model=List[ConsentResponse])
def get_user_consents(user_id: str, db: Session = Depends(get_db)):
    consents = db.query(ConsentPreference).filter(
        ConsentPreference.user_id == user_id
    ).all()
    return consents

@router.patch("/{user_id}/consents/{consent_id}", response_model=ConsentResponse)
def update_user_consent(user_id: str, consent_id: str, consent_in: ConsentUpdate, db: Session = Depends(get_db)):
    consent = db.query(ConsentPreference).filter(
        ConsentPreference.id == consent_id,
        ConsentPreference.user_id == user_id
    ).first()
    
    if not consent:
        raise HTTPException(status_code=404, detail="Consent not found")
        
    if consent.is_enabled != consent_in.is_enabled:
        consent.is_enabled = consent_in.is_enabled
        from app.models.user import utc_now
        if consent_in.is_enabled:
            consent.granted_at = utc_now()
            consent.revoked_at = None
        else:
            consent.revoked_at = utc_now()
            
    db.commit()
    db.refresh(consent)
    return consent
