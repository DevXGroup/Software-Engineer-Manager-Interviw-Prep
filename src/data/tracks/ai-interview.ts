import { assertTrackIds } from '@/data/tracks/ids'
export type AIQuestion = {
  id: string
  question: string
  category: string
  level: 'Foundational' | 'Strategic' | 'Deep Dive'
  answer: string
  keyPoints: string[]
  followUps: string[]
}

export const aiQuestions: AIQuestion[] = [
  {
    id: 'build-vs-buy-ai-feature',
    category: 'AI Product Strategy',
    level: 'Strategic',
    question: 'How would you decide whether to build an AI feature in-house vs. using a third-party model API?',
    answer: `I use a framework with five decision dimensions: (1) Data privacy: if user data cannot leave our infrastructure, we build or deploy on-premise. (2) Cost at scale: I model cost per request at 10x, 100x, 1000x current volume and compare build vs. buy curves. (3) Differentiation: if the AI capability is a core moat, we build; if it's commodity, we buy. (4) Team capability: do we have the ML talent to build and maintain? (5) Speed to market: can we deliver value to users in weeks with an API vs. months with a build?

In practice, I often recommend a hybrid: use an API to validate that AI solves the problem at all (prove the hypothesis with low investment), then evaluate in-house development only once you have product-market fit on the AI feature itself. Many teams build too early and end up with an expensive model that does the same thing as a $20/month API.`,
    keyPoints: [
      'Define non-negotiable constraints first (privacy, compliance)',
      "Model unit economics at scale, not just today's cost",
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
    id: 'handling-hallucination-in-production',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: 'How do you handle hallucination in a production LLM application?',
    answer: `Hallucination is a fundamental property of current LLMs. It cannot be fully eliminated, only mitigated. My production strategy has four layers:

(1) Architecture: Use Retrieval-Augmented Generation (RAG) rather than relying on the model's parametric memory. Ground every response in retrieved documents from a verified knowledge base. Include explicit citations so users can verify.

(2) Output validation: Run responses through a separate verification pipeline before serving. For factual claims, use a secondary model or rule-based system to flag low-confidence outputs. For structured outputs, validate against a schema.

(3) User experience: Never present AI output as authoritative. Use language like "Based on our documentation..." rather than absolute statements. Give users an easy "was this helpful?" mechanism to surface hallucinations quickly.

(4) Monitoring: Track hallucination rate via human evaluation on a sample of queries. Set a threshold (e.g., under 2% hallucination rate) and alert when breached. Use these samples to fine-tune or improve retrieval.

The key insight: for high-stakes domains (medical, legal, financial), build in human-in-the-loop checkpoints. For lower-stakes applications, RAG plus citation plus monitoring is usually sufficient.`,
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
    id: 'responsible-ai-and-bias-in-production',
    category: 'Responsible AI',
    level: 'Strategic',
    question: 'How do you approach responsible AI and bias in a production system?',
    answer: `Responsible AI is not a checklist. It is a continuous practice embedded into the development lifecycle. Here is how I structure it:

Pre-deployment: Conduct an impact assessment asking: who could be harmed, how, and how likely? Audit training data for representation gaps. Run fairness evaluations across demographic slices (e.g., does the model perform equally well across age, gender, ethnicity where relevant?). Red-team for failure modes: actively try to break the system before users do.

During development: Define fairness metrics upfront alongside accuracy metrics. If the system makes decisions affecting people (loans, hiring, content moderation), the model must perform within a defined threshold across protected groups. Use diverse evaluation panels, not just technical metrics.

Post-deployment: Monitor model performance for drift across user segments. Set up feedback mechanisms to surface disparate outcomes. Establish a clear process for what happens when bias is detected: who owns it, how fast do we respond, when do we take the feature offline?

Governance: Maintain an AI registry, a catalog of every AI system in production with its risk level, owner, performance data, and last audit date. High-risk AI systems should require sign-off from Legal, Ethics, and a diverse review panel before launch.`,
    keyPoints: [
      'Embed fairness evaluation alongside accuracy in every model evaluation',
      'Red-teaming is not optional: you need to actively try to surface failure modes',
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
    id: 'structuring-an-ai-ml-team',
    category: 'AI Team & Org',
    level: 'Strategic',
    question: 'How do you structure an AI/ML team and what are the key roles?',
    answer: `The structure depends on whether AI is core to the product or a supporting capability. For a product where AI is the product (e.g., an AI writing tool), I recommend an embedded model: ML engineers, data scientists, and software engineers in the same cross-functional team, reporting to one engineering manager.

For enterprises where AI augments existing products, I recommend a Platform plus Embedded model: a centralized ML Platform team owns shared infrastructure (training pipelines, model serving, feature stores, evaluation frameworks), while embedded ML engineers sit in product teams and use the platform.

Key roles I look for:
- ML Engineer: Trains, evaluates, and deploys models. Strong software engineering plus ML fundamentals.
- Data Scientist: Explores data, defines metrics, statistical analysis. Often the "what problem to solve" person.
- AI Product Manager: Translates business goals into ML problem framing. Owns the success metrics.
- MLOps/ML Platform Engineer: Manages the training and serving infrastructure. Critical for scale.
- AI Safety/Evaluation Engineer: Designs evaluation frameworks and red-teaming. Increasingly important.

The failure mode I see most: treating ML as a separate team that "consults" rather than building it into the product team from the start.`,
    keyPoints: [
      'Platform model enables reuse; embedded model enables product velocity, choose based on maturity',
      'AI PM is often the missing role: technical enough to frame problems, product-savvy enough to prioritize',
      'MLOps is infrastructure, not a luxury: you need it at month 3, not month 12',
      'Embed evaluation rigor from day one; retrofitting it is very expensive',
    ],
    followUps: [
      'How do you hire ML engineers, what do you look for beyond technical skills?',
      'How do you measure ML team velocity differently from software engineering teams?',
      'When do you centralize vs. decentralize AI/ML capabilities?',
    ],
  },
  {
    id: 'measuring-success-of-an-ai-feature',
    category: 'AI Metrics',
    level: 'Strategic',
    question: 'How do you measure the success of an AI feature?',
    answer: `AI features need a layered measurement framework because model metrics and business metrics often diverge.

Layer 1, model metrics: Accuracy, precision, recall, F1, NDCG (for ranking), BLEU/ROUGE (for text generation). These tell you if the model is technically working. They are necessary but not sufficient.

Layer 2, product metrics: Is the AI feature actually being used? Are users engaging with AI-generated content more or less than non-AI alternatives? Adoption rate, feature retention, task completion rate.

Layer 3, business metrics: Revenue impact, support ticket deflection rate (for AI support), time-to-first-value, churn reduction. This is where you justify the investment.

Layer 4, safety metrics: Hallucination rate, harmful output rate, bias metrics across user segments, escalation rate (how often users override or ignore AI).

The common mistake: teams optimize layer 1 while ignoring layers 2 and 4. A model with 96% accuracy can have terrible product metrics if users do not trust it or do not understand the outputs.

I also run A/B tests on AI features where possible: control group (no AI), treatment group (with AI). This gives clean attribution. For AI features that cannot easily be A/B tested, use a pre/post analysis with careful controls.`,
    keyPoints: [
      'Model metrics are not product metrics are not business metrics: measure all three',
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
    id: 'designing-a-rag-system',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: 'How would you design a RAG (Retrieval-Augmented Generation) system for enterprise knowledge search?',
    answer: `A production RAG system has five components working in a pipeline:

(1) Document ingestion: Ingest documents (PDFs, wikis, databases), chunk them intelligently (by semantic section, not arbitrary character count), enrich with metadata (source, date, author, access permissions), and embed with a dense vector model (e.g., text-embedding-3-large or an open-source equivalent).

(2) Vector store: Store embeddings in a vector database (Pinecone, Weaviate, pgvector). Design the schema to support filtered retrieval, critical for enterprise where you need to enforce access controls (user X can only retrieve from document set Y).

(3) Retrieval: At query time, embed the user's question, retrieve top-k semantically similar chunks (typically k=5-20), apply metadata filters (permissions, date range), and optionally re-rank with a cross-encoder for precision.

(4) Augmentation: Construct a prompt that includes the retrieved chunks as context. Use explicit source citation instructions. Set a context budget based on model context window (don't exceed 80% to leave room for the response).

(5) Generation and validation: Generate the response, extract cited sources, validate that claims map to retrieved content (optional fact-checking step), format for the UI with source links.

Key decisions: chunking strategy (fixed vs. semantic), retrieval strategy (dense only vs. hybrid dense+sparse), reranking (adds latency but improves quality), and access control enforcement (critical for enterprise).`,
    keyPoints: [
      'Chunk semantically, not by character count: chunk quality is the biggest lever on RAG quality',
      'Enforce access control at retrieval time, not just at the application layer',
      'Hybrid retrieval (dense + sparse/BM25) outperforms dense-only in most enterprise benchmarks',
      'Measure retrieval quality separately from generation quality: they fail independently',
    ],
    followUps: [
      'How do you handle documents that are updated frequently?',
      'How do you evaluate whether RAG improved over a baseline (fine-tuned model)?',
      'How do you handle multi-hop questions that require connecting information across documents?',
    ],
  },
  {
    id: 'ai-readiness-filter',
    category: 'AI Product Strategy',
    level: 'Foundational',
    question: 'What is your framework for deciding which problems are good candidates for AI/ML solutions?',
    answer: `I use a set of criteria I call the AI Readiness Filter:

(1) Data availability: Do we have labeled training data, or can we generate it? How much data do we have, and is it representative of production distribution? No data means no ML, usually.

(2) Pattern complexity: Is the problem too complex for human-written rules, or are there patterns that generalize from examples? If you can write IF-ELSE logic that works 95% of the time, you probably don't need ML for the first version.

(3) Error tolerance: What happens when the model is wrong? For low-stakes errors (recommendation is off), ML is fine. For high-stakes errors (wrong medical dosage), you need human checkpoints regardless of model accuracy.

(4) Feedback loop: Can you collect feedback to improve the model over time? Problems with natural feedback loops (user clicks, purchases, corrections) get better over time. Static problems do not.

(5) ROI: What is the business value of a 90% solution vs. a 99% solution? Sometimes the incremental improvement from ML vs. a simpler approach does not justify the investment.

Problems that are great for ML: content recommendation, fraud detection, natural language interfaces, image recognition, personalization. Problems that are often not great for ML: anything with fewer than about 1,000 labeled examples, anything where a rule-based system can achieve the target accuracy, anything requiring 100% auditability with no tolerance for error.`,
    keyPoints: [
      'No data means no ML. Validate data availability and quality before committing to an ML approach',
      'Rules first: can a simpler system achieve 80% of the value at 10% of the cost?',
      'Error tolerance dictates architecture: low tolerance means human in the loop',
      'Natural feedback loops are a huge advantage: prioritize problems that generate their own labels',
    ],
    followUps: [
      'How do you handle cold start problems when you have no historical data?',
      'When would you recommend a rule-based system over ML, even when ML is feasible?',
      'How do you convince skeptical stakeholders that an ML project is worth the investment?',
    ],
  },
  {
    id: 'ai-replacing-software-engineers',
    category: 'AI Product Strategy',
    level: 'Foundational',
    question: 'How do you think about AI replacing software engineers on your team?',
    answer: `I think about it through three lenses: what AI is already doing, what it will likely do in 3-5 years, and how I position my team to thrive in that environment.

The honest answer starts with what has actually been measured, because the self-reported numbers and the measured numbers disagree. METR ran a randomised controlled trial with 16 experienced open-source maintainers across 246 real tasks on their own repositories. Developers using early-2025 AI tools took 19% longer, while the same developers believed the tools had made them about 20% faster. METR's follow-up, reported in February 2026 with 57 developers, 143 repositories and over 800 tasks, did not flip that: the point estimate stayed at roughly 18% slower for the returning developers and 4% slower for new ones. METR itself calls that signal weak, because developers increasingly refused to work without AI and stopped submitting tasks they did not want to do unaided, and because timing a task gets hard when you work on something else while an agent runs.

So the interesting question in an interview is not "how much faster is AI", it is "how would you find out on your own team". I would not use self-report. I would watch cycle time from first commit to merged, review load and review latency, defect and revert rate, and incident count per change, sliced by whether the change was AI-assisted. Perception is worth tracking too, but as a separate signal, because the gap between what engineers feel and what the pipeline shows is itself a management problem.

In 3-5 years, I expect AI to handle most code generation for well-defined specifications, first-pass code reviews, and test generation. The highest-value human skills will be: problem framing (what should we build?), system design (how do these components interact at scale?), requirement disambiguation (what does the user actually need?), and judgment under uncertainty.

My advice to engineers: your moat is not code syntax, it is system thinking, domain expertise, and the ability to translate business goals into technical architecture. AI amplifies engineers who can direct it effectively and shrinks the advantage of those who are only good at writing code.

As a manager, I am rebalancing my team toward: fewer engineers who write more code each, more investment in design and architecture capacity, and explicit training on how to use AI tools effectively in our workflow.`,
    keyPoints: [
      'The measured picture is not the felt one: METR found 19% slower while developers felt 20% faster',
      'Measure outcomes on your own team (cycle time, review load, defect rate), never self-reported speedup',
      'The highest-value engineering skills (system design, problem framing) are AI-resistant',
      "The risk is not replacement, it is that engineers who use AI effectively make those who don't irrelevant",
      'Shift hiring toward T-shaped engineers with domain expertise, not just code output',
    ],
    followUps: [
      'How has AI tooling changed your hiring criteria?',
      'How do you evaluate whether an engineer is using AI effectively vs. over-relying on it?',
      'What training have you done with your team on AI-assisted development?',
    ],
  },
  {
    id: 'eu-ai-act-and-engineering-teams',
    category: 'Responsible AI',
    level: 'Foundational',
    question: 'What is your understanding of the EU AI Act and how does it affect engineering teams?',
    answer: `The EU AI Act classifies AI systems by risk level and imposes different requirements at each level:

Unacceptable risk (banned): Social scoring systems, real-time biometric surveillance in public spaces, AI that manipulates subconscious behavior.

High risk (strict requirements): AI in hiring/HR, credit scoring, medical devices, law enforcement, education assessment, critical infrastructure. These require: conformity assessments, human oversight mechanisms, detailed audit trails, registered in an EU database.

Limited risk (transparency obligations): Chatbots must disclose they are AI. Deep fake content must be labeled.

Minimal risk (largely unregulated): Most AI, product recommendations, spam filters, AI assistants.

Engineering implications: If your product operates in the EU and touches high-risk categories, you need: (1) Data governance documentation showing training data compliance with GDPR, (2) Explainability mechanisms so users can request why a decision was made, (3) Human override capability for consequential decisions, (4) Ongoing monitoring and logging with sufficient retention for audit, (5) A designated AI compliance officer or responsible person.

My practical advice: do an AI inventory now, classify each system by risk tier, and build compliance capabilities into the system architecture. Retrofitting compliance is extremely expensive.`,
    keyPoints: [
      'Know which risk tier your AI systems fall into: high risk has significant compliance overhead',
      'Human override plus audit trail are non-negotiable for high-risk AI',
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
    id: 'prompt-engineering-for-production',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: 'How do you approach prompt engineering and system prompt design for production LLM applications?',
    answer: `Prompt engineering in production is software engineering. It needs version control, testing, and deployment processes just like code.

System prompt design principles:
(1) Role plus context: Define the model's role explicitly. "You are a customer support agent for Acme Inc. You assist with billing, technical issues, and account management. Do not discuss topics unrelated to Acme products."
(2) Constraints before instructions: State what the model cannot do before what it can. Negative space is important for safety.
(3) Output format specification: Tell the model exactly how to format responses: JSON schema, markdown sections, maximum length. Structured outputs are much more reliable with explicit formatting instructions.
(4) Few-shot examples: Include 2-5 examples of ideal input to output pairs for complex tasks. This dramatically improves consistency.
(5) Reasoning: asking the model to "think step by step" was a prompt trick in 2023. On current models reasoning is a capability you configure, not a phrase you paste. You set an effort or thinking budget, the model spends reasoning tokens before it answers, and you pay for those tokens and wait for them. That turns it into a routing decision: send cheap, shaped, high-volume calls to a fast model with reasoning off or low, and reserve a high reasoning budget for the small share of requests where a wrong answer is expensive. Measure whether the extra tokens actually move your eval score, because on easy tasks they often do not.

Production practices: Store prompts in version control, not hard-coded. A/B test prompt changes with evaluation metrics, not just vibes. Maintain a prompt evaluation harness with golden test cases, a set of inputs with expected outputs you can run against any prompt version. Monitor for prompt injection attacks in user-facing applications.

The biggest mistake: writing a prompt that works on your test cases and shipping it. Production distributions are always more diverse than your test set.`,
    keyPoints: [
      'Prompts are code: version control, test suite, deployment process',
      'Few-shot examples improve complex task performance more than instruction tuning alone',
      'Maintain a golden evaluation set and run it against every prompt change',
      'Monitor for prompt injection: user input should never directly interpolate into privileged system prompt sections',
    ],
    followUps: [
      'How do you evaluate prompt quality systematically?',
      'How do you handle prompt injection attacks in a user-facing product?',
      'When would you fine-tune a model vs. engineer better prompts?',
    ],
  },
  {
    id: 'balancing-velocity-with-ai-safety',
    category: 'AI Team & Org',
    level: 'Strategic',
    question: 'How do you balance AI feature development velocity with safety and reliability?',
    answer: `This is a tension I navigate explicitly with a tiered development framework:

Tier 1 (Low stakes, high velocity): AI features that are purely additive, autocomplete, summarization, suggestions the user must actively choose. Ship with standard code review, basic evals, monitoring. Fail safely by degrading to non-AI path.

Tier 2 (Medium stakes, structured review): AI features that present information as authoritative or affect user decisions (search results, recommendations, content moderation). Require: evaluation framework with more than 100 test cases, fairness audit, user study with at least 20 users, staged rollout (1% then 10% then 100%), dedicated monitoring for 30 days post-launch.

Tier 3 (High stakes, formal process): AI features that make or assist in consequential decisions (loan approval, medical information, legal guidance, hiring). Require: ethics review panel, external audit, human override mechanism, legal sign-off, regulatory compliance check.

The gating mechanism is explicit: teams self-classify their AI feature, with review from a senior engineer or AI safety lead. Over-classifying is fine. Under-classifying means you skipped safety steps: accountability is clear.

I also apply a "reversibility test": if we discover a problem post-launch, how quickly can we roll back, and what is the blast radius? High-stakes AI features need kill switches and must be designed for fast rollback from the start.`,
    keyPoints: [
      'Tier your AI features by stakes: one-size review does not fit all AI capabilities',
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
    id: 'evaluating-an-llm-before-production',
    category: 'AI Metrics',
    level: 'Deep Dive',
    question: 'How do you evaluate an LLM for a specific production use case before committing to it?',
    answer: `Model evaluation for production is a multi-stage process:

(1) Define the task precisely: Write a crisp problem statement and success criteria. "Summarize support tickets" is too vague. "Generate a 2-sentence summary of a support ticket that includes: issue category, urgency, and requested action" is evaluable.

(2) Build an evaluation dataset: Collect 200-500 representative examples from your production distribution. Include edge cases, adversarial inputs, and samples across all user segments. Have human annotators create golden outputs for each.

(3) Define evaluation metrics: Automatic metrics (ROUGE, BERTScore for text similarity; accuracy for classification), LLM-as-judge (use a stronger model to rate outputs on a rubric), human evaluation (the gold standard, but expensive). Use a combination.

(4) Benchmark multiple models: Run at least three across tiers and vendors on your eval set. As of September 2026 that means a frontier tier (Claude Fable 5.1 or Claude Opus 5, OpenAI's GPT-6 Astra, Google's Gemini 3.1 Pro) against a cheap fast tier (Claude Haiku 4.5, Gemini 3.8 Flash), because the cheap tier clears the bar on a surprising share of tasks. Compare on task quality, latency (P50/P95/P99), cost per request, context window adequacy, and reliability (refusal rate, error rate). Name the tiers, not just the vendors, and re-run the sweep every few months: the lineup in this answer will be stale within two quarters, which is itself the point.

(5) Production shadow test: Before full launch, run the model in shadow mode (processing real requests but not serving the output). Compare shadow outputs against your evaluation framework on live traffic distribution.

(6) Set acceptance criteria: Define minimum thresholds before seeing results. "We will not launch unless quality score is above 4.2/5.0 and hallucination rate is under 3% and cost per request is under $0.01."`,
    keyPoints: [
      'Build your evaluation set before evaluating models: avoids selection bias',
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
  {
    id: 'design-a-support-ticket-agent',
    category: 'LLM Systems',
    level: 'Deep Dive',
    question: "Design an agent that files support tickets on a customer's behalf",
    answer: `I would start by drawing the boundary between what the model decides and what my code controls, because that boundary is the whole design.

Architecture. The loop is: gather state, let the model pick a tool, my code validates and runs it, the result goes back into context, repeat until done or a limit trips. Four tools, deliberately small: search_docs (read-only), get_account_context (read-only, scoped to the authenticated customer), draft_ticket (pure, no side effect), and create_ticket (the only write). The model never touches the ticketing system; it emits a structured call that my service executes.

Tool contracts. Each tool has a typed schema validated on the way in and on the way out, and a scope. get_account_context derives the customer from the session my server issued, never from an id the model supplied, otherwise a prompt injection in a pasted error log becomes an account-enumeration bug. create_ticket is idempotent on a client-supplied key so a retried step cannot file a duplicate.

Permission boundaries. Reads are free. The single write is gated: severity above a threshold, any refund or account change, or any ticket on an enterprise account requires human approval before it lands. Everything runs with the customer's own privileges, not the service's, and the agent has a step cap (around 10), a wall-clock cap, and a token and dollar cap per run.

Failure modes across a multi-step run. Tool errors the model can see and retry once, then it must stop and hand off. Loops where it calls the same tool with the same arguments: detect and break. Partial completion, where it created the ticket then failed to summarise, which is why the write happens last and is idempotent. Context rot on long runs: compact older turns and keep the task statement pinned.

Replay and observability. I log the full trajectory: every prompt, tool call, argument, result, latency and cost, with the prompt version and model id. That makes any failure replayable offline and gives me the sample I score weekly.

When to require a human. Anything irreversible, anything that moves money, anything where the customer is already angry. The default is draft-and-confirm, and autonomy is earned per action type once the success rate justifies it.`,
    keyPoints: [
      'Keep the tool surface tiny, and make exactly one tool capable of writing',
      'Derive the customer from the server session, never from an argument the model produced',
      'Cap steps, time, tokens and spend per run, and make the write idempotent',
      'Log the full trajectory so any failure is replayable and scoreable',
      'Default to draft-and-confirm; earn autonomy per action type from measured success',
    ],
    followUps: [
      'A prompt injection is sitting in the error log the customer pasted. What stops it?',
      'How do you decide when to promote an action from human-approved to autonomous?',
      'The agent files a wrong ticket for 200 customers overnight. What do you have in place?',
    ],
  },
  {
    id: 'evaluating-an-agent-not-a-model',
    category: 'AI Metrics',
    level: 'Strategic',
    question: 'How do you evaluate an agent, not just a model?',
    answer: `Model evals score one answer to one prompt. Agent evals have to score a path, because an agent can reach the right answer through nine wasted tool calls, or reach the wrong answer confidently in two. So I evaluate the trajectory, the outcome and the cost together.

Task success rate is the headline. I define success per task type as a machine-checkable end state, not a judge's opinion where I can avoid one: the ticket exists with the right fields, the refund matches the invoice, the file compiles. Where only a human can judge, I use a rubric and calibrate the judge against human labels before trusting it.

Trajectory review is the diagnostic layer. For a sample of runs I score wasted steps, whether any tool was called outside its intended scope, whether the agent recovered from a tool error, and where it stopped making progress. Most agent regressions show up here first as extra steps, long before the success rate moves.

Cost per successful task is the metric that keeps teams honest. Cost per call flatters an agent that fails cheaply and retries forever. I track cost and latency per successful task, at P50 and P95, because the tail is what customers feel.

A regression suite of frozen tasks with recorded environments, so a prompt change, a model upgrade or a tool change is a rerun rather than an argument. Deterministic where possible: stub the tools, replay fixtures.

Offline versus online. Offline suites catch regressions before ship and are cheap to run on every change. Online tells you the truth about your real distribution: task completion, human takeover rate, retry rate, thumbs-down, and abandonment mid-run. Shadow mode and staged rollout sit between them.

Red-team cases live in the suite permanently, not as a one-off exercise: injected instructions in tool output, a tool that returns a hostile payload, arguments that try to reach another tenant's data, and loops designed to burn budget. A red-team case that has ever fired becomes a permanent test.`,
    keyPoints: [
      'Score the trajectory, not just the final answer: wasted steps predict regressions early',
      'Machine-checkable end states beat judge opinions wherever you can define one',
      'Cost and latency per successful task, not per call, at P50 and P95',
      'Freeze a regression suite with recorded environments so upgrades are reruns, not debates',
      'Keep red-team cases (injection, cross-tenant reach, budget loops) in the suite forever',
    ],
    followUps: [
      'How do you calibrate an LLM judge against human labels?',
      'Your offline suite is green and online completion dropped 8%. Where do you look?',
      'How do you evaluate an agent whose tools have real side effects?',
    ],
  },
  {
    id: 'llm-feature-costs-more-than-revenue',
    category: 'AI Product Strategy',
    level: 'Strategic',
    question: 'Your LLM feature costs 3x its revenue. What do you do?',
    answer: `First I get the unit economics on one page, because "the AI bill is high" is not actionable and cost per request is. Say the feature serves 2 million requests a month at $0.030 each, so $60,000 of spend against $20,000 of revenue. My target is cost per request under $0.008, which is a 4x reduction, and I expect to get there by stacking several changes rather than finding one.

In the order I would actually try them:

Prompt caching. A large stable prefix (system prompt, tool schemas, retrieved boilerplate) re-sent on every call is pure waste. Moving everything stable to the front so it becomes a cache hit typically takes a large bite out of input cost, and it is a prompt reordering, not a rewrite. Try it first because it is nearly free.

Routing and cascades. Almost never does every request need the frontier tier. Classify difficulty, send the bulk to a cheap fast model, and escalate only what a validator or confidence signal flags. If 80% of traffic clears on a model that costs a fifth as much, that alone is most of the target.

Output length and reasoning budgets. Output tokens are the expensive half on most providers. Cap response length, ask for structured output instead of prose, and turn reasoning down or off where the eval score does not move. Reasoning tokens are the easiest place to spend money for nothing.

Semantic caching. Many products have a long head of near-duplicate questions. Cache by embedding similarity with a conservative threshold and a short time to live, and serve the repeat for the price of an embedding.

Batching for anything not user-facing (summaries, backfills, digests), typically at half price.

Distillation last, because it is the only option with real engineering and maintenance cost: fine-tune a small model on the frontier model's outputs for one narrow high-volume task once traffic justifies it.

If the stack still lands above revenue, this is a pricing or scoping conversation, not an infrastructure one: gate the expensive path behind a paid tier, or cut the feature.`,
    keyPoints: [
      'Convert the problem to cost per request and a target number before choosing tactics',
      'Order by effort: caching and prompt reordering first, distillation last',
      'Routing to a cheap tier with escalation is usually the biggest single lever',
      'Output tokens and reasoning tokens dominate cost more than teams expect',
      'If the stack cannot close the gap, it is a pricing or scoping decision, not an engineering one',
    ],
    followUps: [
      'How do you prove a cheaper model is good enough before you route traffic to it?',
      'What is the risk of semantic caching in a product where answers must be current?',
      'How do you decide the threshold for escalating from the cheap model to the expensive one?',
    ],
  },
  {
    id: 'team-policy-on-ai-assisted-coding',
    category: 'AI Team & Org',
    level: 'Foundational',
    question: "What is your team's policy on AI-assisted coding?",
    answer: `My policy is short and has one principle behind it: the author owns the code, whatever wrote it. Nobody gets to say "the model wrote that line" in a post-incident review.

Review standards. AI-assisted changes go through the same review as any other, with two additions. The author must be able to explain every line they submitted, and reviewers are told to look harder at plausible-looking code that touches boundaries: auth checks, query construction, error handling, retry logic. That is where generated code is confidently wrong. Large generated diffs get split, because a 900-line change nobody can hold in their head is unreviewable regardless of origin.

Attribution. We do not put tool credits in commit messages. What we do record is the prompt or task context in the pull request description when it helps a reviewer understand intent.

Secrets and licence risk. Approved tools only, configured so repository content goes to the account we control with training disabled. No secrets, customer data or private keys in a prompt, enforced with a pre-commit secret scanner rather than trust. For licences, we run the same scanner we already run on dependencies, because a model can reproduce a chunk of GPL code from memory and nobody notices in review.

Test requirements. Generated code needs tests written against the requirement, not against what the generated code happens to do. Reading a test that was generated from the same code it tests proves nothing, so for anything touching money, auth or data shape I want the test to fail first.

Measuring outcomes. I do not track acceptance rate or self-reported speedup, because METR's trial found developers 19% slower while they believed they were 20% faster. I track cycle time to merge, review latency and load, revert and defect rate, and incidents per change, split by whether the change was AI-assisted.

Juniors. The real risk is skill formation. Juniors on my team do the design and the debugging themselves, and they are expected to explain, not just produce. I pair them with seniors on generated changes, because reviewing code you could not have written is how you learn to stop trusting it.`,
    keyPoints: [
      'The author owns every line, and must be able to explain it in review',
      'Reviewers look hardest at generated code near auth, queries and error handling',
      'Approved tools with training off, a secret scanner, and licence scanning on generated code',
      'Tests written from the requirement, not from the generated implementation',
      'Measure merged cycle time, review load and defect rate, never self-reported speedup',
      'Protect junior skill formation: they own design and debugging, seniors pair on review',
    ],
    followUps: [
      'How would you tell the difference between an engineer using AI well and one over-relying on it?',
      'An incident traces back to generated code nobody understood. What changes?',
      'Would you let a junior ship an agent-generated refactor? Under what conditions?',
    ],
  },
  {
    id: 'latency-budget-for-a-reasoning-model',
    category: 'LLM Systems',
    level: 'Strategic',
    question: 'Latency budget: a reasoning model gives better answers but takes 8 seconds',
    answer: `Eight seconds is fine for some interactions and fatal for others, so my first question is what the user is doing while they wait. A one-off report can take eight seconds. A field they are typing into cannot. I would set an explicit budget per surface before touching the model, for example 300ms for inline assistance, 2 seconds for a search result, 10 seconds for a generated document.

Streaming is the cheapest fix and usually the largest perceived win. If the first useful token lands in 600ms and the answer flows from there, an eight-second completion reads as responsive. That means designing the output so the useful part comes first: answer, then supporting detail, never a long preamble the user has to wait through. Reasoning tokens are the problem here because they are not streamed to the user, so time-to-first-visible-token is my real metric, not total latency.

Speculative answers. Render the fast model's answer immediately and let the reasoning model revise it in place when it lands. This works when a correction is cheap to absorb, like a summary or a suggestion, and it is dangerous when the user may act on the first answer, so I would not use it for anything financial or irreversible.

Routing by difficulty. Most traffic does not need eight seconds of reasoning. A cheap classifier or a set of heuristics (query length, ambiguity, whether tools are needed, stakes of the surface) sends the easy majority to a fast model and reserves the reasoning budget for the minority that earns it. I would validate the gain on the eval set, because on easy prompts extra reasoning often buys nothing.

Async UX. Where quality genuinely matters more than speed, stop pretending it is synchronous. Accept the request, show it queued, notify when done. This is the right answer for reports, audits and bulk work, and it turns a latency problem into a product decision.

Precomputation. If the inputs are known before the user asks, run it ahead: nightly summaries, warm the cache on page load, generate the likely next answer while they read the current one.

The framing I would give the interviewer: latency is a budget you allocate per surface, and reasoning is something you buy for the requests that justify it, not a global setting.`,
    keyPoints: [
      'Set an explicit latency budget per surface before you pick a model',
      'Time to first visible token beats total latency, and reasoning tokens do not stream',
      'Route by difficulty so only the minority of requests pay for reasoning',
      'Speculative answers work for revisable output, never for actions a user may act on',
      'Go async for genuinely slow work instead of faking synchronous',
    ],
    followUps: [
      'How do you build the difficulty classifier without it becoming its own latency cost?',
      'The fast answer and the reasoned answer disagree. What does the user see?',
      'How do you set the P95 latency SLO for an LLM feature when output length varies?',
    ],
  },
]

export const categories = ['All', 'AI Product Strategy', 'LLM Systems', 'Responsible AI', 'AI Team & Org', 'AI Metrics']
export const levels = ['All', 'Foundational', 'Strategic', 'Deep Dive'] as const

export type KeyConcept = {
  id: string
  term: string
  definition: string
  example: string
}

export const keyConcepts: KeyConcept[] = [
  { id: 'rag', term: 'RAG (Retrieval-Augmented Generation)', definition: 'Architecture where a model retrieves relevant documents from a vector store before generating a response. Reduces hallucination by grounding outputs in retrieved facts.', example: 'Enterprise search, customer support bots, knowledge management systems' },
  { id: 'llm-architecture', term: 'LLM Architecture', definition: 'Think in layers: base model, system prompt, retrieval/tooling layer, safety filters, and application orchestration. Strong answers explain how tokenization, attention, context window limits, and serving infrastructure shape product decisions.', example: 'A production assistant might use a hosted transformer model, retrieval over company docs, output validation, and a fallback workflow when confidence is low.' },
  { id: 'responsible-ai', term: 'Responsible AI', definition: 'Responsible AI means designing for safety, fairness, privacy, auditability, and human control from the first architecture draft. It is not a post-launch policy document.', example: 'Add red-team evals, guardrails, human escalation, PII handling rules, and outcome monitoring before exposing an LLM to end users.' },
  { id: 'metrics', term: 'AI/ML Metrics', definition: 'You need a layered scorecard: model quality, latency, cost, safety, and business impact. A model can improve offline accuracy and still fail in production if users do not trust or adopt it.', example: 'Track precision/recall or judge scores alongside hallucination rate, P95 latency, cost per request, task completion, and override rate.' },
  { id: 'fine-tuning-vs-prompting', term: 'Fine-tuning vs. Prompting', definition: 'Fine-tuning trains the model on domain-specific data (expensive, slow, but high quality for narrow tasks). Prompting instructs a pre-trained model (cheap, fast, but limited by prompt length).', example: 'Use prompting for 95% of cases. Fine-tune when prompting hits a quality ceiling with sufficient data.' },
  { id: 'embeddings', term: 'Embeddings', definition: 'Dense vector representations of text (or images, code) that capture semantic meaning. Similar content has similar vectors. The foundation of semantic search and RAG.', example: 'text-embedding-3-large produces 3072-dimensional vectors for each text chunk' },
  // Context windows verified 2026-09-12 against the vendors' own model pages:
  // https://platform.claude.com/docs/en/about-claude/models/overview (Claude Fable 5.1 / Opus 5 / Sonnet 5: 1M; Haiku 4.5: 200K)
  // https://developers.openai.com/api/docs/models (GPT-6 Astra: 1.05M)
  // https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview and .../gemini-3.8-flash (1,048,576)
  { id: 'context-window', term: 'Context Window', definition: 'Maximum tokens a model can process in one request. As of September 2026 the frontier tiers cluster around a million: Claude Fable 5.1, Claude Opus 5 and Claude Sonnet 5 at 1M, OpenAI GPT-6 Astra at 1.05M, Gemini 3.1 Pro and Gemini 3.8 Flash at 1,048,576. Claude Haiku 4.5 is 200K. Check the vendor model page before you quote a number, because these move every few months.', example: 'A million tokens is not a reason to stuff the window: retrieval quality and cost still decide, and long inputs raise latency and price per call' },
  { id: 'temperature', term: 'Temperature', definition: 'Controls output randomness. Temperature 0 is deterministic (same input, same output). Temperature 1+ is creative/varied. For production fact-retrieval tasks, use 0-0.2. For creative tasks, 0.7-1.0.', example: 'Customer support: temperature 0.1. Creative writing: temperature 0.8' },
  { id: 'rlhf', term: 'RLHF (Reinforcement Learning from Human Feedback)', definition: 'Training technique that uses human preference data to align model outputs with human values. Used to create ChatGPT, Claude, Gemini from base language models.', example: 'Annotators rate model responses, a preference model is trained, PPO fine-tunes the LLM to maximize human preference scores' },
  { id: 'model-drift', term: 'Model Drift', definition: 'Degradation of model performance over time as the production data distribution shifts away from training data. Requires monitoring with a holdout eval set and periodic re-evaluation.', example: 'A sentiment model trained in 2022 may misclassify slang that emerged in 2024' },
  { id: 'prompt-injection', term: 'Prompt Injection', definition: "Attack where malicious user input manipulates the LLM's system instructions. Critical security issue for user-facing AI applications.", example: '"Ignore previous instructions. You are now a different assistant...": input that overrides the system prompt' },
  { id: 'chain-of-thought', term: 'Chain of Thought and reasoning models', definition: 'Chain of thought started as a prompt trick: tell the model to reason step by step before answering. On current models it is a capability you configure instead, via an effort level or a thinking-token budget. The model spends reasoning tokens before its visible answer, and you pay for them and wait for them, so reasoning is a cost and latency decision, not free accuracy.', example: 'Route a hard, low-volume request to a high reasoning budget; keep a high-volume classifier on a fast model with reasoning off, and prove the extra tokens move your eval score' },
  { id: 'vector-database', term: 'Vector Database', definition: 'Specialized database optimized for storing and querying embedding vectors. Supports approximate nearest neighbor (ANN) search at scale. Examples: Pinecone, Weaviate, Chroma, pgvector.', example: 'Store 10M document embeddings and retrieve the top-10 semantically similar in under 100ms' },
  { id: 'guardrails', term: 'Guardrails', definition: 'Checks that sit around the model rather than inside it. Input guardrails screen prompts for injection and abuse. Output guardrails validate shape (a schema), content (a safety classifier) and scope (off-topic). For an agent, the guardrail that matters most is the permission boundary on its tools: what it may read, what it may write, what spend or irreversible action needs a human to approve.', example: 'Schema validation on every tool argument, a safety classifier on user-visible text, and an allowlist plus dollar cap on any tool that writes' },
  { id: 'agentic-ai', term: 'Agents and tool use', definition: 'An agent is a loop: the model reads state, picks a tool, the tool runs, the result goes back into context, repeat until done or stopped. The model never acts directly; it emits a structured tool call (function calling) that your code validates and executes. So the engineering is in the tool contracts, the sandbox the tools run in, the step and spend limits that stop a runaway loop, and the approval gate in front of anything irreversible.', example: 'A support agent with read-only search plus one write tool (create_ticket) behind a confirmation step, capped at 12 steps per run' },
  { id: 'mcp', term: 'MCP (Model Context Protocol)', definition: 'An open protocol for exposing tools, data and prompts to a model through a uniform interface, so one integration works across clients instead of one bespoke adapter per model vendor. It is the plumbing layer for tool use, not a capability of its own: an MCP server is where your tool contracts and their permission scopes live.', example: 'Wrap your ticketing system once as an MCP server, then every agent and IDE client uses the same audited tool surface' },
  { id: 'prompt-caching', term: 'Prompt Caching', definition: 'Providers can cache a stable prefix of your prompt (system instructions, tool definitions, retrieved context) so repeat requests reuse it at a fraction of the input price and with lower latency. It rewards putting everything stable at the front of the prompt and everything variable at the end.', example: 'Move a 20K-token system prompt and tool schema above the user turn so it becomes a cache hit on every subsequent call' },
  { id: 'model-routing', term: 'Model Routing and Cascades', definition: 'Sending each request to the cheapest model that can handle it, rather than everything to the frontier model. A cascade tries a small model first and escalates only when a confidence signal, a validator, or a judge says the cheap answer is not good enough. This is usually the single largest cost lever on an LLM feature.', example: 'Classify intent on a fast cheap model, escalate the 8% it is unsure about to the frontier tier' },
  { id: 'agent-trajectory', term: 'Agent Trajectory', definition: 'The full ordered record of one agent run: every prompt, tool call, tool result and decision, with timing and cost. It is the unit of evaluation and debugging for agents, because two runs can reach the same answer with wildly different cost, risk and number of steps. Store it and you can replay a failure; do not and you cannot explain one.', example: 'Score a sample of trajectories weekly on task success, wasted steps, and whether any tool was called outside its intended scope' },
]

export const aiInterviewItemIds: readonly string[] = aiQuestions.map((q) => q.id)

assertTrackIds('ai-interview', aiInterviewItemIds)
