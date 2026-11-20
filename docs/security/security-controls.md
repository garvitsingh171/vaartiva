# Proposed Security Controls and Operational Safeguards

**Status:** Target requirements (not implemented in VRT-008). Every control has an identifier to link to [risks](./risk-register.md) and [tests](./verification-plan.md).

## C-001 — Identity, session integrity and revocation

- Verify identity on the Express API using approved credentials, with narrow validity and secure renewal.
- Use secure, HttpOnly cookies for browser sessions where applicable; mitigate CSRF if cookies authorize state changes.
- Store mobile refresh credentials in platform-protected secure storage rather than plain-text async storage.
- Revoke compromised sessions and deny further authorized reads/renewals; define maximum token lifetime and emergency disable strategy.
- MFA for privileged platform/release administration; avoid assuming a valid session is sufficient permission to access any resource.

## C-002 — Backend authorization and input validation

- Implement default-deny decision: principal + current tenant membership + action grant + resource ACL + sensitivity/consent + valid state.
- Reject or omit unapproved input properties; role, organization, user, owner, meeting and approval status are server-owned fields.
- Check resource access on **every** read, write, listing, export, search, share and background operation, not only in navigation UI.
- Return safe 403/404 behavior as chosen by API policy without revealing resource existence through response details.
- Explicit test matrices for `OWNER`, `ADMIN`, `MEMBER`, optional `GUEST`, and `HOST`, `CO_HOST`, `PARTICIPANT`, `INVITED_GUEST` with resource-specific grants.
- Organization roles never implicitly grant access to a member's personal notes.

## C-003 — Tenant isolation and protected persistence

- Include tenant and owner/resource filters in database queries and transactions; use least-privileged service DB users.
- Add database Row-Level Security as defense in depth if operationally supportable; do not depend solely on application-side predicates where they can be bypassed accidentally.
- Record audit metadata for grant changes; protect keys and backups; use parameterized SQL/ORM queries.
- Use explicit status transitions and transactions to prevent time-of-check/time-of-use mutations.

## C-004 — Retrieval, source provenance and revocation

- Restrict vector candidate selection **before top-K ranking** to currently authorized tenant/resource scope.
- Require every chunk/embedding to bind to source resource ID, owning tenant, current visibility and effective permission controls.
- A multi-source output inherits the intersection of source permissions, unless an explicit separately authorized share/declassification occurs.
- Recheck source access when displaying cached answers, citations, previews and exports; avoid exposing forbidden hit counts, titles or snippets.
- Propagate deletion/revocation to search indexes, caches, derived summaries and object URLs according to lifecycle policy; set measurable staleness bounds.

## C-005 — LiveKit access and media grants

- Only a server-side trusted API with secret signing credentials may create participant grants.
- Bind tokens to permitted room, participant identity and necessary publish/subscribe capabilities with short TTL.
- Reauthorize before issuance and renewal; define proactive disconnection or bounded-expiry strategy for revoked users.
- Avoid treating LiveKit presence or room events as proof of business role or lifecycle transition.
- Scope recording/transcription bot permissions separately from participant permissions.

## C-006 — Verified and idempotent media webhooks

- Validate LiveKit webhook's signed `Authorization` token with the official receiver and **original raw request body**; reject tampered bodies.
- Limit endpoint body size; record a deduplication identity and ignore repeated effective events.
- Tolerate delayed/reordered callbacks; reconcile presence against authoritative meeting state without granting membership.
- Do not mark a meeting ended solely because a single client disconnected or a late callback arrived.

## C-007 — Worker boundary, prompt injection and model provider controls

- Authenticate task dispatch and callbacks; bind jobs to exact tenant, resource, user scope, expiry and permitted operation.
- Give FastAPI workers only task-scoped access; no unrestricted organization-admin or database privileges.
- Treat documents, transcripts, chat messages, model responses and retrieved chunks as untrusted data, not instructions for authorization.
- Validate model/worker structured output on API boundaries; model suggestions cannot set resource grants.
- Prevent unapproved external model usage and silent provider fallback; minimize data in model context, remove secrets and maintain provider processing review.
- Apply egress restrictions, task timeouts, quotas and safe error/reporting paths in deployment design.

## C-008 — Consent and media lifecycle

