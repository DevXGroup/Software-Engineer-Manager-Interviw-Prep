import { assertTrackIds } from '@/data/tracks/ids'
import type { ElementType } from 'react'
import { Database, Server, Cloud, Shield, Zap, GitBranch, Globe, MessageSquare } from 'lucide-react'

export type Scenario = {
  /** Legacy short key. Drives the DOM anchor (`${key}-scenario`) and search navigation; do not change. */
  key: string
  /** Stable kebab-case id used for coverage tracking. */
  id: string
  title: string
  icon: ElementType
  difficulty: 'Medium' | 'Hard'
  timeEstimate: string
  functionalReqs: string[]
  nonFunctionalReqs: string[]
  scaleTargets: string[]
  steps: { title: string; description: string; keyDecisions: string[] }[]
  keyComponents: { name: string; why: string }[]
  tradeoffs: string[]
  followUps: string[]
  /** How an interviewer scores the round. Optional so older scenarios can be added incrementally. */
  rubric?: { criterion: string; weak: string; strong: string }[]
}

export type ArchitecturePattern = {
  id: string
  name: string
  icon: ElementType
  description: string
  pros: string[]
  cons: string[]
  when: string
}

export type DeepDiveVideo = {
  title: string
  channel: string
  href: string
  embedId: string
  focus: string
  whenToWatch: string
  tags: string[]
}

