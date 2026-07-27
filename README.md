# Paradeep Parivahan — Frontend (Next.js 14 · App Router · TS · Tailwind · Framer Motion)

Decoupled frontend. Consumes the Core PHP/MySQL REST API (Agent 4) over CORS.
Design language: AM/NS-inspired (SVG-driven, scroll-reveal, parallax). Top-of-page
NALCO-style accessibility toolbar with global font-scaling + high-contrast via React Context.

## Getting started
```bash
cp .env.example .env.local      # point NEXT_PUBLIC_API_BASE at the PHP API
npm install
npm run dev                      # http://localhost:3000
```

## Folder structure
```
frontend/
├── app/
│   ├── layout.tsx                  # Root: providers, a11y toolbar, header/footer, anti-FOUC boot script
│   ├── globals.css                 # Tailwind + accessibility CSS (high-contrast, font-scale, motion)
│   ├── page.tsx                    # Homepage (Hero → Stats → Services → Mission → CTA)
│   └── investors/
│       └── [[...slug]]/page.tsx    # Catch-all: all 21 investor pages (docs, Reg-46, grievance)
│                                   #   ↳ add /about, /infrastructure, /clients, etc. following this pattern
├── components/
│   ├── AccessibilityToolbar.tsx    # NALCO-style toolbar (A-/A/A+, contrast, motion, reading, listen)
│   ├── layout/
│   │   ├── Header.tsx              # Sticky mega-menu (3-level Investors nesting, hover+focus)
│   │   ├── MobileNav.tsx           # Slide-over accordion (handles deep nesting w/o viewport overflow)
│   │   └── Footer.tsx
│   ├── motion/Reveal.tsx           # Scroll-reveal wrapper (auto-disables on reduced-motion)
│   ├── ui/PageHero.tsx             # Interior page hero + breadcrumb
│   ├── home/                       # Hero, StatsCounter, ServicesGrid, MissionVision
│   └── investors/DocumentTable.tsx # Searchable PDF list (empty-state aware)
├── context/
│   └── AccessibilityContext.tsx    # Global a11y state → data-* attrs on <html>, localStorage persisted
├── lib/
│   ├── animations.ts               # Framer Motion variant library (fadeUp, stagger, drawPath, …)
│   ├── images.ts                   # ALL imagery centralised (Unsplash defaults, swappable)
│   ├── nav.ts                      # Canonical nav tree + investor slug→category map
│   └── api.ts                      # Typed REST client (ISR-cached, degrades gracefully)
├── tailwind.config.ts              # Brand palette, HC tokens, keyframes; darkMode via data-contrast
├── next.config.mjs                 # Image remotePatterns, API env
└── .env.example
```

## Routing map (new clean URLs ← old /home/{slug})
See `lib/nav.ts`. Investors is a single catch-all resolving nested slugs to backend
`investor_documents.category` values via `INVESTOR_CATEGORY_BY_SLUG`.

## Accessibility (how it works)
- `AccessibilityContext` writes `--a11y-font-scale` (CSS var) + `data-contrast/motion/reading`
  on `<html>`. Because `html { font-size: calc(100% * var(--a11y-font-scale)) }`, every `rem`
  scales — one lever resizes the whole type system (A- 0.875 → A++ 1.25).
- High-contrast CSS uses `html[data-contrast=high]` with `!important` + `currentColor` SVG
  overrides so it reaches inline styles AND dynamically injected SVG/Framer nodes.
- Anti-FOUC boot script in `layout.tsx <head>` applies stored settings before first paint.
- Skip-link, focus-visible rings, `prefers-reduced-motion` honoured, "Listen" uses Web Speech API.

## Remaining pages to build (same patterns, wired to Agent 4 endpoints)
`/about/*` (team, activities, commodities, group-companies, prose) · `/infrastructure/*`
(equipment tables) · `/clients/*` (logo grid + partner lists) · `/projects/domestic` ·
`/gallery` · `/awards` · `/csr` · `/contact/*` (office cards + form → contact_submissions).
Each reuses `PageHero` + a data component fed by `lib/api.ts`.
```
