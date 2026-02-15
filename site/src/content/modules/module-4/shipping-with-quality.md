---
title: "Shipping with Quality"
module: 4
lesson: 2
description: "Ship AI features that work in production — not just in demos — by mastering data quality, layered metrics, evaluation suites, staged rollouts, and responsible AI practices."
objectives:
  - "Audit data quality across five dimensions before shipping AI features"
  - "Define and track AI success metrics at the model, product, and business layers"
  - "Build an automated evaluation (eval) suite with golden datasets and scoring methods"
  - "Implement bias checks, safety guardrails, and incident response plans for AI features"
resources:
  - title: "Google Responsible AI Practices"
    url: "https://ai.google/responsibility/responsible-ai-practices/"
    type: "docs"
  - title: "Anthropic Research on AI Safety"
    url: "https://www.anthropic.com/research"
    type: "article"
  - title: "Avoiding AI Pitfalls in 2026: Lessons from 2025 Incidents — ISACA"
    url: "https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/avoiding-ai-pitfalls-in-2026-lessons-learned-from-top-2025-incidents"
    type: "article"
quiz:
  - question: "When an AI feature underperforms in production, what should you inspect FIRST before trying a bigger model or fancier prompt?"
    options:
      - "The model's benchmark scores"
      - "The data quality (pull 20 random inputs and check manually)"
      - "The system prompt length"
      - "The model provider's changelog"
    answer: 1
  - question: "In a staged rollout, what is the purpose of 'Shadow Mode'?"
    options:
      - "Deploying to 50% of users with a kill switch"
      - "Running the AI alongside the existing process invisibly to compare AI decisions to human decisions"
      - "Having the engineering team test the feature internally"
      - "Shipping to beta users who opted in"
    answer: 1
---

## The Quality Gap

You've chosen the right opportunity (Lesson 3.1), scored its viability (Lesson 3.2), selected a model, designed for failure, and picked an interaction pattern (Lesson 4.1). You're almost ready to ship.

Almost — because an AI feature that works in a demo but fails in production is worse than no AI feature at all. It erodes trust, creates support burden, and gives ammunition to every stakeholder who was sceptical about AI in the first place.

This lesson covers the four pillars of shipping AI with quality: data, metrics, evals, and responsible AI. Together, they form the quality infrastructure that lets you move fast without moving recklessly.

---

## Pillar 1: Data Quality

Here's the least glamorous truth in AI product management: most quality problems are data problems disguised as model problems.

When an AI feature underperforms, the instinct is to try a bigger model or a fancier prompt. But the most common root cause isn't model capability — it's poor data. In Lesson 3.2, you scored data availability as part of the viability framework. Now you need to go deeper — not just "do we have data?" but "is our data good enough?" Before you ship any AI feature, audit your data against five dimensions.

### The Five Dimensions

**Representativeness.** Does your data reflect the full range of inputs the model will encounter in production? A customer support classifier trained on English-only tickets will fail on Spanish tickets. A summariser tested on 200-word tickets will choke on 2,000-word escalation threads. The distribution of your evaluation data must match the distribution of your production traffic — if they don't, your test results are misleading.

**Freshness.** How current is your data? A RAG pipeline built over your knowledge base six months ago serves stale answers. For domains that change rapidly — pricing, product features, regulatory requirements — weekly or daily refreshes may be necessary.

**Accuracy of labels.** If you're using labelled data, how reliable are the labels? Human labellers disagree on ambiguous cases. If your ground truth has 15% inter-annotator disagreement, your model can't realistically exceed 85% accuracy — that's the ceiling your data imposes, and it determines the maximum possible quality of your AI feature.

**Completeness.** If 30% of your customer tickets are missing category labels, training on the remaining 70% introduces selection bias. The missing tickets might be the hardest to classify — exactly the cases where you need AI most.

