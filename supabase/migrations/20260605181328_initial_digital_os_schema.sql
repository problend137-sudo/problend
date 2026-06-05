create schema if not exists extensions;

create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

alter default privileges for role postgres in schema public
  revoke select, insert, update, delete on tables from anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke usage, select on sequences from anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke execute on functions from public;

create table public.admin_users (
  id uuid primary key default extensions.gen_random_uuid(),
  email extensions.citext not null unique,
  name text not null,
  role text not null default 'admin' check (role in ('owner', 'admin', 'analyst')),
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_sessions (
  id uuid primary key default extensions.gen_random_uuid(),
  admin_user_id uuid not null references public.admin_users(id) on delete cascade,
  session_token_hash text not null unique,
  user_agent text,
  ip_address inet,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.admin_login_attempts (
  id uuid primary key default extensions.gen_random_uuid(),
  email extensions.citext,
  ip_address inet,
  was_successful boolean not null,
  failure_reason text,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default extensions.gen_random_uuid(),
  admin_user_id uuid references public.admin_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default extensions.gen_random_uuid(),
  actor_type text not null check (actor_type in ('public', 'admin', 'system')),
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default extensions.gen_random_uuid(),
  event_name text not null,
  source_path text not null,
  session_id text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default extensions.gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email extensions.citext not null,
  phone text,
  message text not null,
  source_path text not null default '/contact',
  status text not null default 'new' check (status in ('new', 'reviewed', 'replied', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.waitlist_entries (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  email extensions.citext not null,
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
  id uuid primary key default extensions.gen_random_uuid(),
  source_type text not null default 'external_opportunity_source',
  identity_type text not null check (identity_type in ('individual', 'institution', 'company', 'operator', 'distributor', 'venue_owner', 'strategic_introducer')),
  contact_name text not null,
  designation text,
  email extensions.citext not null,
  phone text not null,
  organization_name text,
  city text not null,
  state text not null,
  region text,
  has_multi_city_access boolean not null default false,
  location_types text[] not null default '{}'::text[],
  access_method text not null,
  relationship_strength text not null check (relationship_strength in ('direct_owner', 'decision_maker', 'strong_relationship', 'warm_introduction', 'cold_access')),
  authority_level text not null check (authority_level in ('final_decision', 'influencer', 'introducer', 'unknown')),
  venue_count integer check (venue_count is null or venue_count >= 0),
  approximate_daily_footfall integer check (approximate_daily_footfall is null or approximate_daily_footfall >= 0),
  reach_description text,
  expected_machine_count integer check (expected_machine_count is null or expected_machine_count >= 0),
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
  id uuid primary key default extensions.gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (category in ('operator', 'venue_access', 'distributor', 'strategic_introduction')),
  summary text not null,
  location_scope text not null,
  commercial_model text not null check (commercial_model in ('purchase', 'revenue_share', 'lease_commission', 'distribution', 'co_investment', 'open_discussion')),
  requirements text[] not null default '{}'::text[],
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.opportunity_applications (
  id uuid primary key default extensions.gen_random_uuid(),
  opportunity_post_id uuid not null references public.opportunity_posts(id) on delete cascade,
  contact_name text not null,
  email extensions.citext not null,
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
  id uuid primary key default extensions.gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  admin_user_id uuid references public.admin_users(id) on delete set null,
  event_type text not null,
  note text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);

create table public.forecast_configs (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null,
  description text,
  is_active boolean not null default false,
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.forecast_config_versions (
  id uuid primary key default extensions.gen_random_uuid(),
  forecast_config_id uuid not null references public.forecast_configs(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  assumptions jsonb not null check (jsonb_typeof(assumptions) = 'object'),
  change_note text not null,
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint forecast_config_versions_config_version_key unique (forecast_config_id, version_number)
);

create table public.calculator_submissions (
  id uuid primary key default extensions.gen_random_uuid(),
  opportunity_id uuid references public.opportunities(id) on delete set null,
  contact_name text,
  email extensions.citext,
  phone text,
  venue_type text not null,
  daily_footfall integer not null check (daily_footfall >= 0),
  operating_hours numeric(4, 1) not null check (operating_hours > 0 and operating_hours <= 24),
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
  id uuid primary key default extensions.gen_random_uuid(),
  calculator_submission_id uuid references public.calculator_submissions(id) on delete set null,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  forecast_config_version_id uuid not null references public.forecast_config_versions(id) on delete restrict,
  input_snapshot jsonb not null check (jsonb_typeof(input_snapshot) = 'object'),
  assumptions_snapshot jsonb not null check (jsonb_typeof(assumptions_snapshot) = 'object'),
  output_snapshot jsonb not null check (jsonb_typeof(output_snapshot) = 'object'),
  reasoning text[] not null default '{}'::text[],
  source text not null check (source in ('placement_estimate', 'admin_manual', 'opportunity_submission')),
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.opportunity_scores (
  id uuid primary key default extensions.gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  forecast_run_id uuid references public.forecast_runs(id) on delete set null,
  score integer not null check (score between 0 and 100),
  rating text not null check (rating in ('low', 'moderate', 'strong', 'priority')),
  confidence integer not null check (confidence between 0 and 100),
  factor_breakdown jsonb not null check (jsonb_typeof(factor_breakdown) = 'object'),
  reasoning text[] not null default '{}'::text[],
  created_by uuid references public.admin_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.case_studies (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  title text not null,
  venue_type text not null,
  city text not null,
  summary text not null,
  metrics jsonb not null default '{}'::jsonb check (jsonb_typeof(metrics) = 'object'),
  body text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index admin_sessions_admin_user_idx on public.admin_sessions(admin_user_id);
create index admin_sessions_expires_idx on public.admin_sessions(expires_at);
create index admin_login_attempts_email_created_idx on public.admin_login_attempts(email, created_at desc);
create index audit_logs_admin_user_idx on public.audit_logs(admin_user_id);
create index activity_logs_actor_idx on public.activity_logs(actor_type, actor_id);
create index contact_submissions_status_created_idx on public.contact_submissions(status, created_at desc);
create index waitlist_entries_city_state_idx on public.waitlist_entries(city, state);
create index opportunities_status_created_idx on public.opportunities(status, created_at desc);
create index opportunities_city_state_idx on public.opportunities(city, state);
create index opportunity_posts_created_by_idx on public.opportunity_posts(created_by);
create index opportunity_posts_published_idx on public.opportunity_posts(is_published, published_at desc);
create index opportunity_applications_post_idx on public.opportunity_applications(opportunity_post_id, status, created_at desc);
create index opportunity_events_opportunity_idx on public.opportunity_events(opportunity_id);
create index opportunity_events_admin_user_idx on public.opportunity_events(admin_user_id);
create index forecast_configs_created_by_idx on public.forecast_configs(created_by);
create unique index forecast_configs_single_active_idx on public.forecast_configs(is_active) where is_active;
create index forecast_config_versions_config_idx on public.forecast_config_versions(forecast_config_id, version_number desc);
create index forecast_config_versions_created_by_idx on public.forecast_config_versions(created_by);
create index calculator_submissions_opportunity_idx on public.calculator_submissions(opportunity_id);
create index forecast_runs_calculator_submission_idx on public.forecast_runs(calculator_submission_id);
create index forecast_runs_opportunity_idx on public.forecast_runs(opportunity_id);
create index forecast_runs_config_version_idx on public.forecast_runs(forecast_config_version_id);
create index forecast_runs_created_by_idx on public.forecast_runs(created_by);
create index forecast_runs_created_idx on public.forecast_runs(created_at desc);
create index opportunity_scores_opportunity_idx on public.opportunity_scores(opportunity_id, created_at desc);
create index opportunity_scores_forecast_run_idx on public.opportunity_scores(forecast_run_id);
create index opportunity_scores_created_by_idx on public.opportunity_scores(created_by);
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

revoke all on table
  public.admin_users,
  public.admin_sessions,
  public.admin_login_attempts,
  public.audit_logs,
  public.activity_logs,
  public.analytics_events,
  public.contact_submissions,
  public.waitlist_entries,
  public.opportunities,
  public.opportunity_posts,
  public.opportunity_applications,
  public.opportunity_events,
  public.forecast_configs,
  public.forecast_config_versions,
  public.calculator_submissions,
  public.forecast_runs,
  public.opportunity_scores,
  public.case_studies
from anon, authenticated;

grant select, insert, update, delete on table
  public.admin_users,
  public.admin_sessions,
  public.admin_login_attempts,
  public.audit_logs,
  public.activity_logs,
  public.analytics_events,
  public.contact_submissions,
  public.waitlist_entries,
  public.opportunities,
  public.opportunity_posts,
  public.opportunity_applications,
  public.opportunity_events,
  public.forecast_configs,
  public.forecast_config_versions,
  public.calculator_submissions,
  public.forecast_runs,
  public.opportunity_scores,
  public.case_studies
to service_role;
