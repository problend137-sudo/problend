# Next Session Prompt: Close Partnership Platform Redesign

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Important context: the previous `NEXT_SESSION.md` pointed at the older Digital Operating System Task 6 placement-estimate flow, but the current dirty tree is the newer Partnership Platform redesign from `docs/superpowers/plans/2026-06-06-partnership-platform-redesign-implementation.md`. Do not jump back to placement-estimate work until this dirty tree is reviewed and committed or the user explicitly redirects.

Your immediate job is to close the current uncommitted Partnership Platform redesign work.

## Current Plan State

The active plan is:

```text
docs/superpowers/plans/2026-06-06-partnership-platform-redesign-implementation.md
```

Task 5, Final Verification, was run on June 6, 2026 after a lint fix in `src/components/public/OpportunityForm.tsx`.

The implementation appears to cover Tasks 1-4:

- Schema, migration, query, action, and Zod support for branch-specific opportunity submissions.
- Public content and route updates for a single Partnership Platform surface.
- Guided branch form UI in `OpportunityForm`.
- Compact public board and platform page UI.
- Shortcut routes for partner, venue, published opportunities, submit opportunity, and city waitlist.

Do not mark historical TDD RED steps complete unless you verify them from actual history; this handoff only records the current working tree and verification evidence.

## Dirty Tree Scope

Expected uncommitted source/doc changes include:

- `docs/superpowers/prompts/NEXT_SESSION.md`
- `docs/superpowers/plans/2026-06-06-partnership-platform-redesign-implementation.md`
- `supabase/migrations/20260606081445_partnership_platform_redesign.sql`
- `src/app/(public)/business-solutions/page.tsx`
- `src/app/(public)/submit-opportunity/page.tsx`
- `src/app/(public)/city-waitlist/page.tsx`
- `src/app/(public)/partner-with-problend/page.tsx`
- `src/app/(public)/published-opportunities/page.tsx`
- `src/app/(public)/submit-venue/page.tsx`
- `src/components/public/ContactForm.tsx`
- `src/components/public/OpportunityApplicationForm.tsx`
- `src/components/public/OpportunityForm.tsx`
- `src/components/public/OpportunityPostList.tsx`
- `src/components/public/PublicPageHero.tsx`
- `src/content/site.ts`
- `src/db/queries/opportunities.ts`
- `src/db/schema.ts`
- `src/features/opportunities/actions.ts`
- `src/features/opportunities/schemas.ts`
- `src/tests/content/site-content.test.ts`
- `src/tests/features/public-actions.test.ts`

`tmp/` contains generated verification screenshots and older screenshot artifacts. Do not commit `tmp/` unless the user explicitly asks.

## Behavior To Preserve

- `/business-solutions` is now the primary Partnership Platform page.
- `/partner-with-problend`, `/submit-venue`, and `/submit-opportunity` redirect to `/business-solutions#opportunity-intake`.
- `/published-opportunities` renders the open-opportunities board.
- `/city-waitlist` renders a public waitlist form.
- `OpportunityForm` is one guided branch flow for venue, city/network, introduction, and open-brief paths.
- `OpportunityForm` must keep its current lint-safe pattern: branch defaults reset in `selectKind`, not via synchronous `setState` calls inside an effect.
- Public board queries only list published open posts in display order.
- Opportunity submissions persist `opportunityKind`, `sourcePath`, and branch details.
- Opportunity applications persist `sourcePath`.
- Public copy must not expose admin/private concepts such as dashboard, forecast configuration, export, activity log, application tracking, internal, or CRM.

## Verification Already Passed

Fresh commands run after the `OpportunityForm` lint fix:

```bash
npm run test -- src/tests/content/site-content.test.ts src/tests/features/public-actions.test.ts
npm run typecheck
npm run lint
npm run build
git diff --check
```

Observed results:

- Vitest: 2 test files passed, 24 tests passed.
- TypeScript: `tsc --noEmit` exited 0.
- ESLint: `eslint .` exited 0.
- Next build: exited 0 and generated 16 app routes, including `/business-solutions`, `/city-waitlist`, `/partner-with-problend`, `/published-opportunities`, `/submit-opportunity`, and `/submit-venue`.
- `git diff --check`: exited 0.

Browser note:

- The in-app Browser plugin blocked local URLs with `ERR_BLOCKED_BY_CLIENT`.
- Standalone Playwright was used as the fallback against a production server started with `npm run start -- --port 3001`.
- Fresh production route checks passed for:
  - desktop `/business-solutions`
  - desktop `/published-opportunities`
  - desktop `/partner-with-problend`
  - desktop `/submit-venue`
  - desktop `/submit-opportunity`
  - mobile 390px `/business-solutions`
- Each checked route returned HTTP 200, no framework overlay, no client console errors, no page errors, no horizontal overflow, and no blocked public/private terms.
- Screenshots were written to `tmp/problend-task5-final-verification-prod/`.
- The temporary production server was stopped.

Local DB caveat:

- The migration file exists, but this session did not apply it to a local Supabase instance.
- Browser QA did not perform real database-backed success submissions.
- Server action behavior is covered by the focused Vitest tests with mocked query helpers.

## Required Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:verification-before-completion` before claiming completion or committing
- `supabase:supabase` before touching migrations, Supabase schema, RLS, or database behavior
- `browser:control-in-app-browser` if retrying browser verification
- `superpowers:systematic-debugging` if any verification command fails

## Next Steps

1. Run `git status --short --branch` and inspect the current diff. Do not discard uncommitted changes.
2. Re-run any verification needed if files changed after this handoff.
3. If the tree still matches this scope, stage the source, docs, and migration changes, excluding `tmp/`.
4. Commit the redesign separately:

```bash
git add docs/superpowers/plans/2026-06-06-partnership-platform-redesign-implementation.md docs/superpowers/prompts/NEXT_SESSION.md supabase/migrations/20260606081445_partnership_platform_redesign.sql src/content/site.ts src/db/schema.ts src/db/queries/opportunities.ts src/features/opportunities/actions.ts src/features/opportunities/schemas.ts src/tests/content/site-content.test.ts src/tests/features/public-actions.test.ts src/components/public/ContactForm.tsx src/components/public/OpportunityApplicationForm.tsx src/components/public/OpportunityForm.tsx src/components/public/OpportunityPostList.tsx src/components/public/PublicPageHero.tsx 'src/app/(public)/business-solutions/page.tsx' 'src/app/(public)/submit-opportunity/page.tsx' 'src/app/(public)/city-waitlist' 'src/app/(public)/partner-with-problend' 'src/app/(public)/published-opportunities' 'src/app/(public)/submit-venue'
git commit -m "feat: redesign partnership platform"
```

5. After that commit, ask the user whether to resume the older Digital Operating System Task 6 placement-estimate work or write a fresh prompt for the next priority.
