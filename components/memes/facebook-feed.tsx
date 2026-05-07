'use client'

interface FacebookFeedProps {
  pageUrl?: string
  height?: number
}

export function FacebookFeed({
  pageUrl = 'https://www.facebook.com/JyAlweer',
  height = 1200,
}: FacebookFeedProps) {
  const src =
    `https://www.facebook.com/plugins/page.php` +
    `?href=${encodeURIComponent(pageUrl)}` +
    `&tabs=timeline` +
    `&width=500` +
    `&height=${height}` +
    `&small_header=false` +
    `&adapt_container_width=true` +
    `&hide_cover=false` +
    `&show_facepile=false`

  return (
    <div className="flex justify-center w-full">
      <iframe
        src={src}
        width="500"
        height={height}
        style={{ border: 'none', overflow: 'hidden', display: 'block' }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="rounded-lg shadow-md w-full max-w-[500px]"
      />
    </div>
  )
}
