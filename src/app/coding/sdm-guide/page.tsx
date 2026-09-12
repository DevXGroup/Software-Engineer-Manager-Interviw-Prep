'use client'

import { ArrowLeft, Code, Target, Clock, AlertTriangle, CheckCircle, MessageSquare, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    icon: Target,
    title: 'Why FAANG asks SDMs to code',
    content: [
      {
        heading: 'Technical credibility, not IC replication',
        body: 'FAANG does not expect you to code like a senior SWE. They want to see that you can think algorithmically, understand trade-offs, and communicate technical decisions: skills directly correlated with being a great engineering manager.',
      },
      {
        heading: 'What they are actually testing',
        body: 'Problem decomposition (can you break it down clearly?), pattern recognition (do you know the right data structure?), communication under pressure (can you think out loud?), and intellectual honesty (do you know when you are stuck and how to recover?).',
      },
    ],
  },
  {
    icon: BarChart3,
    title: 'What level of coding is expected',
    content: [
      {
        heading: 'The realistic bar',
        body: 'Manager coding rounds generally sit below the bar for an individual-contributor engineer at the same level: clean solutions to easier problems, and a reasonable attempt at a medium one with some hinting. The more senior the manager role, the fewer coding rounds you tend to see, and some senior manager and director loops have none at all. No company publishes its rubric, so confirm your own loop with your recruiter.',
      },
      {
        heading: 'By company',
        body: 'The number of coding rounds in a manager loop varies by company, by org and by team, and none of these companies publishes it. Assume you will have at least one unless your recruiter tells you otherwise, ask them directly how many rounds and what language is allowed, and prepare as though the answer is one round of problem solving where your clarity matters as much as the solution.',
      },
    ],
  },
  {
    icon: Clock,
    title: 'Interview format (45 minutes)',
    content: [
      {
        heading: 'The typical 45-minute breakdown',
        body: 'About 5 minutes: clarify the problem, constraints, edge cases, expected input size, data types. About 5 minutes: talk through your approach before writing code. About 25 minutes: implement the solution, narrating your thinking. About 5 minutes: test with examples and edge cases. About 5 minutes: discuss time and space complexity and potential optimizations.',
      },
      {
        heading: 'What to say when you do not know',
        body: '"Let me think through this out loud. I know I want to avoid a brute force O(n²) approach. The first thing I would consider is whether a hash map can give me O(1) lookups here." Articulating your reasoning is the answer.',
      },
    ],
  },
  {
    icon: Code,
    title: 'Top 5 SDM-specific patterns',
    content: [
      {
        heading: 'HashMap / Set: O(1) lookup everywhere',
        body: 'Two Sum, Longest Consecutive Sequence, Group Anagrams. Rule: whenever you find yourself scanning an array looking for something, ask whether a hash map could give you O(1) here.',
      },
      {
        heading: 'Sliding Window: contiguous subarrays',
        body: 'Longest Substring Without Repeating Characters, Minimum Window Substring. Two pointers expanding and contracting over a window of data.',
      },
      {
        heading: 'BFS: shortest path, level by level',
        body: 'Number of Islands, Word Ladder, Rotting Oranges. Any "spread from a source" or "find shortest path" problem.',
      },
      {
        heading: 'Two Pointers: sorted arrays, pairs',
        body: '3Sum, Container With Most Water, Trapping Rain Water. Sort first, then use left and right pointers moving toward each other.',
      },
      {
        heading: 'DP: count ways, min/max, with repeated subproblems',
        body: 'Climbing Stairs, Coin Change, House Robber. Recognize when a problem has overlapping subproblems and optimal substructure.',
      },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Language to use when stuck',
    content: [
      {
        heading: 'Recovering when you are stuck',
        body: '"I am going to step back. Let me think about what I know works. I know I can solve this in O(n²) brute force. What structure would eliminate the nested loop? Is this a case where I would benefit from sorting first?" Show your reasoning process even when the answer is not clear.',
      },
      {
        heading: 'Asking for a hint without looking bad',
        body: '"I want to make sure I am on the right track. I am thinking about using a heap, sliding window, or BFS here. Does that seem like the right direction to you?" Interviewers want to give hints. Asking shows collaboration, not weakness.',
      },
      {
        heading: 'Before writing any code',
        body: '"Before I start coding, let me make sure I understand the constraints: can the input be empty? Can there be negative numbers? Is this sorted? I want to validate my assumptions before committing to an implementation."',
      },
    ],
  },
  {
    icon: CheckCircle,
    title: 'SDM evaluation rubric',
    content: [
      {
        heading: 'Problem understanding (20%)',
        body: 'Did you clarify ambiguities? Did you ask about edge cases? Did you confirm the input and output contract before coding? Interviewers value candidates who do not assume.',
      },
      {
        heading: 'Approach and communication (30%)',
        body: 'Did you articulate your approach before coding? Did you explain trade-offs, why this data structure and not that one? Could the interviewer follow your reasoning? Communication is weighted more for SDMs than for SWEs.',
      },
      {
        heading: 'Correctness (30%)',
        body: 'Does the solution handle the basic case? The edge cases? Is it syntactically correct, or close? For SDMs, pseudocode-level correctness is often acceptable: it is not a typing test.',
      },
      {
        heading: 'Complexity analysis (20%)',
        body: 'Can you state the time and space complexity of your solution? Can you explain why? Can you identify an available optimization? This is a basic bar you must be able to clear.',
      },
    ],
  },
]

export default function SDMGuidePage() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <Link href="/coding" className="mb-6 -ml-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-ink-600 transition-colors duration-150 ease-out hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50">
            <ArrowLeft className="h-4 w-4" /> Back to coding practice
          </Link>
          <div className="text-center">
            <h1 className="text-4xl text-ink-900 dark:text-ink-50">SDM coding interview guide</h1>
            <p className="mx-auto max-w-xl text-lg text-ink-700 dark:text-ink-200">
              What to expect, how to prepare, and exactly what to say when you get stuck.
            </p>
          </div>
        </div>

        {/* Quick stat banner */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Typical rounds', value: '1-2', note: 'vs 4-6 for SWEs' },
            { label: 'Difficulty bar', value: 'Easy-Med', note: 'Not hard LeetCode' },
            { label: 'Time per round', value: '45 min', note: 'Clarify, design, code, test' },
          ].map(s => (
            <div key={s.label} className="surface-card p-5 text-center">
              <p className="text-2xl font-semibold text-ink-900 dark:text-ink-50">{s.value}</p>
              <p className="text-sm font-medium text-ink-700 dark:text-ink-200">{s.label}</p>
              <p className="text-xs text-ink-600 dark:text-ink-300">{s.note}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="surface-card overflow-hidden">
                <div className="flex items-center gap-3 border-b border-ink-200 p-5 dark:border-ink-800">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{section.title}</h2>
                </div>
                <div className="divide-y divide-ink-100 dark:divide-ink-800">
                  {section.content.map((item, i) => (
                    <div key={i} className="p-5">
                      <p className="mb-2 font-semibold text-ink-900 dark:text-ink-50">{item.heading}</p>
                      <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link href="/coding/challenges" className="surface-card card-hover flex flex-col p-6">
            <Code className="mb-3 h-8 w-8 text-clay-700 dark:text-clay-400" />
            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">Practice coding challenges</h3>
            <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">16 curated problems with full TypeScript solutions.</p>
          </Link>
          <Link href="/coding" className="surface-card card-hover flex flex-col p-6">
            <AlertTriangle className="mb-3 h-8 w-8 text-clay-700 dark:text-clay-400" />
            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">DSA patterns library</h3>
            <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">10 essential patterns with code templates.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
