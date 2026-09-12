'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ChevronDown, ChevronUp, ArrowLeft, Trophy, Clock, MemoryStick,
  Lightbulb, AlertTriangle, MessageSquare, Code, BookOpen, Tag, Check,
} from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { codingChallenges, challengeItemIds, type Difficulty } from '@/data/tracks/coding-challenges'
import { CoveredToggle } from '@/components/CoveredToggle'
import { useIsCovered, useCoveredCount } from '@/store/progressStore'

// ── Helpers ────────────────────────────────────────────────────────────────
const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: 'bg-moss-100 text-moss-800 dark:bg-moss-900/30 dark:text-moss-300',
  Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Hard: 'bg-rust-100 text-rust-800 dark:bg-rust-900/30 dark:text-rust-300',
}

const ALL_PATTERNS = Array.from(new Set(codingChallenges.flatMap((c) => c.patterns))).sort()

// ── Component ──────────────────────────────────────────────────────────────
export default function CodingChallengesPage() {
  const reduceMotion = useReducedMotion()
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')
  const [pattern, setPattern] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({})
  const covered = useCoveredCount('coding', challengeItemIds)

  const filtered = useMemo(() => {
    return codingChallenges.filter((c) => {
      const matchDiff = difficulty === 'All' || c.difficulty === difficulty
      const matchPattern = pattern === 'All' || c.patterns.includes(pattern)
      return matchDiff && matchPattern
    })
  }, [difficulty, pattern])

  const counts = useMemo(
    () => ({
      Easy: codingChallenges.filter((c) => c.difficulty === 'Easy').length,
      Medium: codingChallenges.filter((c) => c.difficulty === 'Medium').length,
      Hard: codingChallenges.filter((c) => c.difficulty === 'Hard').length,
    }),
    []
  )

  const toggleSolution = (id: string) => setShowSolution((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/coding"
            className="mb-6 -ml-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-ink-600 transition-colors duration-150 ease-out hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back to coding practice
          </Link>
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950">
                <Trophy className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>
            <h1 className="text-4xl text-ink-900 dark:text-ink-50">TypeScript coding challenges</h1>
            <p className="mx-auto max-w-2xl text-lg text-ink-700 dark:text-ink-200">
              16 curated LeetCode problems with full TypeScript solutions, step-by-step Q&A walkthroughs, and
              time and space complexity analysis.
            </p>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              <span className="font-mono tabular-nums">
                {covered}/{challengeItemIds.length}
              </span>{' '}
              covered
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(difficulty === d ? 'All' : d)}
                className={clsx(
                  'surface-card card-hover min-h-[44px] p-4 text-center transition-colors duration-150 ease-out',
                  difficulty === d && 'border-clay-400 bg-clay-50 dark:border-clay-600 dark:bg-clay-950/40'
                )}
              >
                <p className="text-2xl text-ink-900 dark:text-ink-50">{counts[d]}</p>
                <p className="text-sm font-medium text-ink-600 dark:text-ink-300">{d}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-3">
          <div role="tablist" aria-label="Filter by difficulty" className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={difficulty === d}
                onClick={() => setDifficulty(d)}
                className={clsx(
                  'inline-flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium transition-colors duration-150 ease-out',
                  difficulty === d
                    ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
                    : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
                )}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 shrink-0 text-ink-500 dark:text-ink-400" aria-hidden="true" />
            {['All', ...ALL_PATTERNS].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPattern(p)}
                className={clsx(
                  'inline-flex min-h-[44px] items-center rounded-lg px-3 text-xs font-medium transition-colors duration-150 ease-out',
                  pattern === p
                    ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
                    : 'chip hover:bg-ink-100 dark:hover:bg-ink-800'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-ink-600 dark:text-ink-300">
          {filtered.length} challenge{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Challenge list */}
        <div className="space-y-4">
          {filtered.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              expanded={expanded === challenge.id}
              onToggleExpanded={() => setExpanded(expanded === challenge.id ? null : challenge.id)}
              showSolution={!!showSolution[challenge.id]}
              onToggleSolution={() => toggleSolution(challenge.id)}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-ink-600 dark:text-ink-300">No challenges match your filters.</div>
        )}
      </div>
    </div>
  )
}

function ChallengeCard({
  challenge,
  expanded,
  onToggleExpanded,
  showSolution,
  onToggleSolution,
  reduceMotion,
}: {
  challenge: (typeof codingChallenges)[number]
  expanded: boolean
  onToggleExpanded: () => void
  showSolution: boolean
  onToggleSolution: () => void
  reduceMotion: boolean
}) {
  const isCovered = useIsCovered('coding', challenge.id)

  return (
    <div className="surface-card" id={challenge.id}>
      {/* Card header */}
      <button type="button" className="w-full p-6 text-left" onClick={onToggleExpanded}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded bg-ink-100 px-2 py-0.5 font-mono text-xs text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                LC #{challenge.leetcode}
              </span>
              <span className={clsx('rounded-lg px-2.5 py-0.5 text-xs font-medium', DIFFICULTY_STYLES[challenge.difficulty])}>
                {challenge.difficulty}
              </span>
              {challenge.patterns.map((p) => (
                <span key={p} className="chip">
                  {p}
                </span>
              ))}
              {isCovered && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-moss-700 dark:text-moss-400">
                  <Check className="h-4 w-4" aria-label="Covered" />
                  Covered
                </span>
              )}
            </div>
            <h3 className="text-lg text-ink-900 dark:text-ink-50">{challenge.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">{challenge.description}</p>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-ink-500 dark:text-ink-400" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-ink-500 dark:text-ink-400" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-200 dark:border-ink-800"
          >
            <div className="space-y-6 p-6">
              {/* Problem description */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-600 dark:text-ink-300">
                  <BookOpen className="h-4 w-4" aria-hidden="true" /> Problem
                </h4>
                <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{challenge.description}</p>
              </div>

              {/* Constraints + examples */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="surface-sunken p-4">
                  <p className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Constraints</p>
                  <ul className="space-y-1">
                    {challenge.constraints.map((c, i) => (
                      <li key={i} className="font-mono text-xs text-ink-600 dark:text-ink-300">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="surface-sunken p-4">
                  <p className="mb-2 text-sm font-semibold text-ink-600 dark:text-ink-300">Examples</p>
                  {challenge.examples.map((ex, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      <p className="font-mono text-xs text-ink-600 dark:text-ink-300">Input: {ex.input}</p>
                      <p className="font-mono text-xs font-semibold text-ink-800 dark:text-ink-100">Output: {ex.output}</p>
                      {ex.explanation && <p className="text-xs text-ink-600 dark:text-ink-300">{ex.explanation}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Approach */}
              <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                <p className="mb-2 text-sm font-semibold text-teal-800 dark:text-teal-300">Approach</p>
                <p className="text-sm leading-relaxed text-teal-900 dark:text-teal-200">{challenge.approach}</p>
              </div>

              {/* Q&A walkthrough */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-600 dark:text-ink-300">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" /> Interview Q&A walkthrough
                </h4>
                <div className="divide-y divide-ink-200 rounded-lg border border-ink-200 dark:divide-ink-800 dark:border-ink-800">
                  {challenge.qa.map((item, i) => (
                    <div key={i} className="p-4">
                      <p className="text-xs font-semibold text-clay-700 dark:text-clay-400">Q: {item.q}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complexity */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="surface-sunken p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-ink-600 dark:text-ink-300" aria-hidden="true" />
                    <p className="text-xs font-semibold text-ink-600 dark:text-ink-300">Time complexity</p>
                  </div>
                  <p className="font-mono text-lg text-ink-900 dark:text-ink-50">{challenge.timeComplexity}</p>
                </div>
                <div className="surface-sunken p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-ink-600 dark:text-ink-300" aria-hidden="true" />
                    <p className="text-xs font-semibold text-ink-600 dark:text-ink-300">Space complexity</p>
                  </div>
                  <p className="font-mono text-lg text-ink-900 dark:text-ink-50">{challenge.spaceComplexity}</p>
                </div>
                <div className="surface-sunken p-4 sm:col-span-1">
                  <p className="mb-1 text-xs font-semibold text-ink-600 dark:text-ink-300">Why</p>
                  <p className="text-xs text-ink-700 dark:text-ink-200">{challenge.complexityExplanation}</p>
                </div>
              </div>

              {/* Insight */}
              <div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-300">
                  <Lightbulb className="h-4 w-4" aria-hidden="true" /> Key insight
                </p>
                <p className="text-sm leading-relaxed text-teal-900 dark:text-teal-200">{challenge.insight}</p>
              </div>

              {/* Solution */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-ink-600 dark:text-ink-300">
                    <Code className="h-4 w-4" aria-hidden="true" /> TypeScript solution
                  </h4>
                  <button type="button" onClick={onToggleSolution} className="btn-secondary min-h-[44px] px-4 text-xs">
                    {showSolution ? 'Hide solution' : 'Reveal solution'}
                  </button>
                </div>
                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <pre className="overflow-x-auto rounded-lg border border-ink-800 bg-ink-950 p-5 font-mono text-[13px] leading-[1.6] text-ink-100">
                        <code>{challenge.solution}</code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Common mistakes */}
              <div className="rounded-lg bg-rust-50 p-4 dark:bg-rust-900/20">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-rust-800 dark:text-rust-300">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Common mistakes to avoid
                </p>
                <ul className="space-y-1.5">
                  {challenge.mistakes.map((m, i) => (
                    <li key={i} className="text-xs leading-relaxed text-rust-800 dark:text-rust-300">
                      · {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <CoveredToggle track="coding" itemId={challenge.id} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
