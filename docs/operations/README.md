# VRT-009 — Nonfunctional SLOs and Cost Budgets

**Status:** Proposed design baseline (not measured, not production commitments)  
**Owner:** Engineering / project maintainer (specific accountable person TBD)  
**Reviewed:** 2026-11-21; re-review before beta and whenever vendor prices or architecture change.

## Purpose

Vaartiva is an AI-native meeting and collaboration product: Next.js web; Expo React Native mobile; Express TypeScript business API; FastAPI Python AI workers; LiveKit media; PostgreSQL and pgvector. This folder defines what a *controlled MVP beta* should achieve, how to measure it, and how to avoid unplanned infrastructure spending.

## Documents

| Document | Contents |
|---|---|
| [service-level-objectives.md](./service-level-objectives.md) | SLIs, objectives, eligibility, data protection invariants |
| [measurement-and-observability.md](./measurement-and-observability.md) | Event definitions, metrics, logs, dashboards, alerting |
| [error-budget-and-incident-policy.md](./error-budget-and-incident-policy.md) | Budget calculation, response, fallback, restoration |
| [cost-budgets.md](./cost-budgets.md) | Proposed spending ceilings, cost ownership, billing checks |
| [usage-cost-model.md](./usage-cost-model.md) | Capacity scenarios, variable-cost formulas, guardrails |
| [release-gates-and-validation.md](./release-gates-and-validation.md) | Performance testing, evidence, release gates, open decisions |

## Required distinction

- **SLO:** internal target for an explicitly defined SLI; not a contractual SLA.
- **SLI:** actual observed proportion, latency, or other user-relevant measurement.
- **Proposed:** target chosen for planning; not achieved until instrumented and proven.
- **Error budget:** permitted proportion of unsuccessful eligible events under an availability objective. It does not authorize security/privacy breaches.
- **Cost allocation:** internal spending limit and estimate, **not** a provider quote or guaranteed hard stop.

## MVP operating assumptions

- One engineering owner, budget-sensitive early development, controlled-access pilot.
- No guarantee of 24/7 on-call personnel. Do not publicly promise uninterrupted service.
- Support limited meeting durations/participants and restrict expensive AI tasks while calibrating costs.
- Product security/consent rules are higher priority than keeping an endpoint 'available'.
- Review against `../architecture/` (VRT-005), `../policies/` (VRT-006), and `../security/` (VRT-008) if those folders are present.

## Approval checklist

- [ ] Project owner accepts the proposed SLOs and cost ceilings.
- [ ] Monitoring can compute every released SLI (not synthetic test-only metrics).
- [ ] Cloud billing dashboards/alerts and product quotas configured before paid beta.
- [ ] Load, device, recovery, and privacy gates evidenced.
- [ ] Unresolved choices are recorded in the implementation issue, not silently assumed.

## References

- [Google SRE — Defining SLOs](https://sre.google/sre-book/service-level-objectives/)
- [Google SRE — Error budget policy](https://sre.google/workbook/error-budget-policy/)
- [LiveKit Cloud pricing](https://livekit.com/pricing)
- [LiveKit estimating meeting cost](https://kb.livekit.io/articles/3947254704-understanding-livekit-cloud-pricing)
- [Expo EAS pricing](https://expo.dev/pricing)
- [Expo billing plans](https://docs.expo.dev/billing/plans/)
- [Neon pricing](https://neon.com/pricing)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing) (only if OpenAI is selected)

Prices and plan allowances change. Verify current vendor rates, account-specific plans, taxes, and currency before enabling paid usage.
