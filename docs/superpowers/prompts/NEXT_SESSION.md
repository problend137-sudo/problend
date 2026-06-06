# Next Session Prompt: ProBlend Digital OS Task 8

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Your job in this session is to resume the main ProBlend Digital Operating System implementation at:

`Task 8: Admin Dashboard, Operations Views, And Exports`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Implement only Task 8. Do not one-shot Tasks 9-11. Verify Task 8, commit it, then update this file for Task 9 unless the user redirects.

## Latest Completed Work

- Latest completed implementation commit when this prompt was written: `23cd9180584b32fb915a9680f5d03224ec142481`
- Latest commit message: `feat: add secure admin login`
- Branch: `main`
- Task 7 is implemented and committed.
- Current working tree after the Task 7 commit should only have untracked `tmp/` screenshot artifacts plus this handoff edit until the handoff is committed. Do not commit `tmp/` unless the user explicitly asks.

## Completed Plan State

The repo has completed:

- Task 1: Foundation, tooling, and base app shell.
- Task 2: Supabase schema, Drizzle client, and data access boundary.
- Task 3: Forecasting engine and opportunity scoring.
- Task 4: Content system, public routes, and legal pages.
- Task 5: Public forms and server-side acquisition actions.
- Partnership Platform redesign after Task 5.
- Task 6: Placement estimate flow and forecast persistence.
- Task 7: Built-in admin auth, sessions, setup flow, logout, and minimal protected admin landing.

Task 7 added:

- `src/features/admin-auth/passwords.ts` with Argon2id helpers.
- `src/features/admin-auth/session.ts` with opaque tokens, SHA-256 token hashing, and secure 7-day cookie helpers.
- `src/features/admin-auth/rate-limit.ts` using `admin_login_attempts`.
- `src/features/admin-auth/guards.ts` with `requireAdmin()`.
- `src/features/admin-auth/schemas.ts` and `src/features/admin-auth/actions.ts`.
- Admin query helpers in `src/db/queries/admin.ts`.
- `/admin/setup`, `/admin/login`, protected `/admin`, and `/api/admin/logout`.
- `src/tests/features/admin-auth.test.ts`.
- A Partnership Platform hero CTA to the public `/placement-estimate` calculator.

## Task 7 Verification Status

Fresh verification run during Task 7:

```bash
npm run test -- src/tests/features/admin-auth.test.ts
# PASS: 1 file, 8 tests

npm run typecheck
# PASS

npm run lint
# PASS

git diff --check
# PASS

npm run build
# PASS

npm test
# PASS: 8 files, 47 tests
```

Supabase and database notes:

- `npx supabase --version` returned `2.105.0`.
- `npx supabase projects list --output json` showed linked project `tueqoqusbxeldxnnarlv`, name `problend`, region `ap-south-1`, Postgres `17.6.1.127`, status `ACTIVE_HEALTHY`.
- `npx supabase db push --linked --dry-run` initially reported pending migrations:
  - `20260606081445_partnership_platform_redesign.sql`
  - `20260606091603_seed_default_forecast_config.sql`
- `npx supabase db push --linked --yes` applied both pending migrations to the linked remote database.
- A post-apply `npx supabase db push --linked --dry-run` returned `Remote database is up to date.`
- `npx supabase migration list --linked` failed before the push with stale DB password auth for `cli_login_postgres`; use `db push --dry-run` or refresh `SUPABASE_DB_PASSWORD` if exact migration-list output is needed.
- Docker is unavailable locally: `docker info` failed with `zsh:1: command not found: docker`.
- `npx supabase status` failed because it could not connect to the Docker daemon.
- Local Supabase reset remains blocked. Do not claim `npx supabase start` or `npx supabase db reset` passed unless rerun in a Docker-capable environment.

Browser verification notes:

