---
title: "Prompt Engineering"
module: 2
lesson: 2
description: "Master the PM Prompt Framework (Role, Context, Task, Format, Constraints) and six practical prompt templates for everyday product management work."
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
  - title: "Prompt Engineering for Product Managers - Freeplay"
    url: "https://freeplay.ai/blog/prompt-engineering-for-product-managers-part-1-composing-prompts"
    type: "article"
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

## Why This Matters for PMs

You already know how to write a good spec. You know that vague requirements lead to misaligned work, wasted sprints, and shipping the wrong thing.

Prompt engineering is exactly the same skill, applied to AI. A bad prompt is like a bad spec—ambiguous, incomplete, and leaves the executor (in this case, an LLM) guessing. A great prompt is crisp, specific, and produces exactly what you need.

The difference? A spec goes to engineers. A prompt goes to an AI that's **ready to work right now**, with no clarification meetings needed.

This is your next superpower. Teams that craft precise prompts ship faster, reduce iteration loops, and build reusable prompt libraries that compound in value over months. Teams that wing it get mediocre outputs, waste time reprompting, and throw away AI projects.

Let's make you a great prompt engineer.

---

## The PM Prompt Framework

Before jumping to templates, let's build a mental model. Every effective prompt has five core components:

```
ROLE | CONTEXT | TASK | FORMAT | CONSTRAINTS
```

Think of it like writing a spec section:

- **ROLE**: Who are you asking the AI to act as? (e.g., "You are an experienced product strategist")
- **CONTEXT**: What's the background? What problem are we solving? (e.g., "We're a B2B SaaS tool for design teams")
- **TASK**: What exactly do you want? (e.g., "Generate 5 competitive positioning statements")
- **FORMAT**: How should the output be structured? (e.g., "Use a bulleted list; each 1–2 sentences max")
- **CONSTRAINTS**: Any guardrails? (e.g., "Focus only on platforms launched in the last 18 months"; "Avoid jargon")

Let's see this in action:

### Bad Prompt (Vague)
```
Write a PRD for a new feature.
```

**Why it fails:**
- No context about the product
- No clarity on feature scope
- No output format specified
- AI will guess and probably miss

### Good Prompt (Structured)
```
ROLE: You are a senior product manager at a B2B SaaS company.

CONTEXT: We build a project management tool for remote teams. Users
frequently request the ability to set time-zone-aware deadlines.
Currently, all deadlines are in UTC, which confuses users in different regions.

TASK: Write a concise one-page PRD for a "Multi-Timezone Deadline" feature.

FORMAT:
- Problem statement (2–3 sentences)
- User personas affected (2 personas)
- Success metrics (3 metrics)
- Technical scope (what's in/out of scope)
- Use case walkthrough (1 scenario)

CONSTRAINTS:
- Keep it under 500 words
- Focus on user problems, not technical implementation
- Avoid feature creep (this is timezone deadlines only, not timezone display elsewhere)
```

**Why it works:**
- Role sets the mindset
- Context makes the output relevant
- Task is crystal clear
- Format removes ambiguity
- Constraints prevent hallucinations

---

## Key Prompting Techniques (Practical Application)

As we covered in the Context Engineering module, techniques like few-shot prompting and chain-of-thought improve output quality. Now let's apply them to real PM work.

### Technique 1: Few-Shot Prompting (The Cheat Code)

Providing 2–5 examples is the single highest-impact technique. It's like showing developers the design mockups instead of just describing the feature.

**When to use:** Whenever you want consistent style, structure, or tone.

**Example: Competitive Analysis**

Instead of:
```
Analyse Notion vs. Confluence vs. Microsoft 365.
```

Use:
```
Compare these three products. For each, structure your analysis like this example:

EXAMPLE:
**Asana**
- Core use case: Team project management
- Key differentiator: Timeline & portfolio views
- User base: Mid-market (50–500 person teams)
- Pricing model: Seat-based, $10.99–24.99/user/month
- Biggest gap vs. us: Lacks deep customisation for technical workflows

Now analyse: Notion, Confluence, Microsoft 365.
Use the same structure for each. Keep each to 3–4 bullets.
```

Few-shot prompting ensures you get consistent, comparable outputs that you can actually use in a presentation.

### Technique 2: Chain-of-Thought (Show Your Work)

Ask the AI to **think through** the problem step-by-step, not just give you the answer. This is particularly useful for analysis, strategic decisions, and problem-solving.

**When to use:** Complex decisions, data interpretation, root cause analysis.

**Example: Sprint Planning Conflict**

