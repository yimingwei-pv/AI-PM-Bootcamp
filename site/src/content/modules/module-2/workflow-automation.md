---
title: "Extension: Workflow Automation"
module: 2
lesson: 4
description: "Eliminate PM glue work by building AI-powered workflow automations that summarise, route, and report across your tools automatically."
objectives:
  - "Identify repetitive PM workflows suitable for AI automation"
  - "Evaluate and select workflow automation platforms (Zapier, n8n, Make, MCP)"
  - "Build an end-to-end automated feedback triage workflow"
resources:
  - title: "Zapier Workflows"
    url: "https://zapier.com/workflows"
    type: "docs"
  - title: "n8n Documentation"
    url: "https://docs.n8n.io/"
    type: "docs"
quiz:
  - question: "What is the recommended approach before automating a PM workflow?"
    options:
      - "Automate everything possible immediately"
      - "Check if it runs more than 10 times per month, is repetitive, and touches 3+ tools"
      - "Wait until the workflow has been manual for at least one year"
      - "Only automate if you have a dedicated engineering team"
    answer: 1
  - question: "What is a key 'red flag' that suggests a workflow should NOT be automated?"
    options:
      - "The workflow runs daily"
      - "The workflow touches 3+ tools"
      - "The workflow touches customer-facing systems without human review"
      - "The workflow involves summarising Slack messages"
    answer: 2
---

## The Hidden Time Sink

A lot of PM time goes to *glue work* — shuttling information between tools that don't talk to each other. Copying feedback from Slack into a spreadsheet. Categorising support tickets. Pulling data from Jira, Linear, and Google Docs to assemble a status report. It's repetitive, it doesn't compound, and you'll do the same thing again next week.

AI workflow automation handles this for you. You define the workflow once and it runs in the background without you touching it. This lesson walks you through building one, then helps you pick a second one to build on your own.

---

## Exercise: Build Your First Automation (30 minutes)

We're going to build an actual workflow together in Zapier. By the end of this exercise, you'll have a working automation running in the background — no code required.

