'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, Trophy } from 'lucide-react'
import { useProgressStore } from '@/store/progressStore'

const modules = [
  { id: 'behavioral', name: 'Behavioral', total: 20 },
  { id: 'system-design', name: 'System Design', total: 15 },
  { id: 'coding', name: 'Coding', total: 30 },
  { id: 'leadership', name: 'Leadership', total: 10 },
  { id: 'team', name: 'Team Management', total: 12 },
  { id: 'ai-interview', name: 'AI Interview', total: 12 },
]

export function ProgressTracker() {
  const { progress, quizResults } = useProgressStore()

  const totalProgress = modules.reduce((acc, module) => {
    const completed = progress[module.id] || 0
    return acc + (completed / module.total) * 100
  }, 0) / modules.length

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        Your Progress
      </h3>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Overall Progress</span>
          <span>{Math.round(totalProgress)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
          />
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((module) => {
          const completed = progress[module.id] || 0
          const percentage = (completed / module.total) * 100
          const quizResult = quizResults[module.id]

          return (
            <div key={module.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {percentage === 100 ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {module.name}
                </span>
                {quizResult && (
                  quizResult.passed ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Trophy className="h-3 w-3" /> PASSED
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      {quizResult.score}/{quizResult.total}
                    </span>
                  )
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {completed}/{module.total}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
