import type { LucideIcon } from 'lucide-react'
import { Brain, Code, Layers, Target, TrendingUp, Calendar } from 'lucide-react'

export type Task = { id: string; label: string; link?: string }

export type WeekPlan = {
  id: string
  week: number
  title: string
  theme: string
  icon: LucideIcon
  goal: string
  dailyTasks: Task[]
  resources: string[]
  milestone: string
}

export const roadmapIcon: LucideIcon = Calendar

export const weeks: WeekPlan[] = [
  {
    id: 'behavioral-foundations',
    week: 1,
    title: 'Behavioral foundations',
    theme: 'STAR method and company principles',
    icon: Brain,
    goal: "Master the STAR format and understand Amazon's 16 LPs inside out",
    dailyTasks: [
      { id: 'study-star-format', label: 'Study the STAR format: write your 3 strongest stories', link: '/behavioral' },
      { id: 'learn-amazon-lps', label: 'Learn all 16 Amazon Leadership Principles with examples', link: '/behavioral' },
      { id: 'map-lp-to-story', label: 'Map each LP to a story from your career' },
      { id: 'record-two-answers', label: 'Record yourself answering 2 questions: review pacing and fillers' },
      { id: 'practice-failure-question', label: 'Practice: "Tell me about a time you failed"' },
    ],
    resources: ['Amazon LP page', 'STAR format guide', 'Behavioral page in this app'],
    milestone: 'Deliver 3 polished STAR answers without reading from notes',
  },
  {
    id: 'company-deep-dives',
    week: 2,
    title: 'Company deep dives',
    theme: 'Meta, Google, Netflix, Apple, Microsoft',
    icon: Target,
    goal: "Know each company's unique values, interview style, and top questions",
    dailyTasks: [
      { id: 'study-meta', label: 'Study Meta: move fast, long-term impact, be direct', link: '/companies/meta' },
      { id: 'study-google', label: 'Study Google: data-driven, think 10x, psychological safety', link: '/companies/google' },
      { id: 'study-netflix', label: 'Study Netflix: freedom and responsibility, courage, context', link: '/companies/netflix' },
      { id: 'study-apple', label: 'Study Apple: taste, craft, deep collaboration', link: '/companies/apple' },
      { id: 'study-microsoft', label: 'Study Microsoft: growth mindset, One Microsoft', link: '/companies/microsoft' },
    ],
    resources: ['Company pages in this app', 'Glassdoor interview reviews', 'LinkedIn jobs for target roles'],
    milestone: 'Company-specific story for each of your 3 target companies',
  },
  {
    id: 'system-design-basics',
    week: 3,
    title: 'System design basics',
    theme: 'Scalability fundamentals',
    icon: Layers,
    goal: 'Understand horizontal scaling, databases, caching, and load balancing',
    dailyTasks: [
      { id: 'study-cap-theorem', label: 'Study the CAP theorem and the SQL vs NoSQL decision framework', link: '/system-design' },
      { id: 'study-caching-strategies', label: 'Study caching strategies: cache-aside, write-through, TTL', link: '/system-design' },
      { id: 'study-consistent-hashing', label: 'Study consistent hashing and database sharding', link: '/system-design' },
      { id: 'design-url-shortener', label: 'Design a URL shortener end to end (35 min timed)', link: '/system-design' },
      { id: 'study-kafka-vs-sqs', label: 'Study Kafka vs SQS: when to use each', link: '/system-design' },
    ],
    resources: ['System Design page in this app', 'Designing Data-Intensive Applications (Kleppmann)', 'ByteByteGo System Design Newsletter'],
    milestone: 'Whiteboard a URL shortener design from memory in 35 minutes',
  },
  {
    id: 'system-design-advanced',
    week: 4,
    title: 'System design advanced',
    theme: 'Distributed systems at FAANG scale',
    icon: Layers,
    goal: 'Design complex systems: Twitter feed, notification system, rate limiter',
    dailyTasks: [
      { id: 'design-twitter-feed', label: 'Design a Twitter feed: fan-out on write vs read hybrid', link: '/system-design' },
      { id: 'design-rate-limiter', label: 'Design a rate limiter: token bucket, Redis, fail open', link: '/system-design' },
      { id: 'design-notification-system', label: 'Design a notification system: Kafka and channel workers', link: '/system-design' },
      { id: 'study-microservices-patterns', label: 'Study microservices, CQRS, saga, and circuit breaker patterns', link: '/system-design' },
      { id: 'mock-unseen-system', label: "Mock: design a system you haven't seen before (30 min)" },
    ],
    resources: ['System Design Primer (GitHub)', 'Netflix Tech Blog', 'AWS Architecture Center'],
    milestone: 'Complete any system design in 45 minutes: requirements, architecture, tradeoffs',
  },
  {
    id: 'coding-patterns',
    week: 5,
    title: 'Coding patterns',
    theme: 'TypeScript DSA core patterns',
    icon: Code,
    goal: 'Internalize sliding window, two pointers, binary search, BFS/DFS',
    dailyTasks: [
      { id: 'sliding-window-problems', label: 'Sliding window: solve 3 problems (LC #3, #76, #239)', link: '/coding/challenges' },
      { id: 'two-pointers-problems', label: 'Two pointers: solve 3 problems (LC #11, #15, #42)', link: '/coding/challenges' },
      { id: 'binary-search-problems', label: 'Binary search: solve 2 problems (LC #33, #153)', link: '/coding' },
      { id: 'bfs-dfs-problems', label: 'BFS/DFS: solve 2 problems (LC #200, #127)', link: '/coding/challenges' },
      { id: 'review-big-o', label: 'Review Big O for each pattern solved', link: '/coding' },
    ],
    resources: ['LeetCode (Easy/Medium)', 'Coding Challenges page in this app', 'NeetCode.io roadmap'],
    milestone: 'Solve any easy/medium pattern problem in under 20 minutes with an explanation',
  },
  {
    id: 'coding-hard-problems',
    week: 6,
    title: 'Coding: hard problems',
    theme: 'DP, heaps, advanced graph',
    icon: Code,
    goal: 'Tackle medium-hard problems and practice explaining complexity tradeoffs',
    dailyTasks: [
      { id: 'dynamic-programming-problems', label: 'Dynamic programming: LC #322, #300, #1143', link: '/coding/challenges' },
      { id: 'heap-priority-queue-problems', label: 'Heap/priority queue: LC #23, #347, #373', link: '/coding/challenges' },
      { id: 'lru-cache-design', label: 'LRU cache: design and implementation', link: '/coding/challenges' },
      { id: 'union-find-problems', label: 'Union find: LC #684, #323', link: '/coding' },
      { id: 'practice-explaining-solutions', label: 'Practice explaining solutions out loud: record yourself' },
    ],
    resources: ['LeetCode Medium/Hard', 'Coding Challenges page in this app', 'AlgoExpert'],
    milestone: 'Solve 2 hard problems independently with a clear complexity analysis',
  },
  {
    id: 'technical-leadership-week',
    week: 7,
    title: 'Technical leadership',
    theme: 'Architecture, tech debt, on-call',
    icon: Target,
    goal: 'Articulate make vs buy decisions, tech debt frameworks, and incident management',
    dailyTasks: [
      { id: 'write-sample-adrs', label: 'Study the ADR format and write 2 sample ADRs', link: '/technical-leadership' },
      { id: 'study-tech-debt-ledger', label: 'Study the tech debt ledger: quantify debt in business terms', link: '/technical-leadership' },
      { id: 'study-on-call-frameworks', label: 'Study on-call frameworks: blameless RCA process', link: '/technical-leadership' },
      { id: 'practice-technical-decision', label: 'Practice: "Tell me about a technical decision you made"' },
      { id: 'study-team-management-basics', label: 'Study team management: 1:1 frameworks, career ladders', link: '/team-management' },
    ],
    resources: ['Technical Leadership page in this app', 'Staff Engineer book (Larson)', 'Will Larson blog'],
    milestone: 'Deliver a 5-minute verbal walkthrough of a complex technical decision you made',
  },
  {
    id: 'mock-interviews-polish',
    week: 8,
    title: 'Mock interviews and polish',
    theme: 'Full simulation week',
    icon: TrendingUp,
    goal: 'Run full-length mock interviews across all categories and sharpen weak spots',
    dailyTasks: [
      { id: 'mock-loop-day', label: 'Run the full mock loop day: six timed rounds with self-scoring', link: '/mock-loop' },
      { id: 'mock-behavioral', label: 'Mock behavioral interview: 45 min, 4 questions (record)' },
      { id: 'mock-system-design', label: 'Mock system design: 45 min timed with whiteboard' },
      { id: 'mock-coding', label: 'Mock coding: 45 min, 1 medium and 1 easy' },
      { id: 'review-weak-spots', label: 'Debrief each mock and turn the misses into a study list', link: '/debrief' },
      { id: 'prepare-interviewer-questions', label: 'Prepare your 3 questions to ask interviewers for each company', link: '/companies/amazon' },
      { id: 'know-your-number', label: 'Know your number before the offer call: levelling, what is negotiable, your walk-away', link: '/negotiation' },
    ],
    resources: ['Exponent (Pramp merged into it) for peer mocks', 'Interviewing.io', 'Practice with a peer'],
    milestone: 'Complete a full-day mock loop (behavioral, system design, coding) without major gaps',
  },
]
