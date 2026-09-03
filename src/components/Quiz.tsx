'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, Trophy, Star, BookOpen } from 'lucide-react'
import type { QuizQuestion, Priority } from '@/data/quizzes/types'
import { useProgressStore } from '@/store/progressStore'

type QuizState = 'idle' | 'in-progress' | 'review'

export function Quiz({
  sectionId,
  title,
  questions,
  onClose,
}: {
  sectionId: string
  title: string
  questions: QuizQuestion[]
  onClose: () => void
}) {
  const [state, setState] = useState<QuizState>('idle')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all')
  const { submitQuizResult } = useProgressStore()

  const filtered = useMemo(() => {
    if (priorityFilter === 'all') return questions
    return questions.filter((q) => q.priority === priorityFilter)
  }, [questions, priorityFilter])

  const currentQ = filtered[currentIndex]
  const totalCorrect = Object.entries(answers).filter(
    ([id, ans]) => questions.find((q) => q.id === id)?.correctIndex === ans
  ).length
  const passed = filtered.length > 0 && totalCorrect / filtered.length >= 0.8

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    setAnswers((prev) => ({ ...prev, [currentQ.id]: selected }))
  }

  const handleNext = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
      setConfirmed(false)
    } else {
      const result = {
        score: totalCorrect + (selected === currentQ.correctIndex ? 1 : 0),
        total: filtered.length,
        passed:
          (totalCorrect + (selected === currentQ.correctIndex ? 1 : 0)) /
            filtered.length >=
          0.8,
        answers,
        completedAt: new Date().toISOString(),
      }
      submitQuizResult(sectionId, result)
      setState('review')
    }
  }

  const restart = () => {
    setState('idle')
    setCurrentIndex(0)
    setSelected(null)
    setConfirmed(false)
    setAnswers({})
  }

  // Idle state
  if (state === 'idle') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl text-ink-900 dark:text-ink-50">{title} Quiz</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {questions.length} questions &middot; 80% to pass
          </p>
        </div>

        <div className="flex gap-2">
          {(['all', 'must-know', 'good-to-know'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setPriorityFilter(f)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ease-out ${
                priorityFilter === f
                  ? 'bg-clay-600 text-white dark:bg-clay-500 dark:text-ink-950'
                  : 'border border-ink-200 text-ink-600 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800'
              }`}
            >
              {f === 'must-know' && <Star className="h-3 w-3" />}
              {f === 'good-to-know' && <BookOpen className="h-3 w-3" />}
              {f === 'all' ? `All (${questions.length})` : f === 'must-know' ? `Must Know (${questions.filter((q) => q.priority === 'must-know').length})` : `Good to Know (${questions.filter((q) => q.priority === 'good-to-know').length})`}
            </button>
          ))}
        </div>

        <button
          onClick={() => setState('in-progress')}
          className="btn-primary w-full"
        >
          Start Quiz ({filtered.length} questions)
        </button>
      </div>
    )
  }

  // Review state
  if (state === 'review') {
    const finalScore = Object.entries(answers).filter(
      ([id, ans]) => questions.find((q) => q.id === id)?.correctIndex === ans
    ).length
    const finalPassed = finalScore / filtered.length >= 0.8

    return (
      <div className="space-y-6 text-center">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            finalPassed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
          }`}
        >
          <Trophy
            className={`h-10 w-10 ${
              finalPassed ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
            }`}
          />
        </div>
        <div>
          <h2 className="text-2xl text-ink-900 dark:text-ink-50">
            {finalPassed ? 'Passed' : 'Not there yet'}
          </h2>
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
            {finalScore} / {filtered.length} correct ({Math.round((finalScore / filtered.length) * 100)}%)
          </p>
          {!finalPassed && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              80% passes. Re-read the topics you missed, then run it again.
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={restart}
            className="btn-secondary flex-1"
          >
            <RotateCcw className="h-4 w-4" /> Retry
          </button>
          <button
            onClick={onClose}
            className="btn-primary flex-1"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  // In-progress state
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="mb-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Question {currentIndex + 1} of {filtered.length}
          </span>
          <span>{Math.round(((currentIndex + 1) / filtered.length) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full rounded-full bg-clay-600 dark:bg-clay-500"
            animate={{ width: `${((currentIndex + 1) / filtered.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-1 flex items-center gap-2">
            {currentQ.priority === 'must-know' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                <Star className="h-3 w-3" /> Must Know
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                <BookOpen className="h-3 w-3" /> Good to Know
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-snug text-ink-900 dark:text-ink-50">
            {currentQ.question}
          </h3>

          <div className="mt-4 space-y-2">
            {currentQ.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = i === currentQ.correctIndex
              let style = 'border-ink-200 hover:border-clay-400 dark:border-ink-700 dark:hover:border-clay-500'
              if (confirmed) {
                if (isCorrect) style = 'border-moss-600 bg-moss-50 dark:border-moss-500 dark:bg-moss-900/25'
                else if (isSelected && !isCorrect)
                  style = 'border-rust-600 bg-rust-50 dark:border-rust-500 dark:bg-rust-900/25'
              } else if (isSelected) {
                style = 'border-clay-600 bg-clay-50 dark:border-clay-500 dark:bg-clay-950/40'
              }

              return (
                <button
                  key={i}
                  onClick={() => !confirmed && setSelected(i)}
                  disabled={confirmed}
                  className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors duration-150 ease-out ${style}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-current text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-gray-900 dark:text-white">{opt}</span>
                  {confirmed && isCorrect && (
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  )}
                  {confirmed && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {confirmed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 overflow-hidden rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-900 dark:bg-teal-950/40"
              >
                <p className="text-sm leading-relaxed text-teal-900 dark:text-teal-100">
                  {currentQ.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div>
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="btn-primary w-full"
          >
            Confirm Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary w-full"
          >
            {currentIndex < filtered.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  )
}
