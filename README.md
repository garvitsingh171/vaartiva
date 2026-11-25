# Vaartiva

**AI-Native Video Conferencing & Intelligent Collaboration Platform**

*Meet together. Think together. Get things done.*

## Overview

Vaartiva is an AI-native meeting and collaboration platform designed to transform ordinary video meetings into intelligent, context-aware, and action-oriented workspaces.

Traditional video conferencing platforms enable people to communicate, but valuable knowledge, decisions, and action items frequently get lost after meetings.

Vaartiva aims to solve this problem by integrating a visible AI participant directly into collaborative meetings.

The AI participant can understand authorized meeting context, respond to questions, retrieve relevant information, identify decisions, and propose meaningful actions with human approval.

**Project Status:** Planning & Active Development

## The Problem

Modern teams face several challenges during online collaboration:

- Important decisions are lost in lengthy discussions.
- Action items and responsibilities are frequently forgotten.
- Participants struggle to find relevant information while meetings are happening.
- Meeting summaries lack sufficient context and evidence.
- Discussions and task management remain disconnected.
- Existing AI assistants often operate separately from real-time collaboration.

## Our Solution

Vaartiva combines real-time communication, conversational AI, retrieval-augmented generation, and agentic workflows within a unified collaboration platform.

Users will be able to conduct group video meetings and interact with a dedicated AI participant that understands relevant context and helps transform discussions into structured, actionable outcomes.

The system is designed around human control, secure information access, and verifiable AI-generated outputs.

## Planned Core Features

### Real-Time Collaboration
- Multi-participant video and audio meetings
- Secure meeting rooms and invitation links
- Screen sharing and in-meeting chat
- Participant and meeting controls
- Cross-platform web, Android, and iOS applications

### AI Meeting Participant
- Visible AI participation within meetings
- Context-aware conversational interaction
- Voice-based and text-based communication
- Meeting-aware question answering
- Speaker-sensitive conversational experiences

### Knowledge & Intelligence
- Real-time transcription
- Retrieval-augmented generation (RAG)
- Document-grounded AI responses
- Source attribution and contextual retrieval
- Structured meeting summaries

### Agentic Workflows
- AI-generated action proposals
- Human-in-the-loop approval mechanisms
- Task creation and tracking
- Structured decision records
- Auditable action execution

### Security & Reliability
- Authentication and authorization
- Resource-level access controls
- Secure handling of meeting information
- Explicit approval before consequential actions
- Observability, testing, and reliable failure handling

## Planned Technology Stack

| Layer | Technologies |
|---|---|
| Web | Next.js, React, TypeScript |
| Mobile | React Native, Expo |
| Backend | Node.js, Express, TypeScript |
| AI Services | Python, FastAPI |
| AI Orchestration | LangGraph |
| Real-Time Communication | LiveKit, WebRTC |
| Database | PostgreSQL, Prisma, pgvector |
| Background Processing | Redis, BullMQ |
| Monorepo | Bun Workspaces, Turborepo |
| Infrastructure | Docker, CI/CD |
| Python Tooling | uv |

The technology stack may evolve as architecture decisions and feasibility testing progress.

## Architecture

Vaartiva follows a modular monorepo architecture designed to support independent application development and shared contracts.

The platform separates user-facing applications, business APIs, real-time media, AI intelligence, and background processing into clear service boundaries.

This approach supports maintainability, independent testing, and future scalability.

## Development Roadmap

Development is organized into 14 planned phases covering project foundations, platform development, real-time communication, AI capabilities, agentic workflows, quality engineering, and release readiness.

The roadmap currently contains 205 planned pull requests, each intended to introduce a reviewable and testable improvement.

The project is being built incrementally with an emphasis on learning, engineering quality, and practical implementation.

## Development Status

Vaartiva is currently under development. Features described above represent the product vision and planned functionality unless explicitly marked as implemented.

Installation instructions, deployment details, and live demonstrations will be added as the corresponding development milestones are completed.

## Vision

To build an intelligent collaboration platform where meetings do more than connect people — they preserve knowledge, clarify decisions, and help teams move from conversation to execution.

---

**Vaartiva — Meet together. Think together. Get things done.**

## Engineering foundation

### Monorepo overview

Vaartiva uses Bun workspaces to install and link JavaScript and TypeScript packages from one root
manifest and lockfile. Turborepo runs workspace scripts as a dependency-aware task graph and caches
deterministic tasks locally. Bun handles JavaScript dependency management; it does not replace
Node.js requirements for frameworks and native tooling, or uv for Python services.

### Technology stack

- Web: Next.js App Router and TypeScript (reserved; application not initialized).
- Mobile: Expo React Native (reserved; application not initialized).
- Business API: Express and TypeScript (reserved; application not initialized).
- AI service: FastAPI and Python, managed independently with uv (reserved; service not initialized).
- Shared TypeScript presets: `@vaartiva/typescript-config`.
- Canonical cross-platform tokens: `@vaartiva/design-tokens`, backed by the existing
  `design/tokens/tokens.json` source.

