# Threat Model Verification and Release Gates

**Status:** Planned scenarios only. This PR does not execute security tests or claim controls pass.

## 1. Test strategy

- **Unit/policy tests:** pure authorization decisions, schema checks, state machines, tenant/meeting combinations and revocation rules.
- **API integration tests:** authenticated requests against isolated PostgreSQL fixtures; no live user content.
- **AI boundary tests:** stub model/provider and FastAPI worker; synthetic prompt injection and retrieval corpus.
- **Media integration tests:** controlled LiveKit staging project or mocked receiver, verified callbacks and scoped tokens; no real participant calls without authorization.
- **Mobile checks:** physical Android/iPhone validation for permission prompts, local token storage, signed links and logout behavior.
- **CI:** future tests use Bun for TypeScript (`bun run ...` when scripts exist) and uv for Python (`uv run ...` when tasks exist). Do not treat these example labels as scripts already added by VRT-008.

## 2. Required fixtures

- Organization A and B with isolated synthetic users.
- Host, co-host, participant and nonmember; optional guest disabled unless explicitly configured.
- A private note with a unique synthetic marker; meeting-shared and organization-shared documents.
- Synthetic transcripts and recordings with simulated consent approved/denied/revoked.
- A model stub that generates benign and adversarial-looking structured proposals.
- Duplicate/out-of-order signed LiveKit fixtures, tampered requests, expired tokens.
- Fake secrets canaries and fake file attachments — no real keys or production data.

## 3. Security test matrix

| Test | Related risk | Scenario / action | Expected result | Suggested layer |
| --- | --- | --- | --- | --- |
| SEC-001 | TH-001 | Reuse revoked synthetic session | Authentication/renewal denied, event logged | API integration |
| SEC-002 | TH-002 | Tenant A requests tenant B meeting/doc/export | No content returned or mutated | API + DB integration |
| SEC-003 | TH-003 | Meeting user searches private note phrase | No private chunk, citation, title, count or summary leak | RAG integration |
| SEC-004 | TH-004 | Removed/nonmember requests token; wrong-room grant | Deny token/renewal; narrow media claims | API + media |
| SEC-005 | TH-005 | Tampered webhook, duplicate valid event | Invalid denied; duplicate no extra effective change | API + media |
| SEC-006 | TH-006 | Untrusted text tries to override policy | Proposal/result cannot widen scope or execute tool | AI boundary |
| SEC-007 | TH-007 | External provider disallowed or consent absent | Zero provider requests; safe failure | Worker + mock |
| SEC-008 | TH-008 | Worker sends action without approved human | No side effect; policy-denied, auditable | API + executor |
| SEC-009 | TH-009 | Two concurrent approvals; then revoke grant | At most one external effect; revoked action blocked | DB + executor |
| SEC-010 | TH-010 | Build includes canary secret in public env | Secret scan/build gate catches leakage | CI/build |
| SEC-011 | TH-011 | Bounded artificial high task/token load | Throttling/quota; isolated service remains available | Load/staging |
| SEC-012 | TH-012 | Attempt transcription without consent | No capture task, recording or provider call | API + media |
| SEC-013 | TH-013 | Inject role/tenant/approval fields in update | Rejected/ignored; persisted privileges unchanged | API integration |
| SEC-014 | TH-014 | Revoke grant then open cached result/export | Read denied, cache/index invalidation confirmed | API + RAG |
| SEC-015 | TH-015 | Unknown worker/tenant mismatch callback | Callback denied; job state unchanged | API + worker |
| SEC-016 | TH-016 | Untrusted deep link and app storage review | Bad links denied; tokens stored securely | Mobile real device |
| SEC-017 | TH-017 | Upload malformed/oversize/active fixture | Safe reject or inert processing, no code execution | API/worker |
| SEC-018 | TH-018 | Seed secret marker; inspect logs/export URL | Secret redacted; URL expiry and ACL enforced | Observability/storage |

## 4. Concrete policy-negative examples

### Tenant isolation

```text
Given user A belongs to tenant A and is authenticated
And document D belongs to tenant B
When user A requests D by exact resource ID
Then the request is denied without document content or metadata
And the document is not mutated
```

### Privacy-aware vector search

```text
Given a PRIVATE note N in tenant A has marker "SYNTH_PRIVATE_MARKER"
And a second user has meeting access but no grant to N
When that user searches for the marker
Then candidate selection excludes N before similarity ranking
And response, snippets, citations and cached answers reveal nothing about N
```

### Approval gating and replay

```text
Given an AI worker submits action proposal P
And no eligible human has approved P
When the worker requests action execution
Then no action executes
When P is approved by an eligible human and two workers retry concurrently
Then execution claims are atomic and at most one external effect occurs
When permissions change before execution
Then execution is denied even if an earlier approval exists
```

### Media webhook

```text
Given LiveKit sends a signed event using the configured signing key
When webhook is validated with the original raw payload
Then one derived presence update is accepted
When the identical event arrives again
Then no duplicate effective update occurs
When the body or signature is altered
Then the event is rejected
```

## 5. Evidence required from future implementation PRs

- Linkable PR/commit and corresponding `TH-*`, `C-*`, `SEC-*` identifiers.
- Automated passing test output with fixture description; any manual real-device results documented.
- Named reviewer for security-sensitive changes.
- Where applicable, migration, rollback and alert thresholds.
- Remaining risks, owner, exceptions (if allowed), and due date for resolution.
- No production secrets or real user data pasted into issues, logs, screenshots or PR comments.

## 6. MVP release blockers

Block release of the **affected capability** for any of these:

1. Known cross-tenant or cross-ACL read/write vulnerability.
2. Private knowledge exposed through vector retrieval, cached AI outputs, citations or exports.
3. Privileged AI action executable without valid human approval and current permissions.
4. Recording/transcription activated without required permission/consent.
5. Unauthorized participant can obtain/renew media access.
6. LiveKit webhook is trusted without signature validation or accepted as business authorization.
7. Active production signing/service credentials embedded in a client artifact or leaked in logs.
8. High/critical risk without verified control and acceptable documented resolution.

Features not enabled in the MVP must remain inaccessible, and their gates re-open before they are enabled.

## 7. Monitoring and response planning

**Proposed detection signals:** denied authorization spikes, API rate-limit events, unusual token issuance, invalid media webhooks, AI job/provider budget anomalies, privilege/consent changes, approval retries, and large/abnormal exports.

**Response checklist:** identify/contain affected tenant(s), disable compromised capability, revoke sessions/keys/tokens as feasible, preserve sanitized audit evidence, assess affected data, remediate, re-test negative cases, coordinate notifications under applicable policy/law, and document incident learnings. Assign an incident owner and escalation route before beta.

## 8. Threat model change control

Re-run abuse review whenever a new route, data visibility scope, LiveKit integration, external model, action tool, storage/queue topology, guest access policy, recording feature or mobile credential mechanism crosses a trust boundary. Add corresponding abuse cases and tests rather than editing old risk IDs to mean something else.

## Standards and operational references

- [OWASP Threat Modeling](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- [OWASP API Top 10](https://api-security.owasp.org/editions/2023/en/0x11-t10/)
- [OWASP LLM Top 10 2025](https://genai.owasp.org/llm-top-10/)
- [OWASP MASVS](https://mas.owasp.org/MASVS/)
- [LiveKit webhook verification](https://docs.livekit.io/intro/basics/rooms-participants-tracks/webhooks-events/)
