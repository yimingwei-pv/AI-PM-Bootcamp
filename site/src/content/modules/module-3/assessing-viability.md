---
title: "Assessing AI Viability"
module: 3
lesson: 2
description: "Systematically evaluate whether an AI opportunity is worth pursuing — and if it is, decide how to build it."
objectives:
  - "Evaluate AI engagement modes (off-the-shelf, API, fine-tune, custom) and choose the right one for your context"
  - "Score AI opportunities using the Impact × Feasibility × Risk viability framework"
  - "Apply the Build vs. Buy decision matrix to determine the right execution approach"
resources:
  - title: "Why 95% of Corporate AI Projects Fail — MIT 2025 Study"
    url: "https://complexdiscovery.com/why-95-of-corporate-ai-projects-fail-lessons-from-mits-2025-study/"
    type: "article"
  - title: "The Biggest AI Fails of 2025: Lessons from Billions in Losses"
    url: "https://www.ninetwothree.co/blog/ai-fails"
    type: "article"
  - title: "Build vs Buy for Enterprise AI: A Decision Framework"
    url: "https://www.marktechpost.com/2025/08/24/build-vs-buy-for-enterprise-ai-2025-a-u-s-market-decision-framework-for-vps-of-ai-product/"
    type: "article"
quiz:
  - question: "In the viability framework, what score range indicates you should 'build a prototype to test the biggest risk' before committing?"
    options:
      - "Below 2.0"
      - "2.0 to 3.5"
      - "Above 3.5"
      - "Above 4.0"
    answer: 1
  - question: "Which AI engagement mode do MOST healthy companies operate in for the majority of their AI use cases?"
    options:
      - "Mode 4: Train custom models from scratch"
      - "Mode 3: Fine-tune existing models"
      - "Modes 1–2: Off-the-shelf products and API integration"
      - "Modes 3–4: Fine-tune and custom models"
    answer: 2
---

## The Decision That Actually Matters

You've identified some AI opportunities using the quick filter from [Lesson 3.1](/AI-PM-Bootcamp/modules/identify-opportunities/). Your backlog has candidates that scored well. Maybe your VP has been asking about AI. Maybe an engineer prototyped something over a weekend and it looked promising in a demo.

Now comes the decision that makes or breaks the next three months of your team's time: **should you actually commit to this, and if so, how?**

Getting this wrong is expensive in a specific way. You won't know you got it wrong for weeks or months — after your team has built a prototype nobody uses, or after you've signed an enterprise AI contract that doesn't fit your use case, or after you've hired an ML engineer for a problem that could have been solved with an API call. The MIT 2025 study's "perpetual piloting" problem? It starts here — with teams that skip the viability question and jump straight to building.

This lesson teaches you how to make that call. We'll use a running example throughout — a case study of a decision a PM team at a B2B SaaS company actually faced — so you can see how each framework applies to the same problem.

---

## The Running Example

Here's the scenario. You're the PM for a B2B customer support platform — think Zendesk but smaller, with about 3,000 paying customers. Your support team processes around 800 tickets per week. Right now, tickets arrive in a single queue and a senior agent manually reads each one to decide: which team handles this (billing, technical, account management, feature request)? How urgent is it? Does it need escalation?

This triage step takes your team roughly 15 hours per week. It's slow, it's inconsistent (different agents route the same ticket type differently), and when the senior agent is on leave, the queue backs up.

Your engineering lead says: "We should use AI for this." Your VP asks: "What would that cost, and is it worth it?"

Those two questions are what this lesson answers.

---

## Part 1: How Deep Should You Go?

The first question isn't "should we use AI?" — it's "how much AI do we actually need?" There's a spectrum, and most teams default to a point that's more complex and more expensive than necessary.

Here's what each level of commitment would look like for the ticket routing problem:

