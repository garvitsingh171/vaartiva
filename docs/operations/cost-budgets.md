# Monthly Cost Budgets (Proposed)

**Currency:** USD, pre-tax, before exchange-rate and payment fees.  
**Status:** Internal spending targets, *not* vendor quotes, fixed prices, or technically enforced hard caps.  
**Scope:** recurring operational cloud/service costs. App-store registration fees, hardware purchases, and developer time are reported separately.

## Spending envelopes

| Service category | Development monthly | Controlled beta monthly |
|---|---:|---:|
| Web / API / AI compute hosting | $20 | $45 |
| PostgreSQL hosting / backups | $10 | $20 |
| LiveKit media and media egress | $15 | $50 |
| AI inference, STT, and TTS | $15 | $45 |
| Object storage and egress | $5 | $10 |
| Expo EAS build/update services | $0 | $10 |
| Monitoring / logs / alerts | $5 | $10 |
| Contingency reserve | $5 | $10 |
| **Total recurring planning ceiling** | **$75** | **$200** |

These are **allocations**, not predictions of actual bills. They may be too low for continuous transcription or always-on AI participants. Restrict meeting duration, participants, AI invocations, build usage, and storage until measured unit costs fit. Pay for service only when its role is necessary; leverage eligible free allowances but do not assume they guarantee a production SLO.

## One-off and annual items (excluded above)

- Apple Developer Program membership, Google Play Console registration, domains, test devices, taxes, and any paid code-signing/security tools.
- Record annual subscriptions separately in a cash-flow view and optionally amortize them for unit economics; don't accidentally omit them from total project funding.
- Check VRT-007 for enrollment and billing ownership decisions.

## Vendor assumptions (verify before purchase)

- **LiveKit Cloud:** room costs can include participant connection minutes, outbound bandwidth, transcoding/egress, and separate AI agent/inference usage. Track each line item and the chosen plan's included quotas. [LiveKit](https://livekit.com/pricing) / [Cost guide](https://kb.livekit.io/articles/3947254704-understanding-livekit-cloud-pricing)
- **Expo EAS:** Free tier provides limited build/update capacity; paid tiers/overages depend on selected plan and usage. [Expo pricing](https://expo.dev/pricing) / [Billing](https://docs.expo.dev/billing/plans/)
- **Postgres:** provider/compute/storage/network charge depends on plan; if choosing Neon, check current usage allowances and idle behavior. [Neon pricing](https://neon.com/pricing)
- **AI:** API token, audio-minute, realtime/session, or model-specific billing depends on selected provider; pricing and minimums must be confirmed. [OpenAI pricing](https://developers.openai.com/api/docs/pricing) (example only, not a selected provider)
- **Hosting:** choose region and plan only after testing latency and privacy constraints. Fixed monthly minimums can defeat assumed 'free' spending.

## Allocation governance

- Assign one billing owner for all accounts; enable multi-factor authentication and notification emails.
- Record actual billed cost daily/weekly, plus forecast based on current usage rate and fixed charges.
- Track actual vs allocation by provider, service, environment, and stage.
- Alert at **50%** month forecast, **80%** projected budget, **100%** projected budget and **110%** invoice risk; review already-incurred usage and fixed commitments.
- At 80%, reduce optional AI tasks and nonessential high-quality video; at 100%, disable costly optional work or stop accepting new beta seats until owner approves change. Do **not** unexpectedly end live rooms or drop already accepted jobs; degrade gracefully and enforce quotas before usage.
- Set provider spend limits where supported. Many provider budget emails/thresholds are **alerts, not hard caps**; enforce app-side quotas and rate limiting as well.
- Log plan/rate changes in a dated decision record. Validate currency conversion and local tax before paying from India.

## Cost guardrails / allocations

- Set per-user/day and per-meeting AI task quotas, plus task-level token/audio-minute ceilings.
- Limit maximum meeting duration, participant count, and concurrent AI agents for the beta.
- Default to recording/transcription **off** unless explicitly authorized and consented; this protects privacy and budget.
- Configure queue concurrency, retries, timeouts, and maximum paid downstream calls per job.
- Delete authorized temporary media/derived files per retention policy; set storage lifecycle rules.
- Avoid logging prompts, transcripts, raw media, and full responses in external observability systems.

## Approval record (fill during review)

| Decision | Value |
|---|---|
| Budget owner | TBD |
| Development allocation approved? | No — proposed |
| Beta allocation approved? | No — proposed |
| Billing provider account owner(s) | TBD |
| Selected LiveKit plan | TBD |
| Selected AI provider/model pricing | TBD |
| Selected DB/hosting tiers | TBD |
| Billing alerts active / evidenced | No — not yet configured |
