"use client"

import { useState } from "react"
import {
  User,
  Settings,
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bluetooth,
  Battery,
  RefreshCw,
  Crown,
  Heart,
  Activity,
  Calendar,
  Zap,
  Share2,
  Stethoscope,
  Baby,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMode, type Mode } from "@/hooks/use-mode"

const stats = [
  { label: "监测天数", value: "186", icon: Calendar },
  { label: "健康评分", value: "85", icon: Heart },
  { label: "达成目标", value: "142", icon: Activity },
]

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

const menuItems = [
  {
    id: "account",
    title: "账户设置",
    items: [
      { id: "profile", label: "个人资料", icon: User },
      { id: "notifications", label: "通知设置", icon: Bell },
      { id: "privacy", label: "隐私与安全", icon: Shield },
    ],
  },
  {
    id: "preferences",
    title: "偏好设置",
    items: [
      { id: "units", label: "单位设置", icon: Settings, description: "公制" },
      { id: "language", label: "语言", icon: Settings, description: "简体中文" },
    ],
  },
  {
    id: "support",
    title: "帮助与支持",
    items: [
      { id: "help", label: "帮助中心", icon: HelpCircle },
      { id: "share", label: "分享应用", icon: Share2 },
    ],
  },
]

export function ProfileTab() {
  const [darkMode, setDarkMode] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const { mode, setMode, isLoaded, modeLabel } = useMode()

  if (!isLoaded) {
    return null
  }

  const currentModeOption = modeOptions.find(opt => opt.id === mode)
  const CurrentIcon = currentModeOption?.icon || Stethoscope

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">我的</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      {/* Profile Card */}
      <Card className="border-0 bg-gradient-to-br from-card to-muted/30 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-health-good">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">小美</h2>
              <p className="text-sm text-muted-foreground">xiaomei@example.com</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  高级会员
                </span>
                <span className="text-xs text-muted-foreground">有效期至 2026.12.31</span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center p-4">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mode Selection - Dropdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">模式选择</CardTitle>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="w-full justify-between h-12 px-4"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    mode === "normal" && "bg-primary/10",
                    mode === "preconception" && "bg-rose-500/10",
                    mode === "pregnancy" && "bg-blue-500/10"
                  )}>
                    <CurrentIcon className={cn(
                      "h-4 w-4",
                      mode === "normal" && "text-primary",
                      mode === "preconception" && "text-rose-500",
                      mode === "pregnancy" && "text-blue-500"
                    )} />
                  </div>
                  <div className="text-left">
                    <p className={cn(
                      "text-sm font-medium",
                      mode === "normal" && "text-primary",
                      mode === "preconception" && "text-rose-500",
                      mode === "pregnancy" && "text-blue-500"
                    )}>
                      {modeLabel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentModeOption?.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full min-w-[280px] p-2">
              {modeOptions.map((option) => {
                const Icon = option.icon
                const isSelected = mode === option.id
                return (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => setMode(option.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors",
                      isSelected ? "bg-primary/10" : "hover:bg-muted"
                    )}
                  >
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      isSelected
                        ? option.id === "normal"
                          ? "bg-primary/20"
                          : option.id === "preconception"
                          ? "bg-rose-500/20"
                          : "bg-blue-500/20"
                        : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5",
                        isSelected
                          ? option.id === "normal"
                            ? "text-primary"
                            : option.id === "preconception"
                            ? "text-rose-500"
                            : "text-blue-500"
                          : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-medium",
                        isSelected
                          ? option.id === "normal"
                            ? "text-primary"
                            : option.id === "preconception"
                            ? "text-rose-500"
                            : "text-blue-500"
                          : "text-foreground"
                      )}>
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center",
                        option.id === "normal" && "bg-primary",
                        option.id === "preconception" && "bg-rose-500",
                        option.id === "pregnancy" && "bg-blue-500"
                      )}>
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* Device Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">设备状态</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-health-good/10">
                <Bluetooth className="h-5 w-5 text-health-good" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">HealthRing Pro</p>
                <p className="text-xs text-muted-foreground">已连接</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-health-good" />
              <span className="text-sm font-medium text-foreground">85%</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">自动同步</span>
            </div>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">上次同步</span>
            <span className="text-foreground">5分钟前</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">深色模式</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      {menuItems.map((section) => (
        <section key={section.id}>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h3>
          <Card className="border-0 shadow-sm">
            <CardContent className="divide-y divide-border p-0">
              {section.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    className={cn(
                      "flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50",
                      index === 0 && "rounded-t-lg",
                      index === section.items.length - 1 && "rounded-b-lg"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.description && (
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </section>
      ))}

      {/* Logout */}
      <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
        <LogOut className="h-5 w-5" />
        退出登录
      </Button>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground">
        HealthRing v2.1.0
      </p>
    </div>
  )
}
