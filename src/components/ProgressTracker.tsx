'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import { useProgressStore } from '@/store/progressStore'

const modules = [
  { id: 'behavioral', name: 'Behavioral', total: 20, href: '/behavioral' },
  { id: 'system-design', name: 'System Design', total: 15, href: '/system-design' },
  { id: 'coding', name: 'Coding', total: 30, href: '/coding' },
  { id: 'leadership', name: 'Leadership', total: 10, href: '/technical-leadership' },
  { id: 'team', name: 'Team Management', total: 12, href: '/team-management' },
  { id: 'ai-interview', name: 'AI Interview', total: 12, href: '/ai-interview' },
]

export function ProgressTracker() {
  const { progress, quizResults } = useProgressStore()
  const reduceMotion = useReducedMotion()

  const rows = modules.map((m) => {
    const completed = progress[m.id] || 0
    return { ...m, completed, pct: Math.min(100, (completed / m.total) * 100) }
  })

  const doneTopics = rows.reduce((a, r) => a + r.completed, 0)
  const allTopics = rows.reduce((a, r) => a + r.total, 0)
  const overall = Math.round((doneTopics / allTopics) * 100)
  const nextUp = [...rows].sort((a, b) => a.pct - b.pct)[0]
  const started = doneTopics > 0

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      {/* Coverage chart: one row per track, bar length is the real coverage. */}
      <div>
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl">Your coverage</h2>
          <p className="text-sm text-ink-600 dark:text-ink-300">
            {doneTopics} of {allTopics} topics marked done
          </p>
        </div>

        <ul className="space-y-1">
          {rows.map((row) => {
            const quiz = quizResults[row.id]
            return (
              <li key={row.id}>
                <Link
                  href={row.href}
                  className="group flex min-h-[44px] items-center gap-4 rounded-lg px-2 py-2 transition-colors duration-150 ease-out hover:bg-ink-100 dark:hover:bg-ink-800"
                >
                  <span className="w-36 shrink-0 truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                    {row.name}
                  </span>

                  <span className="relative h-6 flex-1 overflow-hidden rounded-sm bg-ink-100 dark:bg-ink-800">
                    <motion.span
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: row.pct / 100 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="absolute inset-y-0 left-0 w-full bg-clay-600 dark:bg-clay-500"
                    />
                  </span>

                  <span className="w-16 shrink-0 text-right font-mono text-xs tabular-nums text-ink-600 dark:text-ink-300">
                    {row.completed}/{row.total}
                  </span>

                  {quiz?.passed ? (
                    <Trophy className="h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" aria-label="Quiz passed" />
                  ) : (
                    <span className="h-4 w-4 shrink-0" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* What to do next, derived from the same data. */}
      <aside className="surface-card flex flex-col justify-between gap-6 p-6">
        <div>
          <p className="text-sm text-ink-600 dark:text-ink-300">Overall</p>
          <p className="mt-1 font-mono text-4xl tabular-nums text-ink-900 dark:text-ink-50">{overall}%</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
            {started
              ? `Least covered right now: ${nextUp.name}.`
              : 'Nothing marked yet. Behavioral is the round most EM candidates fail, so start there.'}
          </p>
        </div>
        <Link href={started ? nextUp.href : '/behavioral'} className="btn-primary w-full">
          {started ? `Continue ${nextUp.name}` : 'Start with Behavioral'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </aside>
    </div>
  )
}
