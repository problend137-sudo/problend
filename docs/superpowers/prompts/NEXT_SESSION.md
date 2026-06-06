# Next Session Prompt: ProBlend Digital OS Task 7

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Your job in this session is to resume the main ProBlend Digital Operating System implementation at:

`Task 7: Admin Auth, Sessions, And Setup Flow`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Implement only Task 7. Do not one-shot Tasks 8-11. Verify Task 7, commit it, then update this file for Task 8 unless the user redirects.

## Latest Completed Work

- Latest completed implementation commit when this prompt was written: `f4394fc`
- Latest commit message: `feat: add placement estimate forecasting flow`
- Branch: `main`
- Task 6 is implemented and committed.
- Current working tree after Task 6 commit should only have untracked `tmp/` screenshot artifacts plus this handoff edit until the handoff is committed. Do not commit `tmp/` unless the user explicitly asks.

## Completed Plan State

The repo has completed:

- Task 1: Foundation, tooling, and base app shell.
- Task 2: Supabase schema, Drizzle client, and data access boundary.
- Task 3: Forecasting engine and opportunity scoring.
- Task 4: Content system, public routes, and legal pages.
- Task 5: Public forms and server-side acquisition actions.
- Partnership Platform redesign after Task 5.
- Task 6: Placement estimate flow and forecast persistence.

Task 6 added:

- `src/features/forecasting/actions.ts` with `runPlacementEstimateAction`.
- `placementEstimateInputSchema` in `src/features/forecasting/schemas.ts`.
- `createCalculatorSubmission()` in `src/db/queries/forecasts.ts`.
- `src/components/public/PlacementEstimateForm.tsx`.
- Live `/placement-estimate` form and output panel.
- `src/tests/features/placement-estimate-actions.test.ts`.
- Seed migration `supabase/migrations/20260606091603_seed_default_forecast_config.sql`.

## Task 6 Verification Status

Fresh verification run during Task 6:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts src/tests/features/placement-estimate-actions.test.ts
# PASS: 3 files, 11 tests

npm run typecheck
# PASS

npm run lint
# PASS

npm run build
# PASS

git diff --check
# PASS

npm test
# PASS: 7 files, 39 tests
```

Supabase and browser verification notes:

- `npx supabase --version` returned `2.105.0`.
- `npx supabase projects list --output json` showed linked project `tueqoqusbxeldxnnarlv`, name `problend`, region `ap-south-1`, status `ACTIVE_HEALTHY`.
- `npx supabase migration list --linked` connected to the remote DB. Remote had `20260605181328`; local pending migrations were `20260606081445` and `20260606091603`.
- Do not assume pending migrations were applied remotely. Task 6 did not run `supabase migration up --linked`.
- Docker is unavailable locally: `docker info` failed with `zsh:1: command not found: docker`.
- Local Supabase reset was blocked. Do not claim `npx supabase start` or `npx supabase db reset` passed unless rerun in a Docker-capable environment.
- `DATABASE_URL` was missing from the shell; the app falls back to `postgresql://postgres:postgres@127.0.0.1:54322/postgres`, and port `54322` was closed.
- Browser/IAB local URL verification was blocked with `net::ERR_BLOCKED_BY_CLIENT`.
- Standalone Playwright fallback verified `/placement-estimate` renders on desktop and mobile with no overlay, no console errors, no horizontal overflow, visible form, and visible output panel.
- DB-backed browser success output could not be verified locally because there was no reachable database. The form submission showed the expected persistence error state instead.

## Current Task 7 Reality Check

Before editing, inspect:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `src/db/schema.ts`
5. `src/db/queries/admin.ts`
6. `src/db/queries/analytics.ts`
7. `src/lib/env.ts`
8. Existing public action tests for server-action patterns:
   - `src/tests/features/public-actions.test.ts`
   - `src/tests/features/placement-estimate-actions.test.ts`
9. Existing layouts:
   - `src/app/layout.tsx`
   - `src/app/(public)/layout.tsx`

## Mandatory Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:executing-plans` unless independent subagent work is available, then use `superpowers:subagent-driven-development`
- `superpowers:test-driven-development` before implementing Task 7 behavior
- `superpowers:verification-before-completion` before claiming completion or committing
- `superpowers:systematic-debugging` if any verification command fails
- `supabase:supabase` before database, migration, RLS, Supabase CLI, or remote DB behavior
- `build-web-apps:frontend-app-builder` before building/changing admin login/setup UI
- `build-web-apps:react-best-practices` for React/Next implementation
- `browser:control-in-app-browser` for rendered local verification; if Browser/IAB still blocks local URLs, use standalone Playwright and report the fallback

## Product Guardrails

Keep these constraints active:

