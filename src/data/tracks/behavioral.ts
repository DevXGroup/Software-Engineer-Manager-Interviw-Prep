import { assertTrackIds } from '@/data/tracks/ids'
import type { Priority } from '@/data/quizzes/types'

export type Principle = { name: string; description: string; example: string }
export type Company = {
  name: string
  /** What this company calls its list. Defaults to "Leadership principles" when absent. */
  principlesLabel?: string
  /** One line telling the reader how to use the example hooks below. */
  exampleFraming: string
  principles: Principle[]
  tips: string[]
  topQuestions: string[]
}
export type AnswerTiers = {
  weak: string
  borderline: string
  strong: string
  /** One line naming what raised each version to the next tier. */
  whatMoved: string
}
export type Question = {
  id: string
  title: string
  question: string
  categories: string[]
  companies: string[]
  difficulty: 'Starter' | 'Intermediate' | 'Advanced'
  star: { situation: string; task: string; action: string; result: string }
  tiers: AnswerTiers
  insights: string[]
  followUps: string[]
  redFlags: string[]
}

export const companies: Company[] = [
  {
    name: 'Amazon',
    exampleFraming: "These are prompts to find your own story against each principle, not numbers to reuse: interviewers hear the same borrowed metrics all day.",
    principles: [
      { name: 'Customer Obsession', description: 'Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.', example: 'Reversed a product decision because NPS dropped 12 points' },
      { name: 'Ownership', description: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results.", example: 'Took ownership of a cross-team failure impacting revenue' },
      { name: 'Invent and Simplify', description: 'Leaders expect and require innovation and invention from their teams and always find ways to simplify.', example: 'Built an internal tool that reduced deploy time by 70%' },
      { name: 'Are Right, A Lot', description: 'Leaders have strong judgment and seek diverse perspectives to disconfirm beliefs.', example: 'Challenged consensus with data, saved 6 months of wrong direction' },
      { name: 'Learn and Be Curious', description: 'Leaders are never done learning and always seek to improve themselves.', example: 'Self-studied ML to evaluate vendor proposals credibly' },
      { name: 'Hire and Develop the Best', description: 'Leaders raise the performance bar with every hire and promotion.', example: 'Defined hiring bar where 40% of team later promoted to senior' },
      { name: 'Insist on the Highest Standards', description: 'Leaders have relentlessly high standards, standards many think are unreasonably high.', example: 'Rejected launch until security audit completed despite schedule pressure' },
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
      "Use 'I' not 'we': interviewers want your specific contribution",
      'Amazon loves specific metrics: always quantify impact',
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
    exampleFraming: "Read each hook as a prompt for a story you actually lived, not a figure to quote: your own scale, however modest, survives follow-up questions.",
    principles: [
      { name: 'Move Fast', description: 'Speed enables learning. Move fast and iterate rather than waiting for perfection.', example: 'Launched beta in 3 weeks, learned more than 3 months of planning' },
      { name: 'Focus on Long-Term Impact', description: 'Prioritize work that creates substantial long-term value over short-term wins.', example: 'Deferred feature requests to rebuild architecture enabling 10x scale' },
      { name: 'Build Awesome Things', description: "Create products and technology that fundamentally improve people's lives.", example: 'Led team that shipped accessibility features used by 2M+ users' },
      { name: 'Live in the Future', description: "Solve tomorrow's problems, not today's constraints.", example: 'Invested in VR tooling 18 months before mainstream adoption' },
      { name: 'Be Direct and Respect Your Colleagues', description: 'Give direct feedback with radical candor. Disagree openly and honestly.', example: 'Gave critical feedback at all-hands that improved product direction' },
      { name: 'Meta, Metamates, Me', description: 'Put the company mission first, team second, individual last.', example: 'Volunteered team for cross-org firefight during critical launch' },
    ],
    tips: [
      'Meta values boldness: quantify impact at scale (billions of users)',
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
    exampleFraming: "Each hook is a prompt to locate one of your own examples for that attribute, not a claim to repeat: the follow-up questions go where the evidence is.",
    principlesLabel: 'Interview attributes',
    principles: [
      { name: "General cognitive ability", description: "How you approach a problem you have not seen before: Google grades the reasoning, the questions you ask, and how you handle being wrong mid-answer, not whether you reach the tidy answer. For an engineering manager this shows up as ambiguous org and product problems rather than puzzles.", example: "A decision where the problem was badly defined, and how you framed it before solving it" },
      { name: "Role-related knowledge", description: "The depth you actually have for the job: for an EM loop that means people and delivery mechanics, technical credibility deep enough to review a design, and evidence you have run the part of the software lifecycle this role owns.", example: "A technical design you reviewed and changed, plus a delivery system you built such as planning, on-call or hiring" },
      { name: "Leadership", description: "Not title, but emergent leadership: whether you step in when a problem has no owner, step back when someone else should lead, develop people, and get outcomes across teams you do not control.", example: "A problem you picked up because nobody owned it, and a person whose growth you can trace to your work" },
      { name: "Googleyness", description: "Comfort with ambiguity, bias to action, intellectual humility, and doing right by users and colleagues. It is assessed from behaviour in your examples, so it is the attribute most often failed by candidates who only tell success stories.", example: "A time you changed your mind because a colleague or the data disagreed with you" },
    ],
    tips: [
      'Google scores four attributes, not a values list: every interviewer grades one or two of them',
      'Each interviewer writes independent notes before the hiring committee sees them, so repeat your strongest evidence across rounds',
      'Intellectual humility is graded: say what you got wrong and what changed your mind',
      'Expect hypotheticals as well as past examples, and reason out loud rather than jumping to the answer',
    ],
    topQuestions: [
      'How do you approach decisions when data is ambiguous or conflicting?',
      'Tell me about a time you drove innovation in a large organization',
      "Describe how you've handled a situation where the right answer wasn't obvious",
    ],
  },
  {
    name: 'Apple',
    exampleFraming: "Use each hook to find the equivalent moment in your own work rather than reciting it: craft stories only land when the detail is yours.",
    principles: [
      { name: 'Radical Simplicity', description: "The hardest thing is making things simple. Cut everything that doesn't belong.", example: 'Reduced feature set by 50% to deliver a product that just works' },
      { name: 'Deep Collaboration', description: 'The best results come from intense collaboration across disciplines.', example: 'Led 3-way collaboration between Design, Engineering, and Operations' },
      { name: 'Accountability', description: 'Everyone is responsible for the product. No handoffs, no finger-pointing.', example: "Owned production incident that cascaded from another team's change" },
      { name: 'Attention to Detail', description: 'Perfection is the baseline. Every pixel, every millisecond matters.', example: 'Iterated 14 times on UX flow until conversion matched benchmark' },
      { name: 'Long-Term Commitment', description: 'Apple plays the long game. Short-term wins that hurt long-term trust are rejected.', example: 'Declined partner deal that would have compromised user privacy' },
      { name: 'Privacy as a Human Right', description: 'User privacy is not a feature, it is a foundational principle.', example: 'Redesigned data collection to be opt-in, reducing legal risk and building trust' },
    ],
    tips: [
      'Apple values discretion: do not discuss confidential work details',
      'Show taste and craft: how have you made something beautiful and simple?',
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
    principlesLabel: 'Culture values',
    exampleFraming: "Treat each hook as a prompt for your own example, not a line to deliver: Netflix interviewers probe for the reasoning behind the story.",
    principles: [
      { name: "Selflessness", description: "You are humble when searching for the best ideas, you seek what is best for Netflix rather than yourself or your team, and you take time to help others succeed.", example: "A time you gave up scope, headcount or credit because another team was better placed to deliver the outcome" },
      { name: "Judgment", description: "You look past short-term fixes toward long-term solutions, you make wise decisions despite ambiguity, and you use data to inform intuition.", example: "A decision you made with incomplete information, and the signal you used to inform it" },
      { name: "Candor", description: "You give and receive feedback willingly, you are open about what is working and what needs to improve, and you admit mistakes openly and share the learning widely.", example: "A piece of hard feedback you gave upwards, or a mistake you published rather than contained" },
      { name: "Creativity", description: "You welcome new ideas and are persistent in pursuit of more innovative solutions.", example: "A problem where the obvious approach was available and you argued for a different one" },
      { name: "Courage", description: "You are vulnerable in the search for truth, and you are willing to risk failure or challenge the status quo in pursuit of excellence.", example: "A moment you said the unpopular thing in the room where it was costly to say it" },
      { name: "Inclusion", description: "You recognise your own biases and work to counteract them, and you try to ensure everyone can do their best work whatever their culture, identity or background.", example: "A change you made to how your team works that let someone contribute who previously could not" },
      { name: "Curiosity", description: "You learn rapidly and eagerly, you are more interested in other people's ideas than your own, and you stay humble about what you do not yet know.", example: "Something outside your discipline you learned properly because a decision depended on it" },
      { name: "Resilience", description: "You adapt quickly to changing circumstances, you make tough decisions without agonising or long delay, and you embrace a hard challenge.", example: "A reversal or a cancelled project you absorbed, and how fast you moved the team past it" },
    ],
    tips: [
      'The 2024 memo is explicit that talent does not excuse treating colleagues badly: show high performance and decency together',
      'Demonstrate comfort with freedom and responsibility: self-direction is key',
      'Show data fluency: Netflix is extremely data-driven across all decisions',
      'Context not control: give your team the context to decide, and expect the keeper test to come up',
    ],
    topQuestions: [
      'Tell me about a time you made a high-stakes decision with limited time',
      'Describe how you created a culture of candid feedback',
      'Tell me about a time you had to let go of a high-performing but toxic team member',
    ],
  },
  {
    name: 'Microsoft',
    exampleFraming: "Each hook points at a kind of story to go find in your own history, not a result to borrow: the specifics are what make it credible.",
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

export const questions: Question[] = [
  {
    id: 'resolving-senior-engineer-conflict',
    title: 'Resolving Senior Engineer Conflict',
    question: 'Tell me about a time you had to resolve a serious technical conflict between senior engineers.',
    categories: ['Conflict Resolution', 'Technical Leadership'],
    companies: ['Amazon', 'Google', 'Meta'],
    difficulty: 'Intermediate',
    star: {
      situation: 'Two of my senior engineers had a fundamental disagreement about our microservices architecture. The backend lead wanted to extract payment processing into its own service immediately, citing SLA requirements. The platform lead wanted to keep it monolithic for another 6 months, citing insufficient observability tooling. The dispute had stalled our Q3 roadmap for 3 weeks and was creating visible tension in the team.',
      task: 'As their manager, I needed to resolve this in a way that: (1) made the right technical decision for the company, (2) preserved the relationship and trust of both engineers, and (3) got the team moving again without one side feeling like they lost.',
      action: "I started with separate 30-minute 1:1s with each engineer, not to take sides, but to fully understand each perspective. I realized the backend lead's concern was about SLA risk, while the platform lead's concern was about ops burden. These were complementary concerns, not opposing ones. I then facilitated a 90-minute structured session with both engineers and our architect. I came in with a decision matrix I'd built: we scored options on SLA risk, operational complexity, team readiness, and 12-month scalability. Rather than debating opinions, we were scoring evidence. The matrix pointed to a phased approach: build the service boundary first (solving the SLA issue) while keeping shared infrastructure for 2 more quarters (solving the ops concern). I also proposed that the platform lead would own the observability tooling project as a formal Q3 initiative with dedicated resources.",
      result: "Both engineers agreed to the plan within the session, and more importantly, they left feeling heard and respected. We shipped the service boundary 6 weeks later. The platform lead's observability work became a company-wide initiative used by 12 teams. The two engineers now co-lead our Architecture Review Board. Velocity recovered fully within 2 weeks of the decision.",
    },
    tiers: {
      weak: "Two senior engineers kept arguing about the architecture, so I listened to both and picked the option I thought was better. I told them the decision in standup and asked them to move on. One of them stayed unhappy for a while but the work shipped. Looking back it was the right call even if it was not popular.",
      borderline: "Two senior engineers had stalled the roadmap for three weeks arguing about extracting payments into its own service. I met each of them separately to hear the reasoning, then brought them together and walked through the tradeoffs on a whiteboard. We agreed on a phased approach: build the service boundary now, keep shared infrastructure for two more quarters. The roadmap unblocked and both of them stayed on the team.",
      strong: "The argument had cost us three weeks of roadmap, so I treated the cost as the thing to fix, not the disagreement. Separate one-to-ones told me the two positions were not actually opposed: one engineer was carrying SLA risk, the other was carrying operations burden. I brought a scoring matrix to a joint session so we compared evidence instead of opinions, and it pointed to a phased plan that answered both concerns. I also made the observability work a funded Q3 initiative so the engineer who did not get his sequencing still owned something real. Velocity recovered in two weeks and the two now co-lead our architecture review board.",
      whatMoved: "Weak decides for them, borderline hears them out, strong names the business cost, finds the shared concern underneath the positions, and gives the person who conceded a real piece of ownership.",
    },
    insights: [
      'Separate 1:1s before group discussion prevents public posturing',
      'Identify the underlying concern, not just the stated position',
      'Decision matrices depersonalize the debate: it is data vs. data, not person vs. person',
      "Give the losing side a win: own the adjacent problem",
    ],
    followUps: [
      'What would you have done if they still disagreed after the session?',
      'How did you prevent this type of conflict from recurring?',
      'What did you learn about yourself as a manager?',
    ],
    redFlags: [
      "Saying 'I just made the decision': shows inability to build consensus",
      'Not quantifying the business impact of the delay',
      'Not mentioning what each party got out of the resolution',
    ],
  },
  {
    id: 'handling-underperforming-engineer',
    title: 'Handling an Underperforming Engineer',
    question: 'Tell me about a time you had to manage an underperforming team member. How did you handle it?',
    categories: ['Team Development', 'Leadership'],
    companies: ['Amazon', 'Meta', 'Netflix'],
    difficulty: 'Intermediate',
    star: {
      situation: 'A senior engineer on my team, 4 years at the company, had been consistently missing sprint commitments for two quarters. Code reviews were taking 5+ days, PRs had more bugs than junior engineers, and two teammates had privately raised concerns about depending on her work. Her previous manager had no documentation of performance issues.',
      task: "I needed to turn this around or make a difficult personnel decision, all while protecting the team's morale and maintaining the engineer's dignity throughout the process.",
      action: "I started with a candid 1:1 where I shared specific observations with data: '3 of your last 5 features were shipped with P1 bugs,' 'your average PR review time is 6 days vs. team average of 1.5 days.' I asked what was going on. She revealed she was struggling with our new cloud architecture; she'd been masking the gap for months. We built a 60-day PIP together (not handed down to her) with: weekly 1:1s with a technical mentor, two starter-sized cloud projects with close support, and clear weekly milestones. I connected her with our internal cloud training program and gave her explicit permission to ask for help. I also set a clear expectation: 'If we don't see [specific improvements] in 60 days, we'll need to discuss a role change.'",
      result: "By week 6, her PR cycle time dropped to 2 days and she shipped a cloud feature independently. By the end of month 3, she was reviewing other engineers' cloud PRs. She was promoted to Staff Engineer 18 months later. The experience also led me to build a formal technical skill assessment into our quarterly reviews to catch gaps earlier.",
    },
    tiers: {
      weak: "One engineer was not delivering at the level we needed. I gave him feedback a few times in our one-to-ones and told him he needed to improve. Things did not change much, so eventually he moved on to a different team. It was a difficult situation but it resolved itself.",
      borderline: "A mid-level engineer's output had dropped well below the rest of the team. I sat down with him, named the specific gap between what was shipping and what the role needed, and we wrote a thirty-day plan with weekly checkpoints. He hit most of the plan and his throughput came back to where it should be. I kept the weekly checkpoints running for another quarter so the improvement stuck.",
      strong: "Before I raised performance with him I checked whether the problem was performance at all: I read six months of his reviews and pull requests and found the drop started the week we moved him onto an unfamiliar service with no onboarding. So I opened the conversation with the pattern and a question rather than a verdict, and he told me he had been guessing for weeks and was too embarrassed to ask. We wrote a thirty-day plan with one measurable outcome per week, paired him with a senior on the service, and I documented every checkpoint in writing so there were no surprises either way. He cleared the plan, and eighteen months later he owns that service. The part I would repeat is diagnosing before deciding, because a support problem and a capability problem look identical from the outside.",
      whatMoved: "Weak treats attrition as a resolution, borderline runs a real plan, strong diagnoses the cause first, documents the process so the outcome is defensible, and states what the manager got wrong.",
    },
    insights: [
      'Use specific data, not vague feedback: it removes subjectivity',
      'Build the PIP with them, not for them: ownership changes the dynamic',
      'Diagnose the root cause first (skills gap vs. motivation vs. external factors)',
      'Set clear consequences upfront: ambiguity is cruel, not kind',
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
    id: 'pushing-back-on-executive-direction',
    title: 'Pushing Back on Executive Direction',
    question: 'Describe a time you disagreed with your manager or leadership and what you did about it.',
    categories: ['Leadership', 'Conflict Resolution', 'Influence'],
    companies: ['Amazon', 'Netflix', 'Google'],
    difficulty: 'Advanced',
    star: {
      situation: "Our VP announced in a Q-planning meeting that we'd replatform our entire data pipeline to a new vendor's solution in Q2, a 12-week window. I'd evaluated this vendor and believed the migration would take at minimum 6 months and carried significant data integrity risks. The decision had already been announced to the company.",
      task: 'I needed to raise my concerns to the VP without looking like I was undermining a public commitment, while preventing what I believed would be a high-risk failure.',
      action: "I requested a 30-minute 1:1 with the VP within 24 hours. I came prepared with a one-pager: a side-by-side comparison of the original timeline vs. my analysis (with named assumptions), a risk matrix with each risk quantified in potential revenue impact, and two alternative proposals: one that hit the Q2 date by reducing scope, and one that hit full scope in Q4 with monthly milestones. I used the framing: 'I want to help us succeed. Here's what I'm seeing that concerns me, and here are ways I think we can still get there.' The VP appreciated the data but pushed back; the announcement had been made. I agreed to run a 2-week proof of concept on the most critical migration path, with predefined success criteria, before committing the full team.",
      result: "The POC revealed 3 data integrity issues the vendor's documentation hadn't disclosed. The VP used the POC results to renegotiate the timeline with the board. We delivered the migration in 5 months, on a revised timeline, with zero data incidents. My credibility with the VP increased significantly. The one-pager format became a standard for our team's technical escalations.",
    },
    tiers: {
      weak: "Leadership wanted a launch date I did not believe in, so I told my VP it was unrealistic. He disagreed, we shipped on the original date, and it went badly. I had raised the risk so at least it was on the record.",
      borderline: "Our VP committed to a date that our estimates said we would miss by six weeks. I put together a one-page memo with the estimate breakdown and the two risks I was most worried about, and walked him through it. He agreed to move the launch by a month and cut one feature from scope. We shipped on the revised date without a crunch.",
      strong: "I disagreed with a commitment my VP had already made publicly, which meant my job was to give him a way to change course without losing face. I did not lead with the date. I brought the three assumptions his plan depended on, showed which two were already false in our telemetry, and offered two options with explicit tradeoffs rather than a single objection. He took the smaller-scope option, and because the memo framed it as new information rather than a bad call, the change read as a decision instead of a retreat. We shipped four weeks later than the original date with no quality incidents, and he now asks for that memo format before committing dates.",
      whatMoved: "Weak logs an objection and lets the failure happen, borderline argues the estimate, strong attacks the assumptions instead of the person, offers options, and protects the executive's standing while changing the outcome.",
    },
    insights: [
      'Come with solutions, not just problems: you want to be seen as a partner, not a blocker',
      'Quantify the risk in business terms your executive cares about (revenue, reputation)',
      "Propose a time-boxed test when you can't get the full change: a POC is a win",
      'Disagree privately first, then commit publicly: never undermine your manager in group settings',
    ],
    followUps: [
      'What if the VP had ignored your concerns entirely?',
      'How did you maintain team morale during the disagreement period?',
      'Have you ever lost a disagreement like this and committed anyway?',
    ],
    redFlags: [
      'Going around your manager to a higher level without trying to resolve it 1:1 first',
      'Framing it as being right and the executive being wrong',
      'Not having data to back your position',
    ],
  },
  {
    id: 'delivering-bad-news-to-stakeholders',
    title: 'Delivering Bad News to Stakeholders',
    question: 'Tell me about a time you had to deliver bad news to stakeholders. How did you handle it?',
    categories: ['Communication', 'Leadership'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    difficulty: 'Starter',
    star: {
      situation: 'Two weeks before a major product launch, my team discovered a critical performance issue: our API response time degraded to 8 seconds under projected load, 4x our SLA. The VP of Product had already announced the launch date to partners and the press.',
      task: 'I needed to inform the VP and our partner team of a likely launch delay while presenting a credible path forward and maintaining trust.',
      action: 'I requested an urgent 30-minute meeting with the VP and our partner lead within 2 hours of discovery. I came prepared with: (1) a clear description of the issue with data, (2) root cause analysis, we\'d underestimated query complexity in our new recommendation engine, (3) three options: delay 4 weeks for a full fix, launch with feature-flagged recommendations disabled, or launch with a traffic cap of 10K users. I recommended option 2 as the lowest-risk path to still meet the date. I also sent a written summary before the meeting so they\'d had time to process emotionally and could engage analytically in the meeting.',
      result: "The VP chose option 2. We launched on the original date with recommendations disabled, fixed the performance issue in 3 weeks, and re-enabled recommendations with a press release highlighting the 'enhanced AI recommendations' as a feature drop, turning it into a positive PR moment. The partner was impressed by our transparency. Our team's trust with the VP actually increased because of how we handled it.",
    },
    tiers: {
      weak: "We were going to miss the date, so I told the stakeholders in our weekly status meeting. They were not happy about it. I explained that the work had been harder than expected and we agreed on a new date.",
      borderline: "Two weeks before launch it was clear we would slip by a month. I emailed the stakeholders the same day I knew, with the reason, the new date, and what we were cutting to protect it. I then ran a thirty-minute call to take questions directly rather than letting it play out over email. Nobody was pleased, but the revised plan held and we shipped on the new date.",
      strong: "The moment our burn-up chart made the slip certain I told the stakeholders, before I had the recovery plan, because a late surprise costs more trust than an early gap. The message had four parts: what changed, what it costs each of them specifically, the two options I saw, and the one I recommended. I told the customer-facing leads first and one-to-one, so they were not hearing it in a room full of peers. We slipped by three weeks instead of the six the original path implied, and the head of sales later told me the early warning let her reset two customer commitments before they were promises. I now publish a confidence level with every date for exactly this reason.",
      whatMoved: "Weak reports at the meeting, borderline reports same-day with a plan, strong reports before the plan exists, translates the cost per stakeholder, sequences who hears it first, and changes the process afterwards.",
    },
    insights: [
      'Never email bad news alone: deliver it in person with a solution ready',
      'Bring options, not just the problem: you need to be the solution',
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
      'Coming to the meeting without options or a recommended path',
      'Blaming the team or a specific engineer for the issue',
    ],
  },
  {
    id: 'making-a-wrong-technical-call',
    title: 'Making a Wrong Technical Call',
    question: 'Tell me about a time you made a mistake or a wrong technical decision. How did you handle it?',
    categories: ['Leadership', 'Technical Leadership', 'Accountability'],
    companies: ['Amazon', 'Netflix', 'Google'],
    difficulty: 'Intermediate',
    star: {
      situation: 'I made the call to use a GraphQL gateway to consolidate our APIs across three services, projecting it would reduce client-side complexity and improve developer velocity. I championed this approach to leadership and allocated two engineers for 8 weeks to implement it.',
      task: 'Three months after rollout, we saw a 40% increase in p99 latency, two unplanned outages traced to the gateway, and engineers on client teams still preferred calling services directly. I needed to own this decision and figure out what to do.',
      action: "I called a retrospective meeting, owning the outcome clearly: 'I made the call to go with GraphQL. The results have not met expectations. I want to understand what happened and what we should do next.' We ran a structured analysis: the gateway's N+1 query problem had been a known risk I'd underweighted, and the developer experience benefit was smaller than I'd assumed because client teams had different data access patterns than I modeled. I made the decision to sunset the gateway over 6 weeks with a migration guide for client teams. I presented the full analysis to leadership, including what I got wrong in my original assumptions.",
      result: 'Latency returned to baseline, outages ceased, and interestingly, two engineers had built custom REST aggregation layers during the migration that solved the original problem more elegantly. I documented the decision and reversal in an Architecture Decision Record and shared it across our engineering org as a learning. The transparency with leadership built significant trust.',
    },
    tiers: {
      weak: "I chose a technology that turned out to be the wrong fit and we had to migrate off it later. It cost us some time. I learned to research options more carefully before committing to one.",
      borderline: "I pushed the team onto a new message queue because it looked better on paper, and six months in the operational burden was clearly worse than what we had left behind. I owned the call in a team retrospective rather than letting it sit, and we planned a migration back over two sprints. The team recovered the time within the quarter and I stopped making platform calls without a real pilot.",
      strong: "I picked the message queue, I was wrong, and the more useful part is why I was wrong: I evaluated it on throughput, which was never our constraint, and skipped operability, which was. The cost was about six engineer-weeks and two on-call incidents. I said that plainly in the retrospective, in front of the engineers who had raised concerns I had overruled, and I named them as having been right. Then we wrote a short platform-decision checklist that forces an operability and on-call answer before any adoption, and I ran the first migration shift myself so the cleanup was not purely someone else's problem. Two later proposals died at that checklist, which is the actual return on the mistake.",
      whatMoved: "Weak states a lesson in the abstract, borderline owns it and fixes it, strong names the specific reasoning error, quantifies the cost, credits the people who were right, and shows the guardrail catching later cases.",
    },
    insights: [
      'Owning a mistake clearly and without hedging is the fastest way to build trust',
      'An ADR (Architecture Decision Record) for reversals is more valuable than one for successes',
      'A wrong decision well-documented teaches more than a right decision undocumented',
      'Give the team credit for the recovery: the mistake was yours, the solution was theirs',
    ],
    followUps: [
      'What signals did you ignore that you should have caught earlier?',
      'How did this change how you make technical decisions?',
      'How did your team respond to you owning it so clearly?',
    ],
    redFlags: [
      "Choosing a mistake that was 'not really my fault' or blaming others",
      'Not quantifying the impact of the mistake',
      'Describing what you learned but not showing the behavior change',
    ],
  },
  {
    id: 'scaling-team-velocity-beyond-a-plateau',
    title: 'Scaling Team Velocity Beyond a Plateau',
    question: 'Tell me about a time you improved team performance or productivity significantly.',
    categories: ['Team Development', 'Process Improvement'],
    companies: ['Meta', 'Amazon', 'Google'],
    difficulty: 'Intermediate',
    star: {
      situation: 'My team of 8 engineers had delivered around 42 story points per sprint for 4 consecutive quarters. Despite adding 2 engineers in Q2, velocity actually dropped to 38. Engineers were working harder but shipping less.',
      task: 'I needed to diagnose the root cause of the plateau and drive a meaningful improvement in velocity without burning out the team.',
      action: "I started by looking at where time was actually going. I built a simple time-tracking survey and flow map across 2 sprints. The data revealed: 35% of engineering time was in meetings or context-switching, test failures were blocking 2+ days per sprint cycle, and unclear acceptance criteria caused 30% of stories to be reopened. I made three changes: (1) moved to async-first standups and cut recurring meetings by 40%, protecting 2-hour focus blocks each morning, (2) invested 1 sprint in test automation, raising coverage from 45% to 78%, which cut flaky test interruptions by 70%, (3) introduced a 'Definition of Ready' checklist: no story entered the sprint without clear acceptance criteria and designs attached.",
      result: "Velocity reached 58 story points by quarter's end, a 38% increase from our plateau. Bug rate dropped 45%. Engineers reported higher job satisfaction in our quarterly survey. We shipped our largest feature of the year in that quarter. I now run a quarterly 'time audit' to catch invisible drains early.",
    },
    tiers: {
      weak: "The team's output had flattened, so we tried a few process changes and things got better. We tightened up standups and started estimating more carefully. Velocity went up over the next couple of quarters.",
      borderline: "Our throughput had been flat for two quarters even though the team had grown. I looked at our cycle-time data and found most of the delay sat in code review and in a manual deploy step. We put a review rotation in place and automated the deploy, which cut cycle time from nine days to five. The team shipped noticeably more without working longer.",
      strong: "Velocity being flat while headcount grew told me the constraint was flow, not effort, so I measured before I changed anything. Cycle-time data showed work sat eleven days in review and blocked-on-deploy for every two days of actual coding. We attacked only those two: a review rotation with a same-day expectation, and an automated deploy path. Cycle time went from nineteen days to six over a quarter, and I deliberately left standups and estimation alone so we could attribute the change. The part I would tell another manager is that I nearly ran a planning overhaul first, which would have added ceremony to a queueing problem.",
      whatMoved: "Weak credits vague process changes, borderline measures and fixes two bottlenecks, strong isolates flow from effort, changes only the constraint so the result is attributable, and names the wrong fix it avoided.",
    },
    insights: [
      'Diagnose before prescribing: more engineers rarely solve a velocity problem',
      'Meeting time and context-switching are the hidden killers of engineering productivity',
      'A one-sprint investment in tooling can pay back 10 sprints of velocity',
      'Velocity metrics are a lagging indicator: look at flow metrics (cycle time, blocked time)',
    ],
    followUps: [
      'How did you sustain this improvement over time?',
      'What happened to team morale during the diagnosis phase?',
      'How did you handle engineers who resisted the async-first approach?',
    ],
    redFlags: [
      'Claiming improvements without specific metrics before and after',
      'Describing only top-down changes without mention of team input',
      'Not addressing the sustainability of the improvements',
    ],
  },
  {
    id: 'influencing-without-authority',
    title: 'Influencing Without Authority',
    question: 'Tell me about a time you had to influence a team or outcome without having direct authority.',
    categories: ['Influence', 'Cross-team Collaboration', 'Leadership'],
    companies: ['Google', 'Meta', 'Microsoft'],
    difficulty: 'Intermediate',
    star: {
      situation: "Our product had a critical dependency on a shared platform team for a new logging API. The platform team had deprioritized it for Q3, choosing to focus on a different customer's request. Without this API, our team would miss a compliance deadline with regulatory consequences.",
      task: "I needed to get the platform team to reprioritize our request without going over their manager's head or damaging the relationship.",
      action: "I started by deeply understanding the platform team's situation. I spent an hour with their tech lead learning what they were optimizing for in Q3. I learned their primary concern was team capacity. Rather than making a demand, I proposed a partnership: my team would contribute one engineer for 3 weeks to help deliver the logging API alongside them. I also reframed the request: instead of 'we need this,' I came with a business case showing the regulatory exposure for our company and, by extension, for the platform team if they were associated with the miss. I also offered to co-own the post-launch operations for 6 months, reducing their long-term support burden. I brought this proposal to their manager as a joint recommendation from both tech leads.",
      result: "The platform team agreed to move the API to Q3 with my engineer embedded. We shipped it 2 weeks before the compliance deadline. The embedded engineer relationship resulted in a formal platform team rotation program we still run today. The platform manager later told me it was the cleanest cross-team negotiation she'd seen.",
    },
    tiers: {
      weak: "I needed another team to prioritize work for us, so I talked to their manager and explained why it mattered. Eventually they picked it up and we got what we needed. It took persistence.",
      borderline: "Our roadmap depended on an API change owned by a platform team with no reason to prioritize us. I wrote a short brief on what the change unblocked and met their lead to ask what it would cost them. Once I understood their quarter, we found a version of the change that fit inside work they were already doing. They shipped it six weeks later and we hit our date.",
      strong: "I had no authority over the platform team, so I stopped selling my need and went looking for theirs. Their lead's problem was that four teams were building private workarounds on his surface, which he would eventually inherit. I reframed my request as the deprecation path for those workarounds and brought two of the other teams with me, which turned one request into a documented demand signal. He put it in his quarter, we shipped, and the workarounds came out of three codebases. Borrowed authority is just someone else's incentive found and named, and I have used that framing on every cross-team ask since.",
      whatMoved: "Weak persists, borderline learns the other team's constraints, strong reframes its own ask as a solution to the other team's problem and brings coalition evidence.",
    },
    insights: [
      'Understand what the other team is optimizing for before you make a request',
      'Offer to carry part of the burden: it shows partnership, not entitlement',
      'Frame requests in shared risk, not individual need',
      'Bring the joint recommendation: never put a peer in a position of choosing between you and their manager',
    ],
    followUps: [
      "What would you have done if they'd still said no?",
      "How did you manage your team's expectations during the negotiation?",
      "What's the difference between influence and manipulation?",
    ],
    redFlags: [
      'Escalating to senior leadership as the first move',
      'Framing the other team as the problem or as uncooperative',
      'Not demonstrating reciprocity in the solution',
    ],
  },
  {
    id: 'production-incident-you-caused',
    title: 'Production Incident You Caused',
    question: 'Tell me about a time your team caused a significant production incident. How did you handle it?',
    categories: ['Accountability', 'Technical Leadership', 'Communication'],
    companies: ['Amazon', 'Netflix', 'Google'],
    difficulty: 'Advanced',
    star: {
      situation: "My team deployed a database migration on a Friday evening that introduced a subtle index corruption in our orders table. The bug was masked by our staging environment's smaller dataset. At 9pm, order confirmation rates dropped to 0% for 47 minutes before we caught it. We affected approximately 12,000 customers and roughly $340K in GMV.",
      task: 'I needed to manage the incident in real time, own the outcome with leadership and affected customers, and ensure we learned from it systematically.',
      action: "I jumped on the incident call immediately, declared myself incident commander, and ran a structured response: we rolled back the migration in 8 minutes once identified. I personally called the VP of Product at 9:15pm rather than sending a Slack message. I sent a customer communication within 30 minutes with a clear, honest description of what happened. For the post-mortem: I ran it as a blameless RCA with 8 participants across eng, product, and ops. We identified 4 contributing factors, not one root cause, including insufficient staging parity, a missed migration review step, and a monitoring gap. I committed to specific fixes: (1) automated database migration validation in CI, (2) production-mirrored staging environment (6-week project), (3) explicit migration approval gate in our deployment runbook. I presented the full findings, including my own failure to require a migration review, to our engineering leadership.",
      result: "The 4 fixes were shipped within 8 weeks. We have not had a database-related incident in 18 months since. The blameless post-mortem process I established was adopted by 3 other teams. Customers who contacted support were given account credits and we recovered NPS within 2 weeks. Leadership's feedback was that my handling of the incident actually increased confidence in my team.",
    },
    tiers: {
      weak: "My team shipped a change that took down a service for a few hours. We rolled it back and got things working again, then did a post-mortem. I made sure nobody was blamed for it.",
      borderline: "A migration my team shipped corrupted a subset of order records and we were degraded for about four hours. I took incident command, we rolled back and ran a backfill to repair the affected rows, and I sent an hourly update to stakeholders while it ran. The post-mortem produced three action items and we closed all of them inside a month.",
      strong: "It was my change approval, so I said that in the first stakeholder update rather than after the timeline was reconstructed. I split the response deliberately: one engineer on customer impact, one on root cause, and me on communication, because in our previous incident everybody debugged and nobody talked to anyone. We were degraded ninety minutes, repaired 4,100 affected records, and I published the post-mortem to the whole engineering org with my name on the approval. The two structural fixes were a staged migration path and a pre-flight check that the change would have failed, and I reported the follow-up completion rate at the next review because unclosed action items are how you get the same outage twice.",
      whatMoved: "Weak rolls back and avoids blame, borderline runs the incident well, strong owns the specific approval, assigns roles so communication happens, and treats post-mortem follow-through as measurable.",
    },
    insights: [
      'Call, do not Slack, for major incidents: synchronous communication shows urgency and respect',
      'Blameless post-mortems produce better systemic fixes than blame-based ones',
      'Committing to public fixes with deadlines is how you rebuild trust after incidents',
      'Include your own failure modes in the RCA: it models the culture you want',
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
    id: 'technical-debt-vs-new-features',
    title: 'Technical Debt vs. New Features',
    question: 'Tell me about a time you had to balance technical debt against new feature development.',
    categories: ['Technical Leadership', 'Prioritization'],
    companies: ['Amazon', 'Google', 'Meta'],
    difficulty: 'Intermediate',
    star: {
      situation: 'Our checkout service had accumulated 3 years of technical debt: monolithic architecture, no observability, test coverage at 22%, and deployment taking 4+ hours. Product had a roadmap of 12 features planned for the year. Engineers were reporting burnout from constant firefighting. We were spending an estimated 40% of engineering time on reactive maintenance.',
      task: 'I needed to convince product and leadership to invest in reducing technical debt without losing competitive momentum on the roadmap.',
      action: "I built a 'technical debt ledger,' a document that quantified each debt item in engineering hours per quarter: the checkout service's fragility was costing us 8 eng-weeks per quarter in incidents and debugging. I then framed the trade-off in business terms: 'We are effectively paying 40% of our engineering budget on interest, not principal. Here is what principal paydown looks like.' I proposed a 20-10-70 model for the next 6 months: 20% of capacity to tech debt, 10% to developer experience, 70% to product features, vs. our current unplanned 40% reactive maintenance. I showed that if we invested in the debt now, we would accelerate feature velocity by an estimated 60% in Q3 and Q4. I got buy-in by co-presenting this with Product to ensure they saw it as a shared investment, not an engineering vanity project.",
      result: 'Leadership approved a 6-month tech debt sprint. We broke the monolith into 3 bounded services, raised test coverage to 74%, and reduced deployment time to 22 minutes. In Q4, our feature velocity was 2.1x Q2. We shipped 9 of the 12 planned features, 3 more than product thought possible at the start of the year. The checkout service has had zero P1 incidents in 14 months.',
    },
    tiers: {
      weak: "We had a lot of technical debt and product wanted new features. I negotiated for some time to work on the debt, roughly twenty percent of each sprint. It helped, though there was always tension about it.",
      borderline: "Our incident rate was climbing while product pushed for three new features a quarter. I made the case for a fixed allocation of engineering time to reliability work and got agreement on twenty percent. Over two quarters the incident rate dropped by about half and feature delivery stayed roughly flat. The allocation held because the incident numbers kept justifying it.",
      strong: "I stopped arguing for debt work in the abstract and priced it instead: thirty-one percent of the previous quarter's engineering hours had gone to unplanned work caused by two specific components. That reframed the conversation from hygiene versus features to which features the debt was already cancelling. We took a targeted six-week effort on those two components rather than a blanket allocation, and unplanned work fell to eleven percent, which paid for itself in roughly one quarter. I did not ask for a permanent tax, because it would have been spent on whatever was most annoying rather than most expensive. The measurement is now part of quarterly planning, so the case is remade with fresh numbers instead of relitigated.",
      whatMoved: "Weak wins a time allocation, borderline justifies it with incident data, strong prices the debt in delivery capacity, scopes to the two worst offenders, and declines a permanent tax it cannot defend.",
    },
    insights: [
      'Translate technical debt into business language: it is a tax on every future feature',
      'The 20-10-70 model gives product a predictable commitment while funding debt reduction',
      'Co-present with Product: it must be a business decision, not an engineering one',
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
    id: 'building-a-team-from-scratch',
    title: 'Building a Team From Scratch',
    question: 'Tell me about a time you built or significantly grew an engineering team.',
    categories: ['Team Development', 'Hiring', 'Leadership'],
    companies: ['Meta', 'Amazon', 'Microsoft'],
    difficulty: 'Advanced',
    star: {
      situation: 'I was handed a greenfield product initiative with a mandate to build the team: 0 engineers, a 6-month runway to launch, and a competitive talent market in 2022 where senior engineers were receiving 3-5 competing offers simultaneously.',
      task: 'I needed to hire 8 engineers in 4 months, build a functioning team culture from scratch, and deliver a working product, all in parallel.',
      action: "I started with defining the team's engineering identity before hiring: what problems would we uniquely solve, what would our culture be, what was the engineering craft bar. I wrote a team charter that became our recruiting page. I redesigned our interview process: 60% technical, 40% culture-add focused (not culture-fit). I personally sourced 40% of candidates through warm outreach on GitHub and at two conferences, rather than waiting for inbound. To close candidates in a hot market, I offered architecture ownership: senior candidates got to help design the systems they'd build. I ran a 'team fit' call where candidates met 2-3 future teammates before accepting. For the first 3 months with the new team, I ran weekly team retrospectives and monthly 'operating principles' sessions where we explicitly discussed how we'd work together.",
      result: "I hired 8 engineers in 14 weeks, with an offer acceptance rate of 87% (vs. 62% company average). All 8 are still on the team 18 months later (vs. 30% attrition industry benchmark). We shipped the MVP 2 weeks early. Our team NPS score in the last quarterly survey was 78 (company average: 52).",
    },
    tiers: {
      weak: "I was asked to build a new team and hired six engineers over about nine months. We defined the interview process as we went and the team came together well. Hiring took longer than I expected.",
      borderline: "I had nine months to build a team of seven for a new product area. I wrote the role scorecards first so interviewers were grading the same things, and I hired two seniors before anyone junior so there was someone to learn from. We filled all seven and shipped the first release on schedule. Attrition in the first year was one person, who moved internally.",
      strong: "I sequenced the hires instead of opening all seven roles at once: two seniors who could define the architecture, then mid-level engineers into a structure that already existed, because a team of juniors with no shape is a year of rework. Every loop used a written scorecard with a named attribute per interviewer, which is what let me say no to three candidates the loop liked but who had no evidence on the attribute we were short on. We filled seven roles in eight months, shipped the first release on time, and lost nobody in the first eighteen months. The mistake I would fix is that I under-invested in onboarding documentation for hires five through seven, and they took visibly longer to get productive than the first four.",
      whatMoved: "Weak reports headcount filled, borderline adds scorecards and sensible sequencing, strong explains why the sequence matters, shows the bar being held against pressure, and names a real cost of its own choices.",
    },
    insights: [
      'Define team identity before you hire: candidates buy the mission, not just the job',
      'Architecture ownership closes senior engineers better than compensation alone',
      'Peer interviews create team investment before day 1',
      'Explicit operating principles reduce conflict later: write them early',
    ],
    followUps: [
      'How did you handle a bad hire early in the process?',
      'What would you do differently if building the team over again?',
      'How do you maintain culture as the team scales?',
    ],
    redFlags: [
      'Focusing only on technical bar without mentioning culture and team fit',
      'Not discussing the retention and long-term outcomes',
      'Describing a process that only HR ran: show your personal involvement in every hire',
    ],
  },
  {
    id: 'navigating-organizational-restructuring',
    title: 'Navigating Organizational Restructuring',
    question: 'Tell me about a time you had to lead your team through significant organizational change.',
    categories: ['Leadership', 'Communication', 'Change Management'],
    companies: ['Microsoft', 'Amazon', 'Google'],
    difficulty: 'Advanced',
    star: {
      situation: 'Our company underwent a major reorg: my team of 10 was split, 6 engineers moved to a new platform org, 4 stayed with me on a new product team. The announcement came on a Monday with a 2-week transition window. Several engineers were blindsided; two had offers from competing companies within a week.',
      task: 'I needed to stabilize the remaining team, support the engineers transitioning out, and maintain delivery momentum during a period of high uncertainty, all without full visibility into the final org structure.',
      action: "Within 2 hours of the announcement, I held a team meeting, not to explain the company's decision (I had limited context), but to acknowledge what we were feeling and to answer every question I could honestly. For questions I could not answer, I said so explicitly and committed to a follow-up date. I then ran separate 1:1s with each engineer within 48 hours. For the 4 engineers transitioning, I spent time understanding their concerns about the new team and advocated directly for their titles and projects to transfer properly. For the 2 engineers considering leaving, I was honest: 'I understand why you're looking. Here's what I can commit to you, and here's what I cannot.' Both stayed. For the remaining team, I ran a team charter session to redefine our identity as the new, smaller product team.",
      result: 'Both engineers who had been considering leaving stayed, one told me the honest conversation was the deciding factor. All 6 transitioning engineers had smooth handoffs with no delivery disruption. Our team shipped our Q3 commitments at 95% despite the 6-week disruption. I was asked to run the change management playbook for two other teams going through similar restructuring.',
    },
    tiers: {
      weak: "A reorg moved half my team to another group. I told everyone as soon as I was allowed to and answered their questions. Some people were unsettled but most of them stayed and things settled down after a couple of months.",
      borderline: "A reorg split my team of fourteen across two orgs with six weeks' notice. I ran a team meeting the day the news was shareable, then a one-to-one with every person that same week to talk about their specific situation. I wrote down which commitments were changing and which were not so people were not guessing. We lost one engineer and delivery slipped by about two weeks.",
      strong: "In a reorg, uncertainty does more damage than bad news, so I optimised for how fast people got a specific answer about themselves. I did all fourteen one-to-ones within three days, in an order that put the most affected people first, and for each I could say what changed, what did not, and what I did not yet know. I also gave the receiving manager a written summary of each person's growth plan so nobody restarted from zero. Regretted attrition was one person in six months against a two-in-ten rate elsewhere in the org, and delivery slipped two weeks. The thing I underestimated was my own bandwidth: I ran no design reviews for a month, and I should have handed those to a tech lead explicitly instead of quietly dropping them.",
      whatMoved: "Weak communicates and waits, borderline runs structured one-to-ones, strong sequences by impact, distinguishes known from unknown, hands continuity to the receiving manager, and compares its attrition to a baseline.",
    },
    insights: [
      'Acknowledge the emotional reality before the operational one: people cannot hear logistics when they are anxious',
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
    id: 'ai-and-machine-learning-decision',
    title: 'AI and Machine Learning Decision',
    question: "Tell me about a time you had to make a significant decision about incorporating AI or ML into your product or team's work.",
    categories: ['Technical Leadership', 'AI/ML', 'Innovation'],
    companies: ['Google', 'Meta', 'Microsoft', 'Amazon'],
    difficulty: 'Advanced',
    star: {
      situation: 'In 2023, our team was building a customer support ticket routing system. Product wanted us to integrate a large language model to auto-triage and classify tickets. Our options were: build a fine-tuned model ourselves, use a third-party LLM API (OpenAI/Claude), or use a traditional ML classifier we\'d already built.',
      task: 'I needed to make a build vs. buy vs. existing decision for a production ML system handling ~50K tickets per day, with accuracy, cost, privacy, and latency requirements all in tension.',
      action: "I ran a structured 2-week evaluation: (1) defined success metrics upfront: accuracy above 94%, latency under 2s, cost under $0.01/ticket, no PII leaving our systems, (2) benchmarked our existing classifier: 89% accuracy, $0.0002/ticket, 50ms latency, (3) tested a fine-tuned GPT-3.5 model on 5,000 historical tickets: 96% accuracy, $0.008/ticket, 800ms latency, but required sending data to OpenAI, violating our privacy requirement, (4) evaluated an on-premise open-source LLM (Llama 2 fine-tuned): 95% accuracy, $0.003/ticket infrastructure cost, 1.2s latency, data stays on-prem. My recommendation was a hybrid: use the existing classifier for 85% of tickets (high confidence, fast), escalate only low-confidence tickets to the fine-tuned Llama model. This cut LLM costs by 6x.",
      result: "The hybrid system went to production in 8 weeks. End-to-end accuracy: 97% (2% above target). Cost: $0.0009/ticket (10x cheaper than pure LLM). The approach is now our company's standard for ML-in-the-loop systems. I presented the evaluation framework at our internal engineering summit and it has been used by 4 other teams for similar decisions.",
    },
    tiers: {
      weak: "Product wanted us to add an LLM to our ticket routing. We tested a couple of options and went with the one that performed best. It worked well and accuracy improved over the old classifier.",
      borderline: "We were asked to add an LLM to ticket triage. I set accuracy, latency, cost, and privacy targets before testing anything, then benchmarked our existing classifier against a hosted model and an on-premise one. The hosted model was the most accurate but sent data off our systems, so we went with a hybrid: existing classifier for high-confidence tickets, on-premise model for the rest. Accuracy landed at ninety-seven percent and cost stayed near the old system.",
      strong: "I wrote the success bar before looking at any model, because the request arrived as a technology choice rather than a problem. Four numbers: accuracy above ninety-four percent, latency under two seconds, cost under a cent per ticket, no personal data leaving our systems. The most accurate option failed the privacy line, which ended it regardless of the benchmark, and that is the tradeoff people skip. We shipped a hybrid in eight weeks at ninety-seven percent accuracy and $0.0009 a ticket, and I reused the evaluation framework often enough that four other teams adopted it. The part I would flag is that I did not plan for drift monitoring until month three, which was late.",
      whatMoved: "Weak picks the best performer, borderline sets criteria and reaches a hybrid, strong lets a non-negotiable constraint kill the strongest option, quantifies the outcome, generalises the framework, and admits a gap.",
    },
    insights: [
      "Define success metrics before evaluating options: don't fall in love with the technology",
      'Privacy and compliance requirements often rule out the most capable option',
      'Hybrid approaches frequently outperform pure solutions on cost and latency',
      'Build an evaluation framework you can reuse: AI decisions will keep coming',
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
  {
    id: "letting-someone-go",
    title: "Letting Someone Go",
    question: "Tell me about a time you had to let someone go.",
    categories: ["Hard People Decisions", "Team Development", "Accountability"],
    companies: ["Amazon", "Netflix", "Meta"],
    difficulty: "Advanced",
    star: {
      situation: "An engineer on my team of eleven had been at the company three years and one level below where her title said she was. Her code needed rework often enough that two seniors had quietly started reviewing everything she shipped, and one of them told me he was spending about six hours a week on it. Her last two written reviews said 'meets expectations' with no specifics, which told me the previous manager had never had the conversation. She had no idea anything was wrong. Nothing in her record was a fireable event; the problem was a sustained gap between her level and her output that nobody had named for three years.",
      task: "I had two obligations that pulled in opposite directions. She was owed the truth and a real chance to close the gap, which she had never been given, and the team was owed a peer who carried her share instead of two seniors absorbing it invisibly. My job was to run a process where either outcome was fair: if she could reach the bar, the structure would show it, and if she could not, the record would be honest enough that the decision held up to her, to the team, and to HR.",
      action: "I started with the gap, not the verdict. I showed her three specific examples from the last quarter, said plainly that this was below the standard for her level, and asked for her read. She was blindsided, and I said so out loud: three years without this conversation was a management failure, not hers. We wrote a sixty-day plan with six measurable outcomes, one every ten days, and I wrote up every checkpoint the same day we had it and sent it to her so there was never a version of events she had not seen. I pulled the two seniors off shadow-reviewing so the results were actually hers. She cleared two of the six. At day sixty I made the decision, took it to HR, and delivered it myself in a meeting under ten minutes. I did not relitigate it in the room. I spent the remaining time on severance, the reference I was willing to give, and letting her choose her last day and what the team was told.",
      result: "She left with eight weeks of severance and a reference I wrote honestly about her strengths, and she landed a role at a smaller company six weeks later that fit her better; we still exchange messages. I told the team within the hour with the fact and the plan for her work and nothing else, and no version of the story circulated because there was no gap for one. The two seniors got roughly six hours a week back. The harder result is about me: I had enough evidence by week three and I took until week nine to open the conversation, and that delay cost her time more than it cost us. I now treat 'meets expectations with no specifics' in an inherited review as a signal to verify, not a baseline to trust.",
    },
    tiers: {
      weak: "I had an engineer who was not working out, so after a few conversations we let him go. HR handled the process. It was hard but it was the right thing for the team and the team was relieved afterwards.",
      borderline: "After two quarters of feedback and a documented improvement plan, one of my engineers was still well below the bar for her level. I made the decision to end the employment, worked with HR on the process, and delivered the news myself in a short meeting with the reasoning she had already heard from me twice. I told the team the same day, without details, and reassigned her work within the week. Nobody on the team was surprised.",
      strong: "By the time I made the decision she had heard every element of it from me before, which is the standard I hold myself to: if the exit conversation contains new information, the manager failed earlier. We had run a sixty-day plan with written weekly checkpoints, and she cleared two of six objectives. I delivered the news myself in under ten minutes, did not negotiate the decision in the room, and spent the rest of the meeting on what she controlled: severance, references, and the timeline she wanted. I told the team within the hour with no detail beyond the fact and the plan for her work, because silence would have produced a worse story. She landed a better-fitting role six weeks later and we stayed in touch. The harder lesson is that I waited a quarter longer than I should have, and that quarter cost her time, not just ours.",
      whatMoved: "Weak delegates the process and frames relief, borderline runs a documented plan and communicates cleanly, strong holds the no-surprises standard, separates the decision from the support, protects the team's information, and owns having moved too slowly.",
    },
    insights: [
      "If the exit conversation contains new information, the failure happened months earlier",
      "Remove the informal support during a performance plan, or the results are not the person’s own",
      "Deliver the decision yourself, do not reopen it in the room, and spend the time on what the person still controls",
      "Tell the team the fact and the work plan the same day: silence produces a worse story than brevity",
    ],
    followUps: [
      "How did you decide sixty days was the right length for the plan?",
      "What would you have done if she had cleared five of the six outcomes?",
      "How did you handle the team members who thought the decision was unfair?",
    ],
    redFlags: [
      "Framing the team’s relief as the main outcome, which reads as relishing the decision",
      "No documentation trail, which makes the decision indefensible and the process unfair",
      "Handing the conversation to HR or a skip-level instead of delivering it yourself",
    ],
  },
  {
    id: "wrong-about-a-hire",
    title: "A Hire You Got Wrong",
    question: "Tell me about a hire you got wrong.",
    categories: ["Hard People Decisions", "Hiring", "Accountability"],
    companies: ["Amazon", "Google", "Microsoft"],
    difficulty: "Advanced",
    star: {
      situation: "I was hiring a senior engineer for a team whose actual work for the next eighteen months was untangling a billing system written by contractors who had left. The loop we ran was our standard senior loop: two coding rounds, a system design round, and a behavioural round. One candidate was outstanding in system design, articulate about tradeoffs, and visibly the strongest greenfield thinker we had seen that quarter. Two of the four interviewers flagged concerns in the debrief, both roughly the same shape: he talked past questions about working inside constraints he had not chosen.",
      task: "As hiring manager I had the call on a split loop. What I owed the process was a decision grounded in evidence about the job we actually had, which was archaeology in a codebase nobody wanted to touch, not designing a new service. What I did instead was resolve a disagreement in the room in favour of the signal I liked most.",
      action: "I argued the dissenters out of their position. I said the concerns were style rather than substance and that a strong designer would pick up a legacy codebase quickly, and because I was the hiring manager, that ended the discussion rather than tested it. He started, and within two months the pattern the dissenters had described showed up exactly as they had described it: he rewrote rather than read, and his first two projects stalled because the rewrites could not ship inside the existing contracts. I tried scope changes and pairing for another three months before I accepted the shape of it. Then I separated two things I had been treating as one: whether he was capable, which he clearly was, and whether this role fit him, which it did not. I went to a peer manager whose team was building a new service, was honest about both his strengths and the mismatch, and moved him rather than managing him out of a problem I had created.",
      result: "He has been on that team for two years and was promoted once; the work he does there is the work he was strong at in the loop. The cost of my error was about five months of a senior engineer's time and a project that slipped a quarter. Two changes came out of it. We added a legacy-code exercise to that team's loop, where the candidate reads an unfamiliar module and proposes a minimal change, and we made dissent in a debrief get written down verbatim instead of resolved live by the hiring manager. Two later loops surfaced the same gap and we passed on both. The part I still watch in myself is that my enthusiasm after a strong design round is a bias, not a signal.",
    },
    tiers: {
      weak: "I hired someone who interviewed well but did not perform on the job. He left after about eight months. Interviewing is imperfect and sometimes you get it wrong.",
      borderline: "I hired a senior engineer who was strong in the loop and struggled once he started. He interviewed well on system design but the role was mostly debugging a legacy codebase, which we never tested for. I gave him support and a clearer scope, and after four months he moved to a team that matched his strengths. We added a code-reading exercise to the loop for that role.",
      strong: "The hire was my call over a split loop, and the failure was in the signal I accepted, not in his ability. He was excellent at greenfield design, and the job was eighteen months of untangling a legacy billing system, which our loop never tested. I also overweighted my own enthusiasm after the debrief and talked two dissenting interviewers out of their concerns, which is the part I am least comfortable with. We spent about five months finding that out. I moved him to a team where his strengths fit rather than managing him out of a mismatch I created, and he is still there and doing well. Then I added a legacy-code exercise to the loop and a rule that a dissent in a debrief gets written down verbatim rather than resolved by the hiring manager. Two later loops surfaced the same gap and we passed.",
      whatMoved: "Weak calls interviewing imperfect, borderline finds the missing signal and patches the loop, strong owns having overruled dissent, distinguishes mismatch from incapacity, redeploys rather than exits, and shows the new guardrail working.",
    },
    insights: [
      "Interview for the work the role actually contains, not the work the title implies",
      "A hiring manager arguing dissenters down converts a split loop into a rubber stamp",
      "Separate capability from fit: a mismatch you created is yours to redeploy, not to manage out",
      "A loop fix only counts if you can point to a later candidate it caught",
    ],
    followUps: [
      "What would you have done if no other team had a fit for him?",
      "How do you keep your own enthusiasm from overriding the loop now?",
      "How did you talk to him about the move without making it feel like a demotion?",
    ],
    redFlags: [
      "Blaming the candidate or calling interviewing unavoidably random",
      "No mention of the interviewers who were right, or of overruling them",
      "A lesson with no mechanism: \"I am more careful now\" is not a change to the loop",
    ],
  },
  {
    id: "report-who-wanted-your-job",
    title: "Managing Someone Who Wanted Your Job",
    question: "Tell me about managing someone who wanted your job.",
    categories: ["Hard People Decisions", "Team Development", "Leadership"],
    companies: ["Amazon", "Netflix", "Google", "Microsoft"],
    difficulty: "Advanced",
    star: {
      situation: "A tech lead on my team told me in a one-to-one that he wanted to be a manager and that he thought he could do my job. He was our strongest engineer, he ran our design reviews better than I did, and he had been at the company longer than I had. He was also not ready: he read disagreement as obstruction, and twice that quarter he had escalated a peer's decision to me instead of resolving it with them. There was no manager opening in my group and I was not planning to leave.",
      task: "The easy failures were both available to me. I could keep him at arm's length and protect my own position, which would have cost the team our best engineer inside a year. Or I could be vague and encouraging, let him wait on a vacancy that was not coming, and burn his trust when he worked out that nothing was moving. What I needed was to make the path real and the constraint honest at the same time.",
      action: "I told him directly that I was not planning to leave, and that if he was waiting for my seat that was the wrong plan, but that I would spend real capital making him promotable elsewhere. Then we wrote down the four things the role needed that he had not demonstrated: running a performance conversation, holding a hiring bar under pressure, handling a peer conflict without escalating, and owning a commitment he could not personally deliver. I gave him two of them for real rather than as shadowing. He ran our hiring loop for a quarter, including the debrief where he had to say no to a candidate I liked, and he took over a cross-team commitment where he had to negotiate rather than build. I sat in on one performance conversation with him leading and me silent, then debriefed it privately. When a manager opening came up in the adjacent org I put my name behind him and briefed the hiring manager on his gaps as honestly as his strengths.",
      result: "He got the role and has run that team for over a year. His replacement as tech lead was someone he had been developing, which is not a coincidence. Two of my current engineers have told me they believe growth here is real because they watched what happened to him, and my regretted attrition across two years is one person. What I had to manage was my own defensiveness: for about a month after that first conversation I reviewed his work more closely than it needed, and a peer manager pointed it out to me before I noticed it myself. Ambition in a report is a retention asset you either use or lose, but treating it that way requires you to be honest about your own tenure first.",
    },
    tiers: {
      weak: "One of my senior engineers wanted to be a manager and was clearly after my role. I kept things professional and gave him opportunities to lead where I could. He was patient and eventually got a manager role elsewhere in the company.",
      borderline: "A tech lead on my team told me directly that he wanted my job. I treated it as a career conversation rather than a threat: we mapped what the role actually required, and I gave him two pieces of real management work, running our hiring loop and owning a cross-team project. He hit both, and when a manager opening came up in the adjacent org I recommended him for it. He got the role and we still work together.",
      strong: "He told me he wanted my job, and the useful reframe was that his ambition was a retention asset I was either going to use or lose. So I made the path explicit rather than implicit: we wrote down the four things the role needed that he had not yet demonstrated, and I handed him two of them for real, including running a performance conversation with me in the room rather than in front of it. I also said plainly that I was not planning to leave, because letting him wait on a vacancy would have been dishonest. When a manager opening appeared in the adjacent org I put my name behind him and briefed the hiring manager on his gaps as well as his strengths. He got it, and two of my current engineers cite that as the reason they believe growth here is real. The thing I had to manage was my own defensiveness in the first month, which showed up as me reviewing his work more closely than it needed.",
      whatMoved: "Weak stays professional and waits, borderline turns it into a development plan, strong names the honest constraint about its own tenure, delegates genuinely hard management work, advocates with the gaps included, and admits its own defensiveness.",
    },
    insights: [
      "Name the constraint honestly: letting someone wait on a vacancy you are not vacating destroys trust",
      "Write down the specific gaps between them and the role, then hand over real instances of that work",
      "Advocating with the gaps included is what makes the recommendation credible to the hiring manager",
      "Watch your own defensiveness: it shows up as closer review, not as hostility",
    ],
    followUps: [
      "What would you have done if he had not been promotable and would not accept that?",
      "How did you handle the rest of the team watching you develop an internal rival?",
      "What would you have done if he had gone around you to your manager?",
    ],
    redFlags: [
      "Framing the report as a threat or a political problem to be contained",
      "Vague encouragement with no named gaps and no real management work handed over",
      "Taking credit for their promotion rather than describing what they demonstrated",
    ],
  },
  {
    id: "inherited-underperformer-no-documentation",
    title: "Inherited Underperformer, No Documentation",
    question: "You inherit an underperformer with no documentation. What do you do?",
    categories: ["Hard People Decisions", "Team Development", "Accountability"],
    companies: ["Amazon", "Meta", "Netflix", "Microsoft"],
    difficulty: "Advanced",
    star: {
      situation: "I took over a team of nine and my new manager told me in the handover that one engineer was 'a known problem' and that I should expect to move him out. There was nothing in writing. His last three reviews all said 'meets expectations', no improvement plan existed, and when I asked the previous manager for specifics I got anecdotes about attitude from more than a year earlier. The team's version, when I asked carefully, was narrower than the reputation: he was slow to finish, not careless, and two people said they avoided giving him work with a deadline.",
      task: "A reputation with no record is a rumour, and acting on it would have been unfair to him and unsafe for the company. My task was to replace inherited opinion with my own first-hand evidence, decide whether the cause was capability or circumstance, and from that point run a documented process where either outcome, clearing the bar or leaving, would be defensible to him, to the team, and to HR.",
      action: "I gave him a clean slate explicitly, told him what I had been told and that I was not acting on it, and spent three weeks gathering evidence myself: his last thirty pull requests, the two incidents he had been on, his own written account of what he owned, and behavioural questions to three collaborators about specific handoffs rather than general impressions. The pattern was real but the cause was not what I had been handed. He owned four unrelated services with no defined priority, so he context-switched all day and finished nothing, and the previous manager had kept adding to it. So I cut his ownership from four services to one, then had one direct conversation: here is the specific gap, here is the standard for your level, here is what I have changed, what is your read. From that day everything was in writing, with one measurable outcome a week and a stated review date eight weeks out. I told my manager and HR the clock had started, so no one was surprised in either direction.",
      result: "He cleared seven of eight weekly outcomes, and within two quarters he was the person the team routed the service's hardest work to. His next review was specific for the first time in three years. Had he not cleared it, the same record was what would have made an exit fair rather than an ambush. The broader outcome is that I stopped trusting inherited 'meets expectations' as a baseline; on that team it turned out to be the default two managers had used to avoid hard conversations, and I audited the other eight records too and found one more person who had never been told they were tracking below level. The failure I refuse to repeat is a third year of nobody telling someone the truth.",
    },
    tiers: {
      weak: "I would look at their recent work, talk to the team about how things are going, and then have a conversation with the person about expectations. If it did not improve I would start a formal process and document it from then on.",
      borderline: "I would not act on an inherited reputation, so first I would gather my own evidence: a month of their pull requests, their last two reviews, and what their closest collaborators actually say about working with them. Then I would have a direct conversation naming the specific gap I could see and asking what they think is in the way. From that point everything gets written down, with clear expectations and weekly checkpoints, so the person and I are working from the same record. If they can close the gap, that structure is how they prove it, and if they cannot, the same record is what makes an exit fair.",
      strong: "No documentation means I have no findings, only a rumour, and the first thing I would protect is the person's right to a clean slate with me. I would spend three weeks gathering first-hand evidence: their recent pull requests and incidents, their own account of what they own, and what two or three collaborators say about working with them, asked as behaviour questions rather than opinion polls. In half the cases I have seen, the real cause is environmental, an unclear scope, a broken handoff, a previous manager who never said anything, so I would look for that before I concluded it was capability. Then one direct conversation: here is the specific gap I see, here is the standard for the level, what is your read. From there, written expectations with one measurable outcome a week and a stated review date, and I would tell my own manager and HR the clock has started so nobody is surprised later. Two outcomes are acceptable: the person clears the bar, or we part ways on a record that is fair to them. What is not acceptable is a third year of nobody telling them the truth.",
      whatMoved: "Weak starts from the inherited verdict, borderline builds its own evidence and documents from day one, strong states the clean-slate principle, tests for environmental causes before capability, sets a review date, aligns HR early, and names the failure of inaction.",
    },
    insights: [
      "Give an explicit clean slate and say so out loud: an inherited verdict is a rumour, not a finding",
      "Test for environmental causes such as unclear scope or a broken handoff before concluding capability",
      "Set a stated review date and align HR early, so the process protects the person as much as the company",
      "An inherited \"meets expectations\" with no specifics is a signal to verify, not a baseline to trust",
    ],
    followUps: [
      "How would you handle it if your own manager pushed you to move faster than the evidence allowed?",
      "What would you have done if the cause had been capability rather than scope?",
      "How do you avoid the team reading your patience as tolerating low performance?",
    ],
    redFlags: [
      "Starting a formal exit process on the previous manager’s reputation alone",
      "Never putting anything in writing, which leaves both the person and the company exposed",
      "No review date, so the plan runs indefinitely and the person never learns where they stand",
    ],
  },
]

export const questionPriorities: Record<string, Priority> = {
  'resolving-senior-engineer-conflict': 'must-know',
  'handling-underperforming-engineer': 'must-know',
  'pushing-back-on-executive-direction': 'must-know',
  'delivering-bad-news-to-stakeholders': 'must-know',
  'making-a-wrong-technical-call': 'must-know',
  'scaling-team-velocity-beyond-a-plateau': 'must-know',
  'influencing-without-authority': 'good-to-know',
  'production-incident-you-caused': 'must-know',
  'technical-debt-vs-new-features': 'must-know',
  'building-a-team-from-scratch': 'good-to-know',
  'navigating-organizational-restructuring': 'good-to-know',
  'ai-and-machine-learning-decision': 'good-to-know',
  "letting-someone-go": "must-know",
  "wrong-about-a-hire": "must-know",
  "report-who-wanted-your-job": "good-to-know",
  "inherited-underperformer-no-documentation": "must-know",
}

export const CATEGORIES = ['All', 'Leadership', 'Conflict Resolution', 'Technical Leadership', 'Team Development', 'Communication', 'Influence', 'Cross-team Collaboration', 'Prioritization', 'Change Management', 'AI/ML', 'Innovation', 'Hiring', 'Accountability', 'Process Improvement', 'Hard People Decisions']
export const DIFFICULTIES = ['All', 'Starter', 'Intermediate', 'Advanced'] as const
export const COMPANY_NAMES = ['All', 'Amazon', 'Meta', 'Google', 'Apple', 'Netflix', 'Microsoft']

/** Every id a reader can mark covered on the behavioral track, in page order. */
export const behavioralItemIds: readonly string[] = questions.map((q) => q.id)

assertTrackIds('behavioral', behavioralItemIds)
