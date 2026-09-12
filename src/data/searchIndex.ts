// Search index is derived at module load from the same data modules the pages
// render from. Add a topic to a track file and it shows up here automatically;
// there is nothing to hand-maintain except the small static lists below (pages
// with no per-section anchors, and the handful of anchors that live directly
// in a page component rather than in a data array).

import { companies as behavioralCompanies, questions as behavioralQuestions } from '@/data/tracks/behavioral'
import { scenarios, architecturePatterns } from '@/data/tracks/system-design'
import { patterns as codingPatterns } from '@/data/tracks/coding-patterns'
import { dataStructures } from '@/data/tracks/coding-data-structures'
import { codingChallenges } from '@/data/tracks/coding-challenges'
import { jsConcepts, tsConcepts, reactConcepts } from '@/data/tracks/coding-frontend'
import {
  leadershipTabs, type LeadershipTabId,
  techDebtSteps, adrWhenToWrite, adrBestPractices, makeBuyCriteria, onCallPractices,
  codeReviewDos, codeReviewDonts, roadmapSteps, pmlcPhases, sdlcPhases, tbdCards, tbdWhy, scopingSteps,
} from '@/data/tracks/leadership'
import {
  teamTabs, type TeamTabId,
  hiringItems, performanceItems, oneOnOneQuestions, careerLadder, icVsManagerTracks,
  sbiParts, candorQuadrants, cultureItems, ratingBands, calibrationElsewhere, calibrationOverview, calibrationMechanics,
  rhetoricModes, communicatingUp, communicatingDown, planningExercises,
} from '@/data/tracks/team'
import { aiQuestions, keyConcepts as aiKeyConcepts } from '@/data/tracks/ai-interview'
import { companyData, type CompanySlug } from '@/data/companies'
import { weeks as roadmapWeeks } from '@/data/roadmap'

export type SearchItemType =
  | 'page'
  | 'section'
  | 'question'
  | 'concept'
  | 'pattern'
  | 'company'
  | 'challenge'
  | 'week'

export interface SearchItem {
  id: string
  title: string
  description: string
  type: SearchItemType
  href: string
  sectionId?: string
  keywords: string[]
  category?: string
}

