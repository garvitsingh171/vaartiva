# Vaartiva — Product Requirements Document (PRD)

> **Document ID:** VRT-001 · **Version:** 0.1 (proposed) · **Date:** 2026-11-19  
> **Status:** Draft for G0 review · **Document owner:** Product Owner (initially repository maintainer)  
> **Target surfaces:** Web, Android, iOS · **Related:** [Audience Map](./AUDIENCE_MAP.md) · [Feature Value Matrix](./FEATURE_VALUE_MATRIX.md)

## 1. Executive summary

**Vaartiva** is an AI-native meeting and collaboration platform in which people hold real-time audio/video meetings and can deliberately include a **visible AI participant**. With consent and permission-aware context, the AI can answer meeting questions, retrieve approved evidence, help distinguish proposals from confirmed decisions, and propose follow-up work. Consequential actions are executed only after an authorized human approves the exact action.

**Product promise:** *Meet together. Think together. Get things done.*  
**One-sentence positioning:** An AI-native meeting workspace that converts small-group conversations into source-grounded answers, verifiable decisions, and approved follow-up work.

**Document purpose:** Set the product-level intent, user outcomes, and feature ownership for VRT-001. It is **not** a claim that features have been built, user demand has been validated, technical feasibility has been proven, or the final release scope has been signed off.

**Roadmap precedence:** This PRD reflects the **18 November 2026 flagship cross-platform master plan**. It supersedes earlier web-first/mobile-later assumptions in the 16 November conceptual blueprint. VRT-002 owns final release scope and acceptance gates; VRT-003 owns detailed cross-platform flows.

## 2. The problem

Small-group meetings transfer information but often fail to preserve trustworthy context and turn decisions into completed work:

1. People leave without a shared, verifiable record of which decisions were **confirmed** versus merely suggested.
2. Action items are spoken aloud but are not assigned, tracked, or completed in a common workspace.
3. Participants spend meeting time finding past notes and documents scattered across separate tools.
4. AI-generated answers may sound certain without provenance, or may expose information the listener is not allowed to access.
5. External guests need to participate in a meeting without gaining access to internal discussions, personal assistants, or confidential documents.
6. Mobile participants need to participate in the **same** meeting, not a separate, reduced-trust session.

**Primary job-to-be-done:** “When our group meets to discuss and decide, help us access the right information, agree on what was actually decided, and convert approved next steps into trackable work—without giving up control of confidential information.”

## 3. Users and market hypothesis

Our **proposed initial users** are small project and study groups, startup/operational teams, and guest collaborators. These are **design hypotheses**, not research-validated market segments. See [Audience Map](./AUDIENCE_MAP.md).

| Segment | Core job | High-value moment | Important constraint |
|---|---|---|---|
| Students and project groups | Discuss work, understand shared material, track responsibilities | A study/project meeting ends with cited explanations and agreed tasks | Simple onboarding and low cognitive load |
| Small professional/startup teams | Make and follow through on decisions | A sprint/launch meeting yields a confirmed decision and assigned task | Workspace roles, reliable room, evidence |
| External negotiating guests | Join a specific discussion without entering the host's wider workspace | A partner joins via restricted invite and sees only permitted content | Guest separation, consent, limited access |
| Host/facilitator (cross-cutting role) | Run meeting and authorize sharing/actions | Guest admitted and AI action approved by authorized actor | Verifiable control over room and approvals |

**Initial use cases:** group study, sprint planning, small-team operations check-ins, and a bounded client/vendor negotiation. Not a full webinar, classroom LMS, sales CRM, or enterprise compliance suite.

## 4. Goals and success hypotheses

All numeric targets below are **proposed launch acceptance targets**, not measured baselines or current product performance. They need feasibility testing, privacy review, and calibration in VRT-002 and later evaluation work.

| Goal | Proposed success signal | Measurement approach |
|---|---|---|
| Reliable small-group meetings | A scripted **six-human** room test completes on mixed web/Android/iOS devices without a blocking failure | QA scenario logs and pass/fail report |
| Low-friction guest participation | At least **80%** of moderated first-time guest test participants enter a valid invited room without facilitator assistance | Usability study (small, documented sample) |
| Decisions stay attributable | **100%** of confirmed Decision Cards have a confirmer, state, and an evidence reference or explicit “manually confirmed/no source” annotation | Contract/integration test and sampled review |
| Action is real, not simulated | **100%** of successful internal-task action claims map to a persisted task ID and audit event | Backend contract checks; negative-case tests |
| Grounding and access safety | **0 unauthorized sources** delivered in controlled cross-workspace/guest/private-source test cases | Security test corpus, automated assertions |
| AI stays controllable | **100%** of consequential write operations in test suite require a currently valid approval and authorization recheck | Integration and abuse-case tests |
| Useful post-meeting output | In pilot testing, **≥70%** of hosts rate the recap and decision/task structure useful (4 or 5 of 5) | Opt-in post-session feedback |
| Mobile parity for critical jobs | Critical create/join/participate/consent/review flows pass on web, Android, and iOS | Device acceptance matrix |

