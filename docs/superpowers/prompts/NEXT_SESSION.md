# Next Session Prompt: ProBlend Digital OS Task 6 Onward

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Your job in this session is to resume the main ProBlend Digital Operating System implementation at:

`Task 6: Placement Estimate Flow And Forecast Persistence`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Do not one-shot Tasks 6-11. Implement Task 6, verify it, commit it, then update this file for the next task, which should be Task 7 unless the user redirects.

## Latest Completed Work

- Latest completed implementation commit when this prompt was written: `714504223c200aaf259ac417ce69ee096e99fe3d`
- Latest commit message: `feat: redesign partnership platform`
- Branch: `main`
- Partnership Platform redesign is now committed.
- Current `git status --short --branch` after the commit showed only untracked `tmp/` screenshot artifacts. Do not commit `tmp/` unless the user explicitly asks.

## Completed Plan State

The repo has already completed the core work for:

- Task 1: Foundation, tooling, and base app shell.
- Task 2: Supabase schema, Drizzle client, and data access boundary.
- Task 3: Forecasting engine and opportunity scoring.
- Task 4: Content system, public routes, and legal pages.
- Task 5: Public forms and server-side acquisition actions.

The later Partnership Platform redesign was committed after Task 5 and changed the public opportunity surface:

- `/business-solutions` is the primary Partnership Platform page.
- `/partner-with-problend`, `/submit-venue`, and `/submit-opportunity` redirect to `/business-solutions#opportunity-intake`.
- `/published-opportunities` renders the open-opportunities board.
- `/city-waitlist` renders a public waitlist form.
- `OpportunityForm` is a guided branch flow for venue, city/network, introduction, and open-brief paths.
- Public board queries only list published open posts in display order.
- Opportunity submissions persist `opportunityKind`, `sourcePath`, and branch details.
- Opportunity applications persist `sourcePath`.

Preserve that redesign while implementing Task 6.

## Current Task 6 Reality Check

Before editing, inspect these files:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/superpowers/plans/2026-06-06-partnership-platform-redesign-implementation.md`
4. `docs/supabase.md`
5. `src/features/forecasting/types.ts`
6. `src/features/forecasting/schemas.ts`
7. `src/features/forecasting/assumptions.ts`
8. `src/features/forecasting/engine.ts`
9. `src/db/queries/forecasts.ts`
10. `src/db/schema.ts`
11. `src/app/(public)/placement-estimate/page.tsx`

Important current state:

- `src/features/forecasting/engine.ts` and `src/features/forecasting/scoring.ts` already exist and pass tests.
- `ForecastAssumptions` now includes a `calculation` section. Any seed migration JSON must match the current type and schema, not the older abbreviated plan snippet.
- `src/db/queries/forecasts.ts` already has `getActiveForecastConfigVersion()`, `createForecastRun()`, `listForecastRuns()`, and `createOpportunityScore()`.
- `src/app/(public)/placement-estimate/page.tsx` currently renders an informational page only. It does not yet render a live calculator form.
- `src/components/public/PlacementEstimateForm.tsx` does not exist yet.
- `src/features/forecasting/actions.ts` does not exist yet.
- The seed migration for a default active forecast config does not exist yet.
- Task 6 must persist calculator submissions and forecast runs. If a helper for creating `calculator_submissions` is missing, add it to the forecast query boundary rather than writing Drizzle directly in UI code.

## Mandatory Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:subagent-driven-development` if independent subagent work is available; otherwise `superpowers:executing-plans`
- `superpowers:test-driven-development` before implementing Task 6 behavior
- `superpowers:verification-before-completion` before claiming completion or committing
- `superpowers:systematic-debugging` if any verification command fails
- `supabase:supabase` before migration, schema, RLS, Supabase CLI, or database behavior
- `build-web-apps:frontend-app-builder` before building or changing the public calculator UI
- `browser:control-in-app-browser` for rendered local verification; if Browser fails on local URLs, use standalone Playwright and report the fallback

## Product Guardrails

Keep these constraints active:

- Public website must remain recognizably ProBlend, not generic AI/SaaS.
- Public pages must not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, internal route mechanics, editable assumptions, or raw multipliers.
- `/placement-estimate` may show public-safe demand, revenue, machine count, score, confidence, and reasoning.
- Do not show forecast configuration controls publicly.
- Typography direction remains Barlow Condensed for display and Barlow for body/UI.
- Supabase project is Mumbai project `tueqoqusbxeldxnnarlv`.
- No public visitor accounts.
- Forecasting/scoring logic must remain transparent and deterministic.
- Forecast outputs must be reproducible from stored inputs, outputs, assumptions, version, timestamp, and reasoning.
- Task 6 must not read production constants from hidden module state. The public action must fetch active stored assumptions and pass them into the engine.

## Task 6 Scope

Implement only:

`Task 6: Placement Estimate Flow And Forecast Persistence`

Expected output of this session:

- Modify `src/features/forecasting/schemas.ts`
- Create `src/features/forecasting/actions.ts`
- Create `src/components/public/PlacementEstimateForm.tsx`
- Modify `src/app/(public)/placement-estimate/page.tsx`
- Modify `src/db/queries/forecasts.ts`
- Modify query boundary files only as needed for calculator submission persistence
- Create a Supabase migration using:

```bash
npx supabase migration new seed_default_forecast_config
```

Do not implement admin auth, admin dashboards, exports, analytics/SEO, product explorer/map/motion, or Task 7+ behavior in this session.