**Mode 1 — Off-the-shelf.** Your senior agent opens Claude in a browser tab, pastes in each ticket, and asks "Which team should handle this: billing, technical, account management, or feature request? How urgent is it?" This actually works. For 20 tickets a day, it might be viable. But at 800 tickets a week, copying and pasting every ticket into a browser tab is a different kind of triage problem. Mode 1 is for internal workflows where you're augmenting one person's work, not automating a production process.

**Mode 2 — API integration.** You integrate Claude's API into your support platform. Every incoming ticket is automatically sent to the model with a system prompt that defines your categories, routing rules, and urgency criteria. The model returns a classification and confidence score. Tickets above the confidence threshold are auto-routed; tickets below it go to a human. Cost: roughly $30,000 for the integration work, plus $200–500/month in API costs at your volume. Timeline: 4–6 weeks to build and test.

**Mode 3 — Fine-tuning.** You take 5,000 of your historically routed tickets and fine-tune a model on them. This teaches the model your specific categories, your company's definition of "urgent," and the routing patterns unique to your product. You do this when Mode 2 keeps getting a specific category wrong — say, it can't distinguish between "billing complaint" and "account management request" because your categories overlap in ways that are obvious to your team but not to a generic model. Cost: the Mode 2 integration work plus $10,000–50,000 for data preparation, training, and evaluation. Timeline: 2–4 months.

**Mode 4 — Custom model from scratch.** You hire two ML engineers and build a proprietary ticket classification system on your own infrastructure. You'd do this if ticket routing was your core product differentiator — if you were Zendesk and your AI routing was the reason customers chose you over competitors. For our scenario? This is wildly overbuilt. You're not selling ticket routing; you're selling a support platform. Ticket routing is a feature, not the product. Cost: $1.8M–$5M+ over three years.

### The Decision

For this problem, the answer is almost certainly **Mode 2**, with a possible move to Mode 3 later if accuracy on specific categories needs improvement. Here's how you'd walk through it:

1. Can off-the-shelf hit your quality bar? → Mode 1 works for the task itself, but not at your volume. Mode 2 automates what Mode 1 does manually.
2. Is speed critical? → Yes — the queue backs up when the senior agent is out. Modes 1–2.
3. Do you have specialised domain data that matters? → Not yet clear. Start with Mode 2, see where accuracy falls short, then decide.
4. Is this your competitive moat? → No. Ticket routing is a cost centre, not a differentiator.

**Why this matters for PMs:** Most healthy companies live in Modes 1–2 for the vast majority of their AI use cases. Volkswagen's Cariad project accumulated $7.5 billion in losses building a custom unified software platform for twelve car brands, when proven third-party solutions could have handled most of it. If someone on your team is pushing for Mode 3 or 4 on a non-differentiating feature, push back. Ask them: "What specific evidence do we have that Mode 2 won't work?"

> **Exercise:** Think about the top opportunity from your [Lesson 3.1](/AI-PM-Bootcamp/modules/identify-opportunities/) quick filter. Which mode would you start with? If your instinct is Mode 3 or 4, challenge yourself: what specific evidence do you have that Modes 1–2 won't work?

---

## Part 2: Is This Opportunity Actually Viable?

You've picked Mode 2. Now the harder question: should you actually commit engineering time and budget to this?

Your VP will ask some version of three questions: *"What's the impact?"*, *"Can we actually build this?"*, and *"What could go wrong?"* Let's score the ticket routing opportunity across all three.

### Question 1: What's the Impact?

Score two things on a 1–5 scale:

**User value** — how much does this reduce friction or create new capability? A 1 means nice-to-have. A 5 means top-three user need.

For ticket routing, the team debated this. The PM argued it was a 3 — customers don't directly see or care about internal routing. The support lead pushed back: "Faster routing means faster first response. We have data showing that tickets routed to the right team in under 5 minutes get resolved 40% faster. Customers absolutely feel that." They settled on **4**.

