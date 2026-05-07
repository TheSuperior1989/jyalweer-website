-- Categories table — run AFTER 004_fix_rls_recursion.sql (requires public.is_admin())
-- Run in: Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  name_af text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select_all" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "categories_insert_admin" ON public.categories
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "categories_update_admin" ON public.categories
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "categories_delete_admin" ON public.categories
  FOR DELETE USING (public.is_admin());

-- Seed with the four existing categories
INSERT INTO public.categories (slug, name, name_af, sort_order) VALUES
  ('tshirts',  'T-Shirts', 'Hemde',    1),
  ('hoodies',  'Hoodies',  'Truie',    2),
  ('caps',     'Caps',     'Pette',    3),
  ('stickers', 'Stickers', 'Plakkers', 4)
ON CONFLICT (slug) DO NOTHING;
