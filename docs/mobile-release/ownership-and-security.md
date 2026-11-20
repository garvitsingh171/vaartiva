# Mobile Release Ownership and Security

**Status:** Proposed controls. Fill all owners before credentials are issued.

## Ownership matrix

| Resource / capability | Accountable owner | Delegated role | Where tracked |
| --- | --- | --- | --- |
| Expo organization and EAS project | TBD | Build maintainer | Restricted operations inventory |
| Google Play developer account | TBD | Release manager | Restricted operations inventory |
| Apple Developer membership | TBD | App Store Connect release manager | Restricted operations inventory |
| Android application signing / upload | TBD | Approved build maintainer | Credential manager, no secrets in docs |
| iOS provisioning/certificates | TBD | Authorized Apple team member | Apple/Expo credential administration |
| Device lending / tester recruitment | TBD | QA lead | Private inventory and consent records |
| App security sign-off | TBD | Backend/security reviewer | Linked release checklist |
| Final Android/iOS rollout approval | TBD | Authorized release manager | Release approval record |

## Core rules

1. **Permanent organization ownership:** Do not tie long-term publisher access to a temporary intern, student account, or shared password.
2. **MFA:** Require MFA on Apple, Google, Expo, and repository administrator accounts.
3. **Least privilege:** Invite collaborators to the minimum roles required for builds, beta management, or store releases.
4. **Credential isolation:** Never commit Android keystores, signing passwords, Apple signing private keys, Play service account JSON, App Store Connect API private keys, EAS access tokens, or server credentials.
5. **Controlled CI:** CI gets scoped, revocable tokens from the chosen secrets manager. A CI job must not inherit account-owner passwords.
6. **Recovery:** Record a secure recovery procedure and at least one authorized backup administrator where supported.
7. **Audit:** Link build, credential changes, submissions, and rollout approvals to a reviewed commit and human approver.
8. **Rotation:** Rotate/revoke compromised credentials promptly; document the implications for app updates and signed artifacts.
9. **Safe mobile config:** Treat every shipped application string as client-visible; never place LiveKit API secrets, admin permissions, database credentials, or AI provider keys in Expo public configuration.
10. **Separation of authority:** The mobile app may request media tokens but only the business API authorizes meeting access. AI workers do not authorize user actions.

## Review access before each release

- Confirm publisher accounts remain under intended control.
- Verify privileged accounts and CI tokens have not gained unnecessary permissions.
- Reconfirm signing credential access and recovery.
- Confirm app permissions and store disclosures match what the binary actually does.
- Confirm mobile staging/test traffic cannot reach production-only private data by mistake.
- Preserve nonsecret evidence of reviewer sign-off.

## Privacy of device testing

- Use synthetic meeting data by default.
- Do not publish tester email addresses, personal Apple/Google IDs, device UDIDs, phone numbers, crash logs with tokens, or recorded media.
- Obtain appropriate recording/transcription consent on real-device tests.
- Revoke temporary tester access after test rounds when appropriate.
- Align with VRT-006 data classification and retention policies.

## Decisions required before implementation

- Legal store publisher (individual vs organization) and billing owner.
- Named account holder, backup owner, release approver.
- Authorized testers and device lending approach.
- How credentials are managed and recovered.
- Who can trigger automatic or manual store submissions.
- Who owns incident response for a bad update.

## Official references

- [Google Play Console user permissions](https://support.google.com/googleplay/android-developer/answer/9844686)
- [Expo: Apple Developer team roles and signing](https://docs.expo.dev/app-signing/apple-developer-program-roles-and-permissions/)
- [Expo: Build and signing](https://docs.expo.dev/deploy/build-project/)
- [Apple: App Store Connect roles and access](https://developer.apple.com/help/app-store-connect/)
