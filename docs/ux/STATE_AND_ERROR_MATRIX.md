# Vaartiva — User Journey State, Failure & Recovery Matrix

> **Issue:** VRT-003 · **Version:** 0.1 · **Prepared:** 2026-11-19  
> **Status:** Proposed UI / server behavior, not implemented or verified.  
> **Owner role:** Cross-platform QA Lead with Product/UX and Security review (assignments pending)

## 1. Common state vocabulary

All clients must distinguish these states where relevant. UI state is a view of **server-authoritative state** for permissions, persistent actions and meeting lifecycle.

| State | Meaning | Required UX contract |
|---|---|---|
| `INITIAL` | Destination resolved but not loaded | Non-sensitive shell with no stale private information |
| `LOADING` | Async request in progress | Accessible progress and cancel/back where appropriate; no infinite unlabeled spinner |
| `EMPTY` | Authorized query returns no records | Explain why empty and offer contextual action |
| `READY` | Server-confirmed usable state | Show permitted data and enabled actions |
| `WAITING` | Pending host admission, schedule start, consent, or approval | Show who/what is pending; safe cancel |
| `DENIED` | Auth or audience check failed | No sensitive existence/details; request permission or go back |
| `EXPIRED` | Invite, session, role, or token no longer valid | Fresh auth/reinvite; never silently reuse stale credentials |
| `UNAVAILABLE` | Provider feature disabled/unreachable/quota-limited | State exact limitation; retain safe core alternatives |
| `DISCONNECTED` | Network/media link lost | Reconnect indication, unsaved edits warning if applicable |
| `RETRYING` | Bounded recovery is in progress | Prevent duplicate mutation and allow exit |
| `PARTIAL` | Only some authorized artifacts generated | Identify missing artifacts without fabricating sources |
| `FAILED` | Operation did not complete | Error, non-sensitive retry, escalation or exit |
| `SUCCEEDED` | Actual durable operation confirmed | Show receipt/ID and accessible next step |
| `UNKNOWN_OUTCOME` | Write request timed out; completion unclear | Query status/idempotency receipt before any retry; don't claim success |

**Sensitive errors:** Prefer a generic *This item is unavailable or you don't have access* for resource existence ambiguity. Backend should still record diagnostic reason securely. Never put secret invite tokens, document text, private metadata or session credentials into client logs/analytics.

## 2. Screen state and exception matrix

