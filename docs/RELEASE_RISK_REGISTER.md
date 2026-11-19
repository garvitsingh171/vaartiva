# Vaartiva — Release Risk Register and Blocking Criteria

> **Issue:** VRT-002 · **Version:** 0.1 · **Created:** 2026-11-19  
> **Status:** Initial planning assessment; likelihood/severity ratings are **hypotheses**, not measured frequencies.  
> **Risk owner:** Product Owner; each risk has one accountable **role** pending assignment to a named contributor.

## 1. Scoring and decisions

- **Impact:** `CRITICAL` = privacy/security harm or a failed core launch promise; `HIGH` = major service/platform or store availability failure; `MEDIUM` = contained degradation or operational burden.
- **Likelihood:** `HIGH`, `MEDIUM`, `LOW` are preliminary prioritization labels; validate with test and provider evidence.
- **Disposition:** `OPEN`, `MITIGATING`, `VERIFIED`, `ACCEPTED_WITH_SIGNOFF`, `TRIGGERED`. A MUST feature failing its acceptance test is not solved by simply relabeling risk accepted.
- **Launch policy:** any unresolved critical privacy/security concern, store unavailability, unsupported must-have native feature, or fake/unauthorized AI action blocks G6 and therefore the coordinated public launch.

## 2. Risk register

| ID | Risk + gate | Impact / likelihood | Accountable DRI role | Mitigation and required verification | Trigger and release decision |
|---|---|---|---|---|---|
| R01 | Apple review rejection/hold, store metadata or privacy mismatch (G6) | HIGH / MEDIUM | Release Manager | Prepare accurate metadata, privacy/support links, review account, native policies; submit ahead of launch | **HOLD** if not approved and publicly distributable |
| R02 | Google Play testing eligibility, review delay or production gate (G6) | HIGH / MEDIUM | Release Manager | Verify actual developer-account requirements, complete applicable testing/access steps early, use managed publishing when possible | **HOLD** if production eligibility/listing absent |
| R03 | Store approved but app not yet visible/installable in launch region (G6) | HIGH / MEDIUM | Release Manager | Manual verification using nondeveloper storefront accounts in planned region; rollout monitoring | **HOLD announcement**; no false simultaneous-launch claim |
| R04 | iOS ReplayKit screen share fails on native hardware (G2) | HIGH / HIGH | Real-time Media Lead | Early extension/permissions/lifecycle spike, mixed-client receipt tests | **HOLD G2**, or approved re-scope changing claims and tests |
| R05 | Android MediaProjection or foreground-service behavior blocks sharing (G2) | HIGH / MEDIUM | Real-time Media Lead | Physical-device, supported-OS, permission/recovery tests | **HOLD G2** until verified or formally re-scoped |
| R06 | Six-human mixed-device A/V fails or costs exceed sustainable limits (G2) | HIGH / MEDIUM | Media/Infrastructure Lead | Capacity/load tests, quota planning, connection monitoring, documented room limits | **HOLD G2**; reduce promise only by signed change |
| R07 | Guest gains host/workspace-private access (G1/G4/G5) | CRITICAL / MEDIUM | Security & Privacy Lead | Pre-retrieval tenant + audience policy; adversarial guest/source tests; revoke edge cases | **NO-GO** on any unauthorized source disclosure |
| R08 | Nonconsenting voice is transcribed or processed (G4) | CRITICAL / MEDIUM | Security & Privacy Lead | Speaker-scoped capture architecture and withdrawal tests, recording controls, consent event audit | **NO-GO** on consent violation |
| R09 | Agent executes an unapproved or duplicate write (G5) | CRITICAL / MEDIUM | API / Actions Lead | Verified preview/approval, auth re-check, idempotency and real execution receipt | **NO-GO** on unauthorized/fabricated action success |
| R10 | AI invents citations, decisions or task success (G4/G5) | HIGH / HIGH | AI Orchestration Lead | Structured citation validation, proposed-vs-confirmed states, source evaluation, execution receipts | **HOLD affected gate** for misleading critical outcomes |
| R11 | Provider STT/TTS/LLM quota/cost is exhausted during call (G4/G6) | HIGH / HIGH | AI / Voice Lead | Per-meeting/participant quotas, timeouts, cancellation, observability and human-only fallback | **HOLD** if ordinary human room cannot recover |
| R12 | Optional OAuth connector lacks API scope or eligibility (G5) | MEDIUM / HIGH | Integrations Lead | Capability/eligibility registry, staged OAuth verification, no fake success UI | **DEFER connector**; if explicitly promised as MUST, file scope change/hold |
| R13 | Shared notes/decisions/tasks diverge across clients (G3) | HIGH / MEDIUM | Collaboration Lead | Cross-platform integration tests, concurrency/conflict and reconnection scenarios | **HOLD G3** if durable state/rights incorrect |
| R14 | Retention/deletion fails across DB, objects, indexes and backups (G4/G6) | CRITICAL / MEDIUM | Security & Privacy Lead | Data inventory, deletion design and timed verification; documented backup policy | **NO-GO** on material privacy or rights failure |
| R15 | App-store privacy disclosures do not match microphone, AI and data handling (G6) | HIGH / MEDIUM | Security & Privacy Lead | Map data flows to Apple/Google forms; reviewer walkthrough and legal/privacy review | **HOLD G6** until notices/review disclosures corrected |
| R16 | Too many mandatory features overwhelm capacity/delay launch (G0/G6) | HIGH / HIGH | Product Owner | Small verified PR slices, gate-first spikes, critical-path tracking and formal re-scoping | **HOLD date/announce later**, never mark unfinished MUST complete |
| R17 | Compromised secrets, exposed private documents or PII in logs (G1–G6) | CRITICAL / MEDIUM | Security & Privacy Lead | Secrets scanning, short-lived URLs, access tests, log-redaction and incident drills | **NO-GO** until incident remediated and risk reviewed |
| R18 | Mixed device, OS or accessibility issues block guest entry (G2/G6) | HIGH / MEDIUM | Cross-platform QA Lead | Device coverage, deep/universal links, permissions, accessibility and reduced-network tests | **HOLD relevant core-flow gate** |