export const scenarios: Scenario[] = [
  {
    key: 'url',
    id: 'url-shortener-bitly',
    title: 'URL Shortener (Bit.ly)',
    icon: Globe,
    difficulty: 'Medium',
    timeEstimate: '35-40 min',
    functionalReqs: ['Given a long URL, generate a short URL (6-7 chars)', 'Given a short URL, redirect to the original URL', 'Support custom short URLs (optional)', 'Track analytics: clicks, geolocation, device'],
    nonFunctionalReqs: ['100M URLs created/day, 10B redirects/day', 'Redirect latency under 10ms P99', 'High availability (99.99% uptime)', 'URLs should not be predictable (no sequential IDs)'],
    scaleTargets: ['100M writes/day = ~1,200 writes/sec', '10B reads/day = ~115,000 reads/sec (100:1 read:write ratio)', '500 bytes/URL x 100M/day x 365 days x 5 years = ~90TB storage'],
    steps: [
      { title: '1. API design', description: 'Define the contract before the architecture. Two endpoints: POST /shorten (body: {long_url, custom_alias?}) returns {short_url}. GET /{short_code} issues a 301/302 redirect to long_url.', keyDecisions: ['301 (permanent) vs 302 (temporary) redirect: 301 reduces load because the browser caches it, 302 allows accurate analytics tracking. Choose based on requirements.', 'Authentication: the public API needs rate limiting; the business API needs auth tokens.'] },
      { title: '2. Short code generation', description: 'How do you generate unique 6-character codes? Option A: hash (MD5/SHA256 of long URL plus timestamp, take first 6 chars); the problem is collision risk. Option B: base62 encode a unique ID (a-z, A-Z, 0-9 gives 62^6, about 56 billion IDs). Option C: random plus collision check. Best answer: base62 encode a distributed ID from a sequence generator (a Snowflake ID).', keyDecisions: ['Base62 is the standard answer. It gives enough space and avoids collisions.', 'Snowflake IDs from a dedicated ID generation service ensure uniqueness without coordination.', 'Custom aliases must check for conflicts in the database.'] },
      { title: '3. Database design', description: 'The main table: urls (id BIGINT, short_code VARCHAR(7) INDEXED, long_url TEXT, user_id, created_at, expires_at, click_count). This is a read-heavy system, so use a read replica plus aggressive caching.', keyDecisions: ['SQL vs NoSQL: SQL (Postgres/MySQL) works fine at this scale with read replicas. Reach for NoSQL (Cassandra/DynamoDB) only if you need massive write scale across regions.', 'Index: the short_code column is the primary lookup and must be indexed.', 'Click counting: use a separate analytics service (Kafka into Flink/Spark into an analytics DB) rather than updating click_count synchronously.'] },
      { title: '4. Caching layer', description: 'With a 100:1 read:write ratio, cache is critical. Use Redis (an in-memory key-value store) mapping short_code to long_url, with LRU eviction. Cache hit rate should be 80%+. For hot URLs (the top 0.1% get 90% of traffic), pre-warm the cache at creation.', keyDecisions: ['Cache invalidation: on URL update or deletion, proactively invalidate the cache entry.', 'Cache TTL: match URL expiration if applicable; otherwise a TTL of 24-48h for popular URLs.', 'Redis cluster for high availability; use consistent hashing for key distribution.'] },
      { title: '5. Redirect flow', description: 'A user hits the short URL, a load balancer routes the request, and the app server checks Redis. A cache hit means an immediate redirect; a cache miss means query the DB, populate the cache, then redirect. At 115K redirects/sec the app tier is stateless (just a lookup), so it scales horizontally. Use a CDN for the redirect endpoint since it can cache the redirect response for 301s.', keyDecisions: ['CDN caching only works for 301 (permanent) redirects, so factor that into the 301 vs 302 decision.', 'Read replicas distribute the 115K reads/sec across multiple DB nodes.'] },
      { title: '6. Analytics (optional deep dive)', description: 'Synchronous analytics kills redirect performance. Use an async pipeline: the redirect service emits a click event to Kafka (a message queue). A stream processor (Flink/Kinesis) aggregates click counts, geolocation, and device in near-real-time. Analytics are stored in a separate OLAP database (Redshift, BigQuery, ClickHouse) for dashboard queries.', keyDecisions: ['Never update click counts in the main DB synchronously. It creates write contention.', 'Kafka decouples redirect latency from analytics processing.', 'OLAP vs OLTP: analytics queries (GROUP BY, aggregations) are very different from redirect lookups.'] },
    ],
    keyComponents: [
      { name: 'Load balancer', why: 'Distributes 115K req/sec across stateless app servers' },
      { name: 'ID generation service', why: 'Snowflake-style unique IDs without coordination' },
      { name: 'Redis cache', why: '80%+ cache hit rate makes redirect sub-millisecond' },
      { name: 'SQL database (read replicas)', why: 'Persistent storage; read replicas handle read scale' },
      { name: 'Kafka + analytics DB', why: 'Async click tracking without impacting redirect latency' },
      { name: 'CDN (optional)', why: 'Edge caching for 301 redirects reduces origin load globally' },
    ],
    tradeoffs: ['301 vs 302: 301 is faster (browser caches), 302 gives better analytics.', 'SQL vs NoSQL: SQL is simpler and sufficient; NoSQL if multi-region write scale is needed.', 'Hashing vs counter: hashing has collisions; a counter requires a central sequence generator.'],
    followUps: ['How would you handle URL expiration?', 'How do you prevent abuse (spam or malicious URLs)?', 'How would you design this for 10x the scale?', 'How do you handle custom domains (company.short.link)?'],
    rubric: [
      { criterion: 'Requirement negotiation', weak: 'Starts drawing boxes before asking anything, and never establishes the read to write ratio.', strong: 'Pins the 100:1 read to write ratio, the 10ms P99 redirect target and whether custom aliases are in scope, then says which of those drives the design.' },
      { criterion: 'Tradeoff articulation', weak: 'Says "use Redis" with no reason, and picks 301 or 302 without naming what it costs.', strong: 'Frames 301 versus 302 as caching versus analytics fidelity, and base62 on a Snowflake ID versus hashing as collision risk versus a central sequence.' },
      { criterion: 'Team and delivery implications', weak: 'Treats the design as one undifferentiated build.', strong: 'Splits the work into an ID service, a redirect path and an analytics pipeline, and notes the analytics pipeline can ship after launch.' },
      { criterion: 'Operability', weak: 'No numbers on cache behaviour, and no answer for what happens when Redis is cold.', strong: 'States the target hit rate, how hot keys are pre-warmed, and what the miss path costs the database at 115K reads per second.' },
      { criterion: 'Communication', weak: 'Jumps between layers, and leaves the whiteboard unreadable.', strong: 'Drives the request left to right once, labels each hop with its latency budget, and pauses for the interviewer at each decision.' },
    ],
  },
  {
    key: 'twitter',
    id: 'twitter-x-feed',
    title: 'Twitter / X Feed',
    icon: MessageSquare,
    difficulty: 'Hard',
    timeEstimate: '45-50 min',
    functionalReqs: ['Post tweets (text, images, video)', 'Follow other users', 'View home timeline (tweets from followed users)', 'Like, retweet, reply', 'Search tweets and users'],
    nonFunctionalReqs: ['500M users, 100M DAU', '500M tweets/day posted', 'Timeline reads are 100x more frequent than writes', 'Timeline must load in under 1 second', 'High consistency not required (eventual consistency is fine)'],
    scaleTargets: ['500M tweets/day = ~5,800 writes/sec', 'Timeline reads: 100B/day = ~1.15M reads/sec', 'Each user follows ~200 accounts on average', 'Assume a 1KB average post record (text plus metadata); media lives in object storage behind a CDN. Post length is no longer a fixed 280 characters, so size the store from an average, not a cap.'],
    steps: [
      { title: '1. Core data model', description: 'Users table: user_id, username, bio, follower_count, following_count. Tweets table: tweet_id (Snowflake), user_id, content, created_at, like_count, retweet_count. Follows table: follower_id, followee_id, created_at. Likes: user_id, tweet_id, created_at.', keyDecisions: ['Denormalize follower/following counts. Do not COUNT(*) on every read.', 'Use a Snowflake ID for tweet_id: time-ordered and globally unique.', 'Store media (images/video) in object storage (S3) with a CDN; store only the URL in the tweets table.'] },
      { title: '2. Feed generation: fan-out approaches', description: 'This is the crux of the problem: fan-out on write (push) vs. fan-out on read (pull). Fan-out on write: when a user posts, immediately write to all followers’ timeline caches. Fan-out on read: the timeline is computed at read time by fetching recent tweets from all followed accounts and merging.', keyDecisions: ['Fan-out on write gives low read latency but creates the celebrity problem (a user with 100M followers turns one tweet into 100M cache writes).', 'Fan-out on read keeps writes simple but makes reads expensive for users following 10K+ accounts.', 'Twitter uses a hybrid: fan-out on write for normal users, fan-out on read for celebrities (over 1M followers).'] },
      { title: '3. Timeline cache (Redis)', description: 'Each user has a sorted set in Redis: timeline:{user_id}, sorted by timestamp, storing tweet IDs (not full tweet data). On a timeline read, fetch tweet IDs from Redis, then fan out to the tweet service to hydrate tweet objects. This keeps the timeline cache small (IDs only) while letting tweet data (like counts) update without invalidating the cache.', keyDecisions: ['Store IDs, not full objects: like counts change frequently, but IDs are stable.', 'Sorted set by timestamp for chronological order.', 'Cache only the most recent N tweets per user (for example, the last 1,000).'] },
      { title: '4. Serving the timeline', description: 'On read: (1) read timeline:{user_id} from Redis for a list of tweet IDs, (2) multi-get from the tweet service (also cached in Redis) to hydrate tweets, (3) for users not in cache (low activity), fall back to computing from the follows table. Target a cache hit rate above 95% for active users.', keyDecisions: ['Use cursor-based pagination (tweet_id as the cursor) rather than OFFSET for consistent results during rapid updates.', 'Fire all tweet fetches in parallel (multi-get), not sequentially.', 'Serving a stale timeline is acceptable when the cache is warm; eventual consistency is fine here.'] },
      { title: '5. Search', description: 'Tweet search needs a dedicated search engine (Elasticsearch or similar). New tweets are ingested via Kafka into a search indexing service into Elasticsearch. Index tweet text, user, hashtags, mentions, and timestamp. For real-time trending topics, use a stream processor (Flink/Spark Streaming) to count hashtag frequency in sliding windows.', keyDecisions: ['Do not use the main relational DB for text search. It will not scale.', 'Kafka decouples the write path from search indexing, adding no latency to posting.', 'Trending: sliding-window counts over Kafka streams, with a materialized view updated every 30 seconds.'] },
    ],
    keyComponents: [
      { name: 'Snowflake ID service', why: 'Time-ordered globally unique tweet IDs' },
      { name: 'Redis timeline cache', why: 'Sorted sets of tweet IDs per user; sub-ms timeline reads' },
      { name: 'Fan-out service', why: 'Writes tweet IDs to followers’ timeline caches on post' },
      { name: 'Tweet service', why: 'Hydrates tweet IDs into full tweet objects (also cached)' },
      { name: 'Media CDN + S3', why: 'Images and video stored in object storage, served from the edge' },
      { name: 'Elasticsearch', why: 'Full-text search across 500M tweets/day' },
      { name: 'Kafka', why: 'Decouples the write path from fan-out, search indexing, and analytics' },
    ],
    tradeoffs: ['Fan-out on write vs. on read: write is fast for reads but creates the celebrity problem; a hybrid is the production answer.', 'Eventual consistency: the timeline may be slightly stale (seconds), which is acceptable for social media.', 'Tweet ID in cache vs. full tweet: IDs make updates cheap; full objects would require cache invalidation on every like or retweet.'],
    followUps: ['How would you handle a user with 100M followers posting (the celebrity problem)?', 'How do you implement rate limiting on tweet posting?', 'How would you design the notifications system?', 'How do you handle tweet deletion and right to be forgotten?'],
    rubric: [
      { criterion: 'Requirement negotiation', weak: 'Accepts "design Twitter" as given and builds every feature at once.', strong: 'Cuts scope to post, follow and home timeline, confirms eventual consistency is acceptable, and asks whether ranking is in scope.' },
      { criterion: 'Tradeoff articulation', weak: 'Picks fan-out on write with no mention of the celebrity case.', strong: 'Contrasts fan-out on write, fan-out on read and the hybrid, and names the follower count at which the strategy has to flip.' },
      { criterion: 'Team and delivery implications', weak: 'Describes a single monolith with no ownership boundaries.', strong: 'Maps post, fan-out, timeline and search to separate services, and says which team owns each and where the contract between them sits.' },
      { criterion: 'Operability', weak: 'No thought about a fan-out backlog or a cold timeline cache.', strong: 'Names the fan-out lag metric, what a queue backlog looks like on a dashboard, and how a cold cache degrades to a read-time merge.' },
      { criterion: 'Communication', weak: 'Buries the fan-out decision in the middle of unrelated detail.', strong: 'Opens by naming fan-out as the crux, resolves it, then spends remaining time on the parts that depend on it.' },
    ],
  },
  {
    key: 'ratelimiter',
    id: 'rate-limiter',
    title: 'Rate Limiter',
    icon: Shield,
    difficulty: 'Medium',
    timeEstimate: '30-35 min',
    functionalReqs: ['Limit requests per user/IP per time window', 'Multiple rules: 100 req/min for free tier, 1000 req/min for paid', 'Return 429 Too Many Requests when the limit is exceeded', 'Distributed: work across multiple servers'],
    nonFunctionalReqs: ['Under 1ms added latency per request', 'Works correctly in a distributed environment', 'Handles Redis failure gracefully (fail-open or fail-closed)', 'Configurable rules without a code deploy'],
    scaleTargets: ['100K requests/sec total', 'Rules evaluated in under 1ms', 'Counters stored in-memory (Redis), not on disk'],
    steps: [
      { title: '1. Algorithm selection', description: 'Five common algorithms: token bucket (tokens added at rate R, consumed per request, allows bursts; the most common), leaky bucket (fixed output rate, queues incoming; used for traffic shaping), fixed window counter (count resets every window boundary; simple but has a boundary burst problem), sliding window log (exact, but high memory), and sliding window counter (an approximation with the best accuracy-to-cost tradeoff).', keyDecisions: ['Token bucket is the most common for API rate limiting: it allows reasonable bursting and is simple to implement.', 'Fixed window has a "boundary attack" problem: 100 requests at 0:59 plus 100 requests at 1:01 means 200 requests in a 2-second window.', 'Sliding window counter approximation: current_window_count + prev_window_count x overlap_ratio solves the boundary problem with minimal memory.'] },
      { title: '2. Distributed counter storage', description: 'A single server can use an in-memory counter. Distributed systems must share state. Options: Redis (atomic INCR + EXPIRE), Redis Lua scripts (for multi-key atomic operations), or a dedicated rate-limit service. Redis INCR is atomic and supports EXPIRE, a natural fit. Pattern: SET key = "{user_id}:{window}" with a TTL equal to the window duration, then INCR and check against the limit.', keyDecisions: ['Pipeline INCR + EXPIRE in one round trip.', 'Use Lua scripts for sliding-window algorithms to keep multiple Redis commands atomic.', 'Key structure: "rate_limit:{user_id}:{minute}" expires automatically after the window.'] },
      { title: '3. Where to enforce', description: 'Options: client-side (easily bypassed), API gateway (centralized and consistent, best for most cases), application code (flexible, per-endpoint), or dedicated middleware. For a system design interview, an API gateway backed by Redis is the standard answer. The rate limiter reads a user identifier (API key or IP), checks Redis, increments the counter, and returns 429 or passes the request through.', keyDecisions: ['The API gateway is the right layer: a single enforcement point for all services.', 'Return headers X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset so clients can self-throttle.', 'Vary limits by endpoint: /search costs 1 credit, /recommendations costs 5 credits.'] },
      { title: '4. Handling Redis failure', description: 'If Redis goes down, you have two options: fail open (let all requests through, better for availability but riskier for abuse) or fail closed (reject all requests, safe but a bad user experience). Most APIs choose fail-open with alerts. A local in-memory fallback cache can handle the window between Redis failure and recovery, with lower per-process limits.', keyDecisions: ['Fail-open is standard for most consumer APIs: downtime is worse than a rate-limit bypass for a few minutes.', 'In-memory fallback limits should be lower than Redis limits to reduce abuse exposure.', 'Circuit breaker pattern: if Redis INCR fails N times in a row, switch to local mode and alert.'] },
    ],
    keyComponents: [
      { name: 'API gateway', why: 'Centralized enforcement point before requests reach services' },
      { name: 'Redis cluster', why: 'Distributed atomic counters; INCR + EXPIRE per window' },
      { name: 'Config service', why: 'Rules stored in a config DB; hot-reloadable without a code deploy' },
      { name: 'In-memory fallback', why: 'Handles Redis failures without a full outage (fail-open)' },
    ],
    tradeoffs: ['Token bucket vs. sliding window: token bucket is simpler, sliding window is more accurate at boundaries.', 'Fail-open vs. fail-closed: most consumer APIs choose fail-open for availability.', 'Redis atomicity: INCR is atomic, but a multi-key sliding window needs a Lua script.'],
    followUps: ['How do you handle distributed race conditions?', 'How would you implement per-endpoint cost (some endpoints count as 5 requests)?', 'How do you handle users with multiple API keys?', 'How do you prevent Redis from becoming a bottleneck?'],
    rubric: [
      { criterion: 'Requirement negotiation', weak: 'Never asks what is being limited, per user or per IP, or what happens on the limiter\'s own failure.', strong: 'Fixes the key (API key, user, IP), the tiers, the response contract for a rejection, and whether fail-open is acceptable.' },
      { criterion: 'Tradeoff articulation', weak: 'Lists algorithms without choosing, or picks fixed window and misses the boundary burst.', strong: 'Chooses token bucket for burst tolerance, explains the sliding window counter as the accuracy-for-memory trade, and quantifies the fixed window boundary problem.' },
      { criterion: 'Team and delivery implications', weak: 'Puts the limiter in each service by hand.', strong: 'Places enforcement in the gateway so one team owns it, and makes rules config-driven so a limit change is not a deploy.' },
      { criterion: 'Operability', weak: 'No answer for a Redis outage beyond "it should not happen".', strong: 'Picks fail-open with a lower local fallback limit, adds a circuit breaker, and names the alert that fires when the limiter degrades.' },
      { criterion: 'Communication', weak: 'Explains the algorithm in code rather than in behaviour.', strong: 'Describes each algorithm in one sentence of observable behaviour before touching implementation detail.' },
    ],
  },
  {
    key: 'notifications',
    id: 'notification-system',
    title: 'Notification System',
    icon: Zap,
    difficulty: 'Medium',
    timeEstimate: '35-40 min',
    functionalReqs: ['Send notifications via email, SMS, and push (iOS/Android)', 'Support immediate and scheduled notifications', 'User preference management (opt out per channel/type)', 'Notification history and delivery tracking'],
    nonFunctionalReqs: ['10M notifications/day', 'Soft real-time: delivery within 1-5 seconds', 'High reliability: no missed critical notifications', 'Deduplication: a duplicate event must not produce a second notification'],
    scaleTargets: ['10M/day = ~115 notifications/sec average', 'Peaks at 10x = 1,150/sec during burst events', 'Email via SES/SendGrid; SMS via Twilio; push via APNs/FCM'],
    steps: [
      { title: '1. Event ingestion', description: 'Services emit notification events to a Kafka topic ("notification-requests"). Event schema: {event_id, user_id, type (email/sms/push), template_id, params, priority, send_at?}. Kafka decouples the notification logic from the triggering service, and events can be replayed on failure.', keyDecisions: ['Separate Kafka topics by priority: high-priority (OTP, security alerts) vs. low-priority (marketing).', 'Include a unique event_id for idempotency, to prevent duplicate delivery on retry.', 'Kafka retention of 7 days allows reprocessing on downstream failures.'] },
      { title: '2. Notification router', description: 'A consumer service reads from Kafka and: (1) checks user preferences (opt-in/opt-out per channel and notification type), (2) looks up user contact info (email, phone, device tokens), (3) renders the notification template with the provided params, and (4) routes to the appropriate channel worker: email queue, SMS queue, or push queue.', keyDecisions: ['Check user preferences before routing, so opt-outs are respected at this layer.', 'A template service renders HTML/text from template_id plus params; never store rendered content in the event.', 'Channel-specific queues allow independent scaling of email, SMS, and push workers.'] },
      { title: '3. Channel workers and third-party integration', description: 'Each channel has a dedicated worker pool: email workers call SES/SendGrid, SMS workers call Twilio, push workers call APNs/FCM. Workers handle rate limiting (Twilio limits SMS per second), retry logic with exponential backoff, and vendor failover (primary SendGrid, fallback SES).', keyDecisions: ['APNs/FCM manage their own queueing: just send, and they deliver when the device is online.', 'Retry with exponential backoff plus a dead letter queue for persistently failing notifications.', 'Circuit breaker: if Twilio fails 10 consecutive times, pause and alert.'] },
      { title: '4. Delivery tracking and deduplication', description: 'Deduplication: store event_id in Redis with a 24-hour TTL, and check on consumption; if event_id already exists, skip. Delivery tracking: each notification record is stored in the DB with a status (pending, sent, delivered, failed). Webhooks from email providers (SES, SendGrid) update delivery status. Push delivery is fire-and-forget: acknowledge at send to APNs/FCM.', keyDecisions: ['The idempotency key (event_id) is the primary deduplication mechanism.', 'Use Redis for deduplication (fast lookup, TTL-based cleanup) and the DB for durable delivery records.', 'Ingest webhooks for email opens/clicks to update user engagement signals.'] },
    ],
    keyComponents: [
      { name: 'Kafka', why: 'Decouples triggering services from notification delivery; replayable' },
      { name: 'Notification router', why: 'Applies user preferences, resolves templates, routes to channels' },
      { name: 'Channel workers', why: 'Independent scaling per channel; handles third-party rate limits' },
      { name: 'Redis (dedup + rate limit)', why: 'Event deduplication and per-user notification rate limiting' },
      { name: 'Template service', why: 'Separate rendering concern; supports A/B testing of notification copy' },
    ],
    tradeoffs: ['Delivery guarantee: Kafka gives at-least-once delivery, so every consumer must be idempotent. Keying on event_id in Redis makes a duplicate delivery a no-op, which is the practical answer. Say "at-least-once plus idempotent consumers", not "exactly-once".', 'Scheduled notifications: store in the DB with send_at, and a cron job polls and emits to Kafka 5 minutes before send time.', 'Push vs. SMS for critical alerts: push is free but unreliable (the app might be deleted); SMS is paid but reliable.'],
    followUps: ['How would you handle timezone-aware scheduled notifications at scale?', 'How do you prevent notification storms (sending 10M notifications simultaneously)?', 'How do you implement notification preference management with inheritance (a global opt-out overrides all)?'],
    rubric: [
      { criterion: 'Requirement negotiation', weak: 'Treats every channel and priority as one flow.', strong: 'Separates transactional from marketing traffic, sets the delivery latency target per class, and confirms preference and quiet-hour rules up front.' },
      { criterion: 'Tradeoff articulation', weak: 'Claims exactly-once delivery.', strong: 'Says at-least-once plus idempotent consumers keyed on event_id, and explains why a true exactly-once guarantee is not on offer end to end.' },
      { criterion: 'Team and delivery implications', weak: 'One worker pool for all channels.', strong: 'A queue and worker pool per channel so email, SMS and push scale and fail independently, with provider integration owned per channel.' },
      { criterion: 'Operability', weak: 'No view of provider failure or a stuck queue.', strong: 'Per-provider error rate and queue depth on a dashboard, retry with backoff into a dead letter queue, and a circuit breaker per provider.' },
      { criterion: 'Communication', weak: 'Describes the pipeline out of order, starting at the provider.', strong: 'Follows one notification from the emitting service to the device, naming what could drop it at each hop.' },
    ],
  },
  {
    key: 'rollout',
    id: 'rollout-and-on-call-plan',
    title: 'Rollout and on-call plan for a new service',
    icon: Cloud,
    difficulty: 'Medium',
    timeEstimate: '40-45 min',
    functionalReqs: [
      'Your team is two weeks from shipping a new service behind an existing product surface. Describe how it reaches 100% of traffic and how it is run afterwards.',
      'Every release path is reversible without a code deploy: a feature flag off switch and a documented rollback.',
      'Every alert that can page a human has a runbook and a named owner.',
      'The team, not you, is on call by the end of the first quarter.',
    ],
    nonFunctionalReqs: [
      'SLOs (service level objectives, the reliability targets you promise): 99.9% of requests succeed, P99 latency under 300ms, measured over a rolling 28 days.',
      'Error budget: 99.9% availability allows about 43 minutes of failure per 30 days. Spending it pauses feature work and moves the team to reliability.',
      'No alert fires without a runbook, and no runbook step says "ask the author".',
      'A rollback takes under 5 minutes and needs one on-call engineer, not a release train.',
    ],
    scaleTargets: [
      'Traffic ramp: 1% internal, then 5%, 25%, 50%, 100%, each step held long enough to see a full traffic cycle (24 hours for a consumer surface).',
      'Canary pool sized so 1% of traffic still produces enough requests per minute to detect a 1% error rate increase, which is roughly 10K requests per step.',
      'On-call rotation of at least 6 engineers so each carries the pager about one week in six.',
      'Paging budget: under 2 pages per on-call shift. More than that is an alerting bug, not a hero moment.',
    ],
    steps: [
      { title: '1. Define SLOs and alerts before the code is written', description: 'Pick the two or three indicators a customer would actually notice: request success rate, latency at P99, and freshness if the service produces data. Turn each into an SLO with a window, then derive the error budget from it. Alerts are burn-rate alerts on the budget, not thresholds on raw CPU.', keyDecisions: ['Write the SLO before the implementation, because it changes the design. A 99.99% target forces redundancy that 99.9% does not.', 'Alert on symptoms a user feels (errors, latency), not causes (CPU, memory). Cause metrics belong on dashboards.', 'Use fast and slow burn-rate alerts: a fast burn pages now, a slow burn opens a ticket.'] },
      { title: '2. Progressive rollout', description: 'The service goes out dark first: deployed, receiving no traffic, behind a feature flag. Then a canary pool takes a small slice of real traffic while the stable pool serves the rest, and the percentage ramps on a schedule with an explicit hold at each step. A kill switch turns the flag off without a deploy.', keyDecisions: ['Deploy and release are separate events. The binary ships early; the flag decides who sees it.', 'Each ramp step has a written abort condition, for example error rate above 0.5% or P99 above 400ms for 10 minutes.', 'The kill switch is tested in staging and in production at 1%, before it is needed under pressure.', 'Flags are removed on a schedule. A flag left in place for a year is a branch nobody tests.'] },
      { title: '3. Observability', description: 'The three signals are metrics (cheap, aggregated, good for alerting), logs (expensive, detailed, good for one request) and traces (a request across services, good for finding which hop is slow). Instrument all three before the first ramp step, and build the dashboard the on-call engineer opens at 3am, not the one that looks impressive in a review.', keyDecisions: ['One dashboard per service answering: is it up, is it fast, is it erroring, and what changed recently.', 'Deploy and flag changes are annotated on every graph, because "what changed" is the first on-call question.', 'Sample traces rather than capturing all of them, and always keep traces for failed requests.', 'Structured logs with a request id that appears in the trace, so one identifier crosses all three signals.'] },
      { title: '4. On-call design', description: 'A rotation of six or more engineers keeps the pager to about one week in six, which is sustainable. Escalation has two tiers: primary, then secondary after 10 unacknowledged minutes, then the manager. Only customer-facing symptoms page; everything else becomes a ticket. Every alert links to a runbook with the diagnosis steps and the safe mitigations.', keyDecisions: ['Under six engineers, do not create the rotation. Share it with a partner team or reduce what pages.', 'A runbook per alert, written by whoever added the alert, and validated the first time it fires.', 'On-call is protected time. The on-call engineer carries no sprint commitments that week.', 'Handoff is a written summary at shift end: what fired, what is still open, what is fragile.'] },
      { title: '5. Incident process', description: 'Severity levels set the response: SEV1 is customer-visible and widespread, SEV2 is degraded or partial, SEV3 is internal only. A SEV1 gets an incident commander who coordinates rather than debugs, a communications owner posting updates on a fixed cadence, and a single channel of record. Mitigate first, diagnose after.', keyDecisions: ['Roles are separate: commander, operator, communicator. One engineer debugging while writing status updates does both badly.', 'A fixed comms cadence, for example every 30 minutes for a SEV1 even when there is nothing new, because silence generates escalations.', 'Blameless postmortem within 5 business days, with action items that have owners and dates, tracked like any other work.', 'Roll back first and understand later. Restoring service is not the same as finding the cause.'] },
      { title: '6. The first 90 days', description: 'For the first month you review the SLO dashboard and every page weekly with the team, and tune alert thresholds against what actually fired. In month two ownership moves to the team: they take the pager, run their own incident reviews, and you attend. By month three your review is the SLO trend and the postmortem action items, not the graphs.', keyDecisions: ['Weekly for the first month: alert noise, error budget burn, and the top three fragile paths.', 'Hand the pager to the team once every alert has fired at least once and its runbook has been used.', 'Track paging load as a first-class metric. Rising pages mean reliability work, not a tougher rotation.', 'Close the loop: an incident that produced no change to the alerting, the runbook or the code was not reviewed properly.'] },
    ],
    keyComponents: [
      { name: 'Feature flag service', why: 'Separates deploy from release; the kill switch that reverses a rollout without a build' },
      { name: 'Canary and stable pools', why: 'A small slice of real traffic proves the change against production load before the ramp' },
      { name: 'Metrics and SLO platform', why: 'Holds the error budget and drives burn-rate alerts on customer-visible symptoms' },
      { name: 'Tracing and structured logs', why: 'Turns "the service is slow" into "this hop is slow for these requests"' },
      { name: 'Paging and runbook system', why: 'Routes an alert to a named human with the documented steps attached' },
    ],
    tradeoffs: [
      'Ramp speed versus confidence: a fast ramp ships sooner, a slow ramp sees a full daily traffic cycle at each step. Pick by how reversible the change is.',
      'Tight SLOs versus delivery pace: every extra nine costs redundancy and engineering time, so promise only what the product needs.',
      'Alert sensitivity versus pager load: sensitive alerts catch more real problems and burn the rotation out. Page on symptoms, ticket the rest.',
      'Flags versus complexity: flags make rollout safe and the code path matrix larger, so removal has to be scheduled.',
      'A small rotation versus shared on-call: fewer people means faster context and faster burnout. Under six engineers, share the rotation.',
    ],
    followUps: [
      'Your canary looks healthy at 1% but breaks at 25%. What class of bug does that pattern suggest, and how would you find it?',
      'The team has burned 80% of the error budget in week two. What do you change this week?',
      'An engineer says on-call is unsustainable. What do you measure before you respond?',
      'How do you roll out a change that needs a database migration, where the flag cannot reverse the data change?',
      'The service has no incidents for a quarter. What does that tell you about the SLO?',
    ],
    rubric: [
      { criterion: 'Requirement negotiation', weak: 'Starts describing a deployment pipeline without asking what the service does or who it affects.', strong: 'Establishes what must be true at launch, whose traffic is at risk, and the SLO the product actually needs before choosing a rollout shape.' },
      { criterion: 'Tradeoff articulation', weak: 'Says "use canaries and feature flags" as best practice with no cost named.', strong: 'Prices each choice: ramp speed against confidence, alert sensitivity against pager load, extra nines against delivery pace.' },
      { criterion: 'Team and delivery implications', weak: 'Treats rollout as an infrastructure task and never mentions the team.', strong: 'Names who owns the pager, when ownership transfers, and how on-call load is kept sustainable at the team\'s actual headcount.' },
      { criterion: 'Operability', weak: 'Lists monitoring tools without saying what would page or what the responder does next.', strong: 'Ties every alert to a customer-visible symptom, a runbook and a mitigation, and defines the abort condition for each ramp step.' },
      { criterion: 'Communication', weak: 'Describes the happy path only, and has no answer for how an incident is communicated.', strong: 'Separates incident roles, commits to a comms cadence, and explains the blameless postmortem as a mechanism rather than a ritual.' },
    ],
  },
]

