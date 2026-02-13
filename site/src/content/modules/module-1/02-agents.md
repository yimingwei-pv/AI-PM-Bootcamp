---
title: "AI Agents"
module: 1
lesson: 2
description: "Understanding AI agents — what differentiates them from basic LLMs, core agent architectures, and when to use agentic vs non-agentic AI in your products."
objectives:
  - "Define what is an AI agent and what differentiates it from a basic LLM"
  - "Understand basic agent architectures"
  - "Evaluate when to use agentic vs non-agentic AI"
resources:
  - title: "Anthropic: Building Effective Agents"
    url: "https://www.anthropic.com/research/building-effective-agents"
    type: "article"
  - title: "OpenAI: A Practical Guide to Building Agents"
    url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
    type: "docs"
  - title: "Prompt Engineering Guide: ReAct"
    url: "https://www.promptingguide.ai/techniques/react"
    type: "docs"
quiz:
  - question: "What is the fundamental difference between an LLM and an AI agent?"
    options:
      - "Agents use more powerful models"
      - "Agents add an orchestration layer with tools, a loop, and the ability to observe and adapt"
      - "Agents are always more accurate"
      - "Agents don't use LLMs at all"
    answer: 1
  - question: "If each step in an agentic workflow has a 95% success rate, what is the approximate overall success rate for a 10-step workflow?"
    options:
      - "95%"
      - "85%"
      - "60%"
      - "45%"
    answer: 2
  - question: "According to the simplicity hierarchy, what should you do when choosing an agent architecture?"
    options:
      - "Always use multi-agent systems for reliability"
      - "Start with ReAct agents for maximum flexibility"
      - "Start with the simplest architecture that could work and add complexity only when measured"
      - "Use the same architecture for all use cases"
    answer: 2
---

## Why Agents Matter Right Now

Starting in late 2024 and accelerating through 2025, every major AI company shifted its roadmap from "chat" to "agents." Anthropic released Claude with computer use. Salesforce launched AgentForce. Google introduced Project Mariner. OpenAI shipped Operator. The direction is unmistakable.

The reason is simple: **chatbots answer questions; agents do work.** And the products that will win in the next few years are the ones that don't just inform users — they act on their behalf.

As a PM, you'll increasingly be asked to evaluate whether a feature should be a simple LLM call, a structured workflow, or a full agent. Making the wrong choice here is expensive — both in engineering time and in user trust. This module gives you the framework to make that call.

---

## What Exactly Is an AI Agent?

As we covered in the LLMs lesson, a large language model takes text in and generates text out. It's a powerful prediction engine, but fundamentally it's **stateless and passive** — it responds, then waits.

An AI agent wraps that LLM in an orchestration layer that transforms it from a passive responder into an active problem-solver. The simplest way to understand the difference:

**An LLM is an expert consultant who can only talk.** They can analyse a problem brilliantly, but they can't pick up the phone, send an email, update your spreadsheet, or check a database. The conversation ends when they stop speaking.

**An AI agent is an executive assistant who can act.** You give it an objective, and it autonomously figures out a plan, takes actions in the world, observes the results, adapts its approach, and continues until it achieves the goal — or determines it can't.

What makes this possible? Five capabilities that agents add on top of the base LLM:

### The Five Core Capabilities

1. **Tool use and action-taking.** Agents can call APIs, query databases, update files, send messages, and interact with external systems. The LLM decides *which* tools to use and *when*.

2. **Planning and decomposition.** Agents break complex goals into steps. Ask an agent to "prepare a monthly report" and it plans a sequence: gather data → analyse trends → format results → deliver to stakeholders.

3. **Looping and iteration.** Agents operate in cycles. They take an action, observe the outcome, reason about it, and decide what to do next. This feedback loop is fundamental — it's why agents can recover from mistakes.

4. **Memory and context.** Agents maintain context over multiple turns. They remember what they've tried, what worked, and adjust their strategy accordingly.

5. **Autonomy with guardrails.** Agents make independent decisions within defined boundaries. You set the goal and constraints; the agent figures out execution.

