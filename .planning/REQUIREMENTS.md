# Requirements: Logikrok (Logikrok)

**Defined:** 2026-10-27
**Core Value:** Provide children with an engaging, friction-free, tactile math learning experience across any device (Web, Android, Telegram) with reliable offline play and tamper-proof cloud progress synchronization.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation & Hardening

- [ ] **FOUND-01**: Dependencies installed with `package-lock.json`, allowing `npm run lint` and `npm run dev` to execute cleanly
- [ ] **FOUND-02**: Path aliases `@/*` synchronized between `tsconfig.json` and `vite.config.ts`
- [ ] **FOUND-03**: Self-hosted typography via `@fontsource` packages eliminating Google Fonts CDN runtime dependency for offline play
- [ ] **FOUND-04**: PWA manifest icons (`pwa-192x192.png`, `pwa-512x512.png`) generated and served from `public/`
- [ ] **FOUND-05**: Vitest test runner configured with unit tests for math problem generators, non-negative subtraction, and exact divisions

### Database & Core Go Microservice

- [ ] **BACK-01**: PostgreSQL migrations define schema for `users`, `game_sessions`, `category_progress`, `awards`, and `daily_streaks`
- [ ] **BACK-02**: Compiled Go service containerized with scratch/alpine Dockerfile running within 25–50 MB RAM on Koyeb
- [ ] **BACK-03**: Go service validates Telegram Mini App `initData` using cryptographic HMAC-SHA256 signature verification with bot secret
- [ ] **BACK-04**: Go service validates completed math sessions and computes anti-cheat XP, level progression, and award unlocks server-side
- [ ] **BACK-05**: Go service provides idempotent two-way sync endpoints for offline client updates and player profile retrieval

### BFF Presentation & Session Layer

- [ ] **BFF-01**: BFF layer manages Web client sessions using secure `httpOnly`, `SameSite=Lax`, `Secure` cookies
- [ ] **BFF-02**: BFF proxies and aggregates authenticated client requests to internal Go API
- [ ] **BFF-03**: BFF serves SSG/SEO public landing pages, curriculum overviews, and open graph metadata

### Client Offline-First Sync

- [ ] **SYNC-01**: Math problem solving, progression, and UI interactions operate 100% locally from `localStorage` without network latency
- [ ] **SYNC-02**: Client detects network connectivity and automatically background-syncs pending local sessions with the backend
- [ ] **SYNC-03**: Player profile UI displays active cloud sync status (synced, syncing, offline) and allows manual sync retry

### Android Distribution via Capacitor

- [ ] **DROID-01**: Capacitor Android project initialized and configured with native status bar and safe area handling
- [ ] **DROID-02**: Native splash screen and adaptive app icons configured for Android devices
- [ ] **DROID-03**: Build scripts produce release-ready APK/AAB packages for device installation and Google Play testing

### Telegram Mini App Integration

- [ ] **TMA-01**: Client integrates `@telegram-apps/sdk` to detect Telegram environment and extract signed `initData`
- [ ] **TMA-02**: Client automatically authenticates Telegram users without credential prompts
- [ ] **TMA-03**: Client enables native Telegram haptic feedback and matches Telegram window header styling

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Social & Competitions

- **SOCL-01**: Global and weekly leaderboard ranking players by XP and streaks
- **SOCL-02**: Classroom / Group leaderboards for schools and friend circles
- **SOCL-03**: Asynchronous 1v1 math duel challenges shared via Telegram bot links

### Parent & Teacher Dashboard

- **DASH-01**: Parent portal with detailed topic accuracy graphs and weak spot breakdown
- **DASH-02**: Teacher classroom management allowing assignment of specific topic homework

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature                                            | Reason                                                                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full rewrite to Next.js SSR for game engine        | Game relies on rich client animations and instant offline PWA execution; rewriting to SSR adds hydration overhead and breaks Capacitor simplicity |
| Heavy Node/NestJS monolithic backend               | Replaced by lightweight Go microservice consuming <50MB RAM for cost and operational efficiency on Koyeb                                          |
| Real-time synchronous multiplayer WebSocket server | High operational complexity; single-player offline-first learning with async leaderboards is preferred for v1                                     |
| In-app purchases / subscription payment gateways   | Application will launch as a free educational tool to maximize adoption across schools and families                                               |

## Traceability

Which phases cover which requirements. Populated during roadmap creation.

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| FOUND-01    | Phase 1 | Pending |
| FOUND-02    | Phase 1 | Pending |
| FOUND-03    | Phase 1 | Pending |
| FOUND-04    | Phase 1 | Pending |
| FOUND-05    | Phase 1 | Pending |
| BACK-01     | Phase 2 | Pending |
| BACK-02     | Phase 2 | Pending |
| BACK-03     | Phase 2 | Pending |
| BACK-04     | Phase 2 | Pending |
| BACK-05     | Phase 2 | Pending |
| BFF-01      | Phase 3 | Pending |
| BFF-02      | Phase 3 | Pending |
| BFF-03      | Phase 3 | Pending |
| SYNC-01     | Phase 4 | Pending |
| SYNC-02     | Phase 4 | Pending |
| SYNC-03     | Phase 4 | Pending |
| DROID-01    | Phase 5 | Pending |
| DROID-02    | Phase 5 | Pending |
| DROID-03    | Phase 5 | Pending |
| TMA-01      | Phase 6 | Pending |
| TMA-02      | Phase 6 | Pending |
| TMA-03      | Phase 6 | Pending |

**Coverage:**

- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---

_Requirements defined: 2026-10-27_
_Last updated: 2026-10-27 after initialization_

