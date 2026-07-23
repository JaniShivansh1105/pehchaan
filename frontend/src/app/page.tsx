import { Sidebar } from "@/components/dashboard/Sidebar"
import { Header } from "@/components/dashboard/Header"
import { HeroReadiness } from "@/components/dashboard/HeroReadiness"
import { KeyFactors } from "@/components/dashboard/KeyFactors"
import { ImprovementPath } from "@/components/dashboard/ImprovementPath"
import { WhatIfSimulator } from "@/components/dashboard/WhatIfSimulator"
import { MicroInvestment } from "@/components/dashboard/MicroInvestment"
import { ReadinessTrend } from "@/components/dashboard/ReadinessTrend"

export default function Dashboard() {
  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden selection:bg-brand/20">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative min-w-0">
        <Header />
        
        {/* Main Content Area - Strictly one screen, no scroll */}
        <main className="flex-1 overflow-hidden p-3 lg:p-4 xl:p-5 flex flex-col min-h-0">
          <div className="mx-auto w-full max-w-[1600px] h-full flex flex-col gap-3 lg:gap-4 xl:gap-5 min-h-0">
            
            {/* ROW 1: approx 28-30% */}
            <section className="flex-[3] min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-5">
              <div className="lg:col-span-5 h-full min-h-0">
                <HeroReadiness />
              </div>
              <div className="lg:col-span-7 h-full min-h-0">
                <ReadinessTrend />
              </div>
            </section>

            {/* ROW 2: approx 38-40% */}
            <section className="flex-[4] min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-5">
              <div className="lg:col-span-7 h-full min-h-0">
                <KeyFactors />
              </div>
              <div className="lg:col-span-5 h-full min-h-0">
                <ImprovementPath />
              </div>
            </section>

            {/* ROW 3: approx 25-28% */}
            <section className="flex-[3] min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-5">
              <div className="lg:col-span-6 h-full min-h-0">
                <WhatIfSimulator />
              </div>
              <div className="lg:col-span-6 h-full min-h-0">
                <MicroInvestment />
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}
