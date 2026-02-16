---
title: "Prompt Engineering"
module: 2
lesson: 2
description: "Master the PM Prompt Framework (Role, Context, Task, Format, Constraints) and learn practical prompting techniques that turn AI from a novelty into a daily tool."
objectives:
  - "Apply the ROLE | CONTEXT | TASK | FORMAT | CONSTRAINTS framework to craft effective prompts"
  - "Use few-shot prompting, chain-of-thought, and structured output techniques for real PM tasks"
  - "Build and maintain a reusable personal prompt library"
resources:
  - title: "Prompt Engineering Guide (Community Resource)"
    url: "https://www.promptingguide.ai/"
    type: "docs"
  - title: "ProdPad: Prompt Engineering for Product Managers"
    url: "https://www.prodpad.com/blog/prompt-engineering-for-product-managers/"
    type: "article"
  - title: "Anthropic Prompt Engineering Guide"
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
    type: "docs"
  - title: "Prompt Cowboy"
    url: "https://www.promptcowboy.ai/"
    type: "docs"
quiz:
  - question: "What is the single highest-impact prompting technique for getting consistent, comparable outputs?"
    options:
      - "Chain-of-thought prompting"
      - "Zero-shot prompting"
      - "Few-shot prompting (providing 2-5 examples)"
      - "System prompt tuning"
    answer: 2
  - question: "Which of the following is a common prompt engineering mistake?"
    options:
      - "Providing explicit examples of desired output"
      - "Specifying output format constraints"
      - "Asking for everything at once in a single complex prompt"
      - "Including role and context in your prompt"
    answer: 2
---

## The Skill You Already Have

You already know how to write a great spec. You know that vague requirements produce misaligned work, wasted sprints, and features that miss the mark. You've felt the difference between a crisp brief that a team can execute on and a vague one that spawns three rounds of clarification meetings.

Prompt engineering is the same skill, applied to AI. A bad prompt is a bad spec — ambiguous, incomplete, leaving the executor guessing. A great prompt is specific, structured, and produces exactly what you need. The difference is speed: a spec goes to engineers who need days. A prompt goes to an AI that's ready to work *right now*.

This lesson gives you a framework and three techniques that will cover 90% of your PM prompting needs. You'll use these constantly — in this course and in your daily work.

---

## The PM Prompt Framework

Every effective prompt has five components. Think of them like the sections of a good spec:

**ROLE** — Who are you asking the AI to act as? ("You are an experienced product strategist at a B2B SaaS company.") This sets the perspective and expertise level. Just like you'd brief a consultant differently from an intern, the role shapes the output.

**CONTEXT** — What's the background? What problem are we solving? ("We build a project management tool for remote teams. Users frequently request time-zone-aware deadlines. Currently all deadlines are UTC, which confuses international users.") The more specific your context, the more relevant the output. Vague context produces generic answers.

**TASK** — What exactly do you want? ("Write a concise one-page PRD for a Multi-Timezone Deadline feature.") Be precise. "Help me with the roadmap" is vague. "Prioritise these six features by impact and effort for Q2" is actionable.

**FORMAT** — How should the output be structured? ("Problem statement in 2–3 sentences, two user personas, three success metrics with targets, scope in/out, one user walkthrough.") This is where most PMs underinvest. Specifying format eliminates the most common frustration — getting a wall of text when you wanted a crisp table, or bullet points when you wanted a narrative.

**CONSTRAINTS** — What guardrails apply? ("Keep it under 500 words. Focus on user problems, not implementation. This is timezone deadlines only — not timezone display elsewhere.") Constraints prevent hallucination, scope creep, and the AI's tendency to over-elaborate.

Let's see the difference this makes.

**Without the framework:**
```
Write a PRD for a new feature.
```
This will produce something generic and probably useless. No context about your product, no clarity on scope, no format specified. The AI is guessing.

**With the framework:**
```
ROLE: You are a senior product manager at a B2B SaaS company.

CONTEXT: We build a project management tool for remote teams. Users
frequently request time-zone-aware deadlines. Currently all deadlines
are in UTC, which confuses users in different regions.

TASK: Write a concise one-page PRD for a "Multi-Timezone Deadline" feature.

FORMAT:
- Problem statement (2–3 sentences)
- User personas affected (2 personas)
- Success metrics (3 metrics with targets)
- Scope: what's in, what's out
- One detailed user walkthrough

CONSTRAINTS:
- Max 500 words
- Focus on user problems, not technical implementation
- Timezone deadlines only — not timezone display elsewhere
```

