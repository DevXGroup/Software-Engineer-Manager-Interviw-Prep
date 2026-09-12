import { assertTrackIds } from '@/data/tracks/ids'
import type { LucideIcon } from 'lucide-react'
import { Users, Star, TrendingUp, MessageSquare, Heart, Award, BarChart2, Mic, ClipboardList } from 'lucide-react'

export type TeamTabId =
  | 'hiring'
  | 'performance'
  | 'oneones'
  | 'career'
  | 'feedback'
  | 'culture'
  | 'talent'
  | 'communication'
  | 'planning'

export interface TeamTab {
  id: TeamTabId
  title: string
  icon: LucideIcon
  summary: string
}

export const teamTabs: readonly TeamTab[] = [
  { id: 'hiring', title: 'Hiring', icon: Users, summary: 'Job descriptions, structured interviews, scorecards, sourcing, and closing.' },
  { id: 'performance', title: 'Performance', icon: TrendingUp, summary: 'Continuous review cadence, calibration, promotion criteria, and PIPs.' },
  { id: 'oneones', title: '1:1s', icon: MessageSquare, summary: 'Cadence, high-impact questions, and the signs a 1:1 has stopped working.' },
  { id: 'career', title: 'Career dev', icon: Award, summary: 'Ladder levels, the IC vs manager track, and the career conversation framework.' },
  { id: 'feedback', title: 'Feedback', icon: Star, summary: 'SBI (situation, behavior, impact) and the radical candor quadrants.' },
  { id: 'culture', title: 'Team culture', icon: Heart, summary: 'Psychological safety, blameless post-mortems, rituals, and inclusion.' },
  { id: 'talent', title: 'Performance calibration', icon: BarChart2, summary: 'How review cycles and calibration meetings work, and how to walk into one prepared.' },
  { id: 'communication', title: 'Communication', icon: Mic, summary: "Aristotle's rhetoric applied to engineering leadership, up and down." },
  { id: 'planning', title: 'Headcount, planning and cross-functional conflict', icon: ClipboardList, summary: 'Three linked exercises: cutting a roadmap, a date you did not agree to, and the one metric you accept.' },
]

export const teamItemIds: readonly string[] = teamTabs.map((t) => t.id)

// ---------------------------------------------------------------------------
// Hiring
// ---------------------------------------------------------------------------

export interface HiringItem {
  id: string
  title: string
  content: string
}

export const hiringItems: readonly HiringItem[] = [
  { id: 'jd-leveling', title: 'Job description and leveling', content: "Write the JD last: define the role first. Start with: what does a successful person in this role look like in 6 months? What are the 3-5 non-negotiable skills? What are the nice-to-haves? Many JDs describe a unicorn with 10 required skills; cut it to 3-5 hard requirements. Include the actual team culture, not corporate boilerplate. The best candidates read JDs critically. Define the level (L4/L5/L6 or equivalent) before sourcing, not during debrief. Changing the level mid-process wastes everyone's time and introduces bias." },
  { id: 'structured-interviews', title: 'Structured interview process', content: 'Each interview round evaluates a specific competency, never the same competency twice. Typical structure: (1) recruiter screen: role fit, compensation alignment, timeline; (2) hiring manager screen: motivation, background, culture fit; (3) technical depth: coding, system design, or architecture (role-dependent); (4) cross-functional interview: collaboration, communication; (5) values and culture interview. Assign each interviewer one dimension and keep them to it. Debrief is "what did you see for your dimension?" not "what did you think of them overall?" This prevents the loudest voice from dominating.' },
  { id: 'scorecard-calibration', title: 'Scorecard and calibration', content: 'Every interviewer submits a scorecard before the debrief, not after hearing others. Scorecard dimensions match the competencies you defined. Each dimension gets a 1-4 score (strong no, no, yes, strong yes) with required written evidence. In debrief, go through each dimension round-robin before anyone gives an overall recommendation: this prevents anchoring bias. Calibrate your hiring bar quarterly: pull scorecards from your last 10 hires, and look at what strong yes correlated with in 6-month performance data. Adjust your rubric based on evidence.' },
  { id: 'sourcing-diversity', title: 'Sourcing for diversity', content: 'Passive sourcing (waiting for inbound) replicates existing demographics. Active sourcing requires going to where underrepresented talent is: HBCUs, Grace Hopper, Latinas in Tech, NSBE, outLeadership. On warm outreach: write personalized messages that describe why this specific role matches what you know about the candidate. Generic InMails get roughly 5% response rates; personalized messages with a specific hook get 30-40%. The most effective line: "I noticed your work on X: this role is working on a similar problem at larger scale."' },
  { id: 'closing-candidates', title: 'Closing candidates', content: 'Top candidates have 3-5 competing offers. Close on mission (what unique problem will they solve?), people (who will they work with?), growth (what will they learn?), and compensation (competitive, not just matching). Address competing offers directly: "I know you\'re looking at other companies. Can I understand what you\'re optimizing for?" Then address their specific concerns. The close that works best: give candidates something to own before they accept, a real problem they helped frame, a team they met and liked. Ownership converts interest into commitment.' },
]