- No public visitor accounts.
- Task 7 must implement built-in admin login/setup, not Clerk/Auth0/Supabase Auth.
- Public pages must not expose admin dashboards, scoring internals, forecast config controls, exports, or audit logs.
- Admin UI should be quiet, dense, operational, and work-focused; do not use marketing hero treatment for admin pages.
- Use secure cookie defaults: `httpOnly`, `sameSite: "lax"`, path `/`, `secure` in production, 7-day expiry.
- Do not expose session tokens or password hashes in UI or logs.
- Login errors must stay generic: `Invalid email or password.`
- Use `env.ADMIN_SETUP_KEY`; do not hard-code setup secrets.

## Task 7 Scope

Implement only:

`Task 7: Admin Auth, Sessions, And Setup Flow`

Expected files from the plan:

- Create `src/features/admin-auth/passwords.ts`
- Create `src/features/admin-auth/rate-limit.ts`
- Create `src/features/admin-auth/session.ts`
- Create `src/features/admin-auth/guards.ts`
- Create `src/features/admin-auth/schemas.ts`
- Create `src/features/admin-auth/actions.ts`
- Create `src/app/admin/login/page.tsx`
- Create `src/app/admin/setup/page.tsx`
- Create `src/app/api/admin/logout/route.ts`
- Create `src/tests/features/admin-auth.test.ts`

Modify only supporting files needed to wire admin layout/route protection and query boundaries. Do not implement Task 8 admin dashboard pages beyond minimal protected/admin landing support required to prove auth routing.

## Required Task 7 Behavior

Task 7 must provide:

1. Argon2id password hashing and verification using `@node-rs/argon2`.
2. Opaque random session tokens and deterministic SHA-256 token hashes.
3. Login and setup Zod schemas.
4. Setup action that:
   - Accepts name, email, password, setup key.
   - Compares setup key to `env.ADMIN_SETUP_KEY`.
   - Allows setup only when there are zero admin users.
   - Hashes password with Argon2id.
   - Creates an owner admin user.
   - Sets a valid admin session cookie.
   - Writes audit log `admin.setup.created_owner`.
5. Login action that:
   - Validates email/password.
   - Applies rate limiting using `admin_login_attempts`.
   - Verifies password.
   - Creates an admin session.
   - Sets a valid admin session cookie.
   - Writes audit log `admin.auth.login`.
6. Rate limiting that blocks more than 5 failed attempts for the same email or IP in 15 minutes.
7. `requireAdmin()` guard that:
   - Reads the session cookie.
   - Hashes the token.
   - Finds an active, non-expired session and active admin user.
   - Redirects unauthenticated requests to `/admin/login`.
8. `/api/admin/logout` that revokes the current session and clears the cookie.
9. `/admin/setup` and `/admin/login` pages with accessible forms, focus states, loading, success/error states, and no public marketing copy.

## TDD Guidance

Write failing tests before production code.

Recommended test file:

`src/tests/features/admin-auth.test.ts`

Recommended RED assertions:

- Argon2id password hashing verifies the original password and rejects a different password.
- Session token hashing is deterministic for the same token and does not equal the plain token.
- Login schema rejects invalid email and short password.
- Setup schema requires the setup key.
- Login action records failed attempts and returns generic errors.
- Setup action rejects an invalid setup key.
- Setup action creates an owner when no admin exists.

Run RED before implementation:

```bash
npm run test -- src/tests/features/admin-auth.test.ts
```

Expected before implementation: tests fail because the admin-auth modules/actions do not exist yet.

## Required Verification

After implementation, run:

```bash
npm run test -- src/tests/features/admin-auth.test.ts
npm run typecheck
npm run lint
npm run build
git diff --check
```

Run full tests if shared env/query/action patterns changed:

```bash
npm test
```

Supabase/local DB:

- Check Docker first. If Docker remains unavailable, record the exact failure and do not claim local DB reset passed.
- If Docker is available, run:

```bash
npx supabase start
npx supabase db reset
```

Browser verification:

1. Start the app with `npm run dev` or use an existing dev server for this repo.
2. Open `/admin/setup`.
3. Create an owner using local `ADMIN_SETUP_KEY`.
4. Log out through `/api/admin/logout`.
5. Open `/admin/login`.
6. Log in with the owner account.
7. Confirm `/admin` is protected before login and loads only after login.
8. Confirm desktop and mobile have no horizontal overflow or text overlap.

If local DB is unavailable, browser auth success is blocked. Report that explicitly and rely on tests/mocks only for DB behavior.

## Commit Task 7

After fresh verification:

```bash
git add src/features/admin-auth src/app/admin src/app/api/admin/logout src/tests/features/admin-auth.test.ts
git commit -m "feat: add secure admin login"
```

Then overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt for:

`Task 8: Admin Dashboard, Operations Views, And Exports`

Include what actually happened, verification status, commit hash, blockers/deviations, and exact next scope.

Commit that handoff separately:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response for Task 7, report:

- The completed task.
- Verification results with commands and pass/fail status.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether Supabase DB reset was run or blocked.
- Whether browser auth success was verified or blocked.
- Whether any work remains or was blocked.