| ID | Journey / screen | Trigger | State + user-visible response | User recovery | Server invariant | Owner / gate |
|---|---|---|---|---|---|---|
| SM-01 | UJ-01 / auth callback | No/invalid session | `DENIED`: Sign in to continue | Sign in / change account | No protected API data | Identity / G1 |
| SM-02 | UJ-01 / dashboard | Zero authorized workspaces | `EMPTY`: No workspace yet | Create/request invitation | Never show other orgs | Identity / G1 |
| SM-03 | UJ-01 / dashboard | Membership revoked while open | `DENIED`: Workspace no longer available | Switch workspace/sign in | Recheck every read and write | Security / G1 |
| SM-04 | UJ-01 / session | Authentication expires | `EXPIRED`: Session expired | Sign in and resume validated destination | No stale protected session reuse | Identity / G1 |
| SM-05 | UJ-02 / create meeting | Create request slow/fails | `LOADING` → `FAILED` or `UNKNOWN_OUTCOME` | Check existing meeting before safe retry | Duplicate-safe creation strategy | Meetings / G2 |
| SM-06 | UJ-02 / room join | Room at human capacity | `DENIED`: Room full | Wait/retry later / contact host | 3–6-human capacity enforced server-side | Meetings / G2 |
| SM-07 | UJ-02 / prejoin | Microphone denied | `DENIED`: Mic off; permission instructions | Request permission / enter as permitted listen-only | Never claim mic active | Media / G2 |
| SM-08 | UJ-02 / prejoin | Camera unavailable | `UNAVAILABLE`: Camera off | Reconnect device / join with camera off | Do not fabricate video track | Media / G2 |
| SM-09 | UJ-02 / join | Ended/nonexistent meeting | `DENIED`: Meeting unavailable | Return to dashboard / request link | No room token issued | Meetings / G2 |
| SM-10 | UJ-03 / schedule | Date/zone invalid, DST ambiguity | `FAILED`: Review date/time | Re-enter time, preview local+zone | Persist canonical timestamps/recurrence | Meetings / G2 |
| SM-11 | UJ-03 / schedule | Occurrence canceled/edited | `EXPIRED`: This session changed | Open updated invite / contact host | No silent different occurrence join | Meetings / G2 |
| SM-12 | UJ-04 / guest link | Invitation expired/revoked/unknown | `EXPIRED` or generic `DENIED` | Request new invitation | No guest token/private metadata | Identity / G1–G2 |
| SM-13 | UJ-04 / admission | Host not yet admitted | `WAITING`: Waiting for host | Cancel/leave; bounded timeout | No pre-admission media/private records | Identity / G2 |
| SM-14 | UJ-04 / admission | Host rejects or admission expires | `DENIED`: Unable to join | Ask host / leave | No room token; minimize reason disclosure | Identity / G2 |
| SM-15 | UJ-04 / guest | Guest accesses private workspace/recap | `DENIED`: Not shared with you | Request explicit share if allowed | No unauthorized retrieval or artifact | Security / G1–G6 |
| SM-16 | UJ-05 / chat | Message send disconnected | `DISCONNECTED` / `FAILED`: Not sent | Retry after reconnect; avoid duplicates | Delivery status from server only | Collaboration / G2 |
| SM-17 | UJ-05 / shared notes | Offline conflicting edit | `PARTIAL`: Changes not synced | View/reconcile/retry when online | No silently discarded or fictitiously saved edit | Collaboration / G3 |
| SM-18 | UJ-05 / share | Android/iOS OS denies broadcast | `DENIED`: Screen share not started | OS permissions/help / retry / view others | No false share indicator | Media / G2 |
| SM-19 | UJ-05 / whiteboard/poll | Insufficient role | `DENIED`: View-only | Request role / continue view | Unauthorized mutation rejected | Collaboration / G3 |
| SM-20 | UJ-06 / STT | Participant declines consent | `READY` human call; STT off for that speaker | Optional consent later | That track must not enter STT | Voice + Security / G4 |
| SM-21 | UJ-06 / STT | Consent withdrawn mid-session | `READY` call; speaker STT stops | Re-consent explicitly, if desired | Future capture stops and is recorded | Voice + Security / G4 |
| SM-22 | UJ-06 / AI | AI quota/time-out/service outage | `UNAVAILABLE`: AI unavailable; humans can continue | Typed/manual collaboration, retry later | No fake response; call independent | AI / G4 |
| SM-23 | UJ-06 / AI | Unauthorized guest invokes private agent | `DENIED`: Not permitted | Ask room-visible question within role | No private model input/output leak | AI + Security / G5 |
| SM-24 | UJ-06 / AI | AI busy processing another voice turn | `WAITING` or `FAILED`: AI busy | Retry/cancel request | One active spoken turn as proposed | AI / G4 |
| SM-25 | UJ-06 / AI | User cancels ongoing answer | `FAILED`/`CANCELED`: Response stopped | New explicit request | Stop where supported; no unapproved write | AI / G4 |
| SM-26 | UJ-07 / documents | File too large/unsupported | `FAILED`: Unsupported file | Select allowed file, see restrictions | No indexing claim | Knowledge / G4 |
| SM-27 | UJ-07 / documents | Indexing fails | `FAILED`: Could not process document | Owner retries/removes safely | Source status remains accurate | Knowledge / G4 |
| SM-28 | UJ-07 / RAG | No accessible supporting evidence | `EMPTY`: No supported answer found | Share permitted source or rephrase | No fabricated answer/page/citation | Knowledge / G4 |
| SM-29 | UJ-07 / citation | Grant removed after answer | `DENIED`: Source unavailable | Ask owner for access | Re-check citation access on open | Security / G4 |
| SM-30 | UJ-08 / decision | AI proposes without human confirmation | `WAITING`: Proposed decision | Authorized human confirm/edit | Never display as confirmed automatically | Collaboration / G3 |
| SM-31 | UJ-08 / action | Approver rejects | `SUCCEEDED` rejection: No task created | Return to notes / edit proposal | Zero write side effects | Actions / G5 |
| SM-32 | UJ-08 / action | Double-tap approval or network timeout | `UNKNOWN_OUTCOME`: Checking result | Status lookup; bounded retry | Idempotency, at most one task | Actions / G5 |
| SM-33 | UJ-08 / action | Backend rejects unauthorized mutation | `DENIED`: Approval no longer valid | Refresh and request authorized approver | Fresh authorization on execute | Actions / G5 |
| SM-34 | UJ-08 / action | Real task created | `SUCCEEDED`: Task ID linked | Open task; continue | Persisted ID and audit trail exist | Actions / G5 |
| SM-35 | UJ-09 / recap | Summarization in progress | `LOADING`: Recap preparing | Return later / view existing allowed notes | No phantom summary | Collaboration / G4 |
| SM-36 | UJ-09 / recap | No consented transcript | `EMPTY`: No transcript available | Review manually authored content | No unauthorized STT or synthetic transcript | Security / G4 |
| SM-37 | UJ-09 / recap | Some sections fail generation | `PARTIAL`: Some sections unavailable | Review remaining valid artifacts / retry allowed | Clear provenance and incomplete status | Collaboration / G4 |
| SM-38 | UJ-10 / connector | Provider ineligible/unconnected | `UNAVAILABLE`: Integration not enabled | Connect when eligible / internal task workflow | No fake external action | Integrations / G5 |
| SM-39 | UJ-10 / private AI | Private response accidentally targeted room | `DENIED`: Cannot share without review | Show audience preview and authorization | Output audience check before publish | AI + Security / G5 |
| SM-40 | UJ-11 / reconnect | Network loss or mobile app background | `DISCONNECTED` → `RETRYING` | Rejoin after fresh token; exit safely | No revoked access restored | Media / G2/G6 |
| SM-41 | UJ-12 / delete | Deletion started but not confirmed | `LOADING` / `UNKNOWN_OUTCOME` | Check operation status; avoid false completed claim | Data lifecycle policy applied across stores/indexes | Security / G6 |
| SM-42 | UJ-12 / access | Owner revokes guest mid-call | `DENIED`: Access removed | Leave / request reinvite | Stop new tokens and enforce active-session removal policy | Security / G2/G6 |

