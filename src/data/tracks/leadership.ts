import { assertTrackIds } from '@/data/tracks/ids'
import type { LucideIcon } from 'lucide-react'
import { Wrench, GitBranch, Target, AlertTriangle, CheckCircle, TrendingUp, LayoutList, GitMerge, Crosshair, Clock, Shield, Siren } from 'lucide-react'

export type LeadershipTabId =
  | 'debt'
  | 'adr'
  | 'makebuy'
  | 'oncall'
  | 'codereview'
  | 'roadmap'
  | 'pmlc'
  | 'tbd'
  | 'scoping'
  | 'incident'

export interface LeadershipTab {
  id: LeadershipTabId
  title: string
  icon: LucideIcon
  summary: string
}

export const leadershipTabs: readonly LeadershipTab[] = [
  { id: 'debt', title: 'Tech debt', icon: Wrench, summary: 'A 5-step framework for making tech debt visible, prioritized, and strategically managed.' },
  { id: 'adr', title: 'ADR template', icon: GitBranch, summary: 'Architecture decision records capture context and consequences alongside the code they govern.' },
  { id: 'makebuy', title: 'Make vs buy', icon: Target, summary: 'A scoring matrix for build versus buy, plus total cost of ownership.' },
  { id: 'oncall', title: 'On-call', icon: AlertTriangle, summary: 'Practices that balance reliability with engineer wellbeing.' },
  { id: 'codereview', title: 'Code review', icon: CheckCircle, summary: 'What review is actually for, and the culture that keeps it healthy.' },
  { id: 'roadmap', title: 'Tech roadmap', icon: TrendingUp, summary: 'How a technical roadmap serves the product strategy instead of running beside it.' },
  { id: 'pmlc', title: 'PMLC vs SDLC', icon: LayoutList, summary: 'Two lifecycles every engineering manager must articulate clearly, running in parallel.' },
  { id: 'tbd', title: 'Trunk-based dev', icon: GitMerge, summary: 'A high-velocity branching strategy built on a single, always-deployable trunk.' },
  { id: 'scoping', title: 'Project scoping', icon: Crosshair, summary: 'Converting an ambiguous stakeholder ask into an executable engineering plan.' },
  { id: 'incident', title: 'Live incident scenario', icon: Siren, summary: 'A paged-at-02:10 walkthrough. Six decisions, one at a time, with the strongest call revealed after you commit.' },
]

export const leadershipItemIds: readonly string[] = leadershipTabs.map((t) => t.id)

// ---------------------------------------------------------------------------
// Tech debt
// ---------------------------------------------------------------------------

export interface TechDebtStep {
  id: string
  label: string
  content: string
}

export const techDebtSteps: readonly TechDebtStep[] = [
  {
    id: 'identify',
    label: 'Step 1: Identify and categorize',
    content:
      "Run a debt audit: list every major system, rate each on (a) frequency of touching it, (b) pain per touch (incident rate, dev slowdown), (c) blast radius if it fails. Categorize as: intentional (we chose speed over quality), unintentional (we didn't know better), bit rot (technology aged out beneath us). Do not try to fix all of it. Most debt is fine to carry indefinitely.",
  },
  {
    id: 'quantify',
    label: 'Step 2: Quantify business cost',
    content:
      'Translate each debt item into engineering hours per quarter and business risk. Example: "Our payment service has no circuit breakers. Every month it causes 1-2 incidents at roughly 8 engineering hours each: 24 eng-hours per quarter. A single incident could affect $X in GMV." This language gets executive buy-in. Never say "it\'s messy": say "it costs us X per quarter and carries Y risk."',
  },
  {
    id: 'prioritize',
    label: 'Step 3: Prioritize with a matrix',
    content:
      'Score each debt item on: (1) business impact if fixed (velocity gain, risk reduction), (2) effort to fix, (3) window of opportunity (are we touching this system anyway?). Prioritize items with high impact, low effort, and an active development window. Defer items that are stable and not on the critical path. The "strangler fig" pattern replaces legacy systems incrementally while keeping them running.',
  },
  {
    id: 'allocate',
    label: 'Step 4: Allocate capacity (20/10/70)',
    content:
      'A common split: 20% of sprint capacity for tech debt, 10% for developer experience improvements, 70% for product features. This makes debt work visible and sustainable. An alternative is a dedicated debt sprint every fourth sprint. Never let debt work disappear into individual engineer slack time: it needs to be trackable, prioritized, and deliverable like any other work.',
  },
  {
    id: 'prevent',
    label: 'Step 5: Prevent accumulation',
    content:
      'Debt accumulates fastest at decision points: tight deadlines, new engineer onboarding, architecture pivots. Prevention: (1) include a "debt tax" in every project estimate, budgeting 20% for doing it right, (2) require an ADR (architecture decision record) for any intentional debt with a paydown date, (3) run quarterly tech health reviews to catch drift early.',
  },
]

