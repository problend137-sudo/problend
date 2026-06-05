# Next Session Prompt: ProBlend Digital OS Task 3

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Your job in this session is to implement exactly one bounded part of the implementation plan, verify it, commit it, and then write the prompt for the next session based on what actually happened.

Do not try to one-shot the whole product.

## Latest Completed Work

- Latest completed implementation commit hash when this prompt was written: `becff82d24e5b80f9ded001406f95aa2ff7411a2`
- Completed task: `Task 2: Supabase Schema, Drizzle Client, And Data Access Boundary`
- Commit message: `feat: add digital OS database schema`
- Previous completed implementation commit: `82ba1ed016b31671489685ccf344c403697eeaba`

## What Changed In Task 2

Created:

- `drizzle.config.ts`
- `src/db/client.ts`
- `src/db/schema.ts`
- `src/db/queries/admin.ts`
- `src/db/queries/analytics.ts`
- `src/db/queries/contacts.ts`
- `src/db/queries/forecasts.ts`
- `src/db/queries/opportunities.ts`
- `src/db/queries/waitlists.ts`
- `src/tests/db-query-boundary.test.ts`
- `supabase/migrations/20260605181328_initial_digital_os_schema.sql`

Task 2 intentionally did not implement public pages, admin auth UI, public forms, forecasting engine logic, dashboards, exports, or later route behavior.

## Task 2 Implementation Notes

- The migration was created with `npx supabase migration new initial_digital_os_schema`.
- The schema creates the initial Digital OS tables for admin users/sessions/login attempts, audit/activity/analytics logs, contact submissions, waitlist entries, opportunities/posts/applications/events, forecast configs/config versions/runs, calculator submissions, opportunity scores, and case studies.
- The migration installs `pgcrypto` and `citext` in the `extensions` schema, enables RLS on all new public tables, revokes table access from `anon` and `authenticated`, and grants table DML to `service_role`.
- The migration includes explicit FK indexes, key list/status indexes, a single-active forecast config partial unique index, positive numeric checks, JSON object checks for JSONB object payloads, and a named unique constraint for `(forecast_config_id, version_number)`.
- `src/db/schema.ts` mirrors the SQL schema with Drizzle table definitions and select/insert types.
- Query modules provide focused Drizzle-only helpers and do not import React, Next route modules, UI code, or forecasting logic.
- `updateOpportunityStatus` writes an opportunity event transactionally so the `adminUserId` argument is not ignored.
- A small TDD test file was added despite the original Task 2 file list because this session explicitly required TDD for data-access boundary behavior.

## Verification From Task 2

Commands run in the Task 2 session:

- `npx supabase --version`: PASS. CLI version `2.105.0`.
- `npx supabase projects list`: PASS. Linked project row showed project ref `tueqoqusbxeldxnnarlv`, org `xgejdxtkxjnrwdnocjzn`, name `problend`, region `South Asia (Mumbai)`.
- `npx supabase migration new initial_digital_os_schema`: PASS. Created `supabase/migrations/20260605181328_initial_digital_os_schema.sql`.
- TDD red check, `npm run test` before adding `src/db`: FAIL as expected because `@/db/queries/admin` did not exist.
- TDD green check, `npm run test` after adding the DB boundary: PASS, 2 test files and 4 tests.
- `npx supabase start`: BLOCKED/FAIL. Docker is not available locally: Supabase CLI reported it could not connect to the Docker daemon. Additional checks showed `docker` was not on PATH and `open -a Docker` could not find Docker Desktop.
- `npx supabase db reset`: BLOCKED/FAIL for the same missing Docker prerequisite before the migration could be applied locally.
- Final `npm run typecheck`: PASS.
- Final `npm run lint`: PASS.
- Final `npm run test`: PASS, 2 test files and 4 tests.
- Final `npm run build`: PASS. Build output still contains only `/404`, which is expected because Tasks 1-2 have not created public pages.

## Deviations Or Notes

