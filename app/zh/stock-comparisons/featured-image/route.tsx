import { generateFeaturedImage } from "@/app/lib/zh/section/generateFeaturedImage";

import { pageInfo } from "../data/info";

export function GET() {
  const { title } = pageInfo;

  const featuredImage = generateFeaturedImage({ title });

  return featuredImage;
}
