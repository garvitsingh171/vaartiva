# Privacy and AI Consent Verification Plan

**Status:** Test plan only — no tests run or controls implemented by VRT-010.

## 1. Test strategy

Use isolated synthetic tenants, two users with different grants, a host, a nonmember, a new joiner, and a stub LiveKit/AI provider. Use no real participant recordings, credentials, or private documents. Exercise policy logic through unit tests, Express/DB integration tests, FastAPI worker/provider stubs, and end-to-end real-device scenarios (Android and iPhone).

Future JavaScript/TypeScript test scripts must use **Bun** (`bun run ...`); FastAPI/Python tests use **uv** (`uv run ...`). This docs-only PR adds neither scripts nor dependencies.

## 2. Consent and capture negative tests

| ID | Scenario | Required result | Proposed test layer |
| --- | --- | --- | --- |
| PRIV-001 | Host enables recording without any participant grant | Capture denied; zero provider start calls | API + mock LiveKit |
| PRIV-002 | One participant denies recording | Room-wide capture blocked; normal call can continue | API + media |
| PRIV-003 | Recording allowed but transcription denied | Recording must not start transcription | API + worker |
| PRIV-004 | AI listener requested without applicable consent | No agent media subscriptions or provider request | API + worker |
| PRIV-005 | New participant joins active recording without consent | Capture paused or provably excludes their tracks before publication | Media integration |
| PRIV-006 | Participant withdraws during capture | Future affected capture/model processing stopped; audited | API + media + worker |
| PRIV-007 | Start races with withdrawal | Latest committed withdrawal wins; no unauthorized ACTIVE state | Concurrency/integration |
| PRIV-008 | Device reconnect/resume after withdrawal | No automatic re-grant | Mobile + API |
| PRIV-009 | AI listening allowed, AI speech muted | No synthesized speech; listening still subject to consent | Worker + media |
| PRIV-010 | AI can speak but only private source matches question | No private content voiced into meeting | RAG + media |
| PRIV-011 | Provider changes after consent | Old consent invalid for materially changed use; explicit re-consent | API + provider stub |
| PRIV-012 | Unapproved external model fallback attempted | Block request; no data leakage | Worker + network stub |
| PRIV-013 | User uploaded doc contains consent override prompt injection | Untrusted content has no policy effect | Worker + API |
| PRIV-014 | Two concurrent start requests | Only one effective recording/egress session | API + media |
| PRIV-015 | Stop API fails, but egress still active | No false STOPPED status; containment + alert | Media + reconciliation |

## 3. Retention, deletion, and audit tests

| ID | Scenario | Required result | Proposed test layer |
| --- | --- | --- | --- |
| PRIV-016 | Recording exceeds approved expiry | Read denied; deletion job scheduled and verified | API + object storage |
| PRIV-017 | Private source deleted after embeddings generated | No vector hit, cache leak, or AI response disclosure | DB/pgvector + AI |
| PRIV-018 | Mixed-source summary loses one source grant | Summary denied/invalidated until safely regenerated | API + RAG |
| PRIV-019 | User deletes account | Sessions invalidated; request tracked; shared artifacts reviewed | API + DB |
| PRIV-020 | Deleted data appears in restored backup | Tombstone replay blocks reads before service resumes | Recovery drill |
| PRIV-021 | Provider deletion fails | PARTIAL/FAILED, retry and owner alert; not COMPLETED | Provider stub |
| PRIV-022 | Unauthorized tenant requests deletion/export | Denied, with no existence/content leak | API integration |
| PRIV-023 | Archived log contains secret or transcript body | Privacy/secret scanning flags noncompliant telemetry | Observability |
| PRIV-024 | Consent notice version changes materially | Re-consent required for affected processing | API + UI |
| PRIV-025 | Deleted source still linked by an old signed export URL | Denied or URL revoked as applicable; never promise inaccessible already-downloaded copies | Storage integration |

## 4. End-to-end dry runs

### Scenario A — a silent meeting becomes a recorded meeting

1. Host requests recording; UI shows AWAITING_CONSENT for affected participants.
2. One participant declines. Verify no LiveKit egress is created.
3. Participant changes decision to grant with the required notice. Server recomputes effective consent and may start egress.
4. A late joiner appears without a recording grant. Recording pauses (or reliably excludes joiner if implemented and validated).
5. Participant withdraws while the host is mid-sentence. Stop processing future affected contributions, invalidate dependent queued work, and record state change. Verify no hidden resumption after reconnect.

### Scenario B — private knowledge meets shared AI

1. User A holds a PRIVATE note and has a meeting-shared document; user B participates in same meeting.
2. AI is authorized to produce a meeting summary from permitted meeting content, not A's private note.
3. A similar private note matches semantic search; verify pre-ranking ACL filters exclude it and that no citation/snippet/cache metadata escapes.
4. If A withdraws an applicable consent or deletes a source, previously materialized outputs dependent on that source are invalidated/restricted and examined for deletion.

### Scenario C — removal across stores

1. An authorized user submits deletion of an allowed transcript.
2. Express atomically denies future reads and schedules cascading delete work.
3. Remove transcript, chunks, embeddings, applicable summaries and caches, then verify provider objects.
4. Simulate cloud storage deletion failure; ensure status remains PARTIAL with recorded retry.
5. Replay an old backup; ensure deny-access tombstones are applied before restored content can be exposed.

## 5. Release gates

| Gate | Requirement | Evidence required |
| --- | --- | --- |
| PRIV-GATE-01 | Published/applicable notice, lawful processing basis, purposes and current approved privacy policy | Product/privacy approval and versioned notices |
| PRIV-GATE-02 | Recording and transcription off by default | Config audit + negative tests |
| PRIV-GATE-03 | Consent requirements verified server-side for each feature | PRIV-001 to PRIV-008, 011, 014-015 |
| PRIV-GATE-04 | AI provider/knowledge boundary enforces least privilege and no training use | PRIV-009 to PRIV-013, 017-018 |
| PRIV-GATE-05 | Withdrawal cancels future processing, including retries/reconnects | State/concurrency and provider traces |
| PRIV-GATE-06 | Retention schedule and exceptions have named approval | Signed schedule, implementation config and expiry tests |
| PRIV-GATE-07 | Deletion cascades to object storage, embeddings, caches and provider copies | PRIV-016 to PRIV-021, 025 |
| PRIV-GATE-08 | Account deletion/access rights UX and store disclosures implemented | Physical Android/iPhone checks and policy reviewer sign-off |
| PRIV-GATE-09 | Backups and holds cannot silently resurrect or overretain deleted content | Restore drill, hold review procedure |
| PRIV-GATE-10 | Consent/processing indicators and accessibility work on real devices | Real-device video of synthetic test, without private data |
| PRIV-GATE-11 | No raw content/secrets in normal diagnostic logs | Structured-log sample review, PRIV-023 |
| PRIV-GATE-12 | Legal and vendor processing review completed in each launch region | Dated decision log; signed provider obligations |

A failing **critical consent or cross-tenant privacy test** blocks the affected feature. An unknown result is not a pass. These gates extend VRT-008 `SEC-003`, `SEC-007`, `SEC-012`, `SEC-014` and VRT-009 `NFR-10`.

## 6. Evidence template

```text
Scenario or gate ID:
Environment and build:
Timestamp (UTC):
Test participants: synthetic IDs only
Data purpose / scope / policy version:
Expected behavior:
Observed outcome (PASS | FAIL | UNKNOWN):
Provider and DB evidence reference (redacted):
Owner / follow-up issue:
```
