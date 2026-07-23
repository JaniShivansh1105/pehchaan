"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { mockImprovements } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Target, Activity, TrendingUp, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { useToast } from "@/lib/hooks/useToast"
import { EmptyState } from "@/components/ui/states"

import { Suspense } from "react"

type StatusType = 'Not Started' | 'In Progress' | 'Completed'
type FilterType = 'All' | 'High Priority' | 'In Progress' | 'Completed'

function ImprovementPathContent() {
  const searchParams = useSearchParams()
  const actionParam = searchParams.get('action')
  
  const [statuses, setStatuses] = useLocalStorage<Record<string, StatusType>>('pehchaan_improvement_statuses', {})
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('All')
  const { toast } = useToast()

  useEffect(() => {
    if (actionParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedId(actionParam)
      // Small timeout to allow render then scroll
      setTimeout(() => {
        const el = document.getElementById(`action-${actionParam}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [actionParam])

  const getStatus = (id: string): StatusType => {
    return statuses[id] || 'Not Started'
  }

  const handleStatusChange = (id: string, newStatus: StatusType) => {
    setStatuses(prev => ({ ...prev, [id]: newStatus }))
    toast({ message: `Action marked as ${newStatus}` })
  }

  const completedCount = mockImprovements.filter(i => getStatus(i.id) === 'Completed').length
  const totalCount = mockImprovements.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  const filteredImprovements = mockImprovements.filter(imp => {
    if (filter === 'All') return true
    if (filter === 'High Priority') return imp.primary
    if (filter === 'In Progress') return getStatus(imp.id) === 'In Progress'
    if (filter === 'Completed') return getStatus(imp.id) === 'Completed'
    return true
  })

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Improvement Path</h1>
        <p className="text-sm text-neutral-500">Personalised recommendations to strengthen your financial profile.</p>
      </div>

      <Card className="border-neutral-200 shadow-sm bg-white">
        <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-foreground">Overall Progress</span>
              <span className="text-xs font-semibold text-neutral-500">{completedCount} of {totalCount} actions completed</span>
            </div>
            <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
              <span className="text-sm font-bold text-brand">{progressPercent}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 pt-2">
        {(['All', 'High Priority', 'In Progress', 'Completed'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors border ${filter === f ? 'bg-brand/10 border-brand/20 text-brand' : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredImprovements.length === 0 && (
          <EmptyState 
            title="No actions match" 
            description="Try changing your filter to see other recommended steps."
          />
        )}

        {filteredImprovements.map((improvement) => {
          const status = getStatus(improvement.id)
          const isExpanded = expandedId === improvement.id
          
          return (
            <Card key={improvement.id} id={`action-${improvement.id}`} className={`border transition-all ${improvement.primary ? 'border-brand/30 bg-brand/5 shadow-md' : 'border-neutral-200 bg-white shadow-sm'} ${isExpanded ? 'ring-2 ring-brand/20 ring-offset-2' : ''}`}>
              <CardContent className="p-0">
                <div 
                  className="p-5 sm:p-6 cursor-pointer hover:bg-white/40 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : improvement.id)}
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        {improvement.primary && (
                          <div className="bg-brand text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> Top Priority
                          </div>
                        )}
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          status === 'Completed' ? 'bg-success-light text-success' :
                          status === 'In Progress' ? 'bg-warning-light text-warning' : 'bg-neutral-100 text-neutral-500'
                        }`}>
                          {status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                          {status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-foreground leading-tight">
                        {improvement.title}
                      </h3>
                      
                      <p className="text-sm text-neutral-600 line-clamp-1">
                        {improvement.suggestedBehaviour}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:justify-center sm:items-end sm:w-48 shrink-0 gap-3">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1">Potential Influence</p>
                        <p className="text-lg font-bold text-brand flex items-center sm:justify-end gap-1.5">
                          <TrendingUp className="h-5 w-5" /> {improvement.impact}
                        </p>
                      </div>
                      <button className="text-neutral-400 hover:text-foreground transition-colors p-2 bg-neutral-100 rounded-full sm:mt-2">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 sm:px-6 sm:pb-6 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-100 space-y-4 shadow-sm">
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Why it matters</h4>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {improvement.whyItMatters}
                        </p>
                      </div>
                      
                      <div className="bg-brand/5 p-3 rounded-lg border border-brand/10">
                        <h4 className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">Action Plan</h4>
                        <p className="text-sm text-neutral-700 leading-relaxed">
                          {improvement.suggestedBehaviour}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-neutral-100 gap-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
                          <Target className="h-4 w-4" /> Difficulty: {improvement.difficulty}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <select 
                            value={status}
                            onChange={(e) => handleStatusChange(improvement.id, e.target.value as StatusType)}
                            className={`text-sm font-bold px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand/50 ${
                              status === 'Completed' ? 'bg-success-light border-success/20 text-success' :
                              status === 'In Progress' ? 'bg-warning-light border-warning/20 text-warning' :
                              'bg-neutral-50 border-neutral-200 text-neutral-700'
                            }`}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 mt-8">
        <div className="flex items-start gap-3">
          <Activity className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-500 leading-relaxed">
            * <strong>Disclaimer:</strong> Potential impacts are educational estimates based on typical scoring models. Changes to your actual readiness score depend on various factors and are not guaranteed. Taking these actions promotes overall financial health.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ImprovementPathPage() {
  return (
    <Suspense fallback={<div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">Loading...</div>}>
      <ImprovementPathContent />
    </Suspense>
  )
}
