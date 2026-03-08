"use client"

import { Home, Target, MessageCircle, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", label: "首页", icon: Home, highlight: false },
  { id: "goals", label: "目标", icon: Target, highlight: false },
  { id: "assistant", label: "健康助手", icon: MessageCircle, highlight: true },
  { id: "cycle", label: "周期", icon: Calendar, highlight: false },
  { id: "profile", label: "我的", icon: User, highlight: false },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          const isHighlighted = item.highlight
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isHighlighted ? (
                <div
                  className={cn(
                    "flex h-12 w-12 -translate-y-3 items-center justify-center rounded-full shadow-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground scale-110" 
                      : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
              ) : (
                <div
                  className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-full transition-all duration-200",
                    isActive && "bg-primary/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive && "scale-110"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
              )}
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-200",
                  isHighlighted && "-mt-2",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
