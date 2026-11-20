# VRT-007 — Mobile Release Readiness Plan

**Status:** Proposed / documentation only  
**Last reviewed:** 2026-11-20  
**Scope:** Vaartiva Expo React Native applications for Android and iOS  
**Related:** VRT-005 architecture and trust boundaries; VRT-006 classification and permission policies

## Purpose

Establish the prerequisites, ownership, real-device coverage, store testing routes, security controls, and release blockers before distributing Vaartiva mobile apps. Nothing in this directory indicates that store accounts, phones, signing credentials, or release channels are already provisioned.

## Documents

| File | Focus |
| --- | --- |
| [Developer accounts](./developer-accounts.md) | Apple / Google enrollment, identity verification, costs, and account-type decision |
| [EAS builds and distribution](./eas-build-and-distribution.md) | Expo ownership, environments, identifiers, build profiles, and build/upload plan |
| [Real-device access](./real-device-access.md) | Physical-device sourcing, coverage, and LiveKit validation |
| [Store testing and release gates](./store-testing-and-release-gates.md) | Google Play tracks, TestFlight, required test evidence, go/no-go decisions |
| [Ownership and security](./ownership-and-security.md) | Access roles, MFA, recovery, signing credentials, and release responsibilities |

## Recommended strategy

1. **Start with a real Android handset** for development and end-to-end LiveKit checks; Android development builds can be installed without a Play Console account.
2. **Secure recurring access to an actual iPhone** before claiming iOS is tested. A simulator is supplemental, not an iPhone substitute for microphone, camera, interruption, and backgrounding behavior.
3. **Choose legal ownership before opening store accounts** (individual vs organization); changing account structures later may require effort and platform-specific procedures.
4. Use **Expo EAS Build/Submit** for repeatable builds from Linux; do not assume access to an Apple Developer team until confirmed.
5. Treat first store test upload, closed testing, external TestFlight, and public production release as **separate gates**.
6. No organization credentials, API keys, Android keystores, iOS provisioning profiles, private keys, or device identifiers belong in this repository.

## Readiness ledger (fill in with actual evidence)

| Prerequisite | Current status | Owner | Evidence / link (nonsecret) |
| --- | --- | --- | --- |
| Expo account / project owner decided | Not verified | TBD | TBD |
| Google account type selected | Decision pending | TBD | TBD |
| Google developer enrollment completed | Not verified | TBD | TBD |
| Apple account type selected | Decision pending | TBD | TBD |
| Apple membership enrolled | Not verified | TBD | TBD |
| Android physical phone available | Not verified | TBD | TBD |
| iPhone physically accessible | Not verified | TBD | TBD |
| Android signing custody assigned | Decision pending | TBD | TBD |
| iOS signing authority assigned | Decision pending | TBD | TBD |
| First internal Android build installed | Not started | TBD | TBD |
| First real-device iOS build installed | Not started | TBD | TBD |
| Store beta readiness | Not started | TBD | TBD |

**Completion of this PR means the plan exists, not that accounts are active or testing is finished.**

## Open decisions

- Is Vaartiva being published as an individual developer or a legally verified entity?
- Who is the permanent account holder, backup administrator, and renewal payer?
- How will an iPhone be sourced for repeated tests?
- Which Android OS/device combinations and iOS version/device combinations are available?
- What is the stable Android package name and iOS bundle identifier?
- Are notifications, recording, or screen sharing included in the first mobile MVP?

## Source policy

Store policies can change. Recheck the official links in the linked documents immediately before enrollment, beta testing, and submission. Registration amounts listed in USD exclude conversion, tax, and payment-provider variance.
