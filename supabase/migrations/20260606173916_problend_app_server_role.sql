do $$
begin
  if exists (select 1 from pg_roles where rolname = 'problend_app') then
    execute 'alter role problend_app with bypassrls';
    execute 'grant usage on schema public to problend_app';
    execute 'grant usage on schema extensions to problend_app';
    execute 'grant select, insert, update, delete on all tables in schema public to problend_app';
    execute 'grant usage, select on all sequences in schema public to problend_app';
    execute 'alter default privileges for role postgres in schema public grant select, insert, update, delete on tables to problend_app';
    execute 'alter default privileges for role postgres in schema public grant usage, select on sequences to problend_app';
  end if;
end $$;
