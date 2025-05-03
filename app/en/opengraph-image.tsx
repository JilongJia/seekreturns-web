import { generateFeaturedImage } from "@/app/lib/en/root/generateFeaturedImage";

import { pageInfo } from "./data/info";

export function generateImageMetadata() {
  return [
    {
      id: "normal",
      alt: "Home - Seek Returns",
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
