-- Fix infinite recursion in profiles policy + rebuild all admin policies cleanly
-- Run in: Supabase Dashboard → SQL Editor

-- Step 1: Drop the recursive profiles policy
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;

-- Step 2: Create a SECURITY DEFINER function to check admin status.
-- This bypasses RLS internally so it can query profiles without recursion.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    FALSE
  );
$$;

-- Step 3: Drop old admin policies (recreate cleanly using the function)
DROP POLICY IF EXISTS "products_insert_admin" ON public.products;
DROP POLICY IF EXISTS "products_update_admin" ON public.products;
DROP POLICY IF EXISTS "products_delete_admin" ON public.products;

DROP POLICY IF EXISTS "memes_insert_admin" ON public.memes;
DROP POLICY IF EXISTS "memes_update_admin" ON public.memes;
DROP POLICY IF EXISTS "memes_delete_admin" ON public.memes;

DROP POLICY IF EXISTS "orders_select_admin" ON public.orders;
DROP POLICY IF EXISTS "orders_update_admin" ON public.orders;

DROP POLICY IF EXISTS "subscribers_select_admin" ON public.email_subscribers;
DROP POLICY IF EXISTS "subscribers_delete_admin" ON public.email_subscribers;

-- Step 4: Recreate all admin policies using is_admin() — no recursion possible
CREATE POLICY "products_insert_admin" ON public.products FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "products_update_admin" ON public.products FOR UPDATE
USING (public.is_admin());

CREATE POLICY "products_delete_admin" ON public.products FOR DELETE
USING (public.is_admin());

CREATE POLICY "memes_insert_admin" ON public.memes FOR INSERT
WITH CHECK (public.is_admin());

CREATE POLICY "memes_update_admin" ON public.memes FOR UPDATE
USING (public.is_admin());

CREATE POLICY "memes_delete_admin" ON public.memes FOR DELETE
USING (public.is_admin());

CREATE POLICY "orders_select_admin" ON public.orders FOR SELECT
USING (public.is_admin());

CREATE POLICY "orders_update_admin" ON public.orders FOR UPDATE
USING (public.is_admin());

CREATE POLICY "subscribers_select_admin" ON public.email_subscribers FOR SELECT
USING (public.is_admin());

CREATE POLICY "subscribers_delete_admin" ON public.email_subscribers FOR DELETE
USING (public.is_admin());