- Browser/IAB local URL verification was blocked again with `net::ERR_BLOCKED_BY_CLIENT`.
- Standalone Playwright fallback used the existing dev server at `http://localhost:3000`.
- Verified `/admin` redirects unauthenticated users to `/admin/login`.
- Verified `/admin/setup` and `/admin/login` render on desktop `1280x900` and mobile `390x844` with no horizontal overflow.
- Verified setup invalid-key error state: `Invalid setup key.`
- Verified login invalid-input error state: `Invalid email or password.`
- Verified `/business-solutions` has the public `/placement-estimate` CTA in the Partnership Platform hero and footer.
- Browser auth success path was blocked locally because there is no reachable local database and no shell `DATABASE_URL` for the remote database. Tests mock DB behavior for setup/login success.
- Screenshots were written under `tmp/task7-browser-verification/`; keep `tmp/` untracked.

## Placement Calculator Boundary

The placement calculator is intentionally public at `/placement-estimate`.

Task 7 added a contextual `Run placement estimate` CTA in the Partnership Platform hero (`/business-solutions`) so partners can reach the public calculator from the partnership flow. Task 8 should add the private `/admin/calculator` operations page for reviewing calculator submissions and linked forecast runs. Do not move the public calculator into admin, and do not expose forecast configs, scoring internals, exports, or audit logs publicly.

## Current Task 8 Reality Check

Before editing, inspect:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `src/db/schema.ts`
5. `src/db/queries/admin.ts`
6. `src/db/queries/analytics.ts`
7. Existing query files in `src/db/queries/`
8. `src/features/admin-auth/guards.ts`
9. `src/app/admin/(protected)/layout.tsx`
10. `src/app/admin/(protected)/page.tsx`
11. Existing public action tests and admin auth tests.

## Mandatory Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:executing-plans` unless independent subagent work is available, then use `superpowers:subagent-driven-development`
- `superpowers:test-driven-development` before implementing Task 8 behavior such as CSV export, status updates, forecast config version creation, or query contracts
- `superpowers:verification-before-completion` before claiming completion or committing
- `superpowers:systematic-debugging` if any verification command fails
- `supabase:supabase` before database, migration, RLS, Supabase CLI, or remote DB behavior
- `build-web-apps:frontend-app-builder` before building/changing admin dashboard UI
- `build-web-apps:react-best-practices` for React/Next implementation
- `browser:control-in-app-browser` for rendered local verification; if Browser/IAB still blocks local URLs, use standalone Playwright and report the fallback

## Product Guardrails

Keep these constraints active:

- No public visitor accounts.
- Continue built-in admin auth; do not add Clerk/Auth0/Supabase Auth.
- Every private page/action/export must call `requireAdmin()` or otherwise prove the admin session before reading private data.
- Public pages must not expose admin dashboards, scoring internals, forecast config controls, exports, or audit logs.
- Admin UI should be quiet, dense, operational, and work-focused; no marketing hero treatment for admin pages.
- Do not expose session tokens, password hashes, setup keys, forecast assumption internals, or audit metadata in public UI/logs.
- Keep `/placement-estimate` public and `/admin/calculator` private.

## Task 8 Scope

Implement only:

`Task 8: Admin Dashboard, Operations Views, And Exports`

Expected files from the plan:

- Create `src/components/admin/AdminShell.tsx`
- Create `src/components/admin/AdminHeader.tsx`
- Create `src/components/admin/AdminSidebar.tsx`
- Create `src/components/admin/DataTable.tsx`
- Create `src/components/admin/StatusPill.tsx`
- Create `src/components/admin/ScoreCard.tsx`
- Create `src/components/admin/ForecastConfigEditor.tsx`
- Create admin pages under `src/app/admin/`
- Create `src/lib/csv.ts`
- Create `src/app/api/admin/export/[dataset]/route.ts`

Modify supporting query files as needed. Do not implement Task 9 public product explorer, expansion map, case studies, or motion work.

## Required Task 8 Behavior

Task 8 must provide:

