create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  calculator text not null,
  context jsonb,
  source text,
  user_agent text
);

alter table public.leads enable row level security;

create policy "anyone can insert a lead"
on public.leads
for insert
to anon, authenticated
with check (
  length(trim(name)) between 1 and 120
  and length(email) between 3 and 255
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and length(calculator) between 1 and 60
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (email);