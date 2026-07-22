# Design System

> **Last Updated:** 2026-07-22

---

## 1. Design Direction

### Visual Identity
PEHCHAAN employs a pure light theme (no dark mode, no dark sections, no black-heavy hero areas). The aesthetic is premium minimalism -- clean but not empty, visually distinctive without sacrificing usability. The design should feel warm, approachable, and financially trustworthy, reflecting modern AI intelligence without relying on futuristic cliches.

**Avoid:** Generic admin dashboards, crypto trading applications, traditional bank portals, copied SaaS templates, or AI-generated landing pages with excessive gradients.

### Glassmorphism
Use glassmorphism selectively for:
- Floating navigation bars
- Highlighted insight surfaces (e.g., score display overlay)
- Selected/focused cards
- Modal overlays
- Special interactive modules

*Do not use glassmorphism for every regular card, form container, table wrapper, or standard content section.*

**Properties:** Background `rgba(255, 255, 255, 0.72)`, Backdrop filter `blur(16px)`, Border `1px solid rgba(255, 255, 255, 0.3)`, Border radius `--radius-lg` or `--radius-xl`.

---

## 2. Colour System

### Brand Colours
The palette communicates trust, accessibility, financial progress, clarity, and optimism.

| Token | Name | HEX | Usage |
|-------|------|-----|-------|
| `--color-primary` | Warm Indigo | `#4F46E5` | Primary actions, brand elements, interactive states |
| `--color-primary-light` | Soft Indigo | `#818CF8` | Hover states, secondary emphasis |
| `--color-primary-lighter` | Pale Indigo | `#E0E7FF` | Backgrounds, subtle highlights |
| `--color-primary-dark` | Deep Indigo | `#3730A3` | Active states, strong emphasis |
| `--color-secondary` | Growth Teal | `#0D9488` | Secondary actions, GROW phase elements |
| `--color-secondary-light` | Soft Teal | `#5EEAD4` | Secondary hover, highlights |
| `--color-secondary-lighter` | Pale Teal | `#CCFBF1` | Secondary backgrounds |
| `--color-accent` | Warm Amber | `#F59E0B` | Accent highlights, attention moments, badges |
| `--color-accent-light` | Soft Amber | `#FCD34D` | Accent hover, secondary highlights |

### Semantic Colours (Risk Mapping)
Risk communication must never rely solely on colour. Always pair colour with text labels and/or icons for accessibility.

| Risk/Readiness Level | Token | HEX | Background Token | Usage |
|----------------------|-------|-----|------------------|-------|
| High Readiness | `--color-positive` | `#059669` | `--color-positive-light` | Positive factors, high readiness, success states |
| Medium Readiness | `--color-caution` | `#D97706` | `--color-caution-light` | Medium readiness, caution states, attention |
| Low Readiness | `--color-negative` | `#DC2626` | `--color-negative-light` | Low readiness, error states, critical attention |

### Neutral Scale
| Token | HEX | Usage |
|-------|-----|-------|
| `--color-neutral-50` | `#FAFAFA` | Page background |
| `--color-neutral-100` | `#F5F5F5` | Card backgrounds, input backgrounds |
| `--color-neutral-200` | `#E5E5E5` | Borders, dividers |
| `--color-neutral-300` | `#D4D4D4` | Disabled states, secondary borders |
| `--color-neutral-400` | `#A3A3A3` | Placeholder text, icons |
| `--color-neutral-500` | `#737373` | Secondary text |
| `--color-neutral-600` | `#525252` | Body text |
| `--color-neutral-700` | `#404040` | Strong body text |
| `--color-neutral-800` | `#262626` | Headings |
| `--color-neutral-900` | `#171717` | Primary text, strong headings |

---

## 3. Typography & Spacing

### Font Family
**Primary:** Inter (`'Inter', system-ui, -apple-system, sans-serif`)
*Rationale:* Modern, highly readable at all sizes, excellent numerical typography, and performs well on financial interfaces.

