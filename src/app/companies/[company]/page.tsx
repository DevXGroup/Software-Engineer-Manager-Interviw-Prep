'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building, ArrowLeft, Users, Clock, DollarSign, AlertTriangle, Lightbulb, Star, CheckCircle, X } from 'lucide-react'
import Link from 'next/link'

type CompanyData = {
  name: string
  gradient: string
  textColor: string
  tagline: string
  rounds: { name: string; duration: string; focus: string }[]
  topQuestions: { q: string; lp?: string }[]
  tips: string[]
  compensation: { role: string; base: string; total: string }[]
  cultureSignals: string[]
  redFlags: string[]
  processNotes: string
}

const companyData: Record<string, CompanyData> = {
  amazon: {
    name: 'Amazon',
    gradient: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-600',
    tagline: 'Leadership Principles are the entire rubric. Every answer must map to an LP.',
    rounds: [
      { name: 'Phone Screen', duration: '60 min', focus: 'Recruiter screen + 2 LP behavioral questions' },
      { name: 'Hiring Manager', duration: '60 min', focus: 'Team fit, role clarity, 3-4 LP questions' },
      { name: 'Loop Round 1', duration: '60 min', focus: 'Customer Obsession, Ownership, Deliver Results' },
      { name: 'Loop Round 2', duration: '60 min', focus: 'Dive Deep, Are Right A Lot, Invent & Simplify' },
      { name: 'Loop Round 3', duration: '60 min', focus: 'Hire & Develop the Best, Think Big, Earn Trust' },
      { name: 'Bar Raiser', duration: '60 min', focus: 'Culture fit + LPs your team didn\'t cover; can veto offer' },
      { name: 'Coding (SDM)', duration: '45 min', focus: 'LeetCode Easy-Medium in TypeScript/Python' },
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
      'Use "I" not "we" — the Bar Raiser wants YOUR specific contribution',
      'Quantify every answer: metrics, percentages, dollar impact, time saved',
      'Prepare 2+ stories per LP — interviewers may probe the same LP twice',
      'Recent examples preferred (within 2-3 years)',
      'The Bar Raiser\'s sole job is to assess culture fit — they are not from your team',
      'LP stories should show growth trajectory — they want to see how you\'ve leveled up',
    ],
    compensation: [
      { role: 'SDM L6 (Manager)', base: '$185-215K', total: '$380-480K (incl. RSU + signing)' },
      { role: 'SDM L7 (Sr Manager)', base: '$220-260K', total: '$500-700K (incl. RSU + signing)' },
      { role: 'Principal SDM L8', base: '$270-320K', total: '$800K-1.2M+ (incl. RSU)' },
    ],
    cultureSignals: [
      'Willingness to own failure publicly — blameless post-mortems are standard',
      'Comfort working backward from the customer (PR/FAQ process)',
      'Data-driven decision making — "How do you know?"',
      'Frugality mindset — achieving more with less headcount/budget',
      'Long-term thinking despite quarterly pressure',
    ],
    redFlags: [
      'Saying "we" without specifying your role — sounds like you\'re hiding something',
      'Blaming others for failures without owning your part',
      'Stories without metrics or quantifiable impact',
      'Disagreeing with LP philosophy instead of engaging with it',
      'Being passive about the "disagree and commit" scenario — must show backbone',
    ],
    processNotes: '5-7 rounds including Bar Raiser. The Bar Raiser is an independent evaluator who can block any offer. Each interviewer is assigned specific LPs to probe. Written feedback is submitted before debrief discussion. Debrief is typically 60-90 minutes with all interviewers.',
  },

  meta: {
    name: 'Meta',
    gradient: 'from-blue-500 to-blue-700',
    textColor: 'text-blue-600',
    tagline: 'Impact at scale + speed of execution. Show boldness and cross-functional influence.',
    rounds: [
      { name: 'Recruiter Screen', duration: '30 min', focus: 'Background, motivation, expectations alignment' },
      { name: 'HM Interview', duration: '60 min', focus: 'Cross-functional leadership, team management' },
      { name: 'People Management', duration: '60 min', focus: 'Coaching, hiring, performance, team growth' },
      { name: 'Cross-Functional', duration: '60 min', focus: 'Working with product, design, data — influence without authority' },
      { name: 'Executive Interview', duration: '60 min', focus: 'Vision, strategy, leadership breadth' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you had to prioritize between competing opportunities.' },
      { q: 'Describe a project where you drove significant impact at scale (millions+ users).' },
      { q: 'How have you built and maintained a high-performance team under pressure?' },
      { q: 'Tell me about a time you had to move fast without all the information you needed.' },
      { q: 'Describe how you\'ve handled a situation where you disagreed with a cross-functional partner.' },
      { q: 'Tell me about a product decision you made that was controversial. What was the outcome?' },
    ],
    tips: [
      'Scale matters to Meta — your stories should reference millions of users when possible',
      'Show comfort with ambiguity: "Move Fast" means you can\'t wait for perfect information',
      'Demonstrate cross-functional influence — how do you get alignment without authority?',
      'Meta values boldness — they want to hear about the big swings, not safe choices',
      'The "Meta, Metamates, Me" value means the company mission comes before individual wins',
      'Concrete product intuition is valued — be ready to discuss your product decisions',
    ],
    compensation: [
      { role: 'EM E5 (Manager)', base: '$220-260K', total: '$400-600K (incl. RSU)' },
      { role: 'EM E6 (Sr Manager)', base: '$260-320K', total: '$600-900K (incl. RSU)' },
      { role: 'Dir of Eng E7', base: '$330-400K', total: '$900K-1.5M+ (incl. RSU)' },
    ],
    cultureSignals: [
      'Bias toward action — ships, iterates, doesn\'t over-plan',
      'Systems thinking — understanding how decisions ripple across the org',
      'Directness + candor — feedback culture is strong at Meta',
      'Long-term impact mindset despite short-cycle iteration',
      'Deep care for the mission (social connectivity at global scale)',
    ],
    redFlags: [
      'Stories about playing it safe rather than taking calculated risks',
      'Can\'t articulate the scale of impact (missing metrics)',
      'Passive collaboration — "I worked with the team" without showing your leadership',
      'Not being direct in the interview — Meta values candor in culture',
    ],
    processNotes: '4-5 rounds. Meta\'s process is designed around their company values. The People Management round specifically evaluates manager quality. Meta uses calibrated rubrics: meets bar, exceeds bar, strongly exceeds bar. Debrief is structured with a hiring committee decision.',
  },

  google: {
    name: 'Google',
    gradient: 'from-green-500 to-green-600',
    textColor: 'text-green-600',
    tagline: 'Data-driven, 10x thinking, psychological safety. Intellectual humility is valued.',
    rounds: [
      { name: 'Recruiter Screen', duration: '30 min', focus: 'Background, motivation, team preferences' },
      { name: 'Manager Screen', duration: '45 min', focus: 'Leadership style, management philosophy' },
      { name: 'Googleyness', duration: '45 min', focus: 'Ambiguity, inclusion, psychological safety, collaboration' },
      { name: 'Leadership (Manager-specific)', duration: '45 min', focus: 'Strategic thinking, influence, people development' },
      { name: 'Coding (SDM)', duration: '45 min', focus: 'Typically 1-2 coding rounds; easier than SWE bar' },
      { name: 'System Design', duration: '45 min', focus: 'Large-scale distributed systems at Google scale' },
      { name: 'Hiring Committee Review', duration: 'N/A', focus: 'All feedback reviewed by a committee before offer' },
    ],
    topQuestions: [
      { q: 'How do you approach decisions when data is ambiguous or conflicting?' },
      { q: 'Tell me about a time you drove innovation in a large organization.' },
      { q: 'Describe how you\'ve created psychological safety in a team.' },
      { q: 'Tell me about a time you had to learn something entirely new quickly to do your job.' },
      { q: 'Describe a time you made a significant mistake. How did you handle it?' },
      { q: 'How have you built inclusive teams and diverse pipelines?' },
    ],
    tips: [
      'Google values intellectual humility — say "I don\'t know" confidently, then reason through it',
      'Data + analysis drives Google decisions — always reference data in your examples',
      'Googleyness includes creating psychological safety and inclusive environments',
      '"Think 10x not 10%" — frame your stories around bold, transformative impact',
      'Hiring committee (HC) reviews all feedback before offers — no individual interviewer can make the offer',
      'Show curiosity: "Great just isn\'t good enough" means ongoing learning is expected',
    ],
    compensation: [
      { role: 'L6 EM (Manager)', base: '$230-270K', total: '$450-650K (incl. GSU + bonus)' },
      { role: 'L7 EM (Sr Manager)', base: '$275-330K', total: '$650-950K (incl. GSU + bonus)' },
      { role: 'L8 Dir of Eng', base: '$350-450K', total: '$1M-1.8M+ (incl. GSU)' },
    ],
    cultureSignals: [
      'Evidence-based decision making — opinions backed by data win',
      'Long-term investment in platform and infrastructure',
      'Collaborative culture — Google consensus matters',
      'Intellectual depth — be ready to go deep on any topic you mention',
      'Openness to failure as a learning opportunity',
    ],
    redFlags: [
      'Overconfidence without data — "I just knew it was right"',
      'Inability to articulate how you\'ve created inclusive or psychologically safe environments',
      'Treating the Googleyness round as unimportant — it is a real evaluation with real weight',
      'Not asking clarifying questions in the system design or coding rounds',
    ],
    processNotes: 'The Hiring Committee (HC) makes all offer decisions — no single interviewer can approve or block an offer alone. All interviewers submit written scorecards before the HC meeting. Typical timeline from screen to offer: 6-12 weeks. Google\'s levels are notoriously conservative — most external hires come in 1 level below their previous role.',
  },

  apple: {
    name: 'Apple',
    gradient: 'from-gray-600 to-gray-900',
    textColor: 'text-gray-700 dark:text-gray-300',
    tagline: 'Craft, taste, and deep collaboration. Apple is secretive and process-heavy.',
    rounds: [
      { name: 'Recruiter Screen', duration: '30 min', focus: 'Confidentiality norms, background, motivation' },
      { name: 'HM Interview', duration: '60 min', focus: 'Leadership style, team fit, product philosophy' },
      { name: 'Peer Interviews', duration: '45 min each', focus: 'Collaboration style, conflict resolution, technical depth' },
      { name: 'Cross-Functional', duration: '60 min', focus: 'Working with Design, Hardware, Operations teams' },
      { name: 'Skip-Level', duration: '60 min', focus: 'Strategic vision, org leadership breadth' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you had to say no to a feature request.' },
      { q: 'Describe how you\'ve maintained quality standards under extreme pressure.' },
      { q: 'Tell me about a time you collaborated deeply with a design team on a complex product.' },
      { q: 'Describe a product decision where taste and craft mattered as much as data.' },
      { q: 'How do you think about privacy as a product constraint?' },
      { q: 'Tell me about a time you simplified something that others thought was too complex to simplify.' },
    ],
    tips: [
      'Do NOT discuss confidential work details from previous companies — Apple takes this very seriously',
      'Craft and taste are evaluated: how have you made something beautiful and simple?',
      'Apple is highly matrixed — demonstrate skill at navigating org complexity without authority',
      'Show commitment to quality over speed — Apple\'s pace is deliberate',
      'Privacy as a human right: demonstrate genuine belief in user privacy, not just compliance',
      'Interview process is slow: 6-16 weeks from screen to offer is common — be patient',
    ],
    compensation: [
      { role: 'ICT4 EM (Manager)', base: '$220-260K', total: '$380-550K (incl. RSU + bonus)' },
      { role: 'ICT5 Sr EM (Sr Manager)', base: '$260-310K', total: '$550-800K (incl. RSU)' },
      { role: 'ICT6 Director', base: '$320-400K', total: '$850K-1.4M+ (incl. RSU)' },
    ],
    cultureSignals: [
      'Attention to every detail — Apple people care about pixels and milliseconds',
      'Long-term commitment: Apple tenure is long, retention is high',
      'Secrecy culture: what happens at Apple stays at Apple',
      'Deep collaboration across hardware, software, services',
      'Perfection orientation — "good enough" is rarely enough',
    ],
    redFlags: [
      'Sharing confidential technical details about previous employers',
      'Prioritizing speed over quality ("move fast and break things" mindset)',
      'Lack of product taste — no examples of making elegant, simple experiences',
      'Inability to work in a highly matrixed, secretive org structure',
    ],
    processNotes: 'Apple has one of the most opaque hiring processes in FAANG. Positions often have multiple hiring managers competing for the same candidate. The process is highly confidential — you may not know what team you\'re interviewing for until late stages. Timeline is slow by design. Offers are typically not negotiable on equity but sometimes on base.',
  },

  netflix: {
    name: 'Netflix',
    gradient: 'from-red-600 to-red-700',
    textColor: 'text-red-600',
    tagline: '"Stunning colleagues in a dream team." High freedom, high responsibility, no brilliant jerks.',
    rounds: [
      { name: 'Recruiter Screen', duration: '30 min', focus: 'Culture fit pre-screen, comp expectations' },
      { name: 'HM Interview', duration: '60 min', focus: 'Culture and values alignment — this is weighted heavily' },
      { name: 'People Management', duration: '60 min', focus: 'Team development, candid feedback, talent density' },
      { name: 'Technical Leadership', duration: '60 min', focus: 'Architecture decisions, technical depth as a manager' },
      { name: 'Cross-Functional', duration: '60 min', focus: 'Stakeholder management, influence, business judgment' },
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
      'Netflix\'s biggest filter: High EQ + High performance together — one without the other is disqualifying',
      '"Brilliant Jerks" are explicitly rejected — even if someone is exceptional technically',
      '"Context not control" is a real philosophy — show examples of trusting your team',
      'Netflix is data-heavy: all product and people decisions are quantified',
      'The "Keeper Test" — would the manager fight to keep this person? Be ready to apply this to your team stories',
      'Comp is top-of-market all-cash — no equity. Be ready for a very different comp conversation',
    ],
    compensation: [
      { role: 'EM (Manager)', base: '$350-450K', total: '$350-450K (all salary, no equity)' },
      { role: 'Senior EM (Sr Manager)', base: '$450-600K', total: '$450-600K (all salary)' },
      { role: 'Director of Eng', base: '$600-800K', total: '$600-800K (all salary)' },
    ],
    cultureSignals: [
      'Radical candor is real — they practice difficult feedback openly',
      'High talent density: everyone is exceptional, not just senior',
      'Strong written communication — culture of memos over slide decks',
      'Autonomy with accountability — you own your decisions fully',
      'Data fluency across all roles including people management',
    ],
    redFlags: [
      'Stories where you micromanaged rather than trusted your team',
      'Inability to give direct, uncomfortable feedback with compassion',
      'Tolerating underperformance — Netflix would rather reduce team size than accept mediocrity',
      'Equity-focused candidates: Netflix is all-cash, all the time',
    ],
    processNotes: 'Netflix culture is genuine — the "Culture Deck" is still the operating manual. The interview is 50%+ culture evaluation. All compensation is salary-based (top of market). Performance reviews are continuous rather than annual cycles. Netflix moves quickly when interested — typical process is 3-5 weeks.',
  },

  microsoft: {
    name: 'Microsoft',
    gradient: 'from-blue-700 to-blue-900',
    textColor: 'text-blue-700',
    tagline: 'Growth mindset + inclusive leadership. The world\'s largest software company — impact at scale.',
    rounds: [
      { name: 'Recruiter Screen', duration: '30 min', focus: 'Experience, motivation, level calibration' },
      { name: 'HM Interview', duration: '60 min', focus: 'Team fit, growth mindset, leadership style' },
      { name: 'People Management', duration: '60 min', focus: 'Coaching, inclusion, performance, hiring' },
      { name: 'Technical Leadership', duration: '60 min', focus: 'Architecture decisions, platform thinking' },
      { name: 'Cross-Group Collaboration', duration: '60 min', focus: 'Working across Microsoft\'s matrix org' },
      { name: 'Executive Interview', duration: '60 min', focus: 'Vision, strategic alignment, One Microsoft thinking' },
    ],
    topQuestions: [
      { q: 'Tell me about a time you had to learn something completely new quickly.' },
      { q: 'Describe how you\'ve managed a diverse team across cultures and time zones.' },
      { q: 'How have you driven significant organizational change in a large company?' },
      { q: 'Tell me about a time you failed and what you changed about yourself as a result.' },
      { q: 'Describe how you\'ve built an inclusive hiring pipeline.' },
      { q: 'How do you help your team members grow into the next level of their career?' },
    ],
    tips: [
      'Growth Mindset is the #1 filter — Satya Nadella made it the cultural cornerstone',
      'Show openness to feedback and willingness to change based on what you learn',
      '"One Microsoft" thinking: demonstrate cross-org collaboration, not silo mentality',
      'Microsoft values diversity and inclusion deeply — have concrete examples',
      'Technical depth still matters even at senior manager levels',
      'Microsoft\'s process is more structured and formal than Meta or Netflix',
    ],
    compensation: [
      { role: 'L63 EM (Manager)', base: '$195-235K', total: '$380-520K (incl. RSU + bonus)' },
      { role: 'L65 Sr EM (Sr Manager)', base: '$240-290K', total: '$500-750K (incl. RSU)' },
      { role: 'L67 Principal EM / Director', base: '$290-380K', total: '$700K-1.2M (incl. RSU)' },
    ],
    cultureSignals: [
      'Genuine commitment to diversity, equity, and inclusion at all levels',
      'Enterprise and developer empathy — Microsoft\'s customers are companies and developers',
      'Long-term investment: Microsoft plays multi-decade games (Azure, AI, Gaming)',
      'Collaboration culture — no sharp elbows, strong "One Microsoft" identity',
      'Data and evidence drive decisions, but storytelling matters too',
    ],
    redFlags: [
      'Fixed mindset stories — "I already know how to do this" without growth arc',
      'Inability to work in a highly matrixed, large org environment',
      'Stories that show lack of inclusion awareness or diverse team building',
      'Viewing cross-team dependencies as obstacles rather than collaboration opportunities',
    ],
    processNotes: 'Microsoft has standardized interview kits and rubrics. As-Appropriate (AA) reviews can escalate to senior leadership for senior hires. Debrief is structured and written. Microsoft moves at a corporate pace: 6-12 weeks from screen to offer is typical. Comp is competitive but negotiable — especially RSU grants for senior hires.',
  },
}

export default function CompanyPage({ params }: { params: { company: string } }) {
  const data = companyData[params.company.toLowerCase()]
  if (!data) notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
          <ArrowLeft className="h-4 w-4" /> All Companies
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className={`rounded-2xl bg-gradient-to-r ${data.gradient} p-8 text-white shadow-2xl`}>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{data.name} Interview Guide</h1>
                <p className="mt-1 text-white/80">{data.tagline}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Interview Process */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <Clock className="h-5 w-5 text-blue-500" /> Interview Process
            </h2>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{data.processNotes}</p>
            <div className="space-y-3">
              {data.rounds.map((round, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 dark:text-white">{round.name}</span>
                      <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">{round.duration}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{round.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Questions */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
              <Star className="h-5 w-5 text-yellow-500" /> Most Asked Questions
            </h2>
            <div className="space-y-3">
              {data.topQuestions.map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4 dark:border-gray-700">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{i + 1}. {item.q}</p>
                  {item.lp && (
                    <span className="mt-1 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                      LP: {item.lp}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tips + Compensation */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl bg-amber-50 p-6 shadow-lg dark:bg-amber-900/20">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-800 dark:text-amber-300">
                <Lightbulb className="h-5 w-5" /> Interview Tips
              </h2>
              <ul className="space-y-3">
                {data.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="rounded-2xl bg-green-50 p-6 shadow-lg dark:bg-green-900/20">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-800 dark:text-green-300">
                <DollarSign className="h-5 w-5" /> 2025 Compensation Bands
              </h2>
              <div className="space-y-3">
                {data.compensation.map((comp, i) => (
                  <div key={i} className="rounded-xl bg-white p-3 shadow-sm dark:bg-gray-800">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{comp.role}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Base: {comp.base}</p>
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">Total: {comp.total}</p>
                  </div>
                ))}
                <p className="text-xs text-green-700 dark:text-green-400 opacity-70">*Ranges vary by location, experience, and negotiation. Source: levels.fyi + recent reports.</p>
              </div>
            </motion.div>
          </div>

          {/* Culture Signals + Red Flags */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                <Users className="h-5 w-5 text-blue-500" /> What They Really Evaluate
              </h2>
              <ul className="space-y-2">
                {data.cultureSignals.map((signal, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {signal}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="rounded-2xl bg-red-50 p-6 shadow-lg dark:bg-red-900/20">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-800 dark:text-red-300">
                <AlertTriangle className="h-5 w-5" /> Candidacy Killers
              </h2>
              <ul className="space-y-2">
                {data.redFlags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    {flag}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

