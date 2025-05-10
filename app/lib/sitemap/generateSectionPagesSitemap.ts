import { MetadataRoute } from "next";

import { pageInfo as enConceptsInfo } from "@/app/en/concepts/data/info";
import { pageInfo as enGuidesInfo } from "@/app/en/guides/data/info";
import { pageInfo as enCalculatorsInfo } from "@/app/en/calculators/data/info";
import { pageInfo as enTablesInfo } from "@/app/en/tables/data/info";
import { pageInfo as enStockComparisonsInfo } from "@/app/en/stock-comparisons/data/info";
import { pageInfo as enReviewsInfo } from "@/app/en/reviews/data/info";

import { pageInfo as zhConceptsInfo } from "@/app/zh/concepts/data/info";
import { pageInfo as zhGuidesInfo } from "@/app/zh/guides/data/info";
import { pageInfo as zhCalculatorsInfo } from "@/app/zh/calculators/data/info";
import { pageInfo as zhTablesInfo } from "@/app/zh/tables/data/info";
import { pageInfo as zhStockComparisonsInfo } from "@/app/zh/stock-comparisons/data/info";
import { pageInfo as zhReviewsInfo } from "@/app/zh/reviews/data/info";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function generateSectionPagesSitemap(): MetadataRoute.Sitemap {
  const infos = [
    enConceptsInfo,
    enGuidesInfo,
    enCalculatorsInfo,
    enTablesInfo,
    enStockComparisonsInfo,
    enReviewsInfo,
    zhConceptsInfo,
    zhGuidesInfo,
    zhCalculatorsInfo,
    zhTablesInfo,
    zhStockComparisonsInfo,
    zhReviewsInfo,
  ];

  return infos.map((info) => ({
    url: `${BASE_URL}${info.pathname}`,
    lastModified: info.modifiedDate,
    changeFrequency: "weekly",
    priority: 0.6,
    images: [`${BASE_URL}${info.pathname}/featured-image`],
  }));
}