### Repository structure

```text
apps/web/                Next.js App Router application (VRT-012)
apps/mobile/             Future Expo React Native application
apps/api/                Future Express business API
services/ai-worker/      Future independent Python AI service
packages/                Shared TypeScript configuration and future shared packages
design/tokens/           Canonical design tokens and their workspace manifest
infra/                   Reserved infrastructure configuration
docs/                    Product, architecture, security, privacy, and engineering docs
.github/                 Reserved GitHub workflows and repository templates
package.json             Bun workspace root and repository commands
bun.lock                 Single JavaScript dependency lockfile
turbo.json               Turborepo task graph and local cache configuration
```

The app and service folders are intentionally reserved with short responsibility notes. They have
no package manifests until they contain real application functionality. Python is not a Bun
workspace.

### Development prerequisites and setup

- Bun **1.3.14**, pinned in `packageManager` and `engines` in the root `package.json`. Install Bun
  using the [official installation instructions](https://bun.sh/docs/installation), then verify
  `bun --version` prints `1.3.14`.
- Node.js **20.19.0 or newer** for the web toolchain and planned native JavaScript tooling. Verify using
  `node --version`.
- Python and uv will be needed only when `services/ai-worker` is initialized. No Python packages
  are installed or validated by the root JavaScript commands.

From the repository root, install and check the current foundation:

```bash
bun --version
node --version
bun install --frozen-lockfile
bun run check
```

### Workspace commands and status

Run a task for an initialized workspace using Turbo filters, for example:

```bash
bun run dev --filter=@vaartiva/web
bun run dev --filter=@vaartiva/mobile
bun run dev --filter=@vaartiva/api
```

The web workspace is initialized. Its filtered dev, build, lint, and typecheck commands are
available. Mobile and API commands remain planned because those apps are not initialized. Root
commands delegate to Turbo; typecheck tasks exist for the web and design-token workspaces. No test
task is registered yet. An empty Turbo task run is not evidence of a build or test. `format` and
`format:check` use the root Prettier configuration; `check` runs the implemented formatting and
typecheck commands.

### Internal package conventions

Private internal packages use the `@vaartiva/*` namespace. Applications must declare every shared
package they consume as a workspace dependency (for example,
`"@vaartiva/typescript-config": "workspace:*"`) and must not import another application's
internals. The design-token workspace exports the existing `tokens.json`; no second token source is
maintained. The TypeScript presets are described in
[`packages/typescript-config/README.md`](./packages/typescript-config/README.md). The design-token
workspace typechecks representative light and dark tokens through the shared base preset, which
also verifies its `workspace:*` dependency resolution.

Add a JavaScript dependency to its owning workspace with Bun, from the repository root:

```bash
bun add --cwd apps/web <package>
```

Use `bun add --cwd apps/web --dev <package>` for a development dependency. Change `--cwd` to the
workspace that owns the dependency. Do not add dependencies to the root merely to make them
accidentally resolvable in another workspace. Python dependencies belong to the AI service's future
`pyproject.toml` and `uv.lock` and are managed with uv.

### Environment variables and trust boundaries

Each deployable app or service owns its own `.env.example` when it has established configuration;
no example files or integration variables are invented before then. Copy an example to a local
ignored `.env` file only when a workspace documents the variables it needs. Never commit secrets.

Next.js `NEXT_PUBLIC_*` and Expo `EXPO_PUBLIC_*` variables are included in client-visible code or
bundles and must contain no secrets. Database credentials, LiveKit API secrets, and AI provider keys
remain server-side. Mobile clients cannot securely hold embedded server credentials. Shared
packages must not read or expose server secrets. Web and mobile do not connect directly to
PostgreSQL; the API remains authoritative for business logic and authorization. Python worker code
is not imported by clients, and private AI knowledge is still subject to source permissions and
runtime authorization regardless of monorepo location. These boundaries reflect the existing
[trust-boundary documentation](./docs/architecture/trust-boundaries.md).

Turborepo uses strict environment handling. When applications add build-affecting environment
variables, declare only the required names in task `env` or `globalEnv` so they participate in
cache keys. Do not pass secrets or all environment variables through unrestricted wildcards. Remote
caching is not enabled; the current cache is local under `.turbo/`.

### Generated files and troubleshooting

Git ignores dependency directories, Turbo and framework caches, build outputs, TypeScript build
metadata, Python virtual environments and caches, local environment files, common signing keys, and
OS temporary files. Bun and uv lockfiles are not ignored. `.env.example` and `.env.*.example` files
remain trackable. Native Android and iOS project directories are not broadly ignored.

If frozen installation fails, first verify that `bun --version` is exactly `1.3.14`, then rerun
`bun install` after an intentional manifest change and commit the resulting `bun.lock` update. A
`bun run check` failure can refer to formatting or the real TypeScript smoke check; empty Turbo task
sets for future applications are not evidence of those applications passing validation.
