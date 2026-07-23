from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User, UserProfile, UserPreference
from app.schemas import UserResponse, UserProfileResponse, UserProfileUpdate, PreferenceResponse, PreferenceUpdate

router = APIRouter()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/{user_id}/profile", response_model=UserProfileResponse)
def get_user_profile(user_id: str, db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.patch("/{user_id}/profile", response_model=UserProfileResponse)
def update_user_profile(user_id: str, profile_in: UserProfileUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    if profile_in.occupation is not None:
        profile.occupation = profile_in.occupation
    if profile_in.income_bracket is not None:
        profile.income_bracket = profile_in.income_bracket
        
    if profile_in.full_name is not None:
        user.full_name = profile_in.full_name
    if profile_in.email is not None:
        user.email = profile_in.email
    if profile_in.phone is not None:
        user.phone = profile_in.phone
        
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/{user_id}/preferences", response_model=PreferenceResponse)
def get_user_preferences(user_id: str, db: Session = Depends(get_db)):
    pref = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    if not pref:
        raise HTTPException(status_code=404, detail="Preferences not found")
    return pref

@router.patch("/{user_id}/preferences", response_model=PreferenceResponse)
def update_user_preferences(user_id: str, prefs_in: PreferenceUpdate, db: Session = Depends(get_db)):
    pref = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    if not pref:
        raise HTTPException(status_code=404, detail="Preferences not found")
        
    if prefs_in.notifications_enabled is not None:
        pref.notifications_enabled = prefs_in.notifications_enabled
    if prefs_in.language is not None:
        pref.language = prefs_in.language
        
    db.commit()
    db.refresh(pref)
    return pref
