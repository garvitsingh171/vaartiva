# Data Classification Policy

**Status:** Proposed MVP policy · **Related:** VRT-005 architecture trust boundaries.

## 1. Two independent labels

Each persisted user/content resource MUST have **both**:

- **Sensitivity** (`PUBLIC`, `INTERNAL`, `CONFIDENTIAL`, `RESTRICTED`): impact of exposure and controls required.
- **Visibility** (`PRIVATE`, `MEETING`, `ORGANIZATION`): *eligible audience*; membership and current resource permissions must still be verified. `PUBLIC` visibility is reserved and **disabled in MVP**.

Visibility is **not** permission by itself; a `MEETING` label never lets a nonmember read the resource. Sensitivity never grants access. For derived or aggregated artifacts, record source provenance and effective permission constraints in addition to these labels.

## 2. Sensitivity levels

| Label | Meaning | Examples | Minimum handling |
| --- | --- | --- | --- |
| `PUBLIC` | Approved for public distribution | Approved marketing page, published help text | Publication approval; integrity protection |
| `INTERNAL` | Routine non-public operational information | Meeting title, room metadata, organization settings | Authenticated scoped access; encrypted transport |
| `CONFIDENTIAL` | User/meeting material whose unauthorized exposure causes harm | Private notes, transcripts, recordings, summaries, personal contact data | Resource-level access checks; restricted logging; encryption at rest and in transit; controlled export |
| `RESTRICTED` | Secrets or especially sensitive operational material | Session secrets, API keys, LiveKit signing secrets, service credentials | Never return to user clients; secret-manager/environment controls; strict service identity; no model prompts/logs |

A user may supply content more sensitive than the default. Classifiers and administrators may **increase** sensitivity, but downgrading requires explicit review. Do not assume all user-supplied content is safe for a provider or for sharing.

## 3. Visibility scopes

| Scope | Eligible audience | Default policy |
| --- | --- | --- |
| `PRIVATE` | Owning principal and specifically delegated principals | No implicit organization-admin or meeting-host visibility |
| `MEETING` | Authorized members of the named meeting under current meeting policy | No access merely from knowing a meeting ID or having a LiveKit token |
| `ORGANIZATION` | Current authorized members of the named organization | No other-organization access; organization role may further restrict access |
| `PUBLIC` (reserved) | Explicitly published audience | Disabled in MVP; requires future review and publishing workflow |

Every resource MUST bind to a tenant/organization where applicable, owner or owning entity, and a resource ID. Meeting-scoped resources MUST bind to a specific meeting. Organization-shared resources MUST bind to a specific organization. Do not interpret scope as a global boolean.

## 4. Initial resource classification

| Resource | Sensitivity | Initial visibility | Notes |
| --- | --- | --- | --- |
| Public landing-page copy | `PUBLIC` | Reserved published asset | Approval required for publishing; not a user-content share path |
| User profile/contacts | `CONFIDENTIAL` | `PRIVATE` | Expose safe profile subset only under a separately defined directory policy |
| Organization configuration | `INTERNAL` | `ORGANIZATION` | Administrators may have extra edit permissions |
| Meeting title, schedule, membership | `INTERNAL` | `MEETING` | Invitee preview is a narrowly scoped exception, not wholesale meeting access |
| Personal/private meeting notes | `CONFIDENTIAL` | `PRIVATE` | Attending a meeting does not share a note |
| Meeting transcript | `CONFIDENTIAL` | `MEETING` | Only if recording/transcription authorization and applicable consent exist |
| Meeting recording | `CONFIDENTIAL` | `MEETING` | Distinct consent, storage, and retention controls |
| Meeting AI summary | `CONFIDENTIAL` | `MEETING` or stricter | Must inherit source permissions; no automatic global sharing |
| Uploaded user document | `CONFIDENTIAL` | `PRIVATE` | Explicit share operation required to widen audience |
| Embeddings / search chunks | Source-derived | Source-derived | Keep provenance, tenant and access constraints |
| AI prompt/context/result | At least source sensitivity | At most source-authorized audience | Prevent inadvertent recording of prompt data in logs |
| Session tokens, service keys | `RESTRICTED` | Not shareable | Never stored in accessible knowledge corpus |
| Audit security metadata | `CONFIDENTIAL` | Service/security role only | Separate administrative policy, not organization-wide knowledge |

When a resource combines sources with different audiences, **authorized result readers must satisfy every relevant source constraint**; do not just choose the broadest scope. If the intersection is empty, block distribution or require a new explicit sharing/consent flow for each affected source.

## 5. Classification and lifecycle rules

1. Assign classification **at creation**, before persistence, indexing, or AI processing.
2. Validate ownership, tenant, scope, and sensitivity **server-side**; client labels are requests, not authority.
3. Sharing is a separately authorized action; changing a UI badge is not enough.
4. On every retrieval/export, enforce effective current permissions; cached embeddings, previews, summaries, and URLs must not bypass checks.
5. A document's chunks and embeddings retain the source resource ID, owner/tenant, visibility, and effective grant constraints.
6. Data reclassification, rescoping, or ownership change must invalidate dependent caches/index permissions and log the policy transition.
7. Deletion and revocation must cover derived artifacts and search indexes under the lifecycle policy.

## 6. Open decisions

- Exact special handling of regulated personal or sensitive data and applicable jurisdiction-specific obligations.
- Whether guest participants can see past meeting transcripts by default (MVP recommendation: **no** unless explicitly granted).
- Whether to add a safe, explicitly reviewed public knowledge publishing workflow post-MVP.
- Approved encryption/key management and enterprise classification overrides.