### A Grounded Example

Here's a real pattern you'll see in production today — a **coding agent**:

- **Using a basic LLM:** You paste code into ChatGPT and ask "what's wrong with this function?" It reads the code and suggests a fix in text. You copy-paste the suggestion, run it yourself, find it doesn't quite work, go back and ask again. You're doing the heavy lifting.

- **Using an agent:** You tell a coding agent "fix the failing tests in this project." The agent reads the test output, identifies the failing tests, opens the relevant source files, writes a fix, runs the tests, sees one still fails, adjusts its approach, runs again, confirms all tests pass, and reports back. It looped three times autonomously to get to a working solution.

The difference isn't intelligence — the underlying LLM is the same. The difference is **orchestration**: the loop, the tools, the ability to observe and adapt.

---

## From LLM to Agent: The Architectural Shift

### The Basic LLM Call

<img src="/AI-PM-Bootcamp/images/modules/basic-llm-call.png" alt="Basic LLM call - User Input to LLM to Text Output" style="max-width: 400px; margin: 2rem auto; display: block;" />

Simple, synchronous, stateless. One input, one output, no awareness of the outside world.

### The Agentic Loop

<img src="/AI-PM-Bootcamp/images/modules/agentic-loop.png" alt="Agentic Loop - Goal, Reason, Act, Observe, repeat until goal achieved" style="max-width: 400px; margin: 2rem auto; display: block;" />

This loop — reason, act, observe, repeat — is the heartbeat of every agent. The LLM powers the reasoning; the orchestration layer manages the loop and tool execution.

### The Compounding Reliability Problem

Here's the critical insight that separates experienced AI PMs from enthusiastic ones: **agent reliability compounds negatively.**

If each step in an agentic workflow has a 95% success rate — which sounds excellent — here's what happens:

| Steps in Workflow | Overall Success Rate |
|---|---|
| 1 step | 95% |
| 3 steps | 86% |
| 5 steps | 77% |
| 10 steps | 60% |
| 20 steps | 36% |

A twenty-step agent workflow with 95%-reliable steps **fails nearly two-thirds of the time.** This math is why most successful agent deployments keep workflows short, build in error recovery, and use human checkpoints for critical decisions.

**Product implication:** When you're scoping an agent feature, count the steps. If you need more than five or six sequential decisions, look for ways to simplify the workflow, parallelise steps, or add human-in-the-loop checkpoints at critical junctures.

---

## Agent Architectures: The Patterns You'll Encounter

As a PM, you don't need to implement these patterns, but you need to recognise them — they have fundamentally different cost, speed, and reliability characteristics.

### 1. Augmented LLM (Simplest)

**How it works:** You give an LLM access to a few tools and let it decide — in a single pass — whether to call one. There's no loop. The LLM sees the user's question, optionally makes one tool call, and generates a final response.

<img src="/AI-PM-Bootcamp/images/modules/augmented-llm.png" alt="Augmented LLM architecture" style="max-width: 500px; margin: 2rem auto; display: block;" />

**Example:** A customer asks, "What's my account balance?" The LLM calls `get_account_info`, gets the data back, and writes a natural language response. One question, one tool call, one answer.

**Pros:** Simplest to build, fast, cost-effective, easy to debug.
**Cons:** No recovery if the tool call fails. Can't chain multiple steps together.
**Best for:** Q&A over a database, simple lookups, dashboards — anywhere a single tool call answers the question.

### 2. Structured Workflows (Function Calling + Chaining)

**How it works:** You pre-define a set of functions and can chain them in a fixed or semi-fixed sequence. The LLM outputs structured JSON to invoke tools, and the system can orchestrate multiple calls in a predefined order. Unlike the augmented LLM, this pattern supports **multi-step sequences** — but the steps are predictable, not open-ended.

**Example:** A customer says "I want to return my order." The system: (1) calls `get_order_details`, (2) checks `return_eligibility`, (3) if eligible, calls `initiate_return`. Three steps, but the path is known in advance.

