"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, Moon, Activity, Thermometer, Droplets, Zap, ChevronRight, Bell, Bluetooth, Flame, Stethoscope, Baby, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HealthScore } from "@/components/health-score"
import { cn } from "@/lib/utils"
import { useMode, type Mode } from "@/hooks/use-mode"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts"

const modeOptions = [
  {
    id: "normal" as Mode,
    label: "普通模式",
    icon: Stethoscope,
    description: "日常健康监测",
  },
  {
    id: "preconception" as Mode,
    label: "备孕模式",
    icon: Heart,
    description: "备孕健康指导",
  },
  {
    id: "pregnancy" as Mode,
    label: "孕期模式",
    icon: Baby,
    description: "孕期健康监护",
  },
]

// Mock data
const healthData = {
  score: 85,
  heartRate: 68,
  hrv: 45,
  sleepScore: 82,
  stressLevel: 32,
  bodyTemp: 36.5,
  bloodOxygen: 98,
  steps: 8234,
  calories: 420,
  cycleDay: 14,
  cyclePhase: "排卵期",
}

const sleepStages = [
  { time: "23:00", deep: 0, light: 0, rem: 0, awake: 1 },
  { time: "00:00", deep: 1, light: 0, rem: 0, awake: 0 },
  { time: "01:00", deep: 1, light: 0, rem: 0, awake: 0 },
  { time: "02:00", deep: 0, light: 1, rem: 0, awake: 0 },
  { time: "03:00", deep: 0, light: 0, rem: 1, awake: 0 },
  { time: "04:00", deep: 1, light: 0, rem: 0, awake: 0 },
  { time: "05:00", deep: 0, light: 1, rem: 0, awake: 0 },
  { time: "06:00", deep: 0, light: 0, rem: 1, awake: 0 },
  { time: "07:00", deep: 0, light: 1, rem: 0, awake: 0 },
]

const heartRateData = [
  { time: "00:00", value: 58 },
  { time: "04:00", value: 52 },
  { time: "08:00", value: 72 },
  { time: "12:00", value: 85 },
  { time: "16:00", value: 78 },
  { time: "20:00", value: 68 },
  { time: "现在", value: 68 },
]

const stressData = [
  { time: "00:00", value: 15 },
  { time: "04:00", value: 10 },
  { time: "08:00", value: 35 },
  { time: "12:00", value: 55 },
  { time: "16:00", value: 42 },
  { time: "20:00", value: 28 },
  { time: "现在", value: 32 },
]

const activityData = [
  { hour: "6", steps: 200 },
  { hour: "8", steps: 1200 },
  { hour: "10", steps: 800 },
  { hour: "12", steps: 1500 },
  { hour: "14", steps: 600 },
  { hour: "16", steps: 900 },
  { hour: "18", steps: 1800 },
  { hour: "20", steps: 1234 },
]

const tabs = [
  { id: "sleep", label: "睡眠", icon: Moon },
  { id: "heartrate", label: "心率", icon: Heart },
  { id: "stress", label: "压力", icon: Zap },
  { id: "activity", label: "活动", icon: Activity },
]