**Business value** — what's the tie to revenue or cost? A 1 means no clear connection. A 5 means a direct path to more than 5% revenue uplift or more than 10% cost reduction.

The maths: 15 hours/week of senior agent time at $45/hour = $35,000/year. Plus the cost of misrouted tickets (estimated 12% misroute rate, each costing 20 minutes of rework): another $15,000/year. Total: roughly $50,000/year in addressable cost. The integration costs about $30,000 plus $4,000/year in API fees. Payback period: under 8 months. **Business value: 4.**

**Impact Score: (4 + 4) / 2 = 4.0**

The key discipline here: if you can't articulate the impact in a sentence with a number in it, you're not ready. "It would save time" is not impact. "$50,000/year in addressable cost with an 8-month payback" is.

### Question 2: Can We Actually Build This?

Score three things:

**Data availability** — do you actually have the data? The team has 18 months of historically routed tickets in Zendesk — about 60,000 tickets with team assignment, priority level, and resolution time. That's strong. But a closer look reveals a problem: the "feature request" category was only added 6 months ago, so only 4,000 of the 60,000 tickets have that label. For the other three categories, data is abundant. **Score: 4.** (Would be a 5 if all categories had equal history.)

**Technical complexity** — is this a solved problem? Text classification into predefined categories with a confidence score is one of the most well-understood AI tasks. Multiple off-the-shelf APIs handle this. **Score: 5.**

**Team capability** — can your team do this? You have two backend engineers comfortable with APIs but no ML experience. For a Mode 2 integration, ML expertise isn't required — you're calling an API, not training a model. **Score: 4.**

**Feasibility Score: (4 + 5 + 4) / 3 = 4.3**

**Why this matters for PMs:** Feasibility is where most AI projects quietly die. The demo worked because someone hand-picked 20 examples. In production, you need it to work on the messy, misspelled, multi-topic tickets your users actually send. The data gap on "feature request" tickets is exactly the kind of thing that's easy to miss in a planning meeting and painful to discover three weeks into development.

### Question 3: What Could Go Wrong?

Score six risk categories, each on 1–5 where **1 = high risk** and **5 = low risk**:

| Risk Category | Score | The Team's Reasoning |
|---|:---:|---|
| Accuracy risk | 4 | A misrouted ticket adds 10 minutes of delay. Annoying, not catastrophic. The current manual process already has a 12% error rate. |
| Data privacy risk | 4 | Tickets contain customer names and account details. Need to confirm the API provider's data processing terms. Not a dealbreaker, but needs legal review. |
| Bias and fairness risk | 5 | Ticket routing doesn't affect individuals differently by demographic. Low concern. |
| Vendor lock-in risk | 4 | Classification prompts are portable across providers. Switching from Claude to GPT would take a week of prompt adjustments, not a rebuild. |
| Cost predictability | 4 | At 800 tickets/week, API costs are roughly $300–500/month. Even at 5× volume, it's under $2,500/month. Not a budget risk. |
| User trust/adoption risk | 3 | The support team is protective of their routing expertise. Three agents have expressed scepticism: "AI doesn't understand our product well enough." Rolling this out needs careful change management — internal demos, a trial period, easy override. |

**Risk Score: (4 + 4 + 5 + 4 + 4 + 3) / 6 = 4.0**

Notice the adoption risk scored lowest. That's useful — it tells you that the hardest part of this project isn't technical. It's getting your support team to trust and use the tool. If you'd only looked at the technical dimensions, you'd have missed this entirely.

### The Verdict

**Overall: (4.0 + 4.3 + 4.0) / 3 = 4.1 — green light.** Strong signals across all dimensions. But the adoption risk means your rollout plan matters as much as your technical implementation. This isn't a "build it and they'll come" project.

