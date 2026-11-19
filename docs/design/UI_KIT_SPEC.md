# Vaartiva — UI Kit Specification

> **VRT-004** · Version 0.1 · Proposed component specifications only. Product components are not implemented here.

## 1. Common anatomy

Every component specification must include: name, intended user job, anatomy, size, variant, states, keyboard behavior, accessibility semantics, responsive behavior, semantic tokens, and ownership. A disabled appearance is not permission enforcement: the server remains the authority.

**State vocabulary:** `default`, `hover` (pointer web), `pressed`, `focus-visible`, `disabled`, `loading`, `error`, `success`, `empty` (as relevant). Async actions add `pending`, `confirmed`, `failed`, `unknown outcome` where applicable. Don't show `success` for an unverified AI/tool response.

## 2. Proposed component inventory

| ID | Component | Key variants/states | Required UX behavior | Primary owner role |
|---|---|---|---|---|
| C01 | Button | primary, secondary, outline, ghost, danger; sm/md/lg; loading/disabled | Descriptive text; prevents duplicate submit while pending | UI Platform Lead |
| C02 | Icon button | neutral, destructive, toggle; 44–48px touch | Tooltip/accessibility name; toggle state exposed | UI Platform Lead |
| C03 | Text input | text, search, password; error, disabled | Persistent label, hint, validation text | UI Platform Lead |
| C04 | Select / menu | single, multi, native picker | Keyboard/reader traversal, visible selection | UI Platform Lead |
| C05 | Checkbox / switch | checked, unchecked, disabled | Clear label; consent is explicit, not inferred | UI Platform Lead |
| C06 | Dialog / sheet | modal, confirmation, drawer | Focus management, escape/back and safe-area handling | UI Platform Lead |
| C07 | Toast / banner | info, success, warning, error | Accessible status announcement and appropriate persistence | UI Platform Lead |
| C08 | Badge / status chip | human, AI, guest, privacy, task | Text + icon, not color-only | UI Platform Lead |
| C09 | Tabs / navigation | top, bottom, side | Active route announced; native and web patterns vary | Cross-platform UX Lead |
| C10 | Avatar / presence | human, AI tile, guest, speaking, muted | Identity and speaker state distinguishable | Media UX Lead |
| C11 | Participant tile | camera on/off, screen share, reconnect | Accessible name/role, no phantom connected status | Media UX Lead |
| C12 | Call control bar | mic, camera, share, AI, leave | Large targets, predictable exit/confirmation | Media UX Lead |
| C13 | Prejoin device panel | permission pending, allowed, denied, no device | Actionable recovery rather than silent fail | Media UX Lead |
| C14 | Guest invitation / admission | pending, admitted, denied, expired, revoked | Clear access limits; no private metadata leak | Identity UX Lead |
| C15 | AI participant tile | absent, ready, listening, thinking, speaking, failed | Visible **AI** label plus true runtime state | AI UX Lead |
| C16 | AI answer card | public, private, cited, unverified | Exact audience label and citations; never share user-private answers inadvertently | AI UX Lead |
| C17 | Consent status / control | requested, agreed, withdrawn, partial | Capture exclusion and visible per-speaker status | AI + Privacy UX Lead |
| C18 | Document card / source citation | uploading, processing, ready, denied, failed | Source title only when authorized; retry and delete | Knowledge UX Lead |
| C19 | Decision card | proposed, confirmed, superseded | Evidence state, human confirmer and timestamp | Collaboration UX Lead |
| C20 | Action approval card | proposed, editing, approving, executed, failed, unknown | Review exact inputs; backend verified ID after success | Actions UX Lead |
| C21 | Shared task row | owner, pending, done, blocked | Human-editable state; clear scope/ownership | Collaboration UX Lead |
| C22 | Empty / skeleton / offline | loading, no data, permission denied, retry | Next action and consistent wording | UI Platform Lead |

Component owner is the **functional DRI role**, not a real assigned person. Match actual maintainers when implementation begins.

## 3. Core variants and anatomy details

### Button (C01)

- Primary: uses `color.action.primary` and `color.action.onPrimary`, semibold 14–16px text; 40px desktop and ideally 48px native target.
- Secondary: border + surface, primary text; no unlabeled icon-only primary call to action.
- Danger: separate destructive semantics; confirm irreversible actions.
- Loading: visible label (`Creating…`) and proper progress semantics; don't automatically retry non-idempotent writes.
- Hover: web pointer only. Focus: 2px ring + sufficient space/outline. Mobile uses pressed state and OS accessibility focus.

### Participant / AI tiles (C10/C11/C15)

- Human tile: name + optional role + actual track state (camera off, mic muted, reconnecting).
- Guest tile: `Guest` label visible in participant list; never expose workspace membership as if granted.
- AI tile: explicit `AI` badge, distinct icon, status label `Ready`, `Listening`, `Thinking`, `Speaking`, `Unavailable` or `Removed`.
- Audio activity indicator is **not** a recording/consent indicator. Include separate transcription status.
- Screen reader announces identity and state without repeated noisy live updates.

### AI Answer (C16)

- Two independently visible audience variants: `Shared with room` and `Only you`.
- Public answers must be generated from **room-public permissible sources only**; visual badge is not enforcement.
- Citation rows show authorized source title/location or `No verifiable source available`.
- Speech playback in public rooms is not used for private content.

### Consent control (C17)

- Before transcription, clearly disclose purpose, whether speaker's audio is processed, and control to decline/withdraw.
- Per-speaker consent is an authorization/data-flow requirement, not just UI color.
- Consent-off / paused / withdrawn appear with text and symbols; do not suggest speech is being processed when it isn't.

### Action approval (C20)

- Show exact operation, destination, parameters, who is authorizing, and source/context.
- `Approve` may only be enabled for an authorized user and with clear irreversible effects.
- `Success` requires verified backend result + durable ID/audit, not model prose.
- Unknown outcome must provide safe status check rather than blind retry.

## 4. Responsive behavior

| Layout context | Desktop web | Mobile web | Native Android/iOS |
|---|---|---|---|
| Main navigation | Stable side/top rail | Condensed tabs | Platform-native stack/tab |
| Meeting | Adaptive grid + resizable side panel | Primary video + drawer | Video grid + bottom sheet/tab |
| Controls | Toolbar, keyboard shortcuts | Persistent essentials | Safe-area-aware 44–48px targets |
| Document / AI | Inline side panel | Bottom/overlay sheet | Task-focused sheet with explicit back |
| Modals | Dialog with focus trap | Full/small screen dialog | Native dialog/sheet conventions |
| Deep link | Browser route | Browser fallback | Verified link → auth/resume → reauthorize |

Do not assume that generic web hover states, HTML portals, or DOM focus behavior automatically work on React Native.

## 5. Required composition samples

1. **Prejoin:** room title, camera preview, permission state, guest/host disclosure, explicit Join.
2. **Meeting:** 3–6 human tiles, separate AI tile, screen share, chat/drawer, persistent call controls.
3. **AI panel:** public/private audience label, typed/voice entry, visible state, source citations.
4. **Decision/action:** proposal, evidence, confirmation/review, verified success or failure.
5. **Invalid invite:** no meeting data disclosed; safe explanation and contact-host recovery.
6. **Network interrupted:** preserve user context; clear degraded vs failed capabilities.

This issue defines the UI kit and a standalone static visual preview, **not production React components or Figma-created variants**. Implement composition and device tests in later PRs.

## Related

[Tokens](./DESIGN_TOKENS.md) · [Accessibility](./ACCESSIBILITY.md) · [VRT-003 user journeys](../ux/USER_JOURNEYS.md)
