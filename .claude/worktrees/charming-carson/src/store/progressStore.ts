import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuizResult } from '@/data/quizzes/types'

interface ProgressState {
  progress: Record<string, number>
  quizResults: Record<string, QuizResult>
  updateProgress: (module: string, completed: number) => void
  resetProgress: () => void
  submitQuizResult: (sectionId: string, result: QuizResult) => void
  resetQuizResult: (sectionId: string) => void
  resetAllQuizzes: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      quizResults: {},
      updateProgress: (module, completed) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [module]: completed,
          },
        })),
      resetProgress: () => set({ progress: {} }),
      submitQuizResult: (sectionId, result) =>
        set((state) => ({
          quizResults: {
            ...state.quizResults,
            [sectionId]: result,
          },
        })),
      resetQuizResult: (sectionId) =>
        set((state) => {
          const { [sectionId]: _, ...rest } = state.quizResults
          return { quizResults: rest }
        }),
      resetAllQuizzes: () => set({ quizResults: {} }),
    }),
    {
      name: 'interview-prep-progress',
    }
  )
)
