import { H2 } from "@/components/en/ui/H2";
import { H3 } from "@/components/en/ui/H3";
import { P } from "@/components/en/ui/P";
import { Section } from "@/components/en/ui/Section";
import { FinancialGrowthChart } from "@/app/components/en/content/page/main/stock-comparison/growth-comparison-container/GrowthComparisonChart";

import styles from "./GrowthSection.module.css";
import type { FinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData";

type GrowthSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneGrowthData: FinancialGrowthData | null;
  stockTwoGrowthData: FinancialGrowthData | null;
};

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

      <H3>Revenue Growth</H3>
      <figure className={styles.figure}>
        <FinancialGrowthChart
          stockOne={{
            symbol: stockOneSymbol,
            growthSeries: stockOneGrowthData,
          }}
          stockTwo={{
            symbol: stockTwoSymbol,
            growthSeries: stockTwoGrowthData,
          }}
          metricCode="revenueGrowth"
        />
        <figcaption className={styles.figcaption}>
          {stockOneSymbol} vs. {stockTwoSymbol}: A comparison of their annual
          year-over-year Revenue Growth.
        </figcaption>
      </figure>

      <H3>EPS Growth</H3>
      <figure className={styles.figure}>
        <FinancialGrowthChart
          stockOne={{
            symbol: stockOneSymbol,
            growthSeries: stockOneGrowthData,
          }}
          stockTwo={{
            symbol: stockTwoSymbol,
            growthSeries: stockTwoGrowthData,
          }}
          metricCode="epsgrowth"
        />
        <figcaption className={styles.figcaption}>
          {stockOneSymbol} vs. {stockTwoSymbol}: A comparison of their annual
          year-over-year EPS (Earnings Per Share) Growth.
        </figcaption>
      </figure>

      <H3>Free Cash Flow Growth</H3>
      <figure className={styles.figure}>
        <FinancialGrowthChart
          stockOne={{
            symbol: stockOneSymbol,
            growthSeries: stockOneGrowthData,
          }}
          stockTwo={{
            symbol: stockTwoSymbol,
            growthSeries: stockTwoGrowthData,
          }}
          metricCode="freeCashFlowGrowth"
        />
        <figcaption className={styles.figcaption}>
          {stockOneSymbol} vs. {stockTwoSymbol}: A comparison of their annual
          year-over-year Free Cash Flow Growth.
        </figcaption>
      </figure>
    </Section>
  );
}
