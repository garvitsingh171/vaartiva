# Vaartiva — Web & Native User Journeys

> **Issue:** VRT-003 · **Version:** 0.1 · **Prepared:** 2026-11-19  
> **Status:** Proposed low-fidelity journeys; not validated with users or shipped.  
> **Owner role:** Product / UX Lead (assignment pending) · **Platforms:** Web, Android, iOS  
> **Source of truth:** [PRD](../PRD.md) · [Audience Map](../AUDIENCE_MAP.md) · [MVP Scope](../MVP_SCOPE_CONTRACT.md) · [Platform Parity](../PLATFORM_PARITY_MATRIX.md)

## 1. Purpose and boundaries

Turn VRT-001 audience needs and VRT-002 scope into explicit user-facing flows for design and engineering. These journeys are **requirements**, not screenshots, tested implementations, or user-research findings. All three clients share server-enforced identity, permission, and audience policy; their UI navigation may differ.

**Baseline:** 3–6 **human** participants in a single web/Android/iOS interoperable room; a separately identifiable invited AI participant is not counted as a human. The application must remain useful without AI. In-room behavior must never make a guest a workspace member by implication.

**MVP boundaries:** F01–F13 and F15–F17 are proposed mandatory capabilities; F14 third-party connectors are **conditional/provider-gated**. Enterprise SSO, full audio/video recording playback, unrestricted autonomous negotiations and unsupervised external writes are excluded. VRT-002 owns final approval of these proposals.

## 2. Actors, objectives and default rights

| Actor ID | Actor | Goal | Trust boundary / default rule |
|---|---|---|---|
| A1 | Student member/coordinator | Organize study/project work and clarify cited material | Workspace member, rights limited to own memberships |
| A2 | Internal team member | Join collaborative meeting, contribute, own tasks | Membership/role-checked per meeting and artifact |
| A3 | Meeting host/facilitator | Create meetings, invite/admit guests, control AI and actions | Host-only controls enforced server-side; cannot bypass consent |
| A4 | External negotiation guest | Join a permitted meeting and discuss explicitly shared material | No workspace-wide access; no private source, AI or recap access by default |
| A5 | Internal private-agent user | Request personal assistance without public disclosure | Private output and retrieval bound to requesting user, not room audience |
| A6 | Invited AI participant | Answer allowed questions and propose actions | Non-human, visible, explicitly invoked; no independent authorization |

### Universal UX guardrails

1. All users know whether they are authenticated members or limited guests. Every private access is checked on the server.
2. Before any participant's speech goes to STT, obtain and record their explicit, current consent. Refusal leaves the ordinary human call usable; withdrawal stops **future** processing of that speaker's audio.
3. An AI answer shown/spoken publicly uses only information cleared for the **public room audience**, even if its requesting host also has private data. User-private answers remain private by default.
4. Decision states are **proposed**, **confirmed by an authorized human**, or **superseded**. AI output alone never confirms a decision.
5. Mutating actions require a visible proposal, exact payload preview, authorized human approval, backend re-authorization, real execution receipt and audit event. A failed write is never displayed as completed.
6. An expired, revoked or denied invitation cannot be rescued through cached native state, stale deep links or a different UI route.
7. No dead-end states: show a user-safe explanation plus a valid retry, return, request-access or leave path; don't reveal sensitive resource existence in denial text.

## 3. Journey inventory and traceability

| Journey | Entry / audience | Desired user outcome | Feature IDs | Primary gate |
|---|---|---|---|---|
| **UJ-01** Workspace access | A1/A2/A3, new or returning | Reach only authorized workspace | F01, F16, F17 | G1 |
| **UJ-02** Create and run instant meeting | A3 + 3–6 humans | Live mixed-client room | F02–F05, F16–F17 | G2 |
| **UJ-03** Schedule, recur and invite | A3; invitee | Correct meeting at correct occurrence/time | F02–F03, F16–F17 | G2 |
| **UJ-04** External negotiation guest | A4/A3 | Safe limited guest participation | F02, F04, F09, F12, F16–F17 | G1/G2/G5 |
| **UJ-05** Collaborate during call | A1–A4 as granted | Shared agenda, chat, notes, polls, board | F04–F08, F16–F17 | G2/G3 |
| **UJ-06** Consent + visible meeting AI | A1–A4 as granted | Understand AI state and safely ask | F10–F12, F16–F17 | G4/G5 |
| **UJ-07** Document sharing and grounded answer | A1–A4 as granted | See only approved source/evidence | F09, F11–F12, F16 | G4/G5 |
| **UJ-08** Decision and approved internal task | A2/A3 | Verified decision and real task | F06, F08, F13, F16 | G3/G5 |
| **UJ-09** End meeting and follow up | A1–A4 as granted | Authorized recap, assigned work, history | F03, F08, F15–F17 | G3/G4 |
| **UJ-10** Private assistant / conditional connector | A2/A3 | Safe private insight or reviewed external action | F12–F14, F16 | G5 |
| **UJ-11** Interrupted / degraded meeting | All | Recover room or exit without phantom success | F04–F05, F10–F11, F17 | G2/G4/G6 |
| **UJ-12** Revoke and delete controlled data | A3/authorized controller | Consistent removal of access and data | F02, F09, F15–F17 | G6 |

