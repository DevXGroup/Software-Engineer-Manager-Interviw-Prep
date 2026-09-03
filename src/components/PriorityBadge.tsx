'use client'

import { Star, BookOpen } from 'lucide-react'
import type { Priority } from '@/data/quizzes/types'

export function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === 'must-know') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-clay-300 bg-clay-50 px-2 py-0.5 text-xs font-semibold text-clay-800 dark:border-clay-800 dark:bg-clay-950/50 dark:text-clay-200">
        <Star className="h-3 w-3" />
        Must Know
      </span>
    )
  }

  return (
    <span className="chip">
      <BookOpen className="h-3 w-3" />
      Good to Know
    </span>
  )
}