// ---------------------------------------------------------------------------
// Performance
// ---------------------------------------------------------------------------

export const continuousVsAnnualReviews =
  'Annual performance reviews should not contain surprises. If an engineer is struggling, they should have known it for months, not learned it in December. A workable practice: monthly 1:1 check-ins on goals (not just project status), quarterly written summaries of performance against expectations, a mid-year formal review with explicit calibration, and an annual review for leveling and compensation decisions. This cadence means no surprises and creates a documentation trail if a PIP becomes necessary.'

export interface PerformanceRating {
  label: string
  colorClass: string
  textClass: string
  desc: string
}

export const performanceRatings: readonly PerformanceRating[] = [
  { label: 'Exceeding', colorClass: 'border-moss-300 bg-moss-50 dark:border-moss-700 dark:bg-moss-900/20', textClass: 'text-moss-700 dark:text-moss-400', desc: 'Consistently delivers beyond scope. Creates leverage for others. Raises the team bar. Consider for promotion within 1-2 review cycles.' },
  { label: 'Meeting', colorClass: 'border-teal-300 bg-teal-50 dark:border-teal-700 dark:bg-teal-900/20', textClass: 'text-teal-700 dark:text-teal-400', desc: 'Delivers scope with quality. A solid contributor. Focus on growth areas to move toward exceeding. Most of your team should be here.' },
  { label: 'Below', colorClass: 'border-rust-300 bg-rust-50 dark:border-rust-700 dark:bg-rust-900/20', textClass: 'text-rust-700 dark:text-rust-400', desc: 'Missing expectations in one or more areas. Requires a formal PIP with a 60-90 day timeline, clear success criteria, and stated consequences.' },
]

export interface PerformanceItem {
  id: string
  title: string
  content: string
}

export const performanceItems: readonly PerformanceItem[] = [
  { id: 'pip-that-works', title: 'A PIP that actually works', content: 'A PIP that surprises the employee is a failure: it means you did not give feedback early enough. A PIP done right: (1) share observations with data before the PIP ("I\'ve noticed X three times in the past month"), (2) build the PIP with the employee, not for them, they write the improvement goals, (3) weekly check-ins during the PIP with specific milestones, (4) clear criteria: "if we see [specific behaviors] sustained for 60 days, the PIP closes successfully," (5) address the root cause: is it skills, motivation, or external factors? The intervention differs for each. PIP success rate is much higher when the employee authored their own goals.' },
  { id: 'calibration-stack-ranking', title: 'Calibration and stack ranking', content: 'Calibration is a room where managers agree ratings against each other so one generous manager cannot inflate a whole team. Whether a forced distribution is imposed on top of that varies, and the honest answer in an interview is that it depends on the company. Microsoft announced publicly in 2013 that it was dropping stack ranking, and Adobe, Deloitte and Accenture made similar public changes; most other large companies have never published how their curve works, so treat any specific percentage you read online as rumour. How to navigate whichever version you are in: prepare written evidence for each of your engineers before the meeting, specific accomplishments with impact. Advocate for your highest performers first and hardest, because soft advocacy loses talent. Be honest about underperformers, since defending a low performer spends a rating your top performer needed. Know your company\'s calibration math before you walk in and plan your slate against it.' },
  
  { id: 'promotion-criteria-timing', title: 'Promotion criteria and timing', content: 'Promote based on consistent performance at the next level, not for potential or loyalty. The test: "is this person already operating at the next level for 2+ quarters?" If yes, promote now. If no, identify specifically what is missing. A common mistake is promoting on technical skill alone without management or scope readiness: an engineer moving from senior to staff must show leading across teams, mentoring others up to senior, and driving projects end-to-end with minimal guidance. Write the promotion doc before submitting: it should tell a clear story that any stranger could evaluate.' },
]