export const architecturePatterns: ArchitecturePattern[] = [
  { id: 'microservices-pattern', name: 'Microservices', icon: GitBranch, description: 'Distributed architecture with independent services.', pros: ['Independent scaling', 'Technology diversity', 'Fault isolation', 'Team autonomy'], cons: ['Network complexity', 'Data consistency challenges', 'Operational overhead', 'Distributed tracing required'], when: 'A large org with multiple teams. Services have very different scale requirements. You need independent deploy cadences.' },
  { id: 'cqrs-pattern', name: 'CQRS', icon: Database, description: 'Command Query Responsibility Segregation: separate read and write models.', pros: ['Optimized read models', 'Independent scaling of reads and writes', 'Event sourcing compatibility', 'Query performance'], cons: ['Eventual consistency', 'Added complexity', 'Sync overhead between models'], when: 'Read-heavy systems (social media, analytics). Complex domain models. Read and write patterns differ significantly.' },
  { id: 'event-sourcing-pattern', name: 'Event Sourcing', icon: Zap, description: 'Store events as the source of truth, and derive state by replaying them.', pros: ['Complete audit log', 'Temporal queries (state at any point in time)', 'Event replay for debugging', 'Natural integration with CQRS'], cons: ['Query complexity', 'Event schema evolution', 'Storage growth', 'Learning curve'], when: 'Financial systems (transactions). Audit requirements. Debugging complex distributed system state.' },
  { id: 'saga-pattern', name: 'Saga Pattern', icon: GitBranch, description: 'Manage distributed transactions across services using compensating transactions.', pros: ['Avoids distributed locks', 'Services remain loosely coupled', 'Works with eventual consistency'], cons: ['Compensating transactions are complex', 'Difficult to debug', 'Not truly ACID'], when: 'Long-running business transactions spanning multiple services. Order processing, booking systems.' },
  { id: 'circuit-breaker-pattern', name: 'Circuit Breaker', icon: Shield, description: 'Prevent cascade failures by failing fast when a downstream service is unhealthy.', pros: ['Prevents cascade failures', 'Fast failure detection', 'Automatic recovery', 'Fallback responses'], cons: ['Adds latency for threshold checks', 'Complex state management', 'False positives possible'], when: 'Any service that calls a third-party or potentially failing downstream dependency.' },
  { id: 'bulkhead-pattern', name: 'Bulkhead', icon: Server, description: 'Isolate components to prevent one failure from taking down the whole system.', pros: ['Failure isolation', 'Resource partitioning', 'Predictable degradation'], cons: ['Resource waste in some configurations', 'Added complexity'], when: 'Multi-tenant systems. Services where one customer or feature should not starve others.' },
]

