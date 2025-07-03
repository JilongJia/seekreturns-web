import { MetadataRoute } from "next";

import { stockComparisonList } from "@/data/stock-comparison-list";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function generateStockComparisonPagesSitemap(): MetadataRoute.Sitemap {
  return stockComparisonList.flatMap(({ slug }) => {
    const enPath = `/en/stock-comparisons/${slug}`;
    const zhPath = `/zh/stock-comparisons/${slug}`;

    return [enPath, zhPath].map((pathname) => ({
      url: `${BASE_URL}${pathname}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
      images: [`${BASE_URL}${pathname}/featured-image`],
    }));
  });
}
