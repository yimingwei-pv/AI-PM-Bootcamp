---
title: "Lab: Stress-Test Your AI Feature"
module: 4
lesson: 3
description: "Three rounds of increasing difficulty in Google AI Studio. By the end, you'll know exactly where your AI feature breaks — and have a plan for shipping it anyway."
objectives:
  - "Test an AI prompt against real data across three difficulty levels and measure accuracy at each stage"
  - "Diagnose failure modes through error analysis and iterate prompts to handle progressively harder inputs"
  - "Produce a ship-ready brief grounded in real test results, not assumptions"
resources:
  - title: "Google AI Studio"
    url: "https://aistudio.google.com"
    type: "docs"
  - title: "Anthropic Console Workbench"
    url: "https://console.anthropic.com"
    type: "docs"
  - title: "Anthropic Prompt Engineering Guide"
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
    type: "docs"
quiz:
  - question: "When you test a prompt on 20 real examples and 4 fail, what should you do BEFORE rewriting the prompt?"
    options:
      - "Try a more expensive model"
      - "Categorise the 4 failures into specific failure modes"
      - "Add more examples to the prompt"
      - "Increase the temperature setting"
    answer: 1
  - question: "What makes a ship-ready brief credible to stakeholders?"
    options:
      - "A detailed technical architecture diagram"
      - "Specific numbers from actual tests on real data, not estimates from a planning meeting"
      - "Approval from the engineering team"
      - "A competitive analysis showing other companies using AI"
    answer: 1
---

## Let's Get Set Up

For this lab, you're going to build something real. Not a theoretical framework — an actual working prompt, tested against actual data, with actual accuracy numbers. By the end, you'll have a brief you could genuinely present at sprint planning.

