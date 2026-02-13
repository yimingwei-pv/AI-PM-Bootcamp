---
title: "Context Engineering"
course: 3
module: 3
description: "Master context engineering — the art and science of filling the context window with the right information. Covers prompt engineering techniques, RAG, and MCP."
objectives:
  - "Understand different types of prompt engineering"
  - "Understand RAG and its use case"
  - "Understand MCP and its use case"
resources:
  - title: "Anthropic: Effective Context Engineering for AI Agents"
    url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
    type: "article"
  - title: "Introducing the Model Context Protocol"
    url: "https://www.anthropic.com/news/model-context-protocol"
    type: "article"
  - title: "Prompt Engineering Guide"
    url: "https://www.promptingguide.ai/"
    type: "docs"
  - title: "OpenAI Tokenizer"
    url: "https://platform.openai.com/tokenizer"
    type: "docs"
quiz:
  - question: "What is the key difference between prompt engineering and context engineering?"
    options:
      - "They are the same thing"
      - "Prompt engineering focuses on writing better instructions; context engineering architects the entire information environment"
      - "Context engineering only applies to RAG systems"
      - "Prompt engineering is more advanced"
    answer: 1
  - question: "When should you use RAG instead of including information directly in the prompt?"
    options:
      - "Always, because RAG is more accurate"
      - "When the knowledge base is too large to fit in the context window or changes frequently"
      - "Only for customer-facing applications"
      - "When you need faster response times"
    answer: 1
  - question: "What is MCP best described as?"
    options:
      - "A replacement for RAG"
      - "A type of prompt engineering"
      - "A standardised protocol for connecting LLMs to live systems and tools"
      - "A machine learning training technique"
    answer: 2
---

## Why Context Engineering Is the PM's Secret Weapon

The difference between an AI feature that delights users and one they abandon often comes down to one thing: **what information was in the model's context when it generated its response.** The same LLM, given the same question, will produce a mediocre answer with a vague prompt and a brilliant answer with the right context. This isn't model quality. It's **context quality.** And as a PM, you own it.

Andrej Karpathy, one of the most prominent voices in AI, captured this with a useful reframing: the term "prompt engineering" — writing better instructions — is giving way to **context engineering** — architecting the entire information environment your model operates in. Think of the distinction this way: **prompt engineering** is writing a perfect instruction on a sticky note; **context engineering** is designing the entire workspace — reference materials, tools, examples, and history — so your team member can do exceptional work.

<img src="/AI-PM-Bootcamp/images/course-3/context-engineering-tweet.png" alt="Andrej Karpathy on context engineering" style="max-width: 600px; margin: 2rem auto; display: block;" />

More formally: **context engineering is the art and science of filling the context window with just the right information for the next step.** As we covered in the LLMs lesson, the context window is the maximum number of tokens a model can process at once — everything inside is visible; everything outside is invisible. And as we discussed in the Agents lesson, agent failures are frequently context failures — the model is capable, but it's working with incomplete or poorly organised information. Your job as a PM: designing what goes into that context, in what order, at what time.

---

## The Three Pillars of Context Engineering

Context engineering encompasses three complementary approaches. Understanding each helps you choose the right tool for different product challenges.

| Pillar | What It Does | Best For |
|---|---|---|
| **Prompt Engineering** | Direct instruction and in-context learning | Shaping model behaviour, providing examples |
| **RAG** | External knowledge and document retrieval | Large knowledge bases, frequently updated info |
| **MCP** | Live connections and tool integration | Real-time data, actions in external systems |

---

## Part 1: Prompt Engineering Techniques

Prompt engineering is the foundation. It's about how you structure the information you're directly putting into the model's context window. Here are the techniques every PM should understand — and more importantly, should know when to use.

### Zero-Shot Prompting

The simplest approach: ask the model to do something without providing any examples. The model relies entirely on its pre-training.

**Example:**
```
Summarise the key risks in a Series A investment round.
```

The model draws on general knowledge to provide a reasonable answer. Zero-shot works surprisingly well for straightforward, well-defined tasks.

**When to use:** Quick prototyping, well-understood tasks, or when you need to minimise token cost.

### Few-Shot Prompting

Provide 2–5 examples in your prompt showing the model what good output looks like. The model learns the pattern from your examples — this is called "in-context learning."

**Example:**
```
Classify customer feedback as positive, neutral, or negative.

"The product is amazing!" → Positive
"It works, but nothing special." → Neutral
"Broken on arrival." → Negative

Now classify: "Great service, but expensive." →
```

Few-shot prompting dramatically improves consistency and accuracy on domain-specific tasks, because the examples teach the model your exact format and standards.

