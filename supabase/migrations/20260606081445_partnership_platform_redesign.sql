alter table public.opportunities
  add column opportunity_kind text not null default 'venue',
  add column source_path text not null default '/business-solutions',
  add column details jsonb not null default '{}'::jsonb;

alter table public.opportunities
  drop constraint if exists opportunities_relationship_strength_check;

alter table public.opportunities
  alter column city drop not null,
  alter column state drop not null,
  alter column relationship_strength drop not null,
  alter column authority_level drop not null,
  alter column electricity_readiness drop not null,
  alter column internet_readiness drop not null,
  alter column commercial_intent drop not null;

alter table public.opportunities
  add constraint opportunities_opportunity_kind_check
    check (opportunity_kind in ('venue', 'city_network', 'introduction')),
  add constraint opportunities_relationship_strength_check
    check (relationship_strength in ('direct_owner', 'decision_maker', 'strong_relationship', 'warm_introduction', 'cold_access', 'unknown')),
  add constraint opportunities_details_object_check
    check (jsonb_typeof(details) = 'object');

create index opportunities_kind_status_created_idx
  on public.opportunities(opportunity_kind, status, created_at desc);

alter table public.opportunity_posts
  add column status text not null default 'draft',
  add column display_order integer not null default 0,
  add column closes_at timestamptz;

update public.opportunity_posts
set status = 'open'
where is_published = true;

alter table public.opportunity_posts
  add constraint opportunity_posts_status_check
    check (status in ('draft', 'open', 'closed', 'archived')),
  add constraint opportunity_posts_display_order_check
    check (display_order >= 0);

create index opportunity_posts_public_board_idx
  on public.opportunity_posts(is_published, status, display_order, published_at desc);

alter table public.opportunity_applications
  add column source_path text not null default '/business-solutions';
