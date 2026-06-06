# Next Session Prompt: ProBlend Digital OS Task 11

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Your job in this session is to resume the main ProBlend Digital Operating System implementation at:

`Task 11: End-To-End QA, Accessibility, Supabase Advisors, And Launch Hardening`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Implement only Task 11. Task 10 is implemented and committed. Do not add new product/platform features beyond Task 11 verification, QA, accessibility, Supabase advisor work, launch hardening notes, and required documentation.

## Latest Completed Work

- Latest completed implementation commit when this prompt was written: `1144c3d2eeac531c26bdf034fb382fe5848ecd18`
- Latest implementation commit message: `feat: add analytics health and SEO routes`
- Branch: `main`
- Task 10 is implemented and committed.
- Current working tree after the Task 10 handoff commit should only have untracked `tmp/` screenshot artifacts unless the user has made new changes. Do not commit `tmp/` unless the user explicitly asks.

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
- Task 8: Admin dashboard shell, operations pages, immutable forecast config version action, status actions, and CSV exports.
- Task 9: Product Explorer, Expansion Map, Case Study Framework, and Motion Layer.
- Task 10: Analytics, Activity Logging, Health, SEO, And Policy Verification.

## Task 10 Added

- `src/features/analytics/events.ts` with the Task 10 event registry:
  - `cta_click`
  - `contact_submitted`
  - `opportunity_submitted`
  - `calculator_started`
  - `calculator_completed`
  - `admin_status_changed`
  - `forecast_config_version_created`
  - `export_created`
- `src/features/analytics/actions.ts` with `trackEventAction`, event-name validation, source-path validation, optional bounded session id, and JSON-safe bounded metadata before inserting into `analytics_events`.
- Public analytics instrumentation for:
  - Contact submissions.
  - Opportunity submissions.
  - Placement calculator started.
  - Placement calculator completed.
- Admin analytics instrumentation for:
  - Opportunity status changes.
  - Contact status changes.
  - Forecast config version creation.
  - Admin CSV exports.
- `src/app/api/health/route.ts` returning:

```ts
{
  ok: true,
  service: "problend-digital-os",
  timestamp: new Date().toISOString()
}
```

- `src/app/sitemap.ts`, `src/app/robots.ts`, and `publicRoutePaths` in `src/content/site.ts`.
- Sitemap includes only public/legal routes and excludes `/admin` and `/api`.
- Robots allows `/` and disallows `/admin` and `/api`.
- Focused tests:
  - `src/tests/features/analytics-actions.test.ts`
  - `src/tests/app/health-seo-routes.test.ts`
  - Updated public action, placement estimate, admin operation, and admin export tests.

## Task 10 Guardrails And Deviations

- Task 10 did not implement brittle global CTA click tracking.
- Existing CTAs are mostly plain `Link` or server components. There was no clean existing client/server analytics click pattern for placement estimate, submit opportunity, and contact CTA clicks.
- The `cta_click` event remains registered for a future clean client-side tracking pattern, but Task 10 did not add site-wide click tracking JavaScript.
- Task 10 did not create database migrations. The `analytics_events` table already existed in `src/db/schema.ts` and the existing Supabase migrations.
- Task 10 did not expose analytics internals, admin dashboards, exports, audit logs, private opportunity records, forecast configs, or internal counts on public pages.

## Task 10 Verification Status

Fresh verification before the Task 10 implementation commit:

```bash
npm run typecheck
# PASS

npm test
# PASS: 14 files, 64 tests

npm run lint
# PASS

npm run build
# PASS

git diff --check
# PASS
```

Important verification note:

- A later attempt to run `npm run typecheck` and `npm run build` in parallel produced `.next/types/validator.ts(5,79): error TS2307: Cannot find module './routes.js'...`.
- Root cause: `next build` was regenerating `.next` while `tsc --noEmit` was reading `.next/types`.
- Sequential rerun of `npm run typecheck` after build finished passed.
- For Task 11, run `npm run typecheck` and `npm run build` sequentially, not in parallel.

Browser and HTTP verification:

- Existing dev server was reused at `http://localhost:3000`.
- Browser plugin could open `http://127.0.0.1:3000/` and confirmed the ProBlend home page loaded.
- Browser plugin direct navigation to `http://127.0.0.1:3000/api/health`, `/sitemap.xml`, and `/robots.txt` was blocked by the browser client with `net::ERR_BLOCKED_BY_CLIENT`.
- Browser page evaluation in this runtime did not expose `fetch` or `XMLHttpRequest`, so same-origin browser fetch fallback was unavailable.
- Terminal HTTP verification confirmed:

```bash
curl -i --max-time 10 http://127.0.0.1:3000/api/health
# HTTP 200, application/json, ok true, service "problend-digital-os", valid ISO timestamp

curl -i --max-time 10 http://127.0.0.1:3000/sitemap.xml
# HTTP 200, application/xml, 16 public/legal routes, no /admin or /api URLs

curl -i --max-time 10 http://127.0.0.1:3000/robots.txt
# HTTP 200, text/plain, Disallow: /admin and Disallow: /api
```

Database-backed browser verification:

- Local database verification was blocked.
- `pg_isready` was not installed.
- `psql` was not installed.
- `supabase` CLI was not installed.
- `nc -z 127.0.0.1 54322` reported the local database port closed.
- Do not claim local contact-form analytics persistence passed unless rerun in a local database environment.
- Unit tests mock DB writes and verify analytics instrumentation calls.

Supabase note:

- Task 10 used the Supabase skill because analytics writes touch Supabase/Postgres-backed tables.
- The Supabase changelog index was checked. No Task 10 schema migration or Supabase API change was needed.
- Existing Task 8/9 local Supabase blocker still applies: local Supabase start/reset was previously blocked because Docker was not available in shell, and in Task 10 the Supabase CLI was also unavailable.

