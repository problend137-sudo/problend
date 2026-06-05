# Next Session Prompt: Task 5 Public Forms And Server-Side Acquisition Actions

Paste this prompt into the next Codex session.

---

You are continuing work in `/Users/hemishbiswas/Documents/problend` on the ProBlend Digital Operating System.

Task 4 has now been redone. Do **not** redo Task 4 again unless verification shows a regression. Start the next session from:

- Latest Task 4 redo commit: `150b1f43ee220a413baee90d6a28db2449bfad12`
- Commit message: `fix: redo ProBlend public website visual direction`

Your job is **Task 5: Public Forms And Server-Side Acquisition Actions** from `docs/superpowers/plans/2026-06-05-problend-digital-operating-system-implementation.md`.

Do not one-shot the whole product. Do not continue into Task 6 forecasting persistence, admin auth, dashboards, exports, or any Task 6+ behavior.

## What Was Redone In Task 4

Task 4 was redone as a real image-led ProBlend public website:

- Replaced the fake CSS vending-machine home hero with the original ProBlend gym/machine visual.
- Downloaded original public-site images into `public/images/problend/`.
- Added `src/content/assets.ts` as the public asset manifest.
- Replaced the generic `PB` square with the extracted/cropped real ProBlend logo.
- Rebuilt `/`, `/about`, `/how-it-works`, `/product-offerings`, `/business-solutions`, `/contact`, `/placement-estimate`, and `/submit-opportunity`.
- Added shared public presentation components:
  - `src/components/public/PublicLink.tsx`
  - `src/components/public/PublicPageHero.tsx`
  - `src/components/public/ProductFlavorCard.tsx`
- Kept legal pages quiet and footer-accessible.
- Preserved original public nav labels and official contact details.
- Kept Task 5 pages static only; no public form actions were implemented in Task 4.

## Screenshots Captured

Use these for visual context:

- Original Wix reference: `/tmp/problend-original-home.png`
- Old rebuilt before state: `/tmp/problend-current-home.png`
- Redone desktop home: `/tmp/problend-redone-home-1280.png`
- Redone mobile home: `/tmp/problend-redone-home-390.png`

The final visual inspection compared the original, old current, redone desktop, and redone mobile screenshots. Desktop and mobile looked like a ProBlend public site again, not a generic dark card grid.

## Verification Status From Task 4 Redo

All commands below passed after the final edits:

```bash
npm run test -- src/tests/content/site-content.test.ts
npm run typecheck
npm run lint
npm run build
```

Exact status:

- Content test: PASS, 1 file, 6 tests.
- Typecheck: PASS.
- Lint: PASS.
- Build: PASS, 14 static app routes generated.
- Home console health check: PASS, `messages: []`.

Final Playwright route audit passed:

```json
[
  { "route": "/", "h1": "Fuel your fitness, one shake at a time.", "imageCount": 13, "horizontalOverflow": false, "privateLeak": false },
  { "route": "/about", "h1": "About ProBlend", "imageCount": 4, "horizontalOverflow": false, "privateLeak": false },
  { "route": "/how-it-works", "h1": "How It Works", "imageCount": 7, "horizontalOverflow": false, "privateLeak": false },
  { "route": "/product-offerings", "h1": "Product Offerings", "imageCount": 8, "horizontalOverflow": false, "privateLeak": false },
  { "route": "/business-solutions", "h1": "Business Solutions", "imageCount": 4, "horizontalOverflow": false, "privateLeak": false },
  { "route": "/contact", "h1": "Contact Us", "imageCount": 4, "horizontalOverflow": false, "privateLeak": false }
]
```

## Files Created Or Modified In Task 4 Redo

Created:

- `src/content/assets.ts`
- `src/components/public/PublicLink.tsx`
- `src/components/public/PublicPageHero.tsx`
- `src/components/public/ProductFlavorCard.tsx`
- `public/images/problend/behind-scenes.jpg`
- `public/images/problend/hero-gym-machine.jpg`
- `public/images/problend/machine-closeup.jpg`
- `public/images/problend/machine-front.jpg`
- `public/images/problend/machine-interaction.jpg`
- `public/images/problend/machine-purchase.jpg`
- `public/images/problend/problend-logo.jpg`
- `public/images/problend/problend-logo-cropped.jpg`
- `public/images/problend/protein-powder.jpg`

Modified:

