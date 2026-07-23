"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { mockUser } from "@/lib/mock-data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SlidersHorizontal, ArrowRight, RotateCcw, Sparkles, AlertCircle } from "lucide-react"

import { Suspense } from "react"

type ControlLevel = 'Current' | 'Moderate' | 'Strong'

const controlsInfo = [
  { id: 'payment', label: 'Payment Consistency', impact: { 'Current': 0, 'Moderate': 15, 'Strong': 30 }, currentDesc: 'Regular payments, but occasional delays.' },
  { id: 'recharge', label: 'Recharge Regularity', impact: { 'Current': 0, 'Moderate': 10, 'Strong': 20 }, currentDesc: 'Stable, could be more consistent.' },
  { id: 'spending', label: 'Spending Stability', impact: { 'Current': 0, 'Moderate': 25, 'Strong': 45 }, currentDesc: 'High variation in discretionary spending.' },
  { id: 'savings', label: 'Stable Savings Pattern', impact: { 'Current': 0, 'Moderate': 30, 'Strong': 60 }, currentDesc: 'No formal savings habit detected.' }
]

function SimulatorContent() {
  const searchParams = useSearchParams()
  const scenarioParam = searchParams.get('scenario')

  const [controls, setControls] = useState<Record<string, ControlLevel>>({
    payment: 'Current',
    recharge: 'Current',
    spending: 'Current',
    savings: 'Current'
  })

  useEffect(() => {
    if (scenarioParam && controls[scenarioParam] !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setControls(prev => ({ ...prev, [scenarioParam]: 'Strong' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioParam])

  const handleControlChange = (id: string, level: ControlLevel) => {
    setControls(prev => ({ ...prev, [id]: level }))
  }

  const handleReset = () => {
    setControls({
      payment: 'Current',
      recharge: 'Current',
      spending: 'Current',
      savings: 'Current'
    })
  }

  const handleSuggested = () => {
    setControls({
      payment: 'Strong', // Easy win
      recharge: 'Current', // Already okay
      spending: 'Moderate', // Realistic goal
      savings: 'Moderate' // Realistic goal
    })
  }

  const baseScore = mockUser.readinessScore
  const change = controlsInfo.reduce((acc, curr) => acc + curr.impact[controls[curr.id]], 0)
  const displayedScore = Math.min(baseScore + change, 900)
  
  const isChanged = change > 0

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">What-If Simulator</h1>
        <p className="text-sm text-neutral-500">Adjust behavioural levers to see how they impact your projected score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Simulator Controls */}
        <div className="space-y-4">
          <Card className="border-neutral-200 h-full shadow-sm">
            <CardHeader className="pb-3 border-b border-neutral-100 bg-neutral-50/50 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-brand" /> Behavioural Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              
              {controlsInfo.map(control => (
                <div key={control.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{control.label}</span>
                    <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                      +{control.impact[controls[control.id]]} pts
                    </span>
                  </div>
                  <div className="flex bg-neutral-100 p-1 rounded-lg">
                    {(['Current', 'Moderate', 'Strong'] as ControlLevel[]).map(level => (
                      <button
                        key={level}
                        onClick={() => handleControlChange(control.id, level)}
                        className={`flex-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-all ${
                          controls[control.id] === level 
                            ? (level === 'Current' ? 'bg-white text-neutral-700 shadow-sm' : 'bg-brand text-white shadow-sm') 
                            : 'text-neutral-500 hover:text-foreground hover:bg-neutral-200/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  {controls[control.id] === 'Current' && (
                    <p className="text-[10px] text-neutral-500">{control.currentDesc}</p>
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleSuggested}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" /> Realistic Goal
                </button>
                <button 
                  onClick={handleReset}
                  disabled={!isChanged}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simulator Results */}
        <div className="space-y-4">
          <Card className={`border-2 transition-all duration-500 h-full flex flex-col ${
            isChanged ? 'border-brand/30 bg-brand/5 shadow-lg shadow-brand/5' : 'border-neutral-200 bg-white shadow-sm'
          }`}>
            <CardContent className="p-6 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[300px]">
              
              {isChanged && (
                <div className="absolute top-0 right-0 p-16 bg-gradient-to-bl from-brand/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              )}

              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">Projected Readiness</h3>
              
              <div className="flex items-center justify-center gap-4 sm:gap-8 w-full relative z-10">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Current</span>
                  <span className="text-4xl sm:text-5xl font-display font-bold text-neutral-300">{baseScore}</span>
                </div>
                
                <div className="flex flex-col items-center flex-1 shrink-0">
                  {isChanged ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col items-center">
                      <div className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-2 bg-success-light text-success whitespace-nowrap">
                        +{change} pts
                      </div>
                      <ArrowRight className="h-6 w-6 text-success" />
                    </div>
                  ) : (
                    <div className="h-0.5 w-12 bg-neutral-200 rounded-full"></div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${isChanged ? 'text-brand' : 'text-neutral-400'}`}>New</span>
                  <span className={`text-5xl sm:text-6xl font-display font-bold transition-colors duration-500 ${
                    !isChanged ? 'text-foreground' : 'text-success drop-shadow-sm'
                  }`}>
                    {displayedScore}
                  </span>
                </div>
              </div>
              
              <div className="mt-8 text-center max-w-sm relative z-10 min-h-[40px]">
                <p className="text-xs text-neutral-500 font-medium">
                  {isChanged 
                    ? `By making these behavioral changes, you could increase your score to ${displayedScore}.`
                    : "Adjust the behavioral controls to simulate potential readiness improvements."}
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 mt-6 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-500 leading-relaxed">
            * <strong>Disclaimer:</strong> This simulation illustrates potential readiness changes based on modelled behavioural improvements. It is not a guaranteed financial outcome and does not imply actual credit approval by lending institutions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">Loading...</div>}>
      <SimulatorContent />
    </Suspense>
  )
}
