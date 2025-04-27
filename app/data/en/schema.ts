export const organizationId = `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`;
export const webSiteId = `${process.env.NEXT_PUBLIC_BASE_URL}/#website`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": organizationId,
  name: "Seek Returns",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/seekreturns-logo.png`,
    width: 500,
    height: 125,
  },
  sameAs: [
    // ** ACTION: Add links to your social media profiles if applicable **
    // e.g., "https://www.facebook.com/YourProfile",
    //       "https://www.linkedin.com/company/yourcompany"
  ],
};

export const webSiteSchema = {
  "@type": "WebSite",
  "@id": webSiteId,
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  name: "Seek Returns",
  description:
    "Knowledge, tools, and analysis to help investors and traders make better decisions.",
  publisher: {
    "@id": organizationId,
  },
  // If your site has an internal search feature:
  // potentialAction: {
  //   "@type": "SearchAction",
  //   target: {
  //     "@type": "EntryPoint",
  //     urlTemplate": `${siteUrl}/search?q={search_term_string}` // ** ACTION: Adjust your search URL structure **
  //   },
  //   "query-input": "required name=search_term_string"
  // }
};
