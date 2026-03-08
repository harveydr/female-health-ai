"use client"

import { useState } from "react"
import { Calendar, Droplets, ThermometerSun, Moon, Heart, ChevronLeft, ChevronRight, Info, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock cycle data
const cycleData = {
  currentDay: 14,
  cycleLength: 28,
  periodLength: 5,
  phase: "ovulation" as const,
  phaseName: "排卵期",
  nextPeriod: "14天后",
  fertileWindow: "易孕期 第2天",
  lastPeriodStart: "2026-02-22",
  predictedOvulation: "2026-03-08",
  temperature: {
    current: 36.7,
    trend: "rising",
    baseline: 36.3,
  },
  symptoms: [] as string[],
}

const phaseInfo = {
  menstruation: { name: "月经期", color: "bg-health-cycle", textColor: "text-health-cycle", days: "1-5" },
  follicular: { name: "卵泡期", color: "bg-health-good", textColor: "text-health-good", days: "6-10" },
  ovulation: { name: "排卵期", color: "bg-health-heart", textColor: "text-health-heart", days: "11-16" },
  luteal: { name: "黄体期", color: "bg-health-stress", textColor: "text-health-stress", days: "17-28" },
}

const calendarDays = [
  { date: 1, phase: "menstruation", isToday: false },
  { date: 2, phase: "menstruation", isToday: false },
  { date: 3, phase: "menstruation", isToday: false },
  { date: 4, phase: "menstruation", isToday: false },
  { date: 5, phase: "menstruation", isToday: false },
  { date: 6, phase: "follicular", isToday: false },
  { date: 7, phase: "follicular", isToday: false },
  { date: 8, phase: "follicular", isToday: false },
  { date: 9, phase: "follicular", isToday: false },
  { date: 10, phase: "follicular", isToday: false },
  { date: 11, phase: "ovulation", isToday: false },
  { date: 12, phase: "ovulation", isToday: false },
  { date: 13, phase: "ovulation", isToday: false },
  { date: 14, phase: "ovulation", isToday: true },
  { date: 15, phase: "ovulation", isToday: false },
  { date: 16, phase: "ovulation", isToday: false },
  { date: 17, phase: "luteal", isToday: false },
  { date: 18, phase: "luteal", isToday: false },
  { date: 19, phase: "luteal", isToday: false },
  { date: 20, phase: "luteal", isToday: false },
  { date: 21, phase: "luteal", isToday: false },
  { date: 22, phase: "luteal", isToday: false },
  { date: 23, phase: "luteal", isToday: false },
  { date: 24, phase: "luteal", isToday: false },
  { date: 25, phase: "luteal", isToday: false },
  { date: 26, phase: "luteal", isToday: false },
  { date: 27, phase: "luteal", isToday: false },
  { date: 28, phase: "luteal", isToday: false },
]

const symptomOptions = [
  { id: "cramps", label: "痛经", icon: "😣" },
  { id: "bloating", label: "腹胀", icon: "🫧" },
  { id: "mood", label: "情绪波动", icon: "😔" },
  { id: "fatigue", label: "疲劳", icon: "😴" },
  { id: "headache", label: "头痛", icon: "🤕" },
  { id: "acne", label: "痘痘", icon: "😰" },
]

export function CycleTab() {
  const [currentMonth] = useState("2026年3月")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const currentPhase = phaseInfo[cycleData.phase]

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">生理周期</h1>
        <p className="text-sm text-muted-foreground">科学追踪您的健康周期</p>
      </header>

      {/* Cycle Status Card */}
      <Card className={cn("border-0 shadow-lg", `bg-gradient-to-br from-${cycleData.phase === 'ovulation' ? 'health-heart' : 'health-cycle'}/5 to-card`)}>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className={cn("h-3 w-3 rounded-full", currentPhase.color)} />
                <span className={cn("text-lg font-semibold", currentPhase.textColor)}>
                  {currentPhase.name}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{cycleData.fertileWindow}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums text-foreground">
                {cycleData.currentDay}
              </p>
              <p className="text-sm text-muted-foreground">/ {cycleData.cycleLength} 天</p>
            </div>
          </div>

          {/* Cycle Progress */}
          <div className="mt-6">
            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
              <div className="w-[18%] bg-health-cycle" /> {/* Menstruation 1-5 */}
              <div className="w-[18%] bg-health-good" /> {/* Follicular 6-10 */}
              <div className="w-[21%] bg-health-heart" /> {/* Ovulation 11-16 */}
              <div className="w-[43%] bg-health-stress" /> {/* Luteal 17-28 */}
            </div>
            <div
              className="relative -mt-1"
              style={{ left: `${(cycleData.currentDay / cycleData.cycleLength) * 100}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-5 w-1 rounded bg-foreground" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-health-cycle/10">
                <Droplets className="h-5 w-5 text-health-cycle" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">下次月经</p>
                <p className="font-semibold text-foreground">{cycleData.nextPeriod}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-health-heart/10">
                <Heart className="h-5 w-5 text-health-heart" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">排卵日</p>
                <p className="font-semibold text-foreground">今天</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-base font-semibold text-foreground">{currentMonth}</h2>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            {/* Weekday headers */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
                <div key={day} className="py-1 text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid - starts on Saturday (pad with 6 empty cells) */}
            <div className="grid grid-cols-7 gap-1">
              {/* Padding for days before month starts (假设3月1日是周六) */}
              {[...Array(6)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {/* Actual calendar days */}
              {calendarDays.map((day) => {
                const phase = phaseInfo[day.phase as keyof typeof phaseInfo]
                return (
                  <button
                    key={day.date}
                    className={cn(
                      "relative aspect-square rounded-lg text-sm font-medium transition-all duration-200",
                      day.isToday
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    )}
                  >
                    {day.date}
                    {!day.isToday && (
                      <div
                        className={cn(
                          "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                          phase.color
                        )}
                      />
                    )}
                  </button>
                )
              })}
            </div>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {Object.values(phaseInfo).map((phase) => (
                <div key={phase.name} className="flex items-center gap-1">
                  <div className={cn("h-2 w-2 rounded-full", phase.color)} />
                  <span className="text-xs text-muted-foreground">{phase.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Temperature Tracking */}
      <section>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ThermometerSun className="h-4 w-4 text-health-stress" />
              基础体温
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold tabular-nums">{cycleData.temperature.current}°C</p>
                <p className="text-sm text-muted-foreground">
                  基线温度: {cycleData.temperature.baseline}°C
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-health-heart">上升中</p>
                <p className="text-xs text-muted-foreground">符合排卵期特征</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Symptom Logging */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">今日症状记录</h2>
          <Button variant="ghost" size="sm" className="text-xs text-primary">
            <Plus className="mr-1 h-3 w-3" />
            添加
          </Button>
        </div>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id)
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    <span>{symptom.icon}</span>
                    {symptom.label}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Phase-specific Tips */}
      <Card className="border-0 bg-gradient-to-r from-health-heart/10 to-health-cycle/10 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-health-heart/20">
              <Info className="h-4 w-4 text-health-heart" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">排卵期健康建议</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                您正处于易孕窗口期。此阶段雌激素水平达到峰值，精力充沛，适合进行中高强度运动。建议保持规律作息，避免过度劳累。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