### Type Scale
| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `--text-display` | 36px / 2.25rem | 700 | Landing page hero heading only |
| `--text-h1` | 28px / 1.75rem | 700 | Page titles |
| `--text-h2` | 22px / 1.375rem | 600 | Section headings |
| `--text-h3` | 18px / 1.125rem | 600 | Card titles, sub-section headings |
| `--text-body` | 16px / 1rem | 400 | Body text, descriptions |
| `--text-body-medium` | 16px / 1rem | 500 | Emphasized body text |
| `--text-small` | 14px / 0.875rem | 400 | Secondary information, captions |
| `--text-label` | 12px / 0.75rem | 500 | Form labels, badges, tags |
| `--text-stat` | 48px / 3rem | 700 | Large statistical numbers (scores) |
| `--text-stat-sm` | 28px / 1.75rem | 700 | Smaller statistical numbers |

### Spacing Scale
Uses a standard 4px increment scale (e.g., `--space-4` = 16px).
- **Component internal padding:** `--space-4` to `--space-6`
- **Card padding:** `--space-5` to `--space-8`
- **Section gaps:** `--space-8` to `--space-12`
- **Page-level vertical spacing:** `--space-12` to `--space-16`

---

## 4. UX Content Guidelines

### The No-Subtitle Rule
**Rule:** Do NOT automatically place subtitles beneath titles in the **PRODUCT USER INTERFACE**.
- If the title already communicates its purpose (e.g., "Sign In" or "Credit Readiness"), stop there.
- Use supporting text only when it communicates necessary information that the user genuinely needs.
- *Note:* This rule applies exclusively to the product UI, not to the project documentation itself. Documentation may use explanatory text below headings when it is useful and professionally written.

### Tone & Voice
- **Personality:** Warm, clear, respectful, honest, and encouraging.
- **Language Level:** Write for users with basic English proficiency and no financial background. Avoid jargon.
- **Error Messages:** Explain what happened in plain language, suggest what the user can do, and never blame the user.

### Financial Terminology
- **Use:** Credit Readiness Score, Financial behaviour, Readiness, Risk profile, Educational allocation, Simulated growth.
- **Avoid:** Credit score (unqualified), CIBIL score, Investment advice, Guaranteed returns, "You should invest in...", Risk-free, Profit.

### Disclaimer Standards
Disclaimers must be styled distinctly (e.g., bordered info box) but not alarmingly. Use `--color-neutral-200` borders and `--color-neutral-50` backgrounds. Examples of required disclaimers include the Credit Readiness disclaimer, Simulator disclaimer, and Investment disclaimer (refer to Feature Specifications for exact text).

---

## 5. Accessibility

### Colour & Contrast (WCAG 2.1 Level AA)
- **Text contrast ratio:** 4.5:1 (normal text), 3:1 (large text).
- **Non-text contrast:** 3:1 for UI components and graphical objects.
- **Colour-independence:** Never rely on colour alone to convey information (e.g., risk buckets must use colour + text label + icon).

### Keyboard Accessibility
- All interactive elements must be focusable via the Tab key.
- Custom focus ring: `outline: 2px solid var(--color-primary); outline-offset: 2px; box-shadow: var(--shadow-glow);`.
- Logical tab order matching visual layout (no `tabindex` hacks).
- Modals trap focus and can be closed via the Escape key.

### Semantic HTML & Forms
- Single `<h1>` per page with logical heading hierarchy.
- Use appropriate landmarks (`<main>`, `<nav>`, `<header>`, etc.).
- `<button>` for actions, `<a>` for navigation.
- Every input requires an associated `<label>`. Errors identified by `aria-invalid` and `aria-describedby`.

### Motion & Animation
- Respect `prefers-reduced-motion` media queries for all CSS animations and transitions.
- No auto-playing animations without user initiation.

### Responsive Design
- **Mobile (< 640px):** Touch targets minimum 44x44px, no horizontal scrolling, minimum 16px body text.
- **Tablet (640px - 1023px):** Touch-friendly spacing maintained.
- **Desktop (>= 1024px):** Persistent sidebar or top navigation, full keyboard support.
