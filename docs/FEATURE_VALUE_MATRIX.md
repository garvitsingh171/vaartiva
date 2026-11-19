# Vaartiva — Feature, Value, Metric & Owner Matrix

> **Document ID:** VRT-001 · **Version:** 0.1 (proposed) · **Date:** 2026-11-19  
> **Status:** Candidate flagship scope; final release freeze follows VRT-002.  
> **Product owner:** Repository maintainer · **Related:** [PRD](./PRD.md) · [Audience Map](./AUDIENCE_MAP.md)

## How to use this registry

- **DRI (directly responsible individual)** below is a **single accountable functional role**, not a named human who has accepted the work. The project maintainer is responsible for mapping roles to real assignees before implementation.
- **Value / evidence** must be observable. Numeric thresholds are proposed, not currently measured.
- **Scope** labels mean **LC = launch candidate**, **LCC = launch-critical candidate**, and **PG = provider-gated/conditional**. VRT-002 owns final decisions.
- Feature IDs are stable references used by the PRD, audience map, implementation backlog, acceptance tests and scope change proposals.

| ID | Feature / requirement | Audience benefit | Observable metric / acceptance evidence | Scope | Accountable owner (DRI role) |
|---|---|---|---|---|---|
| F01 | Accounts, workspaces, membership and roles | Team sees only its workspace | Unauthorized member cannot load private workspace fixture | LC | API / Identity Lead |
| F02 | Guest identity, expiring invite, admission and revocation | Partner joins without broader data access | Valid invited guest joins; revoked/expired/denied request fails in negative tests | LC | API / Identity Lead |
| F03 | Create, schedule and recurring meeting sessions | Groups meet consistently and return to context | Session creation, lifecycle and recurrence tests pass | LC | Meetings Product Engineer |
| F04 | Group A/V native room for 3–6 humans across 3 clients | Participants can collaborate from any supported device | Scripted six-human mixed-device room completes without blocking failure | LCC | Real-time Media Lead |
| F05 | Screen share, chat and participant presence | Participants can discuss the same material live | Authorized messages/screenshare arrive across supported clients; mobile fallback documented | LC | Client Collaboration Lead |
| F06 | Agenda, collaborative notes and internal tasks | Decisions become follow-up work | Two authorized participants see persistent shared edits/tasks in test | LC | Collaboration Lead |
| F07 | Polls and whiteboard | Groups brainstorm and resolve choices together | Two participants interact successfully across clients or an explicit supported fallback | LC | Collaboration Lead |
| F08 | Decision Cards with proposal/confirmation/supersession | Teams stop confusing discussions with decisions | Every confirmed card has confirmer/state and evidence or manual annotation | LC | Collaboration Lead |
| F09 | Scoped documents, indexing, RAG and citations | Users find support without leaking private data | Controlled evaluation returns attributable citations and zero unauthorized source references | LC | Knowledge / RAG Lead |
| F10 | Speaker-scoped consent, STT and transcript state | Participants know what is captured and by whom | Nonconsenting tracks are never routed to STT in verified tests | LC | AI / Voice Lead |
| F11 | Visible AI participant with typed/voice invocation and cancellation | In-room help is deliberate and understandable | AI states and cancellation work; no background unsanctioned invocation | LC | AI / Voice Lead |
| F12 | Audience-aware public and user-private specialist AI workflows | Internal users receive private help safely | Guest/public listeners cannot receive host-private content in red-team tests | LC | AI Orchestration Lead |
| F13 | Proposal, explicit approval, verified task execution | Meeting commitments create actual work | 100% of claimed successful writes have persisted IDs/audit records; retry is idempotent | LC | API / Actions Lead |
| F14 | External connectors (GitHub, Calendar, Notion, Drive, Slack, Jira, Gmail as eligible) | Avoid duplicate manual entry | Each advertised connector passes verified OAuth/scope/write tests or is shown unavailable | PG | Integrations Lead |
| F15 | Recaps, decision history and approved task follow-up | Teams retain useful meeting knowledge | Authorized viewer retrieves recap with accurate proposal/confirmation markers | LC | Collaboration Lead |
| F16 | Consent, ACL/audience policy, audit, deletion and safe errors | All audiences retain trust and control | Negative authorization/consent tests pass; retention/deletion policy approved | LCC | Security & Privacy Lead |
| F17 | Shared web/Android/iOS critical-flow parity, resilience, accessibility | No participant is stranded by device or AI outage | Critical parity matrix passes; room stays usable without AI in fault tests | LCC | Cross-platform QA Lead |

## Metric definitions and evidence standards

| Category | Definition / proof |
|---|---|
| Join task completion | A user reaches a usable authorized room from a valid invitation without external assistance; record denominator and pilot sample |
| Mixed-device meeting | One meeting with six human participants spread across web, Android and iOS on physical/representative devices; record failures and network conditions |
| Verified task write | Persisted application-side task ID + correct owner/scope + audit record after explicit approval; model prose alone is **not** evidence |
| Grounded answer | Citation resolves to a retrieved document or consented transcript source available to the request's **output audience**; ungrounded responses clearly say so |
| Confirmed decision | Human-confirmed state, confirmer, time, and either genuine supporting reference or explicit unsupported/manual confirmation annotation |
| Private-source denial | Unauthorized source is excluded before retrieval/model context and not exposed through text, voice, citations, titles, logs or indirect metadata |
| Consent compliance | Capture/transcription path excludes nonconsenting speakers; UI reflects changes and withdrawal behavior |
| Cross-platform parity | One shared behavior contract for critical user jobs, with client-specific implementation/fallback documented and tested |

## Ownership and review workflow

1. **Product Owner** maintains the feature registry and gathers unresolved product decisions.
2. **Single DRI role** is accountable for each feature; supporting teams can collaborate without splitting accountability.
3. **Security & Privacy Lead** must review F02, F09–F14 and F16 before policy-sensitive implementation ships.
4. **Cross-platform QA Lead** owns the integrated acceptance matrix, not implementation of every client feature.
5. Contributors propose threshold/priority/scope changes in a traceable issue or PR: state user job, previous/new behavior, reason, cross-platform impact, security impact and updated tests.
6. When VRT-002 approves launch scope, update scope labels here and reconcile PRD, release-gate docs and backlog together.

## Pending decisions

- [ ] Assign named contributors to DRI roles; do not represent roles as accepted assignees yet.
- [ ] Confirm which connector providers are genuinely launch-critical versus provider-gated optional integrations.
- [ ] Establish privacy-approved analytic events and metric collection details.
- [ ] Calibrate performance/usability targets after technical spikes and formative research.
- [ ] Define acceptable native screen sharing failure/fallback behavior after Android/iOS feasibility checks.
