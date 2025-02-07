import dynamic from "next/dynamic";
import { getStaticParams } from "@/app/lib/prisma/getStaticParams";
import { paddingClassName } from "@/app/styles/padding";
import { gridColsClassName, gridGapXClassName } from "@/app/styles/grid";

import { TableOfContentsSidebar } from "@/app/components/en-US/content/page/TableOfContentsSidebar";
import { type MainContentProps } from "@/app/components/en-US/content/page/main_content/Main";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const MainContent = dynamic<MainContentProps>(() =>
    import(`./${slug}/MainContent`).then((mod) => mod.MainContent),
  );

  return (
    <div
      className={`${paddingClassName} ${gridColsClassName} ${gridGapXClassName} mb-6 mt-10 lg:mt-16`}
    >
      <MainContent
        pathname={`/en-US/calculators/${slug}`}
        className="col-span-full lg:col-span-9"
      />
      <TableOfContentsSidebar className="hidden lg:col-span-3 lg:block" />
    </div>
  );
}

export async function generateStaticParams() {
  const language = "en-US";
  const section = "calculators";
  const staticParams = await getStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
