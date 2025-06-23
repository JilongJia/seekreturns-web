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
      `${baseUrl}/sitemap/0.xml`,
      `${baseUrl}/sitemap/1.xml`,
      `${baseUrl}/sitemap/2.xml`,
      `${baseUrl}/sitemap/3.xml`,
      `${baseUrl}/sitemap/4.xml`,
    ],
  };
}

export default robots;
