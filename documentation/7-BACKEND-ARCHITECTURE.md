# Backend Architecture (Planned)

> **Last Updated:** 2026-07-22  
> **Status:** PLANNED -- not implemented in the pre-screening prototype.

---

## 1. Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Python 3.11+** | Primary backend language |
| **FastAPI** | Web framework (async, type-safe, auto-documented) |
| **Pydantic v2** | Data validation and serialisation |
| **Uvicorn** | ASGI server |
| **scikit-learn** | ML model training and inference |
| **SHAP** | Model explainability |
| **pandas / NumPy** | Data processing |
| **pytest** | Testing |

---

## 2. Project Structure (Future)

```text
backend/
├── app/
│   ├── main.py                   # FastAPI application entry
│   ├── config.py                 # Configuration and environment
│   ├── routers/
│   │   ├── credit.py             # Credit readiness endpoints
│   │   ├── simulation.py         # What-If simulation endpoints
│   │   ├── investment.py         # Investment risk and guidance endpoints
│   │   └── health.py             # Health check endpoint
│   ├── models/
│   │   ├── schemas.py            # Pydantic request/response models
│   │   └── ml_models.py          # ML model loading and inference
│   ├── services/
│   │   ├── credit_service.py     # Credit readiness business logic
│   │   ├── simulation_service.py # What-If simulation logic
│   │   ├── investment_service.py # Investment profiling logic
│   │   └── explainability.py     # SHAP/feature importance logic
│   ├── data/
│   │   ├── synthetic/            # Synthetic dataset files
│   │   └── profiles/             # Sample profile data
│   └── ml/
│       ├── training/             # Model training scripts
│       ├── evaluation/           # Model evaluation scripts
│       ├── artifacts/            # Trained model files (.joblib, .pkl)
│       └── feature_engineering.py
├── tests/
│   ├── test_credit.py
│   ├── test_simulation.py
│   └── test_investment.py
├── requirements.txt
└── README.md
```

---

## 3. Key Design Decisions

- **Stateless API:** The API is stateless. All required data is passed in requests. No server-side session management.
- **Model Serving:** ML models are loaded at application startup and held in memory. No external model-serving infrastructure for the prototype.
- **Validation:** All request/response validation routes through Pydantic schemas, rejecting malformed inputs before reaching business logic.
- **Exclusions:** This architecture does NOT include user authentication, persistent database storage, real-time data ingestion, payment processing, or regulatory compliance infrastructure.

---

## 4. API Contract Plan

These contracts define the interface between frontend service abstractions and the future FastAPI backend. They adhere to RESTful conventions, utilize JSON payloads, and maintain frontend-compatible shapes.

### 4.1 Credit Readiness
**`POST /api/credit/readiness`**  
Computes credit readiness from financial behaviour inputs.

*Request:*
```json
{
  "recharge_frequency_monthly": 1.5,
  "recharge_amount_avg": 399,
  "recharge_consistency": 3,
  "utility_payment_regularity": 78,
  "utility_types_count": 3,
  "ecommerce_orders_monthly": 4,
  "transaction_regularity": 3,
  "months_of_digital_activity": 12
}
```

*Response (200):*
```json
{
  "score": 72,
  "risk_bucket": "High",
  "confidence": "Based on 11 signals",
  "top_factors": [
    {
      "feature": "utility_payment_regularity",
      "label": "Utility Payment Regularity",
      "direction": "positive",
      "value": "78%",
      "explanation": "You pay most of your utility bills on time. This signals financial discipline.",
      "impact": "high"
    }
  ]
}
```

### 4.2 Detailed Explainability
**`POST /api/credit/explain`**  
Returns detailed SHAP-based feature explanations. (Request shape identical to `/api/credit/readiness`).

*Response (200):*
```json
{
  "positive_factors": [
    {
      "feature": "utility_payment_regularity",
      "label": "Utility Payment Regularity",
      "value": "78%",
      "explanation": "You pay most of your utility bills on time. This signals financial discipline.",
      "detail": "Paying bills before the due date is one of the strongest indicators of financial readiness.",
      "improvement_target": "90%+",
      "impact": "high"
    }
  ],
  "limiting_factors": [
    {
      "feature": "months_of_digital_activity",
      "label": "Digital Activity Duration",
      "value": "12 months",
      "explanation": "A longer track record of digital financial activity would strengthen your profile.",
      "detail": "Users with 18+ months of consistent digital activity typically show stronger readiness signals.",
      "improvement_target": "18+ months",
      "impact": "medium"
    }
  ]
}
```

### 4.3 Improvement Recommendations
**`POST /api/credit/recommendations`**  
Returns prioritised improvement actions. (Request shape identical to `/api/credit/readiness`).

*Response (200):*
```json
{
  "recommendations": [
    {
      "priority": 1,
      "title": "Improve Utility Payment Timing",
      "current_state": "78% on-time",
      "suggested_behaviour": "Pay utility bills before the due date consistently",
      "target_state": "90%+ on-time",
      "potential_impact": "high",
      "description": "Consistently paying bills before the due date is one of the most impactful changes you can make."
    }
  ]
}
```

### 4.4 What-If Simulation
**`POST /api/simulation/what-if`**  
Simulates the effect of behavioural changes.

*Request:*
```json
{
  "original": {
    "recharge_frequency_monthly": 1.5,
    "utility_payment_regularity": 78
  },
  "modified": {
    "utility_payment_regularity": 92
  }
}
```

*Response (200):*
```json
{
  "original_score": 72,
  "simulated_score": 77,
  "delta": 5,
  "original_bucket": "High",
  "simulated_bucket": "High",
  "changed_factors": [
    {
      "feature": "utility_payment_regularity",
      "original_value": "78%",
      "modified_value": "92%",
      "impact_on_score": "+5"
    }
  ]
}
```

### 4.5 Investment Risk Profile
**`POST /api/investment/profile`**  
Classifies investment risk based on assessment answers.

*Request:*
```json
{
  "answers": [
    { "question_id": 1, "answer_index": 2 },
    { "question_id": 2, "answer_index": 3 }
  ]
}
```

*Response (200):*
```json
{
  "total_score": 16,
  "risk_profile": "Moderate",
  "description": "You have a balanced approach to risk."
}
```

### 4.6 Investment Allocation
**`GET /api/investment/allocation/{risk_profile}`**  
Returns educational allocation. Accepts optional `monthly_amount` query parameter.

*Response (200):*
```json
{
  "risk_profile": "Moderate",
  "monthly_amount": 2000,
  "allocation": [
    { "category": "Cash & Liquid Instruments", "percentage": 15, "amount": 300 }
  ],
  "disclaimer": "For educational purposes only. This does not constitute regulated financial or investment advice."
}
```

### 4.7 Growth Simulation
**`POST /api/investment/growth`**  

*Request:*
```json
{
  "monthly_contribution": 2000,
  "duration_years": 3,
  "risk_profile": "moderate"
}
```

*Response (200):*
```json
{
  "monthly_contribution": 2000,
  "duration_years": 3,
  "total_invested": 72000,
  "scenarios": {
    "expected": {
      "annual_rate": 0.09,
      "projected_value": 82400,
      "growth": 10400
    }
  },
  "disclaimers": [
    "These projections are educational simulations based on assumed return rates."
  ]
}
```

### 4.8 Health Check
**`GET /api/health`**  

*Response (200):*
```json
{
  "status": "healthy",
  "version": "0.1.0"
}
```
