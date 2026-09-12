export type Pattern = {
  id: string
  name: string
  when: string
  template: string
  example: string
  problems: string[]
  complexity: string
  /**
   * What an engineering manager loop is listening for while you solve this
   * pattern, as opposed to what an IC loop grades.
   */
  managerAngle: string
}

export const patterns: Pattern[] = [
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    when: 'Contiguous subarray or substring problems. Find the max, min, or count in a window of size k, or a variable-size window that satisfies a condition.',
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
    example: 'Max sum subarray of size k, longest substring with k distinct chars, minimum window substring.',
    problems: ['Maximum Sum Subarray of Size K', 'Longest Substring Without Repeating Characters', 'Minimum Window Substring', 'Longest Subarray with Ones after Replacement'],
    complexity: 'Time: O(n), space: O(1) or O(k)',
    managerAngle:
      'Say out loud why the window is valid before you write the shrink condition, because the interviewer is grading whether your team would understand your reasoning. Name the alternative you rejected, usually the O(n squared) recheck of every window. Then test the two windows that break people: an empty input and a window larger than the array.',
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    when: 'Sorted array problems. Find pairs, triplets, or partition elements. Opposite-direction (left and right) or same-direction (fast and slow).',
    template: `function twoPointers(arr) {
  let left = 0, right = arr.length - 1

  while (left < right) {
    const sum = arr[left] + arr[right]

    if (sum === target) {
      // found: record result
      left++; right--
    } else if (sum < target) {
      left++   // need larger value
    } else {
      right--  // need smaller value
    }
  }
}`,
    example: 'Two Sum II (sorted), 3Sum, container with most water, trapping rain water.',
    problems: ['Two Sum II - Input Array Is Sorted', '3Sum', 'Container With Most Water', 'Trapping Rain Water', 'Remove Duplicates from Sorted Array'],
    complexity: 'Time: O(n) per pass; O(n\u00b2) when nested in a loop, as in 3Sum. Space: O(1)',
    managerAngle:
      'The interviewer wants to hear you notice that the input is sorted, and say that the sort is what buys the pointer walk. Talk about the cost you are paying if you sort yourself, O(n log n) up front. Say how you will handle duplicates before you code the skip, because that is the bug they expect a manager to anticipate.',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    when: 'Sorted data, or when the search space can be halved. Also applies to "find the minimum or maximum X such that condition(X) is true."',
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
    example: 'Binary search on the answer: capacity to ship packages, Koko eating bananas, minimum days to make m bouquets.',
    problems: ['Binary Search', 'Search in Rotated Sorted Array', 'Find Minimum in Rotated Sorted Array', 'Koko Eating Bananas', 'Capacity To Ship Packages Within D Days'],
    complexity: 'Time: O(log n), space: O(1)',
    managerAngle:
      'State your invariant in one sentence, something like the answer is always inside lo to hi, and then say which side you discard and why. Managers are listening for whether you can define a boundary precisely, since that is the same skill as writing a clear spec. Test the one-element and not-found cases without being asked.',
  },
  {
    id: 'bfs',
    name: 'BFS / Level-Order',
    when: 'Shortest path in an unweighted graph or grid. Level-by-level tree traversal. Spreading or infection problems.',
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
    example: 'Shortest path in a maze, binary tree level order traversal, rotting oranges, word ladder.',
    problems: ['Binary Tree Level Order Traversal', 'Rotting Oranges', 'Word Ladder', 'Shortest Path in Binary Matrix', 'Number of Islands'],
    complexity: 'Time: O(V + E), space: O(V)',
    managerAngle:
      'Explain why breadth first and not depth first, in terms of the shortest path guarantee, not by habit. Mention the memory cost of the queue, because a manager should be the person in the room who names the resource trade-off. Then talk about how you would handle a grid too large to hold in memory, even briefly.',
  },
  {
    id: 'dfs',
    name: 'DFS / Backtracking',
    when: 'Explore all paths. Generate all combinations or permutations. Find if a path exists. Tree or graph traversal without a shortest-path constraint.',
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
    example: 'All permutations and subsets, N-Queens, Sudoku solver, word search, path sum.',
    problems: ['Subsets', 'Permutations', 'Combination Sum', 'Word Search', 'N-Queens'],
    complexity: 'Time: O(2^n) to O(n!), space: O(n) recursion depth',
    managerAngle:
      'Recursion depth is the tradeoff to name here: say roughly when the stack becomes a real risk and what the iterative version would cost you in readability. Narrate the choose, explore, unchoose loop as you write it so the interviewer can follow the state. Testing instinct shows up as pruning: say which branches you cut and why.',
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    when: 'Optimal substructure plus overlapping subproblems. "Maximum, minimum, or count number of ways" problems. Choices at each step affect future choices.',
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
    example: 'Fibonacci, coin change, longest common subsequence, 0/1 knapsack, house robber.',
    problems: ['Climbing Stairs', 'House Robber', 'Coin Change', 'Longest Common Subsequence', 'Edit Distance', 'Longest Increasing Subsequence'],
    complexity: 'Time: O(n²) typical, space: O(n) to O(n²)',
    managerAngle:
      "Define the state and the recurrence in words before any code, because a manager who cannot explain a model cannot review someone else's. Say why memoised recursion or a bottom-up table, and what each costs in space. Then walk one small input through your table by hand, which is the single strongest testing signal in this pattern.",
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    when: 'K largest or smallest elements. Streaming data. Merge K sorted lists. Dijkstra. Problems requiring the current min or max efficiently.',
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
    example: 'K closest points to origin, top K frequent elements, merge K sorted lists, task scheduler.',
    problems: ['Kth Largest Element in an Array', 'Top K Frequent Elements', 'K Closest Points to Origin', 'Merge K Sorted Lists', 'Task Scheduler'],
    complexity: 'Time: O(n log k), space: O(k)',
    managerAngle:
      'Justify the heap against the simpler option: sorting everything is O(n log n) and this is O(n log k), so say what k is in the real input. Managers listen for whether you reach for the library rather than hand-rolling a heap under time pressure. Mention the streaming case, where you cannot hold all n items, since that is the production version of this problem.',
  },
  {
    id: 'hashmap',
    name: 'Hash Map / Set',
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
    example: 'Two Sum, group anagrams, longest consecutive sequence, subarray sum equals K.',
    problems: ['Two Sum', 'Group Anagrams', 'Top K Frequent Elements', 'Longest Consecutive Sequence', 'Subarray Sum Equals K'],
    complexity: 'Time: O(n) average, space: O(n)',
    managerAngle:
      'Name the space you are trading for the time, because O(n) extra memory is a real cost a manager is expected to own. Say that O(1) is the average case and what degrades it, collisions and bad hash keys. Then test the duplicate-key and empty-input cases, which is where most quick hash map answers break.',
  },
  {
    id: 'mono-stack',
    name: 'Monotonic Stack',
    when: '"Next greater or smaller element" problems. Histogram problems. Problems where you need the nearest element satisfying a condition to the left or right.',
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
    example: 'Next greater element, largest rectangle in histogram, daily temperatures, trapping rain water.',
    problems: ['Next Greater Element I', 'Daily Temperatures', 'Largest Rectangle in Histogram', 'Trapping Rain Water'],
    complexity: 'Time: O(n) amortized, space: O(n)',
    managerAngle:
      'This pattern looks like magic, so the manager loop is mostly grading your explanation: say what the elements still on the stack are waiting for. Justify the amortised O(n) claim, that each index is pushed and popped once. Then dry-run a short array out loud, because if you cannot narrate it you cannot review it.',
  },
  {
    id: 'union-find',
    name: 'Union Find (DSU)',
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
    example: 'Number of provinces, redundant connection, accounts merge, number of islands (alternative).',
    problems: ['Number of Provinces', 'Redundant Connection', 'Accounts Merge', 'Graph Valid Tree'],
    complexity: 'Time: O(α(n)) ≈ O(1) per op, space: O(n)',
    managerAngle:
      'Say what the structure buys you over repeated BFS, and be honest that it is harder for a reader to follow. Path compression and union by rank are the two lines to explain rather than just type, since a manager should be able to defend the complexity in review. Testing instinct here is the cycle case: show the union that returns false.',
  },
]

export const patternIds: readonly string[] = patterns.map((p) => p.id)
