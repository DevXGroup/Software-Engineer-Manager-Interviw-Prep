'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ChevronUp, ArrowLeft, Trophy, Clock, MemoryStick,
  Lightbulb, AlertTriangle, MessageSquare, Code, BookOpen, Tag
} from 'lucide-react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────
type Difficulty = 'Easy' | 'Medium' | 'Hard'
type Pattern = string

type QA = { q: string; a: string }

type Challenge = {
  id: number
  leetcode: number
  title: string
  difficulty: Difficulty
  patterns: Pattern[]
  description: string
  constraints: string[]
  examples: { input: string; output: string; explanation?: string }[]
  approach: string
  qa: QA[]
  solution: string
  timeComplexity: string
  spaceComplexity: string
  complexityExplanation: string
  insight: string
  mistakes: string[]
}

// ── Challenge Data ─────────────────────────────────────────────────────────
const challenges: Challenge[] = [
  // ── EASY ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    leetcode: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    patterns: ['Hash Map', 'Array'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Only one valid answer exists'],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    approach:
      'Use a HashMap to store each number\'s index as you iterate. For every element, check if its complement (target - current) already exists in the map. This avoids the O(n²) brute force of nested loops.',
    qa: [
      { q: 'How would you start thinking about this problem?', a: 'First clarify: can there be duplicate values? Can I use the same element twice? The problem says exactly one solution exists and we can\'t reuse elements. That tells me I need to track which index I\'ve seen, not just which value.' },
      { q: 'What\'s the brute force approach?', a: 'Nested loops — for each element i, scan all j > i checking if nums[i] + nums[j] === target. That\'s O(n²) time. The interviewer will expect you to optimize this.' },
      { q: 'How do you get to O(n)?', a: 'Instead of searching for the complement after the fact, I check for it as I build the map. When I\'m at index i, I ask: "Does target - nums[i] already exist in my map?" If yes, I found the pair. If no, I store nums[i] → i and move on. One pass, O(1) lookup each time.' },
      { q: 'Why a Map instead of an object?', a: 'Both work in JS/TS, but Map handles any key type (including negative numbers as keys) cleanly, has O(1) get/set, and is semantically clearer. For this problem, an object would also work since keys will be stringified numbers.' },
    ],
    solution: `function twoSum(nums: number[], target: number): number[] {
  // Map: value → index
  const seen = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]

    if (seen.has(complement)) {
      return [seen.get(complement)!, i]
    }

    seen.set(nums[i], i)
  }

  return [] // guaranteed to have a solution per constraints
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    complexityExplanation: 'Single pass through the array (O(n)). The HashMap stores at most n entries (O(n) space). Each lookup and insertion is O(1) average.',
    insight: 'The key insight is that "finding a pair that sums to X" is equivalent to "for each element, check if its complement exists." Storing seen elements in a HashMap converts the O(n) inner search to O(1), collapsing O(n²) to O(n).',
    mistakes: [
      'Using the same index twice: seen.get(nums[i]) might return i itself if nums[i] * 2 === target — always check index, not just value.',
      'Returning values instead of indices (read the problem carefully).',
      'Using indexOf() inside the loop — that\'s O(n) per lookup = O(n²) total.',
    ],
  },
  {
    id: 2,
    leetcode: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    patterns: ['Stack', 'String'],
    description:
      'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.',
    constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of parentheses only \'()[]{}\''],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false', explanation: 'Brackets interleave — invalid' },
    ],
    approach:
      'Use a stack. Push opening brackets onto the stack. When you see a closing bracket, check if the top of the stack is the matching opener. If not, or if the stack is empty, return false. At the end, the stack must be empty.',
    qa: [
      { q: 'What data structure comes to mind first?', a: 'A stack — because parentheses have LIFO matching behavior. The most recently opened bracket must be the next one closed. That\'s exactly what a stack models.' },
      { q: 'Walk me through "([)]" — why does it fail?', a: 'Stack after "(": ["("]. After "[": ["(", "["]. When we see ")", we check the top — it\'s "[", not "(". Mismatch → return false. The stack correctly catches interleaved brackets that a simple counter would miss.' },
      { q: 'Why a counter (tracking opens minus closes) doesn\'t work?', a: 'A counter like "([)]" would count 2 opens and 2 closes and declare it valid. But that ignores order and type. The stack enforces both ordering and type matching simultaneously.' },
      { q: 'Edge cases to consider?', a: 'Empty string (return true), string of all openers like "(((" (stack non-empty at end → false), string starting with a closer like "]" (stack empty when checking → false), odd-length string (can immediately return false — optimization).' },
    ],
    solution: `function isValid(s: string): boolean {
  const stack: string[] = []
  const pairs: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
  }

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char)
    } else {
      // It's a closing bracket
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false
      }
      stack.pop()
    }
  }

  return stack.length === 0 // all openers must be matched
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    complexityExplanation: 'One pass through the string (O(n)). Stack holds at most n/2 characters in the worst case (all opening brackets) — O(n) space.',
    insight: 'The map from closing → opening bracket is the elegant trick that avoids a series of if/else checks. The stack naturally enforces the LIFO ordering that nested brackets require.',
    mistakes: [
      'Forgetting to check stack.length === 0 before popping — will get undefined and not throw an error in JS, creating a subtle bug.',
      'Not checking that the stack is empty at the end — "(((" would pass all iteration checks but fail correctly only on the final check.',
      'Trying to use a counter instead of a stack — fails for "(]" type cases.',
    ],
  },
  {
    id: 3,
    leetcode: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    patterns: ['Sliding Window', 'Greedy', 'Array'],
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁴'],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No profitable transaction possible.' },
    ],
    approach:
      'Track the minimum price seen so far (best buy day) and the maximum profit achievable. For each price, compute profit = price - minPrice, update maxProfit. Update minPrice if current price is lower.',
    qa: [
      { q: 'Why can\'t we just find the global min and global max?', a: 'Because the buy must come BEFORE the sell. [7,6,4,3,1] has min=1 and max=7, but buying at 1 means we already passed 7 — we can\'t sell in the past.' },
      { q: 'How does tracking minPrice solve the order constraint?', a: 'As we scan left to right, minPrice is always the lowest price we\'ve seen so FAR — meaning we could have bought on any previous day. So price - minPrice is always a valid buy-then-sell pair.' },
      { q: 'Is this dynamic programming?', a: 'It\'s related — it\'s essentially DP with state compression. The "state" is just (minPriceSoFar, maxProfitSoFar) and we update in O(1) per step. Many greedy single-pass solutions are collapsed DP.' },
    ],
    solution: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity
  let maxProfit = 0

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price          // found a cheaper buy day
    } else {
      const profit = price - minPrice
      maxProfit = Math.max(maxProfit, profit)
    }
  }

  return maxProfit
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Single pass through prices array. Only two variables maintained regardless of input size.',
    insight: 'The key is realizing that on any given day, the best we could have done is bought at the cheapest price before today. So tracking minPrice as we go automatically gives us the best possible buy price for every potential sell day.',
    mistakes: [
      'Initializing minPrice = 0 instead of Infinity — if all prices are positive, 0 is never a valid buy price.',
      'Trying to find global min/max indices ignoring temporal ordering.',
      'Off-by-one: buy and sell must be on DIFFERENT days (but the problem guarantees we need different days).',
    ],
  },
  {
    id: 4,
    leetcode: 53,
    title: 'Maximum Subarray',
    difficulty: 'Easy',
    patterns: ['Dynamic Programming', 'Greedy', 'Kadane\'s Algorithm'],
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    approach:
      'Kadane\'s Algorithm: maintain a running sum (currentSum). At each element, decide: should I extend the current subarray, or start fresh here? If currentSum + nums[i] < nums[i], start fresh. Track the maximum seen.',
    qa: [
      { q: 'What\'s the key decision at each step?', a: 'At element nums[i], should I extend the previous subarray (currentSum + nums[i]) or start a new subarray here (nums[i])? Take the max of those two. This is the Kadane recurrence: dp[i] = max(nums[i], dp[i-1] + nums[i]).' },
      { q: 'When would you start a new subarray?', a: 'When the running sum goes negative. A negative prefix only drags down any future subarray — better to start fresh. Equivalently: if currentSum < 0 before adding nums[i], reset to 0.' },
      { q: 'How does this differ from a divide-and-conquer approach?', a: 'Divide & conquer (used in Merge Sort) works too but is O(n log n). Kadane\'s is O(n) and O(1) space — strictly better. Mention D&C if asked about alternative approaches.' },
    ],
    solution: `function maxSubArray(nums: number[]): number {
  let currentSum = nums[0]
  let maxSum = nums[0]

  for (let i = 1; i < nums.length; i++) {
    // Either extend current subarray or start fresh
    currentSum = Math.max(nums[i], currentSum + nums[i])
    maxSum = Math.max(maxSum, currentSum)
  }

  return maxSum
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Single pass through the array. Two variables maintained — no extra space needed.',
    insight: 'Kadane\'s insight: "If the sum of everything before me is negative, I\'m better off starting here." This greedy choice is locally optimal and globally optimal because a negative prefix can never help a future subarray.',
    mistakes: [
      'Initializing maxSum = 0 instead of nums[0] — fails when all numbers are negative (answer should be the least negative, not 0).',
      'Resetting currentSum to 0 instead of nums[i] — same issue with all-negative inputs.',
      'Not returning the maximum at each step — currentSum alone is not the answer at the end.',
    ],
  },
  {
    id: 5,
    leetcode: 70,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    patterns: ['Dynamic Programming', 'Fibonacci'],
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 ≤ n ≤ 45'],
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1, or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' },
    ],
    approach:
      'To reach step n, you must have come from step n-1 (one step) or step n-2 (two steps). So ways(n) = ways(n-1) + ways(n-2). This is exactly the Fibonacci sequence. Use bottom-up DP with just two variables.',
    qa: [
      { q: 'How do you recognize this as DP?', a: 'The problem has optimal substructure: ways to reach step n depends only on ways to reach n-1 and n-2. There\'s also overlapping subproblems if you use recursion — ways(4) calls ways(3) and ways(2), ways(3) also calls ways(2). DP caches this.' },
      { q: 'Can you do this O(1) space?', a: 'Yes — since we only need the previous two values, we can use two variables instead of an array. This is the space-optimized version: just prev2 and prev1, updating on each iteration.' },
      { q: 'What if you could take 1, 2, or 3 steps?', a: 'ways(n) = ways(n-1) + ways(n-2) + ways(n-3). Same pattern, now need 3 previous values. This is the Tribonacci extension.' },
    ],
    solution: `function climbStairs(n: number): number {
  if (n <= 2) return n

  let prev2 = 1  // ways to reach step 1
  let prev1 = 2  // ways to reach step 2

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2
    prev2 = prev1
    prev1 = current
  }

  return prev1
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'One loop from 3 to n. Only two variables maintained — no array needed.',
    insight: 'Climbing Stairs IS Fibonacci shifted by one. ways(1)=1, ways(2)=2, ways(3)=3, ways(4)=5, ways(5)=8... Recognizing this lets you jump straight to the O(n)/O(1) solution without building the full DP table.',
    mistakes: [
      'Using recursive Fibonacci without memoization — exponential time, will time out for large n.',
      'Off-by-one: ways(1) = 1, ways(2) = 2 (not 1). Make sure base cases are correct.',
      'Building an O(n) array when two variables suffice.',
    ],
  },

  // ── MEDIUM ─────────────────────────────────────────────────────────────────
  {
    id: 6,
    leetcode: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    patterns: ['Sliding Window', 'Hash Map', 'String'],
    description:
      'Given a string s, find the length of the longest substring without duplicate characters.',
    constraints: ['0 ≤ s.length ≤ 5 × 10⁴', 's consists of English letters, digits, symbols and spaces'],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc" is the longest substring without repeats.' },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke" is the answer.' },
    ],
    approach:
      'Sliding window with a HashMap tracking character → last seen index. Expand right pointer. When a duplicate is found, jump the left pointer to max(left, lastSeen[char] + 1) to skip past the previous occurrence. Track window size at each step.',
    qa: [
      { q: 'Why do we store the index instead of just a Set?', a: 'A Set tells us "is this char in the window?" but not WHERE it is. When we see a repeat, we need to jump left to just past the previous occurrence. Without the index, we\'d have to shrink the window one step at a time — O(n²). Storing the index makes it O(n).' },
      { q: 'Why left = Math.max(left, seen.get(char)! + 1)?', a: 'The max is crucial. Consider "abba": when we hit the second "a" (index 3), seen["a"] = 0, so we\'d set left = 1. But left is already 2 (from the "b" repeat). Without Math.max, we\'d move left backwards — including a character already outside our window.' },
      { q: 'What is the time complexity and why?', a: 'O(n) — both pointers only move forward. Right moves through all n characters once. Left only advances, never retreats. Each character is added to and removed from the map at most once.' },
    ],
    solution: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>() // char → last seen index
  let left = 0
  let maxLen = 0

  for (let right = 0; right < s.length; right++) {
    const char = s[right]

    if (seen.has(char)) {
      // Jump left past the previous occurrence (but never go backward)
      left = Math.max(left, seen.get(char)! + 1)
    }

    seen.set(char, right) // update to current index
    maxLen = Math.max(maxLen, right - left + 1)
  }

  return maxLen
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))',
    complexityExplanation: 'n = string length, m = alphabet size. One pass with both pointers moving right. Map stores at most min(m, n) entries — bounded by alphabet size (128 for ASCII).',
    insight: 'The "jump left" optimization is what makes this O(n) vs O(n²). Instead of shrinking one character at a time until the duplicate leaves the window, we jump directly past it. This only works because we store indices, not just membership.',
    mistakes: [
      'Forgetting Math.max when updating left — can move left pointer backward, creating invalid window.',
      'Using s.indexOf() inside the loop — O(n) per call = O(n²) total.',
      'Not updating seen.set() on every visit — need to track the LATEST index, not first.',
    ],
  },
  {
    id: 7,
    leetcode: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    patterns: ['Two Pointers', 'Greedy', 'Array'],
    description:
      'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    constraints: ['n ≥ 2', '0 ≤ height[i] ≤ 10⁴'],
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 (h=8) and index 8 (h=7). Area = min(8,7) × (8-1) = 7×7 = 49.' },
      { input: 'height = [1,1]', output: '1' },
    ],
    approach:
      'Start with left=0 and right=n-1 (widest possible container). Area = min(height[left], height[right]) × (right - left). Move the pointer with the shorter height inward — moving the taller one can only decrease width without possibility of increasing height.',
    qa: [
      { q: 'Why do we start with the widest container?', a: 'We start wide and move inward, so we consider every possible width. The key insight is: we should move the shorter side. Moving the taller side inward can\'t possibly find a better container — the height is still limited by the shorter side and the width just decreased.' },
      { q: 'Prove the greedy choice is safe.', a: 'If height[left] < height[right], every container with this left pointer and a right pointer to its left gives area ≤ current area (shorter width, bounded by same short height). So we can safely discard all those — move left forward. Symmetric reasoning for right.' },
      { q: 'What\'s the brute force and why is it worse?', a: 'Try every pair: O(n²). The two-pointer approach is O(n). The key is proving we never miss the optimal pair — and the greedy argument above ensures we don\'t.' },
    ],
    solution: `function maxArea(height: number[]): number {
  let left = 0
  let right = height.length - 1
  let maxWater = 0

  while (left < right) {
    const h = Math.min(height[left], height[right])
    const w = right - left
    maxWater = Math.max(maxWater, h * w)

    // Move the shorter side inward
    if (height[left] <= height[right]) {
      left++
    } else {
      right--
    }
  }

  return maxWater
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Each pointer moves at most n times total (left goes right, right goes left). They meet in the middle — O(n) iterations.',
    insight: 'This is a greedy two-pointer proof: we never miss the optimal solution because we only discard containers that are PROVABLY worse than the current one. Moving the shorter side is the only move that could possibly improve the area.',
    mistakes: [
      'Moving the taller side — this is strictly worse; never improves the result.',
      'Using left < right vs left <= right — with equal heights, move either pointer (or both), but don\'t let them cross.',
      'Forgetting to calculate area BEFORE moving pointers.',
    ],
  },
  {
    id: 8,
    leetcode: 15,
    title: '3Sum',
    difficulty: 'Medium',
    patterns: ['Two Pointers', 'Sorting', 'Array'],
    description:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i ≠ j, i ≠ k, j ≠ k, and nums[i] + nums[j] + nums[k] === 0. The solution set must not contain duplicate triplets.',
    constraints: ['3 ≤ nums.length ≤ 3000', '-10⁵ ≤ nums[i] ≤ 10⁵'],
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    approach:
      'Sort the array. For each index i, use two pointers (left=i+1, right=end) to find pairs that sum to -nums[i]. Skip duplicates at each level to avoid duplicate triplets.',
    qa: [
      { q: 'Why sort first?', a: 'Sorting enables two pointers (binary search-like movement on a sorted array), and makes duplicate detection trivial — duplicates are adjacent after sorting. Without sorting, duplicate detection would require a Set, adding complexity.' },
      { q: 'How do we avoid duplicate triplets?', a: 'At the outer loop: if nums[i] === nums[i-1], skip (we already processed this pivot). At the inner loop after finding a triplet: skip while nums[left] === nums[left+1] and nums[right] === nums[right-1].' },
      { q: 'What\'s the optimization when nums[i] > 0?', a: 'Since the array is sorted and nums[i] is the smallest in our triplet, if nums[i] > 0, no triplet can sum to 0. Break early — can\'t have negative sums with all positives.' },
      { q: 'Time complexity?', a: 'O(n²) — the sort is O(n log n), the nested loop (outer O(n) × two-pointer O(n)) dominates at O(n²). Space is O(1) extra ignoring the output.' },
    ],
    solution: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)
  const result: number[][] = []

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate pivots
    if (i > 0 && nums[i] === nums[i - 1]) continue
    // Early termination: smallest element is positive
    if (nums[i] > 0) break

    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]])
        // Skip duplicates on both sides
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right - 1]) right--
        left++
        right--
      } else if (sum < 0) {
        left++  // need larger values
      } else {
        right-- // need smaller values
      }
    }
  }

  return result
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Sorting is O(n log n). The outer loop runs O(n) times, and for each, the two-pointer inner loop is O(n). Total: O(n²). Output space is O(k) for k triplets, but that\'s considered output, not auxiliary space.',
    insight: 'The pattern "sort + fix one element + two-pointer" generalizes to kSum problems. For 4Sum, fix two elements with nested loops, then use two pointers. The sort enables linear two-pointer search instead of O(n²) nested loops for the inner search.',
    mistakes: [
      'Not skipping duplicate pivots at i — produces duplicate triplets.',
      'Not skipping duplicates after finding a valid triplet — same issue.',
      'Off-by-one: inner two-pointer comparison must be left < right, not <=.',
    ],
  },
  {
    id: 9,
    leetcode: 322,
    title: 'Coin Change',
    difficulty: 'Medium',
    patterns: ['Dynamic Programming', 'BFS'],
    description:
      'You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up, return -1. You may assume that you have an infinite number of each kind of coin.',
    constraints: ['1 ≤ coins.length ≤ 12', '1 ≤ coins[i] ≤ 2³¹ - 1', '0 ≤ amount ≤ 10⁴'],
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    approach:
      'Bottom-up DP. dp[i] = minimum coins needed to make amount i. Initialize dp[0]=0, all others=Infinity. For each amount from 1 to amount, try each coin: dp[i] = min(dp[i], dp[i - coin] + 1) if i >= coin.',
    qa: [
      { q: 'Why doesn\'t greedy work here?', a: 'Greedy (always pick largest coin ≤ remaining) fails for coins=[1,3,4], amount=6. Greedy picks 4+1+1=3 coins. Optimal is 3+3=2 coins. DP considers all possibilities.' },
      { q: 'What does dp[i] represent?', a: 'dp[i] = the minimum number of coins needed to make exactly amount i. dp[0] = 0 (base case: 0 coins for 0 amount). We build up from dp[1] to dp[amount].' },
      { q: 'How do you reconstruct which coins were used?', a: 'Track a parent array: parent[i] = the coin used to reach amount i optimally. Then backtrack from amount to 0 following the parent pointers. Not usually asked in interviews but good to mention.' },
    ],
    solution: `function coinChange(coins: number[], amount: number): number {
  // dp[i] = min coins to make amount i
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
}`,
    timeComplexity: 'O(amount × coins.length)',
    spaceComplexity: 'O(amount)',
    complexityExplanation: 'Two nested loops: outer runs amount times, inner runs coins.length times. DP array of size amount+1.',
    insight: 'This is an "unbounded knapsack" variant. The key recurrence is: dp[i] = min over all coins c of (dp[i - c] + 1). Bottom-up avoids recursion overhead and naturally handles infinite coin supply via repeated coin use in the inner loop.',
    mistakes: [
      'Initializing dp with 0 instead of Infinity — can\'t distinguish "0 coins needed" from "not reachable".',
      'Not checking dp[i - coin] !== Infinity before updating — would propagate invalid states.',
      'Returning dp[amount] directly without checking for Infinity (the -1 case).',
    ],
  },
  {
    id: 10,
    leetcode: 200,
    title: 'Number of Islands',
    difficulty: 'Medium',
    patterns: ['DFS', 'BFS', 'Union Find', 'Matrix'],
    description:
      'Given an m × n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    constraints: ['1 ≤ m, n ≤ 300', 'grid[i][j] is \'0\' or \'1\''],
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    approach:
      'Iterate over every cell. When you find an unvisited \'1\', increment count and DFS/BFS to mark all connected land cells as visited (sink them by marking \'0\'). Count how many times you trigger a fresh DFS.',
    qa: [
      { q: 'Why do we mutate the grid (mark visited as \'0\')?', a: 'To avoid revisiting cells without needing a separate visited matrix. It\'s a common interview optimization. If we can\'t mutate the input, use a Set of "r,c" strings or a boolean matrix.' },
      { q: 'DFS vs BFS — which is better here?', a: 'Both are O(m×n). DFS is simpler to implement recursively. BFS uses a queue and is iterative — avoids stack overflow for very large connected regions. Mention both; implement whichever you\'re more comfortable with.' },
      { q: 'What are the 4 directions?', a: 'Up(-1,0), Down(+1,0), Left(0,-1), Right(0,+1). Do NOT count diagonals for this problem — the problem specifies horizontal and vertical adjacency only.' },
    ],
    solution: `function numIslands(grid: string[][]): number {
  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  function dfs(r: number, c: number): void {
    // Out of bounds, water, or already visited
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return

    grid[r][c] = '0' // mark as visited (sink the land)

    dfs(r + 1, c)
    dfs(r - 1, c)
    dfs(r, c + 1)
    dfs(r, c - 1)
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++
        dfs(r, c) // flood-fill this island
      }
    }
  }

  return count
}`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    complexityExplanation: 'Every cell is visited at most once (marked \'0\' after first visit). Total O(m×n) time. DFS recursion stack can go O(m×n) deep in worst case (entire grid is land).',
    insight: 'This is the classic "flood fill" / connected components problem. The DFS "sinks" each island as it\'s discovered, ensuring each cell triggers at most one DFS call. This is why overall time is O(m×n) even though DFS looks like it could be expensive.',
    mistakes: [
      'Forgetting to mark cells as visited before recursing — causes infinite loops.',
      'Not checking bounds before array access — causes index out of bounds.',
      'Counting diagonals as connected — the problem specifies 4-directional connectivity only.',
    ],
  },
  {
    id: 11,
    leetcode: 238,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    patterns: ['Prefix Product', 'Array'],
    description:
      'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.',
    constraints: ['2 ≤ nums.length ≤ 10⁵', '-30 ≤ nums[i] ≤ 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer'],
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    approach:
      'For each index i, the answer is (product of all elements to the LEFT of i) × (product of all elements to the RIGHT of i). Compute prefix products left-to-right, then multiply by suffix products right-to-left in a second pass.',
    qa: [
      { q: 'Why can\'t we use division?', a: 'Division fails when there are zeros in the array. Also the problem explicitly forbids it. The prefix/suffix approach handles zeros naturally.' },
      { q: 'Can you do it in O(1) extra space?', a: 'Yes — use the output array to store prefix products first. Then traverse right-to-left maintaining a running suffix product, multiplying into the output array. Two passes, one extra variable.' },
      { q: 'What happens with two zeros in the array?', a: 'Every answer is 0 — the product of everything except one zero still includes the other zero. The prefix/suffix approach handles this automatically without special cases.' },
    ],
    solution: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length
  const result = new Array(n).fill(1)

  // Pass 1: result[i] = product of all elements to the LEFT of i
  let prefix = 1
  for (let i = 0; i < n; i++) {
    result[i] = prefix
    prefix *= nums[i]
  }

  // Pass 2: multiply by product of all elements to the RIGHT of i
  let suffix = 1
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix
    suffix *= nums[i]
  }

  return result
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Two linear passes. The output array is not counted as extra space per the problem convention. Only two scalar variables (prefix, suffix) are used.',
    insight: 'The elegant insight: answer[i] = leftProduct[i] × rightProduct[i]. Building these in two passes and combining them avoids division entirely. The trick of using the output array to store prefix products is a common space optimization.',
    mistakes: [
      'Calculating total product and dividing — fails with zeros.',
      'Using O(n) extra arrays for prefix and suffix when you can combine into one pass.',
      'Off-by-one: prefix starts at 1 (empty product), not nums[0].',
    ],
  },
  {
    id: 12,
    leetcode: 146,
    title: 'LRU Cache',
    difficulty: 'Medium',
    patterns: ['Hash Map', 'Doubly Linked List', 'Design'],
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) methods, both running in O(1) average time complexity.',
    constraints: ['1 ≤ capacity ≤ 3000', '0 ≤ key ≤ 10⁴', '0 ≤ value ≤ 10⁵', 'At most 2 × 10⁵ calls to get and put'],
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1)=1, put(3,3), get(2)=-1, get(3)=3', output: '-1 (key 2 was evicted)', explanation: 'After put(3,3), capacity exceeded. Key 2 was least recently used → evicted.' },
    ],
    approach:
      'Combine a HashMap (key → node) for O(1) lookup with a Doubly Linked List (DLL) for O(1) order maintenance. Most recently used goes to the front (after dummy head). Least recently used is at the back (before dummy tail). On access, move node to front. On capacity exceeded, remove from back.',
    qa: [
      { q: 'Why a doubly linked list instead of singly?', a: 'To remove a node in O(1), you need to update both the previous and next pointers. With a singly linked list, you\'d need to traverse to find the previous node. DLL gives O(1) removal anywhere.' },
      { q: 'Why dummy head and tail nodes?', a: 'Sentinel nodes eliminate edge cases when inserting/removing from empty list or at boundaries. You never check "is this the first/last node?" — the sentinels absorb those cases.' },
      { q: 'JavaScript alternative using Map?', a: 'JavaScript\'s Map maintains insertion order and has a built-in way to get the first-inserted entry. You can implement LRU with just a Map: delete and re-insert on access (to update order). But this is JS-specific and interviewers usually want to see the DLL solution.' },
    ],
    solution: `class LRUCache {
  private capacity: number
  private cache: Map<number, { key: number; val: number; prev: any; next: any }>
  private head: { key: number; val: number; prev: any; next: any } // dummy
  private tail: { key: number; val: number; prev: any; next: any } // dummy

  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
    this.head = { key: 0, val: 0, prev: null, next: null }
    this.tail = { key: 0, val: 0, prev: null, next: null }
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  private remove(node: any): void {
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  private insertFront(node: any): void {
    node.next = this.head.next
    node.prev = this.head
    this.head.next.prev = node
    this.head.next = node
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1
    const node = this.cache.get(key)!
    this.remove(node)
    this.insertFront(node) // mark as most recently used
    return node.val
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!)
    }
    const node = { key, val: value, prev: null, next: null }
    this.cache.set(key, node)
    this.insertFront(node)

    if (this.cache.size > this.capacity) {
      // Remove LRU: node before tail
      const lru = this.tail.prev
      this.remove(lru)
      this.cache.delete(lru.key)
    }
  }
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(capacity)',
    complexityExplanation: 'All operations (get, put, remove, insertFront) are O(1) due to HashMap lookup and O(1) DLL manipulation via direct node references. Space stores at most capacity+2 nodes (including dummies).',
    insight: 'The HashMap provides O(1) lookup; the DLL provides O(1) ordering. Neither structure alone achieves both. The combination is the standard industry pattern for LRU — it\'s used in OS page replacement, CPU caches, and CDN eviction policies.',
    mistakes: [
      'Forgetting to delete the evicted key from the HashMap — causes memory leak and incorrect future gets.',
      'Not moving a node to front on get() — violates LRU ordering.',
      'Incorrect pointer updates during remove/insert — draw the DLL before coding.',
    ],
  },

  // ── HARD ───────────────────────────────────────────────────────────────────
  {
    id: 13,
    leetcode: 42,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    patterns: ['Two Pointers', 'Monotonic Stack', 'Dynamic Programming'],
    description:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: ['n ≥ 1', '0 ≤ height[i] ≤ 10⁵'],
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: '6 units of rainwater are trapped.' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    approach:
      'Two-pointer approach: water at position i = min(maxLeft, maxRight) - height[i]. Use left/right pointers with running maxLeft/maxRight. Process the side with the smaller max — we know the water level is determined by that side.',
    qa: [
      { q: 'Why does water level equal min(maxLeft, maxRight) - height[i]?', a: 'Water can only be trapped up to the lower of the two surrounding walls. Beyond that, it spills. So the water level at i is bounded by min(maxLeft, maxRight). Subtract height[i] for the actual water depth. If negative (bar higher than water level), water = 0.' },
      { q: 'Why process the side with the smaller maxHeight?', a: 'If maxLeft < maxRight, we know the water at left is exactly maxLeft - height[left], regardless of what\'s to the right (the right side is taller or equal, so the left side is the bottleneck). This is the key insight that makes two-pointer work.' },
      { q: 'What\'s the O(n) space approach and how does this improve it?', a: 'The DP approach precomputes leftMax[] and rightMax[] arrays: O(n) space. The two-pointer approach uses just 4 variables: O(1) space. Same O(n) time.' },
    ],
    solution: `function trap(height: number[]): number {
  let left = 0
  let right = height.length - 1
  let maxLeft = 0
  let maxRight = 0
  let water = 0

  while (left < right) {
    if (height[left] <= height[right]) {
      // Left side is the bottleneck
      if (height[left] >= maxLeft) {
        maxLeft = height[left] // update max, no water here
      } else {
        water += maxLeft - height[left] // trapped water
      }
      left++
    } else {
      // Right side is the bottleneck
      if (height[right] >= maxRight) {
        maxRight = height[right]
      } else {
        water += maxRight - height[right]
      }
      right--
    }
  }

  return water
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    complexityExplanation: 'Single pass with two pointers. Four scalar variables. No arrays allocated.',
    insight: 'The two-pointer solution is elegant because it defers the question "what\'s the right wall?" until it\'s provably not needed. When maxLeft < maxRight, the right wall is at least maxRight (and could be taller), so the left calculation is exact.',
    mistakes: [
      'Forgetting Math.max when updating maxLeft/maxRight — can underestimate the wall height.',
      'Using height[left] < maxLeft instead of <= — need >= check for updating max (when equal, no water, but max stays same).',
      'Off-by-one with the two-pointer crossing condition (left < right vs left <= right).',
    ],
  },
  {
    id: 14,
    leetcode: 23,
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    patterns: ['Heap', 'Divide & Conquer', 'Linked List'],
    description:
      'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    constraints: ['k ≥ 0', '0 ≤ lists[i].length ≤ 500', '-10⁴ ≤ lists[i][j] ≤ 10⁴', 'Total nodes ≤ 10⁴'],
    examples: [
      { input: 'lists = [[1→4→5],[1→3→4],[2→6]]', output: '1→1→2→3→4→4→5→6' },
    ],
    approach:
      'Use a min-heap of size k: always extract the minimum node across all k list heads, append to result, push the next node from that list. This gives O(N log k) time where N is total nodes.',
    qa: [
      { q: 'Why not merge pairwise sequentially?', a: 'Merging k lists one-by-one gives O(N × k) in the worst case — each merge touches all previously merged nodes again. The heap approach is O(N log k) — much better for large k.' },
      { q: 'What does the heap contain?', a: 'The heap contains the current head of each non-exhausted list. Size is at most k. We extract min O(log k), process that node, push its next node O(log k). N total nodes → O(N log k).' },
      { q: 'How would you implement a min-heap in TypeScript?', a: 'JavaScript/TypeScript doesn\'t have a built-in heap. In interviews, you can either implement a simple one, or explain the approach using a priority queue and note you\'d use a library like \'heap-js\' in production. Most interviewers accept pseudo-code for the heap internals.' },
    ],
    solution: `// TypeScript implementation using a simplified min-heap approach
// In production: use a heap library. Here we simulate with sorted insertion.

class ListNode {
  val: number
  next: ListNode | null
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val
    this.next = next
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // Min-heap simulation: array sorted by node value
  // In interviews, explain you'd use a proper MinHeap for O(log k) ops
  const heap: ListNode[] = []

  // Initialize heap with heads of all lists
  for (const head of lists) {
    if (head !== null) heap.push(head)
  }

  // Simple heapify (insertion sort into array = acceptable for small k)
  heap.sort((a, b) => a.val - b.val)

  const dummy = new ListNode(0)
  let current = dummy

  while (heap.length > 0) {
    // Extract minimum (front of sorted array)
    const minNode = heap.shift()!
    current.next = minNode
    current = current.next

    // Push next node from that list back into heap
    if (minNode.next !== null) {
      // Insert in sorted position (O(k) — would be O(log k) with real heap)
      const next = minNode.next
      let i = 0
      while (i < heap.length && heap[i].val <= next.val) i++
      heap.splice(i, 0, next)
    }
  }

  return dummy.next
}

/* --- Cleaner Divide & Conquer approach (also O(N log k)): ---
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null
  while (lists.length > 1) {
    const merged: Array<ListNode | null> = []
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i]
      const l2 = i + 1 < lists.length ? lists[i + 1] : null
      merged.push(mergeTwoLists(l1, l2))
    }
    lists = merged
  }
  return lists[0]
}
*/`,
    timeComplexity: 'O(N log k)',
    spaceComplexity: 'O(k)',
    complexityExplanation: 'N = total nodes across all lists, k = number of lists. Heap size ≤ k at all times. Each of N nodes is inserted and extracted once: O(log k) per operation. Total: O(N log k).',
    insight: 'The divide and conquer approach is equally valid and often cleaner to implement: repeatedly merge pairs of lists. After log k rounds, all lists are merged. Each round processes all N nodes: total O(N log k). This avoids the need for an explicit heap.',
    mistakes: [
      'Using a nested loop approach (merge all into one, O(N × k)) when asked for optimal.',
      'Not handling null list heads in the heap initialization.',
      'Forgetting the dummy head node — simplifies edge cases for linked list construction.',
    ],
  },
  {
    id: 15,
    leetcode: 76,
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    patterns: ['Sliding Window', 'Hash Map', 'String'],
    description:
      'Given two strings s and t of lengths m and n, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. Return an empty string "" if no such substring exists.',
    constraints: ['m, n ≥ 1', 's and t consist of uppercase and lowercase English letters'],
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    approach:
      'Sliding window with two frequency maps: need (target counts) and have (current window counts). Track "formed" = number of characters meeting their target count. Expand right until window is valid; then shrink left to minimize. Track minimum window.',
    qa: [
      { q: 'How do you know when the window is valid?', a: '"Formed" counter equals the number of unique characters in t with their required counts met. When formed === required (= unique chars in t), the window contains all characters of t.' },
      { q: 'Why track "formed" instead of just comparing maps?', a: 'Comparing maps each time is O(m) — too slow. The "formed" counter lets us check validity in O(1). We only update formed when a character\'s count in the window exactly meets its target (crosses the threshold).' },
      { q: 'What\'s the time complexity and why?', a: 'O(|s| + |t|). Building need map: O(|t|). Both pointers only move right: left and right together traverse s at most twice total — O(|s|). Each character added/removed from window once.' },
    ],
    solution: `function minWindow(s: string, t: string): string {
  if (t.length === 0) return ''

  const need = new Map<string, number>()
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1)

  const have = new Map<string, number>()
  let formed = 0
  const required = need.size // unique chars in t we need to satisfy

  let left = 0
  let minLen = Infinity
  let minStart = 0

  for (let right = 0; right < s.length; right++) {
    const c = s[right]
    have.set(c, (have.get(c) ?? 0) + 1)

    // Check if this character's count now meets the target
    if (need.has(c) && have.get(c) === need.get(c)) {
      formed++
    }

    // Shrink from left while window is valid
    while (formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1
        minStart = left
      }

      const leftChar = s[left]
      have.set(leftChar, have.get(leftChar)! - 1)
      if (need.has(leftChar) && have.get(leftChar)! < need.get(leftChar)!) {
        formed--
      }
      left++
    }
  }

  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen)
}`,
    timeComplexity: 'O(|s| + |t|)',
    spaceComplexity: 'O(|s| + |t|)',
    complexityExplanation: 'One pass with two pointers over s. Each character processed at most twice (once by right pointer, once by left). Maps store at most O(unique chars in s ∪ t) entries.',
    insight: 'The "formed/required" counter is the key optimization. Without it, you\'d compare two maps each step (O(26) or O(m)). The counter reduces validity check to O(1) by tracking "how many unique target characters have their count satisfied in the window."',
    mistakes: [
      'Using formed++ whenever need.has(c) — wrong; only increment when count EXACTLY meets need (not exceeds).',
      'Not handling characters not in t: they can be in the window but shouldn\'t affect formed.',
      'Returning s.substring instead of empty string when no valid window found.',
    ],
  },
  {
    id: 16,
    leetcode: 127,
    title: 'Word Ladder',
    difficulty: 'Hard',
    patterns: ['BFS', 'Graph', 'String'],
    description:
      'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence beginWord → s1 → s2 → ... → sk such that every adjacent pair of words differs by a single letter. Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.',
    constraints: ['1 ≤ beginWord.length ≤ 10', 'endWord and all wordList words have the same length as beginWord', '1 ≤ wordList.length ≤ 5000'],
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: '"hit" → "hot" → "dot" → "dog" → "cog"' },
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0', explanation: '"cog" not in wordList' },
    ],
    approach:
      'Model as a graph problem: words are nodes, edges connect words differing by one letter. Use BFS from beginWord — BFS guarantees shortest path in unweighted graph. For each word in the queue, try changing each character to a-z and check if valid next word.',
    qa: [
      { q: 'Why BFS instead of DFS?', a: 'BFS finds the SHORTEST path in an unweighted graph. DFS finds A path but not necessarily the shortest. Since we want minimum transformation sequence, BFS is mandatory.' },
      { q: 'How do you find neighbors efficiently?', a: 'For each word of length L, try changing each of L positions to each of 26 letters (26L candidates per word). Check if candidate is in the wordList Set — O(1) lookup. This is O(26L) per word vs O(N×L) for comparing all pairs.' },
      { q: 'What\'s the time complexity?', a: 'O(M² × N) where M = word length, N = wordList size. BFS visits each word once. For each word, we generate O(26M) candidates and each comparison/lookup is O(M). With preprocessing (pattern grouping), can reduce to O(M² × N).' },
    ],
    solution: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set(wordList)
  if (!wordSet.has(endWord)) return 0

  const queue: [string, number][] = [[beginWord, 1]] // [word, level]
  const visited = new Set<string>([beginWord])

  while (queue.length > 0) {
    const [word, level] = queue.shift()!

    // Try all single-character substitutions
    for (let i = 0; i < word.length; i++) {
      for (let c = 0; c < 26; c++) {
        const nextChar = String.fromCharCode(97 + c) // 'a' to 'z'
        if (nextChar === word[i]) continue

        const nextWord = word.slice(0, i) + nextChar + word.slice(i + 1)

        if (nextWord === endWord) return level + 1

        if (wordSet.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord)
          queue.push([nextWord, level + 1])
        }
      }
    }
  }

  return 0
}`,
    timeComplexity: 'O(M² × N)',
    spaceComplexity: 'O(M × N)',
    complexityExplanation: 'N words, each of length M. BFS visits each word at most once. For each word, generate 26×M candidates, each requiring O(M) string operations. Queue stores at most N words.',
    insight: 'The implicit graph structure (words as nodes, single-letter-diff as edges) is the key model. Once you see it as "shortest path in unweighted graph," BFS is the immediate answer. The neighbor generation (try all 26 letters × all positions) is the practical implementation of edge traversal.',
    mistakes: [
      'Not removing words from wordSet after visiting — can cause cycles and TLE.',
      'Using DFS instead of BFS — finds a path, not the shortest path.',
      'Building explicit adjacency list by comparing all pairs — O(N² × M) preprocessing when the character substitution approach is O(M × 26) per word.',
    ],
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────
const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const ALL_PATTERNS = Array.from(new Set(challenges.flatMap(c => c.patterns))).sort()