**When to use:** Domain-specific tasks, when you need consistent output format, or when zero-shot quality isn't good enough. Multiple examples anchor the AI's behavior, reducing "hallucinations" and inconsistent responses compared to **zero-shot** prompting. It is also one of the best ways to ensure the AI follows a specific output structure, such as JSON or a specific bulleted list.

### Chain-of-Thought (CoT) Prompting

Ask the model to show its reasoning — to articulate intermediate steps before giving a final answer. For complex decisions, this dramatically improves accuracy.

**Example:**
```
Should we launch Feature X? Consider: 60% of users want it,
it takes 3 months to build, and a competitor just shipped something similar.

Think through this step-by-step before giving your recommendation.
```

By forcing the model to reason explicitly, you reduce errors and get transparent logic you can audit — crucial for business decisions.

**When to use:** Complex reasoning, multi-factor decisions, or when you need to understand (and validate) the model's thinking. Very valuable for providing transparency into the model's logic, making it easier for PMs to identify where mistakes occurred or refine the answer.

### System Prompts

Your system prompt is hidden infrastructure that sets the model's behaviour before it sees any user input. It's where you establish tone, constraints, domain expertise, and persona.

**Example:**
```
You are a B2B SaaS product strategy consultant. You favor data-driven
thinking, acknowledge ambiguity, and are concise but thorough.
When you don't have enough information, ask clarifying questions
rather than guessing.
```

System prompts are powerful for controlling voice and establishing guardrails. One important nuance: research suggests that role prompting (assigning a persona) improves style and communication more than it improves factual accuracy. Don't expect a role to fix reasoning problems — use CoT for that.

**When to use:** Customer-facing features where tone matters, setting behavioural constraints, or ensuring consistent perspective across interactions. It can also be used to enforce strict boundaries (e.g. "Do not provide medical diagnoses") or standardise output formats.

### Structured Output

One of the most practical techniques for production features: **constrain the model's output format.** Instead of free-form text, ask for JSON, XML, or a specific schema.

**Example:**
```
Extract the following from this customer email and return as JSON:
{
  "sentiment": "positive/neutral/negative",
  "topic": "billing/technical/feature_request/other",
  "urgency": "low/medium/high",
  "summary": "one sentence"
}
```

This makes LLM outputs parseable by downstream systems — essential when the AI's response feeds into your product's logic, not just a chat interface.

**When to use:** Any feature where LLM output feeds into code, databases, or workflows. This is how you make LLMs production-ready.

### The Before-and-After: Why This Matters

To make the value of these techniques visceral, here's the same task with a lazy prompt versus a well-engineered one:

**Lazy prompt:**
```
Tell me about our Q3 performance.
```
**Model response:** A generic, vague answer drawing on general knowledge. Potentially hallucinated.

**Well-engineered prompt (combining system prompt + structured output + CoT):**
```
System: You are a financial analyst at [Company]. Be precise and cite
specific numbers. Flag any data gaps.

Here is the Q3 financial summary:
- Revenue: $12.4M (up 8% from Q2)
- Churn: 3.2% (up from 2.8%)
- New logos: 14 (down from 19)

Analyse Q3 performance vs Q2. Structure your response as:
1. Revenue change and key drivers
2. Top 3 risks
3. Recommended actions

Think through each section step-by-step before concluding.
```
**Model response:** A structured analysis grounded in the actual data you provided, with clear reasoning and actionable recommendations. Same model, radically different output — because you engineered the context.

**Exercise:** Play around with these techniques and try improving your last 3 prompts.

### The Minimum Effective Dose Principle

Here's a principle from Anthropic's context engineering research that should guide your approach: **find the smallest amount of high-signal context that achieves your goal.**

Adding more information doesn't always help. Research has identified a phenomenon called **context rot**: as you pack more tokens into the context window, the model's ability to recall and use specific pieces of information actually decreases. It's like giving someone a 200-page briefing document before a 15-minute meeting — they'll miss the important parts.

Your job isn't to give the model everything it could possibly need. It's to be ruthless about what stays and what gets cut. A single highly relevant document beats five loosely related ones. Every token costs money, adds latency, and potentially dilutes focus.

---

## Part 2: Retrieval-Augmented Generation (RAG)

Prompt engineering works for information you can fit directly in the context window. But what about knowledge that's too large, too specific, or too dynamic to include every time?

That's where RAG comes in. **RAG is a system architecture that connects your LLM to external knowledge bases**, pulling relevant information on demand for each query.

### How RAG Works

The flow in plain language:

1. **User asks a question.** "What's our refund policy for enterprise customers?"
2. **Query becomes a vector.** The system converts the question into an embedding (as we covered in the LLMs lesson) so it can be compared mathematically against your knowledge base.
3. **Retrieval finds relevant documents.** A search algorithm identifies the passages most semantically similar to the question — your actual refund policy document, not a marketing page that mentions "refund" in passing.
4. **Context gets augmented.** The retrieved passages are inserted into the LLM's prompt alongside the user's question.
5. **LLM generates a grounded response.** The model answers using the retrieved information, not just its general training data.

