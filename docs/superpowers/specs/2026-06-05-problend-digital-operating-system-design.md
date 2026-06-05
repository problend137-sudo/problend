# ProBlend Digital Operating System Design

## Status

Approved direction as of 2026-06-05:

- Build the Operating System MVP, not the full future enterprise platform in one pass.
- Use Supabase Postgres as the data platform.
- Do not require public visitor accounts.
- Use built-in admin login for v1 instead of Clerk/Auth0/Supabase Auth.
- Public site direction: A+B hybrid, meaning current ProBlend identity preserved with stronger product and flavour storytelling.
- Typography: Barlow Condensed for headings, Barlow for body and UI.
- Public website must not expose internal admin, scoring, export, audit, or forecast-configuration mechanics.

## Product Goal

Build ProBlend's first digital operating system for national-scale opportunity acquisition and expansion management. The v1 product proves the core loop:

1. A public visitor learns what ProBlend offers.
2. A venue owner, entrepreneur, distributor, or institution submits a structured opportunity or runs a placement estimate.
3. ProBlend admins review, qualify, score, forecast, and manage that opportunity privately.
4. Every forecast is reproducible from stored inputs, outputs, assumptions, version, timestamp, and reasoning.

## Existing Website Audit

The current site is a Wix site at `https://www.problend.co.in`. It is treated as the business knowledge base. Business content is preserved, while execution and structure are upgraded.

### Current Pages

| Existing URL | Current Purpose | New Route |
| --- | --- | --- |
| `/` | Home | `/` |
| `/about-us` | Company story and contact form | `/about` |
| `/how-it-works-1` | Customer machine usage steps | `/how-it-works` |
| `/product-offerings` | Products, flavours, machine capabilities | `/product-offerings` |
| `/business-solutions` | B2B placement and partner offer | `/business-solutions` |
| `/contact-us` | Contact details and form | `/contact` |
| `/blank` | Privacy Policy | `/privacy-policy` |
| `/blank-2` | Terms & Conditions | `/terms-and-conditions` |
| `/cancellation-and-refunds` | Refund Policy | `/cancellation-and-refunds` |
| `/blank-4` | Shipping & Delivery Policy | `/shipping-policy` |
| `/category/all-products` and `/product-page/*` | Wix demo store products | Excluded from ProBlend product truth |

The Wix store contains demo products such as golf sweaters, baseball caps, vases, bags, eyeglasses, serums, diffusers, chairs, and t-shirts. These are not ProBlend business content and must not be migrated as real products.

### Current Navigation And CTAs

Current primary navigation:

- Home
- About Us
- How It Works
- Product Offerings
- Business Solutions
- More
- Contact Us

Current public CTAs and actions:

- `How it Works`
- `Explore Features`
- `Send`
- Contact/social links
- Footer policy links

New public CTAs:

- `Explore Product Offerings`
- `How It Works`
- `Run Placement Estimate`
- `Submit Opportunity`
- `Contact Us`

The main nav stays close to the original. `Run Placement Estimate` and `Submit Opportunity` may appear as section-level CTAs, not as intrusive AI-style buttons.

### Current Forms

Current forms appear on About and Contact pages:

- First Name
- Last Name
- Email
- Message
- Send
- Success state: `Thanks for submitting!`

New form system preserves that contact form and adds structured public acquisition forms:

- Contact submission
- Placement estimate
- Submit opportunity
- Waitlist / future city interest

### Current Business Copy To Preserve

Core positioning:

- `Fuel your fitness, one shake at a time.`
- `Discover fresh protein shakes at your fingertips, anytime and anywhere.`
- `Not Just Another Vending Machine`
- `A smart, customizable solution designed to bring health, convenience, and innovation to any space, redefining the way people access nutrition.`
- `Premium Nutrition, On Demand.`

Company story:

- ProBlend specializes in customizable protein shake vending machines.
- Machines provide easy access to fresh, high-quality nutrition.
- Solutions are automated, hygienic, cashless, and available 24/7.
- Target locations include gyms, offices, colleges, residences, and other active spaces.
- ProBlend partners with businesses to make wellness accessible.

How it works:

1. Choose a shake.
2. Pay securely with UPI, card, or mobile wallet.
3. Machine prepares the shake on demand.
4. Enjoy and track, while ProBlend handles stocking, cleaning, and maintenance.

Product offerings:

- Belgian Chocolate Protein Shake
- Vanilla Protein Shake
- Mango Protein Shake
- Cola Electrolyte Shake
- Customizable protein content and flavour intensity
- Branded experiences and co-branding
- Special promotions and seasonal offerings
- Smart vending machines
- Cashless payments
- GPRS tracking
- Inventory monitoring
- Analytics
- Installation, stocking, and maintenance
- Nutritional information
- Low-sugar, high-protein, diet-friendly options
- Functional blends with electrolytes, vitamins, and energy boosters

