# Roadmap: masic.github.io Portfolio

## Overview

Build a single-page Angular portfolio from scratch, starting with the project scaffold and foundational sections (hero, about, skills, contact, nav), then adding content-heavy sections (projects, experience), then architecture diagrams and visual polish, and finally deploying to GitHub Pages.

## Phases

- [x] **Phase 1: Foundation** — Angular scaffold + layout + hero/about/skills/contact/nav sections ✅
- [ ] **Phase 2: Content** — Projects cards + Experience section with RSS suite descriptions
- [ ] **Phase 3: Polish** — Architecture diagrams + animations + responsive tuning + deployment

## Phase Details

### Phase 1: Foundation

**Goal**: Standing Angular app with navigation, hero, about, skills, and contact sections — responsive and locally runnable
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, HERO-01, HERO-02, HERO-03, ABOUT-01, SKILL-01, SKILL-02, CONTACT-01, CONTACT-02, CONTACT-03, RESP-01, DEPLOY-01
**Success Criteria** (what must be TRUE):
1. `ng serve` runs and displays the portfolio with all foundation sections
2. Navbar links scroll smoothly to each section
3. Hero shows name, role title, and CTA button
4. Skills section displays tech stack in categorized badges
5. Contact section has working LinkedIn, GitHub, and Email links
6. Layout is responsive at 375px and 1024px+ breakpoints
7. `ng build` outputs to `docs/` folder successfully
**Plans**: 2 plans

Plans:
- [x] 01-01: Angular scaffold + app shell + navbar + hero ✅
- [x] 01-02: About + Skills + Contact sections + responsive + build config ✅

### Phase 2: Content

**Goal**: Projects section with card layout for all featured projects and Experience section with RSS enterprise work summary
**Depends on**: Phase 1
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, EXP-01, EXP-02, EXP-03
**Success Criteria** (what must be TRUE):
1. Project cards display for Kanban Board, .NET Blog, Car Rental, Hiking App
2. Each card has description, tech badges, and GitHub/demo links
3. RSS Suite section shows 7 enterprise app descriptions
4. Experience section shows RSS role, domains, and key technologies
**Plans**: 2 plans

Plans:
- [ ] 02-01: Projects section with card component and data
- [ ] 02-02: Experience section with RSS suite content

### Phase 3: Polish

**Goal**: Architecture diagrams, scroll animations, responsive fine-tuning, and GitHub Pages deployment
**Depends on**: Phase 2
**Requirements**: ARCH-01, ARCH-02
**Success Criteria** (what must be TRUE):
1. At least 2 architecture diagrams rendered (Mermaid or SVG)
2. Sections animate on scroll entry
3. Site deployed and live on mashic.github.io
4. All links functional on production
**Plans**: 2 plans

Plans:
- [ ] 03-01: Architecture diagrams + scroll animations
- [ ] 03-02: Final responsive tuning + GitHub Pages deployment

---

_Roadmap created: 2026-03-18_
