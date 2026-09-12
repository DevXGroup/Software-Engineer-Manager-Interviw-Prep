export type DS = {
  id: string
  name: string
  category: 'Linear' | 'Hash-Based' | 'Tree' | 'Graph'
  description: string
  ops: { op: string; avg: string; worst: string }[]
  template: string
  useWhen: string
  interviewNote: string
}

export const dataStructures: DS[] = [
  {
    id: 'array',
    name: 'Array',
    category: 'Linear',
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
    interviewNote: 'Prefix sums give O(1) range sum queries, which is what makes subarray sum problems tractable. Kadane\'s algorithm solves maximum subarray in O(n). Arrays underlie most FAANG problems.',
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'Linear',
    description: 'Nodes linked by pointers. No random access. O(1) insert or delete at a known node. Singly: one direction. Doubly: O(1) delete given a direct node reference. Used inside LRU cache.',
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
    useWhen: 'Frequent insert or delete without random access. LRU cache. Reverse, cycle-detect, or merge problems.',
    interviewNote: 'Master the dummy head node (simplifies edge cases), slow/fast pointers (find middle, detect cycle), and in-place reversal. LRU cache = doubly linked list plus hash map.',
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'Linear',
    description: 'LIFO: last in, first out. O(1) push, pop, and peek. Built on an array or linked list. Powers DFS, expression parsing, undo/redo, and the monotonic stack pattern.',
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

// Monotonic stack: next greater element:
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
    useWhen: 'Bracket or tag matching. DFS without recursion. Monotonic window problems. Expression evaluation.',
    interviewNote: 'Monotonic stack is the key advanced pattern: maintain a decreasing stack to solve next greater element, largest rectangle in histogram, and trapping rain water, all in O(n).',
  },
  {
    id: 'queue',
    name: 'Queue & Deque',
    category: 'Linear',
    description: 'Queue: FIFO, first in first out. Deque (double-ended queue): O(1) insert and delete at both ends. Essential for BFS and the sliding window maximum pattern.',
    ops: [
      { op: 'Enqueue / push back', avg: 'O(1)', worst: 'O(1)' },
      { op: 'Dequeue / pop front', avg: 'O(1)', worst: 'O(1)' },
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

// Monotonic deque: sliding window maximum O(n):
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
    useWhen: 'BFS or level-order traversal. Sliding window maximum. Task scheduling. Producer-consumer patterns.',
    interviewNote: 'A monotonic deque gives O(n) sliding window maximum versus O(n·k) naive. In JS, Array.shift() is O(n); for correctness in interviews it is fine, but note the trade-off.',
  },
  {
    id: 'hashmap-ds',
    name: 'Hash Map & Set',
    category: 'Hash-Based',
    description: 'O(1) average insert, delete, and lookup using a hash function. Hash set: unique keys. Collision resolution via chaining or open addressing. Worst case O(n) on adversarial keys.',
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
    useWhen: 'O(1) lookup or membership. Counting frequencies. Grouping by key. Two-sum style complement search. De-duplication.',
    interviewNote: 'Hash maps turn O(n²) brute force into O(n). Always ask: can I precompute and look up? Prefer Map over a plain object for non-string keys and guaranteed insertion order.',
  },
  {
    id: 'bst',
    name: 'Binary Search Tree',
    category: 'Tree',
    description: 'Binary tree where left < node < right. O(log n) average for search, insert, and delete. Degrades to O(n) when skewed. Self-balancing variants (AVL, red-black) guarantee O(log n) worst case.',
    ops: [
      { op: 'Search', avg: 'O(log n)', worst: 'O(n)' },
      { op: 'Insert', avg: 'O(log n)', worst: 'O(n)' },
      { op: 'Delete', avg: 'O(log n)', worst: 'O(n)' },
      { op: 'In-order traversal', avg: 'O(n)', worst: 'O(n)' },
      { op: 'Min / max', avg: 'O(log n)', worst: 'O(n)' },
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
    useWhen: 'Maintain a sorted dynamic set. Range queries. Kth smallest or largest. Ordered statistics.',
    interviewNote: 'In-order traversal of a BST is a sorted array. Use min/max bounds for validation, not parent comparison. LCA in a BST exploits ordering, so no general LCA algorithm is needed.',
  },
  {
    id: 'heap-ds',
    name: 'Heap / Priority Queue',
    category: 'Tree',
    description: 'Complete binary tree satisfying the heap property. Min-heap: parent ≤ children, peek min in O(1). Max-heap: parent ≥ children. Stored as an array: children of i are at 2i+1 and 2i+2.',
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
    useWhen: 'K largest or smallest elements. Streaming median. Dijkstra\'s shortest path. Merge K sorted lists. Priority scheduling.',
    interviewNote: '"K largest" is a min-heap of size K. "Streaming median" is two heaps (max-heap lower half, min-heap upper half), balanced to get O(log n) insert and O(1) median.',
  },
  {
    id: 'trie',
    name: 'Trie',
    category: 'Tree',
    description: 'Prefix tree. Each node is one character. Shared prefixes are stored once. O(L) operations where L is string length, independent of the number of words. Space-efficient for large shared-prefix dictionaries.',
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
    useWhen: 'Autocomplete or prefix matching. Spell checking. Word search on a grid (DFS plus trie). IP routing (longest prefix match).',
    interviewNote: 'Tries are the go-to for "design autocomplete" system design questions. Combined with DFS, they solve Word Search II in O(rows × cols × L) versus O(words × rows × cols × L) brute force.',
  },
  {
    id: 'graph',
    name: 'Graph',
    category: 'Graph',
    description: 'Nodes (vertices) connected by edges. Directed or undirected, weighted or unweighted. Adjacency list: space-efficient for sparse graphs, O(V+E). Adjacency matrix: O(1) edge lookup at O(V²) space.',
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
    interviewNote: 'BFS for shortest path (unweighted). DFS for connectivity or cycle detection. Topological sort for dependency ordering. Grid cells are nodes: treat 2D arrays as implicit adjacency lists.',
  },
]

export const dsIds: readonly string[] = dataStructures.map((d) => d.id)
