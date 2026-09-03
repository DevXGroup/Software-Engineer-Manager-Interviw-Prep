'use client'

import { Heart } from 'lucide-react'

export function DonateButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://buymeacoffee.com/max.sheikhizadeh"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110 ${className}`}
    >
      <Heart className="h-4 w-4" />
      Donate
    </a>
  )
}