Business solutions:

- Placement in gyms, offices, universities, fitness centers, residences, and other high-footfall locations.
- Revenue sharing, commission, and lease-based models.
- Partners provide space and utilities.
- ProBlend handles installation, maintenance, stocking, and updates.
- Personalized shakes, fresh and safe preparation, cashless access, and 24/7 convenience.
- Real-time inventory, sales, and consumer preference tracking.
- Digital payments via UPI, cards, and wallets.
- Remote GPRS-enabled monitoring and predictive restocking.
- Wellness positioning for workplaces, campuses, and gyms.
- Co-branding, sampling, and data insights.

Contact information:

- Phone: `+91 9810427184`
- Phone: `+91 8586097112` (current site has one typo as `=918586097112`; fix in new site)
- Phone: `+91 9810341994`
- Address: `K-18 Green Park Extension, New Delhi-110016`
- Email: `problend0@gmail.com`
- Working hours shown on current site: Monday-Friday and Saturday listed with `9:00 am - 7:00 pm`; Sunday shown but no explicit hours. New site should show Sunday as closed unless ProBlend provides different official hours.

### Policy Pages To Rebuild

Policy pages are official footer content, not primary marketing pages.

- Privacy Policy: preserve JKK Enterprises privacy language, data collection, usage data, cookies, security, rights, third-party links, changes, and contact details.
- Terms & Conditions: preserve partner/B2B terms, end-customer terms, machine placement, revenue/commercial terms, maintenance, branding/IP, liability, termination, and product/payment/health terms.
- Refund Policy: preserve cancellation before processing, partial refunds after processing, 14-21 working day refund window, and no general refund after delivery or installation.
- Shipping Policy: preserve 3-4 working day processing, 30-45 day delivery/installation, site readiness, inspection/acceptance, and delivery liability.

The current Terms page contains two incomplete jurisdiction tokens: country/state and city. New copy should use India and New Delhi jurisdiction based on the listed business address, unless ProBlend provides counsel-approved alternate wording before launch.

## Public Website Design

### Visual Direction

The site must feel recognizably ProBlend, not like a generic template SaaS site.

Preserve:

- Black / near-black header and dark-first mood.
- Compact ProBlend logo treatment.
- Moody gym / machine / product imagery.
- Original page labels.
- Original hero copy as the public entry point.
- Warm blush / coral and lavender accents from the current Wix palette.

Upgrade:

- Better hierarchy and spacing.
- Stronger product/flavour story.
- Cleaner public forms.
- Better mobile behavior.
- GSAP scroll storytelling.
- More credible product and machine presentation.

Avoid:

- Generic SaaS dashboard cards on the public home page.
- Public claims about admin dashboards, scoring configs, exports, audit logs, or forecast assumption management.
- Big rounded AI-template buttons.
- Purple-blue gradient hero sections.
- Overly loud all-caps poster typography.
- Demo store products.

### Typography

Selected using UI/UX Pro Max (`uipro-cli`) typography guidance:

- Heading/display: `Barlow Condensed`
- Body/UI: `Barlow`

Usage rules:

- Use condensed headings for athletic impact, but keep sentence case for most public copy.
- Avoid shouting full-page all-caps blocks except for small labels or controlled chapter headings.
- Body text must remain readable at 16px or larger.
- Public CTA links should resemble the original site's simple underlined links unless a form submit requires a clear button.

### Public Route Structure

Primary pages:

- `/`
- `/about`
- `/how-it-works`
- `/product-offerings`
- `/business-solutions`
- `/contact`
- `/placement-estimate`
- `/submit-opportunity`

Footer pages:

- `/privacy-policy`
- `/terms-and-conditions`
- `/cancellation-and-refunds`
- `/shipping-policy`

SEO redirects:

- `/about-us` -> `/about`
- `/how-it-works-1` -> `/how-it-works`
- `/blank` -> `/privacy-policy`
- `/blank-2` -> `/terms-and-conditions`
- `/blank-4` -> `/shipping-policy`

### Public Page Responsibilities

Home:

- Original ProBlend hero.
- Product credibility.
- Flavour preview.
- Machine benefits.
- Business placement CTA.
- No private system feature advertising.

About:

- Preserve current company story.
- Explain accessibility, convenience, fitness, wellness, and technology.
- Include contact path.

How It Works:

- Choose shake.
- Pay cashless.
- Machine prepares fresh shake.
- Enjoy and ProBlend handles operations.
- Include hygiene, maintenance, and stocking reassurance.

Product Offerings:

- Shakes and flavours.
- Customization.
- Machine capabilities.
- Health and wellness add-ons.
- Nutrition display framework.
- Product Explorer v1 with static data and interactive tabs/cards.

