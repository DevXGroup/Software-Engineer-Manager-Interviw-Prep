/**
 * Frontend interview cards for the coding track: JavaScript, TypeScript, and
 * React / Next.js. Extracted from src/app/coding/page.tsx so the page only
 * renders and the content can be reviewed on its own.
 *
 * React and Next.js content checked against current docs on 2026-09-12:
 * - https://react.dev/learn/react-compiler/introduction
 * - https://react.dev/reference/rsc/use-client
 * - https://react.dev/reference/rsc/server-functions
 * - https://react.dev/reference/react/useActionState
 * - https://nextjs.org/docs/app/guides/public-static-pages (partial prerendering with Suspense)
 * - https://nextjs.org/docs/app/guides/migrating-to-cache-components ('use cache', cacheLife)
 */

/** A JavaScript concept card: prose explanation plus a runnable snippet. */
export type JsConcept = {
  id: string
  title: string
  tag: string
  explanation: string
  code: string
}

/** A short card: a snippet with a one-line takeaway under it. */
export type ConceptCard = {
  id: string
  title: string
  code: string
  note: string
}

export const jsConcepts: JsConcept[] = [
  {
    id: 'closures',
    title: 'Closures',
    tag: 'Very frequently asked',
    explanation:
      'A closure is a function that keeps access to its lexical scope even when it runs outside that scope. The inner function still reads and writes the variables of the outer function that created it.',
    code: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const increment = outer();
console.log(increment()); // 1
console.log(increment()); // 2, count is still alive`,
  },
  {
    id: 'promises-async-await',
    title: 'Promises and async/await',
    tag: 'Frequently asked',
    explanation:
      'A promise stands for the eventual result of an async operation, either a value or an error. async/await is syntax over promises that lets you read async code top to bottom.',
    code: `// Promise-based
function fetchData() {
  return new Promise((resolve) => {
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
    id: 'event-loop',
    title: 'Event loop',
    tag: 'Frequently asked',
    explanation:
      'JavaScript runs your code on one thread. The event loop decides what runs next: synchronous code first, then microtasks (promise callbacks), then macrotasks (setTimeout, setInterval).',
    code: `console.log('1 - Sync');

setTimeout(() => console.log('3 - Macrotask'), 0);

Promise.resolve().then(() => console.log('2 - Microtask'));

console.log('1 - Sync end');
// Order: "1 - Sync", "1 - Sync end", "2 - Microtask", "3 - Macrotask"`,
  },
]

export const tsConcepts: ConceptCard[] = [
  {
    id: 'ts-type-system',
    title: 'Type system',
    code: `function add(a: number, b: number): number {
  return a + b;
}
// add(1, '2') is a compile error`,
    note: 'TypeScript catches type mismatches at compile time, not at runtime.',
  },
  {
    id: 'ts-interface-vs-type',
    title: 'Interface vs type',
    code: `interface User { name: string; age: number; }
// Interfaces are extendable and can be declared twice and merged

type UserType = { name: string; age: number; }
// Type aliases can express unions and intersections`,
    note: 'Use an interface for object and class shapes. Use a type alias for unions, intersections, and aliases.',
  },
  {
    id: 'ts-generics',
    title: 'Generics',
    code: `function identity<T>(arg: T): T {
  return arg;
}
const result = identity<string>('Hello');
// result is typed as string`,
    note: 'A generic is a type parameter, so one function or component stays type-safe across many input types.',
  },
  {
    id: 'ts-access-modifiers',
    title: 'Classes and access modifiers',
    code: `class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  public speak() {
    console.log(\`\${this.name} speaks\`);
  }
}`,
    note: 'TypeScript adds public, private, protected, and readonly on top of JavaScript classes.',
  },
]

export const reactConcepts: ConceptCard[] = [
  {
    id: 'react-hooks-state-effect',
    title: 'Hooks: useState and useEffect',
    code: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, []); // empty deps: run once after mount

  return <div>{count}</div>;
}`,
    note: 'useEffect is for syncing with something outside React, like a timer or a subscription. The returned function cleans it up. For shared state, useContext plus useReducer covers most cases before you reach for a store.',
  },
  {
    id: 'react-server-vs-client-components',
    title: 'Server Components vs Client Components',
    code: `// Server Component (the default in the App Router)
// Runs on the server, can await data, ships no JS to the browser
export default async function Page() {
  const posts = await db.posts.findMany();
  return <PostList posts={posts} />;
}

// Client Component: opt in per file
'use client'
export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}`,
    note: 'Server Components have no state and cannot take event handlers, so anything interactive needs "use client". Keep the client boundary low in the tree, at the button rather than the page, so less JavaScript is sent.',
    // Docs: https://react.dev/reference/rsc/use-client
  },
  {
    id: 'react-server-functions-actions',
    title: 'Server functions and form Actions',
    code: `// actions.ts
'use server'
export async function addLike(formData: FormData) {
  await db.likes.create({ postId: formData.get('id') });
  revalidateTag('likes');
}

// A Client Component can pass one straight to <form action>
'use client'
const [error, submit, isPending] = useActionState(addLike, null);
return <form action={submit}><button>{isPending ? 'Saving' : 'Like'}</button></form>;`,
    note: 'A server function is an async function marked "use server" that a Client Component can call directly, so you write a mutation without an API route. useActionState gives you the returned error and a pending flag, and the form still submits before JavaScript loads.',
    // Docs: https://react.dev/reference/rsc/server-functions and https://react.dev/reference/react/useActionState
  },
  {
    id: 'react-streaming-and-caching',
    title: 'Streaming, partial prerendering, and use cache',
    code: `// Static shell renders immediately, the slow part streams in
export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<PromotionSkeleton />}>
        <PromotionContent />   {/* awaits data inside */}
      </Suspense>
    </>
  );
}

// Cache a slow segment instead of re-running it per request
async function Promotion() {
  'use cache'
  cacheLife('max')
  return <Banner data={await getPromotion()} />;
}`,
    note: 'A Suspense boundary is what makes partial prerendering work: everything outside it is prerendered as a static shell, everything inside streams at request time. "use cache" marks a function or segment as cacheable, and cacheLife sets how long.',
    // Docs: https://nextjs.org/docs/app/guides/public-static-pages and https://nextjs.org/docs/app/guides/migrating-to-cache-components
  },
  {
    id: 'react-performance-compiler',
    title: 'Performance: React Compiler first, memo second',
    code: `// React 19 with the React Compiler enabled: plain code,
// the compiler inserts the memoization for you
function ProductList({ items, sortBy }) {
  const sorted = [...items].sort((a, b) => a[sortBy] - b[sortBy]);
  return <List items={sorted} />;
}

// Still worth reaching for by hand:
// 1. memo on a component you render in a long list that
//    re-renders for reasons the compiler cannot see
// 2. useMemo around genuinely expensive work you have measured
// 3. a stable identity a third-party library depends on`,
    note: 'The 2026 answer starts with the React Compiler making most memo, useMemo, and useCallback calls unnecessary, then names the cases it does not cover. Saying "wrap it in memo and useCallback" as the whole answer now reads as out of date.',
    // Docs: https://react.dev/learn/react-compiler/introduction
  },
]

export const frontendCardIds: readonly string[] = [
  ...jsConcepts.map((c) => c.id),
  ...tsConcepts.map((c) => c.id),
  ...reactConcepts.map((c) => c.id),
]
