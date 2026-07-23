"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Shield, Lock, X } from "lucide-react"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { useToast } from "@/lib/hooks/useToast"
import { useState } from "react"

export default function PrivacyConsentPage() {
  const [consents, setConsents] = useLocalStorage('pehchaan_consents', {
    financialAnalysis: true,
    rechargeAnalysis: true,
    paymentAnalysis: true,
    personalisedInsights: true,
  })
  const { toast } = useToast()
  
  const [showModal, setShowModal] = useState(false)
  const [showDisableModal, setShowDisableModal] = useState(false)

  const handleToggle = (key: keyof typeof consents) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }))
    toast({ message: "Consent preference updated." })
  }

  const handleEnableAll = () => {
    setConsents({
      financialAnalysis: true,
      rechargeAnalysis: true,
      paymentAnalysis: true,
      personalisedInsights: true,
    })
    toast({ message: "All optional consents enabled." })
  }
  
  const handleDisableOptional = () => {
    setConsents({
      financialAnalysis: true, // Required for core score
      rechargeAnalysis: false,
      paymentAnalysis: false,
      personalisedInsights: false,
    })
    setShowDisableModal(false)
    toast({ message: "Optional consents disabled." })
  }

  const toggleClasses = (active: boolean) => 
    `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background ${active ? 'bg-brand' : 'bg-neutral-200'}`
  
  const thumbClasses = (active: boolean) =>
    `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${active ? 'translate-x-5' : 'translate-x-0.5'}`

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Privacy & Consent</h1>
        <p className="text-sm text-neutral-500">Manage how your data is used. You are always in control.</p>
      </div>

      <div className="bg-brand/5 border border-brand/20 p-5 rounded-xl flex items-start gap-4">
        <div className="h-10 w-10 bg-brand text-white rounded-full flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-brand mb-1">Our Data Philosophy</h3>
          <p className="text-sm text-neutral-700 leading-relaxed">
            PEHCHAAN only accesses the alternative data points you explicitly allow. We do not sell your data. We use it solely to calculate your Credit Readiness Score and provide personalised financial insights.
          </p>
          <button onClick={() => setShowModal(true)} className="mt-2 text-xs font-semibold text-brand hover:underline">
            View Data Usage Details
          </button>
        </div>
      </div>

      <Card className="border-neutral-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="h-5 w-5 text-neutral-400" /> Data Access Preferences
              </CardTitle>
              <CardDescription className="mt-1">
                Toggle the data sources you allow PEHCHAAN to analyze. Disabling core sources may reduce the accuracy of your Readiness Score.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={handleEnableAll} className="text-[10px] font-semibold bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-md transition-colors text-foreground">
                Enable All
              </button>
              <button onClick={() => setShowDisableModal(true)} className="text-[10px] font-semibold bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-md transition-colors text-foreground">
                Disable Optional
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-100 bg-white shadow-sm hover:border-neutral-200 transition-colors">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-foreground">General Financial Behaviour</h4>
                <span className="text-[9px] uppercase font-bold tracking-wider bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded-sm">Essential</span>
              </div>
              <p className="text-xs text-neutral-500">Allow analysis of overall transaction stability and savings patterns.</p>
            </div>
            <button onClick={() => handleToggle('financialAnalysis')} className={toggleClasses(consents.financialAnalysis)} role="switch" aria-checked={consents.financialAnalysis}>
              <span className={thumbClasses(consents.financialAnalysis)} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-100 bg-white shadow-sm hover:border-neutral-200 transition-colors">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-foreground">Utility Payment Patterns</h4>
                <span className="text-[9px] uppercase font-bold tracking-wider bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm">Optional</span>
              </div>
              <p className="text-xs text-neutral-500">Allow analysis of electricity, water, and broadband bill payment consistency.</p>
            </div>
            <button onClick={() => handleToggle('paymentAnalysis')} className={toggleClasses(consents.paymentAnalysis)} role="switch" aria-checked={consents.paymentAnalysis}>
              <span className={thumbClasses(consents.paymentAnalysis)} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-100 bg-white shadow-sm hover:border-neutral-200 transition-colors">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-foreground">Mobile Recharge History</h4>
                <span className="text-[9px] uppercase font-bold tracking-wider bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm">Optional</span>
              </div>
              <p className="text-xs text-neutral-500">Allow analysis of prepaid mobile recharge frequency and amounts.</p>
            </div>
            <button onClick={() => handleToggle('rechargeAnalysis')} className={toggleClasses(consents.rechargeAnalysis)} role="switch" aria-checked={consents.rechargeAnalysis}>
              <span className={thumbClasses(consents.rechargeAnalysis)} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-100 bg-white shadow-sm hover:border-neutral-200 transition-colors">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-foreground">Personalised Improvement Insights</h4>
                <span className="text-[9px] uppercase font-bold tracking-wider bg-brand/10 text-brand px-1.5 py-0.5 rounded-sm">Optional</span>
              </div>
              <p className="text-xs text-neutral-500">Allow PEHCHAAN to generate custom recommendations based on your data.</p>
            </div>
            <button onClick={() => handleToggle('personalisedInsights')} className={toggleClasses(consents.personalisedInsights)} role="switch" aria-checked={consents.personalisedInsights}>
              <span className={thumbClasses(consents.personalisedInsights)} />
            </button>
          </div>

        </CardContent>
      </Card>
      
      {/* Data Usage Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-neutral-200 relative">
            <div className="p-6 pb-4 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand" /> Data Usage Flow
              </h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                In this prototype, no real external financial data is collected or transmitted.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Secure Connection</p>
                    <p className="text-xs text-neutral-500">You grant read-only access to specific behaviour patterns.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Signal Processing</p>
                    <p className="text-xs text-neutral-500">The platform evaluates frequency and consistency, not personal identifiable information.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Local Scoring</p>
                    <p className="text-xs text-neutral-500">A Readiness Score is generated to provide you with insights.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors">
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {showDisableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden border border-neutral-200 relative">
            <div className="p-6 pb-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-foreground">Disable Optional Data?</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-600 leading-relaxed">
                Disabling these sources will limit PEHCHAAN's ability to accurately calculate your Credit Readiness Score and may lower your score projection.
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                You can re-enable them at any time.
              </p>
            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setShowDisableModal(false)} className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleDisableOptional} className="px-4 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors">
                Disable
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
