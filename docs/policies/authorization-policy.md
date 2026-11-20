# Authorization and Permission Policy

**Status:** Proposed MVP policy.

## 1. Identities and role contexts

- **Principal:** authenticated user or authenticated service account.
- **Organization role:** `OWNER`, `ADMIN`, `MEMBER`, `GUEST` (if guest access is enabled).
- **Meeting role:** `HOST`, `CO_HOST`, `PARTICIPANT`, `INVITED_GUEST`.
- **Resource relation:** `OWNER`, explicitly authorized `EDITOR` or `VIEWER`; meeting or organization audience grants where permitted.
- **Service identity:** scoped `API`, `AI_WORKER`, or `MEDIA_WEBHOOK` identity; service credentials are not human roles.

Role names are contextual: organization `OWNER` is **not** owner of every personal note. No single role exempts a caller from tenant, resource, consent, or lifecycle checks.

## 2. Authorization decision

The business API MUST decide `allow` only when **all** applicable checks pass:

`authenticated principal AND same authorized tenant AND action grant AND resource ACL/membership AND required sensitivity controls AND consent/policy AND valid resource state`

Return **deny** on missing identity, resource, role, scope, consent, or policy metadata. Resource IDs, tenant IDs, room IDs, and role claims from a client are never sufficient proof of access.

**Pseudocode:**

```text
authorize(principal, action, resource):
  require authenticated(principal)
  require valid_service_or_tenant_membership(principal, resource.tenant_id)
  require action_allowed_for_role_or_resource_grant(principal, action, resource)
  require visibility_allows_current_reader(principal, resource)
  require required_sensitivity_controls(principal, resource)
  require consent_and_resource_state_allow(principal, action, resource)
  return ALLOW
# If any required check fails: DENY (and audit sensitive denials).
```

## 3. Permission matrix (baseline)

**Legend:** `Y` permitted when all additional guards pass; `C` conditional on explicit grant, host policy, and/or applicable consent; `—` denied by default. All checks are resource-specific.

| Action | Org OWNER/ADMIN | Org MEMBER | Meeting HOST/CO_HOST | Meeting PARTICIPANT | AI WORKER |
| --- | --- | --- | --- | --- | --- |
| Create organization meeting | Y | C | — | — | — |
| View meeting metadata | C | C | Y | Y | C (task-only) |
| Edit meeting configuration | C | — | Y | — | — |
| Join LiveKit room | C | C | C | C | C (approved bot only) |
| Read another user's private note | — | — | — | — | — |
| Read meeting-shared note | C | C | Y | Y | C (task-only) |
| View authorized transcript/recording | C | C | C | C | C (task + consent) |
| Share own private note into meeting | C | C | C | C | — |
| Revoke own note's sharing grant | C | C | C | C | — |
| Approve AI action | C | C | C | C | — |
| Execute approved business action | — | — | — | — | — |
| Change another user's org role | Y | — | — | — | — |

**Important clarifications:**

- `HOST/CO_HOST` and `PARTICIPANT` entries are applicable **only to that meeting**, and only while current membership/policy permits.
- Reading meeting content is not inferred from holding an organization role alone; organization members must also have an eligible meeting grant. This is why org-role columns above are conditional.
- A participant can approve an AI action only when they independently possess the specific business capability, and the approval policy accepts them.
- Privileged execution occurs in the **business API's controlled executor** after approval and reauthorization, not directly through a UI/worker role.
- If a resource owner is removed from a tenant, the platform must define an ownership-transfer/export process; stale ownership cannot bypass tenant isolation.

## 4. Resource operation rules

### Meetings
- Creating or changing a meeting requires a membership and capability check.
- Joining a media room requires backend-issued, short-lived, room-bound credentials; an invite link is not permission by itself.
- Host changes to membership and room policy must be audited.
- LiveKit join/leave events can update **derived presence** only, not business membership or meeting status.

### Notes and attachments
- Personal notes begin `PRIVATE`.
- The owner may propose sharing with a specific audience only when authorized for that target meeting/organization.
- A share must record **actor, target, resource, permission, timestamp**, and appropriate consent.
- Sharing cannot bypass source restrictions, organization policies, or legal/consent constraints.
- Revoking a grant blocks subsequent API, search, and export requests; already downloaded copies cannot be remotely erased.

### Recording and transcription
- The platform must check room policy, user permissions, and applicable consent before capture begins.
- Consent withdrawal and participant changes require re-evaluation of capture permissions and workflow behavior.
- Capture grants and transcription grants are separate from simply joining a meeting.

## 5. Access grants and revocation

Recommended auditable grant record:

```text
grant_id, tenant_id, resource_id, principal_or_group_id,
action, granted_by, granted_at, expires_at?, revoked_at?
```

- Prefer short-lived session/media grants and reauthorize on renewal.
- Revocation must invalidate cache entries or bound their maximum staleness; document target propagation time before production.
- Previously issued media tokens may remain valid until expiry unless proactively disconnected/revoked by the media service. Design for this limitation; do not promise instantaneous revocation without enforcement.
- All API reads, exports, and AI retrievals must check current effective permission.
- Audit denied privilege escalation, cross-tenant access, permission changes, approvals, and execution outcomes without leaking sensitive payloads.

## 6. Security invariants

- Organization administrators cannot search private notes just because they are administrators.
- Meeting hosts cannot read private notes unless explicitly granted access.
- A cross-tenant resource identifier is insufficient to read, write, embed, or export anything.
- Changing a role in the client does not change backend entitlements.
- Every privileged action is checked at its **time of execution**, not just when displayed.

## 7. Open decisions

- Precise group permissions and guest access model.
- Whether organizations permit cross-organization meeting guests and how guest scopes expire.
- High-impact action requirements (single approver vs separation of duties/two-person approval).
- Ownership transfer when users leave an organization.
