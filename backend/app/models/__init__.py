from app.core.database import Base
from app.models.user import User, UserProfile, UserPreference
from app.models.consent import ConsentPreference
from app.models.readiness import ReadinessAssessment, ReadinessFactor, AlternativeFinancialSignal
from app.models.improvement import ImprovementAction, WhatIfScenario, ProgressMilestone

# This file ensures all models are imported so Alembic can discover them.