- Maintain server-side consent/policy records for capture and transcription; verify applicable permission immediately before start.
- Treat recording, transcription and external model processing as distinct potential consent/policy checks.
- Re-evaluate consent on participant change/withdrawal and enforce a documented stop/notification workflow.
- Protect transcripts, recordings and clips with `CONFIDENTIAL` classification and `MEETING` or stricter authorized audience as specified in VRT-006.
- Publish a user-readable capture indicator and revocation behavior; do not pretend revocation can delete already downloaded content.

## C-009 — Human-gated, idempotent AI action execution

- Worker returns **proposal only**, never executes a privileged business action directly.
- Persist immutable proposal payload/target/version/hash and `PROPOSED -> PENDING_APPROVAL -> APPROVED -> EXECUTING -> EXECUTED` states.
- Only human principal with specific action grant may approve; recheck permission, consent, state and proposal version at execution time.
- Use atomic claim, per-action idempotency and integration-specific reconciliation for external effects.
- Audit all decisions/attempts/outcomes and expose `FAILED`/uncertain states accurately; never mark `EXECUTED` merely because a job was queued.
- Require additional approval for high-impact actions if future policy demands it.

## C-010 — Logging, audit and incident response

- Structured correlation IDs across API, worker, job, LiveKit event and action execution.
- Monitor denied cross-tenant authorization, unusual token issuance, webhook failures, consent bypass attempts and action execution anomalies.
- Avoid collecting raw private notes, transcript segments, prompts, tokens or API keys in routine logs.
- Restrict and retain audit metadata in line with approved data lifecycle policy; protect from ordinary user edits.
- Define security escalation, containment, secret rotation, session revocation, data-loss assessment and disclosure responsibilities before beta.

## C-011 — Data minimization, storage and retention

- Encrypt data in transit and at rest as applicable; require scoped object URLs and backup access.
- Establish explicit retention periods for recordings, transcripts, derived chunks, job payloads, prompts, logs and backups before launch.
- Enforce deletion of active and derived artifacts, and document what backup expiration or legal retention prevents immediate erasure.
- Apply data export controls (audience check, limited lifetime, audit event, safe content type) and avoid logging exported payloads.

## C-012 — Secret and build hygiene

- Never ship server-side credentials through web or mobile public variables. `EXPO_PUBLIC_*` values are included in the client bundle and cannot be treated as secret; Next.js `NEXT_PUBLIC_*` values follow the same principle.
- Use an approved secret store or protected server environment; rotate credentials after exposure.
- Enable secret scanning and dependency/security review in CI; avoid printing env files in logs.
- Protect Expo EAS project membership, Android keystores, Apple distribution credentials and OTA release permissions with least privilege and MFA.

## C-013 — Abuse resistance, quotas and backpressure

- Per-user, per-tenant and per-route limits for authentication, token issuance, room creation, uploads, knowledge retrieval and AI jobs.
- Bound uploads, context size, queue length, task cost, inference time and concurrency.
- Return deliberate throttling/overload responses and avoid allowing one tenant to exhaust shared processing.
- Monitor AI-provider and media usage budgets; define alert thresholds before exposing unrestricted work.

## C-014 — Mobile client and release security

- Secure session/refresh token storage; minimize sensitive offline caches and expose safe logout behavior.
- Validate deep-link and OAuth redirect targets and avoid forwarding tokens via untrusted URLs.
- Use TLS and platform networking protections; define security review for third-party native modules.
- Separate development/preview/production credentials and channels; restrict signing and update publish rights.
- Verify on actual Android and iPhone devices per VRT-007 plan.

## C-015 — Upload and output safety

- Enforce authenticated upload permission, allowlisted file types, actual content inspection, size caps and storage isolation.
- Use malware scanning/sandboxed processing as applicable for supported types; reject parsers or formats not safely supported.
- Do not execute content inside uploaded documents, render HTML without appropriate sanitization, or pass untrusted markup into privileged tools.
- Apply safe download `Content-Type`/`Content-Disposition`, output encoding and anti-XSS controls.

## Planned implementation guardrails

Each new PR that adds a sensitive flow should identify its applicable `TH-*`, `C-*` and `SEC-*` IDs and attach test evidence. No statement in this document means a feature is already secure or deployed.
