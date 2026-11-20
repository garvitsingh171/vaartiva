# Vaartiva Abuse-Case Catalogue

**Status:** Draft. These are illustrative failure/misuse cases, not demonstrated vulnerabilities. Use only synthetic accounts, isolated test fixtures and authorized staging systems for verification. No real private meeting data is needed.

Each case maps to a risk (`TH-###`), proposed control (`C-###`) and validation (`SEC-###`). Threat actors are modeled capabilities, not real identities.

## Identity, authorization and private information

### AC-001 / TH-001 — Compromised or replayed session
- **Actor / entry point:** An attacker who obtains a user's session token; browser or mobile authentication API.
- **Preconditions:** A token leaks or remains valid after account/session compromise.
- **Abuse path:** An attacker attempts user-scoped requests or token renewal as the victim.
- **Impact:** Unauthorized meeting and confidential content access.
- **Boundary / STRIDE:** TB-1 -> TB-2; Spoofing, Information disclosure.
- **Controls:** C-001, C-010. Secure credential storage, session revocation and audit signals.
- **Safe verification:** SEC-001 — revoke a synthetic session and confirm subsequent access and renewal fail.

### AC-002 / TH-002 — Cross-tenant object access
- **Actor / entry point:** Signed-in user in tenant A calling an API with tenant B's meeting/document ID.
- **Preconditions:** Guessable/known resource ID; incomplete object-level authorization.
- **Abuse path:** Read or update a resource outside the caller's tenant.
- **Impact:** Confidentiality or integrity breach across organizations.
- **Boundary / STRIDE:** TB-1 -> TB-2 -> TB-3; Elevation of privilege, Information disclosure.
- **Controls:** C-002, C-003. Tenant + ACL checks on each endpoint and query.
- **Safe verification:** SEC-002 — tenant-A user cannot read/edit/export B's resource, even when IDs are supplied.

### AC-003 / TH-003 — Private knowledge exposed by AI or derived summary
- **Actor / entry point:** Authorized meeting participant querying AI for content they were not granted.
- **Preconditions:** Retrieval searches global chunks or previously cached output ignores source ACLs.
- **Abuse path:** A private note appears in a meeting-shared summary, citation or semantic search hit.
- **Impact:** Private content/metadata leakage.
- **Boundary / STRIDE:** TB-2 -> TB-3 -> TB-4; Information disclosure.
- **Controls:** C-002, C-004, C-007. Pre-ranking filters, provenance, effective permission intersection.
- **Safe verification:** SEC-003 — place a distinctive synthetic phrase in a private note; assert no result/snippet/title/hit count leaks to meeting members.

## Media and consent

### AC-004 / TH-004 — Unauthorized LiveKit room join
- **Actor / entry point:** Former meeting participant or outsider requesting a media token.
- **Preconditions:** Token issuance lacks membership checks, token grants are excessive or reauthorization is missing.
- **Abuse path:** Join or publish media in another meeting.
- **Impact:** Media eavesdropping, disruption and confidentiality loss.
- **Boundary / STRIDE:** TB-1 -> TB-2 -> TB-5; Spoofing, Information disclosure.
- **Controls:** C-005. Server issuance, room/capability-bound short-lived tokens and revocation strategy.
- **Safe verification:** SEC-004 — unauthorized/removed user denied token and renewal, token cannot grant broader room capabilities.

### AC-005 / TH-005 — Forged/replayed LiveKit webhook
- **Actor / entry point:** External caller replaying or forging a participant event.
- **Preconditions:** Missing raw-body signature verification, idempotency or event ordering checks.
- **Abuse path:** Force incorrect presence or duplicate meeting events.
- **Impact:** State inconsistency, inaccurate audit and secondary logic abuse.
- **Boundary / STRIDE:** TB-5 -> TB-2; Spoofing, Tampering.
- **Controls:** C-006. Verify signed webhook, dedupe events, reconcile derived presence.
- **Safe verification:** SEC-005 — unsigned/tampered webhook fails; valid duplicate remains single effective update.

### AC-012 / TH-012 — Recording/transcription without required consent
- **Actor / entry point:** Host, worker or misconfigured bot enables capture despite missing consent.
- **Preconditions:** Capture authorization is conflated with meeting join permission.
- **Abuse path:** Produce, retain or send raw media/transcripts without effective permission/consent.
- **Impact:** Severe privacy impact and possible legal/regulatory consequences.
- **Boundary / STRIDE:** TB-2 -> TB-5 -> TB-4/6; Information disclosure.
- **Controls:** C-008, C-011. Consent state machine, bot capability gating, data lifecycle controls.
- **Safe verification:** SEC-012 — no recording/transcription/export job starts for fixture missing required consent; revoke and observe stop policy.

