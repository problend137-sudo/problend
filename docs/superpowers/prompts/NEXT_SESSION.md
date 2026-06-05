# Next Session Prompt: ProBlend Digital OS Task 4

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Your job in this session is to implement exactly one bounded part of the implementation plan, verify it, commit it, and then write the prompt for the next session based on what actually happened.

Do not try to one-shot the whole product.

## Latest Completed Work

- Current branch when this prompt was written: `codex/task-3-forecasting-engine`
- Latest completed implementation commit hash when this prompt was written: `f51f679b1c9f6e91fff697cb4948cc70c0f7f9b9`
- Completed task: `Task 3: Forecasting Engine And Opportunity Scoring`
- Commit message: `feat: add configurable forecasting and scoring engine`
- Previous completed implementation commit: `becff82d24e5b80f9ded001406f95aa2ff7411a2`

## What Changed In Task 3

Created:

- `src/features/forecasting/types.ts`
- `src/features/forecasting/schemas.ts`
- `src/features/forecasting/assumptions.ts`
- `src/features/forecasting/engine.ts`
- `src/features/forecasting/scoring.ts`
- `src/tests/features/forecasting-engine.test.ts`
- `src/tests/features/opportunity-scoring.test.ts`

Task 3 intentionally did not implement public pages, admin auth, public forms/actions, forecast persistence, database writes, dashboard UI, exports, migrations, or later route behavior.

## Task 3 Implementation Notes

- Forecasting and scoring are pure deterministic TypeScript modules.
- `calculateForecast(input, assumptions)` receives all forecast assumptions as an argument and does not import `testForecastAssumptions` or any database/config/env module.
- A pre-implementation review sub-agent flagged hidden constants in the plan sample. To preserve the guardrail, Task 3 added a `calculation` section to `ForecastAssumptions` for days per month, minimum operating-hour multiplier, opportunity-score weights, and confidence weights.
- `testForecastAssumptions` is present only for tests and later seed data. Runtime flows must fetch active persisted assumptions from `forecast_config_versions` in later tasks.
- Forecast reasoning includes venue and geography multipliers, conversion and repeat rates, operating-hour multiplier, raw demand, machine capacity, revenue per transaction, and capacity-cap explanation when applicable.
- Opportunity scoring returns a deterministic score, rating, confidence, full `factorBreakdown`, and concise reasoning.
- Zod schemas were added for forecast inputs, assumptions, outputs, opportunity score inputs, and opportunity score outputs.
- The final review sub-agent found no blocking issues and cleared the Task 3 files for commit. Non-blocking notes: scoring reasoning narrates 4 of 8 factors while `factorBreakdown` contains all factors; `productMix` validates individual probabilities but does not enforce sum-to-1 because the engine does not consume it yet.

## Verification From Task 3

Commands run in the Task 3 session:

