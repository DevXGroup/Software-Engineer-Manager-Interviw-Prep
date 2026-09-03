'use client'

import Link from 'next/link'
import {
  Brain,
  Code,
  Users,
  Layers,
  Target,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { ProgressTracker } from '@/components/ProgressTracker'
import { TrackRow } from '@/components/TrackRow'

const leadTrack = {
  title: 'Behavioral Interview',
  description:
    'The round most EM candidates lose. Twelve worked STAR answers, plus the leadership principles each company actually scores against.',
  icon: Brain,
  href: '/behavioral',
  topics: ['Leadership principles', 'STAR format', 'Conflict resolution', 'Team building'],
}

const tracks = [
  {
    title: 'System Design',
    description: 'Architecture walkthroughs pitched at the manager level, not the L4 level.',
    icon: Layers,
    href: '/system-design',
    topics: ['Scalability', 'Microservices', 'Databases', 'Load balancing'],
  },
  {
    title: 'Coding Practice',
    description: 'Ten DSA patterns, a Big-O reference, and an algorithm visualizer.',
    icon: Code,
    href: '/coding',
    topics: ['Data structures', 'Algorithms', 'Big-O', '10 patterns'],
  },
  {
    title: 'Technical Leadership',
    description: 'Tech debt, architecture decisions, make versus buy, on-call.',
    icon: Target,
    href: '/technical-leadership',
    topics: ['Tech debt', 'ADR templates', 'Make vs buy', 'On-call'],
  },
  {
    title: 'Team Management',
    description: 'Hiring rubrics, performance conversations, 1:1s, career ladders.',
    icon: Users,
    href: '/team-management',
    topics: ['Hiring rubrics', 'Reviews', '1:1 framework', 'Ladders'],
  },
  {
    title: 'AI Interview Prep',
    description: 'LLM systems, evaluation, responsible AI, and AI product strategy.',
    icon: TrendingUp,
    href: '/ai-interview',
    topics: ['RAG', 'Responsible AI', 'AI metrics', 'LLM architecture'],
  },
]

const companies = [
  { name: 'Meta', slug: 'meta', rounds: '4 to 5 rounds' },
  { name: 'Amazon', slug: 'amazon', rounds: '6 to 7 rounds' },
  { name: 'Apple', slug: 'apple', rounds: '5 rounds' },
  { name: 'Netflix', slug: 'netflix', rounds: '5 rounds' },
  { name: 'Google', slug: 'google', rounds: '6 to 7 rounds' },
  { name: 'Microsoft', slug: 'microsoft', rounds: '5 to 6 rounds' },
]

export default function HomePage() {
  return (
    <div className="pb-24">
      {/* What this is */}
      <section className="page-shell pb-14 pt-14 sm:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl leading-[1.05] text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-6xl">
            Engineering Manager
            <br />
            interview prep, <em className="font-normal italic text-clay-700 dark:text-clay-400">in order</em>.
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-700 dark:text-ink-200">
            Six tracks, an eight-week plan, and per-company breakdowns for Meta, Amazon,
            Apple, Netflix, Google and Microsoft. Free, open source, and nothing to sign up for.
            Your progress is stored in this browser.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/roadmap" className="btn-primary">
              Open the 8-week plan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/behavioral" className="btn-secondary">
              Jump into behavioral
            </Link>
          </div>
        </div>
      </section>

      <div className="page-shell">
        <div className="rule" />
      </div>

      {/* Where you are */}
      <section className="page-shell py-14">
        <ProgressTracker />
      </section>

      <div className="page-shell">
        <div className="rule" />
      </div>

      {/* Where to go */}
      <section className="page-shell py-14">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl">The tracks</h2>
          <p className="text-sm text-ink-600 dark:text-ink-300">Ordered by how often it decides the loop</p>
        </div>

        <TrackRow {...leadTrack} lead />

        <ul className="mt-3 space-y-3">
          {tracks.map((track) => (
            <li key={track.href}>
              <TrackRow {...track} />
            </li>
          ))}
        </ul>
      </section>

      <div className="page-shell">
        <div className="rule" />
      </div>

      {/* Company specifics */}
      <section className="page-shell py-14">
        <h2 className="text-2xl">By company</h2>
        <p className="mt-2 max-w-prose text-ink-700 dark:text-ink-200">
          Loop structure, the questions that recur, what each bar actually rewards, and comp bands.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <li key={company.slug}>
              <Link
                href={`/companies/${company.slug}`}
                className="surface-card card-hover flex min-h-[44px] flex-col items-center gap-2 p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${company.slug}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-sm font-semibold text-ink-900 dark:text-ink-50">{company.name}</span>
                <span className="text-xs text-ink-600 dark:text-ink-300">{company.rounds}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