// ---------------------------------------------------------------------------
// 1:1s
// ---------------------------------------------------------------------------

export interface OneOnOneCadence {
  label: string
  desc: string
}

export const oneOnOneCadences: readonly OneOnOneCadence[] = [
  { label: 'Weekly, 30 min', desc: 'For new engineers, engineers in transition, or anyone flagged as at-risk. High touch during onboarding.' },
  { label: 'Bi-weekly, 45 min', desc: 'Standard for most engineers. Enough time for depth. Not so frequent it becomes routine noise.' },
  { label: 'Monthly, 60 min', desc: 'For senior or staff engineers who are largely autonomous. Strategic conversations about growth and impact.' },
]

export const oneOnOneQuestions: readonly string[] = [
  "What's on your mind this week? (open, not leading)",
  "What's blocking you that I can help remove?",
  'What are you most proud of this month?',
  "What worries you most about the project, team, or company?",
  'What would make your work more meaningful?',
  'Is there anything I should know about team dynamics?',
  'What feedback do you have for me? (ask every quarter)',
  'Where do you want to be in 2 years, and what can I do to help?',
  'On a scale of 1-10, how engaged do you feel right now?',
]

export const oneOnOneWarningSigns: readonly string[] = [
  'You do most of the talking',
  'It always turns into a status meeting',
  'The engineer comes with no agenda',
  'You reschedule it more than once a month',
  'You have no idea what is worrying your engineer',
  'The conversation feels like a performance review',
]

// ---------------------------------------------------------------------------
// Career development
// ---------------------------------------------------------------------------

export interface CareerLevel {
  level: string
  scope: string
  key: string
}

export const careerLadder: readonly CareerLevel[] = [
  { level: 'L3 / SWE I', scope: 'Task-level', key: 'Executes well-defined work with guidance. Learning fundamentals.' },
  { level: 'L4 / SWE II', scope: 'Project-level', key: 'Independently completes projects. Starting to mentor juniors.' },
  { level: 'L5 / Senior SWE', scope: 'Team-level', key: 'Leads features end-to-end. Defines technical approach. Reliable mentor.' },
  { level: 'L6 / Staff SWE', scope: 'Cross-team', key: 'Defines architecture across teams. Creates technical strategy. Multiplies others.' },
  { level: 'L7 / Principal', scope: 'Org-level', key: 'Sets direction for the org. Solves open-ended problems. Industry influence.' },
]

export interface TrackDescription {
  title: string
  desc: string
}

export const icVsManagerTracks: readonly TrackDescription[] = [
  { title: 'Individual contributor (IC) track', desc: 'Deep technical expertise. Creates technical leverage. Best for engineers energized by solving hard technical problems. Staff and principal engineers often have more organizational impact than managers without managing people.' },
  { title: 'Engineering management track', desc: 'Creates leverage through people. Best for engineers energized by developing others, building teams, and navigating organizational challenges. Technical credibility remains important: the best managers can still do code reviews credibly.' },
  { title: 'The "pendulum" career', desc: 'Many excellent engineers swing between IC and management multiple times. Management is not a promotion from IC, it is a different job with different skills. Encouraging engineers to try management with a clear return path reduces anxiety about the switch.' },
]

export interface CareerQuestion {
  q: string
  note: string
}

export const careerConversationQuestions: readonly CareerQuestion[] = [
  { q: 'Where do you want to be in 2 years?', note: 'Specific role, not "more senior." What does success look like?' },
  { q: 'What are your current strengths?', note: 'Have them name 3. Validate or gently correct. Engineers often undersell.' },
  { q: "What's the biggest skill gap for that next level?", note: 'Be specific. "Better communication" is too vague. "Presenting to VPs" is actionable.' },
  { q: 'What projects would build that skill?', note: 'Match growth opportunities to team needs: both must benefit.' },
  { q: 'Who should you build relationships with?', note: 'Visibility and sponsorship matter as much as skill for promotion.' },
  { q: 'What does success look like at 3 months and 6 months?', note: 'Measurable milestones create accountability and make growth visible.' },
]

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

