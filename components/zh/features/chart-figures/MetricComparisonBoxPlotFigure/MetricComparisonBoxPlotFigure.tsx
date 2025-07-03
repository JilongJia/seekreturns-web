import { MetricComparisonBoxPlot } from "./MetricComparisonBoxPlot";
import { MetricComparisonBoxPlotFigcaption } from "./MetricComparisonBoxPlotFigcaption";

import styles from "./MetricComparisonBoxPlotFigure.module.css";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";
import type { MetricCode } from "@/app/data/fmp/metricCodes";
import type { MetricStats } from "@/app/lib/stock-analysis/calculateMetricStats";
import type { MetricColor } from "@/app/lib/stock-analysis/calculateMetricColor";

type MetricComparisonBoxPlotFigureProps = {
  metricCode: MetricCode;
  metricName: string;
  stockOneSymbol: string;
  stockOneIndustryName: IndustryCode;
  stockOneMetricValue: number | null;
  stockOneMetricColor: MetricColor;
  stockOneIndustryMetricStats: MetricStats | null;
  isStockOneMetricApplicable: boolean;
  stockTwoSymbol: string;
  stockTwoIndustryName: IndustryCode;
  stockTwoMetricValue: number | null;
  stockTwoMetricColor: MetricColor;
  stockTwoIndustryMetricStats: MetricStats | null;
  isStockTwoMetricApplicable: boolean;
};

export function MetricComparisonBoxPlotFigure({
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
}: MetricComparisonBoxPlotFigureProps) {
  return (
    <figure className={styles.figure}>
      <MetricComparisonBoxPlot
        metricCode={metricCode}
        metricName={metricName}
        stockOneSymbol={stockOneSymbol}
        stockOneIndustryName={stockOneIndustryName}
        stockOneMetricValue={stockOneMetricValue}
        stockOneMetricColor={stockOneMetricColor}
        stockOneIndustryMetricStats={stockOneIndustryMetricStats}
        isStockOneMetricApplicable={isStockOneMetricApplicable}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoIndustryName={stockTwoIndustryName}
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
