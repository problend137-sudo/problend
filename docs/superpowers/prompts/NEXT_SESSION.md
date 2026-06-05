# Next Session Prompt: ProBlend Digital OS Task 5

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Your job in this session is to implement exactly one bounded part of the implementation plan, verify it, commit it, and then write the prompt for the next session based on what actually happened.

Do not try to one-shot the whole product.

## Latest Completed Work

- Current branch when this prompt was written: `codex/task-3-forecasting-engine`
- Latest completed implementation commit hash when this prompt was written: `276a38eefbc7139eed0876a9fea49f960e79eb40`
- Completed task: `Task 4: Content System, Public Routes, And Legal Pages`
- Commit message: `feat: rebuild ProBlend public content structure`
- Previous completed implementation commit: `f51f679b1c9f6e91fff697cb4948cc70c0f7f9b9`

## What Changed In Task 4

Created:

- `src/content/site.ts`
- `src/content/products.ts`
- `src/content/legal.ts`
- `src/content/case-studies.ts`
- `src/components/public/PublicHeader.tsx`
- `src/components/public/PublicFooter.tsx`
- `src/components/public/PolicyPage.tsx`
- `src/app/(public)/layout.tsx`
- `src/app/(public)/page.tsx`
- `src/app/(public)/about/page.tsx`
- `src/app/(public)/how-it-works/page.tsx`
- `src/app/(public)/product-offerings/page.tsx`
- `src/app/(public)/business-solutions/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/app/(public)/placement-estimate/page.tsx`
- `src/app/(public)/submit-opportunity/page.tsx`
- `src/app/(public)/privacy-policy/page.tsx`
- `src/app/(public)/terms-and-conditions/page.tsx`
- `src/app/(public)/cancellation-and-refunds/page.tsx`
- `src/app/(public)/shipping-policy/page.tsx`
- `src/tests/content/site-content.test.ts`

Task 4 intentionally did not implement public form actions, server actions, placement-estimate persistence, opportunity persistence, database writes, admin auth, dashboards, exports, migrations, or Task 5+ behavior.

## Task 4 Implementation Notes

- Content preservation tests were written first and verified red before content modules existed.
- `site.ts` centralizes preserved public copy, contact details, nav, CTAs, working hours, how-it-works steps, machine capabilities, venue types, placement models, static current collaboration needs, and route metadata.
- `products.ts` includes only the four real ProBlend products from the plan and excludes Wix demo-store products.
- `legal.ts` includes four policy page objects and uses India/New Delhi jurisdiction language for the previously incomplete terms tokens.
- `case-studies.ts` remains an empty CMS-ready export.
- Public layout renders `PublicHeader`, page content, and `PublicFooter`.
- The public header preserves original navigation labels and includes a restrained text-link CTA to `/submit-opportunity`.
- The public footer includes contact details, working hours, and the four official policy links.
- `/placement-estimate` and `/submit-opportunity` were added as static route shells only because the product spec includes them and the public header/business CTAs link to them. They contain no forms, actions, scoring, forecast output, database calls, persistence, or admin behavior.
- `Current collaboration needs` is static public content for Task 4. It is not backed by `opportunity_posts` yet.
- The contact page includes the original field names as static message-detail blocks and contact information. It does not include a functional form.
- A completion review sub-agent found no blocking issues. A non-blocking legal-page `page!` hardening note was fixed by making `getLegalPage` throw clearly on missing legal content and removing non-null assertions from policy routes.

## Verification From Task 4

Commands run in the Task 4 session:

- TDD red check, `npm run test -- src/tests/content/site-content.test.ts`: FAIL as expected before content modules existed. The first red failed because `@/content/site` did not exist; after adding extra assertions, the red failed because `@/content/case-studies` did not exist.
- Green content check, `npm run test -- src/tests/content/site-content.test.ts`: PASS, 1 test file and 5 tests.
- Final targeted check, `npm run test -- src/tests/content/site-content.test.ts`: PASS, 1 test file and 5 tests.
- Final `npm run typecheck`: PASS.
- Final `npm run lint`: PASS.
- Final full `npm run test`: PASS, 5 test files and 15 tests.
- Final `npm run build`: PASS. Build prerendered `/`, `/_not-found`, `/about`, `/business-solutions`, `/cancellation-and-refunds`, `/contact`, `/how-it-works`, `/placement-estimate`, `/privacy-policy`, `/product-offerings`, `/shipping-policy`, `/submit-opportunity`, and `/terms-and-conditions`.
- Browser plugin verification after `npm run dev`: PASS for `/`, `/about`, `/product-offerings`, `/business-solutions`, `/contact`, and `/privacy-policy`. Each route rendered with expected H1/title/ProBlend presence and no banned private terms among `admin dashboard`, `scoring`, `export tooling`, `audit logs`, `forecast configuration`, `forecast config`, or `internal route mechanics`.
- Browser mobile viewport check at width 390: PASS for `/` and `/business-solutions`; no horizontal overflow was reported.
- Browser screenshot capture timed out, so Playwright screenshot was used only as a fallback visual inspection artifact. The screenshot exposed home hero CTA crowding, which was fixed. Final visual inspection showed clear CTAs and the next section's top edge visible at `1280x720`.

## Deviations Or Notes

