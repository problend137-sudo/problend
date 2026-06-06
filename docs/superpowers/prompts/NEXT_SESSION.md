# Next Session Prompt: ProBlend Digital OS Task 9

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Your job in this session is to resume the main ProBlend Digital Operating System implementation at:

`Task 9: Product Explorer, Expansion Map, Case Study Framework, And Motion Layer`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Implement only Task 9. Do not one-shot Tasks 10-11. Verify Task 9, commit it, then update this file for Task 10 unless the user redirects.

## Latest Completed Work

- Latest completed implementation commit when this prompt was written: `929ded0ba3a1cc8f528aa08e8fe6292711622391`
- Latest commit message: `feat: add admin operations dashboard`
- Branch: `main`
- Task 8 is implemented and committed.
- Current working tree after the Task 8 commit should only have untracked `tmp/` screenshot artifacts plus this handoff edit until the handoff is committed. Do not commit `tmp/` unless the user explicitly asks.

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

Task 8 added:

- `src/components/admin/AdminShell.tsx`, `AdminHeader.tsx`, `AdminSidebar.tsx`, `DataTable.tsx`, `StatusPill.tsx`, `ScoreCard.tsx`, and `ForecastConfigEditor.tsx`.
- Protected admin pages for overview, opportunities, opportunity detail, contacts, calculator, forecast configs, forecast runs, waitlists, activity, and settings.
- `src/db/queries/admin-operations.ts` for Task 8 dashboard, management, export, and config-version query helpers.
- `src/features/admin-operations/actions.ts` for opportunity/contact status updates, forecast config version creation, and published need creation.
- `src/lib/csv.ts`.
- `src/app/api/admin/export/[dataset]/route.ts` with `requireAdmin()` and `admin.export.created` audit logging.
- Tests in `src/tests/lib/csv.test.ts`, `src/tests/app/admin-export-route.test.ts`, and `src/tests/features/admin-operations-actions.test.ts`.

## Task 8 Verification Status

Fresh verification run before the Task 8 commit:

```bash
npm test
# PASS: 11 files, 56 tests

npm run typecheck
# PASS

npm run lint
# PASS

git diff --check
# PASS

npm run build
# PASS
```

Supabase and database notes:

- Supabase changelog was checked for current database-related breaking changes before DB/CLI work.
- `docker info` failed with `zsh:1: command not found: docker`.
- Local Supabase start/reset remains blocked. Do not claim `npx supabase start` or `npx supabase db reset` passed unless rerun in a Docker-capable environment.
- `npx supabase --version` returned `2.105.0`.
- CLI help was checked for `supabase`, `supabase db`, `supabase projects`, and `supabase db push`.
- `npx supabase projects list --output json` showed linked project `tueqoqusbxeldxnnarlv`, name `problend`, region `ap-south-1`, Postgres `17.6.1.127`, status `ACTIVE_HEALTHY`.
- `npx supabase db push --linked --dry-run` returned `Remote database is up to date.`

Browser verification notes:

- Browser/IAB worked against the existing dev server at `http://localhost:3000`.
- Verified `/admin/opportunities` redirects unauthenticated users to `/admin/login`.
- Verified every Task 8 private route redirects unauthenticated users to `/admin/login`: `/admin`, `/admin/opportunities`, `/admin/contacts`, `/admin/calculator`, `/admin/forecast-configs`, `/admin/forecast-runs`, `/admin/waitlists`, `/admin/activity`, and `/admin/settings`.
- Verified `/business-solutions` loads, includes the placement-estimate path, has meaningful content, and shows no browser error overlay or console errors.
- Verified mobile `390x844` unauthenticated admin login has no horizontal overflow and no error overlay.
- Verified unauthenticated `/api/admin/export/opportunities` returns a `307` redirect to `/admin/login`.
- Authenticated admin success path, admin CRUD/browser workflow, and CSV download in-browser were blocked locally because there is no reachable local database/session and no shell `DATABASE_URL` for the remote database. Tests mock DB behavior for protected actions/export.

## Placement Calculator Boundary

The placement calculator remains public at `/placement-estimate`.

Task 8 added the private `/admin/calculator` operations page for reviewing calculator submissions and linked forecast runs. Do not move the public calculator into admin, and do not expose forecast configs, scoring internals, exports, or audit logs publicly.

## Current Task 9 Reality Check

