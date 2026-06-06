# Next Session Prompt: ProBlend Digital OS Task 10

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on branch `main`.

Your job in this session is to resume the main ProBlend Digital Operating System implementation at:

`Task 10: Analytics, Activity Logging, Health, SEO, And Policy Verification`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Implement only Task 10. Do not one-shot Task 11. Verify Task 10, commit it, then update this file for Task 11 unless the user redirects.

## Latest Completed Work

- Latest completed implementation commit when this prompt was written: `a71233a0b505cba0542f503b9360200243e534ea`
- Latest implementation commit message: `feat: add product explorer map and motion`
- Branch: `main`
- Task 9 is implemented and committed.
- Current working tree after the Task 9 commit should only have untracked `tmp/` screenshot artifacts plus this handoff edit until the handoff is committed. Do not commit `tmp/` unless the user explicitly asks.

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

Task 9 added:

- `src/components/public/ProductExplorer.tsx` with four product tabs from `src/content/products.ts`, nutrition display framework, machine capability panel, customization notes, and GSAP tab reveal.
- `src/components/public/ExpansionMap.tsx` with public-safe New Delhi base and target markets: Mumbai, Pune, Bengaluru, Hyderabad, Chennai, Ahmedabad, Kolkata, and Jaipur.
- `src/components/public/CaseStudySection.tsx` and `src/content/case-studies.ts` with slug, title, venue type, city, summary, metrics, body, and publication flag.
- Product content exports for nutrition profiles, machine capabilities, and customization notes.
- Home page character-based hero reveal through `GsapReveal` plus no-overlap accessible heading markup.
- Scroll storytelling support for `[data-capability-step]` and character reveal support in `src/components/public/GsapReveal.tsx` and `src/app/globals.css`.
- Product Offerings page integration for Product Explorer.
- Business Solutions page integration for Expansion Map and public case-study section.
- Tests in `src/tests/components/public-task-9.test.tsx` and updated `src/tests/content/site-content.test.ts`.

Task 9 did not expose private opportunity records, internal counts, forecast configs, exports, audit logs, or admin dashboards on public pages.

## Task 9 Verification Status

Fresh verification run before the Task 9 commit:

```bash
npm run typecheck
# PASS

npm test
# PASS: 12 files, 59 tests

npm run lint
# PASS

npm run build
# PASS

git diff --check
# PASS
```

Browser verification used the existing dev server at `http://localhost:3000`.

Browser/IAB notes:

- Browser runtime did not support `networkidle`; used `load` state for page readiness.
- Verified `/` desktop hero heading is visible, has accessible label `Fuel your fitness, one shake at a time.`, preserves word spacing, has no copy overlap, has no horizontal overflow, and produced zero console errors.
- Scrolled the home page and confirmed no horizontal overflow.
- Verified `/product-offerings` loads without horizontal overflow.
- Clicked the `Mango` product tab and confirmed `aria-selected="true"`, `Mango Protein Shake`, nutrition framework, machine capability panel, and customization notes all render.
- Scrolled Product Offerings and confirmed no horizontal overflow.
- Verified `/business-solutions` loads without horizontal overflow.
- Verified public expansion map renders New Delhi base, address `K-18 Green Park Extension`, all target cities, and no private/internal-record language.
- Clicked `Mumbai` on the map and confirmed `aria-pressed="true"`.
- Mobile viewport `390x844`: verified `/`, `/product-offerings`, and `/business-solutions` have no horizontal overflow; nav, product tabs, and forms fit within the viewport.
- Console error counts were zero on Home, Product Offerings, and Business Solutions.

Supabase and database notes:

- Task 9 did not require database migrations or Supabase resets.
- Existing Task 8 notes still apply: local Supabase start/reset was previously blocked because `docker` was not available in shell. Do not claim `npx supabase start` or `npx supabase db reset` passed unless rerun in a Docker-capable environment.

## Placement Calculator Boundary

The placement calculator remains public at `/placement-estimate`.

Task 9 did not move the public calculator into admin. The existing `PlacementEstimateForm` already uses GSAP for animated numeric output transitions and remains public-safe: it does not expose editable forecast assumptions or internal multipliers.

## Current Task 10 Reality Check

Before editing, inspect:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `src/db/schema.ts`
4. `src/db/client.ts`
5. Existing public form actions in `src/features/public/actions.ts`
6. Placement estimate action in `src/features/forecasting/actions.ts`
7. Admin actions in `src/features/admin-operations/actions.ts`
8. Admin export route in `src/app/api/admin/export/[dataset]/route.ts`
9. Existing route metadata and public route constants in `src/content/site.ts`
10. Existing tests around public actions, placement estimates, admin operations, and admin export.