**A note on weighting:** The dimensions and equal weighting used here are a starting point, not a prescription. Different teams and organisational cultures will — and should — prioritise differently. A fintech startup operating under regulatory scrutiny might weight risk more heavily than a consumer social app. A company with a strong ML team might score technical complexity differently than one hiring its first data scientist. The framework's value isn't in the exact numbers — it's in forcing the conversation. Adapt the dimensions and weightings to your context, but don't skip the scoring. The discipline of quantifying your assumptions exposes disagreements that informal conversations miss.

---

## Part 3: When the Score Says "Not Yet"

The ticket routing example scored well across the board. That's useful for learning the framework, but the framework earns its real value on the harder calls — opportunities that look exciting but carry hidden risk.

Here's a contrasting scenario. You're a PM at an online lending platform. The team wants AI to auto-score loan applications. The pitch is compelling: reduce underwriting cost by 30%, speed approval from 3 days to 2 hours.

**Impact: score of 5.** No question — massive business value and genuine user value.

**Feasibility: 3.** Ten years of loan data, but it's messy and spread across legacy systems. Minimal ML expertise on the team.

**Risk: 1.** Regulatory exposure under the Fair Lending Act. Mandatory bias auditing. Accuracy must exceed 95%. In 2025, a lending company paid a $2.5 million settlement because its AI underwriting model discriminated along racial lines. The aggregate accuracy looked fine; nobody had checked performance across demographics.

**Overall: 2.3 — conditional go.** The impact is obvious, but the risk is the bottleneck.

A less experienced PM might see "Impact: 5" and push forward regardless. A more experienced PM reads the risk score and asks a different question: *what would it take to move that 1 to a 3?*

In this case, the answer was a time-boxed prototype. The team spent four weeks fine-tuning on historical loan data and measured accuracy on a holdout set: 94%. Promising, but the fairness audit revealed a 5% disparate impact for women — a finding that would have been invisible without explicit bias testing. They iterated on the training data and evaluation criteria. After eight weeks total: 96% accuracy with the bias issue resolved. The new viability score: **3.8 — go.**

The engagement mode followed naturally from the constraints. Auto-scoring isn't a core differentiator for this company, so Mode 4 was out. Off-the-shelf APIs could handle the basic scoring, but regulatory compliance required more control over the model. The decision was to **blend**: a fine-tuned model on their own infrastructure for compliance, vendor-backed bias monitoring, and a mandatory human review step — no pure AI decisions on loan approvals. Timeline: 3 months. Total cost: $150K. Expected annual payoff: $500K.

**Why this matters for PMs:** A score of 2.3 didn't mean "don't do it." It meant "prove the risk is manageable before committing." The prototype was the proof. This is the most important move in the framework — converting a conditional score into a confident one, without betting three months of engineering time on hope.

> **Exercise:** Take the top opportunity you identified in [Lesson 3.1](/AI-PM-Bootcamp/modules/identify-opportunities/)'s quick filter. Score it across all three dimensions. Where does it land? If it's below 3.5, identify the single weakest dimension. What would a four-week prototype look like that specifically tests that weakness?

---

## Part 4: Build, Buy, or Blend

Back to our ticket routing example. You've decided Mode 2 (API integration) with a viability score of 4.1. One question remains: do you build the integration yourself, buy a pre-built ticket routing product, or blend?

This decision exists for all software, but AI sharpens it. With traditional software, "build" means months of development from scratch. With AI, the model itself is almost always bought — you're not training GPT-5 in your garage. The real "build" is everything around the model: the integration, the prompt logic, the confidence scoring, the fallback paths, the feedback loops. So the question isn't really "build or buy the AI." It's "how much of the workflow around the AI do you own yourself?"

**Buy** would mean adopting a product like Forethought or Assembled that already does AI ticket routing. You'd get faster time-to-value — potentially weeks instead of months — but you'd give up control over the classification logic, the confidence thresholds, and how the system integrates with your specific workflow. Cost: $200K–$500K over three years depending on seat count and volume.

