# Error Budget and Incident Policy

## Error budgets

A **99.5% request-based availability SLO** permits up to **0.5% bad eligible requests** over the rolling 28-day window.

Example: 10,000 eligible requests -> 50 bad events budgeted. At 100,000 requests -> 500. This is **not** an allowance to leak private data or perform unauthorized actions.

A purely time-based 99.5% availability objective would correspond to 201.6 minutes in a 28-day window. Vaartiva's core API SLO is **request-based**, so do not use 201.6 minutes as the actual event budget.

## Release and incident policy

| State | Trigger | Response |
|---|---|---|
| Normal | Metrics healthy and budget burn manageable | Continue planned work |
| Review | Increased error budget burn or repeated join/AI incidents | Investigate, reduce risky release scope, document fix |
| Freeze | 28-day error budget exhausted or severe repeated failure | Freeze nonessential feature releases; prioritize reliability and regression tests |
| Security stop | Unauthorized data disclosure, consent violation, or unauthorized AI action | Disable affected capability, contain, investigate, and follow incident process regardless of SLO |

Do not ignore outages during planned maintenance in primary user-facing SLIs unless a future approved measurement policy explicitly changes that treatment and discloses it.

## Incident severity (draft)

- **SEV-0:** Privacy/authorization breach or nonconsensual recording/processing. Immediately contain and disable offending feature. Preserve secure evidence and coordinate remediation.
- **SEV-1:** Most authorized users cannot create/join meetings, database mutations failing, or broad media outage. Disable risky changes, communicate to testers, and restore service.
- **SEV-2:** AI summaries unavailable or slowed, some clients failing, elevated latency. Provide degraded functionality, diagnose, and track.
- **SEV-3:** Minor localized issue without significant user impact. Fix in planned work.

## Dependency failure behavior

| Dependency | Required response |
|---|---|
| PostgreSQL | Do not claim a business write succeeded without a confirmed commit; return recoverable error |
| LiveKit | Display media unavailable/retry; preserve meeting record consistency |
| FastAPI/LLM | Core meetings stay usable; mark AI output pending/failed rather than fabricating results |
| Job dispatch | Do not acknowledge durable job acceptance unless the task is durably recorded |
| Observability | Escalate lost visibility; do not assume all requests succeeded |

## Operational drills

- Database restore from a backup into an isolated environment, with access and data-integrity checks.
- FastAPI worker restart while a task is running; verify idempotency and that accepted work is not silently lost.
- LiveKit dependency outage; verify meeting UI degrades and state remains correct.
- Simulated unauthorized AI action and cross-tenant access; assert fail closed and audit trail exists.

## Post-incident report template

Record: impact window (UTC), affected journey, severity, detection, timeline, SLI impact, root cause, contributing factors, corrective action, owner, deadline, verification, and user communications. Avoid copying raw sensitive meeting data into reports.

## Review cadence

Review the budget and major incidents weekly during beta. A provisional freeze rule is not a substitute for production operations staffing. Revise policy after real data and release cadence are known.
