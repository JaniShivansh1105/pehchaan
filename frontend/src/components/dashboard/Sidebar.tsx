"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()

  const mainLinks = [
    { href: "/", label: "Overview", icon: LayoutDashboard },
    { href: "/readiness", label: "My Readiness", icon: Target },
    { href: "/key-factors", label: "Key Factors", icon: BarChart3 },
    { href: "/improvement", label: "Improvement Path", icon: TrendingUp },
    { href: "/simulator", label: "What-If Simulator", icon: Activity },
    { href: "/micro-investment", label: "Micro-Investment", icon: PiggyBank },
    { href: "/progress", label: "Progress", icon: Route },
  ]

  const bottomLinks = [
    { href: "/privacy", label: "Privacy & Consent", icon: ShieldCheck },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

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
          {mainLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-neutral-600 hover:text-foreground hover:bg-neutral-100"
                }`}
              >
                <link.icon className={`h-4 w-4 ${isActive ? "text-brand" : "text-neutral-400"}`} />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-border shrink-0">
        <nav className="space-y-0.5 mb-3">
          {bottomLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-neutral-600 hover:text-foreground hover:bg-neutral-100"
                }`}
              >
                <link.icon className={`h-4 w-4 ${isActive ? "text-brand" : "text-neutral-400"}`} />
                {link.label}
              </Link>
            )
          })}
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
