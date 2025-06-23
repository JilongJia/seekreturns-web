import type { MetadataRoute } from "next";
import { generateRootPagesSitemap } from "./lib/sitemap/generateRootPagesSitemap";
import { generateUtilityPagesSitemap } from "./lib/sitemap/generateUtilityPagesSitemap";
import { generateSectionPagesSitemap } from "./lib/sitemap/generateSectionPagesSitemap";
import { generateInformationalPagesSitemap } from "./lib/sitemap/generateInformationalPagesSitemap";
import stockComparisonPages from "@/app/data/stock-comparisons/pages.json";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const URLS_PER_SITEMAP = 30_000;
const LANGUAGES = ["en", "zh"] as const;

type StockComparisonPage = {
  symbolOne: string;
  symbolTwo: string;
  slug: string;
};

export async function generateSitemaps(): Promise<{ id: number }[]> {
  const pages = stockComparisonPages as StockComparisonPage[];

  const totalUrls = pages.length * LANGUAGES.length;
  const chunkCount = Math.ceil(totalUrls / URLS_PER_SITEMAP);

  const routes = [{ id: 0 }];
  for (let i = 1; i <= chunkCount; i++) {
    routes.push({ id: i });
  }
  return routes;
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const chunkId = parseInt(id, 10);

  if (chunkId === 0) {
    const root = generateRootPagesSitemap();
    const utility = generateUtilityPagesSitemap();
    const section = generateSectionPagesSitemap();
    const info = await generateInformationalPagesSitemap();
    return [...root, ...utility, ...section, ...info];
  }

  const pages = stockComparisonPages as StockComparisonPage[];
  const slugsPerChunk = Math.floor(URLS_PER_SITEMAP / LANGUAGES.length);
  const start = (chunkId - 1) * slugsPerChunk;
  const slice = pages.slice(start, start + slugsPerChunk);

  return slice.flatMap(({ slug }) =>
    LANGUAGES.map((lang) => {
      const path = `/${lang}/stock-comparisons/${slug}`;
      return {
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
        images: [`${BASE_URL}${path}/featured-image`],
      };
    }),
  );
}
