# Security Risk Register

**Status:** Proposed initial estimates for design review; no risk is recorded as mitigated or tested by this documentation-only PR.

## 1. Scoring convention

- **Likelihood (L):** 1 rare, 2 unlikely, 3 plausible, 4 likely, 5 highly likely if control absent.
- **Impact (I):** 1 negligible, 2 minor, 3 significant, 4 major, 5 severe privacy/security/reliability impact.
- **Inherent score = L × I** (assume proposed protections are **not** implemented). **Critical:** 20–25; **High:** 15–19; **Medium:** 8–14; **Low:** 1–7.
- **Residual risk:** `TBD` until implementation and verified evidence. Risk numbers are preliminary team judgement, not empirical measurements.
- **Owner:** Accountable *role* until a person is assigned. `Backend`, `AI`, `Mobile`, `Infra`, `Privacy` are proposed roles, not assigned team members.

## 2. Initial risk register

| Risk ID | Abuse case | Threat | STRIDE / AI | L | I | Score / tier | Proposed owner | Controls | Test | Release gate |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- |
| TH-001 | AC-001 | Compromised session reuse | S/I | 3 | 5 | **15 High** | Backend | C-001, C-010 | SEC-001 | Yes |
| TH-002 | AC-002 | Cross-tenant object access | E/I | 4 | 5 | **20 Critical** | Backend | C-002, C-003 | SEC-002 | Yes |
| TH-003 | AC-003 | Private knowledge appears in AI result | I / RAG | 4 | 5 | **20 Critical** | Backend + AI | C-004, C-007 | SEC-003 | Yes |
| TH-004 | AC-004 | Unauthorized media room entry | S/I | 3 | 5 | **15 High** | Backend + Media | C-005 | SEC-004 | Yes |
| TH-005 | AC-005 | Fake/duplicate media webhook | S/T | 4 | 4 | **16 High** | Backend + Media | C-006 | SEC-005 | Yes |
| TH-006 | AC-006 | Prompt injection from untrusted content | T/E / LLM | 4 | 4 | **16 High** | AI + Backend | C-007, C-009 | SEC-006 | Yes |
| TH-007 | AC-007 | Unauthorized external model processing | I / LLM | 3 | 5 | **15 High** | AI + Privacy | C-007, C-011 | SEC-007 | Yes |
| TH-008 | AC-008 | AI-driven action without human approval | E/T / LLM | 4 | 5 | **20 Critical** | Backend | C-009 | SEC-008 | Yes |
| TH-009 | AC-009 | Approval replay or stale authorization | T/R | 4 | 4 | **16 High** | Backend | C-009, C-010 | SEC-009 | Yes |
| TH-010 | AC-010 | Embedded client secret | I/S | 3 | 5 | **15 High** | Mobile + Infra | C-012 | SEC-010 | Yes |
| TH-011 | AC-011 | API/media/AI resource exhaustion | D | 4 | 3 | **12 Medium** | Backend + Infra | C-013 | SEC-011 | Conditional |
| TH-012 | AC-012 | Capture without required consent | I | 3 | 5 | **15 High** | Backend + Privacy | C-008, C-011 | SEC-012 | Yes |
| TH-013 | AC-013 | Privileged field injection | T/E | 4 | 4 | **16 High** | Backend | C-002 | SEC-013 | Yes |
| TH-014 | AC-014 | Stale authorization in cached artifacts | I | 4 | 5 | **20 Critical** | Backend + AI | C-003, C-004, C-011 | SEC-014 | Yes |
| TH-015 | AC-015 | Forged worker callback | S/T | 3 | 4 | **12 Medium** | Backend + AI | C-007, C-010 | SEC-015 | Yes if worker enabled |
| TH-016 | AC-016 | Mobile credential/build compromise | S/T/I | 3 | 4 | **12 Medium** | Mobile + Infra | C-012, C-014 | SEC-016 | Yes for mobile beta |
| TH-017 | AC-017 | Unsafe file processing | T/D | 3 | 4 | **12 Medium** | Backend + AI | C-015 | SEC-017 | Yes if uploads enabled |
| TH-018 | AC-018 | Confidential content in logs/exports/backups | I/R | 4 | 4 | **16 High** | Infra + Backend | C-010, C-011 | SEC-018 | Yes |

### Notes on gates

- **Yes:** Block release of the affected feature until appropriate control and negative-test evidence exist; critical unauthorized access, non-consensual capture and unauthorized execution are always blockers.
- **Conditional:** Block the affected feature when no accepted bounded-risk mitigation exists; a medium rating does not mean unlimited abuse is acceptable.
- **If enabled:** A disabled capability is not a reason to claim its risk mitigated. Re-open its gate when implementing it.

## 3. Tracking template

For each risk, create/update a linked GitHub implementation issue using this template (do not fabricate issue IDs):

```text
Risk ID: TH-___
Owner: <named engineer / review owner>
Feature / affected boundary:
Mitigation PR:
Control IDs:
Security test IDs:
Inherent L / I / score:
Residual L / I / score after verification:
Evidence (test logs / review / rollout):
Status: Open | In progress | Verified | Accepted exception
Exception approver / expiry (if any):
Last review date:
```

## 4. Review triggers

Re-score when: new organization/guest policy; new provider or AI tool; new action executor capability; change to token/session/approval semantics; LiveKit webhook changes; storage/index migration; recording rollout; external integration; material abuse report.

## 5. Release policy

1. No critical risk should remain **unmitigated and unverified** for an enabled MVP capability.
2. High risks require tested mitigation or an explicitly reviewed and documented exception; privacy or authorization bypasses do not receive silent exceptions.
3. Any known cross-tenant access, private knowledge leak, consent bypass, or action executed without proper authorization blocks the affected release regardless of numeric score.
4. Risk ownership and evidence must be recorded by the actual implementation PR, not only here.
