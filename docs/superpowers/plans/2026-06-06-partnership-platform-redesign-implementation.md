# Partnership Platform Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fragmented public opportunity pages with one coherent Partnership Platform: a simple guided opportunity flow, a polished open-opportunities board, credibility proof, and database support for branch-specific submissions.

**Architecture:** Keep the existing Next.js App Router app and public route structure. Update Supabase/Drizzle schema fields to support the simplified guided flow, then refactor the public opportunity components around a single `OpportunityForm` branch flow and reusable board rows. Preserve server-side validation and private admin-review records.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, React server actions, Zod, Drizzle ORM, Supabase CLI migrations, Vitest, Browser/IAB verification.

---

## File Map

- Modify `src/db/schema.ts`: add opportunity kind/source/details fields, board status/order/close fields, and application source path.
- Create `supabase/migrations/*_partnership_platform_redesign.sql`: migration generated with `npx supabase migration new`.
- Modify `src/features/opportunities/schemas.ts`: add branch-aware opportunity submission schema and source path for applications.
- Modify `src/features/opportunities/actions.ts`: persist opportunity kind/source/details, return simpler success copy, and submit application source path.
- Modify `src/db/queries/opportunities.ts`: list only published open posts in display order.
- Modify `src/components/public/OpportunityForm.tsx`: replace separate partner/venue wizard with one guided branch form.
- Modify `src/components/public/OpportunityPostList.tsx`: render compact board rows and empty state.
- Modify `src/components/public/OpportunityApplicationForm.tsx`: align form copy and styling with board response flow.
- Modify `src/app/(public)/business-solutions/page.tsx`: become Partnership Platform page.
- Modify shortcut pages under `src/app/(public)/partner-with-problend`, `submit-venue`, `published-opportunities`, and `city-waitlist` as needed.
- Modify `src/content/site.ts`: update nav label, CTAs, metadata, platform copy, and contact typo if touched by the UI.
- Modify `src/tests/content/site-content.test.ts`: assert approved platform copy and labels.
- Modify `src/tests/features/public-actions.test.ts`: add branch schema/action tests.

## Task 1: Schema And Query Support

- [ ] **Step 1: Write failing tests** in `src/tests/features/public-actions.test.ts` proving a venue submission with `opportunityKind: "venue"` parses, a city/network submission with no venue-only fields parses, an invalid kind fails, and opportunity applications preserve `sourcePath`.
- [ ] **Step 2: Run RED** with `npm run test -- src/tests/features/public-actions.test.ts`; expect failures around unknown `opportunityKind` and application `sourcePath`.
- [ ] **Step 3: Create migration via CLI** with `npx supabase migration new partnership_platform_redesign`.
- [ ] **Step 4: Fill migration SQL** to add `opportunity_kind`, `source_path`, `details`, `opportunity_posts.status`, `display_order`, `closes_at`, and `opportunity_applications.source_path`; add checks and indexes.
- [ ] **Step 5: Update Drizzle schema** with matching fields and checks.
- [ ] **Step 6: Update query helpers** so public board posts are `is_published = true` and `status = 'open'`, ordered by `display_order`, `published_at`, then creation time.
- [ ] **Step 7: Update schemas/actions** so branch-specific validation happens in Zod and persistence writes the new fields.
- [ ] **Step 8: Run GREEN** with `npm run test -- src/tests/features/public-actions.test.ts` and `npm run typecheck`.

## Task 2: Content And Routing

- [ ] **Step 1: Write failing content assertions** in `src/tests/content/site-content.test.ts` for nav label `Partnership Platform`, headline `Help bring ProBlend to the right place.`, CTAs `Share an opportunity` and `See open opportunities`, and removal of internal words.
- [ ] **Step 2: Run RED** with `npm run test -- src/tests/content/site-content.test.ts`; expect label/copy failures.
- [ ] **Step 3: Update `src/content/site.ts`** with approved simple copy and route metadata.
- [ ] **Step 4: Update public route pages** so `/business-solutions` is the primary platform page and shortcut routes use the same form/board components.
- [ ] **Step 5: Run GREEN** with `npm run test -- src/tests/content/site-content.test.ts` and `npm run typecheck`.

## Task 3: Guided Form UI

- [ ] **Step 1: Implement `OpportunityForm`** as one guided branch flow: `What do you have?`, branch details, contact, notes/submit.
- [ ] **Step 2: Keep branch fields relevant** by showing only the selected branch fields and storing branch-specific context in `details`.
- [ ] **Step 3: Add accessible labels, status messaging, back/next controls, loading, success, and error states.**
- [ ] **Step 4: Run verification** with `npm run test -- src/tests/features/public-actions.test.ts`, `npm run typecheck`.

## Task 4: Board And Platform Page UI

- [ ] **Step 1: Refactor `OpportunityPostList`** into a compact board with rows, metadata, empty state, and response form.
- [ ] **Step 2: Refactor `/business-solutions`** into the hybrid product surface: dark ProBlend shell, light platform panels, guided form, board, and credibility image strip.
- [ ] **Step 3: Update `OpportunityApplicationForm`** with simple board-response copy and `sourcePath`.
- [ ] **Step 4: Verify desktop/mobile with Browser/IAB** and fix layout issues before finishing.

## Task 5: Final Verification

- [ ] **Step 1: Run tests**: `npm run test -- src/tests/content/site-content.test.ts src/tests/features/public-actions.test.ts`.
- [ ] **Step 2: Run `npm run typecheck`.**
- [ ] **Step 3: Run `npm run build`.**
- [ ] **Step 4: Run local app and browser-check `/business-solutions`, `/published-opportunities`, `/partner-with-problend`, `/submit-venue`, and mobile `/business-solutions`.**
- [ ] **Step 5: Review `git diff --check` and final `git status --short`.**
