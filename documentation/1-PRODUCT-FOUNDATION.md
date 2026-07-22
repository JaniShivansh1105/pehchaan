# Product Foundation

---

## 1. Product Identity

**Name:** PEHCHAAN  
**Team:** ABHIMANYU  
**Hackathon:** TetraTHON 2026 -- Indo-French AI Innovation Sprint  
**Track:** FinTech  
**Current Phase:** Online Pre-Screening Prototype

---

## 2. Problem Statement Analysis

PEHCHAAN addresses the TetraTHON 2026 FinTech challenge to build an integrated prototype with two core components:

**A. Credit-Likelihood Scoring Engine:** Designs a scoring engine using non-traditional digital signals (e.g., telecom behaviour, utility payments, e-commerce transactions). Required outputs include an interpretable readiness score, risk bucket classification, top-three feature explanations, and actionable improvement recommendations.

**B. Micro-Investment Guidance:** Builds an educational micro-investment guidance experience. Required elements include a 5-8 question conversational risk assessment, risk profiling, educational allocation guidance, and simulated growth scenarios over 1-5 years for monthly contributions between INR 500 and 5,000.

The key constraint is that these are not separate deliverables but one connected product.

---

## 3. Product Vision & Core Philosophy

> "No traditional credit history should not mean no financial identity."

PEHCHAAN exists for financially underserved and credit-invisible users. The product transforms overlooked everyday financial behaviour into understandable financial intelligence and helps users take informed steps towards financial improvement and long-term growth.

PEHCHAAN sits at the intersection of alternative credit assessment, financial literacy, and inclusive FinTech. It is not positioned as a credit bureau competitor, robo-advisory platform, or lending marketplace.

---

## 4. Unified Product Journey

PEHCHAAN is one connected financial progression journey:

`UNDERSTAND -> IMPROVE -> GROW`

| Phase | Purpose | User Experience |
|-------|---------|-----------------|
| **UNDERSTAND** | Help users understand the financial signals reflected in their everyday behaviour | The user provides behavioural data. PEHCHAAN analyses these signals to produce a Credit Readiness Score with plain-language explanations. |
| **IMPROVE** | Explain factors affecting credit readiness and provide actionable improvement pathways | Based on the analysis, PEHCHAAN provides prioritised, actionable recommendations. The What-If Simulator lets users experiment with behavioural changes. |
| **GROW** | Help users understand their risk profile and explore educational micro-investment guidance | Users complete a risk assessment. PEHCHAAN provides educational allocation guidance and visualises simulated growth scenarios for small monthly contributions. |

---

## 5. Non-Negotiable Rules

These rules apply to every contributor, human or AI agent, at all times.

### 5.1 Terminology

- Use **Credit Readiness Score**, **Financial Readiness Score**, or **Credit-Likelihood Indicator**.
- Never use **CIBIL Score**, **Credit Score (unqualified)**, or **Official Credit Score**.
- The product must always distinguish between prototype/model-generated indicators and official regulated credit bureau scores.

### 5.2 Visual Design

- **Pure light theme only.** No dark mode. No dark sections. No black-heavy hero areas.
- **Premium minimalism.** Clean but not empty. Distinctive without sacrificing usability.
- **Restrained glassmorphism.** Selective use only (floating navigation, insight surfaces, overlays).
- **No generic patterns.** The product must not resemble a generic admin dashboard, crypto trading app, traditional bank portal, or dark futuristic AI product.

### 5.3 Typography & Content

**No automatic title-subtitle pattern.** If the title already communicates purpose, stop there. Supporting text is permitted only when it provides genuinely necessary information for the product user interface.

### 5.4 Honesty

- Never represent mocked functionality as production AI.
- Never present projections as guaranteed returns.
- Never claim features are implemented when they are only planned.
- All investment-related outputs must include the educational disclaimer.
- Synthetic data must never be presented as real lending outcomes.

### 5.5 Architecture

- No dependencies without clear, documented need.
- Architecture changes require documented rationale in the Project Governance logs.
- Mock-service abstraction must be maintained so real APIs can replace mocks without UI rewrites.

---

## 6. Document Authority Hierarchy

This document serves as the master governing constitution for the product foundation. All other documentation derives from and must remain consistent with this foundation.

1. **This Document** (Product Foundation) -- overrides all other documents on conflict
2. **Design System** -- visual authority
3. **Project Governance** -- operational and rationale authority
4. **Feature Specifications** -- functional authority

Amendments to core philosophy or rules may be made only with explicit team approval and recorded appropriately.
