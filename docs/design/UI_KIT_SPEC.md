# Vaartiva — UI Kit Specification

> **VRT-004** · Version 0.2 · Proposed component specifications; product components are not implemented in this checkout.

## 1. Common anatomy

Every component specification includes: user job, anatomy, size, variant, states, keyboard behavior, accessibility semantics, responsive behavior, semantic tokens and ownership. A disabled appearance is not permission enforcement; the server remains authoritative.

**State vocabulary:** `default`, `hover` (web pointer), `pressed`, `focus-visible`, `disabled`, `loading`, `error`, `success`, and `empty` as relevant. Async actions add `pending`, `approved`, `executing`, `confirmed`, `failed`, and `unknown outcome`. Do not show success for an unverified AI/tool response.

## 2. Proposed component inventory

| ID | Component | Key variants/states | Required UX behavior | Primary owner role |
|---|---|---|---|---|
| C01 | Button | primary, secondary, outline, ghost, danger; sm/md/lg; loading/disabled | Descriptive text; prevents duplicate submit while pending | UI Platform Lead |
| C02 | Icon button | neutral, destructive, toggle; 44–48px touch | Tooltip/accessibility name; toggle state exposed | UI Platform Lead |
| C03 | Text input | text, search, password; error, disabled | Persistent label, hint, validation text | UI Platform Lead |
| C04 | Select / menu | single, multi, native picker | Keyboard/reader traversal, visible selection | UI Platform Lead |
| C05 | Checkbox / switch | checked, unchecked, disabled | Clear label; consent is explicit, not inferred | UI Platform Lead |
| C06 | Dialog / sheet | modal, confirmation, drawer | Focus management, escape/back and safe-area handling | UI Platform Lead |
| C07 | Toast / banner | information, success, warning, error | Accessible status announcement and suitable persistence | UI Platform Lead |
| C08 | Badge / status chip | human, AI, guest, privacy, task | Text + icon, not color-only | UI Platform Lead |
| C09 | Tabs / navigation | top, bottom, side | Active route announced; native and web patterns vary | Cross-platform UX Lead |
| C10 | Avatar / presence | human, AI tile, guest, speaking, muted | Identity and speaker state distinguishable | Media UX Lead |
| C11 | Participant tile | camera on/off, screen share, reconnect | Accessible name/role, no phantom connected state | Media UX Lead |
| C12 | Call control bar | mic, camera, share, AI, leave | Large targets, predictable exit/confirmation | Media UX Lead |
| C13 | Prejoin device panel | permission pending, allowed, denied, no device | Actionable recovery rather than silent fail | Media UX Lead |
| C14 | Guest invitation / admission | pending, admitted, denied, expired, revoked | Clear access limits; no private metadata leak | Identity UX Lead |
| C15 | AI participant tile | absent, joining, ready, listening, thinking, speaking, canceled, unavailable, error | Visible AI label plus true runtime state | AI UX Lead |
| C16 | AI answer card | public, private, cited, unverified | Exact audience label and citations; no inadvertent sharing | AI UX Lead |
| C17 | Consent status / control | requested, agreed, withdrawn, partial | Capture exclusion and visible per-speaker status | AI + Privacy UX Lead |
| C18 | Document card / source citation | uploading, processing, ready, denied, failed | Source title only when authorized; retry and delete | Knowledge UX Lead |
| C19 | Decision card | proposed, confirmed, superseded | Evidence state, human confirmer and timestamp | Collaboration UX Lead |
| C20 | Action approval card | proposed, pending approval, approved, executing, confirmed, failed, unknown | Review exact inputs; backend verified ID after success | Actions UX Lead |
| C21 | Shared task row | owner, pending, done, blocked | Human-editable state; clear scope/ownership | Collaboration UX Lead |
| C22 | Empty / skeleton / offline | loading, no data, permission denied, retry | Next action and consistent wording | UI Platform Lead |

Component owner is the functional DRI role, not a real assigned person. Match actual maintainers at implementation time.

## 3. Core variants and anatomy details

### Button (C01)

- Primary: `color.action.primary` and `color.action.onPrimary`; semibold 14–16px text and 40px desktop / ideally 48px native target.
- Secondary: secondary neutral surface with primary text; no unlabeled icon-only primary CTA.
- Destructive: separate red status role; confirm irreversible actions.
- Loading: visible label (e.g. `Creating…`) and progress semantics; do not automatically retry non-idempotent writes.
- Hover is web-pointer only. Focus uses a visible 2px ring. Native controls use platform pressed state and accessibility focus.

### Participant and AI tiles (C10/C11/C15)

- Human tile: name, optional role and true track state (camera off, mic muted, reconnecting); keep styling neutral.
- Guest tile: visible `Guest` label; do not imply workspace membership.
- AI tile: explicit `AI` badge, distinct icon, gold accent and text for `Not invited`, `Joining`, `Ready`, `Listening`, `Thinking`, `Speaking`, `Canceled`, `Unavailable` or `Error`.
- Audio activity is not a recording/consent indicator; transcription status is separate.
- Screen readers announce identity and state without repeated noisy live updates.

### AI answer (C16)

- Show distinct audience labels: `Public response · Shared with meeting` and `Private to you`.
- Public answers use only meeting-authorized sources; a visible badge does not enforce access.
- Citation rows show authorized source title/location or `No verifiable source available`.
- Private content is not played aloud in a shared room.

### Action approval (C20)

- Show exact operation, destination, parameters, authorizing person and source/context.
- Distinguish `Suggested action`, `Pending approval`, `Approved`, `Executing`, `Confirmed successful`, `Failed` and `Unknown outcome` in text and state semantics.
- `Approve` is enabled only for an authorized user and with clear effects.
- Success requires a verified backend result plus durable ID/audit evidence. Unknown outcome offers a safe status check, not blind retry.

## 4. Responsive behavior

| Layout context | Desktop web | Mobile web | Native Android/iOS |
|---|---|---|---|
| Main navigation | Stable side/top rail | Condensed tabs | Platform-native stack/tab |
| Meeting | Adaptive grid + resizable side panel | Primary video + drawer | Video grid + bottom sheet/tab |
| Controls | Toolbar, keyboard shortcuts | Persistent essentials | Safe-area-aware 44–48px targets |
| Document / AI | Inline side panel | Bottom/overlay sheet | Task-focused sheet with explicit back |
| Modals | Dialog with focus trap | Full/small screen dialog | Native dialog/sheet conventions |
| Deep link | Browser route | Browser fallback | Verified link → auth/resume → reauthorize |

Generic web hover, HTML portals and DOM focus behavior do not automatically apply to React Native.

## 5. Preview coverage and limits

The [static UI kit preview](../../design/UI_KIT_PREVIEW.html) uses the canonical CSS tokens and demonstrates both themes, primary/AI/destructive buttons, hover/focus/pressed/disabled/loading states, forms, meeting tiles and controls, explicit public/private labels, approval progression, and status feedback. It is a visual reference, not production React components or a Figma-created library.

## Related

[Tokens](./DESIGN_TOKENS.md) · [Accessibility](./ACCESSIBILITY.md) · [Figma handoff](./FIGMA_HANDOFF.md) · [VRT-003 user journeys](../ux/USER_JOURNEYS.md)
