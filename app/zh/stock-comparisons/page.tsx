import clsx from "clsx";

import { generateWebsiteMetadata } from "@/app/lib/zh/section/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { Header as PageHeader } from "@/components/zh/layout/Header";
import { Footer } from "@/app/components/zh/section/page/Footer";
import { Tabs } from "./components/Tabs";
import styles from "./page.module.css";

import { pageInfo } from "./data/info";

export function generateMetadata() {
  const metadata = generateWebsiteMetadata(pageInfo);

  return metadata;
}

function Page() {
  const {
    title: pageTitle,
    pathname: pagePathname,
    description: pageDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
  } = pageInfo;

  const jsonLd = generateJsonLd({
    pageTitle,
    pagePathname,
    pageDescription,
    pagePublishedDate,
    pageModifiedDate,
  });

  return (
    <>
      <PageHeader
        pathname="/zh/stock-comparisons"
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.h1}>个股对比索引</h1>
        </header>
        <hr className={styles.hr} />
        <Tabs />
      </main>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default Page;