**Pros:** Fast, reliable (constrained to known functions), cheaper (fewer tokens), easier to monitor and audit.
**Cons:** Less flexible — limited to pre-defined functions and sequences. Requires you to anticipate the paths the agent will need.
**Best for:** Order processing, CRM updates, approval workflows — well-defined, repetitive tasks. This is the workhorse of production AI systems.

### 3. ReAct (Reason + Act)

**How it works:** The agent explicitly interleaves thinking, action, and observation on every turn:

- **Thought:** "I need to find Q3 revenue. Let me check the sales database."
- **Action:** Calls `query_sales_database(quarter="Q3", year=2024)`
- **Observation:** Gets result `$2.5M`
- **Thought:** "Now I need to compare against Q2. Let me query that too."

The loop repeats until the agent decides it has enough information.

**Pros:** Transparent reasoning (you can audit what the agent was thinking), flexible (handles novel problems), works for complex multi-step analysis.
**Cons:** Verbose (more tokens = higher cost), slower (multiple LLM round-trips), less deterministic.
**Best for:** Complex research, debugging, open-ended analysis — anywhere the path to an answer isn't known in advance.

### 4. Multi-Agent Orchestration

**How it works:** Instead of one agent doing everything, multiple specialised agents coordinate under a central orchestrator — like assigning tasks to different team members.

<img src="/AI-PM-Bootcamp/images/modules/multi-agent-orchestration.png" alt="Multi-agent orchestration pattern" style="max-width: 500px; margin: 2rem auto; display: block;" />

**Example:** Customer asks, "Can you deliver 50 units of product X by Friday at the best price?"
1. **Orchestrator** decomposes the request
2. **Sales Agent** queries pricing for that quantity
3. **Inventory Agent** checks stock availability
4. **Shipping Agent** checks delivery feasibility and cost
5. **Orchestrator** synthesises all answers into a single response

