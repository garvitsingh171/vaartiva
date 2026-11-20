# Vaartiva Architecture

Vaartiva is an AI-native meeting and collaboration platform supporting web, Android, and iOS clients.

This directory documents the intended architecture, security boundaries, component responsibilities, and critical workflows.

## Architecture Documents

| Document | Purpose |
|---|---|
| [System Context](./system-context.md) | Components, responsibilities, dependencies, and data ownership |
| [Trust Boundaries](./trust-boundaries.md) | Authentication, authorization, privacy, and security boundaries |
| [Critical Flows](./critical-flows.md) | Meeting lifecycle and human-approved AI actions |

## Technology Decisions

| Layer | Technology |
|---|---|
| Web | Next.js |
| Mobile | Expo React Native |
| Business backend | Express.js + TypeScript |
| AI processing | FastAPI + Python |
| Media | LiveKit |
| Application database | PostgreSQL |
| Semantic search | pgvector |
| JavaScript package manager | Bun |
| Python package manager | uv |

## Architectural Principles

1. The backend owns authoritative business state.
2. Clients are untrusted, regardless of platform.
3. Access to information follows explicit authorization rules.
4. AI workers operate with limited permissions.
5. AI recommendations never imply permission to execute actions.
6. Private knowledge must never become shared implicitly.
7. Media processing requires the applicable permissions and consent.
8. Sensitive operations are auditable and idempotent where appropriate.
9. Service failures should not corrupt authoritative state.
10. Security boundaries must be enforced in code, not merely shown in diagrams.

## Implementation Status

These documents describe the target architecture, not a claim that all services have been implemented.

Infrastructure choices such as durable job dispatch, recording storage, retention schedules, and external model providers must be finalized in their respective implementation PRs.

## Documentation Maintenance

Any future PR changing service responsibilities, trust boundaries, or critical communication flows must update the relevant architecture document.