### Why RAG Changes the Game

RAG solves four critical problems:

- **Accuracy:** Ground responses in your actual data instead of the model's general (and potentially outdated) training knowledge.
- **Hallucination reduction:** When the model has real documents to reference, it invents facts far less often.
- **Knowledge freshness:** Update your knowledge base whenever information changes — no expensive retraining needed.
- **Domain specificity:** Your proprietary data (internal docs, policies, customer information) stays in your systems. You retrieve it on-demand rather than baking it into the model.

### When to Use RAG

**RAG is the right choice when:**
- You have large document collections (FAQs, policies, product docs, research) that won't fit in a single prompt
- Information changes regularly and you need current data
- You need to cite sources and show where answers came from
- You're building domain-specific systems (legal, medical, internal knowledge portals)
- Reducing hallucinations is a product requirement

**RAG is less necessary when:**
- The task requires only general knowledge
- All needed information fits in your context window
- Information is static and the same for every query

### What PMs Need to Know About RAG Quality

RAG seems simple in concept but has subtle failure modes you need to understand:

**The chunking problem.** Your documents are too long to retrieve whole, so they get split into smaller chunks. How you split them matters enormously. Cut in the wrong place and you might separate a question from its answer. Chunk too small and you lose context. Chunk too large and you dilute relevance. Your engineering team will make these decisions, but you should know that retrieval quality often depends more on chunking strategy than on the model itself.

**Retrieval quality vs. generation quality.** When your RAG system produces a bad answer, you need to diagnose which component failed. Did retrieval return the wrong documents (retrieval failure)? Or did it find the right documents but the model fumbled the synthesis (generation failure)? These require completely different fixes. Retrieval failures need better embeddings, better chunking, or better search. Generation failures need better prompts or a more capable model.

**The "garbage in, garbage out" principle.** RAG only works as well as your knowledge base. If your documents are poorly written, outdated, or contradictory, the model will reflect that. Sometimes the best investment isn't better retrieval — it's better source content.

**Graceful failure.** What happens when the system can't find a relevant document? The worst outcome is confident hallucination. A well-designed RAG product acknowledges uncertainty ("I couldn't find a specific policy on this — let me connect you with support") rather than making things up.

---

## Part 3: Model Context Protocol (MCP)

If RAG is about retrieving stored knowledge, **MCP is about connecting your LLM to live systems and tools.** It solves a different problem entirely.

### The Integration Problem

Before MCP, giving an LLM access to your tools looked like this: you'd build a custom integration for Slack, then one for your database, then for Notion, then for your CRM, then for Google Drive. Each integration was bespoke. Each needed maintenance.

With N data sources and M AI applications, you needed N×M custom connections. This doesn't scale.

### MCP: The USB-C for AI

Think of MCP like a **USB-C port for AI applications.** Just as USB-C provides a standardised connector that works with any compatible device, MCP provides a standardised protocol that lets any AI application connect with any MCP-compatible service.

**MCP is an open standard that defines how LLMs interact with external tools, systems, and data sources.**

### How MCP Works

Three components:
- **MCP Host:** Your AI application — Claude, a chatbot, an agent. Where the LLM lives.
- **MCP Client:** The intermediary inside your app that speaks the MCP protocol.
- **MCP Server:** The external service (database, API, SaaS tool) that exposes its capabilities in a standardised way.

MCP servers expose three types of capabilities:
- **Resources:** Information retrieval. "Get the latest quarterly earnings report."
- **Tools:** Actions. "Send a Slack message," "create a Jira ticket," "update a database record."
- **Prompts:** Reusable templates. "Run the weekly standup summary using team data."

### A Concrete Example

Here's MCP in action — a PM using an AI assistant with MCP connections:

**User asks:** "What's my team's velocity this sprint, and are we on track for the release?"

**Without MCP:** The PM would need to open Jira, pull sprint data, cross-reference the release timeline in Confluence, and synthesise the answer manually.

**With MCP:** The AI assistant has MCP connections to both Jira and Confluence. Here's what happens:

1. It calls the **Jira MCP server** → pulls current sprint velocity, completed story points (34 of 55), and remaining stories
2. It calls the **Confluence MCP server** → retrieves the release timeline and milestone dates
3. It **synthesises both** into a single answer: "Your team has completed 34 of 55 story points with 4 days remaining. Based on your average velocity of 12 points/day, you're on track. However, two backend stories are blocked — I'd flag those in your standup."

The LLM pulled live data from two different systems and synthesised an actionable answer — no tab-switching, no manual cross-referencing. That's the MCP difference.

### Why MCP Matters

