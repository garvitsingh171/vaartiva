# Data Lifecycle, Retention and Deletion Policy

**Status:** Proposed guardrails; specific durations require approval before production launch.

## 1. Scope

Covers meeting metadata, media recordings, transcripts, notes, attachments, embeddings, AI prompts/results, approvals, audit metadata, exports, caches, and backups.

## 2. Retention schedule: decisions not yet finalized

| Data category | Default visibility/sensitivity | Retention period | Deletion trigger / treatment |
| --- | --- | --- | --- |
| Meeting metadata | Meeting / Internal | **TBD** | Meeting deletion or policy expiry; preserve minimum required audit evidence |
| Meeting recordings | Meeting / Confidential | **TBD** | Consent/policy expiry or authorized deletion; storage deletion needed |
| Transcripts | Meeting / Confidential | **TBD** | Policy expiry or authorized deletion |
| Private notes and uploads | Private / Confidential | **TBD** | Owner request, account/tenant policy, lawful holds |
| Chunks / embeddings | Same as source | Must not outlive authorized source policy | Delete or revoke when source is deleted/restricted |
| AI summaries / proposals | Source-derived | **TBD** | Source revocation/deletion and policy expiry |
| Logs / audit evidence | Security restricted | **TBD** | Security/legal schedule with access restrictions |
| Backups / disaster recovery | Source-derived | **TBD** | Scheduled expiry and verified restore controls |

Do **not** put guessed fixed-day TTLs in production configuration. Resolve each schedule with product, security, operations, and applicable legal requirements before launch.

## 3. Consent and capture

- Meeting attendance does not by itself authorize recording or transcription.
- Before capture, enforce meeting policy, permissions, and required participant notice/consent.
- Track consent scope, actor/participant, timestamp, version, and withdrawal.
- On consent changes, stop or adjust ongoing processing as the selected consent model requires.
- Do not infer that past captured data can always be deleted immediately when other retention obligations exist; define the lawful/contractual process.

## 4. Deletion process

1. Authenticate and authorize the deletion requester.
2. Evaluate retention, hold, and organization policy.
3. Record request and start a tracked deletion workflow.
4. Remove or restrict the authoritative resource and public references.
5. Cascade to recordings/object storage, transcript segments, chunks, embeddings, caches, and derivative artifacts as required.
6. Revoke signed URLs, share grants, or access tokens where supported.
7. Verify completion; record failures and retries without copying deleted content into logs.
8. Let backups expire or undergo documented deletion/reconciliation in line with the approved recovery/retention schedule.

If deletion is asynchronous, report `PENDING` until independently verified, not `COMPLETED` at enqueue time.

## 5. Audit event policy

Recommended structured metadata:

`event_id`, `timestamp`, `actor_id/service_id`, `tenant_id`, `resource_id`, `action`, `decision`, `policy_version`, `request_id`, `reason_code`, `execution_result`.

- Minimize payload content; never log auth tokens, private document bodies, raw model context, or API secrets by default.
- Restrict who can read audit logs and monitor suspicious access.
- Protect audit integrity and define its retention schedule separately from end-user content.

## 6. Access revocation

- Block future reads/search/exports immediately at the authoritative API gate after policy commit, subject to the system's defined cache consistency behavior.
- Expire/invalidate pre-signed URLs and cached results where possible.
- Media tokens may require explicit participant disconnection until their short TTL expires.
- Copies a recipient previously downloaded may not be technically retractable; user-facing language must avoid claiming otherwise.

## 7. Production release blockers

- Documented per-category retention periods and backup expiry.
- Validated consent behavior and legal/privacy review where needed.
- Reliable cascade deletion including pgvector indexes and object storage.
- Authorized privacy request workflow and exception handling.
- Documented recovery and operational verification processes.
