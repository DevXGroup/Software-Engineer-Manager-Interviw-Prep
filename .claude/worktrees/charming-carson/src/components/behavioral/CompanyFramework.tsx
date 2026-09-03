'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface CompanyFrameworkProps {
  company: {
    name: string
    principles: string[]
    color: string
  }
}

export function CompanyFramework({ company }: CompanyFrameworkProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        {company.name} Leadership Principles
      </h3>
      
      <div className="grid gap-3 md:grid-cols-2">
        {company.principles.map((principle, index) => (
          <motion.div
            key={principle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <CheckCircle className={`h-5 w-5 flex-shrink-0 text-${company.color.split('-')[1]}-500`} />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {principle}
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Demonstrate how you embody this principle in your leadership approach
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}