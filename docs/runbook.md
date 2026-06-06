# ProBlend Digital OS Runbook

## Local Development

```bash
npm install
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Local database workflow:

```bash
npx supabase start
npx supabase db reset
npx supabase migration list --local
npx supabase db advisors
```

Docker Desktop must be running for the local Supabase stack. The default local database URL is:

```bash
postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

## Admin Setup

1. Set `ADMIN_SETUP_KEY` in the environment.
2. Open `/admin/setup`.
3. Create the first owner with name, email, password, and setup key.
4. Sign in at `/admin/login`.

Setup only creates an owner when no admin users exist. If setup has already been completed, use an existing admin account or reset the local database in a disposable local environment.

## Rotate The Setup Key

1. Generate a new long random secret.
2. Update `ADMIN_SETUP_KEY` in local or production environment variables.
3. Restart the dev server or redeploy production.
4. Store the new key in the team secret manager.

Existing admin users and sessions are not rotated by this key. Use admin password/session procedures separately if account credentials are compromised.

## Forecast Config Versions

1. Sign in as admin.
2. Open `/admin/forecast-configs`.
3. Edit the commercial, behavioral, operational, venue, or geographic assumptions.
4. Add a change note.
5. Click `Create new version`.

The app creates immutable forecast config versions. Historical forecast runs keep their input, output, and assumptions snapshots.

## Export Records

Admin CSV exports require an authenticated admin session.

Supported export routes:

```bash
/api/admin/export/opportunities
/api/admin/export/opportunity-applications
/api/admin/export/contacts
/api/admin/export/calculator
/api/admin/export/waitlists
/api/admin/export/forecast-runs
```

Each export writes audit and analytics records when the database is available.

## Verification Checklist

Run these sequentially:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
git diff --check
```

Do not run `npm run typecheck` and `npm run build` in parallel because `.next/types` can race while Next regenerates route types.

Run Supabase checks after Docker Desktop is available:

```bash
npx supabase db reset
npx supabase migration list --local
npx supabase db advisors
```

Run browser QA on:

- Desktop: `/`, `/about`, `/how-it-works`, `/product-offerings`, `/business-solutions`, `/contact`, `/placement-estimate`, `/submit-opportunity`.
- Mobile: `/`, `/product-offerings`, `/placement-estimate`, `/submit-opportunity`, `/admin/login`.
- Authenticated admin: `/admin`, `/admin/opportunities`, `/admin/forecast-configs`, `/admin/forecast-runs`.

If the local database is unavailable, do not claim DB-backed form submissions, placement estimate persistence, admin authenticated pages, exports, migrations, or Supabase advisors passed.
