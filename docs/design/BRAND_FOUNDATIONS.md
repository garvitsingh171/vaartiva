# Vaartiva — Brand Foundations

> **Issue:** VRT-004 · **Version:** 0.2 · **Date:** 2026-11-19 · **Status:** Updated to the approved VRT-004 palette direction; visual review remains pending.
> **Accountable role:** Product / UX Lead (named assignee pending).

## 1. Product promise

**Vaartiva — Meet together. Think together. Get things done.**

An AI-native collaboration platform where groups talk, evaluate evidence, preserve decisions, and execute approved follow-up work. Vaartiva is not positioned as an autonomous agent that may negotiate or publish actions without human authorization.

## 2. Personality and brand traits

| Trait | Design implication | Avoid |
|---|---|---|
| Trustworthy | Calm contrast, explicit status, traceable actions | Fake certainty or fake completion |
| Collaborative | People-first room layout, shared context | AI visually dominating humans |
| Intelligent | Recognizable AI participant, evidence context | Gratuitous glowing AI effects |
| Clear | Scannable hierarchy, plain language | Dense dashboards without hierarchy |
| Respectful | Visible consent, permission and disclosure | Hidden transcription, private-source surprises |
| Adaptable | Responsive layouts and native conventions | Desktop layout copied to mobile unchanged |

## 3. Refined visual direction

- **Primary brand:** copper orange `#9C3D20` for light-mode primary actions and active navigation. Dark mode uses soft copper `#F6A17E`.
- **AI identity:** champagne gold `#80531B` in light mode and soft gold `#F4D097` in dark mode. Pair the color with a distinct AI label/icon and state text.
- **Light canvas:** warm ivory `#F8F5F1`, with warm off-white surfaces and subtle neutral separation.
- **Dark canvas:** graphite `#141316`, with slightly elevated charcoal surfaces and light warm-neutral text.
- **Status colors:** success uses labeled blue-slate, warning uses muted amber, destructive uses accessible red, and information uses blue-slate. Status colors do not replace text or icon labels.
- **Hierarchy:** copper is for important actions; gold identifies AI and is not a general decorative accent.
- **Surfaces:** mostly flat layered cards with purposeful borders; avoid permanent visual noise.
- **Typography:** Inter where available, platform-native sans fallbacks; prioritize readable 16px base and responsive scaling. No bundled font files.

The canonical primitive and semantic values are in [tokens.json](../../design/tokens/tokens.json); theme values are mirrored for the preview in [tokens.css](../../design/tokens/tokens.css).

## 4. Approved-type copy patterns

| Situation | Preferred UI label | Why |
|---|---|---|
| Visible AI participant | `Vaartiva AI · Ready` | Distinct identity and state |
| AI processing | `Vaartiva AI · Thinking` | No false human-like presence |
| Meeting transcription | `Transcription on · 4 of 5 people consented` | Concrete disclosure; only consenting tracks may be processed |
| Shared answer | `Shared with everyone in this room` | Audience scope explicit |
| Private answer | `Only you can see this answer` | User must know audience |
| Task proposal | `Review action` | Proposal is not completion |
| Task succeeded | `Task created · #ID` | Only after verified server result |
| Unsupported source | `I couldn't verify that from shared sources` | No invented citations |

Do not use `Done` for task writes unless the backend confirms a persisted object and audit evidence. A private AI panel does not authorize exposing private content in a public room.

## 5. Identity system and logo policy

**Provisional identity:** a text-based `vaartiva` wordmark, abstract interlocking dialogue motif only as a concept. The preview mark is not the official logo. Brand artwork, trademark availability, final color approval and app icons require separate review.

- Brand name spelling: **Vaartiva**, lower-case wordmark allowed.
- Use a flat monochrome identity where low-resolution contexts require it.
- Do not make the AI badge identical to a human avatar. Use text and a dedicated AI pictogram or initials.
- Keep status and permission meaning explicit with labels and icons.

## 6. Core layout principles

- Desktop meeting: video grid primary; collapsible agenda/chat/AI panel secondary.
- Native meeting: respect notches/safe areas; use bottom controls and task-specific sheets/tabs.
- Critical controls (mute, leave, transcription, audience scope, approve) must remain identifiable and discoverable.
- Offline/AI-unavailable conditions must not visually imply the room itself has failed if human media still works.

## 7. Decisions pending

- [ ] Confirm whether an existing official logo should supersede the preview.
- [ ] Validate color preference and readability with target student/team/guest users.
- [ ] Approve wordmark treatment and icon licenses separately.
- [ ] Confirm localization and font fallback policy for Hindi and other scripts.

## Related documents

[Design tokens](./DESIGN_TOKENS.md) · [UI kit](./UI_KIT_SPEC.md) · [Accessibility](./ACCESSIBILITY.md) · [VRT-001 PRD](../PRD.md) · [VRT-002 scope](../MVP_SCOPE_CONTRACT.md)
