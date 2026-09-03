'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface InteractiveCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  gradient: string
  topics: string[]
}

export function InteractiveCard({
  title,
  description,
  icon: Icon,
  href,
  gradient,
  topics
}: InteractiveCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative h-full overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl dark:bg-gray-800"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-10`}></div>
        
        <div className="relative z-10">
          <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${gradient} p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
            Start Learning
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}