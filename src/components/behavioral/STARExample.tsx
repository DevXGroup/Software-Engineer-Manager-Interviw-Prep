'use client'

import { motion } from 'framer-motion'

interface STARExampleProps {
  example: {
    situation: string
    task: string
    action: string
    result: string
  }
}

export function STARExample({ example }: STARExampleProps) {
  const sections = [
    { label: 'Situation', content: example.situation, color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300' },
    { label: 'Task', content: example.task, color: 'bg-green-50 dark:bg-green-900/20 border-green-300' },
    { label: 'Action', content: example.action, color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300' },
    { label: 'Result', content: example.result, color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300' },
  ]
  
  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-lg border-l-4 p-4 ${section.color}`}
        >
          <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
            {section.label}
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            {section.content}
          </p>
        </motion.div>
      ))}
    </div>
  )
}