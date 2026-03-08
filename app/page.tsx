"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeTab } from "@/components/tabs/home-tab"
import { GoalsTab } from "@/components/tabs/goals-tab"
import { AssistantTab } from "@/components/tabs/assistant-tab"
import { CycleTab } from "@/components/tabs/cycle-tab"
import { ProfileTab } from "@/components/tabs/profile-tab"
import { cn } from "@/lib/utils"

export default function HealthRingApp() {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />
      case "goals":
        return <GoalsTab />
      case "cycle":
        return <CycleTab />
      case "profile":
        return <ProfileTab />
      default:
        return <HomeTab />
    }
  }

  // Assistant tab renders as a full-screen overlay outside the main layout
  if (activeTab === "assistant") {
    return <AssistantTab onClose={() => setActiveTab("home")} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Status bar spacer for mobile */}
      <div className="h-safe-top" />
      
      {/* Main content */}
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">
        <div
          className={cn(
            "transition-opacity duration-200",
            "animate-in fade-in slide-in-from-bottom-2 duration-300"
          )}
          key={activeTab}
        >
          {renderContent()}
        </div>
      </main>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
