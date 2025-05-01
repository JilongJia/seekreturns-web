import { getInfo } from "@/app/lib/db/getInfo";
import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const info = await getInfo(`/en/calculators/${slug}`);

  if (!info) {
    return new Response("Image Not Found", { status: 404 });
  }

  const { title, description, modifiedDate } = info;

  const { tableOfContents } = await import(`../${slug}/data/tableOfContents`);

  const section = "Calculator";

  const breadcrumbList = [
    {
      name: "Calculator",
      url: `${baseUrl}/en/calculators`,
    },
    {
      name: title,
      url: `${baseUrl}/en/calculators/${slug}`,
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
