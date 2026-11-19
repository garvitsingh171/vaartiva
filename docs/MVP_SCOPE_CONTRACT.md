# Vaartiva — Flagship MVP Scope Contract

> **Issue:** VRT-002 · **Version:** 0.1 · **Created:** 2026-11-19  
> **Status:** **PROPOSED — requires Product Owner and Security/Privacy sign-off.** This document is not evidence that a product exists or is approved for launch.  
> **Decision owner:** Product Owner / repository maintainer · **Security reviewer:** Security & Privacy Lead (assignment pending)

## 1. Purpose and precedence

This contract defines the **intended first public flagship release** of Vaartiva. It turns [VRT-001's PRD](./PRD.md), [audience map](./AUDIENCE_MAP.md) and [feature registry](./FEATURE_VALUE_MATRIX.md) into testable launch boundaries. It does **not** assert that any feature has been implemented, validated, or released.

**Authority:** once reviewed and signed, this contract is the launch-scope source of truth; subsequent requests must use the change-control process in §9. Product requirements, detailed UX, security policy and engineering implementation still require their own issues and reviews.

**Launch promise:** one production web app plus genuine native Android and iOS apps, interoperating with the same backend, published/available to intended users on the same announced launch calendar day **after** required reviews and readiness gates. A build, a TestFlight link, or a store submission does **not** count as a public mobile release. Store availability may lag; the team must verify actual listings and availability, not assume review approval means users can download.

## 2. Audience, job and capacity contract

- **Primary audiences:** student project/study groups; small engineering/startup/operations teams. **First-class sensitive scenario:** a restricted external vendor/client negotiating guest. **Cross-cutting:** host/facilitator and private-AI user.
- **Primary job:** let a small group meet reliably, understand allowed context, distinguish proposed from confirmed decisions, and convert authorized next steps into verified work.
- **Capacity:** baseline **3–6 human participants** in one meeting, using any supported combination of web/Android/iOS. The visible AI participant is **separate** from this six-human limit. Smaller rooms may function; >6 human capacity is not promised.
- **Guest contract:** scoped expiring invite or meeting ID + passcode where enabled; pre-join disclosure, host-controlled admission, limited guest identity, revoked/expired/denied paths, and explicit artifact permissions. A guest is not a workspace member merely because they joined a room.
- **Resilience:** normal human-to-human meetings must continue when AI is declined, unavailable, quota-limited, or canceled.
- **Privacy:** the requesting identity **and the output audience** both constrain every AI retrieval and response. A guest-visible answer must not expose host-private sources, including via voice, citations, titles or logs.

## 3. Scope terminology

| Term | Meaning | Launch rule |
|---|---|---|
| **MUST** | Required for the advertised flagship public release | Its relevant gate and end-to-end tests must pass; absence blocks launch unless formally re-scoped and re-approved |
| **CONDITIONAL** | Depends on third-party eligibility, account permissions, cost, approval, or available provider APIs | Advertise only if verified; if unavailable, clearly mark unavailable and provide safe fallback; never fake an action |
| **EXCLUDED** | Not offered in the first public release | No implied promise in marketing, UI, documentation or demo |
| **SPIKE** | Technical feasibility investigation needed before final commitment | A failed spike triggers a scoped decision; it does not silently convert a MUST into a fallback |

**Scope freeze:** effective only after the approvers sign §10. Prior to that, all entries are proposed decisions, not accepted commitments. After freeze, scope changes require written authorization and updated acceptance evidence.

## 4. Traceable feature scope

Feature IDs are consistent with [FEATURE_VALUE_MATRIX.md](./FEATURE_VALUE_MATRIX.md). Role owners are **proposed DRIs**, not assigned individuals. Test criteria and quantitative targets are proposals until calibrated.

| ID | Capability | Class | Target gate | Accountable DRI role | Minimum release evidence |
|---|---|---|---|---|---|
| F01 | Auth, workspaces, members and role policy | MUST | G1 | API / Identity Lead | Unauthorized workspace access denied at API boundary |
| F02 | Scoped guest identity, invite, waiting room, admission and revocation | MUST | G1/G2 | API / Identity Lead | Legitimate guest joins; revoked, expired and denied paths blocked |
| F03 | Instant, scheduled and recurring meeting lifecycle | MUST | G2 | Meetings Product Engineer | Correct lifecycle/timezone rules; authorized create/join/end |
| F04 | Native interoperable 3–6-human audio/video | MUST | G2 | Real-time Media Lead | Six-human mixed-device physical/representative device test passes |
| F05 | Screen sharing, room chat and presence | MUST + SPIKE for native screen share | G2 | Client Collaboration Lead | All three platforms pass share/view, chat/presence; native feasibility verified |
| F06 | Agenda, collaborative notes and internal tasks | MUST | G3 | Collaboration Lead | Authorized cross-device edits and persisted tasks |
| F07 | Polls and whiteboard | MUST | G3 | Collaboration Lead | Two-platform and mixed-client interaction parity, with approved adaptive UI |
| F08 | Decision Cards (proposed/confirmed/superseded) | MUST | G3 | Collaboration Lead | Human confirmer, state, evidence or clearly marked manual annotation |
| F09 | Private documents, scoped indexing/retrieval, evidence links | MUST | G4 | Knowledge / RAG Lead | All citations resolvable; unauthorized sources never enter model context |
| F10 | Per-participant consent, speaker-aware STT and transcripts | MUST | G4 | AI / Voice Lead | Nonconsenting tracks excluded; withdrawal behavior demonstrated |
| F11 | Visible AI participant, typed/voice Q&A, cancel and fallback | MUST | G4 | AI / Voice Lead | Explicit invocation; correct status; human call survives AI failure |
| F12 | Public and user-private specialist workflows | MUST | G5 | AI Orchestration Lead | Public/private isolation and permission-negative tests pass |
| F13 | Proposed action → human approval → verified internal task | MUST | G5 | API / Actions Lead | Authorization recheck; idempotency; real persisted task ID/audit proof |
| F14 | Third-party OAuth connectors and approved external writes | CONDITIONAL by provider | G5 | Integrations Lead | Each advertised connector eligible, scoped, tested and truthfully labeled |
| F15 | Recaps, decision history and task follow-up | MUST | G3/G4 | Collaboration Lead | Recap backed by allowed sources, or explicit no-transcript state |
| F16 | ACL, audience policy, consent, audit, retention/deletion, safe failures | MUST | G1–G6 | Security & Privacy Lead | Security/privacy gates and negative tests approved |
| F17 | Cross-platform critical-flow parity, accessibility and resilience | MUST | G1–G6 | Cross-platform QA Lead | [Parity matrix](./PLATFORM_PARITY_MATRIX.md) passed; AI-independent call works |

**F14 nuance:** The roadmap plans several connectors. **No specific external provider** (GitHub, Calendar, Notion, Drive, Slack, Jira or Gmail) is guaranteed at launch before account eligibility, scopes, provider policies, app verification and security tests are established. Internal backend task execution (F13) is a MUST and cannot be substituted by a fabricated third-party success. A third-party provider may be listed as shipped only after its own full verified evidence; do not use unsupported Google Meet live-media bot claims as a workaround.

## 5. Explicit exclusions and rationale

| Excluded capability | Reason / user-facing boundary |
|---|---|
| **Enterprise SSO / SCIM** | Enterprise identity provisioning, contractual/compliance support and org administration exceed the small-team flagship scope |
| **Meeting recording library / replay** | Adds significant recording consent, retention, storage, review and UI obligations; **consented transcription is separate**, not covert recording |
| **Autonomous negotiation or contract commitment** | AI cannot independently agree to prices, sign agreements, send binding commitments or override human approvals |
| **Unrestricted self-directed external writes** | Human-reviewed exact action payload and fresh backend authorization are required |
| **Unlimited participants, webinars, breakout-room infrastructure** | Not supported by the 3–6-person performance and UX baseline |
| **Custom-built SFU** | Media infrastructure is planned using supported provider technologies, not an untested custom real-time transport |
| **Perfect STT, permanently available AI, all languages** | Model accuracy, concurrency and provider quotas are variable and must be disclosed |
| **Guaranteed universal third-party connector availability** | Eligibility and permissions vary; only tested capabilities may be advertised |
| **Hidden transcription or AI recording** | Explicit status and consent are product requirements |

**Not excluded:** privacy-safe, consented transcripts and source-backed recaps; these are separate from full audio/video recording playback.

## 6. Contractual quality and security invariants

1. **Identity + audience checks:** filter private/workspace/guest data *before retrieval* and before any content reaches the model. Prompts alone never enforce access control.
2. **Consent:** identifiable speaker-by-speaker capture permissions; no nonconsenting audio enters STT. On withdrawal stop future capture; document treatment of previously lawfully processed data.
3. **AI transparency:** show when AI/transcription is active and distinguish suggestions, confirmations, attempted actions and verified execution.
4. **Human approval:** mutating internal and external actions are proposed, previewed, approved, re-authorized, executed and audited. Retries cannot duplicate effects.
5. **Integrity:** no invented citations, transcript timestamps, task IDs, store approvals or mock download/action success.
6. **Data rights:** agreed retention, deletion, guest visibility and revocation rules must be reviewed before G6; no indefinite undocumented storage.
7. **Failure behavior:** meeting basics survive AI provider outage; network interruption leads to recovery UI or clear failure; no silent permission broadening.
8. **Cross-platform:** one authorization and server feature contract. Platform differences are implementation details only where an approved exception explicitly documents equivalent progress for the user.

## 7. Platform and launch constraints

- **Web:** production HTTPS app, supported desktop and mobile browsers, functional permissions and accessibility checks.
- **Android:** signed native application, media/device permissions, background media behavior and screen-sharing MediaProjection behavior tested on physical devices.
- **iOS:** signed native application, microphone/camera permissions and ReplayKit-based native broadcast/extension feasibility tested on physical devices.
- **App-store readiness:** each platform needs its own account eligibility, complete listing, privacy disclosures, reviewer access, approval and production rollout verification. An Expo/EAS build or submission is not a public listing.
- **Coordinated availability:** use release controls where offered (e.g. manual App Store release and Google Play managed publishing). Do not announce a simultaneous live product until the web and both app stores show the intended production version downloadable to the target audience.

Detailed parity/tests live in [PLATFORM_PARITY_MATRIX.md](./PLATFORM_PARITY_MATRIX.md); phased exit criteria in [RELEASE_GATES.md](./RELEASE_GATES.md).

## 8. Conditional capability policy

For every conditional connector or provider-gated integration, the launch owner records: **provider**, **eligibility**, **verified OAuth/scopes**, **API capability**, **read/write actions**, **consent**, **real success receipt**, **rate/quota/cost limits**, **failure UX**, **supported clients**, and **public availability status**.

Allowed feature statuses: `NOT_ASSESSED`, `INELIGIBLE`, `DEVELOPING`, `TESTED`, `LAUNCH_ENABLED`, `TEMPORARILY_UNAVAILABLE`, `DEFERRED`.

- Only `LAUNCH_ENABLED` capabilities may appear as generally available in product marketing.
- A connector may be advertised as beta/conditional only with explicit eligibility and failure limitations.
- `INELIGIBLE`/`DEFERRED` providers cannot be silently substituted with a mock action.
- New external write providers require separate security review and a tracked scope-change request.

## 9. Scope changes and escalation

Every change request must include: change ID, original feature/contract, proposed new behavior, user job/value, evidence, priority, impacted clients, authorization/privacy impact, new acceptance tests, cost/schedule consequences, approver and decision date.

**Normal flow:** Issue → product impact review → Security & Privacy review (if applicable) → cross-platform QA feasibility check → explicit approval/rejection → update this contract, VRT-001 feature matrix, platform parity matrix, release gates, risk register and public feature copy.

**Breaking a MUST:** an unproven or failed MUST remains a **release blocker** until successfully fixed or formally removed from the announced product and re-approved. A silent exception or a “known issue” is not authorization to ship an advertised broken capability.

**No silent scope creep:** connector/provider access, AI autonomy, recording, user-private data sharing and new audience roles cannot be expanded merely via prompt changes.

## 10. Approval record (do not pre-check)

| Decision | Reviewer | Status | Date / link to evidence |
|---|---|---|---|
| Feature scope and exclusions accepted | Product Owner | **PENDING** | — |
| Guest, consent and agent risk boundaries accepted | Security & Privacy Lead | **PENDING** | — |
| Cross-platform feasibility and parity accepted | Cross-platform QA Lead | **PENDING** | — |
| Scope freeze declared | Product Owner | **NOT DECLARED** | — |

**References:** [Release Gates](./RELEASE_GATES.md) · [Parity Matrix](./PLATFORM_PARITY_MATRIX.md) · [Risk Register](./RELEASE_RISK_REGISTER.md)
