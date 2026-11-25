# Vaartiva web

The Vaartiva web client uses Next.js App Router and TypeScript. This workspace currently contains
a small branded foundation page, root metadata, and route-level error and not-found experiences; it
does not yet implement authentication, meetings, or calls to the business API.

## Versions and prerequisites

- Node.js 20.19.0 or newer (Next.js 16 requires Node 20.9+, and ESLint 10 raises the toolchain
  minimum).
- Bun 1.3.14, as pinned by the monorepo root.
- Next.js 16.4.6, React / React DOM 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.5, and ESLint
  10.11.0.

Install dependencies once from the monorepo root:

```bash
bun install --frozen-lockfile
```

## Commands

From the monorepo root:

```bash
bun run dev --filter=@vaartiva/web
bun run lint --filter=@vaartiva/web
bun run typecheck --filter=@vaartiva/web
bun run build --filter=@vaartiva/web
```

To serve a completed production build, run `bun run start` from `apps/web/` after building. The
development and production servers use Node.js through Next.js; Bun is the package manager and
script runner.

## Structure and conventions

- `src/app/` contains filesystem routes, the root layout, global styles, metadata, and framework
  error boundaries. The typecheck command generates Next route types before running TypeScript, so
  it also works from a clean checkout.
- `src/components/ui/` and `src/components/shared/` are for real web-specific primitives and
  reusable web components when introduced.
- `src/features/` will hold feature-oriented UI and logic; `src/hooks/` will hold reusable React
  hooks.
- `src/lib/server/` and `src/lib/client/` separate server-only and browser-only helpers.
- `src/config/` and `src/types/` hold non-sensitive web configuration and web-specific types.

Do not create empty modules just to reserve these folders. Future route groups such as `(auth)`,
`(workspace)`, and `(meeting)` may organize routes, but their names do not enforce authorization.
The Express business API remains authoritative for authentication, access control, and business
operations.

Server Components are the default. Use a small Client Component boundary only when UI needs state,
event handlers, or browser APIs. A Server Component is not an authorization mechanism; future
server-side data access still needs explicit identity, audience, and permission checks. Do not send
credentials, private knowledge, or privileged records to the browser.

The app extends `@vaartiva/typescript-config/nextjs.json`, declares that workspace dependency
explicitly, and uses `@/*` for paths under `src/`. The Tailwind v4 theme maps utilities to the
existing `@vaartiva/design-tokens/tokens.css` export. `design/tokens/tokens.json` remains the
canonical token source; the web app does not keep a duplicate palette. No official logo or bundled
font asset exists in the repository, so the page uses the approved provisional text wordmark and
the documented Inter/system font stack.

## Environment and trust boundaries

The static foundation requires no environment variables, and there is no `.env.example` yet. If
variables are added later, server-only values must stay out of Client Components and client bundles.
Every `NEXT_PUBLIC_*` value is public. Database credentials, LiveKit API secrets, AI provider keys,
and service credentials remain on trusted server infrastructure. The web app does not connect
directly to PostgreSQL or call private AI workers.

## Current and deferred work

Implemented: one App Router home page, semantic metadata, responsive token-backed styling, keyboard
focus styling, a route error boundary, and a not-found page. Deferred: auth, workspace routes,
meeting flows, API client, data fetching, dark-mode controls, analytics, and production deployment.
