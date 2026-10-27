---
phase: 1
slug: foundation-hardening
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-10-27
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x |
| **Config file** | `vite.config.ts` |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm run lint && npm test && npm run build` |
| **Estimated runtime** | ~4 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint` (Plan 01) / `npm test` (Plan 02)
- **After every plan wave:** Run `npm run lint && npm test && npm run build`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01, FOUND-02 | T-1-01 | Lockfile integrity & deterministic path resolution | build/lint | `npx tsc --noEmit && npm run lint` | ✅ | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-03, FOUND-04 | T-1-02 | Zero third-party font CDN tracking; valid local PWA assets | integration | `npm run build` | ✅ | ⬜ pending |
| 1-02-01 | 02 | 2 | FOUND-05 | — | N/A | unit | `npm test` | ❌ W0 | ⬜ pending |
| 1-02-02 | 02 | 2 | FOUND-05 | T-1-03 | Bounded option generation loop; safe localStorage parsing | unit | `npm test` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest` installed in `package.json` `devDependencies`
- [ ] `src/entities/card/model/generator.test.ts` — unit tests for `FOUND-05`
- [ ] `src/shared/api/gameSessionService.test.ts` — unit tests for `FOUND-05`

---

## Manual-Only Verifications

*All phase behaviors have automated verification.*

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-10-27