```
You are a product manager handling a resource constraint.

SITUATION:
- We have 2 engineers for 3 weeks
- We could build Feature A (user-requested, medium effort)
- Or Feature B (critical bug fix, high urgency)
- Or split across both (means both ship late)

TASK: Help me think through this trade-off. Please:
1. Define what "success" means for each option (what outcomes matter?)
2. List the consequences of choosing each option
3. Identify what information we're missing that would help decide
4. Recommend an approach with your reasoning

Show your thinking for each step. Don't just tell me what to do.
```

Chain-of-thought outputs are longer but far more useful because you see the reasoning. You can push back on specific steps instead of just accepting/rejecting the answer.

### Technique 3: Structured Output (JSON for Data)

When you're asking for data or want to feed the output into another tool, force JSON output. It reduces hallucinations and makes parsing reliable.

**When to use:** User stories, roadmap export, competitive feature matrices, priority scoring.

**Example: User Story Generation**

```
Generate 5 user stories for a "search filters" feature.

Output as JSON with this exact structure:
{
  "stories": [
    {
      "id": "story_001",
      "title": "...",
      "persona": "...",
      "problem": "...",
      "acceptance_criteria": ["...", "...", "..."]
    }
  ]
}
```

Structured output ensures you get machine-readable data that you can import into Jira, convert to a spreadsheet, or feed into the next process.

---

## Six PM Prompt Templates (With Before & After)

### Template 1: PRD Writing

**Before (Bad):**
```
Write a PRD for [feature name].
```

**After (Good):**
```
ROLE: You are a product manager at a mid-market SaaS company.

CONTEXT:
Product: [Product name and what it does]
Problem: [Why users need this feature - include a specific user quote or use case]
Success metric: [What will we measure? E.g., "adoption rate > 30% in first month"]

TASK: Write a PRD for [feature name].

FORMAT:
- 1-sentence problem statement
- 2-3 affected personas (name + 1-sentence description)
- 3 success metrics with targets
- Feature scope: What's in/out
- One detailed user walkthrough (narrative)
- Technical considerations (1 paragraph)
- Risks & mitigation (2–3 risks)

CONSTRAINTS:
- Max 1200 words
- Avoid technical jargon in the problem section
- Focus on user outcome, not implementation
- No speculative features (only what we know we need)
```

**Why it's better:**
- Context makes the PRD relevant to your product
- Format ensures consistency and completeness
- Constraints prevent scope creep and fluff

---

### Template 2: Competitive Analysis

**Before (Bad):**
```
Compare our product to Competitor X.
```

**After (Good):**
```
ROLE: You are a competitive strategist.

CONTEXT:
Our product: [Product name, target market, key strengths]
Our positioning: [How we describe ourselves]
Competitor: [Name, what they do]
Analysis purpose: [E.g., "Understand their go-to-market strategy for SMBs"]

TASK: Create a competitive analysis.

FORMAT:
For both us and the competitor, analyse:
- Feature breadth: What's included? (Use a simple table or list)
- Target personas: Who are they building for?
- Pricing model: (Seat-based? Usage-based? Enterprise custom?)
- Go-to-market: How do they acquire users?
- Key differentiators: What do they do better? What do we do better?
- Market positioning: How do they describe themselves?
- Biggest gap: (For them vs. us, and us vs. them)

CONSTRAINTS:
- Base analysis only on public information (website, pricing page, reviews)
- Limit to 1000 words total
- Structure as a comparison table where possible
- Be objective; avoid marketing language
```

**Why it's better:**
- Competitor is specified (not vague comparison)
- Purpose frames the analysis (not just "compare everything")
- Format makes it easy to extract competitive insights for presentations
- Constraints keep it to facts, not opinion

---

### Template 3: User Story Generation (Batch)

**Before (Bad):**
```
Write user stories for the search feature.
```

**After (Good):**
```
ROLE: You are an agile product manager writing stories for a development team.

CONTEXT:
Product: [Product name and what users do with it]
Feature: Search across [objects: documents, projects, conversations, etc.]
Current state: [How do users search now, or do they not?]
Target user: [Who uses this most? E.g., "Project managers with 50+ items to navigate"]

TASK: Generate user stories for this search feature.

FORMAT:
For each story, use this format:
---
**Story ID:** SEARCH-001
**Title:** [One sentence, user-focused]
**As a** [persona], **I want to** [action] **so that** [benefit]
**Acceptance Criteria:**
- Given [context], when [action], then [outcome]
- Given [context], when [action], then [outcome]
- Given [context], when [action], then [outcome]
**Effort estimate:** [Small / Medium / Large]
**Dependencies:** [Any blockers or dependencies?]
---

Generate 6–8 stories covering:
- Basic search (keyword)
- Filters (by date, type, owner, etc.)
- Search operators (AND, OR, NOT)
- Search performance (speed expectations)
- Mobile search experience
- Search analytics/insights

CONSTRAINTS:
- Each story must be testable (not vague)
- Avoid technical jargon in the "As a / I want to" section
- Stories should be independent (don't overlap)
- Acceptance criteria should match user intent, not implementation
```

