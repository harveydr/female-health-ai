"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Mic, Plus, Copy, ThumbsUp, ThumbsDown, Bot, Sparkles, Activity, Moon, Heart, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AssistantTabProps {
  onClose: () => void
}

const quickQuestions = [
  "我今天的健康状态怎么样？",
  "分析一下我的睡眠质量",
  "我现在处于什么周期阶段？",
  "给我一些运动建议",
  "如何缓解今天的压力？",
]

const contextTags = [
  { id: "health", icon: Activity, label: "健康评分" },
  { id: "sleep", icon: Moon, label: "睡眠质量" },
  { id: "stress", icon: Heart, label: "压力指数" },
  { id: "cycle", icon: Calendar, label: "周期分析" },
]

const mockResponses: Record<string, string> = {
  health: `📊 健康评分分析报告

您今日的综合健康评分为 **82分**，整体状态良好。

【核心指标】
• 静息心率：62 bpm（正常范围）
• 心率变异性(HRV)：45 ms（良好）
• 血氧饱和度：98%（优秀）
• 体温：36.5°C（正常）

【健康建议】
1. 今日身体状态适合进行中等强度运动
2. 建议保持充分水分摄入（2000ml以上）
3. 午后可进行15分钟的伸展运动
4. 晚间注意放松，保证优质睡眠

您的健康状态较昨日提升了3分，继续保持！`,
  
  sleep: `🌙 睡眠质量分析报告

昨晚您的睡眠时长为 **7小时48分钟**，睡眠质量评分 **85分**。

【睡眠阶段分析】
• 深睡眠：1小时32分钟（占比20%）
• 浅睡眠：4小时15分钟（占比55%）
• REM睡眠：1小时21分钟（占比17%）
• 清醒时间：40分钟

【睡眠效率指标】
• 入睡时间：约12分钟（良好）
• 睡眠效率：91%
• 夜间心率：58 bpm
• 呼吸频率：14次/分钟

【改善建议】
1. 建议在22:30前上床，可提升深睡比例
2. 睡前1小时避免使用电子设备
3. 卧室温度保持在18-22°C为宜`,

  cycle: `📅 周期分析报告

您目前处于 **卵泡期第5天**，距离下次月经还有约23天。

【周期预测】
• 预计排卵日：3月14日
• 预计下次月经：3月28日
• 当前周期第：5天

【生理指标】
• 基础体温：36.3°C（卵泡期正常偏低）
• 体温较基础值低约0.2°C
• 雌激素水平：上升期

【阶段特点】
卵泡期是身体状态最佳的时期：
• 精力充沛，适合高强度运动
• 新陈代谢加快，适合减脂
• 皮肤状态较好
• 学习记忆力增强

【建议】
1. 可安排重要工作和社交活动
2. 适合进行HIIT或力量训练
3. 注意补充铁质和蛋白质`,

  stress: `💆 压力指数分析报告

今日您的压力指数为 **34/100**，整体处于 **放松状态**。

【压力曲线】
• 早晨（6-9点）：22（低压力）
• 上午（9-12点）：28（低压力）
• 下午（12-18点）：45（中等压力）
• 晚间（18-22点）：31（低压力）

【详细分析】
下午14:00检测到短暂压力峰值（达到58），HRV有所下降。可能原因：
• 久坐工作导致身体紧张
• 工作任务压力
• 咖啡因摄入影响

【减压建议】
1. 尝试4-7-8呼吸法：吸气4秒→屏气7秒→呼气8秒
2. 每工作50分钟起身活动5分钟
3. 午后可进行10分钟冥想
4. 建议减少咖啡摄入，多喝温水

您本周的平均压力指数为38，较上周下降了12%，状态持续改善！`,

  exercise: `🏃 运动建议

根据您当前的身体状态和周期阶段，为您定制今日运动方案：

【推荐运动】
• 类型：有氧运动 + 力量训练
• 时长：40-50分钟
• 强度：中高强度

【详细计划】
1. 热身（5分钟）：动态拉伸
2. 有氧运动（20分钟）：快走/慢跑/游泳
3. 力量训练（15分钟）：核心/臀腿
4. 放松拉伸（5分钟）

【注意事项】
• 当前处于卵泡期，身体恢复能力强
• 运动前后各补充200ml水
• 心率保持在120-150bpm为宜
• 运动后30分钟内补充蛋白质`,
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "您好！我是您的健康AI助手。我可以帮您分析健康数据、解答健康问题、提供个性化建议。您想了解什么呢？",
    timestamp: new Date(),
  },
]

