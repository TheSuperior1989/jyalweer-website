# Facebook Meme Sync Setup Guide

This guide explains how to automatically sync memes from your Facebook page to your website.

## 🎯 Overview

Instead of manually downloading images, we use the **Facebook Graph API** to automatically fetch posts from your Facebook page and sync them to your database.

## 📋 Prerequisites

1. Facebook Page (you have: https://www.facebook.com/JyAlweer)
2. Facebook Developer Account
3. Facebook App with Page permissions

## 🚀 Setup Steps

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Choose **"Business"** as the app type
4. Fill in:
   - **App Name:** "Jy Alweer Website Sync"
   - **App Contact Email:** Your email
5. Click **"Create App"**

### Step 2: Add Facebook Login Product

1. In your app dashboard, click **"Add Product"**
2. Find **"Facebook Login"** and click **"Set Up"**
3. Choose **"Web"** as the platform
4. Enter your website URL (e.g., `https://jyalweer.vercel.app`)

### Step 3: Get Page Access Token

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click **"Generate Access Token"**
4. Grant these permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
5. Copy the **User Access Token**

### Step 4: Convert to Long-Lived Page Token

Run this in your browser console or use a tool:

```
https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN
```

This gives you a long-lived token (60 days).

### Step 5: Get Your Page ID

1. Go to your Facebook page
2. Click **"About"**
3. Scroll down to find **"Page ID"** or use Graph API Explorer:
   ```
   https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_TOKEN
   ```

### Step 6: Add Environment Variables

Add these to your `.env.local` and Vercel:

```env
FACEBOOK_PAGE_ID=your-page-id-here
FACEBOOK_ACCESS_TOKEN=your-long-lived-token-here
```

### Step 7: Update Database Schema

The `memes` table needs a unique constraint on `facebook_link`. Run this in Supabase SQL Editor:

```sql
-- Add unique constraint to prevent duplicate syncs
ALTER TABLE public.memes 
ADD CONSTRAINT memes_facebook_link_unique 
UNIQUE (facebook_link);
```

## 🔄 How to Sync Memes

### Option 1: Manual Sync (Admin Dashboard)

1. Log in as admin
2. Go to `/admin/memes`
3. Click **"Sync from Facebook"** button
4. Wait for sync to complete

### Option 2: API Call

```bash
curl -X POST https://your-domain.com/api/sync-facebook \
  -H "Authorization: Bearer YOUR_SUPABASE_TOKEN"
```

### Option 3: Automated Cron Job (Vercel)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/sync-facebook",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This syncs every 6 hours automatically.

## 📊 What Gets Synced

- ✅ Photo URL (stored in `image_url`)
- ✅ Caption/Message (stored in `caption` and `caption_af`)
- ✅ Facebook permalink (stored in `facebook_link`)
- ✅ Post creation date
- ✅ Automatically marked as active

## ⚠️ Important Notes

- **Token Expiration:** Long-lived tokens expire after 60 days. You'll need to refresh them.
- **Rate Limits:** Facebook has API rate limits. Don't sync too frequently.
- **Image Hosting:** Images are hosted on Facebook's CDN (no storage costs!)
- **Duplicates:** The system prevents duplicate syncs using `facebook_link`

## 🔧 Troubleshooting

### "Invalid OAuth access token"
- Your token expired. Generate a new one.

### "Permissions error"
- Make sure your app has the required permissions.

### "No photos found"
- Check your Page ID is correct.
- Ensure photos are public.

## 🎨 Alternative: Manual Upload

If you prefer manual control, you can:
1. Download images from Facebook
2. Upload to Supabase Storage
3. Add entries to the `memes` table manually

But the API sync is much easier! 🚀

