# Vaartiva — Low-Fidelity User Flow Diagrams

> **Issue:** VRT-003 · **Status:** Proposed, not implementation or tested UX · **Owner role:** Product / UX Lead (pending)  
> **See also:** [Journey Map](./USER_JOURNEYS.md) · [State Matrix](./STATE_AND_ERROR_MATRIX.md) · [Mobile Navigation](./MOBILE_NAVIGATION_AND_DEEP_LINKS.md)

## 1. Diagram conventions

- Rectangles: UI or server-observed state; diamonds: user or policy decision; edges: trigger/result.
- *Authorize* means **server-side** identity, meeting and audience checks; a client-side conditional alone never grants access.
- The routes and screen labels are **design placeholders**. No implementation exists from these diagrams.
- Mermaid is maintained as editable source inside GitHub Markdown. A future Figma diagram may link to these IDs, but is not claimed to exist.

### FD-01 — Member sign-in, workspace and instant/scheduled creation (UJ-01/UJ-02/UJ-03)

```mermaid
flowchart TD
    A["Open Vaartiva: web / Android / iOS"] --> B{"Authenticated session valid?"}
    B -- No --> C["Sign in / sign up"]
    C --> D{"Identity callback and session valid?"}
    D -- No --> E["Retry / switch account / home"]
    E --> C
    D -- Yes --> F["Fetch authorized workspaces"]
    B -- Yes --> F
    F --> G{"Has authorized workspace?"}
    G -- No --> H["Empty state: create or request invite"]
    G -- Yes --> I["Workspace dashboard"]
    I --> J["Create meeting"]
    J --> K{"Instant or scheduled/recurring?"}
    K -- Instant --> L["Create active session"]
    K -- Scheduled --> M["Choose timezone, date, recurrence"]
    M --> N{"Input and permissions valid?"}
    N -- No --> M
    N -- Yes --> L
    L --> O{"Creation confirmed by server?"}
    O -- No --> P["Error; retry without duplicate"]
    P --> J
    O -- Yes --> Q["Meeting detail + scoped invite actions"]
    Q --> R["Open prejoin / share invite"]
```

### FD-02 — Guest HTTPS invitation, native link, admission and rejection (UJ-04)

```mermaid
flowchart TD
    A["Open HTTPS meeting invitation"] --> B{"Verified native app handles link?"}
    B -- Yes --> C["Open native guest join screen"]
    B -- No --> D["Open responsive web guest join"]
    C --> E["Resolve opaque invite with backend"]
    D --> E
    E --> F{"Invite valid, not expired or revoked?"}
    F -- No --> G["Safe invalid/expired page; request new invite"]
    F -- Yes --> H["Guest name, device checks, consent disclosure"]
    H --> I{"Identity/requirements valid?"}
    I -- No --> J["Correct info or leave"]
    J --> H
    I -- Yes --> K["Request host admission"]
    K --> L{"Host admits before timeout?"}
    L -- Waiting --> M["Waiting room; cancel/leave"]
    M --> L
    L -- No --> N["Denied/timeout; request access or leave"]
    L -- Yes --> O["Fresh server authorization and room token"]
    O --> P{"Still authorized and room active?"}
    P -- No --> G
    P -- Yes --> Q["Meeting: guest-only capabilities"]
    Q --> R["Leave or room ends"]
    R --> S["Recap denied unless separately granted"]
```

### FD-03 — Prejoin, media permissions and reconnection (UJ-02/UJ-05/UJ-11)

```mermaid
flowchart TD
    A["Prejoin: name + mic/camera preview"] --> B{"OS/browser permission granted?"}
    B -- No --> C["Permission explanation + retry / join without camera"]
    C --> D{"Call can proceed with available media?"}
    D -- No --> E["Device help / exit"]
    D -- Yes --> F["Request scoped join token"]
    B -- Yes --> F
    F --> G{"Server authorizes capacity, role, session?"}
    G -- No --> H["Ended/full/denied; safe return"]
    G -- Yes --> I["Join room + media + chat"]
    I --> J{"Connection/media event"}
    J -- Healthy --> K["Collaborate; share or view screen"]
    J -- Interrupted --> L["Reconnecting; show connection state"]
    L --> M{"Fresh permission and room validation succeeds?"}
    M -- Yes --> I
    M -- No --> N["Access lost or terminal failure; exit"]
    K --> O["Leave OR host ends for everyone"]
```

### FD-04 — Speaker consent, AI invocation, voice/text, cancellation and failure (UJ-06)

```mermaid
flowchart TD
    A["Join human meeting: AI off by default"] --> B["Show per-speaker STT consent controls"]
    B --> C{"This speaker consents?"}
    C -- No --> D["No audio from speaker to STT; human call continues"]
    C -- Yes --> E["Register consent; only this track eligible for STT"]
    D --> F["Authorized participant explicitly invites / opens AI"]
    E --> F
    F --> G{"AI enabled, quota available, actor allowed?"}
    G -- No --> H["Unavailable/denied; keep human meeting usable"]
    G -- Yes --> I["Distinct AI tile and state shown"]
    I --> J["Authorized typed or explicit voice request"]
    J --> K{"Permission, audience, active-turn and voice-consent checks pass?"}
    K -- No --> L["Denied/busy; safe retry or cancel"]
    K -- Yes --> M["Retrieve only audience-allowed context"]
    M --> N{"Request canceled, failed or timed out?"}
    N -- Yes --> O["Cancel/failed state; no false answer or action"]
    N -- No --> P["Cited answer or honest insufficient evidence"]
    P --> Q["Text / voice delivered only to allowed audience"]
    E --> R["Speaker withdraws consent"]
    R --> S["Stop future STT for that speaker; reflect in UI"]
```

