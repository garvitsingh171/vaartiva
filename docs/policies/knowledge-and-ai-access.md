# Knowledge Boundaries and AI Access Policy

**Status:** Proposed MVP policy.

## 1. Knowledge scopes

- **Private:** visible only to owner and explicitly authorized principals.
- **Meeting:** visible only to authorized members of the specific meeting, subject to transcript/recording consent and access policies.
- **Organization:** visible only to currently authorized members of the specific organization and any narrower resource ACL.

The labels are not interchangeable with sensitivity labels. Private and meeting-scoped information never flow into organization-shared outputs by default.

## 2. Retrieval requirements

Retrieval through pgvector or another index MUST enforce permissions **within candidate selection**, not only after selecting global top-K results:

1. Authenticate user/service and establish tenant context.
2. Resolve resource grants, active membership, consent, and effective source restrictions.
3. Build a tenant- and visibility-scoped candidate query.
4. Rank/filter embeddings **only among authorized records**.
5. Revalidate returned source permissions before constructing model context.
6. Return citations/resource references only if those are authorized too.
7. Recheck access when viewing a stored AI answer or exporting its sources.

**Illustrative query pattern, not a runnable schema:**

```sql
SELECT chunk_id, resource_id, content
FROM knowledge_chunks
WHERE tenant_id = :tenant_id
  AND resource_id IN (:authorized_resource_ids)
ORDER BY embedding <=> :query_vector
LIMIT :k;
```

In production, prefer authorization joins and/or database row-level policies when an explicit ID list is too large; enforce the same restrictions before ranking. Do **not** run a global top-K and trust a prompt or model to ignore unauthorized matches. Do not return private metadata, similarity scores, document titles, or search hit counts for forbidden resources.

## 3. Derived artifact permissions

- Chunks, embeddings, transcript segments, generated summaries, tasks, and exports inherit source provenance and access constraints.
- For a result combining multiple sources, **every recipient must satisfy every source's relevant access rules** (effective audience is the intersection), unless a separately authorized declassification/sharing operation is completed.
- AI output is not automatically meeting-shared simply because the request happened during a meeting.
- Never treat a model's suggested scope, citation, permission, or role as an authoritative grant.
- Data deletion and revocation must trigger dependent artifact/index invalidation under the lifecycle policy.

## 4. AI worker access

- FastAPI workers operate under **task-scoped service credentials**, not as administrators.
- API provides the minimum authorized context or short-lived fetch capability for that task.
- Workers must authenticate callbacks and return strictly validated structured results.
- Workers cannot create share grants, add users to meetings, approve privileged actions, or execute arbitrary external integrations directly.
- Restrict network egress, credential availability, logging, and resource limits according to deployment architecture.
- AI-generated and user-supplied instructions embedded in documents are **untrusted content**; they cannot override platform permissions.

## 5. External model providers

Before sending user/meeting information externally, verify:

- Organization and user policies permit the specific provider/task.
- Required consent was obtained where applicable.
- Data is minimized and secrets are removed.
- Provider terms, data retention, location, and subprocessors have been evaluated.
- Inputs/outputs are protected in transit and not logged indiscriminately.

If the provider is not approved, the request must fail closed or use an explicitly permitted alternative; it must not silently route restricted content elsewhere.

## 6. Human-approved AI actions

Recommended state machine:

`PROPOSED -> PENDING_APPROVAL -> APPROVED -> EXECUTING -> EXECUTED`

Alternative outcomes: `REJECTED`, `EXPIRED`, `FAILED`, with controlled retry/reconciliation states when external effects may have occurred.

Required checks before side effects:

1. Validate the proposed action schema and target resource/tenant.
2. Authenticate an eligible human approver and check the precise action permission.
3. Recheck current resource ownership, grants, policy, and consent.
4. Bind approval to an immutable proposal/version and parameters.
5. Use an atomic claim/idempotency key to prevent duplicate processing.
6. Execute only through an allowlisted backend capability; record audit trail and actual outcome.
7. Never report `EXECUTED` merely because the queue accepted a job or the worker generated a proposal.

Irreversible external actions require per-integration idempotency/reconciliation planning. A database transaction alone cannot undo an email or external API side effect.

## 7. Example prohibited flows

- Personal note -> meeting-wide AI summary without owner sharing.
- Another tenant's transcript -> semantic retrieval context because it is highly similar.
- Model-generated instruction -> business API delete action without human approval.
- LiveKit media access token -> authorization to read meeting documents.
- Meeting transcript -> external LLM despite absent required consent/provider approval.

## 8. Open decisions

- Authorized AI provider list and any self-hosting requirements.
- Consent policy details for recording/transcription in each supported jurisdiction.
- Whether some classes of AI task are read-only and need no human approval (read-only still requires access checks).
- Cross-document summary provenance and secure cached-result invalidation strategy.
