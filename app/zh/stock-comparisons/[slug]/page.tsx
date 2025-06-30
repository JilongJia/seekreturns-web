import clsx from "clsx";
import { notFound } from "next/navigation";

import { generateArticleMetadata } from "@/app/lib/zh/content/generateMetadata";
import { generatePageInfo } from "./lib/generatePageInfo";
import { generateArticleInfo } from "./lib/generateArticleInfo";
import { generateJsonLd } from "./lib/generateJsonLd";

import { AdvertisementSidebar } from "@/components/zh/layout/AdvertisementSidebar";
import { Footer } from "@/components/zh/layout/Footer";
import { Header as PageHeader } from "@/components/zh/layout/Header";
import { TableOfContentsSidebar } from "@/components/zh/layout/TableOfContentsSidebar";
import { H1 } from "@/components/zh/ui/H1";
import { Header as ArticleHeader } from "@/components/zh/ui/Header";
import { ModifiedDate } from "@/components/zh/ui/ModifiedDate";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { CompanyOverviewSection } from "./components/CompanyOverviewSection";
import { HistoricalPerformanceSection } from "./components/HistoricalPerformanceSection";
import { ProfitabilitySection } from "./components/ProfitabilitySection";
import { FinancialStrengthSection } from "./components/FinancialStrengthSection";
import { GrowthSection } from "./components/GrowthSection";
import { DividendSection } from "./components/DividendSection";
import { ValuationSection } from "./components/ValuationSection";
import styles from "./page.module.css";

import { stockComparisonList } from "@/data/stock-comparisons";
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

  const { symbolOne, symbolTwo } = matchingComparison;
  const stockOneSymbol = symbolOne;
  const stockTwoSymbol = symbolTwo;

  const pageInfo = generatePageInfo({ symbolOne, symbolTwo, slug });

  const {
    title: pageTitle,
    pathname: pagePathname,
    description: pageDescription,
    publishedDate: pagePublishedDate,
    modifiedDate: pageModifiedDate,
  } = pageInfo;

  const articleInfo = generateArticleInfo({ symbolOne, symbolTwo });

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
                {stockOneSymbol}与{stockTwoSymbol}：股票综合比较
              </H1>
              <ModifiedDate />
            </ArticleHeader>
            <P>
              本文对{stockOneSymbol}和{stockTwoSymbol}
              进行了全面对比，涵盖历史表现、盈利能力、财务实力、成长性、股息以及估值等方面。
            </P>
            <CompanyOverviewSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <HistoricalPerformanceSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <ProfitabilitySection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <FinancialStrengthSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <GrowthSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <DividendSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <ValuationSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
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
