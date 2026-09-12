import { type SearchItem } from '@/data/searchIndex'
import { companies as behavioralCompanies, questions as behavioralQuestions } from '@/data/tracks/behavioral'
import { scenarios, architecturePatterns } from '@/data/tracks/system-design'
import { patterns as codingPatterns } from '@/data/tracks/coding-patterns'
import { dataStructures } from '@/data/tracks/coding-data-structures'
import { jsConcepts, tsConcepts, reactConcepts } from '@/data/tracks/coding-frontend'
import { leadershipTabs } from '@/data/tracks/leadership'
import { teamTabs } from '@/data/tracks/team'
import { aiQuestions, keyConcepts as aiKeyConcepts } from '@/data/tracks/ai-interview'

type SearchNavigationState = {
  algorithm?: string
  company?: string
  ds?: string
  pattern?: string
  scenario?: string
  tab?: string
}

/**
 * Every anchor id that resolves through a page's tab state is generated here
 * from the same data the page renders from, so a topic added to a track file
 * gets a working deep link automatically. Only true one-offs (a `sectionId`
 * that cannot be derived from any data module id, or a page whose own remap
 * table differs from the data id) are added by hand below the generated ones.
 */
const generated: Record<string, SearchNavigationState> = {}

const add = (sectionId: string, state: SearchNavigationState) => {
  generated[sectionId] = state
}

// Behavioral: company principle panels and interview questions
behavioralCompanies.forEach((c) => {
  const slug = c.name.toLowerCase()
  add(`${slug}-principles`, { tab: 'principles', company: slug })
})
// Question anchors carry a `question-` prefix that is not itself present in
// the data module id, so it is written out explicitly rather than derived.
behavioralQuestions.forEach((q) => add(`question-${q.id}`, { tab: 'questions' }))

// System design: scenarios, architecture patterns, and the shared concepts tab
scenarios.forEach((s) => {
  const id = `${s.key}-scenario`
  add(id, { tab: 'scenarios', scenario: id })
})
architecturePatterns.forEach((p) => {
  add(p.id, { tab: 'patterns', pattern: p.id })
})
;[
  'acid-transactions', 'cap-theorem', 'sql-vs-nosql', 'caching-strategies', 'consistent-hashing',
  'deep-dive-videos', 'database-sharding', 'message-queues', 'database-indexes', 'load-balancing',
  'database-internals',
].forEach((id) => add(id, { tab: 'concepts' }))

// Coding: sorting visualizer, DSA patterns, data structures, big O, frontend cards
const algorithmSearchIds: Record<string, string> = {
  'Bubble Sort': 'bubble-sort',
  'Selection Sort': 'selection-sort',
  'Insertion Sort': 'insertion-sort',
}
Object.values(algorithmSearchIds).forEach((id) => add(id, { tab: 'visualizer', algorithm: id }))

codingPatterns.forEach((p) => add(p.id, { tab: 'patterns', pattern: p.id }))
dataStructures.forEach((d) => add(d.id, { tab: 'datastructs', ds: d.id }))
add('big-o', { tab: 'complexity' })
;[...jsConcepts, ...tsConcepts, ...reactConcepts].forEach((c) => add(c.id, { tab: 'frontend' }))

// Technical leadership and team management: one tab per section, with the
// page's own sectionIdByTab remap mirrored only where it actually differs
// from the tab id (a true one-off, not derivable from the tab data itself).
const LEADERSHIP_SECTION_BY_TAB: Partial<Record<string, string>> = {
  debt: 'tech-debt',
  makebuy: 'make-vs-buy',
}
leadershipTabs.forEach((t) => add(LEADERSHIP_SECTION_BY_TAB[t.id] ?? t.id, { tab: t.id }))

const TEAM_SECTION_BY_TAB: Partial<Record<string, string>> = {
  oneones: 'one-on-one',
}
teamTabs.forEach((t) => add(TEAM_SECTION_BY_TAB[t.id] ?? t.id, { tab: t.id }))

// AI interview: Q&A bank and key concepts tabs
aiQuestions.forEach((q) => add(q.id, { tab: 'qa' }))
aiKeyConcepts.forEach((c) => add(c.id, { tab: 'concepts' }))

/**
 * Challenge cards (/coding/challenges) and roadmap weeks (/roadmap) are each
 * the only interactive list on their page, shown in full with no tab or
 * filter applied by default, so their anchor resolves with no extra
 * navigation state at all. Company guides and every entry in `staticPages`
 * have no section anchor. Nothing to add for either case:
 * `getSearchNavigationState` already returns `{}` for any `sectionId` (or
 * missing `sectionId`) that is not present in `generated`.
 */

const searchNavigationBySectionId: Record<string, SearchNavigationState> = generated

export function getSearchNavigationState(item: Pick<SearchItem, 'sectionId'>): SearchNavigationState {
  if (!item.sectionId) {
    return {}
  }

  return searchNavigationBySectionId[item.sectionId] ?? {}
}

export function hasSearchNavigationState(item: Pick<SearchItem, 'sectionId'>): boolean {
  return Object.keys(getSearchNavigationState(item)).length > 0
}

export function buildSearchTarget(item: SearchItem): string {
  const state = getSearchNavigationState(item)
  const params = new URLSearchParams()

  Object.entries(state).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()
  const hash = item.sectionId ? `#${item.sectionId}` : ''

  return `${item.href}${query ? `?${query}` : ''}${hash}`
}