## Current Task 11 Reality Check

Before editing, inspect:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `playwright.config.ts`
4. Existing unit tests under `src/tests`
5. Existing public routes under `src/app/(public)`
6. Existing admin routes under `src/app/admin`
7. Admin auth setup/login/session code under `src/features/admin-auth`
8. Admin operations and export routes touched in Task 10
9. Supabase migrations under `supabase/migrations`
10. `docs/supabase.md`

## Mandatory Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:executing-plans` unless independent subagent work is available and explicitly authorized, then use `superpowers:subagent-driven-development`
- `superpowers:test-driven-development` before implementing Task 11 tests/docs behavior
- `superpowers:verification-before-completion` before claiming completion or committing
- `superpowers:systematic-debugging` if any verification command, browser check, Playwright test, or Supabase command fails
- `supabase:supabase` for Supabase CLI/advisor/database work
- `browser:control-in-app-browser` for rendered local verification
- `build-web-apps:frontend-testing-debugging` for Playwright/browser debugging

## Product Guardrails

Keep these constraints active:

- No public visitor accounts.
- Continue built-in admin auth; do not add Clerk/Auth0/Supabase Auth.
- Public pages must not expose admin dashboards, scoring internals, forecast config controls, exports, audit logs, private opportunity records, internal counts, or analytics internals.
- Product Explorer uses existing `src/content/products.ts`; do not reintroduce demo Wix store products.
- Keep admin UI private and separate from public visual work.
- Analytics must not require public login or create visitor accounts.
- Analytics metadata must remain public-safe and bounded; do not store secrets, cookies, raw session tokens, or private admin record dumps.
- Sitemap must include only public/legal routes and exclude `/admin` and `/api`.
- Robots must disallow `/admin` and `/api`.

## Task 11 Scope

Implement only:

`Task 11: End-To-End QA, Accessibility, Supabase Advisors, And Launch Hardening`

Expected files from the plan:

- Create `src/tests/e2e/public.spec.ts`
- Create `src/tests/e2e/admin.spec.ts`
- Modify documentation files when verification produces setup notes
- Update `docs/supabase.md`
- Create `docs/runbook.md`

Do not add new product/platform features outside Task 11.

## Required Task 11 Behavior

1. Add public Playwright tests:
   - Home page loads and contains `Fuel your fitness, one shake at a time.`
   - `/product-offerings` contains four ProBlend products and no Wix demo products.
   - `/contact` form can submit valid test data.
   - `/submit-opportunity` form can submit valid opportunity data.
   - `/placement-estimate` returns a forecast output.
   - Footer links reach all four legal pages.

2. Add admin Playwright tests:
   - Unauthenticated `/admin` redirects to `/admin/login`.
   - Setup creates first owner in local dev.
   - Login succeeds with created owner.
   - Opportunities page loads.
   - Forecast config page loads.
   - Export route returns CSV for authenticated admin.

3. Run full automated verification:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Run these sequentially. Do not run `npm run typecheck` and `npm run build` in parallel because `.next/types` can race.

4. Run Supabase verification:

```bash
npx supabase db reset
npx supabase migration list --local
npx supabase db advisors
```

Expected: migrations apply locally, local migration list includes schema and seed migrations, and advisors do not report unhandled critical security issues.

If Docker, Supabase CLI, or database access is unavailable, record the exact blocker in `docs/supabase.md` or `docs/runbook.md` and in the final response. Do not claim Supabase commands passed unless they were actually rerun successfully.

5. Browser visual QA with Browser plugin:

- Desktop: `/`, `/about`, `/how-it-works`, `/product-offerings`, `/business-solutions`, `/contact`, `/placement-estimate`, `/submit-opportunity`.
- Mobile viewport: `/`, `/product-offerings`, `/placement-estimate`, `/submit-opportunity`, `/admin/login`.
- Authenticated admin: `/admin`, `/admin/opportunities`, `/admin/forecast-configs`, `/admin/forecast-runs`.

Confirm:

- Public site is recognizably ProBlend and not generic AI/SaaS.
- Internal system features are absent from public pages.
- Original business content is preserved.
- Forms have labels, visible focus states, loading states, success states, and error states.
- No text overlap or horizontal overflow.
- GSAP respects reduced-motion settings.

6. Document launch notes:

Update `docs/supabase.md` with:

- Migration commands used.
- Production env var names.
- Admin setup process.
- Mumbai project reference if known from existing docs/context.
- Note that `.temp` remains ignored if applicable.
- Any Supabase/Docker/CLI blockers encountered.

Create `docs/runbook.md` with:

- Local development commands.
- Admin setup steps.
- How to rotate the setup key.
- How to create a forecast config version.
- How to export records.
- Verification checklist.

## Required Verification

After implementation, run:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
git diff --check
```

Run Supabase commands if tooling is available:

```bash
npx supabase db reset
npx supabase migration list --local
npx supabase db advisors
```

Browser verification should use the Browser plugin. If Browser direct navigation blocks non-HTML local routes again with `ERR_BLOCKED_BY_CLIENT`, document it and use terminal HTTP checks only as fallback evidence.

## Commit Task 11

After fresh verification:

```bash
git add src docs supabase package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs drizzle.config.ts vitest.config.ts playwright.config.ts .env.example
git commit -m "chore: verify ProBlend digital OS MVP"
```

Then overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with a final project-completion or follow-up handoff that includes what actually happened, verification status, commit hash, blockers/deviations, and exact remaining scope if any.

Commit that handoff separately:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response for Task 11, report:

- The completed task.
- Verification results with commands and pass/fail status.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether Browser verification passed or was blocked.
- Whether Supabase verification passed or was blocked.
- Whether any work remains or was blocked.
