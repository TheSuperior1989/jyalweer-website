import type { MetadataRoute } from "next"

const BASE = "https://jyalweer.co.za"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${BASE}/shop`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE}/memes`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${BASE}/oor-ons`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE}/kontak`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE}/versendingsbeleid`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE}/terugsendings`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE}/privaatheidsbeleid`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE}/terme-en-voorwaardes`, priority: 0.3, changeFrequency: "yearly" as const },
  ]

  return staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
