"use client"

import { useState, useMemo } from "react"
import { mockReadinessHistory, mockUser } from "@/lib/mock-data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Route, TrendingUp, Calendar, Trophy, Zap } from "lucide-react"
import { EmptyState } from "@/components/ui/states"

type TimeRange = '3M' | '6M' | '1Y'
type MilestoneType = 'All' | 'Readiness' | 'Habits'

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('6M')
  const [filter, setFilter] = useState<MilestoneType>('All')

  const chartData = useMemo(() => {
    switch (timeRange) {
      case '3M': return mockReadinessHistory.slice(-3)
      case '1Y': return mockReadinessHistory // Assume mock has 12 months in reality, using all
      case '6M': 
      default: return mockReadinessHistory.slice(-6)
    }
  }, [timeRange])

  const milestones = [
    { id: 1, type: 'Readiness', title: 'Reached "Good" Readiness', date: 'July', desc: 'You successfully pushed your score past the 700 threshold.', icon: Trophy, color: 'bg-brand' },
    { id: 2, type: 'Habits', title: 'Perfect Payment Streak', date: 'May', desc: 'Hit 3 consecutive months of on-time utility payments.', icon: Calendar, color: 'bg-success' },
    { id: 3, type: 'Actions', title: 'Completed Savings Goal', date: 'March', desc: 'Started a stable discretionary savings habit.', icon: Zap, color: 'bg-warning' },
    { id: 4, type: 'Readiness', title: 'Journey Started', date: 'Feb', desc: 'Joined PEHCHAAN and completed your first assessment.', icon: Route, color: 'bg-neutral-300', textCol: 'text-neutral-600' },
  ]

  const filteredMilestones = milestones.filter(m => filter === 'All' || m.type === filter)

  const startScore = chartData[0]?.score || 0
  const totalImprovement = mockUser.readinessScore - startScore

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">My Progress</h1>
        <p className="text-sm text-neutral-500">Track your financial readiness journey over time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-neutral-200 bg-white shadow-sm">
          <CardContent className="p-5 flex items-center gap-4 h-full">
            <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-6 w-6 text-brand" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Growth ({timeRange})</p>
              <p className="text-2xl font-display font-bold text-foreground">{totalImprovement > 0 ? '+' : ''}{totalImprovement} pts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white shadow-sm">
          <CardContent className="p-5 flex items-center gap-4 h-full">
            <div className="h-12 w-12 rounded-full bg-success-light/50 flex items-center justify-center shrink-0">
              <Calendar className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Current Score</p>
              <p className="text-2xl font-display font-bold text-foreground">{mockUser.readinessScore}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-neutral-200 bg-white shadow-sm">
          <CardContent className="p-5 flex items-center gap-4 h-full">
            <div className="h-12 w-12 rounded-full bg-warning-light/50 flex items-center justify-center shrink-0">
              <Trophy className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Best Streak</p>
              <p className="text-2xl font-display font-bold text-foreground">6 Payments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-4">
          <CardTitle className="text-lg">Readiness Trend</CardTitle>
          <div className="flex bg-neutral-100 p-1 rounded-lg">
            {(['3M', '6M', '1Y'] as TimeRange[]).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${timeRange === range ? 'bg-white text-foreground shadow-sm' : 'text-neutral-500 hover:text-foreground'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-neutral-500)', fontWeight: 500 }} dy={10} />
                <YAxis domain={[500, 800]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-neutral-500)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  itemStyle={{ color: 'var(--color-brand)', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--color-neutral-500)', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="score" stroke="var(--color-brand)" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" activeDot={{ r: 6, fill: "white", stroke: "var(--color-brand)", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Route className="h-5 w-5 text-neutral-400" /> Milestone Timeline
          </CardTitle>
          <div className="flex gap-2">
            {(['All', 'Readiness', 'Habits'] as MilestoneType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors border ${filter === f ? 'bg-brand/10 border-brand/20 text-brand' : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            {filteredMilestones.length === 0 && (
              <EmptyState 
                title="No milestones found" 
                description="Try selecting a different filter."
                className="py-12 border-none shadow-none bg-transparent"
              />
            )}

            {filteredMilestones.map((m, i) => (
              <div key={m.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group hover:scale-[1.01] transition-transform">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${m.color} ${m.textCol || 'text-white'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10`}>
                  <m.icon className="h-4 w-4" />
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${i === 0 ? 'border-brand/20 bg-brand/5' : 'border-neutral-200 bg-white'} shadow-sm`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-foreground">{m.title}</h4>
                    <span className={`text-xs font-semibold ${i === 0 ? 'text-brand' : 'text-neutral-500'}`}>{m.date}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{m.desc}</p>
                </div>
              </div>
            ))}
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
