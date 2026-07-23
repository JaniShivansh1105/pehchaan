# Frontend Architecture

---

## 1. Technology Stack

| Technology | Purpose | Version Guidance |
|-----------|---------|-----------------|
| **Next.js** | React framework with file-based routing, SSR/SSG | Latest stable (App Router) |
| **TypeScript** | Type safety across the codebase | Strict mode enabled |
| **Tailwind CSS** | Utility-first CSS framework | v4 (pending final confirmation in Project Governance) |
| **shadcn/ui** | Accessible, unstyled component primitives | Latest |
| **Lucide Icons** | Icon library | Latest |
| **Recharts** | Charting library for growth simulator and allocation visualisation | Latest |
| **React Hook Form** | Form state management and validation | Latest |
| **Zod** | Schema validation (form inputs, data shapes) | Latest |

### Dependency Rules
- Do NOT add dependencies without clear documented need.
- Prefer shadcn/ui components (copy-paste model) over external component libraries.
- No state management library (Redux, Zustand, etc.) unless complexity demands it -- React Context and component state are sufficient for the prototype.
- No animation library unless Tailwind/CSS transitions prove insufficient for a specific use case.

---

## 2. Project Structure

```text
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, global providers)
│   ├── page.tsx                  # Landing page (/)
│   ├── sign-in/
│   │   └── page.tsx
│   ├── create-account/
│   │   └── page.tsx
│   ├── onboarding/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── financial-profile/
│   │   └── page.tsx
│   ├── credit-readiness/
│   │   ├── page.tsx
│   │   └── explain/
│   │       └── page.tsx
│   ├── improvement/
│   │   └── page.tsx
│   ├── simulator/
│   │   └── page.tsx
│   ├── investment/
│   │   ├── assessment/
│   │       └── page.tsx
│   │   ├── guidance/
│   │       └── page.tsx
│   │   └── growth/
│   │       └── page.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui primitives (button, input, card, etc.)
│   ├── shared/                   # Shared composed components
│   │   ├── score-gauge.tsx       # Credit readiness score display
│   │   ├── risk-badge.tsx        # Risk/readiness classification badge
│   │   ├── disclaimer-box.tsx    # Standardised disclaimer display
│   │   ├── journey-progress.tsx  # UNDERSTAND -> IMPROVE -> GROW indicator
│   │   └── stat-card.tsx         # Statistical summary card
│   └── layout/
│       ├── app-shell.tsx         # Authenticated app layout (nav + content)
│       ├── navigation.tsx        # Main navigation
│       ├── mobile-nav.tsx        # Mobile navigation variant
│       └── footer.tsx
│
├── features/                     # Feature-specific components and logic
│   ├── auth/
│   │   ├── components/           # Sign-in, create-account forms
│   │   └── services/             # Auth service abstraction
│   ├── onboarding/
│   │   ├── components/           # Multi-step onboarding forms
│   │   └── schemas/              # Zod validation schemas
│   ├── dashboard/
│   │   └── components/           # Dashboard-specific sections
│   ├── credit-profile/
│   │   ├── components/           # Financial behaviour input forms
│   │   └── schemas/              # Input validation schemas
│   ├── credit-intelligence/
│   │   ├── components/           # Score display, gauge, result card
│   │   └── services/             # Credit readiness service abstraction
│   ├── explainability/
│   │   └── components/           # Factor cards, explanation displays
│   ├── improvement/
│   │   └── components/           # Recommendation cards
│   ├── what-if-simulator/
│   │   ├── components/           # Variable sliders, comparison view
│   │   └── services/             # Simulation service abstraction
│   ├── investment-profile/
│   │   ├── components/           # Risk assessment question flow
│   │   └── services/             # Risk scoring service
│   ├── investment-guidance/
│   │   └── components/           # Allocation chart, category breakdown
│   └── growth-simulator/
│       ├── components/           # Growth chart, scenario table
│       └── utils/                # Growth calculation functions
│
├── lib/                          # Shared utilities
│   ├── utils.ts                  # General utility functions
│   └── cn.ts                     # Tailwind class merge utility
│
├── hooks/                        # Custom React hooks
│   ├── use-user.ts               # User state hook
│   └── use-journey.ts            # Journey progress state
│
├── types/                        # Shared TypeScript types
│   ├── user.ts
│   ├── credit.ts
│   ├── investment.ts
│   └── common.ts
│
├── data/                         # Mock data and sample profiles
│   ├── mock-profiles.ts          # 10+ sample financial profiles
│   ├── mock-credit-results.ts    # Pre-computed credit readiness results
│   ├── mock-explanations.ts      # Factor explanations per profile
│   ├── mock-recommendations.ts   # Improvement recommendations
│   └── risk-assessment.ts        # Risk assessment questions and scoring
│
└── config/                       # Application configuration
    ├── site.ts                   # Site metadata and constants
    ├── navigation.ts             # Navigation structure
    └── design-tokens.ts          # Design token references (if needed beyond Tailwind)
```

