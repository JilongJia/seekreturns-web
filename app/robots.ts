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
      `${baseUrl}/sitemaps/sitemap/general.xml`,
      `${baseUrl}/sitemaps/sitemap/stock-comparisons-1.xml`,
      `${baseUrl}/sitemaps/sitemap/stock-comparisons-2.xml`,
      `${baseUrl}/sitemaps/sitemap/stock-comparisons-3.xml`,
      `${baseUrl}/sitemaps/sitemap/stock-comparisons-4.xml`,
    ],
  };
}

export default robots;
