import dynamic from "next/dynamic";
import clsx from "clsx";

import { getStaticParams } from "@/app/lib/db/getStaticParams";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Header } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { AdvertisementSidebar } from "@/app/components/en/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
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
        pathname={`/en/concepts/${slug}`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContentsData={tableOfContentsData}
          className={styles.tableOfContentsSidebar}
        />
        <Main pathname={`/en/concepts/${slug}`} className={styles.main} />
        <AdvertisementSidebar className={styles.advertisementSidebar} />
      </div>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export async function generateStaticParams() {
  const language = "en";
  const section = "concepts";
  const staticParams = await getStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
