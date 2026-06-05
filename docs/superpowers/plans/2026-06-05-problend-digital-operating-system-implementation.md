# ProBlend Digital Operating System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ProBlend Digital Operating System MVP: a premium public ProBlend website, public opportunity acquisition flows, a configurable placement forecasting engine, and a private admin dashboard backed by the Mumbai Supabase project.

**Architecture:** Use a single Next.js App Router application with route groups for public and admin surfaces. Keep all public submissions server-validated, store operational data in Supabase Postgres through Drizzle, and keep forecasting/scoring as pure TypeScript modules that receive versioned assumptions instead of reading hardcoded constants.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Barlow Condensed/Barlow, GSAP, Zod, React Hook Form, Supabase Postgres, Drizzle ORM, Vitest, Playwright, `@node-rs/argon2`, server-side opaque admin sessions, and CSV export from server routes.

---

## Non-Execution Boundary

This document is the deliverable for the current request. Do not scaffold the application, create migrations, push schemas, or implement routes while writing or reviewing this plan.

Execution workers must make a new commit at the end of each task and must not expose private admin concepts on public marketing pages.

## Current Project State

- Repo root: `/Users/hemishbiswas/Documents/problend`
- Product/design spec: `docs/superpowers/specs/2026-06-05-problend-digital-operating-system-design.md`
- Supabase handoff: `docs/supabase.md`
- Supabase project URL: `https://tueqoqusbxeldxnnarlv.supabase.co`
- Supabase project ref: `tueqoqusbxeldxnnarlv`
- Supabase region: `South Asia (Mumbai)`, region code `ap-south-1`
- Current committed files before implementation: docs, `.gitignore`, and `supabase/config.toml`
- Local UIPro tooling directory `.codex/` is untracked and should stay out of product commits unless the user asks to version it.

## Required Skill And Verification Rules For Execution

- Start implementation by using `superpowers:subagent-driven-development` or `superpowers:executing-plans`.
- Use `build-web-apps:frontend-app-builder` before implementing visual surfaces.
- Use `supabase:supabase` before schema, migration, RLS, or Supabase CLI work. Check the Supabase changelog and current docs before applying schema changes.
- Use `superpowers:test-driven-development` for forecasting, scoring, auth, form validation, and persistence behavior.
- Use `superpowers:verification-before-completion` before claiming a task or the full plan is complete.
- Use the Browser plugin to verify local pages after frontend tasks.

## Public/Internal Boundary

Public pages may show:

- ProBlend product story, flavours, machine capabilities, hygiene, automation, cashless payments, GPRS tracking, inventory monitoring, analytics as a customer/partner benefit, placement models, and contact details.
- `Run Placement Estimate`, `Submit Opportunity`, and `Contact Us`.

Public pages must not show:

- Admin dashboard features, forecast configuration management, internal scoring model details, export/audit tooling, private activity logs, user-management mechanics, or internal route names.

Private admin pages under `/admin` may show:

- Opportunity management, scoring, forecast configuration versions, exports, audit/activity logs, and admin settings.

## File Structure Map

Create or modify these files during implementation:

```text
/Users/hemishbiswas/Documents/problend/
  package.json
  package-lock.json
  next.config.ts
  tsconfig.json
  postcss.config.mjs
  eslint.config.mjs
  drizzle.config.ts
  vitest.config.ts
  playwright.config.ts
  .env.example
  src/
    app/
      globals.css
      layout.tsx
      sitemap.ts
      robots.ts
      not-found.tsx
      (public)/
        layout.tsx
        page.tsx
        about/page.tsx
        how-it-works/page.tsx
        product-offerings/page.tsx
        business-solutions/page.tsx
        contact/page.tsx
        placement-estimate/page.tsx
        submit-opportunity/page.tsx
        privacy-policy/page.tsx
        terms-and-conditions/page.tsx
        cancellation-and-refunds/page.tsx
        shipping-policy/page.tsx
      admin/
        layout.tsx
        page.tsx
        login/page.tsx
        setup/page.tsx
        opportunities/page.tsx
        opportunities/[id]/page.tsx
        contacts/page.tsx
        calculator/page.tsx
        forecast-configs/page.tsx
        forecast-runs/page.tsx
        waitlists/page.tsx
        activity/page.tsx
        settings/page.tsx
      api/
        admin/logout/route.ts
        admin/export/[dataset]/route.ts
        health/route.ts
    components/
      public/
        PublicHeader.tsx
        PublicFooter.tsx
        HeroSection.tsx
        ProductExplorer.tsx
        ExpansionMap.tsx
        OpportunityPostList.tsx
        PlacementEstimateForm.tsx
        OpportunityForm.tsx
        ContactForm.tsx
        PolicyPage.tsx
      admin/
        AdminShell.tsx
        AdminHeader.tsx
        AdminSidebar.tsx
        DataTable.tsx
        StatusPill.tsx
        ScoreCard.tsx
        ForecastConfigEditor.tsx
      ui/
        Button.tsx
        Field.tsx
        Select.tsx
        Textarea.tsx
        Dialog.tsx
        EmptyState.tsx
    content/
      site.ts
      products.ts
      legal.ts
      case-studies.ts
    db/
      client.ts
      schema.ts
      queries/
        admin.ts
        analytics.ts
        contacts.ts
        forecasts.ts
        opportunities.ts
        waitlists.ts
    features/
      admin-auth/
        actions.ts
        passwords.ts
        rate-limit.ts
        session.ts
        guards.ts
        schemas.ts
      analytics/
        actions.ts
        events.ts
      contacts/
        actions.ts
        schemas.ts
      forecasting/
        assumptions.ts
        engine.ts
        schemas.ts
        scoring.ts
        types.ts
      opportunities/
        actions.ts
        schemas.ts
        statuses.ts
      waitlists/
        actions.ts
        schemas.ts
    lib/
      csv.ts
      env.ts
      request.ts
      slug.ts
      utils.ts
    tests/
      content/
        site-content.test.ts
      features/
        admin-auth.test.ts
        forecasting-engine.test.ts
        opportunity-scoring.test.ts
        public-actions.test.ts
      e2e/
        public.spec.ts
        admin.spec.ts
  supabase/
    migrations/
      files created with `npx supabase migration new`
```

## Environment Variables

Create `.env.example` with concrete local-development defaults:

```bash
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_SETUP_KEY="local-dev-setup-key"
SESSION_COOKIE_NAME="problend_admin_session"
```

Production must override all four values. `DATABASE_URL`, `ADMIN_SETUP_KEY`, and any future service keys must never be prefixed with `NEXT_PUBLIC_`.

---

### Task 1: Foundation, Tooling, And Base App Shell

**Files:**

- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/not-found.tsx`
- Create: `src/lib/env.ts`
- Create: `src/lib/utils.ts`
- Create: `src/tests/smoke.test.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Create the package manifest**

Write `package.json` with these scripts and dependencies:

```json
{
  "name": "problend-digital-os",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:introspect": "drizzle-kit introspect",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "@hookform/resolvers": "latest",
    "@node-rs/argon2": "latest",
    "clsx": "latest",
    "drizzle-orm": "latest",
    "gsap": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "postgres": "latest",
    "react": "latest",
    "react-dom": "latest",
    "react-hook-form": "latest",
    "tailwind-merge": "latest",
    "zod": "latest"
  },
  "devDependencies": {
    "@playwright/test": "latest",
    "@tailwindcss/postcss": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "drizzle-kit": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "jsdom": "latest",
    "tailwindcss": "latest",
    "tsx": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
npx playwright install chromium
```

Expected: `package-lock.json` is created and Chromium browser binaries are installed for Playwright.

- [ ] **Step 3: Add TypeScript and framework config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/how-it-works-1", destination: "/how-it-works", permanent: true },
      { source: "/blank", destination: "/privacy-policy", permanent: true },
      { source: "/blank-2", destination: "/terms-and-conditions", permanent: true },
      { source: "/blank-4", destination: "/shipping-policy", permanent: true }
    ];
  }
};

export default nextConfig;
```

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};

export default config;
```

Create `eslint.config.mjs`:

```js
import nextVitals from "eslint-config-next/core-web-vitals";

export default [...nextVitals];
```

- [ ] **Step 4: Add test config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: []
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname
    }
  }
});
```

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure"
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"] } }
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true
  }
});
```

- [ ] **Step 5: Add env validation**

Create `.env.example` from the environment section above.

Create `src/lib/env.ts`:

