'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain, 
  Code, 
  Users, 
  Layers, 
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { ProgressTracker } from '@/components/ProgressTracker'
import { InteractiveCard } from '@/components/InteractiveCard'
import { HeroCarousel } from '@/components/HeroCarousel'

const sections = [
  {
    title: 'Behavioral Interview',
    description: 'Master STAR format and company-specific leadership principles',
    icon: Brain,
    href: '/behavioral',
    color: 'from-blue-500 to-purple-600',
    topics: ['Leadership Principles', 'STAR Format', 'Conflict Resolution', 'Team Building']
  },
  {
    title: 'System Design',
    description: 'Architecture patterns and distributed systems for managers',
    icon: Layers,
    href: '/system-design',
    color: 'from-green-500 to-teal-600',
    topics: ['Scalability', 'Microservices', 'Databases', 'Load Balancing']
  },
  {
    title: 'Coding Practice',
    description: 'Interactive algorithm visualizer and DSA pattern library',
    icon: Code,
    href: '/coding',
    color: 'from-orange-500 to-red-600',
    topics: ['Data Structures', 'Algorithms', 'Big O Reference', '10 Essential Patterns']
  },
  {
    title: 'Technical Leadership',
    description: 'Architecture decisions, tech debt, and engineering culture',
    icon: Target,
    href: '/technical-leadership',
    color: 'from-purple-500 to-pink-600',
    topics: ['Tech Debt Framework', 'ADR Templates', 'Make vs Buy', 'On-Call']
  },
  {
    title: 'Team Management',
    description: 'Hiring, performance reviews, 1:1s, and team growth',
    icon: Users,
    href: '/team-management',
    color: 'from-cyan-500 to-blue-600',
    topics: ['Hiring Rubrics', 'Performance Reviews', '1:1 Framework', 'Career Ladders']
  },
  {
    title: 'AI Interview Prep',
    description: 'LLM systems, responsible AI, and AI product strategy',
    icon: TrendingUp,
    href: '/ai-interview',
    color: 'from-violet-500 to-indigo-600',
    topics: ['RAG Systems', 'Responsible AI', 'AI Metrics', 'LLM Architecture']
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-purple-500" />
            Free &amp; Open Source — No sign-up required
          </motion.div>

          {/* Title */}
          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              Engineering Manager
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Interview Mastery</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
            Everything you need to land your EM role at{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-200">Meta, Amazon, Apple, Netflix &amp; Google</span>
            {' '}— behavioral, system design, coding &amp; leadership.
          </p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mb-10 flex flex-wrap justify-center gap-3 text-sm font-medium"
          >
            {[
              { label: '6 Companies', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
              { label: '24+ Behavioral Q&As', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
              { label: '10 DSA Patterns', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' },
              { label: '8-Week Roadmap', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
            ].map(({ label, color }) => (
              <span key={label} className={`rounded-full px-4 py-1.5 ${color}`}>
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/behavioral">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-shadow"
              >
                <CheckCircle className="h-5 w-5" />
                Start Preparing
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>

            <Link href="/roadmap">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-xl border-2 border-gray-200 bg-white/80 px-8 py-4 text-base font-semibold text-gray-700 shadow-md backdrop-blur hover:border-gray-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:border-gray-600"
              >
                View 8-Week Roadmap
              </motion.button>
            </Link>
          </div>

          <HeroCarousel />
        </motion.div>

        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-16 top-10 h-80 w-80 animate-pulse rounded-full bg-purple-300 opacity-50 mix-blend-multiply blur-3xl dark:opacity-20" />
          <div className="absolute -right-16 top-32 h-80 w-80 animate-pulse rounded-full bg-blue-300 opacity-50 mix-blend-multiply blur-3xl dark:opacity-20" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 animate-pulse rounded-full bg-violet-300 opacity-40 mix-blend-multiply blur-3xl dark:opacity-15" />
        </div>
      </section>
      
      {/* Progress Tracker */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ProgressTracker />
        </div>
      </section>
      
      {/* Main Sections Grid */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white"
          >
            Choose Your Learning Path
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <InteractiveCard
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  href={section.href}
                  gradient={section.color}
                  topics={section.topics}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company Specific Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Company-Specific Preparation
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Deep-dives on interview process, top questions, tips & comp bands
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Meta', slug: 'meta', rounds: '4–5 rounds' },
              { name: 'Amazon', slug: 'amazon', rounds: '6–7 rounds' },
              { name: 'Apple', slug: 'apple', rounds: '5 rounds' },
              { name: 'Netflix', slug: 'netflix', rounds: '5 rounds' },
              { name: 'Google', slug: 'google', rounds: '6–7 rounds' },
              { name: 'Microsoft', slug: 'microsoft', rounds: '5–6 rounds' },
            ].map((company, index) => (
              <Link key={company.slug} href={`/companies/${company.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-md transition-shadow hover:shadow-xl dark:bg-gray-800"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-700">
                    <img
                      src={`/logos/${company.slug}.svg`}
                      alt={`${company.name} logo`}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{company.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{company.rounds}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}