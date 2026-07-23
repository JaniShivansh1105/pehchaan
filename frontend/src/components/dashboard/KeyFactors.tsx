import { 
  CalendarDays, 
  Smartphone, 
  Wallet, 
  History
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function KeyFactors() {
  const factors = [
    {
      name: "Payment Consistency",
      status: "Strong",
      variant: "success",
      icon: CalendarDays,
      description: "Regular on-time payments."
    },
    {
      name: "Recharge Regularity",
      status: "Good",
      variant: "success",
      icon: Smartphone,
      description: "Consistent recharges."
    },
    {
      name: "Spending Stability",
      status: "Improving",
      variant: "warning",
      icon: Wallet,
      description: "Variation decreasing."
    },
    {
      name: "Credit History",
      status: "Limited",
      variant: "neutral",
      icon: History,
      description: "Limited formal credit."
    }
  ]

  return (
    <Card className="h-full flex flex-col min-h-0">
      <CardHeader className="p-3 lg:p-4 pb-2 shrink-0">
        <CardTitle className="text-sm font-semibold">What&apos;s Shaping Your Readiness?</CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 lg:p-4 pt-0 flex-1 min-h-0 flex flex-col">
        <div className="grid grid-cols-2 gap-2 lg:gap-3 h-full">
          {factors.map((factor, idx) => (
            <div key={idx} className="flex gap-2.5 p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/50 min-h-0 items-center">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${
                factor.variant === 'success' ? 'bg-success-light/30 border-success/20 text-success' :
                factor.variant === 'warning' ? 'bg-warning-light/30 border-warning/20 text-warning' :
                'bg-neutral-100 border-neutral-200 text-neutral-500'
              }`}>
                <factor.icon className="h-3.5 w-3.5" />
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <p className="text-[11px] font-semibold text-foreground truncate">{factor.name}</p>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm shrink-0 ${
                    factor.variant === 'success' ? 'text-success bg-success-light/50' :
                    factor.variant === 'warning' ? 'text-warning bg-warning-light/50' :
                    'text-neutral-500 bg-neutral-100'
                  }`}>
                    {factor.status}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 truncate">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
