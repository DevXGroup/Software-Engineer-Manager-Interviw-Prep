/**
 * Content for /negotiation.
 *
 * Vesting schedules and level names below were read from levels.fyi company pages
 * on 2026-09-12. Source URLs are cited inline on each row. Anything not backed by a
 * cited source is labelled "commonly reported" in the copy itself.
 */

export type Negotiability = 'usually movable' | 'sometimes movable' | 'rarely movable'

export interface LevellingNote {
  id: string
  title: string
  body: string
}

export interface ComponentRow {
  id: string
  component: string
  negotiability: Negotiability
  why: string
}

export interface CompanyRow {
  id: string
  company: string
  managerLevels: string
  equityShape: string
  mostMovable: string
  verified: boolean
}

export interface SequenceStep {
  id: string
  step: string
  detail: string
}

export interface Script {
  id: string
  situation: string
  say: string
}

export interface Mistake {
  id: string
  mistake: string
  instead: string
}

export const levellingNotes: readonly LevellingNote[] = [
  {
    id: 'the-debrief-decides-the-level',
    title: 'The debrief decides the level, not the recruiter',
    body: 'After your loop, the interviewers meet (the "debrief") and each one reads out their notes, their hire or no-hire, and the level they saw. A hiring manager or a designated committee chair runs the room. The recruiter is usually present to take notes, not to argue for you. So the level in your offer is an output of that meeting, and by the time you are talking money it has already been set. What you can still move is money now and level later.',
  },
  {
    id: 'level-is-read-off-scope-not-years',
    title: 'Level is read off scope, not years',
    body: 'Managers are levelled by the size of the thing they own: how many engineers, how many teams, whether the roadmap is handed to them or written by them, and how far out their planning horizon runs. Two candidates with the same eight years of experience land two levels apart if one ran a single team against a given backlog and the other ran three teams and set the technical direction. Say the numbers out loud in the loop, because an interviewer who has to guess your scope guesses low.',
  },
  {
    id: 'why-downlevels-happen',
    title: 'Why downlevels happen',
    body: 'A downlevel is an offer one step below the role you applied for. The four causes that show up again and again: you told team stories in the first person singular, so the room could not tell what you did versus what your engineers did; your examples were all execution and none were about ambiguity or strategy; your technical depth cracked in the system design round, so the room doubted you could hold senior engineers to a standard; or the loop simply had no signal on a dimension the level requires, such as hiring, performance management, or cross-team conflict, because nobody asked and you never volunteered it.',
  },
  {
    id: 'a-downlevel-is-an-offer-not-a-verdict',
    title: 'A downlevel is an offer, not a verdict',
    body: 'You have three honest responses. Accept it and negotiate compensation hard, since pay bands overlap between levels and a strong offer at the lower level can beat a weak one at the higher level. Ask for a targeted re-interview on the dimension that was thin, which some companies will grant within a few weeks if the rest of the loop was strong. Or decline, and come back in a year with the scope story you were missing. Never accept a downlevel on a verbal promise that you will be "re-levelled after six months" unless it is written into the offer, because the person promising it often will not be your manager by then.',
  },
  {
    id: 'ask-for-the-rubric',
    title: 'Ask for the rubric before the loop, not after',
    body: 'Recruiters will usually tell you which level you are being interviewed for and, if you ask plainly, roughly what that level is expected to own. Get that in email. It gives you the vocabulary to aim your stories at the right altitude during the loop, and it gives you something concrete to point at if the offer comes back a level low.',
  },
]

