# Roadmap: Math Sanctuary (Logikrok)

## Overview

This roadmap takes Math Sanctuary from an AI Studio prototype to a robust multiplatform educational game. The path begins by hardening the technical foundation (local fonts, PWA assets, dependencies, and Vitest test suite). We then develop a PostgreSQL database and an ultra-lightweight Go core microservice on Koyeb (<50MB RAM) for anti-cheat validation and Telegram HMAC auth, fronted by a BFF presentation layer with secure httpOnly cookies and SSG landing pages. An offline-first sync engine connects the client, followed by packaging for Google Play via Capacitor (Android) and launching inside Telegram as a Telegram Mini App.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Foundation & Hardening** - Stabilize dependencies, fix path aliases, bundle local fonts, supply PWA icons, and configure Vitest
- [ ] **Phase 2: Database Schema & Go Core Microservice** - PostgreSQL schema, lightweight Go service on Koyeb, Telegram HMAC auth, and anti-cheat validation
- [ ] **Phase 3: BFF Presentation & Session Layer** - BFF service managing httpOnly auth cookies, Go API proxying, and SSG/SEO public landing
- [ ] **Phase 4: Client Offline-First Sync Engine** - Two-way background synchronization between localStorage and PostgreSQL with sync UI indicators
- [ ] **Phase 5: Android Distribution via Capacitor** - Native Android container, splash screen, adaptive icons, and APK/AAB build pipeline
- [ ] **Phase 6: Telegram Mini App Integration** - TMA SDK integration, seamless Telegram ID login, and native haptic feedback

## Phase Details

### Phase 1: Foundation & Hardening
**Goal**: Stabilize development dependencies, fix path aliases, self-host typography, supply missing PWA assets, and configure Vitest regression test suite for procedural math generators.
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. `npm run lint` and `npm run build` run cleanly without errors.
  2. Vitest runs unit tests verifying Grade 1-5 math generation invariants (non-negative subtraction, exact division, 4 distinct options).
  3. Typography renders with `@fontsource` packages in offline mode without fetching external Google Fonts.
  4. PWA manifest loads valid 192x192 and 512x512 icons from `public/`.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Install dependencies, synchronize path aliases, replace Google Fonts with `@fontsource`, and generate PWA icon assets
- [ ] 01-02: Configure Vitest test runner and write unit tests for procedural math problem generators and bounds validation

### Phase 2: Database Schema & Go Core Microservice
**Goal**: Implement relational PostgreSQL migrations and a compiled, lightweight Go microservice (< 50MB RAM on Koyeb) with connection pooling, Telegram HMAC validation, and anti-cheat session validation endpoints.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: BACK-01, BACK-02, BACK-03, BACK-04, BACK-05
**Success Criteria** (what must be TRUE):
  1. PostgreSQL migrations execute and establish schema for users, sessions, progress, awards, and streaks.
  2. Go container runs on Koyeb consuming under 50MB RAM and exposes health and API endpoints over TLS.
  3. Telegram `initData` is cryptographically validated using HMAC-SHA256 with the bot secret.
  4. Math session completion endpoint validates student answers and safely updates server-side XP and streaks.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Design PostgreSQL relational schema and write SQL migrations for users, game sessions, progress, and awards
- [ ] 02-02: Implement Go HTTP microservice with pgx connection pooling, Telegram HMAC-SHA256 auth, and JWT issuance
- [ ] 02-03: Implement anti-cheat game session validation, XP/award calculations, and Dockerfile for Koyeb deployment

### Phase 3: BFF Presentation & Session Layer
**Goal**: Construct the Backend-For-Frontend layer handling secure `httpOnly` session cookies for Web clients, request aggregation to the Go core microservice, and SSG/SEO public landing page rendering.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: BFF-01, BFF-02, BFF-03
**Success Criteria** (what must be TRUE):
  1. Web clients receive secure `httpOnly`, `SameSite=Lax` auth cookies without tokens exposed to browser JavaScript.
  2. BFF proxies and shapes API calls to internal Go core service.
  3. Public landing pages render with metadata and fast time-to-first-byte for search indexing.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Set up BFF presentation service with secure cookie session middleware and proxying to the Go microservice
- [ ] 03-02: Implement SSG/SEO public landing page and grade curriculum overview with Open Graph meta tags

### Phase 4: Client Offline-First Sync Engine
**Goal**: Upgrade client-side `gameSessionService` to operate with an offline-first sync engine that queues progress locally in `localStorage` and background-syncs with the backend when connected.
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: SYNC-01, SYNC-02, SYNC-03
**Success Criteria** (what must be TRUE):
  1. Gameplay, problem generation, and level progression work without lag or network requirement.
  2. Pending sessions automatically sync to PostgreSQL upon network reconnection.
  3. Profile screen visualizes real-time sync status (synced, syncing, offline).
**Plans**: 2 plans

Plans:
- [ ] 04-01: Implement two-way offline-first sync client queue in `gameSessionService` with idempotent conflict resolution
- [ ] 04-02: Add cloud sync status indicators and account linking modal to Profile and Header UI

### Phase 5: Android Distribution via Capacitor
**Goal**: Package the React application into an Android native wrapper using Capacitor, configuring native splash screen, adaptive icons, safe-area insets, and generating signed APK/AAB packages.
**Mode**: mvp
**Depends on**: Phase 4
**Requirements**: DROID-01, DROID-02, DROID-03
**Success Criteria** (what must be TRUE):
  1. Capacitor Android project builds successfully in Android Studio and CLI.
  2. App launches with custom Storybook splash screen and respects native Android notch/status bars.
  3. Release APK / AAB artifacts are generated ready for device testing and Google Play submission.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Initialize Capacitor configuration, integrate Android project, and adapt viewport/safe areas for mobile screens
- [ ] 05-02: Configure Android adaptive icons, native splash screen, and configure Gradle build commands for APK/AAB generation

### Phase 6: Telegram Mini App Integration
**Goal**: Connect `@telegram-apps/sdk` to run Math Sanctuary inside Telegram with automatic Telegram ID authentication, native haptic feedback, and matching theme header.
**Mode**: mvp
**Depends on**: Phase 4
**Requirements**: TMA-01, TMA-02, TMA-03
**Success Criteria** (what must be TRUE):
  1. App auto-detects Telegram WebApp context and authenticates via Telegram user ID without login dialogs.
  2. User interaction triggers Telegram native haptics on correct/incorrect answers.
  3. Game runs smoothly within Telegram client viewports on iOS, Android, and Desktop Telegram.
**Plans**: 2 plans

Plans:
- [ ] 06-01: Integrate `@telegram-apps/sdk`, extract initData, and bridge auto-authentication with backend
- [ ] 06-02: Connect Telegram haptic feedback on button presses and adapt navigation UI to Telegram WebApp chrome

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Hardening | 0/2 | Not started | - |
| 2. Database Schema & Go Core Microservice | 0/3 | Not started | - |
| 3. BFF Presentation & Session Layer | 0/2 | Not started | - |
| 4. Client Offline-First Sync Engine | 0/2 | Not started | - |
| 5. Android Distribution via Capacitor | 0/2 | Not started | - |
| 6. Telegram Mini App Integration | 0/2 | Not started | - |
