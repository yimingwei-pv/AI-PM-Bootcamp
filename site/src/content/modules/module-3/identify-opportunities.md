---
title: "Identify Opportunities for AI"
module: 3
lesson: 1
description: "Build pattern recognition for where AI creates genuine product value — and where it's an expensive distraction."
objectives:
  - "Distinguish between proven, emerging, and overhyped AI capabilities using current evidence"
  - "Apply the deterministic vs. probabilistic framework to make crisp build decisions"
  - "Use the AI Opportunity Spotting Checklist to evaluate real features on your backlog"
resources:
  - title: "Why Most AI Products Fail — Mind the Product (MIT 2025 Report)"
    url: "https://www.mindtheproduct.com/why-most-ai-products-fail-key-findings-from-mits-2025-ai-report/"
    type: "article"
  - title: "3 AI Shockwaves Reshaping Product Management in 2026 — LogRocket"
    url: "https://blog.logrocket.com/product-management/ai-changes-product-management-2026"
    type: "article"
  - title: "AI in Product Design: Deterministic vs Probabilistic Systems"
    url: "https://medium.com/design-bootcamp/ai-in-product-design-concepts-a-primer-on-deterministic-vs-probabilistic-systems-89243be5cccf"
    type: "article"
quiz:
  - question: "Which type of task is most appropriate for AI according to the deterministic vs. probabilistic framework?"
    options:
      - "Calculating exact tax amounts"
      - "Authorising bank payments based on PIN verification"
      - "Recommending movies based on user behaviour patterns"
      - "Sorting a list of names alphabetically"
    answer: 2
  - question: "What is the FIRST question in the AI Opportunity Spotting Quick Filter?"
    options:
      - "Does it involve processing unstructured data?"
      - "Is this task repetitive and happening at high volume?"
      - "Can users tolerate imperfect results?"
      - "Would solving this create measurable business value?"
    answer: 1
---

## Why Opportunity Identification Matters

In Modules 1 and 2, you built a working understanding of how LLMs, agents, and context engineering work — and you used AI hands-on to accelerate your own PM workflows. Now the question shifts from *your* productivity to *your product*: where should you apply AI to create value for users?

The answer matters more than most teams realise. MIT's 2025 study found that 95% of corporate AI projects fail to create measurable value. S&P Global reported 42% of AI initiatives were outright scrapped in 2025 — up from 17% the prior year. The most common failure wasn't technical. It was what researchers called "perpetual piloting": teams running dozens of proofs-of-concept without shipping a single production system.

The pattern is always the same: a solution looking for a problem. This lesson gives you a systematic approach to finding problems that are genuinely worth solving with AI — and equally important, recognising when AI is the wrong tool.

---

## Part 1: What AI Is Actually Good At Right Now

Before evaluating opportunities, you need an honest map of current AI capabilities — not what demos promise, but what's working in production today.

### The Reliable Workhorses

**Classification and routing** is the single most proven AI capability in enterprise software. Stripe flags fraud. Gmail filters spam. Zendesk routes tickets. It works because it's a bounded problem with a finite set of valid outputs and learnable patterns that predict them.

**Why this matters for PMs:** If your opportunity involves sorting things into categories at volume, you're on solid ground. This is well-understood territory with predictable costs and performance. If you experimented with classification in [Module 2](/AI-PM-Bootcamp/modules/ai-powered-mindset/)'s prompt engineering exercises, you've already seen this capability first-hand.

**Summarisation and extraction** has matured rapidly. Slack summarises threads. Notion condenses pages. Legal tech tools pull key clauses from contracts. The model doesn't need to *know* things — it compresses what's already there. The failure mode is omission (missing something important), not fabrication, which is a far more manageable risk.

**Semantic search** replaces keyword search (which returns irrelevant results) with meaning-based retrieval (which understands what you *meant*). Notion, GitHub, and thousands of internal knowledge bases now use embeddings — numerical representations of meaning — to retrieve by meaning rather than exact text match.

**Why this matters for PMs:** Remember from [Lesson 1.1](/AI-PM-Bootcamp/modules/llms/) — embeddings encode semantic similarity. Semantic search is one of the highest-ROI AI features you can ship because you're surfacing content that already exists in your data, with minimal risk.

**Code generation** has crossed from novelty to genuine productivity tool. GitHub Copilot and Cursor are used by millions of developers daily. The key: it's an accelerant, not a replacement. Developers still review everything, keeping risk manageable.

### Emerging Capabilities — Proceed with Caution

