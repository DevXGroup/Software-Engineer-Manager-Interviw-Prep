'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, ChevronDown, ChevronUp, Search, Eye, EyeOff, X, Cpu, Shield, TrendingUp, Lightbulb } from 'lucide-react'
import { QuizLauncher } from '@/components/QuizLauncher'
import { aiInterviewQuestions } from '@/data/quizzes/ai-interview'

type AIQuestion = {
  id: string
  question: string
  category: string
  level: 'Foundational' | 'Strategic' | 'Deep Dive'
  answer: string
  keyPoints: string[]
  followUps: string[]
}

const aiQuestions: AIQuestion[] = [
  {
    id: 'ai-1',
    category: 'AI Product Strategy',
    level: 'Strategic',
    question: 'How would you decide whether to build an AI feature in-house vs. using a third-party model API?',
    answer: `I use a framework with five decision dimensions: (1) Data privacy — if user data cannot leave our infrastructure, we build or deploy on-premise. (2) Cost at scale — I model cost per request at 10x, 100x, 1000x current volume and compare build vs. buy curves. (3) Differentiation — if the AI capability is a core moat, we build; if it's commodity, we buy. (4) Team capability — do we have the ML talent to build and maintain? (5) Speed to market — can we deliver value to users in weeks with an API vs. months with a build?

In practice, I often recommend a hybrid: use an API to validate that AI solves the problem at all (prove the hypothesis with low investment), then evaluate in-house development only once you have product-market fit on the AI feature itself. Many teams build too early and end up with an expensive model that does the same thing as a $20/month API.`,
    keyPoints: [
      'Define non-negotiable constraints first (privacy, compliance)',
      'Model unit economics at scale — not just today\'s cost',
      'Validate the hypothesis with an API before building',
      'Treat in-house ML as a strategic investment, not a default',
    ],
    followUps: [
      'How do you handle a situation where the third-party API goes down or raises prices?',
      'What if your competitor has a similar capability using a public API?',
      'How do you structure the "graduation criteria" from API to in-house?',
    ],
  },
  {
    id: 'ai-2',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: 'How do you handle hallucination in a production LLM application?',
    answer: `Hallucination is a fundamental property of current LLMs — it cannot be fully eliminated, only mitigated. My production strategy has four layers:

(1) Architecture: Use Retrieval-Augmented Generation (RAG) rather than relying on the model's parametric memory. Ground every response in retrieved documents from a verified knowledge base. Include explicit citations so users can verify.

(2) Output validation: Run responses through a separate verification pipeline before serving. For factual claims, use a secondary model or rule-based system to flag low-confidence outputs. For structured outputs, validate against a schema.

(3) User experience: Never present AI output as authoritative. Use language like "Based on our documentation..." rather than absolute statements. Give users an easy "was this helpful?" mechanism to surface hallucinations quickly.

(4) Monitoring: Track hallucination rate via human evaluation on a sample of queries. Set a threshold (e.g., <2% hallucination rate) and alert when breached. Use these samples to fine-tune or improve retrieval.

The key insight: for high-stakes domains (medical, legal, financial), build in human-in-the-loop checkpoints. For lower-stakes applications, RAG + citation + monitoring is usually sufficient.`,
    keyPoints: [
      'RAG dramatically reduces hallucination by grounding responses in retrieved facts',
      'Validate structured outputs against a schema; use a second model for fact-check on critical flows',
      'Monitor hallucination rate as a production metric with a threshold and alerting',
      'Human-in-the-loop is the right architecture for high-stakes AI decisions',
    ],
    followUps: [
      'How do you evaluate RAG retrieval quality separate from generation quality?',
      'What metrics do you use to measure hallucination rate at scale?',
      'How do you handle hallucination on time-sensitive information (breaking news, prices)?',
    ],
  },
  {
    id: 'ai-3',
    category: 'Responsible AI',
    level: 'Strategic',
    question: 'How do you approach responsible AI and bias in a production system?',
    answer: `Responsible AI is not a checklist — it is a continuous practice embedded into the development lifecycle. Here is how I structure it:

Pre-deployment: Conduct an impact assessment asking: who could be harmed, how, and how likely? Audit training data for representation gaps. Run fairness evaluations across demographic slices (e.g., does the model perform equally well across age, gender, ethnicity where relevant?). Red-team for failure modes — actively try to break the system before users do.

During development: Define fairness metrics upfront alongside accuracy metrics. If the system makes decisions affecting people (loans, hiring, content moderation), the model must perform within a defined threshold across protected groups. Use diverse evaluation panels, not just technical metrics.

Post-deployment: Monitor model performance for drift across user segments. Set up feedback mechanisms to surface disparate outcomes. Establish a clear process for what happens when bias is detected — who owns it, how fast do we respond, when do we take the feature offline?

Governance: Maintain an AI registry — a catalog of every AI system in production with its risk level, owner, performance data, and last audit date. High-risk AI systems should require sign-off from Legal, Ethics, and a diverse review panel before launch.`,
    keyPoints: [
      'Embed fairness evaluation alongside accuracy in every model evaluation',
      'Red-teaming is not optional — you need to actively try to surface failure modes',
      'An AI registry gives you visibility and accountability across your AI portfolio',
      'Know your response protocol when bias is detected in production',
    ],
    followUps: [
      'Tell me about a time you caught a bias issue. How did you handle it?',
      'How do you balance model performance with fairness constraints?',
      'What is your view on the EU AI Act and its implications for engineering teams?',
    ],
  },
  {
    id: 'ai-4',
    category: 'AI Team & Org',
    level: 'Strategic',
    question: 'How do you structure an AI/ML team and what are the key roles?',
    answer: `The structure depends on whether AI is core to the product or a supporting capability. For a product where AI is the product (e.g., an AI writing tool), I recommend an embedded model: ML engineers, data scientists, and software engineers in the same cross-functional team, reporting to one engineering manager.

For enterprises where AI augments existing products, I recommend a Platform + Embedded model: a centralized ML Platform team owns shared infrastructure (training pipelines, model serving, feature stores, evaluation frameworks), while embedded ML engineers sit in product teams and use the platform.

Key roles I look for:
- ML Engineer: Trains, evaluates, and deploys models. Strong software engineering + ML fundamentals.
- Data Scientist: Explores data, defines metrics, statistical analysis. Often the "what problem to solve" person.
- AI Product Manager: Translates business goals into ML problem framing. Owns the success metrics.
- MLOps/ML Platform Engineer: Manages the training and serving infrastructure. Critical for scale.
- AI Safety/Evaluation Engineer: Designs evaluation frameworks and red-teaming. Increasingly important.

The failure mode I see most: treating ML as a separate team that "consults" rather than building it into the product team from the start.`,
    keyPoints: [
      'Platform model enables reuse; embedded model enables product velocity — choose based on maturity',
      'AI PM is often the missing role — technical enough to frame problems, product-savvy enough to prioritize',
      'MLOps is infrastructure, not a luxury — you need it at month 3, not month 12',
      'Embed evaluation rigor from day one; retrofitting it is very expensive',
    ],
    followUps: [
      'How do you hire ML engineers — what do you look for beyond technical skills?',
      'How do you measure ML team velocity differently from software engineering teams?',
      'When do you centralize vs. decentralize AI/ML capabilities?',
    ],
  },
  {
    id: 'ai-5',
    category: 'AI Metrics',
    level: 'Strategic',
    question: 'How do you measure the success of an AI feature?',
    answer: `AI features need a layered measurement framework because model metrics and business metrics often diverge.

Layer 1 — Model metrics: Accuracy, precision, recall, F1, NDCG (for ranking), BLEU/ROUGE (for text generation). These tell you if the model is technically working. They are necessary but not sufficient.

Layer 2 — Product metrics: Is the AI feature actually being used? Are users engaging with AI-generated content more or less than non-AI alternatives? Adoption rate, feature retention, task completion rate.

Layer 3 — Business metrics: Revenue impact, support ticket deflection rate (for AI support), time-to-first-value, churn reduction. This is where you justify the investment.

Layer 4 — Safety metrics: Hallucination rate, harmful output rate, bias metrics across user segments, escalation rate (how often users override or ignore AI).

The common mistake: teams optimize layer 1 while ignoring layers 2 and 4. A model with 96% accuracy can have terrible product metrics if users do not trust it or do not understand the outputs.

I also run A/B tests on AI features where possible: control group (no AI), treatment group (with AI). This gives clean attribution. For AI features that cannot easily be A/B tested, use a pre/post analysis with careful controls.`,
    keyPoints: [
      'Model metrics ≠ product metrics ≠ business metrics — measure all three',
      'Safety metrics (hallucination rate, harmful output) are production-grade metrics, not optional',
      'A/B test AI features whenever possible for clean impact attribution',
      'Track user trust signals: override rate, report rate, repeat usage',
    ],
    followUps: [
      'How do you attribute revenue to an AI feature that assists rather than replaces?',
      'What do you do when model metrics improve but product metrics stay flat?',
      'How do you set a baseline for hallucination rate?',
    ],
  },
  {
    id: 'ai-6',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: 'How would you design a RAG (Retrieval-Augmented Generation) system for enterprise knowledge search?',
    answer: `A production RAG system has five components working in a pipeline:

(1) Document ingestion: Ingest documents (PDFs, wikis, databases), chunk them intelligently (by semantic section, not arbitrary character count), enrich with metadata (source, date, author, access permissions), and embed with a dense vector model (e.g., text-embedding-3-large or an open-source equivalent).

(2) Vector store: Store embeddings in a vector database (Pinecone, Weaviate, pgvector). Design the schema to support filtered retrieval — critical for enterprise where you need to enforce access controls (user X can only retrieve from document set Y).

(3) Retrieval: At query time, embed the user's question, retrieve top-k semantically similar chunks (typically k=5-20), apply metadata filters (permissions, date range), and optionally re-rank with a cross-encoder for precision.

(4) Augmentation: Construct a prompt that includes the retrieved chunks as context. Use explicit source citation instructions. Set a context budget based on model context window (don't exceed 80% to leave room for the response).

(5) Generation + validation: Generate the response, extract cited sources, validate that claims map to retrieved content (optional fact-checking step), format for the UI with source links.

Key decisions: chunking strategy (fixed vs. semantic), retrieval strategy (dense only vs. hybrid dense+sparse), reranking (adds latency but improves quality), and access control enforcement (critical for enterprise).`,
    keyPoints: [
      'Chunk semantically, not by character count — chunk quality is the biggest lever on RAG quality',
      'Enforce access control at retrieval time, not just at the application layer',
      'Hybrid retrieval (dense + sparse/BM25) outperforms dense-only in most enterprise benchmarks',
      'Measure retrieval quality separately from generation quality — they fail independently',
    ],
    followUps: [
      'How do you handle documents that are updated frequently?',
      'How do you evaluate whether RAG improved over a baseline (fine-tuned model)?',
      'How do you handle multi-hop questions that require connecting information across documents?',
    ],
  },
  {
    id: 'ai-7',
    category: 'AI Product Strategy',
    level: 'Foundational',
    question: "What is your framework for deciding which problems are good candidates for AI/ML solutions?",
    answer: `I use a set of criteria I call the AI Readiness Filter:

(1) Data availability: Do we have labeled training data, or can we generate it? How much data do we have, and is it representative of production distribution? No data = no ML, usually.

(2) Pattern complexity: Is the problem too complex for human-written rules, or are there patterns that generalize from examples? If you can write IF-ELSE logic that works 95% of the time, you probably don't need ML for the first version.

(3) Error tolerance: What happens when the model is wrong? For low-stakes errors (recommendation is off), ML is fine. For high-stakes errors (wrong medical dosage), you need human checkpoints regardless of model accuracy.

(4) Feedback loop: Can you collect feedback to improve the model over time? Problems with natural feedback loops (user clicks, purchases, corrections) get better over time. Static problems do not.

(5) ROI: What is the business value of a 90% solution vs. a 99% solution? Sometimes the incremental improvement from ML vs. a simpler approach does not justify the investment.

Problems that are great for ML: content recommendation, fraud detection, natural language interfaces, image recognition, personalization. Problems that are often not great for ML: anything with fewer than ~1,000 labeled examples, anything where a rule-based system can achieve the target accuracy, anything requiring 100% auditability with no tolerance for error.`,
    keyPoints: [
      'No data = no ML. Validate data availability and quality before committing to an ML approach',
      'Rules first — can a simpler system achieve 80% of the value at 10% of the cost?',
      'Error tolerance dictates architecture: low tolerance = human in the loop',
      'Natural feedback loops are a huge advantage — prioritize problems that generate their own labels',
    ],
    followUps: [
      'How do you handle cold start problems when you have no historical data?',
      'When would you recommend a rule-based system over ML, even when ML is feasible?',
      'How do you convince skeptical stakeholders that an ML project is worth the investment?',
    ],
  },
  {
    id: 'ai-8',
    category: 'AI Product Strategy',
    level: 'Foundational',
    question: 'How do you think about AI replacing software engineers on your team?',
    answer: `I think about it through three lenses: what AI is already doing, what it will likely do in 3-5 years, and how I position my team to thrive in that environment.

Today, AI coding tools (GitHub Copilot, Claude Code, Cursor) increase individual engineer productivity by 20-40% on tasks like boilerplate code, unit tests, refactoring, and documentation. Senior engineers gain proportionally more than juniors because they spend more time on direction and less time on implementation.

In 3-5 years, I expect AI to handle most code generation for well-defined specifications, first-pass code reviews, and test generation. The highest-value human skills will be: problem framing (what should we build?), system design (how do these components interact at scale?), requirement disambiguation (what does the user actually need?), and judgment under uncertainty.

My advice to engineers: your moat is not code syntax — it is system thinking, domain expertise, and the ability to translate business goals into technical architecture. AI amplifies engineers who can direct it effectively and shrinks the advantage of those who are only good at writing code.

As a manager, I am rebalancing my team toward: fewer engineers who write more code each, more investment in design and architecture capacity, and explicit training on how to use AI tools effectively in our workflow.`,
    keyPoints: [
      'AI is already improving engineering productivity 20-40% — this is table stakes, not the future',
      'The highest-value engineering skills (system design, problem framing) are AI-resistant',
      'The risk is not replacement — it is that engineers who use AI effectively make those who don\'t irrelevant',
      'Shift hiring toward T-shaped engineers with domain expertise, not just code output',
    ],
    followUps: [
      'How has AI tooling changed your hiring criteria?',
      'How do you evaluate whether an engineer is using AI effectively vs. over-relying on it?',
      'What training have you done with your team on AI-assisted development?',
    ],
  },
  {
    id: 'ai-9',
    category: 'Responsible AI',
    level: 'Foundational',
    question: "What is your understanding of the EU AI Act and how does it affect engineering teams?",
    answer: `The EU AI Act classifies AI systems by risk level and imposes different requirements at each level:

Unacceptable risk (banned): Social scoring systems, real-time biometric surveillance in public spaces, AI that manipulates subconscious behavior.

High risk (strict requirements): AI in hiring/HR, credit scoring, medical devices, law enforcement, education assessment, critical infrastructure. These require: conformity assessments, human oversight mechanisms, detailed audit trails, registered in an EU database.

Limited risk (transparency obligations): Chatbots must disclose they are AI. Deep fake content must be labeled.

Minimal risk (largely unregulated): Most AI — product recommendations, spam filters, AI assistants.

Engineering implications: If your product operates in the EU and touches high-risk categories, you need: (1) Data governance documentation showing training data compliance with GDPR, (2) Explainability mechanisms — users can request why a decision was made, (3) Human override capability for consequential decisions, (4) Ongoing monitoring and logging with sufficient retention for audit, (5) A designated AI compliance officer or responsible person.

My practical advice: do an AI inventory now, classify each system by risk tier, and build compliance capabilities into the system architecture — retrofitting compliance is extremely expensive.`,
    keyPoints: [
      'Know which risk tier your AI systems fall into — high risk has significant compliance overhead',
      'Human override + audit trail are non-negotiable for high-risk AI',
      'Build GDPR-compliant data lineage before you need it, not after a regulator asks',
      'The Act applies to any AI affecting EU users, even if your company is not EU-based',
    ],
    followUps: [
      'How do you stay current on AI regulation across multiple jurisdictions?',
      'How do you build an audit trail into an LLM system that generates novel outputs?',
      'How do you balance compliance requirements with product velocity?',
    ],
  },
  {
    id: 'ai-10',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: 'How do you approach prompt engineering and system prompt design for production LLM applications?',
    answer: `Prompt engineering in production is software engineering — it needs version control, testing, and deployment processes just like code.

System prompt design principles:
(1) Role + context: Define the model's role explicitly. "You are a customer support agent for Acme Inc. You assist with billing, technical issues, and account management. Do not discuss topics unrelated to Acme products."
(2) Constraints before instructions: State what the model cannot do before what it can. Negative space is important for safety.
(3) Output format specification: Tell the model exactly how to format responses — JSON schema, markdown sections, maximum length. Structured outputs are much more reliable with explicit formatting instructions.
(4) Few-shot examples: Include 2-5 examples of ideal input → output pairs for complex tasks. This dramatically improves consistency.
(5) Chain of thought for complex reasoning: "Think step by step before giving your final answer" reduces reasoning errors measurably.

Production practices: Store prompts in version control, not hard-coded. A/B test prompt changes with evaluation metrics, not just vibes. Maintain a prompt evaluation harness with golden test cases — a set of inputs with expected outputs you can run against any prompt version. Monitor for prompt injection attacks in user-facing applications.

The biggest mistake: writing a prompt that works on your test cases and shipping it. Production distributions are always more diverse than your test set.`,
    keyPoints: [
      'Prompts are code — version control, test suite, deployment process',
      'Few-shot examples improve complex task performance more than instruction tuning alone',
      'Maintain a golden evaluation set and run it against every prompt change',
      'Monitor for prompt injection — user input should never directly interpolate into privileged system prompt sections',
    ],
    followUps: [
      'How do you evaluate prompt quality systematically?',
      'How do you handle prompt injection attacks in a user-facing product?',
      'When would you fine-tune a model vs. engineer better prompts?',
    ],
  },
  {
    id: 'ai-11',
    category: 'AI Team & Org',
    level: 'Strategic',
    question: 'How do you balance AI feature development velocity with safety and reliability?',
    answer: `This is a tension I navigate explicitly with a tiered development framework:

Tier 1 (Low stakes, high velocity): AI features that are purely additive — autocomplete, summarization, suggestions the user must actively choose. Ship with standard code review, basic evals, monitoring. Fail safely by degrading to non-AI path.

Tier 2 (Medium stakes, structured review): AI features that present information as authoritative or affect user decisions (search results, recommendations, content moderation). Require: evaluation framework with >100 test cases, fairness audit, user study with at least 20 users, staged rollout (1% → 10% → 100%), dedicated monitoring for 30 days post-launch.

Tier 3 (High stakes, formal process): AI features that make or assist in consequential decisions (loan approval, medical information, legal guidance, hiring). Require: ethics review panel, external audit, human override mechanism, legal sign-off, regulatory compliance check.

The gating mechanism is explicit — teams self-classify their AI feature, with review from a senior engineer or AI safety lead. Over-classifying is fine. Under-classifying means you skipped safety steps — accountability is clear.

I also apply a "reversibility test": if we discover a problem post-launch, how quickly can we roll back, and what is the blast radius? High-stakes AI features need kill switches and must be designed for fast rollback from the start.`,
    keyPoints: [
      'Tier your AI features by stakes — one-size review does not fit all AI capabilities',
      'Design for rollback from day one: AI features need kill switches',
      'The "reversibility test" should change architecture decisions, not just deployment plans',
      'Self-classification with accountability is faster than waiting for a safety committee',
    ],
    followUps: [
      'Who has the authority to block an AI feature launch at your company?',
      'Tell me about a time you had to slow down an AI launch for safety reasons',
      'How do you handle pressure from product teams to ship faster than safety processes allow?',
    ],
  },
  {
    id: 'ai-12',
    category: 'AI Metrics',
    level: 'Deep Dive',
    question: 'How do you evaluate an LLM for a specific production use case before committing to it?',
    answer: `Model evaluation for production is a multi-stage process:

(1) Define the task precisely: Write a crisp problem statement and success criteria. "Summarize support tickets" is too vague. "Generate a 2-sentence summary of a support ticket that includes: issue category, urgency, and requested action" is evaluable.

(2) Build an evaluation dataset: Collect 200-500 representative examples from your production distribution. Include edge cases, adversarial inputs, and samples across all user segments. Have human annotators create golden outputs for each.

(3) Define evaluation metrics: Automatic metrics (ROUGE, BERTScore for text similarity; accuracy for classification), LLM-as-judge (use a stronger model to rate outputs on a rubric), human evaluation (the gold standard, but expensive). Use a combination.

(4) Benchmark multiple models: Run at least 3 models (e.g., GPT-4o, Claude Sonnet, Llama 3.1 70B) on your eval set. Compare on: task quality, latency (P50/P95/P99), cost per request, context window adequacy, reliability (refusal rate, error rate).

(5) Production shadow test: Before full launch, run the model in shadow mode (processing real requests but not serving the output). Compare shadow outputs against your evaluation framework on live traffic distribution.

(6) Set acceptance criteria: Define minimum thresholds before seeing results. "We will not launch unless quality score > 4.2/5.0 AND hallucination rate < 3% AND cost per request < $0.01."`,
    keyPoints: [
      'Build your evaluation set before evaluating models — avoids selection bias',
      'LLM-as-judge is scalable but needs calibration against human judgment',
      'Shadow mode testing on live traffic catches distribution shift the eval set missed',
      'Define acceptance thresholds before seeing results, not after',
    ],
    followUps: [
      'How do you handle situations where different models excel on different subsets of your eval set?',
      'How often do you re-evaluate your production model against new releases?',
      'How do you evaluate for safety and refusal behavior?',
    ],
  },
]