## Mandatory Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:executing-plans` unless independent subagent work is available and explicitly authorized, then use `superpowers:subagent-driven-development`
- `superpowers:test-driven-development` before implementing Task 10 behavior
- `superpowers:verification-before-completion` before claiming completion or committing
- `superpowers:systematic-debugging` if any verification command fails
- `supabase:supabase` for Supabase/database-related work
- `build-web-apps:react-best-practices` for React/Next implementation
- `browser:control-in-app-browser` for rendered local verification

## Product Guardrails

Keep these constraints active:

- No public visitor accounts.
- Continue built-in admin auth; do not add Clerk/Auth0/Supabase Auth.
- Public pages must not expose admin dashboards, scoring internals, forecast config controls, exports, audit logs, private opportunity records, or internal counts.
- Product Explorer uses existing `src/content/products.ts`; do not reintroduce demo Wix store products.
- Keep admin UI private and separate from public visual work.
- Analytics must not require public login or create visitor accounts.
- Analytics metadata must be public-safe and bounded; do not store secrets, cookies, raw session tokens, or private admin record dumps.
- Sitemap must include only public/legal routes and exclude `/admin` and `/api`.
- Robots must disallow `/admin` and `/api`.

## Task 10 Scope

Implement only:

`Task 10: Analytics, Activity Logging, Health, SEO, And Policy Verification`

Expected files from the plan:

- Create `src/features/analytics/events.ts`
- Create `src/features/analytics/actions.ts`
- Create `src/app/api/health/route.ts`
- Create `src/app/sitemap.ts`
- Create `src/app/robots.ts`
- Modify public form actions
- Modify admin actions
- Modify admin export route if needed for analytics wiring
- Add or update focused tests for analytics, health, sitemap, robots, and action instrumentation

Do not implement Task 11 E2E QA, Supabase advisors, or launch hardening work.

## Required Task 10 Behavior

1. Analytics event registry:
   - Create `src/features/analytics/events.ts`.
   - Include event names:
     - `cta_click`
     - `contact_submitted`
     - `opportunity_submitted`
     - `calculator_started`
     - `calculator_completed`
     - `admin_status_changed`
     - `forecast_config_version_created`
     - `export_created`

2. Analytics action:
   - Create `trackEventAction`.
   - Validate event name, source path, optional session id, and JSON metadata.
   - Insert into `analytics_events`.
   - Keep metadata bounded and JSON-safe.
   - Do not expose analytics internals publicly.

3. Wire analytics:
   - Contact submissions.
   - Opportunity submissions.
   - Calculator started and calculator completed where feasible.
   - Admin opportunity/contact status updates.
   - Forecast config version creation.
   - Admin CSV exports.
   - CTA clicks for placement estimate, submit opportunity, and contact if the plan and codebase provide a clean client/server pattern. If not, document the limitation in the handoff instead of adding brittle global click tracking.

4. Health route:
   - Create `src/app/api/health/route.ts`.
   - Return JSON:

```ts
export async function GET() {
  return Response.json({
    ok: true,
    service: "problend-digital-os",
    timestamp: new Date().toISOString()
  });
}
```

5. Sitemap and robots:
   - Create `src/app/sitemap.ts`.
   - Create `src/app/robots.ts`.
   - Sitemap includes only public and legal routes.
   - Sitemap must not include `/admin` or `/api`.
   - Robots allows public pages and disallows `/admin` and `/api`.

## Required Verification

After implementation, run:

```bash
npm run typecheck
npm run lint
npm run build
git diff --check
```

Run full tests if shared public action/admin behavior changed:

```bash
npm test
```

Browser verification:

1. Start the app with `npm run dev` or use an existing dev server for this repo.
2. Open `/api/health` and confirm JSON shape.
3. Open `/sitemap.xml` and confirm public/legal routes only.
4. Open `/robots.txt` and confirm `/admin` and `/api` are disallowed.
5. Submit a local contact form and confirm an analytics event is stored if a reachable local database/session is available.
6. If database-backed browser verification is blocked locally, state the blocker and rely on tests that mock DB writes.

## Commit Task 10

After fresh verification:

```bash
git add src/features/analytics src/app/api/health src/app/sitemap.ts src/app/robots.ts src/features src/app src/tests
git commit -m "feat: add analytics health and SEO routes"
```

Then overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt for:

`Task 11: End-To-End QA, Accessibility, Supabase Advisors, And Launch Hardening`

Include what actually happened, verification status, commit hash, blockers/deviations, and exact next scope.

Commit that handoff separately:

```bash
git add docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "docs: add next session handoff"
```

## Final Response Requirements

In the final response for Task 10, report:

- The completed task.
- Verification results with commands and pass/fail status.
- Commit hash or hashes.
- Path to `docs/superpowers/prompts/NEXT_SESSION.md`.
- Whether browser verification passed or was blocked.
- Whether any work remains or was blocked.
