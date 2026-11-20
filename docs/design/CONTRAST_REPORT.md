# VRT-004 — Selected Token Contrast Check

Ratios below were calculated from the refined token hex values using the WCAG relative luminance formula. **Only these listed solid-color pairs are checked**; this does not measure full-screen composition, images, transparency, rendered focus shapes, native rendering or assistive technology behavior.

| Theme | Pair | Foreground | Background | Ratio | Minimum | Result |
|---|---|---|---|---:|---:|---|
| Light | Primary text / canvas | `#272427` | `#F8F5F1` | 14.13:1 | 4.5:1 | PASS |
| Light | Secondary text / canvas | `#625B57` | `#F8F5F1` | 6.13:1 | 4.5:1 | PASS |
| Light | Primary text / surface | `#272427` | `#FEFCFA` | 15.00:1 | 4.5:1 | PASS |
| Light | Secondary text / surface | `#625B57` | `#FEFCFA` | 6.51:1 | 4.5:1 | PASS |
| Light | Primary button label | `#FFFFFF` | `#9C3D20` | 6.77:1 | 4.5:1 | PASS |
| Light | Primary button hover label | `#FFFFFF` | `#7D301A` | 9.09:1 | 4.5:1 | PASS |
| Light | AI button label | `#FFFFFF` | `#80531B` | 6.62:1 | 4.5:1 | PASS |
| Light | AI text / AI surface | `#654316` | `#F0E5D2` | 7.11:1 | 4.5:1 | PASS |
| Light | Secondary button label | `#272427` | `#F0ECE7` | 13.05:1 | 4.5:1 | PASS |
| Light | Disabled label / surface | `#625B57` | `#E8E3DD` | 5.22:1 | 4.5:1 | PASS |
| Light | Success text / surface | `#315B73` | `#F1F5F7` | 6.66:1 | 4.5:1 | PASS |
| Light | Information text / surface | `#315B73` | `#EAF1F5` | 6.40:1 | 4.5:1 | PASS |
| Light | Warning text / surface | `#70470C` | `#F5EAD6` | 6.79:1 | 4.5:1 | PASS |
| Light | Destructive text / surface | `#A12E28` | `#FBEFEE` | 6.36:1 | 4.5:1 | PASS |
| Light | Destructive button label | `#FFFFFF` | `#A12E28` | 7.15:1 | 4.5:1 | PASS |
| Light | Interactive boundary / canvas | `#827A74` | `#F8F5F1` | 3.88:1 | 3.0:1 | PASS |
| Light | Interactive boundary / surface | `#827A74` | `#FEFCFA` | 4.12:1 | 3.0:1 | PASS |
| Light | Focus ring / canvas | `#9C3D20` | `#F8F5F1` | 6.23:1 | 3.0:1 | PASS |
| Light | Focus ring / surface | `#9C3D20` | `#FEFCFA` | 6.61:1 | 3.0:1 | PASS |
| Dark | Primary text / canvas | `#F4F0EC` | `#141316` | 16.33:1 | 4.5:1 | PASS |
| Dark | Secondary text / surface | `#C0B9B3` | `#1E1C20` | 8.72:1 | 4.5:1 | PASS |
| Dark | Primary button label | `#2D1911` | `#F6A17E` | 8.20:1 | 4.5:1 | PASS |
| Dark | Primary button hover label | `#2D1911` | `#FFC0A5` | 10.59:1 | 4.5:1 | PASS |
| Dark | AI button label | `#322514` | `#F4D097` | 10.15:1 | 4.5:1 | PASS |
| Dark | AI text / AI surface | `#F4D097` | `#382F23` | 8.95:1 | 4.5:1 | PASS |
| Dark | Secondary button label | `#F4F0EC` | `#2A272C` | 13.00:1 | 4.5:1 | PASS |
| Dark | Disabled label / surface | `#A099A2` | `#302D32` | 4.89:1 | 4.5:1 | PASS |
| Dark | Success text / surface | `#A9CDE2` | `#24313A` | 7.95:1 | 4.5:1 | PASS |
| Dark | Information text / surface | `#A9CDE2` | `#24313A` | 7.95:1 | 4.5:1 | PASS |
| Dark | Warning text / surface | `#F3C66F` | `#39301F` | 8.11:1 | 4.5:1 | PASS |
| Dark | Destructive text / surface | `#FFAAA3` | `#392423` | 7.95:1 | 4.5:1 | PASS |
| Dark | Destructive button label | `#392423` | `#FFAAA3` | 7.95:1 | 4.5:1 | PASS |
| Dark | Interactive boundary / canvas | `#827B82` | `#141316` | 4.50:1 | 3.0:1 | PASS |
| Dark | Interactive boundary / surface | `#827B82` | `#1E1C20` | 4.11:1 | 3.0:1 | PASS |
| Dark | Focus ring / canvas | `#F6A17E` | `#141316` | 9.09:1 | 3.0:1 | PASS |
| Dark | Focus ring / surface | `#F6A17E` | `#1E1C20` | 8.31:1 | 3.0:1 | PASS |

## Scope and remaining review

- Text uses the 4.5:1 threshold; meaningful component boundaries and indicators use 3:1 where required.
- Inactive controls are exempt from WCAG contrast requirements; the neutral disabled text/background pairs listed here also exceed 4.5:1.
- Web focus appearance, theme switching, native rendering, text scaling, touch target size, reduced motion and screen-reader announcements require manual product/device review.
- The HTML preview is a static design handoff; it is not a complete application or proof of WCAG conformance.

Reference: https://www.w3.org/TR/WCAG22/
