# Glossary

> **Last Updated:** 2026-07-22

---

## 1. Product Terms

| Term | Definition |
|------|-----------|
| **PEHCHAAN** | The product name. Always capitalised. Means "identity" in Hindi. |
| **ABHIMANYU** | The team name. |
| **TetraTHON 2026** | The hackathon -- Indo-French AI Innovation Sprint. |
| **UNDERSTAND -> IMPROVE -> GROW** | The three-phase unified product journey. |

---

## 2. Core Concepts

| Term | Definition |
|------|-----------|
| **Credit Readiness Score** | PEHCHAAN's primary output -- a model-generated indicator (0-100) based on alternative financial behaviour signals. **Not** an official credit bureau score. |
| **Financial Readiness Score** | Alternative name for Credit Readiness Score. Acceptable in user-facing contexts. |
| **Credit-Likelihood Indicator** | Technical/documentation reference for the Credit Readiness Score. |
| **Risk Bucket** | Classification derived from the Credit Readiness Score: Low (0-40), Medium (41-70), High (71-100). Refers to readiness level, not investment risk. |
| **Credit-Invisible** | A person with no traditional credit history (no loans, credit cards, or credit bureau record). |
| **Alternative Financial Signals** | Non-traditional data points (recharge patterns, utility payments, e-commerce activity) used instead of traditional credit history. |
| **Behavioural Features** | The specific financial behaviour data points collected from users (e.g., recharge frequency, utility payment regularity). |

---

## 3. Module Names

| Term | Definition |
|------|-----------|
| **Financial Behaviour Profile** | The data input module where users provide their financial behaviour signals. |
| **Credit Readiness Intelligence** | The module that produces the Credit Readiness Score from behavioural inputs. |
| **Explainability Experience** | The module that explains WHY the user received their score, in plain language. |
| **Improvement Pathway** | The module showing prioritised actionable recommendations to improve readiness. |
| **What-If Financial Simulator** | The module allowing users to modify behavioural variables and see simulated score changes. |
| **Investment Risk Assessment** | The 7-question conversational questionnaire that determines investment risk appetite. |
| **Educational Micro-Investment Guidance** | The module showing educational allocation across broad instrument categories. |
| **Growth Simulator** | The module visualising simulated investment growth over 1-5 years with three scenarios. |
| **Financial Journey** | The cross-cutting concept tracking progress through UNDERSTAND -> IMPROVE -> GROW. |

---

## 4. Investment Terms

| Term | Definition |
|------|-----------|
| **Risk Profile** | The user's investment risk appetite classification: Conservative, Moderate, or Aggressive. |
| **Educational Allocation** | A suggested distribution of monthly investment across broad instrument categories. For educational purposes only. |
| **Growth Scenarios** | Three projections -- Conservative, Expected, Optimistic -- using different assumed annual return rates. |
| **Instrument Categories** | Broad types: Cash & Liquid, Fixed-Income, Balanced/Hybrid, Diversified Market-Linked. Never specific securities. |
| **Monthly Contribution** | The amount the user would invest per month in a simulation (INR 500 - INR 5,000). |

---

## 5. Technical Terms

| Term | Definition |
|------|-----------|
| **Service Abstraction** | An interface-based pattern where UI components consume data through services that can be swapped between mock and real API implementations. |
| **Mock Service** | A service implementation that returns predefined data instead of making real API calls. Used in the pre-screening prototype. |
| **Design Tokens** | Named values for colours, typography, spacing, and other visual properties that ensure design consistency. |
| **SHAP** | SHapley Additive exPlanations -- a method for explaining individual ML predictions. Used for technical explainability (not shown to end users). |
| **Feature Importance** | The degree to which a specific input feature influences the model's prediction. Translated into plain-language factor explanations for users. |
| **Deterministic Mock** | A mock data system where specific inputs always produce the same predefined outputs. No randomness. |

---

## 6. Terms to AVOID

| Do Not Use | Use Instead | Reason |
|--------------|---------------|--------|
| CIBIL Score | Credit Readiness Score | Trademarked; implies official bureau |
| Credit Score (unqualified) | Credit Readiness Score | Implies regulated scoring |
| Official Score | Readiness Score / Readiness Indicator | Misrepresents prototype nature |
| Investment Advice | Educational Investment Guidance | Regulatory distinction |
| Guaranteed Returns | Simulated / Projected Growth | No investment return is guaranteed |
| Risk-Free | Lower-Risk | Nothing is risk-free |
| AI-Powered (for mock features) | -- | Misrepresents mock data as real AI |

---

## 7. Abbreviations

| Abbreviation | Full Form |
|-------------|-----------|
| ADR | Architectural Decision Record |
| CTA | Call to Action |
| INR / Rs | Indian Rupee |
| JWT | JSON Web Token |
| ML | Machine Learning |
| MVP | Minimum Viable Product |
| SIP | Systematic Investment Plan |
| UX | User Experience |
| WCAG | Web Content Accessibility Guidelines |