export function HomeTab() {
  const [activeSubTab, setActiveSubTab] = useState("sleep")
  const [isSticky, setIsSticky] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const { mode, setMode, isLoaded, modeLabel } = useMode()

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "sleep":
        return <SleepContent />
      case "heartrate":
        return <HeartRateContent />
      case "stress":
        return <StressContent />
      case "activity":
        return <ActivityContent />
      default:
        return <SleepContent />
    }
  }

  if (!isLoaded) {
    return null
  }

  const currentModeOption = modeOptions.find(opt => opt.id === mode)
  const CurrentIcon = currentModeOption?.icon || Stethoscope

  const renderMainCard = () => {
    switch (mode) {
      case "normal":
        return (
          <Card className="border-0 bg-gradient-to-br from-card to-muted/30 shadow-lg">
            <CardContent className="flex flex-col items-center py-8">
              <HealthScore
                score={healthData.score}
                label="健康分数"
                subtitle="您今天的身体状态良好，继续保持！"
              />
              
              {/* Quick Stats */}
              <div className="mt-6 grid w-full grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-heart/10">
                    <Heart className="h-5 w-5 text-health-heart" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.heartRate}</span>
                  <span className="text-xs text-muted-foreground">心率 bpm</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-sleep/10">
                    <Moon className="h-5 w-5 text-health-sleep" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.sleepScore}</span>
                  <span className="text-xs text-muted-foreground">睡眠分</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-stress/10">
                    <Zap className="h-5 w-5 text-health-stress" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.stressLevel}</span>
                  <span className="text-xs text-muted-foreground">压力指数</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "preconception":
        return (
          <Card className="border-0 bg-gradient-to-br from-rose-50/30 to-pink-50/30 dark:from-rose-950/20 dark:to-pink-950/20 shadow-lg">
            <CardContent className="flex flex-col items-center py-8">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-rose-500" />
                <span className="text-sm font-medium text-rose-500">备孕模式</span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">周期第 {healthData.cycleDay} 天</p>
                <p className="text-lg font-medium text-rose-500 mt-2">{healthData.cyclePhase}</p>
                <p className="text-sm text-muted-foreground mt-2">您正处于最佳受孕期，建议保持规律作息</p>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-6 grid w-full grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10">
                    <Thermometer className="h-5 w-5 text-rose-500" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.bodyTemp}°</span>
                  <span className="text-xs text-muted-foreground">基础体温</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10">
                    <Droplets className="h-5 w-5 text-pink-500" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.bloodOxygen}%</span>
                  <span className="text-xs text-muted-foreground">血氧</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-400/10">
                    <Heart className="h-5 w-5 text-rose-400" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.heartRate}</span>
                  <span className="text-xs text-muted-foreground">心率 bpm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "pregnancy":
        return (
          <Card className="border-0 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 dark:from-blue-950/20 dark:to-cyan-950/20 shadow-lg">
            <CardContent className="flex flex-col items-center py-8">
              <div className="flex items-center gap-2 mb-4">
                <Baby className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">孕期模式</span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">孕 24 周</p>
                <p className="text-lg font-medium text-blue-500 mt-2">第 6 个月</p>
                <p className="text-sm text-muted-foreground mt-2">宝宝发育良好，请注意休息和营养</p>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-6 grid w-full grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                    <Heart className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.heartRate}</span>
                  <span className="text-xs text-muted-foreground">心率 bpm</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10">
                    <Activity className="h-5 w-5 text-cyan-500" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.steps}</span>
                  <span className="text-xs text-muted-foreground">步数</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400/10">
                    <Droplets className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="mt-2 text-lg font-bold tabular-nums">{healthData.bloodOxygen}%</span>
                  <span className="text-xs text-muted-foreground">血氧</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          {/* Mode Display */}
          <div className="flex items-center gap-2 mb-1">
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full",
              mode === "normal" && "bg-primary/10",
              mode === "preconception" && "bg-rose-500/10",
              mode === "pregnancy" && "bg-blue-500/10"
            )}>
              <CurrentIcon className={cn(
                "h-3.5 w-3.5",
                mode === "normal" && "text-primary",
                mode === "preconception" && "text-rose-500",
                mode === "pregnancy" && "text-blue-500"
              )} />
            </div>
            <span className={cn(
              "text-xs font-medium",
              mode === "normal" && "text-primary",
              mode === "preconception" && "text-rose-500",
              mode === "pregnancy" && "text-blue-500"
            )}>
              {modeLabel}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">早上好</p>
          <h1 className="text-2xl font-bold text-foreground">小美</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="text-health-good">
            <Bluetooth className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Card - Mode Specific */}
      {renderMainCard()}

      {/* Sentinel for intersection observer */}
      <div ref={sentinelRef} className="h-0" />

      {/* Sticky Tabs */}
      <div
        ref={tabsRef}
        className={cn(
          "transition-all duration-200",
          isSticky && "sticky top-0 z-40 -mx-4 bg-background/95 px-4 py-2 backdrop-blur-lg shadow-sm"
        )}
      >
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeSubTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sub Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" key={activeSubTab}>
        {renderSubTabContent()}
      </div>
    </div>
  )
}