MCP creates a **network effect**: as more services implement MCP servers, every MCP-compatible AI application gains access to a growing ecosystem of tools. Build your MCP integration once, and it works with Claude, with internal tools, with any future MCP-compatible application.

For PMs, this changes the build-vs-buy calculation. With over 10,000 pre-built MCP servers available, 97 million monthly SDK downloads, and the protocol now stewarded by the Linux Foundation's Agentic AI Foundation, building custom integrations is increasingly hard to justify unless the integration is core to your unique value proposition.

### When to Use MCP

MCP is your answer when you need:
- **Real-time data access:** Live information from systems, not just stored documents
- **Tool integration:** The AI needs to perform actions (send, create, update), not just retrieve
- **System interoperability:** Multiple AI applications accessing the same resources consistently
- **Scalable architecture:** Adding new data sources without rebuilding integrations

### MCP vs. RAG: Different Problems, Different Solutions

These get confused because both connect LLMs to external information. But they solve different problems:

| Aspect | RAG | MCP |
|---|---|---|
| **Primary use** | Retrieve knowledge from documents | Connect to live systems and tools |
| **Best for** | Policies, FAQs, research papers | Databases, APIs, SaaS tools |
| **Data freshness** | Periodic (when docs change) | Continuous (live connection) |
| **Action capability** | Read-only | Read and write |
| **Failure mode** | Wrong documents retrieved | Tool execution fails |

In practice, you'll often use both: RAG for your knowledge base, MCP for your live systems.

---

## Putting It Together: A PM's Decision Framework

Context engineering comes down to three questions:

1. **What information does my AI need?** Pre-training knowledge, examples, system instructions, external data, or a combination?
2. **How current does the information need to be?** Static → prompt engineering or RAG. Live → MCP.
3. **How much fits in the context window?** If it fits and is consistent across queries, include it directly. If it's too large or varies per query, use RAG or MCP.

### Exercise 1: Customer Support Chatbot

**Product goal:** Answer customer questions about policies, resolve common issues, escalate complex problems.
**Exercise:** You are a product manager creating an AI customer support chatbot. Think through the information the chatbot needs, the sources for those information and the appropriate context engineering technique to provide it.

| Information Needed | Source | Technique |
|---|---|---|
| General service skills | Model pre-training | System prompt sets tone and constraints |
| Company policies and FAQs | Document collection | RAG retrieves relevant passages |
| Customer account status | Live CRM | MCP connects to customer database |
| Response format standards | Few examples | Few-shot examples in system prompt |
| Escalation reasoning | Complex decisions | Chain-of-thought for edge cases |

### Exercise 2: Internal Research Assistant

**Product goal:** Help analysts quickly synthesise information from multiple internal sources.
**Exercise:** Take a minute to step back and think about what information is needed and where those information are sourced from. Now assume you are creating an internal research assistant. Identify the information the AI needs and the appropriate context engineering technique to provide it.

**Answer:**

| Information Needed | Source | Technique |
|---|---|---|
| Analysis methodology | Domain expertise | System prompt with analyst persona |
| Market research reports | Large doc library | RAG across research repository |
| Current financial data | Live dashboards | MCP connects to data warehouse |
| Report structure | Consistent format | Structured output (JSON/markdown) |
| Reasoning transparency | Complex synthesis | Chain-of-thought for audit trail |

The same framework, applied to different products, produces different architectures — but the thinking process is identical.

---

## Key Takeaways

1. **Context engineering > prompt engineering.** The shift from "write better instructions" to "architect the entire information environment" reflects how production AI actually works. Own this as a PM skill.

2. **Six prompt techniques to know:** Zero-shot, few-shot, chain-of-thought, system prompts, structured output, and the minimum effective dose principle. Know when each applies.

3. **RAG = connecting LLMs to stored knowledge.** When you need accuracy from large document collections, source citations, or frequently updated information. Watch for chunking quality and retrieval vs. generation failures.

4. **MCP = connecting LLMs to live systems.** When you need real-time data or action capability. Changes the build-vs-buy calculation for integrations.

5. **Context rot is real.** More information doesn't always mean better results. Be ruthless about what goes into the context window — every token costs money, adds latency, and can dilute focus.

6. **Use the three-question framework:** What does the AI need? → How current? → Does it fit in the window? This tells you which combination of techniques to use.

---

## Explore Further

- [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — The definitive guide on context engineering principles from Anthropic's engineering team.
- [Introducing the Model Context Protocol - Anthropic](https://www.anthropic.com/news/model-context-protocol) — The original MCP announcement with architecture details.
- [Prompt Engineering Guide](https://www.promptingguide.ai/) — Comprehensive reference for all prompting techniques with research papers.
- [OpenAI Tokenizer](https://platform.openai.com/tokenizer) — Paste any text to see how it gets tokenized. Essential for estimating context window usage and costs.