## 4. Detailed journey requirements

### UJ-01 — Sign in, join workspace, select context

**Trigger:** member opens app/URL, returns after expiry or opens member-only invite. **Success:** accessible workspace shown without leaking others.

1. Show welcome or valid prior session; user selects sign-in or continues with authorized account.
2. Authenticate through supported identity provider; validate callback and server session.
3. Present authorized workspace list; include safe empty state with create/join option if policy allows.
4. User selects workspace; dashboard displays only its meetings and tasks.
5. Expired session leads to re-authentication and safe return to intended route; no protected content cached into an unauthorized session.

**Alternatives:** first-ever account with no workspace; invite for another account; removed membership; no network; sign-in cancellation. **Recovery:** switch account, request legitimate invitation, refresh session or go to landing page. **Never:** auto-join unauthorized workspace.

### UJ-02 — Instant room (host and participants)

**Trigger:** member selects *Create meeting*. **Success:** 3–6 humans can join together across clients.

1. Host selects workspace/context and creates room; server stores host, active session and scoped invite options.
2. Host receives shareable restricted link, optional guest admission setting, copy/share controls.
3. Participants open link, resolve account/guest identity, verify invitation/membership and complete prejoin checks.
4. Prejoin shows room name, display name, camera preview, mic/camera toggles, device choices and capture/AI disclosures.
5. Join request obtains a short-lived, scoped room token **only after** admission/authorization.
6. In-call UI shows humans and a distinct AI presence/state if invited; joining/left users update presence.
7. Host can end for all; others may leave without ending the session.

**Alternatives:** invalid room, ended room, capacity exceeded, denied guest, missing camera/mic, reconnect, host disconnect. **Recovery:** safe information, retry join within policy, device settings, request admission, or return dashboard. Capacity limit is enforced server-side; AI cannot displace a human slot.

### UJ-03 — Scheduled / recurring meeting and invitations

1. Host selects instant, future scheduled or recurring session; selects timezone, date/time and recurrence rules.
2. Preview shows localized time **and** canonical timezone identifier; create and edit must not silently shift recurrence dates.
3. Server generates stable meeting/series identity and occurrence-specific authorization where needed.
4. Host shares appropriate invite; attendee sees schedule and can open the upcoming occurrence.
5. Before start, show waiting/not-started state with permitted reminders or return navigation; after end, show ended state and allowed history.

**Alternatives:** daylight-saving/timezone ambiguity, edited occurrence, canceled series, stale invite, duplicate occurrence, host permission change. **Recovery:** reflect updated authoritative occurrence; never join a different session silently.

### UJ-04 — Restricted external negotiation guest

**Trigger:** host invites A4 to a single partner discussion; **success:** admitted guest can participate in **that** session without knowing private data.

1. Host creates time-bound, revocable guest invitation with scope to one meeting/occurrence; share by intended channel.
2. Guest opens HTTPS invite on web or native client; if app absent, web join remains available without mandatory app installation.
3. Guest enters name (or supported guest identity), sees guest label, privacy/capture notice and device prejoin.
4. Server validates invite status, meeting and any passcode; guest enters waiting room until authorized host admits.
5. Once admitted, guest receives meeting-only rights and sees **only** documents/notes explicitly shared to the guest-visible audience.
6. Guest can speak/chat/ask permitted AI questions; public AI must not read or reveal host-private max-discount, notes, internal tasks, documents or citations.
7. After leaving/ending, guest recap access is **denied by default** unless an explicit, revocable artifact grant exists.

**Adversarial branches:** guessed/forwarded link, revoked invite, host declines admission, guest requests confidential price ceiling, malicious instruction in a shared document, stale background session after revocation. **Expected:** authorization denial **before** retrieval/transmission; no private snippets in audio/text/citations/metadata. Rejoin requires fresh server authorization.

