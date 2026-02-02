/**
 * Facebook Graph API Integration
 * Syncs memes from Facebook Page to the website
 */

interface FacebookPost {
  id: string
  message?: string
  full_picture?: string
  created_time: string
  permalink_url: string
}

interface FacebookPagePhotos {
  data: FacebookPost[]
  paging?: {
    next?: string
    previous?: string
  }
}

/**
 * Fetch photos from Facebook Page using Graph API
 * @param pageId - Facebook Page ID (e.g., 'JyAlweer')
 * @param accessToken - Facebook Page Access Token
 * @param limit - Number of photos to fetch (default: 60)
 */
export async function fetchFacebookPagePhotos(
  pageId: string,
  accessToken: string,
  limit: number = 60
): Promise<FacebookPost[]> {
  const fields = 'id,message,full_picture,created_time,permalink_url'
  const url = `https://graph.facebook.com/v18.0/${pageId}/photos/uploaded?fields=${fields}&limit=${limit}&access_token=${accessToken}`

  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.statusText}`)
    }

    const data: FacebookPagePhotos = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching Facebook photos:', error)
    throw error
  }
}

/**
 * Download image from URL and return as blob
 */
export async function downloadImage(imageUrl: string): Promise<Blob> {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }
  return await response.blob()
}

/**
 * Sync Facebook photos to Supabase database
 */
export async function syncFacebookPhotosToDatabase(
  photos: FacebookPost[],
  supabaseClient: any
) {
  const memesToInsert = photos.map((photo) => ({
    caption: photo.message || 'Jy Alweer?',
    caption_af: photo.message || 'Jy Alweer?',
    image_url: photo.full_picture || '',
    facebook_link: photo.permalink_url,
    is_active: true,
    created_at: photo.created_time,
  }))

  const { data, error } = await supabaseClient
    .from('memes')
    .upsert(memesToInsert, {
      onConflict: 'facebook_link',
      ignoreDuplicates: true,
    })

  if (error) {
    console.error('Error syncing to database:', error)
    throw error
  }

  return data
}