// ── Component ──────────────────────────────────────────────────────────────
export default function CodingChallengesPage() {
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')
  const [pattern, setPattern] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({})

  const filtered = useMemo(() => {
    return challenges.filter(c => {
      const matchDiff = difficulty === 'All' || c.difficulty === difficulty
      const matchPattern = pattern === 'All' || c.patterns.includes(pattern)
      return matchDiff && matchPattern
    })
  }, [difficulty, pattern])

  const counts = useMemo(() => ({
    Easy: challenges.filter(c => c.difficulty === 'Easy').length,
    Medium: challenges.filter(c => c.difficulty === 'Medium').length,
    Hard: challenges.filter(c => c.difficulty === 'Hard').length,
  }), [])

  const toggleSolution = (id: number) =>
    setShowSolution(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link href="/coding" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="h-4 w-4" /> Back to Coding Practice
          </Link>
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <span className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-3 shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </span>
            </div>
            <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
              TypeScript Coding Challenges
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              16 curated LeetCode problems with full TypeScript solutions, step-by-step Q&A walkthroughs, and time/space complexity analysis
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
              <button key={d} onClick={() => setDifficulty(difficulty === d ? 'All' : d)}
                className={`rounded-xl p-4 text-center transition-all shadow ${difficulty === d ? DIFFICULTY_COLORS[d] + ' ring-2 ring-offset-2 ring-current' : 'bg-white dark:bg-gray-800 hover:shadow-md'}`}>
                <p className={`text-2xl font-bold ${difficulty === d ? '' : d === 'Easy' ? 'text-green-600' : d === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{counts[d]}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{d}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-3">
          <div className="flex flex-wrap gap-2">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  difficulty === d
                    ? d === 'All' ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900'
                    : d === 'Easy' ? 'bg-green-500 text-white'
                    : d === 'Medium' ? 'bg-yellow-500 text-white'
                    : 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-400'
                }`}>
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag className="h-4 w-4 mt-1 text-gray-400 shrink-0" />
            {['All', ...ALL_PATTERNS].map(p => (
              <button key={p} onClick={() => setPattern(p)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  pattern === p
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-400'
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">{filtered.length} challenge{filtered.length !== 1 ? 's' : ''}</p>

        {/* Challenge list */}
        <div className="space-y-4">
          {filtered.map((challenge, idx) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="rounded-2xl bg-white shadow-lg dark:bg-gray-800"
            >
              {/* Card header */}
              <button
                className="w-full p-6 text-left"
                onClick={() => setExpanded(expanded === challenge.id ? null : challenge.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        LC #{challenge.leetcode}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[challenge.difficulty]}`}>
                        {challenge.difficulty}
                      </span>
                      {challenge.patterns.map(p => (
                        <span key={p} className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                          {p}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{challenge.description}</p>
                  </div>
                  {expanded === challenge.id
                    ? <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" />
                    : <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
                  }
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expanded === challenge.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-gray-100 dark:border-gray-700"
                  >
                    <div className="space-y-6 p-6">
                      {/* Problem Description */}
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                          <BookOpen className="h-4 w-4" /> Problem
                        </h4>
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{challenge.description}</p>
                      </div>

                      {/* Constraints + Examples */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Constraints</p>
                          <ul className="space-y-1">
                            {challenge.constraints.map((c, i) => (
                              <li key={i} className="font-mono text-xs text-gray-600 dark:text-gray-400">• {c}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Examples</p>
                          {challenge.examples.map((ex, i) => (
                            <div key={i} className="mb-2 last:mb-0">
                              <p className="font-mono text-xs text-gray-500">Input: {ex.input}</p>
                              <p className="font-mono text-xs font-bold text-gray-700 dark:text-gray-300">Output: {ex.output}</p>
                              {ex.explanation && <p className="text-xs text-gray-500">{ex.explanation}</p>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Approach */}
                      <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Approach</p>
                        <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-300">{challenge.approach}</p>
                      </div>

                      {/* Q&A Walkthrough */}
                      <div>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                          <MessageSquare className="h-4 w-4" /> Interview Q&A Walkthrough
                        </h4>
                        <div className="space-y-3">
                          {challenge.qa.map((item, i) => (
                            <div key={i} className="rounded-xl border border-gray-100 dark:border-gray-700">
                              <div className="rounded-t-xl bg-purple-50 px-4 py-2.5 dark:bg-purple-900/20">
                                <p className="text-xs font-bold text-purple-700 dark:text-purple-400">
                                  Q: {item.q}
                                </p>
                              </div>
                              <div className="px-4 py-3">
                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                  A: {item.a}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Complexity */}
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                          <div className="mb-1 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <p className="text-xs font-bold text-green-700 dark:text-green-400">Time Complexity</p>
                          </div>
                          <p className="font-mono text-lg font-bold text-green-800 dark:text-green-300">{challenge.timeComplexity}</p>
                        </div>
                        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                          <div className="mb-1 flex items-center gap-2">
                            <MemoryStick className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Space Complexity</p>
                          </div>
                          <p className="font-mono text-lg font-bold text-blue-800 dark:text-blue-300">{challenge.spaceComplexity}</p>
                        </div>
                        <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20 sm:col-span-1">
                          <p className="mb-1 text-xs font-bold text-amber-700 dark:text-amber-400">Why</p>
                          <p className="text-xs text-amber-800 dark:text-amber-300">{challenge.complexityExplanation}</p>
                        </div>
                      </div>

                      {/* Insight */}
                      <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                        <p className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <Lightbulb className="h-4 w-4" /> Key Insight
                        </p>
                        <p className="text-sm leading-relaxed text-emerald-800 dark:text-emerald-300">{challenge.insight}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                            <Code className="h-4 w-4" /> TypeScript Solution
                          </h4>
                          <button
                            onClick={() => toggleSolution(challenge.id)}
                            className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                          >
                            {showSolution[challenge.id] ? 'Hide Solution' : 'Reveal Solution'}
                          </button>
                        </div>
                        <AnimatePresence>
                          {showSolution[challenge.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <pre className="overflow-x-auto rounded-xl bg-gray-900 p-5 text-xs leading-relaxed text-green-300">
                                <code>{challenge.solution}</code>
                              </pre>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Common Mistakes */}
                      <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                        <p className="mb-2 flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400">
                          <AlertTriangle className="h-4 w-4" /> Common Mistakes to Avoid
                        </p>
                        <ul className="space-y-1.5">
                          {challenge.mistakes.map((m, i) => (
                            <li key={i} className="text-xs leading-relaxed text-red-700 dark:text-red-400">• {m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">
            No challenges match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
