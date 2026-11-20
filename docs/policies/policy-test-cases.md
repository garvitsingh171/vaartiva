# Permission and Classification Policy Test Cases

**Status:** Normative scenarios to translate into automated API, database, AI-worker, and media tests in future PRs.

## Roles and fixtures

- Organization **A**: Alice (`OWNER`), Bob (`MEMBER`), Charlie (`MEMBER`).
- Organization **B**: Dana (`OWNER`).
- Meeting **M1** belongs to A: Alice (`HOST`), Bob (`PARTICIPANT`); Charlie is **not a member**.
- `N1`: Bob's `PRIVATE` / `CONFIDENTIAL` note inside organization A.
- `N2`: Alice's `MEETING` / `CONFIDENTIAL` note in M1.
- `T1`: M1 transcript created with the necessary capture/consent policy satisfied.
- `D1`: Dana's `PRIVATE` document in organization B.

Assume all users are authenticated unless the test explicitly says otherwise. Resource access still requires all policy checks.

## Acceptance test matrix

| ID | Action | Expected | Reason |
| --- | --- | --- | --- |
| P01 | Bob reads own `N1` | ALLOW | Private owner in valid tenant |
| P02 | Alice (org owner + meeting host) reads Bob's `N1` | DENY | Neither role grants private ownership |
| P03 | Charlie guesses M1 ID and requests `N2` | DENY | Not a meeting member |
| P04 | Bob reads `N2` while M1 membership/policy permits | ALLOW | Meeting-scoped access |
| P05 | Dana reads/searches `N2` | DENY | Cross-tenant and nonmember |
| P06 | Bob shares `N1` to M1 through authorized explicit grant | ALLOW | Documented intentional sharing |
| P07 | Alice reads `N1` after valid M1 sharing | ALLOW | Newly authorized scope |
| P08 | Bob revokes the M1 sharing grant and Alice reads `N1` again | DENY | Current grants required |
| P09 | Alice searches for `N1` embeddings after P08 | NO RESULTS/NO METADATA | Retrieval enforces ACL |
| P10 | Alice's summary mixes `N2` and now-private `N1` and is shown to everyone in M1 | DENY | Derived result must satisfy all source permissions |
| P11 | Bob requests LiveKit token for M1 | ALLOW, short-lived scoped token | Valid participant and room grant |
| P12 | Charlie requests LiveKit token for M1 | DENY | No meeting membership |
| P13 | Alice presents valid LiveKit token as permission to read `N1` | DENY | Media token is not document authorization |
| P14 | M1 recording starts without required consent | DENY | Capture requires policy and consent |
| P15 | AI worker requests every record in A using broad credentials | DENY | Task-scoped least privilege |
| P16 | AI proposal asks to delete a meeting without approval | NO EXECUTION | AI cannot self-approve |
| P17 | Authorized approver approves a valid immutable proposal | APPROVED, then controlled execution | Separate action checks |
| P18 | Same action execution callback/request is replayed | NO DUPLICATE EFFECT | Atomic claim + idempotency |
| P19 | Approver's permission is revoked before execution | DENY / HALT | Reauthorize at execution |
| P20 | LiveKit webhook is forged or signature invalid | REJECT | Authentication at media boundary |
| P21 | Valid LiveKit webhook delivered twice | ONE EFFECTIVE UPDATE | Idempotent derived presence |
| P22 | Source is deleted, search retrieves its old embedding | DENY / NO RESULTS | Deletion and index invalidation |
| P23 | Client submits `role: OWNER` in request JSON | DENY unauthorized operation | Client role claims untrusted |
| P24 | AI output asks the worker to ignore tenant checks | DENY | Prompt injection cannot grant access |
| P25 | Unauthorized provider requested for confidential transcript | DENY or explicit approved alternative | Provider boundary is enforced |
| P26 | Meeting member is removed and accesses stored AI answer | DENY unless independent valid grant | Recheck permissions on stored outputs |

## Essential system invariants

```text
Unauthorized user never receives source content OR source-identifying metadata.
Tenant A resources cannot appear in tenant B retrieval results.
Role alone never overrides a PRIVATE resource's access controls.
Revoked resources cannot be newly retrieved or exported.
AI outputs never confer privileges on their own.
No privileged action executes without current authorization and valid approval.
Media room connectivity does not rewrite authoritative meeting state.
Repeated event delivery or action requests cannot duplicate side effects.
```

## Test implementation mapping

- **Express API integration tests:** P01–P08, P11–P13, P16–P19, P23, P26.
- **Database/vector authorization tests:** P05, P09–P10, P22.
- **AI service contract tests:** P10, P15–P16, P24–P25.
- **LiveKit token/webhook contract tests:** P11–P14, P20–P21.
- **Privacy/lifecycle tests:** P08–P10, P14, P22, P26.

Use distinct fixture tenants and verify both response body **and** forbidden metadata side channels. Each future implementation PR should link its corresponding policy scenario IDs in test names or review notes.

## Policy questions to resolve before coding

1. What guest permissions are permitted after a meeting ends?
2. Is cross-organization sharing supported in MVP?
3. Which recorded content requires consent and what is the withdrawal behavior?
4. Which actions require separate human approvers or multiple approvals?
5. What are target cache-revocation bounds and retention schedules?
