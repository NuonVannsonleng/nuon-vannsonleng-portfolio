-- Contact form storage. Run once in Supabase: SQL Editor -> New query -> Run.

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 100),
  email      text not null check (char_length(email) between 3 and 254 and email like '%_@_%._%'),
  message    text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Expose only INSERT on this table to the Data API (needed when the
-- project has "Automatically expose new tables" turned off).
grant insert on table public.contact_messages to anon, authenticated;

-- Visitors (anon key) may only add messages. With no select/update/delete
-- policy, nobody but you (dashboard / service role) can read them.
drop policy if exists "Anyone can send a contact message" on public.contact_messages;
create policy "Anyone can send a contact message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
