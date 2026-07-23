"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="mx-auto w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mb-8 relative">
          <AlertTriangle className="h-10 w-10 text-brand relative z-10" />
          <div className="absolute inset-0 bg-brand/5 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        <h1 className="text-4xl font-display font-bold text-foreground">
          Page Not Found
        </h1>
        
        <p className="text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved. Let's get you back to your financial readiness dashboard.
        </p>

        <div className="pt-6">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-sm w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>
        </div>

      </div>
    </div>
  )
}
