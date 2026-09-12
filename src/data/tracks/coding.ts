import { assertTrackIds } from '@/data/tracks/ids'
import { patterns, patternIds } from '@/data/tracks/coding-patterns'
import { dataStructures, dsIds } from '@/data/tracks/coding-data-structures'
import { challengeItemIds } from '@/data/tracks/coding-challenges'

export { patterns, patternIds } from '@/data/tracks/coding-patterns'
export type { Pattern } from '@/data/tracks/coding-patterns'
export { dataStructures, dsIds } from '@/data/tracks/coding-data-structures'
export type { DS } from '@/data/tracks/coding-data-structures'
export { jsConcepts, tsConcepts, reactConcepts, frontendCardIds } from '@/data/tracks/coding-frontend'
export type { JsConcept, ConceptCard } from '@/data/tracks/coding-frontend'

export const ALGOS = ['Bubble Sort', 'Selection Sort', 'Insertion Sort'] as const
export type Algo = (typeof ALGOS)[number]

/**
 * Big O reference rows. `operations` is the real work done at n = 1,000, not a
 * hand-picked bar width, and `barWidth` puts it on a log10 scale so the small
 * classes are still visible next to O(n squared). 2^n and n! are past anything
 * a chart can show, so they are flagged and labelled instead of drawn to scale.
 */
export const COMPLEXITY_N = 1000

/** Top of the log axis: O(n squared) at n = 1,000, which is 1,000,000 operations. */
const SCALE_MAX = COMPLEXITY_N * COMPLEXITY_N

export type ComplexityRow = {
  notation: string
  name: string
  example: string
  color: string
  /** Operations at n = 1,000, or null when the value is past the axis. */
  operations: number | null
  /** What to print on the bar. */
  operationsLabel: string
  /** Bar width in percent, log10 scaled. */
  barWidth: number
}

function row(
  notation: string,
  name: string,
  example: string,
  color: string,
  operations: number | null
): ComplexityRow {
  return {
    notation,
    name,
    example,
    color,
    operations,
    operationsLabel: operations === null ? 'off the chart' : operations.toLocaleString('en-US'),
    barWidth:
      operations === null
        ? 100
        : Math.min(100, Math.max(2, (Math.log10(operations) / Math.log10(SCALE_MAX)) * 100)),
  }
}

export const complexityReference: ComplexityRow[] = [
  row('O(1)', 'Constant', 'Array index, hash lookup', 'bg-moss-500', 1),
  row('O(log n)', 'Logarithmic', 'Binary search, balanced BST ops', 'bg-moss-600', Math.round(Math.log2(COMPLEXITY_N))),
  row('O(n)', 'Linear', 'Linear scan, BFS/DFS', 'bg-amber-500', COMPLEXITY_N),
  row('O(n log n)', 'Linearithmic', 'Merge sort, heap sort', 'bg-amber-600', Math.round(COMPLEXITY_N * Math.log2(COMPLEXITY_N))),
  row('O(n\u00b2)', 'Quadratic', 'Nested loops, bubble sort', 'bg-rust-500', COMPLEXITY_N * COMPLEXITY_N),
  row('O(2\u207f)', 'Exponential', 'Backtracking (subsets)', 'bg-rust-600', null),
  row('O(n!)', 'Factorial', 'Brute force permutations', 'bg-rust-700', null),
]

/**
 * Union of everything a reader can mark covered on the coding page: the DSA
 * patterns, the data structures, and the challenges page's challenges.
 */
export const codingItemIds: readonly string[] = [...patternIds, ...dsIds, ...challengeItemIds]

assertTrackIds('coding', codingItemIds)