// ---------------------------------------------------------------------------
// ADR
// ---------------------------------------------------------------------------

export const adrTemplate = `# ADR-001: [Decision Title]
Date: YYYY-MM-DD
Status: Proposed | Accepted | Deprecated | Superseded

## Context
What is the issue that motivates this decision?
What is the current situation? What constraints apply?

## Decision
What decision have we made? State it clearly.
"We will use X because Y."

## Alternatives Considered
| Option | Pros | Cons | Rejected Because |
|--------|------|------|-----------------|
| A      | ...  | ...  | ...              |
| B      | ...  | ...  | Chosen option    |

## Consequences
### Positive
- What becomes easier or possible with this decision?

### Negative
- What becomes harder? What do we take on as debt?

### Risks
- What could go wrong? How do we mitigate?

## Review Date
When should this decision be revisited?
[Date or trigger condition]

## Participants
- Decision owner: @name
- Reviewers: @name, @name`

export const adrWhenToWrite: readonly string[] = [
  'Choosing a new technology, framework, or vendor',
  'Making a significant architecture change',
  'Taking on intentional technical debt',
  'Establishing a team-wide engineering practice',
  'Any decision that is difficult or expensive to reverse',
]

export const adrBestPractices: readonly string[] = [
  'Write the ADR before implementing, not after',
  'Keep them short: one page maximum',
  'Never delete old ADRs, mark them as superseded',
  'Review annually or when context changes significantly',
  'Include the date. Decisions age, context ages',
]

// ---------------------------------------------------------------------------
// Make vs buy
// ---------------------------------------------------------------------------

export interface MakeBuyCriterion {
  criterion: string
  build: boolean | null
  buy: boolean | null
  note: string
}

export const makeBuyCriteria: readonly MakeBuyCriterion[] = [
  { criterion: 'Core competitive differentiation?', build: true, buy: false, note: 'If it is your moat, build it' },
  { criterion: 'Available commodity solutions?', build: false, buy: true, note: 'The wheel already exists, do not reinvent it' },
  { criterion: 'Custom integration requirements?', build: true, buy: null, note: 'Deep integration often means build' },
  { criterion: 'Speed to market critical?', build: false, buy: true, note: 'Buying buys you time to focus on differentiation' },
  { criterion: 'Full data control required?', build: true, buy: false, note: 'Regulated industries often require build' },
  { criterion: 'Long-term maintenance burden?', build: null, buy: true, note: 'Buying offloads maintenance forever' },
  { criterion: 'Team has deep domain expertise?', build: true, buy: false, note: "Build when you have the skill, buy when you don't" },
  { criterion: 'Vendor lock-in risk acceptable?', build: null, buy: true, note: 'Assess exit cost before committing' },
]

// ---------------------------------------------------------------------------
// On-call
// ---------------------------------------------------------------------------

export interface OnCallPractice {
  icon: LucideIcon
  title: string
  desc: string
}

