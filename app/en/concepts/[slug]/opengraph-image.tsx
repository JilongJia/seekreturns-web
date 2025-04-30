import { getInfo } from "@/app/lib/db/getInfo";
import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";

type GenerateImageMetadataParams = { params: Promise<{ slug: string }> };
type OpenGraphImageParams = { params: Promise<{ slug: string }>; id: string };

export async function generateImageMetadata({
  params,
}: GenerateImageMetadataParams) {
  const slug = (await params).slug;
  const title = await getInfo(`/en/concepts/${slug}`);

  return [
    {
      id: "normal",
      alt: title,
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function OpenGraphImage({ params, id }: OpenGraphImageParams) {
  const slug = (await params).slug;
  const info = await getInfo(`/en/concepts/${slug}`);
  if (!info) {
    return new Response("Image Not Found", { status: 404 });
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { title, description, modifiedDate } = info;
  const { tableOfContents } = await import(`./${slug}/data/tableOfContents`);
  const section = "Concept";
  const breadcrumbList = [
    {
      name: "Concept",
      url: `${baseUrl}/en/concepts`,
    },
    {
      name: title,
      url: `${baseUrl}/en/concepts/${slug}`,
    },
  ];

  const openGraphImage = generateFeaturedImage(
    title,
    description,
    modifiedDate,
    tableOfContents,
    section,
    breadcrumbList,
  );

  return openGraphImage;
}

export default OpenGraphImage;
