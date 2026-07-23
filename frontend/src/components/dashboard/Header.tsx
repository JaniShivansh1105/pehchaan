import { Bell, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur-xl shrink-0">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button className="lg:hidden text-neutral-500 hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-display font-semibold tracking-tight text-foreground leading-none">
              Good morning, Shivansh
            </h1>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Here&apos;s your financial readiness overview.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-foreground transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-neutral-200 border border-border overflow-hidden shrink-0">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Shivansh"
              alt="Profile avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
