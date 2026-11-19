# Vaartiva — Accessibility & State Acceptance Criteria

> **VRT-004** · Proposed WCAG 2.2 AA baseline · Neither compliance certification nor completed assistive-technology tests.

## 1. Contrast and visual indicators

- Standard text must meet **4.5:1** foreground/background contrast (WCAG 2.2 SC 1.4.3 AA); qualifying large text can use 3:1.
- Essential UI boundaries and visible state graphics must meet **3:1** against adjacent surfaces (SC 1.4.11).
- Selected theme token checks are recorded in [CONTRAST_REPORT.md](../../design/tokens/CONTRAST_REPORT.md).
- Do not use color alone to represent AI/human/guest, mic muted, recording/transcription state, private answer, approval, failure or success.
- Test with 200% zoom, high contrast preferences, grayscale and theme changes. Preview token contrast does not replace real UI contrast auditing.

## 2. Focus and keyboard

- Every web interactive item is keyboard reachable in logical order, with descriptive names, accessible roles and keyboard operation.
- Show a visible focus indicator at least 2px thick as specified by design tokens; verify adjacent contrast and that sticky overlays don't cover focused controls (WCAG 2.2 focus-related criteria).
- Dialogs/traps restore focus to the trigger on close; Escape behavior is clearly defined, except for critical non-dismissible operations.
- Hover-only discovery is prohibited for required actions. Native focus/navigation patterns are separate from DOM keyboard behavior.
- Ensure focus remains visible after a theme change and on both AI and human controls.

## 3. Touch, layout and text

- Design mobile interactions around **44–48 logical px** targets where feasible. WCAG 2.2 AA SC 2.5.8 sets a **24×24 CSS px** criterion with exceptions; 44–48 is a stronger product guideline, not the formal WCAG AA minimum.
- Respect safe areas, status bars, dynamic island/notch and on-screen keyboard; avoid bottom controls covered by system UI.
- Reflow where applicable at narrow widths and support user text scaling without clipping essential consent/review controls.
- Preserve clear labels, error messages, required fields and reasonable reading order.

## 4. Audio, transcripts and AI

- Participant-facing transcription state is always observable; never depend on colored dots alone.
- Consent must be informed and scoped. Nonconsenting tracks are excluded from transcription in the backend, not merely represented as a UI setting.
- AI identity includes spoken or screen-readable `AI` label. `Listening` / `Speaking` are based on true state, not animation guesses.
- Provide text equivalents to AI voice answers; announce new messages without disruptive repeated screen-reader interruptions.
- Distinguish shared and private answers in both text and accessible name. Private answers never play out loud in the shared room.
- Preserve source evidence references in text and mark missing/insufficient evidence explicitly.

## 5. Forms, errors, dialogs

- Every input has persistent visible label, optional hint and specific error text. Validation errors link to the offending field.
- Pending async actions expose progress; disabled controls communicate why when needed.
- Status notifications use suitable live-region semantics (web) or native accessibility announcements; avoid spamming every media-packet state change.
- Meeting ended, invite expired, revoked guest, permission denied and AI unavailable each have distinct copy plus appropriate next action.
- `Action executed` is a confirmed state only after verified server response; `Unknown outcome` does not encourage duplicate execution.

## 6. Manual acceptance plan (later implementation)

| ID | Test | Expected evidence |
|---|---|---|
| AX-01 | Light/dark paired text and control checks | Contrast calculator / accessible screenshot review |
| AX-02 | Keyboard tab and dialog traversal on web | Recorded step-through; focus never lost |
| AX-03 | Screen-reader labels on AI/public-private/task states | NVDA/VoiceOver/TalkBack acceptance notes |
| AX-04 | 200% zoom / OS large text | No hidden consent, join, leave or approval actions |
| AX-05 | Android/iOS permission denial | Recoverable microphone/camera instructions |
| AX-06 | Reduced motion | State remains clear without visual movement |
| AX-07 | Nonconsenting user and withdrawn consent | Server proof track excluded; correctly labeled UI |
| AX-08 | Guest/private knowledge denial | No unauthorized information in UI, audio or metadata |
| AX-09 | AI unavailable mid-call | Core human meeting remains operable |

**Status:** Proposed acceptance plan. No AX test is marked complete in VRT-004.

## Official references

- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

[UI kit](./UI_KIT_SPEC.md) · [Figma handoff](./FIGMA_HANDOFF.md)
