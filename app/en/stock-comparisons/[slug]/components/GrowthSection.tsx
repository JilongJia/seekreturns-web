import { H2 } from "@/components/en/ui/H2";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";

import type { FinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData";
import { GrowthComparisonContainer } from "@/app/components/en/content/page/main/stock-comparison/growth-comparison-container/GrowthComparisonContainer";

type GrowthSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneGrowthData: FinancialGrowthData | null;
  stockTwoGrowthData: FinancialGrowthData | null;
};

const growthMetrics = [
  "revenueGrowth",
  "epsgrowth",
  "freeCashFlowGrowth",
] as const;

export function GrowthSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOneGrowthData,
  stockTwoGrowthData,
}: GrowthSectionProps) {
  if (!stockOneGrowthData || !stockTwoGrowthData) {
    return (
      <Section ariaLabelledby="growth">
        <H2 id="growth">Growth</H2>
        <P>Financial growth data is currently unavailable for comparison.</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="growth">
      <H2 id="growth">Growth</H2>
      <P>
        The following charts compare key year-over-year (YoY) growth metrics for{" "}
        {stockOneSymbol} and {stockTwoSymbol}. These metrics are based on the
        companies’ annual financial reports.
      </P>

      {growthMetrics.map((metric) => (
        <GrowthComparisonContainer
          key={metric}
          metricCode={metric}
          stockOneSymbol={stockOneSymbol}
          stockTwoSymbol={stockTwoSymbol}
          stockOneGrowthData={stockOneGrowthData}
          stockTwoGrowthData={stockTwoGrowthData}
        />
      ))}
    </Section>
  );
}
