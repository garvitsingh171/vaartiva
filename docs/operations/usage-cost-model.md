# Usage, Capacity and Variable-Cost Model

## Core units (avoid mixing them)

- **Meeting-minutes:** sum of wall-clock duration of each meeting.
- **Participant-minutes:** sum of minutes each human or AI media participant is connected. *Not the same* as meeting-minutes.
- **Transcribed audio minutes:** amount of actual input audio billed by the chosen STT/transcription vendor; some providers bill by track or channel.
- **Agent-session minutes:** connected time for an AI participant if a provider separately bills sessions.
- **LLM tokens:** input/output (and any cache/tool billing) billed according to the selected model.
- **Egress GB:** outgoing media/object bytes billed under the selected provider's traffic policy.
- **Compute-hours:** hosting resources billed per unit/time or fixed subscription.
- **Storage GB-month:** time-weighted stored data, including backups and derivatives where billed.

## Formula worksheet (replace variables with verified prices)

```text
meeting_minutes = meeting_count * average_meeting_minutes
participant_minutes = meeting_count * average_meeting_minutes * avg_connected_participants
  # include AI participant in count if it joins LiveKit
transcription_minutes = meeting_count * avg_meeting_minutes * transcription_opt_in_fraction * billable_tracks_factor
agent_session_minutes = meeting_count * avg_meeting_minutes * ai_participant_fraction

livekit_variable = max(0, participant_minutes - plan_included_participant_minutes) * livekit_participant_minute_rate
                + max(0, outbound_gb - included_outbound_gb) * outbound_gb_rate
                + egress_or_transcoding_units * relevant_rate
                + other_paid_livekit_features
ai_variable = stt_billable_units * stt_rate
            + llm_input_tokens_million * llm_input_price_per_million
            + llm_output_tokens_million * llm_output_price_per_million
            + tts_billable_units * tts_rate
            + agent_session_minutes * any_separate_agent_rate

monthly_forecast = hosting_fixed + db_compute_storage + livekit_variable + ai_variable
                 + object_storage_and_egress + mobile_build_overage + observability
                 + other_required_fixed_costs + contingency
```

**Avoid double counting:** If AI inference/STT/TTS is billed through LiveKit or another gateway, use the actual invoice source of truth; do not charge it again as an external provider cost. Respect plan inclusions, tiered rates, discounts, minimums, and taxes.

## Illustrative usage scenarios (not forecasts)

| Input | Development illustration | Controlled-beta illustration |
|---|---:|---:|
| Meetings per month | 30 | 150 |
| Average meeting duration | 25 min | 25 min |
| Average connected participants | 3 | 4 |
| Meeting-minutes | 750 | 3,750 |
| Participant-minutes | 2,250 | 15,000 |
| Share of meetings transcribed (opt-in) | 20% | 40% |
| Single-track transcription minutes (illustration) | 150 | 1,500 |
| Illustrative peak simultaneous meetings | 2 | 10 |

The table is synthetic. Billing depends on actual connected durations (including reconnections and AI participants), video bitrate, network traffic, real user behavior, selected model/provider, included quotas, and regional costs. An AI assistant connected to every meeting can materially increase both participant minutes and inference spend.

## Capacity test scenarios

| Test ID | Workload | What to capture |
|---|---|---|
| CAP-01 | 10 API requests/sec for 15 min, realistic auth + DB operations | Good-request %, p95, CPU, memory, DB pool |
| CAP-02 | 2 concurrent meetings, 3 participants each | Join SLO, audio/video quality, WebRTC disconnects |
| CAP-03 | 10 concurrent rooms, 4 participants each (beta aspirational) | Join SLO, room events, bandwidth/plan limits, cost/minute |
| CAP-04 | 10 simultaneous 30-min AI summary tasks after meetings | Queue wait, retries, 90-sec target feasibility, AI spend |
| CAP-05 | 1-hour prolonged DB or AI dependency degradation (staging) | Failures, no corrupted state, safe recovery |
| CAP-06 | Mixed Android + iPhone devices with weak-network transitions | Reconnection, app stability, user messaging |

The targets are test scenarios, *not* claims of currently supported concurrency. Scale only if testing and provider quotas justify it.

## Forecasting process

1. Record actual count/length of meetings, participants, opt-in transcriptions, agent use, token counts, egress, storage, job retries, and EAS builds.
2. Retrieve current vendor plan rates and included allowances from billing pages.
3. Forecast the **full calendar month** as fixed commitments + incurred usage + expected remaining usage.
4. Compare each category against its proposed allocation in [cost-budgets.md](./cost-budgets.md).
5. Document outliers and rate changes. Alert before reaching the spend ceiling.
6. Review price per active meeting, price per participant-hour, and price per accepted AI task; adopt upgrades only when the value and budget warrant them.

## Privacy and billing intersection

Collect only aggregate cost drivers and pseudonymous counters. Do not put transcript text, meeting names, user emails, or private documents in a cost dashboard. Keep opt-in permissions separate from billing quotas: permission and consent checks must happen *before* a paid external AI or recording request.
