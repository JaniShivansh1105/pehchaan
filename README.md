<<<<<<< Updated upstream
# pehchaan
AI-powered financial intelligence platform transforming alternative financial behaviour into explainable credit readiness and accessible micro-investment guidance.
=======
# PEHCHAAN

> Financial potential should be understood before it is overlooked.

PEHCHAAN is an explainable, consent-driven financial readiness platform that uses alternative behavioural financial signals to help underserved and thin-file individuals understand, improve, and build their financial readiness.

---

## 1. The Problem

Traditional financial assessments rely heavily on established credit histories—such as past loans, credit cards, and bureau records. However, this creates a structural barrier for:
- Thin-file individuals
- First-time borrowers
- Gig and informal-economy workers
- Financially underserved individuals

Millions of people demonstrate financial responsibility every day by consistently paying utility bills, maintaining stable recharges, and managing steady cash flows. Yet, they remain effectively invisible to formal financial institutions. **A lack of traditional credit history does not necessarily mean a lack of financial discipline or potential.**

## 2. Our Solution

PEHCHAAN bridges the financial inclusion gap by evaluating permitted, consent-based alternative financial and behavioural signals. 

We go beyond simply generating an opaque score. Our solution connects assessment with actionable guidance through a core journey:

- **UNDERSTAND**: Gain an explainable view of current financial readiness and the behavioural factors influencing it.
- **IMPROVE**: Receive personalised, actionable steps to strengthen financial habits and simulate potential outcomes.
- **GROW**: Build financial awareness and explore educational micro-investment pathways aligned with user readiness and risk context.

PEHCHAAN answers critical questions: *Where do I stand? Why? What should I improve? What could change if I improve?*

## 3. Who PEHCHAAN Is For

PEHCHAAN is designed for individuals who are actively participating in the economy but are overlooked by conventional financial systems:
- Thin-file individuals with limited or no formal credit history.
- First-time borrowers seeking to establish financial credibility.
- Gig economy workers with non-traditional income streams.
- Young adults taking their first steps into formal finance.

## 4. How PEHCHAAN Works

The platform operates on a clear, consent-driven data flow. 

*(Note: The current frontend prototype demonstrates the complete product experience using structured mock data. The ML scoring, SHAP explainability, and production data pipelines form the next implementation phase.)*

```mermaid
graph TD
    A[Consent-Based Alternative Signals] --> B[Validation & Feature Engineering]
    B --> C[Explainable Readiness Assessment]
    C --> D[Factor-Level Explainability]
    D --> E[Personalised Improvement Actions]
    E --> F[What-If Behavioural Simulation]
    F --> G[Financial Growth Education]
```

1. **Consent-Based Alternative Signals:** Ingest user-permitted utility, spending, and recharge data.
2. **Validation & Feature Engineering (Planned):** Process raw data into stable behavioural features.
3. **Explainable Readiness Assessment (Planned ML):** Evaluate financial discipline to generate a Credit Readiness Score.
4. **Factor-Level Explainability (Planned SHAP):** Reveal the specific behaviours driving the assessment.
5. **Personalised Improvement Actions:** Provide prioritised behavioural recommendations.
6. **What-If Behavioural Simulation:** Allow users to dynamically model how habit changes influence readiness.
7. **Financial Growth Education:** Recommend educational financial-foundation modules based on the user's risk context.

## 5. Core Product Capabilities

### Credit Readiness Assessment
- Interpretable Credit Readiness Score.
- Dynamic readiness status (e.g., Good, Needs Attention).
- Historical readiness trend visualization.

### Key Factors Exploration
- Transparent breakdown of behavioural factors shaping readiness.
- Clear identification of positive impacts and growth opportunities.
- Deep-linked connections between factors and recommended actions.

### Personalised Improvement Path
- Prioritised, step-by-step behavioural recommendations.
- Interactive status tracking (Not Started, In Progress, Completed).
- Clear explanations of *why* an action matters.

### What-If Simulator
- Interactive sliders modelling potential behavioural changes.
- Dynamic, real-time recalculation of projected readiness.
- Clear distinction between simulated projections and actual assessments.

### Financial Growth Education
- Risk-contextual educational pathways (Conservative, Moderate, Aggressive).
- Financial foundation checklists (e.g., Emergency funds, Insurance).
- Educational modules (No specific investment recommendations are made).

### Privacy & Consent Management
- Granular, user-controlled consent toggles for data sources.
- Transparent "Data Usage Flow" explanations.
- Clear warnings when disabling data limits assessment accuracy.

## 6. PEHCHAAN in Action

When a user joins PEHCHAAN, they explicitly consent to share alternative financial signals (like utility payments and recharge regularity). PEHCHAAN processes these behavioural patterns to generate a Credit Readiness Score. 

Rather than stopping at a number, the system explains *what* is helping or limiting the user's readiness. The user receives a personalised improvement path detailing actionable habits to adopt. Before taking action, they can use the **What-If Simulator** to model how sticking to a stable savings plan might improve their readiness over time. As their readiness strengthens, PEHCHAAN unlocks educational pathways to guide them toward responsible financial growth.

## 7. Why PEHCHAAN Stands Out

