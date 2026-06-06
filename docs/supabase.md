# Supabase Setup

This repo uses the Supabase CLI through `npx` so future agents do not need a global CLI install.

## Current CLI Setup

```bash
npx supabase login
npx supabase init
npx supabase link --project-ref tueqoqusbxeldxnnarlv
```

Current linked project:

- Project URL: `https://tueqoqusbxeldxnnarlv.supabase.co`
- Project ref: `tueqoqusbxeldxnnarlv`
- Organization id: `xgejdxtkxjnrwdnocjzn`
- Region: South Asia (Mumbai)

## Region

ProBlend's production database is in South Asia (Mumbai), region code `ap-south-1`.

Supabase projects are region-bound after creation. If the region ever needs to change again, create a new project in the target region, link this repo to the new project ref, then migrate schema/data through migrations or a controlled dump/restore.

## Production Environment Variables

Set these server-side variables in production:

```bash
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_URL="https://www.problend.co.in"
ADMIN_SETUP_KEY="a-long-random-secret"
SESSION_COOKIE_NAME="problend_admin_session"
```

Notes:

- `DATABASE_URL` is used only server-side through Drizzle/Postgres.
- `NEXT_PUBLIC_SITE_URL` is used for canonical SEO routes and is safe to expose.
- `ADMIN_SETUP_KEY` gates first-owner setup and must be kept secret.
- `SESSION_COOKIE_NAME` is optional; the app defaults to `problend_admin_session`.
- The app uses built-in admin auth. Do not add public visitor accounts or Supabase Auth for admin login.

## Admin Setup Process

1. Deploy or run the app with `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, and `ADMIN_SETUP_KEY` set.
2. Open `/admin/setup`.
3. Enter owner name, email, password, and the setup key.
4. The setup action creates the first owner only when no admin users exist.
5. After setup, use `/admin/login` for future access.

To rotate the setup key, update `ADMIN_SETUP_KEY` in the deployment environment and restart or redeploy the app. Existing admin sessions and users are not changed by setup-key rotation.

## Local Migration Commands

Use Docker Desktop plus the Supabase CLI through `npx`:

```bash
npx supabase start
npx supabase db reset
npx supabase migration list --local
npx supabase db advisors
```

Current local migrations:

- `20260605181328_initial_digital_os_schema.sql`
- `20260606081445_partnership_platform_redesign.sql`
- `20260606091603_seed_default_forecast_config.sql`

## Task 11 Verification Attempt

Date: 2026-06-06

CLI version:

```bash
npx supabase --version
# 2.105.0
```

Command results:

```bash
npx supabase status
# BLOCKED: failed to inspect container health: Cannot connect to the Docker daemon at unix:///var/run/docker.sock.

npx supabase db reset
# BLOCKED: failed to inspect service: Cannot connect to the Docker daemon at unix:///var/run/docker.sock.

npx supabase migration list --local
# BLOCKED: failed to connect to postgres at 127.0.0.1:54322: connection refused.

npx supabase db advisors
# BLOCKED: failed to connect to postgres at 127.0.0.1:54322: connection refused.
```

The Task 11 run did not prove local migrations or advisors pass because Docker was unavailable and the local Supabase Postgres port was closed. Rerun the commands above after Docker Desktop is running and the local Supabase stack is started.

Do not commit files under `supabase/.temp`; they are intentionally ignored by `supabase/.gitignore`. A root `.temp` directory is not used by this project.
