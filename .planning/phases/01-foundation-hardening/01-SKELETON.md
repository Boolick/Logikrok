# Walking Skeleton — Math Sanctuary (Logikrok)

**Phase:** 1
**Generated:** 2026-10-27

## Capability Proven End-to-End

> A student can launch Math Sanctuary offline in a browser or PWA, solve a dynamically generated math round with local Storybook fonts and icons, and have their XP, streak, and level progression persisted and verified by an automated Vitest suite.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Client Framework | Vite 6 + React 19 + TypeScript 5.8 (FSD) | Instant HMR, zero SSR hydration overhead, native offline PWA & Capacitor compatibility |
| Styling & Typography | Tailwind CSS v4 + `@fontsource` local bundles | Guarantees 100% offline visual fidelity to the "Storybook on Peach Paper" design system |
| Core Backend (Phase 2) | Go 1.23+ Microservice on Koyeb (<50MB RAM) | Sub-millisecond latency, minimal memory footprint, secure server-side Telegram HMAC & anti-cheat |
| Presentation / Session (Phase 3) | BFF Layer (`httpOnly` cookies + SSG/SEO) | Protects Web auth tokens from XSS and provides search-engine indexable landing pages |
| Database (Phase 2) | PostgreSQL (Neon / Supabase / Koyeb DB) | Relational integrity for users, sessions, category progress, streaks, and awards |
| Mobile & Social Shells (Phases 5–6) | Capacitor (Android) + `@telegram-apps/sdk` (TMA) | 100% code reuse from the Vite React SPA across Google Play and Telegram |

## Stack Touched in Phase 1

- [x] Project scaffold (Vite 6 build, ESLint 9 flat config, TypeScript path aliases, Vitest runner)
- [x] Routing — React Router DOM v7 client routes (`/`, `/game/:categoryId`, `/result`)
- [x] Local Persistence — `gameSessionService` reading/writing validated `Progress` state in `localStorage`
- [x] UI — Interactive `GameCard`, `CardVisualView` SVG diagrams, `ExplanationDrawer`, and `HomePage` tabs with bundled offline `@fontsource` fonts and PWA icons
- [x] Verification — Automated `npm run lint`, `npm test`, and `npm run build` pipeline

## Out of Scope (Deferred to Later Slices)

- PostgreSQL database migrations and Go core microservice (Phase 2)
- BFF `httpOnly` cookie proxy and SSG landing pages (Phase 3)
- Two-way cloud synchronization queue (Phase 4)
- Capacitor Android APK/AAB packaging (Phase 5)
- Telegram Mini App SDK integration (Phase 6)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this foundation without altering its core architectural contracts:

- **Phase 2:** PostgreSQL schema + Go Core Microservice on Koyeb (Telegram HMAC auth + anti-cheat session validation)
- **Phase 3:** BFF presentation & session layer (`httpOnly` cookies, API proxy, SSG/SEO landing page)
- **Phase 4:** Client Offline-First Sync Engine (`gameSessionService` background queue + sync status UI)
- **Phase 5:** Android distribution via Capacitor (native shell, splash screen, adaptive icons, APK/AAB)
- **Phase 6:** Telegram Mini App integration (`@telegram-apps/sdk`, auto-login, native haptics)
