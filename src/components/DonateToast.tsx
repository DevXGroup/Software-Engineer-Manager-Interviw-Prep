'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Heart, X } from 'lucide-react'

export function DonateToast() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('donate-toast-dismissed')) return

    const timer = setTimeout(() => setVisible(true), 60_000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem('donate-toast-dismissed', '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="surface-card fixed bottom-6 right-6 z-[70] flex max-w-sm items-start gap-3 p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay-600 dark:bg-clay-500">
            <Heart className="h-5 w-5 text-white dark:text-ink-950" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              Enjoying this free resource?
            </p>
            <p className="mt-1 text-xs text-muted">
              If this helped you prep, consider buying me a coffee to keep it free for everyone.
            </p>
            <a
              href="https://buymeacoffee.com/max.sheikhizadeh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-clay-600 px-3 text-xs font-medium text-white transition-colors duration-150 ease-out hover:bg-clay-700 dark:bg-clay-500 dark:text-ink-950 dark:hover:bg-clay-400"
            >
              <Heart className="h-3 w-3" />
              Buy me a coffee
            </a>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-600 transition-colors duration-150 ease-out hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
