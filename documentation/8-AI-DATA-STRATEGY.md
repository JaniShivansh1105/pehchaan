# AI and Data Strategy

---

## 1. Principles & Limitations

1. **Synthetic Data Only:** The pre-screening prototype uses synthetic data exclusively. No real user financial data is collected or processed.
2. **Plausibility vs Reality:** Synthetic data encodes plausible relationships between financial behaviours and credit readiness but does NOT represent real lending outcomes. The model cannot be validated against real ground truth.
3. **No Protected Attributes:** The feature set strictly excludes age, gender, religion, caste, ethnicity, and location to ensure baseline fairness.
4. **Mock Data Honesty:** Mock data is used to demonstrate the product experience but is never disguised as production AI. All limitations are explicitly documented.

---

## 2. ML Pipeline Overview (Planned)

```text
Synthetic Data Generation
    │
    ▼
Feature Engineering
    │
    ▼
Model Training (candidate comparison)
    │
    ▼
Model Evaluation & Selection
    │
    ▼
Explainability Integration (SHAP)
    │
    ▼
API Serving (FastAPI)
```

*Note: Investment risk classification uses a deterministic rules-based scoring formula and does not require ML.*

---

## 3. Data Dictionary & Feature Engineering

### Raw Input Features
| Feature | Type | Range | Description |
|---------|------|-------|-------------|
| `recharge_frequency_monthly` | Float | 0.0-4.0 | Average monthly recharges |
| `recharge_amount_avg` | Float | 0-2000 | Average recharge transaction value (INR) |
| `recharge_consistency` | Ordinal | 1-4 | Timing consistency (1=Irregular to 4=Regular) |
| `utility_payment_regularity` | Float | 0-100 | % of bills paid on or before due date |
| `utility_types_count` | Integer | 0-5 | Number of distinct utility categories paid digitally |
| `utility_avg_monthly` | Float | 0-10000 | Mean monthly utility spend (INR) |
| `ecommerce_orders_monthly` | Float | 0-20 | Average monthly online orders |
| `ecommerce_avg_order_value` | Float | 0-10000 | Mean e-commerce order value (INR) |
| `ecommerce_return_rate` | Ordinal | 1-3 | Return/cancellation frequency (1=Rarely to 3=Often) |
| `transaction_regularity` | Ordinal | 1-4 | Digital transaction frequency |
| `months_of_digital_activity` | Integer | 0-60 | Track record duration in months |

### Target Variables
- `credit_readiness_score`: Float (0-100)
- `risk_bucket`: Categorical (Low [0-40], Medium [41-70], High [71-100])

### Feature Normalisation
All features will be normalised to a 0-1 range using Min-Max scaling prior to model input.

---

## 4. Synthetic Data Generation Strategy

Synthetic profiles are generated using controlled distributions (e.g., normal, log-normal, beta, poisson) to encode expected behavioural relationships. 

**Conceptual Formula:**  
`score = w1×payment_discipline + w2×digital_engagement + w3×stability + w4×maturity + noise`

**Dataset Size:**
- 1,000-5,000 profiles for model training.
- 10-15 curated mock profiles for frontend demonstration.

---

## 5. Model Candidate Selection

The following models will be evaluated using 5-fold cross-validation on the synthetic dataset. The model that best balances interpretability and performance will be selected.

1. **Logistic Regression:** Excellent interpretability, stable, provides a transparent baseline.
2. **Random Forest:** Strong performance, good interpretability via feature importances.
3. **Gradient Boosting (XGBoost):** Highest performance, but requires SHAP for explainability and careful tuning.

**Selection Criteria Weights:**
- **High:** Interpretability (core requirement), Fairness.
- **Medium:** Predictive performance, Stability, Suitability for synthetic data.

---

## 6. Explainability & Simulation

### Explainability (SHAP)
- **Technical:** Use `shap` (TreeExplainer or LinearExplainer) for local and global feature importance.
- **Translation Layer:** A configuration mapping converts technical SHAP values (e.g., `utility_payment_regularity = +0.23`) into plain-language explanations (e.g., "Your utility payment regularity is one of your strongest signals.").
- **User-Facing Output:** Top-N feature importances with directional indicators (positive/limiting) and magnitude. No SHAP charts for end users.

### What-If Simulation
1. User modifies features in the frontend.
2. Modified vector is sent to the model via API.
3. Model returns the new score and bucket.
4. Delta (simulated minus original) and changed factors are highlighted.

---

## 7. Mock Data Strategy (Pre-Screening Phase)

For the pre-screening prototype, the AI backend is planned but not implemented.

### Implementation Details
- **Deterministic Mocking:** Input data is matched to the closest pre-defined mock profile. The frontend returns static, predefined outputs (Score, Top Factors, Recommendations, and Simulation Pairs).
- **Service Abstraction:** The frontend consumes data via an `ICreditService` interface. The `MockCreditService` currently returns deterministic results, allowing seamless replacement with an `ApiCreditService` later.
- **Frontend-Only Computations:** Investment risk scoring and growth simulation formulas are deterministic and execute entirely on the frontend.
- **Mock Transparency:** The codebase isolates mock data in `src/data/` and mock services in `src/features/*/services/`. A UI badge indicating "Demo Data" is recommended for clarity.
