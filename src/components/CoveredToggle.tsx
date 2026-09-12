'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import clsx from 'clsx'
import type { TrackId } from '@/data/tracks'
import { useIsCovered, useProgressStore } from '@/store/progressStore'

/**
 * The one control that feeds the home page coverage chart.
 * Sits at the end of every readable item. Reports state, nothing else.
 */
export function CoveredToggle({
  track,
  itemId,
  className,
  size = 'md',
}: {
  track: TrackId
  itemId: string
  className?: string
  size?: 'sm' | 'md'
}) {
  const covered = useIsCovered(track, itemId)
  const toggle = useProgressStore((s) => s.toggleCovered)
  const reduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={covered}
      onClick={(e) => {
        e.stopPropagation()
        toggle(track, itemId)
      }}
      className={clsx(
        'inline-flex min-h-[44px] items-center gap-2 rounded-lg border font-medium transition-colors duration-150 ease-out',
        size === 'sm' ? 'px-3 text-xs' : 'px-4 text-sm',
        covered
          ? 'border-moss-600 bg-moss-50 text-moss-800 hover:bg-moss-100 dark:border-moss-500 dark:bg-moss-900/30 dark:text-moss-200 dark:hover:bg-moss-900/50'
          : 'border-ink-300 bg-white text-ink-700 hover:border-ink-400 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:bg-ink-800',
        className
      )}
    >
      <span
        className={clsx(
          'flex h-4 w-4 items-center justify-center rounded-sm border',
          covered ? 'border-moss-600 bg-moss-600 dark:border-moss-500 dark:bg-moss-500' : 'border-ink-400 dark:border-ink-500'
        )}
        aria-hidden="true"
      >
        {covered && (
          <motion.span
            initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <Check className="h-3 w-3 text-white dark:text-ink-950" strokeWidth={3} />
          </motion.span>
        )}
      </span>
      {covered ? 'Covered' : 'Mark covered'}
    </button>
  )
}
