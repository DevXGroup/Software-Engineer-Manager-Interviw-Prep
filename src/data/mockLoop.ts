/**
 * Content for /mock-loop.
 *
 * Round lengths and the order of rounds match the shape of a manager loop as it is
 * commonly reported by candidates and recruiters. No company publishes its loop
 * timetable, so treat the schedule as a realistic rehearsal, not a leak.
 */

export interface ScoreCriterion {
  id: string
  label: string
  anchorLow: string
  anchorHigh: string
}

export interface MockRound {
  id: string
  name: string
  minutes: number
  track: '/behavioral' | '/system-design' | '/coding' | '/team-management'
  trackLabel: string
  goal: string
  prompts: readonly string[]
  strongAnswer: readonly string[]
  criteria: readonly ScoreCriterion[]
}

export interface BreakSlot {
  id: string
  afterRoundId: string
  minutes: number
  use: string
}

export const rounds: readonly MockRound[] = [
  {
    id: 'recruiter-warm-up',
    name: 'Recruiter warm-up',
    minutes: 15,
    track: '/behavioral',
    trackLabel: 'Behavioral track',
    goal: 'Deliver your story of the last five years in under three minutes, then hold a normal conversation about why this company. This round is scored on fluency, not content, and it sets the tone every later interviewer inherits from the recruiter note.',
    prompts: [
      'Walk me through your background.',
      'Why are you looking, and why this company in particular?',
      'What are you looking for in your next role that you do not have now?',
    ],
    strongAnswer: [
      'Three minutes, in order, with the scope growing at each step: team size, what you owned, what changed because you were there.',
      'A reason for leaving that is about what you want next, not about what is wrong with your current employer.',
      'One specific, current thing about this company that connects to your actual work, not a line from the careers page.',
      'A clear statement of the level and the scope you are aiming for, so the recruiter writes the right number in the note.',
    ],
    criteria: [
      {
        id: 'brevity',
        label: 'Brevity',
        anchorLow: 'The background answer ran past five minutes and had to be interrupted.',
        anchorHigh: 'Three minutes, complete, and it ended on a clean stop rather than trailing off.',
      },
      {
        id: 'scope-signal',
        label: 'Scope signal',
        anchorLow: 'No team sizes, no org context. Could have been an engineer or a director.',
        anchorHigh: 'Team count, headcount and planning horizon were all stated without being asked.',
      },
      {
        id: 'reason-for-moving',
        label: 'Reason for moving',
        anchorLow: 'Mostly complaints about the current company or manager.',
        anchorHigh: 'A forward-looking reason that matches what this role actually offers.',
      },
      {
        id: 'specificity-about-company',
        label: 'Specificity about the company',
        anchorLow: 'Generic praise that would fit any of the six.',
        anchorHigh: 'One concrete product, team or technical problem, and why it fits you.',
      },
    ],
  },
  {
    id: 'hiring-manager',
    name: 'Hiring manager',
    minutes: 45,
    track: '/behavioral',
    trackLabel: 'Behavioral track',
    goal: 'Convince the person who will own your output that you can run their area. This is the round most likely to set your level, because the hiring manager usually carries the most weight in the debrief and is the one arguing for or against your scope.',
    prompts: [
      'Tell me about the largest thing you have owned. What did you decide that nobody above you decided for you?',
      'Describe a time you disagreed with your own leadership on a technical or product direction. What happened?',
      'Your team is six months behind on a commitment that a partner org depends on. Walk me through your first two weeks.',
    ],
    strongAnswer: [
      'Scope stated as numbers up front: engineers, teams, systems, and the time horizon you planned against.',
      '"I" for your decisions and "we" for the delivery, so the room can separate your judgment from your team\'s work.',
      'A decision that had a real cost on the other side, and the tradeoff named out loud rather than smoothed over.',
      'The outcome with a number attached, then what you would do differently, offered without being asked.',
    ],
    criteria: [
      {
        id: 'scope-and-altitude',
        label: 'Scope and altitude',
        anchorLow: 'Stories sat at task level: sprints, tickets, individual features.',
        anchorHigh: 'Stories sat at org level: headcount, roadmap ownership, multi-quarter bets.',
      },
      {
        id: 'decision-ownership',
        label: 'Decision ownership',
        anchorLow: 'Every sentence was "we", so no decision could be traced to you.',
        anchorHigh: 'Your decisions were named as yours, including one that turned out wrong.',
      },
      {
        id: 'tradeoff-honesty',
        label: 'Tradeoff honesty',
        anchorLow: 'Every story ended in a clean win with no cost paid.',
        anchorHigh: 'The cost of each choice was stated, along with who absorbed it.',
      },
      {
        id: 'outcome-evidence',
        label: 'Outcome evidence',
        anchorLow: 'Outcomes were adjectives: better, faster, happier.',
        anchorHigh: 'Outcomes were numbers with a baseline, and you knew how they were measured.',
      },
    ],
  },
  {
    id: 'people-management',
    name: 'People management',
    minutes: 45,
    track: '/team-management',
    trackLabel: 'Team management track',
    goal: 'Show that you have actually done the hard parts of the job: a performance case, a departure, a promotion you argued for and lost. This round is where a strong engineer pretending to be a manager usually comes apart, because the specifics cannot be invented on the spot.',
    prompts: [
      'Tell me about the lowest performer you have managed. What did you do, over what timeline, and how did it end?',
      'Describe a promotion case you built. What evidence did you use, and did it succeed?',
      'You inherit a team where two senior engineers do not speak to each other. What do you do in your first month?',
    ],
    strongAnswer: [
      'A real timeline with dates and checkpoints, including the point at which you decided the outcome would not change.',
      'What you wrote down and what you said out loud, because managing performance is mostly documentation and direct conversation.',
      'Evidence of care for the person alongside the decision, without using care as a reason for having waited too long.',
      'What you changed in your own hiring, onboarding or feedback loop afterwards so the same case does not repeat.',
    ],
    criteria: [
      {
        id: 'directness',
        label: 'Directness',
        anchorLow: 'The hard conversation was implied but never quoted or described.',
        anchorHigh: 'You said what you actually told the person, in their words and yours.',
      },
      {
        id: 'timeliness',
        label: 'Timeliness',
        anchorLow: 'The problem ran for a year before anything happened.',
        anchorHigh: 'Feedback started within weeks and the escalation path was deliberate.',
      },
      {
        id: 'fairness-process',
        label: 'Fairness and process',
        anchorLow: 'No written record, no calibration, decision made on impression.',
        anchorHigh: 'Written expectations, checkpoints, and a decision anyone could audit.',
      },
      {
        id: 'learning-loop',
        label: 'Learning loop',
        anchorLow: 'The story ended when the person left.',
        anchorHigh: 'You named what you changed in the system so the case gets caught earlier.',
      },
    ],
  },
  {
    id: 'cross-functional',
    name: 'Cross-functional partner',
    minutes: 45,
    track: '/behavioral',
    trackLabel: 'Behavioral track',
    goal: 'A product manager, a data scientist, or a peer manager from another org asks how you behave when the incentives do not line up. They are checking whether you are someone their team can plan around, and a single dismissive remark about product or design in this round is enough to sink a loop.',
    prompts: [
      'Tell me about a time a partner team missed a commitment that your roadmap depended on.',
      'Describe a disagreement with a product manager about priority. How did it get resolved?',
      'How do you decide what your team says no to, and how do you communicate that no?',
    ],
    strongAnswer: [
      'The partner\'s constraint described fairly, in their terms, before you describe your own position.',
      'A mechanism rather than a personality fix: a shared plan, an interface contract, a written escalation path with a date.',
      'One no that you delivered clearly, with the reason and the alternative you offered.',
      'Evidence that the working relationship survived, ideally that the same partner would work with you again.',
    ],
    criteria: [
      {
        id: 'partner-empathy',
        label: 'Partner empathy',
        anchorLow: 'The other side was described as unreasonable or uninformed.',
        anchorHigh: 'Their constraint was stated so well it sounded reasonable.',
      },
      {
        id: 'mechanism-over-heroics',
        label: 'Mechanism over heroics',
        anchorLow: 'It was resolved because you worked a weekend or pulled rank.',
        anchorHigh: 'It was resolved by a durable change that outlasted the incident.',
      },
      {
        id: 'clarity-of-no',
        label: 'Clarity of no',
        anchorLow: 'Everything was accommodated, so your team had no priority.',
        anchorHigh: 'A clear no with a reason, a date, and an alternative.',
      },
      {
        id: 'relationship-outcome',
        label: 'Relationship outcome',
        anchorLow: 'The story ended with the conflict, not with the repair.',
        anchorHigh: 'The partnership demonstrably improved afterwards.',
      },
    ],
  },
  {
    id: 'system-design',
    name: 'System design',
    minutes: 60,
    track: '/system-design',
    trackLabel: 'System design track',
    goal: 'Show that you can still hold a technical conversation at the depth your senior engineers work at. Managers are not scored on drawing the cleverest system, they are scored on requirement discipline, explicit tradeoffs, and whether they know where the design will break first.',
    prompts: [
      'Design the notification system for a product with 200 million daily users.',
      'Design a service that ingests and queries events from a fleet of 50,000 devices, then tell me what you would cut to ship in one quarter.',
      'Take the design we just drew and tell me what fails first at ten times the load, and how you would know.',
    ],
    strongAnswer: [
      'Ten minutes on requirements and rough numbers before a single box is drawn: users, requests per second, read and write mix, retention, latency target.',
      'One primary design, stated as a choice against a named alternative, with the reason for the choice.',
      'Failure modes and the observability to catch them, including what page you would put on call and what you would alert on.',
      'A staged delivery plan: what ships in quarter one, what is deliberately deferred, and what would make you reverse the decision.',
    ],
    criteria: [
      {
        id: 'requirements-first',
        label: 'Requirements first',
        anchorLow: 'Started drawing boxes in the first two minutes.',
        anchorHigh: 'Scope, scale and latency targets were pinned down and written on the board first.',
      },
      {
        id: 'tradeoff-articulation',
        label: 'Tradeoff articulation',
        anchorLow: 'Named technologies but not the reason for choosing them.',
        anchorHigh: 'Every significant choice came with the alternative and the cost of picking it.',
      },
      {
        id: 'depth-under-probe',
        label: 'Depth under probing',
        anchorLow: 'One follow-up question about internals ended the thread.',
        anchorHigh: 'Held detail three questions deep, and said "I do not know" cleanly where it applied.',
      },
      {
        id: 'delivery-realism',
        label: 'Delivery realism',
        anchorLow: 'The design assumed unlimited engineers and unlimited time.',
        anchorHigh: 'A phased plan tied to real team size and a real quarter.',
      },
    ],
  },
  {
    id: 'coding-or-technical-depth',
    name: 'Coding or technical depth',
    minutes: 45,
    track: '/coding',
    trackLabel: 'Coding track',
    goal: 'Either a medium coding problem or a deep dive on something you built, depending on the company. Both are testing the same thing: whether your engineers would respect your technical judgment after a month of working for you.',
    prompts: [
      'Solve a medium problem out loud, stating your approach and its complexity before you write code.',
      'Pick the hardest technical decision you made personally in the last two years and take me all the way down into it.',
      'Review this code as if one of your engineers wrote it. What do you say to them, and in what order?',
    ],
    strongAnswer: [
      'Approach and complexity stated before typing, then code that compiles in your head as you write it.',
      'Narration that a peer could follow, with the invariant you are relying on said out loud.',
      'Tests named before they are written: the empty case, the boundary, and the one that would actually fail in production.',
      'In the depth version, a decision that was yours, including what you got wrong and what it cost.',
    ],
    criteria: [
      {
        id: 'approach-before-code',
        label: 'Approach before code',
        anchorLow: 'Started typing immediately and refactored three times.',
        anchorHigh: 'Stated the approach and its complexity, then wrote it once.',
      },
      {
        id: 'correctness',
        label: 'Correctness',
        anchorLow: 'The solution failed the first example that was tried.',
        anchorHigh: 'Correct on the examples and on the edge cases you raised yourself.',
      },
      {
        id: 'narration',
        label: 'Narration',
        anchorLow: 'Long silences, and the interviewer had to ask what you were doing.',
        anchorHigh: 'Continuous, useful narration that made your reasoning followable.',
      },
      {
        id: 'engineer-credibility',
        label: 'Engineer credibility',
        anchorLow: 'Deferred every technical detail to "my tech lead handled that".',
        anchorHigh: 'Held real depth on your own past decisions without notes.',
      },
    ],
  },
]

