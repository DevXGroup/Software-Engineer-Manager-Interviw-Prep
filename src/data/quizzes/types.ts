export type Priority = 'must-know' | 'good-to-know'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  priority: Priority
}

export interface QuizConfig {
  sectionId: string
  title: string
  questions: QuizQuestion[]
}

export interface QuizResult {
  score: number
  total: number
  passed: boolean
  answers: Record<string, number>
  completedAt: string
}
