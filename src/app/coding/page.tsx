'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RefreshCw, ChevronDown, ChevronUp, Code, Zap, GitBranch, Layers, Trophy, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { QuizLauncher } from '@/components/QuizLauncher'
import { codingQuestions } from '@/data/quizzes/coding'

// ── Types ────────────────────────────────────────────────────────────────────
type SortStep = { array: number[]; comparing: number[]; sorted: number[]; swapped: boolean }
type Pattern = { name: string; slug: string; when: string; template: string; example: string; problems: string[]; complexity: string }

// ── Sorting algorithm step generators ───────────────────────────────────────
function bubbleSortSteps(arr: number[]): SortStep[] {
  const a = [...arr]; const steps: SortStep[] = []
  const sorted: number[] = []
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], sorted: [...sorted], swapped: false })
      if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; steps.push({ array: [...a], comparing: [j, j + 1], sorted: [...sorted], swapped: true }) }
    }
    sorted.push(a.length - 1 - i)
  }
  sorted.push(0)
  steps.push({ array: [...a], comparing: [], sorted: [...sorted], swapped: false })
  return steps
}

function selectionSortSteps(arr: number[]): SortStep[] {
  const a = [...arr]; const steps: SortStep[] = []
  const sorted: number[] = []
  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ array: [...a], comparing: [minIdx, j], sorted: [...sorted], swapped: false })
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) { [a[i], a[minIdx]] = [a[minIdx], a[i]]; steps.push({ array: [...a], comparing: [i, minIdx], sorted: [...sorted], swapped: true }) }
    sorted.push(i)
  }
  sorted.push(a.length - 1)
  steps.push({ array: [...a], comparing: [], sorted: [...sorted], swapped: false })
  return steps
}

function insertionSortSteps(arr: number[]): SortStep[] {
  const a = [...arr]; const steps: SortStep[] = []
  const sorted: number[] = [0]
  for (let i = 1; i < a.length; i++) {
    let j = i
    while (j > 0) {
      steps.push({ array: [...a], comparing: [j - 1, j], sorted: [...sorted], swapped: false })
      if (a[j] < a[j - 1]) { [a[j], a[j - 1]] = [a[j - 1], a[j]]; steps.push({ array: [...a], comparing: [j - 1, j], sorted: [...sorted], swapped: true }); j-- }
      else break
    }
    sorted.push(i)
  }
  steps.push({ array: [...a], comparing: [], sorted: [...sorted], swapped: false })
  return steps
}

const ALGOS = ['Bubble Sort', 'Selection Sort', 'Insertion Sort'] as const
type Algo = typeof ALGOS[number]

// ── DSA Patterns ─────────────────────────────────────────────────────────────
const patterns: Pattern[] = [
  {
    name: 'Sliding Window',
    slug: 'sliding-window',
    when: 'Contiguous subarray/substring problems. Find max/min/count in a window of size k, or variable-size window satisfying a condition.',
    template: `function slidingWindow(arr, k) {
  let left = 0, result = 0
  let windowSum = 0  // or Set, Map, counter

  for (let right = 0; right < arr.length; right++) {
    // 1. Expand: add arr[right] to window
    windowSum += arr[right]

    // 2. Shrink when window is invalid
    while (windowSum > targetOrWindowTooLarge) {
      windowSum -= arr[left]
      left++
    }

    // 3. Update result from current window
    result = Math.max(result, right - left + 1)
  }
  return result
}`,
    example: 'Max sum subarray of size k, Longest substring with k distinct chars, Minimum window substring',
    problems: ['Maximum Sum Subarray of Size K', 'Longest Substring Without Repeating Characters', 'Minimum Window Substring', 'Longest Subarray with Ones after Replacement'],
    complexity: 'Time: O(n) · Space: O(1) or O(k)',
  },
  {
    name: 'Two Pointers',
    slug: 'two-pointers',
    when: 'Sorted array problems. Find pairs, triplets, or partition elements. Opposite-direction (L & R) or same-direction (fast & slow).',
    template: `function twoPointers(arr) {
  let left = 0, right = arr.length - 1

  while (left < right) {
    const sum = arr[left] + arr[right]

    if (sum === target) {
      // found — record result
      left++; right--
    } else if (sum < target) {
      left++   // need larger value
    } else {
      right--  // need smaller value
    }
  }
}`,
    example: 'Two Sum II (sorted), 3Sum, Container With Most Water, Trapping Rain Water',
    problems: ['Two Sum II - Input Array Is Sorted', '3Sum', 'Container With Most Water', 'Trapping Rain Water', 'Remove Duplicates from Sorted Array'],
    complexity: 'Time: O(n) · Space: O(1)',
  },
  {
    name: 'Binary Search',
    slug: 'binary-search',
    when: 'Sorted data, or when search space can be halved. Also applies to "find minimum/maximum X such that condition(X) is true."',
    template: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2)

    if (arr[mid] === target) return mid
    else if (arr[mid] < target) lo = mid + 1  // go right
    else hi = mid - 1                          // go left
  }
  return -1  // not found
}

