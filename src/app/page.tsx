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
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl text-center"
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FAANG Interview Prep
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Complete preparation guide for Engineering Manager interviews at top tech companies
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/behavioral">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-white shadow-lg hover:shadow-xl"
              >
                <CheckCircle className="h-5 w-5" />
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            
            <Link href="/roadmap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-gray-700 shadow-lg hover:shadow-xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              >
                View Roadmap
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-4 top-20 h-72 w-72 animate-pulse-slow rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter dark:opacity-30"></div>
          <div className="absolute -right-4 top-40 h-72 w-72 animate-pulse-slow rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter dark:opacity-30"></div>
          <div className="absolute -bottom-8 left-20 h-72 w-72 animate-pulse-slow rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter dark:opacity-30"></div>
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
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Company-Specific Preparation
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Meta', 'Amazon', 'Apple', 'Netflix', 'Google'].map((company) => (
              <Link key={company} href={`/companies/${company.toLowerCase()}`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-24 w-24 items-center justify-center rounded-xl bg-white shadow-lg dark:bg-gray-800"
                >
                  <span className="text-lg font-bold">{company[0]}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}