**Build** would mean writing the integration from scratch — your API call, your prompt, your confidence scoring, your routing logic. You'd get full control but carry the maintenance burden. For a Mode 2 integration, this is reasonable. Cost: roughly $30,000 upfront plus ongoing API and engineering time.

**Blend** — and this is what most teams actually do — means buying the infrastructure layer (the API, the hosting, the monitoring) and building the last mile yourself. In this case: use Claude's API for the classification, but build your own routing rules, confidence thresholds, escalation logic, and feedback loop. You get the speed of buying the AI capability and the control of building the workflow around it.

For our ticket routing problem, **blend** is the right answer. The classification itself is a commodity — any frontier model can do it well. The value is in how you integrate it with your specific routing rules, escalation paths, and team structure. That last mile is what makes it work for your product specifically.

### How to Decide

Ask three questions in order.

**Does a pre-built product already solve your specific problem?** If yes, and if the total cost of ownership makes sense over two to three years, buy. You'll ship faster and avoid the maintenance burden. But verify that the product integrates with your actual workflow — not just the demo workflow. A tool that doesn't fit how your team really works is a tool that won't get used.

**Is the AI capability itself your competitive advantage?** If yes, build. You need control over the model, the data pipeline, and the iteration cycle. This is rare — most AI features are utilities, not differentiators — but when it applies, the investment in owning the full stack is justified.

**For everything else, blend.** Buy the AI capability (the model, the API, the infrastructure), build the workflow around it (your routing logic, your confidence thresholds, your escalation paths, your feedback loop). This is the most common pattern in production because it balances speed, cost, and control. You can ship in weeks, iterate on the parts that matter, and switch providers if the model landscape shifts.

### The Costs That Catch You

There may be expensive surprises around your model — and they're predictable once you know where to look.

**Prompt iteration.** Your first prompt won't work well enough. For the ticket routing example, the team spent two weeks iterating specifically to handle multi-topic tickets — ones that are both a billing complaint and a feature request. The model kept picking one category and ignoring the other. This kind of iteration is normal, but teams rarely budget for it because the initial integration "works" in a demo. Plan for two to four weeks of prompt engineering beyond the initial build.

**Confidence calibration.** Setting the right confidence threshold — the score below which the AI hands off to a human — takes experimentation with production data. Set it too high and too many tickets go to humans, defeating the purpose. Set it too low and you route tickets to the wrong team. The ticket routing team spent a week tuning this, testing different thresholds against historical routing decisions until they found the sweet spot.

**Change management.** Three support agents were openly sceptical: "AI doesn't understand our product well enough." Rolling the feature out required internal demos, a trial period where agents could easily override the AI, and weekly reviews of accuracy data. This took a week of the PM's time — and it was the difference between adoption and quiet resistance. If you skip this step, you build a tool your team resents instead of one they rely on.

**Infrastructure you'll forget to budget for.** Observability and monitoring (can you actually see what the AI is doing in production?), data labelling if you decide to move to Mode 3 later ($5K–$100K depending on volume and complexity), and red-teaming and safety validation (especially for customer-facing features where a bad output isn't just embarrassing — it's a support ticket generator).

For the ticket routing example, the original $30,000 estimate became $45,000 — a 50% overrun. Still worthwhile against $50,000/year in savings, but the overrun would have been painful if the budget had been tight.

**Why this matters for PMs:** When you present an AI initiative to leadership, name these line items explicitly. Don't bury them in a contingency percentage — list them, estimate them, and explain why they matter. A realistic budget builds trust; a budget that doubles post-approval destroys it. Rule of thumb: add 30–50% to whatever the engineering estimate is for the core AI integration itself.

### What This Looks Like at Enterprise Scale

The same framework scales. We applied this approach with a major healthcare and medtech distributor, running workshops across four business divisions. Each use case was evaluated on business value (our Impact dimension) and implementation complexity (our Feasibility dimension). The result was a prioritised portfolio of five use cases worth an estimated $14–16M annually.

