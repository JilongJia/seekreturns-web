import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
} from "@/app/lib/en/section/generateJsonLd";

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
}: GenerateJsonLdParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const pageUrl = `${baseUrl}${pathname}`;

  const organizationId = `${baseUrl}/#organization`;
  const webSiteId = `${baseUrl}/#web-site`;
  const webPageId = `${pageUrl}#web-page`;
  const breadcrumbListId = `${pageUrl}#breadcrumb-list`;

  const featuredImage: ImageObject = {
    "@type": "ImageObject",
    url: `${pageUrl}/featured-image`,
    caption: `“${title}” page by Seek Returns`,
    width: 1200,
    height: 630,
  };

  const primaryImageOfPage: ImageObject = featuredImage;

  const breadcrumbList: BreadcrumbListItem[] = [
    {
      name: "Guides",
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
    name: title,
    url: pageUrl,
    description,
    publishedDate,
    modifiedDate,
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
