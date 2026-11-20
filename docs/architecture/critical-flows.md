# Critical System Flows

## 1. Meeting Start and Participant Connection

This sequence distinguishes application state from LiveKit media state.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as Web / Mobile
    participant API as Express API
    participant DB as PostgreSQL
    participant LK as LiveKit

    User->>Client: Start meeting
    Client->>API: Request meeting start
    API->>API: Authenticate and authorize
    API->>DB: Transactional state change
    DB-->>API: Committed meeting state
    API-->>Client: Meeting status and version

    Client->>API: Request media access
    API->>DB: Check membership and permissions
    DB-->>API: Authorized
    API-->>Client: Short-lived LiveKit token

    Client->>LK: Connect using scoped token
    LK-->>Client: Media connection established

    LK-->>API: Authenticated participant event
    API->>API: Verify and deduplicate event
    API->>DB: Update derived presence
```

### Invariants

- Meeting state is authorized and persisted by the Express API.
- A successful media connection is not proof of business authorization.
- Joining a media room does not independently change meeting lifecycle state.
- Replayed events cannot create duplicate participants or transitions.
- Disconnection does not automatically imply the meeting has ended.

### Failure Scenarios

**Database failure:** The start operation must not report success without a committed state change.

**LiveKit unavailable:** The meeting record may remain valid while media connection fails. The UI must show a recoverable media error.

**Webhook duplicated:** Processing the duplicate must not change the result.

**Token expired:** The client must request a fresh authorized token.

## 2. AI Processing and Human Approval

```mermaid
sequenceDiagram
    autonumber
    actor User
    actor Approver
    participant Client as Web / Mobile
    participant API as Express API
    participant DB as PostgreSQL
    participant AI as FastAPI Worker
    participant Exec as Authorized Executor

    User->>Client: Request AI assistance
    Client->>API: Submit AI task
    API->>DB: Verify knowledge access
    API->>AI: Send authorized task context
    AI->>AI: Generate proposal
    AI-->>API: Structured proposal

    API->>API: Validate proposal
    API->>DB: Save PENDING_APPROVAL
    API-->>Client: Display proposal

    Approver->>Client: Approve proposed action
    Client->>API: Submit approval
    API->>DB: Verify approver and current state

    alt Approval valid
        API->>DB: Atomically claim execution
        API->>Exec: Execute permitted action
        Exec-->>API: Execution result
        API->>DB: Record result and audit
        API-->>Client: Report actual status
    else Rejected or unauthorized
        API-->>Client: Reject action
    end
```

### Invariants

- AI suggestions do not bypass human authorization.
- The approver must have the required capability.
- Action parameters must be revalidated at execution time.
- Execution must be protected against duplicates.
- Failed executions must be recorded honestly.
- Success must not be reported until execution is confirmed.
- Irreversible external effects require an execution and retry strategy suitable for that integration.

## 3. Knowledge Retrieval

```mermaid
flowchart TD
    A["Authenticated user request"] --> B["Resolve user and tenant"]
    B --> C["Resolve resource permissions"]
    C --> D{"Authorized scope?"}

    D -->|No| E["Deny access"]
    D -->|Yes| F["Apply tenant + visibility filters"]

    F --> G["pgvector similarity search"]
    G --> H["Validate returned sources"]
    H --> I["Build permitted AI context"]
    I --> J["Generate response"]
    J --> K["Return authorized result"]
```

### Privacy Requirements

- Private and shared resources are never searched together without an explicitly authorized union of scopes.
- Retrieval authorization occurs before content reaches the model.
- Generated summaries must not automatically gain broader visibility than their sources.
- Access revocation must be respected on future retrieval and result access.

## 4. Verification Scenarios

| Scenario | Expected result |
|---|---|
| Nonmember requests meeting token | Denied |
| User enters another tenant's meeting ID | Denied |
| LiveKit webhook delivered twice | Single effective state update |
| AI worker unavailable | Business API remains operational |
| Private document matches shared search | Private content excluded |
| Unauthorized user attempts approval | Denied and auditable |
| Approved action submitted twice | No duplicate effect |
| Permission revoked before execution | Execution denied |
| Expired media token reused | Connection rejected |

## 5. Observability

Track:

- Meeting state transition failures.
- Media token issuance and authorization failures.
- Webhook processing failures and duplicates.
- AI task duration and failure rates.
- Knowledge authorization denials.
- Approval outcomes and execution failures.
- Correlation IDs across API and worker operations.

Logging must preserve request correlation without exposing raw secrets, private documents, or unnecessary personal information.
