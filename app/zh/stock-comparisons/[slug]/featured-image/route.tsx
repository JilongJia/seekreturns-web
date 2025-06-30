import { generateFeaturedImage } from "@/app/lib/zh/content/generateFeaturedImage";
import { generatePageInfo } from "../lib/generatePageInfo";

import { stockComparisonList } from "@/data/stock-comparisons";
import { tableOfContents } from "../data/tableOfContents";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const matchingComparison = stockComparisonList.find(
    (comparison) => comparison.slug === slug,
  );

  if (!matchingComparison) {
    return new Response("图片未找到", { status: 404 });
  }

  const { title, description, modifiedDate } =
    generatePageInfo(matchingComparison);

  const section = "个股对比";

  const breadcrumbList = [
    {
      name: "个股对比",
      url: `${baseUrl}/zh/stock-comparisons`,
    },
    {
      name: title,
      url: `${baseUrl}/zh/stock-comparisons/${slug}`,
    },
  ];

  const featuredImage = generateFeaturedImage({
    title,
    description,
    modifiedDate,
    tableOfContents,
    section,
    breadcrumbList,
  });

  return featuredImage;
}