export const onCallPractices: readonly OnCallPractice[] = [
  { icon: AlertTriangle, title: 'Runbook for every alert', desc: 'Every PagerDuty alert must link to a runbook with: what triggered it, immediate mitigation steps, escalation path, and post-incident action. An alert without a runbook is just noise that burns out your engineers.' },
  { icon: Clock, title: 'Blameless post-mortems within 48h', desc: 'Run a blameless root-cause analysis for any P0/P1 within 48 hours. Focus on: what happened, contributing factors, timeline, and systemic fixes. Never name individuals in the post-mortem report. The goal is learning, not accountability theater.' },
  { icon: Shield, title: 'On-call rotation equity', desc: 'Distribute on-call burden fairly: at most one week per month per engineer. Ensure every person on rotation has the knowledge and access to respond. Pay on-call compensation explicitly, in time-in-lieu or cash. Burnout from on-call is the top cause of attrition on infra-heavy teams.' },
  { icon: TrendingUp, title: 'Track and trend alert volume', desc: 'Alert fatigue kills SLA adherence. If an engineer receives more than 5 pages a week on non-actionable alerts, treat it as a P1. Set a goal of fewer than 5 actionable pages per week per engineer. Review alert noise monthly and fix or silence it.' },
  { icon: GitMerge, title: 'Game day drills', desc: 'Run quarterly chaos engineering exercises. Inject failures into staging (kill a service, corrupt a queue, exhaust a connection pool) and practice incident response. The first time you face a failure should not be in production at 2am.' },
  { icon: Wrench, title: 'Error budget policy', desc: 'Define service level objectives for each service. Calculate the error budget as 100% minus the SLO target. If you burn more than half the error budget in a month, freeze new features and focus on reliability. Error budgets make the reliability conversation objective, not political.' },
]

// ---------------------------------------------------------------------------
// Code review culture
// ---------------------------------------------------------------------------

export const codeReviewDos: readonly string[] = [
  'Review code within 4 hours of submission during business hours (or set an explicit SLA)',
  'Give specific, actionable feedback: "Consider using a Map here for O(1) lookup," not "this is slow"',
  'Distinguish between required changes (block merge) and suggestions (optional improvement)',
  'Praise good code explicitly: review should reinforce good patterns, not just catch bad ones',
  'Ask questions rather than make demands: "What do you think about...?" lowers defensiveness',
  'Approve with confidence once your required changes are addressed. Do not gold-plate',
]

export const codeReviewDonts: readonly string[] = [
  'Nitpick style issues that a linter should catch. Automate style, humanize logic',
  'Review PRs over 400 lines in one session. Ask the author to split large PRs',
  'Use code review to assert authority. It is a collaboration, not a gatekeeping exercise',
  'Ignore test quality. Test coverage is a first-class review criterion',
  'Let PRs sit unreviewed for more than 24 hours. It is the top developer productivity killer',
  'Approve without actually reading. A rubber stamp undermines the entire practice',
]

export const codeReviewSla =
  'Establish a team agreement: all PRs reviewed within N hours of submission (commonly 4-8h). PRs sitting more than 24 hours are a team-level metric tracked in your engineering health dashboard. Unreviewed PRs create context-switching cost for the author and merge conflicts for other PRs. Review latency is the top developer productivity metric most teams never measure.'

// ---------------------------------------------------------------------------
// Tech roadmap
// ---------------------------------------------------------------------------

export interface RoadmapStep {
  step: string
  title: string
  content: string
}

