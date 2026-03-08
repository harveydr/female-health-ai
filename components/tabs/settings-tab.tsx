"use client"

import { useState } from "react"
import {
  User,
  Watch,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Bluetooth,
  Battery,
  RefreshCw,
  Moon,
  Sun,
  Smartphone,
  Lock,
  FileText,
  Mail,
  LogOut,
  Settings,
  Wifi,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// Mock device data
const deviceData = {
  name: "HealthRing Pro",
  model: "HR-2026",
  battery: 78,
  lastSync: "5分钟前",
  firmwareVersion: "2.1.4",
  connected: true,
}

const userProfile = {
  name: "小美",
  email: "xiaomei@example.com",
  avatar: null,
  age: 28,
  height: 165,
  weight: 55,
}

interface SettingItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value?: string
  onClick?: () => void
  danger?: boolean
}

function SettingItem({ icon: Icon, label, value, onClick, danger }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between py-3 transition-colors",
        danger ? "text-destructive" : "text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("h-5 w-5", danger ? "text-destructive" : "text-muted-foreground")} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-muted-foreground">{value}</span>}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  )
}

export function SettingsTab() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoSync, setAutoSync] = useState(true)

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">设置</h1>
        <p className="text-sm text-muted-foreground">管理设备与账户</p>
      </header>

      {/* User Profile */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <button className="flex w-full items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-lg font-semibold text-foreground">{userProfile.name}</p>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </CardContent>
      </Card>

      {/* Device Section */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          设备管理
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            {/* Device Card */}
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Watch className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{deviceData.name}</p>
                  {deviceData.connected && (
                    <div className="flex items-center gap-1 rounded-full bg-health-good/10 px-2 py-0.5">
                      <Bluetooth className="h-3 w-3 text-health-good" />
                      <span className="text-xs font-medium text-health-good">已连接</span>
                    </div>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Battery className="h-4 w-4" />
                    {deviceData.battery}%
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    {deviceData.lastSync}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 divide-y divide-border">
              <SettingItem icon={Wifi} label="同步数据" value="立即同步" />
              <SettingItem icon={RefreshCw} label="固件版本" value={deviceData.firmwareVersion} />
              <SettingItem icon={Watch} label="戒指设置" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Preferences */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          偏好设置
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">推送通知</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">深色模式</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">自动同步</span>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Health Goals */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          健康目标
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="divide-y divide-border">
              <SettingItem icon={Moon} label="睡眠目标" value="7-8 小时" />
              <SettingItem icon={Settings} label="步数目标" value="10,000 步" />
              <SettingItem icon={Smartphone} label="周期设置" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Privacy & Security */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          隐私与安全
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="divide-y divide-border">
              <SettingItem icon={Lock} label="隐私设置" />
              <SettingItem icon={Shield} label="数据加密" value="已启用" />
              <SettingItem icon={FileText} label="数据导出" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Support */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          帮助与支持
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="divide-y divide-border">
              <SettingItem icon={HelpCircle} label="帮助中心" />
              <SettingItem icon={Mail} label="联系客服" />
              <SettingItem icon={FileText} label="使用条款" />
              <SettingItem icon={Shield} label="隐私政策" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Logout */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <SettingItem icon={LogOut} label="退出登录" danger />
        </CardContent>
      </Card>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground">
        HealthRing v1.0.0 (Build 2026.03.08)
      </p>
    </div>
  )
}
