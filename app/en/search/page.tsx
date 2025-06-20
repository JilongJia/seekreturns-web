import clsx from "clsx";

import { generateWebsiteMetadata } from "@/app/lib/en/utility/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { Header } from "@/components/en/layout/Header";
import { Footer } from "@/app/components/en/utility/page/Footer";
import { Search } from "./components/Search";
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
      <Header
        pathname="/en/search"
        className={clsx(styles.header, "layoutContainer")}
      />
      <main className={styles.main}>
        <Search />
      </main>
      <Footer className={clsx(styles.footer, "layoutContainer")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export const dynamic = "force-dynamic";

export default Page;
