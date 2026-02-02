-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  language_preference TEXT DEFAULT 'af',
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create shipping_addresses table
CREATE TABLE IF NOT EXISTS public.shipping_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'South Africa',
  phone TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.shipping_addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "shipping_addresses_select_own" ON public.shipping_addresses;
DROP POLICY IF EXISTS "shipping_addresses_insert_own" ON public.shipping_addresses;
DROP POLICY IF EXISTS "shipping_addresses_update_own" ON public.shipping_addresses;
DROP POLICY IF EXISTS "shipping_addresses_delete_own" ON public.shipping_addresses;

CREATE POLICY "shipping_addresses_select_own" ON public.shipping_addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "shipping_addresses_insert_own" ON public.shipping_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "shipping_addresses_update_own" ON public.shipping_addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "shipping_addresses_delete_own" ON public.shipping_addresses FOR DELETE USING (auth.uid() = user_id);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_af TEXT NOT NULL,
  description TEXT,
  description_af TEXT,
  price_cents INTEGER NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  sizes TEXT[] DEFAULT ARRAY[]::TEXT[],
  colors TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_limited_drop BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "products_select_all" ON public.products;

CREATE POLICY "products_select_all" ON public.products FOR SELECT USING (TRUE);

-- Create memes table
CREATE TABLE IF NOT EXISTS public.memes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caption TEXT NOT NULL,
  caption_af TEXT NOT NULL,
  image_url TEXT NOT NULL,
  facebook_link TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_meme_of_day BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.memes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "memes_select_all" ON public.memes;

CREATE POLICY "memes_select_all" ON public.memes FOR SELECT USING (TRUE);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending',
  total_cents INTEGER NOT NULL,
  shipping_address JSONB NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_select_own" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_all" ON public.orders;

CREATE POLICY "orders_select_own" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "orders_insert_all" ON public.orders FOR INSERT WITH CHECK (TRUE);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  price_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "order_items_select_own" ON public.order_items;
DROP POLICY IF EXISTS "order_items_insert_all" ON public.order_items;

CREATE POLICY "order_items_select_own" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "order_items_insert_all" ON public.order_items FOR INSERT WITH CHECK (TRUE);

-- Create email_subscribers table
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  language_preference TEXT DEFAULT 'af',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "email_subscribers_insert_all" ON public.email_subscribers;

CREATE POLICY "email_subscribers_insert_all" ON public.email_subscribers FOR INSERT WITH CHECK (TRUE);

-- Create trigger function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, language_preference)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', NULL),
    COALESCE(new.raw_user_meta_data ->> 'language_preference', 'af')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
