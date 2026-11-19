# Vaartiva — Release Gates and Unified Launch Contract

> **Issue:** VRT-002 · **Version:** 0.1 · **Created:** 2026-11-19  
> **Status:** Proposed acceptance gates; **none passed or signed**.  
> **Gate authority:** Product Owner (release decision), Security & Privacy Lead (safety sign-off), Cross-platform QA Lead (test evidence)

## 1. Release rule

**There is no public launch until all G0–G6 gates pass** with linked evidence, explicit reviewer approvals and a confirmed coordinated rollout of the web production app, Google Play production Android app and Apple App Store production iOS app. Staging, beta, private testing, submitted builds and app-store review approval **without production download availability** do not meet the public-release contract.

Gates reflect the [Scope Contract](./MVP_SCOPE_CONTRACT.md) and [Platform Parity Matrix](./PLATFORM_PARITY_MATRIX.md). A gate failure blocks progress toward an announced flagship launch; nonblocking conditional connectors are handled by truthful capability gating.

## 2. Evidence and status conventions

- **Statuses:** `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `READY_FOR_REVIEW`, `PASSED`, `WAIVED_BY_APPROVED_RESCOPE` (a waiver must change scope honestly rather than claim a broken requirement passed).
- **Evidence:** test report/run ID, build version/commit SHA, device/OS matrix, named reviewer, observed result, relevant artifact URL, issue IDs and decision timestamp.
- **Proposed evidence location:** `docs/evidence/G0/` ... `docs/evidence/G6/` or linked CI/device-test artifacts. Do not commit secrets, real transcripts, customer data or app-store credentials.
- **Approval:** a checkbox is not evidence. Gate pass requires Product Owner and relevant security/QA role acknowledgement. All role assignments currently pending.
- **Timing:** No fixed launch date is promised; approval and platform readiness take precedence over an aspirational schedule.

## 3. Gate definitions

| Gate | Outcome | Required pass evidence | Primary accountable role | Stop conditions |
|---|---|---|---|---|
| **G0 — Planning signed** | Product, threat boundaries, native constraints and launch terms agreed | Signed PRD/scope contract, release risks, architecture/API boundary plan, privacy/consent baseline, parity plan | Product Owner | Unapproved scope, unresolved high-severity privacy policy or missing app-store viability plan |
| **G1 — Foundations reliable** | Web, Android, iOS + APIs function with real identity boundaries | Web and physical-device native development builds; shared API contract checks; member/guest denial tests; CI quality baseline | Platform Lead / Security Lead | No native build, broken auth/guest segregation, failing contract tests |
| **G2 — Native calls dependable** | Secured mixed-client 3–6-human meeting | Scripted **six-human** mixed web/Android/iOS room; host/guest admission; schedule/join; A/V, chat, screen share, reconnection and end-for-all tests | Real-time Media Lead + QA | Broken voice/video on supported client; unsafe room token; missing mandatory native screen-share proof |
| **G3 — Collaborative work** | People can create shared durable outcomes | Permissioned agenda/notes/tasks, decisions, polls and whiteboard work across clients; persistence and conflicting edit tests | Collaboration Lead + QA | Shared state loss or unauthorized mutation; no accepted critical client parity |
| **G4 — Knowledge and voice AI** | Explicit, evidence-based meeting AI | Speaker-level consent tests; AI join/cancel/fallback; scoped RAG/citations; deletion/revocation checks; source denial and no-evidence cases | AI/Knowledge Leads + Security | Nonconsenting capture; cross-audience source leak; hallucinated source identifiers accepted as facts |
| **G5 — Agents and approved actions** | Private/public specialist workflows and real approved action execution | Private/public isolation, action preview/approval/re-auth/idempotency/audit tests; any *advertised* connector verified end-to-end | AI Orchestration + Actions Leads | Public leak from private agent; fake action success; execution without approval; unsupported connector promoted as working |
| **G6 — Production public release** | Safe, reliable, actual three-platform distribution | Security/regression/load/accessibility tests; incident/runbook readiness; app policy disclosures; store approvals + verified production visibility, install/join smoke tests; web prod and rollback rehearsed | Product Owner + QA + Security | Security blocker, failed core flow, platform review/release pending, unverified store listing, incomplete disclosures |

### G0 minimum sign-off artifacts

- [VRT-001 PRD](./PRD.md), [Audience Map](./AUDIENCE_MAP.md), [Feature Matrix](./FEATURE_VALUE_MATRIX.md)
- [VRT-002 Scope Contract](./MVP_SCOPE_CONTRACT.md), [Parity Matrix](./PLATFORM_PARITY_MATRIX.md), [Risk Register](./RELEASE_RISK_REGISTER.md)
- Architecture and privacy/security baseline planned under other Phase-00 issues; **G0 cannot be marked passed solely by completing VRT-002**.

## 4. Proposed scripted acceptance scenarios (initial thresholds)

| ID | Test | Proposed acceptance / record |
|---|---|---|
| A01 | Six-human room with mix of web/Android/iOS clients | Every human can join, be seen/heard, and leave/rejoin under agreed test network; record tested device models/OS and any drops |
| A02 | External guest with valid/expired/revoked invite | Valid admitted guest joins; all invalid/denied scenarios fail with no private data disclosure |
| A03 | Android/iOS screen-share broadcasting and viewing | Working native share start/stop, permissions and recovery, with a receiving participant on another client |
| A04 | Collaborative agenda, notes, polls, whiteboard and decisions | Authorized mixed-client participants see consistent results; no unauthorized writes |
| A05 | Nonconsenting participant speaks while others consent | No audio from nonconsenting participant enters STT; UI clearly displays state and changes |
| A06 | Guest asks AI for host-private negotiation info | Retrieval excludes source before model context; no content or side-channel leakage in text/voice/citation |
| A07 | User approves/rejects a proposed internal task | Rejected = no write; approved = real persisted ID and audit event; retries do not create duplicates |
| A08 | AI provider timeout or exhausted quota | Human room stays functional; honest unavailable state and safe retry/cancel |
| A09 | Delete/revoke meeting data and access | Rules applied to canonical data, retrieval index, exports and permitted retained records; audit verifies outcomes |
| A10 | App-store launch verification | Target account can discover, download, install and join a production meeting on both stores; web release is live |

**Threshold note:** `100%` security/approval expectations above refer to passing defined deterministic tests, **not a guarantee that future bugs are impossible**. User-research and performance targets in VRT-001 remain hypotheses until tested.

## 5. Store approvals are separate from build artifacts

| Milestone | What it establishes | Public-release proof? |
|---|---|---|
| Development build / local APK / simulator | Internal engineering can test native features | **No** |
| EAS signed production build | Binary is ready for submission | **No** |
| EAS Submit / upload to App Store Connect or Play Console | Package reached developer portal | **No** |
| TestFlight / Google Play internal or closed testing | Test distribution works for eligible testers | **No** |
| Approved for App Store / changes ready to publish on Play | Review milestone | **Not alone** |
| Published production listing and verified download/install | Public intended-region availability | **Yes, with smoke tests** |

**Operational caveat:** Store review and rollout timelines are outside the team's full control; use release controls when available and avoid a guaranteed minute of simultaneous visibility. The product promise is a *coordinated same-calendar-day public launch*, not sub-second synchronization. If that target cannot be substantiated, delay announcement or formally revise the release contract.

## 6. Launch runbook: preparation → decision → verification

### Before release (G6 review)

1. Confirm G0–G5 pass records, known issues and feature/status copy; verify no high-severity open security/privacy defect.
2. Verify production APIs, TLS, secrets management, rate limits, monitoring, backup/restore, data retention and safe incident contact paths.
3. Build from pinned commit; run signed native smoke tests using appropriate production-like credentials and environments.
4. Complete Apple and Google developer account eligibility, app metadata, privacy disclosures, review access, and any applicable Play testing eligibility requirements.
5. Submit mobile applications early enough for review; consider **Apple manual release** and **Google Play managed publishing** for coordination, subject to current platform rules.
6. Capture the intended version identifiers, release regions, rollout strategy, rollback options, and approved communication copy.

### Go / no-go meeting

- **Product Owner:** confirms scope, feature claims and release date.
- **Security & Privacy Lead:** confirms authorization, consent, deletion, privacy notices and no unresolved release blockers.
- **QA / Platform Lead:** confirms device matrix, store readiness, load test and production smoke rehearsal.
- **Decision log:** `GO`, `HOLD`, or `RESCOPE_AND_RETEST`, with timestamp and evidence links. If any sign-off missing → `HOLD`.

### Controlled release and post-release check

1. Coordinate approved/ready mobile releases via available developer-console controls, then production web deployment in the agreed window.
2. **Verify actual availability** in the target region(s) from nondeveloper user devices/accounts on both stores (not console screenshots alone).
3. Install production Android and iOS builds, verify version, create/join a real production meeting with web, test consent and guest denial, and check service health.
4. Publish the coordinated launch announcement **only after** all three platforms' production availability and smoke results are confirmed.
5. Monitor crashes, room join errors, auth denials, AI costs, security events and rollback triggers; use tested rollback/deactivation procedures for faults.

### If a release cannot complete

- **Before announcement:** hold the announcement and web public-facing launch until mobile and safety conditions pass; continue private/beta testing where appropriate.
- **After one app becomes visible unexpectedly:** do not claim simultaneous launch; restrict publicity, assess policy-compliant measures, document actual launch timing and execute a coordinated recovery plan.
- **Severe incident:** disable affected AI/connectors where safe, protect core calls, begin incident response and follow mobile-platform-specific update/review constraints. Rollback is not always instantaneous on app stores.

## 7. Initial status register

| Gate | Status as of 2026-11-19 | Evidence | Approved by |
|---|---|---|---|
| G0 | IN_PROGRESS (documentation drafting) | VRT-001/VRT-002 drafts only | **Pending** |
| G1 | NOT_STARTED | — | **Pending** |
| G2 | NOT_STARTED | — | **Pending** |
| G3 | NOT_STARTED | — | **Pending** |
| G4 | NOT_STARTED | — | **Pending** |
| G5 | NOT_STARTED | — | **Pending** |
| G6 | NOT_STARTED | — | **Pending** |

## 8. Official policy references (re-verify before submission)

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple manual/scheduled release controls: https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/select-an-app-store-version-release-option
- Google Play managed publishing: https://support.google.com/googleplay/android-developer/answer/9859654
- Google Play testing requirements for newer personal accounts: https://support.google.com/googleplay/android-developer/answer/14151465
- Expo EAS submission vs app-store release: https://docs.expo.dev/deploy/submit-to-app-stores/

Store rules can change; the linked official sources govern, not dates or assumptions copied into this planning document.
