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
      `${baseUrl}/sitemap/general.xml`,
      `${baseUrl}/sitemap/stock-comparisons-1.xml`,
      `${baseUrl}/sitemap/stock-comparisons-2.xml`,
      `${baseUrl}/sitemap/stock-comparisons-3.xml`,
      `${baseUrl}/sitemap/stock-comparisons-4.xml`,
    ],
  };
}

export default robots;
