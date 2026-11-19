# Vaartiva — Figma Structure and Implementation Handoff

> **VRT-004** · Figma-ready specification. **No Figma file or component set has been created automatically as part of this package.**

## 1. Proposed Figma project organization

| Page | Frames / components | Notes |
|---|---|---|
| `00 · Overview` | Product promise, status, owner, links | Proposed design direction |
| `01 · Foundations` | Color scale, light/dark pairs, type, spacing, radius, elevation, motion | Use names matching canonical semantic tokens |
| `02 · Components` | C01–C22 component sets, variants, states | Anatomy + interaction notes |
| `03 · Compositions` | Prejoin, six-human meeting, AI panel, action/decision, error states | Desktop 1440, mobile 390; safe areas |
| `04 · Accessibility` | Contrast pair checks, focus, touch, reduced motion, reader names | Link to AX test plan |
| `05 · Handoff` | Token export contract, web/native adapters, open decisions | Include implementation tickets |

## 2. Figma variables convention

- Two color modes: `Light` and `Dark`; same semantic names in each mode.
- Suggested variable paths: `color/background/canvas`, `color/background/surface`, `color/text/primary`, `color/action/primary`, `color/ai/accent`, etc.
- Type/spacing/radius tokens use the same numeric scales as [`tokens.json`](../../design/tokens/tokens.json).
- Do not paste raw hex into arbitrary component instances when an appropriate semantic token exists.
- Component variant format: `Component / Variant / Size / State`, e.g. `Button / Primary / MD / Focus`.
- AI components must include labeled status and audience scope, not just color swatches.

## 3. Component acceptance checklist

For each C01–C22: include purpose, anatomy, token references, all relevant states, sizes, desktop and native behavior, keyboard/reader requirements, copy, and error/recovery branches. Design both `Light` and `Dark`. Variants with no meaningful hover on native must not require hover to function.

## 4. Mapping design to apps

| Design representation | Web adapter | Android/iOS adapter |
|---|---|---|
| Semantic color token | shadcn/ui + CSS custom properties | NativeWind chosen version + typed values |
| Spacing/radius | CSS utilities | React Native layout tokens |
| Typography role | CSS type styles | Text styles with dynamic font scaling |
| Dialog component | Accessible web dialog | Native modal / bottom sheet |
| Focus and hover | CSS `:focus-visible` and pointer rules | Platform focus/pressed/accessibility actions |
| Elevation | CSS border/shadow | iOS shadow / Android elevation as appropriate |
| Safe area | Responsive CSS safe area | React Native safe-area library |

**Implementation rule:** keep a canonical semantic token name and allow platform-specific rendering. Do not claim CSS on its own powers React Native theme context.

## 5. Handoff review process

1. Product/UX Lead reviews brand direction and component role coverage.
2. Web Lead reviews compatibility with chosen shadcn/ui/Tailwind versions.
3. Mobile Lead verifies NativeWind version, native focus, touch, sheet, and safe-area feasibility.
4. Security/Privacy Lead reviews AI public/private, guest admission and consent cues.
5. Accessibility reviewer checks static contrasts then schedules actual device/reader testing.
6. Any token/component change receives a documented change note and updates `tokens.json`, `tokens.css`, the contrast report, Figma values and implementation adapters as applicable.

## 6. Open decisions

- [ ] Create/approve the actual Figma design file and publish share link in this document.
- [ ] Identify approved logo and brand assets; existing brand assets may supersede provisional mockups.
- [ ] Decide and pin NativeWind version in an implementation PR.
- [ ] Identify named design and accessibility approvers.
- [ ] Validate final component set on physical Android and iOS devices after implementation.

[Brand foundations](./BRAND_FOUNDATIONS.md) · [UI kit](./UI_KIT_SPEC.md) · [Accessibility](./ACCESSIBILITY.md) · [VRT-003 navigation](../ux/MOBILE_NAVIGATION_AND_DEEP_LINKS.md)
