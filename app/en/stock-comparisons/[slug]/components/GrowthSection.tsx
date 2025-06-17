import { fetchFinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData"; // Assumed path

import { H3 } from "@/app/components/en/content/page/main/article/H3";
import { P } from "@/app/components/en/content/page/main/article/P";
import { Section } from "@/app/components/en/content/page/main/article/Section";
import { FinancialGrowthChart } from "@/app/components/en/content/page/main/stock-comparison/growth-comparison-container/GrowthComparisonChart";
import { H2 } from "@/app/components/en/content/page/main/article/H2";
// Assuming you have a CSS module for custom styles like the figcaption
import styles from "./GrowthSection.module.css";

type GrowthSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function GrowthSection({
  stockOneSymbol,
  stockTwoSymbol,
}: GrowthSectionProps) {
  // Fetch financial growth data for both stocks in parallel
  const [stockOneGrowthData, stockTwoGrowthData] = await Promise.all([
    fetchFinancialGrowthData(stockOneSymbol),
    fetchFinancialGrowthData(stockTwoSymbol),
  ]);

  // Handle cases where data might be unavailable for either stock
  if (!stockOneGrowthData || !stockTwoGrowthData) {
    return (
      <Section ariaLabelledby="growth">
        <h2 id="growth">Growth</h2>
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

      <H3>Revenue Growth (YoY)</H3>
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

      <H3>EPS Growth (YoY)</H3>
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

      <H3>Free Cash Flow Growth (YoY)</H3>
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
