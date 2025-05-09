import { generateFeaturedImage } from "@/app/lib/zh/section/generateFeaturedImage";

import { pageInfo } from "./data/info";

export function generateImageMetadata() {
  const { title } = pageInfo;

  return [
    {
      id: "normal",
      alt: `${title} - Seek Returns`,
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

function OpenGraphImage() {
  const { title } = pageInfo;

  const featuredImage = generateFeaturedImage({ title });

  return featuredImage;
}

export default OpenGraphImage;
