'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock, Brain, Code, Layers, Target, Users, TrendingUp, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'

type Task = { label: string; link?: string }
type WeekPlan = {
  week: number
  title: string
  theme: string
  icon: React.ElementType
  color: string
  bgColor: string
  goal: string
  dailyTasks: Task[]
  resources: string[]
  milestone: string
}

const weeks: WeekPlan[] = [
  {
    week: 1,
    title: 'Behavioral Foundations',
    theme: 'STAR Method + Company Principles',
    icon: Brain,
    color: 'from-purple-500 to-blue-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    goal: 'Master the STAR format and understand Amazon\'s 16 LPs inside out',
    dailyTasks: [
      { label: 'Study STAR format — write your 3 strongest stories', link: '/behavioral' },
      { label: 'Learn all 16 Amazon Leadership Principles with examples', link: '/behavioral' },
      { label: 'Map each LP to a story from your career' },
      { label: 'Record yourself answering 2 questions — review pacing and fillers' },
      { label: 'Practice: "Tell me about a time you failed"' },
    ],
    resources: ['Amazon LP page', 'STAR format guide', 'Behavioral page in this app'],
    milestone: 'Deliver 3 polished STAR answers without reading from notes',
  },
  {
    week: 2,
    title: 'Company Deep-Dives',
    theme: 'Meta, Google, Netflix, Apple, Microsoft',
    icon: Target,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    goal: 'Know each company\'s unique values, interview style, and top questions',
    dailyTasks: [
      { label: 'Study Meta: Move Fast, Long-term Impact, Be Direct', link: '/companies/meta' },
      { label: 'Study Google: Data-driven, Think 10x, Psychological safety', link: '/companies/google' },
      { label: 'Study Netflix: Freedom & Responsibility, Courage, Context', link: '/companies/netflix' },
      { label: 'Study Apple: Taste, Craft, Deep Collaboration', link: '/companies/apple' },
      { label: 'Study Microsoft: Growth Mindset, One Microsoft', link: '/companies/microsoft' },
    ],
    resources: ['Company pages in this app', 'Glassdoor interview reviews', 'LinkedIn jobs for target roles'],
    milestone: 'Company-specific story for each of your 3 target companies',
  },
  {
    week: 3,
    title: 'System Design Basics',
    theme: 'Scalability Fundamentals',
    icon: Layers,
    color: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    goal: 'Understand horizontal scaling, databases, caching, and load balancing',
    dailyTasks: [
      { label: 'Study CAP Theorem + SQL vs NoSQL decision framework', link: '/system-design' },
      { label: 'Study caching strategies: Cache-aside, Write-through, TTL', link: '/system-design' },
      { label: 'Study consistent hashing and database sharding', link: '/system-design' },
      { label: 'Design URL Shortener end-to-end (35 min timed)', link: '/system-design' },
      { label: 'Study Kafka vs SQS — when to use each', link: '/system-design' },
    ],
    resources: ['System Design page in this app', 'Designing Data-Intensive Applications (Kleppmann)', 'ByteByteGo System Design Newsletter'],
    milestone: 'Whiteboard URL Shortener design from memory in 35 minutes',
  },
  {
    week: 4,
    title: 'System Design Advanced',
    theme: 'Distributed Systems at FAANG Scale',
    icon: Layers,
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    goal: 'Design complex systems: Twitter feed, notification system, rate limiter',
    dailyTasks: [
      { label: 'Design Twitter Feed — fan-out on write vs read hybrid', link: '/system-design' },
      { label: 'Design Rate Limiter — token bucket + Redis + fail-open', link: '/system-design' },
      { label: 'Design Notification System — Kafka + channel workers', link: '/system-design' },
      { label: 'Study Microservices, CQRS, Saga, Circuit Breaker patterns', link: '/system-design' },
      { label: 'Mock: design a system you haven\'t seen before (30 min)' },
    ],
    resources: ['System Design Primer (GitHub)', 'Netflix Tech Blog', 'AWS Architecture Center'],
    milestone: 'Complete any system design in 45 min with requirements → architecture → tradeoffs',
  },
  {
    week: 5,
    title: 'Coding Patterns',
    theme: 'TypeScript DSA Core Patterns',
    icon: Code,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    goal: 'Internalize Sliding Window, Two Pointers, Binary Search, BFS/DFS',
    dailyTasks: [
      { label: 'Sliding Window: solve 3 problems (LC #3, #76, #239)', link: '/coding/challenges' },
      { label: 'Two Pointers: solve 3 problems (LC #11, #15, #42)', link: '/coding/challenges' },
      { label: 'Binary Search: solve 2 problems (LC #33, #153)', link: '/coding' },
      { label: 'BFS/DFS: solve 2 problems (LC #200, #127)', link: '/coding/challenges' },
      { label: 'Review Big O for each pattern solved', link: '/coding' },
    ],
    resources: ['LeetCode (Easy/Medium)', 'Coding Challenges page in this app', 'NeetCode.io roadmap'],
    milestone: 'Solve any Easy/Medium pattern problem in under 20 minutes with explanation',
  },
  {
    week: 6,
    title: 'Coding — Hard Problems',
    theme: 'DP, Heaps, Advanced Graph',
    icon: Code,
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    goal: 'Tackle Medium-Hard problems and practice explaining complexity trade-offs',
    dailyTasks: [
      { label: 'Dynamic Programming: LC #322, #300, #1143', link: '/coding/challenges' },
      { label: 'Heap/Priority Queue: LC #23, #347, #373', link: '/coding/challenges' },
      { label: 'LRU Cache design + implementation', link: '/coding/challenges' },
      { label: 'Union Find: LC #684, #323', link: '/coding' },
      { label: 'Practice explaining solutions out loud — record yourself' },
    ],
    resources: ['LeetCode Medium/Hard', 'Coding Challenges page in this app', 'AlgoExpert'],
    milestone: 'Solve 2 Hard problems independently with clear complexity analysis',
  },
  {
    week: 7,
    title: 'Technical Leadership',
    theme: 'Architecture, Tech Debt, On-Call',
    icon: Target,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    goal: 'Articulate make vs buy decisions, tech debt frameworks, and incident management',
    dailyTasks: [
      { label: 'Study ADR format and write 2 sample ADRs', link: '/technical-leadership' },
      { label: 'Study Tech Debt Ledger — quantify debt in business terms', link: '/technical-leadership' },
      { label: 'Study On-Call frameworks — blameless RCA process', link: '/technical-leadership' },
      { label: 'Practice: "Tell me about a technical decision you made"' },
      { label: 'Study Team Management: 1:1 frameworks, career ladders', link: '/team-management' },
    ],
    resources: ['Technical Leadership page in this app', 'Staff Engineer book (Larson)', 'Will Larson blog'],
    milestone: 'Deliver a 5-minute verbal walkthrough of a complex technical decision you made',
  },
  {
    week: 8,
    title: 'Mock Interviews & Polish',
    theme: 'Full Simulation Week',
    icon: TrendingUp,
    color: 'from-violet-500 to-indigo-600',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    goal: 'Run full-length mock interviews across all categories and sharpen weak spots',
    dailyTasks: [
      { label: 'Mock behavioral interview — 45 min, 4 questions (record)' },
      { label: 'Mock system design — 45 min timed with whiteboard' },
      { label: 'Mock coding — 45 min, 1 medium + 1 easy' },
      { label: 'Review all weak spots identified in mocks' },
      { label: 'Prepare your 3 questions to ask interviewers for each company' },
    ],
    resources: ['Pramp.com (free mock interviews)', 'Interviewing.io', 'Practice with a peer'],
    milestone: 'Complete a full-day mock loop (behavioral + system design + coding) without major gaps',
  },
]

