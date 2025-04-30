import { getInfo } from "@/app/lib/db/getInfo";
import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";

type GetRouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: GetRouteContext) {
  const slug = (await params).slug;
  const info = await getInfo(`/en/tables/${slug}`);
  if (!info) {
    return new Response("Image Not Found", { status: 404 });
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { title, description, modifiedDate } = info;
  const { tableOfContents } = await import(`../${slug}/data/tableOfContents`);
  const section = "Table";
  const breadcrumbList = [
    {
      name: "Table",
      url: `${baseUrl}/en/tables`,
    },
    {
      name: title,
      url: `${baseUrl}/en/tables/${slug}`,
    },
  ];

  const featuredImage = generateFeaturedImage(
    title,
    description,
    modifiedDate,
    tableOfContents,
    section,
    breadcrumbList,
  );

  return featuredImage;
}
