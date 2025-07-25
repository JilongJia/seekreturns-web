import clsx from "clsx";
import { notFound } from "next/navigation";

import { generateArticleMetadata } from "@/app/lib/en/content/generateMetadata";
import { generatePageInfo } from "./lib/generatePageInfo";
import { generateArticleInfo } from "./lib/generateArticleInfo";
import { generateJsonLd } from "./lib/generateJsonLd";

import { fetchStockData } from "@/lib/firebase/stocks";
import { fetchPriceSeriesData } from "@/app/lib/fmp/fetchPriceSeriesData";
import { fetchFinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData";

import { AdvertisementSidebar } from "@/components/en/layout/AdvertisementSidebar";
import { Footer } from "@/components/en/layout/Footer";
import { Header as PageHeader } from "@/components/en/layout/Header";
import { TableOfContentsSidebar } from "@/components/en/layout/TableOfContentsSidebar";
import { H1 } from "@/components/en/ui/H1";
import { Header as ArticleHeader } from "@/components/en/ui/Header";
import { ModifiedDate } from "@/components/en/ui/ModifiedDate";
import { P } from "@/components/en/ui/P";
import { CompanyOverviewSection } from "./_components/CompanyOverviewSection";
import { HistoricalPerformanceSection } from "./_components/HistoricalPerformanceSection";
import { ProfitabilitySection } from "./_components/ProfitabilitySection";
import { FinancialStrengthSection } from "./_components/FinancialStrengthSection";
import { GrowthSection } from "./_components/GrowthSection";
import { DividendSection } from "./_components/DividendSection";
import { ValuationSection } from "./_components/ValuationSection";
import styles from "./page.module.css";

import { stockComparisonList } from "@/data/stock-comparison-list";
import { tableOfContents } from "./data/tableOfContents";

type GenerateMetadataParams = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const slug = (await params).slug;

  const matchingComparison = stockComparisonList.find(
    (comparison) => comparison.slug === slug,
  );

  if (!matchingComparison) {
    notFound();
  }

  const pageInfo = generatePageInfo(matchingComparison);

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

  const matchingComparison = stockComparisonList.find(
    (comparison) => comparison.slug === slug,
  );

  if (!matchingComparison) {
    notFound();
  }

  const { stockOneSymbol, stockTwoSymbol } = matchingComparison;

  const [
    stockOneData,
    stockTwoData,
    stockOnePriceSeries,
    stockTwoPriceSeries,
    stockOneGrowthData,
    stockTwoGrowthData,
  ] = await Promise.all([
    fetchStockData(stockOneSymbol),
    fetchStockData(stockTwoSymbol),
    fetchPriceSeriesData(stockOneSymbol),
    fetchPriceSeriesData(stockTwoSymbol),
    fetchFinancialGrowthData(stockOneSymbol),
    fetchFinancialGrowthData(stockTwoSymbol),
  ]);

  if (!stockOneData || !stockTwoData) {
    notFound();
  }

  const pageInfo = generatePageInfo({
    stockOneSymbol,
    stockTwoSymbol,
    slug,
  });

  const {
    title: pageTitle,
    pathname: pagePathname,
    description: pageDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
  } = pageInfo;

  const articleInfo = generateArticleInfo({
    stockOneSymbol,
    stockTwoSymbol,
  });

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

  return (
    <>
      <PageHeader
        pathname={`/en/stock-comparisons/${slug}`}
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
                {stockOneSymbol} vs. {stockTwoSymbol}: A Head-to-Head Stock
                Comparison
              </H1>
              <ModifiedDate />
            </ArticleHeader>
            <P>
              Here’s a clear look at {stockOneSymbol} and {stockTwoSymbol},
              comparing key factors like historical performance, profitability,
              financial strength, growth, dividend, and valuation.
            </P>
            <CompanyOverviewSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneProfileData={stockOneData}
              stockTwoProfileData={stockTwoData}
            />
            <HistoricalPerformanceSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOnePriceSeries={stockOnePriceSeries}
              stockTwoPriceSeries={stockTwoPriceSeries}
            />
            <ProfitabilitySection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneProfileData={stockOneData}
              stockOneKeyMetricsData={stockOneData}
              stockOneRatiosData={stockOneData}
              stockTwoProfileData={stockTwoData}
              stockTwoKeyMetricsData={stockTwoData}
              stockTwoRatiosData={stockTwoData}
            />
            <FinancialStrengthSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneProfileData={stockOneData}
              stockOneKeyMetricsData={stockOneData}
              stockOneRatiosData={stockOneData}
              stockTwoProfileData={stockTwoData}
              stockTwoKeyMetricsData={stockTwoData}
              stockTwoRatiosData={stockTwoData}
            />
            <GrowthSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneFinancialGrowthData={stockOneGrowthData}
              stockTwoFinancialGrowthData={stockTwoGrowthData}
            />
            <DividendSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneProfileData={stockOneData}
              stockOneRatiosData={stockOneData}
              stockTwoProfileData={stockTwoData}
              stockTwoRatiosData={stockTwoData}
            />
            <ValuationSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
              stockOneProfileData={stockOneData}
              stockOneKeyMetricsData={stockOneData}
              stockOneRatiosData={stockOneData}
              stockTwoProfileData={stockTwoData}
              stockTwoKeyMetricsData={stockTwoData}
              stockTwoRatiosData={stockTwoData}
            />
          </article>
        </main>
      </div>
      <AdvertisementSidebar className={styles.advertisementSidebar} />
      <Footer className={clsx(styles.footer, "layoutContainer")} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default Page;
