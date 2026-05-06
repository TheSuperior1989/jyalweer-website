import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/account/", "/auth/", "/api/"],
      },
    ],
    sitemap: "https://jyalweer.co.za/sitemap.xml",
  }
}