export function AssistantTab({ onClose }: AssistantTabProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getResponse = (content: string): string => {
    const lower = content.toLowerCase()
    if (lower.includes("健康状态") || lower.includes("健康评分")) return mockResponses.health
    if (lower.includes("睡眠")) return mockResponses.sleep
    if (lower.includes("周期") || lower.includes("经期")) return mockResponses.cycle
    if (lower.includes("运动") || lower.includes("锻炼")) return mockResponses.exercise
    if (lower.includes("压力") || lower.includes("紧张")) return mockResponses.stress
    return "感谢您的提问！我正在分析您的健康数据，为您生成个性化建议，请稍候片刻。"
  }

  const handleSend = async (content: string) => {
    if (!content.trim() || isTyping) return
    setShowQuickQuestions(false)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    await new Promise((r) => setTimeout(r, 1200))

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getResponse(content),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMsg])
    setIsTyping(false)
  }

  const handleContextTagClick = (tagId: string) => {
    const tagLabels: Record<string, string> = {
      health: "分析我的健康评分",
      sleep: "分析我的睡眠质量",
      stress: "分析我的压力指数",
      cycle: "分析我的周期状态",
    }
    handleSend(tagLabels[tagId] || "")
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Fixed Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
          <span className="text-sm font-semibold text-foreground">N</span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground">健康助手</h1>
          <p className="text-xs text-muted-foreground truncate">基于您的健康数据，AI智能分析</p>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
          aria-label="关闭"
        >
          <X className="h-5 w-5 text-foreground" strokeWidth={2} />
        </button>
      </header>

      {/* Scrollable Content Area - with padding bottom to account for fixed input bar */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
        {/* Quick Questions */}
        {showQuickQuestions && (
          <div className="px-4 py-6">
            <p className="mb-4 text-center text-sm text-muted-foreground">
              点击下方快捷问题开始对话
            </p>
            <div className="space-y-3">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3.5 text-left transition-colors hover:bg-muted active:scale-[0.98]"
                >
                  <Sparkles className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-foreground">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-5 px-4 pb-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "assistant" ? (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 mt-0.5">
                    <Bot className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-3 shadow-sm">
                      <p className="text-sm leading-relaxed text-card-foreground whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-[11px] text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString("zh-CN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <button className="text-muted-foreground transition-colors hover:text-foreground" aria-label="复制">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground transition-colors hover:text-foreground" aria-label="点赞">
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground transition-colors hover:text-foreground" aria-label="踩">
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3">
                    <p className="text-sm leading-relaxed text-primary-foreground">
                      {msg.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Bot className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-3.5 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "160ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "320ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Bottom Area: Context Tags + Input */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
        {/* Context Tags */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2.5">
          {contextTags.map((tag) => {
            const Icon = tag.icon
            return (
              <button
                key={tag.id}
                onClick={() => handleContextTagClick(tag.id)}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 transition-colors hover:bg-muted active:scale-95"
              >
                <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                <span className="text-xs font-medium text-foreground">{tag.label}</span>
              </button>
            )
          })}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 pb-6">
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="附加"
          >
            <Plus className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="flex flex-1 items-center rounded-full bg-muted px-4 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(input)
                }
              }}
              placeholder="输入您的问题..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              className="ml-2 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="语音输入"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all",
              input.trim() && !isTyping
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-primary/30 text-primary-foreground/50 cursor-not-allowed"
            )}
            aria-label="发送"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
