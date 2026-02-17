# AI PM Bootcamp

An intensive program covering AI foundations, improving productivity, opportunity identification, and shipping AI features. The course is split across four modules with 13 lessons.

**Live site:** https://yimingwei-pv.github.io/AI-PM-Bootcamp/

## Curriculum

### Module 1: Foundations of AI

| Lesson | Topic |
|--------|-------|
| 1.1 | Large Language Models (LLMs) |
| 1.2 | AI Agents |
| 1.3 | Context Engineering |

### Module 2: Improving Productivity with AI

| Lesson | Topic |
|--------|-------|
| 2.1 | AI-Powered Mindset |
| 2.2 | Prompt Engineering |
| 2.3 | Prototyping with AI |
| 2.4 | Extension: Workflow Automation |

### Module 3: Finding the Right AI Opportunities

| Lesson | Topic |
|--------|-------|
| 3.1 | Identify Opportunities for AI |
| 3.2 | Assessing AI Viability |
| 3.3 | Exercise: Map Workflows and Identify AI Opportunities |

### Module 4: Shipping AI Features

| Lesson | Topic |
|--------|-------|
| 4.1 | Design AI Features |
| 4.2 | Shipping with Quality |
| 4.3 | Lab: Stress-Test Your AI Feature |

### Module 5: Operating AI Products at Scale (Coming Soon)

## Local Development

```bash
cd site
npm install
npm run dev
```

The dev server runs at http://localhost:4321

## Adding Content

Module content lives in `site/src/content/modules/module-{N}/`. Each lesson is a markdown file with frontmatter:

```yaml
---
title: "Lesson Title"
module: 1
lesson: 1
description: "Brief description"
objectives:
  - "Learning objective 1"
  - "Learning objective 2"
resources:
  - title: "Resource Name"
    url: "https://..."
    type: "docs"  # docs | video | repo | article
quiz:
  - question: "Question text?"
    options:
      - "Option A"
      - "Option B"
      - "Option C"
      - "Option D"
    answer: 0  # Zero-indexed
---

## Overview

Lesson content in markdown...
```

## Deployment

The site deploys automatically to GitHub Pages when changes to `site/**` are pushed to `main`.

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [React](https://react.dev/) - Interactive components (quizzes)
- [Tailwind CSS](https://tailwindcss.com/) - Styling
