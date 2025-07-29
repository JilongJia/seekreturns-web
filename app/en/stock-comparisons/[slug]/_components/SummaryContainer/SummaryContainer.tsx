import { SummaryBox } from "./summary-box/SummaryBox";
import styles from "./SummaryContainer.module.css";

import type { MetricStats } from "@/lib/stock";
import type { ComparableMetricKey } from "@/constants/stock";

type SummaryContainerProps = {
  metricKey: ComparableMetricKey;
  stockOneSymbol: string;
  stockOneIndustryName: string;
  stockOneMetricValue: number | null;
  stockOneMetricColor: "green" | "yellow" | "red" | "neutral";
  stockOneIndustryMetricStats: MetricStats | null;
  isStockOneMetricApplicable: boolean;
  stockTwoSymbol: string;
  stockTwoIndustryName: string;
  stockTwoMetricValue: number | null;
  stockTwoMetricColor: "green" | "yellow" | "red" | "neutral";
  stockTwoIndustryMetricStats: MetricStats | null;
  isStockTwoMetricApplicable: boolean;
};

export function SummaryContainer({
  metricKey,
  stockOneSymbol,
  stockOneIndustryName,
  stockOneMetricValue,
  stockOneMetricColor,
  stockOneIndustryMetricStats,
  isStockOneMetricApplicable,
  stockTwoSymbol,
  stockTwoIndustryName,
  stockTwoMetricValue,
  stockTwoMetricColor,
  stockTwoIndustryMetricStats,
  isStockTwoMetricApplicable,
}: SummaryContainerProps): JSX.Element {
  return (
    <div className={styles.container}>
      <SummaryBox
        metricKey={metricKey}
        stockSymbol={stockOneSymbol}
        metricValue={stockOneMetricValue}
        metricColor={stockOneMetricColor}
        industryName={stockOneIndustryName}
        industryMetricStats={stockOneIndustryMetricStats}
        isMetricApplicable={isStockOneMetricApplicable}
        className={styles.summaryBox}
      />

      <div className={styles.divider}></div>

      <SummaryBox
        metricKey={metricKey}
        stockSymbol={stockTwoSymbol}
        metricValue={stockTwoMetricValue}
        metricColor={stockTwoMetricColor}
        industryName={stockTwoIndustryName}
        industryMetricStats={stockTwoIndustryMetricStats}
        isMetricApplicable={isStockTwoMetricApplicable}
        className={styles.summaryBox}
      />
    </div>
  );
}
