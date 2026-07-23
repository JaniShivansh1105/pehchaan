import { HeroReadiness } from "@/components/dashboard/HeroReadiness"
import { KeyFactors } from "@/components/dashboard/KeyFactors"
import { ImprovementPath } from "@/components/dashboard/ImprovementPath"
import { WhatIfSimulator } from "@/components/dashboard/WhatIfSimulator"
import { MicroInvestment } from "@/components/dashboard/MicroInvestment"
import { ReadinessTrend } from "@/components/dashboard/ReadinessTrend"

export default function Dashboard() {
  return (
    <div className="lg:h-full p-3 lg:p-4 xl:p-5 flex flex-col min-h-0 lg:overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] lg:h-full flex flex-col gap-4 lg:gap-4 xl:gap-5 min-h-0">
        
        {/* ROW 1: approx 28-30% */}
        <section className="flex-none lg:flex-[3] min-h-[300px] lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 xl:gap-5">
          <div className="lg:col-span-5 h-full min-h-0">
            <HeroReadiness />
          </div>
          <div className="lg:col-span-7 h-full min-h-0">
            <ReadinessTrend />
          </div>
        </section>

        {/* ROW 2: approx 38-40% */}
        <section className="flex-none lg:flex-[4] min-h-[400px] lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 xl:gap-5">
          <div className="lg:col-span-7 h-full min-h-0">
            <KeyFactors />
          </div>
          <div className="lg:col-span-5 h-full min-h-0">
            <ImprovementPath />
          </div>
        </section>

        {/* ROW 3: approx 25-28% */}
        <section className="flex-none lg:flex-[3] min-h-[350px] lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-4 xl:gap-5">
          <div className="lg:col-span-6 h-full min-h-0">
            <WhatIfSimulator />
          </div>
          <div className="lg:col-span-6 h-full min-h-0">
            <MicroInvestment />
          </div>
        </section>

      </div>
    </div>
  )
}
