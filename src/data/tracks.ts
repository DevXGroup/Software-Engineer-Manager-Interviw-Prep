import type { LucideIcon } from 'lucide-react'
import { Brain, Code, Layers, Target, TrendingUp, Users } from 'lucide-react'

export type { TrackId } from '@/data/tracks/ids'
import type { TrackId } from '@/data/tracks/ids'

export interface Track {
  id: TrackId
  name: string
  href: string
  icon: LucideIcon
  description: string
  topics: string[]
  /** Ids of every item the reader can mark covered on that track's page. */
  itemIds: readonly string[]
}

/**
 * Ordered by how often the round decides an EM loop. The home page renders this
 * order and the coverage chart derives its totals from itemIds, so adding an
 * item to a track's data module updates the chart with no other change.
 */
import { trackItemIds } from '@/data/tracks/ids'

export const tracks: readonly Track[] = [
  {
    id: 'behavioral',
    name: 'Behavioral',
    href: '/behavioral',
    icon: Brain,
    description:
      'The round most EM candidates lose. Worked STAR answers, the probes that follow them, and the leadership principles each company scores against.',
    topics: ['Leadership principles', 'STAR format', 'Conflict resolution', 'Team building'],
    itemIds: trackItemIds['behavioral'],
  },
  {
    id: 'system-design',
    name: 'System Design',
    href: '/system-design',
    icon: Layers,
    description: 'Architecture walkthroughs pitched at the manager level, not the L4 level.',
    topics: ['Scalability', 'Microservices', 'Databases', 'Load balancing'],
    itemIds: trackItemIds['system-design'],
  },
  {
    id: 'coding',
    name: 'Coding',
    href: '/coding',
    icon: Code,
    description: 'Ten DSA patterns, a Big-O reference, and an algorithm visualizer.',
    topics: ['Data structures', 'Algorithms', 'Big-O', '10 patterns'],
    itemIds: trackItemIds['coding'],
  },
  {
    id: 'leadership',
    name: 'Technical Leadership',
    href: '/technical-leadership',
    icon: Target,
    description: 'Tech debt, architecture decisions, make versus buy, on-call.',
    topics: ['Tech debt', 'ADR templates', 'Make vs buy', 'On-call'],
    itemIds: trackItemIds['leadership'],
  },
  {
    id: 'team',
    name: 'Team Management',
    href: '/team-management',
    icon: Users,
    description: 'Hiring rubrics, performance conversations, 1:1s, career ladders.',
    topics: ['Hiring rubrics', 'Reviews', '1:1 framework', 'Ladders'],
    itemIds: trackItemIds['team'],
  },
  {
    id: 'ai-interview',
    name: 'AI Interview',
    href: '/ai-interview',
    icon: TrendingUp,
    description: 'LLM systems, agents, evaluation, responsible AI, and AI product strategy.',
    topics: ['RAG', 'Agents', 'Evaluation', 'Responsible AI'],
    itemIds: trackItemIds['ai-interview'],
  },
]

export const trackById = Object.fromEntries(tracks.map((t) => [t.id, t])) as Record<TrackId, Track>
