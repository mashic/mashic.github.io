# masic.github.io Portfolio

## What This Is

Single-page portfolio website showcasing full-stack development work across 7+ enterprise business domains. Built with Angular and deployed to GitHub Pages. Targets recruiters and hiring managers evaluating technical breadth and system design capability.

## Core Value

**Demonstrate production-grade experience across CRM, ERP, POS, Loyalty, Manufacturing, Hospitality, and E-commerce through clean presentation of projects, architecture patterns, and technical skills.**

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] REQ-HERO: Landing section with name, role title, and call-to-action
- [ ] REQ-ABOUT: Short professional bio (2-3 sentences)
- [ ] REQ-SKILLS: Visual tech stack display (Angular, .NET, SQL, OpenCV, etc.)
- [ ] REQ-PROJECTS: Project cards with description, tech badges, and links
- [ ] REQ-EXPERIENCE: RSS company work summary with domain breadth
- [ ] REQ-ARCH: Architecture/pattern diagrams demonstrating system thinking
- [ ] REQ-CONTACT: LinkedIn, GitHub, Email links
- [ ] REQ-RESPONSIVE: Works on mobile, tablet, desktop
- [ ] REQ-DEPLOY: Live on GitHub Pages at mashic.github.io
- [ ] REQ-NAV: Fixed navigation with smooth scroll to sections

### Out of Scope

- Blog section — maintenance burden, not core portfolio value
- Contact form with backend — no server, use direct links instead
- Theme switcher — single polished theme is sufficient
- Multi-page routing — single scroll page is standard for portfolios

## Context

- Developer has production experience at RSS company across 7+ domains
- Codebase reviews exist in `rss-suite/` folder documenting CRM, ERP, POS, Loyalty, Manufacturing, Hospitality, E-commerce, Computer Vision
- Existing repo has placeholder `index.html` with basic CSS scroll-snap demo
- GitHub Pages deployment target — static files only
- Angular chosen intentionally to showcase primary stack proficiency

## Constraints

- **Hosting**: GitHub Pages — static files only, no server-side processing
- **Framework**: Angular — explicitly chosen per plan to demonstrate stack consistency
- **Content**: No proprietary code/data from RSS — only sanitized patterns and descriptions
- **Build output**: Must deploy to `docs/` folder or root for GitHub Pages

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Angular over plain HTML | Demonstrates proficiency with primary stack | — Pending |
| No routing | Single-page scroll, no need for router complexity | — Pending |
| SCSS over CSS | Component-scoped styles, variables for consistency | — Pending |
| Build to docs/ | GitHub Pages serves from docs/ on main branch | — Pending |
| No SSR | Static portfolio, no SEO benefit justifies SSR complexity | — Pending |

---

_Last updated: 2026-03-18 after project initialization_
