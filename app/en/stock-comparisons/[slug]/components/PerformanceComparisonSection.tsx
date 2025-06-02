import { fetchPriceSeriesData } from "@/app/lib/fmp/fetchPriceSeriesData";

import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Chart } from "./performance_comparison_section/Chart";

type PerformanceComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function PerformanceComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: PerformanceComparisonSectionProps) {
  const [seriesOne, seriesTwo] = await Promise.all([
    fetchPriceSeriesData(stockOneSymbol),
    fetchPriceSeriesData(stockTwoSymbol),
  ]);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const stockOnePriceSeries =
    seriesOne?.filter((pt) => new Date(pt.date) >= oneYearAgo) ?? null;
  const stockTwoPriceSeries =
    seriesTwo?.filter((pt) => new Date(pt.date) >= oneYearAgo) ?? null;

  if (!stockOnePriceSeries || !stockTwoPriceSeries) {
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
      />
    </Section>
  );
}
