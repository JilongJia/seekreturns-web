import { MetricComparisonBoxPlot } from "./MetricComparisonBoxPlot";
import { MetricComparisonBoxPlotFigcaption } from "./MetricComparisonBoxPlotFigcaption";
import styles from "./MetricComparisonBoxPlotFigure.module.css";

import type { MetricStats, MetricColor } from "@/lib/stock-properties";
import type { ComparableMetricKey } from "@/constants/stock-properties";

type MetricComparisonBoxPlotFigureProps = {
  metricKey: ComparableMetricKey;
  metricName: string;
  stockOneSymbol: string;
  stockOneIndustryName: string;
  stockOneMetricValue: number | null;
  stockOneMetricColor: MetricColor;
  stockOneIndustryMetricStats: MetricStats | null;
  isStockOneMetricApplicable: boolean;
  stockTwoSymbol: string;
  stockTwoIndustryName: string;
  stockTwoMetricValue: number | null;
  stockTwoMetricColor: MetricColor;
  stockTwoIndustryMetricStats: MetricStats | null;
  isStockTwoMetricApplicable: boolean;
};

export function MetricComparisonBoxPlotFigure({
  metricKey,
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
}: MetricComparisonBoxPlotFigureProps) {
  return (
    <figure className={styles.figure}>
      <MetricComparisonBoxPlot
        metricKey={metricKey}
        stockOneSymbol={stockOneSymbol}
        stockOneMetricValue={stockOneMetricValue}
        stockOneMetricColor={stockOneMetricColor}
        stockOneIndustryMetricStats={stockOneIndustryMetricStats}
        isStockOneMetricApplicable={isStockOneMetricApplicable}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoMetricValue={stockTwoMetricValue}
        stockTwoMetricColor={stockTwoMetricColor}
        stockTwoIndustryMetricStats={stockTwoIndustryMetricStats}
        isStockTwoMetricApplicable={isStockTwoMetricApplicable}
      />

      <MetricComparisonBoxPlotFigcaption
        metricName={metricName}
        stockOneSymbol={stockOneSymbol}
        stockTwoSymbol={stockTwoSymbol}
        stockOneIndustryName={stockOneIndustryName}
        stockTwoIndustryName={stockTwoIndustryName}
      />
    </figure>
  );
}
