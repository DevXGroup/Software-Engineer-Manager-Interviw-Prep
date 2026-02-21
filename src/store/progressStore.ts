import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressState {
  progress: Record<string, number>
  updateProgress: (module: string, completed: number) => void
  resetProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      updateProgress: (module, completed) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [module]: completed,
          },
        })),
      resetProgress: () => set({ progress: {} }),
    }),
    {
      name: 'interview-prep-progress',
    }
  )
)