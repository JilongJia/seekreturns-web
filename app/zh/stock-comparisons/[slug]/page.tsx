import clsx from "clsx";
import { notFound } from "next/navigation";

import { AdvertisementSidebar } from "@/app/components/zh/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/zh/content/page/Footer";
import { Header as PageHeader } from "@/app/components/zh/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/zh/content/page/TableOfContentsSidebar";
import { H1 } from "@/app/components/zh/content/page/main/article/H1";
import { Header as ArticleHeader } from "@/app/components/zh/content/page/main/article/Header";
import { ModifiedDate } from "@/app/components/zh/content/page/main/article/ModifiedDate";
import { P } from "@/app/components/zh/content/page/main/article/P";

import { PerformanceComparisonSection } from "./components/PerformanceComparisonSection";
import { CompanyOverviewSection } from "./components/CompanyOverviewSection";
import { ValuationMetricsComparisonSection } from "./components/ValuationMetricsComparisonSection";
import { DividendComparisonSection } from "./components/DividendComparisonSection";
import { FinancialStrengthMetricsComparisonSection } from "./components/FinancialStrengthMetricsComparisonSection";
import styles from "./page.module.css";

import pages from "@/app/data/stock-comparisons/pages.json";
import { tableOfContents } from "./data/tableOfContents";

type PageProps = { params: Promise<{ slug: string }> };

async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const page = pages.find((page) => page.slug === slug);

  if (!page) {
    notFound();
  }

  const { symbolOne, symbolTwo } = page;
  const stockOneSymbol = symbolOne;
  const stockTwoSymbol = symbolTwo;

  return (
    <>
      <PageHeader
        pathname={`/zh/stock-comparisons/${slug}`}
        className={clsx(styles.pageHeader, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContents={tableOfContents}
          className={styles.tableOfContentsSidebar}
        />
        <main className={styles.main}>
          <article>
            <ArticleHeader className={styles.articleHeader}>
              <H1>
                {stockOneSymbol} 与 {stockTwoSymbol}：股票综合比较
              </H1>
              <ModifiedDate />
            </ArticleHeader>
            <P>
              本文对 {stockOneSymbol} 和 {stockTwoSymbol}{" "}
              进行了全面对比，涵盖历史表现、估值、股息以及财务实力等方面。无论您是寻求投资洞察，还是希望了解这两只股票的相对优势，这里都能为您提供清晰的参考。
            </P>
            <PerformanceComparisonSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <CompanyOverviewSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <ValuationMetricsComparisonSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <DividendComparisonSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <FinancialStrengthMetricsComparisonSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
          </article>
        </main>
      </div>
      <AdvertisementSidebar className={styles.advertisementSidebar} />
      <Footer className={clsx(styles.footer, "layoutContainer")} />
    </>
  );
}

export default Page;
export const revalidate = 60;
export const dynamic = "force-static";
