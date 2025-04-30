import { generateFeaturedImage } from "@/app/lib/en/section/generateFeaturedImage";

import { info } from "./data/info";

export function generateImageMetadata() {
  const { title } = info;

  return [
    {
      id: "normal",
      alt: `${title} - Seek Returns"`,
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

function OpenGraphImage() {
  const { title } = info;
  const featuredImage = generateFeaturedImage({ text: title });

  return featuredImage;
}

export default OpenGraphImage;
