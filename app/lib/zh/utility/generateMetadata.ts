type GenerateWebsiteMetadataParams = {
  title: string;
  pathname: string;
  description: string;
  alternateLanguageUrls: { [key: string]: string };
};

export function generateWebsiteMetadata({
  title,
  pathname,
  description,
  alternateLanguageUrls,
}: GenerateWebsiteMetadataParams) {
  return {
    title: title,
    description: description,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: pathname,
      languages: alternateLanguageUrls,
    },
    openGraph: {
      siteName: "Seek Returns",
      title: title,
      url: pathname,
      description: description,
      locale: "zh_CN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      // site: "xxx",
      // creator: "yyy",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
