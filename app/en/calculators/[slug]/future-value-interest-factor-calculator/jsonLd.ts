export function generateJsonLd({
  title,
  pathname,
  description,
  publishedDate,
  modifiedDate,
}: {
  title: string;
  pathname: string;
  description: string;
  publishedDate: Date;
  modifiedDate: Date;
}) {
  const url = `https://seekreturns.com${pathname}`;
  const datePublished = publishedDate.toISOString().split("T")[0];
  const dateModified = modifiedDate.toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `${title} | SeekReturns`,
        description,
        inLanguage: "en-US",
        isAccessibleForFree: true,
        datePublished,
        dateModified,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        potentialAction: {
          "@type": "ComputeAction",
          name: `Calculate ${title}`,
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${url}?rate={rate}&periods={periods}`,
          },
          result: { "@type": "PropertyValue", name: title },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://seekreturns.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: "https://seekreturns.com/en/calculators",
          },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: title,
        applicationCategory: "FinanceApplication",
        description: "Custom blurb for this tool only",
        url,
        operatingSystem: "All",
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: "SeekReturns",
          url: "https://seekreturns.com",
        },
      },
    ],
  };
}