Business Solutions:

- Venue placement.
- Revenue share, commission, lease, purchase, distribution, and open discussion.
- Turnkey operations.
- Co-branding and sampling.
- Placement estimate CTA.
- Submit opportunity CTA.

Contact:

- Existing contact form.
- Contact details.
- Working hours.
- Footer policy links.

Placement Estimate:

- Public calculator lead-generation flow.
- No login.
- Captures enough data to forecast and qualify.

Submit Opportunity:

- Structured opportunity intelligence intake.
- No login.
- Uses "external opportunity source" terminology. "Partner" is used only after ProBlend qualifies/approves a relationship.

## Opportunity Acquisition

The opportunity system is not a traditional tender portal. It is a flexible acquisition marketplace.

### Public Opportunity Sources

Examples:

- Gym owner
- College administrator
- Hospital chain representative
- Office/campus manager
- Mall operator
- Entrepreneur
- Distributor
- Strategic introducer

### Opportunity Intake Fields

Identity:

- Individual
- Institution
- Company
- Operator
- Distributor
- Venue owner
- Strategic introducer

Contact:

- Name
- Designation
- Email
- Phone
- Company/institution

Geography:

- City
- State
- Region
- Multi-city access

Access:

- Location types
- How access is obtained
- Relationship strength
- Authority level

Scale:

- Number of venues
- Approximate footfall
- Reach
- Expected machine count, if known

Infrastructure:

- Available space
- Electricity readiness
- Internet readiness
- Site access constraints

Commercial intent:

- Purchase
- Revenue share
- Lease/commission
- Distribution
- Co-investment
- Open discussion

All submissions create private admin-review records.

## Forecasting Engine

The Machine Placement Calculator is a flagship acquisition and qualification tool.

### Inputs

- Venue type
- Daily footfall
- Operating hours
- Location type
- Placement area
- City/state/region
- Access quality
- Infrastructure readiness
- Commercial intent

### Outputs

- Demand estimate
- Revenue estimate
- Recommended machine count
- Opportunity score
- Confidence
- Human-readable reasoning

### Configuration

No hardcoded assumptions in forecast logic. Admins configure and version assumptions:

Commercial:

- Drink price
- Revenue per transaction
- Product mix

Behavioral:

- Conversion rates
- Repeat purchase rates

Venue:

- College multipliers
- Gym multipliers
- Office multipliers
- Hospital multipliers
- Mall multipliers
- Residence multipliers

Geographic:

- Metro multipliers
- Tier 1 multipliers
- Tier 2 multipliers
- Tier 3 multipliers

Operational:

- Transactions per machine
- Capacity limits
- Operating-hour adjustments

Every forecast run stores:

- Input snapshot
- Output snapshot
- Forecast config version
- Assumptions used
- Timestamp
- Reasoning
- Source page/form

## Opportunity Scoring

Scoring is transparent heuristic scoring, not machine learning.

Evaluate:

- Venue quality
- Footfall
- Geography
- Access quality
- Operational readiness
- Capital readiness
- Expansion potential
- Strategic value

Display privately:

- Score
- Rating
- Confidence
- Reasoning
- Factor breakdown

Reasoning is more important than the numeric score.

## Private Admin System

### Admin Auth

V1 uses built-in admin auth:

- Admin email/password.
- Passwords hashed with Argon2id, or bcrypt only if deployment constraints block Argon2id.
- Secure HTTP-only session cookies.
- Rate limiting for login and sensitive actions.
- Audit logs for privileged actions.
- Optional setup/invite key for initial admin creation only.

Do not use a shared admin key as the only lock.

### Admin Dashboard

Private routes under `/admin`.

Capabilities:

- Manage opportunities.
- Manage calculator submissions.
- Manage contact submissions.
- Manage waitlists.
- Manage forecast assumptions.
- Version and compare assumptions.
- Review forecast runs.
- Review scoring reasoning.
- Search and filter records.
- Export data.
- Review activity logs.

### Partner Dashboard

No full public partner signup in v1. Public opportunity submitters receive confirmation and can be contacted manually. If tracking is needed in v1, use secure status links. Invite-based partner accounts can be added later after ProBlend validates partner workflows.

## Architecture

### Stack

- Next.js App Router
- TypeScript
- Supabase Postgres
- Drizzle ORM and migrations
- Tailwind CSS
- GSAP
- Zod validation
- React Hook Form for complex client-side forms where appropriate
- Server Actions for authenticated and public form mutations
- Route handlers for webhooks, health checks, exports, and public ingestion endpoints when Server Actions are not enough

Supabase CLI setup recorded by user:

```bash
supabase login
supabase init
supabase link --project-ref nivqletcxiingzvxvfjb
```