- The branch name remains `codex/task-3-forecasting-engine`; Task 4 was committed on that existing branch rather than creating a new branch.
- `build-web-apps:frontend-app-builder` was applied before public visual surfaces. Its referenced built-in image generation tool was not callable in this environment, so the approved design spec was used as the visual source of truth and browser/screenshot verification was used for presentation checks.
- `supabase:supabase` was not applied in Task 4 because no Supabase CLI/schema/migration/RLS/database work was performed.
- `next build` rewrote `next-env.d.ts` again; this generated churn was restored and not committed.
- `npm run dev` emitted an existing Next warning about `scroll-behavior: smooth` on `<html>`. It was not fixed in Task 4 because it would touch the root app layout/global behavior outside the bounded scope.
- No secrets were printed, invented, or committed. Nothing under `supabase/.temp` was committed.
- No blockers remain for Task 5.

## Mandatory Context For This Session

Read these files before editing:

1. `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
2. `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`
3. `docs/supabase.md`
4. `docs/superpowers/prompts/NEXT_SESSION.md`

Begin with:

`Task 5: Public Forms And Server-Side Acquisition Actions`

from:

`docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`

Do not implement Task 6 or any later task in this session.

## Mandatory Skills And Agents

You must explicitly use:

- `superpowers:subagent-driven-development` for the implementation workflow.
- Sub-agents for independent work. For Task 5, use at least two sub-agents:
  - One sub-agent to review the public-form/action plan before implementation.
  - One sub-agent to review the completed public-form/action diff and verification evidence before finalizing.
- `superpowers:test-driven-development` before writing schemas/actions.
- `superpowers:verification-before-completion` before claiming anything is complete.
- `build-web-apps:frontend-app-builder` before implementing or replacing public form UI surfaces.
- Browser plugin verification after starting the local app for the public form pages, unless a blocker prevents it.
- `supabase:supabase` before Supabase CLI/schema/migration/RLS/database work. Task 5 writes through existing query modules, so inspect whether live Supabase/schema work is actually needed before invoking Supabase tools.

If a named skill is unavailable, state that briefly and continue with the closest available workflow.

## Product Guardrails

Keep these constraints active:

- Public website must remain recognizably ProBlend, not a generic AI/SaaS template.
- Public pages must not expose admin dashboards, scoring internals, export tooling, audit logs, forecast configuration, or internal route mechanics.
- Typography direction remains Barlow Condensed for display and Barlow for body/UI.
- Supabase is Mumbai project `tueqoqusbxeldxnnarlv`.
- No public visitor accounts. V1 uses built-in admin auth later, not Clerk/Auth0.
- Public forms must use visible labels, accessible fields, honeypot protection, Zod validation, and serializable action results.
- Public pages may show ProBlend product story, flavours, machine capabilities, hygiene, automation, cashless payments, GPRS tracking, inventory monitoring, analytics as a partner benefit, placement models, and contact details.
- Public pages must not show private scoring configuration, forecast assumption management, admin export/audit tooling, or internal route mechanics.
- Do not migrate Wix demo-store products as real ProBlend products.

## Task 5 Scope

Implement only:

`Task 5: Public Forms And Server-Side Acquisition Actions`

Expected output of this session:

- `src/features/contacts/schemas.ts`
- `src/features/contacts/actions.ts`
- `src/features/opportunities/schemas.ts`
- `src/features/opportunities/actions.ts`
- `src/features/waitlists/schemas.ts`
- `src/features/waitlists/actions.ts`
- `src/lib/request.ts`
- `src/components/public/ContactForm.tsx`
- `src/components/public/OpportunityForm.tsx`
- `src/components/public/OpportunityPostList.tsx`
- `src/tests/features/public-actions.test.ts`
- Route/page updates needed to wire those forms/lists into the existing Task 4 public pages.

Do not implement placement-estimate forecasting, forecast persistence, forecast config seed migrations, admin auth, dashboards, exports, or Task 6+ behavior in this session.

## Required Execution Flow

1. Read the mandatory docs and confirm Task 5 scope.
2. Check git status. Do not overwrite unrelated user changes.
3. Use the required skills and sub-agents.
4. Write `src/tests/features/public-actions.test.ts` first from the Task 5 plan.
5. Run:

```bash
npm run test -- src/tests/features/public-actions.test.ts
```

Expected before implementation: tests fail because public action schemas/actions do not exist.

6. Implement only the Task 5 schemas, request helper, server actions, form components, opportunity post list, and public page wiring.
7. Ensure the contact form replaces the static contact message-detail block from Task 4, the opportunity form wires into `/submit-opportunity`, `OpportunityPostList` appears on `/business-solutions` and `/submit-opportunity`, and waitlist UI appears as a small section on `/business-solutions` and `/contact`.
8. Keep `/placement-estimate` static; Task 6 owns the real placement estimate flow.
9. Run:

```bash
npm run test -- src/tests/features/public-actions.test.ts
npm run typecheck
npm run build
```

10. Start the dev server and use Browser/in-app browser verification for `/contact`, `/submit-opportunity`, and `/business-solutions`. Confirm forms render with visible labels and no private admin/scoring/export/audit/forecast-configuration mechanics.
11. Run additional checks if shared code or query boundaries are touched:

```bash
npm run lint
npm run test
```

12. Fix any failures inside Task 5 scope.
13. Commit Task 5 with:

```bash
git add src/features/contacts src/features/opportunities src/features/waitlists src/lib/request.ts src/components/public src/app/\(public\) src/tests/features/public-actions.test.ts
git commit -m "feat: add public opportunity acquisition forms"
```

14. Create or overwrite `docs/superpowers/prompts/NEXT_SESSION.md` with the next paste-ready prompt, including what actually happened, verification status, commit hash or hashes, blockers/deviations, and the next implementation-plan task.
15. Commit the handoff file with:

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
