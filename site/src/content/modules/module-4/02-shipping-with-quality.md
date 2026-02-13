---
title: "Shipping with Quality"
module: 4
lesson: 2
description: "Ensure AI features succeed in production by mastering data quality, three-layer metrics, automated evaluation suites, staged rollouts, and responsible AI practices."
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
  - title: "Hugging Face Model Evaluation Guide"
    url: "https://huggingface.co/docs/evaluate"
    type: "docs"
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

An AI feature that works in a demo but fails in production is worse than no AI feature at all. It erodes user trust, creates support burden, and gives ammunition to every stakeholder who was skeptical about AI in the first place.

This module covers the four pillars of shipping AI with quality: ensuring your data is solid, defining the right success metrics, building evaluation systems that catch problems before users do, and addressing bias and safety before they become headlines.

---

## Part 1: The Importance of Quality Data

### Data Is Your Model's Worldview

Every AI model is a reflection of the data it learned from. If the training data is biased, the model is biased. If your RAG pipeline feeds the model outdated documents, the model gives outdated answers. If your evaluation data doesn't represent real users, your accuracy numbers are fiction.

This sounds obvious. It's also the #1 reason AI features fail in production. Not model choice. Not prompt engineering. Data.

### The Data Quality Checklist

Before you ship any AI feature, audit your data against these five dimensions:

**1. Representativeness** — Does your data reflect the full range of inputs the model will encounter in production? A customer support classifier trained on English-only tickets will fail on Spanish tickets. A summariser tested on 200-word tickets will choke on 2,000-word escalation threads. The distribution of your evaluation data should match the distribution of your production traffic.

**2. Freshness** — How current is your data? If you built a RAG pipeline over your knowledge base six months ago and haven't updated it, your model is answering based on stale information. Set up automated data ingestion or define a refresh cadence. For rapidly changing domains (pricing, product features, regulatory requirements), weekly or even daily refreshes may be necessary.

**3. Accuracy (Labels)** — If you're using labelled data for evaluation or fine-tuning, how reliable are those labels? Human labelers disagree on ambiguous cases. If your "ground truth" has 15% inter-annotator disagreement, your model can't realistically exceed 85% accuracy — and that might be fine, or it might be fatal, depending on your use case.

**4. Completeness** — Are there gaps? If 30% of your customer tickets are missing category labels, training a classifier on the remaining 70% introduces selection bias. The tickets without labels might be the hardest to classify — exactly the cases where you need AI most.

**5. Privacy and Compliance** — Does your data contain PII, sensitive information, or content that shouldn't be used for model training? GDPR, CCPA, HIPAA, and industry-specific regulations may restrict what data you can feed to an AI model, especially third-party APIs. Work with your legal team early, not after you've built the pipeline.

### The "Garbage In, Garbage Out" Diagnosis

When your AI feature underperforms, resist the urge to immediately try a bigger model or fancier prompt. Instead, inspect the data:

- **Pull 20 random production inputs** and check them manually. Are they what you expected?
- **Check your retrieval pipeline** (for RAG). Are the retrieved documents actually relevant? Retrieval quality caps generation quality — as discussed in the Context Engineering module.
- **Review your evaluation set**. When was it last updated? Does it include the hard cases, or just the easy ones that make accuracy look good?

Most quality problems are data problems disguised as model problems.

---

## Part 2: Defining Metrics for Success

### The Three Layers of AI Metrics

AI features need metrics at three levels. Most teams only measure the first and wonder why their feature doesn't improve.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/diagrams/11-metrics-layers.png" alt="Three layers of AI metrics — Layer 1: Model Metrics (does the model work?), Layer 2: Product Metrics (does the feature work?), Layer 3: Business Metrics (does the feature matter?)" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

### Layer 1: Model Metrics (Does the Model Work?)

These measure the model's raw performance on your task. The specific metrics depend on your use case:

