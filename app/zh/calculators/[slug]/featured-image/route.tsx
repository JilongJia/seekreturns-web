import { getInfo } from "@/app/lib/db/getInfo";
import { generateFeaturedImage } from "@/app/lib/zh/content/generateFeaturedImage";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const info = await getInfo(`/zh/calculators/${slug}`);

  if (!info) {
    return new Response("图片未找到", { status: 404 });
  }

  const { title, description, modifiedDate } = info;

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
