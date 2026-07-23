import * as React from "react"
import { ArrowRight, Search, Activity, Sprout } from "lucide-react"

export function FinancialJourney() {
  const steps = [
    {
      id: "understand",
      label: "UNDERSTAND",
      sublabel: "Readiness",
      icon: Search,
      active: false,
      completed: true,
    },
    {
      id: "improve",
      label: "IMPROVE",
      sublabel: "Action",
      icon: Activity,
      active: true,
      completed: false,
    },
    {
      id: "grow",
      label: "GROW",
      sublabel: "Opportunity",
      icon: Sprout,
      active: false,
      completed: false,
    }
  ]

  return (
    <div className="shrink-0 glass rounded-xl px-4 py-2 flex items-center justify-between border-brand/10">
      <div className="flex items-center w-full max-w-3xl mx-auto justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className={`flex items-center gap-3 relative px-2 py-1 rounded-lg ${step.active ? "bg-brand/5" : ""}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-sm ${
                step.active 
                  ? "border-brand bg-brand text-white shadow-brand/20" 
                  : step.completed
                    ? "border-success bg-success-light text-success"
                    : "border-neutral-200 bg-neutral-50 text-neutral-400"
              }`}>
                <step.icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className={`text-xs font-bold tracking-wider leading-none ${
                  step.active ? "text-brand" : step.completed ? "text-neutral-700" : "text-neutral-400"
                }`}>
                  {step.label}
                </h4>
                <p className="text-[10px] text-neutral-500 font-medium mt-0.5 leading-none uppercase">{step.sublabel}</p>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden sm:flex flex-1 items-center justify-center max-w-[80px]">
                <div className={`h-px w-full ${
                  step.completed ? "bg-gradient-to-r from-success to-brand/30" : "bg-neutral-200"
                }`} />
                <ArrowRight className={`h-3 w-3 mx-1 shrink-0 ${
                  step.completed ? "text-brand/50" : "text-neutral-300"
                }`} />
                <div className={`h-px w-full ${
                  step.completed ? "bg-gradient-to-r from-brand/30 to-neutral-200" : "bg-neutral-200"
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