- `src/app/(public)/page.tsx`
- `src/app/(public)/about/page.tsx`
- `src/app/(public)/how-it-works/page.tsx`
- `src/app/(public)/product-offerings/page.tsx`
- `src/app/(public)/business-solutions/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/app/(public)/placement-estimate/page.tsx`
- `src/app/(public)/submit-opportunity/page.tsx`
- `src/components/public/PublicHeader.tsx`
- `src/components/public/PublicFooter.tsx`
- `src/content/products.ts`
- `src/app/globals.css`
- `src/tests/content/site-content.test.ts`

## Blockers Or Deviations

- Higgsfield account status was checked: `problend137@gmail.com — free plan, 0 credits`. No generated assets were used.
- Original Wix images were downloaded and committed instead of hotlinked.
- Original ProBlend did not expose four distinct flavour product photos. Product Offerings uses the four real ProBlend flavour names with local ProBlend imagery, flavour color accents, and product nutrition/content; do not migrate Wix demo-store products.
- Browser/in-app browser text proof worked, but Browser screenshot capture timed out once, so Playwright was used for final screenshots and route audit.

## Mandatory Skills And Workflow For Task 5

Use the required Superpowers workflow:

- Use `superpowers:subagent-driven-development`.
- Use sub-agents for independent work. At minimum:
  - One sub-agent to inspect existing DB/query/schema context for public submission writes.
  - One sub-agent to review Task 5 schema/action requirements before implementation.
  - One sub-agent to review final tests/diff for public form scope and private-leak risk.
- Use `superpowers:test-driven-development` for public action schemas/actions.
- Use `supabase:supabase` before any Supabase-related schema, migration, RLS, or CLI work.
- Use `superpowers:verification-before-completion` before claiming work is complete.
- Use Browser or Playwright verification after rendered form pages are wired.

If a named skill is unavailable, state that briefly and continue with the closest available workflow.

## Supabase Context

Use `npx supabase`, not a global `supabase` binary.

- Project URL: `https://tueqoqusbxeldxnnarlv.supabase.co`
- Project ref: `tueqoqusbxeldxnnarlv`
- Organization id: `xgejdxtkxjnrwdnocjzn`
- Region: `South Asia (Mumbai)`
- Region code: `ap-south-1`

Read `docs/supabase.md` before any Supabase work.

## Task 5 Scope

Implement only **Task 5: Public Forms And Server-Side Acquisition Actions**.

Files from the plan:

- Create `src/features/contacts/schemas.ts`
- Create `src/features/contacts/actions.ts`
- Create `src/features/opportunities/schemas.ts`
- Create `src/features/opportunities/actions.ts`
- Create `src/features/waitlists/schemas.ts`
- Create `src/features/waitlists/actions.ts`
- Create `src/lib/request.ts`
- Create `src/components/public/ContactForm.tsx`
- Create `src/components/public/OpportunityForm.tsx`
- Create `src/components/public/OpportunityPostList.tsx`
- Create `src/tests/features/public-actions.test.ts`

Task 5 requirements:

- Write public action/schema tests first.
- Create request metadata helper using `next/headers`.
- Create Zod schemas for contact, opportunity, opportunity application, and waitlist.
- Honeypot fields must only accept empty string or undefined.
- Implement server actions that parse input, reject bot-filled honeypots, write through relevant `src/db/queries/*` functions, write `activity_logs` with `actor_type = 'public'`, and return serializable action-result unions.
- Build form components with visible labels, autocomplete, 44px minimum touch targets, loading/success/error states, and hidden honeypot fields.
- Wire `ContactForm` to `/contact`.
- Wire `OpportunityForm` to `/submit-opportunity`.
- Wire `OpportunityPostList` to `/business-solutions` and `/submit-opportunity`, rendering only published posts.
- Add small waitlist UI sections on `/business-solutions` and `/contact`, not in heroes.

Use these success messages exactly:

- Contact: `Thanks for submitting!`
- Opportunity: `Thanks. ProBlend has received the opportunity details.`
- Opportunity application: `Thanks. ProBlend has received your application.`
- Waitlist: `Thanks. ProBlend has recorded your city interest.`

## Task 5 Verification

Run at minimum:

```bash
npm run test -- src/tests/features/public-actions.test.ts
npm run typecheck
npm run lint
npm run build
```

Also run rendered verification on `/contact`, `/submit-opportunity`, and `/business-solutions` to confirm forms render, have no horizontal overflow, have no public private-system leaks, and preserve the Task 4 visual direction.

Commit Task 5 only after verification:

```bash
git add src/features/contacts src/features/opportunities src/features/waitlists src/lib/request.ts src/components/public src/app/\(public\) src/tests/features/public-actions.test.ts
git commit -m "feat: add public opportunity acquisition forms"
```
