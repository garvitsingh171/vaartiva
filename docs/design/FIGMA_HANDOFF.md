# Vaartiva — Figma Structure and Implementation Handoff

> **VRT-004** · Figma-ready specification. No Figma file or component set has been created as part of this package.

## 1. Proposed Figma project organization

| Page | Frames / components | Notes |
|---|---|---|
| `00 · Overview` | Product promise, status, owner, links | Refined direction and approval state |
| `01 · Foundations` | Color scale, light/dark pairs, type, spacing, radius, elevation, motion | Match canonical semantic tokens |
| `02 · Components` | C01–C22 component sets, variants, states | Anatomy and interaction notes |
| `03 · Compositions` | Prejoin, six-human meeting, AI panel, action/decision, error states | Desktop 1440, mobile 390; safe areas |
| `04 · Accessibility` | Contrast pair checks, focus, touch, reduced motion, reader names | Link to AX test plan |
| `05 · Handoff` | Token export contract, web/native adapters, open decisions | Include implementation tickets |

### Color specifications

| Figma variable | Light | Dark | Meaning |
|---|---|---|---|
| `color/brand/copper` | `#9C3D20` | `#F6A17E` | Primary action / active accent |
| `color/brand/gold` | `#80531B` | `#F4D097` | AI identity |
| `color/background/canvas` | `#F8F5F1` | `#141316` | Warm ivory / graphite canvas |
| `color/background/surface` | `#FEFCFA` | `#1E1C20` | Card, dialog, popover |
| `color/status/success` | `#315B73` | `#A9CDE2` | Labeled blue-slate success |
| `color/status/warning` | `#70470C` | `#F3C66F` | Muted amber |
| `color/status/danger` | `#A12E28` | `#FFAAA3` | Destructive/error |

## 2. Figma variables convention

- Two color modes: `Light` and `Dark`; semantic names remain identical in each mode.
- Variable paths follow the canonical tokens, e.g. `color/background/canvas`, `color/text/primary`, `color/action/primary`, `color/ai/accent`.
- Type, spacing and radius use the same scales as [`tokens.json`](../../design/tokens/tokens.json).
- Avoid raw hex values in component instances when a semantic token exists.
- Component variant format: `Component / Variant / Size / State`, e.g. `Button / Primary / MD / Focus`.
- AI components need an explicit AI label, state and audience scope, not just the gold swatch.

## 3. Component acceptance checklist

For each C01–C22: include purpose, anatomy, token references, all relevant states, sizes, desktop/native behavior, keyboard/reader requirements, copy, and error/recovery branches. Design both themes. Native variants do not depend on hover.

## 4. Mapping design to apps

| Design representation | Web adapter | Android/iOS adapter |
|---|---|---|
| Semantic color token | CSS custom properties and eventual shadcn/ui mapping | NativeWind chosen version and typed values |
| Spacing/radius | CSS utilities | React Native layout tokens |
| Typography role | CSS type styles | Text styles with dynamic font scaling |
| Dialog component | Accessible web dialog | Native modal / bottom sheet |
| Focus and hover | CSS `:focus-visible` and pointer rules | Platform focus/pressed/accessibility actions |
| Elevation | CSS border/shadow | iOS shadow / Android elevation as appropriate |
| Safe area | Responsive CSS safe area | React Native safe-area library |

**Implementation rule:** keep one canonical semantic token meaning and allow platform-specific rendering. CSS by itself does not power React Native theme context.

## 5. Handoff review process

1. Product/UX Lead reviews brand direction and component role coverage.
2. Web Lead reviews compatibility with chosen shadcn/ui/Tailwind versions.
3. Mobile Lead verifies NativeWind version, native focus, touch, sheet and safe-area feasibility.
4. Security/Privacy Lead reviews AI public/private, guest admission and consent cues.
5. Accessibility reviewer checks static contrast and schedules actual device/reader testing.
6. Token changes update `tokens.json`, `tokens.css`, contrast notes, Figma values and implementation adapters as applicable.

## 6. Open decisions

- [ ] Create/approve the actual Figma design file and publish share link here.
- [ ] Identify approved logo and brand assets.
- [ ] Decide and pin NativeWind version in an implementation PR.
- [ ] Identify named design and accessibility approvers.
- [ ] Validate final components on physical Android and iOS devices.

[Brand foundations](./BRAND_FOUNDATIONS.md) · [UI kit](./UI_KIT_SPEC.md) · [Accessibility](./ACCESSIBILITY.md)
