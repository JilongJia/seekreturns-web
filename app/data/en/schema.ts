export const organizationId = `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`;
export const webSiteId = `${process.env.NEXT_PUBLIC_BASE_URL}/#web-site`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": organizationId,
  name: "Seek Returns",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  description:
    "Seek Returns is a financial web platform dedicated to empowering investors and traders worldwide by providing accessible knowledge, powerful tools, and objective market analysis.",
  logo: {
    "@type": "ImageObject",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/seekreturns-logo.png`,
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

export const webSiteSchema = {
  "@type": "WebSite",
  "@id": webSiteId,
  name: "Seek Returns",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  description:
    "Seek Returns provides a comprehensive resource hub featuring educational articles, interactive tools, financial data, and market analysis to help investors and traders navigate the markets and make informed decisions.",
  publisher: {
    "@id": organizationId,
  },
  inLanguage: ["en", "zh"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL}/search?q={query}`,
    },
    "query-input": "required name=query",
    inLanguage: ["en", "zh"],
  },
};
