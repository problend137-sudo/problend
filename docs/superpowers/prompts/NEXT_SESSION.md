# Next Session Prompt: ProBlend Digital OS Task 2

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Your job in this session is to implement exactly one bounded part of the implementation plan, verify it, commit it, and then write the prompt for the next session based on what actually happened.

Do not try to one-shot the whole product.

## Latest Completed Work

- Latest completed implementation commit hash when this prompt was written: `82ba1ed016b31671489685ccf344c403697eeaba`
- Completed task: `Task 1: Foundation, Tooling, And Base App Shell`
- Commit message: `chore: scaffold Next.js foundation`

## What Changed In Task 1

Created or modified:

- `.env.example`
- `.gitignore`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `postcss.config.mjs`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/lib/env.ts`
- `src/lib/utils.ts`
- `src/tests/smoke.test.ts`
- `tsconfig.json`
- `vitest.config.ts`

Task 1 intentionally did not implement public pages, database schema, admin auth, forms, forecasting, dashboards, or Supabase migrations.

## Verification From Task 1

Commands run in the Task 1 session:

- `npx supabase projects list`: PASS. The repo is linked to project ref `tueqoqusbxeldxnnarlv`, org `xgejdxtkxjnrwdnocjzn`, region `South Asia (Mumbai)`.
- `npm install`: PASS. Created `package-lock.json`. It reported 6 moderate npm audit findings; package versions were left as the Task 1 plan specified.
- `npx playwright install chromium`: PASS. Chromium browser binaries installed.
- TDD red check, `npm run test` before adding `src/lib/env.ts` and `src/lib/utils.ts`: FAIL as expected with missing `@/lib/env`.
- TDD green check, `npm run test` after adding helpers: PASS, 1 test file and 3 tests.
- First full `npm run typecheck`: FAIL on TypeScript 6 `baseUrl` deprecation. Fixed by adding `"ignoreDeprecations": "6.0"`.
- First full `npm run lint`: PASS with one warning about anonymous default export. Fixed by assigning the ESLint config before export.
- First `npm run build`: FAIL because Next 16 moved `experimental.typedRoutes` to top-level `typedRoutes`, and typed route validation rejected `href="/"` while Task 1 has no home page. Fixed without adding a public page.
- Final `npm run typecheck`: PASS.
- Final `npm run lint`: PASS.
- Final `npm run test`: PASS, 1 test file and 3 tests.
- Final `npm run build`: PASS. Build output contains only `/404`, which is expected because Task 1 has no public page.
- Browser render check via Playwright against local dev server: PASS. `GET /missing-task-1-check` returned 404 with the intended ProBlend not-found heading, `Return home` link, Barlow font, and gradient shell.

## Deviations Or Notes

- `next.config.ts` uses top-level `typedRoutes: true` instead of `experimental.typedRoutes` because Next 16.2.7 requires the new location.
- `tsconfig.json` uses `jsx: "react-jsx"` and includes `.next/dev/types/**/*.ts` because Next updated the config during build.
- `next-env.d.ts` was staged with Task 1 even though the written `git add` list omitted it. A required post-diff sub-agent recommended staging it as the standard generated Next type shim.
- `src/app/not-found.tsx` uses a typed route cast for `/` because Task 1 intentionally has no home page. The link will still land on a 404 until a later public-page task creates `/`.
- No blockers remain from Task 1.

## Mandatory Context For This Session

Read these files before editing:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `docs/superpowers/prompts/NEXT_SESSION.md`

Begin with:

`Task 2: Supabase Schema, Drizzle Client, And Data Access Boundary`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Do not implement Task 3 or any later task in this session.

## Mandatory Skills And Agents

You must explicitly use:

- `superpowers:subagent-driven-development` for the implementation workflow.
- Sub-agents for independent work. For Task 2, use at least two sub-agents:
  - One sub-agent to review the Supabase schema and data-access plan before editing.
  - One sub-agent to review the completed migration, Drizzle schema/client/query diff, and verification evidence before finalizing.
- `superpowers:test-driven-development` for testable behavior and data-access boundary behavior.
- `superpowers:verification-before-completion` before claiming anything is complete.
- `supabase:supabase` before any Supabase CLI, schema, migration, RLS, or database work. Follow its guidance to check relevant current Supabase docs/changelog before schema changes.
- `build-web-apps:frontend-app-builder` before any frontend implementation or visual decision. Task 2 should not need frontend implementation, so state that it was not applied beyond preserving Task 1 app-shell constraints if no frontend files are touched.

If a named skill is unavailable, state that briefly and continue with the closest available workflow.

## Supabase Credentials And Project

Use the existing Supabase CLI setup through `npx`; do not assume a global `supabase` binary.

Project details:

- Project URL: `https://tueqoqusbxeldxnnarlv.supabase.co`
- Project ref: `tueqoqusbxeldxnnarlv`
- Organization id: `xgejdxtkxjnrwdnocjzn`
- Region: `South Asia (Mumbai)`
- Region code: `ap-south-1`

Verify linkage with:

```bash
npx supabase projects list
```

If the repo is not linked, relink with:

```bash
npx supabase link --project-ref tueqoqusbxeldxnnarlv
```

Do not print, commit, or invent Supabase secrets. Do not expose service-role keys. If a database password, `DATABASE_URL`, or production secret is required and unavailable, ask the user for it instead of guessing.

Do not commit anything under `supabase/.temp`; it is intentionally ignored.

## Task 2 Scope

Implement only:

`Task 2: Supabase Schema, Drizzle Client, And Data Access Boundary`

Expected output of this session:

- One Supabase migration in `supabase/migrations/`, created with `npx supabase migration new initial_digital_os_schema`
- `drizzle.config.ts`
- `src/db/client.ts`
- `src/db/schema.ts`
- `src/db/queries/admin.ts`
- `src/db/queries/analytics.ts`
- `src/db/queries/contacts.ts`
- `src/db/queries/forecasts.ts`
- `src/db/queries/opportunities.ts`
- `src/db/queries/waitlists.ts`

Do not implement public pages, admin auth UI, public forms, forecasting engine logic, dashboards, exports, or later-route behavior in this session.

## Product Guardrails

Keep these constraints active:

- Public website must remain recognizably ProBlend, not a generic AI/SaaS template.
- Public pages must not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, or internal route mechanics.
- Typography direction remains Barlow Condensed for display and Barlow for body/UI.
- Supabase is Mumbai project `tueqoqusbxeldxnnarlv`.
- No public visitor accounts. V1 uses built-in admin auth later, not Clerk/Auth0.

## Required Execution Flow

1. Read the mandatory docs and confirm Task 2 scope.
2. Check git status. Do not overwrite unrelated user changes.
3. Use the required skills and sub-agents.
4. Run:

```bash
npx supabase --version
npx supabase projects list
```

5. Create the migration with:

```bash
npx supabase migration new initial_digital_os_schema
```

6. Write only the Task 2 migration, Drizzle config, Drizzle client/schema, and query modules.
7. Run the Task 2 verification commands:

```bash
npx supabase start
npx supabase db reset
npm run typecheck
```

8. Also rerun foundation checks if Task 2 touches shared config or package files:

```bash
npm run lint
npm run test
npm run build
```

9. Fix any failures inside Task 2 scope.
10. Commit Task 2 with:

```bash
git add supabase/migrations drizzle.config.ts src/db
git commit -m "feat: add digital OS database schema"
```

11. Create or overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt, including what actually happened, verification status, commit hash or hashes, blockers/deviations, and the next implementation-plan task.
12. Commit the handoff file with:

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