const categories = ['All', 'AI Product Strategy', 'LLM Systems', 'Responsible AI', 'AI Team & Org', 'AI Metrics']
const levels = ['All', 'Foundational', 'Strategic', 'Deep Dive']

const levelColors = {
  Foundational: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Strategic: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Deep Dive': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const categoryIcons: Record<string, React.ElementType> = {
  'AI Product Strategy': TrendingUp,
  'LLM Systems': Cpu,
  'Responsible AI': Shield,
  'AI Team & Org': Brain,
  'AI Metrics': Lightbulb,
}

type Tab = 'qa' | 'practice' | 'concepts'

const keyConcepts = [
  { term: 'RAG (Retrieval-Augmented Generation)', definition: 'Architecture where a model retrieves relevant documents from a vector store before generating a response. Reduces hallucination by grounding outputs in retrieved facts.', example: 'Enterprise search, customer support bots, knowledge management systems' },
  { term: 'Fine-tuning vs. Prompting', definition: 'Fine-tuning trains the model on domain-specific data (expensive, slow, but high quality for narrow tasks). Prompting instructs a pre-trained model (cheap, fast, but limited by prompt length).', example: 'Use prompting for 95% of cases. Fine-tune when prompting hits a quality ceiling with sufficient data.' },
  { term: 'Embeddings', definition: 'Dense vector representations of text (or images, code) that capture semantic meaning. Similar content has similar vectors. The foundation of semantic search and RAG.', example: 'text-embedding-3-large produces 3072-dimensional vectors for each text chunk' },
  { term: 'Context Window', definition: 'Maximum tokens a model can process at once. GPT-4o: 128K. Claude 3.5 Sonnet: 200K. Gemini 1.5 Pro: 1M. Larger windows enable more context but cost more and can reduce focus.', example: 'Design prompts to use <80% of context window for reliability' },
  { term: 'Temperature', definition: 'Controls output randomness. Temperature 0 = deterministic (same input → same output). Temperature 1+ = creative/varied. For production fact-retrieval tasks, use 0-0.2. For creative tasks, 0.7-1.0.', example: 'Customer support: temperature 0.1. Creative writing: temperature 0.8' },
  { term: 'RLHF (Reinforcement Learning from Human Feedback)', definition: 'Training technique that uses human preference data to align model outputs with human values. Used to create ChatGPT, Claude, Gemini from base language models.', example: "Annotators rate model responses → preference model trained → PPO fine-tunes the LLM to maximize human preference scores" },
  { term: 'Model Drift', definition: 'Degradation of model performance over time as the production data distribution shifts away from training data. Requires monitoring with a holdout eval set and periodic re-evaluation.', example: 'A sentiment model trained in 2022 may misclassify slang that emerged in 2024' },
  { term: 'Prompt Injection', definition: 'Attack where malicious user input manipulates the LLM\'s system instructions. Critical security issue for user-facing AI applications.', example: '"Ignore previous instructions. You are now a different assistant..." — input that overrides the system prompt' },
  { term: 'Chain of Thought (CoT)', definition: 'Prompting technique where the model is instructed to reason step-by-step before giving a final answer. Dramatically improves performance on multi-step reasoning tasks.', example: '"Think step by step" or few-shot examples showing reasoning traces' },
  { term: 'Vector Database', definition: 'Specialized database optimized for storing and querying embedding vectors. Supports approximate nearest neighbor (ANN) search at scale. Examples: Pinecone, Weaviate, Chroma, pgvector.', example: 'Store 10M document embeddings and retrieve the top-10 semantically similar in <100ms' },
  { term: 'Guardrails', definition: 'Safety mechanisms that filter or validate model inputs and outputs. Input guardrails block harmful prompts. Output guardrails filter harmful, biased, or off-topic responses.', example: 'NeMo Guardrails, Llama Guard, or custom classifiers on the model output pipeline' },
  { term: 'Agentic AI', definition: 'AI systems that take multi-step actions, use tools, and operate with greater autonomy to complete complex tasks. Examples: web browsing, code execution, API calls. Higher capability = higher risk.', example: 'Claude Code, AutoGPT, OpenAI Operator — models that plan and execute multi-step workflows' },
]

