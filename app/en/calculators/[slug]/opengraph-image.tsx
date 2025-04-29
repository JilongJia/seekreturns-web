import { getInfo } from "@/app/lib/db/getInfo";
import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";

type GenerateImageMetadataParams = { params: Promise<{ slug: string }> };
type OpenGraphImageParams = { params: Promise<{ slug: string }>; id: string };

export async function generateImageMetadata({
  params,
}: GenerateImageMetadataParams) {
  const slug = (await params).slug;
  const title = await getInfo(`/en/calculators/${slug}`);

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
  const info = await getInfo(`/en/calculators/${slug}`);
  if (!info) return;
  const { title, description, modifiedDate } = info;
  const { tableOfContents } = await import(`./${slug}/tableOfContents`);
  const section = "Calculator";
  const breadcrumbList = [
    { name: "Calculator", url: "https://seekreturns.com/en/calculators" },
    { name: title, url: `https://seekreturns.com/en/calculators/${slug}` },
  ];
  return generateFeaturedImage(
    title,
    description,
    modifiedDate,
    tableOfContents,
    section,
    breadcrumbList,
  );
}

export default OpenGraphImage;