export const capPillars = [
  { key: 'C', title: 'Consistency', description: 'Every client sees the same write result across replicas.', chip: 'Strong correctness' },
  { key: 'A', title: 'Availability', description: 'Every request gets a response, even if some replicas disagree.', chip: 'Fast responses' },
  { key: 'P', title: 'Partition Tolerance', description: 'The system keeps operating even when replicas lose network contact.', chip: 'Assumed in distributed systems' },
] as const

export const deepDiveVideos: DeepDiveVideo[] = [
  {
    title: 'CAP Theorem Simplified',
    channel: 'ByteByteGo',
    href: 'https://www.youtube.com/watch?v=BHqjEjzAicA',
    embedId: 'BHqjEjzAicA',
    focus: 'Explains the interview-safe nuance that partitions force a C vs. A trade-off.',
    whenToWatch: 'Watch before practicing CAP, PACELC, or database trade-off questions.',
    tags: ['CAP', 'Partitions', 'Trade-offs'],
  },
  {
    title: 'Introduction to NoSQL databases',
    channel: 'Gaurav Sen',
    href: 'https://www.youtube.com/watch?v=xQnIN9bW0og',
    embedId: 'xQnIN9bW0og',
    focus: 'Strong intuition for why NoSQL systems scale and what you give up compared with relational models.',
    whenToWatch: 'Use when SQL vs. NoSQL answers still feel hand-wavy.',
    tags: ['NoSQL', 'Cassandra', 'Scaling'],
  },
  {
    title: 'Caching Pitfalls Every Developer Should Know',
    channel: 'ByteByteGo',
    href: 'https://www.youtube.com/watch?v=wh98s0XhMmQ',
    embedId: 'wh98s0XhMmQ',
    focus: 'Covers invalidation, staleness, and failure modes that interviewers often probe after the happy path.',
    whenToWatch: 'Best right before cache-aside or hot-key follow-up practice.',
    tags: ['Caching', 'Invalidation', 'Performance'],
  },
  {
    title: 'Consistent Hashing | Algorithms You Should Know #1',
    channel: 'ByteByteGo',
    href: 'https://www.youtube.com/watch?v=UF9Iqmg94tk',
    embedId: 'UF9Iqmg94tk',
    focus: 'Turns a common distributed systems buzzword into a concrete mental model you can explain on a whiteboard.',
    whenToWatch: 'Use before discussing sharding, rebalancing, or load distribution.',
    tags: ['Consistent Hashing', 'Sharding', 'Distributed Systems'],
  },
  {
    title: 'What is a Load Balancer?',
    channel: 'IBM Technology',
    href: 'https://www.youtube.com/watch?v=sCR3SAVdyCc',
    embedId: 'sCR3SAVdyCc',
    focus: 'A clear explanation of how traffic distribution, health checks, and routing strategy actually work.',
    whenToWatch: 'Use before talking about L4 vs. L7, stateless scaling, or reliability patterns.',
    tags: ['Load Balancing', 'Traffic Routing', 'Availability'],
  },
  {
    title: 'System Design: Why is Kafka fast?',
    channel: 'ByteByteGo',
    href: 'https://www.youtube.com/watch?v=UNUz1-msbOM',
    embedId: 'UNUz1-msbOM',
    focus: 'Gives you concrete language for partitions, sequential disk I/O, batching, and consumer replay.',
    whenToWatch: 'Best before answering Kafka vs. queue, event streaming, or analytics pipeline questions.',
    tags: ['Kafka', 'Streaming', 'Message Queues'],
  },
] as const