### FD-05 — Document ingestion, sharing and guest-safe grounded retrieval (UJ-07/UJ-10)

```mermaid
flowchart TD
    A["Authorized user selects document"] --> B["Choose audience: private/internal/explicit guest"]
    B --> C{"Upload permitted and file accepted?"}
    C -- No --> D["Unsupported/denied/size error; no upload claim"]
    C -- Yes --> E["Private upload and processing"]
    E --> F{"Indexing succeeded?"}
    F -- No --> G["FAILED; retry or remove where allowed"]
    F -- Yes --> H["READY; confirm explicit audience grant"]
    H --> I["Participant asks about source"]
    I --> J["Server checks principal AND output audience"]
    J --> K{"Source authorized for this audience?"}
    K -- No --> L["No source exposure; denied or insufficient evidence"]
    K -- Yes --> M["Retrieve allowed chunks only"]
    M --> N{"Relevant valid citation exists?"}
    N -- No --> L
    N -- Yes --> O["Answer with resolvable citation"]
    O --> P["User opens cited page with fresh access check"]
    P --> Q{"Grant still active?"}
    Q -- No --> L
    Q -- Yes --> R["Show permitted source location"]
```

### FD-06 — Proposed decision → approval → verified internal task (UJ-08)

```mermaid
flowchart TD
    A["Discussion / AI suggestion"] --> B["Decision card status = PROPOSED"]
    B --> C{"Authorized human confirms?"}
    C -- No --> D["Keep proposed / edit / discard"]
    C -- Yes --> E["CONFIRMED with human and evidence/manual mark"]
    E --> F["Action proposal with exact task payload"]
    F --> G["Human sees payload, assignee and source"]
    G --> H{"Authorized human approves unchanged payload?"}
    H -- No --> I["REJECTED / EDITED; no task created"]
    H -- Yes --> J["Backend re-authorizes + idempotency check"]
    J --> K{"Real database operation confirmed?"}
    K -- No --> L["FAILED/UNKNOWN; status lookup before retry"]
    K -- Yes --> M["Receipt: persisted task ID + audit trail"]
    M --> N["Authorized recap/task view on all 3 clients"]
```

### FD-07 — End, recap and rights after the meeting (UJ-09/UJ-12)

```mermaid
flowchart TD
    A["In meeting"] --> B{"User leaves or host ends for all?"}
    B -- Leave --> C["Leave own session; meeting may continue"]
    B -- End for all --> D["Confirm end + enforce host role"]
    D --> E["Close room; finalize permitted artifacts"]
    E --> F{"Consented material available?"}
    F -- No --> G["No consented transcript; permitted manual artifacts"]
    F -- Yes --> H["Recap GENERATING"]
    H --> I{"Generation succeeded?"}
    I -- No --> J["PARTIAL/FAILED; safe retry where allowed"]
    I -- Yes --> K["READY with sources and decision status"]
    G --> L["Fresh authorization on recap request"]
    J --> L
    K --> L
    C --> L
    L --> M{"Viewer has artifact grant?"}
    M -- No --> N["Access denied without private metadata"]
    M -- Yes --> O["View permitted recap, tasks, decisions"]
    O --> P{"Artifact grant revoked/deleted?"}
    P -- Yes --> N
    P -- No --> Q["Follow up on authorized tasks"]
```

### FD-08 — Private assistant and optional connector write (UJ-10)

```mermaid
flowchart TD
    A["Internal member opens PRIVATE assistant"] --> B["Server checks personal and source grants"]
    B --> C{"Request allowed?"}
    C -- No --> D["Deny; no retrieval"]
    C -- Yes --> E["Private response; not broadcast"]
    E --> F{"User chooses to share or write?"}
    F -- No --> G["Keep private"]
    F -- Share --> H["Review exact content + public audience safety"]
    H --> I{"Explicit share authorized?"}
    I -- No --> G
    I -- Yes --> J["Publish only reviewed, authorized content"]
    F -- External write --> K{"Connector enabled and permissions verified?"}
    K -- No --> L["Unavailable/deferred; no fake action"]
    K -- Yes --> M["Show exact provider action + approval"]
    M --> N{"Human approves and backend verifies?"}
    N -- No --> L
    N -- Yes --> O["Execute; show actual external receipt or failure"]
```

## 2. Diagram-to-test handoff

| Diagram | Core decisions to test | Negative path that must not be omitted |
|---|---|---|
| FD-01 | Session/auth validity, workspace authorization | Removed member cannot see stale workspace |
| FD-02 | Verified link, invite, admission, token issuance | Revoked or forwarded guest link rejected correctly |
| FD-03 | OS permissions, room capacity, reconnection | Rejoin cannot bypass fresh server authorization |
| FD-04 | Speaker consent and active AI authorization | Nonconsenting voice excluded from STT; public/private leak denied |
| FD-05 | Document audience grant and citation validation | Guest cannot retrieve host-private negotiation document |
| FD-06 | Human approval, payload stability, confirmed execution | Duplicate tap or timeout never manufactures completed task |
| FD-07 | End-for-all, recap generation, artifact rights | Guest cannot access internal recap by guessing URL |
| FD-08 | Private/public switch, connector eligibility | Private answer not silently broadcast; unverified connector not presented as success |

For screen states and copy, see [STATE_AND_ERROR_MATRIX.md](./STATE_AND_ERROR_MATRIX.md). For actual web/native navigation and deep-link routing, see [MOBILE_NAVIGATION_AND_DEEP_LINKS.md](./MOBILE_NAVIGATION_AND_DEEP_LINKS.md).
