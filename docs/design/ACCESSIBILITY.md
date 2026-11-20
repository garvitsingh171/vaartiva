# Vaartiva — Accessibility & State Acceptance Criteria

> **VRT-004** · WCAG 2.2 AA design target · Neither compliance certification nor completed assistive-technology tests.

## 1. Contrast and visual indicators

- Standard text must meet **4.5:1** foreground/background contrast; qualifying large text can use 3:1.
- Essential UI boundaries and visible state graphics must meet **3:1** against adjacent surfaces where required.
- The selected token pairs are recorded in [CONTRAST_REPORT.md](./CONTRAST_REPORT.md).
- Never use color alone for AI/human/guest identity, mic/camera state, recording/transcription, private answers, approval, failure or success. Include a readable label or icon and expose the state to assistive technology.
- Success is blue-slate and explicitly labeled. Warning is amber, destructive/error is red. Their meanings stay clear in monochrome.
- Review at 200% zoom, with high-contrast preferences, grayscale and theme changes. Token contrast does not replace rendered UI review.

## 2. Focus and keyboard

- Every web interactive item must be keyboard reachable in logical order, with descriptive names, accessible roles and keyboard operation.
- Show a visible focus indicator at least 2px thick; verify adjacent contrast and that sticky overlays do not cover focused controls.
- Dialogs/traps restore focus to the trigger on close; Escape behavior is defined except for critical non-dismissible operations.
- Hover-only discovery is prohibited for required actions. Native focus/navigation patterns are separate from DOM keyboard behavior.
- Ensure focus remains visible after a theme change and on both AI and human controls.

## 3. Touch, layout and text

- Design mobile interactions around **44–48 logical px** targets where feasible. WCAG 2.2 AA has a **24×24 CSS px** criterion with exceptions; 44–48 is the stronger product guideline.
- Respect safe areas, status bars, dynamic island/notch and on-screen keyboard; avoid bottom controls covered by system UI.
- Reflow at narrow widths and support user text scaling without clipping essential consent/review controls.
- Preserve clear labels, error messages, required fields and a reasonable reading order.

## 4. Audio, transcripts and AI

- Participant-facing transcription state is always observable; never depend on colored dots alone.
- Consent must be informed and scoped. Nonconsenting tracks must be excluded from transcription by backend enforcement, not merely represented as a UI setting.
- AI identity includes a spoken or screen-readable `AI` label. `Listening` / `Speaking` must reflect true state, not animation guesses.
- Provide text equivalents to AI voice answers; announce new messages without disruptive repeated screen-reader interruptions.
- Distinguish shared and private answers in visible text and accessible names. Private answers never play out loud in the shared room.
- Preserve source evidence references in text and mark missing/insufficient evidence explicitly.

## 5. Forms, errors, dialogs

- Every input has a persistent visible label, optional hint and specific error text. Validation errors link to the offending field.
- Pending async actions expose progress; disabled controls communicate why when needed.
- Status notifications use appropriate live-region semantics (web) or native accessibility announcements; avoid announcing every media-packet state change.
- Meeting ended, invite expired, revoked guest, permission denied and AI unavailable each have distinct copy plus an appropriate next action.
- `Action executed` is confirmed only after a verified server response; `Unknown outcome` must not encourage duplicate execution.

## 6. Manual acceptance plan

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

**Status:** Planned acceptance checks; none are marked complete. This checkout has no browser application, native app, automated accessibility suite or device test harness.

## Official references

- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

[UI kit](./UI_KIT_SPEC.md) · [Figma handoff](./FIGMA_HANDOFF.md)