**Complex reasoning and multi-step logic** improved dramatically in 2025, but inconsistently. Models can break down problems and check their own work — sometimes. A model that reasons correctly 85% of the time is impressive in a demo and dangerous in production. If your use case requires multi-step reasoning, plan for hybrid designs where AI handles parts and humans verify the whole.

**Agentic workflows** — AI systems that take autonomous multi-step actions — are the defining trend of 2026. But "mainstream" and "reliable" are different things. As you learned in the [Agents lesson](/AI-PM-Bootcamp/modules/agents/), most agentic systems still cluster at low-stakes tasks. The deeper into a workflow you push autonomous AI (checkout, payments, compliance decisions), the more fragile it gets.

**Creative generation** (images, music, writing) produces impressive output but has persistent issues: legal uncertainty around training data - especially around music, videos and movies, a recognisable "AI voice" that sophisticated audiences detect, and a tendency to remix rather than genuinely create.

**Why this matters for PMs:** For emerging capabilities, the value is in acceleration and augmentation — not replacement. Design features that keep humans in the loop until reliability is proven.

### Where AI Still Fails

**Precise arithmetic and financial calculations.** As you learned in [Lesson 1.1](/AI-PM-Bootcamp/modules/llms/), LLMs are text prediction engines — they predict what maths answers *look like*, not what they are. No bank uses a raw LLM for interest calculations. If your feature requires numerical precision, pair AI with deterministic calculation engines.

**Perfect-accuracy tasks.** AI is probabilistic. It makes confident-sounding mistakes. Medical diagnosis, legal interpretation, compliance decisions — these require accuracy thresholds that current AI can't reliably hit without human oversight.

**Tasks requiring proprietary knowledge.** An LLM doesn't know your internal API, your business rules, or your customer data. It will make plausible-sounding guesses that are wrong. You can solve this with RAG (covered in [Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/)), but "just add AI" without a knowledge architecture will fail.

**Why this matters for PMs:** These aren't "temporary" limitations you can wait out. They're structural properties of how LLMs work — rooted in the transformer architecture you studied in [Lesson 1.1](/AI-PM-Bootcamp/modules/llms/). Design around them rather than hoping the next model release fixes them.

---

## Part 2: The Framework That Matters Most — Deterministic vs. Probabilistic

If you take one concept from this lesson, take this one. It's the single most useful lens for evaluating whether a problem is an AI problem.

**Deterministic systems** give the same output every time for the same input. Calculate interest: principal × rate × time. Sort a list alphabetically. Check whether a PIN matches a record. Predictable, debuggable, safe for critical operations.

**Probabilistic systems** give outputs based on statistical patterns. Recommend a movie. Classify a review's sentiment. Generate a draft email. There's no single "correct" answer — there's a distribution of plausible answers.

The critical question: **Is the problem I'm solving inherently probabilistic, or am I forcing probabilism where determinism works?**

### A Concrete Example

Consider Meta's ad system. The advertiser inputs (budget, targeting criteria) are deterministic. The user data (age, location) is deterministic. But the question "which user is most likely to click this ad?" is inherently probabilistic — learned from billions of impressions. Then deterministic rules enforce budget caps and business logic on top of the probabilistic prediction.

That's the sweet spot. AI drives the prediction. Rules enforce the constraints. Most successful AI features in production follow this hybrid pattern.

**Why this matters for PMs:** When scoping an AI feature, separate the probabilistic parts (where AI adds value) from the deterministic parts (where rules are safer and cheaper). Many failed AI projects try to make the entire workflow probabilistic when only one step actually benefits from it.

| Task | Best Approach | Why |
|------|---------------|-----|
| Banking transaction | Deterministic | Customers need 100% certainty |
| Movie recommendation | Probabilistic | No single "correct" answer — AI learns from behaviour |
| Spam filtering | Probabilistic | Borderline cases exist; AI's "best guess" is valuable |
| Tax calculation | Deterministic | Legal requirement for precision |
| Fraud detection | Hybrid | Rules catch impossible transactions; AI scores anomalies |
| Content personalisation | Probabilistic | Users value variety; AI ranking delivers it |

**Why this matters for PMs:** Before greenlighting an AI feature, ask three questions. Is this problem probabilistic by nature? Am I trying to make a deterministic problem probabilistic? Or is this a hybrid where AI can predict and rules can enforce?

---

## Part 3: The AI Opportunity Spotting Checklist

You now have a capability map (Part 1) and a decision framework (Part 2). The final piece is a repeatable process for evaluating specific opportunities. When a feature request hits your backlog and someone says "we should use AI for this," here's a systematic way to evaluate it.

### The Quick Filter (60 Seconds)

