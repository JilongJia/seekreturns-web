import { getPageInfo } from "@/app/lib/db/getPageInfo";
import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pageInfo = await getPageInfo(`/en/guides/${slug}`);

  if (!pageInfo) {
    return new Response("Image Not Found", { status: 404 });
  }

  const { title, description, modifiedDate } = pageInfo;

  const { tableOfContents } = await import(`../${slug}/data/tableOfContents`);

  const section = "Guide";

  const breadcrumbList = [
    {
      name: "Guides",
      url: `${baseUrl}/en/guides`,
    },
    {
      name: title,
      url: `${baseUrl}/en/guides/${slug}`,
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
