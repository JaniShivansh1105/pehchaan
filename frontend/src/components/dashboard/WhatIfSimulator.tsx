import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowRight, SlidersHorizontal } from "lucide-react"

import Link from "next/link"
import { mockUser } from "@/lib/mock-data"

export function WhatIfSimulator() {
  return (
    <Card className="h-full flex flex-col group overflow-hidden relative border-neutral-200 min-h-0">
      <div className="absolute top-0 right-0 p-8 bg-gradient-to-bl from-brand/5 to-transparent rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <CardHeader className="p-3 lg:p-4 pb-2 shrink-0 relative z-10">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400 group-hover:text-brand transition-colors" />
          What If You Improved?
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 lg:p-4 pt-0 flex-1 flex flex-col justify-between relative z-10 min-h-0">
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <p className="text-[11px] font-medium text-foreground mb-2 truncate">
            Scenario: <span className="text-brand font-semibold">Improve payment consistency</span>
          </p>
          
          <div className="flex items-center justify-between bg-neutral-50 rounded-lg p-3 border border-neutral-100 mb-3 shrink-0">
            <div className="text-center">
              <p className="text-[9px] text-neutral-500 mb-0.5 font-medium uppercase tracking-wider">Current</p>
              <p className="text-xl font-display font-bold text-neutral-900 leading-none">{mockUser.readinessScore}</p>
            </div>
            
            <div className="flex flex-col items-center px-2">
              <div className="bg-success-light text-success text-[9px] font-bold px-1.5 py-0.5 rounded-sm mb-1">
                +26 pts
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-300" />
            </div>
            
            <div className="text-center">
              <p className="text-[9px] text-brand mb-0.5 font-medium uppercase tracking-wider">Projected</p>
              <p className="text-xl font-display font-bold text-success leading-none">{mockUser.readinessScore + 26}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row items-center justify-between gap-3 mt-auto shrink-0">
          <Link href="/simulator?scenario=payment" className="w-full py-2 px-3 mt-2 bg-white text-neutral-800 border border-neutral-200 text-xs font-semibold rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm flex items-center justify-center gap-2 shrink-0">
          Explore Scenario
          </Link>
          
          <p className="text-[8px] text-neutral-400 max-w-[120px] text-right leading-tight">
            *Simulation only. Not a guaranteed outcome.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
