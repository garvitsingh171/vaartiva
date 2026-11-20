# Real-Device Access and Test Plan

**Status:** Device access not yet verified. Maintain private test-device inventory; do not commit UDIDs, serials, personal numbers, or private tester contact details.

## Why physical devices are required

Vaartiva's LiveKit-based experience depends on camera, microphone, audio routing, device sleep, OS permissions, cellular networking, and backgrounding. Browser previews, simulators, and emulators are helpful but cannot replace validation on physical Android and iOS devices.

## Minimum practical access plan

| Coverage | Required for | Suggested source | Current status |
| --- | --- | --- | --- |
| One current physical Android phone | First native integration and microphone/camera checks | Owned or trusted borrowed device | Unconfirmed |
| One physical iPhone, recent supported iOS | iOS media, permissions, interruptions and install validation | Owned, borrowed, or authorized team device | Unconfirmed |
| Second Android OS/manufacturer combination | Android compatibility and performance regression | Tester / teammate | Planned |
| Second supported iPhone/iOS combination | Broader iOS compatibility regression | Trusted tester | Planned |
| Android emulator / iOS Simulator | Debugging and layout checks only | Local or supported cloud tooling | Supplemental |

A **single available Android + iPhone** is a minimum useful starting point, not sufficient final coverage for every production user. Final supported OS versions should be set after the Expo/React Native compatibility matrix is chosen.

## Access paths

### Android physical device

- Enable appropriate developer options and USB debugging only for trusted developer machines, when needed.
- Install an approved development or internal distribution build (APK).
- For Play track testing, enroll the test account using the track's opt-in mechanism.
- For new personal Play developer accounts, account-owner Android device verification is a separate publisher-level requirement.

### iOS physical device

- Prefer TestFlight for distributed beta installs once Apple Developer membership and App Store Connect setup are complete.
- For ad hoc EAS device builds, register the eligible device with Apple, create/update provisioning, and build/re-sign appropriately.
- An iPhone and paid Apple Developer membership are generally needed for EAS cloud-distributed iOS device development builds; do not assume a local iOS Simulator is available on Linux.
- A borrowed iPhone must be accessible repeatedly for regression, not just for a one-time screenshot.

### Fallback options

- Expo Go: early UI / compatible feature smoke checks only; cannot validate all custom native integrations.
- Emulator/simulator: layout/navigation and platform-specific code behavior; not evidence of real microphone/camera reliability.
- Remote device labs: supplementary real-device coverage when budget permits; assess privacy of meeting test content before using third parties.

## Test accounts and media

- Use dedicated staging organizations and test meeting accounts across at least two permission levels.
- Use synthetic agendas, non-sensitive test documents and consented participants.
- Include a cross-tenant and private-knowledge denial test.
- Never record real conversations without required participant notice and consent.

## Real-device validation matrix

| Test ID | Scenario | Android | iOS | Expected outcome |
| --- | --- | --- | --- | --- |
| M-01 | Fresh install and first launch | Required | Required | Launches with no crash |
| M-02 | Login, logout, token expiry | Required | Required | Auth transitions correctly |
| M-03 | Microphone permission denied/granted | Required | Required | Clear recovery prompt; no capture without permission |
| M-04 | Camera denied/granted | Required | Required | Graceful fallback and retry |
| M-05 | Join/leave authorized LiveKit room | Required | Required | Only authorized meeting access |
| M-06 | Earphone/Bluetooth/speaker route | Required | Required | Audio routing works |
| M-07 | Wi-Fi to cellular switch / transient loss | Required | Required | Reconnect or clear failure state |
| M-08 | App background/foreground | Required | Required | OS-compliant audio/video state; no unauthorized capture |
| M-09 | Incoming call or audio interruption | Required | Required | Media recovery, no hidden capture |
| M-10 | Participant permission revoked | Required | Required | Unauthorized rejoin blocked |
| M-11 | Recording/transcription consent | If in MVP | If in MVP | No capture/processing before allowed |
| M-12 | Private vs shared AI knowledge | If in MVP | If in MVP | No private data leakage |
| M-13 | Accessibility and text scaling | Required | Required | Usable core actions and labels |
| M-14 | Battery, heat, long meeting | Required | Required | No critical degradation in target session |
| M-15 | Push notification delivery | If in MVP | If in MVP | Correct permissions and delivery behavior |
| M-16 | Screen sharing | If in MVP | If in MVP | Explicit start/stop and correct content boundaries |

## Evidence per run

Record **nonsecret** test-run ID, app/build version, platform/OS, generic device model, scenario result, defects, and redacted logs. Store consented screenshots only if they contain no private meeting content. Keep participant names, tokens, session IDs, and device IDs out of public issues.

## Release exit condition

Do not label the mobile release "real-device tested" without a successful relevant test run from at least one physical Android device **and** one physical iPhone. Block public release when critical LiveKit, authentication, privacy, consent, or reconnection scenarios fail.

## Official references

- [Expo: Android physical-device environment](https://docs.expo.dev/get-started/set-up-your-environment/?device=physical&mode=development-build&platform=android)
- [Expo: iOS physical-device environment](https://docs.expo.dev/get-started/set-up-your-environment/?device=physical&mode=development-build&platform=ios)
- [Expo: iOS development builds for devices](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/)
- [Expo: Share a development build](https://docs.expo.dev/develop/development-builds/share-with-your-team/)
