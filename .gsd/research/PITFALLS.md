# Pitfalls Research

**Domain:** Angular Portfolio on GitHub Pages
**Researched:** 2026-03-18
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Angular Build Output Path

**What goes wrong:**
Angular default build output doesn't match GitHub Pages expectations. Build goes to `dist/` but Pages expects `docs/` or root.

**Why it happens:**
Angular CLI defaults `outputPath` to `dist/project-name/browser/`. GitHub Pages serves from `docs/` folder or root.

**How to avoid:**
Set `outputPath` to `docs` in `angular.json`. Ensure `<base href="/">` in `index.html`.

**Warning signs:**
404 on GitHub Pages after push.

**Phase to address:** Phase 1 (Foundation)

---

### Pitfall 2: Over-Engineering a Static Site

**What goes wrong:**
Adding NgRx, complex routing, lazy loading for a static portfolio wastes time and adds complexity.

**Why it happens:**
Developers apply enterprise patterns to every Angular project.

**How to avoid:**
No routing module. No state management. Just components + static data. Single `AppComponent` as shell.

**Warning signs:**
If you're writing a resolver, guard, or interceptor for a portfolio — stop.

**Phase to address:** Phase 1 (Foundation)

---

### Pitfall 3: Missing 404.html for SPA

**What goes wrong:**
GitHub Pages returns 404 for any path that isn't a real file. Direct links to `/#section` may break.

**Why it happens:**
GitHub Pages is a static file server, not an SPA host.

**How to avoid:**
Copy `index.html` as `404.html` in the build output. Since this is a single-page scroll site (no routes), this is less critical but still good practice.

**Phase to address:** Phase 1 (Foundation)

---

### Pitfall 4: Heavy Assets Slow Load

**What goes wrong:**
Large images, unoptimized SVGs, or heavy fonts make the portfolio feel sluggish.

**Why it happens:**
Adding screenshots, diagrams, and custom fonts without optimization.

**How to avoid:**
Use SVG icons (inline or sprite). Compress any raster images. Use system font stack or single-weight web font. Lazy-load below-fold images.

**Phase to address:** Phase 2+ (Content)

---

### Pitfall 5: Non-Responsive Design

**What goes wrong:**
Site looks good on desktop, terrible on mobile. Recruiters check on phones.

**Why it happens:**
Desktop-first development without testing breakpoints.

**How to avoid:**
Mobile-first SCSS. Test at 375px, 768px, 1024px, 1440px breakpoints. Use CSS Grid/Flexbox, not fixed widths.

**Phase to address:** Phase 1 (Foundation) + Phase 3 (Polish)
