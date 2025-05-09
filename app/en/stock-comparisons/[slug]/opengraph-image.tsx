import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";
import { generatePageInfo } from "./lib/generatePageInfo";

import pagesRaw from "@/app/data/stock-comparisons/pages.json";
import { tableOfContents } from "./data/tableOfContents";

type GenerateImageMetadataParams = { params: Promise<{ slug: string }> };
type OpenGraphImageParams = { params: Promise<{ slug: string }>; id: string };

export async function generateImageMetadata({
  params,
}: GenerateImageMetadataParams) {
  const slug = (await params).slug;

  const pageRaw = pagesRaw.find((page) => page.slug === slug);

  if (!pageRaw) {
    return new Response("Image Not Found", { status: 404 });
  }

  const { title } = generatePageInfo(pageRaw);

  return [
    {
      id: "normal",
      alt: `${title} - Seek Returns`,
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function OpenGraphImage({ params, id }: OpenGraphImageParams) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pageRaw = pagesRaw.find((page) => page.slug === slug);

  if (!pageRaw) {
    return new Response("Image Not Found", { status: 404 });
  }

  const { title, description, modifiedDate } = generatePageInfo(pageRaw);

  const section = "Stock Comparison";

  const breadcrumbList = [
    {
      name: "Stock Comparisons",
      url: `${baseUrl}/en/stock-comparisons`,
    },
    {
      name: title,
      url: `${baseUrl}/en/stock-comparisons/${slug}`,
    },
  ];

  const openGraphImage = generateFeaturedImage({
    title,
    description,
    modifiedDate,
    tableOfContents,
    section,
    breadcrumbList,
  });

  return openGraphImage;
}

export default OpenGraphImage;
