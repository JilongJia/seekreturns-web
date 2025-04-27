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
  const datePublished = publishedDate.toISOString().split("T")[0];
  const dateModified = modifiedDate.toISOString().split("T")[0];

  const breadcrumbListId = `${url}#breadcrumb`;
  const articleId = `${url}#article`;

  const webPageSchema = {
    "@type": "WebPage",
    "@id": url,
    url: url,
    name: title,
    description: description,
    inLanguage: "en-US",
    datePublished: datePublished,
    dateModified: dateModified,
    isPartOf: {
      "@id": webSiteId,
    },
    publisher: {
      "@id": organizationId,
    },
    breadcrumb: {
      "@id": breadcrumbListId,
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
        name: "Home",
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators", // ** ACTION: Adjust if the parent category is different **
        item: `${process.env.NEXT_PUBLIC_BASE_URL}/en/calculators`, // ** ACTION: Adjust URL if needed **
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title, // Use the full page title
        item: url, // Current page URL
      },
    ],
  };

  const articleSchema = {
    "@type": "Article",
    "@id": articleId,
    headline: "Future Value Interest Factor (FVIF) Calculator",
    description:
      "Future Value Interest Factor (FVIF) Calculator test description",
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
    mainEntityOfPage: {
      "@id": url,
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
