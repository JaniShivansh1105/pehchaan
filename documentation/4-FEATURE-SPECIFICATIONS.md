# Feature Specifications

> **Last Updated:** 2026-07-22

---

## Module 01 — Public Experience

### Purpose
Introduce PEHCHAAN, communicate the problem and solution, and guide users toward account creation or sign-in.

### Screens
- **Landing Page:** 
  - **Hero Section:** Core message focusing on financial behaviour as financial identity. Single CTA: "Get Started."
  - **Value Proposition:** Brief explanation of the UNDERSTAND -> IMPROVE -> GROW journey.
  - **How It Works:** 3-step visual summary.
  - **Trust Signals:** Educational disclaimer, responsible-use commitment.
- **Sign In & Create Account:** 
  - **Fields:** Name, Email, Password, Confirm Password (mocked for pre-screening).
  - **Design:** Clean, minimal. No unnecessary subtitles below the main headings.

### Pre-Screening State
Authentication is fully mocked. No real user management exists in this phase. Successful submission always proceeds to onboarding. Mocked auth uses a service abstraction so real authentication can be seamlessly integrated later.

---

## Module 02 — User Onboarding

### Purpose
Collect minimal meaningful information to personalise the experience and establish trust through transparent data usage.

### Flow
1. **Basic Information:** Display name, Age range (18-24, 25-34, 35-44, 45+), City tier. All required.
2. **Financial Context:** Employment type (required), Monthly income range (optional), Existing loans or credit cards (optional).
3. **Consent & Privacy:** Clear, plain-language statement on data usage. Required checkbox confirming understanding that this is an educational prototype.

*Note: PEHCHAAN does not collect Aadhaar, PAN, government IDs, exact income amounts, or real financial account credentials.*

---

## Module 03 — Main Dashboard

### Purpose
Unified overview of the user's entire PEHCHAAN journey.

### Information Architecture
- **Credit Readiness Summary:** Score, risk bucket badge, one-line positive signal (visible if behaviour data exists).
- **Priority Improvement:** Single highest-priority recommendation with an action link (visible if credit result exists).
- **Investment Profile Summary:** Risk profile badge, monthly investment preference (visible if risk assessment complete).
- **Journey Progress:** Visual indicator of the UNDERSTAND -> IMPROVE -> GROW completion.
- **Quick Actions:** Contextual CTAs based on journey state.

*Design Note: The dashboard must not be an overcrowded card collection. Empty states show a single helpful prompt.*

---

## Module 04 — Financial Behaviour Profile

### Purpose
Allow users to provide or simulate their alternative financial behaviour signals, powering the credit readiness analysis.

### Input Fields
- **Recharge Behaviour:** Average recharges per month, average recharge amount (INR), and recharge consistency.
- **Utility Payment Behaviour:** Percentage of bills paid on time, number of utility types paid digitally, and average monthly spend.
- **E-Commerce Behaviour:** Average online orders per month, average order value, and return rate.
- **Transaction Consistency:** Digital transaction regularity and months of consistent digital activity.

*Pre-Screening State: Real-time preview indicates the number of signals ready for analysis. "Analyse My Behaviour" triggers a deterministic mock profile mapping.*

---

## Module 05 — Credit Readiness Intelligence

### Purpose
Transform financial behaviour signals into an interpretable Credit Readiness Score with risk classification.

### Outputs
- **Credit Readiness Score:** Integer, 0-100 scale, visualised with a circular/radial gauge.
- **Risk Classification:** Low (0-40, `--color-risk-high`), Medium (41-70, `--color-risk-medium`), High Readiness (71-100, `--color-risk-low`).
- **Top 3 Influencing Factors:** Ordered list with direction (positive/negative).

### Required Disclaimer
> "This Credit Readiness Score is a model-generated indicator based on alternative behavioural signals. It is not an official credit bureau score and does not affect real credit applications."

*Pre-Screening State: Uses deterministic mock profiles. No ML computation occurs in the frontend prototype.*

---

## Module 06 — Explainability Experience

### Purpose
Help the user understand why they received their score using plain language.

### Information Hierarchy
1. **Top 3 Contributing Factors:** Ordered by influence.
2. **Positive Factors:** Behaviours contributing positively.
3. **Limiting Factors:** Behaviours holding the score back (shown with an improvement visual indicator).
4. **Factor Details:** Expandable sections detailing what the factor measures, current value, target value, and overall impact.

*Design Note: No SHAP charts for end users. Plain language only.*

---

## Module 07 — Improvement Pathway

### Purpose
Provide prioritised, actionable recommendations to improve financial readiness.

### Recommendation Structure
Each recommendation includes a clear action statement, current state, suggested behaviour, potential qualitative impact (High/Medium/Low), and a link to simulate the effect.

### Required Disclaimer
> "These recommendations are based on model analysis of behavioural patterns. Completing these actions does not guarantee an improvement in any official credit score."

---

## Module 08 — What-If Financial Simulator

### Purpose
Allow users to modify behavioural variables and compare current versus simulated readiness.

### UX Flow
1. Current values pre-populated from the Financial Behaviour Profile.
2. User adjusts variables (e.g., utility payment regularity, recharge consistency) via sliders.
3. "Simulate" triggers recalculation.
4. Side-by-side comparison displays changes in Score, Risk Bucket, and specific factors.

### Required Disclaimer
> "This is a model-based simulation. The estimated changes are illustrative and do not represent guaranteed real-world outcomes."

---

## Module 09 — Investment Risk Assessment

### Purpose
Conversational 5-8 question assessment to identify the user's investment risk appetite.

### Assessment & Scoring
Questions cover investment horizon, income stability, emergency preparedness, loss tolerance, investment experience, financial goals, and commitment capacity.
- **Score Range:** 7-28
- **Risk Profiles:** Conservative (7-13), Moderate (14-20), Aggressive (21-28).

---

## Module 10 — Educational Micro-Investment Guidance

### Purpose
Provide a plain-language educational allocation across broad instrument categories based on the risk profile.

### Instrument Categories
- **Cash & Liquid Instruments:** Very Low Risk
- **Fixed-Income Instruments:** Low Risk
- **Balanced / Hybrid Instruments:** Medium Risk
- **Diversified Market-Linked Instruments:** Higher Risk

### Display Format
- Visual allocation chart (donut/horizontal bar).
- Monthly amount input (INR 500-5,000) showing dynamic rupee amounts per category.

### Required Disclaimer
> "For educational purposes only. This does not constitute regulated financial or investment advice. Consult a registered financial advisor before making investment decisions."

---

## Module 11 — Growth Simulator

### Purpose
Visualise simulated investment growth over time using three scenarios.

### Inputs & Parameters
- **Inputs:** Monthly contribution (INR 500-5,000), investment duration (1-5 years).
- **Scenarios:** Conservative, Expected, Optimistic (using distinct educational return rate assumptions per risk profile).

### Output Visualisation
- Line chart showing three growth curves.
- Summary table showing final projected values.

### Required Disclaimers
> "These projections are educational simulations based on assumed return rates. Actual investment returns vary and are subject to market risk. Past performance does not guarantee future results."

---

## Module 12 — Financial Journey

### Purpose
Provide a unified sense of progression through the UNDERSTAND -> IMPROVE -> GROW journey.

### Implementation
- Subtle phase labelling on navigation items.
- Contextual "next step" prompts at module completion.
- Dashboard celebration upon journey completion.
- Users navigate freely; the indicator reflects exploration without gating content.