// Template for "find first true" / minimize X:
// lo = minPossible, hi = maxPossible
// while (lo < hi) { mid = ...; if (condition(mid)) hi = mid; else lo = mid+1 }`,
    example: 'Binary search on answer: Capacity to ship packages, Koko eating bananas, Minimum days to make m bouquets',
    problems: ['Binary Search', 'Search in Rotated Sorted Array', 'Find Minimum in Rotated Sorted Array', 'Koko Eating Bananas', 'Capacity To Ship Packages Within D Days'],
    complexity: 'Time: O(log n) · Space: O(1)',
  },
  {
    name: 'BFS / Level-Order',
    slug: 'bfs',
    when: 'Shortest path in unweighted graph/grid. Level-by-level tree traversal. Spreading/infection problems.',
    template: `function bfs(start, graph) {
  const queue = [start]
  const visited = new Set([start])
  let level = 0

  while (queue.length > 0) {
    const size = queue.length       // process one level at a time

    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      // process node

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
    level++
  }
  return level
}`,
    example: 'Shortest path in a maze, Binary tree level order traversal, Rotting Oranges, Word Ladder',
    problems: ['Binary Tree Level Order Traversal', 'Rotting Oranges', 'Word Ladder', 'Shortest Path in Binary Matrix', 'Number of Islands'],
    complexity: 'Time: O(V + E) · Space: O(V)',
  },
  {
    name: 'DFS / Backtracking',
    slug: 'dfs',
    when: 'Explore all paths. Generate all combinations/permutations. Find if a path exists. Tree/graph traversal without shortest path constraint.',
    template: `function dfs(node, graph, visited = new Set()) {
  visited.add(node)
  // process node

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, graph, visited)
    }
  }
}

// Backtracking template:
function backtrack(current, choices, result) {
  if (isComplete(current)) { result.push([...current]); return }

  for (const choice of choices) {
    if (isValid(choice)) {
      current.push(choice)           // choose
      backtrack(current, choices, result)  // explore
      current.pop()                  // unchoose
    }
  }
}`,
    example: 'All permutations/subsets, N-Queens, Sudoku solver, Word Search, Path Sum',
    problems: ['Subsets', 'Permutations', 'Combination Sum', 'Word Search', 'N-Queens'],
    complexity: 'Time: O(2^n) to O(n!) · Space: O(n) recursion depth',
  },
  {
    name: 'Dynamic Programming',
    slug: 'dp',
    when: 'Optimal substructure + overlapping subproblems. "Maximum/minimum/count number of ways" problems. Choices at each step affect future choices.',
    template: `// 1D DP
function dp1D(nums) {
  const dp = new Array(nums.length).fill(0)
  dp[0] = baseCase

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i-1] + nums[i], nums[i])  // or other recurrence
  }
  return Math.max(...dp)
}

// 2D DP (e.g., knapsack, LCS)
function dp2D(m, n) {
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = /* recurrence using dp[i-1][j], dp[i][j-1], etc. */
    }
  }
  return dp[m][n]
}`,
    example: 'Fibonacci, Coin Change, Longest Common Subsequence, 0/1 Knapsack, House Robber',
    problems: ['Climbing Stairs', 'House Robber', 'Coin Change', 'Longest Common Subsequence', 'Edit Distance', 'Longest Increasing Subsequence'],
    complexity: 'Time: O(n²) typical · Space: O(n) to O(n²)',
  },
  {
    name: 'Heap / Priority Queue',
    slug: 'heap',
    when: 'K largest/smallest elements. Streaming data. Merge K sorted lists. Dijkstra. Problems requiring the current min/max efficiently.',
    template: `// JavaScript: use a min-heap library or simulate
// Pattern: maintain heap of size K

function kLargest(nums, k) {
  // Min-heap of size K: smallest of K largest is at top
  const minHeap = new MinHeap()

  for (const num of nums) {
    minHeap.push(num)
    if (minHeap.size() > k) minHeap.pop()  // evict smallest
  }

  return minHeap.toArray()  // K largest elements
}

// Top K frequent:
// 1. Count frequencies with a Map
// 2. Use a min-heap keyed by frequency
// 3. Maintain size K
// Result: K most frequent elements`,
    example: 'K Closest Points to Origin, Top K Frequent Elements, Merge K Sorted Lists, Task Scheduler',
    problems: ['Kth Largest Element in an Array', 'Top K Frequent Elements', 'K Closest Points to Origin', 'Merge K Sorted Lists', 'Task Scheduler'],
    complexity: 'Time: O(n log k) · Space: O(k)',
  },
  {
    name: 'Hash Map / Set',
    slug: 'hashmap',
    when: 'O(1) lookup needed. Check membership. Count frequencies. Group by key. Two-sum-style complement lookups.',
    template: `// Two Sum pattern:
function twoSum(nums, target) {
  const seen = new Map()  // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (seen.has(complement)) return [seen.get(complement), i]
    seen.set(nums[i], i)
  }
}

// Frequency counter:
function groupAnagrams(strs) {
  const map = new Map()
  for (const s of strs) {
    const key = s.split('').sort().join('')
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(s)
  }
  return [...map.values()]
}`,
    example: 'Two Sum, Group Anagrams, Longest Consecutive Sequence, Subarray Sum Equals K',
    problems: ['Two Sum', 'Group Anagrams', 'Top K Frequent Elements', 'Longest Consecutive Sequence', 'Subarray Sum Equals K'],
    complexity: 'Time: O(n) average · Space: O(n)',
  },
  {
    name: 'Monotonic Stack',
    slug: 'mono-stack',
    when: '"Next greater/smaller element" problems. Histogram problems. Problems where you need the nearest element satisfying a condition to the left or right.',
    template: `function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1)
  const stack = []  // stores indices (decreasing values = monotonic decreasing)

  for (let i = 0; i < nums.length; i++) {
    // Pop while current element is greater than stack top
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop()
      result[idx] = nums[i]  // nums[i] is the next greater for idx
    }
    stack.push(i)
  }
  return result
}

// Key insight: elements in stack are "waiting" for their next greater/smaller.`,
    example: 'Next Greater Element, Largest Rectangle in Histogram, Daily Temperatures, Trapping Rain Water',
    problems: ['Next Greater Element I', 'Daily Temperatures', 'Largest Rectangle in Histogram', 'Trapping Rain Water'],
    complexity: 'Time: O(n) amortized · Space: O(n)',
  },
  {
    name: 'Union Find (DSU)',
    slug: 'union-find',
    when: 'Connected components. Dynamic connectivity. Cycle detection in undirected graphs. "Group elements that are related" problems.',
    template: `class UnionFind {
  parent: number[]
  rank: number[]

  constructor(n: number) {
    this.parent = Array.from({length: n}, (_, i) => i)
    this.rank = new Array(n).fill(0)
  }

  find(x: number): number {
    if (this.parent[x] !== x)
      this.parent[x] = this.find(this.parent[x])  // path compression
    return this.parent[x]
  }

  union(x: number, y: number): boolean {
    const px = this.find(x), py = this.find(y)
    if (px === py) return false  // already connected (cycle!)
    // Union by rank
    if (this.rank[px] < this.rank[py]) this.parent[px] = py
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px
    else { this.parent[py] = px; this.rank[px]++ }
    return true
  }
}`,
    example: 'Number of Provinces, Redundant Connection, Accounts Merge, Number of Islands (alternative)',
    problems: ['Number of Provinces', 'Redundant Connection', 'Accounts Merge', 'Graph Valid Tree'],
    complexity: 'Time: O(α(n)) ≈ O(1) per op · Space: O(n)',
  },
]

