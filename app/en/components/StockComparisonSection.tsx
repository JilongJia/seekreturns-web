import clsx from "clsx";
import { Chart } from "@/app/en/stock-comparisons/[slug]/components/performance_comparison_section/Chart";
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
          Visualize Stock Performance with Custom Charts
        </h2>
        <p className={styles.p}>
          Our charting tool makes it simple to compare stock performance over
          time. For example, track how a $10,000 investment in stocks like AAPL
          or NVDA evolves, with interactive charts showing values and returns
          for any date.
        </p>
        <p className={styles.p}>
          Choose your tickers and build tailored comparisons quickly to analyze
          market trends with clarity.
        </p>
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
