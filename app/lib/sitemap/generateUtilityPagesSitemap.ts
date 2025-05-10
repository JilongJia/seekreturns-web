import { MetadataRoute } from "next";

import { pageInfo as enPrivacyPolicyInfo } from "@/app/en/privacy-policy/data/info";
import { pageInfo as enTermsAndConditionsInfo } from "@/app/en/terms-and-conditions/data/info";
import { pageInfo as enAboutInfo } from "@/app/en/about/data/info";

import { pageInfo as zhPrivacyPolicyInfo } from "@/app/zh/privacy-policy/data/info";
import { pageInfo as zhTermsAndConditionsInfo } from "@/app/zh/terms-and-conditions/data/info";
import { pageInfo as zhAboutInfo } from "@/app/zh/about/data/info";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function generateUtilityPagesSitemap(): MetadataRoute.Sitemap {
  const infos = [
    enPrivacyPolicyInfo,
    enTermsAndConditionsInfo,
    enAboutInfo,
    zhPrivacyPolicyInfo,
    zhTermsAndConditionsInfo,
    zhAboutInfo,
  ];

  return infos.map((info) => ({
    url: `${BASE_URL}${info.pathname}`,
    lastModified: info.modifiedDate,
    changeFrequency: "monthly",
    priority: 0.2,
    images: [`${BASE_URL}${info.pathname}/featured-image`],
  }));
}
