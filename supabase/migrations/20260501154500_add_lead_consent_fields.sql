alter table public.leads
  add column if not exists privacy_consent boolean not null default false,
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists consent_version text not null default '2026-05-01',
  add column if not exists consented_at timestamptz not null default now();

comment on column public.leads.privacy_consent is
  'Required consent to process submitted personal data for the requested response.';

comment on column public.leads.marketing_consent is
  'Optional opt-in for future marketing emails or updates.';

comment on column public.leads.consent_version is
  'Version stamp for the lead-capture privacy/consent wording shown at submission time.';

comment on column public.leads.consented_at is
  'Timestamp when the user submitted the lead form with the recorded consent state.';
