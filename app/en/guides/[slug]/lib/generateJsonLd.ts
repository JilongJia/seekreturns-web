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
  pageTitle: string;
  pagePathname: string;
  pageDescription: string;
  pagePublishedDate: Date;
  pageModifiedDate: Date;
  articleTitle: string;
  articleDescription: string;
  articleImages: ImageObject[];
};

export function generateJsonLd({
  pageTitle,
  pagePathname,
  pageDescription,
  pagePublishedDate,
  pageModifiedDate,
  articleTitle,
  articleDescription,
  articleImages,
}: GenerateJsonLdParams) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const pageUrl = `${baseUrl}${pagePathname}`;

  const organizationId = `${baseUrl}/#organization`;
  const webSiteId = `${baseUrl}/#web-site`;
  const webPageId = `${pageUrl}#web-page`;
  const articleId = `${pageUrl}#article`;
  const breadcrumbListId = `${pageUrl}#breadcrumb-list`;

  const featuredImage: ImageObject = {
    "@type": "ImageObject",
    url: `${pageUrl}/featured-image`,
    caption: `“${pageTitle}” page by Seek Returns`,
    width: 1200,
    height: 630,
  };

  const primaryImageOfPage: ImageObject = featuredImage;

  const processedArticleImages: ImageObject[] = articleImages.map((img) => ({
    ...img,
    url: `${baseUrl}${img.url}`,
  }));

  const allArticleImages: ImageObject[] = [
    featuredImage,
    ...processedArticleImages,
  ];

  const breadcrumbList: BreadcrumbListItem[] = [
    {
      name: "Guides",
      url: `${baseUrl}/en/guides`,
    },
    {
      name: pageTitle,
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

  const articleJsonLd = generateArticleJsonLd({
    articleId,
    organizationId,
    webPageId,
    headline: articleTitle,
    description: articleDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
    images: allArticleImages,
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
