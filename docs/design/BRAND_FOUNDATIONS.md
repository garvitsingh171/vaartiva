# Vaartiva — Brand Foundations

> **Issue:** VRT-004 · **Version:** 0.1 · **Date:** 2026-11-19 · **Status:** Proposed direction, approval pending.  
> **Accountable role:** Product / UX Lead (named assignee pending).

## 1. Product promise

**Vaartiva — Meet together. Think together. Get things done.**

An AI-native collaboration platform where groups talk, evaluate evidence, preserve decisions, and execute approved follow-up work. We are **not** positioning Vaartiva as an autonomous agent that may negotiate or publish actions without human authorization.

## 2. Personality and brand traits

| Trait | Design implication | Avoid |
|---|---|---|
| Trustworthy | Calm contrast, explicit status, traceable actions | Fake certainty or fake completion |
| Collaborative | People-first room layout, shared context | AI visually dominating humans |
| Intelligent | Recognizable AI participant, evidence context | Gratuitous glowing AI effects |
| Clear | Scannable hierarchy, plain language | Dense dashboards without hierarchy |
| Respectful | Visible consent, permission and disclosure | Hidden transcription, private-source surprises |
| Adaptable | Responsive layouts and native conventions | Desktop layout copied to mobile unchanged |

## 3. Proposed visual direction

- **Design metaphor:** a focused digital workspace, not a science-fiction chatbot.
- **Primary:** confident blue (`#3856D6`) for navigation and approved primary actions in light mode.
- **AI identity:** distinct violet (`#6842B5` light / `#CFB8FF` dark) **plus explicit “AI” label/icon and state text**.
- **Neutrals:** cool white and midnight navy provide a serious, readable canvas.
- **Semantic feedback:** success, caution and destructive roles are independent from brand/AI colors.
- **Surfaces:** mostly flat layered cards with gentle borders and purposeful elevation; no permanent visual noise.
- **Typography:** Inter where available, platform-native sans fallbacks; prioritize readable 16px base and responsive scaling. No bundled font files.

## 4. Approved-type copy patterns (proposals)

| Situation | Preferred UI label | Why |
|---|---|---|
| Visible AI participant | `Vaartiva AI · Ready` | Distinct identity and state |
| AI processing | `Vaartiva AI · Thinking` | No false human-like presence |
| Meeting transcription | `Transcription on · 4 of 5 people consented` | Concrete disclosure; **only** consenting tracks may be processed |
| Shared answer | `Shared with everyone in this room` | Audience scope explicit |
| Private answer | `Only you can see this answer` | User must know audience |
| Task proposal | `Review action` | Proposal is not completion |
| Task succeeded | `Task created · #ID` | Only after verified server result |
| Unsupported source | `I couldn't verify that from shared sources` | No invented citations |

Do not use `Done` for task writes unless the backend confirms an actual persisted object and audit evidence. Never equate a private AI panel with permission to expose private content in a public room.

## 5. Identity system and logo policy

**Provisional identity:** a text-based `vaartiva` wordmark, abstract interlocking dialogue motif *only as a concept*. Do not treat the preview mark as the official logo. Brand artwork, trademark availability, final color approvals, and future app icons require separate review.

- Brand name spelling: **Vaartiva**, lower-case wordmark allowed.
- Use a flat monochrome identity where low-resolution contexts require it.
- Do not make the AI badge identical to a human avatar. Use text and a dedicated AI pictogram or initials.
- Avoid using green, red or purple alone to communicate user permissions or task execution.

## 6. Core layout principles

- Desktop meeting: video grid primary; collapsible agenda/chat/AI panel secondary.
- Native meeting: respect notches/safe areas; use bottom controls and task-specific sheets/tabs.
- Critical controls (mute, leave, transcription, audience scope, approve) must remain identifiable and discoverable.
- Offline/AI-unavailable conditions must not visually imply the room itself has failed if human media still works.

## 7. Decisions pending

- [ ] Approve brand color direction and decide whether an existing official logo should supersede the preview.
- [ ] Validate color preference and readability with target student/team/guest users.
- [ ] Approve wordmark treatment and icon licenses separately.
- [ ] Confirm localization and font fallback policy for Hindi and other scripts.

## Related documents

[Design tokens](./DESIGN_TOKENS.md) · [UI kit](./UI_KIT_SPEC.md) · [Accessibility](./ACCESSIBILITY.md) · [VRT-001 PRD](../PRD.md) · [VRT-002 scope](../MVP_SCOPE_CONTRACT.md)
