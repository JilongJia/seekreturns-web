import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Chart } from "./performance_comparison_section/Chart";

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

type PerformanceComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

async function fetchPriceSeriesData(
  symbol: string,
  fromDate: string,
): Promise<PriceSeriesData | null> {
  const apiKey = process.env.FINANCIAL_MODELING_PREP_API_KEY!;
  const baseEndpoint =
    "https://financialmodelingprep.com/stable/historical-price-eod/dividend-adjusted";

  const maxRetryAttempts = 3;
  const retryDelayMs = 1000;
  const sixMonthThresholdMs = 6 * 30 * 24 * 60 * 60 * 1000;

  const url = `${baseEndpoint}?symbol=${symbol}&from=${fromDate}&apikey=${apiKey}`;

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
      const requestedFromDateMs = new Date(fromDate).getTime();

      if (
        Math.abs(earliestReturnedDateMs - requestedFromDateMs) >
        sixMonthThresholdMs
      ) {
        console.warn(
          `Attempt ${attemptNumber}: earliest returned date (${earliestReturnedDateString}) is too far from requested from-date (${fromDate})`,
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

export async function PerformanceComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: PerformanceComparisonSectionProps) {
  const now = new Date();
  const oneYearInMs = 360 * 24 * 60 * 60 * 1000;
  const fromDateObj = new Date(now.getTime() - oneYearInMs);
  const fromDate = fromDateObj.toISOString().split("T")[0];

  const stockOnePriceSeriesData = await fetchPriceSeriesData(
    stockOneSymbol,
    fromDate,
  );
  const stockTwoPriceSeriesData = await fetchPriceSeriesData(
    stockTwoSymbol,
    fromDate,
  );

  if (!stockOnePriceSeriesData || !stockTwoPriceSeriesData) {
    return (
      <Section ariaLabelledby="performance-comparison">
        <H2 id="performance-comparison">Performance Comparison</H2>
        <P>Performance data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="performance-comparison">
      <H2 id="performance-comparison">Performance Comparison</H2>
      <P>
        This chart compares the performance of {stockOneSymbol} and{" "}
        {stockTwoSymbol} over the past year by tracking the growth of an initial
        $10,000 investment in each (starting one year ago).
      </P>
      <P>
        Hover over the lines to see the investment’s value and total return (%)
        at specific dates.
      </P>
      <P>Data is adjusted for dividends and splits.</P>
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
    </Section>
  );
}
