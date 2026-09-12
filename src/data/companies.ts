export type CompanySlug = 'amazon' | 'meta' | 'google' | 'apple' | 'netflix' | 'microsoft'

export type CompanyRound = { name: string; duration: string; focus: string }
export type CompanyQuestion = { q: string; lp?: string }
export type CompanyData = {
  slug: CompanySlug
  name: string
  tagline: string
  rounds: CompanyRound[]
  topQuestions: CompanyQuestion[]
  tips: string[]
  cultureSignals: string[]
  redFlags: string[]
  processNotes: string
}

export const companyData: Record<CompanySlug, CompanyData> = {
  // Amazon entry, rewritten 2026-09-12. Every claim below is traceable to a
  // source Amazon publishes itself; nothing is sourced from employee accounts,
  // Blind, or third-party interview blogs.
  //   Leadership Principles (all 16, Amazon's own wording):
  //     https://www.amazon.jobs/content/en/our-workplace/leadership-principles
  //   Interview loop, "two to seven Amazon employees", the Bar Raiser in the loop:
  //     https://www.amazon.jobs/content/en/how-we-hire/interview-loop
  //   Phone screens and role-specific assessments:
  //     https://www.aboutamazon.com/news/workplace/amazon-interview-process-phone-screens-loops
  //   Bar Raiser: specially trained, from outside the hiring team, no day-to-day
  //   involvement, decides with the hiring manager, 50%-of-peers standard:
  //     https://www.aboutamazon.com/news/workplace/amazon-bar-raiser
  //   STAR method and behavioural questions rooted in the Leadership Principles:
  //     https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon
  //   Working Backwards and the PR/FAQ document:
  //     https://www.aboutamazon.com/news/workplace/an-insider-look-at-amazons-culture-and-processes
  amazon: {
    slug: 'amazon',
    name: 'Amazon',
    tagline: 'The Leadership Principles are the rubric. Amazon says they are the foundation of every hiring decision.',
    rounds: [
      { name: 'Application and recruiter contact', duration: 'Varies by role', focus: 'Amazon says the process differs from role to role, so ask your recruiter for your loop' },
      { name: 'Phone screen', duration: 'One or two screens', focus: 'Amazon describes one or two initial phone screens that assess basic qualifications' },
      { name: 'Role-specific assessment', duration: 'Varies by role', focus: 'Amazon says screens may be followed by assessments specific to the role' },
      { name: 'Interview loop', duration: 'Two to seven interviewers', focus: 'A mix of managers, potential colleagues and stakeholders, plus a Bar Raiser' },
      { name: 'Bar Raiser (part of the loop)', duration: 'One of the loop interviews', focus: 'A trained interviewer from outside the hiring team, there to keep the hiring bar consistent' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you made a decision with incomplete information.', lp: 'Are Right, A Lot' },
      { q: 'Describe a time you went above and beyond for a customer.', lp: 'Customer Obsession' },
      { q: 'Tell me about a time you failed. What did you learn?', lp: 'Learn and Be Curious' },
      { q: 'Tell me about a time you simplified a complex process or system.', lp: 'Invent and Simplify' },
      { q: 'Describe a time you had to deliver results under difficult constraints.', lp: 'Deliver Results' },
      { q: 'Tell me about a time you hired or developed a high-performing team member.', lp: 'Hire and Develop the Best' },
      { q: 'Describe a time you disagreed with your manager and what you did.', lp: 'Have Backbone; Disagree and Commit' },
    ],
    tips: [
      'Answer in STAR shape: situation, task, action, result. Amazon names STAR as the format it interviews in',
      'Build your examples against the Leadership Principles, since Amazon calls them the foundation of every hiring decision',
      'Say "I" rather than "we" when describing your own actions, so your specific contribution is clear',
      'Quantify the result: metrics, percentages, dollar impact, time saved',
      'Prepare more than one story per principle, because the same principle can come up more than once across a loop',
      'Expect a Bar Raiser from outside the hiring team, whose job Amazon describes as keeping the hiring bar consistent',
      'Amazon describes the Bar Raiser standard as bringing skills better than 50% of your would-be peers in similar roles, so pitch your examples at that bar',
    ],
    cultureSignals: [
      'Working Backwards: Amazon defines it as starting from the customer experience and working back to what to build',
      'The PR/FAQ, which Amazon describes as a press release under one page plus an FAQ of five pages or less',
      'Data behind every claim, because "how do you know?" is a fair question about any result you cite',
      'Frugality, one of the 16 principles: achieving more with less',
      'Long-term thinking, which Amazon states plainly in its principles and shareholder letters',
    ],
    redFlags: [
      'Saying "we" throughout, so nobody can tell what you actually did',
      'Blaming others for a failure without owning your part in it',
      'Stories with no measurable result',
      'Arguing against the Leadership Principles rather than engaging with them',
      'Going passive on a disagreement question, when Have Backbone asks for the opposite',
    ],
    processNotes:
      "Amazon publishes that its process differs by role, that you can expect one or two phone screens possibly followed by role-specific assessments, and that the interview loop puts you in front of two to seven employees: a mix of managers, potential colleagues and stakeholders, plus a Bar Raiser. Amazon describes the Bar Raiser as a specially trained interviewer from outside the hiring team who has no day-to-day stake in the role, who keeps the hiring bar consistent and reduces bias, and who reaches the decision together with the hiring manager. Interviews are behavioural and rooted in the 16 Leadership Principles, asked and answered in STAR format. Anything more specific than this, including round counts, interview lengths, how feedback is written up and how the decision meeting runs, is not published by Amazon, so ask your recruiter rather than trusting a number you read online.",
  },

  meta: {
    slug: 'meta',
    name: 'Meta',
    tagline: 'Impact at scale and speed of execution. Show boldness and cross-functional influence.',
    rounds: [
      { name: 'Recruiter screen', duration: '30 min', focus: 'Background, motivation, expectations alignment' },
      { name: 'HM interview', duration: '60 min', focus: 'Cross-functional leadership, team management' },
      { name: 'People management', duration: '60 min', focus: 'Coaching, hiring, performance, team growth' },
      { name: 'Cross-functional', duration: '60 min', focus: 'Working with product, design, data: influence without authority' },
      { name: 'Executive interview', duration: '60 min', focus: 'Vision, strategy, leadership breadth' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you had to prioritize between competing opportunities.' },
      { q: 'Describe a project where you drove significant impact at scale (millions of users or more).' },
      { q: 'How have you built and maintained a high-performance team under pressure?' },
      { q: "Tell me about a time you had to move fast without all the information you needed." },
      { q: "Describe how you've handled a situation where you disagreed with a cross-functional partner." },
      { q: 'Tell me about a product decision you made that was controversial. What was the outcome?' },
    ],
    tips: [
      'Scale matters to Meta: your stories should reference millions of users when possible',
      'Show comfort with ambiguity: "move fast" means you cannot wait for perfect information',
      'Demonstrate cross-functional influence: how do you get alignment without authority?',
      'Meta values boldness: they want to hear about the big swings, not safe choices',
      'The "Meta, Metamates, Me" value means the company mission comes before individual wins',
      'Concrete product intuition is valued: be ready to discuss your product decisions',
    ],
    cultureSignals: [
      "Bias toward action: ships, iterates, doesn't over-plan",
      'Systems thinking: understanding how decisions ripple across the org',
      'Directness and candor: feedback culture is strong at Meta',
      'Long-term impact mindset despite short-cycle iteration',
      'Deep care for the mission (social connectivity at global scale)',
    ],
    redFlags: [
      'Stories about playing it safe rather than taking calculated risks',
      "Can't articulate the scale of impact (missing metrics)",
      'Passive collaboration: "I worked with the team" without showing your leadership',
      'Not being direct in the interview; Meta values candor in its culture',
    ],
    processNotes:
      "4 to 5 rounds. Meta's process is built around its company values. The People Management round specifically evaluates manager quality. Meta uses calibrated rubrics: meets bar, exceeds bar, strongly exceeds bar. Debrief is a structured hiring-committee decision.",
  },

  google: {
    slug: 'google',
    name: 'Google',
    tagline: 'Data-driven, 10x thinking, psychological safety. Intellectual humility is valued.',
    rounds: [
      { name: 'Recruiter screen', duration: '30 min', focus: 'Background, motivation, team preferences' },
      { name: 'Manager screen', duration: '45 min', focus: 'Leadership style, management philosophy' },
      { name: 'Googleyness', duration: '45 min', focus: 'Ambiguity, inclusion, psychological safety, collaboration' },
      { name: 'Leadership (manager-specific)', duration: '45 min', focus: 'Strategic thinking, influence, people development' },
      { name: 'Coding (SDM)', duration: '45 min', focus: 'Typically 1 to 2 coding rounds; easier than the SWE bar' },
      { name: 'System design', duration: '45 min', focus: 'Large-scale distributed systems at Google scale' },
      { name: 'Hiring committee review', duration: 'N/A', focus: 'All feedback is reviewed by a committee before offer' },
    ],
    topQuestions: [
      { q: 'How do you approach decisions when data is ambiguous or conflicting?' },
      { q: 'Tell me about a time you drove innovation in a large organization.' },
      { q: "Describe how you've created psychological safety in a team." },
      { q: 'Tell me about a time you had to learn something entirely new quickly to do your job.' },
      { q: 'Describe a time you made a significant mistake. How did you handle it?' },
      { q: 'How have you built inclusive teams and diverse pipelines?' },
    ],
    tips: [
      'Google values intellectual humility: say "I don\'t know" confidently, then reason through it',
      'Data and analysis drive Google decisions: always reference data in your examples',
      'Googleyness includes creating psychological safety and inclusive environments',
      '"Think 10x, not 10%": frame your stories around bold, transformative impact',
      'The hiring committee reviews all feedback before offers; no individual interviewer can make the offer',
      'Show curiosity: "great just isn\'t good enough" means ongoing learning is expected',
    ],
    cultureSignals: [
      'Evidence-based decision making: opinions backed by data win',
      'Long-term investment in platform and infrastructure',
      'Collaborative culture: consensus matters at Google',
      'Intellectual depth: be ready to go deep on any topic you mention',
      'Openness to failure as a learning opportunity',
    ],
    redFlags: [
      'Overconfidence without data: "I just knew it was right"',
      "Inability to articulate how you've created inclusive or psychologically safe environments",
      'Treating the Googleyness round as unimportant; it is a real evaluation with real weight',
      'Not asking clarifying questions in the system design or coding rounds',
    ],
    processNotes:
      "The hiring committee makes all offer decisions; no single interviewer can approve or block an offer alone. All interviewers submit written scorecards before the committee meets. Typical timeline from screen to offer is 6 to 12 weeks. Google's levels are notoriously conservative; most external hires come in one level below their previous role.",
  },

  apple: {
    slug: 'apple',
    name: 'Apple',
    tagline: 'Craft, taste, and deep collaboration. Apple is secretive and process-heavy.',
    rounds: [
      { name: 'Recruiter screen', duration: '30 min', focus: 'Confidentiality norms, background, motivation' },
      { name: 'HM interview', duration: '60 min', focus: 'Leadership style, team fit, product philosophy' },
      { name: 'Peer interviews', duration: '45 min each', focus: 'Collaboration style, conflict resolution, technical depth' },
      { name: 'Cross-functional', duration: '60 min', focus: 'Working with design, hardware, operations teams' },
      { name: 'Skip-level', duration: '60 min', focus: 'Strategic vision, org leadership breadth' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you had to say no to a feature request.' },
      { q: "Describe how you've maintained quality standards under extreme pressure." },
      { q: 'Tell me about a time you collaborated deeply with a design team on a complex product.' },
      { q: 'Describe a product decision where taste and craft mattered as much as data.' },
      { q: 'How do you think about privacy as a product constraint?' },
      { q: 'Tell me about a time you simplified something that others thought was too complex to simplify.' },
    ],
    tips: [
      'Do not discuss confidential work details from previous companies; Apple takes this very seriously',
      'Craft and taste are evaluated: how have you made something beautiful and simple?',
      'Apple is highly matrixed: demonstrate skill at navigating org complexity without authority',
      "Show commitment to quality over speed: Apple's pace is deliberate",
      'Privacy as a human right: demonstrate genuine belief in user privacy, not just compliance',
      'The interview process is slow: 6 to 16 weeks from screen to offer is common; be patient',
    ],
    cultureSignals: [
      'Attention to every detail: Apple people care about pixels and milliseconds',
      'Long-term commitment: Apple tenure is long, retention is high',
      'Secrecy culture: what happens at Apple stays at Apple',
      'Deep collaboration across hardware, software, services',
      'Perfection orientation: "good enough" is rarely enough',
    ],
    redFlags: [
      'Sharing confidential technical details about previous employers',
      'Prioritizing speed over quality ("move fast and break things" mindset)',
      'Lack of product taste: no examples of making elegant, simple experiences',
      'Inability to work in a highly matrixed, secretive org structure',
    ],
    processNotes:
      "Apple has one of the most opaque hiring processes in FAANG. Positions often have multiple hiring managers competing for the same candidate. The process is highly confidential; you may not know what team you're interviewing for until late stages. The timeline is slow by design. Offers are typically not negotiable on equity but sometimes on base.",
  },

  netflix: {
    slug: 'netflix',
    name: 'Netflix',
    tagline: '"Stunning colleagues in a dream team." High freedom, high responsibility, no brilliant jerks.',
    rounds: [
      { name: 'Recruiter screen', duration: '30 min', focus: 'Culture fit pre-screen, comp expectations' },
      { name: 'HM interview', duration: '60 min', focus: 'Culture and values alignment: weighted heavily' },
      { name: 'People management', duration: '60 min', focus: 'Team development, candid feedback, talent density' },
      { name: 'Technical leadership', duration: '60 min', focus: 'Architecture decisions, technical depth as a manager' },
      { name: 'Cross-functional', duration: '60 min', focus: 'Stakeholder management, influence, business judgment' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you made a high-stakes decision with limited time.' },
      { q: 'Describe how you created a culture of candid, direct feedback.' },
      { q: 'Tell me about a time you had to let go of a high-performing but culturally problematic team member.' },
      { q: 'How do you know when to give someone context vs. control over a decision?' },
      { q: 'Describe a time you delivered uncomfortable feedback to a senior peer or upward.' },
      { q: 'How do you balance freedom and responsibility with a distributed team?' },
    ],
    tips: [
      "Netflix's biggest filter is high EQ and high performance together: one without the other is disqualifying",
      '"Brilliant jerks" are explicitly rejected, even if someone is exceptional technically',
      '"Context, not control" is a real philosophy: show examples of trusting your team',
      'Netflix is data-heavy: all product and people decisions are quantified',
      'The "keeper test": would the manager fight to keep this person? Be ready to apply this to your team stories',
      'Comp is top-of-market, all-cash, no equity. Be ready for a very different comp conversation',
    ],
    cultureSignals: [
      'Radical candor is real: they practice difficult feedback openly',
      'High talent density: everyone is exceptional, not just senior staff',
      'Strong written communication: culture of memos over slide decks',
      'Autonomy with accountability: you own your decisions fully',
      'Data fluency across all roles including people management',
    ],
    redFlags: [
      'Stories where you micromanaged rather than trusted your team',
      'Inability to give direct, uncomfortable feedback with compassion',
      'Tolerating underperformance; Netflix would rather reduce team size than accept mediocrity',
      'Equity-focused candidates: Netflix is all-cash, all the time',
    ],
    processNotes:
      'Netflix culture is genuine; the "Culture Deck" is still the operating manual. The interview is more than half culture evaluation. Pay is almost all cash at top of market, with an optional yearly election to take part of it as stock options. Performance reviews are continuous rather than annual cycles. Netflix moves quickly when interested; a typical process is 3 to 5 weeks.',
  },

  microsoft: {
    slug: 'microsoft',
    name: 'Microsoft',
    tagline: "Growth mindset and inclusive leadership. The world's largest software company: impact at scale.",
    rounds: [
      { name: 'Recruiter screen', duration: '30 min', focus: 'Experience, motivation, level calibration' },
      { name: 'HM interview', duration: '60 min', focus: 'Team fit, growth mindset, leadership style' },
      { name: 'People management', duration: '60 min', focus: 'Coaching, inclusion, performance, hiring' },
      { name: 'Technical leadership', duration: '60 min', focus: 'Architecture decisions, platform thinking' },
      { name: 'Cross-group collaboration', duration: '60 min', focus: "Working across Microsoft's matrix org" },
      { name: 'Executive interview', duration: '60 min', focus: 'Vision, strategic alignment, One Microsoft thinking' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you had to learn something completely new quickly.' },
      { q: "Describe how you've managed a diverse team across cultures and time zones." },
      { q: 'How have you driven significant organizational change in a large company?' },
      { q: 'Tell me about a time you failed and what you changed about yourself as a result.' },
      { q: "Describe how you've built an inclusive hiring pipeline." },
      { q: 'How do you help your team members grow into the next level of their career?' },
    ],
    tips: [
      'Growth mindset is the number one filter: Satya Nadella made it the cultural cornerstone',
      'Show openness to feedback and willingness to change based on what you learn',
      '"One Microsoft" thinking: demonstrate cross-org collaboration, not silo mentality',
      'Microsoft values diversity and inclusion deeply: have concrete examples',
      'Technical depth still matters even at senior manager levels',
      "Microsoft's process is more structured and formal than Meta's or Netflix's",
    ],
    cultureSignals: [
      'Genuine commitment to diversity, equity, and inclusion at all levels',
      "Enterprise and developer empathy: Microsoft's customers are companies and developers",
      'Long-term investment: Microsoft plays multi-decade games (Azure, AI, gaming)',
      'Collaboration culture: no sharp elbows, a strong "One Microsoft" identity',
      'Data and evidence drive decisions, but storytelling matters too',
    ],
    redFlags: [
      'Fixed-mindset stories: "I already know how to do this" without a growth arc',
      'Inability to work in a highly matrixed, large-org environment',
      'Stories that show lack of inclusion awareness or diverse team building',
      'Viewing cross-team dependencies as obstacles rather than collaboration opportunities',
    ],
    processNotes:
      'Microsoft has standardized interview kits and rubrics. As-appropriate reviews can escalate to senior leadership for senior hires. Debrief is structured and written. Microsoft moves at a corporate pace: 6 to 12 weeks from screen to offer is typical. Comp is competitive but negotiable, especially RSU grants for senior hires.',
  },
}
