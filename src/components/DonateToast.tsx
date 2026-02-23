'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X } from 'lucide-react'

export function DonateToast() {
  const [visible, setVisible] = useState(false)

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
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl bg-white p-4 shadow-2xl dark:bg-gray-800"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Enjoying this free resource?
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If this helped you prep, consider buying me a coffee to keep it free for everyone.
            </p>
            <a
              href="https://buymeacoffee.com/max.sheikhizadeh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 px-3 py-1.5 text-xs font-medium text-white hover:brightness-110"
            >
              <Heart className="h-3 w-3" />
              Buy Me a Coffee
            </a>
          </div>
          <button
            onClick={dismiss}
            className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