**Pros:** Scalable (add new agents without rewriting), resilient (one agent failing doesn't stop all), agents can run in parallel (faster).
**Cons:** Harder to debug, higher infrastructure complexity, agents can produce conflicting results.
**Best for:** Enterprise systems with complex, multi-domain problems where no single agent can hold all the context.

### Choosing Between Them: The Simplicity Hierarchy

You've now seen four patterns ranging from dead simple to highly complex. So which do you pick? Anthropic's research on production agents distilled the answer into one principle:

> **Start with the simplest architecture that could work. Add complexity only when you measure that it's necessary.**

<img src="/AI-PM-Bootcamp/images/modules/simplicity-hierarchy.png" alt="Simplicity hierarchy - start simple, add complexity only when needed" style="max-width: 500px; margin: 2rem auto; display: block;" />

Most problems that sound like they need a ReAct agent can be solved with structured workflows. Most problems that sound like they need multi-agent systems can be solved with a single well-designed agent. **Complexity is a cost, not a feature.**

---

## When to Build an Agent vs. When Not To

This is the critical decision. Not every problem needs an agent, and reaching for agent complexity when it's unnecessary is one of the most common — and most expensive — mistakes in AI product building.

### The Four-Question Framework

Work through these in order:

**Question 1: Does the task require multiple steps or decisions?**
- If NO → An augmented LLM or simple function call suffices. ("Summarise this document" doesn't need an agent.)
- If YES → Continue to Question 2.

**Question 2: Can you hard-code the sequence?**
- If YES → Build a fixed workflow, not an agent. You know the exact path. ("If order > $1000 AND customer is premium, offer expedited shipping.")
- If NO → The path is variable. Continue to Question 3.

**Question 3: Does the task require action in external systems?**
- If NO → An LLM with good prompting may be enough. ("Analyse this data and write insights" is generation, not action.)
- If YES → You likely need an agent. Continue to Question 4.

**Question 4: What's the cost of an error?**
- Low → The agent can be exploratory, with lighter guardrails. (Drafting emails, brainstorming.)
- High → You need human-in-the-loop approval, rollback mechanisms, and rigorous testing. (Financial transactions, medical recommendations.)

### Quick Reference: The Build Matrix

Here's the four-question framework applied to common scenarios — use this as a cheat sheet:

| Scenario | Multi-Step? | Variable Path? | Real Actions? | Recommendation |
|---|---|---|---|---|
| Customer support Q&A | No | No | No | Augmented LLM |
| Lead scoring in CRM | Yes | No | Yes | Structured workflow |
| Report generation with data | Yes | No | No | LLM + structured prompting |
| Dynamic pricing optimiser | Yes | Yes | Yes | ReAct agent or function calling |
| E-commerce order fulfilment | Yes | Yes | Yes | Multi-agent (one per domain) |
| Research assistant | Yes | Yes | No | ReAct with tool access |

### Red Flags: When NOT to Build an Agent

- **"We need an agent because everyone has one."** If a fixed workflow or structured LLM call solves it, use that. Agent complexity is not a feature users value.
- **"It needs to be fully autonomous."** The most successful agent deployments in 2024-2025 are *not* fully autonomous. They have domain boundaries, human checkpoints, and measurable goals. Autonomy sounds impressive; reliability is what ships.
- **"It's complex, so it needs an agent."** Complexity in the problem doesn't automatically mean you need agent architecture. A well-designed prompt or workflow might handle it at a fraction of the cost.

---

## Real-World Agent Patterns (2024–2026)

Understanding how agents are actually being deployed — not in demos, but in production — helps calibrate your expectations.

**Customer service (Zendesk, Intercom):** Agents auto-resolve tickets by checking knowledge bases, looking up account info, and applying standard policies. Architecture is typically augmented LLM + function calling. Early adopters report significant reductions in tickets requiring human handling — often 40% or more, depending on implementation quality and use case specificity. These are the most mature agent deployments today.

**Sales workflows (Salesforce AgentForce):** Agents analyse deal pipelines, draft follow-up emails, update forecasts, and suggest next-best-actions. Typically ReAct or multi-agent. Sales teams report meaningful time savings on administrative work.

**Code generation (GitHub Copilot, Cursor, Claude Code):** Coding agents that can read codebases, write code, run tests, and iterate on failures. This is the canonical example of the agentic loop working in production — the ability to run code and observe results creates a natural feedback loop.

**Internal operations:** Many companies are building agents for internal workflows — expense processing, IT ticket routing, data pipeline monitoring — where the cost of error is low and the volume is high.

### The Pattern Across All Successful Deployments

The common thread: **narrow scope, human checkpoints, measurable goals.** No production agent today is doing open-ended, fully autonomous work across domains. The ones that ship — and stay shipped — handle specific, well-defined tasks within clear boundaries.

---

## Key Takeaways

1. **An agent = LLM + tools + a loop.** The underlying model is the same; what changes is the orchestration layer that lets it plan, act, observe, and adapt.

2. **Reliability compounds negatively.** A 95%-reliable step produces a 60%-reliable 10-step workflow. Keep agent workflows short, or build in recovery mechanisms. This is the single most important insight for PM decision-making.

3. **Start simple, add complexity only when measured.** Augmented LLM → structured workflows → ReAct → multi-agent. Most problems are solved before you reach ReAct. The Simplicity Hierarchy is your guide.

4. **Use the four-question framework:** Multi-step? → Variable path? → Real actions? → Cost of error? This sequence tells you whether you need an agent and what kind.

5. **Agents need different product design.** Users interact differently with systems that take autonomous action. You need transparency (what is the agent doing?), reversibility (can we undo it?), and trust-building (human approval for high-stakes actions).

6. **Context engineering makes or breaks agents.** The quality of what goes into the agent's context window at each step determines success or failure — more on this in the Context Engineering lesson.

---

## Explore Further

- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) — The most practical guide to agent architecture patterns, from the team behind Claude.
- [OpenAI: A Practical Guide to Building Agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) — Covers tool use, orchestration, and guardrails.
- [Prompt Engineering Guide: ReAct](https://www.promptingguide.ai/techniques/react) — Deep dive on the ReAct pattern with research references.