We'll use **Zapier** because it has the lowest barrier to entry. If you'd prefer a different platform, [Make.com](https://www.make.com) has a generous free tier with a visual builder, or [n8n](https://n8n.io) if you want something open-source. The steps below translate directly to any of them.

### Before You Start

Think about a repetitive task you do every week — something that involves moving information from one tool to another. Copying updates from a project board into Slack. Forwarding survey responses into a spreadsheet. Sending status updates when tasks are completed. That's your target.

Got one? Good. Let's build.

### Step 1: Set Up Zapier (5 minutes)

Go to [Zapier](https://zapier.com) and sign up for a free account if you don't have one. The free tier gives you 100 tasks per month — more than enough to get started.

Once you're in, you'll see a textbox. Enter what you would like to automate today.

Here's what my example Zapier home page looks like — yours will look similar:

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/zapier-home.png" alt="Zapier home page — enter what you want to automate in the textbox" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

Every AI workflow follows a three-step pattern: **Listen** (something triggers it), **Process** (AI evaluates the content), **Act** (something happens with the result). You'll see each step as we build.

### Step 2: Listen — Set the Trigger (5 minutes)

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/zapier-trigger-setup.png" alt="Zapier trigger setup — choose the app and event that kicks off your workflow" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

The trigger is the event that kicks off your workflow. In Zapier, you'll choose an app where the trigger starts — whichever tool holds the information you want to act on.

In my example, I want to automate sending updates when tasks are completed in Trello. So I chose Trello as my trigger app, connected my account, selected the board I want to automate, and set the trigger to fire when a card is moved to the Done column.

For your case, select whichever app and trigger event matches the task you picked above.

### Step 3: Act — Set the Action (5 minutes)

Now add a second step — the action that happens when the trigger fires. Choose the destination app (Slack, email, a spreadsheet, Jira — whatever makes sense for your workflow) and configure what you want it to do.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/zapier-action-setup.png" alt="Zapier action setup — configure the destination app and what happens when the trigger fires" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

In my example, I connected Slack and configured the Zapier bot to send me a private message with the Trello card details. I'm not ready to set the recipient to my manager yet, so for now I've assigned it to myself — a good practice while you're still testing.

For you, this means selecting the action you want to happen as a result of the trigger and configuring the output.

### Step 4: Test and Publish (5 minutes)

Continue building on your automation — add more steps if you want. When you're ready, test it with real data to make sure the trigger and action are wired up correctly, then publish.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/zapier-test-publish.png" alt="Zapier test and publish — verify your automation works with real data before going live" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

### Step 5: Document and Maintain (ongoing)

Automation isn't set-and-forget. As your list of automations grows, good documentation becomes essential. Name your automation clearly so that if it breaks, or you need to revisit it, or you need to hand it off to someone, the purpose and configuration are obvious.

Go ahead and give your automation a descriptive name and add any notes you'll want later.

---

## Deciding What's Worth Automating

Before you build a second workflow, it's worth having a quick framework for what's actually worth the effort — and what isn't.

**Automate when** a workflow runs more than 10 times per month, is highly repetitive, is error-prone when done manually, and crosses 3+ tools.

**Don't automate when** it runs fewer than 5 times per month (manual is faster), requires real judgment each time, changes frequently, or is a one-off task.

**Watch for red flags:** workflows that touch customer-facing systems (support tickets, billing, messaging) without human review in the loop. A miscategorised daily digest is annoying. A miscategorised critical bug report that goes unnoticed is a different story. Always include human oversight for high-stakes decisions — a confidence signal like "I routed this to #bugs, but I'm only 67% confident — review?" goes a long way.

Budget for maintenance too. Expect 2–3 hours per month per workflow for debugging, prompt tuning, and handling tool updates. Treat your prompts like code — version them, test changes on 5–10 examples before pushing live, and monitor accuracy weekly.

---

## Now Build Your Own

With your first automation under your belt and the evaluation framework above, pick a second workflow to build. Here are the most common patterns PMs automate — choose the one that sounds most like your week:

| Workflow | Trigger | AI does | Output |
|---|---|---|---|
| **Status report** | Friday at 4 PM | Summarises tickets closed, PRs merged, blockers from Jira/Linear | Email to exec team + Slack post |
| **Feedback triage** | New feedback arrives (Intercom, email, survey) | Classifies (Bug / Feature / Pricing / Support), rates sentiment | Routes to the right Slack channel + creates a Jira ticket |
| **Competitor alert** | Daily at 9 AM | Checks RSS feeds or websites for new features, pricing changes | Posts to #competitive-intelligence only when something matters |
| **Meeting prep** | 30 minutes before a calendar event | Pulls recent docs, tickets, and notes related to the attendees | Sends you a one-page briefing via email |

Don't see yours? Any workflow that follows Listen → Process → Act works. The trigger can be a schedule, an incoming message, a form submission, a new row in a spreadsheet — anything Zapier connects to.

### Build It (30 minutes)

Open Zapier and create a new Zap. Follow the same three-step structure you just practised:

1. **Listen** — Set your trigger. What event starts this workflow?
2. **(Optional) Process** — Add an AI step between the trigger and the action. Zapier lets you insert an AI model (ChatGPT, Claude, or AI by Zapier) that can process, classify, summarise, or reformat the trigger data before it reaches the destination. Write a prompt using the ROLE / CONTEXT / TASK / FORMAT / CONSTRAINTS framework from [Lesson 2.2](/AI-PM-Bootcamp/modules/prompt-engineering/).
3. **Act** — Choose the destination. Where should the result go? Slack, email, Jira, a spreadsheet?

Test each step as you go.

### Record and Share What You Built

Submit **a one-minute Loom video** showing your workflow. Open [Loom](https://www.loom.com), screen-record Zapier, and keep it to **exactly one minute** — no longer. Here's how to structure it:

- **10 seconds:** What problem does this solve? ("Every Friday I spend 45 minutes assembling a status report…")
- **30 seconds:** Walk through your automation — show the trigger, the AI prompt, and the output destination
- **10 seconds:** Show a real output the workflow produced and how much time you estimate it saves per week
- **10 seconds:** What would you improve or build next if you had more time?

If your recording is over a minute, re-record it shorter.

Upload your Loom to the **[AI PM Bootcamp Community Folder](https://loom.com/share/folder/2840211189a14b47a430fbfadb32dac7)** — the same shared space where prototyping demos from [Lesson 2.3](/AI-PM-Bootcamp/modules/prototyping/) live. Browse what other participants have automated. You'll spot workflow ideas you hadn't considered, and you'll often find that someone else has already solved a problem you've been putting off.

---

## Other Tools to Know

We used Zapier for this exercise, but the ecosystem is broader. As your automation needs grow, here's what to consider:

**Make.com** (formerly Integromat) uses a visual flowchart builder. Its AI Agents feature lets you drop an AI module into any workflow — describe what you want in plain English, attach a knowledge base, and the agent makes routing decisions itself. Good balance of visual clarity and power.

**n8n** is open-source and self-hostable. Deepest AI capabilities including RAG and AI agents. Steepest learning curve, but the most flexible — the choice for technical teams with complex needs.

**Claude MCP** (Model Context Protocol, covered in [Lesson 1.3](/AI-PM-Bootcamp/modules/context-engineering/)) is a newer approach: instead of a separate automation platform, Claude itself orchestrates multi-step workflows through direct connections to your tools — Slack, Linear, GitHub, databases. The ecosystem is growing fast, with thousands of pre-built MCP servers available.

A reasonable progression: **Zapier to get started, then graduate to n8n or MCP as your needs get more complex.**

In [Module 3](/AI-PM-Bootcamp/modules/identify-opportunities/), you'll apply this same evaluation lens — frequency, impact, risk — to finding AI opportunities in your product, not just your workflow. The thinking is the same; the scale is different.

---

## Key Takeaways

1. **Every AI workflow follows Listen → Process → Act.** The AI processing step is what makes these intelligent automations — understanding content, not just matching patterns.

2. **Automate glue work first.** Feedback triage, daily digests, status reports, competitor monitoring. These are high-frequency, low-judgment tasks that eat PM hours every week.

3. **The ROI formula is simple.** Time saved per run × runs per month × months of use, versus build time + maintenance. If it doesn't clear that bar, don't automate it.

4. **Always include human oversight for high-stakes decisions.** Never fully black-box a routing decision that touches customers. Include confidence signals and make overrides easy.

5. **Treat prompts like code.** Version them, test changes on examples before pushing to production, and monitor accuracy over time. The prompt is the brain of your workflow.

## Explore Further

- [Zapier Workflows](https://zapier.com/workflows) — The fastest path to your first automation. Natural language Copilot builds workflows from descriptions.
- [n8n Documentation](https://docs.n8n.io/) — Open-source, self-hostable workflow automation with deep AI capabilities including RAG and AI agents.
