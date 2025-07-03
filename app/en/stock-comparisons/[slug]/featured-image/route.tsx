import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";
import { generatePageInfo } from "../lib/generatePageInfo";

import { stockComparisonList } from "@/data/stock-comparison-list";
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
    return new Response("Image Not Found", { status: 404 });
  }

  const { title, description, modifiedDate } =
    generatePageInfo(matchingComparison);

  const section = "Stock Comparison";

  const breadcrumbList = [
    {
      name: "Stock Comparisons",
      url: `${baseUrl}/en/stock-comparisons`,
    },
    {
      name: title,
      url: `${baseUrl}/en/stock-comparisons/${slug}`,
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