function SleepContent() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">昨晚睡眠</CardTitle>
            <span className="text-xs text-muted-foreground">23:15 - 07:30</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-health-sleep/10">
              <span className="text-2xl font-bold text-health-sleep">82</span>
              <span className="text-xs text-muted-foreground">睡眠分</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">总睡眠</span>
                <span className="font-medium">8小时15分</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">深睡</span>
                <span className="font-medium text-health-sleep">1小时32分</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">REM</span>
                <span className="font-medium">1小时48分</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepStages}>
                <defs>
                  <linearGradient id="deepGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Area type="stepAfter" dataKey="deep" stackId="1" stroke="oklch(0.55 0.18 280)" fill="url(#deepGradient)" />
                <Area type="stepAfter" dataKey="light" stackId="1" stroke="oklch(0.70 0.12 280)" fill="oklch(0.70 0.12 280 / 0.5)" />
                <Area type="stepAfter" dataKey="rem" stackId="1" stroke="oklch(0.65 0.15 180)" fill="oklch(0.65 0.15 180 / 0.5)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-3 flex justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-health-sleep" />
              <span className="text-xs text-muted-foreground">深睡</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.70 0.12 280)" }} />
              <span className="text-xs text-muted-foreground">浅睡</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "oklch(0.65 0.15 180)" }} />
              <span className="text-xs text-muted-foreground">REM</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-good/10">
              <Moon className="h-5 w-5 text-health-good" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">睡眠建议</p>
              <p className="mt-1 text-xs text-muted-foreground">
                您的深睡时长达标，建议保持22:30前入睡的习惯，有助于提高睡眠质量。
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function HeartRateContent() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">今日心率</CardTitle>
            <span className="text-xs text-muted-foreground">实时监测中</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-health-heart/20" style={{ animationDuration: "1.5s" }} />
                <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-health-heart/10">
                  <Heart className="h-6 w-6 text-health-heart" />
                  <span className="mt-1 text-2xl font-bold text-health-heart">68</span>
                </div>
              </div>
              <span className="mt-2 text-xs text-muted-foreground">当前心率 bpm</span>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">静息心率</span>
                <span className="font-medium">52 bpm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">最高心率</span>
                <span className="font-medium">98 bpm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">HRV</span>
                <span className="font-medium text-health-good">45 ms</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.60 0.22 15)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.60 0.22 15)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="oklch(0.60 0.22 15)" 
                  strokeWidth={2}
                  dot={false}
                  fill="url(#heartGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-health-good" />
              <span className="text-sm font-medium">HRV趋势</span>
            </div>
            <p className="mt-2 text-2xl font-bold">+3 ms</p>
            <p className="text-xs text-muted-foreground">较上周提升</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-health-sleep" />
              <span className="text-sm font-medium">血氧</span>
            </div>
            <p className="mt-2 text-2xl font-bold">98%</p>
            <p className="text-xs text-muted-foreground">正常范围</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StressContent() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">压力指数</CardTitle>
            <span className="rounded-full bg-health-good/10 px-2 py-0.5 text-xs font-medium text-health-good">低压力</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-health-stress/10">
                <Zap className="h-6 w-6 text-health-stress" />
                <span className="mt-1 text-3xl font-bold text-health-stress">32</span>
              </div>
              <span className="mt-2 text-xs text-muted-foreground">当前压力值</span>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">放松</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[65%] rounded-full bg-health-good" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">正常</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[28%] rounded-full bg-health-warning" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">高压</span>
                    <span className="font-medium">7%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[7%] rounded-full bg-health-alert" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressData}>
                <defs>
                  <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.70 0.15 85)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.70 0.15 85)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.70 0.15 85)" strokeWidth={2} fill="url(#stressGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-sleep/10">
              <Moon className="h-5 w-5 text-health-sleep" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">放松建议</p>
              <p className="mt-1 text-xs text-muted-foreground">
                您今天的压力水平较低，建议继续保持规律作息和适度运动。
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ActivityContent() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">今日活动</CardTitle>
            <span className="text-xs text-muted-foreground">更新于 5分钟前</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center rounded-2xl bg-primary/5 p-4">
              <Activity className="h-6 w-6 text-primary" />
              <span className="mt-2 text-2xl font-bold">8,234</span>
              <span className="text-xs text-muted-foreground">步数</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-health-heart/5 p-4">
              <Flame className="h-6 w-6 text-health-heart" />
              <span className="mt-2 text-2xl font-bold">420</span>
              <span className="text-xs text-muted-foreground">卡路里</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-health-good/5 p-4">
              <Thermometer className="h-6 w-6 text-health-good" />
              <span className="mt-2 text-2xl font-bold">2.5</span>
              <span className="text-xs text-muted-foreground">公里</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">目标完成度</span>
              <span className="font-medium">82%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                style={{ width: "82%" }}
              />
            </div>
          </div>
          
          <div className="mt-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                <Bar 
                  dataKey="steps" 
                  fill="oklch(0.65 0.18 15)" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">活跃时间</span>
            </div>
            <p className="mt-2 text-2xl font-bold">1小时23分</p>
            <p className="text-xs text-muted-foreground">中高强度运动</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-health-heart" />
              <span className="text-sm font-medium">平均心率</span>
            </div>
            <p className="mt-2 text-2xl font-bold">78 bpm</p>
            <p className="text-xs text-muted-foreground">活动期间</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
