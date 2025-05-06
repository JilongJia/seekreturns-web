import clsx from "clsx";
import { Chart } from "@/app/zh/stock-comparisons/[slug]/components/performance_comparison_section/Chart";
import { Form } from "./stock_comparison_section/Form";

import styles from "./StockComparisonSection.module.css";

type PriceSeriesData = { date: string; price: number }[];

type HistoricalPriceDataPoint = {
  symbol: string;
  date: string;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  volume: number;
};

type StockComparisonSectionProps = { className?: string };

async function fetchPriceSeriesData(
  symbol: string,
): Promise<PriceSeriesData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY!;
  const baseEndpoint =
    "https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted";

  const maxRetryAttempts = 3;
  const retryDelayMs = 1000;
  const sixMonthThresholdMs = 6 * 30 * 24 * 60 * 60 * 1000;
  const fiveYearsInMs = 5 * 365 * 24 * 60 * 60 * 1000;

  const fromDateObj = new Date(Date.now() - fiveYearsInMs);
  const fromDateString = fromDateObj.toISOString().split("T")[0];
  const url = `${baseEndpoint}?symbol=${symbol}&from=${fromDateString}&apikey=${apiKey}`;

  for (
    let attemptNumber = 1;
    attemptNumber <= maxRetryAttempts;
    attemptNumber++
  ) {
    try {
      const response = await fetch(url);
      const rawData: HistoricalPriceDataPoint[] = await response.json();

      if (!Array.isArray(rawData) || rawData.length === 0) {
        throw new Error("No historical price data returned");
      }

      const dataInAscendingDate = [...rawData].reverse();

      const earliestReturnedDateString = dataInAscendingDate[0].date;
      const earliestReturnedDateMs = new Date(
        earliestReturnedDateString,
      ).getTime();
      const requestedFromDateMs = fromDateObj.getTime();

      if (
        Math.abs(earliestReturnedDateMs - requestedFromDateMs) >
        sixMonthThresholdMs
      ) {
        console.warn(
          `Attempt ${attemptNumber}: earliest returned date (${earliestReturnedDateString}) is too far from requested from-date (${fromDateString})`,
        );
        throw new Error("Returned data outside acceptable date range");
      }

      return dataInAscendingDate.map(({ date, adjClose }) => ({
        date,
        price: adjClose,
      }));
    } catch (error) {
      console.error(
        `Error fetching price series for ${symbol} (attempt ${attemptNumber}):`,
        (error as Error).message,
      );

      if (attemptNumber < maxRetryAttempts) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
    }
  }

  return null;
}

export async function StockComparisonSection({
  className,
}: StockComparisonSectionProps) {
  const stockOneSymbol = "AAPL";
  const stockTwoSymbol = "NVDA";

  const stockOnePriceSeriesData = await fetchPriceSeriesData(stockOneSymbol);
  const stockTwoPriceSeriesData = await fetchPriceSeriesData(stockTwoSymbol);

  if (!stockOnePriceSeriesData || !stockTwoPriceSeriesData) return null;

  return (
    <section
      aria-labelledby="stock-comparison"
      className={clsx(styles.stockComparisonSection, className)}
    >
      <div className={styles.textContainer}>
        <h2 id="stock-comparison" className={styles.h2}>
          定制图表，助力高效投资决策
        </h2>
        <p className={styles.p}>
          通过定制化图表工具，您可以追踪并对比重点关注的股票（如
          AAPL、NVDA）表现。设置初始投资金额（如 1
          万元），清晰呈现不同标的随时间的回报变化。图表支持交互操作，便于深入分析数据，提升决策效率。
        </p>
        <p className={styles.p}>输入股票代码，即可快速生成对比图表。</p>
      </div>
      <Form className={styles.form} />
      <Chart
        data={{
          stockOne: {
            symbol: stockOneSymbol,
            priceSeries: stockOnePriceSeriesData,
          },
          stockTwo: {
            symbol: stockTwoSymbol,
            priceSeries: stockTwoPriceSeriesData,
          },
        }}
      />
    </section>
  );
}
