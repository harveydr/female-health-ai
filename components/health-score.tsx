"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HealthScoreProps {
  score: number
  label: string
  subtitle?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function HealthScore({
  score,
  label,
  subtitle,
  size = "lg",
  className,
}: HealthScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = score / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [score])

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-health-good"
    if (s >= 60) return "text-health-warning"
    return "text-health-alert"
  }

  const getGradient = (s: number) => {
    if (s >= 80) return "from-health-good/20 to-health-good/5"
    if (s >= 60) return "from-health-warning/20 to-health-warning/5"
    return "from-health-alert/20 to-health-alert/5"
  }

  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-32 w-32",
    lg: "h-44 w-44",
  }

  const textSizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  }

  const circumference = 2 * Math.PI * 45
  const progress = (animatedScore / 100) * circumference

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-b opacity-50",
            getGradient(score)
          )}
        />
        
        {/* SVG Progress Ring */}
        <svg
          className="absolute inset-0 -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className={cn("transition-all duration-500", getScoreColor(score))}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-bold tabular-nums",
              textSizeClasses[size],
              getScoreColor(score)
            )}
          >
            {animatedScore}
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
      
      {subtitle && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
