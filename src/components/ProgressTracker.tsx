'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import { useProgressStore } from '@/store/progressStore'
import { tracks } from '@/data/tracks'

export function ProgressTracker() {
  const covered = useProgressStore((s) => s.covered)
  const quizResults = useProgressStore((s) => s.quizResults)
  const reduceMotion = useReducedMotion()

  const rows = tracks.map((t) => {
    const done = (covered[t.id] ?? []).filter((id) => t.itemIds.includes(id)).length
    const total = t.itemIds.length
    return { ...t, done, total, pct: total ? (done / total) * 100 : 0 }
  })

  const doneTopics = rows.reduce((a, r) => a + r.done, 0)
  const allTopics = rows.reduce((a, r) => a + r.total, 0)
  const overall = allTopics ? Math.round((doneTopics / allTopics) * 100) : 0
  const started = doneTopics > 0
  // Least covered track wins; ties resolve to loop order (behavioral first).
  const nextUp = [...rows].sort((a, b) => a.pct - b.pct)[0]

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl">Your coverage</h2>
          <p className="text-sm text-ink-600 dark:text-ink-300">
            <span className="font-mono tabular-nums">{doneTopics}</span> of{' '}
            <span className="font-mono tabular-nums">{allTopics}</span> topics marked covered
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

                  <span
                    className="relative h-6 flex-1 overflow-hidden rounded-sm bg-ink-100 dark:bg-ink-800"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={row.total}
                    aria-valuenow={row.done}
                    aria-label={`${row.name} coverage`}
                  >
                    <motion.span
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: row.pct / 100 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                      className="absolute inset-y-0 left-0 w-full bg-clay-600 dark:bg-clay-500"
                    />
                  </span>

                  <span className="w-16 shrink-0 text-right font-mono text-xs tabular-nums text-ink-600 dark:text-ink-300">
                    {row.done}/{row.total}
                  </span>

                  {quiz?.passed ? (
                    <Trophy className="h-4 w-4 shrink-0 text-moss-600 dark:text-moss-400" aria-label="Quiz passed" />
                  ) : (
                    <span className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="surface-card flex flex-col justify-between gap-6 p-6">
        <div>
          <p className="text-sm text-ink-600 dark:text-ink-300">Overall</p>
          <p className="mt-1 font-mono text-4xl tabular-nums text-ink-900 dark:text-ink-50">{overall}%</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-200">
            {started
              ? `Least covered right now: ${nextUp.name}, ${nextUp.done} of ${nextUp.total}.`
              : 'Nothing marked yet. Every topic has a "Mark covered" control at the end. Behavioral is the round most EM candidates fail, so start there.'}
          </p>
        </div>
        <Link href={started ? nextUp.href : '/behavioral'} className="btn-primary w-full">
          {started ? `${nextUp.done > 0 ? 'Continue' : 'Start'} ${nextUp.name}` : 'Start with Behavioral'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </aside>
    </div>
  )
}
