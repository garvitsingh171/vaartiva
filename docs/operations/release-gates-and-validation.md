# Nonfunctional Validation and Release Gates

## Why these gates exist

A green health endpoint or successful local demo is not sufficient evidence for video collaboration plus AI. This document defines how to validate proposed targets for an invitation-only beta. All gates are **planned**, not currently passed.

## Required gates

| ID | Gate | Evidence before beta |
|---|---|---|
| NFR-01 | API availability SLI instrumented | Dashboard + correctly counted success/failure events |
| NFR-02 | p95 core API latency meets target under baseline load | `CAP-01` report, histogram/raw counts |
| NFR-03 | Real-device meeting joins pass | Android/iPhone results; explicit SLO-03 numerator/denominator |
| NFR-04 | Media disconnect behavior understood | Test network classes and failure reasons; no hidden drops |
| NFR-05 | AI summary tasks finish or fail honestly | Queue/worker retry, timeout, and result persistence evidence |
| NFR-06 | Mobile crash telemetry configured | Release-channel samples and crash reporting privacy review |
| NFR-07 | Backup + restore validated | Isolated restore logs, resulting RPO/RTO measured, secure data check |
| NFR-08 | Cost and usage metering confirmed | Vendor billing + reconciled internal usage counters |
| NFR-09 | Spend alerts and quotas operational | Screenshot or test evidence without secrets, alert recipients validated |
| NFR-10 | Security and consent tests pass | VRT-006/008 abuse checks, authorization and consent audit |
| NFR-11 | Degraded modes tested | LiveKit, AI, DB partial failure simulations and user messages |
| NFR-12 | Release owner approves unresolved exceptions | Decision record, rollback plan, and named follow-up owner |

## Test procedure outline

1. Use isolated staging with fake data and least-privilege accounts.
2. Test real Android and iOS devices on stable Wi-Fi and representative mobile data; capture approved OS/app versions.
3. Measure the entire real joining path (token request -> room connected), not only LiveKit API response time.
4. Load test realistic database-backed API paths; do not include user-denied requests as successes.
5. Simulate AI provider failure, worker restart, duplicate events, expired token, stale approval, and budget quota exhaustion.
6. Conduct a database backup-restore drill; document how long recovery takes and the verified snapshot time.
7. Compare monthly vendor invoice estimates with internal counters. Do not accept a model that omits audio inference, media outbound traffic, or job retries.
8. Create an evidence summary with pass/fail/unknown for every release gate. Unknown is not Pass.

## Sampling and acceptance

- Minimum samples are **to be determined** based on available testers and variance. Do not report an observed 100% pass rate from one successful test as proof of a 99.5% SLO.
- Before meaningful production traffic, use synthetic probes + staging/device tests as launch gates, not as statistically validated 28-day SLO attainment.
- Track p95 latency by request group and device class; aggregated percentiles can hide the worst user journey.
- Any unresolved critical privacy/security failure blocks release irrespective of SLO success.
- If a cost ceiling is reached, prefer reducing optional AI/media throughput over compromising security, correctness, or previously accepted durable jobs.

## Evidence template

```text
Gate ID:
Test date/time UTC:
Environment / build version:
Device / network / provider:
Method and workload:
Eligible observations:
Good observations:
Observed result:
Expected target:
Outcome: PASS | FAIL | UNKNOWN
Evidence reference:
Owner:
Follow-up issue:
```

## Open decisions

- Provider choice and region for Express, FastAPI, PostgreSQL, and LiveKit.
- LiveKit managed vs self-hosted and applicable pricing/egress model.
- Inference model/provider, audio billing unit, agent participant speech frequency.
- Whether recording/transcription belongs in launch MVP or a later phase.
- Logging/metrics provider and retention duration under VRT-006.
- Backup cadence, restore owner, and actual recovery performance.
- Actual developer account costs and mobile device access (VRT-007).
- Baseline real-world usage, supported devices, and minimum acceptable network quality.

## Version and follow-up

Review these gates at end of each implementation phase and before opening beta access. Future implementation PRs must name the SLO/NFR/CAP identifiers they affect and attach safe verification evidence.