| Conventional Assessment Experience | PEHCHAAN |
| --- | --- |
| Primarily evaluates past formal credit history | Interprets everyday behavioural financial readiness |
| Score-focused and opaque | Explanation-focused and transparent |
| Limited user guidance | Personalised, actionable improvement pathway |
| Static assessment | Interactive What-If simulation modelling |
| Opaque decision factors | Explainability-first approach (Planned SHAP integration) |
| User as a passive subject | User as an active participant in their financial growth |

- **Beyond a Score:** Connects assessment → explanation → action → simulation → growth.
- **Explainability by Design:** Instead of a black box, factors influencing readiness are exposed to the user.
- **Improvement-Oriented:** Focused on helping users strengthen financial habits, not just evaluating them.
- **Consent-First:** Alternative signals are only used with explicit, revocable user consent.
- **Responsible Growth:** Connects readiness with financial education without presenting itself as a guaranteed loan approval or prescriptive advisory service.

## 8. Technical Architecture

PEHCHAAN's architecture is designed to be modern, scalable, and explainable.

**Current Implementation:**
The repository currently contains the **Frontend** layer, fully implemented as an interactive, stateful, responsive prototype utilizing Next.js, Tailwind CSS, Recharts, and local storage persistence.

**Planned Architecture:**
- **Backend:** FastAPI (Python) for robust API delivery.
- **Database:** PostgreSQL for persistent structured user and telemetry data.
- **AI/ML Layer:** A machine-learning readiness assessment model complemented by SHAP (SHapley Additive exPlanations) to provide feature-level explainability.

## 9. Technology Stack

| Layer | Technology | Purpose | Status |
| --- | --- | --- | --- |
| **Frontend** | Next.js 16 | Application framework | Implemented |
| **Language** | TypeScript | Type-safe development | Implemented |
| **Styling** | Tailwind CSS | Responsive design system | Implemented |
| **Icons** | Lucide React | Consistent SVG iconography | Implemented |
| **Charts** | Recharts | Readiness and progress visualization | Implemented |
| **Persistence** | LocalStorage | Frontend prototype state management | Implemented |
| **Backend** | FastAPI | API and application services | Planned |
| **AI/ML** | Python ML stack | Readiness assessment | Planned |
| **Explainability** | SHAP | Factor-level model explanations | Planned |
| **Database** | PostgreSQL | Persistent structured data | Planned |

## 10. Current Frontend Implementation

The frontend prototype is functionally rich and presentation-ready. It includes:
- **One-screen Overview Dashboard:** A responsive, densely packed command center with zero vertical scrolling required on desktop monitors (125% zoom).
- **Responsive Application Shell:** Mobile sidebar drawers and adaptable layouts.
- **Interactive Simulator:** Dynamic, real-time score projection modeling.
- **Persistent State:** Local storage integration ensures user actions (like checking off improvement steps or modifying consent) persist across sessions.
- **Polished UI States:** Loading, empty, error, and not-found states are architecturally integrated.
- **Deep-Linked Workflows:** Notifications and dashboard widgets link directly to filtered, expanded views on detailed pages.

*(Note: The current prototype is powered by centralized frontend mock data to demonstrate the intended user experience prior to backend integration.)*

## 11. Project Structure

```text
PEHCHAAN/
├── frontend/                 # Complete Next.js interactive prototype
│   ├── src/
│   │   ├── app/              # Next.js App Router pages (Overview, Simulator, etc.)
│   │   ├── components/       # Reusable UI components and dashboard widgets
│   │   └── lib/              # Custom hooks (e.g., useLocalStorage) and mock data
├── documentation/            # Product, architecture, and engineering documentation
└── README.md                 # Project overview (this file)
```

## 12. Getting Started

Follow these steps to run the interactive frontend prototype locally.

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PEHCHAAN
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

Open `http://localhost:3000` in your browser to interact with the platform.

## 13. Current Status & Roadmap

**Phase 1 — Interactive Frontend Prototype (Completed)**
- Complete interactive frontend prototype
- Responsive dashboard and detailed product pages
- Local mock-data architecture and frontend persistence
- Interactive simulation experience and consent controls

**Phase 2 — Backend & Data Foundation (Next)**
- FastAPI backend implementation
- PostgreSQL persistence
- Authentication and consent-based data ingestion pipelines

**Phase 3 — Readiness Intelligence (Planned)**
- Feature engineering pipeline
- ML readiness model and SHAP explainability integration

**Phase 4 — Personalisation & Simulation (Planned)**
- Recommendation engine for personalized improvement paths
- Production-grade what-if simulation using real backend data

## 14. Responsible AI, Privacy and Safety

PEHCHAAN is built on foundational principles of ethical finance:
- **Explicit Consent:** Alternative signals are only accessed with explicit user permission.
- **Data Minimisation:** The platform strictly requests only the data necessary for readiness assessment.
- **Explainability:** AI outputs must be transparent; users deserve to know *why* they received a specific assessment.
- **Educational Framing:** All micro-investment features are strictly educational. PEHCHAAN does not guarantee financial outcomes or provide prescriptive investment advice.

## 15. Team

**Team: ABHIMANYU**
*(TetraTHON 2026, Indo-French AI Innovation Sprint, FinTech Track)*

| Team Member | Role |
| --- | --- |
| Shivansh Jani | Team Lead & Frontend Developer |
| Yajash Khamar | AI/ML & Explainability Developer |
| Harin Joshi | Backend & API Developer |
| Durgesh Singh | Database & System Architecture |
| Aarchi Shah | Research, UI/UX & Testing |
>>>>>>> Stashed changes
