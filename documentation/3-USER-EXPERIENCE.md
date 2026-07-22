# User Experience

> **Last Updated:** 2026-07-22

---

## 1. Target Personas

PEHCHAAN targets users who participate in the digital economy but lack a formal credit history or investment framework. These personas are representative archetypes guiding the user experience design.

### Persona A: Priya -- The Credit-Invisible Young Professional
- **Demographic:** 24, Tier-1/2 city, stable salary.
- **Background:** No traditional credit history, uses UPI, pays bills online, and shops on e-commerce.
- **Pain Point:** Invisible to the credit system; unable to get a credit card despite consistent digital financial behaviour. Intimidated by financial jargon.
- **PEHCHAAN Journey:** Inputs her recharge and utility patterns to discover she has a "Medium" readiness score. Learns that her consistent behaviour is a positive signal and explores small monthly investments through the growth simulator.
- **Expected Outcome:** Feels seen by the financial system and understands how to improve her standing.

### Persona B: Rahul -- The First-Time Micro-Investor
- **Demographic:** 29, Tier-2 city, stable salary, basic credit history (repaid loan).
- **Background:** Has savings but overwhelmed by investment choices and fear of loss.
- **Pain Point:** Free advice feels unreliable; professional advisors cater to the wealthy. Doesn't know his risk tolerance or if small amounts matter.
- **PEHCHAAN Journey:** Achieves a "Medium-High" readiness score. Uses the Investment Risk Assessment to discover a "Moderate" risk profile and views educational allocations for INR 2,000/month.
- **Expected Outcome:** Gains a framework for risk and realistic expectations for small-ticket investments.

### Persona C: Meena -- The Financially Underserved Learner
- **Demographic:** 35, Tier-3 town, irregular self-employed income.
- **Background:** Minimal digital footprint beyond prepaid recharges and utility payments (sometimes late).
- **Pain Point:** Complete credit invisibility and anxiety over irregular income. Financial terms feel alien.
- **PEHCHAAN Journey:** Discovers a "Low-Medium" readiness score due to irregular payments. Receives actionable steps to improve (e.g., "Pay electricity bill within 7 days of due date").
- **Expected Outcome:** Learns that her financial behaviour matters and has clear, achievable improvement steps.

---

## 2. Core User Flows

The user experience is structured around the `UNDERSTAND -> IMPROVE -> GROW` progression. 

### First-Time User Flow

1. **Public Experience:** User arrives at the Landing Page (`/`), clicks "Create Account" (`/create-account`), and completes the mocked authentication.
2. **Onboarding (`/onboarding`):** User provides basic information, financial context, and agrees to privacy terms.
3. **Dashboard (`/dashboard`):** The central hub. A guided prompt directs the new user to start the journey.
4. **UNDERSTAND:**
   - User inputs data in the Financial Behaviour Profile (`/financial-profile`).
   - Views the Credit Readiness Result (`/credit-readiness`) with score, risk bucket, and top factors.
   - Explores the Explainability breakdown (`/credit-readiness/explain`).
5. **IMPROVE:**
   - Reviews the Improvement Pathway (`/improvement`) for actionable steps.
   - Uses the What-If Simulator (`/simulator`) to experiment with behavioural changes.
6. **GROW:**
   - Completes the Investment Risk Assessment (`/investment/assessment`).
   - Reviews the Educational Investment Guidance (`/investment/guidance`).
   - Experiments with the Growth Simulator (`/investment/growth`).
7. **Completion:** Returns to the Dashboard, which now displays a complete journey overview.

### Returning User & Incomplete Flows

- **Returning Users:** Authenticate via Sign In (`/sign-in`) and land on a populated Dashboard. Users can navigate directly to any module without a forced re-flow.
- **Incomplete Profiles:** If a user stops midway, the Dashboard presents contextual prompts (e.g., "View your Credit Readiness" or "Simulate your growth"). Empty states are designed to be helpful, never nagging or negative.

---

## 3. Screen Architecture & Navigation

### Navigation Patterns
- **Desktop/Laptop:** Persistent sidebar or top navigation.
- **Tablet:** Collapsible sidebar or top navigation.
- **Mobile:** Bottom tab bar or hamburger menu.
- **Route Protection:** In the pre-screening prototype, routes are protected by frontend state. Public routes include `/`, `/sign-in`, and `/create-account`. The dashboard and feature modules require completion of the mocked auth flow.

### Global Error States
- **Page Not Found (`/*`):** Friendly 404 with navigation back to the dashboard.
- **Form Validation:** Inline field-level errors; no full-page error screens.
- **Data Loading:** Retry option with a brief explanation.

### Screen Inventory Summary

| Route | Purpose | Key Components |
|-------|---------|----------------|
| `/` | Landing Page | Hero section, 3-step journey, trust/disclaimer section |
| `/sign-in` & `/create-account` | Public Auth | Form fields, submit buttons (mocked authentication) |
| `/onboarding` | Data Collection | 3-step form, progress indicator, consent checkbox |
| `/dashboard` | Hub | Score summary, priority improvement, journey progress |
| `/financial-profile` | Input Behaviour | Grouped inputs (recharge, utility), load sample profile |
| `/credit-readiness` | Results | Score gauge, risk badge, top-3 factors |
| `/credit-readiness/explain` | Deep Dive | Positive/limiting factors, expandable details |
| `/improvement` | Recommendations | Actionable cards, simulation links |
| `/simulator` | What-If | Variable sliders, before/after comparison |
| `/investment/assessment` | Risk Profiling | 5-8 conversational questions, progress indicator |
| `/investment/guidance` | Allocation | Risk badge, allocation chart, category breakdown |
| `/investment/growth` | Projections | Contribution slider, 3-scenario line chart, summary table |
