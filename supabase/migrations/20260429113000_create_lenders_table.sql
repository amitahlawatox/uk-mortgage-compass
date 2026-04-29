create table if not exists public.lenders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  estimated_svr numeric(5,2) not null check (estimated_svr >= 0),
  max_ltv integer not null check (max_ltv between 0 and 100),
  category text not null,
  trust_rating numeric(3,1) not null check (trust_rating between 0 and 5)
);

create index if not exists lenders_slug_idx on public.lenders (slug);
create index if not exists lenders_category_idx on public.lenders (category);

alter table public.lenders enable row level security;

drop policy if exists "public can read lenders" on public.lenders;
create policy "public can read lenders"
on public.lenders
for select
to anon, authenticated
using (true);
