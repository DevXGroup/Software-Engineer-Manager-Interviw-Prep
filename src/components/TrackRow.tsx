'use client'

import Link from 'next/link'
import { ArrowRight, LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface TrackRowProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  topics: string[]
  /** The lead track gets more weight: larger type, full-width, stated first. */
  lead?: boolean
}

export function TrackRow({ title, description, icon: Icon, href, topics, lead = false }: TrackRowProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'surface-card card-hover group flex gap-5 p-5 sm:p-6',
        lead && 'border-clay-200 bg-clay-50 dark:border-clay-900 dark:bg-clay-950/40'
      )}
    >
      <span
        className={clsx(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
          lead
            ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
            : 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200'
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className={clsx(
            'text-ink-900 dark:text-ink-50',
            lead ? 'text-2xl' : 'text-xl'
          )}
        >
          {title}
        </h3>

        <p
          className={clsx(
            'mt-1.5 text-ink-700 dark:text-ink-200',
            lead ? 'max-w-prose text-base leading-relaxed' : 'text-sm'
          )}
        >
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {topics.map((topic) => (
            <span key={topic} className="chip">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <ArrowRight className="mt-1 hidden h-5 w-5 shrink-0 text-ink-500 transition-transform duration-150 ease-out group-hover:translate-x-0.5 dark:text-ink-400 sm:block" aria-hidden="true" />
    </Link>
  )
}
