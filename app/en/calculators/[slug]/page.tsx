import dynamic from "next/dynamic";
import clsx from "clsx";

import { getInfo } from "@/app/lib/db/getInfo";
import { generateArticleMetadata } from "@/app/lib/en/content/generateMetadata";
import { getStaticParams } from "@/app/lib/db/getStaticParams";

import { type MainProps } from "@/app/components/en/content/page/main";
import { Header } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
import styles from "./page.module.css";

type generateMetadataProps = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: generateMetadataProps) {
  const slug = (await params).slug;
  const pageInfo = await getInfo(`/en/calculators/${slug}`);

  if (!pageInfo) {
    return {};
  }
  const {
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    alternateLanguageUrls,
  } = pageInfo;
  return generateArticleMetadata(
    title,
    pathname,
    description,
    publishedDate,
    modifiedDate,
    alternateLanguageUrls,
  );
}

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const { generateJsonLd } = await import(`./${slug}/jsonLd`);
  const pageInfo = await getInfo(`/en/calculators/${slug}`);
  if (!pageInfo) {
    return {};
  }
  const jsonLd = generateJsonLd({
    title: pageInfo.title,
    pathname: pageInfo.pathname,
    description: pageInfo.description,
    publishedDate: pageInfo.publishedDate,
    modifiedDate: pageInfo.modifiedDate,
  });
  const { tableOfContents } = await import(`./${slug}/tableOfContents`);
  const Main = dynamic<MainProps>(() =>
    import(`./${slug}/Main`).then((mod) => mod.Main),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        pathname={`/en/calculators/${slug}`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContents={tableOfContents}
          className={styles.tableOfContentsSidebar}
        />
        <Main pathname={`/en/calculators/${slug}`} className={styles.main} />
      </div>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export async function generateStaticParams() {
  const language = "en";
  const section = "calculators";
  const staticParams = await getStaticParams(language, section);
  return staticParams;
}

export const dynamicParams = false;

export default Page;