## AI assistance, retrieval and actions

### AC-006 / TH-006 — Prompt injection in meeting transcript or uploaded document
- **Actor / entry point:** Participant inserts instructions into a transcript, chat message or document.
- **Preconditions:** Model treats retrieved content as system policy/tool authorization.
- **Abuse path:** Untrusted text steers a summary, attempts data disclosure or suggests an unauthorized action.
- **Impact:** Manipulated results, privacy leakage or attempted privileged effect.
- **Boundary / STRIDE:** Upload/AI processing; Tampering, Elevation of privilege.
- **Controls:** C-007, C-009. Untrusted-content isolation, schema validation, action allowlist and human approval.
- **Safe verification:** SEC-006 — neutral synthetic instruction embedded in a document cannot change policy, sharing scope or action execution.

### AC-007 / TH-007 — External AI provider receives unauthorized content
- **Actor / entry point:** Misconfigured worker or fallback provider integration.
- **Preconditions:** Missing provider allowlist, organization policy or consent validation.
- **Abuse path:** Private transcript or sensitive prompt context leaves an approved processing boundary.
- **Impact:** Confidential information disclosure and retention concerns.
- **Boundary / STRIDE:** TB-4 -> TB-6; Information disclosure.
- **Controls:** C-007, C-011. Provider approval, data minimization, no silent fallback.
- **Safe verification:** SEC-007 — deny external processing with disallowed provider/consent and assert zero outbound requests via stub.

### AC-008 / TH-008 — AI tool executes action without human approval
- **Actor / entry point:** Malicious prompt or worker callback provides an action command.
- **Preconditions:** API assumes worker output is permission to mutate resources.
- **Abuse path:** Change meeting settings or send an integration action directly.
- **Impact:** Unauthorized modification or external side effect.
- **Boundary / STRIDE:** TB-4 -> TB-2 -> executor; Elevation of privilege, Tampering.
- **Controls:** C-009. Proposal-only worker, immutable action binding, authorized human approval, controlled executor.
- **Safe verification:** SEC-008 — model result alone cannot invoke executor; wrong approver/target rejected.

### AC-009 / TH-009 — Approval replay or time-of-check/time-of-use gap
- **Actor / entry point:** Client retries approval, or a permission changes between approval and execution.
- **Preconditions:** Missing idempotency claim or execution-time recheck.
- **Abuse path:** Duplicate side effect or execute after authority is revoked.
- **Impact:** Repeated notifications/integrations or unauthorized mutation.
- **Boundary / STRIDE:** TB-2 -> executor; Tampering, Repudiation.
- **Controls:** C-009, C-010. Exact proposal/version binding, atomic claim and external reconciliation.
- **Safe verification:** SEC-009 — two concurrent approve/execute requests cause at most one effect; revoked access blocks pending action.

### AC-014 / TH-014 — Stale cache or vector index after permission revocation
- **Actor / entry point:** Former member queries stored AI response or cached search result.
- **Preconditions:** Index/cache does not re-evaluate access at read time.
- **Abuse path:** Continue receiving revoked content through old summary, URL or embedding result.
- **Impact:** Persistent confidentiality breach despite sharing revocation.
- **Boundary / STRIDE:** TB-2 -> TB-3; Information disclosure.
- **Controls:** C-003, C-004, C-011. Recheck on read, invalidation workflow and bounded cache staleness.
- **Safe verification:** SEC-014 — revoke resource grant, then assert old answer, citation, search, export and URL are denied where controlled.

### AC-015 / TH-015 — Forged AI worker callback or poisoned job
- **Actor / entry point:** Caller posts fabricated worker result or changes queue task scope.
- **Preconditions:** Unauthenticated callbacks, weak workload identity or unvalidated result schema.
- **Abuse path:** Inject false summary, exfiltrate task data or bypass proposal validation.
- **Impact:** Content tampering, access expansion or action confusion.
- **Boundary / STRIDE:** TB-2 <-> TB-4; Spoofing, Tampering.
- **Controls:** C-007, C-010. Authenticated workload identity, signed/scoped task metadata, schema validation.
- **Safe verification:** SEC-015 — unknown identity and mismatched job/tenant/resource IDs are rejected.

## Platform operations, availability and integrations