export interface SbiPart {
  letter: string
  label: string
  desc: string
}

export const sbiParts: readonly SbiPart[] = [
  { letter: 'S', label: 'Situation', desc: 'Specific time and context. "In yesterday\'s sprint planning meeting..." Not "when you do this..."' },
  { letter: 'B', label: 'Behavior', desc: 'Observable actions only. "You interrupted the PM three times." Not "you were disrespectful."' },
  { letter: 'I', label: 'Impact', desc: 'Effect on you, the team, or the work. "It created tension in the meeting and the PM left without sharing their roadmap concerns."' },
]

export const sbiExample =
  '"In yesterday\'s design review [Situation], you dismissed the junior engineer\'s suggestion without engaging with the idea [Behavior]. Two other team members stopped contributing after that, and we missed a potential solution [Impact]."'

export interface CandorQuadrant {
  title: string
  positive: boolean
  desc: string
}

export const candorQuadrants: readonly CandorQuadrant[] = [
  { title: 'Radical candor', positive: true, desc: 'Care personally and challenge directly. The sweet spot. Give honest, specific feedback because you genuinely care about the person.' },
  { title: 'Obnoxious aggression', positive: false, desc: 'Challenge directly without caring. Brutally honest, but cruel. Creates fear, not growth.' },
  { title: 'Ruinous empathy', positive: false, desc: "Care personally without challenging. Nice to their face, but you're letting them fail. The most common manager mistake." },
  { title: 'Manipulative insincerity', positive: false, desc: 'Neither caring nor honest. Passive aggressive. Political. Destroys trust completely.' },
]

export const feedbackDeliveryTips: readonly string[] = [
  'Give feedback within 24-48h of the observable behavior',
  'Praise in public, redirect in private',
  'Ask for permission: "Can I share some feedback about X?"',
  'End with a question: "What are your thoughts on this?"',
  'Document significant feedback in writing afterward',
]

// ---------------------------------------------------------------------------
// Culture
// ---------------------------------------------------------------------------

export const cultureQuote =
  '"Culture is what happens when you\'re not in the room." The decisions your team makes, the conversations they have, and how they treat each other when no manager is watching, that is your real culture. Everything else is aspirational.'

export interface CultureItem {
  title: string
  desc: string
}

export const cultureItems: readonly CultureItem[] = [
  { title: 'Psychological safety', desc: 'The belief that one will not be punished or humiliated for speaking up. The top factor in high-performing teams per Google Project Aristotle. Build it by modeling vulnerability yourself, thanking people who raise problems, never shooting the messenger, and addressing dismissive behavior immediately.' },
  { title: 'Blameless post-mortems', desc: 'When things go wrong, the question is "what allowed this to happen?" not "who caused this?" Blame creates a cover-up culture; systems thinking creates a learning culture. Engineers who feel safe surfacing problems early prevent far more damage than those who hide them.' },
  { title: 'Team rituals that work', desc: 'Sprint retrospectives (what worked, what to improve, do not skip when busy), a weekly wins channel (celebrate small and large wins publicly), team lunch or async social time, and quarterly team offsites for alignment and connection. Rituals create identity. Teams with shared rituals have lower attrition.' },
  { title: 'Inclusion and belonging', desc: 'Inclusion is active, not passive. In meetings, solicit quieter voices explicitly and never let dominant voices steamroll. In code review, never dismiss ideas without engaging with the substance. Measure it: "do you feel your ideas are heard and valued?" in a quarterly team pulse. Inclusion drives innovation: diverse ideas need inclusive environments to surface.' },
  { title: 'Anti-patterns to eliminate', desc: '"Brilliant jerks," high performers who damage team culture. The research is clear: the performance gain from a brilliant jerk is more than offset by the attrition, silence, and reduced collaboration they cause. Address toxic behavior regardless of technical output. Set the expectation: "being difficult to work with is a performance issue on this team."' },
  { title: 'Measuring culture health', desc: 'Team pulse surveys (quarterly, anonymous, 5-7 questions) covering psychological safety, manager effectiveness, clarity of goals, growth opportunity, and work-life sustainability. Track trends, not just a snapshot. An employee Net Promoter Score below 20 is a warning; below 0 is a crisis. Act on the results publicly: if you ask and don\'t respond, trust drops more than if you had not asked.' },
]

