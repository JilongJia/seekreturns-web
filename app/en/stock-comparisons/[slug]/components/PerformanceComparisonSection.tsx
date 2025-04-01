import { H2 } from "@/app/components/en/content/page/main/article/H2";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { Chart } from "./performance_comparison_section/Chart";

export type PerformanceComparisonData = {
  stockOne: {
    symbol: string;
    priceSeries: { date: string; price: number }[];
  };
  stockTwo: {
    symbol: string;
    priceSeries: { date: string; price: number }[];
  };
};

type PerformanceComparisonSectionProps = {
  performanceComparisonData: PerformanceComparisonData | null;
};

export function PerformanceComparisonSection({
  performanceComparisonData,
}: PerformanceComparisonSectionProps) {
  if (!performanceComparisonData) {
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
        This chart compares the performance of{" "}
        {performanceComparisonData.stockOne.symbol} and{" "}
        {performanceComparisonData.stockTwo.symbol} over the past year by
        tracking the growth of an initial $10,000 investment in each (starting
        one year ago).
      </P>
      <P>
        Hover over the lines to see the investment’s value and total return (%)
        at specific dates.
      </P>
      <P>Data is adjusted for dividends and splits.</P>
      <Chart data={performanceComparisonData} />
    </Section>
  );
}
