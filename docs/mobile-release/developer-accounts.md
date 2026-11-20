# Developer Accounts and Enrollment

**Status:** Proposed; no purchases requested by VRT-007.  
**Verification date:** 2026-11-20

## Account comparison

| Item | Google Play Console | Apple Developer Program |
| --- | --- | --- |
| Purpose | Android Play Store distribution and testing tracks | App Store distribution, TestFlight, Apple signing services |
| Standard registration | **US$25 once** | **US$99 per membership year**, local currency may be used |
| Account types | Personal / organization | Individual / organization |
| Identity checks | Required; specifics depend on account type | Required; organization identity and authority checks |
| Organization prerequisites | Legal organization details; additional verification may apply | Legal entity, typically D-U-N-S, and authority to bind organization |
| Real-device verification | New personal accounts must verify access to an Android device | iOS device registration/signing for ad hoc device builds |
| Additional public-release constraints | New personal accounts have a closed-test gate | App Review / applicable TestFlight beta review |
| Current decision | **TBD: Personal or organization** | **TBD: Individual or organization** |

**Do not** enroll in a relative's or teammate's personal account without explicitly deciding who owns the app and who can recover the account. Do not state that a business/organization account exists until legal verification succeeds.

## Google Play Console — planning steps

1. Decide if the app will be published by an individual or an eligible legal organization.
2. Reserve a durable Google account controlled by the intended owner; enable MFA.
3. Gather legal identity, contact, payment, and (where applicable) organization details.
4. Pay the **US$25 one-time registration fee**; complete Google verification requests.
5. If registering a new personal developer account, plan **real Android device verification** through the Play Console app.
6. Plan for the new-personal-account production-access requirement: **12 opted-in closed testers continuously for at least 14 days**, then apply for production access. This is a minimum eligibility gate, not guaranteed production approval.
7. Invite only necessary collaborators with least-privilege Play Console permissions.
8. Record the publisher account owner, recovery path, and renewal/security contacts in a private operations inventory.

## Apple Developer Program — planning steps

1. Decide whether the legal publisher should be an individual or an eligible organization.
2. Create/identify a permanent Apple Account for the authorized holder; enable MFA.
3. For organization enrollment, prepare legal organization verification (including D-U-N-S where required) and authorized representative details.
4. Enroll in the **US$99/year Apple Developer Program** when iOS signing/TestFlight are needed; calendar renewal ownership.
5. Confirm App Store Connect account access and appropriate signing permissions.
6. Establish iOS bundle identifier ownership, certificates, provisioning, and app access roles before creating upload credentials.
7. For ad hoc iPhone development distributions, register eligible test devices before building or re-sign the app when new devices are added.
8. Prepare TestFlight metadata and tester organization when ready for beta distribution.

## Cost and lead-time risk

| Risk | Planning response |
| --- | --- |
| Exchange rate / tax changes the payment total | Budget above the USD list price and verify checkout amount |
| Organization verification or identity checks take time | Start only after legal ownership decision; allow unspecified approval lead time |
| Apple subscription lapses | Set renewal owner and calendar review |
| New personal Play account needs prolonged beta test | Recruit testers early; avoid treating 14 days as production approval |
| No available iPhone | Mark iOS real-device gate blocked, even if a simulator build succeeds |

## Official references

- [Google Play Console setup and $25 registration](https://support.google.com/googleplay/android-developer/answer/6112435)
- [Google account information requirements](https://support.google.com/googleplay/android-developer/answer/13628312)
- [Google personal-account testing rules](https://support.google.com/googleplay/android-developer/answer/14151465)
- [Google personal-account real-device verification](https://support.google.com/googleplay/android-developer/answer/14316361)
- [Apple enrollment, membership and fees](https://developer.apple.com/help/account/membership/program-enrollment)
- [Apple Developer Program](https://developer.apple.com/programs/)
- [Apple organization enrollment](https://developer.apple.com/programs/enroll/)