// ---------------------------------------------------------------------------
// Performance calibration
// ---------------------------------------------------------------------------
// Generic, company-neutral material. Named internal review systems, rating
// codes and tier percentages were removed on 2026-09-12: they came from
// employee accounts and press coverage, not from any company's own published
// policy, so they are not ours to publish.
// ---------------------------------------------------------------------------

export const calibrationOverview =
  'Most large engineering organisations run performance review in two halves. The half the employee sees is a written cycle: a self-assessment, peer feedback naming strengths and one growth area, and a manager summary. The half they never see is calibration, a closed meeting where managers present their people to peer managers and the group agrees ratings together, so one generous manager cannot inflate a whole team. The written cycle produces the conversation. Calibration produces the rating that drives compensation, promotion and performance-plan decisions. In an interview, be precise about which half you are describing, because conflating them is the fastest way to signal you have not actually run the process.'

export interface RatingBand {
  label: string
  desc: string
}

export const ratingBands: readonly RatingBand[] = [
  { label: 'Above the bar', desc: 'Performing above what the role and level ask for. At most companies this is the band you need to sustain before a promotion case is credible.' },
  { label: 'At the bar', desc: 'Performing at the level. This is the band most engineers land in, and it is a good outcome, not a warning.' },
  { label: 'Below the bar', desc: 'Short of the level in one or more areas. Usually paired with a documented improvement plan and a clear timeline.' },
]

export const calibrationMechanics =
  'Three things decide how a calibration meeting goes for your team. First, the evidence you bring: specific accomplishments with impact, written down before the meeting, for every person you manage. Second, the order you advocate in: make the case for your strongest people first and hardest, because soft advocacy loses ratings you cannot win back later. Third, your honesty about the people who are struggling, since defending someone who is clearly below the level spends credibility your strongest engineer needed. Ask your own organisation how its calibration actually works before you walk into one, because the rules differ everywhere and nobody will volunteer them.'

export interface CalibrationElsewhere {
  company: string
  note: string
}

export const calibrationElsewhere: readonly CalibrationElsewhere[] = [
  { company: 'Microsoft', note: 'Announced publicly in November 2013 that it was ending stack ranking and its forced distribution curve, replacing it with impact-based reviews and no mandated spread. It is the one large-company change to calibration that the company itself put on the record.' },
]

export const potentialSignals: readonly string[] = [
  'Navigates unfamiliar situations effectively',
  'Open to learning and new challenges',
  'Generates innovative ideas consistently',
  'Resourceful in achieving goals despite obstacles',
  'Shows empathy and empowers others',
]

export interface EvaluationDimension {
  title: string
  points: readonly string[]
}

export const evaluationDimensions: readonly EvaluationDimension[] = [
  { title: 'What they deliver (outputs)', points: ['Final deliverables and outcomes achieved', 'Job- and role-specific behaviors demonstrated', 'Problem-solving and decision-making quality', 'Ability to meet deadlines with quality', 'Customer focus and issue resolution'] },
  { title: 'How they work (process)', points: ['Effectiveness in working with others', 'Knowledge sharing and mentorship', 'Trust-building and relationship management', 'Contribution to productive dialogue', 'Leadership behaviours demonstrated'] },
]

export const calibrationBestPractices: readonly string[] = [
  'Gather data from multiple sources throughout the year, not just the last month',
  'Consider role, level, and unique circumstances for each person',
  'Use sample behaviors as guides, not checklists to score against',
  'Actively work to disconfirm your initial impressions and interrupt bias',
  'Motivate all employees to grow, regardless of current rating',
  'For high-judgment decisions, document your reasoning before calibration sessions',
]

// ---------------------------------------------------------------------------
// Communication
// ---------------------------------------------------------------------------

export interface RhetoricMode {
  label: string
  subtitle: string
  content: string
}

