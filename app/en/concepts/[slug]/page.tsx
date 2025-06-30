import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import clsx from "clsx";

import { fetchPageInfo } from "@/app/lib/db/fetchPageInfo";
import { fetchStaticParams } from "@/app/lib/db/fetchStaticParams";
import { generateArticleMetadata } from "@/app/lib/en/content/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Header } from "@/components/en/layout/Header";
import { TableOfContentsSidebar } from "@/components/en/layout/TableOfContentsSidebar";
import { AdvertisementSidebar } from "@/components/en/layout/AdvertisementSidebar";
import { Footer } from "@/components/en/layout/Footer";
import styles from "./page.module.css";

type GenerateMetadataParams = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const slug = (await params).slug;

  const pageInfo = await fetchPageInfo(`/en/concepts/${slug}`);

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

  const pageInfo = await fetchPageInfo(`/en/concepts/${slug}`);

  if (!pageInfo) {
    notFound();
  }

  const {
    title: pageTitle,
    pathname: pagePathname,
    description: pageDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
  } = pageInfo;

  const { articleInfo } = await import(`./${slug}/data/info`);

  const {
    title: articleTitle,
    description: articleDescription,
    images: articleImages,
  } = articleInfo;

  const jsonLd = generateJsonLd({
    pageTitle,
    pagePathname,
    pageDescription,
    pagePublishedDate,
    pageModifiedDate,
    articleTitle,
    articleDescription,
    articleImages,
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
  const staticParams = await fetchStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
