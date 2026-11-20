# Vaartiva — Cross-Platform Design Tokens

> **VRT-004** · Version 0.2 · Refined charcoal, copper, gold and warm-ivory palette.

## 1. Source of truth and naming

**Canonical source:** [`tokens.json`](./tokens.json). Raw palette values live under `primitive.color.*`; UI code uses `semantic.light.color.*` or `semantic.dark.color.*`. The paths below those theme prefixes are identical, so clients share meaning without sharing platform-specific rendering.

Examples: `color.background.canvas`, `color.text.primary`, `color.action.primary`, `color.ai.accent`, `color.status.success`, and `color.focus.ring`.

| Canonical semantic key | CSS custom property | Web meaning | Native meaning |
|---|---|---|---|
| `color.background.canvas` | `--v-bg-canvas` | App background | Screen background |
| `color.background.surface` | `--v-bg-surface` | Cards and sheets | View background |
| `color.background.raised` | `--v-bg-raised` | Secondary panels | Elevated surface |
| `color.background.popover` | `--v-bg-popover` | Dialogs and popovers | Modal/sheet surface |
| `color.text.primary` | `--v-text-primary` | Essential text | Text color |
| `color.text.secondary` | `--v-text-secondary` | Supporting text | Text color |
| `color.border.interactive` | `--v-border-interactive` | Input/control boundary | View border |
| `color.action.primary` | `--v-action-primary` | Primary CTA | Primary Pressable |
| `color.action.onPrimary` | `--v-action-on-primary` | CTA label | CTA text |
| `color.ai.accent` | `--v-ai-accent` | AI identity foreground | AI badge foreground |
| `color.ai.onAccent` | `--v-ai-on-accent` | AI badge label | AI badge text |
| `color.status.success` | `--v-status-success` | Successful state text/icon | Successful state text/icon |
| `color.status.warning` | `--v-status-warning` | Warning text/icon | Warning text/icon |
| `color.status.danger` | `--v-status-danger` | Destructive/error text/icon | Destructive/error text/icon |
| `color.focus.ring` | `--v-focus-ring` | Keyboard focus outline | Platform focus equivalent |

The CSS file is the preview's manually maintained adapter. No app theme adapter exists in this checkout.

## 2. Brand and semantic color roles

| Role | Light | Dark | Usage |
|---|---|---|---|
| Canvas | `#F8F5F1` | `#141316` | Warm ivory / graphite foundation |
| Surface | `#FEFCFA` | `#1E1C20` | Cards, dialogs and popovers |
| Raised | `#F0ECE7` | `#2A272C` | Secondary and elevated panels |
| Primary action | `#9C3D20` | `#F6A17E` | Copper CTA; soft copper in dark mode |
| AI identity | `#80531B` | `#F4D097` | Champagne gold for AI labels and accents |
| Text primary | `#272427` | `#F4F0EC` | Essential text |
| Text secondary | `#625B57` | `#C0B9B3` | Supporting text |
| Success | `#315B73` | `#A9CDE2` | Labeled blue-slate success state |
| Warning | `#70470C` | `#F3C66F` | Muted amber warning |
| Destructive | `#A12E28` | `#FFAAA3` | Error and destructive state |
| Focus ring | `#9C3D20` | `#F6A17E` | Visible focus against the canvas |

Gold identifies AI and is not a general-purpose decoration or button color. Status meaning always includes a text or icon cue. The success color is blue-slate; warnings use amber and destructive states use red.

**Contrast rule:** assess complete foreground/background pairs, not primitive values alone. Do not mix a dark theme foreground with a light surface or assume a translucent color has the same contrast as its solid token.

## 3. Typography

- Family: `Inter`, `ui-sans-serif`, `system-ui`, and platform sans fallbacks; no bundled font files.
- Weight recommendations: regular 400, medium 500, semibold 600, bold 700.
- Type scale (size / line-height): XS 12/16; SM 14/20; Base 16/24; LG 18/28; XL 22/30; 2XL 28/36; 3XL 36/44.
- Required explanations do not depend on 12px text. Captions may use 12px when contrast and scaling remain adequate.
- Native clients should use scalable text units and OS font scaling.
- IDs and codes may use monospace, never as the sole indicator of a user's role.

## 4. Spacing, radius, sizing

- **4px spacing grid:** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px.
- **Radii:** none 0, sm 6, md 10, lg 16, xl 24, pill 9999px.
- **Touch targets:** aim for 44–48 logical pixels where feasible; WCAG 2.2 AA target-size evaluation has its own 24 CSS pixel criterion and exceptions.
- **Layout:** target roughly 70 characters per long text line; use one main column on narrow phones and stable auxiliary rails on wide screens.
- **Elevation:** prefer surfaces, borders and spacing first. Optional web shadows use neutral charcoal; native shadows are platform implementations.

## 5. Motion

- Duration scale: instant 0, fast 120ms, normal 200ms, slow 320ms.
- Animate only state or layout changes that aid comprehension. Consent and approval changes must appear immediately.
- Honor reduced-motion preference on web and native. Essential information never depends on animation.
- AI activity animation must not imply speech capture unless the state is true and labeled.

## 6. Theme and component rules

- Keep semantic token names stable across themes; components ask for purpose, not a raw palette value.
- Theme changes do not change permissions or hidden content.
- Map destructive components to the existing `color.status.danger` role and use a tested on-color.
- Use component variants and semantic tokens rather than scattered raw hex values.
- Do not use color alone for AI/human identity, consent, audience scope, approval, success or failure.

## 7. Cross-platform mapping

**Web:** the preview demonstrates CSS custom properties and a `data-theme` switch. An eventual shadcn/ui adapter should map these semantic roles to its `background`, `foreground`, `primary`, `primary-foreground`, `destructive`, `ring` and related slots without changing generated component APIs.

**Native:** no React Native/Expo or NativeWind application exists in this checkout. A future typed adapter should consume the same canonical semantic keys, use OS-scalable text, platform pressed/focus behavior, safe-area surfaces and native elevation. The CSS file alone is not a native theme integration.

## 8. Verification

See [the contrast report](../../docs/design/CONTRAST_REPORT.md). Listed solid foreground/background pairs meet the documented AA thresholds; browser, device and assistive-technology review remains necessary.

## Links

[Brand foundations](../../docs/design/BRAND_FOUNDATIONS.md) · [UI kit](../../docs/design/UI_KIT_SPEC.md) · [Accessibility](../../docs/design/ACCESSIBILITY.md) · [Figma handoff](../../docs/design/FIGMA_HANDOFF.md)
