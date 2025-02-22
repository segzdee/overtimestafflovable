
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text not null check (role in ('admin', 'shift-worker', 'company', 'agency', 'aiagent')),
  name text not null,
  profile_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create indexes
create index profiles_email_idx on public.profiles (email);
create index profiles_role_idx on public.profiles (role);
