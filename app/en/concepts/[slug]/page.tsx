import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import clsx from "clsx";

import { getInfo } from "@/app/lib/db/getInfo";
import { getStaticParams } from "@/app/lib/db/getStaticParams";
import { generateArticleMetadata } from "@/app/lib/en/content/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Header } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { AdvertisementSidebar } from "@/app/components/en/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
import styles from "./page.module.css";

type generateMetadataProps = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: generateMetadataProps) {
  const slug = (await params).slug;
  const pageInfo = await getInfo(`/en/concepts/${slug}`);

  if (!pageInfo) {
    notFound();
  }

  const {
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    alternateLanguageUrls,
  } = pageInfo;

  const metadata = generateArticleMetadata({
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    alternateLanguageUrls,
  });

  return metadata;
}

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const pageInfo = await getInfo(`/en/concepts/${slug}`);
  if (!pageInfo) {
    notFound();
  }
  const { title, pathname, description, publishedDate, modifiedDate } =
    pageInfo;
  const { images } = await import(`./${slug}/data/images`);

  const jsonLd = generateJsonLd({
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    images,
  });

  const { tableOfContents } = await import(`./${slug}/data/tableOfContents`);
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
          tableOfContents={tableOfContents}
          className={styles.tableOfContentsSidebar}
        />
        <Main pathname={`/en/concepts/${slug}`} className={styles.main} />
        <AdvertisementSidebar className={styles.advertisementSidebar} />
      </div>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
