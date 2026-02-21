'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Server, Cloud, Shield, Zap, GitBranch, Globe, MessageSquare, Search, ChevronDown, ChevronUp } from 'lucide-react'

type Scenario = {
  id: string
  title: string
  icon: React.ElementType
  color: string
  difficulty: 'Medium' | 'Hard'
  timeEstimate: string
  functionalReqs: string[]
  nonFunctionalReqs: string[]
  scaleTargets: string[]
  steps: { title: string; description: string; keyDecisions: string[] }[]
  keyComponents: { name: string; why: string }[]
  tradeoffs: string[]
  followUps: string[]
}

const scenarios: Scenario[] = [
  {
    id: 'url',
    title: 'URL Shortener (Bit.ly)',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    difficulty: 'Medium',
    timeEstimate: '35-40 min',
    functionalReqs: ['Given a long URL, generate a short URL (6-7 chars)', 'Given a short URL, redirect to the original URL', 'Support custom short URLs (optional)', 'Track analytics: clicks, geolocation, device'],
    nonFunctionalReqs: ['100M URLs created/day, 10B redirects/day', 'Redirect latency < 10ms P99', 'High availability (99.99% uptime)', 'URLs should not be predictable (no sequential IDs)'],
    scaleTargets: ['100M writes/day = ~1,200 writes/sec', '10B reads/day = ~115,000 reads/sec (100:1 read:write ratio)', '500 bytes/URL × 100M/day × 365 days × 5 years = ~90TB storage'],
    steps: [
      { title: '1. API Design', description: 'Define the contract before the architecture. Two endpoints: POST /shorten (body: {long_url, custom_alias?}) → {short_url}. GET /{short_code} → 301/302 redirect to long_url.', keyDecisions: ['301 (permanent) vs 302 (temporary) redirect: 301 reduces load (browser caches), 302 allows accurate analytics tracking. Choose based on requirements.', 'Authentication: public API needs rate limiting; business API needs auth tokens'] },
      { title: '2. Short Code Generation', description: 'How do you generate unique 6-character codes? Option A: Hash (MD5/SHA256 of long URL + timestamp, take first 6 chars). Problem: collision risk. Option B: Base62 encode a unique ID (a-z, A-Z, 0-9 = 62^6 = ~56 billion IDs). Option C: Random + collision check. Best: Base62 encode a distributed ID from a sequence generator (Snowflake ID or Twitter Snowflake).', keyDecisions: ['Base62 is the standard answer — it gives enough space and avoids collisions', 'Snowflake IDs from a dedicated ID generation service ensure uniqueness without coordination', 'Custom aliases must check for conflicts in the database'] },
      { title: '3. Database Design', description: 'The main table: urls (id BIGINT, short_code VARCHAR(7) INDEXED, long_url TEXT, user_id, created_at, expires_at, click_count). Read-heavy system → use a read replica + aggressive caching.', keyDecisions: ['SQL vs NoSQL: SQL (Postgres/MySQL) works fine at this scale with read replicas. NoSQL (Cassandra/DynamoDB) if you need massive write scale across regions.', 'Index: short_code column is the primary lookup — must be indexed', 'Click counting: use a separate analytics service (Kafka → Flink/Spark → analytics DB) rather than updating click_count synchronously'] },
      { title: '4. Caching Layer', description: 'With 100:1 read:write, cache is critical. Use Redis (in-memory KV store) with short_code → long_url mapping. LRU eviction. Cache hit rate should be 80%+. For hot URLs (top 0.1% get 90% of traffic), pre-warm the cache at creation.', keyDecisions: ['Cache invalidation: on URL update or deletion, proactively invalidate the cache entry', 'Cache TTL: match URL expiration if applicable; otherwise TTL of 24-48h for popular URLs', 'Redis cluster for high availability; use consistent hashing for key distribution'] },
      { title: '5. Redirect Flow', description: 'User hits short URL → Load Balancer → App Server checks Redis → Cache hit: immediate redirect. Cache miss: query DB → populate cache → redirect. At 115K redirects/sec, the app tier is stateless (just a lookup), so it scales horizontally. Use CDN for the redirect endpoint — CDN can cache the redirect response if using 301.', keyDecisions: ['CDN caching only works for 301 (permanent) redirects — factor this into the 301 vs 302 decision', 'Read replicas to distribute the 115K reads/sec across multiple DB nodes'] },
      { title: '6. Analytics (optional deep dive)', description: 'Synchronous analytics kills redirect performance. Use an async pipeline: redirect service emits a click event to Kafka (message queue). A stream processor (Flink/Kinesis) aggregates click counts, geolocation, device in near-real-time. Analytics stored in a separate OLAP database (Redshift, BigQuery, ClickHouse) for dashboard queries.', keyDecisions: ['Never update click counts in the main DB synchronously — it creates write contention', 'Kafka decouples the redirect latency from analytics processing', 'OLAP vs OLTP: analytics queries (GROUP BY, aggregations) are very different from redirect lookups'] },
    ],
    keyComponents: [
      { name: 'Load Balancer', why: 'Distributes 115K req/sec across stateless app servers' },
      { name: 'ID Generation Service', why: 'Snowflake-style unique IDs without coordination' },
      { name: 'Redis Cache', why: '80%+ cache hit rate makes redirect sub-millisecond' },
      { name: 'SQL Database (read replicas)', why: 'Persistent storage; read replicas handle read scale' },
      { name: 'Kafka + Analytics DB', why: 'Async click tracking without impacting redirect latency' },
      { name: 'CDN (optional)', why: 'Edge caching for 301 redirects reduces origin load globally' },
    ],
    tradeoffs: ['301 vs 302: 301 is faster (browser caches), 302 gives better analytics', 'SQL vs NoSQL: SQL is simpler and sufficient; NoSQL if multi-region write scale needed', 'Hashing vs counter: hashing has collisions; counter requires central sequence generator'],
    followUps: ['How would you handle URL expiration?', 'How do you prevent abuse (spam/malicious URLs)?', 'How would you design this for 10x the scale?', 'How do you handle custom domains (company.short.link)?'],
  },
  {
    id: 'twitter',
    title: 'Twitter / X Feed',
    icon: MessageSquare,
    color: 'from-sky-500 to-sky-600',
    difficulty: 'Hard',
    timeEstimate: '45-50 min',
    functionalReqs: ['Post tweets (text, images, video)', 'Follow other users', 'View home timeline (tweets from followed users)', 'Like, retweet, reply', 'Search tweets and users'],
    nonFunctionalReqs: ['500M users, 100M DAU', '500M tweets/day posted', 'Timeline reads are 100x more frequent than writes', 'Timeline must load in < 1 second', 'High consistency not required (eventual consistency OK)'],
    scaleTargets: ['500M tweets/day = ~5,800 writes/sec', 'Timeline reads: 100B/day = ~1.15M reads/sec', 'Each user follows ~200 accounts on average', '140-280 chars per tweet + media CDN'],
    steps: [
      { title: '1. Core Data Model', description: 'Users table: user_id, username, bio, follower_count, following_count. Tweets table: tweet_id (Snowflake), user_id, content, created_at, like_count, retweet_count. Follows table: follower_id, followee_id, created_at. Likes: user_id, tweet_id, created_at.', keyDecisions: ['Denormalize follower/following counts — do not COUNT(*) on every read', 'Use a Snowflake ID for tweet_id — time-ordered and globally unique', 'Store media (images/video) in object storage (S3) with CDN; store only the URL in the tweets table'] },
      { title: '2. Feed Generation: Fan-out Approaches', description: 'This is the crux of the problem. Two approaches: Fan-out on write (push) vs Fan-out on read (pull). Fan-out on write: when user posts, immediately write to all followers\' timeline caches. Fan-out on read: timeline is computed at read time by fetching recent tweets from all followed accounts and merging.', keyDecisions: ['Fan-out on write: low read latency, but celebrity problem (Elon Musk has 100M followers — 1 tweet = 100M cache writes).', 'Fan-out on read: simple writes, but expensive reads for users with 10K+ following.', 'Twitter uses a hybrid: fan-out on write for normal users, fan-out on read for celebrities (>1M followers).'] },
      { title: '3. Timeline Cache (Redis)', description: 'Each user has a sorted set in Redis: timeline:{user_id} → sorted by timestamp, stores tweet IDs (not full tweet data). On timeline read: fetch tweet IDs from Redis, then fan-out to tweet service to hydrate tweet objects. This keeps the timeline cache small (only IDs) while allowing tweet data to be updated (like count) without invalidating the cache.', keyDecisions: ['Store IDs, not full objects — tweet like counts change frequently; IDs are stable', 'Sorted set by timestamp for chronological or insertion order', 'Cache only the most recent N tweets per user (e.g., last 1000)'] },
      { title: '4. Serving the Timeline', description: 'On read: (1) Read timeline:{user_id} from Redis → list of tweet IDs. (2) Multi-get from tweet service (also cached in Redis) to hydrate tweets. (3) For users not in cache (low-activity): fall back to compute from follows table. Target: cache hit rate > 95% for active users.', keyDecisions: ['Pagination: use cursor-based pagination (tweet_id as cursor) rather than OFFSET for consistent results during rapid updates', 'Async hydration: fire all tweet fetches in parallel (multi-get), not sequential', 'Serve stale timeline if cache warm — eventual consistency is acceptable'] },
      { title: '5. Search', description: 'Tweet search requires a dedicated search engine (Elasticsearch or similar). Ingest new tweets via Kafka → search indexing service → Elasticsearch. Index: tweet text, user, hashtags, mentions, timestamp. For real-time trending topics, use a stream processor (Flink/Spark Streaming) to count hashtag frequency in sliding windows.', keyDecisions: ['Do not use the main relational DB for text search — it will not scale', 'Kafka decouples the write path from search indexing — no added latency on post', 'Trending: sliding window counts over Kafka streams; materialized view updated every 30 sec'] },
    ],
    keyComponents: [
      { name: 'Snowflake ID Service', why: 'Time-ordered globally unique tweet IDs' },
      { name: 'Redis Timeline Cache', why: 'Sorted sets of tweet IDs per user; sub-ms timeline reads' },
      { name: 'Fan-out Service', why: 'Writes tweet ID to followers\' timeline caches on post' },
      { name: 'Tweet Service', why: 'Hydrates tweet IDs into full tweet objects (also cached)' },
      { name: 'Media CDN + S3', why: 'Images/video stored in object storage, served from edge' },
      { name: 'Elasticsearch', why: 'Full-text search across 500M tweets/day' },
      { name: 'Kafka', why: 'Decouples write path from fan-out, search indexing, analytics' },
    ],
    tradeoffs: ['Fan-out on write vs read: write is fast for reads but creates celebrity problem; hybrid is the production answer', 'Eventual consistency: timeline may be slightly stale (seconds) — acceptable for social media', 'Tweet ID in cache vs full tweet: IDs make updates cheap; full objects would require cache invalidation on every like/retweet'],
    followUps: ['How would you handle a user with 100M followers posting (celebrity problem)?', 'How do you implement rate limiting on tweet posting?', 'How would you design the notifications system?', 'How do you handle tweet deletion and right to be forgotten?'],
  },
  {
    id: 'ratelimiter',
    title: 'Rate Limiter',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    difficulty: 'Medium',
    timeEstimate: '30-35 min',
    functionalReqs: ['Limit requests per user/IP per time window', 'Multiple rules: 100 req/min for free tier, 1000 req/min for paid', 'Return 429 Too Many Requests when limit exceeded', 'Distributed — work across multiple servers'],
    nonFunctionalReqs: ['<1ms added latency per request', 'Works correctly in distributed environment', 'Handles Redis failure gracefully (fail-open or fail-close)', 'Configurable rules without code deploy'],
    scaleTargets: ['100K requests/sec total', 'Rules must be evaluated in <1ms', 'Store counters in-memory (Redis) — not disk'],
    steps: [
      { title: '1. Algorithm Selection', description: 'Four common algorithms: Token Bucket (tokens added at rate R, consumed per request, allows burst — most common), Leaky Bucket (fixed output rate, queues incoming — used for traffic shaping), Fixed Window Counter (count resets every window boundary — simple but has boundary burst problem), Sliding Window Log (exact, but high memory), Sliding Window Counter (approximation — best accuracy/cost tradeoff).', keyDecisions: ['Token Bucket is the most common for API rate limiting — allows reasonable bursting, simple to implement', 'Fixed Window has a "boundary attack" problem: 100 req at 0:59 + 100 req at 1:01 = 200 req in 2 sec window', 'Sliding Window Counter approximation: current_window_count + prev_window_count × (overlap_ratio) — solves boundary problem with minimal memory'] },
      { title: '2. Distributed Counter Storage', description: 'Single server: use in-memory counter. Distributed: must share state. Options: Redis (atomic INCR + EXPIRE), Redis Lua scripts (for multi-key atomic operations), or dedicated rate limit service. Redis INCR is atomic and supports EXPIRE — natural fit. Pattern: SET key = "{user_id}:{window}" with TTL = window duration. INCR and check against limit.', keyDecisions: ['Redis pipeline: INCR + EXPIRE in one round trip', 'Use Lua scripts for sliding window algorithms to ensure atomicity across multiple Redis commands', 'Key structure: "rate_limit:{user_id}:{minute}" expires automatically after the window'] },
      { title: '3. Where to Enforce', description: 'Options: Client-side (easily bypassed), API Gateway (centralized, consistent — best for most cases), Application code (flexible, per-endpoint), Dedicated middleware. For a system design interview, API Gateway middleware backed by Redis is the standard answer. The rate limiter reads user identifier (API key or IP), checks Redis, increments counter, and returns 429 or passes through.', keyDecisions: ['API Gateway is the right layer — single enforcement point for all services', 'Return headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset so clients can self-throttle', 'Different limits by endpoint: /search costs 1 credit, /recommendations costs 5 credits'] },
      { title: '4. Handling Redis Failure', description: 'If Redis goes down, you have two options: Fail open (let all requests through — better for availability, risky for abuse) or Fail closed (reject all requests — safe but bad user experience). Most APIs choose fail-open with alerts. A local in-memory cache (fallback) can handle the window between Redis failure and recovery, with higher per-process limits.', keyDecisions: ['Fail-open is standard for most consumer APIs — downtime is worse than rate limit bypass for minutes', 'In-memory fallback limits should be lower than Redis limits to reduce abuse exposure', 'Circuit breaker pattern: if Redis INCR fails N times, switch to local mode and alert'] },
    ],
    keyComponents: [
      { name: 'API Gateway', why: 'Centralized enforcement point before requests reach services' },
      { name: 'Redis Cluster', why: 'Distributed atomic counters; INCR + EXPIRE per window' },
      { name: 'Config Service', why: 'Rules stored in config DB; hot-reloadable without code deploy' },
      { name: 'In-memory fallback', why: 'Handles Redis failures without full outage (fail-open)' },
    ],
    tradeoffs: ['Token bucket vs sliding window: token bucket is simpler, sliding window is more accurate at boundaries', 'Fail-open vs fail-closed: most consumer APIs choose fail-open for availability', 'Redis atomicity: INCR is atomic but multi-key sliding window requires Lua script'],
    followUps: ['How do you handle distributed race conditions?', 'How would you implement per-endpoint cost (some endpoints count as 5 requests)?', 'How do you handle users with multiple API keys?', 'How do you prevent Redis from becoming a bottleneck?'],
  },
  {
    id: 'notifications',
    title: 'Notification System',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Medium',
    timeEstimate: '35-40 min',
    functionalReqs: ['Send notifications via email, SMS, push (iOS/Android)', 'Support immediate and scheduled notifications', 'User preference management (opt-out per channel/type)', 'Notification history and delivery tracking'],
    nonFunctionalReqs: ['10M notifications/day', 'Soft real-time: delivery within 1-5 seconds', 'High reliability: no missed critical notifications', 'Deduplication: each notification delivered exactly once'],
    scaleTargets: ['10M/day = ~115 notifications/sec average', 'Peaks at 10x = 1,150/sec during burst events', 'Email via SES/SendGrid; SMS via Twilio; Push via APNs/FCM'],
    steps: [
      { title: '1. Event Ingestion', description: 'Services emit notification events to a Kafka topic ("notification-requests"). Event schema: {event_id, user_id, type (email/sms/push), template_id, params, priority, send_at?}. Using Kafka decouples the notification logic from the triggering service. Events can be replayed on failure.', keyDecisions: ['Separate Kafka topics by priority: high-priority (OTP, security alerts) vs. low-priority (marketing)', 'Include a unique event_id for idempotency — prevent duplicate delivery on retry', 'Kafka retention: 7 days — allows reprocessing on downstream failures'] },
      { title: '2. Notification Router', description: 'Consumer service reads from Kafka and: (1) Checks user preferences (opt-in/opt-out per channel and notification type). (2) Looks up user contact info (email, phone, device tokens). (3) Renders the notification template with provided params. (4) Routes to the appropriate channel worker: email queue, SMS queue, push queue.', keyDecisions: ['User preferences checked before routing — respect opt-outs at this layer', 'Template service renders HTML/text from template_id + params; never store rendered content in the event', 'Channel-specific queues allow independent scaling of email vs. SMS vs. push workers'] },
      { title: '3. Channel Workers & Third-party Integration', description: 'Each channel has a dedicated worker pool: Email workers call SES/SendGrid, SMS workers call Twilio, Push workers call APNs/FCM. Workers handle: rate limiting (Twilio limits SMS per second), retry logic with exponential backoff, vendor failover (primary SendGrid → fallback SES).', keyDecisions: ['APNs/FCM manage their own queueing — just send and they will deliver when device is online', 'Retry with exponential backoff + dead letter queue for persistently failing notifications', 'Circuit breaker: if Twilio fails 10 consecutive times, pause and alert'] },
      { title: '4. Delivery Tracking & Deduplication', description: 'Deduplication: store event_id in Redis with TTL = 24h. Check on consumption — if event_id exists, skip. Delivery tracking: each notification record stored in DB with status (pending, sent, delivered, failed). Webhooks from email providers (SES, SendGrid) update delivery status. Push delivery is fire-and-forget — acknowledge at send to APNs/FCM.', keyDecisions: ['Idempotency key (event_id) is the primary deduplication mechanism', 'Redis for deduplication (fast lookup, TTL-based cleanup); DB for durable delivery records', 'Webhook ingestion for email opens/clicks → update user engagement signals'] },
    ],
    keyComponents: [
      { name: 'Kafka', why: 'Decouples triggering services from notification delivery; replayable' },
      { name: 'Notification Router', why: 'Applies user preferences, resolves templates, routes to channels' },
      { name: 'Channel Workers', why: 'Independent scaling per channel; handles third-party rate limits' },
      { name: 'Redis (dedup + rate limit)', why: 'Event deduplication + per-user notification rate limiting' },
      { name: 'Template Service', why: 'Separate rendering concern; supports A/B testing of notification copy' },
    ],
    tradeoffs: ['At-most-once vs. at-least-once: Kafka gives at-least-once; deduplication makes it effectively exactly-once', 'Scheduled notifications: store in DB with send_at; a cron job polls and emits to Kafka 5 min before send time', 'Push vs SMS for critical alerts: push is free but unreliable (app might be deleted); SMS is paid but reliable'],
    followUps: ['How would you handle timezone-aware scheduled notifications at scale?', 'How do you prevent notification storms (sending 10M notifications simultaneously)?', 'How do you implement notification preference management with inheritance (global opt-out overrides all)?'],
  },
]

