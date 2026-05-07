-- Admin RLS policies — missing from 001_create_schema.sql
-- Run in: Supabase Dashboard → SQL Editor

-- Products: admin write
CREATE POLICY "products_insert_admin" ON public.products FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "products_update_admin" ON public.products FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "products_delete_admin" ON public.products FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Memes: admin write
CREATE POLICY "memes_insert_admin" ON public.memes FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "memes_update_admin" ON public.memes FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "memes_delete_admin" ON public.memes FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Orders: admin can see all orders and update status
CREATE POLICY "orders_select_admin" ON public.orders FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "orders_update_admin" ON public.orders FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Subscribers: admin read + delete
CREATE POLICY "subscribers_select_admin" ON public.email_subscribers FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

CREATE POLICY "subscribers_delete_admin" ON public.email_subscribers FOR DELETE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Profiles: admin can read all (needed for orders page customer names)
CREATE POLICY "profiles_select_admin" ON public.profiles FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles p2 WHERE p2.id = auth.uid() AND p2.is_admin = TRUE));
