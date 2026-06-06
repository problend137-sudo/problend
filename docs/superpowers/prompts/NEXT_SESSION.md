# Next Session Prompt: Task 5 Public Forms

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Task 4, the public website redo, was completed and verified in the previous session. Do not redesign the public website again unless the user explicitly reports a Task 4 regression. Preserve the dark, image-led public design, exact live-site copy, generated ProBlend imagery, GSAP reduced-motion behavior, legacy Wix redirects, and public/private boundary established by Task 4.

Your job in this session is to implement **Task 5: Public Forms And Server-Side Acquisition Actions** from `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`.

Do not proceed to Task 6 placement estimate persistence, forecasting persistence, admin auth, dashboards, exports, private/admin pages, or forecast configuration work.

## Current Verified Baseline

Task 4 passed:

- `npm run test -- src/tests/content/site-content.test.ts`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Playwright audit across `/`, `/about`, `/how-it-works`, `/product-offerings`, `/business-solutions`, `/contact`, all legal pages, mobile/desktop, reduced motion, and legacy paths.

Final screenshots were inspected at:

- `/Users/hemishbiswas/Documents/problend/tmp/problend-task4-screenshots/desktop-home.png`
- `/Users/hemishbiswas/Documents/problend/tmp/problend-task4-screenshots/mobile-home.png`
- `/Users/hemishbiswas/Documents/problend/tmp/problend-task4-screenshots/product-offerings.png`
- `/Users/hemishbiswas/Documents/problend/tmp/problend-task4-screenshots/business-solutions.png`
- `/Users/hemishbiswas/Documents/problend/tmp/problend-task4-screenshots/how-it-works.png`

## Required Skills

Use these skills explicitly:

- `superpowers:using-superpowers`
- `superpowers:test-driven-development`
- `superpowers:verification-before-completion`
- `build-web-apps:frontend-app-builder` for public form UX integration
- `supabase:supabase` before any schema, DB query, RLS, migration, or Supabase CLI work

Use sub-agents if they can review independent slices, especially form validation, server-action persistence, and rendered mobile form QA. Do not let sub-agents edit overlapping files unless assigned explicitly.

## Source Files To Read First

- `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`, Task 5 section
- `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`, public forms sections
- `src/content/site.ts`
- `src/content/assets.ts`
- `src/app/(public)/contact/page.tsx`
- `src/app/(public)/business-solutions/page.tsx`
- `src/app/(public)/submit-opportunity/page.tsx`
- Existing DB query modules under `src/db/queries/`
- Existing DB schema in `src/db/schema.ts`

## Task 5 Scope

Implement public acquisition forms and server-side actions only:

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

Preserve the public copy already locked in Task 4. Contact form labels must remain:

- `First Name`
- `Last Name`
- `Email`
- `Message`
- `Send`

Contact success copy must remain:

- `Thanks for submitting!`

Other Task 5 success messages from the implementation plan:

- Contact: `Thanks for submitting!`
- Opportunity: `Thanks. ProBlend has received the opportunity details.`
- Opportunity application: `Thanks. ProBlend has received your application.`
- Waitlist: `Thanks. ProBlend has recorded your city interest.`

## Implementation Requirements

Use TDD:

1. Add `src/tests/features/public-actions.test.ts` first.
2. Cover valid and invalid Zod parsing for contact, opportunity, opportunity application, and waitlist schemas.
3. Cover honeypot rejection.
4. Cover action result shape and field error behavior using mocked DB query helpers if direct DB writes are not available in test.

Create `src/lib/request.ts` with the request metadata helper from the implementation plan.

Server actions must:

1. Parse input with Zod.
2. Reject filled honeypot fields.
3. Write through the relevant `src/db/queries/*` helper, creating a small query helper only if the existing DB layer lacks one.
4. Write an `activity_logs` row with `actor_type = "public"` when the schema/query layer supports it.
5. Return a serializable union:

```ts
type ActionResult =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string };
```

Form components must have:

- Visible labels, not placeholder-only fields.
- `autocomplete` attributes for name, email, phone, organization, and address-like fields.
- 44px minimum touch targets.
- Loading, success, and error states.
- Hidden honeypot input with `tabIndex={-1}` and `autoComplete="off"`.
- Mobile-first layout with no horizontal overflow at 390px.
- Styling consistent with the Task 4 public design: dark-first, low-radius, restrained, no generic SaaS dashboard cards.

Wire forms:

- `ContactForm` on `/contact`.
- `OpportunityForm` on `/submit-opportunity`.
- `OpportunityPostList` on `/business-solutions` and `/submit-opportunity`, rendering only published posts.
- Waitlist form as a small section on `/business-solutions` and `/contact`, not in either hero.

Do not expose internal admin labels such as scoring, dashboard, export, forecast config, application tracking, or private route names on public pages.

## Verification

Run:

```bash
npm run test -- src/tests/features/public-actions.test.ts
npm run test -- src/tests/content/site-content.test.ts
npm run typecheck
npm run lint
npm run build
```

Then run browser or Playwright verification on:

- `/contact`
- `/submit-opportunity`
- `/business-solutions`

Check desktop and 390px mobile:

- Labels are visible and not clipped.
- Honeypot fields are hidden from normal users.
- Success/error/loading states render.
- No horizontal overflow.
- No console errors.
- No internal/admin/private-system leaks.
- Public Task 4 copy and visual hierarchy are preserved.

## Commit

After verification passes, commit with:

```bash
git add src/features/contacts src/features/opportunities src/features/waitlists src/lib/request.ts src/components/public 'src/app/(public)' src/tests/features/public-actions.test.ts docs/superpowers/prompts/NEXT_SESSION.md
git commit -m "feat: add public opportunity acquisition forms"
```

Finally, update `docs/superpowers/prompts/NEXT_SESSION.md` based on what actually happened in Task 5.
