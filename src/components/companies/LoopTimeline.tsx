'use client'

import { motion, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

export interface LoopRound {
  name: string
  duration: string
  focus: string
}

function minutes(d: string): number {
  const m = d.match(/(\d+)/)
  return m ? Number(m[1]) : 45
}

/**
 * The interview loop as a proportional timeline: each round's width is its
 * duration, so a 30-minute screen and a 60-minute bar raiser read differently.
 * The bar draws once on mount (reports "here is the day"), then stays static.
 */
export function LoopTimeline({ rounds, className }: { rounds: LoopRound[]; className?: string }) {
  const reduce = useReducedMotion()
  const total = rounds.reduce((a, r) => a + minutes(r.duration), 0)
  const hours = Math.floor(total / 60)
  const mins = total % 60

  return (
    <figure className={clsx('surface-sunken p-4 sm:p-5', className)}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <figcaption className="text-sm font-semibold text-ink-800 dark:text-ink-100">
          The loop, to scale
        </figcaption>
        <span className="font-mono text-xs tabular-nums text-ink-600 dark:text-ink-300">
          {rounds.length} rounds, {hours > 0 ? `${hours}h ` : ''}{mins > 0 ? `${mins}m` : ''} of interviewing
        </span>
      </div>

      <ol className="flex h-11 w-full gap-1" aria-label="Interview rounds in order, width proportional to duration">
        {rounds.map((r, i) => {
          const pct = (minutes(r.duration) / total) * 100
          return (
            <motion.li
              key={r.name}
              style={{ width: `${pct}%`, originX: 0 }}
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-w-[6px] rounded-md bg-ink-200 dark:bg-ink-800"
              title={`${r.name}, ${r.duration}`}
            >
              <span className="absolute inset-x-1.5 top-1/2 hidden -translate-y-1/2 truncate font-mono text-[10px] text-ink-700 dark:text-ink-200 sm:block">
                {i + 1}
              </span>
            </motion.li>
          )
        })}
      </ol>

      <ol className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {rounds.map((r, i) => (
          <li key={r.name} className="flex gap-3">
            <span className="w-4 shrink-0 font-mono text-xs tabular-nums text-ink-500 dark:text-ink-400">{i + 1}</span>
            <span className="min-w-0">
              <span className="font-medium text-ink-900 dark:text-ink-50">{r.name}</span>
              <span className="text-ink-600 dark:text-ink-300"> · {r.duration}</span>
              <span className="block text-ink-700 dark:text-ink-200">{r.focus}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
