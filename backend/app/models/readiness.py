from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Float, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.user import generate_uuid, utc_now

class ReadinessAssessment(Base):
    __tablename__ = "readiness_assessments"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    score = Column(Integer, nullable=False)
    max_score = Column(Integer, nullable=False)
    status = Column(String, nullable=False) # e.g., 'Good', 'Needs Attention'
    recent_change = Column(Integer, nullable=True)
    
    model_version = Column(String, default="1.0.0")
    assessment_date = Column(DateTime(timezone=True), default=utc_now)
    
    user = relationship("User", back_populates="assessments")
    factors = relationship("ReadinessFactor", back_populates="assessment", cascade="all, delete-orphan")

class ReadinessFactor(Base):
    __tablename__ = "readiness_factors"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    assessment_id = Column(String, ForeignKey("readiness_assessments.id", ondelete="CASCADE"), nullable=False)
    
    factor_identifier = Column(String, nullable=False) # e.g., 'payment_consistency'
    factor_name = Column(String, nullable=False)
    impact_category = Column(String, nullable=False) # 'Positive', 'Needs Attention', 'Growth Opportunity'
    contribution_value = Column(Float, nullable=False) # SHAP value or impact magnitude
    
    explanation = Column(String, nullable=False)
    insight = Column(String, nullable=True)
    recommendation_link = Column(String, nullable=True) # ID mapping to an improvement action
    
    assessment = relationship("ReadinessAssessment", back_populates="factors")

class AlternativeFinancialSignal(Base):
    __tablename__ = "alternative_financial_signals"
    
    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    signal_type = Column(String, nullable=False) # e.g., 'utility_payment', 'mobile_recharge'
    value = Column(Float, nullable=False)
    observation_period = Column(String, nullable=False) # e.g., '30d', '90d'
    source_category = Column(String, nullable=False)
    
    recorded_timestamp = Column(DateTime(timezone=True), default=utc_now)