### UJ-05 — In-room collaboration, document-free

1. Human participant views room grid, active speaker, connection state, shared agenda and chat.
2. Member with rights edits agenda/notes; other permitted clients see synchronized changes and stable persistence.
3. Participant initiates screen share using platform-specific OS permission flow; others can view/focus shared display.
4. Authorized participants take poll, add whiteboard strokes and make comments with responsive/touch-friendly controls.
5. Host can manage participants and close/finish the session; guests only use specifically granted tools.

**Alternatives:** conflicting edits, disconnected collaboration socket, OS denies screen share, mobile background transition, overly small screen, revoked permission. **Recovery:** explicit unsaved/offline state, conflict resolution/reconnect, re-request OS permission via supported flow or stop share. Do not fabricate persistence.

### UJ-06 — Speaker-specific transcription consent and visible AI

1. Room clearly shows AI **not invited / invited / listening / responding / failed**, independently of transcription status.
2. Each participant chooses whether **their own** speech can be transcribed; consent is explicitly recorded for that speaker. An organizer cannot consent for another adult participant.
3. Only consenting participant tracks may enter STT; nonconsenting humans still speak in the human call.
4. Authorized host/participant explicitly invites or activates AI; audience sees visible AI identity and status.
5. Authorized speaker chooses *Ask AI* or submits a typed question. Spoken AI input requires explicit, current consent for that speaker's audio processing; a speaker who has not consented may use typed AI where permitted. Only one active spoken turn can be accepted at a time in the proposed first implementation.
6. AI responds with permitted text/voice and references (when evidence exists). User can cancel; request may fail or time out with honest feedback.
7. A participant withdraws STT consent; future speech capture stops immediately per policy, reflected in UI and audit.

**Alternatives:** consent decline/withdrawal, AI unavailable/quota exhausted, request canceled, user lacks permission, participant joins after consent started, background/resume. **Recovery:** human meeting persists, typed/manual notes remain available where permitted, re-request explicit consent before any resumed capture.

### UJ-07 — Share scoped document, ask grounded AI

1. Authorized user opens *Documents* and selects source file for a meeting/workspace.
2. Before sharing, UI shows **audience visibility** (private, internal members, or explicitly permitted guests); default is least privilege.
3. Backend validates upload, persists private source, processes and exposes `UPLOADING → PROCESSING → READY/FAILED` state.
4. Owner grants explicit access to intended audience; client does not claim shared status until backend acknowledges.
5. Authorized participant asks AI about it; backend filters permitted source list **before retrieval**, then only supported source references are shown.
6. Selecting a citation opens permitted source/page; unavailable, deleted or revoked references display honest restricted/missing state.

**Alternatives:** malicious source prompt injection, unsupported file, failed indexing, owner loses permission, guest asks private-source question, no relevant evidence. **Recovery:** retry processing where allowed, remove unsupported file, request share, show *not enough accessible evidence*, never return an uncited invented source.

### UJ-08 — Propose, confirm decision and execute approved internal task

1. Meeting participants record option(s); AI may suggest a **proposed** Decision Card with source references.
2. Authorized human edits/confirms explicit final decision; state, confirmer and evidence/manual-note metadata saved.
3. AI/member proposes action item including exact title, owner, due date (optional), action target and source context.
4. Authorized approver reviews full payload; chooses **Approve** or **Reject**. Rejection results in no write.
5. On approve, backend re-verifies actor, audience and idempotency before persisting internal task.
6. UI displays actual task ID/audit receipt on success; failure or uncertain status must not be labeled completed.
7. Collaborators view the resulting task on web and both native clients within their authorized scope.

**Alternatives:** request edited between preview and approval, duplicate taps, lost network after submit, no permission, stale meeting state, external connector unavailable. **Recovery:** return server-confirmed final state, refresh/retry safely by idempotency key, or reject; do not invent success.

### UJ-09 — End session, recap and follow-up

1. Host selects *End for everyone* or an attendee selects *Leave*; show confirmation for destructive host action.
2. Meeting lifecycle closes; background processing of allowed recap/transcript begins if required consent exists.
3. Show `GENERATING`, `READY`, `PARTIAL`, or `FAILED` summary state; lack of consent can yield *No consented transcript* instead of invented recap.
4. Authorized member visits session detail/recap; sees decisions (proposed vs confirmed), sources and persistent task ownership.
5. Owner updates task status with server confirmation; guests can only view explicitly granted artifacts.
6. Return to meeting history/workspace for next session.

