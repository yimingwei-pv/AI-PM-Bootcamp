---
title: "AI-Powered Mindset"
module: 2
lesson: 1
description: "Develop a framework for identifying which PM tasks to delegate to AI and which to keep human, and build practical habits for integrating AI into your daily workflow."
objectives:
  - "Identify which PM lifecycle tasks are best suited for AI delegation versus human judgment"
  - "Apply the AI Capability vs. Human Judgment Matrix to evaluate task delegation"
  - "Build a practical plan for integrating AI tools into your PM workflow"
resources:
  - title: "AI and product management: What you need to know"
    url: "https://www.atlassian.com/agile/product-management/pm-and-ai"
    type: "article"
  - title: "Using AI to write a product requirements document (PRD)"
    url: "https://www.chatprd.ai/resources/using-ai-to-write-prd"
    type: "docs"
  - title: "To Drive AI Adoption, Build Your Team's Product Management Skills - HBR"
    url: "https://hbr.org/2026/02/to-drive-ai-adoption-build-your-teams-product-management-skills"
    type: "article"
  - title: "An Opinionated Guide to Using AI Right Now - Ethan Mollick"
    url: "https://www.oneusefulthing.org/p/an-opinionated-guide-to-using-ai"
    type: "article"
  - title: "Claude Cowork Documentation"
    url: "https://docs.anthropic.com/en/docs/claude-cowork"
    type: "docs"
  - title: "Claude Cowork Is Out. Here's When You Still Want Claude Desktop — Product Compass"
    url: "https://www.productcompass.pm/p/claude-cowork-is-out"
    type: "article"
quiz:
  - question: "According to the task delegation matrix, which type of task should be fully automated with AI?"
    options:
      - "High judgment, high AI capability tasks"
      - "Low judgment, high AI capability tasks"
      - "High judgment, low AI capability tasks"
      - "Low judgment, low AI capability tasks"
    answer: 1
  - question: "Which of the following is something AI CANNOT replace in product management?"
    options:
      - "Synthesising user feedback from interviews"
      - "Drafting PRDs from structured inputs"
      - "Making trade-off decisions under uncertainty"
      - "Generating release notes from ticket data"
    answer: 2
---

## Motivation

Most PMs use AI occasionally — a quick summary here, a draft there. But few have a clear system for deciding *what* to hand to AI and what to keep doing themselves. Without that system, you either spend time on tasks a model could handle, or you delegate things that actually need your judgment and get polished-looking outputs that miss the point.

This lesson gives you a framework for making that call consistently, so you can focus your time where it matters most.

---

## Where AI Creates Real Leverage

Think about your last week. How much time did you spend on *processing* — reading feedback, summarising meetings, drafting documents, compiling reports, writing release notes? Now how much time did you spend on *thinking* — deciding what to build next, understanding a customer's real problem, navigating a tricky stakeholder conversation?

If you're like most PMs, the ratio skews heavily toward processing. That's the opportunity.

LLMs are pattern-recognition engines trained on text (Lesson 1.1). They're exceptionally good at tasks that involve reading, summarising, drafting, comparing, and structuring information. They struggle with tasks that require judgment under uncertainty, emotional intelligence, or strategic vision. The key is knowing which is which.

Here's how that maps across your PM lifecycle:

| Phase | AI handles well | You handle |
|---|---|---|
| **Discovery** | Summarise 20 interview transcripts in minutes. Surface patterns across feedback. Monitor competitor pricing and features automatically. | Decide which problem is worth solving. Read between the lines in a customer conversation. Frame the real problem, not the stated one. |
| **Definition** | Draft 80% of a structured PRD from your inputs. Organise features into roadmap themes. Generate acceptance criteria and edge cases. | Make the trade-off calls. Decide what's in scope and what's not. Set the vision for what "good" looks like. |
| **Development** | Transcribe and summarise standups. Draft status updates from ticket data. Flag blockers early. | Unblock your engineers on ambiguous requirements. Manage scope when timelines slip. Make the hard call on what to cut. |
| **Delivery** | Draft launch copy, release notes, executive briefings. Aggregate post-launch metrics into summaries. | Decide the rollout strategy. Handle the conversation when something goes wrong. Own the narrative. |

Notice the pattern. AI excels at the *information-processing layer* — the grunt work that sits between raw data and human decisions. Your job is the decision layer above it.