**Output as JSON:**
```json
{
  "stories": [
    {
      "id": "SEARCH-001",
      "title": "...",
      "as_a": "...",
      "i_want_to": "...",
      "so_that": "...",
      "acceptance_criteria": ["...", "...", "..."],
      "effort": "Medium",
      "dependencies": null
    }
  ]
}
```

**Why it's better:**
- Scope is clear (what's included)
- Format is ready to drop into Jira or export
- JSON output is machine-readable
- Batch generation saves time vs. writing individually

---

### Template 4: Sprint Planning & Roadmap Prioritisation

**Before (Bad):**
```
Should we prioritise Feature A or Feature B?
```

**After (Good):**
```
ROLE: You are a product strategist helping a PM prioritise.

CONTEXT:
Product: [What you build, target market]
Sprint capacity: [How many story points / engineering days available?]
Shipping window: [Timeline: e.g., "Q1 2025"]
Current metric: [What are we measuring? E.g., "user retention", "revenue"]

Option A: [Feature name]
- Effort: [estimate in story points or days]
- User benefit: [Who wants this? Why?]
- Business impact: [Revenue uplift / retention / churn reduction / etc.]
- Risk: [What could go wrong?]

Option B: [Feature name]
- Effort: [estimate]
- User benefit: [Who wants this? Why?]
- Business impact: [Revenue uplift / retention / churn reduction / etc.]
- Risk: [What could go wrong?]

Option C: [Technical debt / bug fix / etc.]
- Effort: [estimate]
- User benefit: [Who wants this? Why?]
- Business impact: [Stability / performance / etc.]
- Risk: [What could go wrong?]

TASK: Help me prioritise. For each option, assess:
1. Impact vs. effort ratio (High/Medium/Low)
2. Strategic alignment (Does it match our roadmap?)
3. Risk assessment (What blockers exist?)
4. Opportunity cost (What do we miss by choosing this?)
5. Recommendation with reasoning

FORMAT:
Create a prioritisation matrix or scoring table showing:
- Option name
- Effort
- Estimated impact (qualitative)
- Strategic fit (% alignment with roadmap)
- Risk level
- Recommendation rank (1st / 2nd / 3rd)
- One sentence reasoning for the rank

CONSTRAINTS:
- Base recommendations only on the data provided
- Don't assume we'll "do it next sprint too"
- Flag if any option is missing critical info
- Keep reasoning brief (1–2 sentences per option)
```

**Why it's better:**
- Full context for the AI to make a good recommendation
- Framework prevents gut-feel decisions
- Matrix format is presentation-ready
- Constraints keep reasoning honest

---

### Template 5: Status Update & Stakeholder Communication

**Before (Bad):**
```
Write a status update for our feature launch.
```

**After (Good):**
```
ROLE: You are a product manager writing a status update for executive leadership.

CONTEXT:
Audience: [C-level executives / Board / Stakeholders who don't use the product daily]
Feature: [Name]
Status: [On track / At risk / Delayed]
What's happened this week: [Milestones, blockers, wins, surprises]
- Completed: [What shipped or was decided?]
- In progress: [What are we working on?]
- Blocked: [Any risks? Any dependencies on other teams?]
- Next week: [What's the priority?]

Key metrics:
- Target users impacted: [How many?]
- Success metric: [What are we measuring?]
- Timeline: [When do we ship?]

TASK: Write a status update.

FORMAT:
- 1-sentence headline (Is this on track? Is this exciting? Lead with the news.)
- 2-3 sentence status summary (What happened? What's the status?)
- Wins this week (2–3 bullets)
- Risks / blockers (2–3 bullets, with mitigation)
- Next steps (3–4 bullets, prioritised)
- Ask for stakeholder input (Is there anything we need from you?)

CONSTRAINTS:
- Keep it to 300 words (1 page max)
- Use plain language (no jargon)
- Lead with the news (good or bad; don't bury it)
- Be specific about dates and metrics
- Don't over-promise on next week's plans
```

**Why it's better:**
- Format is executive-ready (respects their time)
- Context includes all the info stakeholders need to decide
- Constraints keep it concise and actionable
- Template prevents rambling status updates

---

### Template 6: Data Analysis & Interpretation

**Before (Bad):**
```
Analyse our user engagement data and tell me what it means.
```

**After (Good):**
```
ROLE: You are a data analyst and product strategist.

CONTEXT:
Product: [What it does]
Metric we care about: [E.g., "user retention", "daily active users", "feature adoption"]
Time period: [E.g., "Last 90 days"]
Background: [What's changed? New feature launch? Marketing campaign? Competitive pressure?]

Here's the data:
[Paste your CSV, table, or data summary]

Data columns represent: [Explain what each column means]

TASK:
1. Describe what the data shows (What's the trend?)
2. Identify anomalies (What's surprising or unexpected?)
3. Hypothesise why (What caused this trend?)
4. Recommend actions (What should we do about it?)

FORMAT:
- Headline insight (1 sentence: "Retention improved 8% but only for users 30+")
- Trend summary (2–3 sentences: What's happening?)
- Key findings (3–4 bullets with data quotes)
- Anomalies (What stood out? Positive or negative?)
- Hypothesis (Why did this happen?)
- Recommended actions (2–3 specific next steps)
- Data quality note (Is there anything we should doubt or investigate further?)

CONSTRAINTS:
- Only use the data provided; don't speculate beyond it
- Cite specific numbers (not just "users increased")
- Flag if sample size is small or data seems incomplete
- Prioritise insights by business impact (not statistical significance)
- Recommend only actions we can actually take
```

**Why it's better:**
- Keeps AI honest (only use provided data, flag gaps)
- Format forces structured thinking (not just raw insights)
- Removes the "so what?" problem (recommends actions, not just observations)
- Constraints prevent over-confident analysis of weak data

---

## Building Your Personal Prompt Library

You're not writing prompts once and throwing them away. Great product managers build a **reusable library** that gets better over time.

### Step 1: Create a System

Use one of these:
- **Obsidian/Notion database:** Each prompt is a note with tags for category (PRD, Competitive, User stories, etc.)
- **GitHub repo:** Organised by folder (e.g., `/prd-writing`, `/competitive-analysis`)
- **Spreadsheet:** Columns for Category, Use Case, Prompt, Output Example, Notes
- **Claude Projects feature:** Save prompts with context as pinned instructions

What matters: **You can find it when you need it.** Tag by use case, not just format.

### Step 2: Populate with Your Prompts

Start with the six templates above. Then add variations:
- PRD prompt for API products (different structure than consumer features)
- Competitive analysis for enterprise vs. SMB (different focus areas)
- User story templates for different team types (engineering, design, support)

Each time you use a prompt and refine it, save the **improved version**. This is compounding value.

### Step 3: Version & Iterate

Good prompts get better over time. Track versions:

```
Prompt: PRD Writing
Version: 2.1 (Updated Jan 2026)
Last used: Jan 23, 2026
Output quality: Excellent

Changes from 2.0:
- Added "Constraints" section to reduce scope creep
- Moved "context" above task (better for Claude)
- Added JSON option for outputs
- Removed outdated template format

Next iteration: Test with new feature example
```

The second time you use a prompt, you notice what was missing. The third time, it's tight. The tenth time, it's a superpower.

### Step 4: Share with Your Team

Your personal library becomes a team asset. Document how each prompt works, why it works, and when to use it. This compresses the learning curve for junior PMs and keeps team output consistent.

---

## Common Mistakes PMs Make (And How to Fix Them)

### Mistake 1: Vague Context

**Bad:**
```
We need a new feature. Can you help?
```

**Fix:**
```
We're a [product type] for [users]. Our users struggle with [specific problem].
Our competitors solve it by [how], but we think there's a better way: [your approach].
Can you help flesh out...?
```

**Why:** AI can't read minds. Explicit context = better output.

---

### Mistake 2: No Examples

**Bad:**
```
Write user stories in our format.
```

**Fix:**
```
Write user stories in this format (here's an example):

SEARCH-001 | Search: Filter by date range
As a project manager, I want to filter search results by date range so that I find
recent conversations without scrolling through months of history.
AC: Given I've searched for a term, when I click the "Date" filter, then I see
options (Last week / Last month / Last 3 months / Custom range).
AC: Given I've set a custom date range, when I search, then only results in that
range appear.
Effort: Medium | Blocker: None

Now write 5 more stories covering [specific areas].
```

**Why:** Examples are the highest-impact technique. They reduce iteration cycles by 80%.

---

### Mistake 3: Asking for Everything at Once

**Bad:**
```
Analyse our market, our competitors, our opportunities, and recommend a new product.
```

**Fix:**
```
Let's break this into steps.

Step 1: Analyse our market (TAM, growth, trends)
Step 2: Competitive landscape (who's winning, how)
Step 3: Market gaps (where we could fit)
Step 4: Then recommend a new product that fills those gaps.

Let's start with Step 1. Here's our market data: [...]
```

**Why:** Complex tasks compound error. Smaller prompts = better outputs. You can verify each step before moving on.

---

### Mistake 4: Conflicting Constraints

**Bad:**
```
Write a PRD that's comprehensive but also super concise.
It should cover everything but avoid jargon and stay simple.
Make it creative but also practical.
```

**Fix:**
```
Write a one-page PRD (max 500 words). Focus on:
- Problem (why we're building this)
- Success metrics (how we'll measure success)
- User walkthrough (one detailed scenario)

Skip the technical architecture and detailed acceptance criteria (that's for later).
```

**Why:** AI optimises for clarity. Give it one constraint set, not five competing goals.

---

### Mistake 5: Not Iterating

**Bad:**
```
[Use a prompt once, get an output, never look at it again]
```

**Fix:**
```
[Use a prompt, get output, read it and think]
↓
"This is 70% good but missing X, too verbose on Y, and should add Z."
↓
[Edit the prompt to fix those things]
↓
[Run again, get better output]
↓
[Save this improved version to your library]
```

**Why:** Prompt engineering is iterative. You're not looking for perfect on the first try. You're looking for **good and getting better**.

---

## Pro Tips (The Next Level)

### Tip 1: Put Instructions After Context (For Claude)

Claude processes information better when documents/context come first, then instructions. Unlike some models, Claude benefits from seeing the data before being asked to analyse it.

```
CONTEXT: [your situation]
DOCUMENT: [data/example]
TASK: [what to do with it]
```

### Tip 2: Use XML Tags for Structure

XML tags help Claude parse structured data:

```
<product_info>
Name: [Product]
Target users: [Who uses it]
</product_info>

<market_data>
TAM: $X billion
Growth rate: Y% YoY
</market_data>

<task>
Given this product and market, recommend a GTM strategy.
</task>
```

### Tip 3: Tell AI What NOT to Do (Sparingly)

Negative constraints can backfire. Instead of "Don't be too technical," try "Use simple language that a non-technical stakeholder would understand."

### Tip 4: Pre-Fill to Guide Output

If you want JSON, start with `{`. If you want a numbered list, start with `1. `. AI will complete the pattern.

```
Analyse this competitive market.

Analysis:
1. Market size:
2. Key players:
3. Market trends:
4. Opportunity gaps:
```

### Tip 5: Use "Thinking" for Complex Problems

For Claude, you can ask it to show its reasoning:

```
I need help prioritising these three features. Please think through the trade-offs
and then give me a recommendation. Show your reasoning for each step.
```

Claude will take more time and produce more thoughtful output.

---

## Key Takeaways

- **Prompt engineering is the new spec writing.** A clear prompt saves iteration loops.

- **Use the ROLE | CONTEXT | TASK | FORMAT | CONSTRAINTS framework.** It works for every prompt type.

- **Few-shot prompting (examples) is the highest-impact technique.** 3–5 examples beat a thousand words of explanation.

- **Build a personal prompt library.** Version it, iterate, and share with your team.

- **Iterate ruthlessly.** The second and third version of a prompt is always better than the first.

- **Apply to your real work:** PRDs, competitive analysis, user stories, sprint planning, status updates, and data analysis. These six templates cover 80% of what PMs actually do.

- **Start simple, then layer in sophistication.** Chain-of-thought and structured output are powerful once your basics are solid. (In the Design AI Features module, you'll apply these same skills to building AI features for your users, not just yourself.)

---

## Explore Further

- **Context Engineering** — Theory behind few-shot prompting, chain-of-thought, and structured output
- **Claude's Prompt Engineering Guide** — Advanced techniques from Anthropic
- **Prompt Engineering 2025: The Latest Best Practices** — Research roundup from industry leaders
- **ProdPad Guide: Prompt Engineering for Product Managers** — PM-specific examples and frameworks
- **GitHub: Awesome Claude Prompts** — Community library of real prompts you can adapt
- **Anthropic's Interactive Prompt Engineering Tutorial** — Hands-on practice (Claude-focused)
