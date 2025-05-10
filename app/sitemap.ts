import type { MetadataRoute } from "next";

import { generateRootPagesSitemap } from "./lib/sitemap/generateRootPagesSitemap";
import { generateUtilityPagesSitemap } from "./lib/sitemap/generateUtilityPagesSitemap";
import { generateSectionPagesSitemap } from "./lib/sitemap/generateSectionPagesSitemap";
import { generateContentPagesSitemap } from "./lib/sitemap/generateContentPagesSitemap";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rootPagesSitemap = generateRootPagesSitemap();
  const utilityPagesSitemap = generateUtilityPagesSitemap();
  const sectionPagesSitemap = generateSectionPagesSitemap();
  const contentPagesSitemap = await generateContentPagesSitemap();

  return [
    ...rootPagesSitemap,
    ...utilityPagesSitemap,
    ...sectionPagesSitemap,
    ...contentPagesSitemap,
  ];
}

export default sitemap;
