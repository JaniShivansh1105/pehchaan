import * as React from "react"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  indicatorColor?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indicatorColor = "bg-brand", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        className={`relative h-2 w-full overflow-hidden rounded-full bg-neutral-200 ${className || ""}`}
        {...props}
      >
        <div
          className={`h-full w-full flex-1 transition-all duration-500 ease-in-out ${indicatorColor}`}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
