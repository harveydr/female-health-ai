# HealthRing - 智能戒指女性健康助手

一个专为女性设计的智能健康监测应用，结合智能戒指数据，提供全面的健康追踪、周期管理和AI健康建议。

## ✨ 功能特性

### 核心功能
- **健康概览** - 实时健康评分和关键指标展示
- **周期追踪** - 精准的月经周期管理和预测
- **目标管理** - 设定和追踪健康目标
- **AI健康助手** - 智能健康咨询和个性化建议
- **个人资料** - 完整的健康档案管理

### 健康监测
- 心率监测
- 睡眠分析
- 压力管理
- 运动追踪
- 睡眠质量评估

## 🛠️ 技术栈

- **框架**: Next.js 16
- **语言**: TypeScript
- **UI库**: React 19
- **样式**: Tailwind CSS
- **组件库**: Radix UI + shadcn/ui
- **图标**: Lucide React
- **图表**: Recharts
- **主题**: next-themes
- **表单**: React Hook Form + Zod
- **日期**: date-fns
- **动画**: tw-animate-css

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm / yarn

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

### 代码检查

```bash
pnpm lint
```

## 📁 项目结构

```
.
├── app/                    # Next.js App Router
│   ├── globals.css       # 全局样式
│   ├── layout.tsx       # 根布局
│   └── page.tsx        # 主页面
├── components/
│   ├── tabs/            # 标签页组件
│   │   ├── home-tab.tsx
│   │   ├── goals-tab.tsx
│   │   ├── cycle-tab.tsx
│   │   ├── assistant-tab.tsx
│   │   ├── profile-tab.tsx
│   │   ├── heart-tab.tsx
│   │   ├── sleep-tab.tsx
│   │   └── settings-tab.tsx
│   ├── ui/               # shadcn/ui 组件
│   ├── bottom-nav.tsx   # 底部导航
│   ├── health-score.tsx   # 健康评分组件
│   ├── metric-card.tsx    # 指标卡片
│   └── theme-provider.tsx
├── hooks/                  # 自定义 Hooks
├── lib/                    # 工具函数
├── public/                 # 静态资源
├── styles/                 # 样式文件
└── ...配置文件
```

## 🎨 主题和样式

项目使用 Tailwind CSS 进行样式开发，支持深色模式，并集成了 shadcn/ui 组件库。

## 📱 响应式设计

专为移动端优化，适配各种屏幕尺寸。

## 🔧 配置说明

### 环境变量

复制 `.env.example` 为 `.env.local` 并填入必要的配置项。

## 📄 许可证

本项目采用 MIT 许可证。