// ── Big O Reference ──────────────────────────────────────────────────────────
const complexityReference = [
  { notation: 'O(1)', name: 'Constant', example: 'Array index, Hash lookup', color: 'bg-green-500' },
  { notation: 'O(log n)', name: 'Logarithmic', example: 'Binary search, Balanced BST ops', color: 'bg-emerald-500' },
  { notation: 'O(n)', name: 'Linear', example: 'Linear scan, BFS/DFS', color: 'bg-yellow-500' },
  { notation: 'O(n log n)', name: 'Linearithmic', example: 'Merge sort, Heap sort', color: 'bg-orange-500' },
  { notation: 'O(n²)', name: 'Quadratic', example: 'Nested loops, Bubble sort', color: 'bg-red-500' },
  { notation: 'O(2ⁿ)', name: 'Exponential', example: 'Backtracking (subsets)', color: 'bg-red-700' },
  { notation: 'O(n!)', name: 'Factorial', example: 'Brute force permutations', color: 'bg-red-900' },
]

// ── Data Structures ──────────────────────────────────────────────────────────
type DS = { name: string; category: string; slug: string; description: string; ops: { op: string; avg: string; worst: string }[]; template: string; useWhen: string; interviewNote: string }

const dataStructures: DS[] = [
  {
    name: 'Array',
    category: 'Linear',
    slug: 'array',
    description: 'Contiguous memory storing elements of the same type. O(1) random access by index. Dynamic arrays auto-resize, amortizing appends to O(1) average. Cache-friendly due to memory locality.',
    ops: [
      { op: 'Access by index', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Search (unsorted)', avg: 'O(n)', worst: 'O(n)' },
      { op: 'Append (amortized)', avg: 'O(1)', worst: 'O(n)' },
      { op: 'Insert at index', avg: 'O(n)', worst: 'O(n)' },
      { op: 'Delete at index', avg: 'O(n)', worst: 'O(n)' },
    ],
    template: `// Two-pointer idiom:
let left = 0, right = arr.length - 1
while (left < right) { /* ... */ left++; right-- }

// Prefix sum (O(1) range sum query):
const prefix = [0]
for (const x of arr) prefix.push(prefix.at(-1)! + x)
// sum(arr[i..j]) = prefix[j+1] - prefix[i]

// Kadane's (max subarray):
function maxSubarray(nums: number[]): number {
  let maxSum = nums[0], curr = nums[0]
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i])
    maxSum = Math.max(maxSum, curr)
  }
  return maxSum
}`,
    useWhen: 'Random access by index. Cache-friendly iteration. Prefix sums. Two-pointer problems on sorted data.',
    interviewNote: 'Prefix sums unlock O(1) range sum queries — critical for subarray sum problems. Kadane\'s algorithm solves maximum subarray in O(n). Arrays underlie most FAANG problems.',
  },
  {
    name: 'Linked List',
    category: 'Linear',
    slug: 'linked-list',
    description: 'Nodes linked by pointers. No random access. O(1) insert/delete at a known node. Singly: one direction. Doubly: O(1) delete given a direct node reference. Used inside LRU Cache.',
    ops: [
      { op: 'Access by index', avg: 'O(n)', worst: 'O(n)' },
      { op: 'Search', avg: 'O(n)', worst: 'O(n)' },
      { op: 'Insert at head', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Insert at tail (tail ptr)', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Delete (given node ref)', avg: 'O(1)', worst: 'O(1)' },
    ],
    template: `class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

// Reverse (iterative):
function reverse(head: ListNode | null): ListNode | null {
  let prev = null, curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev; prev = curr; curr = next
  }
  return prev
}

// Floyd's cycle detection (slow/fast pointers):
function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head
  while (fast?.next) {
    slow = slow!.next; fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}

// Find middle (slow/fast):
function middle(head: ListNode): ListNode {
  let slow = head, fast = head
  while (fast.next?.next) { slow = slow.next!; fast = fast.next.next }
  return slow
}`,
    useWhen: 'Frequent insert/delete without random access. LRU Cache. Reverse, cycle-detect, or merge problems.',
    interviewNote: 'Master: dummy head node (simplifies edge cases), slow/fast pointers (find middle, detect cycle), in-place reversal. LRU Cache = Doubly Linked List + HashMap.',
  },
  {
    name: 'Stack',
    category: 'Linear',
    slug: 'stack',
    description: 'LIFO: Last In, First Out. O(1) push/pop/peek. Built on array or linked list. Powers DFS, expression parsing, undo/redo, and the monotonic stack pattern.',
    ops: [
      { op: 'Push', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Pop', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Peek (top)', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Search', avg: 'O(n)', worst: 'O(n)' },
    ],
    template: `const stack: number[] = []
stack.push(5)              // push
const top = stack.at(-1)  // peek (no removal)
const val = stack.pop()   // pop

// Monotonic stack — next greater element:
function nextGreater(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1)
  const stack: number[] = []  // indices, decreasing values
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack.at(-1)!]) {
      result[stack.pop()!] = nums[i]
    }
    stack.push(i)
  }
  return result
}

// Valid Parentheses:
function isValid(s: string): boolean {
  const map: Record<string, string> = { ')':'(', ']':'[', '}':'{' }
  const stack: string[] = []
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c)
    else if (stack.pop() !== map[c]) return false
  }
  return stack.length === 0
}`,
    useWhen: 'Bracket/tag matching. DFS without recursion. Monotonic window problems. Expression evaluation.',
    interviewNote: 'Monotonic stack is the key advanced pattern: maintain a decreasing stack to solve Next Greater Element, Largest Rectangle in Histogram, and Trapping Rain Water all in O(n).',
  },
  {
    name: 'Queue & Deque',
    category: 'Linear',
    slug: 'queue',
    description: 'Queue: FIFO — First In, First Out. Deque (Double-Ended Queue): O(1) insert/delete at both ends. Essential for BFS and the sliding window maximum pattern.',
    ops: [
      { op: 'Enqueue / Push back', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Dequeue / Pop front', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Push front (deque)', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Pop back (deque)', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Peek', avg: 'O(1)', worst: 'O(1)' },
    ],
    template: `// BFS with queue (level-order):
function bfs(root: TreeNode | null): number[][] {
  if (!root) return []
  const queue: TreeNode[] = [root]
  const levels: number[][] = []
  while (queue.length) {
    const size = queue.length; const level: number[] = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    levels.push(level)
  }
  return levels
}

// Monotonic deque — sliding window maximum O(n):
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = []  // indices, decreasing values
  const result: number[] = []
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift()
    while (deque.length && nums[deque.at(-1)!] < nums[i]) deque.pop()
    deque.push(i)
    if (i >= k - 1) result.push(nums[deque[0]])
  }
  return result
}`,
    useWhen: 'BFS / level-order traversal. Sliding window maximum. Task scheduling. Producer-consumer patterns.',
    interviewNote: 'Monotonic deque gives O(n) sliding window maximum vs O(n·k) naive. In JS, Array.shift() is O(n) — for correctness in interviews it\'s fine; note the trade-off.',
  },
  {
    name: 'Hash Map & Set',
    category: 'Hash-Based',
    slug: 'hashmap-ds',
    description: 'O(1) average insert/delete/lookup using a hash function. Hash Set: unique keys. Collision resolution via chaining or open addressing. Worst case O(n) on adversarial keys.',
    ops: [
      { op: 'Insert', avg: 'O(1)', worst: 'O(n)' },
      { op: 'Delete', avg: 'O(1)', worst: 'O(n)' },
      { op: 'Lookup', avg: 'O(1)', worst: 'O(n)' },
      { op: 'Iterate all entries', avg: 'O(n)', worst: 'O(n)' },
    ],
    template: `// Frequency counter (group anagrams):
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>()
  for (const s of strs) {
    const key = [...s].sort().join('')
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(s)
  }
  return [...map.values()]
}

// Complement lookup (Two Sum in O(n)):
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>()  // val → index
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i]
    if (seen.has(comp)) return [seen.get(comp)!, i]
    seen.set(nums[i], i)
  }
  return []
}

// Sliding window with frequency map:
function lengthOfLongestSubstring(s: string): number {
  const freq = new Map<string, number>()
  let left = 0, max = 0
  for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) ?? 0) + 1)
    while (freq.get(s[right])! > 1) {
      freq.set(s[left], freq.get(s[left])! - 1)
      if (freq.get(s[left]) === 0) freq.delete(s[left])
      left++
    }
    max = Math.max(max, right - left + 1)
  }
  return max
}`,
    useWhen: 'O(1) lookup / membership. Counting frequencies. Grouping by key. Two-sum style complement search. De-duplication.',
    interviewNote: 'Hash maps turn O(n²) brute force into O(n). Always ask: "Can I precompute and look up?" Prefer Map over {} for non-string keys and guaranteed insertion order.',
  },
  {
    name: 'Binary Search Tree',
    category: 'Tree',
    slug: 'bst',
    description: 'Binary tree where left < node < right. O(log n) average for search/insert/delete. Degrades to O(n) when skewed. Self-balancing variants (AVL, Red-Black) guarantee O(log n) worst case.',
    ops: [
      { op: 'Search', avg: 'O(log n)', worst: 'O(n)' },
      { op: 'Insert', avg: 'O(log n)', worst: 'O(n)' },
      { op: 'Delete', avg: 'O(log n)', worst: 'O(n)' },
      { op: 'In-order traversal', avg: 'O(n)', worst: 'O(n)' },
      { op: 'Min / Max', avg: 'O(log n)', worst: 'O(n)' },
    ],
    template: `// In-order = sorted output:
function inorder(root: TreeNode | null, res: number[] = []): number[] {
  if (!root) return res
  inorder(root.left, res); res.push(root.val); inorder(root.right, res)
  return res
}

// Validate BST (min/max bound technique):
function isValidBST(
  root: TreeNode | null, min = -Infinity, max = Infinity
): boolean {
  if (!root) return true
  if (root.val <= min || root.val >= max) return false
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max)
}

// Lowest Common Ancestor (LCA) in BST:
function lcaBST(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode {
  if (p.val < root.val && q.val < root.val) return lcaBST(root.left!, p, q)
  if (p.val > root.val && q.val > root.val) return lcaBST(root.right!, p, q)
  return root  // split point = LCA
}`,
    useWhen: 'Maintain sorted dynamic set. Range queries. kth smallest/largest. Ordered statistics.',
    interviewNote: 'In-order traversal of BST = sorted array. Use min/max bounds for validation (not parent comparison). LCA in BST exploits ordering — no general LCA algorithm needed.',
  },
  {
    name: 'Heap / Priority Queue',
    category: 'Tree',
    slug: 'heap-ds',
    description: 'Complete binary tree satisfying heap property. Min-heap: parent ≤ children, peek min in O(1). Max-heap: parent ≥ children. Stored as an array: children of i are at 2i+1 and 2i+2.',
    ops: [
      { op: 'Peek min/max', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Insert', avg: 'O(log n)', worst: 'O(log n)' },
      { op: 'Extract min/max', avg: 'O(log n)', worst: 'O(log n)' },
      { op: 'Build from array', avg: 'O(n)', worst: 'O(n)' },
    ],
    template: `class MinHeap {
  private h: number[] = []
  push(v: number) {
    this.h.push(v); let i = this.h.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (this.h[p] <= this.h[i]) break
      ;[this.h[p], this.h[i]] = [this.h[i], this.h[p]]; i = p
    }
  }
  pop(): number {
    const top = this.h[0]; const last = this.h.pop()!
    if (this.h.length) {
      this.h[0] = last; let i = 0
      while (true) {
        let m = i, l = 2*i+1, r = 2*i+2
        if (l < this.h.length && this.h[l] < this.h[m]) m = l
        if (r < this.h.length && this.h[r] < this.h[m]) m = r
        if (m === i) break
        ;[this.h[m], this.h[i]] = [this.h[i], this.h[m]]; i = m
      }
    }
    return top
  }
  peek() { return this.h[0] }
  size() { return this.h.length }
}

// K largest: min-heap of size K
for (const n of nums) { heap.push(n); if (heap.size() > k) heap.pop() }
// heap now contains the K largest elements`,
    useWhen: 'K largest/smallest elements. Streaming median. Dijkstra\'s shortest path. Merge K sorted lists. Priority scheduling.',
    interviewNote: '"K largest" = min-heap of size K. "Streaming median" = two heaps (max-heap lower half + min-heap upper half), balance sizes to get O(log n) insert and O(1) median.',
  },
  {
    name: 'Trie',
    category: 'Tree',
    slug: 'trie-ds',
    description: 'Prefix tree. Each node = one character. Shared prefixes stored once. O(L) operations where L = string length, independent of number of words. Space-efficient for large shared-prefix dictionaries.',
    ops: [
      { op: 'Insert', avg: 'O(L)', worst: 'O(L)' },
      { op: 'Search (exact match)', avg: 'O(L)', worst: 'O(L)' },
      { op: 'Starts-with (prefix)', avg: 'O(L)', worst: 'O(L)' },
    ],
    template: `class TrieNode {
  children = new Map<string, TrieNode>()
  isEnd = false
}

class Trie {
  root = new TrieNode()

  insert(word: string) {
    let node = this.root
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode())
      node = node.children.get(ch)!
    }
    node.isEnd = true
  }

  search(word: string): boolean {
    return this.traverse(word)?.isEnd ?? false
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null
  }

  private traverse(s: string): TrieNode | null {
    let node = this.root
    for (const ch of s) {
      if (!node.children.has(ch)) return null
      node = node.children.get(ch)!
    }
    return node
  }
}`,
    useWhen: 'Autocomplete / prefix matching. Spell checking. Word Search on a grid (DFS + Trie). IP routing (longest prefix match).',
    interviewNote: 'Tries are the go-to for "Design Autocomplete" system design questions. Combined with DFS, solves Word Search II in O(rows × cols × L) vs O(words × rows × cols × L) brute force.',
  },
  {
    name: 'Graph',
    category: 'Graph',
    slug: 'graph-ds',
    description: 'Nodes (vertices) connected by edges. Directed or undirected, weighted or unweighted. Adjacency list: space-efficient for sparse graphs (O(V+E)). Adjacency matrix: O(1) edge lookup at O(V²) space.',
    ops: [
      { op: 'Add edge (adj list)', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Check edge (adj matrix)', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Get neighbors (adj list)', avg: 'O(degree)', worst: 'O(V)' },
      { op: 'BFS / DFS traversal', avg: 'O(V+E)', worst: 'O(V+E)' },
      { op: 'Topological sort', avg: 'O(V+E)', worst: 'O(V+E)' },
    ],
    template: `// Topological sort (Kahn's / BFS):
function topoSort(n: number, edges: number[][]): number[] {
  const graph = new Map<number, number[]>()
  const inDegree = new Array(n).fill(0)
  for (const [u, v] of edges) {
    if (!graph.has(u)) graph.set(u, [])
    graph.get(u)!.push(v); inDegree[v]++
  }
  const queue = []
  for (let i = 0; i < n; i++) if (inDegree[i] === 0) queue.push(i)
  const order: number[] = []
  while (queue.length) {
    const node = queue.shift()!; order.push(node)
    for (const nb of graph.get(node) ?? []) {
      if (--inDegree[nb] === 0) queue.push(nb)
    }
  }
  return order.length === n ? order : []  // empty = cycle
}

// Grid BFS (4-directional):
const DIRS = [[0,1],[0,-1],[1,0],[-1,0]]
function bfsGrid(grid: number[][], sr: number, sc: number) {
  const rows = grid.length, cols = grid[0].length
  const visited = new Set<string>(); visited.add(\`\${sr},\${sc}\`)
  const queue = [[sr, sc]]
  while (queue.length) {
    const [r, c] = queue.shift()!
    for (const [dr, dc] of DIRS) {
      const nr = r+dr, nc = c+dc, key = \`\${nr},\${nc}\`
      if (nr>=0 && nr<rows && nc>=0 && nc<cols && !visited.has(key) && grid[nr][nc]===1) {
        visited.add(key); queue.push([nr, nc])
      }
    }
  }
}`,
    useWhen: 'Any relationship problem: social networks, dependencies, routing, connected components, shortest paths. Grid problems are disguised graphs.',
    interviewNote: 'BFS for shortest path (unweighted). DFS for connectivity / cycle detection. Topological sort for dependency ordering. Grid cells are nodes — treat 2D arrays as implicit adjacency lists.',
  },
]

function randomArray(size = 16) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

// ── Component ────────────────────────────────────────────────────────────────
type MainTab = 'visualizer' | 'patterns' | 'complexity' | 'datastructs' | 'challenges' | 'frontend'

export default function CodingPage() {
  const [mainTab, setMainTab] = useState<MainTab>('visualizer')
  const [algo, setAlgo] = useState<Algo>('Bubble Sort')
  const [baseArray] = useState(() => randomArray())
  const [steps, setSteps] = useState<SortStep[]>([])
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(120)
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(patterns[0])
  const [expandedPattern, setExpandedPattern] = useState<string | null>(patterns[0].slug)
  const [selectedDS, setSelectedDS] = useState<DS>(dataStructures[0])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const generateSteps = useCallback((a: Algo, arr: number[]) => {
    if (a === 'Bubble Sort') return bubbleSortSteps(arr)
    if (a === 'Selection Sort') return selectionSortSteps(arr)
    return insertionSortSteps(arr)
  }, [])

  useEffect(() => {
    const s = generateSteps(algo, baseArray)
    setSteps(s)
    setStepIdx(0)
    setPlaying(false)
  }, [algo, baseArray, generateSteps])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev }
          return prev + 1
        })
      }, speed)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, steps.length, speed])

  const currentStep = steps[stepIdx] ?? { array: baseArray, comparing: [], sorted: [], swapped: false }
  const maxVal = Math.max(...currentStep.array)

  const reset = () => { setStepIdx(0); setPlaying(false) }

  const barColor = (i: number) => {
    if (currentStep.sorted.includes(i)) return 'bg-green-500'
    if (currentStep.comparing.includes(i)) return currentStep.swapped ? 'bg-red-500' : 'bg-yellow-400'
    return 'bg-blue-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">Coding Interview Mastery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Interactive visualizer · 10 essential patterns · Big O reference</p>
        </motion.div>

        <QuizLauncher sectionId="coding" title="Coding" questions={codingQuestions} />

        {/* Main Tabs */}
        <div className="mb-8 flex gap-2 rounded-xl bg-white p-1 shadow dark:bg-gray-800 overflow-x-auto">
          {([['visualizer', Zap, 'Algorithm Visualizer'], ['patterns', GitBranch, 'DSA Patterns'], ['complexity', Layers, 'Big O Reference'], ['datastructs', BookOpen, 'Data Structures'], ['challenges', Trophy, 'Challenges'], ['frontend', Code, 'JS/TS/React']] as const).map(([t, Icon, label]) => (
            <button key={t} onClick={() => setMainTab(t)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${mainTab === t ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Sorting Visualizer ── */}
          {mainTab === 'visualizer' && (
            <motion.div key="vis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              id="sorting-algorithms">
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                {/* Algorithm selector */}
                <div className="mb-6 flex flex-wrap gap-3">
                  {ALGOS.map(a => (
                    <button key={a} onClick={() => setAlgo(a)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${algo === a ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {a}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="mb-4 flex flex-wrap gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-blue-500" />Unsorted</span>
                  <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-yellow-400" />Comparing</span>
                  <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-red-500" />Swapping</span>
                  <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-green-500" />Sorted</span>
                </div>

                {/* Bars */}
                <div className="flex h-48 items-end gap-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                  {currentStep.array.map((val, i) => (
                    <motion.div key={i} className={`flex-1 rounded-t transition-colors duration-150 ${barColor(i)}`}
                      animate={{ height: `${(val / maxVal) * 100}%` }} transition={{ duration: 0.15 }}>
                      {currentStep.array.length <= 20 && (
                        <span className="flex justify-center pt-0.5 text-[9px] font-bold text-white opacity-80">{val}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-gray-500">
                    <span>Step {stepIdx + 1} / {steps.length}</span>
                    <span>{Math.round((stepIdx / Math.max(steps.length - 1, 1)) * 100)}% complete</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
                    <motion.div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                      animate={{ width: `${(stepIdx / Math.max(steps.length - 1, 1)) * 100}%` }} />
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button onClick={reset} className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button onClick={() => setStepIdx(i => Math.max(0, i - 1))} disabled={stepIdx === 0}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm disabled:opacity-40 hover:bg-gray-200 dark:bg-gray-700">
                    ← Prev
                  </button>
                  <button onClick={() => setPlaying(p => !p)}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                    {playing ? <><Pause className="h-4 w-4" />Pause</> : <><Play className="h-4 w-4" />Play</>}
                  </button>
                  <button onClick={() => setStepIdx(i => Math.min(steps.length - 1, i + 1))} disabled={stepIdx >= steps.length - 1}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm disabled:opacity-40 hover:bg-gray-200 dark:bg-gray-700">
                    Next →
                  </button>
                  <div className="ml-auto flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Speed</span>
                    {[300, 150, 80, 30].map(s => (
                      <button key={s} onClick={() => setSpeed(s)}
                        className={`rounded px-2 py-1 text-xs ${speed === s ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        {s === 300 ? '0.5x' : s === 150 ? '1x' : s === 80 ? '2x' : '4x'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info cards */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', note: 'Simple, stable. Good teaching tool, bad in practice.' },
                    { label: 'Selection Sort', time: 'O(n²)', space: 'O(1)', note: 'Minimizes swaps. Not stable. Slightly better than bubble.' },
                    { label: 'Insertion Sort', time: 'O(n²) worst, O(n) best', space: 'O(1)', note: 'Excellent for nearly-sorted data. Used in Timsort internals.' },
                  ].map(info => (
                    <div key={info.label} className={`rounded-xl p-4 ${algo === info.label ? 'bg-orange-50 ring-2 ring-orange-300 dark:bg-orange-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{info.label}</p>
                      <p className="text-xs text-gray-500 mt-1">Time: {info.time}</p>
                      <p className="text-xs text-gray-500">Space: {info.space}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{info.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DSA Patterns ── */}
          {mainTab === 'patterns' && (
            <motion.div key="patterns" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Pattern list */}
                <div className="space-y-2">
                  {patterns.map(p => (
                    <button key={p.slug} onClick={() => { setSelectedPattern(p); setExpandedPattern(p.slug) }}
                      className={`w-full rounded-xl px-4 py-3 text-left transition-all ${selectedPattern.slug === p.slug ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'bg-white text-gray-700 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'}`}
                      id={`${p.slug}-pattern`}>
                      <p className="font-bold">{p.name}</p>
                      <p className={`mt-0.5 text-xs ${selectedPattern.slug === p.slug ? 'text-orange-100' : 'text-gray-500'}`}>{p.complexity}</p>
                    </button>
                  ))}
                </div>

                {/* Pattern detail */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedPattern.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                      <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{selectedPattern.name}</h2>
                      <p className="mb-4 text-sm font-medium text-orange-500">{selectedPattern.complexity}</p>

                      <div className="mb-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">When to use</p>
                        <p className="text-sm text-amber-800 dark:text-amber-300">{selectedPattern.when}</p>
                      </div>

                      <div className="mb-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Code Template</p>
                        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-green-300 leading-relaxed">
                          <code>{selectedPattern.template}</code>
                        </pre>
                      </div>

                      <div className="mb-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Classic examples</p>
                        <p className="text-sm text-blue-800 dark:text-blue-300">{selectedPattern.example}</p>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Practice Problems</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPattern.problems.map(prob => (
                            <span key={prob} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">{prob}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Big O Reference ── */}
          {mainTab === 'complexity' && (
            <motion.div key="complexity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              id="big-o">
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Big O Complexity Reference</h2>

                {/* Visual scale */}
                <div className="mb-8">
                  <p className="mb-3 text-sm font-medium text-gray-500">Relative performance for n = 1,000</p>
                  <div className="space-y-3">
                    {complexityReference.map((c, i) => {
                      const widths = [4, 10, 25, 45, 70, 88, 98]
                      return (
                        <div key={c.notation} className="flex items-center gap-3">
                          <span className="w-24 text-right text-sm font-mono font-bold text-gray-700 dark:text-gray-300">{c.notation}</span>
                          <div className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700 h-6 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${widths[i]}%` }} transition={{ delay: i * 0.08, duration: 0.6 }}
                              className={`h-6 rounded-full ${c.color} flex items-center pl-3`}>
                              <span className="text-xs font-medium text-white whitespace-nowrap">{c.name}</span>
                            </motion.div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Data structure complexity table */}
                <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Data Structure Operations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Structure</th>
                        <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Access</th>
                        <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Search</th>
                        <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Insert</th>
                        <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Delete</th>
                        <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">Space</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {[
                        { name: 'Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', del: 'O(n)', space: 'O(n)' },
                        { name: 'Linked List', access: 'O(n)', search: 'O(n)', insert: 'O(1)', del: 'O(1)', space: 'O(n)' },
                        { name: 'Hash Table', access: 'N/A', search: 'O(1)*', insert: 'O(1)*', del: 'O(1)*', space: 'O(n)' },
                        { name: 'Binary Search Tree', access: 'O(log n)*', search: 'O(log n)*', insert: 'O(log n)*', del: 'O(log n)*', space: 'O(n)' },
                        { name: 'Heap (Binary)', access: 'N/A', search: 'O(n)', insert: 'O(log n)', del: 'O(log n)', space: 'O(n)' },
                        { name: 'Stack / Queue', access: 'O(n)', search: 'O(n)', insert: 'O(1)', del: 'O(1)', space: 'O(n)' },
                        { name: 'Trie', access: 'O(k)', search: 'O(k)', insert: 'O(k)', del: 'O(k)', space: 'O(n·k)' },
                      ].map(row => (
                        <tr key={row.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                          <td className="py-2.5 font-medium text-gray-900 dark:text-white">{row.name}</td>
                          {[row.access, row.search, row.insert, row.del, row.space].map((val, j) => (
                            <td key={j} className={`py-2.5 text-center font-mono text-xs ${val.includes('1)') ? 'text-green-600 dark:text-green-400 font-bold' : val.includes('log') ? 'text-yellow-600 dark:text-yellow-400' : val.startsWith('O(n') ? 'text-red-500' : 'text-gray-500'}`}>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-xs text-gray-400">* Average case</p>
                </div>

                {/* Quick tips */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                    <h4 className="mb-2 font-bold text-green-800 dark:text-green-300">Signs of a Good Solution</h4>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                      <li>• Uses a hash map to reduce nested loops to O(n)</li>
                      <li>• Recognizes sorted data → binary search opportunity</li>
                      <li>• Swaps recursion for iteration with explicit stack</li>
                      <li>• Identifies overlapping subproblems → DP</li>
                      <li>• Uses two pointers on sorted arrays instead of O(n²)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                    <h4 className="mb-2 font-bold text-red-800 dark:text-red-300">Common Interview Mistakes</h4>
                    <ul className="space-y-1 text-sm text-red-700 dark:text-red-400">
                      <li>• Jumping to code before clarifying constraints</li>
                      <li>• Not considering edge cases: empty, single element, negatives</li>
                      <li>• Missing the O(n log n) vs O(n²) opportunity</li>
                      <li>• Not explaining trade-offs when asked for optimization</li>
                      <li>• Confusing worst-case with average-case complexity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Data Structures ── */}
          {mainTab === 'datastructs' && (
            <motion.div key="datastructs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Left: DS list grouped by category */}
                <div className="space-y-5">
                  {(['Linear', 'Hash-Based', 'Tree', 'Graph'] as const).map(cat => (
                    <div key={cat}>
                      <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{cat}</p>
                      <div className="space-y-1">
                        {dataStructures.filter(ds => ds.category === cat).map(ds => (
                          <button key={ds.slug} onClick={() => setSelectedDS(ds)}
                            className={`w-full rounded-xl px-4 py-3 text-left transition-all ${selectedDS.slug === ds.slug ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'bg-white text-gray-700 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'}`}
                            id={`${ds.slug}-ds`}>
                            <p className="font-bold text-sm">{ds.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Detail panel */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedDS.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">

                      <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{selectedDS.name}</h2>

                      {/* Description */}
                      <div className="mb-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selectedDS.description}</p>
                      </div>

                      {/* Operations Table */}
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Operations</p>
                        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                                <th className="py-2 pl-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Operation</th>
                                <th className="py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400">Average</th>
                                <th className="py-2 pr-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400">Worst</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                              {selectedDS.ops.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                  <td className="py-2 pl-4 text-sm text-gray-800 dark:text-gray-200">{row.op}</td>
                                  <td className={`py-2 text-center font-mono text-xs font-bold ${row.avg.includes('(1)') ? 'text-green-600 dark:text-green-400' : row.avg.includes('log') ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500'}`}>{row.avg}</td>
                                  <td className={`py-2 pr-4 text-center font-mono text-xs ${row.worst.includes('(1)') ? 'text-green-600 dark:text-green-400' : row.worst.includes('log') ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500'}`}>{row.worst}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Code Template */}
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Code Template</p>
                        <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-green-300 leading-relaxed">
                          <code>{selectedDS.template}</code>
                        </pre>
                      </div>

                      {/* Use When + Interview Note */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Use when</p>
                          <p className="text-sm text-amber-800 dark:text-amber-300">{selectedDS.useWhen}</p>
                        </div>
                        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Interview insight</p>
                          <p className="text-sm text-blue-800 dark:text-blue-300">{selectedDS.interviewNote}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Challenges Tab ── */}
          {mainTab === 'challenges' && (
            <motion.div key="challenges" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Hero */}
              <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-white/20 p-4">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">16 Curated TypeScript Challenges</h2>
                    <p className="mt-1 text-orange-100">Full solutions · Step-by-step Q&A · Time/Space complexity · Common mistakes</p>
                  </div>
                </div>
              </div>

              {/* Why SDMs need to code */}
              <div className="mb-6 rounded-2xl bg-blue-50 p-6 dark:bg-blue-900/20">
                <h3 className="mb-3 font-bold text-blue-800 dark:text-blue-300">Why FAANG Asks SDMs/EMs to Code</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Validates you can have credible technical conversations with your team',
                    'Demonstrates you understand what you\'re asking engineers to build',
                    'Shows you can break down problems — a core leadership skill',
                    'Typically 1-2 rounds at Easy-Medium difficulty (not IC-level hard)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty cards */}
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Easy', count: 5, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50 dark:bg-green-900/20', problems: ['Two Sum', 'Valid Parentheses', 'Max Subarray', 'Buy/Sell Stock', 'Climbing Stairs'], slug: 'Easy' },
                  { label: 'Medium', count: 7, color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', problems: ['Longest Substring', '3Sum', 'Coin Change', 'Number of Islands', 'LRU Cache', '+2 more'], slug: 'Medium' },
                  { label: 'Hard', count: 4, color: 'from-red-500 to-pink-600', bg: 'bg-red-50 dark:bg-red-900/20', problems: ['Trapping Rain Water', 'Merge K Sorted Lists', 'Min Window Substr', 'Word Ladder'], slug: 'Hard' },
                ].map(card => (
                  <div key={card.label} className={`rounded-2xl ${card.bg} p-5 shadow`}>
                    <div className={`mb-3 inline-block rounded-xl bg-gradient-to-r ${card.color} px-3 py-1 text-sm font-bold text-white`}>
                      {card.label} · {card.count} problems
                    </div>
                    <ul className="mb-4 space-y-1">
                      {card.problems.map((p, i) => (
                        <li key={i} className="text-xs text-gray-600 dark:text-gray-400">• {p}</li>
                      ))}
                    </ul>
                    <Link href={`/coding/challenges`}>
                      <button className={`w-full rounded-lg bg-gradient-to-r ${card.color} py-2 text-sm font-medium text-white hover:opacity-90`}>
                        Practice {card.label}
                      </button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Top patterns */}
              <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">Top Patterns Asked at FAANG (SDM Level)</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { name: 'HashMap / Set', freq: 'Very High', desc: 'Two Sum, Group Anagrams, LRU Cache — O(1) lookup is always the goal' },
                    { name: 'Sliding Window', freq: 'High', desc: 'Subarray / substring problems — classic "expand right, shrink left"' },
                    { name: 'Two Pointers', freq: 'High', desc: 'Sorted arrays, pair problems — eliminates nested loops' },
                    { name: 'BFS / DFS', freq: 'High', desc: 'Graph traversal, trees, Number of Islands, Word Ladder' },
                    { name: 'Dynamic Programming', freq: 'Medium', desc: 'Coin Change, Climbing Stairs — recognize overlapping subproblems' },
                    { name: 'Monotonic Stack', freq: 'Medium', desc: 'Next greater element, histograms, temperature problems' },
                  ].map(p => (
                    <div key={p.name} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                      <div className="shrink-0">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.freq === 'Very High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : p.freq === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                          {p.freq}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/coding/challenges">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 font-medium text-white shadow-lg hover:opacity-90">
                      <Trophy className="h-5 w-5" />
                      Open All 16 Challenges
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Frontend JS/TS/React ── */}
          {mainTab === 'frontend' && (
            <motion.div key="frontend" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Frontend Interview: JS / TypeScript / React</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Core frontend concepts frequently tested in FAANG interviews for full-stack and frontend-leaning roles.</p>

                <div className="mb-8">
                  <h3 className="mb-4 font-bold text-gray-900 dark:text-white">JavaScript Core Concepts</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Closures',
                        tag: 'Very Frequently Asked',
                        tagColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                        explanation: 'A closure is a function that retains access to its lexical scope even when executed outside that scope. The inner function "closes over" the variables of its outer function.',
                        code: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const increment = outer();
console.log(increment()); // 1
console.log(increment()); // 2  ← still remembers count`,
                      },
                      {
                        title: 'Promises & Async/Await',
                        tag: 'Frequently Asked',
                        tagColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
                        explanation: 'Promises represent eventual completion or failure of async operations. async/await is syntactic sugar that makes promise chains readable as synchronous-looking code.',
                        code: `// Promise-based
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data received"), 2000);
  });
}

// async/await (preferred)
async function execute() {
  try {
    const data = await fetchData();
    console.log(data); // "Data received"
  } catch (err) {
    console.error(err);
  }
}`,
                      },
                      {
                        title: 'Event Loop',
                        tag: 'Frequently Asked',
                        tagColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
                        explanation: 'JavaScript is single-threaded. The event loop manages execution: synchronous code runs first, then microtasks (Promise callbacks), then macrotasks (setTimeout, setInterval).',
                        code: `console.log('1 - Sync');

setTimeout(() => console.log('3 - Macrotask'), 0);

Promise.resolve().then(() => console.log('2 - Microtask'));

console.log('1 - Sync end');
// Order: "1 - Sync", "1 - Sync end", "2 - Microtask", "3 - Macrotask"`,
                      },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900">
                          <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${item.tagColor}`}>{item.tag}</span>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.explanation}</p>
                          <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-green-300 leading-relaxed">
                            <code>{item.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="mb-4 font-bold text-gray-900 dark:text-white">TypeScript Key Concepts</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Type System',
                        code: `function add(a: number, b: number): number {
  return a + b;
}
// add(1, '2') → compile error ✓`,
                        note: 'TypeScript catches type mismatches at compile time, not runtime.',
                      },
                      {
                        title: 'Interface vs Type',
                        code: `interface User { name: string; age: number; }
// Interfaces: extendable, can be merged

type UserType = { name: string; age: number; }
// Types: can use unions, intersections`,
                        note: 'Use interface for objects/classes. Use type for unions, intersections, or aliases.',
                      },
                      {
                        title: 'Generics',
                        code: `function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>('Hello');
// result is typed as string ✓`,
                        note: 'Generics enable reusable, type-safe components that work with any data type.',
                      },
                      {
                        title: 'OOP with Access Modifiers',
                        code: `class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  public speak() {
    console.log(\`\${this.name} speaks\`);
  }
}`,
                        note: 'TypeScript adds public, private, protected, and readonly to JavaScript classes.',
                      },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        <pre className="overflow-x-auto rounded-lg bg-gray-800 p-3 text-xs text-green-300 leading-relaxed mb-2">
                          <code>{item.code}</code>
                        </pre>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-bold text-gray-900 dark:text-white">React Core Concepts</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: 'Hooks: useState & useEffect',
                        code: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, []); // empty deps = run once on mount

  return <div>{count}</div>;
}`,
                        note: 'useEffect with empty deps = componentDidMount. Return fn = componentWillUnmount.',
                      },
                      {
                        title: 'Performance: React.memo & useCallback',
                        code: `const Child = React.memo(({ value }) => {
  console.log('renders:', value);
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(
    () => setCount(c => c + 1), []
  );
  return <Child value={count} onClick={handleClick} />;
}`,
                        note: 'React.memo prevents re-render if props unchanged. useCallback stabilizes function references.',
                      },
                      {
                        title: 'Context API (State Management)',
                        code: `const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}`,
                        note: 'Context avoids prop drilling. For complex state, combine with useReducer or use Redux.',
                      },
                      {
                        title: 'SSR vs SSG in Next.js',
                        code: `// SSR: runs on every request
export async function getServerSideProps() {
  const data = await fetchFromDB();
  return { props: { data } };
}

// SSG: runs at build time
export async function getStaticProps() {
  const data = await fetchFromAPI();
  return { props: { data } };
}

// ISR: SSG + revalidate on interval
// return { props: { data }, revalidate: 60 }`,
                        note: 'SSR = fresh data, slower. SSG = fast, stale. ISR = hybrid. Choose based on data freshness needs.',
                      },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        <pre className="overflow-x-auto rounded-lg bg-gray-800 p-3 text-xs text-green-300 leading-relaxed mb-2">
                          <code>{item.code}</code>
                        </pre>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
