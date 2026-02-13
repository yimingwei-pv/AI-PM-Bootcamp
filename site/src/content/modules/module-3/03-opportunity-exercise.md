---
title: "Exercise: Map Workflows and Identify AI Opportunities"
module: 3
lesson: 3
description: "A hands-on exercise to audit your team's real workflows, score them for AI fit using a structured scorecard, and produce prioritised opportunity briefs."
objectives:
  - "Map your team's core workflows across the PM lifecycle and estimate time investment"
  - "Score workflows against the five-dimension AI Opportunity Scorecard"
  - "Produce actionable opportunity briefs for your top AI candidates"
resources:
  - title: "15 AI Business Use Cases + Real-World Examples - Product School"
    url: "https://productschool.com/blog/artificial-intelligence/ai-business-use-cases"
    type: "article"
  - title: "AI for product managers: essential tools and strategies"
    url: "https://monday.com/blog/rnd/ai-for-product-managers/"
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

You've learned where AI excels in the Identify Opportunities module and how to assess whether an opportunity is worth pursuing in Assessing AI Viability. Now it's time to apply those frameworks to your own team's work.

This exercise takes 20-30 minutes. By the end, you'll have a prioritised shortlist of AI opportunities grounded in real workflows — not wishful thinking.

---

## Step 1: Map Your Team's Core Workflows (10 minutes)

Start by listing the recurring workflows your team performs weekly or monthly. Don't filter yet — just capture them. Think across the full PM lifecycle from the AI-Powered Mindset module.

**Prompt yourself with these categories:**

- **Discovery & Research**: How do you gather customer insights, analyse competitors, synthesise user feedback?
- **Planning & Prioritisation**: How do you write PRDs, score features, plan sprints, update roadmaps?
- **Design & Build**: How do you create specs, review designs, write acceptance criteria, prototype?
- **Launch & Measure**: How do you write launch docs, monitor metrics, create reports, run retrospectives?
- **Communication**: How do you update stakeholders, write status reports, prepare for reviews?

### Your Workflow Map

Use this template. For each workflow, estimate how many hours per week your team spends on it and note the primary pain point.

| # | Workflow | Hours/Week | Primary Pain Point |
|---|---------|-----------|-------------------|
| 1 | Example: Triage customer support tickets for product signals | 4 hrs | Manual reading of hundreds of tickets; easy to miss patterns |
| 2 | Example: Write weekly stakeholder update | 2 hrs | Gathering data from 5 different tools; mostly copy-paste |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

**Tip**: If you're stuck, open your calendar and look at last week. What meetings did you prepare for? What documents did you create? What repetitive tasks ate your time? Those are your workflows.

---

## Step 2: Score Each Workflow for AI Fit (10 minutes)

Now evaluate each workflow using the **AI Opportunity Scorecard** below. This draws directly from the frameworks in the Identify Opportunities and Assessing AI Viability modules.

For each workflow, score these five dimensions on a 1-5 scale (maximum possible total: 25):

### Scoring Criteria

**1. Pattern Match (Does AI excel here?)**
- 5 = Core AI strength (text generation, classification, summarisation, search)
- 3 = Emerging capability (reasoning over complex data, multi-step workflows)
- 1 = AI weakness (precise math, real-time physical systems, novel judgment)

**2. Volume & Repetition (Is there enough scale?)**
- 5 = Daily task, high volume (hundreds of items)
- 3 = Weekly task, moderate volume
- 1 = Rare or one-off task

**3. Error Tolerance (Can you absorb mistakes?)**
- 5 = Low stakes, human reviews output (draft emails, summaries)
- 3 = Medium stakes, some oversight needed (ticket routing, prioritisation)
- 1 = High stakes, errors are costly (legal compliance, financial calculations)

**4. Data Availability (Do you have what AI needs?)**
- 5 = Abundant, clean, accessible data (existing docs, structured databases)
- 3 = Data exists but is scattered or messy
- 1 = Little or no relevant data; would need to build from scratch

**5. Time Savings (How much human effort does it replace?)**
- 5 = Saves 3+ hours per week
- 3 = Saves 1-2 hours per week
- 1 = Saves minutes at most

### Your Opportunity Scorecard

| # | Workflow | Pattern Match | Volume | Error Tolerance | Data Available | Time Savings | **Total** |
|---|---------|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Triage support tickets | 5 | 5 | 4 | 5 | 4 | **23** |
| 2 | Write stakeholder update | 4 | 3 | 4 | 3 | 3 | **17** |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |
| 6 | | | | | | | |
| 7 | | | | | | | |
| 8 | | | | | | | |

---

## Step 3: Pick Your Top 3 and Pressure-Test Them (5 minutes)

Sort by total score. Your top three are your candidates. But before you commit, run each through these three sanity checks:

### Sanity Check 1: The "What If It's Wrong?" Test

For each candidate, complete this sentence:

> "If the AI gets this wrong, the consequence is ___."

If the consequence is "someone gets a slightly awkward draft email" — green light. If the consequence is "we ship incorrect billing data to customers" — that's a red flag that demands human-in-the-loop design, not necessarily disqualification.

### Sanity Check 2: The "Simpler Solution" Test

Ask yourself honestly:

> "Could a spreadsheet formula, a Zapier automation, or a better template solve 80% of this problem?"

If yes, start there. AI should solve problems that simpler tools can't. Revisit the Simplicity Hierarchy from the Agents module — always start with the simplest approach that works.

### Sanity Check 3: The "Data Reality" Test

