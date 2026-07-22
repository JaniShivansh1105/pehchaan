# Engineering Plan

---

## 1. Development Roadmap

### Phase 00: Documentation & Project Constitution (CURRENT)
Establish the complete documentation foundation (vision, requirements, architecture, design system).

### Phase 01: Frontend Foundation & Design System
Set up Next.js (TypeScript, Tailwind, shadcn/ui). Implement design tokens and core reusable components. Light theme enforced.

### Phase 02: Public Landing Experience
Build landing page, sign-in, and create-account screens (responsive, no subtitles).

### Phase 03: Authentication & Onboarding
Implement mocked auth service (always succeeds) and 3-step onboarding flow with data validation and consent acknowledgment.

### Phase 04: Application Shell & Dashboard
Build authenticated layout (navigation + content) and dashboard (empty/populated states).

### Phase 05: Financial Behaviour & Credit Intelligence
Build profile form, "Load Sample Profile", and credit readiness result screen using deterministic mock data.

### Phase 06: Explainability & Improvement Pathway
Build factor breakdown and actionable recommendations (using mock data).

### Phase 07: What-If Financial Simulator
Build variable adjustment sliders and before/after comparison with mock simulation pairs.

### Phase 08: Investment Risk Assessment
Build the 7-question assessment flow and frontend risk scoring.

### Phase 09: Investment Guidance & Growth Simulator
Build allocation chart and growth simulator with a 3-scenario line chart (frontend computation).

### Phase 10: Responsive, Accessibility & UX Audit
Comprehensive audit for mobile/tablet/desktop, a11y (keyboard/contrast), and design system consistency.

### Phase 11: Backend Foundation (Future)
Set up FastAPI project, Pydantic schemas, and endpoints initially returning mock data.

### Phase 12: ML Experimentation (Future)
Generate synthetic dataset, train models (Logistic Regression, Random Forest, XGBoost), evaluate, select, and integrate SHAP.

### Phase 13: Real API Integration (Future)
Connect frontend service abstractions to FastAPI endpoints. UI components require zero changes.

### Phase 14: Final Integration & Deployment (Future)
End-to-end testing, performance audit, and full deployment.

---

## 2. Testing Strategy

For a hackathon prototype, testing focuses on confidence in core flows rather than exhaustive coverage.

### Layer 1: Type Safety (Always Active)
- TypeScript (strict mode) for all source files.
- Zod schemas for all form inputs and data shapes.

### Layer 2: Unit Tests (Critical Logic)
- Priorities (P0): Investment risk scoring formula, growth simulation calculations, and mock profile matching logic.
- Tooling: Vitest or Jest.

### Layer 3: Component Tests (Key Interactions)
- Priorities (P1): Score gauge rendering, risk badge classification, form validation displays.
- Tooling: React Testing Library.

### Layer 4: Manual Testing (UX & Visual)
- Priorities (P0): Complete user journey walkthrough, responsive checks (mobile, tablet, desktop), disclaimer visibility, no-subtitle rule compliance, and design system consistency.
- Priorities (P1): Keyboard navigation, colour contrast (aXe DevTools).

---

## 3. Deployment Strategy

### Pre-Screening Deployment (Frontend-Only)
- **Platform:** Vercel (optimised for Next.js).
- **Configuration:** No environment variables required (`NEXT_PUBLIC_USE_MOCK=true` by default).
- **Checklist:**
  - Build succeeds without errors.
  - All routes render correctly in production.
  - Disclaimers visible and no-subtitle rule applied.
  - Responsive on all devices.

### Full Deployment (Future)
- **Frontend:** Continue on Vercel. Add `NEXT_PUBLIC_API_URL` to connect to the backend. Set `NEXT_PUBLIC_USE_MOCK=false`.
- **Backend:** Deploy FastAPI on services like Railway, Render, or Cloud Run.
- **Checklist:**
  - API health check passes.
  - CORS configured securely.
  - ML model artifacts included.
  - Environment variables correctly managed without leaking sensitive keys.
