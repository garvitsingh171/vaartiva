# Compliance References and Open Decisions

**Status:** Engineering compliance checklist, not legal advice or a representation of Vaartiva's present compliance.

## 1. Applicable law depends on deployment and users

Vaartiva may serve users in India and potentially elsewhere. Do not assume a legal requirement is identical in every market or that consent is the only available lawful basis for all processing. Also distinguish **a voluntarily conservative product consent rule** from a **statutory requirement**.

Before public beta, determine:
- Countries/states where users and meeting participants are located; audio/recording laws may vary.
- Controller/data fiduciary and processor roles, legal entity, privacy contact and notification channel.
- In-force provisions and phased commencement of India's DPDP Act 2023 and DPDP Rules 2025 at actual launch date.
- Whether GDPR/EEA requirements or other rules apply to offered services or monitoring.
- Legal bases, notice languages, age restrictions, children's information, cross-border transfers, security/breach response and statutory retention obligations.
- Contracts and service location with LiveKit, AI model provider, database, cloud storage, telemetry and support vendors.
- App Store and Google Play data collection, consent, privacy disclosures, and account deletion requirements.

## 2. Official starting points for review

- [India Code — Digital Personal Data Protection Act, 2023](https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse) — check commencement and amendments.
- [MeitY — DPDP Rules 2025 and related materials](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025) — confirm operative rules and any changes.
- [European Data Protection Board — lawful processing](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en) — GDPR reference when applicable.
- [European Data Protection Board — individual rights](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en) — request and erasure concepts.
- [Apple — App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — recording indicators, privacy disclosure and account deletion.
- [Google Play — app account deletion](https://support.google.com/googleplay/android-developer/answer/13327111) — in-app and web deletion paths where relevant.
- [Google Play — user data policy](https://support.google.com/googleplay/android-developer/answer/10144311) — collection/sharing disclosure.
- [LiveKit — Egress overview](https://docs.livekit.io/transport/media/ingress-egress/egress/) — avoid unintended media capture.
- [LiveKit — Auto egress](https://docs.livekit.io/transport/media/ingress-egress/egress/autoegress/) — do not enable before consent controls.
- [LiveKit — Egress webhooks](https://docs.livekit.io/intro/basics/rooms-participants-tracks/webhooks-events/) — verify actual capture start/stop state.

**Note:** Official rules, vendor terms, and platform policies evolve. Capture a review date, links and sign-off before beta and at each material policy change.

## 3. Open decisions — must resolve before enabling the feature

| ID | Decision | Recommended provisional stance | Approval required |
| --- | --- | --- | --- |
| PRIV-DEC-01 | Launch regions and lawful bases | Controlled beta in explicitly approved regions only | Product + legal |
| PRIV-DEC-02 | Meeting recording | Disabled unless all required grants verified | Product + security + legal |
| PRIV-DEC-03 | Transcription and AI listening | Disabled by default; opt-in per applicable purpose | Product + privacy |
| PRIV-DEC-04 | LiveKit/media track exclusion on nonconsent | Pause whole room until reliable selective exclusion proven | Media + security |
| PRIV-DEC-05 | Provider list, storage region and subprocessors | No unapproved external processing | Security + legal |
| PRIV-DEC-06 | Retention limits | Review 30d recordings, 90d transcripts/summaries, 24h AI scratch, 30d backups, 90d logs, 365d minimal consent proof | Product + privacy + operations |
| PRIV-DEC-07 | Account deletion and shared artifact rights | Implement rights review and mixed-content exceptions | Product + legal |
| PRIV-DEC-08 | Consent revocation, multi-user recordings | Stop new capture; manual review/technical redaction strategy for older copies | Legal + security |
| PRIV-DEC-09 | Deletion SLAs and restore behavior | Deny access immediately; proposed 24h online cleanup objective | Operations + legal |
| PRIV-DEC-10 | AI speech and output audience | Muted initially; source-authorized audience checks | Product + security |
| PRIV-DEC-11 | Training/secondary use | No training on user content in MVP | Product + legal |
| PRIV-DEC-12 | Retention exceptions and holds | Case-specific, narrow, time-limited holds | Privacy + security |

## 4. Sign-off template

```text
Decision ID:
Approved choice:
Jurisdictions / user population:
Processing purpose / affected data:
Legal basis and required notice:
Providers and documented retention:
Owner and reviewers:
Version and approval date:
Effective date:
Expiry / next review date:
Linked implementation tests:
Exceptions and rollback plan:
```

## 5. Material policy change checklist

A change is material if it widens processing purpose, captured media, recipients/model provider, sharing audience, retention, age/region eligibility, or use of content to train models. Such a change must trigger a new privacy review, amended notices, affected user re-consent where applicable, updated consent schema/version, updated tests, and an explicit rollback path.