- TDD red check, `npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts`: FAIL as expected because `@/features/forecasting/assumptions` and `@/features/forecasting/scoring` did not exist.
- TDD green check, `npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts`: PASS, 2 test files and 6 tests.
- Final pre-commit targeted check, `npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts`: PASS, 2 test files and 6 tests.
- Final pre-commit `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- Full `npm run test`: PASS, 4 test files and 10 tests.
- `npm run build`: PASS. Build output still contains only `/404`, which is expected because Tasks 1-3 have not created public pages.

## Deviations Or Notes

- A scoped branch `codex/task-3-forecasting-engine` was created before implementation because the Superpowers workflow warns against starting implementation on `main` without explicit consent.
- `ForecastAssumptions` intentionally includes `calculation` settings beyond the plan's sample type to avoid hidden module constants in the engine.
- `next build` rewrote `next-env.d.ts` again; this generated churn was restored and not committed.
- `build-web-apps:frontend-app-builder` was not applied in Task 3 because no frontend or visual files were touched.
- `supabase:supabase` was not applied in Task 3 because no Supabase CLI/schema/migration/RLS/database work was performed.
- No secrets were printed, invented, or committed. Nothing under `supabase/.temp` was committed.
- No blockers remain for Task 4.

## Mandatory Context For This Session

Read these files before editing:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `docs/superpowers/prompts/NEXT_SESSION.md`

Begin with:

`Task 4: Content System, Public Routes, And Legal Pages`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Do not implement Task 5 or any later task in this session.

## Mandatory Skills And Agents

You must explicitly use:

- `superpowers:subagent-driven-development` for the implementation workflow.
- Sub-agents for independent work. For Task 4, use at least two sub-agents:
  - One sub-agent to review the public-content/page plan before implementation.
  - One sub-agent to review the completed public-content/page diff and verification evidence before finalizing.
- `superpowers:test-driven-development` for the content preservation tests before writing content modules.
- `superpowers:verification-before-completion` before claiming anything is complete.
- `build-web-apps:frontend-app-builder` before implementing public visual surfaces, because Task 4 creates public pages and public layout components.
- Browser plugin verification after starting the local app for the public route shell, unless a blocker prevents it.
- `supabase:supabase` only before Supabase CLI/schema/migration/RLS/database work. Task 4 should not need Supabase work.

If a named skill is unavailable, state that briefly and continue with the closest available workflow.

## Product Guardrails

Keep these constraints active:

- Public website must remain recognizably ProBlend, not a generic AI/SaaS template.
- Public pages must not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, or internal route mechanics.
- Typography direction remains Barlow Condensed for display and Barlow for body/UI.
- Supabase is Mumbai project `tueqoqusbxeldxnnarlv`.
- No public visitor accounts. V1 uses built-in admin auth later, not Clerk/Auth0.
- Public pages may show ProBlend product story, flavours, machine capabilities, hygiene, automation, cashless payments, GPRS tracking, inventory monitoring, analytics as a partner benefit, placement models, and contact details.
- Public pages must not show private scoring configuration, forecast assumption management, admin export/audit tooling, or internal route mechanics.
- Do not migrate Wix demo-store products as real ProBlend products.

## Task 4 Scope

Implement only:

`Task 4: Content System, Public Routes, And Legal Pages`

Expected output of this session:

- `src/content/site.ts`
- `src/content/products.ts`
- `src/content/legal.ts`
- `src/content/case-studies.ts`
- `src/components/public/PublicHeader.tsx`
- `src/components/public/PublicFooter.tsx`
- `src/components/public/PolicyPage.tsx`
- Public route pages under `src/app/(public)/`
- `src/tests/content/site-content.test.ts`

Do not implement public forms/actions, placement-estimate persistence, admin auth, dashboards, database writes, exports, migrations, or Task 5+ behavior in this session.

## Required Execution Flow

1. Read the mandatory docs and confirm Task 4 scope.
2. Check git status. Do not overwrite unrelated user changes.
3. Use the required skills and sub-agents.
4. Write `src/tests/content/site-content.test.ts` first from the Task 4 plan.
5. Run:

```bash
npm run test -- src/tests/content/site-content.test.ts
```

Expected before implementation: tests fail because `@/content/site` and `@/content/products` do not exist.

6. Implement only the Task 4 content modules, public layout/header/footer/policy component, and public route pages from the implementation plan.
7. Run:

```bash
npm run test -- src/tests/content/site-content.test.ts
npm run typecheck
npm run build
```

8. Start the dev server and use Browser/in-app browser verification for the created public pages. Confirm at minimum `/`, `/about`, `/product-offerings`, `/business-solutions`, `/contact`, and one legal page render without exposing private admin/scoring/export/audit mechanics.
9. Run additional foundation checks if Task 4 touches shared config or package files:

```bash
npm run lint
npm run test
```

10. Fix any failures inside Task 4 scope.
11. Commit Task 4 with:

```bash
git add src/content src/components/public src/app/\(public\) src/tests/content/site-content.test.ts
git commit -m "feat: rebuild ProBlend public content structure"
```

12. Create or overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt, including what actually happened, verification status, commit hash or hashes, blockers/deviations, and the next implementation-plan task.
13. Commit the handoff file with:

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
