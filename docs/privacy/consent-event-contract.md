# Consent Decision Contract and Evidence Model

**Status:** Design contract only. No database schema, API routes, or SDK types are implemented in VRT-010.

## 1. Purpose

Implement future consent collection as a server-authoritative, versioned decision with auditable purpose, participant, context, and revocation. The Express API owns the consent state; FastAPI, LiveKit agents, and clients request scoped capabilities but cannot grant themselves consent.

## 2. Proposed consent event

```json
{
  "event_id": "evt_example_001",
  "decision_id": "consent_example_001",
  "tenant_id": "tenant_example",
  "meeting_id": "meeting_example",
  "subject_user_id": "user_example",
  "purpose": "LIVE_TRANSCRIPTION",
  "action": "GRANTED",
  "policy_version": "privacy-v0.1",
  "notice_version": "transcription-notice-v1",
  "provider_policy_id": "approved-provider-scope-1",
  "scope": "MEETING",
  "occurred_at": "2026-11-25T00:00:00Z",
  "expires_at": "2026-11-25T01:00:00Z",
  "request_id": "request_example",
  "decision_source": "EXPLICIT_PARTICIPANT_ACTION"
}
```

All values are fictional. Do not store full notice bodies, audio, transcript, raw AI prompts, IP addresses, or secrets in ordinary consent events by default. If identity evidence or location evidence is legally required, add only a reviewed, access-restricted field and retention rule.

## 3. Allowed purpose identifiers (suggested)

- `AI_MEETING_PARTICIPATION`
- `AI_AUDIO_UNDERSTANDING`
- `LIVE_TRANSCRIPTION`
- `AUDIO_VIDEO_RECORDING`
- `AI_SUMMARY_FROM_TRANSCRIPT`
- `EXTERNAL_MODEL_PROCESSING`

`AI_SPEECH_ENABLED` is primarily a behavior/authorization preference, not evidence that others consented to AI listening or disclosure. `MODEL_TRAINING` is **not** supported in MVP.

## 4. Proposed event actions and current-state projection

| Event | Effect |
| --- | --- |
| `GRANTED` | May permit named purpose if all other authorization/provider prerequisites also hold |
| `DENIED` | Feature cannot operate for affected contribution/scope |
| `WITHDRAWN` | Blocks future processing for named purpose from authoritative commit onward |
| `EXPIRED` | Requires fresh grant before processing |
| `SUPERSEDED` | Policy/material change invalidates earlier grant until accepted anew |

Effective grant must be **derived from latest applicable authoritative event** plus current policy, active meeting participation, tenant membership and provider approval. A client-provided consent boolean must never be authoritative.

## 5. Server/API invariants

- Authenticated subject may record their decision; a host cannot forge consent on behalf of participants (except separately reviewed lawful representation rules).
- Every event includes immutable version, actor, affected purpose, scope, timestamp, and idempotency key; updates append events rather than rewriting grant history.
- Concurrent grant/withdrawal and start/stop commands require serializable state/version reconciliation. A later withdrawal wins over stale start requests.
- Enforcement point must read current decisions before issuing recording/AI processing grants; authorization is required **in addition** to consent.
- Service-to-service callbacks are authenticated and cannot set `GRANTED` on behalf of participants.
- Delayed retries, resumed background tasks, disconnected clients and new meeting participants must trigger fresh effective-state checks.
- Consent receipts must be discoverable to the relevant user without exposing others' private metadata.

## 6. Illustrative endpoints (not implemented)

```text
POST   /meetings/:meetingId/consent-decisions
GET    /meetings/:meetingId/my-consent
POST   /meetings/:meetingId/recording-requests
POST   /meetings/:meetingId/transcription-requests
POST   /privacy/deletion-requests
GET    /privacy/requests/:requestId
```

Endpoint paths are sketches for a future API design; final implementation must define access checks, schemas, request idempotency, pagination and error responses.

## 7. Pseudocode: fail-closed capture grant

```text
function canStartCapture(actor, meeting, purpose, currentParticipants):
    require Authenticated(actor)
    require Authorized(actor, meeting, "START_" + purpose)
    require FeatureEnabled(meeting, purpose)
    require ApprovedProvider(meeting, purpose)
    require ValidPolicyAndNoticeVersion(meeting, purpose)
    for each participant in currentParticipants whose media can be captured:
        require LatestConsent(participant, meeting, purpose) == GRANTED
    return ALLOW
```

Run the check again immediately before the actual capture side effect and after relevant membership/consent changes; an allow result is not a perpetual token. Make capture start and revocation concurrency-safe.

## 8. Audit and privacy

Recommended event metadata for sensitive operations: `event_id`, `actor_id`, `tenant_id`, `meeting_id`, `action`, `purpose`, `effective_state`, `policy_version`, `result`, `request_id`, timestamp, relevant provider ID. Restrict reviewer access, redact identifiers in telemetry, retain under approved schedule, and do not copy user content into audit logs.
