# Product Requirements

> **Last Updated:** 2026-07-22

---

## 1. Product Modules Overview

PEHCHAAN comprises 12 interconnected modules forming the UNDERSTAND -> IMPROVE -> GROW journey.

| # | Module | Journey Phase | Requirement Type |
|---|--------|--------------|------------------|
| 01 | Public Experience | Entry | Functional |
| 02 | User Onboarding | Entry | Functional |
| 03 | Main Dashboard | UNDERSTAND | Functional |
| 04 | Financial Behaviour Profile | UNDERSTAND | Functional |
| 05 | Credit Readiness Intelligence | UNDERSTAND | Core / ML |
| 06 | Explainability Experience | UNDERSTAND | Core / ML |
| 07 | Improvement Pathway | IMPROVE | Functional |
| 08 | What-If Financial Simulator | IMPROVE | Core / Simulation |
| 09 | Investment Risk Assessment | GROW | Core / ML |
| 10 | Educational Micro-Investment Guidance | GROW | Core / Educational |
| 11 | Growth Simulator | GROW | Core / Simulation |
| 12 | Financial Journey | Cross-cutting | UX Integration |

---

## 2. Functional Requirements

### FR-01: Alternative Credit Readiness Assessment
*Requirement Source: Official TetraTHON problem statement*

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01.1 | Accept non-traditional financial behaviour inputs (e.g., recharge, utility, e-commerce) | P0 |
| FR-01.2 | Produce a Credit Readiness Score on a 0-100 scale | P0 |
| FR-01.3 | Classify into Low / Medium / High risk buckets | P0 |
| FR-01.4 | Display top-three influencing factors with plain-language explanations | P0 |
| FR-01.5 | Generate prioritised improvement recommendations | P0 |
| FR-01.6 | Support What-If simulation with behavioural variable modification | P0 |
| FR-01.7 | Display confidence/uncertainty indication | P1 |

### FR-02: Investment Risk Assessment
*Requirement Source: Official TetraTHON problem statement*

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-02.1 | Conduct 5-8 question conversational risk assessment | P0 |
| FR-02.2 | Identify investment risk appetite (Conservative / Moderate / Aggressive) | P0 |
| FR-02.3 | Map risk profile to broad investment instrument categories | P0 |
| FR-02.4 | Present plain-language educational micro-investment allocation | P0 |
| FR-02.5 | Support INR 500-5,000 monthly investment scenarios | P0 |
| FR-02.6 | Visualise simulated growth over 1-5 years | P0 |
| FR-02.7 | Present Conservative / Expected / Optimistic scenarios | P0 |
| FR-02.8 | Display educational disclaimer prominently | P0 |

### FR-03: Integration & Journey
*Requirement Source: Official TetraTHON problem statement*

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-03.1 | Credit readiness and investment guidance feel like one connected journey | P0 |
| FR-03.2 | Dashboard provides unified overview of all journey phases | P0 |
| FR-03.3 | UNDERSTAND -> IMPROVE -> GROW progression is visible throughout | P1 |
| FR-03.4 | At least 10 sample profiles across risk categories are demonstrable | P0 |

### FR-04: User Management
*Requirement Source: PEHCHAAN Product Decision*

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-04.1 | Account creation flow (mocked for pre-screening) | P0 |
| FR-04.2 | Sign-in flow (mocked for pre-screening) | P0 |
| FR-04.3 | User onboarding collecting minimal meaningful information | P0 |
| FR-04.4 | Consent and privacy communication during onboarding | P0 |

---

## 3. Non-Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-01 | Pure light theme; no dark mode or dark sections | P0 |
| NFR-02 | Responsive across mobile, tablet, laptop, desktop | P0 |
| NFR-03 | WCAG 2.1 AA minimum contrast ratios | P0 |
| NFR-04 | Keyboard navigable | P1 |
| NFR-05 | Semantic HTML throughout | P0 |
| NFR-06 | Page load under 3 seconds on standard connections | P1 |
| NFR-07 | No unnecessary subtitle text below titles in the product UI | P0 |
| NFR-08 | Mock-service abstraction layer for all data | P0 |
| NFR-09 | All financial disclaimers visible where required | P0 |
| NFR-10 | Reduced-motion support | P1 |

---

## 4. MVP Scope & Prioritisation

The pre-screening prototype adopts a **frontend-first** strategy. The goal is to build a visually complete, coherent prototype using deterministic mock data to demonstrate the full journey. The architecture must be ready for future real API integration, and mock data is never disguised as real AI output.

### Priority Definitions

| Priority | Definition |
|----------|-----------|
| **P0** | Essential screens and interactions required to demonstrate the complete product vision. The prototype is incomplete without these. |
| **P1** | Features that significantly improve demonstration quality but are not critical for the core experience. Should be built if time permits. |
| **P2** | Future capabilities, backend integrations, advanced AI, or secondary experiences. Must not block the first prototype. |

### Scope Protection Rules

1. **No feature creep:** If it is not on the P0 list, it does not block the prototype.
2. **Vertical over horizontal:** Complete the full journey for one mock profile before polishing individual modules.
3. **Working over perfect:** A functional end-to-end flow with basic styling is more valuable than a beautifully styled single page.
4. **Mock is fine:** Deterministic mock data is acceptable. Do not block on building real AI.
5. **Time-box P1:** If P0 is complete and time remains, select P1 items by impact-to-effort ratio.

### Current Phase Constraints

- **No real financial data:** All data is synthetic or user-simulated.
- **No regulated advice:** All investment outputs are educational.
- **No real authentication:** Auth is mocked for pre-screening.
- **No external API dependencies:** All functionality must be self-contained for the prototype.
- **Frontend-first focus:** The backend is planned but not implemented in this phase.

---

## 5. Assumptions

1. Evaluators will assess the prototype on a modern web browser (Chrome, Firefox, Edge, Safari).
2. Evaluators understand the distinction between prototype mock data and production systems.
3. The pre-screening phase evaluates product vision, UX quality, and technical architecture readiness -- not production AI performance.
4. Synthetic data is acceptable for demonstrating the product concept.
