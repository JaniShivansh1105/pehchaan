"use client"

import { useState } from "react"
import { mockUser } from "@/lib/mock-data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, CheckCircle2, AlertCircle, Info, X, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ReadinessPage() {
  const [timeRange, setTimeRange] = useState<'3M' | '6M' | '1Y'>('6M')
  const [showInfo, setShowInfo] = useState(false)

  // Mock data changes based on time range
  const scoreChange = timeRange === '3M' ? 12 : timeRange === '6M' ? mockUser.scoreChange : 45

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">My Readiness</h1>
        <p className="text-sm text-neutral-500">Understand your PEHCHAAN financial readiness profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card className="md:col-span-1 border-brand/20 bg-brand/5 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full relative">
            <button 
              onClick={() => setShowInfo(true)}
              className="absolute top-4 right-4 text-brand hover:bg-brand/10 p-1.5 rounded-full transition-colors"
              aria-label="How is this calculated?"
            >
              <Info className="h-4 w-4" />
            </button>
            <Badge variant="success" className="mb-4">Status: {mockUser.scoreStatus}</Badge>
            <div className="relative mb-2">
              <span className="text-6xl font-display font-bold text-foreground tracking-tighter">
                {mockUser.readinessScore}
              </span>
              <span className="text-sm font-medium text-neutral-400 absolute bottom-1 -right-8">
                / {mockUser.maxScore}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-success bg-success-light/50 px-2.5 py-1 rounded-full mt-4 animate-in fade-in zoom-in duration-300" key={timeRange}>
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-bold">+{scoreChange} pts</span>
            </div>
            
            <div className="flex bg-white/60 p-1 rounded-lg mt-4 border border-brand/10">
              {(['3M', '6M', '1Y'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${timeRange === range ? 'bg-brand text-white shadow-sm' : 'text-neutral-500 hover:text-foreground'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-neutral-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-neutral-400" />
              What This Means
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-neutral-600 leading-relaxed">
              Your Credit Readiness Score of <strong>{mockUser.readinessScore}</strong> indicates <strong>strong and improving financial behaviour</strong>. You have demonstrated consistency in utility payments and mobile recharges, which establishes trust despite a limited formal credit history.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-success-light/30 p-4 rounded-xl border border-success/10">
                <h4 className="flex items-center gap-2 text-sm font-bold text-success mb-2">
                  <CheckCircle2 className="h-4 w-4" /> Strengths
                </h4>
                <ul className="text-xs text-neutral-700 space-y-1.5 pl-6 list-disc">
                  <li>Perfect utility payment record</li>
                  <li>Consistent mobile recharge pattern</li>
                  <li>No negative flags or defaults</li>
                </ul>
              </div>
              
              <div className="bg-warning-light/30 p-4 rounded-xl border border-warning/10">
                <h4 className="flex items-center gap-2 text-sm font-bold text-warning mb-2">
                  <AlertCircle className="h-4 w-4" /> Focus Areas
                </h4>
                <ul className="text-xs text-neutral-700 space-y-1.5 pl-6 list-disc">
                  <li>Stabilize discretionary spending</li>
                  <li>Establish a formal savings habit</li>
                  <li>Begin building formal credit history</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Readiness Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Link href="/key-factors?factor=payment_consistency" className="block group bg-white hover:bg-neutral-50 p-4 rounded-xl border border-neutral-100 transition-colors shadow-sm cursor-pointer relative overflow-hidden">
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="font-semibold text-sm group-hover:text-brand transition-colors flex items-center gap-2">
                  Alternative Signals (Bills, Recharges)
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-success text-sm">Excellent (40%)</span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-brand transition-colors group-hover:translate-x-1" />
                </div>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden relative z-10">
                <div className="h-full bg-success w-[95%]"></div>
              </div>
            </Link>
            
            <Link href="/key-factors?factor=spending_stability" className="block group bg-white hover:bg-neutral-50 p-4 rounded-xl border border-neutral-100 transition-colors shadow-sm cursor-pointer relative overflow-hidden">
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="font-semibold text-sm group-hover:text-brand transition-colors flex items-center gap-2">
                  Financial Stability (Spending, Savings)
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-warning text-sm">Fair (30%)</span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-brand transition-colors group-hover:translate-x-1" />
                </div>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden relative z-10">
                <div className="h-full bg-warning w-[60%]"></div>
              </div>
            </Link>
            
            <Link href="/key-factors?factor=credit_history" className="block group bg-white hover:bg-neutral-50 p-4 rounded-xl border border-neutral-100 transition-colors shadow-sm cursor-pointer relative overflow-hidden">
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="font-semibold text-sm group-hover:text-brand transition-colors flex items-center gap-2">
                  Formal Credit History
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-500 text-sm">Limited (30%)</span>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-brand transition-colors group-hover:translate-x-1" />
                </div>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden relative z-10">
                <div className="h-full bg-neutral-400 w-[15%]"></div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-neutral-200">
            <div className="p-6 pb-4 border-b border-neutral-100 flex justify-between items-center bg-brand/5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Info className="h-5 w-5 text-brand" /> How is this calculated?
              </h3>
              <button onClick={() => setShowInfo(false)} className="text-neutral-400 hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                PEHCHAAN uses consent-based behavioural financial signals to estimate your financial readiness.
              </p>
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-700"><strong>Not an official credit bureau score.</strong> This score is designed specifically to help underserved users build a profile.</p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-700"><strong>Does not guarantee loan approval.</strong> Lending decisions are made independently by financial institutions.</p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-700"><strong>Transparent and Explainable.</strong> You can see exactly which habits are affecting your score on the Key Factors page.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end">
              <button onClick={() => setShowInfo(false)} className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-sm">
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
