import clsx from "clsx";

import { generateWebsiteMetadata } from "@/app/lib/zh/root/generateMetadata";
import { generateJsonLd } from "./lib/generateJsonLd";

import { Header } from "@/app/components/zh/root/page/Header";
import { Footer } from "@/app/components/zh/root/page/Footer";
import { HeroSection } from "./components/HeroSection";
import { StockComparisonSection } from "./components/StockComparisonSection";
import { CalculatorSection } from "./components/CalculatorSection";
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
      <Header className={clsx(styles.header, "layoutContainer")} />
      <main>
        <HeroSection className={styles.heroSection} />
        <StockComparisonSection className={styles.stockComparisonSection} />
        <CalculatorSection className={styles.calculatorSection} />
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
export const revalidate = 3600;
