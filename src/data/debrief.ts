/**
 * Content for /debrief.
 *
 * The no-hire reason list is fixed on purpose. Real debrief notes cluster into a small
 * number of signals, and a fixed list forces a choice instead of letting you write
 * "it went badly" and learn nothing. Week numbers refer to the 8-week roadmap.
 */

export interface DebriefRoundSlot {
  id: string
  label: string
  hint: string
}

export interface StudyLink {
  label: string
  href: string
}

export interface NoHireReason {
  id: string
  label: string
  looksLike: string
  study: readonly StudyLink[]
  roadmapWeeks: readonly number[]
  roadmapNote: string
}

export const roundSlots: readonly DebriefRoundSlot[] = [
  {
    id: 'recruiter',
    label: 'Recruiter or screen',
    hint: 'What did they ask, and what number or level did they name?',
  },
  {
    id: 'hiring-manager',
    label: 'Hiring manager',
    hint: 'The questions, and which of your stories you used.',
  },
  {
    id: 'people-management',
    label: 'People management',
    hint: 'Performance, hiring, departures, promotion cases.',
  },
  {
    id: 'cross-functional',
    label: 'Cross-functional',
    hint: 'The partner round: product, data, a peer manager.',
  },
  {
    id: 'system-design',
    label: 'System design',
    hint: 'The prompt, the scale given, and where they pushed.',
  },
  {
    id: 'technical-depth',
    label: 'Coding or technical depth',
    hint: 'The problem or the deep dive, and how far it got.',
  },
]

export const roomChangeCues: readonly string[] = [
  'The interviewer stopped taking notes.',
  'They asked the same question a second time in different words.',
  'They moved on before you finished an answer.',
  'They started filling your silences for you.',
  'They stopped asking follow-ups and went to their next scripted question.',
  'They asked how many engineers reported to you, and then asked again about the structure.',
  'They ended ten minutes early.',
]

export const noHireReasons: readonly NoHireReason[] = [
  {
    id: 'people-signal',
    label: 'People signal',
    looksLike:
      'No convincing evidence that you have managed a performance case, a departure, or a promotion you had to argue for. Often written up as "could not get specifics on managing underperformance".',
    study: [
      { label: 'Team management track', href: '/team-management' },
      { label: 'Behavioral track', href: '/behavioral' },
    ],
    roadmapWeeks: [4, 5],
    roadmapNote: 'The people management weeks, where the 1:1, feedback and performance material sits.',
  },
  {
    id: 'technical-depth',
    label: 'Technical depth',
    looksLike:
      'You held the first layer and cracked on the second. Usually written as "would struggle to hold senior engineers to a technical standard", and it is the single most common cause of a manager downlevel.',
    study: [
      { label: 'System design track', href: '/system-design' },
      { label: 'Coding track', href: '/coding' },
    ],
    roadmapWeeks: [2, 3, 6],
    roadmapNote: 'The system design and coding weeks. Depth is built by re-deriving, not by re-reading.',
  },
  {
    id: 'scope',
    label: 'Scope',
    looksLike:
      'Everything you said was true and all of it was one level too small: features rather than roadmaps, sprints rather than quarters, your team rather than the org. This is the reason behind most offers that come back a level low.',
    study: [
      { label: 'Technical leadership track', href: '/technical-leadership' },
      { label: 'Behavioral track', href: '/behavioral' },
    ],
    roadmapWeeks: [5, 7],
    roadmapNote: 'The leadership and strategy weeks. Rewrite your top three stories one altitude higher.',
  },
  {
    id: 'communication',
    label: 'Communication',
    looksLike:
      'The content was there and the delivery buried it: answers that ran long, no structure, or a story that never reached the outcome. Written up as "hard to follow" or "did not answer the question asked".',
    study: [
      { label: 'Behavioral track', href: '/behavioral' },
      { label: 'Mock loop day', href: '/mock-loop' },
    ],
    roadmapWeeks: [1, 8],
    roadmapNote: 'Story structure in week one, then the full mock week. Record yourself and watch it back.',
  },
  {
    id: 'culture',
    label: 'Culture or values fit',
    looksLike:
      'A specific moment rather than a general impression, usually blaming a partner team, dismissing product or design, or an answer that showed no curiosity about how the company actually works.',
    study: [
      { label: 'Behavioral track', href: '/behavioral' },
      { label: 'Company breakdowns', href: '/companies/amazon' },
    ],
    roadmapWeeks: [1, 7],
    roadmapNote: 'The values and company research weeks. Map your stories onto the specific company rubric.',
  },
  {
    id: 'level-mismatch',
    label: 'Level mismatch',
    looksLike:
      'A hire signal at a different level from the one you interviewed for, in either direction. Not a rejection of you, a rejection of the slot, and often recoverable by asking about the other opening.',
    study: [
      { label: 'Offer, levelling and negotiation', href: '/negotiation' },
      { label: 'Technical leadership track', href: '/technical-leadership' },
    ],
    roadmapWeeks: [7, 8],
    roadmapNote: 'Read the levelling section first, then decide whether to push for a re-interview.',
  },
]

export const howToUseIt: readonly string[] = [
  'Write it within two hours of the loop, while you can still quote the questions. After a day you will remember your feelings and not the wording.',
  'Copy the questions down verbatim, even the ones you answered well, because the set of questions tells you what the company is actually scoring.',
  'Guess the reason before you hear any feedback. The guess you make cold is more useful than the sanitised summary a recruiter gives you a week later.',
  'When feedback does arrive, paste it in without editing it. Softening it is how the same gap survives three loops.',
  'Do the same for a rejection with no feedback at all. The pattern across three of these is the feedback.',
]
