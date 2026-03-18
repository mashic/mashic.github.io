# Stack Research

**Domain:** Developer Portfolio Website (GitHub Pages)
**Researched:** 2026-03-18
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|-----------|---------|---------|----------------|
| Angular | 19 | SPA framework | User's primary stack — demonstrates Angular proficiency |
| TypeScript | 5.7 | Type-safe coding | Angular standard, showcases typed development |
| Angular CLI | 19 | Project scaffold & build | Standard Angular tooling |
| SCSS | latest | Styling | Better organization than plain CSS for component styles |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @angular/animations | 19 | Scroll/entrance animations | Section reveal effects |
| @angular/router | 19 | Fragment navigation | Smooth scroll to sections |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Angular CLI | Build & serve | `ng build --output-path docs` for GitHub Pages |
| GitHub Pages | Hosting | Free static hosting from `docs/` folder or root |

## Installation

```bash
ng new portfolio --style=scss --routing=false --ssr=false
cd portfolio
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|------------|------------|----------------------|
| Angular | Plain HTML/CSS/JS | If the goal was NOT to demonstrate Angular skills |
| Angular | React/Next.js | If targeting a React-focused employer |
| SCSS | Tailwind CSS | If rapid prototyping over custom design is priority |

## What NOT to Use

| Technology | Why Not |
|-----------|---------|
| Angular Universal/SSR | Static site, no server needed — GitHub Pages serves static files |
| NgRx | Overkill for a portfolio with no complex state |
| Angular Material | Custom design better showcases CSS skills |
| Backend/API | Static content only — no dynamic data needed |

## GitHub Pages Deployment

Angular must build to `docs/` folder for GitHub Pages:
- Set `outputPath` in `angular.json` to `docs`
- Add `404.html` as copy of `index.html` for SPA routing
- Set `<base href="/">` in `index.html`