export const nosqlTypes = [
  { type: 'Document', example: 'MongoDB', use: 'Semi-structured data' },
  { type: 'Key-Value', example: 'Redis, DynamoDB', use: 'Caching, sessions' },
  { type: 'Wide-Column', example: 'Cassandra', use: 'Time series, analytics' },
  { type: 'Graph', example: 'Neo4j', use: 'Social networks, recommendations' },
] as const

export const shardingStrategies = [
  { name: 'Range', pro: 'Cheap range queries', issue: 'Hot spots' },
  { name: 'Hash', pro: 'Even distribution', issue: 'Hard range queries' },
  { name: 'Directory', pro: 'Flexible', issue: 'Lookup overhead' },
] as const

export const loadBalancingAlgorithms = [
  { name: 'Round Robin', desc: 'Even distribution', best: 'Stateless servers' },
  { name: 'Least Connections', desc: 'Smart routing', best: 'Varying request duration' },
  { name: 'IP Hash', desc: 'Session affinity', best: 'Stateful connections' },
  { name: 'Weighted', desc: 'Proportional', best: 'Heterogeneous servers' },
  { name: 'Layer 4 (TCP)', desc: 'Fast, simple', best: 'High throughput' },
  { name: 'Layer 7 (HTTP)', desc: 'Content-aware', best: 'Path-based routing' },
] as const