export const componentRows: readonly ComponentRow[] = [
  {
    id: 'base-salary',
    component: 'Base salary',
    negotiability: 'sometimes movable',
    why: 'Base sits inside a published band for the level, and the band is usually the hard edge. There is real room inside it if you came in near the bottom, and almost none once you are at the top. If base will not move, the answer is usually to push the stock grant or the sign-on instead.',
  },
  {
    id: 'sign-on-bonus',
    component: 'Sign-on bonus',
    negotiability: 'usually movable',
    why: 'This is the flexible part, because it is one-off cash that does not raise your band position or the cost of every future raise. It is also the standard tool for buying out an unvested grant or a bonus you are walking away from. Bring the number you are leaving behind and it is a much easier approval.',
  },
  {
    id: 'equity-grant',
    component: 'Equity grant',
    negotiability: 'usually movable',
    why: 'The initial stock grant has the widest range of any component at manager level, and a competing offer moves it more than anything else. Ask for the dollar value at grant, the number of shares, the vesting schedule, and the cliff, because two grants with the same headline value pay out very differently over four years.',
  },
  {
    id: 'target-bonus',
    component: 'Target bonus percentage',
    negotiability: 'rarely movable',
    why: 'The target percentage is normally fixed by level and is paid against company and individual performance, so it is a forecast, not a promise. Treat the target as the number and anything above it as a surprise.',
  },
  {
    id: 'start-date',
    component: 'Start date',
    negotiability: 'usually movable',
    why: 'Cheap for them, valuable for you. Push it out to collect a vest, a bonus payout, or four weeks of rest, and push it in only if you need the cash. Just confirm in writing that the grant is priced at your start, not at signing, since a moving share price changes the share count.',
  },
  {
    id: 'level',
    component: 'Level',
    negotiability: 'rarely movable',
    why: 'Changing the level after the debrief usually means reopening the debrief, and that needs new evidence: an extra interview, a reference, or a work sample. Asking politely does not move it. Asking for one more conversation with the hiring manager on the specific gap sometimes does.',
  },
  {
    id: 'remote-and-location',
    component: 'Location and remote days',
    negotiability: 'sometimes movable',
    why: 'Pay is usually tied to a location tier, so relocating changes the band, not just the commute. Get the office, the expected days in it, and any relocation package in the written offer rather than in a verbal understanding with your future manager.',
  },
]

export const companyRows: readonly CompanyRow[] = [
  {
    id: 'meta',
    company: 'Meta',
    // Verified: https://www.levels.fyi/companies/meta/salaries/software-engineering-manager
    managerLevels: 'M0, M1, M2, then director levels D1 and up',
    equityShape: 'RSUs on a level 4-year schedule, 25% a year vesting quarterly',
    mostMovable: 'Equity, then sign-on. Bands are wide at M1 and M2 and a written competing offer is the lever that works.',
    verified: true,
  },
  {
    id: 'amazon',
    company: 'Amazon',
    // Verified: https://www.levels.fyi/companies/amazon/salaries/software-engineering-manager
    managerLevels: 'L5 and L6 SDM, L7 senior SDM, L8 director',
    equityShape: 'RSUs vesting over 4 years on a back-loaded schedule, so most of the value lands in the later years. Amazon does not publish the split; your offer letter states it.',
    mostMovable: 'Sign-on, because back-loaded stock leaves the first two years thin and a cash sign-on is the normal way to fill that gap. Ask what the sign-on is, how it is split across years, and whether any of it is clawed back if you leave early.',
    verified: true,
  },
  {
    id: 'apple',
    company: 'Apple',
    // Verified: https://www.levels.fyi/companies/apple/salaries/engineering-manager
    managerLevels: 'Internal manager bands are not published. Recruiters talk in job families, not public level numbers.',
    equityShape: 'RSUs on a 4-year schedule, 25% a year vesting twice a year',
    mostMovable: 'Equity and sign-on. Offers are commonly reported as less formulaic than at the other five, so the first number tells you less about the range than it does elsewhere.',
    verified: true,
  },
  {
    id: 'netflix',
    company: 'Netflix',
    // Verified: https://www.levels.fyi/companies/netflix/salaries/software-engineer
    managerLevels: 'Manager, then director. Netflix deliberately keeps very few levels.',
    equityShape: 'Almost entirely cash. Reported stock and bonus for most engineering levels is zero, and the total lands in base salary.',
    mostMovable: 'Base, because base is effectively the whole package. There is no sign-on or equity structure to trade against, so the conversation is a single number and your market evidence has to carry it.',
    verified: true,
  },
  {
    id: 'google',
    company: 'Google',
    // Verified: https://www.levels.fyi/companies/google/salaries/engineering-manager
    managerLevels: 'L5 and L6 manager, L7 senior manager, L8 director',
    equityShape: 'GSUs, usually front-loaded over 4 years: about 38% in year one, then 32%, 20% and 10%',
    mostMovable: 'Equity, then sign-on. Offers are commonly reported as reviewed by a compensation committee rather than decided by the recruiter, so expect a written case and a wait rather than a same-day answer.',
    verified: true,
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    // Verified: https://www.levels.fyi/companies/microsoft/salaries/software-engineering-manager
    managerLevels: 'Numbered bands: 63 to 65 manager, 66 to 67 principal and senior director, 68 and up partner and GM',
    equityShape: 'RSUs on a 4-year schedule at 25% a year, sometimes a 5-year schedule at 20% a year',
    mostMovable: 'Sign-on and the initial stock award. Annual stock refreshes are commonly reported as a separate performance-driven pool, so the number to negotiate is the on-hire award.',
    verified: true,
  },
]

