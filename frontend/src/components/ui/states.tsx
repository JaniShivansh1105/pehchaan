import { Loader2, AlertCircle, FileX } from "lucide-react"
import { ReactNode } from "react"

interface StateProps {
  title?: string
  description?: string
  className?: string
  children?: ReactNode
}

export function LoadingState({ title = "Loading...", description, className = "" }: StateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[200px] ${className}`}>
      <Loader2 className="h-8 w-8 text-brand animate-spin mb-4" />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
    </div>
  )
}

export function EmptyState({ title = "No results found", description, className = "", children }: StateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-neutral-50 rounded-xl border border-neutral-200 min-h-[200px] ${className}`}>
      <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
        <FileX className="h-6 w-6 text-neutral-400" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-neutral-500 mt-1 max-w-sm">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

interface ErrorStateProps extends StateProps {
  onRetry?: () => void
}

export function ErrorState({ title = "Something went wrong", description = "We encountered an error loading this data.", onRetry, className = "" }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-destructive/5 rounded-xl border border-destructive/20 min-h-[200px] ${className}`}>
      <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-neutral-500 mt-1 max-w-sm">{description}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
