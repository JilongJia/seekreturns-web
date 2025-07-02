import { getMetricName } from "@/app/lib/stock-analysis/getMetricName";

import { H3 } from "@/components/zh/ui/H3";
import { GrowthComparisonChart } from "./GrowthComparisonChart";

import styles from "./GrowthComparisonContainer.module.css";
import type { FinancialGrowthData } from "@/app/lib/fmp/fetchFinancialGrowthData";

type GrowthComparisonContainerProps = {
  metricCode: "revenueGrowth" | "epsgrowth" | "freeCashFlowGrowth";
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneGrowthData: FinancialGrowthData;
  stockTwoGrowthData: FinancialGrowthData;
};

export function GrowthComparisonContainer({
  metricCode,
  stockOneSymbol,
  stockTwoSymbol,
  stockOneGrowthData,
  stockTwoGrowthData,
}: GrowthComparisonContainerProps) {
  const metricLongName = getMetricName({
    metricCode: metricCode,
    nameType: "longNameZH",
  });

  return (
    <>
      <H3>{metricLongName}</H3>
      <figure className={styles.figure}>
        <GrowthComparisonChart
          stockOne={{
            symbol: stockOneSymbol,
            growthSeries: stockOneGrowthData,
          }}
          stockTwo={{
            symbol: stockTwoSymbol,
            growthSeries: stockTwoGrowthData,
          }}
          metricCode={metricCode}
        />
        <figcaption className={styles.figcaption}>
          {stockOneSymbol} 与 {stockTwoSymbol}
          ：年度{metricLongName}对比。
        </figcaption>
      </figure>
    </>
  );
}
