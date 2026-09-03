'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'

interface ArchitecturePatternProps {
  pattern: {
    name: string
    description: string
    pros: string[]
    cons: string[]
  }
}

export function ArchitecturePattern({ pattern }: ArchitecturePatternProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        {pattern.name}
      </h3>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        {pattern.description}
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Advantages
          </h4>
          <ul className="space-y-2">
            {pattern.pros.map((pro, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                <span className="text-gray-700 dark:text-gray-300">{pro}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-600 dark:text-red-400">
            <XCircle className="h-5 w-5" />
            Considerations
          </h4>
          <ul className="space-y-2">
            {pattern.cons.map((con, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span className="text-gray-700 dark:text-gray-300">{con}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}