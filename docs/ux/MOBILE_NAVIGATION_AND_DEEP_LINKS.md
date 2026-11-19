# Vaartiva — Web & Native Navigation, Deep Links and Adaptive Layouts

> **Issue:** VRT-003 · **Version:** 0.1 · **Prepared:** 2026-11-19  
> **Status:** Proposed information architecture; route names are illustrative, not implemented.  
> **Owner roles:** Cross-platform UX / Mobile Lead + Identity & Security review (assignment pending)

## 1. Platform contract

Vaartiva has **three separate clients** sharing one product and server-side policy: responsive web, native Android, native iOS. Android/iOS are planned as React Native + Expo **development builds** (not Expo Go for native media verification). Web routes and native screens do **not** have to look identical, but core tasks and permissions do.

- **Web:** direct browser URL, persistent desktop workspace navigation, keyboard-first dialogs, wide participant grid and side panels; responsive narrow-screen browser fallback.
- **Android:** stack/tabs + Android back behavior, edge-to-edge/safe areas, explicit camera/mic/MediaProjection screens, foreground/background behavior and verified Android App Links.
- **iOS:** stack/tabs + native navigation gestures, safe areas/keyboard, camera/mic/ReplayKit broadcast workflows and verified Universal Links.
- **All:** deep-link admission always revalidated by backend; no link alone authorizes room membership, data access or AI retrieval.

## 2. Proposed route-to-screen map (illustrative only)

| User job | Web route candidate | Native screen/route candidate | Key difference |
|---|---|---|---|
| Welcome | `/` | Welcome / onboarding | Mobile first-run affordances, browser marketing entry |
| Member sign-in | `/sign-in` | `/(auth)/sign-in` | OS app-switch return and safe deep-link resume |
| Workspaces | `/workspaces` | `/(tabs)/workspaces` | Native chooser; member-only |
| Dashboard | `/dashboard` | `/(tabs)/meetings` | Web cards/sidebar vs native list/tab |
| Meeting detail/schedule | `/meetings/[meetingId]` | `/meetings/[meetingId]` | Native date/time picker and mobile invite sheet |
| Guest invite / link resolution | `/join/[inviteId]` | `/join/[inviteId]` | Native app link vs browser with web fallback |
| Prejoin | `/meet/[meetingId]/join` | `/prejoin/[meetingId]` | OS device permissions / camera preview |
| Live room | `/meet/[meetingId]` | `/room/[meetingId]` | Mobile grid and bottom sheet, call OS interruptions |
| Documents / knowledge | `/meetings/[meetingId]/documents` | `/meetings/[meetingId]/documents` | Native file picker and document viewer |
| Recap / decisions | `/meetings/[meetingId]/recap` | `/recap/[meetingId]` | Adaptive cards; source opening authorizes anew |
| Tasks | `/tasks` | `/(tabs)/tasks` | Same task rights and verified status |
| Private AI | `/assistant/private` | `/assistant/private` | Explicit private-audience chrome on both |
| Settings / data controls | `/settings` | `/(tabs)/settings` | OS-specific permissions help; same data rights |

**Navigation names are proposed**, not a commitment to exact Expo Router file paths. Do not make API endpoints or OAuth callback URLs equal to client route names by assumption. Final route architecture belongs to implementation issues.

## 3. Native invite and link-resolution sequence

Use a first-party **verified HTTPS domain**, such as the following schematic pattern. **No production domain is asserted.**

```text
https://<verified-vaartiva-domain>/join/<opaque-invite-id>
```

Avoid shipping a custom-scheme-only invitation as the canonical message link. Domain ownership, association files, signing certificates, bundle identifiers and URL policy must be confirmed during implementation.

```mermaid
sequenceDiagram
    participant Invitee as Invitee
    participant Link as Verified HTTPS Link
    participant Client as Web / Android / iOS
    participant API as Vaartiva API
    participant Host as Meeting Host
    Invitee->>Link: Open invitation
    Link->>Client: OS verified app link OR browser fallback
    Client->>API: Resolve invite reference
    API-->>Client: Valid, expired, revoked, or unavailable
    alt Valid invitation
        Client->>Invitee: Show guest/member identity + prejoin
        Invitee->>Client: Request admission
        Client->>API: Create admission request
        API->>Host: Notify waiting guest (authorized context)
        Host->>API: Admit or reject
        alt Admitted and still valid
            Client->>API: Exchange for scoped room join grant
            API-->>Client: Short-lived permitted room token
            Client->>Invitee: Join restricted room
        else Rejected / stale / timed out
            Client->>Invitee: Denied / request new invitation
        end
    else Invalid, expired, or revoked
        Client->>Invitee: Safe unavailable state; no private metadata
    end
```

