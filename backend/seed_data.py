import uuid
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.user import User, UserProfile, UserPreference
from app.models.consent import ConsentPreference
from app.models.readiness import ReadinessAssessment, ReadinessFactor
from app.models.improvement import ImprovementAction, ProgressMilestone

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == "demo@pehchaan.com").first()
        if existing_user:
            print("Demo user already exists. Skipping seed.")
            return

        print("Seeding demo user...")
        now = datetime.now(timezone.utc)
        
        user_id = str(uuid.uuid4())
        demo_user = User(
            id=user_id,
            full_name="Shivansh",
            email="demo@pehchaan.com",
            phone="+91 98765 43210"
        )
        db.add(demo_user)
        
        profile = UserProfile(user_id=user_id, occupation="Gig Worker", income_bracket="INR 15,000 - 30,000")
        db.add(profile)
        
        pref = UserPreference(user_id=user_id, notifications_enabled=True, language="en")
        db.add(pref)
        
        # Consents
        for cat in ["utility", "recharge", "spending"]:
            consent = ConsentPreference(user_id=user_id, consent_category=cat, is_enabled=True, granted_at=now)
            db.add(consent)
            
        # Readiness Assessments History (Past 6 months)
        scores = [618, 645, 662, 701, 724, 742]
        months_ago = 5
        latest_assessment_id = None
        
        for i, score in enumerate(scores):
            assessment_id = str(uuid.uuid4())
            if i == len(scores) - 1:
                latest_assessment_id = assessment_id
                
            assessment = ReadinessAssessment(
                id=assessment_id,
                user_id=user_id,
                score=score,
                max_score=900,
                status="Good" if score >= 700 else "Needs Attention",
                recent_change=score - scores[i-1] if i > 0 else 0,
                model_version="1.0.0",
                assessment_date=now - timedelta(days=30 * months_ago)
            )
            db.add(assessment)
            months_ago -= 1
            
        # Key Factors for Latest Assessment
        factors_data = [
            ("payment_consistency", "Payment Consistency", "Positive Impact", 15.5, "Regular on-time utility payments are strengthening your readiness.", "You have paid 100% of your tracked utility bills on time for the last 6 months.", "utility-autopay"),
            ("recharge_regularity", "Recharge Regularity", "Positive Impact", 8.2, "Your recharge pattern shows consistent financial behaviour.", "Consistent monthly mobile recharges indicate a stable cash flow pattern.", "postpaid-upgrade"),
            ("spending_stability", "Spending Stability", "Needs Attention", -12.4, "Monthly spending variation is decreasing.", "Your discretionary spending varied by 20% over the last 3 months, which is slightly high.", "stable-savings"),
            ("credit_history", "Credit History Depth", "Growth Opportunity", 0.0, "Limited formal credit activity is currently restricting your profile.", "You have no formal loans or credit cards active right now.", "secured-credit")
        ]
        
        for fid, fname, cat, val, exp, ins, ref in factors_data:
            factor = ReadinessFactor(
                assessment_id=latest_assessment_id,
                factor_identifier=fid,
                factor_name=fname,
                impact_category=cat,
                contribution_value=val,
                explanation=exp,
                insight=ins,
                recommendation_link=ref
            )
            db.add(factor)
            
        # Improvement Actions
        actions_data = [
            ("stable-savings", "Build a Stable Savings Pattern", "Consistent savings, even small amounts, demonstrate financial discipline and liquidity buffer.", "High", "Not Started", "Up to +18 pts", True),
            ("spending_control", "Reduce Spending Volatility", "Highly variable spending suggests unpredictable financial management.", "Low", "In Progress", "Up to +12 pts", False)
        ]
        
        for ref, title, desc, pri, stat, inf, prim in actions_data:
            action = ImprovementAction(
                user_id=user_id,
                related_factor_id=ref,
                title=title,
                description=desc,
                priority=pri,
                status=stat,
                potential_readiness_influence=inf,
                is_primary=prim
            )
            db.add(action)
            
        db.commit()
        print("Demo user seeded successfully.")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