The second prompt will produce something you can actually use — something close enough to your final document that you're refining, not rewriting.

**Why this matters for PMs:** You'll use this framework again in [Lesson 4.1](/AI-PM-Bootcamp/modules/design-ai-features/) when designing AI features for your users, not just yourself. The same principles — clear role, specific context, explicit format — apply whether you're prompting an AI for your own work or writing system prompts for a production feature.

---

## Three Techniques That Cover 90% of PM Work

In the [Context Engineering lesson](/AI-PM-Bootcamp/modules/context-engineering/) ([Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/)), we covered the theory behind techniques like few-shot prompting and chain-of-thought. Now let's apply them to real PM tasks. You only need three techniques to handle almost everything.

### Few-Shot Prompting: Show, Don't Describe

This is the single highest-impact technique. Instead of describing what you want, you *show* the AI an example. It's like giving a developer a design mockup instead of a verbal description — dramatically less ambiguity.

Say you need competitive analyses for three products. Instead of asking for a vague comparison, you show the AI exactly what one good analysis looks like:

```
Compare these three products. Structure each analysis like this example:

EXAMPLE:
**Asana**
- Core use case: Team project management
- Key differentiator: Timeline & portfolio views
- User base: Mid-market (50–500 person teams)
- Pricing: Seat-based, $10.99–24.99/user/month
- Biggest gap vs. us: Lacks deep customisation for technical workflows

Now analyse: Notion, Confluence, Microsoft 365.
Same structure. 3–4 bullets each.
```

Two to five examples is the sweet spot. You get consistent, comparable outputs that you can drop straight into a presentation or a spreadsheet. Without examples, every response is a surprise. With examples, every response matches the pattern.

Use few-shot prompting whenever you want consistency — competitive analyses, user stories, release notes, status updates. Anything you'll create repeatedly in the same format.

### Chain-of-Thought: Make the AI Show Its Work

For complex analysis and trade-off decisions, ask the AI to think step-by-step rather than jump to an answer. This is particularly useful when you're the one making the decision — you want to see the reasoning, not just the conclusion.

```
You are a product manager handling a resource constraint.

SITUATION:
- 2 engineers for 3 weeks
- Option A: User-requested feature (medium effort)
- Option B: Critical bug fix (high urgency)
- Option C: Split across both (both ship late)

Help me think through this trade-off:
1. What does "success" look like for each option?
2. What are the consequences of each choice?
3. What information are we missing?
4. Your recommendation, with reasoning.

Show your thinking at each step.
```

Chain-of-thought outputs are longer, but far more useful. You see which assumptions the AI is making, so you can push back on specific steps rather than just accepting or rejecting the whole answer. You're using the AI as a thinking partner, not an oracle.

### Structured Output: When You Need Data, Not Prose

When you're generating data that feeds into another tool — user stories for Jira, features for a roadmap spreadsheet, priority scores for a matrix — force the AI to output structured JSON. It reduces hallucination (the AI has to fill specific fields, not ramble) and makes the output machine-readable.

```
Generate 5 user stories for a "search filters" feature.

Output as JSON:
{
  "stories": [
    {
      "id": "SEARCH-001",
      "title": "...",
      "persona": "...",
      "acceptance_criteria": ["...", "...", "..."],
      "effort": "Small | Medium | Large"
    }
  ]
}
```

You can paste this straight into a spreadsheet, import it into Jira, or feed it into the next step of your workflow. Structured output turns AI from a writing tool into a data tool.

---

## Putting It Together: Two Worked Examples

Let's walk through two real PM scenarios to see how the framework and techniques combine.

### Example 1: Turning User Research Into a PRD

You've just finished a round of customer interviews. You have transcripts, notes, and a rough sense of the problem. You need a PRD by end of day.

**Step 1 — Synthesise the research (chain-of-thought):**
```
CONTEXT: I've attached transcripts from 8 customer interviews about
our onboarding experience. These are mid-market SaaS customers
(50–200 employees).

TASK: Analyse these transcripts and identify:
1. The top 3 pain points, ranked by frequency
2. Any patterns in who experiences each pain point
3. Direct quotes that best illustrate each pain point
4. What surprised you — anything I might have missed

Think through each step before giving your final analysis.
```