1. Admin shell:
   - Sidebar routes: Overview, Opportunities, Contacts, Calculator, Forecast Configs, Forecast Runs, Waitlists, Activity, Settings.
   - Header with current admin name and logout action.
   - Mobile drawer-style navigation with visible focus states.
2. `/admin` overview:
   - New opportunities count.
   - New opportunity applications count.
   - New contact submissions count.
   - Calculator submissions count.
   - Active forecast config version.
   - Recent activity.
   - Only a small `View site` public link.
3. Management pages:
   - `/admin/opportunities`: list/search/filter by status, city, state, commercial intent.
   - `/admin/opportunities/[id]`: full record, events, latest score, forecast runs, status update.
   - `/admin/opportunities`: include `Published needs` and `Applications` tabs.
   - `/admin/contacts`: contact submissions and status updates.
   - `/admin/calculator`: calculator submissions and linked forecast runs.
   - `/admin/forecast-configs`: active config, version list, compare two versions, create new version.
   - `/admin/forecast-runs`: stored input/output/assumption snapshots.
   - `/admin/waitlists`: waitlist entries.
   - `/admin/activity`: audit and activity logs.
   - `/admin/settings`: admin account overview and setup status.
4. Forecast config editor:
   - Edit commercial, behavioral, venue multiplier, geographic multiplier, and operational assumption categories.
   - Saving creates a new `forecast_config_versions` row and never mutates an existing version.
5. CSV exports:
   - Create `src/lib/csv.ts`.
   - `/api/admin/export/[dataset]` supports `opportunities`, `opportunity-applications`, `contacts`, `calculator`, `waitlists`, and `forecast-runs`.
   - Export route must call `requireAdmin()` and write audit log `admin.export.created`.

## TDD Guidance

Write failing tests before production code.

Recommended tests:

- `toCsv()` quotes values, escapes quotes, preserves headers, and returns an empty string for empty rows.
- Export route rejects unsupported datasets.
- Export route requires admin and writes `admin.export.created`.
- Admin dashboard query helpers return overview counts and active forecast config version.
- Forecast config save action creates a new version instead of mutating the existing version.
- Status update actions require admin and write activity/audit records.

Run targeted RED tests before implementation, then implement the smallest code needed to pass.

## Required Verification

After implementation, run:

```bash
npm run typecheck
npm run lint
npm run build
git diff --check
```

Run full tests if shared query/action/export patterns changed:

```bash
npm test
```

Supabase/local DB:

- Check Docker first. If Docker remains unavailable, record the exact failure and do not claim local DB reset passed.
- Check remote project health and remote migration status/dry-run before any live DB-dependent browser success claims.
- If Docker is available, run:

```bash
npx supabase start
npx supabase db reset
```

Browser verification:

1. Start the app with `npm run dev` or use an existing dev server for this repo.
2. Log in as admin. If local DB is unavailable, auth success is blocked; report it and rely on tests/mocks only for DB behavior.
3. Open every Task 8 admin route.
4. Search and filter opportunities.
5. Create a published opportunity post for `Looking for operators`.
6. Confirm the published post appears on `/business-solutions` while logged out.
7. Change a contact status.
8. Create a new forecast config version.
9. Export opportunities CSV.
10. Confirm unauthenticated `/admin/opportunities` redirects to `/admin/login`.
11. Confirm desktop and mobile have no horizontal overflow or text overlap.

## Commit Task 8

After fresh verification:

```bash
git add src/components/admin src/app/admin src/app/api/admin/export src/lib/csv.ts src/db/queries src/features src/tests
git commit -m "feat: add admin operations dashboard"
```

Then overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt for:

`Task 9: Product Explorer, Expansion Map, Case Study Framework, And Motion Layer`

Include what actually happened, verification status, commit hash, blockers/deviations, and exact next scope.

Commit that handoff separately:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response for Task 8, report:

- The completed task.
- Verification results with commands and pass/fail status.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether Supabase DB reset was run or blocked.
- Whether remote DB migrations were current.
- Whether browser admin success was verified or blocked.
- Whether any work remains or was blocked.
