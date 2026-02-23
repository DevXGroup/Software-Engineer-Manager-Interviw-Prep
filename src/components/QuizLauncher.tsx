'use client'

import { useState } from 'react'
import { CheckSquare, Trophy, RotateCcw } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useProgressStore } from '@/store/progressStore'
import { Quiz } from '@/components/Quiz'
import type { QuizQuestion } from '@/data/quizzes/types'

export function QuizLauncher({
  sectionId,
  title,
  questions,
}: {
  sectionId: string
  title: string
  questions: QuizQuestion[]
}) {
  const [open, setOpen] = useState(false)
  const { quizResults, resetQuizResult } = useProgressStore()
  const result = quizResults[sectionId]

  return (
    <div className="mb-8 rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{title} Quiz</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {questions.length} questions &middot; 80% to pass
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {result && (
            <div className="flex items-center gap-2">
              {result.passed ? (
                <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <Trophy className="h-3.5 w-3.5" />
                  PASSED {result.score}/{result.total}
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {result.score}/{result.total}
                </span>
              )}
              <button
                onClick={() => resetQuizResult(sectionId)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Reset quiz"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
                {result ? 'Retake Quiz' : 'Start Quiz'}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                <Quiz
                  sectionId={sectionId}
                  title={title}
                  questions={questions}
                  onClose={() => setOpen(false)}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  )
}
