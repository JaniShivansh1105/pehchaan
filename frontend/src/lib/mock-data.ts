export const mockUser = {
  name: "Shivansh",
  readinessScore: 742,
  maxScore: 900,
  scoreStatus: "GOOD",
  scoreChange: 24,
  riskProfile: "Moderate",
  readinessStatus: "Good",
}

export const mockReadinessHistory = [
  { month: "Feb", score: 618 },
  { month: "Mar", score: 645 },
  { month: "Apr", score: 662 },
  { month: "May", score: 701 },
  { month: "Jun", score: 724 },
  { month: "Jul", score: 742 },
]

export const mockKeyFactors = [
  {
    id: "payment_consistency",
    name: "Payment Consistency",
    status: "Strong",
    impact: "Positive Impact",
    variant: "success" as const,
    description: "Regular on-time utility payments are strengthening your readiness.",
    insight: "You have paid 100% of your tracked utility bills on time for the last 6 months.",
    suggestion: "Maintain this perfect streak to continue building trust.",
    relatedActionId: "utility-autopay"
  },
  {
    id: "recharge_regularity",
    name: "Recharge Regularity",
    status: "Good",
    impact: "Positive Impact",
    variant: "success" as const,
    description: "Your recharge pattern shows consistent financial behaviour.",
    insight: "Consistent monthly mobile recharges indicate a stable cash flow pattern.",
    suggestion: "Keep up the regular recharges, as this is a strong alternative data point.",
    relatedActionId: "postpaid-upgrade"
  },
  {
    id: "spending_stability",
    name: "Spending Stability",
    status: "Improving",
    impact: "Needs Attention",
    variant: "warning" as const,
    description: "Monthly spending variation is decreasing.",
    insight: "Your discretionary spending varied by 20% over the last 3 months, which is slightly high.",
    suggestion: "Try to keep your monthly spending within a consistent budget to improve stability.",
    relatedActionId: "stable-savings"
  },
  {
    id: "credit_history",
    name: "Credit History Depth",
    status: "Limited",
    impact: "Growth Opportunity",
    variant: "neutral" as const,
    description: "Limited formal credit activity is currently restricting your profile.",
    insight: "You have no formal loans or credit cards active right now.",
    suggestion: "Once your readiness score reaches 750, consider a small secured credit product to begin building formal history.",
    relatedActionId: "secured-credit"
  }
]

export const mockImprovements = [
  {
    id: "stable-savings",
    title: "Build a Stable Savings Pattern",
    whyItMatters: "Consistent savings, even small amounts, demonstrate financial discipline and liquidity buffer.",
    suggestedBehaviour: "Start with a small, consistent monthly saving habit (e.g., ₹500/month) transferred automatically.",
    impact: "Up to +18 pts",
    difficulty: "Medium",
    status: "Not Started",
    primary: true
  },
  {
    id: "spending_control",
    title: "Reduce Spending Volatility",
    whyItMatters: "Highly variable spending suggests unpredictable financial management.",
    suggestedBehaviour: "Avoid large unexpected purchases. Keep your monthly outflow consistent.",
    impact: "Up to +12 pts",
    difficulty: "Low",
    status: "In Progress",
    primary: false
  }
]

export const mockScenarios = [
  {
    id: "improve_payment",
    label: "Improve payment consistency",
    currentScore: 742,
    change: 26,
    projectedScore: 768
  },
  {
    id: "stable_savings",
    label: "Build a stable savings pattern",
    currentScore: 742,
    change: 18,
    projectedScore: 760
  },
  {
    id: "missed_payment",
    label: "Miss a utility payment",
    currentScore: 742,
    change: -35,
    projectedScore: 707
  }
]
