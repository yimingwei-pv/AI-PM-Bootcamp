---
title: "Exercise: Map Workflows and Identify AI Opportunities"
module: 3
lesson: 3
description: "A hands-on exercise to audit your team's real workflows, score them for AI fit, and produce prioritised opportunity briefs you can take to stakeholders."
objectives:
  - "Map your team's core workflows across the PM lifecycle and estimate time investment"
  - "Score workflows against the five-dimension AI Opportunity Scorecard"
  - "Produce actionable opportunity briefs for your top AI candidates"
resources:
  - title: "Why Most AI Products Fail — Mind the Product (MIT 2025 Report)"
    url: "https://www.mindtheproduct.com/why-most-ai-products-fail-key-findings-from-mits-2025-ai-report/"
    type: "article"
  - title: "The Agentic AI Framework Every PM Needs in 2026"
    url: "https://www.productreleasenotes.com/p/agentic-ai-is-here-the-5-step-framework"
    type: "article"
quiz:
  - question: "In the five-dimension AI Opportunity Scorecard, which dimension asks 'Can users absorb mistakes?'"
    options:
      - "Pattern Match"
      - "Volume & Repetition"
      - "Error Tolerance"
      - "Data Availability"
    answer: 2
  - question: "What is the purpose of the 'Simpler Solution' sanity check?"
    options:
      - "To determine if the AI model is complex enough"
      - "To verify that a spreadsheet formula, Zapier, or better template can't solve 80% of the problem"
      - "To check if the team has enough engineering resources"
      - "To estimate the total cost of an AI solution"
    answer: 1
---

## Applying the Frameworks

You've now learned how to distinguish proven AI capabilities from emerging ones ([Lesson 3.1](/AI-PM-Bootcamp/modules/identify-opportunities/)) and how to score opportunities for viability ([Lesson 3.2](/AI-PM-Bootcamp/modules/assessing-viability/)). This exercise applies those frameworks to something concrete — your own team's work.

The exercise takes 20–30 minutes. By the end, you'll have a prioritised shortlist of AI opportunities grounded in actual workflows, and opportunity briefs specific enough to bring to a stakeholder conversation.

One thing to expect: the best opportunities are almost never the glamorous ones. Teams consistently find that their highest-scoring workflow is something unglamorous — feedback triage, status report assembly, data reconciliation — rather than the flashy AI feature that came up at the last all-hands.

---

## Step 1: Map Your Team's Core Workflows (10 Minutes)

Open your calendar and look at last week. What meetings did you prepare for? What documents did you create? What recurring tasks ate your time? Those are your workflows.

List 6–8 recurring workflows your team performs weekly or monthly. Don't filter yet — just capture them. To jog your memory, here are the kinds of tasks that consistently surface when PMs do this exercise:

- Reading through 50+ Intercom tickets or NPS responses to find the three things that actually matter for the roadmap
- Pulling numbers from Amplitude, Jira, and Salesforce into a stakeholder update every Friday afternoon
- Writing the same sprint review summary in slightly different formats for engineering, design, and leadership
- Manually tagging and categorising feature requests that arrive across email, Slack, sales calls, and support tickets
- Drafting release notes from a list of Jira tickets every two weeks
- Preparing for QBRs by assembling metrics, customer quotes, and progress updates from five different tools
- Reviewing competitor changelogs and pricing pages to spot what's changed

For each workflow, estimate hours per week and note the primary pain point — the specific thing that makes it tedious, slow, or error-prone.

| # | Workflow | Hours/Week | Primary Pain Point |
|---|---------|-----------|-------------------|
| 1 | *Example: Read Intercom tickets and NPS responses for product signals* | 4 hrs | Manually reading 200+ items/month; easy to miss emerging patterns buried in noise |
| 2 | *Example: Write Friday stakeholder update* | 2 hrs | Pulling data from Amplitude, Jira, and Salesforce; 80% of the time is copy-paste, 20% is writing |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

**If you're stuck:** Look at your Slack/Teams messages from the past week. What tasks did you complain about, delegate reluctantly, or put off until the last minute? Those are almost always your best candidates.

---

## Step 2: Score Each Workflow for AI Fit (10 Minutes)

Now evaluate each workflow against five dimensions on a 1–5 scale. Maximum possible score is 25. These dimensions map directly to the capability tiers and checklist from [Lesson 3.1](/AI-PM-Bootcamp/modules/identify-opportunities/).

**1. Pattern Match — Does AI excel at this type of task?**
- 5 = core AI strength (text generation, classification, summarisation, search)
- 3 = emerging capability (reasoning over complex data, multi-step workflows)
- 1 = AI weakness (precise calculations, real-time physical systems, deep domain judgement)

**2. Volume and Repetition — Is there enough scale to justify automation?**
- 5 = daily, high volume (hundreds of items)
- 3 = weekly, moderate volume
- 1 = rare or one-off

