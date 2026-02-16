---
title: "Prototyping with AI"
module: 2
lesson: 3
description: "Use AI-powered prototyping tools to collapse the timeline from idea to validated prototype, enabling faster product decisions and user testing."
objectives:
  - "Evaluate and choose between major AI prototyping platforms based on project needs"
  - "Build a functional prototype using AI tools within a compressed timeline"
  - "Integrate AI prototyping into existing product development workflows"
resources:
  - title: "v0 by Vercel"
    url: "https://v0.app"
    type: "docs"
  - title: "Claude Artifacts Tutorial"
    url: "https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts"
    type: "docs"
  - title: "A guide to AI prototyping for product managers"
    url: "https://www.lennysnewsletter.com/p/a-guide-to-ai-prototyping-for-product"
    type: "article"
quiz:
  - question: "Which AI prototyping tool is best suited for converting Figma designs or sketches into production-ready Next.js code with built-in deployment?"
    options:
      - "Lovable"
      - "Replit Agent"
      - "v0 by Vercel"
      - "Bolt.new"
    answer: 2
  - question: "When should you AVOID using AI prototyping?"
    options:
      - "When validating ideas quickly with users"
      - "When exploring multiple design directions in parallel"
      - "When integrating with complex legacy systems or undocumented APIs"
      - "When non-designers need to express product ideas"
    answer: 2
---

## The Shift

Prototyping used to be slow. Wireframes, design review, high-fidelity mockups, engineering hand-off — validating a single idea could easily take two or three weeks. If user testing surfaced problems, you'd loop back and spend another sprint.

AI prototyping tools have compressed that timeline significantly. You can describe a feature in plain English, generate an interactive prototype, test it with users, and iterate — often in a single day. That means you can validate multiple ideas before committing engineering resources, rather than betting a sprint on one direction.

Here's how the landscape works and how to get the most from it.

---

## The Tool Landscape

The AI prototyping market moves fast, so rather than deep-diving each tool (which would be outdated in months), here's the mental model. Tools fall into four categories:

**Full-stack builders** (Bolt.new, Lovable, Replit Agent, v0 by Vercel) generate complete applications — UI, backend, database, authentication — from a text description. You describe what you want, and they produce a running app in your browser. Best for MVPs and proof-of-concepts where you need the whole stack. v0 stands out for its tight integration with Vercel's deployment infrastructure and its ability to take images as input — Figma designs, sketches, even napkin drawings — and convert them to production-ready Next.js code.

**In-conversation prototyping** (Claude Artifacts) lets you generate and iterate on code within a chat. No deployment, no context-switching. Best for technical PMs who want to explore ideas quickly or prototype AI-powered features.

**AI-assisted design tools** (Figma AI) sit inside your existing design workflow. Figma Make lets you prompt-to-app directly within Figma, and Code Layers add interactive elements through natural language — blurring the line between design tool and code generator.

Here's how they compare:

| Platform             | Best for                                                                       | Full-stack?     |
| -------------------- | ------------------------------------------------------------------------------ | --------------- |
| **Bolt.new**         | Quick and dirty MVPs with minimal prompts                                      | Yes             |
| **Lovable**          | PMs new to AI prototyping, and want to focus on front end                      | Front end focus |
| **v0**               | For PMs who are more technical. Design has SaaS / B2B aesthetic. Fairly robust | Yes             |
| **Claude Artifacts** | Fast generation. Designs or features, not full prototype                       | Artifact        |
| **Replit Agent**     | PMs new to AI prototyping. Focused on collaboration and some coding exposure   | Yes             |
| **Figma Make**       | PMs whose teams work in Figma frequently. Easy to edit the design              | Yes             |
| **Google Stitch**    | PMs who want UI not a prototype                                                | UI design only  |

The right choice depends on your situation. Need a full working app fast? Lovable or Bolt. Converting Figma designs into Next.js? v0. Exploring an AI feature idea? Claude Artifacts. Staying in your design workflow? Figma AI.

These tools change constantly — new features ship monthly, and new competitors appear regularly. The durable skill isn't knowing one tool; it's knowing *when* to use AI prototyping and *how* to get the most from it. That's what the rest of this lesson covers.

---

## When AI Prototyping Creates the Most Value

AI prototyping shines in specific situations. Recognising them is the skill.

