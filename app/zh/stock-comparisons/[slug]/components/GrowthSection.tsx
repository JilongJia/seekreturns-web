import { H2 } from "@/components/zh/ui/H2";
import { P } from "@/components/zh/ui/P";
import { Section } from "@/components/zh/ui/Section";

import type { FinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData";
import { GrowthComparisonContainer } from "@/app/components/zh/content/page/main/stock-comparison/growth-comparison-container/GrowthComparisonContainer";

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
        <H2 id="growth">成长性</H2>
        <P>成长性数据当前不可用，无法进行比较。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="growth">
      <H2 id="growth">成长性</H2>
      <P>
        以下图表比较了 {stockOneSymbol} 和 {stockTwoSymbol} 的关键同比增长 (YoY)
        指标。这些指标基于公司的年度财务报告。
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