export const acidPillars = [
  { letter: 'A', word: 'Atomicity', desc: 'All-or-nothing' },
  { letter: 'C', word: 'Consistency', desc: 'Valid state to valid state' },
  { letter: 'I', word: 'Isolation', desc: 'Concurrent behaves like serial' },
  { letter: 'D', word: 'Durability', desc: 'Committed survives a crash' },
] as const

export const isolationLevels = [
  { level: 'Read Uncommitted', dirtyRead: false, nonRepeatable: false, phantom: false },
  { level: 'Read Committed', dirtyRead: true, nonRepeatable: false, phantom: false },
  { level: 'Repeatable Read', dirtyRead: true, nonRepeatable: true, phantom: false },
  { level: 'Serializable', dirtyRead: true, nonRepeatable: true, phantom: true },
] as const

export const dbInternalsComponents = [
  { name: 'WAL', full: 'Write-Ahead Log', desc: 'Crash recovery, replication' },
  { name: 'MVCC', full: 'Multi-Version Concurrency', desc: 'Snapshot isolation' },
  { name: 'Buffer Pool', full: 'In-memory cache', desc: 'Hot pages in memory' },
  { name: 'Connection Pool', full: 'PgBouncer, ProxySQL', desc: 'Reuse connections' },
] as const

export const indexTypes = [
  { name: 'B-Tree', lookup: 'O(log n)', range: true, equality: true },
  { name: 'Hash', lookup: 'O(1)', range: false, equality: true },
  { name: 'LSM Tree', lookup: 'O(log n)', range: true, equality: true },
] as const

export const cachingComparisonRows = [
  { strategy: 'Cache-Aside', pros: 'Simple, on-demand', cons: 'Cache miss penalty', bestFor: 'Read-heavy workloads' },
  { strategy: 'Write-Through', pros: 'Always consistent', cons: 'Higher write latency', bestFor: 'Financial data' },
  { strategy: 'Write-Behind', pros: 'Fast writes', cons: 'Risk of data loss', bestFor: 'Analytics, counters' },
] as const

/** Scenario ids followed by architecture pattern ids, in page order. */
export const systemDesignItemIds: readonly string[] = [
  ...scenarios.map((s) => s.id),
  ...architecturePatterns.map((p) => p.id),
]

assertTrackIds('system-design', systemDesignItemIds)
