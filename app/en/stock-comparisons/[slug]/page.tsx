import clsx from "clsx";
import { notFound } from "next/navigation";

import { generateArticleMetadata } from "@/app/lib/en/content/generateMetadata";
import { generatePageInfo } from "./lib/generatePageInfo";
import { generateArticleInfo } from "./lib/generateArticleInfo";
import { generateJsonLd } from "./lib/generateJsonLd";

import { AdvertisementSidebar } from "@/app/components/en/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
import { Header as PageHeader } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { H1 } from "@/app/components/en/content/page/main/article/H1";
import { Header as ArticleHeader } from "@/app/components/en/content/page/main/article/Header";
import { ModifiedDate } from "@/app/components/en/content/page/main/article/ModifiedDate";
import { P } from "@/app/components/en/content/page/main/article/P";
import { CompanyOverviewSection } from "./components/CompanyOverviewSection";
import { PerformanceComparisonSection } from "./components/PerformanceComparisonSection";
import { ValuationMetricsComparisonSection } from "./components/ValuationMetricsComparisonSection";
import { DividendComparisonSection } from "./components/DividendComparisonSection";
import { FinancialStrengthMetricsComparisonSection } from "./components/FinancialStrengthMetricsComparisonSection";
import styles from "./page.module.css";

import pagesRaw from "@/app/data/stock-comparisons/pages.json";
import { tableOfContents } from "./data/tableOfContents";

type GenerateMetadataParams = { params: Promise<{ slug: string }> };
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const slug = (await params).slug;

  const pageRaw = pagesRaw.find((page) => page.slug === slug);

  if (!pageRaw) {
    notFound();
  }

  const pageInfo = generatePageInfo(pageRaw);

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

  const pageRaw = pagesRaw.find((page) => page.slug === slug);

  if (!pageRaw) {
    notFound();
  }

  const { symbolOne, symbolTwo } = pageRaw;
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
              comparing key factors like performance, valuation metrics,
              dividends, and financial strength. It’s built for investors or
              anyone curious to see how these two stocks match up.
            </P>
            <CompanyOverviewSection
              stockOneSymbol={stockOneSymbol}
              stockTwoSymbol={stockTwoSymbol}
            />
            <PerformanceComparisonSection
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default Page;
export const revalidate = 300;
export const dynamic = "force-static";