**Why this matters for PMs:** Early adopters consistently report reclaiming several hours per week by offloading processing tasks to AI. But the hours only matter if you redirect them to the work that actually needs you — strategy, customer empathy, and the difficult trade-offs that shape your product.

---

## The Delegation Matrix

When you're deciding whether to hand a task to AI, two questions matter: **how much judgment does it require?** and **how capable is AI at it today?**

Plot any PM task on those two axes and it falls into one of four zones:

<div style="max-width:640px; margin:1.5rem auto; font-family:inherit;">
  <div style="display:grid; grid-template-columns:auto 1fr 1fr; grid-template-rows:auto 1fr 1fr; gap:0;">
    <div style="grid-row:1; grid-column:1;"></div>
    <div style="grid-row:1; grid-column:2; text-align:center; padding:0.5rem; font-weight:600; font-size:0.85rem; color:#555;">Low Judgment</div>
    <div style="grid-row:1; grid-column:3; text-align:center; padding:0.5rem; font-weight:600; font-size:0.85rem; color:#555;">High Judgment</div>
    <div style="grid-row:2; grid-column:1; writing-mode:vertical-lr; transform:rotate(180deg); text-align:center; padding:0.5rem; font-weight:600; font-size:0.85rem; color:#555;">High AI Capability</div>
    <div style="grid-row:2; grid-column:2; background:#d4edda; border:1px solid #c3e6cb; border-radius:8px 0 0 0; padding:1.25rem; text-align:center;">
      <div style="font-weight:700; font-size:1.1rem; color:#2d6a4f; margin-bottom:0.5rem;">Automate</div>
      <div style="font-size:0.8rem; color:#555; line-height:1.4;">Meeting summaries<br/>Release notes<br/>Transcription</div>
    </div>
    <div style="grid-row:2; grid-column:3; background:#fde8d0; border:1px solid #f5c6a0; border-radius:0 8px 0 0; padding:1.25rem; text-align:center;">
      <div style="font-weight:700; font-size:1.1rem; color:#b45309; margin-bottom:0.5rem;">AI + Human</div>
      <div style="font-size:0.8rem; color:#555; line-height:1.4;">Writing PRDs<br/>Competitive analysis<br/>Roadmapping</div>
    </div>
    <div style="grid-row:3; grid-column:1; writing-mode:vertical-lr; transform:rotate(180deg); text-align:center; padding:0.5rem; font-weight:600; font-size:0.85rem; color:#555;">Low AI Capability</div>
    <div style="grid-row:3; grid-column:2; background:#e8e8e8; border:1px solid #d0d0d0; border-radius:0 0 0 8px; padding:1.25rem; text-align:center;">
      <div style="font-weight:700; font-size:1.1rem; color:#555; margin-bottom:0.5rem;">Do Manually</div>
      <div style="font-size:0.8rem; color:#555; line-height:1.4;">Update a status field<br/>Schedule a meeting<br/>Move a card</div>
    </div>
    <div style="grid-row:3; grid-column:3; background:#dbeafe; border:1px solid #bfdbfe; border-radius:0 0 8px 0; padding:1.25rem; text-align:center;">
      <div style="font-weight:700; font-size:1.1rem; color:#1e40af; margin-bottom:0.5rem;">Keep Human</div>
      <div style="font-size:0.8rem; color:#555; line-height:1.4;">Strategic planning<br/>Customer interviews<br/>Problem framing</div>
    </div>
  </div>
</div>

**Automate** (top-left) — Low judgment, high AI capability. Meeting summaries, release notes, data compilation, transcription. AI handles these end-to-end. Spot-check occasionally, but don't review every output.

**AI + Human** (top-right) — Higher judgment, but AI is still capable. PRD drafts, feedback synthesis, competitive analysis, roadmapping. AI produces a strong first draft; you refine it and make the final call. This zone is where most of your productivity gains come from.

**Keep Human** (bottom-right) — High judgment, low AI capability. Strategy, vision, stakeholder leadership, trade-off decisions, customer empathy. AI can provide background research, but you own the decision. These tasks become *more* important as AI handles the rest.

**Do Manually** (bottom-left) — Low judgment, low AI capability. Simple tasks like updating a status field, scheduling a meeting, or moving a card across a board. Not worth automating, not worth overthinking.