## Required Task 6 Behavior

Task 6 must provide:

1. A default active forecast config and version stored in the database by migration.
2. A public server action, likely `runPlacementEstimateAction`, that:
   - Validates public input.
   - Fetches the active forecast config version.
   - Validates/parses the stored assumptions with `forecastAssumptionsSchema`.
   - Calls `calculateForecast(input, activeVersion.assumptions)`.
   - Creates a `calculator_submissions` row.
   - Creates a `forecast_runs` row with input snapshot, output snapshot, assumptions snapshot, config version id, source `placement_estimate`, and reasoning.
   - Returns a serializable public-safe result with demand estimate, revenue estimate, recommended machine count, opportunity score, confidence, and reasoning.
3. A public `PlacementEstimateForm` with:
   - Venue type.
   - Daily footfall.
   - Operating hours.
   - Location type.
   - Placement area.
   - City and state.
   - Access quality.
   - Infrastructure readiness.
   - Commercial intent.
   - Optional name, email, and phone.
   - Labels, visible focus states, loading, success, and error states.
   - Animated number transitions with GSAP, guarded by reduced-motion.
4. `/placement-estimate` renders the live form and output.
5. Public output does not expose internal multipliers, editable assumptions, config ids, raw stored snapshots, or admin language.

## TDD Guidance

Write failing tests before production code. The plan only mentions existing forecasting tests, but Task 6 adds action/persistence behavior, so add focused tests for it.

Recommended test file:

`src/tests/features/placement-estimate-actions.test.ts`

Recommended RED assertions:

- Placement estimate input schema accepts a valid gym estimate.
- Invalid footfall or operating hours are rejected.
- The action returns a field-error result for invalid input.
- The action uses the active forecast config assumptions rather than importing `testForecastAssumptions` directly.
- The action persists a calculator submission and forecast run through query helpers.
- The public action result excludes `forecastConfigVersionId`, raw assumptions, and database internals.

Run RED before implementation:

```bash
npm run test -- src/tests/features/placement-estimate-actions.test.ts
```

Expected before implementation: tests fail because the Task 6 action/schema/helper behavior does not exist yet.

## Supabase And Migration Notes

Before touching the migration or schema behavior:

1. Use `supabase:supabase`.
2. Run:

```bash
npx supabase --version
```

3. Create the migration with the Supabase CLI:

```bash
npx supabase migration new seed_default_forecast_config
```

The migration must insert one active `forecast_configs` row and one `forecast_config_versions` row. The `assumptions` JSON must match the current `ForecastAssumptions` shape in `src/features/forecasting/types.ts`, including the `calculation` section used by the engine.

Local DB caveat:

- Earlier sessions could not run `npx supabase start` or `npx supabase db reset` because Docker/Docker Desktop was not available locally.
- Recheck if Docker is available before claiming local DB verification.
- If Docker is still unavailable, do not claim the seed migration has been applied locally. State the blocker and rely on TypeScript/tests that do not require a live database.

## Required Verification

After implementation, run:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts src/tests/features/placement-estimate-actions.test.ts
npm run typecheck
npm run lint
npm run build
git diff --check
```

Also run full tests if Task 6 touches shared schemas or action patterns:

```bash
npm test
```

If Docker is available, also run:

```bash
npx supabase start
npx supabase db reset
```

If Docker is unavailable, record the exact failure and do not claim DB reset passed.

Browser verification:

1. Start the app with `npm run dev` or production mode after `npm run build`.
2. Open `/placement-estimate`.
3. Submit a gym estimate with:
   - Daily footfall: `500`
   - Operating hours: `14`
   - Location type: `metro`
   - Infrastructure: `ready`
   - Commercial intent: `revenue_share`
4. Confirm demand, revenue, recommended machine count, score, confidence, and reasoning render.
5. Confirm no forecast configuration controls, raw multipliers, admin wording, or internal ids appear publicly.
6. Check desktop and mobile for no horizontal overflow or text overlap.

## Commit Task 6

After all possible verification is fresh and read:

```bash
git add src/features/forecasting src/components/public/PlacementEstimateForm.tsx 'src/app/(public)/placement-estimate' supabase/migrations src/db/queries src/tests/features/placement-estimate-actions.test.ts
git commit -m "feat: add placement estimate forecasting flow"
```

Then overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt for:

`Task 7: Admin Auth, Sessions, And Setup Flow`

Include what actually happened, verification status, commit hash, blockers/deviations, and exact next scope.

Commit that handoff separately:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Task 7+ Sequence For Future Sessions

After Task 6 is committed, continue one bounded task per session:

- Task 7: Admin Auth, Sessions, And Setup Flow
- Task 8: Admin Dashboard, Operations Views, And Exports
- Task 9: Product Explorer, Expansion Map, Case Study Framework, And Motion Layer
- Task 10: Analytics, Activity Logging, Health, SEO, And Policy Verification
- Task 11: End-To-End QA, Accessibility, Supabase Advisors, And Launch Hardening

Each future task should use the same pattern: read the plan, write tests first where behavior changes, implement only the bounded task, verify freshly, commit the implementation, then write and commit the next handoff.

## Final Response Requirements

In the final response for Task 6, report:

- The completed task.
- Verification results with commands and pass/fail status.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether Supabase DB reset was run or blocked.
- Whether any work remains or was blocked.

Do not claim completion without fresh verification evidence from this session.
