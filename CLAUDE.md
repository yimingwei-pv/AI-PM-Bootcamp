# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static site for an AI PM Bootcamp curriculum, built with Astro and deployed to GitHub Pages at `https://yimingwei-pv.github.io/AI-PM-Bootcamp/`.

## Commands

All commands run from the `site/` directory:

```bash
cd site
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production (outputs to site/dist/)
npm run preview      # Preview production build locally
```

## Architecture

### Content System
- **Content collections** defined in `site/src/content/config.ts` using Zod schemas
- **Module content** lives in `site/src/content/modules/module-{N}/` as markdown files with frontmatter
- 4 active modules (module-1 through module-4), module-5 is "Coming Soon"
- Each lesson has: title, module number, lesson number, description, objectives, optional resources, optional quiz

### Routing
- Dynamic routes via `[...slug].astro` in `site/src/pages/modules/`
- `getStaticPaths()` generates routes from content collections at build time
- Base path is `/AI-PM-Bootcamp` — all internal links must include this prefix
- URL pattern: `/AI-PM-Bootcamp/modules/{lesson-slug}/`

### Components
- **Astro components** (`.astro`) for static content: CourseCard, ModuleCard, ObjectivesList, ResourceLink, TableOfContents
- **React component** (`Quiz.tsx`) for interactive quiz with localStorage persistence — uses `client:load` directive

### Deployment
- GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) deploys on push to `main` when `site/**` changes
- Uses `trailingSlash: 'always'` in Astro config for GitHub Pages compatibility

## Module Frontmatter Schema

```yaml
title: "Lesson Title"
module: 1                    # Module number (1-4)
lesson: 1                    # Lesson order within module
description: "Description"
objectives:
  - "Objective 1"
resources:                   # Optional
  - title: "Resource"
    url: "https://..."
    type: "docs"             # docs | video | repo | article
quiz:                        # Optional
  - question: "Question?"
    options: ["A", "B", "C", "D"]
    answer: 0                # Zero-indexed correct answer
```

## Curriculum Structure

| Module | Title | Lessons |
|--------|-------|---------|
| 1 | Foundations of AI | 3 (LLMs, Agents, Context Engineering) |
| 2 | Improving Productivity with AI | 4 (AI-Powered Mindset, Prompt Engineering, Prototyping, Workflow Automation) |
| 3 | Finding the Right AI Opportunities | 3 (Identify Opportunities, Assessing Viability, Opportunity Exercise) |
| 4 | Shipping AI Features | 2 (Design AI Features, Shipping with Quality) |
| 5 | Operating AI Products at Scale | Coming Soon |
