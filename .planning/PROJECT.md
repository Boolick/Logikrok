# Logikrok (Logikrok)

## What This Is

An interactive multiplatform educational math learning game for children in Grades 1–5, crafted in the tactile "Storybook on Peach Paper" design system. The application combines procedural math problem generation, dynamic SVG diagrams, multi-step story problems, an error explanation drawer, and offline-first gamification. It is delivered across Web (PWA), Android (Capacitor), and Telegram Mini App (TMA), backed by a lightweight high-performance Go core service, a BFF presentation/session layer, and a PostgreSQL database.

## Core Value

Provide children with an engaging, friction-free, tactile math learning experience across any device (Web, Android, Telegram) with reliable offline play and tamper-proof cloud progress synchronization.

## Requirements

### Validated

<!-- Shipped and confirmed valuable from existing codebase. -->

- ✓ 7 Procedural Math Modules (Addition, Subtraction, Multiplication, Division, Fractions, Geometry, Multi-Step Word Problems) + Super Mix blitz — existing
- ✓ Tactile "Storybook on Peach Paper" design system (Lpalo Blush Playground, 2px ink borders, 47px pills, flat crayon palette, zero shadows/gradients, Day & Night themes) — existing
- ✓ Dynamic SVG visual models for fraction pies, fraction bars, and geometric shapes with dimension labels — existing
- ✓ Instagram-style slide-up error explanation drawer (`ExplanationDrawer`) with bilingual pedagogical and numerical breakdowns — existing
- ✓ Grade 1–5 baseline difficulty selector and automated level-up engine (70% accuracy threshold) — existing
- ✓ Local gamification and achievement engine (XP, daily goals, 6 unlockable badges, daily streak tracking) — existing
- ✓ Client-side bilingual localization (Russian & English via `i18next`) — existing
- ✓ Client-side Single Page Application built with React 19, TypeScript, Vite 6, and Tailwind CSS v4 — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] **Technical Foundation & Hardening**: Install dependencies, fix `@/*` path alias divergence between `tsconfig.json` and `vite.config.ts`, bundle local fonts (`@fontsource`), supply PWA icon assets (`pwa-192x192.png`, `pwa-512x512.png`), and configure Vitest unit tests for math generators.
- [ ] **Database Schema (PostgreSQL)**: Design and deploy relational schema on PostgreSQL (Neon / Supabase / Koyeb DB) for users, game sessions, category progress, awards, and streaks with indexes and data integrity constraints.
- [ ] **Go Core Microservice (Koyeb, ~30MB RAM)**: Implement lightweight, compiled Go backend providing REST API, Telegram `initData` HMAC-SHA256 verification, anti-cheat validation for math sessions, XP/award calculations, and connection pooling (`pgx`).
- [ ] **BFF (Backend-For-Frontend) Layer**: Implement presentation and session management layer handling secure `httpOnly`/`SameSite` auth cookies, client error shaping, and SSG/SEO public landing pages.
- [ ] **Offline-First Cloud Sync Client**: Enhance `gameSessionService` with a two-way sync engine: gameplay runs locally from `localStorage` without latency, silently queuing and syncing updates with the backend when online.
- [ ] **Android Native Package (Capacitor)**: Initialize and configure Capacitor Android project with splash screen, adaptive icon, native status bar integration, and APK/AAB build pipeline.
- [ ] **Telegram Mini App (TMA) Integration**: Connect `@telegram-apps/sdk`, integrate seamless Telegram ID authentication, adapt viewports, and enable native Telegram haptic feedback.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Full client rewrite to Next.js SSR — interactive math game requires instant offline PWA and WebView execution; rewriting the game UI to SSR adds hydration overhead and breaks Capacitor simplicity.
- Heavy monolithic Node/Nest backend — rejected in favor of a 25–30MB Go microservice to minimize RAM consumption and run efficiently on Koyeb free/low-cost tiers.
- Real-time multiplayer PvP math battles in v1 — deferred to future milestones to preserve focus on single-player progress synchronization and multiplatform launch.
- Paid subscription / monetization paywalls in v1 — focus is on user acquisition and seamless educational adoption across school and family devices.

## Context

- The project was originally bootstrapped in Google AI Studio as an interactive web prototype, structured according to Feature-Sliced Design (FSD).
- Target audience is school children aged 6–12 across Grades 1–5, requiring high fault-tolerance, zero-latency interactions, and strict offline capability (e.g. playing during road trips or on Wi-Fi-only tablets).
- Distribution strategy targets three channels simultaneously: Web browsers (desktop/mobile), native Google Play Android app, and Telegram messenger channels/communities via Telegram Mini Apps.

## Constraints

- **Resource Budget**: Core Go backend container must stay within 25–50 MB RAM on Koyeb.
- **Security & Anti-Cheat**: Telegram Bot Token secret must never be exposed to the client; all Telegram `initData` HMAC validations and official score/streak mutations must be verified server-side.
- **Offline Playability**: Math problem generation, validation, and session progression must run 100% locally in-browser without network dependency.
- **Visual Design Contract**: Strict adherence to the "Storybook on Peach Paper" visual guidelines: 2px solid `#000000` ink outlines, 47px pill shapes, crayon fills, zero drop-shadows, zero gradients.

## Key Decisions

| Decision                                   | Rationale                                                                                                                         | Outcome   |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Retain Vite + React 19 for the game engine | Maximizes client-side animation performance, PWA offline caching, and instant builds; avoids SSR hydration pitfalls               | — Pending |
| Multiplatform via Capacitor + TMA          | Single React codebase deployed to Web, Android (Google Play), and Telegram Mini App                                               | — Pending |
| Lightweight Go backend on Koyeb            | Consumes only 25–30 MB RAM, starts in milliseconds, enables secure Telegram HMAC checks and anti-cheat session validation         | — Pending |
| BFF layer for Web presentation & cookies   | Encapsulates `httpOnly` secure cookies for Web clients and provides SSG/SEO landing pages without polluting the Go core API       | — Pending |
| Offline-First Sync Architecture            | Guarantees kids can play without network; background synchronizer merges local state with PostgreSQL when connection is available | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):

1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):

1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---

_Last updated: 2026-10-27 after initialization_

