"use client"

import { useState } from "react"
import { 
  Target, 
  Activity, 
  Moon, 
  Heart, 
  Flame, 
  Droplets, 
  ChevronRight, 
  Plus,
  Check,
  Trophy,
  TrendingUp,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Goal {
  id: string
  title: string
  icon: React.ElementType
  current: number
  target: number
  unit: string
  color: string
  streak: number
}

const dailyGoals: Goal[] = [
  {
    id: "steps",
    title: "每日步数",
    icon: Activity,
    current: 8234,
    target: 10000,
    unit: "步",
    color: "primary",
    streak: 7,
  },
  {
    id: "sleep",
    title: "睡眠时长",
    icon: Moon,
    current: 8.25,
    target: 8,
    unit: "小时",
    color: "health-sleep",
    streak: 14,
  },
  {
    id: "calories",
    title: "消耗热量",
    icon: Flame,
    current: 420,
    target: 500,
    unit: "千卡",
    color: "health-heart",
    streak: 3,
  },
  {
    id: "water",
    title: "饮水量",
    icon: Droplets,
    current: 1.5,
    target: 2,
    unit: "升",
    color: "health-good",
    streak: 5,
  },
]

const weeklyGoals = [
  {
    id: "exercise",
    title: "运动次数",
    current: 3,
    target: 4,
    unit: "次",
    daysCompleted: [true, false, true, false, true, false, false],
  },
  {
    id: "deep-sleep",
    title: "深睡时长",
    current: 9.5,
    target: 10.5,
    unit: "小时",
    daysCompleted: [true, true, true, false, true, true, false],
  },
]

const achievements = [
  { id: 1, title: "睡眠达人", description: "连续14天达成睡眠目标", icon: Moon, unlocked: true },
  { id: 2, title: "步行冠军", description: "单日步数突破15000步", icon: Activity, unlocked: true },
  { id: 3, title: "压力管理师", description: "连续7天保持低压力水平", icon: Heart, unlocked: false },
]

export function GoalsTab() {
  const [activeSection, setActiveSection] = useState<"daily" | "weekly">("daily")

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">健康目标</h1>
          <p className="text-sm text-muted-foreground">追踪您的每日健康进度</p>
        </div>
        <Button size="icon" variant="ghost" className="h-10 w-10">
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      {/* Stats Summary */}
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">28</p>
                <p className="text-xs text-muted-foreground">本月达成目标天数</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-health-good">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
              <p className="text-xs text-muted-foreground">较上月</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Toggle */}
      <div className="flex gap-2 rounded-xl bg-muted/50 p-1">
        <button
          onClick={() => setActiveSection("daily")}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
            activeSection === "daily"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          每日目标
        </button>
        <button
          onClick={() => setActiveSection("weekly")}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200",
            activeSection === "weekly"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          每周目标
        </button>
      </div>

      {/* Daily Goals */}
      {activeSection === "daily" && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
          {dailyGoals.map((goal) => {
            const Icon = goal.icon
            const progress = Math.min((goal.current / goal.target) * 100, 100)
            const isCompleted = goal.current >= goal.target

            return (
              <Card key={goal.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", `bg-${goal.color}/10`)}>
                      <Icon className={cn("h-6 w-6", `text-${goal.color}`)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{goal.title}</p>
                        {isCompleted && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-health-good">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-lg font-bold text-foreground">{goal.current.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">/ {goal.target.toLocaleString()} {goal.unit}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isCompleted ? "bg-health-good" : `bg-${goal.color}`
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{goal.streak}</p>
                      <p className="text-[10px] text-muted-foreground">连续天数</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Weekly Goals */}
      {activeSection === "weekly" && (
        <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
          {weeklyGoals.map((goal) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100)
            const days = ["一", "二", "三", "四", "五", "六", "日"]

            return (
              <Card key={goal.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{goal.title}</p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-lg font-bold text-foreground">{goal.current}</span>
                        <span className="text-sm text-muted-foreground">/ {goal.target} {goal.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{Math.round(progress)}%</p>
                      <p className="text-xs text-muted-foreground">完成度</p>
                    </div>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-3 flex justify-between">
                    {goal.daysCompleted.map((completed, index) => (
                      <div key={index} className="flex flex-col items-center gap-1">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all",
                            completed
                              ? "bg-health-good text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {completed ? <Check className="h-3.5 w-3.5" /> : days[index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Achievements */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">成就徽章</h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            查看全部
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card
                key={achievement.id}
                className={cn(
                  "shrink-0 border-0 shadow-sm",
                  !achievement.unlocked && "opacity-50"
                )}
              >
                <CardContent className="flex w-32 flex-col items-center p-4 text-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full",
                      achievement.unlocked
                        ? "bg-gradient-to-br from-primary to-primary/70"
                        : "bg-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        achievement.unlocked ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">{achievement.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