```ts
import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  ADMIN_SETUP_KEY: z.string().min(12),
  SESSION_COOKIE_NAME: z.string().min(6).default("problend_admin_session")
});

export const env = serverEnvSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ADMIN_SETUP_KEY: process.env.ADMIN_SETUP_KEY ?? "local-dev-setup-key",
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME
});
```

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 6: Add global layout and design tokens**

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed"
});

export const metadata: Metadata = {
  title: {
    default: "ProBlend | Premium Nutrition On Demand",
    template: "%s | ProBlend"
  },
  description:
    "Fresh, customizable protein shakes through smart, hygienic, cashless vending machines for gyms, offices, colleges, residences, and high-footfall venues.",
  metadataBase: new URL("https://www.problend.co.in")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Create `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --pb-black: #070707;
  --pb-charcoal: #121211;
  --pb-graphite: #20201e;
  --pb-cream: #f5efe9;
  --pb-blush: #f2b7ac;
  --pb-lavender: #c9b8ff;
  --pb-amber: #ffb23f;
  --pb-green: #a8ff5e;
  --pb-muted: #b9b2aa;
  --pb-border: rgba(245, 239, 233, 0.16);
  --pb-radius: 8px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--pb-black);
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(242, 183, 172, 0.16), transparent 26rem),
    linear-gradient(180deg, #070707 0%, #121211 46%, #070707 100%);
  color: var(--pb-cream);
  font-family: var(--font-barlow), system-ui, sans-serif;
  letter-spacing: 0;
}

button,
input,
select,
textarea {
  font: inherit;
}

a {
  color: inherit;
}

::selection {
  background: var(--pb-amber);
  color: var(--pb-black);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

Create `src/app/not-found.tsx`:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--pb-black)] px-6 py-20 text-[var(--pb-cream)]">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--pb-muted)]">Page not found</p>
        <h1 className="mt-4 font-[var(--font-barlow-condensed)] text-5xl font-semibold">
          This page is not on the ProBlend route.
        </h1>
        <Link className="mt-8 inline-block underline underline-offset-4" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 7: Add smoke test and verify foundation**

Create `src/tests/smoke.test.ts`:

```ts
import { describe, expect, it } from "vitest";

describe("test runner", () => {
  it("runs the initial suite", () => {
    expect("problend").toBe("problend");
  });
});
```

Run:

```bash
npm run typecheck
npm run lint
npm run test
```

Expected: typecheck and lint pass. Vitest passes the smoke test.

- [ ] **Step 8: Commit foundation**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts playwright.config.ts .env.example src/app src/lib src/tests .gitignore
git commit -m "chore: scaffold Next.js foundation"
```

---

### Task 2: Supabase Schema, Drizzle Client, And Data Access Boundary

**Files:**

- Create: a migration in `supabase/migrations/` using `npx supabase migration new initial_digital_os_schema`
- Create: `drizzle.config.ts`
- Create: `src/db/client.ts`
- Create: `src/db/schema.ts`
- Create: `src/db/queries/admin.ts`
- Create: `src/db/queries/analytics.ts`
- Create: `src/db/queries/contacts.ts`
- Create: `src/db/queries/forecasts.ts`
- Create: `src/db/queries/opportunities.ts`
- Create: `src/db/queries/waitlists.ts`

- [ ] **Step 1: Confirm Supabase CLI and linked project**

Run:

```bash
npx supabase --version
npx supabase projects list
```

Expected: the linked project row shows `tueqoqusbxeldxnnarlv`, project name `problend`, and region `South Asia (Mumbai)`.

- [ ] **Step 2: Create a migration using the Supabase CLI**

Run:

```bash
npx supabase migration new initial_digital_os_schema
```

Expected: Supabase prints a new migration path ending with `_initial_digital_os_schema.sql`. Use that generated file path for the SQL in the next step.

- [ ] **Step 3: Write the initial schema migration**

Use the generated migration file from Step 2 and write this SQL:

```sql
create extension if not exists pgcrypto;
create extension if not exists citext;

alter default privileges for role postgres in schema public
  revoke select, insert, update, delete on tables from anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke usage, select on sequences from anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke execute on functions from public;

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  name text not null,
  role text not null default 'admin' check (role in ('owner', 'admin', 'analyst')),
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_sessions (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references public.admin_users(id) on delete cascade,
  session_token_hash text not null unique,
  user_agent text,
  ip_address inet,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.admin_login_attempts (
  id uuid primary key default gen_random_uuid(),
  email citext,
  ip_address inet,
  was_successful boolean not null,
  failure_reason text,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references public.admin_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_type text not null check (actor_type in ('public', 'admin', 'system')),
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  source_path text not null,
  session_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email citext not null,
  phone text,
  message text not null,
  source_path text not null default '/contact',
  status text not null default 'new' check (status in ('new', 'reviewed', 'replied', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email citext not null,
  phone text,
  city text not null,
  state text not null,
  interest_type text not null check (interest_type in ('customer', 'venue', 'operator', 'distributor', 'other')),
  notes text,
  source_path text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  source_type text not null default 'external_opportunity_source',
  identity_type text not null check (identity_type in ('individual', 'institution', 'company', 'operator', 'distributor', 'venue_owner', 'strategic_introducer')),
  contact_name text not null,
  designation text,
  email citext not null,
  phone text not null,
  organization_name text,
  city text not null,
  state text not null,
  region text,
  has_multi_city_access boolean not null default false,
  location_types text[] not null default '{}',
  access_method text not null,
  relationship_strength text not null check (relationship_strength in ('direct_owner', 'decision_maker', 'strong_relationship', 'warm_introduction', 'cold_access')),
  authority_level text not null check (authority_level in ('final_decision', 'influencer', 'introducer', 'unknown')),
  venue_count integer,
  approximate_daily_footfall integer,
  reach_description text,
  expected_machine_count integer,
  available_space text,
  electricity_readiness text not null check (electricity_readiness in ('ready', 'can_arrange', 'not_available', 'unknown')),
  internet_readiness text not null check (internet_readiness in ('ready', 'can_arrange', 'not_available', 'unknown')),
  site_access_constraints text,
  commercial_intent text not null check (commercial_intent in ('purchase', 'revenue_share', 'lease_commission', 'distribution', 'co_investment', 'open_discussion')),
  notes text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'qualified', 'forecasted', 'contacted', 'won', 'lost', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunity_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (category in ('operator', 'venue_access', 'distributor', 'strategic_introduction')),
  summary text not null,
  location_scope text not null,
  commercial_model text not null check (commercial_model in ('purchase', 'revenue_share', 'lease_commission', 'distribution', 'co_investment', 'open_discussion')),
  requirements text[] not null default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunity_applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_post_id uuid not null references public.opportunity_posts(id) on delete cascade,
  contact_name text not null,
  email citext not null,
  phone text not null,
  organization_name text,
  city text not null,
  state text not null,
  intent text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'qualified', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunity_events (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  admin_user_id uuid references public.admin_users(id) on delete set null,
  event_type text not null,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.forecast_configs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  is_active boolean not null default false,
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.forecast_config_versions (
  id uuid primary key default gen_random_uuid(),
  forecast_config_id uuid not null references public.forecast_configs(id) on delete cascade,
  version_number integer not null,
  assumptions jsonb not null,
  change_note text not null,
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (forecast_config_id, version_number)
);

create table public.calculator_submissions (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references public.opportunities(id) on delete set null,
  contact_name text,
  email citext,
  phone text,
  venue_type text not null,
  daily_footfall integer not null,
  operating_hours numeric(4, 1) not null,
  location_type text not null,
  placement_area text not null,
  city text not null,
  state text not null,
  access_quality text not null,
  infrastructure_readiness text not null,
  commercial_intent text not null,
  source_path text not null default '/placement-estimate',
  created_at timestamptz not null default now()
);

create table public.forecast_runs (
  id uuid primary key default gen_random_uuid(),
  calculator_submission_id uuid references public.calculator_submissions(id) on delete set null,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  forecast_config_version_id uuid not null references public.forecast_config_versions(id) on delete restrict,
  input_snapshot jsonb not null,
  assumptions_snapshot jsonb not null,
  output_snapshot jsonb not null,
  reasoning text[] not null default '{}',
  source text not null check (source in ('placement_estimate', 'admin_manual', 'opportunity_submission')),
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.opportunity_scores (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  forecast_run_id uuid references public.forecast_runs(id) on delete set null,
  score integer not null check (score between 0 and 100),
  rating text not null check (rating in ('low', 'moderate', 'strong', 'priority')),
  confidence integer not null check (confidence between 0 and 100),
  factor_breakdown jsonb not null,
  reasoning text[] not null default '{}',
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  venue_type text not null,
  city text not null,
  summary text not null,
  metrics jsonb not null default '{}'::jsonb,
  body text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index admin_sessions_admin_user_idx on public.admin_sessions(admin_user_id);
create index admin_sessions_expires_idx on public.admin_sessions(expires_at);
create index admin_login_attempts_email_created_idx on public.admin_login_attempts(email, created_at desc);
create index contact_submissions_status_created_idx on public.contact_submissions(status, created_at desc);
create index waitlist_entries_city_state_idx on public.waitlist_entries(city, state);
create index opportunities_status_created_idx on public.opportunities(status, created_at desc);
create index opportunities_city_state_idx on public.opportunities(city, state);
create index opportunity_posts_published_idx on public.opportunity_posts(is_published, published_at desc);
create index opportunity_applications_post_idx on public.opportunity_applications(opportunity_post_id, status, created_at desc);
create index forecast_config_versions_config_idx on public.forecast_config_versions(forecast_config_id, version_number desc);
create index forecast_runs_created_idx on public.forecast_runs(created_at desc);
create index opportunity_scores_opportunity_idx on public.opportunity_scores(opportunity_id, created_at desc);
create index analytics_events_name_created_idx on public.analytics_events(event_name, created_at desc);

alter table public.admin_users enable row level security;
alter table public.admin_sessions enable row level security;
alter table public.admin_login_attempts enable row level security;
alter table public.audit_logs enable row level security;
alter table public.activity_logs enable row level security;
alter table public.analytics_events enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_posts enable row level security;
alter table public.opportunity_applications enable row level security;
alter table public.opportunity_events enable row level security;
alter table public.forecast_configs enable row level security;
alter table public.forecast_config_versions enable row level security;
alter table public.calculator_submissions enable row level security;
alter table public.forecast_runs enable row level security;
alter table public.opportunity_scores enable row level security;
alter table public.case_studies enable row level security;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
grant select, insert, update, delete on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;
```

- [ ] **Step 4: Add Drizzle config**

Create `drizzle.config.ts`:

```ts
import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl
  }
});
```

- [ ] **Step 5: Add Drizzle client**

Create `src/db/client.ts`:

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  postgresClient?: postgres.Sql;
};

