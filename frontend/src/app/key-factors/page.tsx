"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { mockKeyFactors } from "@/lib/mock-data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarDays, Smartphone, Wallet, History, AlertCircle, TrendingUp, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { EmptyState } from "@/components/ui/states"

import { Suspense } from "react"

const iconMap: Record<string, React.ElementType> = {
  "payment_consistency": CalendarDays,
  "recharge_regularity": Smartphone,
  "spending_stability": Wallet,
  "credit_history": History,
}

type FilterType = 'All' | 'Positive' | 'Needs Attention' | 'Growth Opportunity'

function KeyFactorsContent() {
  const searchParams = useSearchParams()
  const factorParam = searchParams.get('factor')

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('All')

  useEffect(() => {
    if (factorParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedId(factorParam)
      setTimeout(() => {
        const el = document.getElementById(`factor-${factorParam}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [factorParam])

  const filteredFactors = mockKeyFactors.filter(factor => {
    if (filter === 'All') return true
    if (filter === 'Positive') return factor.variant === 'success'
    if (filter === 'Needs Attention') return factor.variant === 'warning'
    if (filter === 'Growth Opportunity') return factor.variant === 'neutral'
    return true
  })

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Key Factors</h1>
        <p className="text-sm text-neutral-500">Understand the behaviours shaping your readiness score.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(['All', 'Positive', 'Needs Attention', 'Growth Opportunity'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors border ${filter === f ? 'bg-brand/10 border-brand/20 text-brand' : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {filteredFactors.length === 0 && (
          <div className="md:col-span-2">
            <EmptyState 
              title="No key factors match" 
              description="Adjust your filters to see more insights."
            />
          </div>
        )}

        {filteredFactors.map((factor) => {
          const Icon = iconMap[factor.id]
          const isSuccess = factor.variant === 'success'
          const isWarning = factor.variant === 'warning'
          const isExpanded = expandedId === factor.id
          
          return (
            <Card key={factor.id} id={`factor-${factor.id}`} className={`border-neutral-200 flex flex-col transition-all ${isExpanded ? 'ring-2 ring-brand/20 shadow-md' : 'shadow-sm'}`}>
              <div 
                className="cursor-pointer hover:bg-neutral-50/50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : factor.id)}
              >
                <CardHeader className="pb-3 border-b border-neutral-100 bg-neutral-50/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                        isSuccess ? 'bg-success-light/30 border-success/20 text-success' :
                        isWarning ? 'bg-warning-light/30 border-warning/20 text-warning' :
                        'bg-neutral-100 border-neutral-200 text-neutral-500'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{factor.name}</CardTitle>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block mt-1 ${
                          isSuccess ? 'text-success bg-success-light/50' :
                          isWarning ? 'text-warning bg-warning-light/50' :
                          'text-neutral-500 bg-neutral-100'
                        }`}>
                          {factor.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-neutral-400 hover:text-foreground transition-colors p-1.5 bg-white rounded-full border border-neutral-200 shadow-sm">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </CardHeader>
                
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Impact</span>
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    {isSuccess ? <TrendingUp className="h-4 w-4 text-success" /> : <AlertCircle className="h-4 w-4 text-warning" />}
                    <span className={isSuccess ? 'text-success' : isWarning ? 'text-warning' : 'text-neutral-700'}>
                      {factor.impact}
                    </span>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="animate-in slide-in-from-top-2 fade-in duration-200 flex-1 flex flex-col">
                  <CardContent className="p-4 pt-0 flex-1 flex flex-col gap-4 border-t border-neutral-100">
                    <div className="pt-4">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Why This Matters</h4>
                      <p className="text-sm text-neutral-700">{factor.description}</p>
                    </div>

                    <div className="bg-brand/5 p-3 rounded-lg border border-brand/10">
                      <h4 className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">Current Insight</h4>
                      <p className="text-sm text-neutral-700">{factor.insight}</p>
                    </div>

                    <div className="mt-auto pt-2">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Suggestion</h4>
                      <p className="text-sm font-medium text-foreground mb-3">{factor.suggestion}</p>
                      
                      {factor.relatedActionId && (
                        <Link 
                          href={`/improvement?action=${factor.relatedActionId}`}
                          className="inline-flex items-center text-xs font-semibold text-brand hover:text-brand-dark bg-brand/10 hover:bg-brand/20 px-3 py-2 rounded-lg transition-colors group"
                        >
                          View Related Improvement <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function KeyFactorsPage() {
  return (
    <Suspense fallback={<div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">Loading...</div>}>
      <KeyFactorsContent />
    </Suspense>
  )
}
