import { MetadataRoute } from "next";

import stockComparisonPages from "@/app/data/stock-comparisons/pages.json";

type StockComparisonPage = {
  symbolOne: string;
  symbolTwo: string;
  slug: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function generateStockComparisonPagesSitemap(): MetadataRoute.Sitemap {
  const pages = stockComparisonPages as StockComparisonPage[];

  return pages.flatMap(({ slug }) => {
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
