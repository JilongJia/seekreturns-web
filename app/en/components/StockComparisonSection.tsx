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
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY;
  const endpoint = `https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted?symbol=${symbol}&apikey=${apiKey}`;
  try {
    const response = await fetch(endpoint);
    const historicalPriceRawData: HistoricalPriceDataPoint[] =
      await response.json();
    if (!historicalPriceRawData || historicalPriceRawData.length === 0)
      return null;

    historicalPriceRawData.reverse();
    const data: PriceSeriesData = historicalPriceRawData.map(
      (item: HistoricalPriceDataPoint) => ({
        date: item.date,
        price: item.adjClose,
      }),
    );
    return data;
  } catch (error) {
    console.error("Error fetching price series data for", symbol, error);
    return null;
  }
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
      <div className={styles.text}>
        <h2 id="stock-comparison" className={styles.h2}>
          Build and Explore Stock Comparisons
        </h2>
        <p className={styles.p}>
          Easily create custom charts to compare stock performance over time.
          For example, this one tracks a $10,000 investment in AAPL and NVDA—
          hover to see value and total return on any date.
        </p>
        <p className={styles.p}>
          Want to try it yourself? Just pick the tickers and see the full
          picture in seconds.
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
