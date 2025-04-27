import {
  organizationSchema,
  webSiteSchema,
  organizationId,
  webSiteId,
} from "@/app/data/en/schema";

type GeneratePageJsonLdParams = {
  title: string;
  pathname: string;
  description: string;
  publishedDate: Date;
  modifiedDate: Date;
};

export function generateJsonLd({
  title,
  pathname,
  description,
  publishedDate,
  modifiedDate,
}: GeneratePageJsonLdParams) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
  const datePublished = publishedDate.toISOString();
  const dateModified = modifiedDate.toISOString();

  const webPageId = `${url}#web-page`;
  const breadcrumbListId = `${url}#breadcrumb-list`;
  const articleId = `${url}#article`;

  const webPageSchema = {
    "@type": "WebPage",
    "@id": webPageId,
    name: title,
    url: url,
    description: description,
    inLanguage: "en",
    datePublished: datePublished,
    dateModified: dateModified,
    publisher: {
      "@id": organizationId,
    },
    breadcrumb: {
      "@id": breadcrumbListId,
    },
    isPartOf: {
      "@id": webSiteId,
    },
    mainEntity: {
      "@id": articleId,
    },
  };

  const breadcrumbListSchema = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbListId,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Calculators",
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/en/calculators`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: url,
      },
    ],
  };

  const articleSchema = {
    "@type": "Article",
    "@id": articleId,
    headline: title,
    description:
      "Learn what Future Value Interest Factor (FVIF) is, understand its formula, and use our calculator to find FVIF values quickly.",
    image: [],
    author: {
      "@id": organizationId,
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@id": webPageId,
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      webSiteSchema,
      webPageSchema,
      breadcrumbListSchema,
      articleSchema,
    ],
  };

  return jsonLd;
}
