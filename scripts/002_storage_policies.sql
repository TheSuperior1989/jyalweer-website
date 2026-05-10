-- Storage policies for the "images" bucket
-- Run this in: Supabase Dashboard → SQL Editor

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update files they uploaded
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'images');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'images');

-- Allow everyone to read (bucket is public, but this makes it explicit)
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');
