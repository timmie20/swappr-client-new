import { MetadataRoute } from "next";

/**
 * Sitemap Configuration
 *
 * Generates sitemap.xml for search engines to crawl your site.
 * Add dynamic routes as your app grows.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swappr.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/check-worth`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Add more static routes here
    // Dynamic routes will be added later using generateMetadata
  ];
}
