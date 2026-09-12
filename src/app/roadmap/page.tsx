'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { weeks, roadmapIcon as RoadmapIcon } from '@/data/roadmap'

export default function RoadmapPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [activeWeek, setActiveWeek] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('roadmap-progress')
      if (stored) setChecked(JSON.parse(stored))
    } catch {}
  }, [])

  const toggleTask = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      try {
        localStorage.setItem('roadmap-progress', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const weekProgress = (week: (typeof weeks)[number]) => {
    const total = week.dailyTasks.length
    const done = week.dailyTasks.filter((t) => checked[`${week.week}-${t.id}`]).length
    return { total, done, pct: Math.round((done / total) * 100) }
  }

  const totalTasks = weeks.reduce((s, w) => s + w.dailyTasks.length, 0)
  const totalDone = Object.values(checked).filter(Boolean).length
  const overallPct = Math.round((totalDone / totalTasks) * 100)

  return (
    <div className="min-h-screen px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 border-b border-ink-200 pb-8 dark:border-ink-800">
          <div className="mb-4 flex justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-clay-600 dark:bg-clay-500">
              <RoadmapIcon className="h-6 w-6 text-white dark:text-ink-950" />
            </span>
          </div>
          <h1 className="text-center text-4xl text-ink-900 dark:text-ink-50">The 8-week plan</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg text-ink-700 dark:text-ink-200">
            Week by week, from a blank page to a full EM or SDM loop. Tick tasks as you go; the plan remembers them in this browser.
          </p>

          {/* Overall progress */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="mb-2 flex justify-between text-sm text-ink-600 dark:text-ink-300">
              <span>
                <span className="font-mono tabular-nums">
                  {totalDone}/{totalTasks}
                </span>{' '}
                tasks complete
              </span>
              <span className="font-mono tabular-nums font-semibold text-clay-700 dark:text-clay-400">{overallPct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-lg bg-ink-200 dark:bg-ink-800">
              <motion.div
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.6 }}
                className="h-2 rounded-lg bg-clay-600 dark:bg-clay-500"
              />
            </div>
          </div>
        </div>

        {/* Weeks */}
        <div className="space-y-4">
          {weeks.map((week) => {
            const { total, done, pct } = weekProgress(week)
            const Icon = week.icon
            const isOpen = activeWeek === week.week

            return (
              <div key={week.id} id={week.id} className="overflow-hidden rounded-xl surface-card">
                <button
                  type="button"
                  className="flex min-h-[44px] w-full items-center gap-4 p-5 text-left transition-colors duration-150 ease-out hover:bg-ink-100 dark:hover:bg-ink-800"
                  aria-expanded={isOpen}
                  onClick={() => setActiveWeek(isOpen ? null : week.week)}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800">
                    <Icon className="h-5 w-5 text-ink-700 dark:text-ink-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-ink-600 dark:text-ink-300">Week {week.week}</span>
                      {done === total && (
                        <span className="chip inline-flex items-center gap-1 bg-moss-100 text-moss-800 dark:bg-moss-900/30 dark:text-moss-300">
                          <Check className="h-3 w-3" /> Complete
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-ink-900 dark:text-ink-50">{week.title}</p>
                    <p className="text-xs text-ink-600 dark:text-ink-300">{week.theme}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono tabular-nums text-sm font-semibold text-ink-700 dark:text-ink-200">
                      {done}/{total}
                    </p>
                    <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-lg bg-ink-200 dark:bg-ink-800">
                      <div
                        className="h-1.5 rounded-lg bg-clay-600 transition-colors duration-150 ease-out dark:bg-clay-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-ink-200 dark:border-ink-800"
                    >
                      <div className="space-y-4 p-5">
                        {/* Goal */}
                        <div className="surface-sunken p-4">
                          <h3 className="mb-1 text-sm font-semibold text-ink-600 dark:text-ink-300">Week goal</h3>
                          <p className="text-sm text-ink-800 dark:text-ink-200">{week.goal}</p>
                        </div>

                        {/* Daily Tasks */}
                        <div>
                          <h3 className="mb-3 text-sm font-semibold text-ink-600 dark:text-ink-300">Tasks</h3>
                          <div className="divide-y divide-ink-200 dark:divide-ink-800">
                            {week.dailyTasks.map((task) => {
                              const key = `${week.week}-${task.id}`
                              const isChecked = Boolean(checked[key])
                              return (
                                <div key={task.id} className="flex min-h-[44px] items-center gap-3 py-2">
                                  <label className="flex min-h-[44px] flex-1 cursor-pointer items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleTask(key)}
                                      className="h-4 w-4 shrink-0 rounded-sm border-ink-400 text-clay-600 focus-visible:outline focus-visible:outline-2 dark:border-ink-500"
                                    />
                                    <span
                                      className={
                                        isChecked
                                          ? 'flex-1 text-sm text-ink-500 line-through dark:text-ink-500'
                                          : 'flex-1 text-sm text-ink-700 dark:text-ink-200'
                                      }
                                    >
                                      {task.label}
                                    </span>
                                  </label>
                                  {task.link && (
                                    <Link
                                      href={task.link}
                                      className="chip shrink-0 text-ink-700 hover:bg-ink-200 dark:text-ink-200 dark:hover:bg-ink-700"
                                    >
                                      Go
                                    </Link>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Resources + Milestone */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="surface-sunken p-4">
                            <h3 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Resources</h3>
                            <ul className="space-y-1">
                              {week.resources.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-xs text-ink-600 dark:text-ink-300">
                                  <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-teal-600 dark:text-teal-400" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="surface-sunken p-4">
                            <h3 className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Week milestone</h3>
                            <p className="text-xs leading-relaxed text-ink-700 dark:text-ink-200">{week.milestone}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div className="surface-sunken mt-10 p-6">
          <h2 className="mb-2 text-lg font-semibold text-ink-900 dark:text-ink-50">Consistency beats intensity</h2>
          <p className="text-sm text-ink-700 dark:text-ink-200">
            Forty-five minutes of focused practice daily beats four-hour sessions twice a week. Track your progress above and complete each milestone before moving to the next week.
          </p>
        </div>
      </div>
    </div>
  )
}