export const roadmapSteps: readonly RoadmapStep[] = [
  { step: '1', title: 'Align on north star', content: "Start with the product strategy: what does the product need to look like in 18 months? Work backwards to what the technical platform must support. The tech roadmap exists to serve the product strategy, not run alongside it. If your roadmap doesn't explain how each initiative enables a product or business goal, it will get defunded." },
  { step: '2', title: 'Audit current state vs. target state', content: 'For each major system, map: current state capabilities, target state capabilities, and the gap. Categorize each gap as: (a) blocking product goals, must address, (b) significant drag, should address, (c) nice to have, low priority. This creates your initiative backlog with clear business justification.' },
  { step: '3', title: 'Sequence for dependencies', content: 'Map dependencies between initiatives. Some infrastructure must come before product features can be built. Use a dependency graph to find the critical path. Sequence your roadmap along the critical path: everything else is either parallel work or can be deferred.' },
  { step: '4', title: 'Allocate capacity realistically', content: 'A common mistake is assuming teams work at 100% capacity. In reality it is closer to 70% on planned work; the rest is incidents, reviews, meetings, and hiring. Build your roadmap on 70% capacity. If you need to go faster, you need either more people or fewer initiatives, not longer hours.' },
  { step: '5', title: 'Communicate with two audiences', content: 'A technical roadmap has two versions: (1) for engineers, detailed and system-level, showing the how; (2) for executives and stakeholders, outcome-focused, showing what becomes possible and linking to product milestones. The mistake is showing engineers the exec version (too vague) or showing execs the technical version (too detailed, which triggers micromanagement).' },
]

// ---------------------------------------------------------------------------
// PMLC vs SDLC
// ---------------------------------------------------------------------------

export interface LifecyclePhase {
  step: string
  title: string
  content: string
}

export const pmlcPhases: readonly LifecyclePhase[] = [
  { step: '1', title: 'Initiation', content: 'Define project objectives, scope, and key stakeholders. Example: a company decides to build a mobile app. The PM sets a 6-month target and identifies stakeholders (dev team, product owners, customers).' },
  { step: '2', title: 'Planning', content: 'Establish detailed plans for resources, timelines, budget, and risks. Develop the SDLC roadmap as part of planning: identify milestones like design completion and testing phases.' },
  { step: '3', title: 'Execution', content: 'Coordinate resources and execute planned tasks. The SDLC process (coding, design) begins here. This is where most of the actual work occurs.' },
  { step: '4', title: 'Monitoring and controlling', content: 'Track project performance against the plan. Ensure SDLC phases (coding, testing) complete on time and with the desired quality. Take corrective action when milestones slip.' },
  { step: '5', title: 'Closure', content: 'Finalize deliverables, close the project, document lessons learned. SDLC continues into maintenance after PMLC closure.' },
]

export const sdlcPhases: readonly LifecyclePhase[] = [
  { step: '1', title: 'Requirements', content: 'Collect and analyze requirements from stakeholders. For a banking app: online payments, account management, security features, API integrations.' },
  { step: '2', title: 'System design', content: 'Architect the system based on requirements. Create mockups, outline software architecture, define how the app interacts with databases and APIs.' },
  { step: '3', title: 'Implementation', content: 'Write the actual code based on design specs. Different modules (login, transactions, payments) are implemented by the team.' },
  { step: '4', title: 'Testing', content: 'Verify and validate the software. Run unit tests, integration tests, and user acceptance testing to ensure it works correctly across devices and platforms.' },
  { step: '5', title: 'Deployment', content: 'Deploy the software to production. Release to the app store for customer download.' },
  { step: '6', title: 'Maintenance', content: 'Ongoing support after deployment: fix bugs, update for new OS versions, add new features. This phase continues after the PMLC closes.' },
]

export const pmlcSdlcAlignment =
  'PMLC initiation sets the project timeline. PMLC planning defines the SDLC roadmap. PMLC execution runs the SDLC phases. PMLC monitoring ensures SDLC quality. PMLC closure delivers, but SDLC maintenance continues. The key insight: they are not the same lifecycle. PMLC has a defined end; SDLC continues indefinitely. Always articulate both when asked how you manage software delivery.'

// ---------------------------------------------------------------------------
// Trunk-based development
// ---------------------------------------------------------------------------

export interface TbdCard {
  title: string
  icon: LucideIcon
  content: string
}

