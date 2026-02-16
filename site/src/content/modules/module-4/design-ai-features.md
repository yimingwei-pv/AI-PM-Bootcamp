---
title: "Design AI Features"
module: 4
lesson: 1
description: "Make the four design decisions that separate AI features users trust from AI features that get quietly rolled back."
objectives:
  - "Evaluate and select AI models based on your task's actual performance, not leaderboard scores"
  - "Design failure-resilient AI features with fallback paths, confidence scoring, and drift detection"
  - "Choose the right AI interaction pattern (Copilot, Autonomous, Human-in-the-Loop, Chat, Ambient)"
  - "Decide between prompt engineering, RAG, and fine-tuning for giving models domain knowledge"
resources:
  - title: "Anthropic Claude Model Documentation"
    url: "https://docs.anthropic.com"
    type: "docs"
  - title: "Google People + AI Guidebook"
    url: "https://pair.withgoogle.com/guidebook"
    type: "docs"
  - title: "Hugging Face Open LLM Leaderboard"
    url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard"
    type: "docs"
quiz:
  - question: "When evaluating AI models for a product feature, what should you prioritise over benchmark scores like MMLU?"
    options:
      - "The model's parameter count"
      - "Quality on YOUR specific task with real examples from your product"
      - "The model's release date"
      - "The model provider's brand reputation"
    answer: 1
  - question: "According to the design patterns, most AI features should launch as which pattern before graduating to more autonomous operation?"
    options:
      - "Conversational Interface"
      - "Ambient/Inline AI"
      - "Copilot or Human-in-the-Loop"
      - "Autonomous Agent"
    answer: 2
---

## From Opportunity to Design

In Module 3, you identified viable AI opportunities, scored them for viability ([Lesson 3.2](/AI-PM-Bootcamp/modules/assessing-viability/)), and wrote opportunity briefs ([Lesson 3.3](/AI-PM-Bootcamp/modules/opportunity-exercise/)). If you followed the exercise, you have a shortlist of candidates with specific problem statements and success criteria.

Now you need to design the feature. The gap between "the AI works in a demo" and "the AI works in production" is filled by product decisions.

This lesson covers the four decisions that matter most: choosing a model, designing for failure, picking the interaction pattern, and deciding how the model gets its knowledge. Each one directly determines whether users trust your feature — or whether it gets quietly rolled back six weeks after launch.

---

## Part 1: Choosing a Model

New models drop monthly. Benchmarks shift. Pricing changes overnight. If you evaluate models by reading leaderboards, you'll make the wrong choice — because leaderboards measure academic tests, and your product isn't an academic test.

The model market as of early 2026 includes OpenAI's GPT series, Anthropic's Claude series, Google's Gemini series, Meta's Llama (open-source), and Mistral (open-source). But the specific names matter less than knowing what to evaluate.

### Five Evaluation Dimensions (In Priority Order)

**1. Quality on YOUR task.** Not MMLU. Not HumanEval. Not whatever benchmark the provider is promoting this month. Assemble 50+ real inputs from your product, run them through 3–4 candidates, and score outputs on accuracy, tone, and format. This takes a day or two and saves months of building on the wrong foundation.

**Why this matters for PMs:** This is the single most important step. A model that ranks #3 on a leaderboard might outperform #1 on your specific use case. The only way to know is to test with your data.

**2. Latency.** For inline suggestions (smart compose), anything above 200ms feels sluggish. For background summarisation, 10 seconds is fine. Know your latency budget before you evaluate. This is particularly important for voice features and live AI editing features.

**3. Cost per token.** The gap between frontier and small models can be 10–50× per token. Unlike traditional SaaS, AI features have marginal costs that scale with usage — every API call costs money. A feature that handles 1,000 requests a day might be affordable; the same feature at 100,000 requests needs a fundamentally different cost structure. This is the inference treadmill: your costs grow with your success. Model your costs at expected volume, at 5× volume, and at 10× volume. If the 10× number makes your manager uncomfortable, plan for model routing from day one. Build cost projections into your business case early, and revisit them at every usage milestone.

