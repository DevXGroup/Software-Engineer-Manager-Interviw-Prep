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
    <div className="flex gap-2">
      {options.map(({ label, val, icon: Icon }) => (
        <button
          key={val}
          onClick={() => onChange(val)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ease-out ${
            value === val
              ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
              : 'bg-white text-gray-600 card-hover dark:bg-gray-800 dark:text-gray-400'
          }`}
        >
          <Icon className="h-3 w-3" />
          {label}
        </button>
      ))}
    </div>
  )
}