export const tbdCards: readonly TbdCard[] = [
  { title: 'Branch management', icon: GitMerge, content: 'All developers commit directly to trunk (main). Short-lived feature branches, at most 1-2 days, are permitted for specific tasks, but must merge back quickly to minimize conflicts. Long-lived branches are an anti-pattern in trunk-based development.' },
  { title: 'Continuous integration', icon: CheckCircle, content: "Automated tests run on every commit to trunk. If tests fail, fixing the build is the top priority; nothing else ships. CI ensures the trunk is always in a deployable state. A broken build blocks the entire team." },
  { title: 'Feature flags', icon: Shield, content: 'Features not ready for production are hidden behind feature flags. Engineers commit code to trunk but activate it only when ready. This separates deployment from release: you can deploy any time and release on a business schedule.' },
  { title: 'Hotfix process', icon: Wrench, content: 'For production fixes: create a temporary branch off trunk, fix and test, then merge back immediately. Do not let hotfix branches live longer than hours. After merging, cherry-pick to any release branches if needed.' },
]

export const tbdWhy: readonly string[] = [
  'Eliminates long-lived merge conflicts ("merge hell")',
  'Forces small, incremental commits that are easier to review and revert',
  'Enables true continuous delivery pipelines',
  'Used by Google, Meta, and Netflix at scale',
]

export const tbdAntipatterns: readonly string[] = [
  'Branches living longer than 2 days',
  'Committing without automated test coverage',
  'Shipping incomplete features without feature flags',
  'Not enforcing a "fix the build first" policy',
]

// ---------------------------------------------------------------------------
// Project scoping
// ---------------------------------------------------------------------------

export interface ScopingStep {
  step: string
  title: string
  content: string
}

export const scopingSteps: readonly ScopingStep[] = [
  { step: '1', title: 'Understand requirements', content: "Gather and analyze stakeholder requirements. Identify the project's main objectives and expected outcomes. Clarify all ambiguities before proceeding. The most expensive scoping mistake is solving the wrong problem with precision." },
  { step: '2', title: 'Define project boundaries', content: "Explicitly document what is in scope and out of scope. Identify constraints (time, budget, team size). Set clear project milestones. A scope without explicit exclusions will expand: what you don't say no to becomes an implied yes." },
  { step: '3', title: 'Break down the work', content: "Use a work breakdown structure. Identify major components and features. Estimate effort for each component. Never estimate the whole project as one number: break it into pieces. Estimation accuracy is inversely proportional to the size of the unit you're estimating." },
  { step: '4', title: 'Assess risks and dependencies', content: 'Identify potential risks and their likelihood and impact. Determine inter-team dependencies: these are your highest schedule risk. Plan contingencies for your top 3 risks before they happen, not after. "We didn\'t know about X" is not acceptable when X was knowable.' },
  { step: '5', title: 'Allocate resources', content: "Determine required skills and headcount. Identify tools and external dependencies. Remember Brooks's law: adding engineers to a late project makes it later. Scope to fit the team, not the other way around." },
  { step: '6', title: 'Create a realistic timeline', content: "Build a high-level schedule with major milestones. Add a buffer of 20-30% for unexpected complexity. The schedule should survive first contact with reality. If your plan has no slack, you don't have a plan, you have a wish." },
  { step: '7', title: 'Document and communicate', content: 'Create a formal scope document. Ensure all stakeholders agree in writing before execution begins. Establish a scope-change process: any change requires a documented trade-off (added scope means added time or scope removed elsewhere). Verbal agreements are not agreements.' },
]

// ---------------------------------------------------------------------------
// Live incident scenario
// ---------------------------------------------------------------------------

export interface IncidentFact {
  label: string
  value: string
}

export const incidentScenario = {
  time: '02:10',
  intro:
    'Your phone goes off at 02:10. You are the engineering manager on the escalation rotation for a checkout service. The on-call engineer has acknowledged the page and is in the call. Telemetry is partial: the dashboards you want are not all loading, and nobody has a root cause yet. You have what is below and nothing more.',
  facts: [
    { label: 'Error rate', value: '4% on checkout, climbing' },
    { label: 'Latency', value: 'p99 up 3x against baseline' },
    { label: 'Recent change', value: 'a deploy went out 40 minutes ago' },
    { label: 'Blast radius', value: 'one region only, so far' },
    { label: 'Telemetry', value: 'partial: some dashboards are not loading' },
  ] as readonly IncidentFact[],
}

