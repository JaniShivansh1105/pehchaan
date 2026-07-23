from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, JSON, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.user import generate_uuid, utc_now

class ImprovementAction(Base):
    __tablename__ = "improvement_actions"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    related_factor_id = Column(String, nullable=True) # Could map to ReadinessFactor factor_identifier
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    priority = Column(String, nullable=False) # 'High', 'Medium', 'Low'
    status = Column(String, nullable=False, default="Not Started") # 'Not Started', 'In Progress', 'Completed'
    potential_readiness_influence = Column(String, nullable=True) # e.g. "Up to +18 pts"
    is_primary = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), default=utc_now)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    user = relationship("User", back_populates="improvement_actions")

class WhatIfScenario(Base):
    __tablename__ = "what_if_scenarios"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    base_assessment_id = Column(String, ForeignKey("readiness_assessments.id", ondelete="CASCADE"), nullable=True)
    
    scenario_inputs = Column(JSON, nullable=False)
    projected_score = Column(Integer, nullable=False)
    projected_change = Column(Integer, nullable=False)
    
    created_at = Column(DateTime(timezone=True), default=utc_now)
    
    user = relationship("User", back_populates="simulations")

class ProgressMilestone(Base):
    __tablename__ = "progress_milestones"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, nullable=False) # 'score_increase', 'action_completed', 'habit_streak'
    icon = Column(String, nullable=True) # e.g., 'Trophy', 'TrendingUp'
    
    achieved_at = Column(DateTime(timezone=True), default=utc_now)
    
    user = relationship("User", back_populates="progress_milestones")