const client =
  globalForDb.postgresClient ??
  postgres(env.DATABASE_URL, {
    prepare: false,
    max: 5
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });
```

- [ ] **Step 6: Create the schema mirror**

Create `src/db/schema.ts` using Drizzle table definitions that mirror the SQL names exactly. Use this import set:

```ts
import {
  boolean,
  customType,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

const citext = customType<{ data: string; driverData: string }>({
  dataType() {
    return "citext";
  }
});
```

Define every table from the migration. This is the expected table pattern:

```ts
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: citext("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  sourcePath: text("source_path").notNull().default("/contact"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
```

Required table exports:

```ts
export { adminUsers, adminSessions, adminLoginAttempts, auditLogs, activityLogs, analyticsEvents };
export { contactSubmissions, waitlistEntries, opportunities, opportunityPosts, opportunityApplications, opportunityEvents };
export { forecastConfigs, forecastConfigVersions, calculatorSubmissions, forecastRuns, opportunityScores };
export { caseStudies };
```

Required select/insert type exports for each table:

```ts
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
```

- [ ] **Step 7: Add query modules with focused responsibilities**

Create query modules with these exported functions and behavior.

Use this implementation style for `src/db/queries/contacts.ts`:

```ts
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { contactSubmissions, type NewContactSubmission } from "@/db/schema";

export async function createContactSubmission(input: NewContactSubmission) {
  const [record] = await db.insert(contactSubmissions).values(input).returning();
  return record;
}

export async function listContactSubmissions(status?: string) {
  if (status) {
    return db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, status))
      .orderBy(desc(contactSubmissions.createdAt));
  }

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactStatus(id: string, status: string) {
  const [record] = await db
    .update(contactSubmissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(contactSubmissions.id, id))
    .returning();

  return record;
}
```

Create the remaining modules with the same Drizzle-only pattern:

- `src/db/queries/waitlists.ts`: `createWaitlistEntry(input)`, `listWaitlistEntries(status)`
- `src/db/queries/opportunities.ts`: `createOpportunity(input)`, `listOpportunities(filters)`, `getOpportunityById(id)`, `updateOpportunityStatus(id, status, adminUserId)`, `createOpportunityPost(input)`, `listPublishedOpportunityPosts()`, `listOpportunityPosts()`, `createOpportunityApplication(input)`, `listOpportunityApplications(postId)`
- `src/db/queries/forecasts.ts`: `getActiveForecastConfigVersion()`, `createForecastRun(input)`, `listForecastRuns()`, `createOpportunityScore(input)`
- `src/db/queries/admin.ts`: `getAdminByEmail(email)`, `getAdminById(id)`, `createAdminUser(input)`, `createAdminSession(input)`, `revokeAdminSession(sessionTokenHash)`
- `src/db/queries/analytics.ts`: `trackAnalyticsEvent(input)`, `writeActivityLog(input)`, `writeAuditLog(input)`

Each function must return typed records and must not import React or Next route modules.

- [ ] **Step 8: Verify migration and data boundary**

Run locally:

```bash
npx supabase start
npx supabase db reset
npm run typecheck
```

Expected: local Supabase starts, the migration applies cleanly, and TypeScript passes.

- [ ] **Step 9: Commit schema foundation**

```bash
git add supabase/migrations drizzle.config.ts src/db
git commit -m "feat: add digital OS database schema"
```

---

### Task 3: Forecasting Engine And Opportunity Scoring

**Files:**

- Create: `src/features/forecasting/types.ts`
- Create: `src/features/forecasting/schemas.ts`
- Create: `src/features/forecasting/assumptions.ts`
- Create: `src/features/forecasting/engine.ts`
- Create: `src/features/forecasting/scoring.ts`
- Create: `src/tests/features/forecasting-engine.test.ts`
- Create: `src/tests/features/opportunity-scoring.test.ts`

- [ ] **Step 1: Write forecast tests before implementation**

Create `src/tests/features/forecasting-engine.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { calculateForecast } from "@/features/forecasting/engine";
import { testForecastAssumptions } from "@/features/forecasting/assumptions";

describe("calculateForecast", () => {
  it("uses supplied assumptions instead of module constants", () => {
    const input = {
      venueType: "gym",
      dailyFootfall: 500,
      operatingHours: 14,
      locationType: "metro",
      placementArea: "inside_venue",
      city: "Mumbai",
      state: "Maharashtra",
      accessQuality: "direct_owner",
      infrastructureReadiness: "ready",
      commercialIntent: "revenue_share"
    } as const;

    const first = calculateForecast(input, {
      ...testForecastAssumptions,
      commercial: { ...testForecastAssumptions.commercial, revenuePerTransaction: 180 }
    });

    const second = calculateForecast(input, {
      ...testForecastAssumptions,
      commercial: { ...testForecastAssumptions.commercial, revenuePerTransaction: 260 }
    });

    expect(second.revenueEstimate.monthly).toBeGreaterThan(first.revenueEstimate.monthly);
    expect(first.reasoning.join(" ")).toContain("gym");
    expect(first.recommendedMachineCount).toBeGreaterThanOrEqual(1);
  });

  it("caps demand by machine capacity and explains the cap", () => {
    const result = calculateForecast(
      {
        venueType: "college",
        dailyFootfall: 12000,
        operatingHours: 16,
        locationType: "tier_1",
        placementArea: "cafeteria",
        city: "Pune",
        state: "Maharashtra",
        accessQuality: "decision_maker",
        infrastructureReadiness: "ready",
        commercialIntent: "purchase"
      },
      {
        ...testForecastAssumptions,
        operational: {
          transactionsPerMachinePerDay: 90,
          maxRecommendedMachines: 6,
          operatingHourBaseline: 12
        }
      }
    );

    expect(result.recommendedMachineCount).toBeLessThanOrEqual(6);
    expect(result.reasoning.some((line) => line.includes("capacity"))).toBe(true);
  });
});
```

- [ ] **Step 2: Write scoring tests before implementation**

Create `src/tests/features/opportunity-scoring.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { scoreOpportunity } from "@/features/forecasting/scoring";

describe("scoreOpportunity", () => {
  it("prioritizes high-footfall ready venues with direct access", () => {
    const result = scoreOpportunity({
      venueType: "gym",
      dailyFootfall: 900,
      locationType: "metro",
      accessQuality: "direct_owner",
      infrastructureReadiness: "ready",
      commercialIntent: "revenue_share",
      hasMultiCityAccess: false,
      venueCount: 1,
      strategicValue: "fitness_audience"
    });

    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.rating).toBe("priority");
    expect(result.reasoning.join(" ")).toContain("direct");
    expect(result.factorBreakdown.accessQuality).toBeGreaterThan(0);
  });

  it("keeps confidence lower when authority and infrastructure are weak", () => {
    const result = scoreOpportunity({
      venueType: "mall",
      dailyFootfall: 400,
      locationType: "tier_2",
      accessQuality: "cold_access",
      infrastructureReadiness: "unknown",
      commercialIntent: "open_discussion",
      hasMultiCityAccess: false,
      venueCount: 1,
      strategicValue: "general_visibility"
    });

    expect(result.score).toBeLessThan(60);
    expect(result.confidence).toBeLessThan(70);
    expect(result.reasoning.length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 3: Run tests and confirm failure**

Run:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts
```

Expected: tests fail because `calculateForecast`, `testForecastAssumptions`, and `scoreOpportunity` are not implemented.

- [ ] **Step 4: Implement domain types and schemas**

Create `src/features/forecasting/types.ts` with exported types:

```ts
export type VenueType = "gym" | "college" | "office" | "hospital" | "mall" | "residence" | "other";
export type LocationType = "metro" | "tier_1" | "tier_2" | "tier_3";
export type InfrastructureReadiness = "ready" | "can_arrange" | "not_available" | "unknown";
export type CommercialIntent = "purchase" | "revenue_share" | "lease_commission" | "distribution" | "co_investment" | "open_discussion";

export type ForecastInput = {
  venueType: VenueType;
  dailyFootfall: number;
  operatingHours: number;
  locationType: LocationType;
  placementArea: string;
  city: string;
  state: string;
  accessQuality: string;
  infrastructureReadiness: InfrastructureReadiness;
  commercialIntent: CommercialIntent;
};

export type ForecastAssumptions = {
  commercial: {
    drinkPrice: number;
    revenuePerTransaction: number;
    productMix: Record<string, number>;
  };
  behavioral: {
    conversionRate: number;
    repeatPurchaseRate: number;
  };
  venueMultipliers: Record<VenueType, number>;
  geographyMultipliers: Record<LocationType, number>;
  operational: {
    transactionsPerMachinePerDay: number;
    maxRecommendedMachines: number;
    operatingHourBaseline: number;
  };
};

export type ForecastOutput = {
  demandEstimate: {
    dailyTransactions: number;
    monthlyTransactions: number;
  };
  revenueEstimate: {
    daily: number;
    monthly: number;
  };
  recommendedMachineCount: number;
  opportunityScore: number;
  confidence: number;
  reasoning: string[];
};

export type OpportunityScoreInput = {
  venueType: VenueType;
  dailyFootfall: number;
  locationType: LocationType;
  accessQuality: string;
  infrastructureReadiness: InfrastructureReadiness;
  commercialIntent: CommercialIntent;
  hasMultiCityAccess: boolean;
  venueCount: number;
  strategicValue: "fitness_audience" | "wellness_audience" | "general_visibility" | "distribution_network";
};

export type OpportunityScoreOutput = {
  score: number;
  rating: "low" | "moderate" | "strong" | "priority";
  confidence: number;
  factorBreakdown: Record<string, number>;
  reasoning: string[];
};
```

Create `src/features/forecasting/schemas.ts` with Zod schemas matching these types.

- [ ] **Step 5: Add test assumptions**

Create `src/features/forecasting/assumptions.ts`:

```ts
import type { ForecastAssumptions } from "./types";

export const testForecastAssumptions: ForecastAssumptions = {
  commercial: {
    drinkPrice: 220,
    revenuePerTransaction: 220,
    productMix: {
      belgian_chocolate: 0.34,
      vanilla: 0.24,
      mango: 0.24,
      cola_electrolyte: 0.18
    }
  },
  behavioral: {
    conversionRate: 0.035,
    repeatPurchaseRate: 0.18
  },
  venueMultipliers: {
    gym: 1.45,
    college: 1.2,
    office: 0.9,
    hospital: 0.75,
    mall: 1.0,
    residence: 0.65,
    other: 0.7
  },
  geographyMultipliers: {
    metro: 1.18,
    tier_1: 1.0,
    tier_2: 0.82,
    tier_3: 0.64
  },
  operational: {
    transactionsPerMachinePerDay: 75,
    maxRecommendedMachines: 5,
    operatingHourBaseline: 12
  }
};
```

This file is for tests and seeds only. The production calculator must read active assumptions from `forecast_config_versions`.

- [ ] **Step 6: Implement forecast logic**

Create `src/features/forecasting/engine.ts`:

```ts
import type { ForecastAssumptions, ForecastInput, ForecastOutput } from "./types";

const MONTHLY_DAYS = 30;

export function calculateForecast(input: ForecastInput, assumptions: ForecastAssumptions): ForecastOutput {
  const venueMultiplier = assumptions.venueMultipliers[input.venueType] ?? assumptions.venueMultipliers.other;
  const geographyMultiplier = assumptions.geographyMultipliers[input.locationType];
  const operatingHourMultiplier = Math.max(input.operatingHours / assumptions.operational.operatingHourBaseline, 0.4);
  const rawDailyTransactions =
    input.dailyFootfall *
    assumptions.behavioral.conversionRate *
    venueMultiplier *
    geographyMultiplier *
    operatingHourMultiplier *
    (1 + assumptions.behavioral.repeatPurchaseRate);

  const capacityPerMachine = assumptions.operational.transactionsPerMachinePerDay;
  const uncappedMachineCount = Math.max(1, Math.ceil(rawDailyTransactions / capacityPerMachine));
  const recommendedMachineCount = Math.min(uncappedMachineCount, assumptions.operational.maxRecommendedMachines);
  const cappedDailyTransactions = Math.min(rawDailyTransactions, recommendedMachineCount * capacityPerMachine);
  const dailyTransactions = Math.round(cappedDailyTransactions);
  const dailyRevenue = Math.round(dailyTransactions * assumptions.commercial.revenuePerTransaction);
  const monthlyRevenue = dailyRevenue * MONTHLY_DAYS;
  const confidence = calculateConfidence(input);
  const opportunityScore = Math.min(100, Math.round(dailyTransactions / capacityPerMachine * 55 + confidence * 0.45));

  const reasoning = [
    `${input.venueType} venue multiplier applied at ${venueMultiplier}.`,
    `${input.locationType} geography multiplier applied at ${geographyMultiplier}.`,
    `Operating hours adjusted against a ${assumptions.operational.operatingHourBaseline}-hour baseline.`,
    `Recommended machine count is ${recommendedMachineCount} based on ${capacityPerMachine} transactions per machine per day.`
  ];

  if (uncappedMachineCount > recommendedMachineCount) {
    reasoning.push(`Demand was capped by the configured maximum capacity of ${recommendedMachineCount} machines.`);
  }

  return {
    demandEstimate: {
      dailyTransactions,
      monthlyTransactions: dailyTransactions * MONTHLY_DAYS
    },
    revenueEstimate: {
      daily: dailyRevenue,
      monthly: monthlyRevenue
    },
    recommendedMachineCount,
    opportunityScore,
    confidence,
    reasoning
  };
}

function calculateConfidence(input: ForecastInput) {
  let confidence = 55;
  if (input.dailyFootfall >= 500) confidence += 15;
  if (input.infrastructureReadiness === "ready") confidence += 15;
  if (input.accessQuality === "direct_owner" || input.accessQuality === "decision_maker") confidence += 10;
  if (input.city && input.state) confidence += 5;
  return Math.min(confidence, 95);
}
```

- [ ] **Step 7: Implement opportunity scoring**

Create `src/features/forecasting/scoring.ts`:

```ts
import type { OpportunityScoreInput, OpportunityScoreOutput } from "./types";

export function scoreOpportunity(input: OpportunityScoreInput): OpportunityScoreOutput {
  const factorBreakdown = {
    venueQuality: scoreVenue(input.venueType),
    footfall: scoreFootfall(input.dailyFootfall),
    geography: scoreGeography(input.locationType),
    accessQuality: scoreAccess(input.accessQuality),
    operationalReadiness: scoreReadiness(input.infrastructureReadiness),
    capitalReadiness: scoreCommercial(input.commercialIntent),
    expansionPotential: input.hasMultiCityAccess ? 12 : Math.min(input.venueCount * 2, 8),
    strategicValue: scoreStrategicValue(input.strategicValue)
  };

  const score = Math.max(0, Math.min(100, Math.round(Object.values(factorBreakdown).reduce((sum, value) => sum + value, 0))));
  const confidence = Math.max(
    35,
    Math.min(95, 50 + factorBreakdown.accessQuality + factorBreakdown.operationalReadiness + Math.min(factorBreakdown.footfall, 15))
  );
  const rating = score >= 75 ? "priority" : score >= 60 ? "strong" : score >= 40 ? "moderate" : "low";
  const reasoning = [
    `Venue quality contributed ${factorBreakdown.venueQuality} points.`,
    `Footfall contributed ${factorBreakdown.footfall} points.`,
    `Access quality contributed ${factorBreakdown.accessQuality} points from ${input.accessQuality}.`,
    `Operational readiness contributed ${factorBreakdown.operationalReadiness} points.`
  ];

  return { score, rating, confidence, factorBreakdown, reasoning };
}

function scoreVenue(venueType: OpportunityScoreInput["venueType"]) {
  return { gym: 18, college: 16, office: 12, hospital: 10, mall: 12, residence: 8, other: 6 }[venueType];
}

function scoreFootfall(dailyFootfall: number) {
  if (dailyFootfall >= 1000) return 18;
  if (dailyFootfall >= 600) return 15;
  if (dailyFootfall >= 300) return 10;
  return 5;
}

function scoreGeography(locationType: OpportunityScoreInput["locationType"]) {
  return { metro: 12, tier_1: 10, tier_2: 7, tier_3: 4 }[locationType];
}

function scoreAccess(accessQuality: string) {
  return { direct_owner: 16, decision_maker: 15, strong_relationship: 12, warm_introduction: 8, cold_access: 3 }[accessQuality] ?? 4;
}

function scoreReadiness(readiness: OpportunityScoreInput["infrastructureReadiness"]) {
  return { ready: 12, can_arrange: 8, unknown: 3, not_available: 0 }[readiness];
}

function scoreCommercial(intent: OpportunityScoreInput["commercialIntent"]) {
  return { purchase: 9, revenue_share: 8, distribution: 8, co_investment: 7, lease_commission: 6, open_discussion: 4 }[intent];
}

function scoreStrategicValue(value: OpportunityScoreInput["strategicValue"]) {
  return { fitness_audience: 13, wellness_audience: 10, distribution_network: 12, general_visibility: 7 }[value];
}
```

- [ ] **Step 8: Verify forecasting and scoring**

Run:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts
npm run typecheck
```

Expected: forecasting and scoring tests pass. TypeScript passes.

- [ ] **Step 9: Commit domain engine**

```bash
git add src/features/forecasting src/tests/features/forecasting-engine.test.ts src/tests/features/opportunity-scoring.test.ts
git commit -m "feat: add configurable forecasting and scoring engine"
```

---

### Task 4: Content System, Public Routes, And Legal Pages

**Files:**

- Create: `src/content/site.ts`
- Create: `src/content/products.ts`
- Create: `src/content/legal.ts`
- Create: `src/content/case-studies.ts`
- Create: `src/components/public/PublicHeader.tsx`
- Create: `src/components/public/PublicFooter.tsx`
- Create: `src/components/public/PolicyPage.tsx`
- Create: public route pages under `src/app/(public)/`
- Create: `src/tests/content/site-content.test.ts`

- [ ] **Step 1: Write content preservation tests**

Create `src/tests/content/site-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { contactDetails, preservedCopy, publicNavigation } from "@/content/site";
import { products } from "@/content/products";

describe("ProBlend content preservation", () => {
  it("preserves core public copy from the original website", () => {
    expect(preservedCopy.heroHeadline).toBe("Fuel your fitness, one shake at a time.");
    expect(preservedCopy.heroBody).toContain("fresh protein shakes");
    expect(preservedCopy.positioning).toContain("Not Just Another Vending Machine");
    expect(preservedCopy.premiumLine).toBe("Premium Nutrition, On Demand.");
  });

  it("preserves official contact details and fixes the malformed phone number", () => {
    expect(contactDetails.email).toBe("problend0@gmail.com");
    expect(contactDetails.address).toBe("K-18 Green Park Extension, New Delhi-110016");
    expect(contactDetails.phones).toEqual(["+91 9810427184", "+91 8586097112", "+91 9810341994"]);
  });

  it("keeps real ProBlend products and excludes Wix demo store products", () => {
    expect(products.map((product) => product.name)).toEqual([
      "Belgian Chocolate Protein Shake",
      "Vanilla Protein Shake",
      "Mango Protein Shake",
      "Cola Electrolyte Shake"
    ]);
    expect(products.map((product) => product.name).join(" ")).not.toMatch(/golf|baseball|vase|tote|chair|serum/i);
  });

  it("keeps public navigation close to the original website", () => {
    expect(publicNavigation.map((item) => item.label)).toEqual([
      "Home",
      "About Us",
      "How It Works",
      "Product Offerings",
      "Business Solutions",
      "Contact Us"
    ]);
  });
});
```

- [ ] **Step 2: Run content tests and confirm failure**

Run:

```bash
npm run test -- src/tests/content/site-content.test.ts
```

Expected: tests fail because content modules do not exist.

- [ ] **Step 3: Create content modules**

Create `src/content/site.ts` with exported `preservedCopy`, `contactDetails`, `publicNavigation`, `publicCtas`, `workingHours`, and `routeMetadata`. Include all copy listed in the spec section "Current Business Copy To Preserve".

Create `src/content/products.ts` with four product records:

```ts
export const products = [
  {
    slug: "belgian-chocolate",
    name: "Belgian Chocolate Protein Shake",
    description: "A rich chocolate protein shake for fresh, on-demand recovery.",
    nutrition: { protein: "Configurable", sugar: "Low-sugar option", format: "Fresh shake" },
    tags: ["High protein", "Customizable", "Cashless"]
  },
  {
    slug: "vanilla",
    name: "Vanilla Protein Shake",
    description: "A clean vanilla protein shake designed for daily fitness routines.",
    nutrition: { protein: "Configurable", sugar: "Low-sugar option", format: "Fresh shake" },
    tags: ["Everyday", "Customizable", "Fresh"]
  },
  {
    slug: "mango",
    name: "Mango Protein Shake",
    description: "A fruit-forward protein shake for active campuses, gyms, and offices.",
    nutrition: { protein: "Configurable", sugar: "Low-sugar option", format: "Fresh shake" },
    tags: ["Refreshing", "Campus friendly", "Customizable"]
  },
  {
    slug: "cola-electrolyte",
    name: "Cola Electrolyte Shake",
    description: "A functional electrolyte shake for hydration-led use cases.",
    nutrition: { protein: "Functional blend", sugar: "Diet-friendly option", format: "Fresh shake" },
    tags: ["Electrolytes", "Functional", "On demand"]
  }
] as const;
```

Create `src/content/legal.ts` with four legal page objects for Privacy Policy, Terms & Conditions, Cancellation & Refunds, and Shipping Policy. Preserve the policy topics from the spec and use `India` and `New Delhi` for the previously incomplete jurisdiction tokens.

Create `src/content/case-studies.ts` with an empty CMS-ready export:

```ts
export const caseStudies = [] as const;
```

- [ ] **Step 4: Create public layout, header, and footer**

Create `src/app/(public)/layout.tsx` that renders `PublicHeader`, `{children}`, and `PublicFooter`.

Create `PublicHeader` with original nav labels and a restrained text-link CTA to `/submit-opportunity`.

Create `PublicFooter` with contact details and footer policy links:

```ts
[
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cancellation-and-refunds", label: "Cancellation & Refunds" },
  { href: "/shipping-policy", label: "Shipping Policy" }
]
```

- [ ] **Step 5: Create public pages**

Create these pages:

```text
src/app/(public)/page.tsx
src/app/(public)/about/page.tsx
src/app/(public)/how-it-works/page.tsx
src/app/(public)/product-offerings/page.tsx
src/app/(public)/business-solutions/page.tsx
src/app/(public)/contact/page.tsx
src/app/(public)/privacy-policy/page.tsx
src/app/(public)/terms-and-conditions/page.tsx
src/app/(public)/cancellation-and-refunds/page.tsx
src/app/(public)/shipping-policy/page.tsx
```

Page requirements:

- Home uses the original hero copy and does not mention internal admin mechanics.
- About preserves company story and includes contact details.
- How It Works uses the four steps: choose, pay, prepare, enjoy.
- Product Offerings renders four ProBlend products only.
- Business Solutions includes revenue share, commission, lease, purchase, distribution, co-branding, sampling, turnkey installation, stocking, and maintenance.
- Business Solutions and Submit Opportunity include a restrained `Current collaboration needs` section fed by published `opportunity_posts`.
- Contact includes existing fields and contact information.
- Legal pages are linked only from footer and can be clean, text-first pages.

- [ ] **Step 6: Verify content and routes**

Run:

```bash
npm run test -- src/tests/content/site-content.test.ts
npm run typecheck
npm run build
```

Expected: content tests pass, TypeScript passes, build succeeds.

- [ ] **Step 7: Commit content and public route shell**

```bash
git add src/content src/components/public src/app/\\(public\\)
git commit -m "feat: rebuild ProBlend public content structure"
```

---

### Task 5: Public Forms And Server-Side Acquisition Actions

**Files:**

- Create: `src/features/contacts/schemas.ts`
- Create: `src/features/contacts/actions.ts`
- Create: `src/features/opportunities/schemas.ts`
- Create: `src/features/opportunities/actions.ts`
- Create: `src/features/waitlists/schemas.ts`
- Create: `src/features/waitlists/actions.ts`
- Create: `src/lib/request.ts`
- Create: `src/components/public/ContactForm.tsx`
- Create: `src/components/public/OpportunityForm.tsx`
- Create: `src/components/public/OpportunityPostList.tsx`
- Create: `src/tests/features/public-actions.test.ts`

- [ ] **Step 1: Write public action tests**

Create tests that call schema parsers and action helper functions with valid and invalid inputs. Required assertions:

```ts
expect(contactSubmissionSchema.safeParse(validContact).success).toBe(true);
expect(contactSubmissionSchema.safeParse({ ...validContact, email: "bad" }).success).toBe(false);
expect(opportunitySubmissionSchema.safeParse(validOpportunity).success).toBe(true);
expect(opportunitySubmissionSchema.safeParse({ ...validOpportunity, honeypot: "bot-filled" }).success).toBe(false);
expect(opportunityApplicationSchema.safeParse(validApplication).success).toBe(true);
expect(opportunityApplicationSchema.safeParse({ ...validApplication, opportunityPostId: "not-a-uuid" }).success).toBe(false);
```

- [ ] **Step 2: Create request helpers**

Create `src/lib/request.ts`:

```ts
import { headers } from "next/headers";

export async function getRequestMetadata() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for") ?? "";
  const ipAddress = forwardedFor.split(",")[0]?.trim() || "0.0.0.0";
  const userAgent = headerStore.get("user-agent") ?? "unknown";
  return { ipAddress, userAgent };
}
```

- [ ] **Step 3: Create Zod schemas**

Contact schema must include first name, last name, email, optional phone, message, source path, and honeypot.

Opportunity schema must include identity, contact, geography, access, scale, infrastructure, commercial intent, notes, source path, and honeypot.

Opportunity application schema must include opportunity post id, contact name, email, phone, organization name, city, state, intent, message, and honeypot.

Waitlist schema must include name, email, optional phone, city, state, interest type, notes, source path, and honeypot.

Each honeypot field must be accepted only when empty string or undefined.

- [ ] **Step 4: Implement server actions**

Each action must:

1. Parse input with Zod.
2. Reject filled honeypot.
3. Write the submission through the relevant `src/db/queries/*` function.
4. Write an `activity_logs` row with `actor_type = 'public'`.
5. Return a serializable union:

```ts
type ActionResult =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string };
```

Use these success messages:

- Contact: `Thanks for submitting!`
- Opportunity: `Thanks. ProBlend has received the opportunity details.`
- Opportunity application: `Thanks. ProBlend has received your application.`
- Waitlist: `Thanks. ProBlend has recorded your city interest.`

- [ ] **Step 5: Build form components**

Create `ContactForm`, `OpportunityForm`, `OpportunityPostList`, and waitlist UI sections with:

- Visible labels, not hint-only fields.
- `autocomplete` attributes for name, email, phone, organization, and address-like fields.
- 44px minimum touch targets.
- Loading, success, and error states.
- Hidden honeypot input with `tabIndex={-1}` and `autoComplete="off"`.

- [ ] **Step 6: Wire forms to pages**

- `ContactForm` appears on `/contact`.
- `OpportunityForm` appears on `/submit-opportunity`.
- `OpportunityPostList` appears on `/business-solutions` and `/submit-opportunity` and renders only published posts.
- Waitlist form appears as a small section on `/business-solutions` and `/contact`, not in the hero.

- [ ] **Step 7: Verify public actions**

Run:

```bash
npm run test -- src/tests/features/public-actions.test.ts
npm run typecheck
npm run build
```

Expected: schema/action tests pass, TypeScript passes, build succeeds.

- [ ] **Step 8: Commit acquisition forms**

```bash
git add src/features/contacts src/features/opportunities src/features/waitlists src/lib/request.ts src/components/public src/app/\\(public\\)
git commit -m "feat: add public opportunity acquisition forms"
```

---

### Task 6: Placement Estimate Flow And Forecast Persistence

**Files:**

- Modify: `src/features/forecasting/schemas.ts`
- Create: `src/features/forecasting/actions.ts`
- Create: `src/components/public/PlacementEstimateForm.tsx`
- Create: `src/app/(public)/placement-estimate/page.tsx`
- Modify: `src/db/queries/forecasts.ts`
- Modify: `src/db/queries/opportunities.ts`
- Create: a migration in `supabase/migrations/` using `npx supabase migration new seed_default_forecast_config`

- [ ] **Step 1: Create forecast config seed migration using CLI**

Run:

```bash
npx supabase migration new seed_default_forecast_config
```

Expected: Supabase prints a generated SQL file ending with `_seed_default_forecast_config.sql`.

- [ ] **Step 2: Seed configurable assumptions**

In the generated seed migration, insert one active forecast config and version. The `assumptions` JSON must match `ForecastAssumptions` and use these starting values from `testForecastAssumptions`. This is a configurable seed, not logic embedded in the engine.

- [ ] **Step 3: Create placement estimate action**

`runPlacementEstimateAction` must:

1. Validate public input.
2. Fetch the active forecast config version.
3. Call `calculateForecast(input, activeVersion.assumptions)`.
4. Create a `calculator_submissions` row.
5. Create a `forecast_runs` row with input snapshot, output snapshot, assumptions snapshot, config version id, timestamp, source `placement_estimate`, and reasoning.
6. Return a public-safe output containing demand estimate, revenue estimate, recommended machine count, opportunity score, confidence, and reasoning.

- [ ] **Step 4: Create the calculator UI**

`PlacementEstimateForm` must include:

- Venue type.
- Daily footfall.
- Operating hours.
- Location type.
- Placement area.
- City and state.
- Access quality.
- Infrastructure readiness.
- Commercial intent.
- Optional name, email, and phone.

Output UI must animate number changes with GSAP and must not expose individual internal multipliers or editable assumptions.

- [ ] **Step 5: Verify placement estimate**

Run:

```bash
npm run test -- src/tests/features/forecasting-engine.test.ts
npm run typecheck
npm run build
```

Then run the app and verify in Browser:

```bash
npm run dev
```

Manual Browser path:

- Open `/placement-estimate`.
- Submit a gym, 500 footfall, 14 hours, metro estimate.
- Confirm demand, revenue, machine count, score, confidence, and reasoning render.
- Confirm no forecast configuration controls appear publicly.

- [ ] **Step 6: Commit placement estimate**

```bash
git add src/features/forecasting src/components/public/PlacementEstimateForm.tsx src/app/\\(public\\)/placement-estimate supabase/migrations src/db/queries
git commit -m "feat: add placement estimate forecasting flow"
```

---

### Task 7: Admin Auth, Sessions, And Setup Flow

**Files:**

- Create: `src/features/admin-auth/passwords.ts`
- Create: `src/features/admin-auth/rate-limit.ts`
- Create: `src/features/admin-auth/session.ts`
- Create: `src/features/admin-auth/guards.ts`
- Create: `src/features/admin-auth/schemas.ts`
- Create: `src/features/admin-auth/actions.ts`
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/setup/page.tsx`
- Create: `src/app/api/admin/logout/route.ts`
- Create: `src/tests/features/admin-auth.test.ts`

- [ ] **Step 1: Write auth tests first**

Create tests for:

- Argon2id password hashing verifies the original password and rejects a different password.
- Session token hashing is deterministic for the same token and does not equal the plain token.
- Login schema rejects invalid email and short password.
- Setup schema requires the setup key.

- [ ] **Step 2: Implement password helpers**

Create `passwords.ts`:

```ts
import { Algorithm, hash, verify } from "@node-rs/argon2";

export async function hashAdminPassword(password: string) {
  return hash(password, {
    algorithm: Algorithm.Argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  });
}

export async function verifyAdminPassword(hashValue: string, password: string) {
  return verify(hashValue, password);
}
```

- [ ] **Step 3: Implement session helpers**

Use random opaque tokens:

```ts
import crypto from "node:crypto";

export function createSessionToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
```

Set cookies as `httpOnly`, `secure` in production, `sameSite: "lax"`, path `/`, and expiry of 7 days.

- [ ] **Step 4: Implement rate limiting**

Use `admin_login_attempts` to block more than 5 failed attempts for the same email or IP in 15 minutes. Return a generic login error: `Invalid email or password.`

- [ ] **Step 5: Implement setup and login actions**

Setup flow:

- Accept name, email, password, setup key.
- Compare setup key to `env.ADMIN_SETUP_KEY`.
- Allow setup only when there are zero admin users.
- Hash password with Argon2id.
- Create admin user with role `owner`.
- Write audit log `admin.setup.created_owner`.

Login flow:

- Validate email/password.
- Apply rate limit.
- Verify password.
- Create admin session.
- Set secure cookie.
- Write audit log `admin.auth.login`.

- [ ] **Step 6: Protect admin routes**

Create `requireAdmin()` in `guards.ts` that:

- Reads the session cookie.
- Hashes the token.
- Finds an active non-expired session and active admin user.
- Redirects unauthenticated requests to `/admin/login`.

Use `requireAdmin()` in `src/app/admin/layout.tsx` for all admin pages except `/admin/login` and `/admin/setup`.

- [ ] **Step 7: Verify auth**

Run:

```bash
npm run test -- src/tests/features/admin-auth.test.ts
npm run typecheck
npm run build
```

Manual Browser path:

- Open `/admin/setup`.
- Create owner with the setup key from local `.env`.
- Log out through `/api/admin/logout`.
- Log in from `/admin/login`.
- Confirm `/admin` loads only after login.

- [ ] **Step 8: Commit admin auth**

```bash
git add src/features/admin-auth src/app/admin src/app/api/admin/logout src/tests/features/admin-auth.test.ts
git commit -m "feat: add secure admin login"
```

---

### Task 8: Admin Dashboard, Operations Views, And Exports

**Files:**

- Create: `src/components/admin/AdminShell.tsx`
- Create: `src/components/admin/AdminHeader.tsx`
- Create: `src/components/admin/AdminSidebar.tsx`
- Create: `src/components/admin/DataTable.tsx`
- Create: `src/components/admin/StatusPill.tsx`
- Create: `src/components/admin/ScoreCard.tsx`
- Create: `src/components/admin/ForecastConfigEditor.tsx`
- Create: admin pages under `src/app/admin/`
- Create: `src/lib/csv.ts`
- Create: `src/app/api/admin/export/[dataset]/route.ts`

- [ ] **Step 1: Create admin shell**

Admin shell requirements:

- Dense, quiet, operational UI.
- No marketing hero treatment.
- Sidebar routes: Overview, Opportunities, Contacts, Calculator, Forecast Configs, Forecast Runs, Waitlists, Activity, Settings.
- Header includes current admin name and logout action.
- Mobile admin uses a drawer-style nav with visible focus states.

- [ ] **Step 2: Create dashboard overview**

`/admin` shows:

- New opportunities count.
- New opportunity applications count.
- New contact submissions count.
- Calculator submissions count.
- Active forecast config version.
- Recent activity.
- No public navigation links except a small `View site` link.

- [ ] **Step 3: Create management pages**

Pages:

- `/admin/opportunities`: list, search, filter by status, city, state, commercial intent.
- `/admin/opportunities/[id]`: full record, events, latest score, forecast runs, status update.
- `/admin/opportunities`: include a `Published needs` tab for `opportunity_posts` and an `Applications` tab for `opportunity_applications`.
- `/admin/contacts`: contact submissions, status updates.
- `/admin/calculator`: calculator submissions and linked forecast runs.
- `/admin/forecast-configs`: active config, version list, compare two versions, create new version.
- `/admin/forecast-runs`: stored input/output/assumption snapshots.
- `/admin/waitlists`: waitlist entries.
- `/admin/activity`: audit and activity logs.
- `/admin/settings`: admin account overview and setup status.

- [ ] **Step 4: Implement forecast config editor**

The editor must edit all assumption categories:

- Commercial: drink price, revenue per transaction, product mix.
- Behavioral: conversion rate, repeat purchase rate.
- Venue multipliers: college, gym, office, hospital, mall, residence, other.
- Geographic multipliers: metro, tier 1, tier 2, tier 3.
- Operational: transactions per machine, max recommended machines, operating-hour baseline.

Saving creates a new `forecast_config_versions` row. It never mutates an existing version.

- [ ] **Step 5: Implement CSV exports**

Create `src/lib/csv.ts`:

```ts
export function toCsv(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
}
```

`/api/admin/export/[dataset]` supports `opportunities`, `opportunity-applications`, `contacts`, `calculator`, `waitlists`, and `forecast-runs`. It must call `requireAdmin()` and write audit log `admin.export.created`.

- [ ] **Step 6: Verify admin dashboard**

Run:

```bash
npm run typecheck
npm run build
```

Manual Browser path:

- Log in as admin.
- Open every admin route.
- Search and filter opportunities.
- Create a published opportunity post for `Looking for operators`.
- Confirm the published post appears on `/business-solutions` while logged out.
- Change a contact status.
- Create a new forecast config version.
- Export opportunities CSV.
- Confirm unauthenticated `/admin/opportunities` redirects to `/admin/login`.

- [ ] **Step 7: Commit admin dashboard**

```bash
git add src/components/admin src/app/admin src/app/api/admin/export src/lib/csv.ts src/db/queries
git commit -m "feat: add admin operations dashboard"
```

---

### Task 9: Product Explorer, Expansion Map, Case Study Framework, And Motion Layer

**Files:**

- Create: `src/components/public/ProductExplorer.tsx`
- Create: `src/components/public/ExpansionMap.tsx`
- Modify: `src/app/(public)/product-offerings/page.tsx`
- Modify: `src/app/(public)/business-solutions/page.tsx`
- Modify: `src/app/(public)/page.tsx`
- Modify: `src/content/case-studies.ts`

- [ ] **Step 1: Create product explorer**

Product Explorer v1 uses static product data from `src/content/products.ts` and includes:

- Product tabs for four flavours.
- Nutrition display framework.
- Machine capability panel: cashless payments, GPRS tracking, inventory monitoring, analytics, remote monitoring, predictive restocking.
- Customization notes for protein content and flavour intensity.

- [ ] **Step 2: Create expansion map**

Expansion Map v1 shows India as an interactive visual with static deployment/opportunity categories:

- Existing base: New Delhi address.
- Target markets: Mumbai, Pune, Bengaluru, Hyderabad, Chennai, Ahmedabad, Kolkata, Jaipur.
- Active opportunities: populated from real `opportunities` data on admin pages; public page can show target cities without internal counts.

Public map must not reveal private opportunity records.

- [ ] **Step 3: Create case study framework**

Case study framework includes:

- `caseStudies` content shape with slug, title, venue type, city, summary, metrics, body, and publication flag.
- Public case-study section renders only published items.
- Admin data model is already present for CMS-ready future editing.

- [ ] **Step 4: Add GSAP motion layer**

Motion requirements:

- Character-based hero reveal on the home page.
- Scroll storytelling for machine capability sections.
- Product/flavour reveal in Product Explorer.
- Animated calculator output transitions.
- Admin dashboard micro-interactions only where they clarify state.

Implementation rules:

- Keep GSAP inside client components.
- Guard motion with `prefers-reduced-motion`.
- Do not animate continuously for decoration.
- Do not make layout shift during text reveals.

- [ ] **Step 5: Verify public visual behavior**

Run:

```bash
npm run typecheck
npm run build
```

Manual Browser path:

- Open `/`.
- Verify hero copy reveals without overlap.
- Scroll through Home, Product Offerings, and Business Solutions.
- Confirm product explorer tabs update content.
- Confirm public map does not show internal opportunity records.
- Use a mobile viewport and confirm text, forms, nav, and product tabs fit without horizontal overflow.

- [ ] **Step 6: Commit product and motion layer**

```bash
git add src/components/public src/app/\\(public\\) src/content
git commit -m "feat: add product explorer map and motion"
```

---

### Task 10: Analytics, Activity Logging, Health, SEO, And Policy Verification

**Files:**

- Create: `src/features/analytics/events.ts`
- Create: `src/features/analytics/actions.ts`
- Create: `src/app/api/health/route.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: public form actions
- Modify: admin actions

- [ ] **Step 1: Add analytics event registry**

Create `src/features/analytics/events.ts`:

```ts
export const analyticsEvents = {
  ctaClick: "cta_click",
  contactSubmitted: "contact_submitted",
  opportunitySubmitted: "opportunity_submitted",
  calculatorStarted: "calculator_started",
  calculatorCompleted: "calculator_completed",
  adminStatusChanged: "admin_status_changed",
  forecastConfigVersionCreated: "forecast_config_version_created",
  exportCreated: "export_created"
} as const;
```

- [ ] **Step 2: Add analytics action**

Create `trackEventAction` that validates event name, source path, session id, and JSON metadata, then inserts into `analytics_events`.

- [ ] **Step 3: Wire analytics**

Track:

- CTA clicks for placement estimate, submit opportunity, contact.
- Contact submissions.
- Opportunity submissions.
- Calculator started and completed.
- Admin status updates.
- Forecast config version creation.
- Exports.

- [ ] **Step 4: Add health route**

Create `src/app/api/health/route.ts`:

```ts
export async function GET() {
  return Response.json({
    ok: true,
    service: "problend-digital-os",
    timestamp: new Date().toISOString()
  });
}
```

- [ ] **Step 5: Add sitemap and robots**

Sitemap includes only public and legal routes. It must not include `/admin` or `/api`.

Robots allows public pages and disallows `/admin` and `/api`.

- [ ] **Step 6: Verify analytics and SEO**

Run:

```bash
npm run typecheck
npm run build
```

Manual Browser path:

- Open `/sitemap.xml` and confirm public routes only.
- Open `/robots.txt` and confirm admin/API disallow rules.
- Submit a local contact form and confirm an analytics event is stored.

- [ ] **Step 7: Commit analytics and SEO**

```bash
git add src/features/analytics src/app/api/health src/app/sitemap.ts src/app/robots.ts src/features src/app
git commit -m "feat: add analytics health and SEO routes"
```

---

### Task 11: End-To-End QA, Accessibility, Supabase Advisors, And Launch Hardening

**Files:**

- Create: `src/tests/e2e/public.spec.ts`
- Create: `src/tests/e2e/admin.spec.ts`
- Modify: documentation files when verification produces setup notes

- [ ] **Step 1: Add public Playwright tests**

`public.spec.ts` covers:

- Home page loads and contains `Fuel your fitness, one shake at a time.`
- `/product-offerings` contains four ProBlend products and no Wix demo products.
- `/contact` form can submit valid test data.
- `/submit-opportunity` form can submit valid opportunity data.
- `/placement-estimate` returns a forecast output.
- Footer links reach all four legal pages.

- [ ] **Step 2: Add admin Playwright tests**

`admin.spec.ts` covers:

- Unauthenticated `/admin` redirects to `/admin/login`.
- Setup creates first owner in local dev.
- Login succeeds with created owner.
- Opportunities page loads.
- Forecast config page loads.
- Export route returns CSV for authenticated admin.

- [ ] **Step 3: Run full automated verification**

Run:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Expected: all checks pass.

- [ ] **Step 4: Run Supabase verification**

Run:

```bash
npx supabase db reset
npx supabase migration list --local
npx supabase db advisors
```

Expected: migrations apply locally, local migration list includes the schema and seed migrations, and advisors do not report unhandled critical security issues.

- [ ] **Step 5: Browser visual QA**

Use Browser plugin:

- Desktop: `/`, `/about`, `/how-it-works`, `/product-offerings`, `/business-solutions`, `/contact`, `/placement-estimate`, `/submit-opportunity`.
- Mobile viewport: `/`, `/product-offerings`, `/placement-estimate`, `/submit-opportunity`, `/admin/login`.
- Authenticated admin: `/admin`, `/admin/opportunities`, `/admin/forecast-configs`, `/admin/forecast-runs`.

Confirm:

- Public site is recognizably ProBlend and not generic AI/SaaS.
- Internal system features are absent from public pages.
- Original business content is preserved.
- Forms have labels, visible focus states, loading states, success states, and error states.
- No text overlap or horizontal overflow.
- GSAP respects reduced-motion settings.

- [ ] **Step 6: Document launch notes**

Update `docs/supabase.md` with:

- Migration commands used.
- Production env var names.
- Admin setup process.
- Mumbai project reference.
- Note that `.temp` remains ignored.

Create `docs/runbook.md` with:

- Local development commands.
- Admin setup steps.
- How to rotate the setup key.
- How to create a forecast config version.
- How to export records.
- Verification checklist.

- [ ] **Step 7: Final commit**

```bash
git add src docs supabase package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs drizzle.config.ts vitest.config.ts playwright.config.ts .env.example
git commit -m "chore: verify ProBlend digital OS MVP"
```

---

## Spec Coverage Matrix

| Requirement | Plan Tasks |
| --- | --- |
| Existing site rebuilt at higher quality | Tasks 4, 9, 11 |
| Preserve existing business information | Task 4 content tests |
| Exclude Wix demo products | Task 4 content tests |
| Public site does not expose internal features | Tasks 4, 9, 11 |
| Opportunity Exchange end to end | Tasks 5, 8, 11 |
| ProBlend-posted opportunities and applications | Tasks 2, 5, 8, 11 |
| Machine Placement Calculator end to end | Tasks 3, 6, 11 |
| No hardcoded calculator assumptions | Tasks 3 and 6; engine receives assumptions, seed/config stores assumptions |
| Forecast configuration dashboard | Task 8 |
| Version and compare assumptions | Task 8 |
| Store inputs, outputs, assumptions, timestamp, reasoning | Tasks 2 and 6 |
| Transparent heuristic scoring | Task 3 |
| Admin dashboard | Tasks 7 and 8 |
| Partner/public opportunity submission without signup | Task 5 |
| Analytics tracking | Task 10 |
| Supabase Mumbai database | Current setup plus Tasks 2 and 11 |
| Secure admin auth | Task 7 |
| Footer official policy pages | Task 4 |
| Mobile and accessibility verification | Tasks 5, 9, 11 |
| Documentation complete | Task 11 |

## Risks And Guardrails

- **Argon2 deployment compatibility:** Use `@node-rs/argon2`. If deployment blocks native bindings, switch to a reviewed bcrypt fallback in a dedicated commit and document the reason.
- **Supabase Data API exposure:** Keep public tables behind server actions. Revoke `anon` and `authenticated` grants and enable RLS in migrations.
- **Forecast assumption drift:** The engine must not import seeded assumptions. It must receive assumptions from the active config version.
- **Public/internal leakage:** The public website can promote a placement estimate, but cannot describe forecast config, scoring factors, exports, admin dashboards, or audit logs.
- **Visual drift:** Use the accepted A+B hybrid direction and Barlow typography. Keep buttons restrained and close to the original ProBlend tone.
- **Legal copy:** Preserve current official policy topics and use India/New Delhi jurisdiction unless counsel gives alternate launch copy.

## Source Notes

Supabase-specific execution should follow current Supabase documentation:

- Supabase region and migration behavior: `https://supabase.com/docs/guides/troubleshooting/change-project-region-eWJo5Z`
- Supabase available regions: `https://supabase.com/docs/guides/platform/regions`
- Supabase RLS: `https://supabase.com/docs/guides/database/postgres/row-level-security`
- Supabase API security grants/RLS model: `https://supabase.com/docs/guides/api/securing-your-api`