You'll work in [Google AI Studio](https://aistudio.google.com) — it's free, runs in your browser, and you just need a Google account. If you prefer, the [Anthropic Console Workbench](https://console.anthropic.com) works too (free tier, plus it has built-in eval tools you'll find useful in Round 3).

Open Google AI Studio now. Here's what you'll see:

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/google-ai-studio-overview.png" alt="Google AI Studio interface — Playground for testing prompts, model selector top-right, system instructions panel, prompt input at the bottom, and tools bar" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

A quick orientation:

- **Playground** (left sidebar) — this is where you'll spend your time. It's a sandbox for testing prompts and comparing model outputs.
- **Model selector** (top right) — pick which model to test with. Start with **Gemini 3 Flash** — it's fast, capable, and free for testing. You can always switch models later to see how results change.
- **System Instructions** (right panel) — this is where your prompt lives. Think of it as the persistent instructions the model follows for every message in the conversation.
- **Prompt input** (bottom) — type or paste your test inputs here and hit send.
- **Tools** (bottom bar) — this is where you can attach data sources or enable tool calling (the equivalent of RAG and function calling from [Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/)). You won't need this for the basic exercise, but it's good to know it's there.
- **Temperature and other settings** (right sidebar) — leave these at their defaults for now. Feel free to experiment later, but changing them mid-test makes it harder to compare results.

While that loads, grab two things:

1. **Your opportunity brief** from the Module 3 exercise ([Lesson 3.3](/AI-PM-Bootcamp/modules/opportunity-exercise/)). You need the specific problem you identified — what the AI feature does, who it's for, what inputs it processes.

2. **30 real examples** of the data your feature would handle. Customer tickets, Slack messages, support emails, Jira issues — whatever your feature would process in production. If you genuinely don't have access to real data, pull from your own inbox or team chat. The key is *real* messy human-generated text, not examples you write yourself. A great starting point if you're stumped is customer support enquiries.

Before we start testing, split your 30 examples into three batches:

**Batch A (10 examples):** The clean ones. Straightforward, representative, the kind of input your feature will see 80% of the time.

**Batch B (10 examples):** The messy ones. Long inputs, ambiguous language, multiple topics crammed into one message, unusual formatting, maybe a few in a different language.

**Batch C (10 examples):** The edge cases. Sarcasm, contradictions, edge cases that make you think "I have no idea what the model will do with this." If you're stuck, ask a colleague: "What's the weirdest ticket you've ever seen?" Use those.

Here's your scorecard — keep it open as you work through the three rounds:

| | Round 1 | Round 2 | Round 3 |
|---|---|---|---|
| Batch tested | A (clean) | B (messy) | C (adversarial) |
| Accuracy | ___% | ___% | ___% |
| New failure modes | ___ | ___ | ___ |
| Prompt changes made | ___ | ___ | ___ |

---

## Your First Prompt

In the **System Instruction** box in Google AI Studio, write a prompt for your feature using the PM Prompt Framework from [Lesson 2.2](/AI-PM-Bootcamp/modules/prompt-engineering/). Give the model a **Role** (who it's acting as), the **Task** (what it should do), the **Format** (how to structure the output), and **Constraints** (rules, edge cases, things it must not do). Then add 2–3 few-shot examples showing exactly what good input → output looks like.

Also jot down four quick design decisions from [Lesson 4.1](/AI-PM-Bootcamp/modules/design-ai-features/), one paragraph each:

> **Model:** [Which model and why — you're testing with Gemini Flash, but what would you ship with?] Answer this as if you could choose any model in the world.
>
> **Pattern:** [Copilot / Human-in-the-Loop / Autonomous / Chat / Ambient]
>
> **Failure fallback:** "When the AI [specific failure], the system [specific fallback]."
>
> **Knowledge:** [Prompt engineering only, or do you need RAG?]

Don't overthink these. You're picking a starting point, not making a permanent commitment. That's what the three rounds are for — to pressure-test your choices.

---

## Round 1: The Clean Run

Paste your first Batch A example into the chat. Hit send. See what comes back.

Take a moment with that first result. Is it what you expected? Better? Worse? Run the remaining nine Batch A examples the same way. For each output, score it honestly: **correct**, **partially correct** (close but you'd need to edit it), or **wrong**. Track results in a spreadsheet and start a new chat with the same settings (prompt, system settings etc) each time.

If you're hitting 80%+ accuracy on these clean inputs — good, your prompt handles the common case. If you're below 70%, pause here. Your prompt probably needs clearer instructions or better few-shot examples. Tweak it, re-run, and see what improves before moving on.

Pay special attention to the "partially correct" results. What specifically would you change to make them right? That gap between "close enough" and "actually correct" reveals exactly what your prompt is missing. Maybe it's getting the category right but the confidence wrong. Maybe the format is inconsistent. Those details matter.

**Write your Round 1 accuracy on the scorecard.**

---

## Round 2: The Messy Middle

Same prompt. Batch B this time — the harder examples.

This is usually where things get interesting. The model that looked sharp on clean inputs starts struggling with real-world messiness. A ticket that opens with a billing question but pivots to describing a bug. A message written entirely in lowercase with no punctuation. A three-paragraph rant where the actual request is buried in the last sentence.

Your accuracy will probably drop 15–25% from Round 1. That's normal, and it's exactly why you're doing this — you're seeing the gap between demo performance and production performance in real time.

Now read every failure carefully. Not just "it got this wrong," but *why*. Tag each one specifically: "classified a feature request as a bug because the customer described a workaround" tells you something actionable. "Bad output" tells you nothing. Group similar failures together. What you're building is a **failure taxonomy** — the same error analysis process from [Lesson 4.2](/AI-PM-Bootcamp/modules/shipping-with-quality/). You'll likely find that 2–3 root causes explain most of your failures.

Here's the satisfying part: go back to your system instruction and add targeted fixes. An extra constraint for multi-topic inputs. A few-shot example showing the edge case the model got wrong. Re-run Batch B with the updated prompt. Watch your accuracy recover.

**Record your Round 2 accuracy and the failure modes you found.**

---

## Round 3: Break Your Own Feature

Batch C. This round is different. You're no longer hoping the model gets it right — you're actively trying to make it fail.

Paste in the sarcastic complaint: "Absolutely love how the app crashes every time I open it. 10/10 experience." Try contradictory inputs — a subject line that says one thing and a body that says the opposite. Try something completely out of scope that a real user would plausibly send. If your feature is a classifier, try inputs that sit right on the boundary between two categories. If it's a summariser, try a 2,000-word stream-of-consciousness rant and see what it does.

Some of these will fail. That's the point — you're mapping the boundaries of where your feature works and where it breaks down.

Here's where the thinking shifts. In Rounds 1 and 2, you fixed failures by improving the prompt. In Round 3, not every failure *should* be fixed with the prompt. Some failures need a **fallback path** instead ([Lesson 4.1](/AI-PM-Bootcamp/modules/design-ai-features/)): a confidence threshold that routes to a human, a graceful "I wasn't able to process this" message, or an automatic flag for manual review. For each Round 3 failure, decide: is this a prompt problem or a design problem?

For the failure modes that will persist in production — the ones you can't prompt-engineer away — write an **eval** for each. One binary yes/no question that would catch this failure automatically: "Does the classification reflect the customer's actual sentiment, including sarcasm? Yes/No." Code-based if you can check it with a simple rule. LLM-as-judge if it requires comprehension. These evals become your safety net once the feature is live ([Lesson 4.2](/AI-PM-Bootcamp/modules/shipping-with-quality/)).

**Record your Round 3 accuracy, failure modes, and the number of evals you wrote.**

---

## Pull It Together: Your Ship-Ready Brief

Look at your scorecard. You've got three accuracy numbers that tell a story — how your feature performs on clean inputs, messy inputs, and adversarial inputs. You've got a failure taxonomy. You've got prompt iterations that worked and failure modes that need architectural solutions. You've got evals.

That's more evidence than most AI features ship with. Now write it up as a brief — the document you'd bring to sprint planning. Tell the story of what you tested and what you found:

> **The problem** you're solving and what it costs today (from your [Module 3](/AI-PM-Bootcamp/modules/identify-opportunities/) brief).
>
> **What you built** — your four design decisions: model, pattern, fallback, knowledge approach.
>
> **What you tested** — 30 real examples across three difficulty tiers. Round 1: [X]%. Round 2: [Y]%. Round 3: [Z]%. The drop between rounds is where the risk lives.
>
> **What breaks and why** — your 2–3 most important failure modes, ranked by how often they'd occur and how much damage they'd cause.
>
> **What you'd fix before shipping** — the prompt improvements that worked, plus the failures that need fallback paths, confidence thresholds, or human review gates.
>
> **How you'd measure success** — one metric per layer: model (accuracy/F1), product (acceptance rate/edit rate), business (time saved/cost reduced). The three layers from [Lesson 4.2](/AI-PM-Bootcamp/modules/shipping-with-quality/).
>
> **How you'd roll it out** — Shadow → Dogfood → Limited rollout → Expand. Your kill criteria: the specific numbers that would trigger a pause.
>
> **What you'd watch for** — who's underrepresented in your data, how users will know it's AI, whether they can override it.

---

## What Three Rounds Taught You

The accuracy drop between Round 1 and Round 3 is the most important number from this lab. It's the gap between best-case and real-world — the thing most demos hide and most launches discover too late.

If your drop was small (less than 10%), your prompt is more robust than most. If the drop was large (more than 25%), you've found exactly where to invest before shipping — and the evals you wrote are the safety net that catches regressions as you iterate.

Either way, you now have something you didn't have 30 minutes ago: evidence. Not "we think AI could help with this." Tested, on 30 real inputs, across three difficulty tiers, with a failure taxonomy, evals, and a rollout plan.

That brief is the compound of everything in this course. [Module 1](/AI-PM-Bootcamp/modules/llms/) gave you the technical foundations for understanding why models fail. [Module 2](/AI-PM-Bootcamp/modules/ai-powered-mindset/) taught you how to write prompts that work. [Module 3](/AI-PM-Bootcamp/modules/identify-opportunities/) taught you where to aim. [Module 4](/AI-PM-Bootcamp/modules/design-ai-features/) taught you how to design, test, and ship. This lab is where it all came together.

Module 5 covers what comes after: operating AI products at scale.

---

> **Going further:** If this lab sparked something and you want to push yourself, pair up with a colleague or engineer and try to ship a working prototype based on your brief. You've already done the hard thinking — the design decisions, the failure modes, the rollout plan. See how far you can get in a week. The gap between "tested in AI Studio" and "running in front of real users" is where the best learning happens.