export const sequence: readonly SequenceStep[] = [
  {
    id: 'never-name-the-first-number',
    step: 'Do not name the first number',
    detail: 'When the recruiter asks what you are expecting, answer the question behind it: "I want to be paid fairly for the level once you have seen the loop, and I am looking at other processes at the same time. What is the band for this level?" If they press, give the band you have researched for that level and city rather than a single figure, and say it is the band you are working from. Many US states require the band on the posting, so often you can just read it back to them.',
  },
  {
    id: 'do-not-disclose-current-pay',
    step: 'Do not volunteer your current pay',
    detail: 'Your current number anchors the offer to your last employer instead of to this level. In several US states asking for salary history is illegal, and everywhere it is optional for you to answer. The clean line: "I would rather not anchor on my current package. I am happy to tell you what it would take to move." The one number worth disclosing is unvested equity you are walking away from, because that turns straight into sign-on.',
  },
  {
    id: 'get-it-in-writing',
    step: 'Get the whole offer in writing before you respond',
    detail: 'Ask for base, target bonus percentage, sign-on and when it pays, equity dollar value at grant, share count, vesting schedule, cliff, level, title, location, start date, and any clawback on the sign-on. Verbal offers change. Do not negotiate against a number a recruiter said on a call, and do not say yes or no to anything before you have read it.',
  },
  {
    id: 'run-processes-in-parallel',
    step: 'Run your processes in parallel, not in series',
    detail: 'Almost all of your leverage comes from a real alternative, and alternatives only exist if the loops finish within a couple of weeks of each other. If one company is moving faster, tell the others plainly: "I have a loop scheduled with another company on the 20th. Can we compress?" Companies compress far more often than candidates expect.',
  },
  {
    id: 'use-a-competing-offer-honestly',
    step: 'Use a competing offer honestly',
    detail: 'Name the company, the level, and the real total, and be willing to show the letter if asked. Then say what you actually want: "Their package is higher on stock. I would rather be on your team. If you can close most of that gap I will sign today." Never inflate a number and never invent an offer, because recruiters at these six companies talk to each other, know the bands, and will simply stop negotiating with you if a number does not look real.',
  },
  {
    id: 'the-deadline-dance',
    step: 'Handle the deadline honestly',
    detail: 'Exploding deadlines of a few days are common and are usually softer than they sound. Ask once, plainly, for what you need: "I have one loop finishing on the 27th. Can you hold this until the 30th?" Give a real reason and a real date. If the answer is a hard no on a package you would otherwise accept, that refusal is information about how the company treats people.',
  },
  {
    id: 'ask-once-and-close',
    step: 'Ask once, clearly, and then close',
    detail: 'One well-built ask with a stated reason beats four rounds of nibbling, which burns goodwill with the person who will be your manager. Put base, sign-on and equity in a single message, say what would make you sign, and then honour it. If they meet it, sign. If they meet most of it, sign or walk, but do not reopen.',
  },
]

