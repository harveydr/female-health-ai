"use client"

import { Moon, Clock, Sunrise, TrendingUp, ChevronRight, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HealthScore } from "@/components/health-score"
import { cn } from "@/lib/utils"

// Mock sleep data
const sleepData = {
  score: 82,
  totalSleep: "7h 23m",
  bedTime: "23:15",
  wakeTime: "06:38",
  deepSleep: "1h 32m",
  lightSleep: "4h 18m",
  remSleep: "1h 33m",
  awake: "0h 12m",
  sleepLatency: "8m",
  efficiency: 94,
  heartRate: { avg: 58, min: 52, max: 72 },
  hrv: { avg: 48, trend: "up" },
  breathRate: { avg: 14, trend: "stable" },
}

const sleepStages = [
  { label: "深睡", value: sleepData.deepSleep, percentage: 21, color: "bg-health-sleep" },
  { label: "浅睡", value: sleepData.lightSleep, percentage: 58, color: "bg-health-sleep/60" },
  { label: "快速眼动", value: sleepData.remSleep, percentage: 21, color: "bg-health-cycle" },
]

const weeklyData = [
  { day: "周一", score: 75, hours: 6.5 },
  { day: "周二", score: 82, hours: 7.2 },
  { day: "周三", score: 78, hours: 6.8 },
  { day: "周四", score: 85, hours: 7.5 },
  { day: "周五", score: 70, hours: 6.0 },
  { day: "周六", score: 88, hours: 8.2 },
  { day: "周日", score: 82, hours: 7.4 },
]

export function SleepTab() {
  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">睡眠分析</h1>
        <p className="text-sm text-muted-foreground">昨晚 {sleepData.bedTime} - 今早 {sleepData.wakeTime}</p>
      </header>

      {/* Sleep Score */}
      <Card className="border-0 bg-gradient-to-br from-health-sleep/5 to-card shadow-lg">
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-8">
            <HealthScore
              score={sleepData.score}
              label="睡眠分数"
              size="md"
            />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">总时长</span>
                <span className="font-semibold text-foreground">{sleepData.totalSleep}</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">入睡用时</span>
                <span className="font-semibold text-foreground">{sleepData.sleepLatency}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">睡眠效率</span>
                <span className="font-semibold text-health-good">{sleepData.efficiency}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Stages */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">睡眠阶段</h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            详情
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        {/* Sleep Stage Timeline */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            {/* Timeline visualization */}
            <div className="mb-4 flex h-8 overflow-hidden rounded-lg">
              {sleepStages.map((stage, index) => (
                <div
                  key={stage.label}
                  className={cn(stage.color, "transition-all duration-300")}
                  style={{ width: `${stage.percentage}%` }}
                />
              ))}
            </div>
            
            {/* Stage breakdown */}
            <div className="grid grid-cols-3 gap-4">
              {sleepStages.map((stage) => (
                <div key={stage.label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className={cn("h-2.5 w-2.5 rounded-full", stage.color)} />
                    <span className="text-xs text-muted-foreground">{stage.label}</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{stage.value}</p>
                  <p className="text-xs text-muted-foreground">{stage.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sleep Metrics */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-foreground">睡眠期间生理指标</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">平均心率</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-health-heart">{sleepData.heartRate.avg}</p>
              <p className="text-xs text-muted-foreground">bpm</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">平均 HRV</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-health-good">{sleepData.hrv.avg}</p>
              <p className="text-xs text-muted-foreground">ms</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">呼吸频率</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-foreground">{sleepData.breathRate.avg}</p>
              <p className="text-xs text-muted-foreground">次/分</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weekly Trend */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">本周睡眠趋势</h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            更多
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-end justify-between gap-2">
              {weeklyData.map((day, index) => {
                const isToday = index === weeklyData.length - 1
                const barHeight = (day.score / 100) * 80
                return (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {day.hours}h
                    </span>
                    <div
                      className={cn(
                        "w-full rounded-t-md transition-all duration-300",
                        isToday ? "bg-health-sleep" : "bg-health-sleep/40"
                      )}
                      style={{ height: `${barHeight}px` }}
                    />
                    <span
                      className={cn(
                        "text-xs",
                        isToday ? "font-semibold text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {day.day.slice(-1)}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sleep Tips */}
      <section>
        <Card className="border-0 bg-gradient-to-r from-health-sleep/10 to-health-cycle/10 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-health-sleep/20">
                <Info className="h-4 w-4 text-health-sleep" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">睡眠建议</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  您的深睡比例略低于理想值。建议睡前1小时避免使用电子设备，保持卧室温度在18-22°C之间。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
