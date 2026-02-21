'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Code, Target, Clock, AlertTriangle, CheckCircle, MessageSquare, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    icon: Target,
    title: 'Why FAANG Asks SDMs to Code',
    color: 'from-purple-500 to-blue-600',
    content: [
      {
        heading: 'Technical credibility, not IC replication',
        body: 'FAANG doesn\'t expect you to code like a senior SWE. They want to see that you can think algorithmically, understand trade-offs, and communicate technical decisions — skills that are directly correlated with being a great engineering manager.',
      },
      {
        heading: 'What they\'re actually testing',
        body: 'Problem decomposition (can you break it down clearly?), pattern recognition (do you know the right data structure?), communication under pressure (can you think out loud?), and intellectual honesty (do you know when you\'re stuck and how to recover?).',
      },
    ],
  },
  {
    icon: BarChart3,
    title: 'What Level of Coding Is Expected',
    color: 'from-green-500 to-teal-600',
    content: [
      {
        heading: 'The realistic bar',
        body: 'Most FAANG companies expect SDMs at L5-L6 to solve LeetCode Easy problems cleanly and LeetCode Medium problems with some guidance. L7+ (Senior EM, Director) may face fewer coding rounds or skip them at some companies like Netflix and Apple.',
      },
      {
        heading: 'By company',
        body: 'Amazon: 1 coding round, LC Easy-Medium in any language. Google: 1-2 rounds, similar to SWE but at a lower bar. Meta: typically 1 round, problem-solving and clarity valued. Netflix: often no coding round (culture and people management focused). Apple: varies by team, usually 1 round.',
      },
    ],
  },
  {
    icon: Clock,
    title: 'Interview Format (45 Minutes)',
    color: 'from-orange-500 to-red-600',
    content: [
      {
        heading: 'The typical 45-minute breakdown',
        body: '~5 min: Clarify the problem. Ask about constraints, edge cases, expected input size, data types. ~5 min: Talk through your approach before writing code. ~25 min: Implement the solution, narrating your thinking. ~5 min: Test with examples and edge cases. ~5 min: Discuss time/space complexity and potential optimizations.',
      },
      {
        heading: 'What to say when you don\'t know',
        body: '"Let me think through this out loud. I know I want to avoid a brute force O(n²) approach. The first thing I\'d consider is whether a hash map can give me O(1) lookups here..." — articulating your reasoning IS the answer.',
      },
    ],
  },
  {
    icon: Code,
    title: 'Top 5 SDM-Specific Patterns',
    color: 'from-blue-500 to-indigo-600',
    content: [
      {
        heading: '1. HashMap/Set — O(1) lookup everywhere',
        body: 'Two Sum, Longest Consecutive Sequence, Group Anagrams. Rule: whenever you find yourself scanning an array looking for something, ask "could a HashMap give me O(1) here?"',
      },
      {
        heading: '2. Sliding Window — contiguous subarrays',
        body: 'Longest Substring Without Repeating Characters, Min Window Substring. Two pointers expanding and contracting over a window of data.',
      },
      {
        heading: '3. BFS — shortest path, level-by-level',
        body: 'Number of Islands, Word Ladder, Rotting Oranges. Any "spread from a source" or "find shortest path" problem.',
      },
      {
        heading: '4. Two Pointers — sorted arrays, pairs',
        body: '3Sum, Container With Most Water, Trapping Rain Water. Sort first, then use left/right pointers moving toward each other.',
      },
      {
        heading: '5. DP — count ways, min/max, with repeated subproblems',
        body: 'Climbing Stairs, Coin Change, House Robber. Recognize when a problem has overlapping subproblems and optimal substructure.',
      },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Language to Use When Stuck',
    color: 'from-pink-500 to-red-600',
    content: [
      {
        heading: 'Recovering when you\'re stuck',
        body: '"I\'m going to step back. Let me think about what I know works... I know I can solve this in O(n²) brute force. Let me think about what structure would eliminate the nested loop... Is this a case where I\'d benefit from sorting first?" — show your reasoning process even when the answer isn\'t clear.',
      },
      {
        heading: 'Asking for a hint without looking bad',
        body: '"I want to make sure I\'m on the right track — I\'m thinking about using a heap/sliding window/BFS here. Does that seem like the right direction to you?" — interviewers WANT to give hints. Asking shows collaboration, not weakness.',
      },
      {
        heading: 'Before writing any code',
        body: '"Before I start coding, let me make sure I understand the constraints: can the input be empty? Can there be negative numbers? Is this sorted? I want to validate my assumptions before committing to an implementation."',
      },
    ],
  },
  {
    icon: CheckCircle,
    title: 'SDM Evaluation Rubric',
    color: 'from-emerald-500 to-teal-600',
    content: [
      {
        heading: 'Problem Understanding (20%)',
        body: 'Did you clarify ambiguities? Did you ask about edge cases? Did you confirm the input/output contract before coding? Interviewers value candidates who don\'t assume.',
      },
      {
        heading: 'Approach & Communication (30%)',
        body: 'Did you articulate your approach before coding? Did you explain trade-offs (why this data structure, not that one)? Could the interviewer follow your reasoning? Communication is weighted MORE for SDMs than for SWEs.',
      },
      {
        heading: 'Correctness (30%)',
        body: 'Does the solution handle the basic case? The edge cases? Is it syntactically correct (or close)? For SDMs, pseudocode-level correctness is often acceptable — it\'s not a typing test.',
      },
      {
        heading: 'Complexity Analysis (20%)',
        body: 'Can you state the time and space complexity of your solution? Can you explain WHY? Can you identify if there\'s an optimization available? This is a basic bar — you must be able to do this.',
      },
    ],
  },
]

export default function SDMGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link href="/coding" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
            <ArrowLeft className="h-4 w-4" /> Back to Coding Practice
          </Link>
          <div className="text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">SDM Coding Interview Guide</h1>
            <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-300">
              What to expect, how to prepare, and exactly what to say when you get stuck
            </p>
          </div>
        </motion.div>

        {/* Quick stat banner */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Typical Rounds', value: '1-2', note: 'vs 4-6 for SWEs' },
            { label: 'Difficulty Bar', value: 'Easy-Med', note: 'Not Hard LeetCode' },
            { label: 'Time per Round', value: '45 min', note: 'Clarify, design, code, test' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white p-5 text-center shadow dark:bg-gray-800">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</p>
              <p className="text-xs text-gray-400">{s.note}</p>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <motion.div key={section.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
                <div className={`flex items-center gap-3 bg-gradient-to-r ${section.color} p-5 text-white`}>
                  <Icon className="h-6 w-6" />
                  <h2 className="text-lg font-bold">{section.title}</h2>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {section.content.map((item, i) => (
                    <div key={i} className="p-5">
                      <p className="mb-2 font-semibold text-gray-900 dark:text-white">{item.heading}</p>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/coding/challenges">
            <div className="cursor-pointer rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white shadow-xl hover:opacity-90">
              <Code className="mb-3 h-8 w-8" />
              <h3 className="text-lg font-bold">Practice Coding Challenges</h3>
              <p className="mt-1 text-orange-100 text-sm">16 curated problems with full TypeScript solutions</p>
            </div>
          </Link>
          <Link href="/coding">
            <div className="cursor-pointer rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-xl hover:opacity-90">
              <AlertTriangle className="mb-3 h-8 w-8" />
              <h3 className="text-lg font-bold">DSA Patterns Library</h3>
              <p className="mt-1 text-blue-100 text-sm">10 essential patterns with code templates</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
