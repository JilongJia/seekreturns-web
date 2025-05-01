import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  generateWebPageJsonLd,
  generateBreadcrumbListJsonLd,
  generateArticleJsonLd,
} from "@/app/lib/en/content/generateJsonLd";

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
  images: ImageObject[];
};

export function generateJsonLd({
  title,
  pathname,
  description,
  publishedDate,
  modifiedDate,
  images,
}: GenerateJsonLdParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const pageUrl = `${baseUrl}${pathname}`;

  const organizationId = `${baseUrl}/#organization`;
  const webSiteId = `${baseUrl}/#web-site`;
  const webPageId = `${pageUrl}#web-page`;
  const articleId = `${pageUrl}#article`;
  const breadcrumbListId = `${pageUrl}#breadcrumb-list`;

  const featuredImage: ImageObject = {
    "@type": "ImageObject",
    url: `${pageUrl}/featured-image`,
    caption: `“${title}” page by Seek Returns`,
    width: 1200,
    height: 630,
  };

  const primaryImageOfPage: ImageObject = featuredImage;

  const processedImages: ImageObject[] = images.map((img) => ({
    ...img,
    url: `${baseUrl}${img.url}`,
  }));

  const allImages: ImageObject[] = [featuredImage, ...processedImages];

  const breadcrumbList: BreadcrumbListItem[] = [
    {
      name: "Tables",
      url: `${baseUrl}/en/tables`,
    },
    {
      name: title,
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
    articleId,
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

  const articleJsonLd = generateArticleJsonLd({
    articleId,
    organizationId,
    webPageId,
    headline: title,
    description,
    publishedDate,
    modifiedDate,
    images: allImages,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      webSiteJsonLd,
      webPageJsonLd,
      breadcrumbListJsonLd,
      articleJsonLd,
    ],
  };

  return jsonLd;
}
