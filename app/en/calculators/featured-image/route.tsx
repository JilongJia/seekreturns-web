import { generateFeaturedImage } from "@/app/lib/en/section/generateFeaturedImage";

import { info } from "../data/info";

export function GET() {
  const { title } = info;

  const featuredImage = generateFeaturedImage({ title });

  return featuredImage;
}