Before delegating any task, five quick checks:

1. **Can you verify the output quickly?** A feedback summary is easy to assess. A strategic recommendation is not.
2. **What's the cost if AI gets it wrong?** An internal draft has low stakes. Customer-facing messaging has high stakes.
3. **Can you define success clearly?** "Summarise this feedback" has clear criteria. "Write a visionary PRD" does not.
4. **Is your input high-quality?** Structured data in, good output out. Rambling notes in, mediocre output out.
5. **Does review take less time than doing it yourself?** If reviewing takes longer than writing it, the leverage disappears.

The sweet spot: tasks where AI saves you 30–60 minutes and review takes 10–15.

---

## What AI Can't Replace

This is worth saying directly, because the anxiety is real: **AI will not replace product managers.** But it is changing what the job looks like.

AI is eliminating the parts of your role that are routine, deterministic, and easily verified. The parts that involve processing information into structured outputs. If your job was mostly this — summarising, drafting, compiling — then yes, AI is coming for a chunk of your workload.

But the parts that matter most? Those are getting more important, not less. Deciding which problems are worth solving. Building genuine customer empathy — not summarised empathy, but the kind you get from sitting in a room and hearing someone describe their frustration. Making complex trade-offs where the data is ambiguous and the stakes are real. Leading a team through uncertainty. Setting a vision for where the product should go.

These require judgment, emotional intelligence, and the ability to hold multiple conflicting perspectives simultaneously. Based on what we know about how LLMs work (Lesson 1.1), these are not capabilities that scale with more parameters or training data — they require a fundamentally different kind of intelligence.

**Product implication:** The PMs who thrive will be the ones who adopt AI aggressively for the processing layer and redirect that freed-up time into deeper customer work, sharper strategy, and better leadership. The PMs at risk are those who either resist AI entirely or, just as dangerously, use it as an excuse to skip thinking.

---

## Putting It Into Practice

You don't need to overhaul your workflow on day one. Start with one task this week.

Pick something from the "Automate" or "AI + Human" zone — feedback synthesis is a great starting point. Take your last 10 customer interviews or feedback tickets and paste them into Claude, ChatGPT, or whichever model you prefer. Ask: "What are the top 5 pain points? Rank by frequency. Which surprised you?"

Compare the output to your own instinct. What did the AI capture that you might have missed? What context did it lack that you'd add? This teaches you the shape of the collaboration — where AI adds value and where it falls short.

Then try a document. Write a PRD with AI as your co-writer: 15 minutes defining the problem and inputs, 10 minutes letting AI draft, 20 minutes refining and adding strategic nuance. Track the time savings. Most PMs save 30–45 minutes per document this way.

In Lesson 2.2, you'll learn how to write prompts that make these collaborations dramatically more effective. In Lesson 2.3, you'll use AI to build working prototypes in hours instead of weeks. And in Lesson 2.4, you'll automate entire workflows so the processing layer runs on its own.

For now, the important thing is the mindset shift: **AI handles the information processing. You handle the judgment. The faster you build that habit, the more strategic your role becomes.**

---

## Exercise: Map Your AI Leverage

Take 10 minutes and list the five tasks you spent the most time on last week. For each one, plot it on the delegation matrix: how much judgment does it require (low/medium/high)? How capable is AI at it today (low/medium/high)?

You'll probably find that 2–3 of those tasks sit squarely in the "AI + Human" zone. Those are your quick wins — the tasks where AI can give you back hours this month, starting with the prompting techniques in the next lesson.

---

## Extension: How Propel Ventures Uses AI Today

The delegation matrix above gives you a framework for *deciding* what to hand to AI. This section shows you what it looks like when a team actually does it.

At Propel Ventures, we've been running structured AI experiments across areas of our business in the recent few years. Not everything worked. Some experiments saved hours per week; others taught us more about AI's limits than its strengths. Both outcomes were valuable.

### 1. Research — Replacing the Tab-Sprawl for Internal Documentation

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/propel-ai-research.png" alt="Propel Ventures AI-powered research workflow using Microsoft 365 for sourced, synthesised answers" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

Market research, competitive analysis, and technical due diligence used to mean hours of Googling and synthesising across dozens of tabs. We moved exploratory research across company documents to AI-powered search tools like Microsoft 365 which provide sourced, synthesised answers rather than a list of blue links.

