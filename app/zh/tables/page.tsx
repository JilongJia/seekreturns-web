import Link from "next/link";
import clsx from "clsx";

import { generateWebsiteMetadata } from "@/app/lib/zh/section/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { fetchSectionPages } from "@/app/lib/db/fetchSectionPages";
import { Header as PageHeader } from "@/components/zh/layout/Header";
import { Footer } from "@/app/components/zh/section/page/Footer";
import styles from "./page.module.css";

import { pageInfo } from "./data/info";

type PageData = { title: string; pathname: string };

export function generateMetadata() {
  const metadata = generateWebsiteMetadata(pageInfo);

  return metadata;
}

async function Page() {
  const pages: PageData[] = await fetchSectionPages("zh", "tables");

  const groups: Record<string, PageData[]> = pages.reduce(
    (acc, page) => {
      const letter = page.title.charAt(0).toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(page);
      return acc;
    },
    {} as Record<string, PageData[]>,
  );

  const sortedLetters = Object.keys(groups).sort((a, b) =>
    a.localeCompare(b, "zh"),
  );

  sortedLetters.forEach((letter) => {
    groups[letter].sort((a, b) => a.title.localeCompare(b.title, "zh"));
  });

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
        pathname="/zh/tables"
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.h1}>表格索引</h1>
        </header>
        <hr className={styles.hr} />
        {sortedLetters.map((letter) => (
          <section key={letter} className={styles.section}>
            <h2 className={styles.h2}>{letter}</h2>
            <ul className={styles.ul}>
              {groups[letter].map((page) => (
                <li key={page.pathname} className={styles.li}>
                  <Link href={page.pathname} className={styles.link}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
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