**4. Context window.** How much text can you send at once? This ranges from 4K tokens in older models to 1M tokens in frontier models like Claude and Gemini. If your feature processes 50-page contracts, a small window is a dealbreaker — or forces chunking strategies that add complexity and degrade quality. (Remember from [Lesson 1.1](/AI-PM-Bootcamp/modules/llms/): context window limits directly determine what information the model can see.)

**5. Capabilities.** Does it handle images? Audio? Function calling? Structured JSON output? Check actual capabilities, not marketing materials. Do desktop research on the leading LLM models for your use case or industry. Then test these models yourself! Below is a graph of top models used for finance on [OpenRouter](https://openrouter.ai/rankings?category=finance&context-length=100K#categories). As of 16/02/2026, Gemini 3 has 13% usage market share within finance. So if you are building an AI feature in finance, Gemini 3 is definitely worth investigating and testing out for yourself.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/openrouter-finance-rankings.png" alt="OpenRouter model rankings for finance — showing Gemini 3 with 13% market share" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

### In Practice: How Real Teams Choose Models

Duolingo's approach illustrates how model selection plays out in production. When building their AI language features, they didn't pick one model — they layered several. Their internal system, Birdbrain, is a statistical model that trains nightly on roughly 500 million lessons from the previous day, handling personalised lesson difficulty and sequencing. For conversational practice and open-ended explanations — features that require natural language generation — they partnered with OpenAI and used GPT-4, fine-tuned on millions of lesson interactions across 40+ languages. The internal model handles the high-volume, personalisation-heavy work cheaply; the frontier model handles the complex, open-ended interactions where quality matters most.

Notion AI takes a similar approach at an architectural level. Their team routes different tasks to different models: high-reasoning models for writing specs and long-form generation, large-context-window models for searching workspace history, and fine-tuned cost-efficient models for auto-filling fields. Rather than committing to one provider, they built an evaluation pipeline — combining LLM-as-judge scoring, structured test fixtures, and human-labelled feedback — that lets them rapidly test and deploy new models from any provider. The lesson: model selection isn't a one-time decision. It's an ongoing capability.

### Model Routing

You don't have to pick just one model. Many production features use a lightweight model for 80% of requests and route complex cases to a frontier model. A routing layer that classifies request complexity and dispatches accordingly can cut costs dramatically while maintaining quality where it matters. [OpenRouter](https://openrouter.ai/) is one such example where you can swap between model families with only a single integration.

**Why this matters for PMs:** Your engineers will handle the mechanics of model routing. Your job is to stay across the model landscape — which providers offer what, where capability gaps exist, and how pricing is shifting. This matters most when you're working on features where model performance is still developing and you need to know what's on the frontier versus what's production-ready today.

### Open Source vs. Closed Source

|               | Closed Source (GPT-5.2, Claude, Gemini)                                       | Open Source (Llama, Mistral, Qwen)                                    |
| ------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Strengths** | Higher capability on hardest tasks, managed infrastructure, rapid improvement | Full control, fine-tune freely, no per-token costs beyond compute     |
| **Tradeoffs** | Vendor dependency on pricing, uptime, and policy                              | Operational complexity, generally lower capability on demanding tasks |
| **Best for**  | Ship fast; cost isn't the binding constraint                                  | Strategic features at high volume; cost-sensitive at scale            |

**Why this matters for PMs:** You don't need to make the open-source versus closed-source decision yourself — your engineering team will have strong views and they should. What you need to know is that the choice exists, that it affects your cost structure and vendor dependencies, and that many teams start with closed-source to validate quickly and consider open-source later if volume and cost justify the switch. Ask your engineers which approach they recommend and why — then factor their reasoning into your business case.

> **Exercise:** Take the AI opportunity you identified in [Module 3](/AI-PM-Bootcamp/modules/identify-opportunities/). Write a one-paragraph model evaluation plan: what are the 50+ real inputs you'd test with? What's your latency budget? Estimate the cost per request at your expected volume and at 10× volume. Would you start with a single model or plan for routing from day one? Compare your reasoning against how Duolingo and Notion AI approached the same decisions.

---

## Part 2: Designing for Failure

Most teams skip this part — and it's the one that determines whether your AI feature earns trust or gets quietly abandoned.

### Accept This: AI Will Fail

Not might. *Will.* LLMs hallucinate. Classifiers produce false positives. Extraction models miss edge cases. It's baked into how these systems work — as you learned in [Lesson 1.1](/AI-PM-Bootcamp/modules/llms/), LLMs are probabilistic text prediction engines, not truth engines. You already evaluated your opportunity's error tolerance in [Lesson 3.1](/AI-PM-Bootcamp/modules/identify-opportunities/). Now you need to turn that assessment into concrete design decisions. Your job isn't to prevent failure. It's to make failure graceful.

The cost of skipping this work is real. In 2021, Zillow shut down its iBuying division, Zillow Offers, after its pricing algorithm systematically overvalued properties in a volatile market. The write-down exceeded $540 million and the company cut 25% of its workforce — roughly 2,000 jobs. The algorithm's aggregate accuracy looked acceptable in testing, but nobody had designed for the failure mode that actually hit: the model couldn't adapt when market conditions shifted rapidly. There was no graceful degradation, no human-in-the-loop override for high-risk purchases, and no kill criteria that would have paused buying before the losses compounded. The model wasn't the problem. The absence of failure design was.

### Four Questions to Answer Before Writing Code

**1. What does failure look like for this specific feature?**

Map the concrete failure modes. For an AI ticket summariser: hallucination (inventing details), omission (missing the key issue), misclassification (tagging billing as feature request), tone mismatch (casual summary for a legal escalation). Each has different consequences and needs different mitigations.

**2. What's the blast radius of each failure?**

Failures aren't equal. A misrouted ticket adds 10 minutes of delay. A hallucinated claim that a customer threatened legal action could trigger an unnecessary legal review. Score each failure by frequency × severity to prioritise your mitigation work.

**3. What's the fallback path?**

For every AI-powered flow, design the non-AI path:
- **Graceful degradation:** Show original content without AI enhancement
- **Human escalation:** Route to a person when confidence is low
- **Cached response:** Last good output until quality recovers
- **Transparent failure:** "I wasn't able to summarise this ticket. Here's the original."

The worst outcome — far worse than any of these — is **silent failure**: a confidently wrong answer that nobody notices.

**4. How will you detect failure in production?**

Four mechanisms: **confidence scoring** (set thresholds, flag anything below for human review), **output validation** (does the summary mention entities from the original input?), **user feedback loops** (thumbs up/down, "this is wrong" flags, edit tracking), and **drift detection** (monitor weekly accuracy, not just launch-day accuracy). Pay particular attention to edit tracking — if users modify 40% of your AI's suggestions, you have a quality problem, even if your model metrics look good. Product-level signals often reveal issues that model metrics hide (more on this in Lesson 4.2).

### Build Trust Into the Architecture

Detection tells you when things go wrong. The best AI features go further — they earn trust by design.

**Constrain outputs.** Don't let the model say anything it wants. A ticket classifier that returns one of eight predefined categories is far safer than one that generates freeform labels. Structured output formats — JSON schemas, enum fields, constrained generation — reduce the surface area for failure.

**Surface uncertainty.** When the model isn't confident, say so. A confidence score next to every AI suggestion teaches users when to trust and when to double-check. Over time, users develop calibrated intuition about your feature's reliability — which is far better than blind trust or blanket scepticism.

**Cite sources.** If your feature uses RAG, show users where the answer came from. "Based on your Help Centre article on billing disputes" is verifiable. "Here's what I think" is not. Source attribution transforms AI from a black box into a transparent assistant that users can fact-check.

**Why this matters for PMs:** Trust isn't a feeling — it's an architectural decision. Features that survive past launch are the ones designed so users can verify, override, and understand AI output without effort.

### Worked Example: AI Ticket Router

| Failure Mode | Frequency | Severity | Mitigation |
|---|---|---|---|
| Wrong team assignment | ~10% | Medium — 15 min delay | Show routing suggestion; agent confirms or overrides |
| Unrecognised ticket type | ~3% | Low — falls to general queue | Default to general queue with "needs triage" flag |
| Model downtime | ~0.1% | High — all routing stops | Automatic fallback to keyword-based rules engine |
| Confident wrong answer | ~2% | High — agent trusts AI, doesn't verify | Display confidence score; flag low-confidence predictions |

The design: launch as human-in-the-loop (AI suggests, agent confirms) for the first month. After accuracy exceeds 95% on 1,000+ tickets, graduate to autonomous with monitoring. That graduation path is designed into the feature from day one — not tacked on after launch.

---

## Part 3: Choosing the Interaction Pattern

The instinct is to build a chatbot. Resist it — the right interaction pattern depends on your workflow, and it's rarely obvious from the problem statement alone.

Before choosing a pattern, map the workflow you're augmenting. Find the exact moment where friction lives — not the whole process, but the specific step where a human is slow, bored, or error-prone. Gmail's Smart Compose doesn't help you think about what to write; it helps you type what you've already decided to say. That precision matters. An AI feature injected at the wrong moment feels intrusive. The same capability at the right moment feels invisible.

The pattern you choose shapes how users experience the AI, how much trust they need to extend, and how much damage a failure can cause. Five patterns cover most production use cases.

### Pattern 1: Copilot — AI Assists, Human Decides

The AI generates suggestions; the human accepts, edits, or rejects. GitHub Copilot is the canonical example: it suggests code inline, and the developer accepts, edits, or tabs past. When Copilot launched in 2022, its acceptance rate started at around 27% and climbed to 35% within six months — meaning even a well-built copilot gets rejected more often than accepted, and that's fine. The pattern works because each rejection costs the user almost nothing (a glance and a keypress), while each acceptance saves meaningful time.

**Use when:** The task requires human judgement, errors are easy for users to spot, and users are domain experts. Risk is low because the human is the safety net.

### Pattern 2: Autonomous Agent — AI Acts, Human Monitors

At the other end of the spectrum: the AI takes action independently, and humans review outcomes after the fact. Automated ticket routing, spam filters, fraud detection. If you're building an agent-based feature, revisit the Simplicity Hierarchy from [Lesson 1.2](/AI-PM-Bootcamp/modules/agents/) — start with the simplest architecture that works.

**Use when:** Volume makes per-action human review impractical, the task is well-defined, and you have robust monitoring and rollback. Risk is medium to high — demands strong observability.

### Pattern 3: Human-in-the-Loop — AI Suggests, Human Approves

A middle ground: the AI does the work but pauses for human approval before action. Content moderation queues, AI-drafted emails reviewed before sending.

**Use when:** Errors have significant consequences and compliance requires human oversight. If you plan to eventually run a feature autonomously, this is where to start.

### Pattern 4: Conversational Interface (Chat)

The user drives the interaction through natural language. Customer support chatbots, internal Q&A assistants.

**Use when:** The task is exploratory, users have varying needs, and the interaction benefits from back-and-forth. The risk here is subtler: users tend to over-trust conversational AI, so set expectations clearly.

### Pattern 5: Ambient/Inline AI — Contextual Suggestions

The AI works in the background, surfacing suggestions in the flow of work without being asked. Gmail's Smart Compose is a masterclass in this pattern: suggestions appear as greyed-out text while you type, and a single tab press accepts them. Google's engineering team found that latency was the critical design constraint — anything above 100ms felt laggy, so they optimised their model to respond at the 90th percentile within 60ms. The feature only triggers when model confidence is high, which means users see suggestions often enough to be useful but not so often that they become noise. Spotify's Discover Weekly operates in the same pattern — 30 personalised songs generated every Monday, requiring zero user input.

**Use when:** The suggestion is low-stakes and easy to ignore. Risk stays low as long as users can dismiss suggestions; it spikes if suggestions auto-apply.

### The Decision Framework

Start with the stakes:

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/interaction-pattern-decision-framework.png" alt="Decision framework for choosing AI interaction patterns — Low stakes with high volume leads to Ambient/Inline, low stakes with lower volume leads to Copilot, high stakes where a human can review each leads to Human-in-the-Loop, high stakes with volume too high to review leads to Autonomous plus monitoring" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

**Why this matters for PMs:** Default to Copilot or Human-in-the-Loop for your first launch. Earn the right to go autonomous through evidence — not conviction.

> **Exercise:** For the top opportunity you identified in the [Module 3 exercise](/AI-PM-Bootcamp/modules/opportunity-exercise/), which interaction pattern would you choose? Walk through the stakes analysis: what happens when the AI is wrong, and does that push you toward human oversight or away from it?

---

## Part 4: How the Model Gets Its Knowledge

Where does the model get the knowledge it needs for your task? Three approaches — and they're layers, not mutually exclusive choices.

### Prompt Engineering (Start Here — Always)

Craft instructions, examples, and constraints directly in the prompt. No model modification, no infrastructure beyond an API call.

**Works when:** The task can be described in natural language, you have a clear output format, and the model's general knowledge is sufficient.

**Stops working when:** The model consistently ignores instructions, requires knowledge it doesn't have, or prompt length is eating your context window and budget.

Always start here. A well-crafted system prompt with 3–5 examples gets you further than most teams expect — and changes deploy instantly at minimal cost. (This builds directly on the PM Prompt Framework from [Lesson 2.2](/AI-PM-Bootcamp/modules/prompt-engineering/) and the context engineering techniques from [Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/).)

### RAG — Retrieval-Augmented Generation (When the Model Needs Your Data)

At query time, retrieve relevant documents from your data and inject them into the prompt — the technique you covered in [Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/).

**Works when:** The model needs your knowledge base, product docs, or customer records — especially when that data changes frequently.

**Doesn't work well when:** Your data is unstructured, poorly organised, or contradictory. Critically: RAG doesn't fix behaviour problems. Wrong tone or format is a prompt engineering or fine-tuning issue, not a knowledge issue.

Slack AI is a good example of RAG in production. When a user asks a question, Slack retrieves relevant messages and threads from the workspace, injects them into the prompt, and generates an answer grounded in the organisation's actual conversations — not the public internet. Each request is stateless: the model retains no data between queries, and summaries are ephemeral. If a source message is later deleted (say, by a compliance policy), the derived summary is invalidated too. The product decisions here — stateless calls, ephemeral outputs, source-grounded answers — all stem from the specific constraints of enterprise communication data.

**Practical cost:** A vector database, an embedding model, a retrieval pipeline, and ongoing data ingestion. Expect 2–4 weeks of engineering for a basic setup.

### Fine-Tuning (Last Resort, Sometimes Necessary)

Training the model on your data to learn new behaviours, formats, or domain expertise.

**Use when:** You need consistent behaviour that prompt engineering can't reliably produce. You have hundreds to thousands of high-quality examples. Latency matters and you want a smaller model performing like a bigger one on your specific task. Cost at scale justifies the upfront investment. That said, most teams that think they need fine-tuning actually need better prompts or RAG — it's the right answer far less often than people assume.

### In Production, Combine All Three

A customer support Q&A bot might use:
- **Fine-tuning** to teach a smaller model the company's tone (saving cost)
- **RAG** to retrieve the latest help articles at query time (keeping answers current)
- **Prompt engineering** to control each interaction (persona, examples, format constraints)

The layering follows a clear progression:

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/knowledge-layering-progression.png" alt="Knowledge layering progression — start with Prompt Engineering, add RAG when the model needs your data, add Fine-Tuning only when the first two plateau" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

This ordering minimises cost, complexity, and time-to-ship at every step.

---

## Key Takeaways

1. **Benchmark on your task, not on leaderboards.** Model rankings change monthly; your use case doesn't. Test 3–4 candidates on 50+ real examples before committing. A day of testing saves months of building on the wrong foundation.

2. **Design for failure before you design for success.** Map every failure mode, its blast radius, and the fallback path. Silent failure — confident wrong answers that nobody catches — is the worst possible outcome.

3. **Pick the interaction pattern that matches the stakes.** Map your workflow, find the friction point, and choose accordingly. Default to human oversight for launch — design the graduation path to autonomy before you ship, not after.

4. **Layer your knowledge architecture.** Prompt engineering first, RAG when you need proprietary data, fine-tuning only when simpler approaches aren't enough. This ordering saves time, money, and complexity at every step.

---

## Explore Further

- [Anthropic Claude Documentation](https://docs.anthropic.com) — Model capabilities, pricing, context windows, and integration guides.
- [Google People + AI Guidebook](https://pair.withgoogle.com/guidebook) — Design patterns and best practices for human-AI interaction.
- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard) — Compare model performance across benchmarks. Useful as a starting point, but remember: always test on your own data.