**North-star hypothesis:** Proportion of completed small-group meetings that end with at least one participant-confirmed decision or human-approved task (where those outcomes are appropriate). Avoid optimizing by creating fake decisions or tasks.

**Guardrails:** meeting join failure rate; room dropout; unexpected AI usage; privacy/security incidents; manual override success; AI provider cost per meeting; unsupported-source answer rate. Never store raw confidential conversations in product analytics merely to compute metrics.

## 5. Product principles

1. **Humans and conversation first:** An audio/video room remains useful when AI is off or unavailable.
2. **Visible, deliberate AI:** AI is identifiable, has a clear state, and is invoked intentionally; no covert listening or hidden AI action.
3. **Consent before processing:** Participant-level capture/transcription rules are respected, including nonconsenting speaker tracks.
4. **Audience-aware authorization:** “Who is asking?” and “Who will hear/see the answer?” are separate authorization questions.
5. **Evidence over performance:** Do not invent citations, timestamps, approvals, or execution results. Express uncertainty.
6. **Propose → review → approve → execute → verify:** Model-generated intent is never a completed action.
7. **Cross-platform by design:** Web, Android, and iOS are planned as one interoperability and release target, subject to VRT-002's signed scope contract.
8. **Accessible failure states:** Denied permissions, missing documents, dropped network, guest rejection, and AI outages must leave users informed and in control.

## 6. Core meeting contract

**C-01 Room size:** The flagship native-room **baseline is 3–6 human participants** per room, across any mixture of browser, Android, and iOS clients. A visible AI participant is additional and is **not** counted toward the 3–6 human baseline. Smaller rooms may be supported, but do not define the baseline. Capacity is server-enforced; larger rooms are not promised.

**C-02 Interoperability:** Participants on different supported clients join one shared room with a consistent meeting identity, participant presence, rights, and shared collaboration state. Native clients are actual React Native/Expo builds, not merely a mobile website wrapper.

**C-03 Guest participation:** A host can share an invitation using a scoped, expiring link or meeting identifier with passcode where configured. Guests authenticate with a constrained guest identity, pass through a pre-join experience and host-controlled admission/waiting process, and only receive authorized room access. Guest status and restrictions remain visible.

**C-04 Media and collaboration:** Intended room capabilities include bidirectional audio/video, mic/camera controls, screen share (including native platform feasibility), chat, agenda, collaborative notes, decisions, and tasks. Polls/whiteboard are in the flagship roadmap; VRT-002 will confirm precise launch-critical parity and fallback behavior.

**C-05 Knowledge access:** Documents, transcript segments, workspace content, and private agent memories have explicit access scopes. Sharing into a guest-visible context must be deliberate. A room membership alone does not grant access to all workspace or host-private sources.

**C-06 AI interaction:** A distinguished AI tile/status appears only when the AI is enabled/invited. People invoke voice or typed assistance explicitly. Responses include citations when evidence exists; lack of support is disclosed. One active public spoken question at a time is an acceptable initial constraint.

**C-07 AI authorization and action:** An AI may propose an internal task or other configured action. The backend validates identity, scope, approver authority, action details, and idempotency before execution. External writes depend on supported, properly permissioned connectors; unsupported integrations are not promised.

**C-08 Meeting outcome:** The post-meeting workspace identifies confirmed decisions, proposed decisions, suggested tasks, actual approved tasks, sources, and missing evidence. No consented transcript means no fabricated transcript-based recap.

**C-09 Privacy lifecycle:** Consent state and access changes must be enforceable; users see relevant retention/deletion controls. Final retention periods, legal text, and deletion SLAs require security/privacy review in later G0 issues.

## 7. Product requirements and proposed scope

Requirements are **candidate flagship launch scope**, not the VRT-002 freeze. Feature IDs and accountable roles are maintained in the [Feature Value Matrix](./FEATURE_VALUE_MATRIX.md). "Provider-gated" means availability must be documented and capability-checked rather than promised universally.