Before editing, inspect:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `src/content/products.ts`
4. `src/content/case-studies.ts`
5. `src/app/(public)/page.tsx`
6. `src/app/(public)/product-offerings/page.tsx`
7. `src/app/(public)/business-solutions/page.tsx`
8. Existing public components in `src/components/public/`
9. Existing GSAP usage in `src/components/public/GsapReveal.tsx`
10. Existing public tests.

## Mandatory Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:executing-plans` unless independent subagent work is available and explicitly authorized, then use `superpowers:subagent-driven-development`
- `superpowers:test-driven-development` before implementing Task 9 behavior
- `superpowers:verification-before-completion` before claiming completion or committing
- `superpowers:systematic-debugging` if any verification command fails
- `build-web-apps:frontend-app-builder` before building/changing public UI
- `build-web-apps:react-best-practices` for React/Next implementation
- `browser:control-in-app-browser` for rendered local verification; Browser/IAB worked during Task 8

## Product Guardrails

Keep these constraints active:

- No public visitor accounts.
- Continue built-in admin auth; do not add Clerk/Auth0/Supabase Auth.
- Public pages must not expose admin dashboards, scoring internals, forecast config controls, exports, or audit logs.
- Public expansion map may show target markets and public deployment story, but not private opportunity records or internal counts.
- Product Explorer should use existing `src/content/products.ts`; do not reintroduce demo Wix store products.
- Keep admin UI private and separate from Task 9 public visual work.
- Use GSAP intentionally, respect `prefers-reduced-motion`, and avoid continuous decorative animation.

## Task 9 Scope

Implement only:

`Task 9: Product Explorer, Expansion Map, Case Study Framework, And Motion Layer`

Expected files from the plan:

- Create `src/components/public/ProductExplorer.tsx`
- Create `src/components/public/ExpansionMap.tsx`
- Modify `src/app/(public)/product-offerings/page.tsx`
- Modify `src/app/(public)/business-solutions/page.tsx`
- Modify `src/app/(public)/page.tsx`
- Modify `src/content/case-studies.ts`

Do not implement Task 10 analytics, health, SEO, or policy verification work.

## Required Task 9 Behavior

Task 9 must provide:

1. Product Explorer:
   - Product tabs for four flavours from `src/content/products.ts`.
   - Nutrition display framework.
   - Machine capability panel: cashless payments, GPRS tracking, inventory monitoring, analytics, remote monitoring, predictive restocking.
   - Customization notes for protein content and flavour intensity.
2. Expansion Map:
   - Interactive visual for India deployment and opportunity categories.
   - Existing base: New Delhi address.
   - Target markets: Mumbai, Pune, Bengaluru, Hyderabad, Chennai, Ahmedabad, Kolkata, Jaipur.
   - Public page must not reveal private opportunity records or counts.
3. Case study framework:
   - `caseStudies` content shape with slug, title, venue type, city, summary, metrics, body, and publication flag.
   - Public case-study section renders only published items.
   - Admin data model already exists for future CMS-ready editing; do not build admin editing in Task 9.
4. GSAP motion layer:
   - Character-based hero reveal on the home page.
   - Scroll storytelling for machine capability sections.
   - Product/flavour reveal in Product Explorer.
   - Animated calculator output transitions.
   - Admin dashboard micro-interactions only where they clarify state.

## Required Verification

After implementation, run:

```bash
npm run typecheck
npm run lint
npm run build
git diff --check
```

Run full tests if shared public component/content behavior changed:

```bash
npm test
```

Browser verification:

1. Start the app with `npm run dev` or use an existing dev server for this repo.
2. Open `/`.
3. Verify hero copy reveals without overlap.
4. Scroll through Home, Product Offerings, and Business Solutions.
5. Confirm product explorer tabs update content.
6. Confirm public map does not show internal opportunity records.
7. Use a mobile viewport and confirm text, forms, nav, and product tabs fit without horizontal overflow.

## Commit Task 9

After fresh verification:

```bash
git add src/components/public src/app/\(public\) src/content src/tests
git commit -m "feat: add product explorer map and motion"
```

Then overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt for:

`Task 10: Analytics, Activity Logging, Health, SEO, And Policy Verification`

Include what actually happened, verification status, commit hash, blockers/deviations, and exact next scope.

Commit that handoff separately:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response for Task 9, report:

- The completed task.
- Verification results with commands and pass/fail status.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether browser verification passed or was blocked.
- Whether any work remains or was blocked.
