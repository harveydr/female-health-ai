"use client"

import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  icon: LucideIcon
  trend?: "up" | "down" | "stable"
  trendValue?: string
  color?: "heart" | "sleep" | "stress" | "cycle" | "default"
  onClick?: () => void
  className?: string
}

const colorClasses = {
  heart: "bg-health-heart/10 text-health-heart",
  sleep: "bg-health-sleep/10 text-health-sleep",
  stress: "bg-health-stress/10 text-health-stress",
  cycle: "bg-health-cycle/10 text-health-cycle",
  default: "bg-primary/10 text-primary",
}

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  color = "default",
  onClick,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer border-0 bg-card shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums text-foreground">
                {value}
              </span>
              {unit && (
                <span className="text-sm text-muted-foreground">{unit}</span>
              )}
            </div>
            {trend && trendValue && (
              <div className="mt-1 flex items-center gap-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend === "up" && "text-health-good",
                    trend === "down" && "text-health-alert",
                    trend === "stable" && "text-muted-foreground"
                  )}
                >
                  {trend === "up" && "+"}
                  {trend === "down" && "-"}
                  {trendValue}
                </span>
                <span className="text-xs text-muted-foreground">vs 昨日</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              colorClasses[color]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