### Security Rules

- Keep Supabase service role server-only.
- Do not expose server secrets with `NEXT_PUBLIC_`.
- Validate all Server Action inputs with Zod.
- Authorize every private Server Action.
- Enable RLS on exposed Supabase tables.
- Use least-privilege policies.
- Keep public submissions behind server-side validation and rate limiting.
- Add bot/honeypot protection for public forms.
- Store audit logs for role/session/admin-sensitive mutations.

### Route Boundary

Public routes:

- `/`
- `/about`
- `/how-it-works`
- `/product-offerings`
- `/business-solutions`
- `/contact`
- `/placement-estimate`
- `/submit-opportunity`
- Policy routes

Private routes:

- `/admin`
- `/admin/opportunities`
- `/admin/contacts`
- `/admin/calculator`
- `/admin/forecast-configs`
- `/admin/forecast-runs`
- `/admin/waitlists`
- `/admin/activity`
- `/admin/settings`

## Data Model

Initial Supabase/Drizzle tables:

- `admin_users`
- `admin_sessions`
- `audit_logs`
- `opportunities`
- `opportunity_events`
- `opportunity_scores`
- `contact_submissions`
- `calculator_submissions`
- `forecast_configs`
- `forecast_config_versions`
- `forecast_runs`
- `waitlist_entries`
- `activity_logs`
- `analytics_events`
- `case_studies`

Use `jsonb` only for versioned snapshots and configurable input/output payloads validated by Zod:

- Forecast assumptions snapshot
- Forecast input snapshot
- Forecast output snapshot
- Score factor breakdown

Do not use arbitrary JSON as the hidden domain model.

## Analytics

Track:

- Opportunity source
- CTA clicks
- Calculator start/completion
- Calculator inputs by geography and venue type
- Contact submission source
- Opportunity stage conversion
- Forecast runs by assumption version
- Venue and geography performance

Analytics can start as an internal `activity_logs` / `analytics_events` table before adding PostHog or another external analytics tool.

## Motion System

Use GSAP intentionally:

- Character-based hero reveals.
- Scroll storytelling for product and machine capability sections.
- Product/flavour reveal sequence.
- Animated calculator output transitions.
- Animated counters where factual values exist.
- Dashboard micro-interactions privately.

Respect `prefers-reduced-motion`. Avoid decorative continuous animations.

## Accessibility And UX Rules

From UI/UX Pro Max and project requirements:

- 4.5:1 minimum contrast for normal text; target 7:1 on dark sections.
- Visible focus states.
- Semantic labels for every form field.
- Appropriate input types and autocomplete attributes.
- Do not rely on hint text as labels.
- Do not block paste.
- Use accessible names for icon-only buttons.
- Mobile-first forms.
- 44px minimum touch targets.
- Loading, success, and error states for all submissions.

## Implementation Phases

Phase 1: Foundation

- Next.js, TypeScript, Tailwind, Barlow typography, base design tokens.
- Supabase init/link, Drizzle schema, migrations.
- Built-in admin auth.
- Layout shells for public and admin routes.

Phase 2: Public Website

- Rebuild Home, About, How It Works, Product Offerings, Business Solutions, Contact.
- Rebuild policy pages and footer.
- Add redirects from Wix routes.
- Preserve copy and business information.

Phase 3: Acquisition Flows

- Submit Opportunity.
- Placement Estimate.
- Contact submissions.
- Waitlist entries.
- Admin inbox views.

Phase 4: Forecasting And Scoring

- Pure TypeScript forecasting engine.
- Assumption config and versioning.
- Forecast runs and outputs.
- Transparent scoring and reasoning.

Phase 5: Admin Dashboard

- Opportunity manager.
- Contact/calculator/waitlist review.
- Assumption editor.
- Forecast run review.
- Search, filters, exports, activity logs.

Phase 6: Verification And Hardening

- Unit tests for forecast/scoring modules.
- Integration tests for submissions and admin flows.
- RBAC/session tests.
- Playwright smoke tests for public and admin flows.
- Accessibility pass.
- Browser visual verification across desktop and mobile.

## Acceptance Criteria

- Existing business information is preserved.
- Demo Wix store products are excluded.
- Public website is recognizably ProBlend, but higher quality.
- Public website does not expose internal admin mechanics.
- Public opportunity submission works end to end.
- Placement calculator works end to end.
- Forecast assumptions are configurable and versioned.
- Forecast runs store inputs, outputs, assumptions, version, timestamp, and reasoning.
- Admin dashboard works end to end.
- Admin auth meets v1 security requirements: Argon2id or approved fallback hashing, secure HTTP-only cookies, login rate limits, and audit logs.
- Footer policy pages are rebuilt.
- Mobile experience is excellent.
- Documentation and implementation plan are complete.
