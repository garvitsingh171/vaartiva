# Vaartiva Security Threat Model — VRT-008

**Document status:** Draft for security/engineering review (not evidence of implementation)  
**Scope:** Proposed MVP of Vaartiva (Next.js web, Expo Android/iOS, Express TypeScript API, FastAPI Python workers, LiveKit media, PostgreSQL/pgvector, AI assistance and human-approved actions)  
**Last reviewed:** 2026-11-20  
**Owner:** Backend/security engineering (assign a named owner before implementation)

## Start here

| Document | Purpose |
| --- | --- |
| [Threat model](./threat-model.md) | Assets, actors, assumptions, DFD, boundaries and STRIDE analysis |
| [Abuse cases](./abuse-cases.md) | 18 concrete attacker/misuse scenarios with impact and safe verification ideas |
| [Risk register](./risk-register.md) | Prioritized TH-001 to TH-018 risks, proposed owners, mitigation and release gate |
| [Security controls](./security-controls.md) | Design-level preventive, detective and corrective controls |
| [Verification plan](./verification-plan.md) | Test cases, evidence requirements, milestones and release-blocking conditions |

## Existing design contracts

This is an extension of:
- `docs/architecture/README.md` and `docs/architecture/trust-boundaries.md` (VRT-005)
- `docs/policies/data-classification.md`, `authorization-policy.md`, `knowledge-and-ai-access.md`, and `retention-and-deletion.md` (VRT-006)
- `docs/mobile-release/ownership-and-security.md` (VRT-007)

If any document disagrees, **raise a design decision** rather than silently weakening a trust or privacy rule. No account, tenant, host, or media role bypasses the underlying resource ACL.

## Security outcomes we must preserve

1. Confidential content is available only to currently authorized principals, including at retrieval time and at the time AI outputs are viewed.
2. LiveKit media membership is separate from authoritative meeting membership and business state.
3. A private note stays private unless an explicitly authorized share operation permits a specific audience.
4. AI content never grants itself authority; privileged actions require a valid human decision and server-side reauthorization immediately before execution.
5. Transcription/recording, media bot presence and provider processing obey explicit permissions and applicable consent.
6. Untrusted events, callbacks, documents, model output and mobile clients cannot impersonate trusted application services.
7. An outage or retry cannot produce a falsely confirmed, duplicated, or silently unauthorized state change.

## Process

1. Review the [security data-flow diagram](./threat-model.md#4-security-data-flow-diagram).
2. Review the [abuse catalogue](./abuse-cases.md) against each trust-boundary crossing.
3. Agree on [risk ratings and owners](./risk-register.md) (scores below are initial estimates only).
4. Translate controls into implementation issues; maintain **threat ID -> implementation PR -> test case -> evidence** traceability.
5. Reassess when an authentication provider, model provider, job system, LiveKit deployment, mobile build pipeline, new tool/action, or share/guest policy changes.

## Required security review outcomes

- **Accepted:** security reviewer confirms assumptions, mitigations and validation strategy for the applicable feature.
- **Needs work:** required mitigations/tests are missing or a trust boundary is unclear.
- **Explicit exception:** owner records compensating control, residual risk, expiry, and approver. No silent exception for critical unauthorized access, recording without consent, or execution without authorization.

## Limitations / open decisions

- Auth provider and token/session management are not yet finalized.
- Deployment mode for LiveKit, job transport, recording storage, external model providers, guest policy, consent jurisdictions and retention periods are still undecided.
- Risk scores are **design estimates**, not empirical security findings.
- This PR introduces **no runtime controls**, pentests, production tests or certifications.

## Reference standards and product guidance

- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/)
- [OWASP Top 10 for LLM Applications (2025 catalogue)](https://genai.owasp.org/llm-top-10/)
- [OWASP Mobile Application Security Verification Standard](https://mas.owasp.org/MASVS/)
- [LiveKit access tokens and grants](https://docs.livekit.io/frontends/reference/tokens-grants/)
- [LiveKit webhooks](https://docs.livekit.io/intro/basics/rooms-participants-tracks/webhooks-events/)
- [Expo EAS environment variables](https://docs.expo.dev/eas/environment-variables/)
