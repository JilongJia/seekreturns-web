import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { SummaryBox } from "./summary-box/SummaryBox";

import styles from "./SummaryContainer.module.css";

type IndustryMetricStats = {
  max: number;
  q3: number;
  median: number;
  q1: number;
  min: number;
};

type SummaryContainerProps = {
  metricCode: MetricCode;
  metricName: string;
  stockOneSymbol: string;
  stockOneIndustryName: string;
  stockOneMetricValue: number | null;
  stockOneMetricColor: "green" | "yellow" | "red" | "neutral";
  stockOneIndustryMetricStats: IndustryMetricStats | null;
  isStockOneMetricApplicable: boolean;
  stockTwoSymbol: string;
  stockTwoIndustryName: string;
  stockTwoMetricValue: number | null;
  stockTwoMetricColor: "green" | "yellow" | "red" | "neutral";
  stockTwoIndustryMetricStats: IndustryMetricStats | null;
  isStockTwoMetricApplicable: boolean;
};

export function SummaryContainer({
  metricCode,
  metricName,
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
        metricCode={metricCode}
        stockSymbol={stockOneSymbol}
        metricName={metricName}
        metricValue={stockOneMetricValue}
        metricColor={stockOneMetricColor}
        industryName={stockOneIndustryName}
        industryMetricStats={stockOneIndustryMetricStats}
        isMetricApplicable={isStockOneMetricApplicable}
        className={styles.summaryBox}
      />

      <div className={styles.divider}></div>

      <SummaryBox
        metricCode={metricCode}
        stockSymbol={stockTwoSymbol}
        metricName={metricName}
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
