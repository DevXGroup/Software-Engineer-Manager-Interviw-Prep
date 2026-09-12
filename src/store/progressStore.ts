import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuizResult } from '@/data/quizzes/types'
import type { TrackId } from '@/data/tracks'

interface ProgressState {
  /** Item ids the reader has marked as covered, per track. */
  covered: Record<string, string[]>
  quizResults: Record<string, QuizResult>
  toggleCovered: (track: TrackId, itemId: string) => void
  resetCovered: (track?: TrackId) => void
  submitQuizResult: (sectionId: string, result: QuizResult) => void
  resetQuizResult: (sectionId: string) => void
  resetAllQuizzes: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      covered: {},
      quizResults: {},
      toggleCovered: (track, itemId) =>
        set((state) => {
          const current = state.covered[track] ?? []
          const next = current.includes(itemId)
            ? current.filter((id) => id !== itemId)
            : [...current, itemId]
          return { covered: { ...state.covered, [track]: next } }
        }),
      resetCovered: (track) =>
        set((state) => {
          if (!track) return { covered: {} }
          const { [track]: _, ...rest } = state.covered
          return { covered: rest }
        }),
      submitQuizResult: (sectionId, result) =>
        set((state) => ({ quizResults: { ...state.quizResults, [sectionId]: result } })),
      resetQuizResult: (sectionId) =>
        set((state) => {
          const { [sectionId]: _, ...rest } = state.quizResults
          return { quizResults: rest }
        }),
      resetAllQuizzes: () => set({ quizResults: {} }),
    }),
    {
      name: 'interview-prep-progress',
      version: 2,
      // v1 stored a dead `progress` counter that nothing wrote; drop it.
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<ProgressState> & { progress?: unknown }
        return { covered: state.covered ?? {}, quizResults: state.quizResults ?? {} } as ProgressState
      },
    }
  )
)

/** Whether one item is covered. Stable selector so lists do not re-render on unrelated toggles. */
export function useIsCovered(track: TrackId, itemId: string): boolean {
  return useProgressStore((s) => (s.covered[track] ?? []).includes(itemId))
}

/** Covered count for a track, clamped to the ids that still exist in the data. */
export function useCoveredCount(track: TrackId, validIds: readonly string[]): number {
  return useProgressStore((s) => (s.covered[track] ?? []).filter((id) => validIds.includes(id)).length)
}
