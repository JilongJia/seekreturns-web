import { fetchPageInfo } from "@/app/lib/db/fetchPageInfo";
import { generateFeaturedImage } from "@/app/lib/zh/content/generateFeaturedImage";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pageInfo = await fetchPageInfo(`/zh/calculators/${slug}`);

  if (!pageInfo) {
    return new Response("图片未找到", { status: 404 });
  }

  const { title, description, modifiedDate } = pageInfo;

  const { tableOfContents } = await import(`../${slug}/data/tableOfContents`);

  const section = "计算器";

  const breadcrumbList = [
    {
      name: "计算器",
      url: `${baseUrl}/zh/calculators`,
    },
    {
      name: title,
      url: `${baseUrl}/zh/calculators/${slug}`,
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
