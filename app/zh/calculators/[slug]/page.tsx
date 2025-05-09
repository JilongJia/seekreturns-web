import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import clsx from "clsx";

import { getPageInfo } from "@/app/lib/db/getPageInfo";
import { getStaticParams } from "@/app/lib/db/getStaticParams";
import { generateArticleMetadata } from "@/app/lib/zh/content/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { type MainProps } from "@/app/components/zh/content/page/main";
import { Header } from "@/app/components/zh/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/zh/content/page/TableOfContentsSidebar";
import { Footer } from "@/app/components/zh/content/page/Footer";
import styles from "./page.module.css";

type GenerateMetadataParams = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const slug = (await params).slug;

  const pageInfo = await getPageInfo(`/zh/calculators/${slug}`);

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

  const pageInfo = await getPageInfo(`/zh/calculators/${slug}`);

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
        pathname={`/zh/calculators/${slug}`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContents={tableOfContents}
          className={styles.tableOfContentsSidebar}
        />
        <Main pathname={`/zh/calculators/${slug}`} className={styles.main} />
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
  const language = "zh";
  const section = "calculators";
  const staticParams = await getStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
