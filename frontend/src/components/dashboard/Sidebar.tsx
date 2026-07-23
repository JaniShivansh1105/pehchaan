import Link from "next/link"
import {
  LayoutDashboard,
  Target,
  BarChart3,
  TrendingUp,
  Activity,
  PiggyBank,
  Route,
  ShieldCheck,
  Settings,
} from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-border bg-background/50 backdrop-blur-xl flex flex-col h-full sticky top-0 hidden lg:flex">
      <div className="p-4 lg:p-5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">P</span>
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-foreground">
            PEHCHAAN
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-1 min-h-0">
        <nav className="space-y-0.5">
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-brand/10 text-brand font-medium text-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <Target className="h-4 w-4 text-neutral-400" />
            My Readiness
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <BarChart3 className="h-4 w-4 text-neutral-400" />
            Key Factors
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <TrendingUp className="h-4 w-4 text-neutral-400" />
            Improvement Path
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <Activity className="h-4 w-4 text-neutral-400" />
            What-If Simulator
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <PiggyBank className="h-4 w-4 text-neutral-400" />
            Micro-Investment
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <Route className="h-4 w-4 text-neutral-400" />
            Progress
          </Link>
        </nav>
      </div>

      <div className="p-3 border-t border-border shrink-0">
        <nav className="space-y-0.5 mb-3">
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <ShieldCheck className="h-4 w-4 text-neutral-400" />
            Privacy & Consent
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-neutral-600 hover:text-foreground hover:bg-neutral-100 transition-colors text-sm"
          >
            <Settings className="h-4 w-4 text-neutral-400" />
            Settings
          </Link>
        </nav>
        
        <div className="flex flex-col items-center gap-1 pt-3 border-t border-border/50 text-neutral-400">
          <ShieldCheck className="h-3 w-3" />
          <span className="text-[9px] font-medium uppercase tracking-wider text-center">
            Your data is used only<br/>with your consent
          </span>
        </div>
      </div>
    </aside>
  )
}
