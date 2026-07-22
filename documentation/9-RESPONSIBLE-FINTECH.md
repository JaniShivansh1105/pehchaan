# Responsible FinTech, Security & Privacy

---

## 1. Core Ethical Commitments

PEHCHAAN is designed to serve financially underserved users. This population may be more vulnerable to misleading financial claims, opaque scoring systems, and predatory nudges.

- **Transparency over performance:** An explainable model is more important than a marginally more accurate opaque one.
- **Honesty over polish:** Mock data is presented as mock data. Prototype indicators are presented as prototype indicators.
- **Empowerment over dependency:** The product helps users understand their own financial behaviour, not create reliance on a score.
- **Safety over engagement:** No dark patterns, urgency manipulation, or gamification of financial decisions.

---

## 2. No Official Credit Score Claims

PEHCHAAN's score is a **model-generated indicator based on alternative behavioural signals**. It must never be presented as, confused with, or implied to be:
- An official credit bureau score (CIBIL, Equifax, Experian, etc.)
- A regulated credit rating
- A score that affects real credit applications
- A score accepted by lending institutions

**Implementation:**
- Always label as "Credit Readiness Score", never "Credit Score".
- The score disclaimer is always visible on the result screen.
- Marketing copy never implies bureau equivalence.

---

## 3. User Consent & Data Minimisation

### User Consent
Before data is processed, users must know:
1. What data PEHCHAAN collects (financial behaviour signals only).
2. How the data is used (to generate an educational readiness indicator).
3. That the analysis is prototype/educational in nature.
4. That no data is shared with third parties.
5. That the Credit Readiness Score does not affect real credit applications.

### Data Minimisation
Collect only what is genuinely needed.
- **Excluded Data:** Aadhaar number, PAN number, bank account details, exact income amounts, real financial account credentials, phone number, physical address.
- **Included Data:** Display name, age range, city tier, employment type, income range, financial behaviour inputs.

---

## 4. Explainability & Simulation Uncertainty

### Explainability
Every score must be accompanied by the top-3 contributing factors in plain language, their direction (positive/limiting), and actionable interpretations. SHAP charts and technical explanations are never shown to regular users.

### Simulation Uncertainty
All simulations (What-If and Growth) must communicate that results are estimates based on model assumptions, not guaranteed outcomes.
- Use phrasing like: "The model estimates...", "This simulation suggests...", "Projected growth (simulated)".
- Avoid phrasing like: "You will...", "This guarantees...", "Expected returns".

---

## 5. Model Fairness

The following variables must **never** be used as credit-scoring features:
- **Protected demographics:** Age (exact), gender, religion, caste, ethnicity.
- **Geographic specifics:** Exact address, PIN code.
- **Social network signals:** Number of contacts, social media activity.
- **Device type/brand:** Phone brand, OS version.
- **Communication patterns:** Call frequency, messaging behaviour.

**Acceptable Features:** Only observable financial behaviours (payment timing, transaction frequency, digital financial engagement breadth, duration of consistent activity).

---

## 6. Disclaimers

### Credit Readiness
> "This Credit Readiness Score is a model-generated indicator based on alternative behavioural signals. It is not an official credit bureau score and does not affect real credit applications."

### Improvement Pathway
> "These recommendations are based on model analysis of behavioural patterns. Completing these actions does not guarantee an improvement in any official credit score."

### Simulator
> "This is a model-based simulation. The estimated changes are illustrative and do not represent guaranteed real-world outcomes."

### Investment Guidance
> "For educational purposes only. This does not constitute regulated financial or investment advice. Consult a registered financial advisor before making investment decisions."

### Growth Simulation
> "These projections are educational simulations based on assumed return rates. Actual investment returns vary and are subject to market risk. Past performance does not guarantee future results."
> "The assumed return rates are illustrative and do not represent any specific investment product."

---

## 7. Pre-Screening Prototype Security

PEHCHAAN is a prototype demonstrated in a hackathon context. It does not process real financial data or connect to real banking systems.

### Current Implementation
- **Authentication:** Mocked. Any valid-format input succeeds.
- **Session Management:** Frontend state only (React Context).
- **Data Persistence:** In-memory frontend state; lost on page refresh.
- **Data Transmission:** No real sensitive data transmitted; HTTPS enforced in production deployment.
- **Frontend Practices:** Zod schemas validate form inputs; default React JSX escaping prevents XSS; sensitive future configurations stored in `.env.local`.

### Future State
- **Authentication:** OAuth 2.0 / JWT-based authentication with hashed passwords (bcrypt/argon2).
- **Data Storage:** Encrypted database storage for user data, financial behaviour, and sessions.
- **Data Transmission:** TLS 1.2+ for all communications.
- **Security Considerations:** Rate limiting for ML endpoints, strict CORS, automated dependency vulnerability scanning, and robust Pydantic input sanitisation.