export const rhetoricModes: readonly RhetoricMode[] = [
  { label: 'Ethos', subtitle: 'Credibility', content: "Establish credibility through your actions and demonstrated commitment to your team's welfare. Engineers follow leaders whose technical judgment they trust. Show up for code reviews, make sound architectural decisions, and follow through on commitments. Credibility is earned through consistency: one broken commitment erodes months of trust." },
  { label: 'Logos', subtitle: 'Logic and data', content: 'Use data and logical arguments to support decisions. "The p99 latency is 1.2s, our SLO is 500ms, this is why we need to address the database indexing this sprint" beats "the system feels slow." Quantify the cost of inaction. Show trade-offs with numbers. Engineers respond to data-backed reasoning.' },
  { label: 'Pathos', subtitle: 'Emotional connection', content: "Use storytelling to connect emotionally and motivate. Tell the story of the customer being helped, the engineer who grew through a challenging project, the team's impact on the product. People work harder for meaning than metrics. Pair the data (logos) with the human story (pathos) for maximum impact." },
  { label: 'Metaphor', subtitle: 'Clarity', content: 'Use analogies to make complex technical concepts accessible and memorable. "Technical debt is like credit card debt: sometimes it\'s worth taking on, but the interest compounds." Good metaphors stick in stakeholder minds long after the meeting ends. Design metaphors that will be repeated in conversations you are not in.' },
  { label: 'Brevity', subtitle: 'Conciseness', content: "Convey information concisely, especially at the start. Lead with the bottom line: executives hear dozens of updates daily. State your conclusion first, then your evidence. A status update that starts with context before the conclusion loses the audience before the point." },
]

export const communicatingUp: readonly string[] = [
  'Lead with business impact, not technical details',
  'Present problems with proposed solutions, not just issues',
  'Use a traffic-light format: green, yellow, or red per initiative',
  'Quantify everything: time, cost, risk, opportunity',
  'Know your ask before the meeting: "I need a decision on X"',
]

export const communicatingDown: readonly string[] = [
  'Share the "why" behind every major decision',
  'Connect individual work to the company mission explicitly',
  'Communicate bad news early and directly, no sugarcoating',
  'Repeat key messages 5 times: people hear differently each time',
  'Create space for questions: silence is not agreement',
]

// ---------------------------------------------------------------------------
// Headcount, planning and cross-functional conflict
// ---------------------------------------------------------------------------

export interface PlanningExercise {
  id: string
  title: string
  setup: string
  scoring: readonly string[]
  outline: readonly string[]
  probes: readonly string[]
}

export const planningIntro =
  'Three exercises that run as one thread. The interviewer is checking whether you can hold a plan, a relationship, and a number at the same time. The order matters: you cut scope in the first, absorb a broken commitment in the second, and then have to say out loud which single number you would accept being judged on. Answer them as the same manager on the same team, because that is how a strong loop asks them.'

