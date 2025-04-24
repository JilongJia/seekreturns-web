import { getTitle } from "@/app/lib/db/getTitle";
import { generateOpenGraphImage } from "@/app/en/lib/generateOpenGraphImage";

type GenerateImageMetadataParams = { params: Promise<{ slug: string }> };
type OpenGraphImageParams = { params: Promise<{ slug: string }>; id: string };

export async function generateImageMetadata({
  params,
}: GenerateImageMetadataParams) {
  const slug = (await params).slug;
  const title = await getTitle(`/en/calculators/${slug}`);

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
  const title = await getTitle(`/en/calculators/${slug}`);

  return generateOpenGraphImage(title || "Seek Returns");
}

export default OpenGraphImage;