### AC-010 / TH-010 — Server secret embedded in client build
- **Actor / entry point:** Anyone who can inspect shipped browser/mobile bundle or environment values.
- **Preconditions:** Service key added to `EXPO_PUBLIC_*`, Next.js public variables or bundled config.
- **Abuse path:** Extract reusable API/LiveKit signing credentials.
- **Impact:** Broad impersonation and provider abuse.
- **Boundary / STRIDE:** Server -> client; Information disclosure, Spoofing.
- **Controls:** C-012. Secret inventory, CI secret scanning, deny public bundle leakage.
- **Safe verification:** SEC-010 — inspect synthetic build artifacts for canary secret; scanning/build gates fail if present.

### AC-011 / TH-011 — Meeting or AI task exhaustion
- **Actor / entry point:** Automated API requests to meeting-create, token, upload or AI job endpoints.
- **Preconditions:** Missing per-user limits, cost budgets, upload bounds or worker backpressure.
- **Abuse path:** Flood tokens, transcription requests or expensive model jobs.
- **Impact:** Outage, cost spikes, degraded meetings.
- **Boundary / STRIDE:** TB-1 -> TB-2/4/5; Denial of service.
- **Controls:** C-013. Rate limits, quotas, concurrency caps, job timeouts and alerting.
- **Safe verification:** SEC-011 — bounded synthetic load yields controlled 429/queue rejections without disrupting isolated service.

### AC-013 / TH-013 — Role or object-property mass assignment
- **Actor / entry point:** Normal user sends extra `role`, `tenantId`, `isHost` or `approved` fields.
- **Preconditions:** API writes untrusted object fields without explicit allowlist.
- **Abuse path:** Elevate privileges or change approval status via an unrelated update route.
- **Impact:** Unauthorized privilege/function access.
- **Boundary / STRIDE:** TB-1 -> TB-2; Tampering, Elevation of privilege.
- **Controls:** C-002. Strict schemas, assignable-field allowlists and server-owned identifiers.
- **Safe verification:** SEC-013 — privileged extra fields are ignored or rejected, persistent role and approval state unchanged.

### AC-016 / TH-016 — Mobile credential/deep-link or build pipeline abuse
- **Actor / entry point:** Stolen device, malicious app link or compromised build identity.
- **Preconditions:** Insecure token storage, unvalidated redirect, overly broad EAS permissions.
- **Abuse path:** Recover stored credentials or redirect auth flow to untrusted destination.
- **Impact:** Session theft or compromised client distribution.
- **Boundary / STRIDE:** Device/identity/build; Spoofing, Tampering.
- **Controls:** C-012, C-014. Platform secure storage, deep-link validation, least privilege, MFA and signing controls.
- **Safe verification:** SEC-016 — deep links reject untrusted destination; staging device credential handling and build access reviewed.

### AC-017 / TH-017 — Malicious attachment processing
- **Actor / entry point:** User uploads malformed, oversized or active-content file.
- **Preconditions:** Weak type/size checks or privileged parsing/conversion process.
- **Abuse path:** Trigger unsafe rendering, parser compromise or persistent malicious output.
- **Impact:** Stored XSS, worker compromise, data exfiltration or denial of service.
- **Boundary / STRIDE:** Upload -> API/worker/storage; Tampering, Denial of service.
- **Controls:** C-015. Type validation, size quotas, safe conversion, sandbox scanning as applicable, output encoding.
- **Safe verification:** SEC-017 — controlled fixtures rejected or safely rendered without script execution.

### AC-018 / TH-018 — Sensitive data exposed through logs, exports or backups
- **Actor / entry point:** Developer, support tool, leaked backup or overly broad export endpoint.
- **Preconditions:** Raw prompts/tokens recorded, unrestricted export URL, uncontrolled backup access.
- **Abuse path:** Read confidential meeting information outside expected resource ACL.
- **Impact:** Large data disclosure and retention-policy failure.
- **Boundary / STRIDE:** API -> observability/storage; Information disclosure, Repudiation.
- **Controls:** C-010, C-011. Field redaction, scoped access, retention, encrypted backups and audit events.
- **Safe verification:** SEC-018 — seeded secret marker absent from logs; expired/scope-revoked export URLs deny access; access audit recorded.

## Interpretation

- **Preconditions are hypotheses** to prevent, not evidence that Vaartiva currently has these vulnerabilities.
- Case order is grouped by subsystem; **risk priority** is defined separately in [risk-register.md](./risk-register.md).
- There is no exploit proof-of-concept in this PR. Implementation teams should add tests using synthetic fixtures before release.