**Separate issue if triggered:** log date, build, impact, affected user roles, reproduction link (sanitized), owner, mitigation status, decision/approval and regression evidence.

## 3. Risk mitigation priorities

1. **Now / G0–G1:** Confirm account eligibility and distribution costs; privacy/consent policy; guest/host access architecture; assign real reviewers.
2. **Early media work / G2:** Spike native iOS/Android screen broadcast and real six-human mixed-device call before feature-rich collaboration work consumes the schedule.
3. **Collaboration and AI / G3–G5:** Automate negative authorization/consent tests, resolve citation/decision truthfulness, measure AI quotas and audit tool executions.
4. **Prelaunch / G6:** Review every published capability claim, verify store release paths, test production downloads and institute go/no-go and incident procedures.

## 4. External dependencies and verification

| Dependency | Current assumption | Owner action before commitment |
|---|---|---|
| Apple Developer Program / App Store Connect | Native iOS needs proper signing, submission, app review and availability controls | Verify enrolment, privacy disclosures, review credentials and manual release option |
| Google Play Console | Native Android needs testing/production eligibility and managed publishing may aid coordinated launch | Check this specific developer account's test/production requirements, then prove eligibility |
| Expo native development builds / SDK | Real native media and share capabilities require platform-specific work | Prove required library support and native extension/service behavior on physical devices |
| LiveKit/media provider | Real-time A/V and agent capacity depend on provider plan/features | Stress-test six-human meetings and AI concurrency; define quotas and fallback |
| STT/LLM/TTS providers | Costs, consent handling and quality vary | Benchmark constrained flows, supported languages and safe provider outage UX |
| Third-party OAuth/app verification | Provider APIs and scopes may be gated/restricted | Verify each advertised connector; disable unavailable capabilities honestly |
| Privacy/compliance policy | Processing, consent, deletion and disclosure duties depend on actual product and launch jurisdictions | Obtain appropriate review; document real retention and user-rights behavior |

**Special note:** Google Play has additional production-access testing requirements for **some newer personal developer accounts**. Do not presume they apply or do not apply to Vaartiva without checking the actual account. See official Google Play guidance below.

## 5. Critical no-go checklist

- [ ] All seven release gates passed with evidence and approvals.
- [ ] No unauthorized guest/private-source disclosure or nonconsenting capture.
- [ ] No unapproved mutating tool action or synthetic success masquerading as real execution.
- [ ] Real six-human mixed-device A/V and required native screen-share tests passed.
- [ ] Web and both app stores have the planned production version available to intended users.
- [ ] Accurate disclosures, data controls, incident/rollback process and contact/support readiness verified.
- [ ] Conditional connector claims reflect **tested** provider/account availability only.

**Unchecked = not verified. This checklist is not evidence of a completed launch.**

## 6. Official sources to monitor before release

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple release controls: https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/select-an-app-store-version-release-option
- Google Play managed publishing: https://support.google.com/googleplay/android-developer/answer/9859654
- Google Play personal-account testing: https://support.google.com/googleplay/android-developer/answer/14151465
- Expo EAS store submissions: https://docs.expo.dev/deploy/submit-to-app-stores/

**Related:** [Scope Contract](./MVP_SCOPE_CONTRACT.md) · [Release Gates](./RELEASE_GATES.md) · [Platform Parity](./PLATFORM_PARITY_MATRIX.md)
