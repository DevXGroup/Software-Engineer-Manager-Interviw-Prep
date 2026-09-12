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
    <div className="surface-card mb-8 flex flex-wrap items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200">
          <CheckSquare className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-ink-900 dark:text-ink-50">{title} quiz</h3>
          <p className="text-xs text-muted">
            {questions.length} questions, 80% to pass
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {result && (
          <div className="flex items-center gap-2">
            {result.passed ? (
              <span className="chip border-moss-300 bg-moss-50 text-moss-700 dark:border-moss-800 dark:bg-moss-950/40 dark:text-moss-300">
                <Trophy className="h-3.5 w-3.5" />
                Passed {result.score}/{result.total}
              </span>
            ) : (
              <span className="chip border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                {result.score}/{result.total}
              </span>
            )}
            <button
              onClick={() => resetQuizResult(sectionId)}
              aria-label="Reset quiz"
              title="Reset quiz"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-600 transition-colors duration-150 ease-out hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="btn-primary">
              {result ? 'Retake quiz' : 'Start quiz'}
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[50] bg-ink-950/60" />
            <Dialog.Content className="surface-card fixed left-1/2 top-1/2 z-[60] max-h-[85vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-6">
              <Dialog.Title className="sr-only">{title} quiz</Dialog.Title>
              <Dialog.Description className="sr-only">
                {questions.length} questions, 80% to pass
              </Dialog.Description>
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
  )
}
