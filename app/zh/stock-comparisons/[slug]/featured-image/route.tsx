import { generateFeaturedImage } from "@/app/lib/zh/content/generateFeaturedImage";
import { generatePageInfo } from "../lib/generatePageInfo";

import pagesRaw from "@/app/data/stock-comparisons/pages.json";
import { tableOfContents } from "../data/tableOfContents";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pageRaw = pagesRaw.find((page) => page.slug === slug);

  if (!pageRaw) {
    return new Response("图片未找到", { status: 404 });
  }

  const { title, description, modifiedDate } = generatePageInfo(pageRaw);

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
