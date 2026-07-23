"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { CheckCircle2, X } from "lucide-react"

type ToastOptions = {
  message: string
  duration?: number
}

interface ToastContextType {
  toast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  const toast = useCallback(({ message, duration = 3000 }: ToastOptions) => {
    setMessage(message)
    setIsVisible(true)
    
    setTimeout(() => {
      setIsVisible(false)
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">{message}</span>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-neutral-400 hover:text-white transition-colors ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