Five questions. Three or more "yes" answers means the opportunity is worth a deeper look.

**1. Is this task repetitive and happening at high volume?** AI shines at scale. If it happens ten times a day, a rule might be fine. If it happens a thousand times, AI starts to make economic sense.

**2. Does it involve processing unstructured data?** Text, images, audio, video — this is where AI has a structural advantage over rule-based systems. If your data is already in neat columns, a SQL query might do the job.

**3. Can users tolerate imperfect results?** Or is there a human review step? This is the single biggest qualifier. If the answer has to be perfect every time, AI is the wrong tool — or it needs an expensive human-in-the-loop design.

**4. Do you have accessible data to evaluate against?** Not training data — evaluation data. Can you take 50 real examples and check whether the AI got them right? If you can't measure it, you can't ship it.

**5. Would solving this create measurable business value?** Time saved, revenue gained, cost reduced. If the answer is vague ("it would be cool"), that's a red flag.

### The Detailed Assessment

If a feature passes the quick filter, dig into four dimensions.

**Problem assessment.** Quantify the pain. "It takes our team 8 hours a week to triage customer feedback" is actionable. "It would be nice to have AI-powered insights" is not.

**Why this matters for PMs:** If you can't put a number on the current cost, you won't be able to prove the AI version is worth it.

**Feasibility assessment.** Do you have the data — not in theory, but in practice? Thousands of labelled examples for classification, or a well-organised knowledge base for RAG? Is the technical approach proven (classification, summarisation) or experimental (novel multi-step reasoning)? Can you scope an MVP that captures 80% of the value in the first iteration?

**Risk assessment.** What happens when the AI is wrong? For a draft email suggestion, the user catches it. For an automated compliance decision, a regulator might come calling. Factor in bias risks, privacy implications, and regulatory requirements (the EU AI Act's high-risk provisions become enforceable in August 2026).

**Strategic assessment.** Does this move a metric that matters? And critically: could a simpler solution — a spreadsheet, a Zapier workflow, a better template — get you 80% of the way there?

### Red Flags — Stop and Reconsider

Watch for these patterns:

- The task requires 99%+ accuracy and you're planning to ship without human review
- You don't have labelled data and can't realistically create it
- You're using raw AI for financial calculations or legal decisions
- You can't explain to a customer why the AI made a specific decision
- The real motivation is "our competitors announced an AI feature" rather than a genuine user problem

**Why this matters for PMs:** The most common PM mistake in 2026 isn't building bad AI features — it's building AI features for the wrong reasons. MIT's research found that the majority of failed AI projects were driven by peer pressure and tooling excitement, not by a clearly defined business problem.

> **Exercise:** Pick two features on your current backlog (or two that a stakeholder has suggested). Run them through the five-question quick filter. How many "yes" answers does each get? Does the result match your intuition about which one is more suited to AI? If the scores surprise you, dig into which questions flipped — that often reveals the real constraint.

---

## Key Takeaways

1. **AI capabilities fall into three tiers:** Reliable workhorses (classification, summarisation, semantic search, code generation), emerging capabilities (reasoning, agents, creative generation), and persistent weaknesses (arithmetic, perfect accuracy, proprietary knowledge). Know which tier your opportunity sits in.

2. **The deterministic vs. probabilistic framework is your most important lens.** Before evaluating any AI feature, ask: is this problem inherently probabilistic? Most successful AI features in production are hybrids — AI drives the prediction, deterministic rules enforce the constraints.

3. **The five-question quick filter catches bad ideas fast.** Repetitive + high volume + unstructured data + error tolerant + measurable value = strong AI candidate. Three or fewer "yes" answers means the opportunity needs serious scrutiny.

4. **The 95% failure rate exists because teams skip the honest evaluation.** Good reasoning starts with the problem and evaluates whether AI is the right tool. Bad reasoning starts with AI and reverse-engineers a problem to justify it.

---

## Explore Further

- [Why Most AI Products Fail — Mind the Product](https://www.mindtheproduct.com/why-most-ai-products-fail-key-findings-from-mits-2025-ai-report/) — Detailed analysis of the MIT 2025 study on AI project failure rates.
- [Deterministic vs Probabilistic Systems in AI Product Design](https://medium.com/design-bootcamp/ai-in-product-design-concepts-a-primer-on-deterministic-vs-probabilistic-systems-89243be5cccf) — Deep dive into the framework covered in Part 2.
- [3 AI Shockwaves Reshaping Product Management in 2026](https://blog.logrocket.com/product-management/ai-changes-product-management-2026) — Current landscape of AI capabilities and their product implications.
