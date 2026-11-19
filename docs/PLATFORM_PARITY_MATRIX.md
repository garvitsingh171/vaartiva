# Vaartiva — Web, Android and iOS Platform Parity Matrix

> **Issue:** VRT-002 · **Version:** 0.1 · **Created:** 2026-11-19  
> **Status:** Proposed target behavior; no tests executed or exceptions approved.  
> **Accountable owner:** Cross-platform QA Lead (role assignment pending)

## 1. Parity policy

One product, three real clients: a responsive **web app**, a **native Android app**, and a **native iOS app**. All share the same backend permission and domain contracts. Visual layout may differ; user-critical jobs and privacy rules cannot silently differ.

**Statuses per platform:** `REQUIRED`, `CONDITIONAL` (verified, eligibility-dependent), `NOT_APPLICABLE` (explain why), or `EXCEPTION_PENDING_APPROVAL`. In this document, all `REQUIRED` entries are **targets only**, not implemented/tested claims.

**Human capacity:** a mixed-device room must support **3–6 human participants**, with the separately visible AI participant outside that baseline. Room feature support is tested with physical devices when OS/media behavior matters.

## 2. Functional parity baseline

| Flow/feature | Web | Android | iOS | Required parity proof | Owner / gate |
|---|---|---|---|---|---|
| Sign in/up, account/session expiry | REQUIRED | REQUIRED | REQUIRED | Unauthorized API access denied; session expiry handled | Identity / G1 |
| Workspace and role restrictions | REQUIRED | REQUIRED | REQUIRED | Same server policy and denied-source tests | Identity + Security / G1 |
| Invite link, guest prejoin/admission | REQUIRED | REQUIRED | REQUIRED | Guest can join permitted room; expired/revoked link and app deep-link paths fail safely | Identity / G1–G2 |
| Create/instant/scheduled/recurring room | REQUIRED | REQUIRED | REQUIRED | Consistent timezone, recurrence, joins and lifecycle | Meetings / G2 |
| A/V, mute, camera, switching devices | REQUIRED | REQUIRED | REQUIRED | Six-human mixed-device functional room; permissions and reconnection | Media / G2 |
| Share **and view** screen | REQUIRED | REQUIRED | REQUIRED | Cross-client share/view with native OS permissions and stop handling | Media / G2 |
| Text chat, presence, active speaker | REQUIRED | REQUIRED | REQUIRED | Consistent permissions and activity signals | Collaboration / G2 |
| Agenda and collaborative notes | REQUIRED | REQUIRED | REQUIRED | Multi-client synchronized state and persistence | Collaboration / G3 |
| Polls and whiteboard | REQUIRED | REQUIRED | REQUIRED | Mobile adaptive controls, same content and permissions | Collaboration / G3 |
| Decision status and evidence | REQUIRED | REQUIRED | REQUIRED | Proposed ≠ confirmed; evidence safely navigable | Collaboration / G3 |
| Internal tasks and human approvals | REQUIRED | REQUIRED | REQUIRED | Exact proposal review, task persistence and audit | Actions / G3–G5 |
| Restricted document access and citations | REQUIRED | REQUIRED | REQUIRED | Same audience filtering; citation links only to permitted sources | Knowledge / G4 |
| Per-person STT consent/status | REQUIRED | REQUIRED | REQUIRED | Nonconsenting audio excluded; withdrawal status consistent | Security + Voice / G4 |
| Invoke, cancel, view/hear visible AI | REQUIRED | REQUIRED | REQUIRED | Distinct tile/status; safe cancel and typed fallback | Voice / G4 |
| Public vs private specialist AI output | REQUIRED | REQUIRED | REQUIRED | No private text/voice/source leaks to public participants | AI + Security / G5 |
| Post-meeting recap, decisions, follow-up | REQUIRED | REQUIRED | REQUIRED | Same authorized artifact states and errors | Collaboration / G3–G5 |
| Account/data deletion and access revocation | REQUIRED | REQUIRED | REQUIRED | Request can be made or safely reached from each platform; server applies globally | Security / G6 |
| Accessibility, loading and failure states | REQUIRED | REQUIRED | REQUIRED | Keyboard/screen reader semantics as applicable, visible errors and recovery | QA / G6 |
| Optional external connectors | CONDITIONAL | CONDITIONAL | CONDITIONAL | Only expose capability where account/provider/client flow is verified | Integrations / G5 |

## 3. Native differences requiring explicit spikes

| Topic | Platform | Concern | Planned verification / outcome |
|---|---|---|---|
| Media distribution | All | Same room across browser and two native SDKs | Physical-device room join and A/V performance at six humans |
| Screen broadcasting | **iOS** | ReplayKit broadcast upload extension, system picker, audio permissions/limits, lifecycle | Tested on physical iOS devices with receiver on Android/web; no simulator-only sign-off |
| Screen broadcasting | **Android** | MediaProjection consent, foreground service/lifecycle and applicable OS requirements | Physical-device end-to-end share and recovery; explicitly test consent revocation |
| Background/locked screen | Android/iOS | OS may suspend video or alter microphone/background behavior | Document actual supported behavior and user-facing states; no false always-on guarantee |
| Guest entry | Android/iOS | Deep/universal links and app-not-installed paths | Working invite route and tested join-recovery path; no accidental broader access |
| Audio devices | Android/iOS | Speaker/headset/Bluetooth switches and interruptions | Device-change/phone-call interruptions tested across supported OS versions |
| Collaborative canvas | Android/iOS | Touch/keyboard ergonomics and small viewport | Same data rights and outcomes, adaptive tools acceptable; no silent missing core action |
| AI visibility/consent | All | UI may be backgrounded or agent active | Same server-enforced consent plus usable status on resume/rejoin |

**Mandatory native screen-share policy:** F05 remains `REQUIRED` in the proposed scope. If the technical spike cannot prove a safe native implementation, open a scope-change decision and **hold G2** until approved and retested. Do not label the app “same feature set” while silently omitting native sharing.

## 4. Device and scenario test template

Each tested scenario should record: feature ID, build SHA/version, client, OS and device model, room population, network conditions, guest/member roles, consent state, steps, expected result, actual result, evidence link, result (`PASS/FAIL/BLOCKED`) and defect issue.

**Minimum planned test coverage:**

1. Browser + Android + iOS join one room with **six human participants** and separately invited AI.
2. Each client acts as host, internal member and guest (where role grants allow); reject restricted guest entry.
3. Broadcast screen from each platform and view it on at least one different platform.
4. Validate AI-disabled, quota-exceeded, network-drop and rejoin scenarios without damaging the human call.
5. Ask a cross-audience confidentiality question from a guest; verify no private response in chat, speech or citation.
6. Confirm decisions and approved tasks on one client; verify exact state on the other two.
7. Test microphones, cameras, consent withdrawal, cancellation, screen readers and large/text-scaled layouts.

## 5. Exception register

| Exception ID | Feature + affected client | Requested difference | Equivalent user outcome | Risk/approval | Status |
|---|---|---|---|---|---|
| — | — | No exceptions filed | — | — | **NONE APPROVED** |

An exception needs Product Owner, Security review (if relevant), and QA acceptance; a difference that violates a core MUST requires formal scope revision, not merely a design exception.

**Related:** [MVP Scope Contract](./MVP_SCOPE_CONTRACT.md) · [Release Gates](./RELEASE_GATES.md) · [Risk Register](./RELEASE_RISK_REGISTER.md)
