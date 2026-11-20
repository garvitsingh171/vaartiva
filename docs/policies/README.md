# Vaartiva Data Classification and Permission Policies

**Status:** Proposed policy for MVP (VRT-006)  
**Applies to:** Next.js web, Expo mobile, Express business API, FastAPI AI workers, LiveKit media, PostgreSQL/pgvector, storage, logs, and integrations.  
**Policy owner:** Vaartiva product/security maintainers (assign before production release).

These documents specify **what must be enforced** in future implementation PRs; they do not claim the controls already exist. See the architecture contract in [`../architecture/README.md`](../architecture/README.md) (VRT-005).

| Document | Purpose |
| --- | --- |
| [Data classification](./data-classification.md) | Sensitivity labels, visibility scopes, default classification, and derived content |
| [Authorization policy](./authorization-policy.md) | Identities, roles, permissions, authorization rules, and revocation |
| [Knowledge and AI access](./knowledge-and-ai-access.md) | Retrieval filters, AI worker access, external models, and approval-gated actions |
| [Retention and deletion](./retention-and-deletion.md) | Consent, retention decisions, deletions, backups, and audit records |
| [Policy test cases](./policy-test-cases.md) | Reviewable positive/negative tests and invariants |

## Governing principles

1. **Deny by default**: lacking an explicit grant means no access.
2. **Roles are not enough**: each decision also checks tenant, resource, action, membership, sensitivity, consent, and current state.
3. **Sensitivity and audience are separate**: a document labeled `RESTRICTED` cannot become safe simply by changing its audience to `MEETING`.
4. **Private stays private** until the authorized owner explicitly shares the specific resource, subject to policy.
5. **AI has no independent user authority**: the backend scopes AI inputs and validates outputs. Action execution requires a fresh, authorized approval.
6. **Derived data inherits constraints** from its source(s): transcripts, embeddings, summaries, extracts, and exports cannot silently widen access.
7. **The Express API is the policy enforcement point**; clients and media transport cannot grant business permissions.
8. **Revocation takes effect on subsequent authorization decisions**; invalidate long-lived grants and media credentials as supported by the underlying service.
9. **Log decisions, not secrets**: record metadata necessary for review without copying sensitive content into logs.

## MVP defaults

- The visibility scopes supported by policy are `PRIVATE`, `MEETING`, and `ORGANIZATION`. `PUBLIC` is **reserved/disabled** until a dedicated publishing workflow is approved.
- New personal notes default to `PRIVATE` and `CONFIDENTIAL`.
- Meeting metadata defaults to `MEETING` and `INTERNAL`; meeting transcripts, recordings, and AI-derived summaries default to `MEETING` and `CONFIDENTIAL`, subject to explicit consent and meeting policy.
- Credentials, authentication artifacts, and signing material are always `RESTRICTED`, never user-shareable.
- Organization administrators **do not automatically** gain access to members' private content.
- Retention durations and jurisdiction-specific requirements are **open release decisions**, not invented defaults.

## Change management

Any PR that changes roles, visibility, retrieval, sharing, recording/transcription, approval, or deletion behavior must update the relevant policy and tests. Resolve the explicitly marked open decisions before production rollout.
