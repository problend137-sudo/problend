# Next Session Prompt: ProBlend Digital OS Foundation

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Your job in this session is to implement exactly one bounded part of the implementation plan, verify it, commit it, and then write the prompt for the next session based on what actually happened.

Do not try to one-shot the whole product.

## Mandatory Context

Read these files before editing:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. This prompt file, if present: `docs/superpowers/prompts/NEXT_SESSION.md`

If `docs/superpowers/prompts/NEXT_SESSION.md` exists and gives a newer task than this prompt, follow that newer prompt. If it does not exist, begin with Task 1 from the implementation plan: **Foundation, Tooling, And Base App Shell**.

## Mandatory Skills And Agents

You must explicitly use:

- `superpowers:subagent-driven-development` for the implementation workflow.
- Sub-agents for independent work. For Task 1, use at least two sub-agents:
  - One sub-agent to review the foundation/config plan and flag risks before editing.
  - One sub-agent to review the completed diff and verification evidence before finalizing.
- `superpowers:test-driven-development` for testable behavior.
- `superpowers:verification-before-completion` before claiming anything is complete.
- `build-web-apps:frontend-app-builder` before frontend implementation or visual decisions.
- `supabase:supabase` before any Supabase CLI, schema, migration, RLS, or database work.

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

## Session Scope

For this next session, implement only:

`Task 1: Foundation, Tooling, And Base App Shell`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Expected output of this session:

- `package.json`
- `package-lock.json`
- Next.js, TypeScript, PostCSS, ESLint, Vitest, and Playwright config
- `.env.example`
- base `src/app/layout.tsx`
- base `src/app/globals.css`
- base `src/app/not-found.tsx`
- `src/lib/env.ts`
- `src/lib/utils.ts`
- `src/tests/smoke.test.ts`

Do not implement public pages, database schema, admin auth, forms, forecasting, or dashboards in this session.

## Product Guardrails

Keep these constraints active even during foundation work:

- Public website must remain recognizably ProBlend, not a generic AI/SaaS template.
- Public pages must not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, or internal route mechanics.
- Typography direction is Barlow Condensed for display and Barlow for body/UI.
- Supabase is Mumbai project `tueqoqusbxeldxnnarlv`.
- No public visitor accounts. V1 uses built-in admin auth later, not Clerk/Auth0.

## Required Execution Flow

1. Read the plan and confirm Task 1 scope.
2. Check git status. Do not overwrite unrelated user changes.
3. Use sub-agents as required above.
4. Implement only Task 1.
5. Run verification commands from Task 1:

```bash
npm run typecheck
npm run lint
npm run test
```

Also run:

```bash
npm run build
```

6. Fix any failures inside Task 1 scope.
7. Commit the Task 1 implementation with:

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts playwright.config.ts .env.example src/app src/lib src/tests .gitignore
git commit -m "chore: scaffold Next.js foundation"
```

8. Write the next-session prompt.

## Required End-Of-Session Handoff

At the end of this session, create or overwrite:

`docs/superpowers/prompts/NEXT_SESSION.md`

That file must be a paste-ready prompt for the following Codex session. It must include:

- Latest commit hash.
- What task was completed.
- Verification commands run and exact pass/fail status.
- Files created/modified.
- Any blockers or deviations.
- The next implementation-plan task to execute.
- Explicit instruction to use sub-agents and the required Superpowers skills.
- Supabase project details from this prompt.
- A reminder not to one-shot the whole product.

If Task 1 completes, the next prompt should direct the following session to execute:

`Task 2: Supabase Schema, Drizzle Client, And Data Access Boundary`

Commit the prompt handoff file too, either in the same commit if still before commit, or as a separate docs commit:

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

