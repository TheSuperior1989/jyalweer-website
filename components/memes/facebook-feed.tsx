'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FacebookFeedProps {
  pageUrl?: string
  width?: number
  height?: number
  showPosts?: number
}

/**
 * Facebook Page Feed Component
 * Embeds the Facebook page feed directly on your website
 * No admin access required - works with any public Facebook page
 */
export function FacebookFeed({
  pageUrl = 'https://www.facebook.com/JyAlweer',
  width = 500,
  height = 800,
  showPosts = 10,
}: FacebookFeedProps) {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== 'undefined' && !(window as any).FB) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)

      script.onload = () => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse()
        }
      }
    } else if ((window as any).FB) {
      // Re-parse if SDK already loaded
      (window as any).FB.XFBML.parse()
    }
  }, [])

  return (
    <div className="w-full flex justify-center">
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-width={width}
        data-height={height}
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl}>Jy Alweer?</a>
        </blockquote>
      </div>
    </div>
  )
}

/**
 * Individual Facebook Post Embed
 * Embeds a single Facebook post
 */
interface FacebookPostProps {
  postUrl: string
  width?: number
}

export function FacebookPost({ postUrl, width = 500 }: FacebookPostProps) {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== 'undefined' && !(window as any).FB) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)

      script.onload = () => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse()
        }
      }
    } else if ((window as any).FB) {
      (window as any).FB.XFBML.parse()
    }
  }, [postUrl])

  return (
    <div className="w-full flex justify-center">
      <div
        className="fb-post"
        data-href={postUrl}
        data-width={width}
        data-show-text="true"
      >
        <blockquote cite={postUrl} className="fb-xfbml-parse-ignore">
          <a href={postUrl}>Post</a>
        </blockquote>
      </div>
    </div>
  )
}

/**
 * Facebook Page Plugin (Compact)
 * Shows page info and recent posts in a compact widget
 */
interface FacebookPagePluginProps {
  pageUrl?: string
  width?: number
  height?: number
  tabs?: 'timeline' | 'events' | 'messages'
  hideCover?: boolean
  showFacepile?: boolean
}

export function FacebookPagePlugin({
  pageUrl = 'https://www.facebook.com/JyAlweer',
  width = 340,
  height = 500,
  tabs = 'timeline',
  hideCover = false,
  showFacepile = true,
}: FacebookPagePluginProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).FB) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)

      script.onload = () => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse()
        }
      }
    } else if ((window as any).FB) {
      (window as any).FB.XFBML.parse()
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest from Jy Alweer?</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div
          className="fb-page"
          data-href={pageUrl}
          data-tabs={tabs}
          data-width={width}
          data-height={height}
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover={hideCover.toString()}
          data-show-facepile={showFacepile.toString()}
        >
          <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
            <a href={pageUrl}>Jy Alweer?</a>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  )
}

