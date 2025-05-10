import { MetadataRoute } from "next";

import { pageInfo as enPageInfo } from "@/app/en/data/info";
import { pageInfo as zhPageInfo } from "@/app/zh/data/info";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function generateRootPagesSitemap(): MetadataRoute.Sitemap {
  const infos = [enPageInfo, zhPageInfo];

  return infos.map((info) => ({
    url: `${BASE_URL}${info.pathname}`,
    lastModified: info.modifiedDate,
    changeFrequency: "daily",
    priority: 1.0,
    images: [`${BASE_URL}${info.pathname}/featured-image`],
  }));
}