**Validating ideas before committing resources.** You have a hypothesis about what users need, but you're not certain. Instead of writing a 10-page spec and waiting weeks for a build, generate a prototype in a few hours, put it in front of five users, and learn. If the idea falls flat, you've spent a day, not a sprint. If it resonates, you have a working prototype and real user feedback to bring to sprint planning.

**Exploring multiple directions in parallel.** Traditionally, you'd pick one design direction and invest in it. With AI prototyping, you can generate three or four variations in a day, test all of them, and commit only to the winner. This is particularly valuable early in the product process when the problem space is still ambiguous.

**Communicating vision concretely.** A working prototype is 10x clearer than a requirements document. When you're aligning stakeholders, investors, or a new engineering team, showing them a clickable prototype eliminates the "I imagined something different" conversation.

**Compressing time-sensitive decisions.** You have 48 hours to validate a hypothesis before a board meeting or a pivot decision. AI prototyping makes that timeline realistic.

### Where AI Prototyping Falls Short

**Brand sophistication and visual polish.** AI generates functional, usable UI — not beautiful, distinctive, brand-coherent design. If your product's value proposition includes premium design or novel navigation patterns, use AI for rapid functional iteration, then hand the winning direction to a designer for polish.

**Complex integrations and legacy systems.** AI excels at greenfield code. If you're integrating with undocumented APIs, complex legacy architectures, or specific engineering patterns (GraphQL, event-driven systems), AI will produce code that needs significant rework. Start with simplified mocks, then have engineers integrate with the real system.

**Compliance, accessibility, and performance.** AI generates reasonable accessible HTML for standard patterns, but nuanced accessibility (complex forms, custom widgets) benefits from expert review. Same for regulated industries — AI handles the presentation layer, but domain-specific logic and validation need specialist oversight.

**Product implication:** The most effective approach isn't "use AI for everything" or "use AI for nothing." It's using AI to handle the fast iteration — generating and testing prototypes quickly — while bringing in designers and engineers for the parts that require craftsmanship, domain expertise, or integration knowledge.

---

## Walkthrough: Validating a Feature in 4 Hours

Let's make this concrete. You're a PM for a SaaS product that serves marketing teams. You want to add an analytics dashboard showing customer engagement metrics. You have rough wireframes and five customers willing to give feedback.

**10 minutes in — Prepare and generate.** Gather your wireframes (or sketches), a list of the metrics you want to display, and any brand guidelines. Open v0 (or Bolt, or Lovable — pick whichever matches your stack). Write a prompt using the framework from Lesson 2.2:

```
I'm designing an analytics dashboard for a SaaS product management tool.
Show: Active users (metric card + 30-day trend), feature adoption rate
(percentage + line chart), top features by usage (sortable table),
usage timeline (line chart, last 30 days).

Clean, professional design. Primary blue (#0066cc), dark text, light
gray backgrounds. Responsive — must work on tablets.

[Attach your wireframe screenshot]
```

Within minutes, you'll have a running prototype with responsive layout, interactive charts, metric cards, and navigation.

**30 minutes in — Iterate.** The first output is never perfect. The line chart is hard to read. The table needs better sorting. The colours are slightly off. Request changes conversationally — "make the adoption rate card background #0066cc with white text, add a legend to the line chart, let users sort the table by clicking column headers." The tool regenerates in seconds. Three or four rounds of this and you have something that looks and feels real.

**1 hour in — Test with users.** Deploy to a staging environment or share a preview link. Walk your five customers or colleagues through it. Collect concrete feedback: the metric order should change, they want CSV export, the timeframe should be customisable.

**End of day — Iterate and document.** Feed the user feedback straight back into the tool. Each change takes 10–15 minutes. You end the day with a validated prototype, specific user feedback, and a clear list of what engineering needs to build.

Traditional timeline: 2–3 weeks. With AI tools, you can do it in a day. And the prototype you hand to engineering isn't a wireframe with annotations — it's an interactive prototype your engineers and designers can play with directly. That cuts miscommunication and speeds up the design process.

---

## Integrating AI Prototyping Into Your Workflow

AI prototyping works best as an acceleration layer within your existing process, not a replacement for it.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/diagrams/02-prototyping-workflow.png" alt="AI prototyping workflow — from idea through AI-generated prototype to user testing and iteration" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

