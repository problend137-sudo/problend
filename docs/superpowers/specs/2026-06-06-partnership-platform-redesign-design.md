# ProBlend Partnership Platform Redesign

## Status

Approved brainstorming direction from 2026-06-06.

This spec replaces the current blocky public opportunity pages with one coherent Partnership Platform surface. The platform is the main product experience. Business-solution content becomes supporting information and credibility proof.

## Problem

The current Business Solutions / Opportunity Platform / Partner pages feel like separate fragments:

- The public page behaves like a route hub with four equal cards.
- The language sounds internal: "pathways", "intent", "published opportunity response", "clearly routed".
- The forms contain useful fields, but the experience does not feel like a simple platform flow.
- The board for ProBlend-posted opportunities exists as a concept, but it does not yet feel like a polished site board.
- The dark visual system is overused, making the surface feel heavy and blocky.

The redesign must make the Partnership Platform feel like an actual usable component of the website.

## Product Direction

Use one primary public surface: **Partnership Platform**.

The platform combines two jobs:

1. Let anyone share a venue, city, network, or introduction with ProBlend.
2. Let visitors browse and respond to specific open opportunities published by ProBlend.

The first job is primary. The public board is important but secondary.

The platform speaks to anyone with useful access:

- Venue owners or managers
- Gym, campus, office, hospital, retail, or residential-community contacts
- Operators
- Distributors
- Strategic introducers
- Institutions and companies
- People who know a city or network ProBlend should enter

No public account system is included in this redesign.

## Route And Navigation

The main nav/page label should be **Partnership Platform**.

The current `/business-solutions` route should become the Partnership Platform page. Existing shortcut routes can remain, but they should point into the same guided experience rather than feeling like separate products.

Recommended route behavior:

- `/business-solutions`: primary Partnership Platform page.
- `/partner-with-problend`: shortcut into the guided flow, preselecting the non-venue partnership branch when useful.
- `/submit-venue`: shortcut into the guided flow, preselecting the venue branch when useful.
- `/published-opportunities`: optional board-focused route using the same board component.
- `/city-waitlist`: can remain if needed, but city/network demand should also be supported inside the main guided flow.

## Page Structure

### First Screen

The first screen should introduce the platform and immediately offer the two core actions.

Approved simple copy:

- Headline: **Help bring ProBlend to the right place.**
- Support: **Share a venue, city, network, or introduction. We'll review it and get back if it fits.**
- Primary CTA: **Share an opportunity**
- Secondary CTA: **See open opportunities**

The first screen should also show the beginning of the guided flow, not just a button leading elsewhere.

First prompt:

**What do you have?**

Options:

- A venue
- A city or network
- An introduction
- An open ProBlend brief to answer

### Open Opportunities Board

Include a compact, polished board below or alongside the first screen.

Approved simple copy:

- Title: **Open Opportunities**
- Body: **Places and partners ProBlend is looking for right now.**
- Empty state: **No open opportunities right now. You can still share one with us.**

The board should use dense listings or horizontal brief rows, not large marketing cards.

Each listing should show:

- Brief title
- Category
- Location or scope
- Commercial model, if relevant
- Short summary
- One clear action: **View brief** or **Respond**

### Credibility Section

Fold the old Business Solutions content into a short credibility section after the platform actions.

Approved simple copy:

**You bring access. ProBlend brings the machine, setup, stocking, cleaning, payments, and support.**

Use a few real or generated ProBlend machine/venue images to support credibility. The images should show the actual machine, usage, placement, or operations. Avoid generic decorative media.

Proof points may include:

- Installed in active spaces
- Cashless machine operation
- ProBlend handles setup, stocking, cleaning, and maintenance
- Suitable for gyms, campuses, offices, residences, and other high-footfall locations

This section is informational. It must not compete with the platform flow.

## Visual Direction

Use a **hybrid product surface**.

Dark ProBlend shell:

- Preserve the dark header and athletic ProBlend brand mood.
- Use machine and venue imagery for credibility and atmosphere.
- Keep the page recognizably ProBlend.

Light platform panels:

- The guided flow and board should use a clean off-white/slate product UI.
- Use crisp borders, readable type, and restrained accents.
- Keep cards and panels at 6px radius or less.
- Avoid nested cards.
- Avoid heavy shadows, generic SaaS gradients, decorative blobs, and large card walls.

The page should feel like a useful operating surface inside the ProBlend brand world.

## Copy Rules

Use simple public language.

Avoid:

- intake
- pathway
- intent
- public opportunity response
- clearly routed
- relationship to ProBlend
- real commercial next step