### Mandatory link-security decisions

1. An invite URL carries only an opaque, bounded-lifetime invitation **reference**, not an OAuth credential, permanent media token, secret document URL, or privileged access grant.
2. All join, admission, source access and media-token issuance have **fresh server authorization**. Link discovery alone is not permission.
3. Deep links to private views (recap, source citation, tasks) are safe to open, but data requires a current account/session and current resource grant.
4. Do not copy sensitive invite IDs into analytics, crash reports, third-party redirect parameters, rich notifications, social preview metadata, referrer headers or unrestricted server logs. Configure safe no-index/no-preview behavior and referrer policy where appropriate.
5. Avoid an open redirect via `returnTo`; only allow known local destinations or a server-validated mapping from an opaque pending-intent record.
6. Preserve a desired destination through sign-in or app-switch only after safe validation; **do not** persist the original link as a universal bypass key.
7. A revoked invite, removed membership or expired session overrides any cached navigation intent and clears inaccessible views on resume.
8. Link identity is independent of role: a forwarded valid invite still requires whatever named-guest, passcode, waiting room and host admission rules are configured.
9. Back navigation must not expose stale restricted content in native app switcher previews or a browser back-forward cache after revocation; adopt redaction/revalidation as implementation requirements.
10. If server cannot verify the invite, use `UNAVAILABLE` and safe recovery. Never auto-admit during outage.

## 4. App installed, uninstalled and authentication return

| Case | Expected navigation | Failure/recovery |
|---|---|---|
| Verified Android App Link + app installed | Android native invite resolver → prejoin | Fall back to HTTPS web invite when app handler not available; no silent unauthorized join |
| iOS Universal Link + app installed | Native invite resolver → prejoin | Browser opens if native association/OS routing does not occur |
| No app installed on phone | HTTPS page offers **Join on web**, optional app-store choice | User can participate via supported mobile browser if baseline web guest flow works; no forced install |
| Web link on desktop | Browser guest/member resolver → prejoin | Support normal browser back and accessible permission help |
| Signed-out member opens invite | Sign-in → validate safe pending intent → server resolve invite again | If login uses wrong account or invite expired, deny/request switch |
| Guest without account opens invite | Limited guest identity + required admission without unnecessary member sign-up | If policy requires identity challenge, provide clear explanation |
| App killed or link reopened during room | Fresh invite/member validation → choose resume room or view ended state | No reuse of revoked room/media token |
| Link copied across devices | Fresh identity/device and audience checks on second client | Concurrent-session policy to be defined; do not inherit first device permission |
| Invitation to scheduled future occurrence | Show schedule with local time and original zone | When canceled/updated, show authoritative occurrence; do not silently re-target |

## 5. Authentication callback and deep-link intent lifecycle

**Proposed states:** `RECEIVED → PARSED → DOMAIN_VERIFIED → SESSION_CHECKED → INVITE_RESOLVED → ADMISSION_PENDING → AUTHORIZED → PREJOIN → JOINED`, with terminal states `INVALID`, `EXPIRED`, `DENIED`, `CANCELED`, `ENDED`, `CAPACITY_FULL`.

- When authentication sends the user out of the app, persist only a **bounded, server-validatable intent identifier**, not an unrestricted untrusted destination or long-lived join token.
- Once identity is established, re-resolve invite and current role; account switching never inherits old user privileges.
- Guest verification and host admission must be separately represented in UI; *prejoin* is not proof of admission.
- Attempted deep links into ended rooms and forbidden recaps end in safe terminal screens with return navigation.

## 6. Desktop vs mobile low-fidelity layout sketches

### Desktop web — meeting

```text
+-----------------------------------------------------------------------+
| VAARTIVA | Workspace / Meeting title | Connection | AI/STT indicators |
+---------------------------+----------------------+--------------------+
|                           |                      | Chat / Agenda /    |
|   Human video grid        | Shared screen /      | Documents / AI /   |
|   3–6 + distinct AI tile  | stage (when active)  | Decisions / Tasks  |
|                           |                      | scoped per user    |
+---------------------------+----------------------+--------------------+
| Mic  Camera  Devices  Share  Participants  AI  Leave / End for all     |
+-----------------------------------------------------------------------+
```

### Native mobile — meeting (portrait)

