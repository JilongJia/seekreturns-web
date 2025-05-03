import { generateFeaturedImage } from "@/app/lib/en/root/generateFeaturedImage";

import { pageInfo } from "../data/info";

export function GET() {
  const { title } = pageInfo;

  const featuredImage = generateFeaturedImage({ title });

  return featuredImage;
}