**Step 2 — Draft the PRD (framework + few-shot):**
```
ROLE: Senior product manager at a mid-market SaaS company.

CONTEXT: Based on the research synthesis above, our top pain point
is [X]. Here's our product context: [brief description].

TASK: Write a one-page PRD for solving this pain point.

FORMAT: Use this structure (here's an example of a good PRD section):
[paste a previous PRD section as your few-shot example]

CONSTRAINTS:
- Max 800 words
- User outcomes, not implementation
- Include three success metrics with specific targets
```

**Step 3 — Refine (20 minutes of your judgment):** Read the draft critically. The AI got the structure right, but the success metrics are probably too generic. The user walkthrough might miss edge cases you heard in the interviews. The tone might not match your team's style. This is where your judgment adds the value AI can't — you're refining, not writing from scratch.

Total time: ~45 minutes instead of 3 hours. And the quality is higher because you started from a structured draft instead of a blank page.

### Example 2: Sprint Planning Prioritisation

You have three competing priorities and two engineers for three weeks. You need to make a recommendation to your engineering lead.

```
ROLE: Product strategist helping a PM prioritise.

CONTEXT:
Product: [name, target market]
Sprint capacity: 2 engineers, 3 weeks
Current focus metric: user retention

Option A: Onboarding revamp
- Effort: 2.5 weeks
- Impact: Addresses #1 churn driver (day-1 drop-off)
- Risk: Requires design resources we may not have

Option B: Performance fix
- Effort: 1 week
- Impact: p95 load time from 4s to 1.5s
- Risk: Low — well-scoped

Option C: Both (rushed)
- Effort: 3 weeks, both delivered at lower quality
- Risk: Neither done well

TASK: Help me think through this trade-off. Show your reasoning
for each option, then recommend an approach.

FORMAT: Prioritisation matrix showing impact, effort, risk, and
strategic fit. Then a one-paragraph recommendation.
```

The AI will lay out the trade-offs clearly. You'll probably agree with its analysis but make a different call based on context it doesn't have — maybe the CEO just flagged performance in an all-hands, or maybe you know the designer is free next week. That's the collaboration: AI structures the thinking, you make the judgment call.

---

## The Mistakes That Cost You the Most Time

After helping enough PMs with prompts, clear patterns emerge in what goes wrong.

**Vague context** is the most common. "We need a new feature. Can you help?" gives the AI nothing to work with. Compare: "We're a B2B SaaS tool for design teams. Our users struggle with version control across files. Competitors solve it with branching, but we think there's a better way." Explicit context, every time.

**No examples** is the second biggest miss. "Write user stories in our format" means nothing to an AI. Paste in one good example and say "write five more like this." Examples reduce iteration cycles by 80% — they're the single highest-leverage addition to any prompt.

**Asking for everything at once** is the third. "Analyse our market, competitors, and opportunities, then recommend a new product" is four separate tasks crammed into one prompt. Complex tasks compound errors. Break them into steps. Verify each step before moving on.

**Conflicting constraints** are subtler. "Write something comprehensive but concise" is a contradiction. Pick one. "Max 500 words, covering problem, metrics, and scope" is clear.

And finally, **not iterating**. The first version of a prompt is rarely the best. Use it, read the output, notice what's 70% right and 30% wrong, then adjust. The second version is always better. The third version is a tool you'll reuse for months. Save your improved prompts — that's how you build a library that compounds.

---

## Building Your Prompt Library

Every time you refine a prompt and get a good result, save it. Over time, you'll build a personal library — a collection of prompts for the tasks you do most often.

Organise however works for you: a Notion database, a folder of text files, a spreadsheet with columns for category, prompt, and notes. What matters is that you can find the right prompt when you need it. Tag by use case (PRD, competitive analysis, status update) rather than by technique.

Each time you use a prompt and improve it, save the updated version. Note what you changed and why. The tenth version of your PRD prompt will be dramatically better than the first — that's compounding value.

And share them. Your prompt library becomes a team asset. A junior PM who inherits your competitive analysis prompt starts at your level of quality instead of figuring it out from scratch. Consistent prompts across a team produce consistent outputs.