**3. Error Tolerance — Can users absorb mistakes?**
- 5 = low stakes, human reviews output anyway (draft emails, internal summaries)
- 3 = medium stakes, some oversight needed (ticket routing, prioritisation)
- 1 = errors are costly (legal compliance, financial calculations, customer-facing with no review)

**4. Data Availability — Do you have what AI needs?**
- 5 = abundant, clean, accessible data (existing documents, structured databases)
- 3 = data exists but scattered or messy
- 1 = little or no relevant data; you'd build the dataset from scratch

**5. Time Savings — How much human effort would this replace?**
- 5 = saves 3+ hours per week
- 3 = 1–2 hours
- 1 = saves minutes at most

| # | Workflow | Pattern | Volume | Error Tol. | Data | Time | **Total** |
|---|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | *Triage support tickets* | 5 | 5 | 4 | 5 | 4 | **23** |
| 2 | *Write stakeholder update* | 4 | 3 | 4 | 3 | 3 | **17** |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

---

## Step 3: Pick Your Top 3 and Pressure-Test Them (5 Minutes)

Sort by total score. Your top three are candidates. Before you invest further, run each through three sanity checks.

### The "What If It's Wrong?" Test

For each candidate, complete this sentence: *"If the AI gets this wrong, the consequence is ___."*

"Someone gets a slightly awkward draft email" — you're in the clear. "We ship incorrect billing data to customers" — doesn't disqualify it, but it means you need a human-in-the-loop design, which changes the effort and the ROI calculation.

### The "Simpler Solution" Test

*"Could a spreadsheet formula, a Zapier automation, or a better template solve 80% of this problem?"*

If yes, start there. This catches the most common AI antipattern: overengineering a solution that's simpler than it looks. Remember the Simplicity Hierarchy from the [Agents lesson](/AI-PM-Bootcamp/modules/agents/) — always start with the simplest approach that works.

### The "Data Reality" Test

*"Do I have at least 20 real examples of this workflow's input and ideal output?"*

Twenty isn't magic, but it's the minimum for a meaningful proof of concept. If you can't assemble 20 examples this week, your data availability score was probably too optimistic.

---

## Step 4: Write Your Opportunity Briefs

For your top 3, fill in this brief. This is what you'd bring to a stakeholder conversation or use to scope a proof of concept.

**Opportunity #1: [Workflow Name]**

> **Problem:** What pain does this solve? How much time or effort does it cost today? Be specific with numbers.
>
> **Proposed AI approach:** Which AI capability? Classification, summarisation, generation, semantic search?
>
> **Engagement mode:** Off-the-shelf tool? API integration? Fine-tuned model? (Reference the spectrum from [Lesson 3.2](/AI-PM-Bootcamp/modules/assessing-viability/).)
>
> **Success looks like:** What measurable outcome would make this worth it? e.g., "Reduce triage time from 4 hours to 30 minutes per week with 90% routing accuracy."
>
> **Biggest risk:** What could go wrong? How would you mitigate it?
>
> **First step:** What's the smallest experiment you could run this week?

Repeat for opportunities #2 and #3.

---

## Worked Example: A Real PM Team Runs the Exercise

To show what a completed exercise looks like — including the scoring deliberations and the first experiment — here's a worked example. The hypothetical context: a PM team at a B2B project management tool (think a Jira or Asana competitor) with roughly 2,000 paying customers and a team of two PMs, four engineers, and two designers.

### Their Workflow Map

The team mapped eight workflows. Here are the ones that scored highest, with their reasoning:

| # | Workflow | Hrs/Wk | Pain Point | Pat. | Vol. | Err. | Data | Time | **Total** |
|---|---------|:---:|-----------|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Triage Intercom + NPS for product signals | 4 | Reading 200+ items/month; tagging in a spreadsheet; missing patterns | 5 | 5 | 4 | 5 | 4 | **23** |
| 2 | Write fortnightly release notes from Jira | 2 | Reading 30+ tickets, summarising, formatting; repetitive grunt work | 5 | 4 | 4 | 5 | 3 | **21** |
| 3 | Compile Friday stakeholder update | 2 | Pulling metrics from Amplitude, pipeline from Salesforce, status from Jira | 4 | 4 | 4 | 3 | 3 | **18** |

Some scoring deliberations that came up:

- **Feedback triage scored 4 (not 5) on Error Tolerance** because the team worried about missing a critical bug report. But they realised the PM already misses things manually — so AI at 85%+ accuracy with a human scan of flagged items is strictly better than the status quo.
- **Stakeholder update scored 3 on Data** because the data exists but lives across three tools with no API connections set up. The data is there; the plumbing isn't.
- **Release notes scored 5 on Pattern Match** because it's pure summarisation from structured input (Jira tickets with titles, descriptions, and acceptance criteria) — exactly what LLMs are best at.

### The First Experiment (Feedback Triage)

Rather than building anything, the PM spent 45 minutes testing the top opportunity. Here's exactly what they did:

