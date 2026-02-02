-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  province text,
  postal_code text,
  is_admin boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_af text,
  description text,
  description_af text,
  price integer not null,
  image_url text,
  category text,
  sizes text[],
  in_stock boolean default true,
  featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create memes table
create table if not exists public.memes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_af text,
  description text,
  description_af text,
  image_url text not null,
  is_meme_of_day boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text,
  status text default 'pending',
  total_amount integer not null,
  items jsonb,
  shipping_address jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create email subscribers table
create table if not exists public.email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamp with time zone default now(),
  is_active boolean default true
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.memes enable row level security;
alter table public.orders enable row level security;
alter table public.email_subscribers enable row level security;

-- Profiles policies
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Products policies (public read, admin write)
create policy "products_select_all" on public.products for select using (true);
create policy "products_insert_admin" on public.products for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "products_update_admin" on public.products for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "products_delete_admin" on public.products for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Memes policies (public read, admin write)
create policy "memes_select_all" on public.memes for select using (true);
create policy "memes_insert_admin" on public.memes for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "memes_update_admin" on public.memes for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "memes_delete_admin" on public.memes for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Orders policies
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_all" on public.orders for insert with check (true);
create policy "orders_update_admin" on public.orders for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Email subscribers policies
create policy "subscribers_insert_all" on public.email_subscribers for insert with check (true);
create policy "subscribers_select_admin" on public.email_subscribers for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "subscribers_delete_admin" on public.email_subscribers for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Create trigger for auto-creating profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', null),
    coalesce(new.raw_user_meta_data ->> 'last_name', null),
    coalesce((new.raw_user_meta_data ->> 'is_admin')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