export const planningExercises: readonly PlanningExercise[] = [
  {
    id: 'cut-twenty-percent',
    title: 'Cut 20% of the roadmap and justify it',
    setup: "You run a team of nine engineers on a payments platform. The half-year roadmap was signed off six weeks ago: four committed initiatives plus ongoing reliability work. Your director has just told you that one engineer is moving to another team and the open requisition is frozen until the next fiscal year. She wants your revised plan by Friday, and she wants a number, not a hedge. Two of the four initiatives have external dependencies: one is a compliance deadline in October, the other is a partner integration a sales team has already demoed. You have roughly 20% less capacity than the plan assumes.",
    scoring: [
      'Whether you cut whole initiatives or shave every one of them, the second is the wrong answer and most candidates give it',
      'Whether you can name the decision criteria before naming the cut',
      'Whether you go back to the stakeholder who owns the cut work rather than letting them find out in a status email',
      'Whether reliability work survives the cut, and whether you can defend that',
    ],
    outline: [
      'State the criterion first: cut by whole initiative, because a 20% haircut across four projects delivers four things late instead of three things on time.',
      'Sort the four by what is actually fixed. The compliance deadline is a legal date, not a priority, so it comes off the table. The partner integration has a promise attached, so it is a negotiation, not a cut.',
      'Name the cut explicitly: the lowest-confidence initiative, the one whose value is still a hypothesis, goes to the next half. Say the name in the room.',
      'Protect reliability capacity as a fixed percentage, typically 15% to 20%, and explain that cutting it converts a planning problem into an on-call problem within a quarter.',
      'Take the cut to the stakeholder in person before the plan circulates, with the reason and the date it comes back.',
      'Write down what you gave up and what you would need to get it back: one engineer for six weeks, stated as a number.',
      'Close the loop in writing so the next planning cycle inherits the decision instead of relitigating it.',
    ],
    probes: [
      'Your director says all four are committed and none can move. What do you actually do on Monday?',
      'Six weeks in, the initiative you cut turns out to be the one the CEO asks about. How do you handle that conversation?',
    ],
  },
  {
    id: 'pm-committed-a-date',
    title: 'A PM committed a date to a customer without engineering',
    setup: "Your PM has just forwarded a thread. In it he tells a large enterprise customer that a requested export feature will ship by the end of next month. You were not asked. Your read is that the feature is six to eight weeks of work for two engineers, and both are mid-way through the compliance initiative that cannot slip. The customer has replied thanking him and copying their own VP. Your PM is good at his job, well liked, and this is the second time this has happened this year. Your skip-level is on the thread.",
    scoring: [
      'Whether you separate the relationship problem from the schedule problem, and treat them in that order',
      'Whether you protect the PM in public while being direct in private',
      'Whether you produce an actual option set for the customer instead of just objecting',
      'Whether you fix the mechanism, not just this instance, given it is the second time',
    ],
    outline: [
      'Do not reply on the thread. A public correction costs the customer relationship and makes an ally into an opponent.',
      'Go to the PM the same day, one to one. Lead with the impact, not the intent: the date cannot be met without moving the compliance work, and you need to solve it together before the customer plans around it.',
      'Build the option set jointly: a reduced version of the export that fits the window, the full version on a stated later date, or the full version on time by moving a named piece of the compliance work, which you are not recommending.',
      'Let the PM take the corrected message back to the customer with you on the call. He keeps the relationship, you supply the engineering truth.',
      'Give the estimate a confidence range and say what would narrow it, because a single date is what created the problem.',
      'Fix the mechanism: any external commitment involving engineering time gets an engineering sign-off first, written down as a norm you and the PM both state to your teams.',
      'If it happens a third time it is a performance conversation with his manager, and you say that to him before you say it to anyone else.',
    ],
    probes: [
      'The PM says he had to commit or the renewal was at risk. Does that change your answer?',
      'Your skip-level replies on the thread agreeing with the date before you have spoken to anyone. Now what?',
    ],
  },
  {
    id: 'name-your-one-metric',
    title: 'Metrics and OKRs: name the one metric you would be measured on',
    setup: "Same team, next planning cycle. Your director asks you to bring three OKRs for the platform and then adds a constraint: for one of them, name the single metric you are willing to be judged on at the end of the half, with a number attached. She is explicit that she does not want a scorecard of eight metrics, and she will hold you to whichever one you choose. Your platform has the usual candidates available: latency, availability, payment success rate, cost per transaction, engineer velocity, incident count.",
    scoring: [
      'Whether you pick a metric that reflects customer outcome rather than team activity',
      'Whether you can explain how the metric can be gamed, and what guardrail you pair it with',
      'Whether the number you attach is derived from a baseline you have actually read',
      'Whether you hold the line when pushed toward a vanity metric',
    ],
    outline: [
      'Pick the customer-facing outcome: payment success rate, because a failed payment is the only one of these the customer feels directly.',
      'Attach a real number and say where it came from: the current baseline read from the dashboard, and a target expressed as a reduction in failures rather than a round percentage.',
      'Name the guardrail in the same breath. Success rate can be gamed by retrying aggressively, so pair it with cost per transaction and p99 latency as metrics that must not degrade.',
      'Explain why you rejected velocity: it measures the team, not the customer, and it climbs when you ship the easy work.',
      'Say what you would do if the metric moves the wrong way at mid-half: what you would look at first, and what you would stop.',
      'Keep the other two OKRs honest by making them binary and dated rather than measured: the compliance initiative either shipped by October or it did not.',
    ],
    probes: [
      'Your director prefers incident count because it is easier to report upward. Argue your case or take hers?',
      'The metric improves by 30% because an upstream team fixed their retry logic. Do you claim it?',
    ],
  },
]

assertTrackIds('team', teamItemIds)
