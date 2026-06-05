# Supabase Setup

This repo uses the Supabase CLI through `npx` so future agents do not need a global CLI install.

## Current CLI Setup

```bash
npx supabase login
npx supabase init
npx supabase link --project-ref nivqletcxiingzvxvfjb
```

Current linked project:

- Project ref: `nivqletcxiingzvxvfjb`
- Organization id: `xgejdxtkxjnrwdnocjzn`
- Region: Northeast Asia (Tokyo)

## Mumbai Requirement

ProBlend's production database should be in South Asia (Mumbai), region code `ap-south-1`.

Supabase projects are region-bound after creation. To move from Tokyo to Mumbai, create a new project in `ap-south-1`, link this repo to the new project ref, then migrate schema/data through migrations or a controlled dump/restore.

```bash
npx supabase projects create problend-mumbai \
  --org-id xgejdxtkxjnrwdnocjzn \
  --region ap-south-1 \
  --db-password "<database-password>"
```

After the Mumbai project exists:

```bash
npx supabase link --project-ref <mumbai-project-ref>
```

Do not commit files under `supabase/.temp`; they are intentionally ignored.
