import { MetadataRoute } from "next";

import { fetchAllPages, type PageInfo } from "@/app/lib/db/fetchAllPages";

import stockComparisonPages from "@/app/data/stock-comparisons/pages.json";

type ImageObject = {
  "@type": "ImageObject";
  url: string;
  caption: string;
  width: number;
  height: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const languageMap: Record<string, string> = {
  en: "English",
  zh: "中文",
};

const sectionMapEn: Record<string, string> = {
  concepts: "Concept",
  guides: "Guide",
  calculators: "Calculator",
  charts: "Chart",
  tables: "Table",
  reviews: "Review",
};

const sectionMapZh: Record<string, string> = {
  concepts: "概念",
  guides: "教程",
  calculators: "计算器",
  charts: "图表",
  tables: "表格",
  reviews: "测评",
};

const languageReverseMap = Object.fromEntries(
  Object.entries(languageMap).map(([code, display]) => [display, code]),
);

const sectionReverseMapEn = Object.fromEntries(
  Object.entries(sectionMapEn).map(([code, display]) => [display, code]),
);

const sectionReverseMapZh = Object.fromEntries(
  Object.entries(sectionMapZh).map(([code, display]) => [display, code]),
);

export async function generateContentPagesSitemap(): Promise<MetadataRoute.Sitemap> {
  const informationalPagesSitemap = await generateInformationalPagesSitemap();
  const stockComparisonPagesSitemap = generateStockComparisonPagesSitemap();
  return [...informationalPagesSitemap, ...stockComparisonPagesSitemap];
}

async function generateInformationalPagesSitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: PageInfo[] = await fetchAllPages();

  const entries: MetadataRoute.Sitemap = await Promise.all(
    pages.map(async (page) => {
      const langCode = languageReverseMap[page.language];
      const sectionCode =
        langCode === "en"
          ? sectionReverseMapEn[page.section]
          : sectionReverseMapZh[page.section];

      const { articleInfo } = await import(
        `@/app/${langCode}/${sectionCode}/[slug]/${page.slug}/data/info`
      );

      const images: string[] = [
        `${BASE_URL}${page.pathname}/featured-image`,
        ...articleInfo.images.map(
          (img: ImageObject) => `${BASE_URL}${img.url}`,
        ),
      ];

      return {
        url: `${BASE_URL}${page.pathname}`,
        lastModified: page.modifiedDate,
        changeFrequency: "weekly" as const,
        priority: 1.0,
        images,
      };
    }),
  );

  return entries;
}

function generateStockComparisonPagesSitemap(): MetadataRoute.Sitemap {
  return stockComparisonPages.flatMap(({ slug }) => {
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