const architecturePatterns = [
  { name: 'Microservices', icon: GitBranch, description: 'Distributed architecture with independent services', pros: ['Independent scaling', 'Technology diversity', 'Fault isolation', 'Team autonomy'], cons: ['Network complexity', 'Data consistency challenges', 'Operational overhead', 'Distributed tracing required'], when: 'Large org with multiple teams. Services have very different scale requirements. Need independent deploy cadences.' },
  { name: 'CQRS', icon: Database, description: 'Command Query Responsibility Segregation — separate read and write models', pros: ['Optimized read models', 'Independent scaling of reads/writes', 'Event sourcing compatibility', 'Query performance'], cons: ['Eventual consistency', 'Added complexity', 'Sync overhead between models'], when: 'Read-heavy systems (social media, analytics). Complex domain models. When read and write patterns differ significantly.' },
  { name: 'Event Sourcing', icon: Zap, description: 'Store events as the source of truth, derive state by replaying', pros: ['Complete audit log', 'Temporal queries (state at any point in time)', 'Event replay for debugging', 'Natural integration with CQRS'], cons: ['Query complexity', 'Event schema evolution', 'Storage growth', 'Learning curve'], when: 'Financial systems (transactions). Audit requirements. Debugging complex distributed system state.' },
  { name: 'Saga Pattern', icon: GitBranch, description: 'Manage distributed transactions across services using compensating transactions', pros: ['Avoids distributed locks', 'Services remain loosely coupled', 'Works with eventual consistency'], cons: ['Compensating transactions are complex', 'Difficult to debug', 'Not truly ACID'], when: 'Long-running business transactions spanning multiple services. Order processing, booking systems.' },
  { name: 'Circuit Breaker', icon: Shield, description: 'Prevent cascade failures by failing fast when a downstream service is unhealthy', pros: ['Prevents cascade failures', 'Fast failure detection', 'Automatic recovery', 'Fallback responses'], cons: ['Adds latency for threshold checks', 'Complex state management', 'False positives possible'], when: 'Any service that calls a third-party or potentially failing downstream dependency.' },
  { name: 'Bulkhead', icon: Server, description: 'Isolate components to prevent one failure from taking down the whole system', pros: ['Failure isolation', 'Resource partitioning', 'Predictable degradation'], cons: ['Resource waste in some configurations', 'Added complexity'], when: 'Multi-tenant systems. Services where one customer/feature should not starve others.' },
]

