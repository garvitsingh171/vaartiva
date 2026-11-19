# VRT-004 — Selected Token Contrast Check

Generated from `tokens.json` with the WCAG relative luminance contrast formula. **This checks listed solid-color pairs only**, not complete screens, opacity, images, focus shape, actual native rendering, or assistive technologies.

| Theme | Pair | Foreground | Background | Ratio | Minimum | Result |
|---|---|---|---|---:|---:|---|
| Light | Body text | `#1A2A40` | `#FFFFFF` | 14.49:1 | 4.5:1 | PASS |
| Light | Secondary body text | `#52637A` | `#FFFFFF` | 6.13:1 | 4.5:1 | PASS |
| Light | Body text on canvas | `#1A2A40` | `#F7F9FC` | 13.74:1 | 4.5:1 | PASS |
| Light | Primary button | `#FFFFFF` | `#3856D6` | 6.05:1 | 4.5:1 | PASS |
| Light | AI button | `#FFFFFF` | `#6842B5` | 6.92:1 | 4.5:1 | PASS |
| Light | AI text on subtle surface | `#582F9B` | `#F0EAFE` | 7.80:1 | 4.5:1 | PASS |
| Light | Success status text | `#166A49` | `#FFFFFF` | 6.58:1 | 4.5:1 | PASS |
| Light | Warning status text | `#805200` | `#FFFFFF` | 6.72:1 | 4.5:1 | PASS |
| Light | Error status text | `#A92D26` | `#FFFFFF` | 6.80:1 | 4.5:1 | PASS |
| Light | Interactive boundary | `#8495AC` | `#FFFFFF` | 3.05:1 | 3.0:1 | PASS |
| Light | Focus indicator | `#0A5ABD` | `#FFFFFF` | 6.54:1 | 3.0:1 | PASS |
| Dark | Body text | `#F2F5FF` | `#151F34` | 15.09:1 | 4.5:1 | PASS |
| Dark | Secondary body text | `#B6C7DF` | `#151F34` | 9.57:1 | 4.5:1 | PASS |
| Dark | Body text on canvas | `#F2F5FF` | `#0D1627` | 16.60:1 | 4.5:1 | PASS |
| Dark | Primary button | `#0D1627` | `#AFC3FF` | 10.40:1 | 4.5:1 | PASS |
| Dark | AI button | `#0D1627` | `#CFB8FF` | 10.29:1 | 4.5:1 | PASS |
| Dark | AI text on subtle surface | `#E3D5FF` | `#2C2142` | 10.85:1 | 4.5:1 | PASS |
| Dark | Success status text | `#67DAB1` | `#151F34` | 9.58:1 | 4.5:1 | PASS |
| Dark | Warning status text | `#FFD27A` | `#151F34` | 11.55:1 | 4.5:1 | PASS |
| Dark | Error status text | `#FFA7A0` | `#151F34` | 8.84:1 | 4.5:1 | PASS |
| Dark | Interactive boundary | `#8091AF` | `#151F34` | 5.16:1 | 3.0:1 | PASS |
| Dark | Focus indicator | `#B7C8FF` | `#151F34` | 9.96:1 | 3.0:1 | PASS |

## Scope and warnings

- Text targets: 4.5:1 for typical text; non-text component boundaries and indicators: at least 3:1. Some large text may have lower thresholds, but the conservative 4.5:1 rule is used here.
- WCAG 2.2 AA also requires keyboard functionality, sufficient target sizes, visible and unobscured focus, semantic roles, captions/consent affordances and other criteria not provable with this file.
- Preview-only visuals have not been audited in a browser, on devices or with screen readers.
- Recompute this table if any token changes; values are subject to review.

Official specification: https://www.w3.org/TR/WCAG22/