These dimensions interact. Amazon's AI recruiting tool (2014–2018) failed on representativeness *and* label accuracy simultaneously. The model trained on ten years of résumés the company had received — overwhelmingly male, because the tech industry skews male. It learned to penalise signals associated with women: the word "women's" (as in "women's chess club captain"), graduates of all-women's colleges. Amazon spent four years trying to de-bias the model and ultimately scrapped it, unable to guarantee gender neutrality. The data represented Amazon's past applicants, not the qualified candidate pool they wanted to reach. That gap — between historical data and intended use — is exactly what a representativeness audit would have flagged.

**Privacy and compliance.** Does your data contain PII or sensitive information that shouldn't be used for model training? With the EU AI Act's high-risk provisions becoming enforceable in August 2026, documentation of your data practices isn't optional for many use cases. Work with legal early and understand the risk.

### The Ten-Minute Diagnostic

When your AI feature underperforms, before changing anything: pull 20 random production inputs and check them manually. Are they what you expected? If you're using RAG, check whether retrieved documents are actually relevant. Review your evaluation set: when was it last updated?

**Why this matters for PMs:** This catches the majority of quality issues. Most teams skip it and spend weeks tweaking prompts that were never the problem.

> **Exercise:** For the AI opportunity you've been developing through this module, audit your data against the five dimensions. Where does your data come from? What demographics or use cases might be underrepresented? When was it last updated? If you're using labelled data, estimate the inter-annotator agreement — could two humans looking at the same input reliably agree on the correct output?

---

## Pillar 2: Three Layers of Metrics

Clean data gets you a working model. But "working" in a test environment and "valuable" in production are different things — and the gap between them is measured in metrics. Most teams only track model-level numbers and wonder why the feature isn't improving. The answer is usually that the model *is* working, but users aren't getting value from it. You need three layers to see the full picture.

### Layer 1: Model Metrics — Does the Model Work?

These are the numbers your engineering team will track. You don't need to calculate them yourself, but you need to know what they mean — because when your team says "precision is 92% but recall is only 71%," that sentence should tell you exactly where the problem is.

**For classification tasks** (ticket routing, sentiment analysis, spam detection), four metrics matter:

**Accuracy** is the simplest: of all the predictions the model made, what percentage were correct? If your classifier correctly categorises 88 out of 100 tickets, accuracy is 88%. The catch: accuracy is misleading when your categories aren't evenly distributed. A spam filter that always says "not spam" is 99% accurate if only 1% of emails are actually spam — and completely useless.

**Precision** answers: when the model says "this is a billing ticket," how often is it actually a billing ticket? High precision means few false alarms. If your classifier tags 50 tickets as billing and 47 of them really are, precision is 94%.

**Recall** answers the opposite question: of all the actual billing tickets, how many did the model catch? High recall means few missed cases. If there were 60 real billing tickets and the model found 47, recall is 78%. You'd be missing nearly a quarter of them.

**F1** balances the two into a single number. It's the harmonic mean of precision and recall — meaning it penalises you heavily if either one is low. An F1 of 85% tells you both precision and recall are reasonably strong. An F1 of 60% means at least one of them is dragging. Use F1 when you need one number to compare models, but always look at precision and recall separately to understand *where* the model is weak.

**For generation tasks** (summarisation, drafting, Q&A): factual accuracy, relevance, completeness, and tone/format compliance. These are harder to measure automatically — which is why evals (Pillar 3) exist.

**For all tasks, track latency — but not the average.** Latency percentiles tell you what real users experience. p50 is the median: half your requests are faster than this. p95 means 95% of requests are faster — only 1 in 20 is slower. p99 means 99% are faster — only 1 in 100 is slower. The reason this matters: a feature with a p50 of 500ms and a p99 of 12 seconds feels fast most of the time but infuriating for the unlucky users. Track p95 and p99, not averages — they reveal the experience your worst-off users are having.

### Layer 2: Product Metrics — Does the Feature Work?

