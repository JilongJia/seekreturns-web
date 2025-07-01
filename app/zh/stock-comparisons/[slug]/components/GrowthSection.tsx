import { H2 } from "@/components/zh/ui/H2";
import { H3 } from "@/components/zh/ui/H3";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { FinancialGrowthChart } from "@/app/components/zh/content/page/main/stock-comparison/growth-comparison-container/GrowthComparisonChart";

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

      <H3>营收同比增长率</H3>
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
          {stockOneSymbol} 与 {stockTwoSymbol}
          ：年度营收同比增长率对比。
        </figcaption>
      </figure>

      <H3>每股收益同比增长率</H3>
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
          {stockOneSymbol} 与 {stockTwoSymbol}
          ：年度每股收益 (EPS) 同比增长率对比。
        </figcaption>
      </figure>

      <H3>自由现金流同比增长率</H3>
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
          {stockOneSymbol} 与 {stockTwoSymbol}
          ：年度自由现金流同比增长率对比。
        </figcaption>
      </figure>
    </Section>
  );
}
