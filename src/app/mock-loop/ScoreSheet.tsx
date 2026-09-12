'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react'

import { rounds, scoringGuide } from '@/data/mockLoop'

const STORAGE_KEY = 'mock-loop-scores'

type Scores = Record<string, number>

const cellKey = (roundId: string, criterionId: string) => `${roundId}:${criterionId}`

const scoreValues = [1, 2, 3, 4] as const

export function ScoreSheet() {
  const [scores, setScores] = useState<Scores>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setScores(JSON.parse(stored) as Scores)
    } catch {}
    setLoaded(true)
  }, [])

  const setScore = (roundId: string, criterionId: string, value: number) => {
    setScores((prev) => {
      const key = cellKey(roundId, criterionId)
      const next = { ...prev }
      if (next[key] === value) {
        delete next[key]
      } else {
        next[key] = value
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const clearAll = () => {
    setScores({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  const roundTotals = rounds.map((round) => {
    const entered = round.criteria
      .map((criterion) => scores[cellKey(round.id, criterion.id)])
      .filter((value): value is number => typeof value === 'number')
    return {
      round,
      scored: entered.length,
      total: entered.reduce((sum, value) => sum + value, 0),
      max: round.criteria.length * 4,
      complete: entered.length === round.criteria.length,
    }
  })

  const completed = roundTotals.filter((item) => item.complete)
  const weakest = completed.length
    ? completed.reduce((lowest, item) => (item.total < lowest.total ? item : lowest))
    : null

  return (
    <div className="space-y-6">
      <div className="surface-sunken p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-ink-600 dark:text-ink-300">What the scores mean</h3>
        <ul className="mt-2 space-y-1 text-sm text-ink-700 dark:text-ink-200">
          {scoringGuide.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
          Scores stay in this browser. Tap a score again to clear it.
        </p>
      </div>

      {rounds.map((round, index) => {
        const summary = roundTotals[index]
        return (
          <section key={round.id} aria-labelledby={`score-${round.id}`} className="surface-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 id={`score-${round.id}`} className="text-lg text-ink-900 dark:text-ink-50">
                {round.name}
              </h3>
              <p className="text-sm text-ink-600 dark:text-ink-300">
                <span className="font-mono tabular-nums">
                  {summary.total}/{summary.max}
                </span>{' '}
                {summary.complete ? 'scored' : `(${summary.scored} of ${round.criteria.length} criteria entered)`}
              </p>
            </div>

            <div className="mt-4 divide-y divide-ink-200 dark:divide-ink-800">
              {round.criteria.map((criterion) => {
                const key = cellKey(round.id, criterion.id)
                const current = scores[key]
                return (
                  <div key={criterion.id} className="py-4 first:pt-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-base font-semibold text-ink-900 dark:text-ink-50">{criterion.label}</p>
                      <div
                        role="group"
                        aria-label={`${criterion.label} score, 1 to 4`}
                        className="flex gap-2"
                      >
                        {scoreValues.map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setScore(round.id, criterion.id, value)}
                            aria-pressed={current === value}
                            aria-label={`Score ${value} for ${criterion.label} in ${round.name}`}
                            className={
                              current === value
                                ? 'h-11 w-11 rounded-lg bg-clay-600 font-mono tabular-nums text-base font-semibold text-white transition-colors duration-150 ease-out dark:bg-clay-500 dark:text-ink-950'
                                : 'h-11 w-11 rounded-lg border border-ink-300 font-mono tabular-nums text-base font-semibold text-ink-700 transition-colors duration-150 ease-out hover:bg-ink-100 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800'
                            }
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex gap-2">
                        <dt className="shrink-0 font-mono tabular-nums text-ink-600 dark:text-ink-300">1</dt>
                        <dd className="text-ink-700 dark:text-ink-200">{criterion.anchorLow}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="shrink-0 font-mono tabular-nums text-ink-600 dark:text-ink-300">4</dt>
                        <dd className="text-ink-700 dark:text-ink-200">{criterion.anchorHigh}</dd>
                      </div>
                    </dl>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {loaded && weakest && (
        <div className="surface-card p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true" />
            <div>
              <h3 className="text-lg text-ink-900 dark:text-ink-50">Weakest round so far: {weakest.round.name}</h3>
              <p className="prose-column mt-2">
                It scored{' '}
                <span className="font-mono tabular-nums">
                  {weakest.total}/{weakest.max}
                </span>
                , the lowest of the {completed.length} round{completed.length === 1 ? '' : 's'} you have finished
                scoring. Start your next study block there rather than on the round you enjoyed most.
              </p>
              <Link href={weakest.round.track} className="btn-primary mt-4">
                Open the {weakest.round.trackLabel.toLowerCase()}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div>
        <button type="button" onClick={clearAll} className="btn-secondary">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Clear all scores
        </button>
      </div>
    </div>
  )
}