export interface IncidentOption {
  key: string
  text: string
}

export interface IncidentDecision {
  id: string
  prompt: string
  options: readonly IncidentOption[]
  strongestKey: string
  why: string
  weakSounds: string
}

export const incidentDecisions: readonly IncidentDecision[] = [
  {
    id: 'first-move',
    prompt: 'You have been on the call for 90 seconds. What is your first move?',
    options: [
      { key: 'a', text: 'Ask the on-call engineer to pull the deploy diff and find the offending change.' },
      { key: 'b', text: 'Declare an incident, take the role of incident commander or name one, and start a channel and a timeline.' },
      { key: 'c', text: 'Check whether the error rate is still climbing before calling it an incident at all.' },
    ],
    strongestKey: 'b',
    why: 'Nothing else works without structure. Declaring costs you 30 seconds and buys you a named commander, one channel, and a timeline that the postmortem and the customer update both depend on. A 4% error rate on checkout that is climbing is already an incident, so waiting for more data is only waiting. Note that as the manager you usually should not be the commander if a capable engineer can take it: your job is comms, escalation, and removing obstacles.',
    weakSounds: 'A weak answer starts debugging immediately and never names who is running the incident, so 20 minutes later three people are investigating the same theory and nobody has told anyone outside the room.',
  },
  {
    id: 'mitigate-or-diagnose',
    prompt: 'The engineer thinks the deploy is the cause but is not sure, and wants 15 minutes to confirm before touching anything. Errors are now 6%.',
    options: [
      { key: 'a', text: 'Give the 15 minutes. Rolling back on a hunch can make it worse and destroys the evidence.' },
      { key: 'b', text: 'Roll back the deploy now, and keep diagnosing after the error rate comes down.' },
      { key: 'c', text: 'Split the difference: start the rollback and have a second engineer keep digging in parallel.' },
    ],
    strongestKey: 'c',
    why: 'Mitigation comes before diagnosis, and the reason is arithmetic: every minute of a 6% checkout failure is lost orders you cannot get back, while the deploy is the highest-prior suspect and a rollback is reversible. Doing both in parallel is what separates a senior answer from a merely decisive one, because it protects the evidence the engineer is worried about losing. If the rollback does not help, you have learned something expensive but real, and you say so on the call.',
    weakSounds: 'A weak answer waits for certainty before acting, or rolls back and then stops thinking because the graph went green, which means the same incident recurs next week.',
  },
  {
    id: 'severity',
    prompt: 'Someone asks what severity this is. Your scale runs Sev1 for a full outage down to Sev4 for cosmetic.',
    options: [
      { key: 'a', text: 'Sev3, since it is one region and the service is still mostly working.' },
      { key: 'b', text: 'Sev2 now, and say out loud the condition that makes it a Sev1.' },
      { key: 'c', text: 'Hold off on a severity until the impact is measured properly.' },
    ],
    strongestKey: 'b',
    why: 'Revenue-affecting and climbing, in one region, is a Sev2 on almost any scale. The part that matters is the second half: naming the trigger in advance ("if it spreads to a second region or passes 10%, this is a Sev1 and we wake the VP") converts a future judgment call into a rule anyone on the call can apply without you. Under-calling is the more common and more expensive mistake, because the severity is what pulls in the people you will need.',
    weakSounds: 'A weak answer picks a number with no stated criteria, or deliberately under-calls to avoid waking people up, which reads as protecting yourself rather than the customer.',
  },
  {
    id: 'comms-cadence',
    prompt: 'It is 02:35. Support has not been told anything, and your status page still says all systems normal.',
    options: [
      { key: 'a', text: 'Wait until you have a root cause so the first update is accurate.' },
      { key: 'b', text: 'Post now with impact, what you are doing, and the time of the next update, then hold that interval.' },
      { key: 'c', text: 'Tell support privately so they can handle tickets, and leave the public page alone until it is resolved.' },
    ],
    strongestKey: 'b',
    why: 'An update does not require a cause. It requires impact, action, and a next-update time, and holding that interval is the whole job: every 20 to 30 minutes for a Sev2, on the dot, even when the update is "no change yet". Predictability is what stops executives and support from interrupting the people fixing the problem. Silence on the status page while customers see failures is the thing that turns an incident into a trust story.',
    weakSounds: 'A weak answer promises an update "as soon as we know more", which is the same as promising nothing and guarantees somebody starts pinging the engineer directly.',
  },
  {
    id: 'page-the-vp',
    prompt: 'The rollback has not helped. Errors are at 9% and a second region has just started showing the same pattern. It is 02:55.',
    options: [
      { key: 'a', text: 'Keep working. Waking the VP at 03:00 with no cause and no ask just adds an audience.' },
      { key: 'b', text: 'Escalate to Sev1 and page the VP now, with a one-line summary and a specific ask.' },
      { key: 'c', text: 'Send the VP a message so it is waiting for them in the morning.' },
    ],
    strongestKey: 'b',
    why: 'You named this trigger yourself at 02:20, so the decision is already made and you only have to honor it. Page with the three things a VP actually needs: what customers are experiencing, what you have tried, and what you want from them, whether that is a decision you cannot make alone, another team woken up, or air cover for a customer message. Escalating early is cheap and escalating late is a career event, and the rule to state in an interview is that you never let someone learn about a Sev1 from outside the company.',
    weakSounds: 'A weak answer treats escalation as an admission of failure, or pages upward with a narrative and no ask, which leaves the VP to invent one.',
  },
  {
    id: 'postmortem',
    prompt: 'By 04:20 a config flag was found and flipped, and error rates are normal. What do you commit to before you go back to bed?',
    options: [
      { key: 'a', text: 'A blameless postmortem within five working days, with an owner and a date on every action item.' },
      { key: 'b', text: 'A writeup from the on-call engineer, since they have the detail freshest.' },
      { key: 'c', text: 'Fix the flag handling this week and skip the postmortem, since the cause is already known.' },
    ],
    strongestKey: 'a',
    why: 'Knowing the cause is not the same as knowing why the system allowed it, which is the only question a postmortem is for. Commit to a date and an owner while the incident is still live, because the will to write it decays fast. Then two specifics that make it real: every action item gets a named owner and a due date, and at least one of them must address detection or mitigation time rather than only the immediate cause. Asking the exhausted on-call engineer to own the writeup alone is how you teach your team that incidents are punished.',
    weakSounds: 'A weak answer promises to "document the learnings", produces a timeline with no owners, or quietly assigns blame to whoever pushed the config change.',
  },
]

export const incidentListeningFor: readonly IncidentFact[] = [
  { label: 'Comms cadence', value: 'A fixed interval with a next-update time, held even when there is nothing new. Impact, action, next update, in that order.' },
  { label: 'Mitigation before diagnosis', value: 'Stop the bleeding with the reversible action first, and keep a second person diagnosing in parallel so you do not trade one for the other.' },
  { label: 'The severity call', value: 'A severity assigned early against stated criteria, plus the named condition that would raise it. Under-calling is the common failure.' },
  { label: 'When to page the VP', value: 'A trigger agreed in advance and then honored, with a one-line summary and a specific ask. Never let leadership hear it from outside first.' },
  { label: 'Postmortem commitments', value: 'Blameless, dated, owned. At least one action item aimed at detection or mitigation time, not only the immediate cause.' },
  { label: 'Your own role', value: 'You ran comms and escalation and let an engineer command the incident. A manager who takes over the keyboard is the answer that fails.' },
]

assertTrackIds('leadership', leadershipItemIds)