```text
+--------------------------------------+
| < Meeting title  Network  AI/STT      |
|--------------------------------------|
|  Video stage / dominant speaker      |
|  swipe / scroll participant grid     |
|  Visible AI tile and audience status |
|--------------------------------------|
| [Chat] [Agenda] [Docs] [AI] [More]   |
|  => opens an adaptive bottom sheet   |
|--------------------------------------|
| Mic   Camera   Share   People  Leave  |
+--------------------------------------+
```

### Mobile — guest prejoin / waiting

```text
+--------------------------------------+
| < Back           Guest invitation     |
| Meeting name (only after valid resolve)|
| Preview (camera off acceptable)      |
| Name: ______________________         |
| Mic [off/on]  Camera [off/on]         |
| Privacy + AI/capture disclosure      |
| [ Request to Join ]                  |
|--------------------------------------|
| Waiting for host... [Cancel]         |
+--------------------------------------+
```

**Low-fidelity only:** screen hierarchy, controls, and affordances are requirements drafts, not an approved visual design system. Desktop, tablet, split-screen, orientation changes and mobile text scaling must be considered in VRT-004 and implementation.

## 7. Native-specific interaction requirements

| Interaction | Web | Android | iOS | UX/engineering constraint |
|---|---|---|---|---|
| Back/exit | Browser history and in-app routes | System back + explicit leave confirmation | Back swipe/stack + explicit leave | Navigation should not drop a call accidentally |
| Invite share | Copy link / share menu | Native share sheet | Native share sheet | Never share privileged room tokens |
| Camera/mic | Browser permission prompts/device selection | Runtime permissions + audio route | AV permissions + audio route | Clearly show denied/off/retry states |
| Screen share | Browser `getDisplayMedia` consent | MediaProjection + OS foreground/service requirements | ReplayKit broadcast extension/OS picker | No client promises share active before OS/provider confirms; device spike required |
| App background/interrupt | Tab switching, browser throttling | Phone call/Bluetooth/background policy | Phone call/Bluetooth/background policy | Actual supported media behavior must be tested; don't guarantee uninterrupted video |
| In-call panels | Sidebar or drawer | Bottom sheet or dedicated sub-screen | Bottom sheet or dedicated sub-screen | Preserve participant stage and critical leave/mute controls |
| Whiteboard | Pointer/keyboard | Touch/pan/zoom | Touch/pan/zoom | Same underlying collaboration/permissions, adaptive controls |
| Citations | In-app document view/new tab | Native viewer or in-app secure web view | Native viewer or in-app secure web view | Re-authorize every open and label source clearly |
| Accessibility | Keyboard, focus, screen reader | TalkBack, touch target/large text | VoiceOver, Dynamic Type | Control meaning and status parity required |

## 8. Acceptance tests to hand to implementation

| Test ID | Action | Pass condition |
|---|---|---|
| NAV-01 | Open member invite in web after auth expiry | Safe sign-in and resumed **revalidated** invite |
| NAV-02 | Open valid guest link on Android/iOS with app installed | Correct native prejoin, then waiting/admission |
| NAV-03 | Open guest link with app uninstalled | HTTPS web join is available and usable |
| NAV-04 | Open revoked/expired invite in native handler | No room token or sensitive metadata; request-new-link UX |
| NAV-05 | Switch accounts while opening private meeting URL | Data shown only for new authenticated account's permissions |
| NAV-06 | Open private source link from guest-visible AI output | Denied; no citation side-channel leak |
| NAV-07 | Background iOS or Android with AI/STT active; resume | Updated consent, AI, connection and room authorization shown |
| NAV-08 | Start and stop Android and iOS screen share | Real OS broadcast state and receiver visibility verified on physical devices |
| NAV-09 | Navigate into recap/tasks after meeting ends | Correct authorized state and usable back navigation |
| NAV-10 | Use large text, screen reader and narrow layout | Join, consent, mute, leave, approvals all accessible |

## 9. Outstanding decisions

- Final route names, custom app scheme, verified domain(s), iOS bundle ID, Android package name and association/delegation files.
- Whether guest invitation is single-use or multi-use; token rotation and link-forwarding policy.
- Whether member/guest can have overlapping sessions and how rejoin device transfers are handled.
- Exact account-recovery and auth provider callback implementation.
- Screen-share native feasibility, device OS matrix and supported background behavior.
- Which mobile browser/OS combinations are accepted for app-not-installed guest join.

**No decision above is approved by creating this file.** Security, UX and cross-platform owners must review it before implementation. See [User Journeys](./USER_JOURNEYS.md), [Diagrams](./USER_FLOW_DIAGRAMS.md), [State Matrix](./STATE_AND_ERROR_MATRIX.md), and the parent [Platform Parity Contract](../PLATFORM_PARITY_MATRIX.md).