export const scripts: readonly Script[] = [
  {
    id: 'recruiter-asks-your-number-first',
    situation: 'The recruiter asks for your expected compensation on the first call',
    say: 'I would rather not put a number on it before you have seen me interview. What I can tell you is that I am running two other processes and I am looking at total compensation, not just base. What is the band for this level in this location? I will tell you honestly if it is in range.',
  },
  {
    id: 'countering-a-first-offer',
    situation: 'The first written offer is real but low',
    say: 'Thank you for this, and I want to be clear that I want the job. As it stands the package is below the two others I am working with, mostly on the equity side. If you can move the initial grant and the sign-on to bring the four-year average to around X, I will sign this week and stop the other processes. Is that something you can take to the compensation team?',
  },
  {
    id: 'using-a-competing-offer',
    situation: 'You have a stronger written offer somewhere else',
    say: 'I have a written offer from another large company at an equivalent level. Their total is about X over four years, mostly in stock, and I am happy to walk you through it. Your team is the one I want, and the work is closer to what I am good at. If you can get within about five percent of their total I will accept yours and decline theirs today.',
  },
  {
    id: 'pushing-back-on-a-downlevel',
    situation: 'The offer comes back one level below the role you interviewed for',
    say: 'I understand the debrief landed on the lower level, and I would like to understand which dimension was thin so I can respond to the actual concern. If it was scope, I can walk through the three teams and the two roadmaps I owned last year, and I am happy to do one more conversation with the hiring manager on exactly that. If the level is fixed, then I want to talk about where I sit in the band, because I am being asked to take a title I have already outgrown.',
  },
  {
    id: 'asking-for-more-time',
    situation: 'They have given you four days to decide',
    say: 'I want to give you a real answer rather than a rushed one. I have one loop finishing on the 27th and I owe that team the courtesy of seeing it through. Can you hold this open until the 30th? If it helps, I can tell you now that your team is my first choice, and nothing about that is going to change in a week.',
  },
]

export const mistakes: readonly Mistake[] = [
  {
    id: 'naming-a-number-first',
    mistake: 'Naming a number first',
    instead: 'Anything you say becomes the ceiling. Redirect to the band for the level, every time, until you have a written offer.',
  },
  {
    id: 'negotiating-base-only',
    mistake: 'Negotiating base only',
    instead: 'Base is usually the most constrained component and equity is usually the least. Trading a movable component for a stuck one is how candidates leave the most money behind.',
  },
  {
    id: 'comparing-headline-totals',
    mistake: 'Comparing two offers on the headline total',
    instead: 'A back-loaded grant and a front-loaded grant with the same four-year value pay out very differently in year one, and year one is the year you are most likely to still be there. Compare year one and the four-year average side by side.',
  },
  {
    id: 'inflating-a-competing-offer',
    mistake: 'Inflating or inventing a competing offer',
    instead: 'Recruiters know the bands and often know each other. Use the real number, and use the letter. One number that does not check out ends the negotiation and sometimes the offer.',
  },
  {
    id: 'accepting-a-verbal-promise',
    mistake: 'Accepting a verbal promise about level, scope, or a future review',
    instead: 'If it is not in the letter it does not exist, because the person promising it may not be your manager in six months. Ask for it in writing, and accept a no as a real answer.',
  },
  {
    id: 'negotiating-with-the-wrong-person',
    mistake: 'Negotiating hard with your future manager',
    instead: 'The recruiter owns the number and is paid to close you. The hiring manager owns your next two years. Take money to the recruiter and take scope, team and expectations to the manager.',
  },
]

export const walkAwaySignals: readonly string[] = [
  'The offer is below the published band for the level and nobody will explain why.',
  'You asked one clear question about scope or team size and got three different answers from three people.',
  'The level is fixed, the band position is fixed, and the role is a step down from what you already do.',
  'The deadline is days long, it will not move at all, and the reason given changes each time you ask.',
  'The hiring manager will not put the remote or location expectation in writing.',
  'The team you would inherit has had three managers in two years and nobody will say what happened.',
  'You noticed you were arguing yourself into it. Wanting to win the negotiation is not the same as wanting the job.',
]
