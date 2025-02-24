import dynamic from "next/dynamic";
import clsx from "clsx";

import { getStaticParams } from "@/app/lib/db/getStaticParams";

import { Header } from "@/app/components/en-US/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en-US/content/page/TableOfContentsSidebar";
import { MainProps } from "@/app/components/en-US/content/page/main";
import { AdvertisementSidebar } from "@/app/components/en-US/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/en-US/content/page/Footer";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const { tableOfContentsData } = await import(`./${slug}/tableOfContents`);
  const Main = dynamic<MainProps>(() =>
    import(`./${slug}/Main`).then((mod) => mod.Main),
  );

  return (
    <>
      <Header
        pathname={`/en-US/concepts/${slug}`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContentsData={tableOfContentsData}
          className={styles.tableOfContentsSidebar}
        />
        <Main pathname={`/en-US/concepts/${slug}`} className={styles.main} />
        <AdvertisementSidebar className={styles.advertisementSidebar} />
      </div>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export async function generateStaticParams() {
  const language = "en-US";
  const section = "concepts";
  const staticParams = await getStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
