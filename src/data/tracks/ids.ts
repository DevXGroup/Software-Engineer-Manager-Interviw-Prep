/**
 * Literal item ids per track. This is the ONLY file the home page imports for
 * coverage totals, so the home bundle does not carry every track's content.
 *
 * Each track's data module asserts, in development, that its derived ids equal
 * this list, so a content edit that adds or renames an item fails loudly on that
 * track's page until this file is updated. Keep page order.
 */

export const trackItemIds = {
  'behavioral': [
    'resolving-senior-engineer-conflict',
    'handling-underperforming-engineer',
    'pushing-back-on-executive-direction',
    'delivering-bad-news-to-stakeholders',
    'making-a-wrong-technical-call',
    'scaling-team-velocity-beyond-a-plateau',
    'influencing-without-authority',
    'production-incident-you-caused',
    'technical-debt-vs-new-features',
    'building-a-team-from-scratch',
    'navigating-organizational-restructuring',
    'ai-and-machine-learning-decision',
    'letting-someone-go',
    'wrong-about-a-hire',
    'report-who-wanted-your-job',
    'inherited-underperformer-no-documentation',
  ],
  'system-design': [
    'url-shortener-bitly',
    'twitter-x-feed',
    'rate-limiter',
    'notification-system',
    'rollout-and-on-call-plan',
    'microservices-pattern',
    'cqrs-pattern',
    'event-sourcing-pattern',
    'saga-pattern',
    'circuit-breaker-pattern',
    'bulkhead-pattern',
  ],
  'coding': [
    'sliding-window',
    'two-pointers',
    'binary-search',
    'bfs',
    'dfs',
    'dp',
    'heap',
    'hashmap',
    'mono-stack',
    'union-find',
    'array',
    'linked-list',
    'stack',
    'queue',
    'hashmap-ds',
    'bst',
    'heap-ds',
    'trie',
    'graph',
    'two-sum',
    'valid-parentheses',
    'best-time-to-buy-and-sell-stock',
    'maximum-subarray',
    'climbing-stairs',
    'longest-substring-without-repeating-characters',
    'container-with-most-water',
    '3sum',
    'coin-change',
    'number-of-islands',
    'product-of-array-except-self',
    'lru-cache',
    'trapping-rain-water',
    'merge-k-sorted-lists',
    'minimum-window-substring',
    'word-ladder',
  ],
  'leadership': [
    'debt',
    'adr',
    'makebuy',
    'oncall',
    'codereview',
    'roadmap',
    'pmlc',
    'tbd',
    'scoping',
    'incident',
  ],
  'team': [
    'hiring',
    'performance',
    'oneones',
    'career',
    'feedback',
    'culture',
    'talent',
    'communication',
    'planning',
  ],
  'ai-interview': [
    'build-vs-buy-ai-feature',
    'handling-hallucination-in-production',
    'responsible-ai-and-bias-in-production',
    'structuring-an-ai-ml-team',
    'measuring-success-of-an-ai-feature',
    'designing-a-rag-system',
    'ai-readiness-filter',
    'ai-replacing-software-engineers',
    'eu-ai-act-and-engineering-teams',
    'prompt-engineering-for-production',
    'balancing-velocity-with-ai-safety',
    'evaluating-an-llm-before-production',
    'design-a-support-ticket-agent',
    'evaluating-an-agent-not-a-model',
    'llm-feature-costs-more-than-revenue',
    'team-policy-on-ai-assisted-coding',
    'latency-budget-for-a-reasoning-model',
  ],
} as const satisfies Record<string, readonly string[]>

export type TrackId = keyof typeof trackItemIds

/** Dev-only guard: a data module's derived ids must match the literal list. */
export function assertTrackIds(track: TrackId, derived: readonly string[]): void {
  if (process.env.NODE_ENV === 'production') return
  const expected = trackItemIds[track]
  const same = expected.length === derived.length && expected.every((id, i) => id === derived[i])
  if (!same) {
    throw new Error(
      `Track "${track}" item ids drifted from src/data/tracks/ids.ts. Expected ${expected.length}: ${expected.join(', ')}. Got ${derived.length}: ${derived.join(', ')}.`
    )
  }
}