For broad landscape questions — "What are the main players in X space?" or "What are the regulatory requirements for Y?" — this cut research time significantly. The key habit: verify sources rather than taking answers at face value. For deep, nuanced research (e.g., understanding a specific customer segment), traditional methods still win.

### 2. Marketing — Automating the Content Pipeline

Producing consistent marketing content — social posts, blog drafts, email sequences — required more bandwidth than the team had. We built automated content pipelines using workflow automation tools that pull triggers from one system, run content through an LLM, and push outputs to another. For example: a new case study gets published → AI drafts three social posts in different formats → a human reviews and schedules them.

The Listen → Process → Act pattern from Lesson 2.4 works well here. The critical insight: review is not optional. AI-generated marketing content that ships without human polish sounds generic and can damage brand voice. The automation saves time on the draft; the human saves the brand.

*Automate* for the pipeline mechanics. *AI + Human* for the content itself.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/propel-ai-marketing.png" alt="Propel Ventures automated marketing content pipeline" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

### What We'd Tell You Before You Start

**Start with one workflow, not five.** Pick the task that annoys you most and has the clearest success criteria. Get that working before you expand.

**Invest in input quality.** The single biggest predictor of AI output quality is the quality of what you give it. Structured prompts, clean data, and clear context beat a better model every time. This is why Lesson 2.2 exists.

**Build verification habits early.** The risk with AI isn't that it produces terrible output — it's that it produces *plausible* output that's subtly wrong. Always verify facts, figures, and anything customer-facing.

**Share what works.** The fastest way to build AI fluency across a team is to share prompts, custom configurations, and workflows that actually work. We maintain an internal prompt library — you'll build the start of yours in Lesson 2.2.

**Track the time.** It's easy to *feel* like AI is saving time without actually measuring it. We track time-saved estimates for each experiment. Some workflows save 5+ hours per week; others save 20 minutes. Knowing the difference helps you prioritise.

---

## Extension: Claude Cowork

Claude Cowork is Anthropic's desktop tool that gives Claude direct access to files on your computer. Unlike the standard chat interface (where you paste text or upload files into a conversation), Cowork lets Claude read, create, and edit documents in a folder you select — working more like a colleague sitting at your desk than a chatbot in a browser tab.

The practical difference: instead of copying content back and forth between Claude and your documents, you point Cowork at a folder and say "read the brief in that folder and draft a PRD." It reads the file, writes the document, and saves it where you can open it immediately.

Cowork also connects to external tools through connectors — Slack, Outlook, SharePoint, and others — so it can pull context from your actual work environment rather than relying on what you paste in.

The general rule: if you're producing a *file* as the output, Cowork is usually the better choice. If you're producing a *response* (an answer, an idea, a quick rewrite), chat is faster.

---

## Key Takeaways

1. **AI handles information processing; you handle judgment.** The delegation matrix gives you two axes — judgment required and AI capability — to decide what to hand off, what to co-create, and what to keep human.

2. **Five checks before you delegate.** Can you verify the output? What's the cost of error? Can you define success? Is your input quality high enough? Does review take less time than doing it yourself?

3. **The job is changing, not disappearing.** AI eliminates the routine processing layer of PM work. The parts that matter most — strategy, customer empathy, trade-off decisions — are becoming more important, not less.

4. **Start with one workflow.** Pick the task that annoys you most and has the clearest success criteria. Get that working before you expand.

5. **Track the time.** Measure what AI actually saves you. Some workflows save hours per week; others save minutes. Knowing the difference helps you prioritise.

## Explore Further

- [An Opinionated Guide to Using AI Right Now — Ethan Mollick](https://www.oneusefulthing.org/p/an-opinionated-guide-to-using-ai) — Practical advice on which AI models to use for different tasks and when free models are good enough.
- [Claude Cowork Documentation](https://docs.anthropic.com/en/docs/claude-cowork) — Official guide to Anthropic's desktop AI tool for file and task management.
- [To Drive AI Adoption, Build Your Team's Product Management Skills — HBR](https://hbr.org/2026/02/to-drive-ai-adoption-build-your-teams-product-management-skills) — Harvard Business Review on building AI fluency within product teams.
