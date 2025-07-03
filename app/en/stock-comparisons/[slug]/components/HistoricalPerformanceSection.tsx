import { H2 } from "@/components/en/ui/H2";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { PriceComparisonLineChartFigure } from "@/components/en/features/chart-figures";

type PriceSeries = Array<{ date: string; price: number }>;

type HistoricalPerformanceSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOnePriceSeries: PriceSeries | null;
  stockTwoPriceSeries: PriceSeries | null;
};

export function HistoricalPerformanceSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOnePriceSeries,
  stockTwoPriceSeries,
}: HistoricalPerformanceSectionProps) {
  if (
    !stockOnePriceSeries ||
    stockOnePriceSeries.length === 0 ||
    !stockTwoPriceSeries ||
    stockTwoPriceSeries.length === 0
  ) {
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
      <PriceComparisonLineChartFigure
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