For each candidate:

> "Do I have at least 20 real examples of this workflow's input and ideal output?"

If not, you'll struggle to evaluate whether any AI solution actually works. You don't need thousands of examples for a proof of concept, but you need enough to test meaningfully.

---

## Step 4: Write Your Opportunity Briefs

For your top 3 opportunities, fill in this one-paragraph brief. This is what you'd bring to a stakeholder conversation or use to kick off a proof of concept.

### Opportunity Brief Template

**Opportunity #1: [Workflow Name]**

> **Problem**: [What pain does this solve? How much time/effort does it cost today?]
>
> **Proposed AI approach**: [Which AI capability? Summarisation? Classification? Generation? Reference the categories from the Identify Opportunities module]
>
> **Engagement mode**: [Off-the-shelf tool / API integration / Fine-tuned model? Reference the spectrum from the Assessing AI Viability module]
>
> **Success looks like**: [What measurable outcome would make this worth it? e.g., "Reduce triage time from 4 hours to 30 minutes per week with 90% routing accuracy"]
>
> **Biggest risk**: [What could go wrong? How would you mitigate it?]
>
> **First step**: [What's the smallest experiment you could run this week?]

Repeat for opportunities #2 and #3.

---

## Worked Example: SaaS Feedback Intelligence

To show what a completed exercise looks like, here's a worked example for a mid-market B2B SaaS PM team.

**Context**: A product team at a project management tool (think Asana or Monday.com competitor) with 2,000 customers. The PM team of three manages roadmap, customer feedback, and feature launches.

**Top 3 Identified Opportunities:**

**1. Customer Feedback Clustering (Score: 24/25)**
- *Problem*: 200+ feedback items per month across Intercom, NPS surveys, and sales call notes. Currently, one PM spends a full day each month manually tagging and grouping them.
- *AI approach*: Classification + summarisation. Use an LLM to tag each item by theme, sentiment, and customer segment, then generate a weekly digest.
- *Engagement mode*: API integration (Claude or GPT via API, connected to existing feedback database).
- *Success looks like*: Monthly feedback synthesis drops from 8 hours to 1 hour. Theme accuracy above 85% (validated by PM spot-checks).
- *Biggest risk*: Miscategorisation could cause the team to miss an emerging issue. Mitigate by keeping a human review step for "low confidence" classifications.
- *First step*: Export last month's 200 feedback items. Run them through Claude with a classification prompt. Compare AI tags to the PM's manual tags.

**2. Release Notes Drafting (Score: 20/25)**
- *Problem*: Every two weeks, the PM writes release notes from Jira tickets. Takes 2 hours of reading tickets, summarising, and formatting.
- *AI approach*: Text generation from structured input. Feed Jira ticket titles, descriptions, and acceptance criteria to an LLM with a release notes template.
- *Success looks like*: First draft quality good enough that PM only edits for 15 minutes.
- *First step*: Copy last sprint's Jira tickets into Claude with a system prompt specifying the release notes format. Compare output to what was actually published.

**3. Competitive Intelligence Monitoring (Score: 18/25)**
- *Problem*: Tracking 5 competitors across blogs, changelogs, social media, and review sites. Currently ad-hoc — things get missed.
- *AI approach*: Summarisation + classification. Set up automated collection and use an LLM to surface "things our PM team should know about."
- *Biggest risk*: AI might miss nuanced competitive moves or hallucinate features competitors don't actually have. Requires human verification before acting on any insight.
- *First step*: Collect last month's competitor blog posts and changelogs. Use an LLM to summarise key product changes and flag anything relevant to our roadmap.

---

## Reflection Questions

Before you move on to Module 4, sit with these:

- **Which opportunity surprised you?** Often the highest-scoring workflow isn't the one you expected. Pay attention to that.
- **What's stopping you from testing your #1 opportunity this week?** If it's "I need engineering resources" — challenge that assumption. Many AI experiments can start with a PM, an API key, and a spreadsheet.
- **Where did you score low on Data Availability?** That's your biggest practical blocker. Consider whether you could start collecting that data now, even before building anything.

---

## Key Takeaways

- **Map before you leap**: Real AI opportunities come from auditing actual workflows, not brainstorming "cool AI features."
- **Score ruthlessly**: The five-dimension scorecard prevents you from chasing low-impact or high-risk opportunities.
- **Pressure-test your top picks**: The "What If It's Wrong?", "Simpler Solution?", and "Data Reality" checks catch blind spots.
- **Start with the smallest experiment**: Your first step should take hours, not weeks. Export data, run it through an LLM, compare the output. That's your proof of concept.
- **Your top 3 aren't permanent**: Revisit this exercise quarterly as AI capabilities evolve and your team's needs change.

---

## Explore Further

- [Identify Opportunities for AI](/AI-PM-Bootcamp/modules/01-identify-opportunities/) — Review the AI capability categories to refine your scoring
- [Assessing AI Viability](/AI-PM-Bootcamp/modules/02-assessing-viability/) — Run a full viability assessment on your top opportunity
- [Design AI Features](/AI-PM-Bootcamp/modules/01-design-ai-features/) — Choose the right model, design for failure, and pick the right AI pattern
- [Shipping with Quality](/AI-PM-Bootcamp/modules/02-shipping-with-quality/) — Define metrics, build evals, and ship responsibly

---

## What's Next

With your top opportunities identified and validated, Module 4 takes you into execution. You'll use the opportunities you identified here as your running example throughout the Design AI Features and Shipping with Quality modules.