**Step 1:** Exported last month's 217 Intercom messages and NPS responses into a CSV with three columns: source, date, and raw text.

**Step 2:** Took a batch of 20 items and pasted them into Claude with this prompt:

*"You are a product manager for a B2B project management tool. Classify each piece of customer feedback below into exactly one category: Bug Report, Feature Request, UX Complaint, Praise, or Churn Risk. For each, also provide a one-line summary and a sentiment score (positive, neutral, negative). Return the results as a table."*

**Step 3:** Compared the AI output to how the PM had manually tagged the same 20 items.

**What happened:** 17 out of 20 matched the PM's manual tags exactly. Two items the AI tagged as "Feature Request" the PM had tagged as "UX Complaint" — arguable either way. One item was genuinely wrong: a customer writing sarcastically about a bug ("Love how the app crashes every time I export") was classified as "Praise." The AI missed the sarcasm.

**What this told them:** 85% exact match, 95% if you count the arguable cases. The sarcasm failure is a known LLM limitation — fixable by adding "Watch for sarcasm" to the prompt and including a sarcastic example. After updating the prompt and testing on another 20 items: 19/20 correct.

**The opportunity brief they wrote:**

> **Problem:** One PM spends 8 hours per month manually reading and tagging 200+ feedback items from Intercom and NPS. Pattern recognition is inconsistent — a critical export bug was buried for two weeks last quarter because it was spread across 12 different messages.
>
> **Proposed AI approach:** Classification + summarisation via API (Mode 2). Tag each item by category, sentiment, and customer tier. Generate a weekly digest of top themes with example quotes.
>
> **Success looks like:** Monthly triage drops from 8 hours to 1 hour. Theme accuracy above 90%. No critical issue goes undetected for more than one weekly digest cycle.
>
> **Biggest risk:** AI misses a critical pattern by miscategorising related tickets into different themes. Mitigated by: human review of all items the model flags as low-confidence, and a weekly 15-minute scan of the raw feed.
>
> **First step (already done):** 45-minute test on 40 real items showed 90–95% accuracy after one prompt iteration. Next: run on the full month's data and compare the AI-generated digest to the PM's manual synthesis.

Notice what makes this brief useful: it has specific numbers from an actual test, not estimates from a planning meeting. "90–95% accuracy after one prompt iteration" is a fact, not a hope. That's what makes it credible in a stakeholder conversation.

---

## Thinking Bigger: AI Across the Product Development Lifecycle

The exercise above focuses on your team's current workflows. But the most impactful AI opportunities often emerge when you zoom out to the entire product development lifecycle — not just the PM's tasks, but every stage from discovery through release.

When working with a large financial services company on their AI-augmented product development framework, we mapped every stage of their product process and identified where AI tools could augment specific activities. The result wasn't one big AI project — it was a layer of AI augmentation across the whole lifecycle, each piece relatively simple on its own.

Here's what a simplified version of that mapping looks like:

| Phase | Traditional Activity | AI Augmentation |
|---|---|---|
| **Discovery & Requirements** | User research synthesis, writing PRDs | AI to synthesise interview transcripts and user research; tools like ChatPRD to draft requirements documents from raw notes |
| **Planning & Prioritisation** | Sprint planning, backlog scoring | AI to draft sprint goals aligned with value, auto-score backlog items, pull delivery metrics |
| **Build & Review** | Code review, PR summaries | GitHub Copilot or Claude Code for implementation; AI-generated PR summaries and pattern violation flagging |
| **Launch & Iterate** | Release notes, support triage, knowledge base | Auto-draft release notes from tickets; AI support chatbots for triage; automated knowledge base generation |

**Why this matters for PMs:** AI augmentation isn't a single feature you ship — it's a layer across the entire way your team works. Use the table above as a prompt, not a checklist. Ask: which phase of our process has the most friction? Where are people doing work that matches AI's reliable capabilities (classification, summarisation, generation)? The cumulative time savings from several small AI augmentations often exceed what one big AI feature delivers.

---

## Reflection

Before you move to [Module 4](/AI-PM-Bootcamp/modules/design-ai-features/), sit with these questions:

**Which opportunity surprised you?** The highest-scoring workflow is often something unglamorous that nobody thought of as an "AI opportunity." Pay attention to that — the best AI features solve boring problems at scale.

**What's stopping you from testing your top opportunity this week?** If the answer is "I need engineering resources," challenge that assumption. Many AI experiments start with a PM, an API key, and a spreadsheet.

**Where did you score low on Data Availability?** That's your biggest practical blocker. Consider whether you could start collecting that data now, even before building anything. Six months of intentional data collection turns a "no data" problem into a viable opportunity.

---

## What's Next

With your top opportunities identified, scored, and pressure-tested, [Module 4](/AI-PM-Bootcamp/modules/design-ai-features/) takes you from "what to build" to "how to build it." The opportunity briefs you wrote above become a real running example you can use throughout both lessons.
