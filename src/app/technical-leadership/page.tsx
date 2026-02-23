'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Target, AlertTriangle, CheckCircle, GitBranch, Shield, TrendingUp, Clock, Wrench, LayoutList, GitMerge, Crosshair } from 'lucide-react'
import { QuizLauncher } from '@/components/QuizLauncher'
import { technicalLeadershipQuestions } from '@/data/quizzes/technical-leadership'

type Section = { id: string; title: string; icon: React.ElementType; color: string; content: React.ReactNode }

const TechDebt = () => {
  const [expanded, setExpanded] = useState<string | null>(null)
  const items = [
    { id: 'identify', label: 'Step 1: Identify & Categorize', color: 'border-red-400', content: 'Run a debt audit: list every major system, rate each on (a) frequency of touching it, (b) pain per touch (incident rate, dev slowdown), (c) blast radius if it fails. Categorize as: Intentional (we chose speed over quality), Unintentional (we didn\'t know better), Bit rot (technology aged out beneath us). Do NOT try to fix all of it — most debt is fine to carry indefinitely.' },
    { id: 'quantify', label: 'Step 2: Quantify Business Cost', color: 'border-orange-400', content: 'Translate each debt item into engineering hours/quarter and business risk. Example: "Our payment service has no circuit breakers. Every month it causes 1-2 incidents at ~8 engineering hours each = 24 eng-hours/quarter. Single incident could affect $X in GMV." This language gets executive buy-in. Never say "it\'s messy" — say "it costs us X per quarter and has Y risk."' },
    { id: 'prioritize', label: 'Step 3: Prioritize with a Matrix', color: 'border-yellow-400', content: 'Score each debt item on: (1) Business impact if fixed (velocity gain, risk reduction), (2) Effort to fix, (3) Window of opportunity (are we touching this system anyway?). Prioritize items with high impact + low effort + active development window. Defer items that are stable and not on the critical path. "Strangler fig" pattern: replace legacy systems incrementally while keeping them running.' },
    { id: 'allocate', label: 'Step 4: Allocate Capacity (20/10/70)', color: 'border-green-400', content: 'I use 20-10-70: 20% of sprint capacity for tech debt, 10% for developer experience improvements, 70% for product features. This makes debt work visible and sustainable. Alternatives: dedicated "debt sprints" every 4th sprint. Never let debt work disappear into individual engineer slack time — it needs to be trackable, prioritized, and deliverable like any other work.' },
    { id: 'prevent', label: 'Step 5: Prevent Accumulation', color: 'border-blue-400', content: 'Debt accumulates fastest at decision points: tight deadlines, new engineer onboarding, architecture pivots. Prevention: (1) Include a "debt tax" in every project estimate — budget 20% for doing it right. (2) Require an ADR (Architecture Decision Record) for any intentional debt with a paydown date. (3) Run quarterly tech health reviews to catch drift early.' },
  ]
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className={`rounded-xl border-l-4 ${item.color} bg-gray-50 dark:bg-gray-900`}>
          <button onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            className="flex w-full items-center justify-between p-4 text-left">
            <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
            {expanded === item.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
          </button>
          <AnimatePresence>
            {expanded === item.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

const ADRTemplate = () => (
  <div className="rounded-xl bg-gray-900 p-5 text-sm text-green-300 font-mono leading-relaxed">
    <pre>{`# ADR-001: [Decision Title]
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
- Reviewers: @name, @name`}</pre>
  </div>
)

const MakeBuy = () => {
  const criteria = [
    { criterion: 'Core competitive differentiation?', build: true, buy: false, note: 'If it is your moat, build it' },
    { criterion: 'Available commodity solutions?', build: false, buy: true, note: 'Wheel already exists — do not reinvent' },
    { criterion: 'Custom integration requirements?', build: true, buy: null, note: 'Deep integration often means build' },
    { criterion: 'Speed to market critical?', build: false, buy: true, note: 'Buy buys you time to focus on differentiation' },
    { criterion: 'Full data control required?', build: true, buy: false, note: 'Regulated industries often require build' },
    { criterion: 'Long-term maintenance burden?', build: null, buy: true, note: 'Buying offloads maintenance forever' },
    { criterion: 'Team has deep domain expertise?', build: true, buy: false, note: 'Build when you have the skill; buy when you don\'t' },
    { criterion: 'Vendor lock-in risk acceptable?', build: null, buy: true, note: 'Assess exit cost before committing' },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="py-2 text-left font-semibold text-gray-700 dark:text-gray-300">Criterion</th>
            <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">→ Build</th>
            <th className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300">→ Buy</th>
            <th className="py-2 text-left font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">Guidance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {criteria.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <td className="py-3 text-gray-700 dark:text-gray-300">{row.criterion}</td>
              <td className="py-3 text-center">{row.build === true ? <CheckCircle className="inline h-5 w-5 text-green-500" /> : row.build === false ? <span className="text-gray-300">—</span> : <span className="text-yellow-500 text-xs">depends</span>}</td>
              <td className="py-3 text-center">{row.buy === true ? <CheckCircle className="inline h-5 w-5 text-blue-500" /> : row.buy === false ? <span className="text-gray-300">—</span> : <span className="text-yellow-500 text-xs">depends</span>}</td>
              <td className="py-3 text-xs text-gray-500 dark:text-gray-400 hidden md:table-cell">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const OnCallBestPractices = () => {
  const practices = [
    { icon: AlertTriangle, title: 'Runbook for every alert', desc: 'Every PagerDuty alert must link to a runbook with: what triggered it, immediate mitigation steps, escalation path, and post-incident action. An alert without a runbook is just noise that burns out your engineers.' },
    { icon: Clock, title: 'Blameless post-mortems within 48h', desc: 'Run a blameless RCA for any P0/P1 within 48 hours. Focus on: what happened, contributing factors, timeline, and systemic fixes. Never name individuals in the post-mortem report. The goal is learning, not accountability theater.' },
    { icon: Shield, title: 'On-call rotation equity', desc: 'Distribute on-call burden fairly. Max 1 week/month per engineer. Ensure every person on rotation has the knowledge and access to respond. Pay on-call compensation explicitly (time-in-lieu or cash). Burnout from on-call is the #1 cause of attrition in infra-heavy teams.' },
    { icon: TrendingUp, title: 'Track and trend alert volume', desc: 'Alert fatigue kills SLA adherence. If an engineer receives >5 pages/week on non-actionable alerts, treat it as a P1. Set a goal of <5 actionable pages/week per engineer. Review alert noise monthly and fix or silence the noise.' },
    { icon: GitBranch, title: 'Game day drills', desc: 'Run quarterly chaos engineering exercises. Inject failures into staging (kill a service, corrupt a queue, exhaust a connection pool) and practice your incident response. The first time you face a failure should NOT be in production at 2am.' },
    { icon: Wrench, title: 'Error budget policy', desc: 'Define SLOs (Service Level Objectives) for each service. Calculate error budget (100% - SLO target). If you burn >50% of error budget in a month, freeze new features and focus on reliability. Error budgets make the reliability conversation objective, not political.' },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {practices.map((p, i) => {
        const Icon = p.icon
        return (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-4 w-4 text-purple-500" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">{p.title}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

const CodeReviewCulture = () => {
  const dos = [
    'Review code within 4 hours of submission during business hours (or set explicit SLA)',
    'Give specific, actionable feedback: "Consider using a Map here for O(1) lookup" not "this is slow"',
    'Distinguish between required changes (block merge) and suggestions (optional improvement)',
    'Praise good code explicitly — code review should reinforce good patterns, not just catch bad ones',
    'Ask questions rather than make demands: "What do you think about...?" lowers defensiveness',
    'Approve with confidence once your required changes are addressed — do not gold-plate',
  ]
  const donts = [
    'Nitpick style issues that a linter should catch — automate style, humanize logic',
    'Review PRs > 400 lines in one session — request the author split large PRs',
    'Use code review to assert authority — it is a collaboration, not a gatekeeping exercise',
    'Ignore test quality — test coverage is a first-class review criterion',
    'Let PRs sit unreviewed for more than 24h — it is the #1 developer productivity killer',
    'Approve without actually reading — rubber stamp reviews undermine the entire practice',
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
        <h4 className="mb-3 flex items-center gap-2 font-bold text-green-800 dark:text-green-300"><CheckCircle className="h-4 w-4" /> Code Review DOs</h4>
        <ul className="space-y-2">{dos.map((d, i) => <li key={i} className="text-sm text-green-700 dark:text-green-400 flex gap-2"><span>✓</span>{d}</li>)}</ul>
      </div>
      <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
        <h4 className="mb-3 flex items-center gap-2 font-bold text-red-800 dark:text-red-300"><AlertTriangle className="h-4 w-4" /> Code Review DON'Ts</h4>
        <ul className="space-y-2">{donts.map((d, i) => <li key={i} className="text-sm text-red-700 dark:text-red-400 flex gap-2"><span>✗</span>{d}</li>)}</ul>
      </div>
    </div>
  )
}

type SectionTab = 'debt' | 'adr' | 'makebuy' | 'oncall' | 'codereview' | 'roadmap' | 'pmlc' | 'tbd' | 'scoping'

export default function TechnicalLeadershipPage() {
  const [activeTab, setActiveTab] = useState<SectionTab>('debt')

  const tabs: { id: SectionTab; label: string; icon: React.ElementType }[] = [
    { id: 'debt', label: 'Tech Debt', icon: Wrench },
    { id: 'adr', label: 'ADR Template', icon: GitBranch },
    { id: 'makebuy', label: 'Make vs Buy', icon: Target },
    { id: 'oncall', label: 'On-Call', icon: AlertTriangle },
    { id: 'codereview', label: 'Code Review', icon: CheckCircle },
    { id: 'roadmap', label: 'Tech Roadmap', icon: TrendingUp },
    { id: 'pmlc', label: 'PMLC vs SDLC', icon: LayoutList },
    { id: 'tbd', label: 'Trunk-Based Dev', icon: GitMerge },
    { id: 'scoping', label: 'Project Scoping', icon: Crosshair },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">Technical Leadership</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Tech debt · Architecture decisions · Make vs Buy · Code review culture · On-call</p>
        </motion.div>

        <QuizLauncher sectionId="leadership" title="Technical Leadership" questions={technicalLeadershipQuestions} />

        {/* Tab pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
            {activeTab === 'debt' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Managing Technical Debt</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">A 5-step framework for making tech debt visible, prioritized, and strategically managed.</p>
                <TechDebt />
              </>
            )}
            {activeTab === 'adr' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Architecture Decision Record (ADR)</h2>
                <p className="mb-4 text-gray-500 dark:text-gray-400">ADRs capture architectural decisions with their context and consequences. Store them in version control alongside code so future engineers understand why, not just what.</p>
                <ADRTemplate />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                    <h4 className="mb-2 font-bold text-green-800 dark:text-green-300">When to write an ADR</h4>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                      <li>• Choosing a new technology, framework, or vendor</li>
                      <li>• Making a significant architecture change</li>
                      <li>• Taking on intentional technical debt</li>
                      <li>• Establishing a team-wide engineering practice</li>
                      <li>• Any decision that is difficult or expensive to reverse</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                    <h4 className="mb-2 font-bold text-blue-800 dark:text-blue-300">ADR best practices</h4>
                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                      <li>• Write the ADR BEFORE implementing, not after</li>
                      <li>• Keep them short — 1 page maximum</li>
                      <li>• Never delete old ADRs — mark as Superseded</li>
                      <li>• Review annually or when context changes significantly</li>
                      <li>• Include the date — decisions age, context ages</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'makebuy' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Make vs Buy Decision Framework</h2>
                <p className="mb-4 text-gray-500 dark:text-gray-400">Use this matrix to score your decision. The correct answer depends on the specific combination of factors. There is no universal right answer.</p>
                <MakeBuy />
                <div className="mt-6 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                  <h4 className="mb-2 font-bold text-amber-800 dark:text-amber-300">Interview tip: Total Cost of Ownership (TCO)</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">Always present TCO for both options: Build (development cost + maintenance + oncall + opportunity cost of engineers not building product features). Buy (license + integration + migration risk + vendor lock-in). Many "build" decisions lose when maintenance cost is honestly accounted for. Many "buy" decisions lose when integration complexity is honestly assessed.</p>
                </div>
              </>
            )}
            {activeTab === 'oncall' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">On-Call Best Practices</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">A healthy on-call culture balances reliability with engineer wellbeing. These practices reduce burnout while improving response quality.</p>
                <OnCallBestPractices />
                <div className="mt-6 rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                  <h4 className="mb-2 font-bold text-purple-800 dark:text-purple-300">SLO / Error Budget in 60 seconds</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">SLO (Service Level Objective): The reliability target you commit to. "99.9% of API requests respond in under 200ms." Error budget: The acceptable failure margin. With 99.9% SLO, you have 0.1% = ~43 minutes/month to spend on incidents, deployments, and planned downtime. When the budget is burned: freeze new features, focus on reliability. This converts a subjective argument ("we should focus on reliability") into an objective trigger. No politics needed.</p>
                </div>
              </>
            )}
            {activeTab === 'codereview' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Building a Code Review Culture</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Code review is the highest-leverage engineering practice for quality, knowledge sharing, and team development. But it only works if the culture around it is healthy.</p>
                <CodeReviewCulture />
                <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                  <h4 className="mb-2 font-bold text-gray-800 dark:text-white">Code Review SLA</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{"Establish a team agreement: all PRs reviewed within N hours of submission (commonly 4-8h). PRs sitting >24h are a team-level metric you track in your engineering health dashboard. Unreviewed PRs create context-switching cost for the author and create merge conflicts for other PRs. Review latency is the #1 developer productivity metric most teams never measure."}</p>
                </div>
              </>
            )}
            {activeTab === 'roadmap' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Technical Roadmap Planning</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">A technical roadmap is not just a list of features — it is the story of how your engineering platform evolves to enable your product strategy.</p>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Align on North Star', content: 'Start with the product strategy: what does the product need to look like in 18 months? Work backwards to what the technical platform must support. The tech roadmap exists to serve the product strategy, not alongside it. If your roadmap doesn\'t explain how each initiative enables a product or business goal, it will get defunded.' },
                    { step: '2', title: 'Audit Current State vs. Target State', content: 'For each major system, map: current state capabilities, target state capabilities, and gap. Categorize each gap as: (a) blocking product goals — must address, (b) significant drag — should address, (c) nice to have — low priority. This creates your initiative backlog with clear business justification.' },
                    { step: '3', title: 'Sequence for Dependencies', content: 'Map dependencies between initiatives. Some infrastructure must come before product features can be built. Use a dependency graph to find the critical path. Sequence your roadmap along the critical path — everything else is either parallel work or can be deferred.' },
                    { step: '4', title: 'Allocate Capacity Realistically', content: 'Common mistake: assume teams work at 100% capacity. In reality: ~70% capacity on planned work (the rest is incidents, reviews, meetings, hiring). Build your roadmap on 70% capacity. If you need to go faster, you need either more people or fewer initiatives — not longer hours.' },
                    { step: '5', title: 'Communicate with Two Audiences', content: 'Technical roadmap has two versions: (1) For engineers: detailed, system-level, shows the "how." (2) For executives/stakeholders: outcome-focused, shows what becomes possible, links to product milestones. The mistake: showing engineers the exec version (too vague) or showing execs the technical version (too detailed, triggers micromanagement).' },
                  ].map(item => (
                    <div key={item.step} className="flex gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-bold text-white">{item.step}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === 'pmlc' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">PMLC vs SDLC</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Two complementary lifecycles every SDM must articulate clearly. PMLC governs project delivery; SDLC governs software quality. They run in parallel, not in sequence.</p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Project Management Life Cycle (PMLC)</h3>
                    <div className="space-y-3">
                      {[
                        { step: '1', title: 'Initiation', color: 'border-blue-400', content: 'Define project objectives, scope, and key stakeholders. Example: A company decides to build a mobile app — the PM sets a 6-month target and identifies stakeholders (dev team, product owners, customers).' },
                        { step: '2', title: 'Planning', color: 'border-indigo-400', content: 'Establish detailed plans for resources, timelines, budget, and risks. Develop the SDLC roadmap as part of planning — identify milestones like design completion and testing phases.' },
                        { step: '3', title: 'Execution', color: 'border-purple-400', content: 'Coordinate resources and execute planned tasks. The SDLC process (coding, design) begins here. This is where most of the actual work occurs.' },
                        { step: '4', title: 'Monitoring & Controlling', color: 'border-orange-400', content: 'Track project performance against the plan. Ensure SDLC phases (coding, testing) complete on time and with desired quality. Take corrective action when milestones slip.' },
                        { step: '5', title: 'Closure', color: 'border-green-400', content: 'Finalize deliverables, close the project, document lessons learned. Note: SDLC continues into maintenance after PMLC closure.' },
                      ].map(item => (
                        <div key={item.step} className={`rounded-xl border-l-4 ${item.color} bg-gray-50 dark:bg-gray-900 p-4`}>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">Phase {item.step}: {item.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Software Development Life Cycle (SDLC)</h3>
                    <div className="space-y-3">
                      {[
                        { step: '1', title: 'Requirements', color: 'border-cyan-400', content: 'Collect and analyze requirements from stakeholders. For a banking app: online payments, account management, security features, API integrations.' },
                        { step: '2', title: 'System Design', color: 'border-teal-400', content: 'Architect the system based on requirements. Create mockups, outline software architecture, define how the app interacts with databases and APIs.' },
                        { step: '3', title: 'Implementation', color: 'border-emerald-400', content: 'Write the actual code based on design specs. Different modules (login, transactions, payments) are implemented by the team.' },
                        { step: '4', title: 'Testing', color: 'border-yellow-400', content: 'Verify and validate the software. Run unit tests, integration tests, and UAT to ensure it works correctly across devices and platforms.' },
                        { step: '5', title: 'Deployment', color: 'border-orange-400', content: 'Deploy the software to production. Release to the app store for customer download.' },
                        { step: '6', title: 'Maintenance', color: 'border-red-400', content: 'Ongoing support after deployment. Fix bugs, update for new OS versions, add new features. This phase continues after the PMLC closes.' },
                      ].map(item => (
                        <div key={item.step} className={`rounded-xl border-l-4 ${item.color} bg-gray-50 dark:bg-gray-900 p-4`}>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">Phase {item.step}: {item.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                  <h4 className="mb-2 font-bold text-amber-800 dark:text-amber-300">Interview Tip: How They Align</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">{"PMLC Initiation sets the project timeline → PMLC Planning defines the SDLC roadmap → PMLC Execution runs the SDLC phases → PMLC Monitoring ensures SDLC quality → PMLC Closure delivers, but SDLC Maintenance continues. Key insight: they are not the same lifecycle. PMLC has a defined end; SDLC continues indefinitely. Always articulate both when asked about how you manage software delivery."}</p>
                </div>
              </>
            )}
            {activeTab === 'tbd' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Trunk-Based Development</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">A high-velocity branching strategy where all developers commit to a single main branch (trunk), enabling continuous integration and fast feedback loops.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Branch Management', icon: GitMerge, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', content: 'All developers commit directly to trunk (main). Short-lived feature branches — max 1-2 days — are permitted for specific tasks, but must merge back quickly to minimize conflicts. Long-lived branches are an anti-pattern in TBD.' },
                    { title: 'Continuous Integration', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', content: 'Automated tests run on every commit to trunk. If tests fail, fixing the build is the #1 priority — nothing else ships. CI ensures the trunk is always in a deployable state. Broken builds block the entire team.' },
                    { title: 'Feature Flags', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', content: 'Features not ready for production are hidden behind feature flags. Engineers commit code to trunk but activate it only when ready. This separates deployment from release — you can deploy any time and release on business schedule.' },
                    { title: 'Hotfix Process', icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', content: 'For production fixes: create a temporary branch off trunk, fix and test, then merge back immediately. Do not let hotfix branches live longer than hours. After merging, cherry-pick to any release branches if needed.' },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className={`rounded-xl ${item.bg} p-5`}>
                        <div className="mb-3 flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${item.color}`} />
                          <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                    <h4 className="mb-2 font-bold text-green-800 dark:text-green-300">Why TBD vs Feature Branching</h4>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                      <li>• Eliminates long-lived merge conflicts ("merge hell")</li>
                      <li>• Forces small, incremental commits — easier to review and revert</li>
                      <li>• Enables true continuous delivery pipelines</li>
                      <li>• Used by Google, Meta, Netflix at scale</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                    <h4 className="mb-2 font-bold text-red-800 dark:text-red-300">TBD Anti-patterns</h4>
                    <ul className="space-y-1 text-sm text-red-700 dark:text-red-400">
                      <li>• Branches living longer than 2 days</li>
                      <li>• Committing without automated test coverage</li>
                      <li>• Shipping incomplete features without feature flags</li>
                      <li>• Not enforcing a "fix the build first" policy</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'scoping' && (
              <>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Project Scoping Framework</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">Scoping is how you convert ambiguous stakeholder asks into executable engineering plans. A well-scoped project has clear boundaries, realistic timelines, and explicit risk plans before a single line of code is written.</p>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Understand Requirements', color: 'from-blue-600 to-blue-700', content: 'Gather and analyze stakeholder requirements. Identify the project\'s main objectives and expected outcomes. Clarify all ambiguities before proceeding. The most expensive scoping mistake is solving the wrong problem with precision.' },
                    { step: '2', title: 'Define Project Boundaries', color: 'from-indigo-600 to-purple-600', content: 'Explicitly document what is in-scope and out-of-scope. Identify constraints (time, budget, team size). Set clear project milestones. A scope without explicit exclusions will expand — what you don\'t say no to becomes implied yes.' },
                    { step: '3', title: 'Break Down the Work', color: 'from-purple-600 to-pink-600', content: 'Use Work Breakdown Structure (WBS). Identify major components and features. Estimate effort for each component. Never estimate the whole project as one number — break it into pieces. Estimation accuracy is inversely proportional to the size of the unit you\'re estimating.' },
                    { step: '4', title: 'Assess Risks & Dependencies', color: 'from-orange-600 to-red-600', content: 'Identify potential risks and their likelihood/impact. Determine inter-team dependencies — these are your highest schedule risk. Plan contingencies for your top 3 risks before they happen, not after. "We didn\'t know about X" is not acceptable when X was knowable.' },
                    { step: '5', title: 'Allocate Resources', color: 'from-yellow-600 to-orange-600', content: 'Determine required skills and headcount. Identify tools and external dependencies. Remember: adding engineers to a late project makes it later (Brooks\'s Law). Scope to fit the team, not the other way around.' },
                    { step: '6', title: 'Create a Realistic Timeline', color: 'from-green-600 to-teal-600', content: 'Build a high-level schedule with major milestones. Add buffer: 20-30% for unexpected complexity. The schedule should survive first contact with reality. If your plan has no slack, you don\'t have a plan — you have a wish.' },
                    { step: '7', title: 'Document & Communicate', color: 'from-teal-600 to-cyan-600', content: 'Create a formal scope document. Ensure all stakeholders agree in writing before execution begins. Establish a scope-change process — any change requires a documented trade-off (add scope = add time or remove scope elsewhere). Verbal agreements are not agreements.' },
                  ].map(item => (
                    <div key={item.step} className="flex gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-sm font-bold text-white`}>{item.step}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                  <h4 className="mb-2 font-bold text-purple-800 dark:text-purple-300">Interview Tip: Working Backwards (Amazon Method)</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">Start scoping from the customer outcome, not the technical solution. Write the press release first (what does success look like when shipped?), then work backwards to the features, then to the engineering tasks. This prevents building technically correct solutions that miss the business goal.</p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