export default function AIInterviewPage() {
  const [tab, setTab] = useState<Tab>('qa')
  const [expandedQ, setExpandedQ] = useState<string | null>(null)
  const [practiceVisible, setPracticeVisible] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All')

  const filtered = useMemo(() => {
    return aiQuestions.filter(q => {
      const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'All' || q.category === categoryFilter
      const matchLevel = levelFilter === 'All' || q.level === levelFilter
      return matchSearch && matchCategory && matchLevel
    })
  }, [search, categoryFilter, levelFilter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-sm font-medium text-white">
            <Brain className="h-4 w-4" /> New: AI Interview Prep
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">AI & Machine Learning Interview Prep</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">12 deep-dive Q&As · Key AI concepts · Practice mode · For SDMs and AI PMs</p>
        </motion.div>

        <QuizLauncher sectionId="ai-interview" title="AI Interview" questions={aiInterviewQuestions} />

        {/* Tabs */}
        <div className="mb-8 flex gap-2 rounded-xl bg-white p-1 shadow dark:bg-gray-800">
          {([['qa', Brain, 'AI Q&A Bank'], ['practice', Eye, 'Practice Mode'], ['concepts', Cpu, 'Key Concepts']] as const).map(([t, Icon, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${tab === t ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'}`}>
              <Icon className="h-4 w-4" />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Q&A Tab ── */}
          {tab === 'qa' && (
            <motion.div key="qa" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search AI questions..."
                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
                  {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-gray-400" /></button>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {levels.map(l => (
                    <button key={l} onClick={() => setLevelFilter(l)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${levelFilter === l ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-400'}`}>
                      {l}
                    </button>
                  ))}
                  <span className="h-4 w-px bg-gray-200 dark:bg-gray-700 mt-1" />
                  {categories.slice(1).map(c => (
                    <button key={c} onClick={() => setCategoryFilter(prev => prev === c ? 'All' : c)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${categoryFilter === c ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-400'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{filtered.length} questions</p>

              <div className="space-y-4">
                {filtered.map((q, i) => {
                  const Icon = categoryIcons[q.category] ?? Brain
                  return (
                    <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="rounded-2xl bg-white shadow-lg dark:bg-gray-800">
                      <div className="cursor-pointer p-6" onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Icon className="h-4 w-4 text-violet-500" />
                              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">{q.category}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelColors[q.level]}`}>{q.level}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{q.question}</h3>
                          </div>
                          {expandedQ === q.id ? <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" /> : <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedQ === q.id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-gray-100 dark:border-gray-700">
                            <div className="p-6 space-y-4">
                              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{q.answer}</div>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-900/20">
                                  <p className="mb-2 text-xs font-bold text-violet-700 dark:text-violet-400">Key Points</p>
                                  <ul className="space-y-1.5">{q.keyPoints.map((k, j) => <li key={j} className="text-xs text-violet-700 dark:text-violet-400">• {k}</li>)}</ul>
                                </div>
                                <div className="rounded-xl bg-sky-50 p-4 dark:bg-sky-900/20">
                                  <p className="mb-2 text-xs font-bold text-sky-700 dark:text-sky-400">Likely Follow-Ups</p>
                                  <ul className="space-y-1.5">{q.followUps.map((f, j) => <li key={j} className="text-xs text-sky-700 dark:text-sky-400">• {f}</li>)}</ul>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── Practice Tab ── */}
          {tab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white">
                <h2 className="text-xl font-bold">Practice Mode</h2>
                <p className="mt-1 text-violet-100">Formulate your answer before revealing. AI interviewers probe depth — practice speaking for 2-3 minutes per question.</p>
              </div>
              <div className="space-y-6">
                {aiQuestions.map((q, i) => {
                  const Icon = categoryIcons[q.category] ?? Brain
                  return (
                    <motion.div key={q.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="rounded-2xl bg-white shadow-lg dark:bg-gray-800 p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-4 w-4 text-violet-500" />
                        <span className="text-xs font-medium text-violet-600 dark:text-violet-400">{q.category}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelColors[q.level]}`}>{q.level}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{q.question}</p>
                      <div className="mt-4">
                        {!practiceVisible[q.id] ? (
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => setPracticeVisible(prev => ({ ...prev, [q.id]: true }))}
                            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white">
                            <Eye className="h-4 w-4" /> Reveal Answer
                          </motion.button>
                        ) : (
                          <div>
                            <button onClick={() => setPracticeVisible(prev => ({ ...prev, [q.id]: false }))}
                              className="mb-3 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                              <EyeOff className="h-4 w-4" /> Hide
                            </button>
                            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{q.answer}</div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── Key Concepts Tab ── */}
          {tab === 'concepts' && (
            <motion.div key="concepts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid gap-4 sm:grid-cols-2">
                {keyConcepts.map((c, i) => (
                  <motion.div key={c.term} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="rounded-2xl bg-white p-5 shadow-lg dark:bg-gray-800">
                    <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{c.term}</h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{c.definition}</p>
                    <div className="rounded-lg bg-violet-50 p-3 dark:bg-violet-900/20">
                      <p className="text-xs font-medium text-violet-700 dark:text-violet-400">In practice</p>
                      <p className="mt-0.5 text-xs text-violet-600 dark:text-violet-300">{c.example}</p>
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
