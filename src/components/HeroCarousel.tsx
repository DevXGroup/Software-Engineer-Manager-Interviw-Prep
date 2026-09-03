'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Layers, Code, Target, CheckSquare } from 'lucide-react'

const slides = [
  {
    icon: Brain,
    title: 'Behavioral Mastery',
    description: '12 full STAR answers with company-specific leadership principles',
    gradient: 'blue-500',
  },
  {
    icon: Layers,
    title: 'System Design',
    description: 'Step-by-step architecture breakdowns for URL shorteners, feeds & more',
    gradient: 'green-500',
  },
  {
    icon: Code,
    title: 'Coding Patterns',
    description: '10 essential DSA patterns with interactive algorithm visualizer',
    gradient: 'orange-500',
  },
  {
    icon: Target,
    title: 'Technical Leadership',
    description: 'Tech debt frameworks, ADR templates, make-vs-buy, on-call best practices',
    gradient: 'purple-500',
  },
  {
    icon: CheckSquare,
    title: 'Knowledge Quizzes',
    description: 'Test your readiness with section quizzes and track your progress',
    gradient: 'cyan-500',
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]
  const Icon = slide.icon

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur dark:bg-gray-800/60">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-5"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${slide.gradient}`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {slide.title}
              </h3>
              <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                {slide.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? 'w-6 bg-purple-600'
                : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