Model accuracy doesn't guarantee product value. A 95% accurate classifier is useless if support agents ignore its suggestions and keep triaging manually.

Product metrics reveal whether the AI is changing behaviour. **Adoption rate** tells you what percentage of eligible users engage at all — if only 30% of agents are using the classifier, you have a trust or discoverability problem, not a model problem. **Acceptance rate** tracks how often users go with the AI's suggestion. **Edit rate** measures how much they modify the output before accepting — high edit rates signal "close but not good enough." **Fallback rate** shows how often the system gives up and drops to the non-AI path; over 20% and your AI feature is mostly a fallback feature in disguise. **Task completion time** answers the bottom-line question: does AI actually make people faster? And **reuse rate** tells you whether users come back after their first experience — the clearest signal of whether the feature earns trust over time.

### Layer 3: Business Metrics — Does the Feature Matter?

Cost savings, revenue impact, customer satisfaction changes, time-to-value. These justify the investment and are what you'll report to leadership.

### Setting Targets

Your metrics don't all need to be world-class. A useful threshold: **AI output should be at least as good as a median human performing the same task, in half the time.** If your classifier is 88% accurate and a typical support agent is 85%, that's good enough to add value — even though 88% sounds imperfect.

GitHub Copilot's metrics illustrate how product-layer data tells a richer story than model metrics alone. When Copilot launched in 2022, its suggestion acceptance rate was around 27% — meaning developers rejected nearly three out of four suggestions. Six months later, that climbed to 35%. A naïve reading says "the model is still wrong 65% of the time." A product reading says "developers are getting value on a third of all suggestions, each one saving a few seconds to a few minutes, and the cost of a bad suggestion is a single keypress to dismiss." The acceptance rate also varies significantly by context: routine boilerplate code gets accepted far more often than complex logic. That kind of segmented analysis — breaking a blended number into its component parts — is what turns metrics from a dashboard into a diagnostic tool.

### Generic Metrics vs. App-Specific Metrics

A common mistake: treating generic AI metrics as your north star. Hallucination rate, toxicity score, latency — these are guardrails, not goals. They tell you whether the system is safe, not whether it's useful.

Your north-star metrics should be specific to what your feature actually does. For the feedback classifier from Module 3, "category accuracy" is an app-specific metric — it measures the thing users care about. "Hallucination rate" is a guardrail — if it spikes, something is broken, but optimising for zero hallucinations doesn't make the classifier better at classifying.

The distinction matters because teams that optimise for generic metrics build features that are technically safe but practically useless. Teams that optimise for app-specific metrics build features that solve the actual problem — and use generic metrics as safety checks along the way.

**Product implication:** Define your app-specific metrics before you define your guardrails. Ask: "What does this feature need to do well to be worth shipping?" That's your north star. Then ask: "What must this feature never do?" Those are your guardrails.

### What a Real Dashboard Looks Like

For the customer feedback classifier from the Module 3 exercise:

| Metric | Layer | Target | Current | Status |
|---|---|---|---|---|
| Category accuracy | Model | ≥ 88% | 91.2% | On target |
| Sentiment accuracy | Model | ≥ 90% | 87.5% | Below target |
| p95 latency | Model | < 2s | 1.4s | On target |
| User acceptance rate | Product | ≥ 80% | 76% | Below target |
| Edit rate on summaries | Product | < 30% | 22% | On target |
| Fallback rate | Product | < 10% | 4% | On target |
| Agent hours saved/week | Business | ≥ 6 hrs | 7.5 hrs | On target |
| Support ticket volume | Business | −15% | −12% | Trending |

**Why this matters for PMs:** This dashboard tells a story. The model works well on categorisation but underperforms on sentiment. Users accept suggestions 76% of the time — close but below target. Investigation reveals the two "below target" metrics correlate: tickets with incorrect sentiment get edited more and accepted less. The fix: improve sentiment detection specifically. Without three layers, you'd never find that causal chain.

