import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { fetchFacebookPagePhotos, syncFacebookPhotosToDatabase } from '@/lib/facebook-sync'

/**
 * API Route to sync Facebook photos to database
 * POST /api/sync-facebook
 * 
 * This can be called manually or set up as a cron job
 */
export async function POST(request: NextRequest) {
  try {
    // Get environment variables
    const pageId = process.env.FACEBOOK_PAGE_ID
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

    if (!pageId || !accessToken) {
      return NextResponse.json(
        { error: 'Facebook credentials not configured' },
        { status: 500 }
      )
    }

    // Verify admin access (optional - add authentication here)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Fetch photos from Facebook
    const photos = await fetchFacebookPagePhotos(pageId, accessToken, 60)

    // Sync to database
    const result = await syncFacebookPhotosToDatabase(photos, supabase)

    return NextResponse.json({
      success: true,
      synced: photos.length,
      message: `Successfully synced ${photos.length} memes from Facebook`,
    })
  } catch (error) {
    console.error('Facebook sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync Facebook photos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

