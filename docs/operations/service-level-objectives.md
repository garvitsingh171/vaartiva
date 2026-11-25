# Service-Level Objectives (Proposed)

## Principles and measurement

- **Stage:** internal alpha -> invitation-only beta. The numbers below are *unvalidated targets*.
- **Primary rolling window:** 28 days, checked daily. For very low traffic, complement metrics with user-journey synthetic probes and report sample size; do not represent sparse data as statistically conclusive.
- **SLIs are user-centric.** A process responding `/health` does not prove a meeting can be created or joined.
- **Exclude only predeclared, defensible cases.** Do not hide server errors or overload-related failures in the exclusion set. Document expected `4xx` client errors separately.
- **No security error budget:** unauthorized disclosure, cross-tenant access, forged approvals, or recording without required consent are release blockers even if availability looks healthy.

## Initial SLO catalogue

| ID | User journey / SLI | Proposed target | Window / source |
|---|---|---|---|
| SLO-01 | Eligible core API requests completed correctly | >= 99.5% | Rolling 28 days / server request metrics |
| SLO-02 | Eligible core business API requests completed within 750 ms server-side | >= 95% | Rolling 28 days / histograms |
| SLO-03 | Authorized meeting join succeeds within 15 sec from token request to LiveKit room-connected event | >= 95% | Rolling 28 days / correlated client events |
| SLO-04 | Eligible continuous 30-minute media sessions finish without an unexpected service-side disconnect | >= 95% | Rolling 28 days / media client telemetry |
| SLO-05 | Post-meeting AI summary tasks for <= 30 min of available audio/transcript finish successfully within 90 sec of acceptance | >= 95% | Rolling 28 days / durable job events |
| SLO-06 | Supported mobile app sessions complete without a process crash | >= 99% | Rolling 28 days / crash reporting |

**Definition of an 'eligible' API request (SLO-01 and SLO-02):** authenticated or intentionally public request to the core meeting/membership/knowledge API at supported release versions. Success means the API returns a correct, contract-compliant response; server 5xx, gateway timeouts, capacity-induced 429, or transport failures count as bad. Exclude clearly invalid client input and legitimately denied unauthorized requests (4xx) only if the route handled them correctly. Distinguish legitimate per-user quota 429 from overload. Exclude health probes, dev environments, and known testing traffic. Do not automatically exclude planned maintenance or dependency outages; they affect users.

**SLO-02:** stop the timer when the response is completed; exclude explicitly asynchronous operations such as AI generation and uploads, which have separate indicators. Measure region and endpoint group; do not average p95 values.

**SLO-03:** count a join attempt only after an authenticated user elects to join a valid meeting and grants required OS permissions. Client logs `join_requested` and `room_connected`, joined by a pseudonymous attempt ID; failed token issuance, expired/invalid tokens due to application bugs, signaling failures, and timeouts are bad. Record network type/device/region. Exclude user-cancelled joins and explicitly denied OS permissions while tracking them in UX metrics. At low sample volumes, require manual cross-device verification.

**SLO-04:** measure only fully observed 30-minute participant sessions under a documented test network class; expected user leaves, permission changes, and declared network loss are excluded and tracked separately. Report session-count and network/device mix. This is a *quality goal*, not a guarantee that internet connectivity never drops.

**SLO-05:** includes authorization, queueing, generation, and persisting output; starts when API commits the accepted job, ends when the result is available to the authorized requester. Count failed or silently dropped jobs as bad. Pending consent/transcript availability is a separate state and not called 'accepted'. Model/provider outage counts against this SLI for accepted tasks. Inputs beyond 30 minutes must have a separately approved target.

**SLO-06:** crash-free sessions = eligible sessions without a fatal app process crash / total eligible sessions. Track versions, Android/iOS, OS, and device classes. Reject tiny samples as insufficient evidence rather than passing automatically.

## Supporting operational objectives (not yet SLOs)

| ID | Objective | Proposed design target | Proof required |
|---|---|---|---|
| OBJ-01 | Restore application service after recoverable incident (RTO) | <= 8 hours | Incident drill |
| OBJ-02 | Maximum acceptable recoverable data loss (RPO) | <= 24 hours | Backup + restore drill |
| OBJ-03 | Meeting lifecycle mutation correctness | Transactional, idempotent, authorized | Unit + integration tests |
| OBJ-04 | Queue durability | No silently lost accepted job | Worker restart/retry test |
| OBJ-05 | Web experience | Define LCP/INP after instrumentation and supported-device baseline | Real user metrics |

RTO/RPO do **not** assert the selected provider or architecture currently meets these numbers. Backup policies, verification, and storage encryption are prerequisites.

## Degraded-mode invariants

- **AI unavailable:** existing meetings and basic collaboration remain available; display AI unavailable, queue only if durable and authorized.
- **LiveKit unavailable:** business meeting records remain correct; tell users media is unavailable; do not mark a meeting successful solely from DB success.
- **Database unavailable:** do not claim successful state-changing actions without confirmed commit. Return explicit retryable failure where appropriate.
- **Partial authorization/consent uncertainty:** fail closed. Never trade privacy for SLO performance.
- **Telemetry unavailable:** functionality can continue only if core audit and security controls still work; mark SLO as unmeasurable, not automatically successful.

## Revision criteria

Reassess after 2–4 weeks of useful beta traffic, after a release affecting media/AI, and whenever major pricing, network region, provider, or device-support assumptions change. Raise SLOs only with capacity evidence and an approved budget.
