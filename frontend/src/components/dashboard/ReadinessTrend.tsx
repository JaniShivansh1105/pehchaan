"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

export function ReadinessTrend() {
  const data = [
    { month: "Feb", score: 618 },
    { month: "Mar", score: 645 },
    { month: "Apr", score: 662 },
    { month: "May", score: 701 },
    { month: "Jun", score: 724 },
    { month: "Jul", score: 742 },
  ]

  return (
    <Card className="h-full flex flex-col min-h-0">
      <CardHeader className="p-3 lg:p-4 pb-0 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Readiness Trend</CardTitle>
          <span className="text-[10px] text-neutral-500 font-medium bg-neutral-100 px-1.5 py-0.5 rounded-md">Last 6 months</span>
        </div>
      </CardHeader>
      <CardContent className="p-3 lg:p-4 pt-2 flex-1 min-h-0">
        <div className="w-full h-full min-h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="var(--color-border)" 
              />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--color-neutral-400)', fontWeight: 600 }}
                dy={5}
              />
              <YAxis 
                domain={[500, 800]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--color-neutral-400)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  padding: '6px 8px'
                }}
                itemStyle={{ color: 'var(--color-brand)', fontWeight: 600, fontSize: '12px' }}
                labelStyle={{ color: 'var(--color-neutral-500)', fontSize: '10px', marginBottom: '2px' }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="var(--color-brand)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorScore)" 
                activeDot={{ r: 4, fill: "white", stroke: "var(--color-brand)", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
