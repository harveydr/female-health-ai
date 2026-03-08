"use client"

import { useState } from "react"
import { Heart, Activity, Zap, TrendingUp, TrendingDown, Info, ChevronRight, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock data
const heartData = {
  currentHR: 72,
  restingHR: 62,
  maxHR: 156,
  minHR: 52,
  hrv: {
    current: 45,
    avg: 42,
    trend: "up" as const,
    sdnn: 48,
    rmssd: 42,
  },
  stress: {
    current: 32,
    status: "low" as const,
    avgToday: 38,
  },
  alerts: [] as { type: string; message: string }[],
}

const hrTrend = [
  { time: "00:00", value: 58 },
  { time: "04:00", value: 54 },
  { time: "08:00", value: 68 },
  { time: "12:00", value: 78 },
  { time: "16:00", value: 82 },
  { time: "20:00", value: 72 },
  { time: "现在", value: 72 },
]

const stressLevels = [
  { level: "放松", range: "0-25", color: "bg-health-good", textColor: "text-health-good" },
  { level: "正常", range: "26-50", color: "bg-health-stress", textColor: "text-health-stress" },
  { level: "中度", range: "51-75", color: "bg-health-warning", textColor: "text-health-warning" },
  { level: "高压", range: "76-100", color: "bg-health-alert", textColor: "text-health-alert" },
]

export function HeartTab() {
  const [activeMetric, setActiveMetric] = useState<"hr" | "hrv" | "stress">("hr")

  const getStressStatus = (level: number) => {
    if (level <= 25) return { label: "放松", color: "text-health-good", bg: "bg-health-good" }
    if (level <= 50) return { label: "正常", color: "text-health-stress", bg: "bg-health-stress" }
    if (level <= 75) return { label: "中度压力", color: "text-health-warning", bg: "bg-health-warning" }
    return { label: "高压", color: "text-health-alert", bg: "bg-health-alert" }
  }

  const stressStatus = getStressStatus(heartData.stress.current)

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">心脏健康</h1>
        <p className="text-sm text-muted-foreground">实时监测心率、HRV与压力水平</p>
      </header>

      {/* Tab Selector */}
      <div className="flex gap-2 rounded-xl bg-muted p-1">
        {[
          { id: "hr", label: "心率", icon: Heart },
          { id: "hrv", label: "HRV", icon: Activity },
          { id: "stress", label: "压力", icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMetric(tab.id as typeof activeMetric)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
                activeMetric === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Heart Rate Section */}
      {activeMetric === "hr" && (
        <>
          <Card className="border-0 bg-gradient-to-br from-health-heart/5 to-card shadow-lg">
            <CardContent className="py-8">
              <div className="flex flex-col items-center">
                <div className="relative flex h-36 w-36 items-center justify-center">
                  {/* Pulse animation */}
                  <div className="absolute inset-0 animate-ping rounded-full bg-health-heart/20" style={{ animationDuration: "1.5s" }} />
                  <div className="absolute inset-4 rounded-full bg-health-heart/10" />
                  <Heart className="h-12 w-12 text-health-heart" fill="currentColor" />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-5xl font-bold tabular-nums text-foreground">{heartData.currentHR}</span>
                  <span className="ml-2 text-lg text-muted-foreground">bpm</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">当前心率</p>
              </div>
            </CardContent>
          </Card>

          {/* HR Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <TrendingDown className="mx-auto h-4 w-4 text-health-good" />
                <p className="mt-1 text-xl font-bold tabular-nums">{heartData.minHR}</p>
                <p className="text-xs text-muted-foreground">最低心率</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <Heart className="mx-auto h-4 w-4 text-health-heart" />
                <p className="mt-1 text-xl font-bold tabular-nums">{heartData.restingHR}</p>
                <p className="text-xs text-muted-foreground">静息心率</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <TrendingUp className="mx-auto h-4 w-4 text-health-alert" />
                <p className="mt-1 text-xl font-bold tabular-nums">{heartData.maxHR}</p>
                <p className="text-xs text-muted-foreground">最高心率</p>
              </CardContent>
            </Card>
          </div>

          {/* HR Trend Chart */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">今日心率趋势</h2>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                详情
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex h-32 items-end justify-between gap-1">
                  {hrTrend.map((point, index) => {
                    const height = ((point.value - 50) / 40) * 100
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-xs font-medium tabular-nums text-health-heart">
                          {point.value}
                        </span>
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-health-heart/80 to-health-heart/40 transition-all duration-300"
                          style={{ height: `${height}px` }}
                        />
                        <span className="text-[10px] text-muted-foreground">{point.time}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </section>
        </>
      )}

      {/* HRV Section */}
      {activeMetric === "hrv" && (
        <>
          <Card className="border-0 bg-gradient-to-br from-health-good/5 to-card shadow-lg">
            <CardContent className="py-8">
              <div className="flex flex-col items-center">
                <Activity className="h-12 w-12 text-health-good" />
                <div className="mt-4 text-center">
                  <span className="text-5xl font-bold tabular-nums text-foreground">{heartData.hrv.current}</span>
                  <span className="ml-2 text-lg text-muted-foreground">ms</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">当前 HRV</p>
                <div className="mt-3 flex items-center gap-1 text-health-good">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+3ms 相比平均</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HRV Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">SDNN</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{heartData.hrv.sdnn} ms</p>
                <p className="mt-1 text-xs text-muted-foreground">整体变异性</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">RMSSD</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{heartData.hrv.rmssd} ms</p>
                <p className="mt-1 text-xs text-muted-foreground">副交感神经活性</p>
              </CardContent>
            </Card>
          </div>

          {/* HRV Info */}
          <Card className="border-0 bg-gradient-to-r from-health-good/10 to-health-sleep/10 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-health-good/20">
                  <Info className="h-4 w-4 text-health-good" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">什么是 HRV？</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    心率变异性(HRV)反映您的自主神经系统健康状况。较高的HRV通常表示更好的身体恢复能力和压力应对能力。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Stress Section */}
      {activeMetric === "stress" && (
        <>
          <Card className="border-0 bg-gradient-to-br from-health-stress/5 to-card shadow-lg">
            <CardContent className="py-8">
              <div className="flex flex-col items-center">
                <Zap className={cn("h-12 w-12", stressStatus.color)} />
                <div className="mt-4 text-center">
                  <span className="text-5xl font-bold tabular-nums text-foreground">{heartData.stress.current}</span>
                  <span className="ml-2 text-lg text-muted-foreground">/100</span>
                </div>
                <p className={cn("mt-2 text-sm font-medium", stressStatus.color)}>{stressStatus.label}</p>
              </div>

              {/* Stress gauge */}
              <div className="mx-auto mt-6 w-full max-w-xs">
                <div className="flex h-3 overflow-hidden rounded-full bg-muted">
                  <div className="flex-1 bg-health-good" />
                  <div className="flex-1 bg-health-stress" />
                  <div className="flex-1 bg-health-warning" />
                  <div className="flex-1 bg-health-alert" />
                </div>
                <div
                  className="relative -mt-1"
                  style={{ left: `${heartData.stress.current}%`, transform: "translateX(-50%)" }}
                >
                  <div className="h-4 w-1 rounded bg-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stress Levels Legend */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">压力等级说明</h3>
              <div className="grid grid-cols-2 gap-2">
                {stressLevels.map((level) => (
                  <div key={level.level} className="flex items-center gap-2">
                    <div className={cn("h-3 w-3 rounded-full", level.color)} />
                    <span className="text-sm text-muted-foreground">{level.level}</span>
                    <span className="text-xs text-muted-foreground">({level.range})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stress Tips */}
          <Card className="border-0 bg-gradient-to-r from-health-stress/10 to-health-good/10 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-health-stress/20">
                  <Info className="h-4 w-4 text-health-stress" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">减压建议</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    您目前压力水平较低，状态良好！建议保持规律作息，适当进行呼吸练习和冥想，有助于维持身心平衡。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Heart Health Alerts */}
      {heartData.alerts.length === 0 && (
        <Card className="border-0 bg-health-good/5 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-good/20">
                <Heart className="h-5 w-5 text-health-good" />
              </div>
              <div>
                <p className="font-medium text-foreground">心脏健康状态良好</p>
                <p className="text-sm text-muted-foreground">未检测到异常心律</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
