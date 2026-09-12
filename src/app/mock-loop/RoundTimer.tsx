'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Pause, Play, RotateCcw } from 'lucide-react'

import { rounds } from '@/data/mockLoop'

const presets: readonly { id: string; label: string; minutes: number }[] = [
  ...rounds.map((round) => ({ id: round.id, label: `${round.name} (${round.minutes})`, minutes: round.minutes })),
  { id: 'break', label: 'Break (10)', minutes: 10 },
]

const mmss = (totalSeconds: number): string => {
  const safe = Math.max(0, totalSeconds)
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function RoundTimer() {
  const [presetId, setPresetId] = useState(presets[0].id)
  const [remaining, setRemaining] = useState(presets[0].minutes * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reduceMotion = useReducedMotion()

  const preset = presets.find((item) => item.id === presetId) ?? presets[0]
  const total = preset.minutes * 60
  const elapsedPct = total === 0 ? 0 : Math.round(((total - remaining) / total) * 100)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const selectPreset = (id: string) => {
    const next = presets.find((item) => item.id === id) ?? presets[0]
    setPresetId(id)
    setRunning(false)
    setRemaining(next.minutes * 60)
  }

  const reset = () => {
    setRunning(false)
    setRemaining(total)
  }

  return (
    <div className="surface-sunken p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className="font-mono tabular-nums text-4xl text-ink-900 dark:text-ink-50"
            role="timer"
            aria-live="off"
            aria-label={`${mmss(remaining)} remaining`}
          >
            {mmss(remaining)}
          </p>
          <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{preset.label}</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setRunning((prev) => !prev)} className="btn-primary">
            {running ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
            {running ? 'Pause' : 'Start'}
          </button>
          <button type="button" onClick={reset} className="btn-secondary">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-lg bg-ink-200 dark:bg-ink-800">
        <div
          className={
            reduceMotion
              ? 'h-2 rounded-lg bg-clay-600 dark:bg-clay-500'
              : 'h-2 rounded-lg bg-clay-600 transition-[width] duration-1000 ease-linear dark:bg-clay-500'
          }
          style={{ width: `${elapsedPct}%` }}
        />
      </div>

      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-ink-600 dark:text-ink-300">Round length</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectPreset(item.id)}
              aria-pressed={item.id === presetId}
              className={
                item.id === presetId
                  ? 'min-h-[44px] rounded-lg bg-clay-600 px-3 text-sm font-semibold text-white transition-colors duration-150 ease-out dark:bg-clay-500 dark:text-ink-950'
                  : 'min-h-[44px] rounded-lg px-3 text-sm font-semibold text-ink-700 transition-colors duration-150 ease-out hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
        No sound and no notification, so keep the tab visible. Nothing is saved.
      </p>
    </div>
  )
}
