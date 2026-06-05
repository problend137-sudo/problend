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

Do not commit files under `supabase/.temp`; they are intentionally ignored.
