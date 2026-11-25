# Vaartiva — Data Retention and AI Consent Policy

**Issue:** VRT-010  
**Version:** Draft v0.1 · 2026-11-25  
**Status:** Proposed policy — documentation only, not implemented, approved, or a public legal notice  
**Owner:** Product and security maintainers (name individuals before beta)

Vaartiva's privacy baseline applies to web (Next.js), mobile (Expo), business API (Express), AI processing (FastAPI), media (LiveKit), PostgreSQL/pgvector, object storage, providers, logs, caches, and backups.

## Read these documents

| Document | Use |
| --- | --- |
| [Retention schedule](./data-retention-schedule.md) | Data inventory, draft retention ceilings, trigger rules, exceptions |
| [AI consent policy](./ai-consent-policy.md) | Purpose-specific consent, external AI, sharing, agent speech |
| [Meeting capture policy](./recording-and-transcription.md) | Recording/transcription controls, joins, withdrawals, LiveKit state machine |
| [Deletion and rights workflow](./deletion-and-privacy-requests.md) | User requests, cascading deletions, provider and backup reconciliation |
| [Consent event contract](./consent-event-contract.md) | Server-enforced versioned consent decisions and audit schema |
| [Verification and release gates](./verification-and-release-gates.md) | Negative tests, operational evidence, go/no-go decisions |
| [Compliance decision log](./compliance-and-open-decisions.md) | Source references, regional review, approvals needed |

## Relationship with earlier policies

- [VRT-006 data classification](../policies/data-classification.md): data has independent **sensitivity** (`PUBLIC`, `INTERNAL`, `CONFIDENTIAL`, `RESTRICTED`) and **visibility** (`PRIVATE`, `MEETING`, `ORGANIZATION`). `PUBLIC` user-content visibility remains disabled for MVP.
- [VRT-006 retention baseline](../policies/retention-and-deletion.md): durations were `TBD`. This VRT-010 package provides **proposed decisions** for review; it does not silently replace approved policy or configure TTLs.
- [VRT-006 AI access](../policies/knowledge-and-ai-access.md): source permissions are inherited by embeddings and derived artifacts. An AI worker cannot independently authorize an action.
- [VRT-005 architecture](../architecture/README.md): Express + PostgreSQL own authoritative policy state; LiveKit transports media; workers are restricted.
- [VRT-008 threat model](../security/README.md): capture without consent, provider leakage, cross-tenant retrieval, and abuse are release-blocking risks.
- [VRT-009 operations](../operations/README.md): deletion, capture, and consent need measurable reliability and observable failures.

## Non-negotiable product defaults (proposed)

1. **No persistent recording by default.** Do not use LiveKit auto-egress in the MVP unless a reviewed consent workflow enforces authorization before capture.
2. **No live transcription or AI listening by default.** AI joins a meeting only through a disclosed, authorized workflow. Merely joining a meeting is not consent.
3. **Separate purpose choices.** Joining a meeting, recording, transcription, summarization, external-model processing, and agent speech are not a single blanket permission.
4. **Fail closed.** If the service cannot verify valid consent for a voice contributor, stop the affected capture path. If selective exclusion is not proven, pause whole-room capture rather than guessing.
5. **Private means private.** A meeting or organization administrator does not automatically gain access to another user's private notes. Derived outputs cannot widen their sources' audience.
6. **No secondary AI training use.** Training or improving models on Vaartiva user/meeting content is prohibited in the MVP unless a future separately approved policy and suitable user controls are implemented.
7. **Withdrawal blocks future processing** governed by that consent as soon as the authoritative policy decision commits; prior processing and already-shared copies need a separately defined lawful handling workflow.
8. **Deletion is verified, not implied.** Enqueueing a deletion does not equal completion. Backups, index entries, provider copies, and legal holds have distinct treatment.

## Policy versus legal approval

This is an engineering/product policy draft, **not legal advice**. The applicable legal basis, consent standards, recording laws, children's data, international transfers, accessibility, and retention obligations vary by jurisdiction. Review the law in force **at the actual release date** and relevant App Store / Google Play obligations before production. A legal hold may override routine deletion but must be narrowly documented and access restricted.

## Release rule

An optional feature without verified consent/deletion controls stays disabled. Before enabling any feature, assign an owner, approve retention periods and jurisdictional conditions, and attach evidence for the corresponding tests in `verification-and-release-gates.md`.
