import { fetchPriceSeriesData } from "@/app/lib/fmp/fetchPriceSeriesData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Chart } from "./historical-performance-section/Chart";

type HistoricalPerformanceSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function HistoricalPerformanceSection({
  stockOneSymbol,
  stockTwoSymbol,
}: HistoricalPerformanceSectionProps) {
  const [seriesOne, seriesTwo] = await Promise.all([
    fetchPriceSeriesData(stockOneSymbol),
    fetchPriceSeriesData(stockTwoSymbol),
  ]);

  const stockOnePriceSeries =
    seriesOne && seriesOne.length > 0 ? seriesOne : null;
  const stockTwoPriceSeries =
    seriesTwo && seriesTwo.length > 0 ? seriesTwo : null;

  if (!stockOnePriceSeries || !stockTwoPriceSeries) {
    return (
      <Section ariaLabelledby="historical-performance">
        <H2 id="historical-performance">Historical Performance</H2>
        <P>Performance data is currently unavailable.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="historical-performance">
      <H2 id="historical-performance">Historical Performance</H2>
      <P>
        This chart compares the performance of {stockOneSymbol} and{" "}
        {stockTwoSymbol} by tracking the growth of an initial $10,000 investment
        in each. Use the tabs to select the desired time period.
      </P>
      <P>Data is adjusted for dividends and splits.</P>
      <Chart
        data={{
          stockOne: {
            symbol: stockOneSymbol,
            priceSeries: stockOnePriceSeries,
          },
          stockTwo: {
            symbol: stockTwoSymbol,
            priceSeries: stockTwoPriceSeries,
          },
        }}
        defaultTimeRange="1Y"
      />
    </Section>
  );
}
