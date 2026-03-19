import { type SearchItem } from '@/data/searchIndex'

type SearchNavigationState = {
  algorithm?: string
  company?: string
  ds?: string
  pattern?: string
  scenario?: string
  tab?: string
}

const searchNavigationBySectionId: Record<string, SearchNavigationState> = {
  'acid-transactions': { tab: 'concepts' },
  'adr': { tab: 'adr' },
  'amazon-principles': { tab: 'principles', company: 'amazon' },
  'apple-principles': { tab: 'principles', company: 'apple' },
  'bfs': { tab: 'patterns', pattern: 'bfs' },
  'big-o': { tab: 'complexity' },
  'binary-search': { tab: 'patterns', pattern: 'binary-search' },
  'bst': { tab: 'datastructs', ds: 'bst' },
  'bubble-sort': { tab: 'visualizer', algorithm: 'bubble-sort' },
  'bulkhead-pattern': { tab: 'patterns', pattern: 'bulkhead-pattern' },
  'caching-strategies': { tab: 'concepts' },
  'cap-theorem': { tab: 'concepts' },
  'career': { tab: 'career' },
  'circuit-breaker-pattern': { tab: 'patterns', pattern: 'circuit-breaker-pattern' },
  'coding': { tab: 'visualizer' },
  'consistent-hashing': { tab: 'concepts' },
  'cqrs-pattern': { tab: 'patterns', pattern: 'cqrs-pattern' },
  'database-indexes': { tab: 'concepts' },
  'database-internals': { tab: 'concepts' },
  'database-sharding': { tab: 'concepts' },
  'deep-dive-videos': { tab: 'concepts' },
  'dfs': { tab: 'patterns', pattern: 'dfs' },
  'dp': { tab: 'patterns', pattern: 'dp' },
  'event-sourcing-pattern': { tab: 'patterns', pattern: 'event-sourcing-pattern' },
  'google-principles': { tab: 'principles', company: 'google' },
  'graph': { tab: 'datastructs', ds: 'graph' },
  'hashmap': { tab: 'patterns', pattern: 'hashmap' },
  'hashmap-ds': { tab: 'datastructs', ds: 'hashmap-ds' },
  'heap': { tab: 'patterns', pattern: 'heap' },
  'hiring': { tab: 'hiring' },
  'insertion-sort': { tab: 'visualizer', algorithm: 'insertion-sort' },
  'linked-list': { tab: 'datastructs', ds: 'linked-list' },
  'llm-architecture': { tab: 'concepts' },
  'load-balancing': { tab: 'concepts' },
  'make-vs-buy': { tab: 'makebuy' },
  'message-queues': { tab: 'concepts' },
  'meta-principles': { tab: 'principles', company: 'meta' },
  'metrics': { tab: 'concepts' },
  'microservices-pattern': { tab: 'patterns', pattern: 'microservices-pattern' },
  'microsoft-principles': { tab: 'principles', company: 'microsoft' },
  'mono-stack': { tab: 'patterns', pattern: 'mono-stack' },
  'netflix-principles': { tab: 'principles', company: 'netflix' },
  'notifications-scenario': { tab: 'scenarios', scenario: 'notifications-scenario' },
  'oncall': { tab: 'oncall' },
  'one-on-one': { tab: 'oneones' },
  'performance': { tab: 'performance' },
  'question-1': { tab: 'questions' },
  'question-2': { tab: 'questions' },
  'question-3': { tab: 'questions' },
  'question-4': { tab: 'questions' },
  'queue': { tab: 'datastructs', ds: 'queue' },
  'rag': { tab: 'concepts' },
  'ratelimiter-scenario': { tab: 'scenarios', scenario: 'ratelimiter-scenario' },
  'responsible-ai': { tab: 'concepts' },
  'saga-pattern': { tab: 'patterns', pattern: 'saga-pattern' },
  'selection-sort': { tab: 'visualizer', algorithm: 'selection-sort' },
  'sliding-window': { tab: 'patterns', pattern: 'sliding-window' },
  'sql-vs-nosql': { tab: 'concepts' },
  'stack': { tab: 'datastructs', ds: 'stack' },
  'tech-debt': { tab: 'debt' },
  'trie': { tab: 'datastructs', ds: 'trie' },
  'twitter-scenario': { tab: 'scenarios', scenario: 'twitter-scenario' },
  'two-pointers': { tab: 'patterns', pattern: 'two-pointers' },
  'union-find': { tab: 'patterns', pattern: 'union-find' },
  'url-scenario': { tab: 'scenarios', scenario: 'url-scenario' },
}

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
