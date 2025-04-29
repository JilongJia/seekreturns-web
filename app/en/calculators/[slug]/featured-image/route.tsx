import { generateFeaturedImage } from "@/app/lib/en/content/generateFeaturedImage";
import { getInfo } from "@/app/lib/db/getInfo";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  const info = await getInfo(`/en/calculators/${slug}`);
  if (!info) return;
  const { title, description, modifiedDate } = info;
  const { tableOfContents } = await import(`../${slug}/tableOfContents`);
  const section = "Calculator";
  const breadcrumbList = [
    { name: "Calculator", url: "https://seekreturns.com/en/calculators" },
    { name: title, url: `https://seekreturns.com/en/calculators/${slug}` },
  ];
  return generateFeaturedImage(
    title,
    description,
    modifiedDate,
    tableOfContents,
    section,
    breadcrumbList,
  );
}