| ID | Functional requirement | Planned scope | Acceptance intent |
|---|---|---|---|
| F01 | Account identity, workspaces and member roles | Launch candidate | Non-member cannot access private workspace data |
| F02 | Limited guest identity, invite, waiting/admission/revocation | Launch candidate | Guest blocked before authorization; denied invite fails safely |
| F03 | Create, join, schedule and recurring meeting sessions | Launch candidate | Valid sessions have lifecycle and authorized participants |
| F04 | Web/Android/iOS real-time audio/video for 3–6 humans | Launch-critical candidate | Mixed-device six-human scripted meeting succeeds |
| F05 | Screen sharing, in-room chat and presence | Launch candidate | Access-controlled live collaboration; native limitations explicit |
| F06 | Agendas, shared notes and assignable internal tasks | Launch candidate | Edits visible to authorized attendees and persist appropriately |
| F07 | Polls and whiteboard | Launch candidate | Authorized collaborators can participate across devices or known graceful fallback |
| F08 | Proposed/confirmed/superseded Decision Cards | Launch candidate | State, confirmer and supporting reference traceable |
| F09 | Approved document upload, scoped retrieval and citations | Launch candidate | Guest/private sources never cross audience boundary |
| F10 | Consented, participant-aware live transcription | Launch candidate | Refusing speakers are not transcribed; status transparent |
| F11 | Explicitly invoked visible AI participant, voice and text | Launch candidate | Invocation, cancellation, limits and fallback demonstrable |
| F12 | Public-room and user-private specialist AI workflows | Launch candidate | Private agent responses never leak into public room without authorized share |
| F13 | Proposal, approval and verified internal task execution | Launch candidate | Approval and actual persisted result required |
| F14 | External connectors with approved writes | Conditional / provider-gated | Unsupported providers show unavailable capability, not mock success |
| F15 | Post-meeting recap, decision and task history | Launch candidate | Source-backed artifact readable by authorized audience |
| F16 | Permissions, audit trail, consent, retention/deletion and safe errors | Launch-critical candidate | Negative security paths and user controls tested |
| F17 | Cross-platform parity, resilience and accessibility | Launch-critical candidate | Critical job parity and fallback tests passed on all three clients |

### Explicit exclusions / no false promises

- No enterprise SSO or unrestricted autonomous contract negotiation.
- No built-in meeting **recording library/playback** in initial release.
- No covert recording, hidden transcription, or AI access to nonconsenting audio.
- No guaranteed access to all third-party providers, emails, calendars, or live Google Meet bots.
- No custom self-built media SFU in the flagship plan.
- No unlimited room size, flawless recognition, or unconditional 24/7 AI availability.
- No automatic external or private-data sharing without an explicit authorization and audience check.

## 8. Primary user scenarios

### Scenario S1: Student project group

Four students meet from mobile and web, discuss a shared project specification, and ask the visible AI a question about a document explicitly made available to the meeting. After the discussion, a student confirms a decision and approves creation of an assigned internal task. **Success:** citation is genuine, the task ID is real, and another authorized member can see it after the room ends.

### Scenario S2: Startup sprint planning

Five teammates use a scheduled room, screenshare progress, review an agenda, and distinguish a suggested launch date from a confirmed launch decision. **Success:** final decision state and owners are recorded; interrupted AI service does not end the human call.

### Scenario S3: External vendor negotiation

A host admits a vendor using a restricted guest invitation. The group discusses permitted offer terms. The vendor asks the public AI for the host's internal walk-away price, which exists only in host-private knowledge. **Success:** the system blocks private retrieval **before** AI context assembly, does not reveal facts in speech/chat/citations, and records the denied action appropriately without logging confidential content.

### Scenario S4: Guest, consent and interruption

A guest declines transcription while other speakers consent. Only eligible inputs may be processed; UI communicates which capture/AI functions are active. Network failure or AI quota exhaustion produces an honest error, not a fake recap or fake task execution. **Success:** human media and consent protections remain intact.

High-level scenarios above inform VRT-001; complete screen-by-screen flows and device-specific edge cases belong to VRT-003.

## 9. Trust, permission and AI safety acceptance rules

