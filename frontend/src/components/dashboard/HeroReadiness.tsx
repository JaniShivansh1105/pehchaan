import { TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HeroReadiness() {
  const score = 742
  const maxScore = 900
  const percentage = (score / maxScore) * 100
  
  // SVG arc calculation for a semi-circle gauge - reduced size for 125% zoom fit
  const radius = 70
  const stroke = 10
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * (circumference / 2)

  return (
    <Card className="h-full border-none bg-gradient-to-br from-brand/5 to-transparent relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-brand/5 blur-2xl pointer-events-none" />

      <CardContent className="p-4 lg:p-5 relative z-10 flex-1 flex flex-col justify-center min-h-0">
        <div className="flex flex-row items-center justify-between gap-4 h-full">
          
          <div className="flex flex-col text-left space-y-2.5 flex-1 min-w-0">
            <div>
              <Badge variant="success" className="mb-1.5 text-[10px] px-1.5 py-0">
                Status: GOOD
              </Badge>
              <h2 className="text-xl lg:text-2xl font-display font-semibold text-foreground tracking-tight leading-none truncate">
                Credit Readiness Score
              </h2>
              <p className="text-[11px] text-neutral-500 mt-1.5 truncate">
                Strong and improving financial behaviour.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-lg p-1.5 border border-white/40 w-max shadow-sm">
              <div className="h-7 w-7 rounded-full bg-success-light flex items-center justify-center shrink-0">
                <TrendingUp className="h-3.5 w-3.5 text-success" />
              </div>
              <div className="pr-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-success leading-none">+24 pts</span>
                </div>
                <p className="text-[9px] text-neutral-500 font-medium mt-0.5">Since last assessment</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center shrink-0 w-[140px] relative">
            <div className="relative w-full flex items-end justify-center overflow-hidden" style={{ height: radius + stroke }}>
              <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute top-0 transform -rotate-180"
              >
                <circle
                  stroke="currentColor"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset: circumference / 2 }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="text-neutral-200"
                  strokeLinecap="round"
                />
                <circle
                  stroke="currentColor"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="text-brand transition-all duration-1000 ease-out drop-shadow-md"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-0 flex flex-col items-center pb-1">
                <span className="text-3xl font-display font-bold text-foreground tracking-tighter leading-none">
                  {score}
                </span>
                <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wider leading-none mt-0.5">
                  / {maxScore}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}
