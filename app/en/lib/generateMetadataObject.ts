export function generateMetadataObject(
  title: string,
  pathname: string,
  description: string,
  publishedDate: Date,
  modifiedDate: Date,
) {
  return {
    title: title,
    description: description,
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Sunica" }],
    alternates: {
      canonical: `/${pathname}`,
    },
    openGraph: {
      siteName: "Sunica Design",
      locale: "en_US",
      type: "article",
      title: title,
      description: description,
      publishedTime: publishedDate?.toISOString(),
      modifiedTime: modifiedDate?.toISOString(),
      url: `/${pathname}`,
      authors: ["Sunica"],
      images: [
        {
          url: `/${pathname}/featured-image.png`,
          alt: `${title} - Featured Image`,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "Sunica Design",
      creator: "Sunica Design",
      title: title,
      description: description,
      images: [
        {
          url: `/${pathname}/featured-image.png`,
          alt: `${title} - Featured Image`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
