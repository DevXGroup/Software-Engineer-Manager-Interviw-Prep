'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Star, TrendingUp, MessageSquare, Heart, Award, ChevronDown, ChevronUp, CheckCircle, BarChart2, Mic } from 'lucide-react'

type Tab = 'hiring' | 'performance' | 'oneones' | 'career' | 'feedback' | 'culture' | 'talent' | 'communication'

export default function TeamManagementPage() {
  const [tab, setTab] = useState<Tab>('hiring')
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (id: string) => setExpanded(expanded === id ? null : id)

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'hiring', label: 'Hiring', icon: Users },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'oneones', label: '1:1s', icon: MessageSquare },
    { id: 'career', label: 'Career Dev', icon: Award },
    { id: 'feedback', label: 'Feedback', icon: Star },
    { id: 'culture', label: 'Team Culture', icon: Heart },
    { id: 'talent', label: 'Talent Review', icon: BarChart2 },
    { id: 'communication', label: 'Communication', icon: Mic },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">Team Management</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Hiring · Performance · 1:1s · Career ladders · Feedback · Culture</p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${tab === id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* ── Hiring ── */}
            {tab === 'hiring' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Hiring Process & Rubrics</h2>
                <div className="space-y-4">
                  {[
                    { id: 'h1', title: 'Job Description & Leveling', content: 'Write the JD last — define the role first. Start with: What does a successful person in this role look like in 6 months? What are the 3-5 non-negotiable skills? What are the nice-to-haves? Many JDs describe a unicorn with 10 required skills. Cut it to 3-5 hard requirements. Include the actual team culture, not corporate boilerplate. The best candidates read JDs critically. Leveling: define the level (L4/L5/L6 or equivalent) before sourcing, not during debrief. Changing the level mid-process wastes everyone\'s time and introduces bias.' },
                    { id: 'h2', title: 'Structured Interview Process', content: 'Each interview round evaluates a specific competency — never the same competency twice. Typical structure: (1) Recruiter screen: role fit, compensation alignment, timeline. (2) Hiring manager screen: motivation, background, culture fit. (3) Technical depth: coding, system design, or architecture (role-dependent). (4) Cross-functional interview: collaboration, communication. (5) Values/culture interview. Assign each interviewer one dimension and keep them to it. Debrief is "what did you see for your dimension?" not "what did you think of them overall?" This prevents the loudest voice dominating.' },
                    { id: 'h3', title: 'Scorecard & Calibration', content: 'Every interviewer submits a scorecard before the debrief (not after hearing others). Scorecard dimensions match the competencies you defined. Each dimension: 1-4 score (Strong No / No / Yes / Strong Yes) with required written evidence. In debrief: go through each dimension round-robin before anyone gives an overall recommendation. This prevents anchoring bias. Calibrate your hiring bar quarterly: pull scorecards from your last 10 hires, look at what Strong Yes correlated with in 6-month performance data. Adjust your rubric based on evidence.' },
                    { id: 'h4', title: 'Sourcing for Diversity', content: 'Passive sourcing (waiting for inbound) replicates existing demographics. Active sourcing requires going to where underrepresented talent is: HBCUs, Grace Hopper, Latinas in Tech, NSBE, outLeadership. On warm outreach: write personalized messages that describe why this specific role matches what you know about the candidate. Generic InMails get 5% response rates. Personalized messages with a specific hook get 30-40%. The most effective line: "I noticed your work on X — this role is working on a similar problem at larger scale."' },
                    { id: 'h5', title: 'Closing Candidates', content: 'Top candidates have 3-5 competing offers. Close on mission (what unique problem will they solve?), people (who will they work with?), growth (what will they learn?), and compensation (competitive, not just matching). Address competing offers directly: "I know you\'re looking at other companies. Can I understand what you\'re optimizing for?" Then address their specific concerns. The close that works best: give candidates something to own before they accept — a real problem they helped frame, a team they met and liked. Ownership converts interest to commitment.' },
                  ].map(item => (
                    <div key={item.id} className="rounded-xl border border-gray-100 dark:border-gray-700">
                      <button onClick={() => toggle(item.id)} className="flex w-full items-center justify-between p-4 text-left">
                        <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
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
              </div>
            )}

            {/* ── Performance ── */}
            {tab === 'performance' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Performance Management</h2>

                <div className="mb-6 rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">
                  <h3 className="mb-3 font-bold text-blue-800 dark:text-blue-300">Continuous vs. Annual Reviews</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">Annual performance reviews should not contain surprises. If an engineer is struggling, they should have known it for months — not learned it in December. My practice: monthly 1:1 check-ins on goals (not just project status), quarterly written summaries of performance against expectations, mid-year formal review with explicit calibration, annual review for leveling and compensation decisions. This cadence means no surprises and creates documentation trail if a PIP becomes necessary.</p>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Exceeding', color: 'bg-green-50 border-green-300 dark:bg-green-900/20', textColor: 'text-green-700 dark:text-green-400', desc: 'Consistently delivers beyond scope. Creates leverage for others. Raises team bar. Consider for promotion in 1-2 review cycles.' },
                    { label: 'Meeting', color: 'bg-blue-50 border-blue-300 dark:bg-blue-900/20', textColor: 'text-blue-700 dark:text-blue-400', desc: 'Delivers scope with quality. A solid contributor. Focus on growth areas to move toward Exceeding. Most of your team should be here.' },
                    { label: 'Below', color: 'bg-red-50 border-red-300 dark:bg-red-900/20', textColor: 'text-red-700 dark:text-red-400', desc: 'Missing expectations in one or more areas. Requires a formal PIP with 60-90 day timeline. Clear criteria for success and consequences if not met.' },
                  ].map(r => (
                    <div key={r.label} className={`rounded-xl border-2 p-4 ${r.color}`}>
                      <p className={`font-bold ${r.textColor}`}>{r.label}</p>
                      <p className={`mt-1 text-sm ${r.textColor}`}>{r.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'p1', title: 'PIP (Performance Improvement Plan) That Actually Works', content: 'A PIP that surprises the employee is a failure — it means you did not give feedback early enough. A PIP done right: (1) Share observations with data before the PIP ("I\'ve noticed X three times in the past month"). (2) Build the PIP WITH the employee, not FOR them — they write the improvement goals. (3) Weekly check-ins during the PIP with specific milestones. (4) Clear criteria: "If we see [specific behaviors] sustained for 60 days, the PIP closes successfully." (5) Address the root cause — is it skills, motivation, or external factors? The intervention is different for each. PIP success rate is much higher when the employee authored their own goals.' },
                    { id: 'p2', title: 'Calibration & Stack Ranking', content: 'Calibration sessions distribute ratings across a bell curve to prevent grade inflation. How to navigate: prepare evidence for each of your engineers BEFORE calibration (specific accomplishments with impact, written). In the room: advocate for your highest performers first and hardest. "Soft" advocates lose talent. Be honest about underperformers — defending a low performer costs your top performer a higher rating. Know your company\'s calibration math: what % can get "Exceeding"? Plan your slate with that constraint in mind.' },
                    { id: 'p3', title: 'Promotion Criteria & Timing', content: 'Promote based on consistent performance at the next level, not for potential or loyalty. The test: "Is this person already operating at the next level for 2+ quarters?" If yes, promote now. If no, identify specifically what is missing. Common mistake: promoting based on technical skill alone without management or scope readiness. An L5→L6 engineer must show: leading across teams, mentoring others to L5, driving projects end-to-end with minimal guidance. Write the promotion doc before submitting — it should tell a clear story that any stranger could evaluate.' },
                  ].map(item => (
                    <div key={item.id} className="rounded-xl border border-gray-100 dark:border-gray-700">
                      <button onClick={() => toggle(item.id)} className="flex w-full items-center justify-between p-4 text-left">
                        <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
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
              </div>
            )}

            {/* ── 1:1s ── */}
            {tab === 'oneones' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Effective 1:1 Framework</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">The 1:1 is their meeting, not yours. Your job is to listen, coach, and remove blockers — not give a status update.</p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Cadence & Format</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Weekly 30 min', desc: 'For new engineers, engineers in transition, or anyone flagged as at-risk. High touch during onboarding.' },
                        { label: 'Bi-weekly 45 min', desc: 'Standard for most engineers. Enough time for depth. Not so frequent it becomes routine noise.' },
                        { label: 'Monthly 60 min', desc: 'For senior/staff engineers who are largely autonomous. Strategic conversations about growth and impact.' },
                      ].map(c => (
                        <div key={c.label} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">{c.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">High-Impact 1:1 Questions</h3>
                    <ul className="space-y-2">
                      {[
                        'What\'s on your mind this week? (open, not leading)',
                        'What\'s blocking you that I can help remove?',
                        'What are you most proud of this month?',
                        'What worries you most about [project/team/company]?',
                        'What would make your work more meaningful?',
                        'Is there anything I should know about team dynamics?',
                        'What feedback do you have for me? (ask every quarter)',
                        'Where do you want to be in 2 years, and what can I do to help?',
                        'On a scale of 1-10, how engaged do you feel right now?',
                      ].map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />{q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                  <h4 className="mb-2 font-bold text-amber-800 dark:text-amber-300">Signs Your 1:1s Are Not Working</h4>
                  <div className="grid gap-2 sm:grid-cols-2 text-sm text-amber-700 dark:text-amber-400">
                    {['You do most of the talking', 'It always turns into a status meeting', 'The engineer comes with no agenda', 'You reschedule it more than once per month', 'You have no idea what is worrying your engineer', 'The conversation feels like a performance review'].map((s, i) => (
                      <p key={i} className="flex items-center gap-2"><span className="text-red-500">⚠</span>{s}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Career Dev ── */}
            {tab === 'career' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Career Development</h2>
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-5 dark:from-blue-900/20 dark:to-purple-900/20">
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Engineering Career Ladder (Typical)</h3>
                    <div className="space-y-3">
                      {[
                        { level: 'L3 / SWE I', scope: 'Task-level', key: 'Executes well-defined work with guidance. Learning fundamentals.' },
                        { level: 'L4 / SWE II', scope: 'Project-level', key: 'Independently completes projects. Starting to mentor juniors.' },
                        { level: 'L5 / Senior SWE', scope: 'Team-level', key: 'Leads features end-to-end. Defines technical approach. Reliable mentor.' },
                        { level: 'L6 / Staff SWE', scope: 'Cross-team', key: 'Defines architecture across teams. Creates technical strategy. Multiplies others.' },
                        { level: 'L7 / Principal', scope: 'Org-level', key: 'Sets direction for the org. Solves open-ended problems. Industry influence.' },
                      ].map(l => (
                        <div key={l.level} className="flex items-start gap-3">
                          <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-gray-700 shadow dark:bg-gray-800 dark:text-gray-300 shrink-0">{l.level}</span>
                          <div>
                            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">{l.scope}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{l.key}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">IC vs Manager Track</h3>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                        <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Individual Contributor (IC) Track</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">Deep technical expertise. Creates technical leverage. Best for engineers who are energized by solving hard technical problems. Staff and Principal engineers often have more organizational impact than managers without managing people.</p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Engineering Management Track</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Creates leverage through people. Best for engineers energized by developing others, building teams, and navigating organizational challenges. Technical credibility remains important — the best EMs can still do code reviews credibly.</p>
                      </div>
                      <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                        <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">The "Pendulum" Career</p>
                        <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Many excellent engineers swing between IC and management multiple times. Management is not a promotion from IC — it is a different job with different skills. Encouraging engineers to try management with a clear "return path" reduces anxiety about the switch.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900">
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Career Conversation Framework (IDP)</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { q: 'Where do you want to be in 2 years?', note: 'Specific role, not "more senior." What does success look like?' },
                      { q: 'What are your current strengths?', note: 'Have them name 3. Validate or gently correct. Often engineers undersell.' },
                      { q: 'What\'s the biggest skill gap for that next level?', note: 'Be specific. "Better communication" is too vague. "Presenting to VPs" is actionable.' },
                      { q: 'What projects would build that skill?', note: 'Match growth opportunities to team needs — both must benefit.' },
                      { q: 'Who should you build relationships with?', note: 'Visibility and sponsorship matter as much as skill for promotion.' },
                      { q: 'What does success look like at 3 months / 6 months?', note: 'Measurable milestones create accountability and make growth visible.' },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{item.q}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Feedback ── */}
            {tab === 'feedback' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Feedback Models</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">SBI Model (Situation-Behavior-Impact)</h3>
                    <div className="space-y-3">
                      <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                        <p className="font-bold text-sm text-blue-800 dark:text-blue-300">S — Situation</p>
                        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Specific time and context. "In yesterday\'s sprint planning meeting..." Not "when you do this..."</p>
                      </div>
                      <div className="rounded-xl bg-yellow-50 p-4 dark:bg-yellow-900/20">
                        <p className="font-bold text-sm text-yellow-800 dark:text-yellow-300">B — Behavior</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">Observable actions only. "You interrupted the PM three times." Not "you were disrespectful."</p>
                      </div>
                      <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                        <p className="font-bold text-sm text-purple-800 dark:text-purple-300">I — Impact</p>
                        <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">Effect on you, the team, or the work. "It created tension in the meeting and the PM left without sharing their roadmap concerns."</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                      <p className="text-xs font-bold text-green-700 dark:text-green-400">Complete Example</p>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-1 italic">"In yesterday\'s design review [S], you dismissed the junior engineer\'s suggestion without engaging with the idea [B]. Two other team members stopped contributing after that, and we missed a potential solution [I]."</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-bold text-gray-900 dark:text-white">Radical Candor Framework</h3>
                    <div className="grid gap-2 grid-cols-2">
                      <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                        <p className="font-bold text-sm text-green-800 dark:text-green-300">Radical Candor ✓</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">Care personally + Challenge directly. The sweet spot. Give honest, specific feedback because you genuinely care about the person.</p>
                      </div>
                      <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                        <p className="font-bold text-sm text-red-800 dark:text-red-300">Obnoxious Aggression ✗</p>
                        <p className="text-xs text-red-700 dark:text-red-400 mt-1">Challenge directly without caring. Brutally honest, but cruel. Creates fear, not growth.</p>
                      </div>
                      <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20">
                        <p className="font-bold text-sm text-orange-800 dark:text-orange-300">Ruinous Empathy ✗</p>
                        <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">Care personally without challenging. Nice to their face, but you\'re letting them fail. The most common manager mistake.</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                        <p className="font-bold text-sm text-gray-800 dark:text-gray-300">Manipulative Insincerity ✗</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Neither caring nor honest. Passive aggressive. Political. Destroys trust completely.</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                      <h4 className="mb-2 font-bold text-amber-800 dark:text-amber-300 text-sm">Delivering Feedback: Practical Tips</h4>
                      <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-400">
                        <li>• Give feedback within 24-48h of the observable behavior</li>
                        <li>• Praise in public, redirect in private</li>
                        <li>• Ask for permission: "Can I share some feedback about X?"</li>
                        <li>• End with a question: "What are your thoughts on this?"</li>
                        <li>• Document significant feedback in writing afterward</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Culture ── */}
            {tab === 'culture' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Building Team Culture</h2>
                <div className="mb-6 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 p-5 dark:from-cyan-900/20 dark:to-blue-900/20">
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">"Culture is what happens when you\'re not in the room." — The decisions your team makes, the conversations they have, and how they treat each other when no manager is watching — that is your real culture. Everything else is aspirational.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Psychological Safety', desc: 'The belief that one will not be punished or humiliated for speaking up. The #1 factor in high-performing teams (Google Project Aristotle). Build it by: modeling vulnerability yourself, thanking people who raise problems, never shooting the messenger, and addressing dismissive behavior immediately.', color: 'from-blue-500 to-blue-600' },
                    { title: 'Blameless Post-Mortems', desc: 'When things go wrong, the question is "what allowed this to happen?" not "who caused this?" Blame creates cover-up culture; systems thinking creates learning culture. Engineers who feel safe surfacing problems early prevent far more damage than those who hide them.', color: 'from-green-500 to-green-600' },
                    { title: 'Team Rituals That Work', desc: 'Sprint retrospectives (what worked, what to improve — do not skip when busy), weekly wins channel (celebrate small and large wins publicly), team lunch or async social time, quarterly team offsites for alignment and connection. Rituals create identity. Teams with shared rituals have lower attrition.', color: 'from-purple-500 to-purple-600' },
                    { title: 'Inclusion & Belonging', desc: 'Inclusion is active, not passive. In meetings: solicit quieter voices explicitly, never let dominant voices steamroll. In code review: never dismiss ideas without engaging with the substance. Measure it: "Do you feel your ideas are heard and valued?" in quarterly team pulse. Inclusion drives innovation — diverse ideas need inclusive environments to surface.', color: 'from-orange-500 to-orange-600' },
                    { title: 'Anti-patterns to Eliminate', desc: '"Brilliant jerks" — high performers who damage team culture. The research is clear: the performance gain from a brilliant jerk is more than offset by the attrition, silence, and reduced collaboration they cause. Address toxic behavior regardless of technical output. Set the expectation: "Being difficult to work with is a performance issue at this team."', color: 'from-red-500 to-red-600' },
                    { title: 'Measuring Culture Health', desc: 'Team pulse surveys (quarterly, anonymous, 5-7 questions): psychological safety, manager effectiveness, clarity of goals, growth opportunity, work-life sustainability. Track trends not just snapshot. An eNPS (employee Net Promoter Score) below 20 is a warning; below 0 is a crisis. Act on the results publicly — if you ask and don\'t respond, trust drops more than if you had not asked.', color: 'from-indigo-500 to-indigo-600' },
                  ].map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="rounded-xl overflow-hidden shadow">
                      <div className={`bg-gradient-to-r ${item.color} px-4 py-2.5`}>
                        <p className="font-bold text-white text-sm">{item.title}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Talent Review ── */}
            {tab === 'talent' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Amazon Forte: Talent Review</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">{"Amazon's annual evaluation process (Forte) helps employees reflect on performance and understand how they demonstrate Leadership Principles. As a manager, mastering this process is essential for fair, defensible evaluations."}</p>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">
                    <h3 className="mb-3 font-bold text-blue-800 dark:text-blue-300">Performance Scale (7-Point)</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Least Effective', desc: 'Far below bar for role and level' },
                        { label: 'Highly Ineffective', desc: 'Missing expectations in most dimensions' },
                        { label: 'Ineffective', desc: 'Below bar — PIP territory' },
                        { label: 'Effective', desc: 'Meeting the bar for role and level' },
                        { label: 'Highly Effective', desc: 'Above bar, consistent contributor' },
                        { label: 'Exceptional', desc: 'Significantly exceeding expectations' },
                        { label: 'Role Model', desc: 'Highest tier — rare, raises the bar for others' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${i <= 2 ? 'bg-red-500' : i === 3 ? 'bg-blue-500' : i <= 5 ? 'bg-green-500' : 'bg-purple-600'}`}>{i + 1}</span>
                          <div>
                            <span className="font-medium text-sm text-gray-900 dark:text-white">{item.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-5 dark:bg-purple-900/20">
                    <h3 className="mb-3 font-bold text-purple-800 dark:text-purple-300">Potential Scale (4-Point)</h3>
                    <div className="space-y-3 mb-4">
                      {[
                        { label: 'Limited', desc: 'Current level ceiling' },
                        { label: 'Good', desc: 'Can grow within level' },
                        { label: 'High', desc: 'Ready for next level' },
                        { label: 'Exceptional', desc: 'Multiple levels of upside' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${i === 0 ? 'bg-gray-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-green-500' : 'bg-purple-600'}`}>{i + 1}</span>
                          <div>
                            <span className="font-medium text-sm text-gray-900 dark:text-white">{item.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h4 className="font-bold text-sm text-purple-800 dark:text-purple-300 mt-4 mb-2">Potential Signals to Look For</h4>
                    <ul className="space-y-1 text-xs text-purple-700 dark:text-purple-400">
                      <li>• Navigates unfamiliar situations effectively</li>
                      <li>• Open to learning and new challenges</li>
                      <li>• Generates innovative ideas consistently</li>
                      <li>• Resourceful in achieving goals despite obstacles</li>
                      <li>• Shows empathy and empowers others</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-white">What to Evaluate: Performance Dimensions</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                      <h4 className="mb-2 font-bold text-sm text-gray-900 dark:text-white">What They Deliver (Outputs)</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Final deliverables and outcomes achieved</li>
                        <li>• Job/role-specific behaviors demonstrated</li>
                        <li>• Problem-solving and decision-making quality</li>
                        <li>• Ability to meet deadlines with quality</li>
                        <li>• Customer focus and issue resolution</li>
                      </ul>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                      <h4 className="mb-2 font-bold text-sm text-gray-900 dark:text-white">How They Work (Process)</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Effectiveness in working with others</li>
                        <li>• Knowledge sharing and mentorship</li>
                        <li>• Trust-building and relationship management</li>
                        <li>• Contribution to productive dialogue</li>
                        <li>• Leadership Principles demonstrated</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 p-5 dark:bg-amber-900/20">
                  <h3 className="mb-3 font-bold text-amber-800 dark:text-amber-300">Manager Best Practices for Forte</h3>
                  <div className="grid gap-2 sm:grid-cols-2 text-sm text-amber-700 dark:text-amber-400">
                    {[
                      'Gather data from multiple sources throughout the year — not just the last month',
                      'Consider role, level, and unique circumstances for each person',
                      'Use sample behaviors as guides, not checklists to score against',
                      'Actively work to disconfirm your initial impressions and interrupt bias',
                      'Motivate all employees to grow, regardless of current performance tier',
                      'High-judgment decisions: document your reasoning before calibration sessions',
                    ].map((tip, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Communication ── */}
            {tab === 'communication' && (
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Communication Frameworks</h2>
                <p className="mb-6 text-gray-500 dark:text-gray-400">{"Effective management communication draws on Aristotle's rhetoric and modern leadership science. Combine technical credibility with persuasive storytelling to drive alignment and motivate your team."}</p>

                <div className="mb-6">
                  <h3 className="mb-4 font-bold text-gray-900 dark:text-white">{"Aristotle's Rhetoric for Engineering Leaders"}</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { label: 'Ethos', subtitle: 'Credibility', color: 'from-blue-500 to-blue-600', content: 'Establish credibility through your actions and demonstrated commitment to your team\'s welfare. Engineers follow leaders whose technical judgment they trust. Show up for code reviews, make sound architectural decisions, and follow through on commitments. Credibility is earned through consistency — one broken commitment erodes months of trust.' },
                      { label: 'Logos', subtitle: 'Logic & Data', color: 'from-green-500 to-emerald-600', content: 'Use data and logical arguments to support decisions. "The p99 latency is 1.2s, our SLO is 500ms, this is why we need to address the database indexing this sprint" beats "the system feels slow." Quantify the cost of inaction. Show trade-offs with numbers. Engineers respond to data-backed reasoning.' },
                      { label: 'Pathos', subtitle: 'Emotional Connection', color: 'from-purple-500 to-purple-600', content: 'Use storytelling to connect emotionally and motivate. Tell the story of the customer being helped, the engineer who grew through a challenging project, the team\'s impact on the product. People work harder for meaning than metrics. Pair the data (Logos) with the human story (Pathos) for maximum impact.' },
                      { label: 'Metaphor', subtitle: 'Clarity', color: 'from-orange-500 to-red-500', content: 'Use analogies to make complex technical concepts accessible and memorable. "Technical debt is like credit card debt — sometimes it\'s worth taking on, but the interest compounds." Good metaphors stick in stakeholder minds long after the meeting ends. Design metaphors that will be repeated in the conversations you\'re not in.' },
                      { label: 'Brevity', subtitle: 'Conciseness', color: 'from-teal-500 to-cyan-600', content: 'Convey information concisely, especially at the start. Lead with the bottom line — executives hear dozens of updates daily. BLUF (Bottom Line Up Front): state your conclusion first, then your evidence. A status update that starts with context before the conclusion loses the audience before the point.' },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl overflow-hidden shadow">
                        <div className={`bg-gradient-to-r ${item.color} px-4 py-2.5`}>
                          <p className="font-bold text-white">{item.label}</p>
                          <p className="text-xs text-white/80">{item.subtitle}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-blue-50 p-5 dark:bg-blue-900/20">
                    <h3 className="mb-3 font-bold text-blue-800 dark:text-blue-300">Communicating Up (To Executives)</h3>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                      <li>• Lead with business impact, not technical details</li>
                      <li>• Present problems with proposed solutions, not just issues</li>
                      <li>• Use the traffic light format: Green/Yellow/Red per initiative</li>
                      <li>• Quantify everything: time, cost, risk, opportunity</li>
                      <li>• Know your ask before the meeting — "I need a decision on X"</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-green-50 p-5 dark:bg-green-900/20">
                    <h3 className="mb-3 font-bold text-green-800 dark:text-green-300">Communicating Down (To Your Team)</h3>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                      <li>• Share the "why" behind every major decision</li>
                      <li>• Connect individual work to company mission explicitly</li>
                      <li>• Communicate bad news early and directly — no sugarcoating</li>
                      <li>• Repeat key messages 5x — people hear differently each time</li>
                      <li>• Create space for questions — silence is not agreement</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