type MainTab = 'scenarios' | 'patterns' | 'concepts'

export default function SystemDesignPage() {
  const [mainTab, setMainTab] = useState<MainTab>('scenarios')
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0])
  const [expandedStep, setExpandedStep] = useState<string | null>('1')
  const [selectedPattern, setSelectedPattern] = useState(architecturePatterns[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">System Design</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">4 deep-dive scenarios · Step-by-step breakdowns · Architecture patterns</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 rounded-xl bg-white p-1 shadow dark:bg-gray-800">
          {([['scenarios', Server, 'Design Scenarios'], ['patterns', GitBranch, 'Architecture Patterns'], ['concepts', Database, 'Key Concepts']] as const).map(([t, Icon, label]) => (
            <button key={t} onClick={() => setMainTab(t)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${mainTab === t ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Design Scenarios ── */}
          {mainTab === 'scenarios' && (
            <motion.div key="scenarios" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Scenario selector */}
              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {scenarios.map(s => {
                  const Icon = s.icon
                  return (
                    <motion.button key={s.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedScenario(s); setExpandedStep('1') }}
                      className={`rounded-xl p-4 text-left transition-all ${selectedScenario.id === s.id ? `bg-gradient-to-r ${s.color} text-white shadow-lg` : 'bg-white shadow hover:shadow-md dark:bg-gray-800'}`}>
                      <Icon className="mb-2 h-6 w-6" />
                      <p className="font-bold text-sm">{s.title}</p>
                      <p className={`mt-1 text-xs ${selectedScenario.id === s.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{s.difficulty} · {s.timeEstimate}</p>
                    </motion.button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={selectedScenario.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {/* Scenario header */}
                  <div className={`mb-6 rounded-2xl bg-gradient-to-r ${selectedScenario.color} p-6 text-white`}>
                    <h2 className="text-2xl font-bold">{selectedScenario.title}</h2>
                    <p className="mt-1 text-white/80">{selectedScenario.difficulty} · {selectedScenario.timeEstimate}</p>
                  </div>

                  {/* Requirements + Scale */}
                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-sm">Functional Requirements</h3>
                      <ul className="space-y-1.5">{selectedScenario.functionalReqs.map((r, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-400"><span className="mt-0.5 text-green-500">✓</span>{r}</li>)}</ul>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-sm">Non-Functional Requirements</h3>
                      <ul className="space-y-1.5">{selectedScenario.nonFunctionalReqs.map((r, i) => <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600 dark:text-gray-400"><span className="mt-0.5 text-blue-500">→</span>{r}</li>)}</ul>
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-sm">Scale Estimates</h3>
                      <ul className="space-y-1.5">{selectedScenario.scaleTargets.map((r, i) => <li key={i} className="text-xs text-gray-600 dark:text-gray-400 font-mono">{r}</li>)}</ul>
                    </div>
                  </div>

                  {/* Step-by-step */}
                  <div className="mb-6 space-y-3">
                    {selectedScenario.steps.map((step, i) => (
                      <div key={i} className="rounded-xl bg-white shadow dark:bg-gray-800 overflow-hidden">
                        <button onClick={() => setExpandedStep(expandedStep === String(i + 1) ? null : String(i + 1))}
                          className="flex w-full items-center justify-between p-4 text-left">
                          <span className="font-semibold text-gray-900 dark:text-white">{step.title}</span>
                          {expandedStep === String(i + 1) ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                        </button>
                        <AnimatePresence>
                          {expandedStep === String(i + 1) && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-gray-100 dark:border-gray-700">
                              <div className="p-4 space-y-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
                                  <p className="mb-2 text-xs font-bold text-amber-700 dark:text-amber-400">Key Decisions</p>
                                  <ul className="space-y-1.5">{step.keyDecisions.map((d, j) => <li key={j} className="text-xs text-amber-700 dark:text-amber-400">• {d}</li>)}</ul>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Key Components + Tradeoffs */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-800">
                      <h3 className="mb-4 font-bold text-gray-900 dark:text-white">Key Components</h3>
                      <div className="space-y-3">
                        {selectedScenario.keyComponents.map((c, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                            <div>
                              <span className="font-medium text-sm text-gray-900 dark:text-white">{c.name}</span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{c.why}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">
                        <h3 className="mb-3 font-bold text-blue-800 dark:text-blue-300">Trade-offs to Discuss</h3>
                        <ul className="space-y-2">{selectedScenario.tradeoffs.map((t, i) => <li key={i} className="text-xs text-blue-700 dark:text-blue-400">• {t}</li>)}</ul>
                      </div>
                      <div className="rounded-xl bg-purple-50 p-5 dark:bg-purple-900/20">
                        <h3 className="mb-3 font-bold text-purple-800 dark:text-purple-300">Expected Follow-up Questions</h3>
                        <ul className="space-y-2">{selectedScenario.followUps.map((f, i) => <li key={i} className="text-xs text-purple-700 dark:text-purple-400">• {f}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Architecture Patterns ── */}
          {mainTab === 'patterns' && (
            <motion.div key="patterns" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-2">
                  {architecturePatterns.map(p => {
                    const Icon = p.icon
                    return (
                      <button key={p.name} onClick={() => setSelectedPattern(p)}
                        className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${selectedPattern.name === p.name ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg' : 'bg-white shadow hover:shadow-md dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                        <Icon className="h-5 w-5 shrink-0" />
                        <div>
                          <p className="font-bold text-sm">{p.name}</p>
                          <p className={`text-xs ${selectedPattern.name === p.name ? 'text-green-100' : 'text-gray-500'}`}>{p.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedPattern.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{selectedPattern.name}</h2>
                    <p className="mb-5 text-gray-500 dark:text-gray-400">{selectedPattern.description}</p>
                    <div className="mb-5 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">Use when</p>
                      <p className="text-sm text-amber-800 dark:text-amber-300">{selectedPattern.when}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                        <p className="mb-2 font-bold text-sm text-green-800 dark:text-green-300">Advantages</p>
                        <ul className="space-y-1.5">{selectedPattern.pros.map((p, i) => <li key={i} className="flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400"><span className="text-green-500">✓</span>{p}</li>)}</ul>
                      </div>
                      <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                        <p className="mb-2 font-bold text-sm text-red-800 dark:text-red-300">Considerations</p>
                        <ul className="space-y-1.5">{selectedPattern.cons.map((c, i) => <li key={i} className="flex items-center gap-1.5 text-sm text-red-700 dark:text-red-400"><span className="text-red-500">⚠</span>{c}</li>)}</ul>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── Key Concepts ── */}
          {mainTab === 'concepts' && (
            <motion.div key="concepts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'CAP Theorem', content: 'A distributed system can only guarantee 2 of 3: Consistency (all nodes see the same data), Availability (every request gets a response), Partition Tolerance (system works during network partitions). Since partitions are unavoidable, you choose CP or AP. CP: banks, financial systems (Zookeeper, HBase). AP: social media, shopping carts (Cassandra, DynamoDB). PACELC extends CAP to include latency trade-offs when no partition exists.', color: 'border-blue-400' },
                  { title: 'SQL vs NoSQL', content: 'SQL (Postgres, MySQL): ACID, joins, complex queries. Use when data is relational, consistency is critical, team knows SQL. NoSQL — Document (MongoDB): flexible schema, good for semi-structured data. Key-value (Redis, DynamoDB): simple lookups, ultra-fast. Wide-column (Cassandra): time series, high write throughput, multi-region. Graph (Neo4j): relationship-heavy data. Default to SQL unless you have a clear reason to use NoSQL.', color: 'border-green-400' },
                  { title: 'Caching Strategies', content: 'Cache-aside (Lazy loading): App reads from cache. Miss → read DB → populate cache. Simple, on-demand. Most common pattern. Write-through: Write to cache and DB simultaneously. Always consistent, higher write latency. Write-behind (Write-back): Write to cache, async flush to DB. Fast writes, risk of data loss. Read-through: Cache handles DB reads automatically. Eviction: LRU (most common), LFU, FIFO. Cache-aside is the answer for 90% of system design interviews.', color: 'border-yellow-400' },
                  { title: 'Consistent Hashing', content: 'Problem: when you add/remove nodes to a hash ring, simple modulo hashing reassigns most keys. Consistent hashing minimizes rehashing: each node owns a range of the hash ring. Adding a node only steals keys from adjacent nodes. Removing a node only transfers its keys to the next node. Used in: Cassandra, Memcached, Redis Cluster, load balancers, CDNs. Virtual nodes (vnodes) improve even distribution across the ring.', color: 'border-purple-400' },
                  { title: 'Database Sharding', content: 'Horizontal partitioning: split rows across multiple DB instances by a shard key. Shard key selection is critical: high cardinality (many values), even distribution, aligned with query patterns. Common strategies: Range sharding (easy rebalancing, hot spots possible), Hash sharding (even distribution, harder range queries), Directory sharding (flexible, lookup overhead). Challenges: cross-shard queries, rebalancing, transactions across shards. Avoid sharding until a single DB with read replicas cannot keep up.', color: 'border-red-400' },
                  { title: 'Message Queues & Streaming', content: 'Message Queue (RabbitMQ, SQS): point-to-point or pub-sub, messages consumed once, good for task queues and decoupling. Event Streaming (Kafka): persistent log, multiple consumers can read the same events, replayable, ordered within partition. Use Kafka for: event sourcing, audit logs, fan-out to multiple consumers, stream processing. Use SQS for: task queues, worker pools, exactly-once delivery requirements. Kafka is the standard answer for high-throughput system design questions.', color: 'border-orange-400' },
                  { title: 'Database Indexes', content: 'B-Tree index (default): good for range queries and equality. O(log n) lookup. Works for most cases. Hash index: O(1) lookup for equality only. No range queries. LSM Tree (Log-Structured Merge): used in Cassandra, RocksDB. Very fast writes (append only), slower reads. Covering index: includes all columns in the query — avoids main table lookup. Composite index: index on multiple columns; left-prefix rule — (a, b, c) index supports (a), (a,b), (a,b,c) but not (b) or (c) alone.', color: 'border-teal-400' },
                  { title: 'Load Balancing Algorithms', content: 'Round Robin: requests distributed evenly in order. Good for stateless, homogeneous servers. Least Connections: sends to server with fewest active connections. Best when request duration varies widely. IP Hash: same IP always goes to same server. Good for session affinity. Weighted Round Robin: heavier servers get more requests proportionally. Random: simple, surprisingly effective for stateless services. Layer 4 (TCP): fast, no content inspection. Layer 7 (HTTP): content-aware routing, header inspection, path-based routing.', color: 'border-indigo-400' },
                ].map((c, i) => (
                  <motion.div key={c.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className={`rounded-2xl border-l-4 ${c.color} bg-white p-5 shadow dark:bg-gray-800`}>
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{c.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{c.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
