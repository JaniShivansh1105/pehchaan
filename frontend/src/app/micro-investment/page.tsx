"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShieldAlert, BookOpen, Lightbulb, PlayCircle, Target, ArrowRight, X } from "lucide-react"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { useToast } from "@/lib/hooks/useToast"

type RiskProfile = 'Conservative' | 'Moderate' | 'Growth-Oriented'

export default function MicroInvestmentPage() {
  const [checklist, setChecklist] = useLocalStorage('pehchaan_growth_checklist', {
    emergencyFund: false,
    healthInsurance: false,
    debtManagement: true
  })
  const { toast } = useToast()
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('Conservative')
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] }
      if (next[key]) toast({ message: "Task marked as complete!" })
      return next
    })
  }

  const riskContent = {
    'Conservative': {
      desc: 'Focuses on capital preservation and high liquidity. Ideal for building emergency funds.',
      cards: [
        { id: 'fds', icon: BookOpen, color: 'text-success', bg: 'bg-success-light/30', title: 'Fixed Deposits Basics', desc: 'Secure, guaranteed returns for absolute safety of capital.' },
        { id: 'rd', icon: Lightbulb, color: 'text-brand', bg: 'bg-brand/10', title: 'Recurring Deposits', desc: 'Build savings predictably with small monthly contributions.' }
      ]
    },
    'Moderate': {
      desc: 'Balances preservation with moderate growth. Ideal for mid-term financial goals.',
      cards: [
        { id: 'mf', icon: Lightbulb, color: 'text-brand', bg: 'bg-brand/10', title: 'Understanding Mutual Funds', desc: 'Learn how SIPs allow you to build wealth gradually with small monthly contributions.' },
        { id: 'comp', icon: BookOpen, color: 'text-success', bg: 'bg-success-light/30', title: 'Power of Compounding', desc: 'Discover how time and small consistent savings create significant long-term impact.' }
      ]
    },
    'Growth-Oriented': {
      desc: 'Focuses on higher long-term growth potentials. Requires accepting market volatility.',
      cards: [
        { id: 'index', icon: Lightbulb, color: 'text-brand', bg: 'bg-brand/10', title: 'Index Funds', desc: 'Low-cost way to passively track the overall stock market performance.' },
        { id: 'risk', icon: Target, color: 'text-warning', bg: 'bg-warning-light/30', title: 'Managing Market Risk', desc: 'Understand volatility and how diversification protects your portfolio.' }
      ]
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Financial Growth</h1>
        <p className="text-sm text-neutral-500">Learn about pathways to build your financial foundation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card className="md:col-span-1 border-neutral-200 bg-neutral-50/50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-neutral-100 flex justify-between items-center shadow-sm">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Readiness</span>
              <span className="text-sm font-bold text-success">Good</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Risk Tolerance</span>
              <select 
                value={riskProfile} 
                onChange={(e) => setRiskProfile(e.target.value as RiskProfile)}
                className="w-full text-sm font-bold p-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-brand shadow-sm"
              >
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Growth-Oriented">Growth-Oriented</option>
              </select>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed pt-2">
              Based on your selection, we recommend focusing on <strong>{riskProfile.toLowerCase()}</strong> educational paths below.
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-brand/20 shadow-sm">
          <CardHeader className="pb-3 border-b border-neutral-100">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-5 w-5 text-brand" /> Core Foundation Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {[
              { id: 'emergencyFund', title: "Emergency Fund", desc: "Save 3-6 months of expenses for unexpected events." },
              { id: 'healthInsurance', title: "Health Insurance", desc: "Protect yourself from sudden medical costs." },
              { id: 'debtManagement', title: "Debt Management", desc: "Clear high-interest personal loans first." }
            ].map((item) => {
              const done = checklist[item.id as keyof typeof checklist]
              return (
                <div key={item.id} onClick={() => toggleChecklist(item.id as keyof typeof checklist)} className={`flex gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${done ? 'bg-neutral-50 border-neutral-200 opacity-70' : 'bg-white border-neutral-200 hover:border-brand shadow-sm'}`}>
                  <div className={`mt-0.5 shrink-0 flex items-center justify-center h-5 w-5 rounded-full border transition-colors ${done ? 'bg-success border-success text-white' : 'border-neutral-300'}`}>
                    {done && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold transition-colors ${done ? 'text-neutral-500 line-through' : 'text-foreground'}`}>{item.title}</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="border-neutral-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <CardTitle className="text-lg">Recommended Learning Paths</CardTitle>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-brand/10 text-brand px-2 py-1 rounded-md">
              {riskProfile} Path
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500 mb-6">{riskContent[riskProfile].desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {riskContent[riskProfile].cards.map(card => (
              <div 
                key={card.id} 
                onClick={() => setActiveModal(card.id)}
                className="group border border-neutral-200 rounded-xl p-5 hover:border-brand/50 hover:shadow-md transition-all cursor-pointer bg-white"
              >
                <div className={`${card.bg} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-brand transition-colors">{card.title}</h3>
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{card.desc}</p>
                <div className={`flex items-center text-xs font-semibold ${card.color}`}>
                  <PlayCircle className="h-4 w-4 mr-1.5" /> Start Module 1
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-500 leading-relaxed">
            * <strong>Educational Purpose Only:</strong> The information provided in the growth path is for educational purposes only. PEHCHAAN does not provide direct investment advice or recommend specific financial products. All investments carry risk.
          </p>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-neutral-200">
            <div className="p-6 pb-4 border-b border-neutral-100 flex justify-between items-center bg-brand/5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-brand" /> Learning Module
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h4 className="text-xl font-display font-bold text-foreground">Interactive Lesson</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                This is a placeholder for the educational content. In a fully built application, this would contain an interactive walkthrough, quiz, or video explaining the concepts of the selected module in simple terms.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 mt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Key Takeaways:</p>
                <ul className="text-sm text-neutral-600 list-disc pl-5 space-y-1">
                  <li>Start small, but start early.</li>
                  <li>Consistency is more important than amount.</li>
                  <li>Always maintain an emergency buffer first.</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
                Close
              </button>
              <button onClick={() => {
                setActiveModal(null)
                toast({ message: "Module marked as completed!" })
              }} className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors">
                Complete Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
