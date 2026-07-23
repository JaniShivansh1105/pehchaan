import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BookOpen, ShieldAlert, TrendingUp } from "lucide-react"

import Link from "next/link"

export function MicroInvestment() {
  return (
    <Card className="h-full flex flex-col border-neutral-200 min-h-0">
      <CardHeader className="p-3 lg:p-3 pb-2 shrink-0">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-neutral-400" />
          Your Growth Path
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:p-3 pt-0 flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-1.5 shrink-0">
            <div className="bg-neutral-50 rounded-md p-1.5 border border-neutral-100 flex-1 flex flex-col justify-center items-center">
              <span className="text-[8px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">Risk Profile</span>
              <span className="text-[11px] font-semibold text-warning flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Moderate
              </span>
            </div>
            <div className="bg-neutral-50 rounded-md p-1.5 border border-neutral-100 flex-1 flex flex-col justify-center items-center">
              <span className="text-[8px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">Readiness</span>
              <span className="text-[11px] font-semibold text-success flex items-center gap-1">
                Good
              </span>
            </div>
          </div>
          
          <p className="text-[10px] text-neutral-600 leading-snug">
            Learn about low-risk, small-ticket options aligned with your profile.
          </p>
        </div>
        
        <Link href="/micro-investment" className="w-full py-2 px-3 mt-2 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0">
          <BookOpen className="h-3.5 w-3.5 text-neutral-300" />
          Explore Learning Path
        </Link>
      </CardContent>
    </Card>
  )
}
