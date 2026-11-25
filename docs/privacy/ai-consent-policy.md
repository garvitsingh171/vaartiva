# AI Participation, Processing, and Consent Policy

**Status:** Proposed MVP controls. Consent legal basis must be checked per jurisdiction; product defaults below are deliberately conservative.

## 1. Distinguish permission, consent, and user preference

- **Authorization**: a server decision that an authenticated actor may perform an operation on a particular meeting/resource.
- **Consent**: specific, informed and revocable permission (where required/applicable) for a defined processing purpose; an admin role is not a substitute.
- **Preference**: how the assistant behaves (for example, speech enabled), which cannot override participant rights or underlying consent.
- **Provider approval**: separate organizational/security decision that a processing provider and its contract, location, retention and disclosure are acceptable.

## 2. Separate choices, never bundled into Join

| Capability/purpose | Default | Required checks before activation | User-facing control |
| --- | --- | --- | --- |
| Ordinary meeting attendance and media publication | Opt-in through meeting join + OS mic/camera grants as needed | Meeting membership and normal media authorization; distinct from storage/AI capture | Join, mic/camera toggles |
| AI participant joins meeting | Off | Host/meeting permission, participant disclosure; any applicable consent for AI processing | Add/remove AI participant |
| AI listening / real-time speech understanding | Off | Specific approved purpose, current participant consent and meeting permissions | Enable/disable AI listening |
| Live transcription | Off | Informed participant consent as required by chosen MVP policy; capture authorization | Start/stop transcription |
| Audio/video recording | Off | Separate recording consent and recording permission | Start/stop recording |
| AI meeting summarization | Off until authorized | Source access and purpose-specific permission; if derived from captured speech, valid capture/processing basis | Generate/share summary |
| Use of private documents as AI context | No implicit access | Per-resource authorized grant + purpose/provider checks; explicit owner sharing if widening audience | Select allowed sources |
| External model processing | Off unless provider explicitly approved and required permissions/consents satisfied | Provider approval, data minimization and applicable purpose disclosures | Provider notice and allowed processing choice where required |
| AI speaks aloud | Muted by default | Authorized speech mode and no policy/participant restriction; does not itself grant AI listening | Separate Speak / Mute AI toggle |
| Training models on user/meeting data | Prohibited for MVP | Future explicit separate policy + independent legal/provider approval | No training toggle in MVP |

A participant's attendance must never be treated as blanket consent to be recorded, transcribed, summarized, or routed to an external model. Avoid dark patterns and preselected consent checkboxes.

## 3. Meeting consent decision rules

1. Confirm requester's right to enable the feature in the meeting.
2. Determine the participants whose captured audio/video/content is implicated, including new joiners.
3. Present purpose, captured data, likely recipients/processors, sharing audience, optionality, retention, and withdrawal consequences in understandable language.
4. Collect affirmative choices separately per feature, purpose and relevant participant as required by approved meeting policy; store proof centrally.
5. Require all participating contributors' active consent for room-wide recording/transcription under the conservative MVP default. Organization or local laws may mandate additional steps; **do not weaken this product default without formal review**.
6. If consent is missing, withdrawn, stale or unverifiable, **do not process that person's contribution**. If selective exclusion cannot be guaranteed, do not start or pause whole-room capture.
7. Notify participants when processing begins, stops, or changes. Persistent indicators must reflect server/media-confirmed state, not just a clicked button.
8. Re-consent when the purpose, captured data types, receiving provider, disclosure audience, or material retention terms change.

## 4. External AI providers and data minimization

- Do not send meeting audio/text or private documents to an unapproved model provider.
- Prefer task-scoped context assembled by the Express API after current tenant/resource checks.
- Remove credentials, unrelated documents, and irrelevant personal information; log metadata not content.
- Confirm provider contract and settings governing retention, model training, debugging traces, region and subprocessors.
- For a blocked provider or absent required consent, the worker fails closed; it must not silently fall back to an unreviewed provider.
- When combining private and meeting data, an AI response inherits the intersection of source access, not the broadest audience. Sharing requires independent authorization and any necessary additional consent.

## 5. AI speech, confidentiality, and approval

- AI speech is a separate **meeting-level behavior control** with applicable per-user restrictions. It does not bypass consent for AI listening or allow disclosure of private context to other participants.
- Before speaking or posting, the backend authorizes the **audience** of the generated response against its source provenance. A private owner note must not be voiced in a shared room, even if AI speech is enabled.
- Content embedded in meeting text/documents cannot instruct AI to override permission rules (prompt injection boundary).
- Proposed actions with side effects remain **pending** until an eligible human approves the exact parameters/version, with current permission rechecked immediately before execution (VRT-006).

## 6. Withdrawal and refusal

- Refusal must not prevent ordinary meeting attendance when the disabled feature is optional and the meeting can function without it; explain exceptions where the requested meeting is itself explicitly a consent-dependent session.
- Withdrawal becomes authoritative on server commit; stop affected capture/inference and stop future provider requests. Already queued content is quarantined/invalidated and deleted according to retention/rights workflow.
- Withdrawal does not retroactively erase every previously processed, legally retained item or another participant's independent rights; offer the relevant deletion request route.
- After revocation, stale client state, an expired/signed token, a pending AI job, and a resumed media session must not re-enable processing.
- Record denial and withdrawal safely without storing audio or raw prompt bodies.

## 7. Notice copy (illustrative, requires legal/product review)

> **AI listening is off.** If enabled, Vaartiva may process what participants say to generate a transcript or summary. We will show which provider processes it, who can see the result, and how long it is kept before you decide. You can withdraw your permission, which stops future processing.

> **Recording request.** The host wants to record this meeting. Recording is separate from transcription and AI assistance. Recording will not start until the required participants have agreed. You may decline; the host will be informed that recording cannot proceed under this meeting's policy.

## 8. Open design decisions

- Supported markets, age eligibility and lawful bases other than consent when applicable.
- AI assistant present-without-listening versus actual media-track subscription behavior in LiveKit.
- Whether selective per-participant nonconsenting-track exclusion can be proven end to end; **default to whole-room pause** until proven.
- Provider list, contractual retention, and region controls.
- Whether hosts can establish meetings that disallow optional AI features altogether.
