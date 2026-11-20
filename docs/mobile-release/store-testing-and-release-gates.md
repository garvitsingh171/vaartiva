# Store Testing and Release Gates

**Status:** Proposed distribution plan. Store access and approval are not yet confirmed.

## Android testing tracks

1. **Direct Android development APK:** Internal device validation before Play Console publishing setup.
2. **Google Play internal testing:** Small trusted distribution group and installer/update workflow.
3. **Google Play closed testing:** Controlled cohort and feedback collection. For qualifying *new personal developer accounts*, maintain at least **12 opted-in testers continuously for 14 days** before applying for production access.
4. **Google production access review:** Eligibility from testing does **not** automatically grant production permissions; complete Play Console application and any requested additional testing.
5. **Production rollout:** Explicitly authorized, monitored release only after security, quality, store policy, and listing requirements pass.

Do not treat the 12/14 constraint as a universal organization-account rule. Recheck the exact account's requirements in Play Console. Play Store internal/closed/production distribution may have different review and access requirements.

## iOS distribution stages

1. **Development / ad hoc device build:** Signed for permitted registered physical devices; requires Apple signing authority.
2. **TestFlight internal beta:** Test App Store Connect users with access (Apple documents up to **100** internal testers).
3. **TestFlight external beta:** Up to **10,000** external testers per app; external group metadata and Apple's beta-app review may be required.
4. **App Store production:** Separate App Review and explicit release decision; TestFlight success does not imply public-release approval.

## Testing evidence and feedback

- Invite actual testers to both platforms; track consent and opt-in without publishing personal contact data.
- Assign repeatable scripts: login, create/join meeting, audio/video, network interruptions, permission revocation, consent (if applicable).
- Maintain a defect log with severity and reproducibility.
- Record exact build/version and date for each test report.
- Collect accessibility, backgrounding, battery, crash, and performance feedback.
- Audit all critical server-side authorization behavior on device-created requests.

## Release gates

| Gate | Pass condition | Blocker if failed |
| --- | --- | --- |
| G-01 Account ownership | Approved publisher and backup identified | Unknown legal/account holder |
| G-02 Store readiness | Enrollment, verification, signing and app identity confirmed | Missing store account or certificate authority |
| G-03 Build reproducibility | Traceable Android and iOS release candidates | Cannot reproduce/store binary |
| G-04 Real-device access | Physical Android and iPhone completed required tests | iOS/Android physical test access missing |
| G-05 Media reliability | LiveKit join/leave, audio and reconnection pass | Media failure or unbounded disruption |
| G-06 Privacy/consent | VRT-005/006 controls tested; no cross-tenant leaks | Unauthorized sharing, recording, or retrieval |
| G-07 Store test pathway | Internal / TestFlight and account-specific closed test requirements met | Unmet platform test eligibility |
| G-08 App content compliance | Accurate privacy disclosures, permissions, listing, support and policy docs | Misleading or incomplete store metadata |
| G-09 Operations | Crash visibility, incident contact and rollback/stop plan | Cannot detect or respond to severe incident |
| G-10 Release approval | Designated owner approves exact build and rollout track | Unapproved production action |

## Go / no-go template

| Field | Entry |
| --- | --- |
| Release version and commit | TBD |
| Android bundle/build number | TBD |
| iOS bundle/build number | TBD |
| Store test track(s) | TBD |
| Physical test evidence | TBD |
| Known high-severity bugs | TBD |
| Privacy/security sign-off | TBD |
| Account owner approval | TBD |
| Decision | NO-GO until all required gates pass |

## Non-negotiable failures

A release is **NO-GO** if a user can access another user's private or another tenant's data; a LiveKit token can bypass meeting authorization; consented capture rules are violated; privileged AI actions can execute without approved authorization; or critical mobile crashes/media failures prevent meeting functionality.

## Official references

- [Google: Account testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465)
- [Google: Configure test tracks](https://support.google.com/googleplay/android-developer/answer/9845334)
- [Google: Release management](https://support.google.com/googleplay/android-developer/answer/9859348)
- [Apple: TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Apple: Invite external TestFlight testers](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers/)
- [Expo: TestFlight submission](https://docs.expo.dev/submit/testflight/)
