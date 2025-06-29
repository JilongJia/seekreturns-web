import type { MetadataRoute } from "next";

function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/go/", "/en/search/", "/ja/search/", "/zh/search/"],
    },
    sitemap: [
      `${baseUrl}/sitemaps/sitemap/0.xml`,
      `${baseUrl}/sitemaps/sitemap/1.xml`,
      `${baseUrl}/sitemaps/sitemap/2.xml`,
      `${baseUrl}/sitemaps/sitemap/3.xml`,
      `${baseUrl}/sitemaps/sitemap/4.xml`,
    ],
  };
}

export default robots;
