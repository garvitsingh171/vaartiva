# Data Retention Schedule

**Status:** Draft retention proposals for controlled beta; not configured or legally approved.  
**Related:** [VRT-006 lifecycle policy](../policies/retention-and-deletion.md), [deletion workflow](./deletion-and-privacy-requests.md).

## 1. Principles

- Collect the minimum necessary data, bind every artifact to its owner/tenant/meeting, purpose and source provenance, and define the deletion trigger at creation.
- Retention means an upper bound **after a stated trigger**; not a guarantee of retaining data for that long.
- More restrictive source/consent/organization rules prevail, subject to lawful preservation duties. Reclassification to shared does not reset the retention clock automatically.
- Derived artifacts (chunks, embeddings, summaries, cached results, exports under Vaartiva control) must not outlive the authorization/retention of their contributing source without a separately approved processing basis and permissions.
- Cross-tenant isolation and immediate read-denial are security controls; physical deletion may be asynchronous with separately tracked verification.
- Do not enter these numbers in TTL jobs or production terms until the decision log records sign-off and provider feasibility checks.

## 2. Proposed controlled-beta schedule

All numbers below are **product proposals requiring sign-off**; they are not statutory requirements.

| Data class / initial scope | Proposed lifetime / trigger | Storage / disposal requirement | Decision status |
| --- | --- | --- | --- |
| Live media streams (not recorded) | No intentional persistent media storage; transient transport buffers only | Media transport; prohibit unapproved recording, diagnostics capture, or third-party persistence | Proposed |
| Meeting recording (`CONFIDENTIAL`, `MEETING`) | **30 days after meeting ends** | Encrypted object storage; expire URLs; remove provider copies after retention | Proposed |
| Live transcription segments and final transcripts (`CONFIDENTIAL`, `MEETING`) | **90 days after meeting ends** | Database/object storage; purge derivatives and embeddings on expiry | Proposed |
| AI-generated meeting summaries (`CONFIDENTIAL`, source-constrained) | **90 days after meeting ends**, unless source expires sooner | Preserve provenance; expire summaries alongside sources where applicable | Proposed |
| AI task temporary media/text/prompt payloads | **Within 24 hours after task completion/failure** | Worker scratch, queue payload, temporary files, transient context; prefer no durable raw prompts | Proposed |
| Retrieval cache / AI response cache | **Within 24 hours**, or sooner on revocation, source deletion, or policy change | ACL-aware cache key; invalidate on revocation even before physical expiry | Proposed |
| Knowledge chunks and embeddings | No longer than source's authorized lifetime | Delete by source ID and verify vector-index/cached-result invalidation | Proposed |
| User-owned notes, uploads, and collaborative durable documents | Until authorized owner/org deletion, account-deletion workflow, or an approved lifecycle rule | No arbitrary short TTL; show deletion controls and shared-ownership rules | Open |
| Meeting metadata and membership | Until approved meeting deletion/organization lifecycle event | Keep only necessary operational and integrity records | Open |
| User account and profile data | While account is active, then approved deletion schedule | Authenticate/validate request, resolve ownership, revoke sessions | Open |
| Privacy consent evidence | **365 days after associated content expiry/deletion** subject to laws and disputes | Minimal proof metadata; encrypted and tightly limited access | Proposed |
| Security/audit logs | **90 days after event** subject to incident hold/mandatory requirements | No raw audio, prompts, secrets, or private document bodies | Proposed |
| Disaster recovery backups | **30-day rolling expiry** from snapshot creation | Restricted, encrypted, non-searchable; reconciliation on restore | Proposed |

**Warning:** The 30/90/365-day examples are planning ceilings to validate with the product owner, vendors, counsel, and supported countries. Some legal or contractual duties may require different retention; others may require earlier deletion. When these proposals conflict with VRT-006's `TBD`, the system remains `TBD` operationally until explicit approval.

## 3. Required metadata per durable record

- `resource_id`, `resource_type`, `tenant_id`, `owner_id` and optional `meeting_id`.
- `classification`, `visibility_scope`, applicable source IDs/provenance, and grant constraints.
- `purpose_id`, `policy_version`, `created_at`, `retention_trigger_at`, `retention_due_at` (when approved), `hold_status`, `deletion_state`.
- For provider/egress assets: provider object IDs, region, and deletion API capability, stored securely.
- For indexes: source resource ID and ability to enumerate and remove all derived chunks/vectors.

## 4. Deletion timeline design

1. On approved delete/expiry/withdrawal decision, **immediately deny future reads and processing** affected by that decision in the authoritative API.
2. Queue idempotent cleanup across primary DB, recordings and exports, embeddings, search indexes, caches, and controlled provider copies.
3. **Target** completion of online-store deletions within 24 hours (engineering objective to test, not a legal deadline); track failures and notify operator.
4. Backups expire through the approved snapshot schedule; on restore, reapply deletion tombstones **before returning restored data to users or AI**.
5. Do not claim full deletion until all in-scope online systems have confirmed completion and outstanding backup/provider exceptions are accurately disclosed.

## 5. Exceptions and edge cases

- **Legal hold or dispute:** freeze only the minimum necessary information; require restricted access, approved reason, owner, start/review/expiry date and automatic review. Do not use holds to avoid normal deletion casually.
- **Derived content mixing sources:** expiry or revocation of one source may require redaction or invalidation of the entire derived artifact until it is safely regenerated from still-authorized sources.
- **Multi-user meeting:** one participant's deletion request does not automatically authorize deleting every other participant's content; see the shared-artifact review pathway.
- **Copies already downloaded:** cannot guarantee remote deletion; user-facing explanation must be accurate.
- **Provider retention:** verify whether LiveKit, cloud storage, AI inference providers, telemetry systems, and support tools have their own content retention. Contractual settings must not contradict policy.
- **AI failure:** never let indefinite queues, dead-letter tasks, debugging dumps, or traces become accidental archives of raw conversation content.

## 6. Owner and sign-off fields

| Decision | Proposed owner | Must be recorded before rollout |
| --- | --- | --- |
| Retention clock and category map | Product + Security | Signed version and effective date |
| Consent/legal basis by market | Privacy/legal reviewer | Supported jurisdictions and lawful processing basis |
| Provider and backup capability | Backend/Operations | Deletion test evidence and exceptions |
| Organization override limits | Product + Security | No weakening of protected participant rights |
| Response times for rights requests | Privacy/legal reviewer | Jurisdiction-specific service targets |
