import { getPageInfo } from "@/app/lib/db/getPageInfo";
import { getPageTitle } from "@/app/lib/db/getPageTitle";
import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";

type GenerateImageMetadataParams = { params: Promise<{ slug: string }> };
type OpenGraphImageParams = { params: Promise<{ slug: string }>; id: string };

export async function generateImageMetadata({
  params,
}: GenerateImageMetadataParams) {
  const slug = (await params).slug;

  const title = await getPageTitle(`/en/concepts/${slug}`);

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

  const pageInfo = await getPageInfo(`/en/concepts/${slug}`);

  if (!pageInfo) {
    return new Response("Image Not Found", { status: 404 });
  }

  const { title, description, modifiedDate } = pageInfo;

  const { tableOfContents } = await import(`./${slug}/data/tableOfContents`);

  const section = "Concept";

  const breadcrumbList = [
    {
      name: "Concepts",
      url: `${baseUrl}/en/concepts`,
    },
    {
      name: title,
      url: `${baseUrl}/en/concepts/${slug}`,
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