**Alternatives:** summary provider down, lost network, source revoked, guest tries private recap, user deleted transcript, partial capture. **Recovery:** clearly label incomplete evidence; navigate to permitted manual notes/tasks rather than fabricate summary.

### UJ-10 — Private assistant and conditional external connector

1. Member opens user-private AI mode, not the public room panel; audience marker remains obvious.
2. User asks private question; retrieval is limited to that user's authorized source set and result stays private.
3. User may request to share a selected **reviewed** output to room; check room audience and human preview first.
4. For an enabled, eligible external connector, show provider permissions, exact proposed write and approval screen; execute only after separate authorization.
5. Unsupported/unconnected provider displays `UNAVAILABLE / CONNECT / DEFERRED`, not fabricated execution.

**Alternatives:** token revoked, permission scopes missing, connector API unavailable, user tries private-to-public leakage. **Recovery:** connect/re-authorize when supported, use internal task workflow or stop safely. F14 is not guaranteed at launch.

### UJ-11 — Disconnection / rejoin / AI degradation

1. Client transitions from connected room to `RECONNECTING` on network loss or OS interruption; maintain a clear status.
2. Revalidate session identity/permissions when rejoining; don't rely on cached room token after revocation.
3. Restore UI, media permissions and collaborative state from authoritative records; disclose drafts that could not be saved.
4. If AI/STT fails, downgrade only AI features; core human room remains available where network/media permits.
5. On terminal failure or ended room, show safe exit and retry/new meeting path.

### UJ-12 — Revoke invitation, access, or controlled meeting data

1. Authorized host/owner views shared invite and artifact grants with their current audience.
2. User revokes link/grant or initiates meeting-data deletion with a confirm step and stated scope.
3. Backend enforces revocation across APIs, future room token issuance, source retrieval and accessible artifacts; active guest sessions require server-enforced cutoff policy.
4. UI shows actual operation state and verified completion or explicit failure; no silent retention promise.
5. Authorized user sees audit/receipt as policy permits; other users see safe loss-of-access state.

## 5. Cross-platform handoffs and success checks

| Check ID | Cross-platform situation | Expected result |
|---|---|---|
| H01 | Host creates invite on web; guest opens on Android | Same room and role after fresh authorization; native app is not required for web fallback |
| H02 | Android host shares to iOS/web | Screen share observable on both other clients, subject to native feasibility spike |
| H03 | iOS guest reopens revoked invite after backgrounding | No access; no stale join or cached private data |
| H04 | Web member proposes task; Android owner approves; iOS member opens task | Single verified task with correct ID/status; no duplicate writes |
| H05 | Guest asks voice AI a private host pricing question | No host-private response via voice, chat, citations or source metadata |
| H06 | One participant declines STT; others consent | Human call continues; declined person's track not sent to STT |
| H07 | AI quota fails during live meeting | Human room/chat remain functional; truthful degraded indicator |
| H08 | Native guest opens invite without app installed | Browser-based restricted join path or clear permitted alternative; no forced full signup |

## 6. Open product/UX decisions (pending, not assumed)

| Decision | Proposed working assumption | Required follow-up |
|---|---|---|
| Exact room/meeting invite URL shape | HTTPS app/universal link with opaque invite reference | Identity/UX/security review; implementation in later PR |
| Guest passcode use | Optional challenge only when meeting configuration requires it | Decide access tier and secure recovery |
| Guest use of notes/whiteboard/polls | Only with explicit scoped permission | Per-role matrix approval |
| After-meeting guest recap | Denied unless meeting owner grants specific artifact | Retention and rights review |
| Consent timing around an already-active transcription session | New joiner has no consent by default; no audio to STT | Define UI and stream boundary tests |
| Mobile background audio and screen-share continuation | OS/platform-dependent; show accurate state | Device spike and release parity testing |
| Voice AI simultaneous request behavior | Single active turn with busy/retry response | Voice design and usability review |

## 7. Validation protocol and handoff

- Walk UJ-01–UJ-12 with one student, team member, host and external-guest scenario in design review; do **not** label these interviews completed.
- QA authors acceptance tests for all success and denial paths from [State and Error Matrix](./STATE_AND_ERROR_MATRIX.md).
- UX turns the diagrams in [Flow Diagrams](./USER_FLOW_DIAGRAMS.md) into frame-level flows; [Mobile Navigation](./MOBILE_NAVIGATION_AND_DEEP_LINKS.md) specifies adaptive UI and deep-link rules.
- Product Owner resolves open decisions; Security & Privacy Lead verifies permission/consent paths; Cross-platform QA Lead verifies required parity. These roles are proposed, not yet assigned or signed.