- `src/tests/db-query-boundary.test.ts` was included in the Task 2 commit to satisfy the explicit TDD requirement for data-access boundary behavior.
- The required Supabase local reset verification could not be completed because Docker/Docker Desktop is not installed or reachable on this machine. Do not claim the migration has been applied locally until `npx supabase start` and `npx supabase db reset` pass in a Docker-capable environment.
- `next build` repeatedly rewrote `next-env.d.ts` from `.next/dev/types/routes.d.ts` to `.next/types/routes.d.ts`; this generated churn was restored and not committed.
- The final review sub-agent found no blocking Task 2 issues and recommended staging the TDD test with the Task 2 files.
- No secrets were printed, invented, or committed. Nothing under `supabase/.temp` was committed.
- No blockers remain for Task 3, because Task 3 is pure TypeScript forecasting/scoring work and should not need Supabase or Docker.

## Mandatory Context For This Session

Read these files before editing:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `docs/superpowers/prompts/NEXT_SESSION.md`

Begin with:

`Task 3: Forecasting Engine And Opportunity Scoring`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Do not implement Task 4 or any later task in this session.

## Mandatory Skills And Agents

You must explicitly use:

- `superpowers:subagent-driven-development` for the implementation workflow.
- Sub-agents for independent work. For Task 3, use at least two sub-agents:
  - One sub-agent to review the forecasting/scoring plan before implementation.
  - One sub-agent to review the completed forecasting/scoring diff and verification evidence before finalizing.
- `superpowers:test-driven-development` for forecasting and scoring behavior.
- `superpowers:verification-before-completion` before claiming anything is complete.
- `build-web-apps:frontend-app-builder` only if you touch frontend implementation or visual decisions. Task 3 should not need frontend work, so state that it was not applied if no frontend files are touched.
- `supabase:supabase` only before Supabase CLI/schema/migration/RLS/database work. Task 3 should not need Supabase work.

If a named skill is unavailable, state that briefly and continue with the closest available workflow.

## Product Guardrails

Keep these constraints active:

- Public website must remain recognizably ProBlend, not a generic AI/SaaS template.
- Public pages must not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, or internal route mechanics.
- Typography direction remains Barlow Condensed for display and Barlow for body/UI.
- Supabase is Mumbai project `tueqoqusbxeldxnnarlv`.
- No public visitor accounts. V1 uses built-in admin auth later, not Clerk/Auth0.
- Forecasting/scoring logic must be transparent and deterministic.
- Forecast outputs must be reproducible from stored inputs, outputs, assumptions, version, timestamp, and reasoning once later persistence tasks wire the engine to the database.
- Task 3 must not read hardcoded production constants from hidden module state. The engine receives supplied assumptions.

## Task 3 Scope

Implement only:

`Task 3: Forecasting Engine And Opportunity Scoring`

Expected output of this session:

- `src/features/forecasting/types.ts`
- `src/features/forecasting/schemas.ts`
- `src/features/forecasting/assumptions.ts`
- `src/features/forecasting/engine.ts`
- `src/features/forecasting/scoring.ts`
- `src/tests/features/forecasting-engine.test.ts`
- `src/tests/features/opportunity-scoring.test.ts`

Do not implement content/public routes, admin auth, forms/actions, dashboard UI, exports, database writes, or Task 4+ behavior in this session.

## Required Execution Flow

1. Read the mandatory docs and confirm Task 3 scope.
2. Check git status. Do not overwrite unrelated user changes.
3. Use the required skills and sub-agents.
4. Write the Task 3 tests first:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts
```

Expected before implementation: tests fail because `calculateForecast`, `testForecastAssumptions`, and `scoreOpportunity` do not exist.

5. Implement only the Task 3 forecasting/scoring files from the implementation plan.
6. Run:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts
npm run typecheck
```

7. Also run foundation checks if Task 3 touches shared config or package files:

```bash
npm run lint
npm run test
npm run build
```

8. Fix any failures inside Task 3 scope.
9. Commit Task 3 with:

```bash
git add src/features/forecasting src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts
git commit -m "feat: add configurable forecasting and scoring engine"
```

10. Create or overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt, including what actually happened, verification status, commit hash or hashes, blockers/deviations, and the next implementation-plan task.
11. Commit the handoff file with:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response, report:

- The completed task.
- Verification results.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether any work remains or was blocked.

Do not claim completion without running the verification commands in this session.