export const breaks: readonly BreakSlot[] = [
  {
    id: 'break-after-recruiter',
    afterRoundId: 'recruiter-warm-up',
    minutes: 10,
    use: 'Write down the level and scope you just claimed. Every later round has to match it.',
  },
  {
    id: 'break-after-hiring-manager',
    afterRoundId: 'hiring-manager',
    minutes: 10,
    use: 'Note which story you used. Reusing it in the next round costs you a data point.',
  },
  {
    id: 'break-after-people-management',
    afterRoundId: 'people-management',
    minutes: 10,
    use: 'Stand up, drink water, and stop rehearsing. Fatigue shows up as rambling, not as silence.',
  },
  {
    id: 'break-after-cross-functional',
    afterRoundId: 'cross-functional',
    minutes: 10,
    use: 'Switch modes deliberately. The next round is technical and your voice needs to change with it.',
  },
  {
    id: 'break-after-system-design',
    afterRoundId: 'system-design',
    minutes: 10,
    use: 'Clear the whiteboard and your head. Nothing from the design round carries into the last one.',
  },
]

export const howToRunIt: readonly string[] = [
  'Book the whole block in one sitting. The point of a full loop is that round five is scored by a tired version of you, and that is the version the real debrief sees.',
  'Use a partner if you have one, and give them this page rather than explaining it. If you do not, record yourself answering into your phone and watch it back at the end of the day, which is unpleasant and by far the most useful part.',
  'Keep a fresh page per round and write the interviewer question down verbatim before you answer it. Half of all weak answers are answers to a slightly different question.',
  'Score yourself immediately after each round, before you know how the rest of the day went. Scoring at the end of the day flattens everything into one mood.',
  'One story per round. If you reuse a story, mark it, because the real loop shares notes and a repeated story reads as a thin career.',
]

export const scoringGuide: readonly string[] = [
  '1 means an interviewer would write this up as a concern.',
  '2 means it was mentioned but nothing landed.',
  '3 means solid, no concern raised.',
  '4 means it is the thing they would argue for you with.',
]

export const mockLoopTotalMinutes = rounds.reduce((sum, round) => sum + round.minutes, 0) +
  breaks.reduce((sum, slot) => sum + slot.minutes, 0)
