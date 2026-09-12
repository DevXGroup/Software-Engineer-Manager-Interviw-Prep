'use client'

import { Star, BookOpen, Layers } from 'lucide-react'
import type { Priority } from '@/data/quizzes/types'

type FilterValue = 'all' | Priority

export function PriorityFilter({
  value,
  onChange,
}: {
  value: FilterValue
  onChange: (v: FilterValue) => void
}) {
  const options: { label: string; val: FilterValue; icon: React.ElementType }[] = [
    { label: 'All', val: 'all', icon: Layers },
    { label: 'Must Know', val: 'must-know', icon: Star },
    { label: 'Good to Know', val: 'good-to-know', icon: BookOpen },
  ]

  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Filter by priority">
      {options.map(({ label, val, icon: Icon }) => (
        <button
          key={val}
          role="radio"
          aria-checked={value === val}
          onClick={() => onChange(val)}
          className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-150 ease-out ${
            value === val
              ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
              : 'border border-ink-200 bg-white text-ink-600 hover:bg-ink-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:bg-ink-800'
          }`}
        >
          <Icon className="h-3 w-3" />
          {label}
        </button>
      ))}
    </div>
  )
}