Prefer:

- share
- opportunity
- venue
- city
- network
- introduction
- open opportunities
- we'll review it
- get back if it fits

Buttons should describe the action in plain language:

- Share an opportunity
- See open opportunities
- Respond
- Back
- Next
- Submit

## Guided Form Flow

Use one guided form embedded in the Partnership Platform page.

Step 1: **What do you have?**

- Venue
- City or network
- Introduction
- Open ProBlend brief

Step 2: Ask only fields relevant to the selected answer.

Venue branch:

- Venue type
- City/state/area
- Who the submitter knows there
- Footfall, space, and readiness if known

City or network branch:

- City or region
- Network type
- Approximate reach
- How the submitter can help open access

Introduction branch:

- Person, organization, or decision-maker type
- City/organization if known
- Relationship strength
- What introduction can be made

Open brief branch:

- Selected published brief
- Contact details
- Short response

Step 3: Contact details.

Step 4: Optional notes and submit.

The flow should feel compact and calm. It should not visually expose every possible field at once. It should not ask irrelevant questions just because the old schema requires them.

## Database And Supabase CLI

Implementation is allowed to change the database as required, using Supabase CLI migrations.

The new flow should not be forced around the old schema. The implementation should make the minimum database changes needed so the public form can ask only relevant questions.

Required schema direction:

- Add `opportunities.opportunity_kind` as text with allowed values `venue`, `city_network`, and `introduction`.
- Add `opportunities.source_path` so the entry page is stored on the submission itself, not only in activity metadata.
- Add `opportunities.details` as JSONB with a default empty object for branch-specific context that should not become many sparse columns.
- Make branch-specific fields nullable when they do not apply to every opportunity kind. Requiredness belongs in the branch-specific Zod/server-action validation.
- Keep existing core admin-review fields where they still serve qualification, filtering, or scoring.
- Keep `opportunity_applications` for responses to published briefs.
- Add `opportunity_applications.source_path`.
- Add board-management fields to `opportunity_posts`: `status` with values `draft`, `open`, `closed`, `archived`; `display_order`; and nullable `closes_at`.
- Public board listings should come from `opportunity_posts` where `is_published = true` and `status = 'open'`.

Supabase implementation requirements:

- Use the Supabase skill and check current Supabase CLI help before changing schema.
- Use Supabase CLI migration workflow; create migrations through the CLI rather than inventing migration filenames.
- Keep RLS enabled for public-schema tables.
- Keep public writes server-side through validated Server Actions or route handlers.
- Do not expose service-role keys or private admin mechanics to the browser.
- Verify migrations locally or against the intended Supabase environment before claiming the database change is complete.

## Component Direction

Recommended components:

- `PartnershipPlatformHero`
- `OpportunityTypeSelector`
- `GuidedOpportunityForm`
- `OpenOpportunityBoard`
- `PlatformCredibilityStrip`
- `OpportunityBriefRow`
- `OpportunityBranchFields`

Existing components can be reused if they are simplified. The old separate `OpportunityForm` modes should not dictate the new product structure if they keep the experience fragmented.

## States

The platform must handle:

- Published board state
- Empty board state
- Board query failure state
- Guided form step progress
- Back/next navigation
- Branch-specific validation errors
- Submit loading
- Submit success
- Submit failure

Success copy should stay simple:

**Thanks. We've received it and will review it.**

## Testing And Verification

Update or add tests for:

- New public nav/page label
- Approved simple copy
- Published opportunity board state
- Empty opportunity board state
- Guided form branch parsing
- Opportunity submission actions
- Opportunity application actions
- Any database schema changes and query changes

Browser verification must cover:

- Desktop Partnership Platform
- Mobile Partnership Platform
- Empty board state
- At least one published board listing
- Venue branch
- City/network branch
- Introduction branch
- Open brief response branch

The final UI should be checked at 375px, 768px, 1024px, and desktop width.

## Out Of Scope

- Public partner login
- Public dashboards
- Public opportunity scoring
- Public forecast assumptions
- Admin dashboard redesign
- Complex marketplace bidding
- Long-form Business Solutions marketing page

## Acceptance Criteria

- The Partnership Platform feels like one coherent product surface.
- The first screen makes the main action obvious.
- Copy is simple and public-facing.
- The board feels like a polished ProBlend site board.
- Business-solution information supports credibility without becoming the page.
- The guided flow only asks relevant questions.
- Database changes, if needed, are handled through Supabase CLI migrations.
- Public pages do not reveal private admin, scoring, export, audit, or forecast-configuration mechanics.
