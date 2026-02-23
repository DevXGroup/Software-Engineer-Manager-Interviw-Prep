'use client'

import { Star, BookOpen } from 'lucide-react'
import type { Priority } from '@/data/quizzes/types'

export function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === 'must-know') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
        <Star className="h-3 w-3" />
        Must Know
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
      <BookOpen className="h-3 w-3" />
      Good to Know
    </span>
  )
}