**For classification tasks** (ticket routing, sentiment analysis, spam detection):
- **Accuracy**: % of predictions that are correct. Simple but misleading if classes are imbalanced (99% of emails aren't spam, so a model that always says "not spam" is 99% accurate and completely useless)
- **Precision**: Of the items the model flagged as positive, what % actually were? High precision = few false alarms
- **Recall**: Of the actual positive items, what % did the model catch? High recall = few missed cases
- **F1 Score**: The harmonic mean of precision and recall. Useful when you need to balance both

**For generation tasks** (summarisation, drafting, Q&A):
- **Factual accuracy**: Does the output contain only facts supported by the input? (Critical for RAG applications)
- **Relevance**: Does the output address the actual question or task?
- **Completeness**: Does it cover all the key points?
- **Tone/format compliance**: Does it match the specified style and structure?

**For all tasks**:
- **Latency** (p50, p95, p99): How fast does the model respond? The 95th and 99th percentile matter more than the average — a feature that's fast 90% of the time but takes 30 seconds for 10% of requests feels broken.
- **Error rate**: How often does the model return an error, timeout, or fail to respond at all?

### Layer 2: Product Metrics (Does the Feature Work?)

Model accuracy doesn't guarantee product value. A model might be 95% accurate but users might ignore its output. Product metrics measure what users actually do with the AI.

- **Adoption rate**: What % of eligible users engage with the AI feature?
- **Acceptance rate**: When the AI makes a suggestion, how often do users accept it vs. dismiss or override it?
- **Edit rate**: For generative features, how much do users modify the AI's output? High edit rates suggest the AI is close but not good enough.
- **Fallback rate**: How often does the system fall back to the non-AI path? (If it's over 20%, your AI feature is mostly a fallback feature.)
- **Task completion time**: Does the AI feature actually make users faster? Compare the AI-assisted workflow to the non-AI baseline.
- **Reuse rate**: Do users come back? A feature used once and abandoned has a quality or trust problem.

### Layer 3: Business Metrics (Does the Feature Matter?)

Ultimately, AI features need to move business outcomes.

- **Cost savings**: If the AI automates ticket triage, how many hours of agent time does it save per week? What's the dollar value?
- **Revenue impact**: Does the AI feature increase conversion, upsell, or retention?
- **Customer satisfaction**: NPS, CSAT, or support ticket volume changes after AI feature launch
- **Time-to-value**: How quickly do new users get value from the AI feature?

### Setting Targets: The "Good Enough" Threshold

Not every metric needs to be world-class. The target depends on the alternative — what users were doing before your AI feature.

A useful framework: **AI output should be at least as good as a median human performing the same task, in half the time.** If your AI classifier is 88% accurate and a typical support agent is 85% accurate, that's good enough to add value — even though 88% sounds imperfect.

For high-stakes features, the bar is higher: the AI should match expert-level humans AND include guardrails for edge cases it can't handle.

### A Metrics Dashboard in Practice

To make this concrete, here's what a real metrics dashboard might look like for the customer feedback classifier from the Opportunity Exercise:

| Metric | Layer | Target | Current | Status |
|---|---|---|---|---|
| Category accuracy | Model | >= 88% | 91.2% | On target |
| Sentiment accuracy | Model | >= 90% | 87.5% | **Below target** |
| p95 latency | Model | < 2s | 1.4s | On target |
| User acceptance rate | Product | >= 80% | 76% | **Below target** |
| Edit rate on summaries | Product | < 30% | 22% | On target |
| Fallback rate | Product | < 10% | 4% | On target |
| Agent hours saved/week | Business | >= 6 hrs | 7.5 hrs | On target |
| Support ticket volume | Business | -15% | -12% | Trending |

This dashboard tells a story: the model works well on categorisation but underperforms on sentiment. Users accept AI suggestions 76% of the time — close but below target. Investigation reveals that the "Below target" metrics correlate: tickets with wrong sentiment get edited more often and accepted less. The fix is clear: improve sentiment detection, not the entire model.

### Staged Rollouts: How to Ship Without Betting the Farm

Never launch an AI feature to 100% of users on day one. Use a staged rollout to limit blast radius and gather real production data:

**Stage 1: Shadow Mode (1-2 weeks)** — The AI runs alongside the existing process but users don't see its output. You compare AI decisions to human decisions to measure accuracy on real production data.

**Stage 2: Internal Dogfooding (1 week)** — Your team uses the AI feature internally. PMs, support leads, or engineers test it in their daily workflow and provide qualitative feedback.

**Stage 3: Limited Rollout (2-4 weeks)** — Ship to 5-10% of users, ideally a segment you can monitor closely (e.g., one customer cohort, one region, or opt-in beta users). Monitor all three metric layers. Set a kill criterion: "If acceptance rate drops below 60% or accuracy below 80%, pause and investigate."

**Stage 4: Gradual Expansion** — If metrics hold, expand to 25% then 50% then 100%, pausing at each stage for a few days to confirm stability.

This approach costs you 4-8 weeks of additional timeline but dramatically reduces the risk of a public failure. For your first AI feature, the slower pace is worth it.

---

## Part 3: Evals — Your Quality Safety Net

### What Are Evals?

Evals (evaluations) are automated tests that measure your AI feature's quality over time. Think of them as unit tests for AI: they run against a defined set of inputs and expected outputs, and they tell you when something breaks.

The difference from traditional testing: AI outputs are non-deterministic. The same input might produce slightly different outputs each time. Evals account for this by testing against quality criteria rather than exact matches.

### Why Evals Matter More Than You Think

Without evals, you're flying blind. Here's what goes wrong:

- **You change the prompt** to fix one issue and silently break three others
- **The model provider updates their model** and your feature's tone shifts overnight
- **Your data distribution drifts** (seasonal changes, new customer segments) and accuracy degrades gradually — too slowly for anyone to notice until it's a crisis
- **A new team member tweaks the system prompt** "to make it better" and doesn't test edge cases

Evals catch all of these. They're the difference between "we think the feature is working" and "we know."

### Building an Eval Suite

A practical eval system has three components:

**1. The Test Set (Golden Dataset)**

Curate 50-200 real examples with known-good outputs. These should cover:
- **Common cases** (~60%): The bread-and-butter inputs your feature handles daily
- **Edge cases** (~25%): Unusual inputs, ambiguous situations, multilingual content, very long or very short inputs
- **Adversarial cases** (~15%): Inputs designed to confuse the model — prompt injections, contradictory information, out-of-scope requests

Update this dataset quarterly or whenever you discover a new failure mode in production.

**2. The Scoring Method**

How do you grade AI output? Three approaches, in order of ease:

- **Exact match / rule-based**: For classification tasks where the output is a category. Straightforward: did the model output "billing" when the correct label is "billing"?
- **LLM-as-judge**: Use a separate (often stronger) model to grade the output. Give the judge the input, the expected output, and the actual output, and ask it to score on criteria like accuracy, completeness, and tone. This works surprisingly well for generative tasks and scales better than human review.
- **Human evaluation**: The gold standard but expensive. Reserve for periodic deep dives (monthly) or for validating that your automated evals are calibrated correctly.

**3. The Automation Pipeline**

Run evals automatically:
- **On every prompt/system change** (before deploying to production)
- **On a weekly schedule** (to catch model drift and data distribution changes)
- **On model provider updates** (when your API switches to a new model version)

Set alerts for score drops. A 5% accuracy decline on your eval set should trigger investigation before it becomes a user-facing incident.

### Worked Example: Eval Suite for Feedback Classifier

Suppose you built the customer feedback classifier from the Opportunity Exercise. Here's what your eval suite looks like:

**Test set**: 150 real feedback items, manually labelled by two PMs (disagreements resolved through discussion). Categories: Bug Report, Feature Request, Praise, Complaint, Question.

**Scoring**: Exact match on category (it's classification). Also track: "Was the sentiment correct?" and "Was the summary accurate?" using an LLM-as-judge.

**Targets**: Category accuracy >= 88%. Sentiment accuracy >= 90%. Summary rated "acceptable or better" by LLM judge >= 85%.

**Automation**: Runs nightly against the latest 100 production inputs (with human labels added next-day). Dashboard shows rolling 7-day accuracy. Alert if any metric drops below target for 3 consecutive days.

---

## Part 4: Bias, Fairness, and Safety

### Why This Section Isn't Optional

Every AI model carries biases from its training data. A hiring tool that recommends more men because historical hiring data skewed male. A content moderation system that flags African American English as toxic at higher rates. A medical triage chatbot that underestimates pain for certain demographics.

These aren't hypothetical scenarios — they're documented failures from well-funded companies with smart teams. As the PM shipping an AI feature, bias and safety are your responsibility, not just your ML engineer's.

### The PM's Bias Checklist

Before launch, work through these questions with your team:

**1. Who's in your training/evaluation data — and who isn't?**

If your feedback classifier was trained on data from North American, English-speaking customers, it will likely perform worse on feedback from other regions, languages, or writing styles. Map the demographic and contextual dimensions that matter for your product and check for representation gaps.

**2. What are the failure mode disparities?**

Don't just measure overall accuracy. Break it down by user segments. If your AI customer support tool resolves tickets for enterprise customers at 90% accuracy but only 70% for SMB customers, you have a fairness problem — even if the blended accuracy looks great.

**3. What are the consequences of bias in your specific feature?**

A biased recommendation engine that shows slightly less relevant products to some users is annoying. A biased fraud detection system that disproportionately flags transactions from certain zip codes is discriminatory. The severity determines how much you invest in mitigation.

**4. Can users contest or override AI decisions?**

Every user affected by an AI decision should have a clear path to challenge it. This is both good UX and, increasingly, a legal requirement (the EU AI Act requires this for high-risk applications).

### Building Fairness Into Your Process

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/diagrams/12-fairness-process.png" alt="Building fairness into your process — Pre-Build (audit data), During Build (test across segments), At Launch (segment metrics), Post-Launch (monitor for emergent bias)" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

**Pre-build**: Conduct a data audit. Document known gaps. Decide whether gaps are acceptable or need to be addressed before building.

**During build**: Run your eval suite segmented by user demographics, geographies, languages, and any other relevant dimensions. A model that passes aggregate evals but fails for a subgroup needs work.

**At launch**: Include segmented accuracy metrics in your launch dashboard. If you only track aggregate numbers, disparities hide.

**Post-launch**: Set up ongoing monitoring for emergent bias. As your user base changes, biases may emerge that didn't exist at launch.

### Safety Guardrails

Beyond bias, AI features can create safety risks. Here are the guardrails every PM should consider:

**Content filtering**: If your AI generates text that users will see, implement output filtering for harmful, offensive, or inappropriate content. Most model providers offer built-in safety filters; supplement with your own rules for domain-specific risks.

**Rate limiting and abuse prevention**: AI features can be exploited. A chatbot can be prompted to generate spam. A content generation tool can be used to produce misinformation at scale. Implement rate limits, usage monitoring, and escalation paths for suspicious patterns.

**Transparency**: Tell users when they're interacting with AI. Label AI-generated content clearly. This isn't just ethical — it manages expectations. Users are more forgiving of AI mistakes when they know it's AI.

**Data handling**: Be explicit about how user inputs to your AI feature are stored, used, and potentially used for training. Many users are uncomfortable with their data being used to improve models. Provide clear opt-out mechanisms and comply with your organisation's privacy policies.

**Incident response**: Have a plan for when things go wrong. Who gets alerted? What's the escalation path? Can you disable the AI feature quickly without bringing down the entire product? (Feature flags are your friend here.) Your AI feature should have a kill switch that any on-call engineer can flip.

### The Responsible AI Decision Record

For any AI feature with moderate to high user impact, document your decisions in a one-page record:

> **Feature**: [Name]
> **Risk level**: Low / Medium / High
>
> **Bias assessment**: [What did you check? What did you find?]
> **Fairness metrics**: [Which segments are you tracking? What are the targets?]
> **Transparency approach**: [How do users know it's AI? How do they contest decisions?]
> **Safety guardrails**: [Content filtering, rate limits, abuse monitoring]
> **Incident response**: [Who's on call? What's the kill switch?]
> **Review cadence**: [How often will you re-audit?]

This document takes an hour to write and saves you from the "we didn't think about that" conversation with your VP after an incident.

---

## Bringing It All Together

You've now completed the full journey from understanding AI foundations to shipping quality AI features. Here's how the modules connect:

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/diagrams/13-module-overview.png" alt="Course module overview — Module 1: Foundations leads to Module 2: Productivity, then Module 3: Opportunities, then Module 4: Ship" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

The best AI PMs combine technical fluency (Module 1) with personal productivity (Module 2), strategic thinking (Module 3), and execution discipline (Module 4). You don't need to be an ML engineer. You do need to ask the right questions, set the right quality bars, and make decisions that balance ambition with responsibility.

---

## Key Takeaways

- **Data quality trumps model quality.** Before you upgrade your model, audit your data. Most performance problems are data problems in disguise.
- **Measure at three levels.** Model metrics tell you the model works. Product metrics tell you the feature works. Business metrics tell you it matters. You need all three.
- **Evals are non-negotiable.** Without automated evaluation, every prompt change is a gamble. Build a golden dataset of 50-200 examples and test against it continuously.
- **Bias isn't someone else's problem.** Segment your metrics by user demographics. If a subgroup gets worse results, fix it before launch — not after a PR crisis.
- **Ship with a kill switch.** Feature flags, fallback paths, and incident response plans aren't overhead. They're how you ship AI responsibly.

---

## Explore Further

- **Google's Responsible AI Practices** — Practical guidelines for fairness, interpretability, and safety in AI systems: https://ai.google/responsibility/responsible-ai-practices/
- **Anthropic's Research on AI Safety** — Perspectives on building AI systems that are safe and beneficial: https://www.anthropic.com/research
- **Hugging Face Model Evaluation Guide** — Technical guide to running evals, building test sets, and using LLM-as-judge: https://huggingface.co/docs/evaluate