---

## 3. Service Abstraction Pattern

This is a critical architectural decision. All data access goes through service abstractions so mock data can be replaced with real API calls without touching UI components.

### Pattern

```typescript
// features/credit-intelligence/services/credit-service.ts

import type { FinancialBehaviourInput, CreditReadinessResult } from '@/types/credit';

export interface ICreditService {
  getCreditReadiness(input: FinancialBehaviourInput): Promise<CreditReadinessResult>;
  getSimulation(input: FinancialBehaviourInput): Promise<CreditReadinessResult>;
}

// Mock implementation (pre-screening)
export class MockCreditService implements ICreditService {
  async getCreditReadiness(input: FinancialBehaviourInput): Promise<CreditReadinessResult> {
    // Match input to closest mock profile
    // Return deterministic result
  }

  async getSimulation(input: FinancialBehaviourInput): Promise<CreditReadinessResult> {
    // Return deterministic simulated result
  }
}

// Future API implementation
export class ApiCreditService implements ICreditService {
  async getCreditReadiness(input: FinancialBehaviourInput): Promise<CreditReadinessResult> {
    // POST to FastAPI endpoint
    // Return API response
  }

  async getSimulation(input: FinancialBehaviourInput): Promise<CreditReadinessResult> {
    // POST to FastAPI simulation endpoint
    // Return API response
  }
}
```

### Service Registration

```typescript
// lib/services.ts

import { MockCreditService } from '@/features/credit-intelligence/services/credit-service';

// Switch to ApiCreditService when backend is ready
export const creditService = new MockCreditService();
```

UI components consume services through this single import -- no direct data access.

---

## 4. State Management

### Approach

- **React Context** for cross-cutting state (user session, journey progress).
- **Component-local state** for module-specific state (form inputs, assessment answers).
- **URL state** for navigation and route-specific parameters.
- No global state management library for the prototype.

### Context Providers

```tsx
<UserProvider>           {/* User session, onboarding state */}
  <JourneyProvider>      {/* UNDERSTAND/IMPROVE/GROW progress */}
    <AppShell>
      {children}
    </AppShell>
  </JourneyProvider>
</UserProvider>
```

---

## 5. Data Flow

```text
User Input (forms, sliders)
    │
    ▼
Zod Validation (schema)
    │
    ▼
Service Abstraction (mock or API)
    │
    ▼
Typed Response (TypeScript interface)
    │
    ▼
UI Component (renders result)
```

---

## 6. Tailwind Configuration

### Design Token Integration

Map the Design System tokens into Tailwind configuration:

```typescript
// tailwind.config.ts (conceptual)

theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#4F46E5', light: '#818CF8', lighter: '#E0E7FF', dark: '#3730A3' },
      secondary: { DEFAULT: '#0D9488', light: '#5EEAD4', lighter: '#CCFBF1' },
      accent: { DEFAULT: '#F59E0B', light: '#FCD34D' },
      positive: { DEFAULT: '#059669', light: '#D1FAE5' },
      caution: { DEFAULT: '#D97706', light: '#FEF3C7' },
      negative: { DEFAULT: '#DC2626', light: '#FEE2E2' },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    },
    borderRadius: {
      sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px',
    },
    boxShadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
      md: '0 2px 8px rgba(0, 0, 0, 0.06)',
      lg: '0 4px 16px rgba(0, 0, 0, 0.08)',
      glow: '0 0 24px rgba(79, 70, 229, 0.12)',
    },
  },
}
```

---

## 7. Key Conventions

1. **Feature isolation:** Each feature module is self-contained -- components, services, schemas, and utilities live together.
2. **Shared components:** Live in `components/shared/` and are reusable across features.
3. **UI primitives:** From shadcn/ui live in `components/ui/` and are never modified directly for feature-specific purposes.
4. **Types:** Types that cross feature boundaries live in `types/`.
5. **No barrel exports:** No `index.ts` re-exporting everything -- import directly from the file.
6. **Naming:** `kebab-case` for files, `PascalCase` for components, `camelCase` for variables and functions.