The key insight: AI compresses the *build-test-learn* cycle from weeks to days. You still need the same discipline around problem definition (Module 3), design decisions (Lesson 4.1), and quality (Lesson 4.2). AI just lets you run more cycles in less time.

For you as a PM, that means you can explore multiple product directions before committing resources, validate assumptions with working software instead of slide decks, and communicate more clearly — because showing a working prototype beats describing one every time.

For your design team, AI handles exploration while designers focus on the craft that AI can't replicate: brand coherence, information architecture, and the subtle interaction details that make a product feel polished.

For your engineering team, AI-generated prototypes arrive with working code, reducing the "what did they actually mean?" gap. Engineers focus on architecture, performance, and integration — the hard problems — instead of boilerplate UI.

---

## Exercise: Build a Prototype in Under an Hour

Let's do this together. By the end of this exercise, you'll have a working, interactive prototype you could show to a user or stakeholder tomorrow. We'll use [Lovable](https://lovable.dev) as our primary tool — it's the most approachable for PMs who haven't done this before, and it handles the full stack so you're not wiring things together yourself.

You can use this [invite link](https://lovable.dev/invite/PIDLT11) to receive bonus free credits on sign up.

If you'd prefer a different tool, [Bolt.new](https://bolt.new) is great for quick-and-dirty MVPs, [v0](https://v0.app) is excellent if your team uses Next.js, and [Claude Artifacts](https://claude.ai) works well for exploring ideas without leaving a chat window. The steps below work with any of them — just adapt the interface instructions.

Before we start, here's an example of what's possible: [Pancake Rank](https://stack-a-pancake.lovable.app/) is a lightweight Jira Discovery clone built in Lovable in about 30 minutes. Watch the [1-minute demo](https://www.loom.com/share/24372f2d34464dc5a9368315173f4c7f) to see what the finished product looks like.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/lovable-example-pancake-rank.png" alt="Pancake Rank — a Jira Discovery clone built in Lovable in about 30 minutes" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

### Step 1: Pick Your Feature (5 minutes)

Think about your current product or a product you use frequently. You need one feature idea — something specific enough to prototype but interesting enough to hold your attention for the next hour.

Some starting points if you're stuck:

- A dashboard you wish existed at work (metrics, team activity, customer health)
- A feature your users have been requesting that you haven't had time to validate
- A tool you use daily that's frustrating — reimagine one screen of it
- A simple internal tool your team needs (an approval workflow, a feedback tracker, a meeting scheduler)

You don't need a polished spec. A sentence or two describing what it does and who it's for is enough. Write it down — you'll use it in the next step.

### Step 2: Write Your First Prototype Prompt (5 minutes)

Open [Lovable](https://lovable.dev) (or your chosen tool) and write a prompt using the framework from Lesson 2.2. Don't overthink it — your first prompt won't be your last. Here's a template:

```
I'm building a [what it is] for [who it's for].

It should show/do:
- [Core feature 1]
- [Core feature 2]
- [Core feature 3]

Design: [any preferences — clean/minimal, dark mode, specific colours,
similar to a product you like]

[If you have a sketch or wireframe, attach it as an image]
```

For example, if you're building an internal feedback tracker:

```
I'm building an internal feedback tracker for a product team of 10.

It should:
- Let anyone submit feedback with a category (bug, feature request, praise)
- Show a dashboard with feedback grouped by category and sorted by recency
- Allow the PM to change the status of each item (new, reviewing, shipped, won't do)
- Include a simple chart showing feedback volume by category over the last 30 days

Design: Clean, professional. Light theme. Similar to Linear's aesthetic.
```

Hit enter and watch it build. Within a minute or two, you'll have a running application in your browser.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/lovable-build-plan.png" alt="Lovable build plan review — the AI generates a plan and asks for approval before building the application" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

Here Lovable put together a plan and asked for my approval before building the application. This is a great opportunity for you to review the AI's work and make any edits to the plan before it commits and spends your credits.


### Step 3: Iterate — This Is Where It Gets Good (20 minutes)

The first output will be about 60–80% of what you imagined. That's normal and expected. Now you iterate, and this is the part that feels like a superpower.

Look at what Lovable generated and ask yourself: what's the most important thing that's wrong or missing? Fix that first. Then the next thing. Then the next. Talk to it like you'd talk to a designer sitting next to you:

- "Make the feedback cards more compact — I want to see at least 8 on screen without scrolling"
- "Add a search bar at the top that filters feedback by keyword"
- "The chart colours don't match the category labels — use the same colour for both"
- "Add a 'priority' field to each feedback item: low, medium, high. Show high-priority items with a red border"

Each iteration takes 30–60 seconds. After 15–20 minutes of this, you'll be surprised how close to "real" it looks and feels. You're not writing code — you're having a conversation about what you want, and the tool builds it.

A few tips from experience:

- **Be specific.** "Make it look better" gives the AI nothing to work with. "Increase the font size of the card titles to 16px and add 8px of padding between cards" gets you exactly what you want.
- **Fix one thing per prompt.** If you ask for five changes at once, some will land and some won't, and it's hard to tell which. One change, verify, next change.
- **Attach screenshots if possible.** If you see a design you like elsewhere, screenshot it and paste it in. "Make my sidebar look like this" with an image is more effective than 200 words of description.

### Step 4: Step Back and Evaluate (10 minutes)

After 20 minutes of iteration, stop and look at what you have. Open the prototype in a new tab and use it like a real user would. Click through the flows. Try to break it.

<div class="expandable-img">
  <img src="/AI-PM-Bootcamp/images/modules/lovable-prototype-result.png" alt="Completed Lovable prototype — a working interactive application ready for user testing" />
  <div class="expand-hint">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    Click to expand
  </div>
</div>

Ask yourself:

- Could I show this to a stakeholder and have a productive conversation about the feature?
- Could I put this in front of a user and learn something useful about whether this solves their problem?
- What are the two or three biggest gaps between this prototype and what I'd actually want to ship?
- Does this accelerate my discovery or help communicate what's in my head to devs/designers?

Write down those gaps. That's your handoff document — the start of the conversation with your design and engineering team about what to build next.


### Step 5: Record and Share (10 minutes)

You need to submit two things:

1. **A one-minute Loom video** walking through your prototype
2. **A link to your live prototype** (the shareable URL from Lovable, Bolt, or whichever tool you used)

Open [Loom](https://www.loom.com), hit record, and keep it to **exactly one minute** — no longer. Here's how to structure it:

- **10 seconds:** What is this and who is it for?
- **40 seconds:** Walk through the main flow — show the key screens and interactions
- **Optional: 10 seconds:** What would you change or build next if you had more time?

If your recording is over a minute, re-record it shorter. Brevity is a PM skill — practise it here.

Upload both to the **[AI PM Bootcamp Community Folder](https://loom.com/share/folder/2840211189a14b47a430fbfadb32dac7)**. Put the prototype URL in your Loom description so others can click through it themselves.

Then browse what others have built. Click through their live prototypes, not just the videos — you'll learn more from interacting with a working prototype than watching a recording of one. You'll pick up prompting techniques, tool tricks, and product ideas from seeing how other people approach the same exercise.

Share your prototype link with your colleagues or add it as a comment in your loom video.


---

## Key Takeaways

1. **AI prototyping changes the economics of product decisions.** You can test three ideas in a day instead of committing two weeks to validate one. That's a fundamentally different way of working.

2. **Tools fall into three categories.** Full-stack builders (Bolt, Lovable, v0, Replit), in-conversation prototyping (Claude Artifacts), and AI-assisted design tools (Figma AI). Pick based on your need, not the hype.

3. **Know when it shines and when it falls short.** AI prototyping excels at rapid validation, parallel exploration, and concrete communication. It struggles with brand sophistication, complex integrations, and compliance-heavy work.

4. **The durable skill is judgment, not tool mastery.** Tools change monthly. Knowing *when* to use AI prototyping and *how* to integrate it into your workflow is what lasts.

5. **AI compresses the build-test-learn cycle.** You still need the same discipline around problem definition, design decisions, and quality. AI just lets you run more cycles in less time.

## Explore Further

- [A Guide to AI Prototyping for Product Managers — Lenny's Newsletter](https://www.lennysnewsletter.com/p/a-guide-to-ai-prototyping-for-product) — Comprehensive overview of AI prototyping tools, workflows, and real-world examples from PMs.
- [v0 by Vercel](https://v0.app) — Full-stack AI development platform. Paste in a screenshot or describe an app and get production-ready Next.js code with built-in deployment.
- [Claude Artifacts Tutorial](https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts) — Official guide to building interactive prototypes within Claude conversations.
