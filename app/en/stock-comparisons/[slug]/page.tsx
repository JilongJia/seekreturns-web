import clsx from "clsx";
import { AdvertisementSidebar } from "@/app/components/en/content/page/AdvertisementSidebar";
import { Footer } from "@/app/components/en/content/page/Footer";
import { Header } from "@/app/components/en/content/page/Header";
import { TableOfContentsSidebar } from "@/app/components/en/content/page/TableOfContentsSidebar";
import { tableOfContentsData } from "./tableOfContents";

import {
  PerformanceComparisonSection,
  type PerformanceComparisonData,
} from "./components/PerformanceComparisonSection";
import {
  CompanyOverviewSection,
  type CompanyOverviewData,
} from "./components/CompanyOverviewSection";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

type HistoricalPriceEODData = {
  symbol: string;
  date: string;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  volume: number;
};

async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const stockOneSymbol = "AAPL";
  const stockTwoSymbol = "TSLA";

  const now = new Date();
  const oneYearInMs = 360 * 24 * 60 * 60 * 1000;
  const fromDateObj = new Date(now.getTime() - oneYearInMs);
  const fromDate = fromDateObj.toISOString().split("T")[0];

  const stockOneHistoricalPriceEODDataApiEndpoint = `https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted?symbol=${stockOneSymbol}&from=${fromDate}&apikey=${process.env.FINANCIAL_MODELING_PREP_API_KEY}`;
  const stockTwoHistoricalPriceEODDataApiEndpoint = `https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted?symbol=${stockTwoSymbol}&from=${fromDate}&apikey=${process.env.FINANCIAL_MODELING_PREP_API_KEY}`;
  const stockOneProfileDataApiEndpoint = `https://financialmodelingprep.com/stable/profile?symbol=${stockOneSymbol}&apikey=${process.env.FINANCIAL_MODELING_PREP_API_KEY}`;
  const stockTwoProfileDataApiEndpoint = `https://financialmodelingprep.com/stable/profile?symbol=${stockTwoSymbol}&apikey=${process.env.FINANCIAL_MODELING_PREP_API_KEY}`;

  type StockComparisonDataItem = {
    symbol: string;
    companyName: string;
    country: string;
    sector: string;
    industry: string;
    ceo: string;
    price: number;
    marketCap: number;
    beta: number;
    exchange: string;
    ipoDate: string;
    isAdr: boolean;
    currency: string;
    priceSeries: { date: string; price: number }[];
  };

  type StockComparisonData = {
    stockOne: StockComparisonDataItem | null;
    stockTwo: StockComparisonDataItem | null;
  };

  const stockComparisonData: StockComparisonData = {
    stockOne: null,
    stockTwo: null,
  };

  let stockOnePriceSeriesData: { date: string; price: number }[] | null = null;
  let stockTwoPriceSeriesData: { date: string; price: number }[] | null = null;
  try {
    const [
      stockOneHistoricalPriceEODDataApiResponse,
      stockTwoHistoricalPriceEODDataApiResponse,
    ] = await Promise.all([
      fetch(stockOneHistoricalPriceEODDataApiEndpoint),
      fetch(stockTwoHistoricalPriceEODDataApiEndpoint),
    ]);
    const stockOneHistoricalPriceEODData: HistoricalPriceEODData[] =
      await stockOneHistoricalPriceEODDataApiResponse.json();
    const stockTwoHistoricalPriceEODData: HistoricalPriceEODData[] =
      await stockTwoHistoricalPriceEODDataApiResponse.json();

    stockOneHistoricalPriceEODData.reverse();
    stockTwoHistoricalPriceEODData.reverse();

    stockOnePriceSeriesData = stockOneHistoricalPriceEODData.map((item) => ({
      date: item.date,
      price: item.adjClose,
    }));
    stockTwoPriceSeriesData = stockTwoHistoricalPriceEODData.map((item) => ({
      date: item.date,
      price: item.adjClose,
    }));
  } catch (error) {
    console.error("Error fetching historical price EOD data:", error);
  }

  try {
    const [stockOneProfileDataApiResponse, stockTwoProfileDataApiResponse] =
      await Promise.all([
        fetch(stockOneProfileDataApiEndpoint),
        fetch(stockTwoProfileDataApiEndpoint),
      ]);
    const stockOneRawProfileData = await stockOneProfileDataApiResponse.json();
    const stockTwoRawProfileData = await stockTwoProfileDataApiResponse.json();
    const stockOneProfileData = stockOneRawProfileData[0];
    const stockTwoProfileData = stockTwoRawProfileData[0];

    if (stockOneProfileData && stockOnePriceSeriesData) {
      stockComparisonData.stockOne = {
        symbol: stockOneProfileData.symbol,
        companyName: stockOneProfileData.companyName,
        country: stockOneProfileData.country,
        sector: stockOneProfileData.sector,
        industry: stockOneProfileData.industry,
        ceo: stockOneProfileData.ceo,
        price: stockOneProfileData.price,
        marketCap: stockOneProfileData.marketCap,
        beta: stockOneProfileData.beta,
        exchange: stockOneProfileData.exchange,
        ipoDate: stockOneProfileData.ipoDate,
        isAdr: stockOneProfileData.isAdr,
        currency: stockOneProfileData.currency,
        priceSeries: stockOnePriceSeriesData,
      };
    }

    if (stockTwoProfileData && stockTwoPriceSeriesData) {
      stockComparisonData.stockTwo = {
        symbol: stockTwoProfileData.symbol,
        companyName: stockTwoProfileData.companyName,
        country: stockTwoProfileData.country,
        sector: stockTwoProfileData.sector,
        industry: stockTwoProfileData.industry,
        ceo: stockTwoProfileData.ceo,
        price: stockTwoProfileData.price,
        marketCap: stockTwoProfileData.marketCap,
        beta: stockTwoProfileData.beta,
        exchange: stockTwoProfileData.exchange,
        ipoDate: stockTwoProfileData.ipoDate,
        isAdr: stockTwoProfileData.isAdr,
        currency: stockTwoProfileData.currency,
        priceSeries: stockTwoPriceSeriesData,
      };
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }

  const performanceComparisonData: PerformanceComparisonData | null =
    stockComparisonData.stockOne && stockComparisonData.stockTwo
      ? {
          stockOne: {
            symbol: stockComparisonData.stockOne.symbol,
            priceSeries: stockComparisonData.stockOne.priceSeries,
          },
          stockTwo: {
            symbol: stockComparisonData.stockTwo.symbol,
            priceSeries: stockComparisonData.stockTwo.priceSeries,
          },
        }
      : null;

  const companyOverviewData: CompanyOverviewData | null =
    stockComparisonData.stockOne && stockComparisonData.stockTwo
      ? {
          stockOne: {
            symbol: stockComparisonData.stockOne.symbol,
            companyName: stockComparisonData.stockOne.companyName,
            country: stockComparisonData.stockOne.country,
            sector: stockComparisonData.stockOne.sector,
            industry: stockComparisonData.stockOne.industry,
            ceo: stockComparisonData.stockOne.ceo,
            price: stockComparisonData.stockOne.price,
            marketCap: stockComparisonData.stockOne.marketCap,
            beta: stockComparisonData.stockOne.beta,
            exchange: stockComparisonData.stockOne.exchange,
            ipoDate: stockComparisonData.stockOne.ipoDate,
            isAdr: stockComparisonData.stockOne.isAdr,
            currency: stockComparisonData.stockOne.currency,
          },
          stockTwo: {
            symbol: stockComparisonData.stockTwo.symbol,
            companyName: stockComparisonData.stockTwo.companyName,
            country: stockComparisonData.stockTwo.country,
            sector: stockComparisonData.stockTwo.sector,
            industry: stockComparisonData.stockTwo.industry,
            ceo: stockComparisonData.stockTwo.ceo,
            price: stockComparisonData.stockTwo.price,
            marketCap: stockComparisonData.stockTwo.marketCap,
            beta: stockComparisonData.stockTwo.beta,
            exchange: stockComparisonData.stockTwo.exchange,
            ipoDate: stockComparisonData.stockTwo.ipoDate,
            isAdr: stockComparisonData.stockTwo.isAdr,
            currency: stockComparisonData.stockTwo.currency,
          },
        }
      : null;

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
            performanceComparisonData={performanceComparisonData}
          />
          <CompanyOverviewSection companyOverviewData={companyOverviewData} />
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
