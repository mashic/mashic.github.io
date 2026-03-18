# Architecture Research

**Domain:** Developer Portfolio Website (Angular SPA)
**Researched:** 2026-03-18
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────┐
│                   Angular SPA                        │
├─────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  NavBar   │  │  Hero    │  │  Section         │  │
│  │ Component │  │Component │  │  Components      │  │
│  └──────────┘  └──────────┘  │  ├─ About         │  │
│                               │  ├─ Skills        │  │
│                               │  ├─ Projects      │  │
│                               │  ├─ Experience    │  │
│                               │  ├─ Architecture  │  │
│                               │  └─ Contact       │  │
│                               └──────────────────┘  │
├─────────────────────────────────────────────────────┤
│              Shared Services                         │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │ ScrollService │  │ DataService  │                 │
│  └──────────────┘  └──────────────┘                 │
├─────────────────────────────────────────────────────┤
│              Static Assets                           │
│  ┌───────┐  ┌──────┐  ┌────────┐                   │
│  │ Icons │  │ SVGs │  │ Images │                    │
│  └───────┘  └──────┘  └────────┘                    │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│    GitHub Pages (Static Host)    │
│    Serves built files from /docs │
└─────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Pattern |
|-----------|---------------|---------|
| AppComponent | Root layout, scroll container | Single-page shell |
| NavbarComponent | Fixed navigation, active section highlight | Intersection Observer |
| HeroComponent | Name, title, CTA button | Static content |
| AboutComponent | Short bio paragraph | Static content |
| SkillsComponent | Tech stack grid/badges | Data-driven rendering |
| ProjectsComponent | Project cards with links | Card grid from data array |
| ExperienceComponent | RSS work summary | Timeline/description |
| ArchitectureComponent | Pattern diagrams | Mermaid or SVG |
| ContactComponent | Links to LinkedIn/GitHub/Email | Static with icons |

## Recommended Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── architecture/
│   │   └── contact/
│   ├── models/
│   │   └── project.model.ts
│   ├── data/
│   │   └── projects.data.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.scss
├── assets/
│   └── icons/
├── styles.scss
└── index.html
```

## Key Patterns

### Pattern 1: Single-Page Scroll Layout
**What:** All sections in one page, navigation scrolls to sections
**When:** Portfolio sites, landing pages
**Implementation:** Fragment IDs + `scrollIntoView({ behavior: 'smooth' })`

### Pattern 2: Data-Driven Cards
**What:** Project cards rendered from a TypeScript data array
**When:** Repeated structured content
**Implementation:** `*ngFor` over project array, each card a component

### Pattern 3: Intersection Observer for Active Nav
**What:** Highlight current section in navbar as user scrolls
**When:** Long single-page layouts
**Implementation:** `IntersectionObserver` API in a service, updates active section signal

## Deployment Pattern

1. `ng build` outputs to `docs/` folder
2. GitHub Pages serves from `docs/` on `main` branch
3. `404.html` = copy of `index.html` (SPA fallback)
