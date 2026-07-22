# Project Governance

> **Last Updated:** 2026-07-22

---

## 1. AI Agent Operating Rules

This guide is mandatory for every AI agent working on PEHCHAAN. It derives from the Project Constitution.

### Before You Do Anything
1. **Read Product Foundation (`1-PRODUCT-FOUNDATION.md`)** before making architectural changes.
2. **Read Feature Specifications (`4-FEATURE-SPECIFICATIONS.md`)** before implementing any module.
3. **Read Design System (`5-DESIGN-SYSTEM.md`)** before creating or modifying any UI component.
4. **Read this Governance document** before proposing changes that might conflict with existing decisions.

### Non-Negotiable Rules
| # | Rule |
|---|------|
| 1 | **Preserve the established design system.** Use design tokens. Do not introduce ad-hoc colours, sizes, or typography. |
| 2 | **Never introduce dark mode.** Pure light theme only. No dark sections. |
| 3 | **Never automatically add subtitles below titles.** If the title communicates its purpose, stop. (Applies to product UI, not documentation). |
| 4 | **Never introduce unnecessary dependencies.** Document why it is needed. Prefer existing tools. |
| 5 | **Never change architecture without documenting the reason.** Record changes in the Decision Log below. |
| 6 | **Never represent mocked functionality as real AI.** Mock data is mock data. Do not fake loading times. |
| 7 | **Never call the readiness indicator an official bureau credit score.** Use "Credit Readiness Score". |
| 8 | **Preserve responsive behaviour.** Every screen must work on mobile (375px), tablet (768px), and desktop (1280px). |
| 9 | **Reuse established components and tokens.** Check shared components before creating new ones. |
| 10| **Avoid generic AI-generated UI patterns.** No excessive gradient blobs, no generic SaaS layouts. |
| 11| **Keep financial disclaimers visible where required.** |
| 12| **Prioritise working vertical slices over disconnected complexity.** |
| 13| **Update relevant documentation when implementation changes project behaviour.** |

---

## 2. Pending Human Decisions

The following product decisions require human approval. They are recorded here until resolved.

| Decision | Options | Status | Context |
|----------|---------|--------|---------|
| **Background Motif** | 1. Signal Pathways<br>2. Topographic Contours<br>3. Dot Grid | PENDING | Defines the visual background texture. Signal Pathways is the current leaning. |
| **Desktop Navigation Pattern** | 1. Sidebar Navigation<br>2. Top Navigation | PENDING | Defines the primary layout structure for desktop viewports. |
| **Tailwind CSS Version** | 1. Tailwind v4 | PENDING | Verify stability and compatibility of v4 for the hackathon timeline. |
| **Demo Data Badge Priority** | 1. Implement as P1 | PENDING | Determines if the subtle "Demo Data" badge is required for the first prototype build. |

---

## 3. Architecture Decision Records (ADRs)

### ADR-001: Frontend-First Strategy for Pre-Screening
- **Status:** Accepted
- **Decision:** The pre-screening prototype is frontend-only with deterministic mock data. No backend or ML model is required.
- **Rationale:** The pre-screening evaluates product vision, UX quality, and architectural readiness. A complete frontend demonstrates the product more effectively than a partial frontend with a real but limited backend.

### ADR-002: Pure Light Visual System
- **Status:** Accepted
- **Decision:** The application uses a pure light theme.
- **Rationale:** PEHCHAAN targets financially underserved users who need a warm, approachable, trustworthy interface. Dark themes connote trading apps and crypto platforms.

### ADR-003: Minimalism with Restrained Glassmorphism
- **Status:** Accepted
- **Decision:** Use glassmorphism selectively for navigation, insight surfaces, and overlays.
- **Rationale:** Overuse makes interfaces feel gimmicky and reduces readability.

### ADR-004: No Automatic Title-Subtitle Pattern
- **Status:** Accepted
- **Decision:** Titles in the product UI do not automatically receive subtitle text beneath them.
- **Rationale:** Reduces visual noise and unnecessary filler copy.

### ADR-005: Feature-Based Frontend Architecture
- **Status:** Accepted
- **Decision:** Frontend code is organised by feature domain (`features/credit-intelligence/`) rather than technical layer (`components/`, `services/`).
- **Rationale:** Keeps related code together, making it easier to understand and modify a feature.

### ADR-006: Mock-Service Abstraction
- **Status:** Accepted
- **Decision:** All data access flows through service interfaces with mock implementations in the prototype.
- **Rationale:** Ensures the frontend is architecturally ready for real APIs from day one.

### ADR-007: FastAPI as Planned Primary Backend
- **Status:** Accepted
- **Decision:** The future backend will use Python with FastAPI.
- **Rationale:** Natural choice for ML model serving, async performance, and automatic type validation (Pydantic).

### ADR-008: Model Selected Only After Comparative Evaluation
- **Status:** Accepted
- **Decision:** ML models (Logistic Regression, Random Forest, XGBoost) will be trained and evaluated comparatively before selection.
- **Rationale:** Pre-selecting a model without evaluation is intellectually dishonest. Interpretability must be balanced with performance based on data.

### ADR-009: Credit Readiness Is Not an Official Bureau Credit Score
- **Status:** Accepted
- **Decision:** The score is always called "Credit Readiness Score" and never presented as an official credit bureau score.
- **Rationale:** Misrepresenting a prototype indicator as an official score is misleading and ethically unacceptable.

### ADR-010: UNDERSTAND -> IMPROVE -> GROW as Unified Product Journey
- **Status:** Accepted
- **Decision:** The entire product follows one connected journey.
- **Rationale:** Users benefit from a coherent narrative. The problem statement explicitly requires an integrated prototype.

### ADR-011: Documentation Convention
- **Status:** Accepted
- **Decision:** All project documentation `.md` files reside in `documentation/` at the project root. Only `README.md` remains at the project root.
- **Rationale:** Centralising documentation makes it discoverable, maintainable, and clearly separated from source code.

---

## 4. Documentation Maintenance Conventions

- All project documentation `.md` files reside in `documentation/` at the project root.
- Only `README.md` remains at the project root as the GitHub entry point.
- File naming: `kebab-case` for all files and directories.
- Ensure all cross-references between documentation files remain accurate and functional.