const truncate = (text: string, max = 140): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`
}

const words = (...parts: (string | undefined)[]): string[] =>
  Array.from(
    new Set(
      parts
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 2)
    )
  )

// ── Static pages: no per-section anchor exists on these routes ─────────────
const staticPages: SearchItem[] = [
  { id: 'home', title: 'Home', description: 'Engineering Manager interview prep, in order', type: 'page', href: '/', keywords: ['home', 'main', 'landing', 'overview', 'start'] },
  { id: 'behavioral', title: 'Behavioral Interview', description: 'Master STAR format and company-specific leadership principles', type: 'page', href: '/behavioral', keywords: ['behavioral', 'leadership', 'star', 'questions', 'soft skills'] },
  { id: 'system-design', title: 'System Design', description: 'Architecture patterns and distributed systems for managers', type: 'page', href: '/system-design', keywords: ['system design', 'architecture', 'distributed', 'scalability', 'microservices'] },
  { id: 'coding', title: 'Coding Practice', description: 'Interactive algorithm visualizer and DSA pattern library', type: 'page', href: '/coding', keywords: ['coding', 'algorithms', 'data structures', 'dsa', 'patterns', 'practice'] },
  { id: 'coding-sdm-guide', title: 'Coding for Engineering Managers', description: 'How the coding bar differs for a manager loop, and how to prep for it', type: 'page', href: '/coding/sdm-guide', keywords: ['sdm', 'engineering manager', 'coding bar', 'guide'] },
  { id: 'technical-leadership', title: 'Technical Leadership', description: 'Architecture decisions, tech debt, and engineering culture', type: 'page', href: '/technical-leadership', keywords: ['technical leadership', 'architecture', 'tech debt', 'engineering culture', 'management'] },
  { id: 'team-management', title: 'Team Management', description: 'Hiring, performance reviews, 1:1s, and team growth', type: 'page', href: '/team-management', keywords: ['team management', 'hiring', 'performance', '1:1', 'team growth'] },
  { id: 'ai-interview', title: 'AI Interview Prep', description: 'LLM systems, responsible AI, and AI product strategy', type: 'page', href: '/ai-interview', keywords: ['ai', 'ml', 'llm', 'machine learning', 'artificial intelligence', 'rag'] },
  { id: 'roadmap', title: 'Interview Roadmap', description: 'Step-by-step, 8-week preparation guide', type: 'page', href: '/roadmap', keywords: ['roadmap', 'guide', 'plan', 'preparation', 'timeline', 'weeks'] },
  { id: 'negotiation', title: 'Offer Negotiation', description: 'Know your number before the call: leveling, what is negotiable, your walk-away', type: 'page', href: '/negotiation', keywords: ['negotiation', 'offer', 'compensation', 'leveling', 'walk away'] },
  { id: 'mock-loop', title: 'Mock Interview Loop', description: 'A full timed loop across behavioral, system design, and coding, with self-scoring', type: 'page', href: '/mock-loop', keywords: ['mock', 'mock loop', 'practice', 'timer', 'scoresheet'] },
  { id: 'debrief', title: 'Debrief Workbench', description: 'Turn a finished mock or real interview into a study list', type: 'page', href: '/debrief', keywords: ['debrief', 'review', 'study list', 'weak spots'] },
]

// ── Behavioral: company principle sets and interview questions ─────────────
const behavioralCompanyItems: SearchItem[] = behavioralCompanies.map((c) => ({
  id: `${c.name.toLowerCase()}-lp`,
  title: `${c.name} Leadership Principles`,
  description: truncate(c.principles.map((p) => p.name).join(', ')),
  type: 'company' as const,
  href: '/behavioral',
  sectionId: `${c.name.toLowerCase()}-principles`,
  keywords: words(c.name, 'leadership principles', ...c.principles.map((p) => p.name)),
  category: c.name,
}))

const behavioralQuestionItems: SearchItem[] = behavioralQuestions.map((q) => ({
  id: q.id,
  title: q.title,
  description: truncate(q.question),
  type: 'question' as const,
  href: '/behavioral',
  sectionId: `question-${q.id}`,
  keywords: words(q.title, ...q.categories, ...q.companies),
  category: q.categories[0],
}))

// ── System design: scenarios, architecture patterns, key concepts ──────────
const systemDesignScenarioItems: SearchItem[] = scenarios.map((s) => ({
  id: s.id,
  title: s.title,
  description: truncate(s.functionalReqs[0] ?? s.title),
  type: 'section' as const,
  href: '/system-design',
  sectionId: `${s.key}-scenario`,
  keywords: words(s.title, 'system design scenario', s.difficulty),
  category: 'Design Scenarios',
}))

const systemDesignPatternItems: SearchItem[] = architecturePatterns.map((p) => ({
  id: p.id,
  title: p.name,
  description: truncate(p.description),
  type: 'pattern' as const,
  href: '/system-design',
  sectionId: p.id,
  keywords: words(p.name, p.description),
  category: 'Architecture Patterns',
}))

/** Concept anchors that live directly on the system-design page, not in a data array. */
const systemDesignConcepts: { id: string; title: string; description: string; keywords: string[] }[] = [
  { id: 'acid-transactions', title: 'ACID Transactions', description: 'Atomicity, Consistency, Isolation, Durability: database transaction guarantees', keywords: ['acid', 'atomicity', 'consistency', 'isolation', 'durability', 'wal'] },
  { id: 'cap-theorem', title: 'CAP Theorem', description: 'During a partition, you choose consistency or availability; partition tolerance is assumed', keywords: ['cap', 'consistency', 'availability', 'partition', 'pacelc'] },
  { id: 'sql-vs-nosql', title: 'SQL vs NoSQL', description: 'Relational vs NoSQL database comparison and use cases', keywords: ['sql', 'nosql', 'relational', 'document', 'key-value', 'postgres', 'mongodb'] },
  { id: 'caching-strategies', title: 'Caching Strategies', description: 'Cache-aside, Write-through, Write-behind caching patterns', keywords: ['cache', 'redis', 'cache-aside', 'write-through', 'write-behind'] },
  { id: 'consistent-hashing', title: 'Consistent Hashing', description: 'Distributed hashing that minimizes rehashing when nodes change', keywords: ['consistent hashing', 'hash ring', 'vnodes'] },
  { id: 'deep-dive-videos', title: 'System Design Deep Dive Videos', description: 'Curated videos for CAP theorem, NoSQL, caching, consistent hashing, load balancing, and Kafka', keywords: ['videos', 'youtube', 'deep dive', 'bytebytego'] },
  { id: 'database-sharding', title: 'Database Sharding', description: 'Horizontal partitioning to split data across multiple databases', keywords: ['sharding', 'horizontal partitioning', 'shard key'] },
  { id: 'message-queues', title: 'Message Queues & Streaming', description: 'Kafka, RabbitMQ, SQS for async communication and event streaming', keywords: ['kafka', 'rabbitmq', 'sqs', 'streaming', 'pub-sub'] },
  { id: 'database-indexes', title: 'Database Indexes', description: 'B-Tree, Hash, LSM Tree indexes for query optimization', keywords: ['index', 'b-tree', 'hash index', 'lsm tree'] },
  { id: 'load-balancing', title: 'Load Balancing Algorithms', description: 'Round Robin, Least Connections, IP Hash, Layer 4/7 balancing', keywords: ['load balancing', 'round robin', 'nginx', 'layer 4', 'layer 7'] },
  { id: 'database-internals', title: 'Database Internals', description: 'B-Tree, LSM Tree, WAL, MVCC, buffer pool, connection pooling', keywords: ['wal', 'mvcc', 'buffer pool', 'connection pooling'] },
]

const systemDesignConceptItems: SearchItem[] = systemDesignConcepts.map((c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
  type: 'concept' as const,
  href: '/system-design',
  sectionId: c.id,
  keywords: words(c.title, ...c.keywords),
  category: 'Key Concepts',
}))

// ── Coding: sorting visualizer, DSA patterns, data structures, big O ────────
const algorithmSearchIds: Record<string, string> = {
  'Bubble Sort': 'bubble-sort',
  'Selection Sort': 'selection-sort',
  'Insertion Sort': 'insertion-sort',
}

const sortingAlgorithmItems: SearchItem[] = Object.entries(algorithmSearchIds).map(([name, id]) => ({
  id,
  title: name,
  description: `${name}: step through the visualizer and inspect time and space complexity`,
  type: 'concept' as const,
  href: '/coding',
  sectionId: id,
  keywords: words(name, 'sorting', 'algorithm', 'visualization'),
  category: 'Sorting Algorithms',
}))

const codingPatternItems: SearchItem[] = codingPatterns.map((p) => ({
  id: p.id,
  title: p.name,
  description: truncate(p.when),
  type: 'pattern' as const,
  href: '/coding',
  sectionId: p.id,
  keywords: words(p.name, p.when, ...p.problems),
  category: 'DSA Patterns',
}))

const dataStructureItems: SearchItem[] = dataStructures.map((d) => ({
  id: d.id,
  title: d.name,
  description: truncate(d.description),
  type: 'concept' as const,
  href: '/coding',
  sectionId: d.id,
  keywords: words(d.name, d.description, d.useWhen),
  category: 'Data Structures',
}))

const bigOEntries: { id: string; title: string; description: string; keywords: string[] }[] = [
  { id: 'big-o-constant', title: 'O(1) - Constant Time', description: 'Array index access, hash lookup', keywords: ['constant', 'o(1)'] },
  { id: 'big-o-log', title: 'O(log n) - Logarithmic Time', description: 'Binary search, balanced BST operations', keywords: ['logarithmic', 'log n', 'binary search'] },
  { id: 'big-o-linear', title: 'O(n) - Linear Time', description: 'Linear scan, BFS/DFS traversal', keywords: ['linear', 'o(n)', 'scan'] },
  { id: 'big-o-nlogn', title: 'O(n log n) - Linearithmic Time', description: 'Merge sort, heap sort, quick sort average', keywords: ['linearithmic', 'n log n', 'merge sort'] },
  { id: 'big-o-quadratic', title: 'O(n²) - Quadratic Time', description: 'Nested loops, bubble sort, selection sort', keywords: ['quadratic', 'n squared', 'nested loops'] },
]

const bigOItems: SearchItem[] = bigOEntries.map((b) => ({
  id: b.id,
  title: b.title,
  description: b.description,
  type: 'concept' as const,
  href: '/coding',
  sectionId: 'big-o',
  keywords: words(b.title, ...b.keywords, 'big o'),
  category: 'Big O Reference',
}))

const challengeItems: SearchItem[] = codingChallenges.map((c) => ({
  id: c.id,
  title: c.title,
  description: truncate(c.description),
  type: 'challenge' as const,
  href: '/coding/challenges',
  sectionId: c.id,
  keywords: words(c.title, `leetcode ${c.leetcode}`, ...c.patterns, c.difficulty),
  category: c.difficulty,
}))

const frontendSourceCards = [
  ...jsConcepts.map((c) => ({ id: c.id, title: c.title, text: c.explanation, group: 'JavaScript' })),
  ...tsConcepts.map((c) => ({ id: c.id, title: c.title, text: c.note, group: 'TypeScript' })),
  ...reactConcepts.map((c) => ({ id: c.id, title: c.title, text: c.note, group: 'React / Next.js' })),
]

const frontendCardItems: SearchItem[] = frontendSourceCards.map((c) => ({
  id: c.id,
  title: c.title,
  description: truncate(c.text),
  type: 'concept' as const,
  href: '/coding',
  sectionId: c.id,
  keywords: words(c.title, c.group),
  category: c.group,
}))

// ── Technical leadership & team management: one entry per tab ──────────────
// The page's own sectionIdByTab renames a few tab ids to a different anchor;
// mirror only those true one-offs here, everything else uses the tab id as-is.
const LEADERSHIP_SECTION_BY_TAB: Partial<Record<LeadershipTabId, string>> = {
  debt: 'tech-debt',
  makebuy: 'make-vs-buy',
}

const TEAM_SECTION_BY_TAB: Partial<Record<TeamTabId, string>> = {
  oneones: 'one-on-one',
}

/** Body copy per tab, pulled in as extra search keywords beyond the one-line summary. */
const LEADERSHIP_TAB_BODY: Partial<Record<LeadershipTabId, string>> = {
  debt: techDebtSteps.map((s) => s.content).join(' '),
  adr: [...adrWhenToWrite, ...adrBestPractices].join(' '),
  makebuy: makeBuyCriteria.map((c) => `${c.criterion} ${c.note}`).join(' '),
  oncall: onCallPractices.map((p) => `${p.title} ${p.desc}`).join(' '),
  codereview: [...codeReviewDos, ...codeReviewDonts].join(' '),
  roadmap: roadmapSteps.map((s) => `${s.title} ${s.content}`).join(' '),
  pmlc: [...pmlcPhases, ...sdlcPhases].map((p) => `${p.title} ${p.content}`).join(' '),
  tbd: [...tbdCards.map((c) => `${c.title} ${c.content}`), ...tbdWhy].join(' '),
  scoping: scopingSteps.map((s) => `${s.title} ${s.content}`).join(' '),
}

const TEAM_TAB_BODY: Partial<Record<TeamTabId, string>> = {
  hiring: hiringItems.map((h) => `${h.title} ${h.content}`).join(' '),
  performance: performanceItems.map((p) => `${p.title} ${p.content}`).join(' '),
  oneones: oneOnOneQuestions.join(' '),
  career: [
    ...careerLadder.map((c) => `${c.level} ${c.scope} ${c.key}`),
    ...icVsManagerTracks.map((t) => `${t.title} ${t.desc}`),
  ].join(' '),
  feedback: [
    ...sbiParts.map((p) => `${p.label} ${p.desc}`),
    ...candorQuadrants.map((c) => `${c.title} ${c.desc}`),
  ].join(' '),
  culture: cultureItems.map((c) => `${c.title} ${c.desc}`).join(' '),
  talent: [
    calibrationOverview,
    calibrationMechanics,
    ...ratingBands.map((r) => `${r.label} ${r.desc}`),
    ...calibrationElsewhere.map((c) => `${c.company} ${c.note}`),
  ].join(' '),
  communication: [
    ...rhetoricModes.map((m) => `${m.label} ${m.subtitle} ${m.content}`),
    ...communicatingUp,
    ...communicatingDown,
  ].join(' '),
  planning: planningExercises.map((e) => `${e.title} ${e.setup}`).join(' '),
}

const leadershipTabItems: SearchItem[] = leadershipTabs.map((t) => ({
  id: `leadership-${t.id}`,
  title: t.title,
  description: truncate(t.summary),
  type: 'section' as const,
  href: '/technical-leadership',
  sectionId: LEADERSHIP_SECTION_BY_TAB[t.id] ?? t.id,
  keywords: words(t.title, t.summary, LEADERSHIP_TAB_BODY[t.id]),
  category: 'Technical Leadership',
}))

const teamTabItems: SearchItem[] = teamTabs.map((t) => ({
  id: `team-${t.id}`,
  title: t.title,
  description: truncate(t.summary),
  type: 'section' as const,
  href: '/team-management',
  sectionId: TEAM_SECTION_BY_TAB[t.id] ?? t.id,
  keywords: words(t.title, t.summary, TEAM_TAB_BODY[t.id]),
  category: 'Team Management',
}))

// ── AI interview: Q&A bank, key concepts ────────────────────────────────────
const aiQuestionItems: SearchItem[] = aiQuestions.map((q) => ({
  id: q.id,
  title: q.question,
  description: truncate(q.answer),
  type: 'question' as const,
  href: '/ai-interview',
  sectionId: q.id,
  keywords: words(q.category, q.level, ...q.keyPoints.slice(0, 2)),
  category: q.category,
}))

const aiConceptItems: SearchItem[] = aiKeyConcepts.map((c) => ({
  id: c.id,
  title: c.term,
  description: truncate(c.definition),
  type: 'concept' as const,
  href: '/ai-interview',
  sectionId: c.id,
  keywords: words(c.term, c.definition),
  category: 'AI Interview',
}))

// ── Company guides ──────────────────────────────────────────────────────────
const companyGuideItems: SearchItem[] = (Object.keys(companyData) as CompanySlug[]).map((slug) => {
  const c = companyData[slug]
  return {
    id: `company-${slug}`,
    title: `${c.name} interview guide`,
    description: truncate(c.tagline),
    type: 'company' as const,
    href: `/companies/${slug}`,
    keywords: [
      ...words(c.name, c.tagline, ...c.rounds.map((r) => r.name), ...c.topQuestions.map((q) => q.q)),
      // Round names kept as whole phrases too ("bar raiser"), since the
      // tokenized words above lose multi-word round names as a unit.
      ...c.rounds.map((r) => r.name.toLowerCase()),
    ],
    category: c.name,
  }
})

// ── Roadmap weeks ────────────────────────────────────────────────────────────
const roadmapWeekItems: SearchItem[] = roadmapWeeks.map((w) => ({
  id: w.id,
  title: `Week ${w.week}: ${w.title}`,
  description: truncate(w.goal),
  type: 'week' as const,
  href: '/roadmap',
  sectionId: w.id,
  keywords: words(w.title, w.theme, w.goal),
  category: 'Roadmap',
}))

export const searchIndex: SearchItem[] = [
  ...staticPages,
  ...behavioralCompanyItems,
  ...behavioralQuestionItems,
  ...systemDesignScenarioItems,
  ...systemDesignPatternItems,
  ...systemDesignConceptItems,
  ...sortingAlgorithmItems,
  ...codingPatternItems,
  ...dataStructureItems,
  ...bigOItems,
  ...challengeItems,
  ...frontendCardItems,
  ...leadershipTabItems,
  ...teamTabItems,
  ...aiQuestionItems,
  ...aiConceptItems,
  ...companyGuideItems,
  ...roadmapWeekItems,
]

// Helper function to get all unique categories
export function getSearchCategories(): string[] {
  const categories = new Set<string>()
  searchIndex.forEach((item) => {
    if (item.category) categories.add(item.category)
  })
  return Array.from(categories).sort()
}

// Helper function to get all unique types actually present in the index
export function getSearchTypes(): SearchItemType[] {
  const types = new Set<SearchItemType>()
  searchIndex.forEach((item) => types.add(item.type))
  return Array.from(types)
}
