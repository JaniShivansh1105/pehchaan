import * as React from "react"

const badgeVariants = {
  default: "bg-neutral-100 text-neutral-900 border-transparent",
  success: "bg-success-light text-success border-transparent",
  warning: "bg-warning-light text-warning border-transparent",
  danger: "bg-danger-light text-danger border-transparent",
  outline: "text-neutral-900 border-border",
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${badgeVariants[variant]} ${className || ""}`}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
