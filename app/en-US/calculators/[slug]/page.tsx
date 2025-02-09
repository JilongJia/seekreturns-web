import dynamic from "next/dynamic";
import clsx from "clsx";

import { getStaticParams } from "@/app/lib/db/getStaticParams";

import { TableOfContentsSidebar } from "@/app/components/en-US/content/page/TableOfContentsSidebar";
import { type MainContentProps } from "@/app/components/en-US/content/page/main_content/Main";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const MainContent = dynamic<MainContentProps>(() =>
    import(`./${slug}/MainContent`).then((mod) => mod.MainContent),
  );

  return (
    <div className={clsx(styles.page, "layoutContainer")}>
      <MainContent
        pathname={`/en-US/calculators/${slug}`}
        className={styles.mainContent}
      />
      <TableOfContentsSidebar className={styles.tableOfContentsSidebar} />
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
