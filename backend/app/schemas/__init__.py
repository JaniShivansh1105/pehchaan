from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List, Dict, Any

class BaseSchema(BaseModel):
    class Config:
        from_attributes = True

# --- User & Profile ---
class UserProfileUpdate(BaseModel):
    occupation: Optional[str] = None
    income_bracket: Optional[str] = None
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class UserProfileResponse(BaseSchema):
    id: str
    user_id: str
    occupation: Optional[str]
    income_bracket: Optional[str]
    created_at: datetime
    updated_at: datetime

class UserResponse(BaseSchema):
    id: str
    full_name: str
    email: str
    phone: Optional[str]
    created_at: datetime
    updated_at: datetime

# --- Consents ---
class ConsentUpdate(BaseModel):
    is_enabled: bool

class ConsentResponse(BaseSchema):
    id: str
    user_id: str
    consent_category: str
    is_enabled: bool
    granted_at: datetime
    revoked_at: Optional[datetime]
    updated_at: datetime

# --- Preferences ---
class PreferenceUpdate(BaseModel):
    notifications_enabled: Optional[bool] = None
    language: Optional[str] = None

class PreferenceResponse(BaseSchema):
    id: str
    user_id: str
    notifications_enabled: bool
    language: str

# --- Readiness ---
class ReadinessFactorResponse(BaseSchema):
    id: str
    assessment_id: str
    factor_identifier: str
    factor_name: str
    impact_category: str
    contribution_value: float
    explanation: str
    insight: Optional[str]
    recommendation_link: Optional[str]

class ReadinessResponse(BaseSchema):
    id: str
    user_id: str
    score: int
    max_score: int
    status: str
    recent_change: Optional[int]
    model_version: str
    assessment_date: datetime
    factors: Optional[List[ReadinessFactorResponse]] = None

# --- Improvements ---
class ImprovementUpdate(BaseModel):
    status: str # 'Not Started', 'In Progress', 'Completed'

class ImprovementResponse(BaseSchema):
    id: str
    user_id: str
    related_factor_id: Optional[str]
    title: str
    description: str
    priority: str
    status: str
    potential_readiness_influence: Optional[str]
    is_primary: bool
    created_at: datetime
    completed_at: Optional[datetime]

# --- What-If Simulator ---
class SimulationRequest(BaseModel):
    scenario_id: str
    inputs: Dict[str, Any]

class SimulationResponse(BaseSchema):
    id: str
    user_id: str
    base_assessment_id: Optional[str]
    scenario_inputs: Dict[str, Any]
    projected_score: int
    projected_change: int
    created_at: datetime

# --- Progress ---
class ProgressMilestoneResponse(BaseSchema):
    id: str
    title: str
    description: Optional[str]
    category: str
    icon: Optional[str]
    achieved_at: datetime
