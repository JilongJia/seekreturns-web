import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
} from "@/app/lib/zh/section/generateJsonLd";

type ImageObject = {
  "@type": "ImageObject";
  url: string;
  caption: string;
  width: number;
  height: number;
};

type BreadcrumbListItem = {
  name: string;
  url: string;
};

type GenerateJsonLdParams = {
  pageTitle: string;
  pagePathname: string;
  pageDescription: string;
  pagePublishedDate: Date;
  pageModifiedDate: Date;
};

export function generateJsonLd({
  pageTitle,
  pagePathname,
  pageDescription,
  pagePublishedDate,
  pageModifiedDate,
}: GenerateJsonLdParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const pageUrl = `${baseUrl}${pagePathname}`;

  const organizationId = `${baseUrl}/#organization`;
  const webSiteId = `${baseUrl}/#web-site`;
  const webPageId = `${pageUrl}#web-page`;
  const breadcrumbListId = `${pageUrl}#breadcrumb-list`;

  const featuredImage: ImageObject = {
    "@type": "ImageObject",
    url: `${pageUrl}/featured-image`,
    caption: `Seek Returns 的《${pageTitle}》页面`,
    width: 1200,
    height: 630,
  };

  const primaryImageOfPage: ImageObject = featuredImage;

  const breadcrumbList: BreadcrumbListItem[] = [
    {
      name: "概念",
      url: pageUrl,
    },
  ];

  const organizationJsonLd = generateOrganizationJsonLd({
    organizationId,
    url: baseUrl,
  });

  const webSiteJsonLd = generateWebSiteJsonLd({
    webSiteId,
    organizationId,
    url: baseUrl,
  });

  const webPageJsonLd = generateWebPageJsonLd({
    webPageId,
    organizationId,
    webSiteId,
    breadcrumbListId,
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
    primaryImageOfPage,
  });

  const breadcrumbListJsonLd = generateBreadcrumbListJsonLd({
    breadcrumbListId,
    breadcrumbList,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      webSiteJsonLd,
      webPageJsonLd,
      breadcrumbListJsonLd,
    ],
  };

  return jsonLd;
}
