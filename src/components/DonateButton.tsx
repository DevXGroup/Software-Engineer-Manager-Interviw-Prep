'use client'

import { Heart } from 'lucide-react'

export function DonateButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://buymeacoffee.com/max.sheikhizadeh"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-clay-300 px-4 text-sm font-medium text-clay-800 transition-colors duration-150 ease-out hover:bg-clay-50 dark:border-clay-800 dark:text-clay-200 dark:hover:bg-clay-950/50 ${className}`}
    >
      <Heart className="h-4 w-4" />
      Donate
    </a>
  )
}
