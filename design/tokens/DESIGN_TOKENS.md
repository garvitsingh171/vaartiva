# Vaartiva — Cross-Platform Design Tokens

> **VRT-004** · Version 0.1 · Proposed token spec; not production-integrated.

## 1. Single naming contract

**Canonical source:** [`design/tokens/tokens.json`](../../design/tokens/tokens.json). `semantic.light.color.*` and `semantic.dark.color.*` have exactly the same paths. Application code asks for **semantic purpose** rather than raw hex values.

Examples: `color.background.surface`, `color.text.primary`, `color.action.primary`, `color.ai.accent`, `color.focus.ring`. In a theme context, remove the `semantic.<theme>.` prefix and use the same key name across clients.

| Canonical semantic key | CSS custom property | Web use (later) | Native use (later) |
|---|---|---|---|
| `color.background.canvas` | `--v-bg-canvas` | App background | Screen background style |
| `color.background.surface` | `--v-bg-surface` | Card / sheet | View background |
| `color.text.primary` | `--v-text-primary` | Body text | Text color |
| `color.text.secondary` | `--v-text-secondary` | Support text | Text color |
| `color.border.interactive` | `--v-border-interactive` | Input/outline | View border |
| `color.action.primary` | `--v-action-primary` | Primary CTA | Primary Pressable |
| `color.action.onPrimary` | `--v-action-on-primary` | CTA label | CTA Text |
| `color.ai.accent` | `--v-ai-accent` | AI emphasis | AI badge foreground |
| `color.ai.onAccent` | `--v-ai-on-accent` | AI badge label | AI badge Text |
| `color.focus.ring` | `--v-focus-ring` | Focus outline | Native focus/highlight equivalent |

The rest of the semantic roles appear in the JSON source. The CSS is a **manually checked representation** for design preview; an automatic build-time export can replace it in the implementation phase.

## 2. Color roles

| Role | Light | Dark | Usage |
|---|---|---|---|
| Canvas | `#F7F9FC` | `#0D1627` | Application backdrop |
| Surface | `#FFFFFF` | `#151F34` | Cards and overlays |
| Raised | `#EFF3F9` | `#21304B` | Secondary panels |
| Text primary | `#1A2A40` | `#F2F5FF` | All essential text |
| Text secondary | `#52637A` | `#B6C7DF` | Hints, metadata |
| Primary action | `#3856D6` | `#AFC3FF` | Primary call-to-action |
| AI accent | `#6842B5` | `#CFB8FF` | AI identity only |
| AI subtle surface | `#F0EAFE` | `#2C2142` | AI information panels |
| Focus ring | `#0A5ABD` | `#B7C8FF` | High-visibility focus |
| Danger | `#A92D26` | `#FFA7A0` | Destructive / error |

**Rule:** accessibility is evaluated on complete foreground/background pairs. Don't reuse a dark-mode text token with a light-mode surface or treat arbitrary semi-transparent tokens as contrast-checked.

## 3. Typography

- Family: `Inter`, `ui-sans-serif`, `system-ui` fallbacks for web; system font with matched numeric type roles on native.
- Weight recommendations: regular 400, medium 500, semibold 600, bold 700.
- Type scale (`px` / line-height `px`): XS 12/16; SM 14/20; Base 16/24; LG 18/28; XL 22/30; 2XL 28/36; 3XL 36/44.
- Base content never depends on 12px for required explanations. Caption text may be 12px where readability and contrast permit.
- Native implementation should use scalable text units and OS font scaling rather than hardcoded pixel-perfect layouts.
- Code/IDs: monospace stack, never as the sole indicator of a user's role.

## 4. Spacing, radius, sizing

- **4px spacing grid:** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. Use named scale keys `space.0`, `.1`, `.2`, `.3`, `.4`, `.5`, `.6`, `.8`, `.10`, `.12`, `.16`.
- **Radii:** none 0, sm 6, md 10, lg 16, xl 24, pill 9999px. Tokens: `radius.sm` etc.
- **Touch-target guideline:** design interactive mobile targets around 44–48 logical pixels minimum wherever feasible; formal WCAG 2.2 AA target-size evaluation has separate 24 CSS pixel and exception rules.
- **Layout:** max text line ~70 characters for long explanatory blocks; narrow phone uses one main column; wide desktop can use stable auxiliary rails.
- **Elevation:** prefer surfaces, borders and spacing first; optional web shadows `0 2px 8px rgb(12 25 50 / 8%)` and `0 8px 24px rgb(12 25 50 / 12%)`. Native shadows are platform implementations, not copied CSS.

## 5. Motion

- Duration scale: instant 0, fast 120ms, normal 200ms, slow 320ms.
- Animate only layout context or state changes useful to comprehension. Transcription consent and approval changes must be immediately reflected without animation delays.
- Honor reduced-motion preference on web and native. No essential information appears exclusively during animation.
- No animated AI pulsing that could be confused with active speech capture unless the state is explicitly labeled and technically true.

## 6. Theme and component rules

- Default initial theme respects system preference; user choice can override, persisted after the user explicitly picks a theme.
- Theme mode must not change permissions or hidden content.
- Keep every semantic token name stable across modes; never access `light` tokens directly in a dark-mode component.
- Use component-level semantic variants rather than direct raw primitive colors. A danger button uses `status.danger` with a tested on-color solution; it does not use a hardcoded arbitrary red.
- Do not assign state meaning to color alone: icon/text/status always present.

## 7. Implementation mapping (not implemented by this PR)

**Web:** use shadcn/ui semantic CSS variable slots (`background`, `foreground`, `primary`, `primary-foreground`, etc.). Establish a reviewed adapter from Vaartiva names to the shadcn variables; do not blindly rename them and break generated components.

**Native:** retain the *same canonical token keys* in a shared typed theme adapter; use NativeWind's supported variables/theming for the chosen version and React Native's platform-specific handling of focus, shadow, fonts and safe-area insets. A web CSS file by itself is not a native integration.

**Version awareness:** NativeWind's v4 and v5 theme APIs differ. Pin the dependency in the actual implementation PR and choose one corresponding adapter; this planning document does not assume both APIs run interchangeably.

## 8. Verification

See [contrast report](../../design/tokens/CONTRAST_REPORT.md). Selected solid-color foreground/background pairs must meet typical AA text 4.5:1 and essential UI boundary/focus 3:1 thresholds. Automated checking is useful but incomplete; follow with actual browser, native device and assistive-technology checks.

## Links

[Brand foundations](./BRAND_FOUNDATIONS.md) · [UI kit](./UI_KIT_SPEC.md) · [Accessibility](./ACCESSIBILITY.md) · [Figma handoff](./FIGMA_HANDOFF.md)

Official references: https://ui.shadcn.com/docs/theming · https://www.nativewind.dev/docs/guides/themes · https://www.w3.org/TR/WCAG22/
