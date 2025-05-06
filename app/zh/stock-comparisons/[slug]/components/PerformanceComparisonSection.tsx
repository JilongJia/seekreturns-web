import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
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
        <H2 id="performance-comparison">历史表现比较</H2>
        <P>暂时无法加载历史表现数据。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="performance-comparison">
      <H2 id="performance-comparison">历史表现比较</H2>
      <P>
        下图展示了 {stockOneSymbol} 和 {stockTwoSymbol}{" "}
        过去一年的历史表现，假设初始投资均为 1 万美元，以比较其投资回报表现。
      </P>
      <P>将鼠标悬停在图表曲线上，可查看某日的投资价值和总回报率（%）。</P>
      <P>数据已根据股息和股票拆分进行调整。</P>
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
