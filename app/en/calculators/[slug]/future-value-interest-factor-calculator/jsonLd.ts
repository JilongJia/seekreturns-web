export function generateJsonLd({
  title, // e.g., "PVIFA Calculator | Present Value Interest Factor of Annuity"
  pathname, // e.g., "/en/calculators/pvifa-calculator"
  description, // Meta description for the whole page
  publishedDate, // Date object
  modifiedDate, // Date object
}: {
  title: string;
  pathname: string;
  description: string;
  publishedDate: Date;
  modifiedDate: Date;
}) {
  const siteUrl = "https://seekreturns.com";
  const pageUrl = `${siteUrl}${pathname}`;
  const datePublished = publishedDate.toISOString().split("T")[0];
  const dateModified = modifiedDate.toISOString().split("T")[0];
  const orgId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const softwareId = `${pageUrl}#software`;
  const articleId = `${pageUrl}#article`; // ID for the Article entity

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Define Organization
      {
        "@type": "Organization",
        "@id": orgId,
        name: "SeekReturns",
        url: siteUrl,
        logo: `${siteUrl}/path/to/your/logo.png`, // Add your logo URL
        sameAs: [
          // Add links to your social media profiles if applicable
          // "https://www.facebook.com/YourProfile",
          // "https://www.linkedin.com/company/yourcompany"
        ],
      },
      // 2. Define WebSite
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "SeekReturns",
        description:
          "Tools, education, and analysis to help investors and traders make better decisions.", // Site description
        publisher: {
          "@id": orgId,
        },
        inLanguage: "en-US",
      },
      // 3. Define WebPage
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: `${title} | SeekReturns`,
        description: description, // Use the specific page meta description
        inLanguage: "en-US",
        datePublished: datePublished,
        dateModified: dateModified,
        isPartOf: {
          "@id": websiteId,
        },
        publisher: {
          "@id": orgId,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        // Link main entities: the calculator tool and the explanatory article
        mainEntity: [{ "@id": softwareId }, { "@id": articleId }],
      },
      // 4. Define BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators", // Assuming this is the correct intermediate step
            item: `${siteUrl}/en/calculators`, // Adjust URL if needed
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title, // Or maybe just the core name like "PVIFA Calculator"
            item: pageUrl,
          },
        ],
      },
      // 5. Define SoftwareApplication (The Calculator)
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: "test calculator name", // Specific name for the calculator
        applicationCategory: "FinanceApplication",
        operatingSystem: "All", // Indicates web-based
        url: pageUrl, // The tool is on this page
        description: "test calculatorDescription", // Specific description of the calculator tool
        publisher: {
          "@id": orgId,
        },
        mainEntityOfPage: {
          // Links back to the WebPage
          "@id": pageUrl,
        },
        // Potentially add 'offers' if there's a paid version, or 'interactionType'
      },
      // 6. Define Article (The Explanatory Text)
      {
        "@type": "Article",
        "@id": articleId,
        headline: "test articleHeadline", // Headline for the article part
        description: "test articleDescription", // Summary of the article content
        datePublished: datePublished,
        dateModified: dateModified,
        author: {
          // Could be Person or Organization
          "@id": orgId,
        },
        publisher: {
          // Publisher is definitely the Organization
          "@id": orgId,
        },
        mainEntityOfPage: {
          // Links back to the WebPage
          "@id": pageUrl,
        },
        isPartOf: {
          // The article is part of this WebPage
          "@id": pageUrl,
        },
        // You could add image, keywords etc. specific to the article here
      },
    ],
  };
}