> **Exercise:** For the AI opportunity you've been developing through this module, define one metric per layer. What model metric would you track? What product metric tells you users are actually getting value? What business metric justifies continued investment?

---

## Pillar 3: Evals — Your Quality Safety Net

A dashboard of green metrics is reassuring — but metrics are lagging indicators. They tell you something went wrong after users have already experienced it. Evals are leading indicators: automated tests that catch regressions before users do. If metrics tell you *what* is happening, evals tell you *why*.

Think of evals as automated tests adapted for AI. Traditional software tests check deterministic outputs: "given input X, expect output Y." AI evals adapt this for non-deterministic systems where the same input can produce slightly different outputs each time. Without them, you're flying blind: a prompt change that fixes one issue silently breaks three others, a model provider update shifts your feature's tone overnight, or data drift degrades quality so gradually that nobody notices until it's a crisis.

Building useful evals follows three steps: understand how your feature fails, build tests for those failures, then verify your tests actually work.

### Start with Error Analysis

Before you can test for failure, you need to know what failure looks like. Pull 50–100 production examples where the AI got it wrong (or if you're pre-launch, run on real data and have a domain expert flag errors). Oversample from cases where users gave negative feedback, confidence was low, or the output was edited.

Read each failure and tag it specifically. "Hallucinated a customer name" is useful; "bad output" is not. As you tag, patterns emerge — group them into categories. Then rank by frequency × severity. A failure that hits 15% of inputs and erodes trust is more urgent than one that affects 2% with minor inconvenience. Your top three failure categories become the criteria your evals test against.

This is the step most teams skip — and it's the most important one. Without error analysis, you're writing tests for failures you imagined rather than failures that actually happen.

### Build the Eval Suite

You need three components.

**A golden dataset:** 50–200 real examples with known-good outputs. Aim for roughly 60% common cases, 25% edge cases (unusual inputs, multilingual content, very long or short inputs), and 15% adversarial cases (prompt injections, contradictory information, out-of-scope requests). Update it quarterly or whenever error analysis reveals a new failure category.

**Scoring methods:** Two types, and knowing when to use each matters. *Code-based evaluators* handle objective criteria: did the classifier return a valid category? Is the output valid JSON? Is the summary under 200 words? These are fast, cheap, and perfectly reliable — use them for everything you can measure objectively. *LLM-as-judge evaluators* handle subjective criteria: is the summary faithful to the source? Does the tone match professional correspondence? A separate model grades the output against specific criteria. The key to making LLM judges consistent: frame each criterion as a binary pass/fail question, not a rating scale. "Does the summary contain any claims not in the source ticket? Yes or No" produces far more reliable judgements than "Rate faithfulness 1–5."

**An automation pipeline:** Run evals on every prompt change before deploying, on a weekly schedule to catch drift, and whenever the model provider announces an update. Set alerts for score drops — a 5% accuracy decline should trigger investigation before users notice.

### Validate Your Evaluators

An LLM judge that approves bad outputs gives false confidence — worse than no eval at all. Test your judges the same way you'd test any tool: take 50–100 examples, have a human expert label each one, and compare. If your judge catches only 60% of real failures, it's a sieve, not a safety net. Iterate on the judge prompt until it reliably catches at least 85% of failures.

### A Note on Architecture

If your feature uses RAG, eval the retriever and generator separately — a system can retrieve the right documents but generate a bad answer, or vice versa. If your feature uses agentic workflows, focus on the transitions: does the agent choose the right next action at each decision point? Your engineering team will handle the mechanics, but knowing where each architecture tends to break helps you ask the right questions.

Notion AI's eval process shows what this looks like at scale. Because they route different tasks to different models (writing, search, auto-fill), they built a continuous evaluation pipeline — LLM-as-judge scoring combined with human-labelled feedback from their AI Data Specialists team. When testing a new model, they run it against real user tasks that Notion had flagged as high priority. The evals are continuous rather than one-time gates, which means Notion can rapidly swap models as the landscape shifts. The takeaway: eval infrastructure is what lets you move fast on model decisions without gambling on quality.

> **Exercise:** For the AI opportunity you've been developing through this module, identify three likely failure modes using the error analysis process. Which would you test with code-based evaluators, and which would require an LLM judge?

---

## Pillar 4: Staged Rollouts

You've audited your data, set up layered metrics, and built evals. Now comes the moment where theory meets reality: shipping to real users. The temptation is to go big. Resist it.

Never launch an AI feature to 100% of users on day one. CNET learned this between November 2022 and January 2023, when it quietly published 77 AI-generated financial articles under the byline "CNET Money Staff." When the practice surfaced publicly, editors reviewed every article — 41 of them (53%) contained factual errors, including a compound interest article that confused total balance with earnings. Wikipedia downgraded CNET from a "generally reliable" source, the editor-in-chief resigned, and the reputational damage outlasted the corrections. The AI wasn't the problem — the rollout was. No shadow mode, no human review gate, no kill criteria. Every one of those errors could have been caught before a single reader saw them.

These four stages map to the graduation path you designed in Lesson 4.1 — from human-in-the-loop to autonomous through evidence, not conviction.

**Stage 1: Shadow mode (1–2 weeks).** The AI runs alongside the existing process, but users never see its output. You compare AI decisions to human decisions on real data. This answers: "Does our model actually perform in the real world the way it performed on our eval set?" The answer is often "not quite."

**Stage 2: Internal dogfooding (1 week).** Your team uses the feature in their daily workflow. This catches issues that metrics miss — confusing UX, unexpected edge cases, "technically works but feels wrong" problems.

**Stage 3: Limited rollout (2–4 weeks).** Ship to 5–10% of users — one cohort, one region, or opt-in beta. Monitor all three metric layers. Set kill criteria before you start: "If acceptance rate drops below 60% or accuracy below 80%, we pause." Pre-defined criteria prevent debates about whether a dip is "bad enough."

**Stage 4: Gradual expansion.** If metrics hold, expand to 25%, then 50%, then 100%. Pause at each stage for a few days to confirm stability.

**Why this matters for PMs:** This adds 4–8 weeks to your timeline but dramatically reduces the risk of a public failure. For your first AI feature, the slower pace is worth it.

> **Going deeper: Traces and observability.** Once your feature is in production, your engineering team will likely set up *tracing* — logging every prompt, response, latency measurement, and cost for every request your AI feature handles. Tools like Langfuse, LangSmith, and Braintrust provide dashboards where you can inspect individual requests, spot patterns in failures, and debug issues after the fact. You don't need to implement tracing yourself, but you should know it exists and ask your engineers to set it up before launch. When something goes wrong in production, traces are how your team figures out *why* — without them, you're guessing. This topic is covered in more depth in Module 5.

---

## Bias, Fairness, and Safety

Staged rollouts protect you from technical failures. This section addresses a different kind of failure — one that metrics and evals alone won't catch.

Every AI model carries biases from its training data. This isn't theoretical — a lending company paid a $2.5 million settlement in 2025 because its AI underwriting model discriminated along racial lines. The model's aggregate accuracy looked fine; nobody had checked whether it performed equally across demographics. This is the gap between model metrics (Pillar 2) and responsible deployment.

### Four Questions Before Launch

**1. Who's in your data — and who isn't?** If your classifier was trained on data from North American, English-speaking customers, it will perform worse on feedback from other regions or writing styles. Map the dimensions that matter and check for gaps.

**2. What are the failure mode disparities?** Don't just measure overall accuracy. Break it down by user segments. If your AI resolves enterprise tickets at 90% accuracy but only 70% for SMB, you have a fairness problem — even if the blended number looks great.

**3. What are the consequences of bias in your specific feature?** A biased recommendation engine that shows slightly less relevant products is annoying. A biased fraud detection system that flags transactions from certain zip codes disproportionately is discriminatory. The severity determines your mitigation investment.

**4. Can users contest or override AI decisions?** Every user affected by an AI decision should have a clear path to challenge it. Good UX — and increasingly a legal requirement under the EU AI Act.

### Safety Guardrails

Beyond bias, four guardrails protect you from the failure modes that make headlines.

**Content filtering** catches harmful or inappropriate output before it reaches users. Most model providers offer built-in safety filters; supplement them with domain-specific rules for your context.

**Rate limiting** prevents abuse. AI features can be exploited — chatbots prompted to generate spam, content tools repurposed for misinformation. Implement usage caps, monitoring, and escalation paths.

**Transparency** earns trust. Tell users when they're interacting with AI, and label AI-generated content clearly. Users are more forgiving of AI mistakes when they know it's AI. Loom does this well: its AI-generated video titles, summaries, and chapter headings are clearly marked and appear as editable suggestions, not final output. The user can accept, modify, or discard them. Compare that to CNET publishing AI articles under a human-sounding byline — the quality issues might have been manageable if readers had known to expect them.

**Incident response** means knowing who gets alerted when things go wrong, what the escalation path is, and whether you can disable the AI feature without taking down the product. Define this before launch — not during your first incident at 2 AM. Your AI feature should have a kill switch that any on-call engineer can flip, reverting to the non-AI path you designed in Lesson 4.1.

### The Responsible AI Decision Record

For any AI feature with moderate to high user impact, document your decisions in a one-page record: feature name and risk level, what you checked for bias and what you found, which segments you're tracking and your fairness targets, how users know it's AI and how they contest decisions, content filtering and rate limiting approach, incident response plan and kill switch, and re-audit frequency.

**Why this matters for PMs:** This takes an hour to write and prevents the "we didn't think about that" conversation with your VP after an incident.

---

## Bringing It All Together

These four pillars work as a system. Data quality determines the ceiling of what your model can achieve. Metrics tell you whether you're approaching that ceiling — and whether users care. Evals catch the moment quality starts slipping. Staged rollouts contain the blast radius while you learn. And responsible AI practices ensure that what you ship is fair, transparent, and resilient.

With this lesson, you've completed the build-and-ship arc of the course. Module 3 helped you find the right opportunities; Module 4 showed you how to design them (Lesson 4.1) and ship them with quality (this lesson). But shipping is not the finish line. The best AI features require ongoing monitoring, iteration, and governance at scale — and that's what Module 5 covers.

---

## Key Takeaways

1. **Most quality problems are data problems.** When your AI feature underperforms, pull 20 random production inputs and check them manually before trying a bigger model or fancier prompt.

2. **Measure at three layers.** Model metrics tell you if the model works. Product metrics tell you if users get value. Business metrics tell you if the investment is justified. You need all three.

3. **Build evals from error analysis.** Start by understanding how your feature actually fails, then build targeted evals. Use code-based evaluators for objective criteria, LLM judges for subjective ones, and validate your judges against human labels.

4. **Stage your rollout.** Shadow mode → dogfood → limited beta → gradual expansion. Set kill criteria before you start. Pre-defined criteria prevent debates about whether a dip is "bad enough."

5. **Document your responsible AI decisions.** A one-page record: bias checks, fairness targets, transparency approach, and incident response plan. Takes an hour. Prevents disasters.

---

## Explore Further

- [Google Responsible AI Practices](https://ai.google/responsibility/responsible-ai-practices/) — Comprehensive framework for responsible AI development and deployment.
- [Anthropic Research on AI Safety](https://www.anthropic.com/research) — Research papers and approaches to making AI systems safer and more reliable.
- [Avoiding AI Pitfalls in 2026: Lessons from 2025 Incidents](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/avoiding-ai-pitfalls-in-2026-lessons-learned-from-top-2025-incidents) — Real-world case studies of AI failures and the lessons they teach.