**Why this matters for PMs:** In [Lesson 4.1](/AI-PM-Bootcamp/modules/design-ai-features/) (Design AI Features), you'll apply these same prompting skills to write system prompts for production AI features. The framework doesn't change — ROLE, CONTEXT, TASK, FORMAT, CONSTRAINTS works whether you're prompting AI for yourself or for thousands of users. The difference is that production prompts need even more rigour, which is exactly what this practice prepares you for.

## Extension: How Propel Ventures Does Prompt Engineering

Everything in this lesson — the PM Prompt Framework, few-shot examples, chain-of-thought reasoning — works. But writing great prompts from scratch every time takes practice, and even experienced prompters leave performance on the table.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/prompt-cowboy-overview.png" alt="Prompt Cowboy interface — a prompt engineering tool that rewrites rough prompts into structured, high-performing versions" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

At Propel Ventures, we love [Prompt Cowboy](https://www.promptcowboy.ai/) as a force multiplier. Prompt Cowboy is a prompt engineering tool that takes your rough prompt — the kind you'd naturally type — and rewrites it into a structured, high-performing version optimised for models like Claude, ChatGPT, and Gemini. You paste in your "lazy prompt," and it generates an expanded version with clearer instructions, better structure, and more explicit constraints.

Here's how we use it in practice:

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/prompt-cowboy-annotation.png" alt="Annotated Prompt Cowboy workflow showing how a rough prompt gets rewritten into a structured, high-performing version" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

**First drafts.** When you're starting a new prompt from scratch, Prompt Cowboy gives you a solid structural foundation. Instead of staring at a blank text box and trying to remember every element of the framework, you write what you want in plain language and let the tool add the scaffolding. Then you refine from there — adjusting the role, adding your specific context, tuning the format.

**Prompt improvement.** When a prompt is producing decent-but-not-great output, paste it into Prompt Cowboy to see what you're missing. Often the tool identifies gaps you didn't notice — a missing constraint, an underspecified format, or a vague task description.

**Learning by example.** For PMs who are still building their prompting instincts, comparing your original prompt to Prompt Cowboy's rewrite is one of the fastest ways to internalise what "good" looks like. Over time, you'll find yourself writing prompts that need less and less rewriting.

You still need to understand your context, define success criteria, and iterate based on outputs. But it handles the structural heavy lifting, which means you spend less time formatting prompts and more time refining the ideas inside them. Think of it as a linter for your prompts: it catches the common mistakes so you can focus on the substance.

---

## Exercise: Build Your First Prompt

Pick a task you did manually this week — a PRD draft, a competitive analysis, a feedback synthesis, a status update. Write a prompt for it using the full framework: ROLE, CONTEXT, TASK, FORMAT, CONSTRAINTS. Add at least one few-shot example.

Run it. Read the output critically. What's good? What's missing? What would you change in the prompt to fix it?

Save the improved version. That's the first entry in your prompt library — and you'll use it again in the prototyping lesson ([Lesson 2.3](/AI-PM-Bootcamp/modules/prototyping/)) and the Module 4 lab ([Lesson 4.3](/AI-PM-Bootcamp/modules/stress-test-exercise/)).

---

## Key Takeaways

1. **The PM Prompt Framework covers 90% of use cases.** ROLE, CONTEXT, TASK, FORMAT, CONSTRAINTS — five components, same structure every time. The better your spec, the better the output.

2. **Three techniques, three use cases.** Few-shot for consistency (show, don't describe). Chain-of-thought for complex reasoning (make the AI show its work). Structured output for data (JSON when you need machine-readable results).

3. **Context engineering is the foundation.** This lesson builds on the theory from [Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/). The PM Prompt Framework is how you practise context engineering at the individual prompt level — choosing what information the model needs and structuring it for the best result.

4. **Iteration is the skill.** Your first prompt is rarely your best. Use it, read the output, adjust. The third version is usually the one worth saving. Tools like Prompt Cowboy can accelerate this cycle.

5. **Build a library that compounds.** Every refined prompt is a reusable asset. Share them across your team for consistent, high-quality outputs.

## Explore Further

- [Prompt Engineering Guide](https://www.promptingguide.ai/) — Community-maintained reference covering all major prompting techniques with examples and research citations.
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Anthropic's official guidance on getting the best results from Claude, including advanced techniques.
- [Prompt Cowboy](https://www.promptcowboy.ai/) — The prompt rewriting tool Propel Ventures uses to turn rough prompts into structured, high-performing versions.