Three disciplines made the difference at this scale, and they're worth adopting even on smaller projects.

First, every use case started with a hypothesis tied to a dollar figure. Not "we should use AI for ordering" but "AI-assisted ordering could reduce manual processing errors, saving an estimated $4.9M per year." The dollar figure forced teams to be specific about where the value actually came from — and made it straightforward to compare opportunities against each other. Vague impact claims can't be ranked; dollar estimates can.

Second, use cases were plotted on a value-versus-complexity matrix so leadership could see the full portfolio at a glance. High-value, low-complexity opportunities go first. High-value, high-complexity opportunities get prototyped to de-risk them before committing. Low-value opportunities get deprioritised regardless of how technically interesting they are — a hard discipline, but an essential one.

Third, blockers were named upfront. Every use case included a list of dependencies and risks that needed to be resolved before committing. Nobody could greenlight an initiative without acknowledging the infrastructure work, data gaps, or organisational changes it depended on. This prevented the "we'll figure it out as we go" optimism that turns three-month projects into twelve-month ones.

**Why this matters for PMs:** Whether you're scoring one ticket routing feature or prioritising across an entire enterprise portfolio, the discipline is identical. Tie every opportunity to a number. Compare them on the same dimensions. Name the blockers before you commit. The scale changes; the rigour doesn't.

> **Exercise:** For the opportunity you scored in Part 2, decide: build, buy, or blend? Write a one-paragraph proposal that includes the approach, estimated cost range, timeline, and the two biggest hidden costs you'd flag for leadership. If you're not sure of exact numbers, use ranges — the discipline of estimating is more valuable than the precision.

---

## Reflection

Before moving to the exercise in [Lesson 3.3](/AI-PM-Bootcamp/modules/opportunity-exercise/), sit with these questions:

**Did your viability score surprise you?** If it was lower than expected, which dimension pulled it down? That dimension is where you should focus your de-risking work — not the overall score.

**What's your team's default engagement mode?** Most teams have a bias — some always want to build from scratch (Modes 3–4), others reach for off-the-shelf tools (Mode 1) even when the problem needs more. Notice your team's default and question it.

**Where are the hidden costs in your opportunity?** The ticket routing example's budget grew 50% because of prompt iteration, confidence threshold tuning, and change management. What equivalent surprises might be hiding in your opportunity?

---

## Key Takeaways

1. **Start with the least complex engagement mode that could work.** For the ticket routing example, Mode 2 (API integration) was right. Mode 4 (custom model) would have been a $2M+ mistake. Always ask: "What evidence do we have that the simpler mode won't work?"

2. **The viability framework exposes what planning conversations miss.** The ticket routing project's biggest risk wasn't technical — it was agent adoption. Without scoring risk explicitly, the team would have built a technically sound tool that nobody used.

3. **A conditional score is not a "no."** The lending example scored 2.3 — but an eight-week prototype converted that to 3.8. The framework's real value is telling you *what to test*, not just whether to proceed.

4. **Blend is the default.** Buy the AI capability (the API, the model), build the last mile (your routing logic, your confidence thresholds, your escalation paths). This is what most production AI features actually look like in 2026.

---

## Explore Further

- [Why 95% of Corporate AI Projects Fail — MIT 2025 Study](https://complexdiscovery.com/why-95-of-corporate-ai-projects-fail-lessons-from-mits-2025-study/) — Deep dive into the research behind the failure statistics cited in this module.
- [The Biggest AI Fails of 2025](https://www.ninetwothree.co/blog/ai-fails) — Case studies of real AI project failures, including the Volkswagen Cariad example.
- [Build vs Buy for Enterprise AI](https://www.marktechpost.com/2025/08/24/build-vs-buy-for-enterprise-ai-2025-a-u-s-market-decision-framework-for-vps-of-ai-product/) — A detailed decision framework with cost models for build, buy, and blend approaches.
