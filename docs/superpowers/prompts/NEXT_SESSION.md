# Next Session Prompt: Task 6 Placement Estimate

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Task 4, the public website redo, was completed and verified earlier. Task 5, Public Forms And Server-Side Acquisition Actions, was completed in the most recent session. Do not redesign the public website again unless the user explicitly reports a Task 4 or Task 5 regression. Preserve the dark, image-led public design, exact live-site copy anchors, generated ProBlend imagery, GSAP reduced-motion behavior, legacy Wix redirects, and public/private boundary.

Your job in the next session is **Task 6: Placement Estimate Flow And Forecast Persistence** from `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`.

Do not proceed to admin auth, dashboards, exports, private/admin pages, user management, or forecast configuration UI work.

## Task 5 Completed Baseline

Task 5 added:

- `src/features/contacts/schemas.ts`
- `src/features/contacts/actions.ts`
- `src/features/opportunities/schemas.ts`
- `src/features/opportunities/actions.ts`
- `src/features/waitlists/schemas.ts`
- `src/features/waitlists/actions.ts`
- `src/lib/request.ts`
- `src/components/public/ContactForm.tsx`
- `src/components/public/OpportunityForm.tsx`
- `src/components/public/OpportunityApplicationForm.tsx`
- `src/components/public/OpportunityPostList.tsx`
- `src/tests/features/public-actions.test.ts`

Public UX wiring now includes:

- `ContactForm` on `/contact`.
- Waitlist forms on `/contact` and `/business-solutions`.
- `OpportunityForm` on `/submit-opportunity`.
- `OpportunityPostList` on `/business-solutions` and `/submit-opportunity`.
- A restrained `Submit Opportunity` header CTA and footer links for `Submit Opportunity` and `Placement Estimate`.
- `/business-solutions` platform pathways for venue placement, operator/distributor/introducer partnership, waitlist, published opportunities, and placement estimate.
- `/placement-estimate` remains discoverable but does not yet persist estimates.

Important Task 5 behavior:

- Contact labels remain exactly `First Name`, `Last Name`, `Email`, `Message`, `Send`.
- Contact success copy remains exactly `Thanks for submitting!`.
- Opportunity success copy is `Thanks. ProBlend has received the opportunity details.`
- Opportunity application success copy is `Thanks. ProBlend has received your application.`
- Waitlist success copy is `Thanks. ProBlend has recorded your city interest.`
- Zod schemas reject filled honeypot fields.
- Opportunity application actions verify the post is in the published opportunity list before inserting.
- Opportunity location types are bounded to the public option set.
- Public activity log writes use `actor_type = "public"` and are isolated so a saved primary submission is not reported as failed only because activity logging failed.
- Public opportunity listings fail closed to the empty state if the local database is unavailable.

## Verification Passed In Task 5

Commands run and passed:

```bash
npm run test -- src/tests/features/public-actions.test.ts
npm run test -- src/tests/content/site-content.test.ts
npm run typecheck
npm run lint
npm run build
```

Browser verification was run on:

- `/contact`
- `/submit-opportunity`
- `/business-solutions`
- `/placement-estimate`

Desktop and 390px mobile checks confirmed:

- meaningful page content renders,
- no framework overlays,
- no error-level console logs,
- no horizontal overflow,
- public acquisition paths are visible,
- visible form labels render,
- honeypot inputs are hidden from normal users with `tabIndex={-1}` and `autoComplete="off"`,
- invalid contact, waitlist, and opportunity submissions render field-level error states,
- no public text leaks the blocked wording: admin, dashboard, score, forecast configuration, export, activity log, application tracking, internal, CRM.

Local environment note: no local Supabase CLI, Docker, or `psql` was available in the Task 5 session, so browser QA could not perform real database-backed success submissions. Server action success paths were covered with mocked DB query helpers in Vitest.

## Required Skills

Use relevant skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:test-driven-development`
- `superpowers:verification-before-completion`
- `supabase:supabase` before schema, migration, DB query, RLS, or Supabase CLI work
- `build-web-apps:frontend-app-builder` for the public placement estimate UX integration
- `ui-ux-pro-max` if making placement-estimate public UX decisions beyond straightforward form wiring

## Task 6 Scope

Implement Task 6 only:

- Modify `src/features/forecasting/schemas.ts`.
- Create `src/features/forecasting/actions.ts`.
- Create `src/components/public/PlacementEstimateForm.tsx`.
- Update `src/app/(public)/placement-estimate/page.tsx`.
- Modify `src/db/queries/forecasts.ts`.
- Modify `src/db/queries/opportunities.ts` only as needed for placement estimate persistence.
- Create the Task 6 seed migration using the Supabase CLI path specified in the implementation plan.

Do not expose public wording or controls for forecast configuration, internal multipliers, private dashboards, exports, application tracking, scoring models, audit logs, or admin routes.

## Task 6 Implementation Reminders

- Use TDD first.
- Seed one active forecast config/version using configurable assumptions, not hard-coded engine assumptions.
- `runPlacementEstimateAction` should validate public input, fetch the active config version, call `calculateForecast`, persist the calculator submission and forecast run, and return public-safe results.
- Public output may include demand estimate, revenue estimate, recommended machine count, opportunity score/rating, confidence, and reasoning.
- Do not expose editable assumptions or individual internal multipliers publicly.
- Keep `/placement-estimate` visually consistent with the Task 4/5 dark ProBlend public design.

## Required Verification For Task 6

Run at minimum:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts
npm run typecheck
npm run lint
npm run build
```

Also run browser verification on `/placement-estimate` at desktop and 390px mobile:

- Form labels visible and not clipped.
- No horizontal overflow.
- Loading, success, and error states render.
- Output renders after a valid estimate.
- No public forecast configuration controls or private/admin wording appear.

Commit Task 6 separately with:

```bash
git add src/features/forecasting src/components/public/PlacementEstimateForm.tsx 'src/app/(public)/placement-estimate' supabase/migrations src/db/queries docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "feat: add placement estimate forecasting flow"
```
