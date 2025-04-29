type GenerateOrganizationJsonLdParams = {
  organizationId: string;
  url: string;
};

export function generateOrganizationJsonLd({
  url,
  organizationId,
}: GenerateOrganizationJsonLdParams) {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: "Seek Returns",
    url: `${url}/`,
    description:
      "Seek Returns is a financial web platform dedicated to empowering investors and traders worldwide by providing accessible knowledge, powerful tools, and objective market analysis.",
    logo: {
      "@type": "ImageObject",
      url: `${url}/images/seekreturns-logo.png`,
      description: "Seek Returns logo",
      width: 500,
      height: 125,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@seekreturns.com",
      contactType: "customer service",
      availableLanguage: ["en", "zh"],
    },
    foundingDate: "2025-04-27",
    sameAs: [
      // ** ACTION: Add links to social media profiles later **
      // e.g., "https://www.facebook.com/Profile",
      //       "https://www.linkedin.com/company/company"
    ],
  };
}

type GenerateWebSiteJsonLdParams = {
  webSiteId: string;
  organizationId: string;
  url: string;
};

export function generateWebSiteJsonLd({
  webSiteId,
  organizationId,
  url,
}: GenerateWebSiteJsonLdParams) {
  return {
    "@type": "WebSite",
    "@id": webSiteId,
    name: "Seek Returns",
    url: `${url}/`,
    description:
      "Seek Returns provides a comprehensive resource hub featuring educational articles, interactive tools, financial data, and market analysis to help investors and traders navigate the markets and make informed decisions.",
    publisher: {
      "@id": organizationId,
    },
    inLanguage: ["en", "zh"],
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}/en/search?q={query}`,
        },
        "query-input": "required name=query",
        inLanguage: "en",
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}/zh/search?q={query}`,
        },
        "query-input": "required name=query",
        inLanguage: "zh",
      },
    ],
  };
}

type ImageObject = {
  "@type": "ImageObject";
  url: string;
  caption: string;
  width: number;
  height: number;
};

type GenerateWebPageJsonLdParams = {
  webPageId: string;
  organizationId: string;
  webSiteId: string;
  breadcrumbListId: string;
  articleId: string;
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  publishedDate: Date;
  modifiedDate: Date;
  primaryImageOfPage: ImageObject;
};

export function generateWebPageJsonLd({
  webPageId,
  organizationId,
  webSiteId,
  breadcrumbListId,
  articleId,
  name,
  url,
  description,
  inLanguage,
  publishedDate,
  modifiedDate,
  primaryImageOfPage,
}: GenerateWebPageJsonLdParams) {
  const datePublished = publishedDate.toISOString();
  const dateModified = modifiedDate.toISOString();

  return {
    "@type": "WebPage",
    "@id": webPageId,
    name: name,
    url: url,
    description: description,
    inLanguage: inLanguage,
    datePublished: datePublished,
    dateModified: dateModified,
    primaryImageOfPage: primaryImageOfPage,
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
}

type BreadcrumbListItem = {
  name: string;
  url: string;
};

type GenerateBreadcrumbListJsonLdParams = {
  breadcrumbListId: string;
  breadcrumbList: BreadcrumbListItem[];
};

export function generateBreadcrumbListJsonLd({
  breadcrumbListId,
  breadcrumbList,
}: GenerateBreadcrumbListJsonLdParams) {
  const itemListElement = breadcrumbList.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbListId,
    itemListElement: itemListElement,
  };
}

type GenerateArticleJsonLdParams = {
  articleId: string;
  organizationId: string;
  webPageId: string;
  headline: string;
  description: string;
  publishedDate: Date;
  modifiedDate: Date;
  images: ImageObject[];
};

export function generateArticleJsonLd({
  articleId,
  organizationId,
  webPageId,
  headline,
  description,
  publishedDate,
  modifiedDate,
  images,
}: GenerateArticleJsonLdParams) {
  const datePublished = publishedDate.toISOString();
  const dateModified = modifiedDate.toISOString();

  return {
    "@type": "Article",
    "@id": articleId,
    headline: headline,
    description: description,
    image: images,
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
    datePublished: datePublished,
    dateModified: dateModified,
    mainEntityOfPage: {
      "@id": webPageId,
    },
  };
}