- Identity (`principal`) and output/listener (`audience`) must both be authorized for all retrieved sources, including transcripts and derived embeddings.
- Guest admission cannot silently grant workspace membership, broader knowledge access, or access to past meetings.
- Model prompts are **not** a security boundary. Filter sources prior to retrieval and prior to model input.
- Host-private and user-private assistant content must never be spoken into a public room solely because the same host is present.
- Each participant's consent and withdrawal is auditable; nonconsenting audio is not routed to transcription/AI capture.
- AI tile, capture status, suggested-vs-executed actions, and source evidence must be distinguishable to ordinary users.
- Prompt injection in user-provided documents cannot override system permissions or authorize writes.
- Retried approval/execution must not duplicate an internal task.
- Privacy-sensitive data should not appear in general error telemetry or analytics payloads.

These are **product requirements**. Detailed threat model, policy schema, retention decisions and automated verification are tracked in subsequent planning and security issues.

## 10. Analytics and validation plan

**Minimum privacy-conscious events** (without transcript text/document contents): `meeting_created`, `join_started`, `join_succeeded`, `join_failed_reason`, `guest_admitted`, `guest_denied`, `ai_invoked`, `ai_answer_evidence_state`, `decision_confirmed`, `action_proposed`, `action_approved`, `action_execution_result`, `recap_viewed`, `consent_state_changed`.

Each event requires a documented purpose, coarse metadata, permitted retention, and an opt-in/legitimate-basis decision as applicable. Cross-platform identifiers must not leak private workspace IDs into client telemetry. Capture synthetic/scripted results first; then moderated pilot feedback from each target audience. No metric in this document represents a real observation yet.

## 11. Dependencies, assumptions, and risks

| Item | Status / owner issue | Consequence |
|---|---|---|
| Final launch scope, cross-platform parity and store release contract | **Open: VRT-002** | F01–F17 launch priorities and final thresholds can change through review |
| Exact web/Android/iOS navigation, guest deep links, failure-state UX | **Open: VRT-003** | Current scenarios are high-level and not screen designs |
| Roles, guest policies, source audience labels, retention and consent | **Open: G0 security issues and later policy implementation** | Cannot claim isolation is implemented yet |
| Six-person mixed-device media and native screen share | **Unproven: platform spikes / media phases** | Requires physical devices and realistic network tests |
| AI model and transcription cost/quota | **Unproven: later AI evaluation** | Enforce limits; degrade safely when exhausted |
| Partner/guest experience and decision utility | **Unvalidated: moderated interviews/usability testing** | Persona assumptions and target metrics may change |
| Supported connector API eligibility and OAuth approvals | **Conditional: provider assessment** | Capability-gated, never advertise unsupported integration |

## 12. Ownership, decisions and change control

- **PRD accountable owner:** Product Owner / repository maintainer.
- **Feature DRIs:** One accountable role per feature in [Feature Value Matrix](./FEATURE_VALUE_MATRIX.md). Roles are provisional until actual contributors are assigned; no feature is ownerless.
- **Proposed decision D-001:** Vaartiva targets one native-capable, interoperable web/Android/iOS product, not web-only launch.
- **Proposed decision D-002:** Treat guest negotiation as a first-class **privacy-sensitive scenario**, not a guarantee that the AI negotiates autonomously.
- **Proposed decision D-003:** Guarantee approval/verification before internal task writes; defer unsupported provider claims.
- **Open decision D-004:** Which connector capabilities are launch-gating versus optional? Resolve in VRT-002.
- **Open decision D-005:** Exact retention defaults and guest artifact access lifetime? Resolve with security/privacy planning.

**Scope-change process:** Propose a change in an issue or PR referencing the affected feature ID, user job, measurable benefit, privacy impact, impacted platforms, owner and test; record the decision and update this PRD and matrix together. No silent expansion of AI autonomy.

## 13. VRT-001 documentation acceptance checklist

- [ ] Target audiences and jobs-to-be-done have been explicitly identified.
- [ ] Room baseline states **3–6 humans across web, Android and iOS**, with visible AI as a separately identified participant.
- [ ] Guest invitation, admission, limited participation and denial scenarios are documented.
- [ ] Each enumerated feature has one owner and an observable value indicator in the feature matrix.
- [ ] Consent, source audience segregation, explicit AI action approval and verification are specified.
- [ ] Launch proposals are separated from signed scope; hypotheses from observed research.
- [ ] Known non-goals, assumptions, dependencies and open decisions are documented.
- [ ] Links to the audience map and feature matrix resolve; markdown is reviewable.

**Review sign-off:** Product Owner: _Pending_ · Security reviewer: _Pending_ · VRT-002 scope freeze: _Not part of this PR_.
