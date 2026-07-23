import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function ImprovementPath() {
  return (
    <Card className="h-full flex flex-col bg-brand/5 border-brand/20 min-h-0">
      <CardHeader className="p-3 lg:p-4 pb-2 shrink-0">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-brand" />
          Your Next Best Action
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 lg:p-4 pt-0 flex-1 flex flex-col min-h-0">
        <div className="bg-white rounded-lg p-3 lg:p-4 border border-brand/20 shadow-sm flex-1 flex flex-col min-h-0">
          <h3 className="text-sm font-semibold text-foreground leading-tight mb-1">
            Build a Stable Savings Pattern
          </h3>
          
          <p className="text-[11px] text-neutral-600 mb-2 leading-snug line-clamp-2">
            Start with a small, consistent monthly saving habit to strengthen your financial stability.
          </p>
          
          <div className="flex items-center gap-2 py-1.5 px-2 bg-brand/5 rounded-md border border-brand/10 w-max shrink-0 mt-auto">
            <span className="text-[10px] font-medium text-neutral-600">Potential impact:</span>
            <span className="text-[10px] font-bold text-brand">Up to +18 pts</span>
          </div>
        </div>

        <Link href="/improvement?action=stable-savings" className="w-full py-2 px-3 mt-2 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-sm flex items-center justify-center gap-2 shrink-0">
          View Improvement Plan
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  )
}
