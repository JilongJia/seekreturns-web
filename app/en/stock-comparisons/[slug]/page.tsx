import clsx from "clsx";
import { AdvertisementSidebar } from "@/app/components/en/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
import { Header } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { tableOfContentsData } from "./tableOfContents";

import { PerformanceComparisonSection } from "./components/PerformanceComparisonSection";
import { CompanyOverviewSection } from "./components/CompanyOverviewSection";
import { ValuationMetricsComparisonSection } from "./components/ValuationMetricsComparisonSection";
import { DividendComparisonSection } from "./components/DividendComparisonSection";
import { FinancialStrengthMetricsComparisonSection } from "./components/FinancialStrengthComparisonSection";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const stockOneSymbol = "AAPL";
  const stockTwoSymbol = "TSLA";

  return (
    <>
      <Header
        pathname={`/en/stock-comparisons/${slug}`}
        className={clsx(styles.header, "layoutContainer")}
      />
      <div className={clsx(styles.contentContainer, "layoutContainer")}>
        <TableOfContentsSidebar
          tableOfContentsData={tableOfContentsData}
          className={styles.tableOfContentsSidebar}
        />
        <main className={styles.main}>
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
