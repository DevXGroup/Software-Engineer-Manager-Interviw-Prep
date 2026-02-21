'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, ChevronUp, Star, Building, Search,
  Eye, EyeOff, Lightbulb, AlertTriangle, CheckCircle,
  Target, Brain, MessageSquare, Filter, BookOpen, Award, X
} from 'lucide-react'

type Principle = { name: string; description: string; example: string }
type Company = {
  name: string; color: string; textColor: string
  principles: Principle[]; tips: string[]; topQuestions: string[]
}
type Question = {
  id: string; title: string; question: string
  categories: string[]; companies: string[]; difficulty: 'Starter' | 'Intermediate' | 'Advanced'
  star: { situation: string; task: string; action: string; result: string }
  insights: string[]; followUps: string[]; redFlags: string[]
}

const companies: Company[] = [
  {
    name: 'Amazon',
    color: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-600',
    principles: [
      { name: 'Customer Obsession', description: 'Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.', example: 'Reversed a product decision because NPS dropped 12 points' },
      { name: 'Ownership', description: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results.", example: 'Took ownership of a cross-team failure impacting revenue' },
      { name: 'Invent and Simplify', description: 'Leaders expect and require innovation and invention from their teams and always find ways to simplify.', example: 'Built an internal tool that reduced deploy time by 70%' },
      { name: 'Are Right, A Lot', description: 'Leaders have strong judgment and seek diverse perspectives to disconfirm beliefs.', example: 'Challenged consensus with data, saved 6 months of wrong direction' },
      { name: 'Learn and Be Curious', description: 'Leaders are never done learning and always seek to improve themselves.', example: 'Self-studied ML to evaluate vendor proposals credibly' },
      { name: 'Hire and Develop the Best', description: 'Leaders raise the performance bar with every hire and promotion.', example: 'Defined hiring bar where 40% of team later promoted to senior' },
      { name: 'Insist on the Highest Standards', description: "Leaders have relentlessly high standards — many think these standards are unreasonably high.", example: 'Rejected launch until security audit completed despite schedule pressure' },
      { name: 'Think Big', description: 'Thinking small is a self-fulfilling prophecy. Leaders create bold direction that inspires results.', example: 'Pitched 3-year platform vision that became company strategy' },
      { name: 'Bias for Action', description: 'Speed matters. Many decisions are reversible and do not need extensive study.', example: 'Shipped MVP in 2 weeks to validate vs. 6-month full build' },
      { name: 'Frugality', description: 'Accomplish more with less. Constraints breed resourcefulness and inventiveness.', example: 'Cut infrastructure cost 40% while doubling team throughput' },
      { name: 'Earn Trust', description: 'Leaders listen attentively, speak candidly, and treat others respectfully.', example: 'Delivered difficult feedback engineer later credited for their promotion' },
      { name: 'Dive Deep', description: 'Leaders stay connected to the details and audit frequently.', example: 'Identified root cause of outage that 3 teams had missed' },
      { name: 'Have Backbone; Disagree and Commit', description: 'Leaders respectfully challenge decisions they disagree with, then commit fully.', example: 'Pushed back on product direction at exec review; data proved right' },
      { name: 'Deliver Results', description: 'Leaders focus on key inputs and deliver with the right quality and timing.', example: 'Delivered platform migration 2 months early under budget' },
      { name: "Strive to be Earth's Best Employer", description: 'Create a safer, more productive, and more just work environment.', example: 'Implemented flexible work policy that improved retention 25%' },
      { name: 'Success and Scale Bring Broad Responsibility', description: 'Leave things better than how you found them.', example: 'Open-sourced internal framework adopted by 50+ companies' },
    ],
    tips: [
      "Use 'I' not 'we' — interviewers want YOUR specific contribution",
      'Amazon loves specific metrics — always quantify impact',
      'Prepare 2 stories per Leadership Principle minimum',
      'Focus on most recent examples (within 2 years preferred)',
    ],
    topQuestions: [
      'Tell me about a time you made a decision with incomplete information',
      'Describe a time you went above and beyond for a customer',
      'Tell me about a time you failed and what you learned',
    ],
  },
  {
    name: 'Meta',
    color: 'from-blue-500 to-blue-700',
    textColor: 'text-blue-600',
    principles: [
      { name: 'Move Fast', description: 'Speed enables learning. Move fast and iterate rather than waiting for perfection.', example: 'Launched beta in 3 weeks, learned more than 3 months of planning' },
      { name: 'Focus on Long-Term Impact', description: 'Prioritize work that creates substantial long-term value over short-term wins.', example: 'Deferred feature requests to rebuild architecture enabling 10x scale' },
      { name: 'Build Awesome Things', description: "Create products and technology that fundamentally improve people's lives.", example: 'Led team that shipped accessibility features used by 2M+ users' },
      { name: 'Live in the Future', description: "Solve tomorrow's problems, not today's constraints.", example: 'Invested in VR tooling 18 months before mainstream adoption' },
      { name: 'Be Direct and Respect Your Colleagues', description: 'Give direct feedback with radical candor. Disagree openly and honestly.', example: 'Gave critical feedback at all-hands that improved product direction' },
      { name: 'Meta, Metamates, Me', description: 'Put the company mission first, team second, individual last.', example: 'Volunteered team for cross-org firefight during critical launch' },
    ],
    tips: [
      "Meta values boldness — quantify impact at scale (billions of users)",
      'Show comfort with ambiguity and rapid change',
      'Demonstrate systems thinking: how does your work connect to the mission?',
      'Highlight cross-functional collaboration and influence without authority',
    ],
    topQuestions: [
      'Tell me about a time you had to prioritize between competing opportunities',
      'Describe a project where you drove significant impact at scale',
      'How have you built and maintained a high-performance team?',
    ],
  },
  {
    name: 'Google',
    color: 'from-green-500 to-green-600',
    textColor: 'text-green-600',
    principles: [
      { name: 'Focus on the User', description: 'All else will follow. Great user experiences drive long-term success.', example: 'Redesigned API based on developer feedback, reduced friction 60%' },
      { name: 'Think 10x Not 10%', description: 'Radical thinking leads to radical results. Incremental improvements are not enough.', example: 'Proposed cloud-native rewrite delivering 10x capacity at 1/3 cost' },
      { name: 'Democracy on the Web', description: 'The wisdom of crowds, rigorously applied. Data beats opinion.', example: 'Built A/B testing framework that changed product direction based on signals' },
      { name: 'Data Driven Decisions', description: 'Make decisions based on data and rigorous analysis.', example: 'Used cohort analysis to identify hidden churn driver worth $2M ARR' },
      { name: 'Innovation', description: 'Google values original thinking that creates entirely new categories.', example: 'Pioneered internal ML platform 2 years before industry standard' },
      { name: "Great Just Isn't Good Enough", description: 'Strive for extraordinary in everything you do.', example: 'Rebuilt logging pipeline 3 times until latency was under 1ms P99' },
    ],
    tips: [
      'Google values intellectual humility — show how you learn from data',
      'Demonstrate technical depth — be ready to go deep on any topic',
      'Show how you create psychological safety and inclusive teams',
      "Quantify Googleyness: curiosity, collaboration, evidence-based thinking",
    ],
    topQuestions: [
      'How do you approach decisions when data is ambiguous or conflicting?',
      'Tell me about a time you drove innovation in a large organization',
      "Describe how you've handled a situation where the right answer wasn't obvious",
    ],
  },
  {
    name: 'Apple',
    color: 'from-gray-600 to-gray-900',
    textColor: 'text-gray-700 dark:text-gray-300',
    principles: [
      { name: 'Radical Simplicity', description: "The hardest thing is making things simple. Cut everything that doesn't belong.", example: 'Reduced feature set by 50% to deliver a product that just works' },
      { name: 'Deep Collaboration', description: 'The best results come from intense collaboration across disciplines.', example: 'Led 3-way collaboration between Design, Engineering, and Operations' },
      { name: 'Accountability', description: 'Everyone is responsible for the product. No handoffs, no finger-pointing.', example: "Owned production incident that cascaded from another team's change" },
      { name: 'Attention to Detail', description: 'Perfection is the baseline. Every pixel, every millisecond matters.', example: 'Iterated 14 times on UX flow until conversion matched benchmark' },
      { name: 'Long-Term Commitment', description: 'Apple plays the long game. Short-term wins that hurt long-term trust are rejected.', example: 'Declined partner deal that would have compromised user privacy' },
      { name: 'Privacy as a Human Right', description: 'User privacy is not a feature — it is a foundational principle.', example: 'Redesigned data collection to be opt-in, reducing legal risk and building trust' },
    ],
    tips: [
      'Apple values discretion — do not discuss confidential work details',
      'Show taste and craft — how have you made something beautiful and simple?',
      'Demonstrate commitment to quality over speed',
      'Show how you navigate highly matrixed, cross-functional organizations',
    ],
    topQuestions: [
      'Tell me about a time you had to say no to a feature request',
      'Describe how you maintained quality standards under extreme pressure',
      'How have you collaborated with design teams on complex products?',
    ],
  },
  {
    name: 'Netflix',
    color: 'from-red-600 to-red-700',
    textColor: 'text-red-600',
    principles: [
      { name: 'Judgment', description: 'You make wise decisions despite ambiguity. You identify root causes, not symptoms.', example: 'Identified pattern in data that predicted churn 30 days in advance' },
      { name: 'Communication', description: 'You are concise and articulate. You listen well and share difficult news directly.', example: 'Delivered missed targets with clear root cause and recovery plan' },
      { name: 'Impact', description: 'You accomplish amazing amounts of important work. You demonstrate consistently strong performance.', example: 'Single-handedly built system handling 50K requests/second' },
      { name: 'Curiosity', description: 'You learn rapidly and eagerly. You seek to understand strategy, market, and customers.', example: 'Self-initiated research on streaming protocols that became team standard' },
      { name: 'Innovation', description: 'You challenge prevailing assumptions and suggest better approaches.', example: 'Eliminated bureaucratic approval process saving 2 weeks per launch cycle' },
      { name: 'Courage', description: "You say what you think even if it's controversial. You are willing to be uncomfortable.", example: 'Told VP their product direction would fail; proposed alternative that succeeded' },
      { name: 'Passion', description: 'You inspire others with your thirst for excellence. You care intensely about success.', example: 'Volunteered to lead the crisis response at 2am on a Sunday' },
      { name: 'Honesty', description: 'You only say things you believe. You are direct with teammates and stakeholders.', example: 'Publicly admitted my team caused the outage and owned the post-mortem' },
      { name: 'Selflessness', description: 'You seek what is best for Netflix, not yourself. You listen well.', example: 'Gave up headcount to team that needed it more, hit shared company goal' },
    ],
    tips: [
      "Netflix avoids 'Brilliant Jerks' — show high EQ + high performance together",
      "Demonstrate comfort with freedom AND responsibility — self-direction is key",
      'Show data fluency — Netflix is extremely data-driven across all decisions',
      'Context not control — managers are coaches, not directors',
    ],
    topQuestions: [
      'Tell me about a time you made a high-stakes decision with limited time',
      'Describe how you created a culture of candid feedback',
      'Tell me about a time you had to let go of a high-performing but toxic team member',
    ],
  },
  {
    name: 'Microsoft',
    color: 'from-blue-700 to-blue-900',
    textColor: 'text-blue-700',
    principles: [
      { name: 'Growth Mindset', description: 'Embrace challenges, learn from failure, and believe abilities can be developed.', example: 'Treated product failure as research, pivoted to successful adjacent market' },
      { name: 'Customer Obsession', description: 'Create clarity, energy, and success for your customers above all else.', example: 'Flew to customer site to understand pain point that drove 3 new features' },
      { name: 'Diversity and Inclusion', description: 'Diverse perspectives make better products. Inclusion drives innovation.', example: 'Implemented structured interviews that increased diverse hires by 35%' },
      { name: 'One Microsoft', description: 'Work across the company to bring the best of Microsoft to customers.', example: 'Bridged Azure and Office teams to deliver integrated enterprise solution' },
      { name: 'Make a Difference', description: 'Empower every person and organization on the planet to achieve more.', example: 'Led team that built accessibility tools used by 5M people with disabilities' },
    ],
    tips: [
      'Microsoft values growth mindset above almost everything else',
      'Show how you collaborate across a large matrix organization',
      'Demonstrate both technical credibility and leadership breadth',
      'Highlight inclusive leadership and building diverse teams',
    ],
    topQuestions: [
      'Tell me about a time you had to learn something completely new quickly',
      'Describe how you managed a diverse team across cultures and time zones',
      'How have you driven organizational change in a large company?',
    ],
  },
]

const questions: Question[] = [
  {
    id: '1',
    title: 'Resolving Senior Engineer Conflict',
    question: 'Tell me about a time you had to resolve a serious technical conflict between senior engineers.',
    categories: ['Conflict Resolution', 'Technical Leadership'],
    companies: ['Amazon', 'Google', 'Meta'],
    difficulty: 'Intermediate',
    star: {
      situation: 'Two of my senior engineers had a fundamental disagreement about our microservices architecture. The backend lead wanted to extract payment processing into its own service immediately, citing SLA requirements. The platform lead wanted to keep it monolithic for another 6 months, citing insufficient observability tooling. The dispute had stalled our Q3 roadmap for 3 weeks and was creating visible tension in the team.',
      task: 'As their manager, I needed to resolve this in a way that: (1) Made the right technical decision for the company, (2) Preserved the relationship and trust of both engineers, and (3) Got the team moving again without one side feeling like they lost.',
      action: "I started with separate 30-min 1:1s with each engineer — not to take sides, but to fully understand each perspective. I realized the backend lead's concern was about SLA risk, while the platform lead's concern was about ops burden. These were complementary concerns, not opposing ones. I then facilitated a 90-minute structured session with both engineers and our architect. I came in with a decision matrix I'd built: we scored options on SLA risk, operational complexity, team readiness, and 12-month scalability. Rather than debating opinions, we were scoring evidence. The matrix pointed to a phased approach: build the service boundary first (solving the SLA issue) while keeping shared infrastructure for 2 more quarters (solving the ops concern). I also proposed that the platform lead would own the observability tooling project as a formal Q3 initiative with dedicated resources.",
      result: 'Both engineers agreed to the plan within the session — more importantly, they left feeling heard and respected. We shipped the service boundary 6 weeks later. The platform lead\'s observability work became a company-wide initiative used by 12 teams. The two engineers now co-lead our Architecture Review Board. Velocity recovered fully within 2 weeks of the decision.',
    },
    insights: [
      'Separate 1:1s before group discussion prevents public posturing',
      'Identify the underlying concern, not just the stated position',
      'Decision matrices depersonalize the debate — it is data vs. data, not person vs. person',
      'Give the "losing" side a win — own the adjacent problem',
    ],
    followUps: [
      'What would you have done if they still disagreed after the session?',
      'How did you prevent this type of conflict from recurring?',
      'What did you learn about yourself as a manager?',
    ],
    redFlags: [
      "Saying 'I just made the decision' — shows inability to build consensus",
      'Not quantifying the business impact of the delay',
      'Not mentioning what each party got out of the resolution',
    ],
  },
  {
    id: '2',
    title: 'Handling an Underperforming Engineer',
    question: 'Tell me about a time you had to manage an underperforming team member. How did you handle it?',
    categories: ['Team Development', 'Leadership'],
    companies: ['Amazon', 'Meta', 'Netflix'],
    difficulty: 'Intermediate',
    star: {
      situation: 'A senior engineer on my team — 4 years at the company — had been consistently missing sprint commitments for two quarters. Code reviews were taking 5+ days, PRs had more bugs than junior engineers, and two teammates had privately raised concerns about depending on her work. Her previous manager had no documentation of performance issues.',
      task: "I needed to turn this around or make a difficult personnel decision, all while protecting the team's morale and maintaining the engineer's dignity throughout the process.",
      action: "I started with a candid 1:1 where I shared specific observations with data: '3 of your last 5 features were shipped with P1 bugs,' 'your average PR review time is 6 days vs. team average of 1.5 days.' I asked what was going on. She revealed she was struggling with our new cloud architecture — she'd been masking the gap for months. We built a 60-day PIP together (not handed down to her) with: weekly 1:1s with a technical mentor, two starter-sized cloud projects with close support, and clear weekly milestones. I connected her with our internal cloud training program and gave her explicit permission to ask for help. I also set a clear expectation: 'If we don't see [specific improvements] in 60 days, we'll need to discuss a role change.'",
      result: 'By week 6, her PR cycle time dropped to 2 days and she shipped a cloud feature independently. By the end of month 3, she was reviewing other engineers\' cloud PRs. She was promoted to Staff Engineer 18 months later. The experience also led me to build a formal technical skill assessment into our quarterly reviews to catch gaps earlier.',
    },
    insights: [
      'Use specific data, not vague feedback — it removes subjectivity',
      'Build the PIP with them, not for them — ownership changes the dynamic',
      'Diagnose the root cause first (skills gap vs. motivation vs. external factors)',
      'Set clear consequences upfront — ambiguity is cruel, not kind',
    ],
    followUps: [
      'What would you have done if the PIP had not worked?',
      'How did you handle the impact on the team during this period?',
      'How did you ensure fairness given no prior documentation?',
    ],
    redFlags: [
      "Describing the process as something you did 'to' the employee rather than 'with' them",
      'Not mentioning specific metrics or observations',
      'Skipping the coaching phase and going straight to PIP or termination',
    ],
  },
  {
    id: '3',
    title: 'Pushing Back on Executive Direction',
    question: "Describe a time you disagreed with your manager or leadership and what you did about it.",
    categories: ['Leadership', 'Conflict Resolution', 'Influence'],
    companies: ['Amazon', 'Netflix', 'Google'],
    difficulty: 'Advanced',
    star: {
      situation: "Our VP announced in a Q-planning meeting that we'd replatform our entire data pipeline to a new vendor's solution in Q2 — a 12-week window. I'd evaluated this vendor and believed the migration would take at minimum 6 months and carried significant data integrity risks. The decision had already been announced to the company.",
      task: "I needed to raise my concerns to the VP without looking like I was undermining a public commitment, while preventing what I believed would be a high-risk failure.",
      action: "I requested a 30-minute 1:1 with the VP within 24 hours. I came prepared with a one-pager: a side-by-side comparison of the original timeline vs. my analysis (with named assumptions), a risk matrix with each risk quantified in potential revenue impact, and two alternative proposals — one that hit the Q2 date by reducing scope, and one that hit full scope in Q4 with monthly milestones. I used the framing: 'I want to help us succeed. Here's what I'm seeing that concerns me, and here are ways I think we can still get there.' The VP appreciated the data but pushed back — the announcement had been made. I agreed to run a 2-week proof of concept on the most critical migration path, with predefined success criteria, before committing the full team.",
      result: "The POC revealed 3 data integrity issues the vendor's documentation hadn't disclosed. The VP used the POC results to renegotiate the timeline with the board. We delivered the migration in 5 months, on a revised timeline, with zero data incidents. My credibility with the VP increased significantly. The one-pager format became a standard for our team's technical escalations.",
    },
    insights: [
      'Come with solutions, not just problems — you want to be seen as a partner, not a blocker',
      'Quantify the risk in business terms your executive cares about (revenue, reputation)',
      "Propose a time-boxed test when you can't get the full change — a POC is a win",
      "Disagree privately first, then commit publicly — never undermine your manager in group settings",
    ],
    followUps: [
      'What if the VP had ignored your concerns entirely?',
      'How did you maintain team morale during the disagreement period?',
      'Have you ever lost a disagreement like this and committed anyway?',
    ],
    redFlags: [
      "Going around your manager to a higher level without trying to resolve it 1:1 first",
      'Framing it as being right and the executive being wrong',
      "Not having data to back your position",
    ],
  },
  {
    id: '4',
    title: 'Delivering Bad News to Stakeholders',
    question: 'Tell me about a time you had to deliver bad news to stakeholders. How did you handle it?',
    categories: ['Communication', 'Leadership'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    difficulty: 'Starter',
    star: {
      situation: "Two weeks before a major product launch, my team discovered a critical performance issue: our API response time degraded to 8 seconds under projected load — 4x our SLA. The VP of Product had already announced the launch date to partners and the press.",
      task: "I needed to inform the VP and our partner team of a likely launch delay while presenting a credible path forward and maintaining trust.",
      action: "I requested an urgent 30-minute meeting with the VP and our partner lead within 2 hours of discovery. I came prepared with: (1) A clear description of the issue with data, (2) Root cause analysis — we'd underestimated query complexity in our new recommendation engine, (3) Three options: delay 4 weeks for a full fix, launch with feature-flagged recommendations disabled, or launch with a traffic cap of 10K users. I recommended option 2 as the lowest-risk path to still meet the date. I also sent a written summary before the meeting so they'd had time to process emotionally and could engage analytically in the meeting.",
      result: "The VP chose option 2. We launched on the original date with recommendations disabled, fixed the performance issue in 3 weeks, and re-enabled recommendations with a press release highlighting the 'enhanced AI recommendations' as a feature drop — turning it into a positive PR moment. The partner was impressed by our transparency. Our team's trust with the VP actually increased because of how we handled it.",
    },
    insights: [
      'Never email bad news alone — deliver it in person with a solution ready',
      'Bring options, not just the problem — you need to be the solution',
      'Send a written pre-read so emotional reactions happen before the meeting, not during',
      'Consider whether the bad news creates a reframe opportunity',
    ],
    followUps: [
      'How did you handle the team morale around the launch delay?',
      'What process changes did you put in place to catch this earlier?',
      'Have you ever had a stakeholder react very badly to bad news?',
    ],
    redFlags: [
      'Waiting until the last possible moment to share bad news',
      "Coming to the meeting without options or a recommended path",
      'Blaming the team or a specific engineer for the issue',
    ],
  },
  {
    id: '5',
    title: 'Making a Wrong Technical Call',
    question: 'Tell me about a time you made a mistake or a wrong technical decision. How did you handle it?',
    categories: ['Leadership', 'Technical Leadership', 'Accountability'],
    companies: ['Amazon', 'Netflix', 'Google'],
    difficulty: 'Intermediate',
    star: {
      situation: "I made the call to use a GraphQL gateway to consolidate our APIs across three services, projecting it would reduce client-side complexity and improve developer velocity. I championed this approach to leadership and allocated two engineers for 8 weeks to implement it.",
      task: "Three months after rollout, we saw a 40% increase in p99 latency, two unplanned outages traced to the gateway, and engineers on client teams still preferred calling services directly. I needed to own this decision and figure out what to do.",
      action: "I called a retrospective meeting, owning the outcome clearly: 'I made the call to go with GraphQL. The results have not met expectations. I want to understand what happened and what we should do next.' We ran a structured analysis: the gateway's N+1 query problem had been a known risk I'd underweighted, and the developer experience benefit was smaller than I'd assumed because client teams had different data access patterns than I modeled. I made the decision to sunset the gateway over 6 weeks with a migration guide for client teams. I presented the full analysis to leadership, including what I got wrong in my original assumptions.",
      result: "Latency returned to baseline, outages ceased, and interestingly — two engineers had built custom REST aggregation layers during the migration that solved the original problem more elegantly. I documented the decision and reversal in an Architecture Decision Record and shared it across our engineering org as a learning. The transparency with leadership built significant trust.",
    },
    insights: [
      'Owning a mistake clearly and without hedging is the fastest way to build trust',
      "An ADR (Architecture Decision Record) for reversals is more valuable than one for successes",
      'A wrong decision well-documented teaches more than a right decision undocumented',
      'Give the team credit for the recovery — the mistake was yours, the solution was theirs',
    ],
    followUps: [
      'What signals did you ignore that you should have caught earlier?',
      'How did this change how you make technical decisions?',
      'How did your team respond to you owning it so clearly?',
    ],
    redFlags: [
      "Choosing a mistake that was 'not really my fault' or blaming others",
      'Not quantifying the impact of the mistake',
      "Describing what you learned but not showing the behavior change",
    ],
  },
  {
    id: '6',
    title: 'Scaling Team Velocity Beyond a Plateau',
    question: 'Tell me about a time you improved team performance or productivity significantly.',
    categories: ['Team Development', 'Process Improvement'],
    companies: ['Meta', 'Amazon', 'Google'],
    difficulty: 'Intermediate',
    star: {
      situation: "My team of 8 engineers had delivered around 42 story points per sprint for 4 consecutive quarters. Despite adding 2 engineers in Q2, velocity actually dropped to 38. Engineers were working harder but shipping less.",
      task: "I needed to diagnose the root cause of the plateau and drive a meaningful improvement in velocity without burning out the team.",
      action: "I started by looking at where time was actually going. I built a simple time-tracking survey and flow map across 2 sprints. The data revealed: 35% of engineering time was in meetings or context-switching, test failures were blocking 2+ days per sprint cycle, and unclear acceptance criteria caused 30% of stories to be reopened. I made three changes: (1) Moved to async-first standups and cut recurring meetings by 40%, protecting 2-hour focus blocks each morning. (2) Invested 1 sprint in test automation — raising coverage from 45% to 78%, which cut flaky test interruptions by 70%. (3) Introduced a 'Definition of Ready' checklist — no story entered the sprint without clear acceptance criteria and designs attached.",
      result: "Velocity reached 58 story points by quarter's end — a 38% increase from our plateau. Bug rate dropped 45%. Engineers reported higher job satisfaction in our quarterly survey. We shipped our largest feature of the year in that quarter. I now run a quarterly 'time audit' to catch invisible drains early.",
    },
    insights: [
      'Diagnose before prescribing — more engineers rarely solve a velocity problem',
      'Meeting time and context-switching are the hidden killers of engineering productivity',
      'A one-sprint investment in tooling can pay back 10 sprints of velocity',
      'Velocity metrics are a lagging indicator — look at flow metrics (cycle time, blocked time)',
    ],
    followUps: [
      'How did you sustain this improvement over time?',
      "What happened to team morale during the diagnosis phase?",
      'How did you handle engineers who resisted the async-first approach?',
    ],
    redFlags: [
      'Claiming improvements without specific metrics before and after',
      'Describing only top-down changes without mention of team input',
      'Not addressing the sustainability of the improvements',
    ],
  },
  {
    id: '7',
    title: 'Influencing Without Authority',
    question: 'Tell me about a time you had to influence a team or outcome without having direct authority.',
    categories: ['Influence', 'Cross-team Collaboration', 'Leadership'],
    companies: ['Google', 'Meta', 'Microsoft'],
    difficulty: 'Intermediate',
    star: {
      situation: "Our product had a critical dependency on a shared platform team for a new logging API. The platform team had deprioritized it for Q3, choosing to focus on a different customer's request. Without this API, our team would miss a compliance deadline with regulatory consequences.",
      task: "I needed to get the platform team to reprioritize our request without going over their manager's head or damaging the relationship.",
      action: "I started by deeply understanding the platform team's situation — I spent an hour with their tech lead learning what they were optimizing for in Q3. I learned their primary concern was team capacity. Rather than making a demand, I proposed a partnership: my team would contribute one engineer for 3 weeks to help deliver the logging API alongside them. I also reframed the request: instead of 'we need this,' I came with a business case showing the regulatory exposure — for our company and, by extension, for the platform team if they were associated with the miss. I also offered to co-own the post-launch operations for 6 months, reducing their long-term support burden. I brought this proposal to their manager as a joint recommendation from both tech leads.",
      result: "The platform team agreed to move the API to Q3 with my engineer embedded. We shipped it 2 weeks before the compliance deadline. The embedded engineer relationship resulted in a formal platform team rotation program we still run today. The platform manager later told me it was the cleanest cross-team negotiation she'd seen.",
    },
    insights: [
      'Understand what the other team is optimizing for before you make a request',
      'Offer to carry part of the burden — it shows partnership, not entitlement',
      'Frame requests in shared risk, not individual need',
      'Bring the joint recommendation — never put a peer in a position of choosing between you and their manager',
    ],
    followUps: [
      "What would you have done if they'd still said no?",
      'How did you manage your team\'s expectations during the negotiation?',
      "What's the difference between influence and manipulation?",
    ],
    redFlags: [
      'Escalating to senior leadership as the first move',
      'Framing the other team as the problem or as uncooperative',
      'Not demonstrating reciprocity in the solution',
    ],
  },
  {
    id: '8',
    title: 'Production Incident You Caused',
    question: 'Tell me about a time your team caused a significant production incident. How did you handle it?',
    categories: ['Accountability', 'Technical Leadership', 'Communication'],
    companies: ['Amazon', 'Netflix', 'Google'],
    difficulty: 'Advanced',
    star: {
      situation: "My team deployed a database migration on a Friday evening that introduced a subtle index corruption in our orders table. The bug was masked by our staging environment's smaller dataset. At 9pm, order confirmation rates dropped to 0% for 47 minutes before we caught it. We affected approximately 12,000 customers and roughly $340K in GMV.",
      task: "I needed to manage the incident in real time, own the outcome with leadership and affected customers, and ensure we learned from it systematically.",
      action: "I jumped on the incident call immediately, declared myself incident commander, and ran a structured response: we rolled back the migration in 8 minutes once identified. I personally called the VP of Product at 9:15pm rather than sending a Slack message. I sent a customer communication within 30 minutes with a clear, honest description of what happened. For the post-mortem: I ran it as a blameless RCA with 8 participants across eng, product, and ops. We identified 4 contributing factors — not one root cause — including insufficient staging parity, a missed migration review step, and a monitoring gap. I committed to specific fixes: (1) Automated database migration validation in CI, (2) Production-mirrored staging environment (6-week project), (3) Explicit migration approval gate in our deployment runbook. I presented the full findings, including my own failure to require a migration review, to our engineering leadership.",
      result: "The 4 fixes were shipped within 8 weeks. We have not had a database-related incident in 18 months since. The blameless post-mortem process I established was adopted by 3 other teams. Customers who contacted support were given account credits and we recovered NPS within 2 weeks. Leadership's feedback was that my handling of the incident actually increased confidence in my team.",
    },
    insights: [
      'Call, do not Slack, for major incidents — synchronous communication shows urgency and respect',
      'Blameless post-mortems produce better systemic fixes than blame-based ones',
      'Committing to public fixes with deadlines is how you rebuild trust after incidents',
      'Include your own failure modes in the RCA — it models the culture you want',
    ],
    followUps: [
      'How did the team handle the emotional aftermath of the incident?',
      'How did you handle the specific engineer who wrote the migration?',
      'What is your philosophy on Friday deploys?',
    ],
    redFlags: [
      'Describing the incident without quantifying customer or business impact',
      'Using "we" to deflect from your personal role as the responsible leader',
      'Focusing only on the technical fix without mentioning the communication and process response',
    ],
  },
  {
    id: '9',
    title: 'Technical Debt vs. New Features',
    question: "Tell me about a time you had to balance technical debt against new feature development.",
    categories: ['Technical Leadership', 'Prioritization'],
    companies: ['Amazon', 'Google', 'Meta'],
    difficulty: 'Intermediate',
    star: {
      situation: "Our checkout service had accumulated 3 years of technical debt — monolithic architecture, no observability, test coverage at 22%, and deployment taking 4+ hours. Product had a roadmap of 12 features planned for the year. Engineers were reporting burnout from constant firefighting. We were spending an estimated 40% of engineering time on reactive maintenance.",
      task: "I needed to convince product and leadership to invest in reducing technical debt without losing competitive momentum on the roadmap.",
      action: "I built a 'technical debt ledger' — a document that quantified each debt item in engineering hours per quarter: the checkout service's fragility was costing us 8 eng-weeks/quarter in incidents and debugging. I then framed the trade-off in business terms: 'We are effectively paying 40% of our engineering budget on interest, not principal. Here is what principal paydown looks like.' I proposed a 20-10-70 model for the next 6 months: 20% of capacity to tech debt, 10% to developer experience, 70% to product features — vs. our current unplanned 40% reactive maintenance. I showed that if we invested in the debt now, we would accelerate feature velocity by an estimated 60% in Q3 and Q4. I got buy-in by co-presenting this with Product to ensure they saw it as a shared investment, not an engineering vanity project.",
      result: "Leadership approved a 6-month tech debt sprint. We broke the monolith into 3 bounded services, raised test coverage to 74%, and reduced deployment time to 22 minutes. In Q4, our feature velocity was 2.1x Q2. We shipped 9 of the 12 planned features — 3 more than product thought possible at the start of the year. The checkout service has had zero P1 incidents in 14 months.",
    },
    insights: [
      'Translate technical debt into business language: it is a tax on every future feature',
      'The 20-10-70 model gives product a predictable commitment while funding debt reduction',
      'Co-present with Product — it must be a business decision, not an engineering one',
      'Use velocity metrics to prove the ROI after the investment',
    ],
    followUps: [
      'How did you decide which debt to pay down first?',
      'What would you have done if leadership had said no?',
      'How do you prevent debt from re-accumulating?',
    ],
    redFlags: [
      'Framing technical debt as an engineering problem only',
      'Not quantifying the cost of inaction',
      'Not having a clear return-on-investment argument',
    ],
  },
  {
    id: '10',
    title: 'Building a Team From Scratch',
    question: "Tell me about a time you built or significantly grew an engineering team.",
    categories: ['Team Development', 'Hiring', 'Leadership'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    difficulty: 'Advanced',
    star: {
      situation: "I was handed a greenfield product initiative with a mandate to build the team: 0 engineers, a 6-month runway to launch, and a competitive talent market in 2022 where senior engineers were receiving 3-5 competing offers simultaneously.",
      task: "I needed to hire 8 engineers in 4 months, build a functioning team culture from scratch, and deliver a working product — all in parallel.",
      action: "I started with defining the team's engineering identity before hiring: what problems would we uniquely solve, what would our culture be, what was the engineering craft bar. I wrote a team charter that became our recruiting page. I redesigned our interview process: 60% technical, 40% culture-add focused (not culture-fit). I personally sourced 40% of candidates through warm outreach on GitHub and at two conferences, rather than waiting for inbound. To close candidates in a hot market, I offered architecture ownership — senior candidates got to help design the systems they'd build. I ran a 'team fit' call where candidates met 2-3 future teammates before accepting. For the first 3 months with the new team, I ran weekly team retrospectives and monthly 'operating principles' sessions where we explicitly discussed how we'd work together.",
      result: "I hired 8 engineers in 14 weeks, with an offer acceptance rate of 87% (vs. 62% company average). All 8 are still on the team 18 months later (vs. 30% attrition industry benchmark). We shipped the MVP 2 weeks early. Our team NPS score in the last quarterly survey was 78 (company average: 52).",
    },
    insights: [
      'Define team identity before you hire — candidates buy the mission, not just the job',
      "Architecture ownership closes senior engineers better than compensation alone",
      'Peer interviews create team investment before day 1',
      'Explicit operating principles reduce conflict later — write them early',
    ],
    followUps: [
      'How did you handle a bad hire early in the process?',
      'What would you do differently if building the team over again?',
      'How do you maintain culture as the team scales?',
    ],
    redFlags: [
      'Focusing only on technical bar without mentioning culture and team fit',
      'Not discussing the retention and long-term outcomes',
      "Describing a process that only HR ran — show your personal involvement in every hire",
    ],
  },
  {
    id: '11',
    title: 'Navigating Organizational Restructuring',
    question: 'Tell me about a time you had to lead your team through significant organizational change.',
    categories: ['Leadership', 'Communication', 'Change Management'],
    companies: ['Microsoft', 'Amazon', 'Google'],
    difficulty: 'Advanced',
    star: {
      situation: "Our company underwent a major reorg: my team of 10 was split — 6 engineers moved to a new platform org, 4 stayed with me on a new product team. The announcement came on a Monday with a 2-week transition window. Several engineers were blindsided; two had offers from competing companies within a week.",
      task: "I needed to stabilize the remaining team, support the engineers transitioning out, and maintain delivery momentum during a period of high uncertainty — all without full visibility into the final org structure.",
      action: "Within 2 hours of the announcement, I held a team meeting — not to explain the company's decision (I had limited context), but to acknowledge what we were feeling and to answer every question I could honestly. For questions I could not answer, I said so explicitly and committed to a follow-up date. I then ran separate 1:1s with each engineer within 48 hours. For the 4 engineers transitioning, I spent time understanding their concerns about the new team and advocated directly for their titles and projects to transfer properly. For the 2 engineers considering leaving, I was honest: 'I understand why you're looking. Here's what I can commit to you, and here's what I cannot.' Both stayed. For the remaining team, I ran a team charter session to redefine our identity as the new, smaller product team.",
      result: "Both engineers who had been considering leaving stayed — one told me the honest conversation was the deciding factor. All 6 transitioning engineers had smooth handoffs with no delivery disruption. Our team shipped our Q3 commitments at 95% despite the 6-week disruption. I was asked to run the change management playbook for two other teams going through similar restructuring.",
    },
    insights: [
      'Acknowledge the emotional reality before the operational one — people cannot hear logistics when they are anxious',
      "Being honest about what you don't know builds more trust than pretending you have answers",
      'Advocate for your transitioning engineers as fiercely as your remaining ones',
      'A team charter session after a reorg re-establishes identity and purpose',
    ],
    followUps: [
      'How did you handle an engineer who was very bitter about the reorg?',
      'What communication did you have with the new platform team leader?',
      'How did you protect delivery commitments during the transition?',
    ],
    redFlags: [
      'Not acknowledging the human impact of the change',
      'Showing loyalty only to the company decision, not to the individuals affected',
      'Describing a passive response to the reorg rather than proactive leadership',
    ],
  },
  {
    id: '12',
    title: 'AI and Machine Learning Decision',
    question: "Tell me about a time you had to make a significant decision about incorporating AI or ML into your product or team's work.",
    categories: ['Technical Leadership', 'AI/ML', 'Innovation'],
    companies: ['Google', 'Meta', 'Microsoft', 'Amazon'],
    difficulty: 'Advanced',
    star: {
      situation: "In 2023, our team was building a customer support ticket routing system. Product wanted us to integrate a large language model to auto-triage and classify tickets. Our options were: build a fine-tuned model ourselves, use a third-party LLM API (OpenAI/Claude), or use a traditional ML classifier we'd already built.",
      task: "I needed to make a build vs. buy vs. existing decision for a production ML system handling ~50K tickets/day, with accuracy, cost, privacy, and latency requirements all in tension.",
      action: "I ran a structured 2-week evaluation: (1) Defined success metrics upfront — accuracy >94%, latency <2s, cost <$0.01/ticket, no PII leaving our systems. (2) Benchmarked our existing classifier: 89% accuracy, $0.0002/ticket, 50ms latency. (3) Tested a fine-tuned GPT-3.5 model on 5,000 historical tickets: 96% accuracy, $0.008/ticket, 800ms latency — but required sending data to OpenAI, violating our privacy requirement. (4) Evaluated an on-premise open-source LLM (Llama 2 fine-tuned): 95% accuracy, $0.003/ticket infrastructure cost, 1.2s latency, data stays on-prem. My recommendation was a hybrid: use the existing classifier for 85% of tickets (high confidence, fast), escalate only low-confidence tickets to the fine-tuned Llama model. This cut LLM costs by 6x.",
      result: "The hybrid system went to production in 8 weeks. End-to-end accuracy: 97% (2% above target). Cost: $0.0009/ticket (10x cheaper than pure LLM). The approach is now our company's standard for ML-in-the-loop systems. I presented the evaluation framework at our internal engineering summit and it has been used by 4 other teams for similar decisions.",
    },
    insights: [
      "Define success metrics before evaluating options — don't fall in love with the technology",
      'Privacy and compliance requirements often rule out the most capable option',
      'Hybrid approaches frequently outperform pure solutions on cost and latency',
      'Build an evaluation framework you can reuse — AI decisions will keep coming',
    ],
    followUps: [
      'How did you handle model drift and retraining?',
      'What would you have done if the LLM had performed better but been 10x more expensive?',
      'How do you think about AI replacing parts of your team?',
    ],
    redFlags: [
      'Choosing the most impressive technology without comparing alternatives',
      'Not accounting for operational costs beyond the initial build',
      'Not mentioning privacy, security, or compliance considerations',
    ],
  },
]

const CATEGORIES = ['All', 'Leadership', 'Conflict Resolution', 'Technical Leadership', 'Team Development', 'Communication', 'Influence', 'Cross-team Collaboration', 'Prioritization', 'Change Management', 'AI/ML', 'Innovation', 'Hiring', 'Accountability', 'Process Improvement']
const DIFFICULTIES = ['All', 'Starter', 'Intermediate', 'Advanced']
const COMPANY_NAMES = ['All', 'Amazon', 'Meta', 'Google', 'Apple', 'Netflix', 'Microsoft']

const difficultyColor = {
  Starter: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

type Tab = 'principles' | 'questions' | 'practice'

export default function BehavioralPage() {
  const [tab, setTab] = useState<Tab>('principles')
  const [selectedCompany, setSelectedCompany] = useState(companies[0])
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [practiceVisible, setPracticeVisible] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [companyFilter, setCompanyFilter] = useState('All')
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null)

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchSearch = !search || q.title.toLowerCase().includes(search.toLowerCase()) || q.question.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'All' || q.categories.includes(categoryFilter)
      const matchDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter
      const matchCompany = companyFilter === 'All' || q.companies.includes(companyFilter)
      return matchSearch && matchCategory && matchDifficulty && matchCompany
    })
  }, [search, categoryFilter, difficultyFilter, companyFilter])

  const togglePracticeVisible = (id: string) => {
    setPracticeVisible(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">Behavioral Interview Mastery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Company leadership frameworks, 12 full STAR answers, and practice mode</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 rounded-xl bg-white p-1 shadow dark:bg-gray-800">
          {([['principles', BookOpen, 'Company Principles'], ['questions', Star, 'STAR Questions'], ['practice', Brain, 'Practice Mode']] as const).map(([t, Icon, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${tab === t ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Company Principles Tab ── */}
          {tab === 'principles' && (
            <motion.div key="principles" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6 flex flex-wrap gap-3">
                {companies.map(c => (
                  <motion.button key={c.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCompany(c)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${selectedCompany.name === c.name ? `bg-gradient-to-r ${c.color} text-white shadow-lg` : 'bg-white text-gray-700 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300'}`}>
                    <Building className="h-4 w-4" />
                    {c.name}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={selectedCompany.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
                  <div className={`mb-6 rounded-xl bg-gradient-to-r ${selectedCompany.color} p-4 text-white`}>
                    <h2 className="text-2xl font-bold">{selectedCompany.name} Leadership Principles</h2>
                    <p className="mt-1 opacity-90">{selectedCompany.principles.length} principles · {selectedCompany.topQuestions.length} top questions</p>
                  </div>

                  <div className="mb-6 grid gap-3 sm:grid-cols-2">
                    {selectedCompany.principles.map((p, i) => (
                      <motion.div key={p.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                        className="cursor-pointer rounded-lg border border-gray-100 p-4 transition-all hover:border-purple-300 hover:shadow-md dark:border-gray-700"
                        onClick={() => setExpandedPrinciple(expandedPrinciple === p.name ? null : p.name)}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span className="font-semibold text-gray-900 dark:text-white">{p.name}</span>
                          </div>
                          {expandedPrinciple === p.name ? <ChevronUp className="h-4 w-4 shrink-0 text-gray-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />}
                        </div>
                        <AnimatePresence>
                          {expandedPrinciple === p.name && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
                              <div className="mt-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Example answer hook</p>
                                <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">{p.example}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                      <h3 className="mb-3 flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                        <Lightbulb className="h-4 w-4" /> Interview Tips for {selectedCompany.name}
                      </h3>
                      <ul className="space-y-2">
                        {selectedCompany.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                      <h3 className="mb-3 flex items-center gap-2 font-bold text-purple-800 dark:text-purple-300">
                        <MessageSquare className="h-4 w-4" /> Top {selectedCompany.name} Questions
                      </h3>
                      <ul className="space-y-3">
                        {selectedCompany.topQuestions.map((q, i) => (
                          <li key={i} className="text-sm text-purple-700 dark:text-purple-400">
                            <span className="mr-2 font-bold">{i + 1}.</span>{q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── STAR Questions Tab ── */}
          {tab === 'questions' && (
            <motion.div key="questions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Filters */}
              <div className="mb-6 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..."
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-gray-400" /></button>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Filter className="h-4 w-4 mt-1.5 text-gray-400 shrink-0" />
                  {DIFFICULTIES.map(d => (
                    <button key={d} onClick={() => setDifficultyFilter(d)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${difficultyFilter === d ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-400'}`}>
                      {d}
                    </button>
                  ))}
                  <span className="h-4 w-px bg-gray-200 dark:bg-gray-700 mt-1.5" />
                  {COMPANY_NAMES.map(c => (
                    <button key={c} onClick={() => setCompanyFilter(c)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${companyFilter === c ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-400'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{filteredQuestions.length} questions</p>

              <div className="space-y-4">
                {filteredQuestions.map((q, i) => (
                  <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="rounded-2xl bg-white shadow-lg dark:bg-gray-800">
                    <div className="cursor-pointer p-6" onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                            {q.companies.map(c => <span key={c} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">{c}</span>)}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{q.title}</h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{q.question}</p>
                        </div>
                        {expandedQuestion === q.id ? <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" /> : <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {q.categories.map(c => <span key={c} className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">{c}</span>)}
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedQuestion === q.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-gray-100 dark:border-gray-700">
                          <div className="p-6 space-y-4">
                            {([['Situation', q.star.situation, 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'],
                               ['Task', q.star.task, 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'],
                               ['Action', q.star.action, 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300'],
                               ['Result', q.star.result, 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300'],
                            ] as const).map(([label, content, cls]) => (
                              <div key={label} className={`rounded-lg border p-4 ${cls}`}>
                                <p className="mb-2 text-xs font-bold uppercase tracking-wider opacity-70">{label}</p>
                                <p className="text-sm leading-relaxed">{content}</p>
                              </div>
                            ))}

                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
                                <p className="mb-2 flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400"><Lightbulb className="h-3 w-3" /> Key Insights</p>
                                <ul className="space-y-1.5">{q.insights.map((ins, j) => <li key={j} className="text-xs text-emerald-700 dark:text-emerald-400">• {ins}</li>)}</ul>
                              </div>
                              <div className="rounded-lg bg-sky-50 p-4 dark:bg-sky-900/20">
                                <p className="mb-2 flex items-center gap-1 text-xs font-bold text-sky-700 dark:text-sky-400"><MessageSquare className="h-3 w-3" /> Likely Follow-Ups</p>
                                <ul className="space-y-1.5">{q.followUps.map((f, j) => <li key={j} className="text-xs text-sky-700 dark:text-sky-400">• {f}</li>)}</ul>
                              </div>
                              <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                                <p className="mb-2 flex items-center gap-1 text-xs font-bold text-red-700 dark:text-red-400"><AlertTriangle className="h-3 w-3" /> Red Flags to Avoid</p>
                                <ul className="space-y-1.5">{q.redFlags.map((r, j) => <li key={j} className="text-xs text-red-700 dark:text-red-400">• {r}</li>)}</ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Practice Mode Tab ── */}
          {tab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                <h2 className="text-xl font-bold">Practice Mode</h2>
                <p className="mt-1 text-purple-100">Read each question. Think through your STAR answer. Then reveal to compare.</p>
              </div>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="rounded-2xl bg-white shadow-lg dark:bg-gray-800">
                    <div className="p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{q.question}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {q.categories.map(c => <span key={c} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">{c}</span>)}
                      </div>

                      <div className="mt-4">
                        {!practiceVisible[q.id] ? (
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => togglePracticeVisible(q.id)}
                            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                            <Eye className="h-4 w-4" /> Reveal Model Answer
                          </motion.button>
                        ) : (
                          <div>
                            <button onClick={() => togglePracticeVisible(q.id)}
                              className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                              <EyeOff className="h-4 w-4" /> Hide Answer
                            </button>
                            <div className="space-y-3">
                              {([['S', q.star.situation, 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'],
                                 ['T', q.star.task, 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'],
                                 ['A', q.star.action, 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'],
                                 ['R', q.star.result, 'bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'],
                              ] as const).map(([label, content, cls]) => (
                                <div key={label} className={`rounded-lg p-4 ${cls}`}>
                                  <span className="mr-2 font-black">{label} —</span>
                                  <span className="text-sm leading-relaxed">{content}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