export default function RoadmapPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [activeWeek, setActiveWeek] = useState<number | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('roadmap-progress')
      if (stored) setChecked(JSON.parse(stored))
    } catch {}
  }, [])

  const toggleTask = (key: string) => {
    setChecked(prev => {
      const next = { ...prev, [key]: !prev[key] }
      try { localStorage.setItem('roadmap-progress', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const weekProgress = (week: WeekPlan) => {
    const total = week.dailyTasks.length
    const done = week.dailyTasks.filter((_, i) => checked[`${week.week}-${i}`]).length
    return { total, done, pct: Math.round((done / total) * 100) }
  }

  const totalTasks = weeks.reduce((s, w) => s + w.dailyTasks.length, 0)
  const totalDone = Object.values(checked).filter(Boolean).length
  const overallPct = Math.round((totalDone / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <span className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">8-Week FAANG Interview Roadmap</h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-300">
            A structured week-by-week plan to go from zero to FAANG-ready for SDM/EM interviews
          </p>

          {/* Overall progress */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{totalDone} / {totalTasks} tasks complete</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{overallPct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.6 }}
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              />
            </div>
          </div>
        </motion.div>

        {/* Weeks */}
        <div className="space-y-4">
          {weeks.map((week, idx) => {
            const { total, done, pct } = weekProgress(week)
            const Icon = week.icon
            const isOpen = activeWeek === week.week

            return (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800"
              >
                <button
                  className="w-full p-5 text-left"
                  onClick={() => setActiveWeek(isOpen ? null : week.week)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-xl bg-gradient-to-r ${week.color} p-3 text-white shadow`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-400">WEEK {week.week}</span>
                        {done === total && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Complete ✓
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white">{week.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{week.theme}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{done}/{total}</p>
                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${week.color} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`border-t border-gray-100 dark:border-gray-700 ${week.bgColor} p-5 space-y-4`}
                  >
                    {/* Goal */}
                    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">Week Goal</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{week.goal}</p>
                    </div>

                    {/* Daily Tasks */}
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Tasks</p>
                      <div className="space-y-2">
                        {week.dailyTasks.map((task, i) => {
                          const key = `${week.week}-${i}`
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800 cursor-pointer group"
                              onClick={() => toggleTask(key)}
                            >
                              {checked[key]
                                ? <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                                : <Circle className="h-5 w-5 shrink-0 text-gray-300 group-hover:text-gray-400" />
                              }
                              <span className={`flex-1 text-sm ${checked[key] ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                {task.label}
                              </span>
                              {task.link && (
                                <Link
                                  href={task.link}
                                  onClick={e => e.stopPropagation()}
                                  className="shrink-0 rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
                                >
                                  Go →
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Resources + Milestone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Resources</p>
                        <ul className="space-y-1">
                          {week.resources.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <ArrowRight className="h-3 w-3 mt-0.5 shrink-0 text-blue-400" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Week Milestone</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{week.milestone}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white shadow-xl">
          <Clock className="mx-auto mb-3 h-8 w-8 opacity-80" />
          <h2 className="mb-2 text-xl font-bold">Pro Tip: Consistency beats intensity</h2>
          <p className="text-blue-100">45 minutes of focused practice daily beats 4-hour sessions twice a week. Track your progress above and complete each milestone before moving to the next week.</p>
        </motion.div>
      </div>
    </div>
  )
}