## 3. Cross-cutting error presentation rules

- **Clarity:** State what failed, whether the user's work was saved, and a specific next step. Do not display provider stack traces or private server details.
- **Accessibility:** All state changes announced appropriately to assistive technology; focus moves to actionable error summary for blocking failures; controls reachable with keyboard, screen reader and touch.
- **Retry safety:** Reads can use bounded retry; writes require server-side idempotency keys and status reconciliation after `UNKNOWN_OUTCOME`.
- **Offline:** Humans cannot be promised an ongoing real-time call while disconnected. Show connection state, preserve only clearly marked local drafts, and synchronize after authorization.
- **Consistency:** Same error meaning and enforced rights on web/Android/iOS; operating-system permission tutorials may differ.
- **No false success:** A requested task, invite, deletion, source upload or external action is complete only after authoritative confirmation.
- **No unauthorized exposure:** Error screens, notifications, previews, deep links and telemetry must not disclose guest-inaccessible titles, snippets, user-private actions or tokens.

## 4. Adversarial and quality test scenarios

| QA scenario | Preconditions | Action | Expected outcome | Linked states / gate |
|---|---|---|---|---|
| QA-01 | External invite revoked | Open on Android, then iOS, then web | All fresh joins fail without private metadata | SM-12/SM-42 · G1–G2 |
| QA-02 | Guest joined allowed room | Ask AI for private host price ceiling | No private content in speech, text, citation or logs | SM-15/SM-23/SM-39 · G5 |
| QA-03 | Five humans + AI active | Sixth human joins from other client | Human capacity baseline preserved | SM-06 · G2 |
| QA-04 | One participant refuses STT | Speak while others consent | Refuser audio absent from STT path | SM-20 · G4 |
| QA-05 | Consenting participant withdraws | Continue speaking | No future audio from that speaker processed | SM-21 · G4 |
| QA-06 | AI times out | Participants continue screen share and chat | Human room remains functional; AI unavailable shown | SM-22 · G4 |
| QA-07 | Owner approves task over flaky link | Double-submit, re-open recap | Exactly one persisted task; real ID/status returned | SM-32/SM-34 · G5 |
| QA-08 | Guest has no recap grant | Open guessed recap URL or push/deep link | Denied consistently across three clients | SM-15 · G3/G6 |
| QA-09 | Document shared then revoked | Reopen citation from old AI answer | Source access denied; old content not newly fetched | SM-29 · G4 |
| QA-10 | Native app not installed | Open guest invitation from message | Web join path functional, no forced install | SM-12–SM-14 · G2 |
| QA-11 | Android/iOS screen sharing underway | Revoke native OS broadcast permission | Share ends accurately; no false broadcast status | SM-18 · G2 |
| QA-12 | Meeting ended by host | Backgrounded phone reconnects | Cannot rejoin ended room; correct ended state | SM-09/SM-40 · G2 |
| QA-13 | Workspace membership removed | Open cached meeting/task screen | Authorization rechecked; no stale private data | SM-03/SM-40 · G1/G6 |
| QA-14 | No transcript consent at all | Open post-meeting recap | Explicit no-consented-transcript; permitted manual notes only | SM-36 · G4 |

## 5. Acceptance evidence template (to fill during implementation)

| Scenario ID | Platform/device | Build SHA | Role + consent | Actual outcome | PASS/FAIL/BLOCKED | Evidence link | Defect |
|---|---|---|---|---|---|---|---|
| _(pending)_ | — | — | — | **No tests executed in VRT-003** | — | — | — |

**Traceability:** feature codes F01–F17 and gates G0–G6 originate from VRT-001/VRT-002; journey IDs UJ-01–UJ-12 from [USER_JOURNEYS.md](./USER_JOURNEYS.md); diagram IDs FD-01–FD-08 from [USER_FLOW_DIAGRAMS.md](./USER_FLOW_DIAGRAMS.md). This document is a design-time test inventory, not a QA completion report.
