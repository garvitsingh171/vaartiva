# Measurement and Observability Plan

## Golden signals and user journeys

Measure **traffic, latency, errors, and saturation** by service and by actual user journey. Label every chart by environment and API version. Use sampling for traces; use counters for all SLO-eligible events.

| Signal | Suggested metric/event | Tags (low-cardinality unless otherwise controlled) |
|---|---|---|
| Core requests | `api_request_total{outcome,route_group}` | env, route_group, outcome |
| API duration | `api_request_duration_seconds` histogram | env, route_group, status_class |
| Meeting join | `meeting_join_attempt_total{outcome}` and join elapsed duration | platform, network_class, region |
| Media disconnect | `media_session_end_total{reason}` | platform, network_class |
| AI jobs | `ai_job_total{state}` and processing duration | job_type, provider, model_class |
| Mobile stability | `mobile_session_total{crashed}` | platform, release_channel, app_version |
| Queue saturation | oldest-job age, queue depth, retries | job_type |
| DB saturation | connection pool pressure, slow queries, storage | service, env |
| Spend | daily provider cost and forecast | vendor, environment, resource |

## Correlation and privacy

- Generate a request/trace ID at the edge; propagate it to Express, durable queue, FastAPI, and event reconciler. Separate pseudonymous meeting attempt IDs connect clients to backend events.
- Never use meeting title, transcript text, user email, secret, room token, raw prompt, document content, or organization private identifiers as metric labels.
- Redact authentication headers, LiveKit tokens, external AI payloads and all secret values from logs.
- Use access-controlled audit trails for privileged actions, separate from aggregate monitoring dashboards.
- Track telemetry retention as a data class under VRT-006; disable sensitive session replay by default.

## Implementation design (not yet configured)

1. Instrument Express route groups and outcomes. Preserve a clear distinction between denied requests and infrastructure failures.
2. Emit client lifecycle events for meeting join and disconnect with time origin, monotonic duration, device/platform/network class, and privacy-safe correlation ID.
3. Instrument durable job acceptance, start, completion, failed, retry, and cancellation events; never mark a request successful solely because it entered a queue.
4. Record LiveKit provider metrics separately from user-observed meeting quality; reconcile verified webhooks idempotently.
5. Add crash reporting for Android and iOS development/preview builds, subject to privacy review.
6. Create a finance dashboard with provider invoice cost + metered usage + forecast, not just app logs.

## SLI calculation specification

For request success rate:

```text
SLI = good_eligible_requests / all_eligible_requests
error_budget_events = all_eligible_requests * (1 - SLO_target)
```

For join and AI summary completion:

```text
SLI = eligible_attempts_completed_correctly_before_deadline / eligible_attempts
```

For crash-free sessions:

```text
SLI = eligible_sessions_without_fatal_crash / eligible_sessions
```

For server-side latency, use histogram-based event fractions <= the deadline; verify the histogram has the right buckets. Do not calculate percentiles by averaging per-instance percentile metrics.

## Dashboards and alerts

**Dashboards:** Core API (success and latency), meeting joins, media quality, AI job execution and backlog, Postgres health, mobile crash rate, vendor spend, and security denial counts.

**Alert suggestions (starting thresholds, tune with real data):**

- Page/urgent notification: confirmed cross-tenant leak, unauthorized action, or non-consensual processing. This is a security incident, not a permitted SLO violation.
- High priority: error-budget burn > 14.4x over both 1h and 5m; or > 6x over both 6h and 30m (proposed multi-window detection).
- High priority: accepted AI jobs repeatedly fail, meeting joins fail for multiple test devices, or backups fail.
- Budget warnings at 50% and 80% actual-plus-forecast; spending ceiling at 100% requires manual review and feature quotas.

For a solo developer without 24/7 coverage, route alerts to a realistic channel with clear severity and response expectations. Do not claim an on-call SLA that cannot be staffed.

## Evidence repository

For every SLO review record: period, version, eligibility policy, numerator, denominator, exclusions, result, confidence/sample-size commentary, dashboard link, incident IDs, and follow-up action. Do not add private telemetry dumps to Git.
