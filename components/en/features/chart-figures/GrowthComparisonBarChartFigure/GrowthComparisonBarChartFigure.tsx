import { GrowthComparisonBarChart } from "./GrowthComparisonBarChart";
import { GrowthComparisonBarChartFigcaption } from "./GrowthComparisonBarChartFigcaption";

import styles from "./GrowthComparisonBarChartFigure.module.css";
import type { GrowthData } from "./types";

type GrowthComparisonBarChartFigureProps = {
  metricName: string;
  stockOneSymbol: string;
  stockOneGrowth: GrowthData;
  stockTwoSymbol: string;
  stockTwoGrowth: GrowthData;
};

export function GrowthComparisonBarChartFigure({
  metricName,
  stockOneSymbol,
  stockOneGrowth,
  stockTwoSymbol,
  stockTwoGrowth,
}: GrowthComparisonBarChartFigureProps) {
  return (
    <figure className={styles.figure}>
      <GrowthComparisonBarChart
        stockOneSymbol={stockOneSymbol}
        stockOneGrowth={stockOneGrowth}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoGrowth={stockTwoGrowth}
      />
      <GrowthComparisonBarChartFigcaption
        metricName={metricName}
        stockOneSymbol={stockOneSymbol}
        stockTwoSymbol={stockTwoSymbol}
      />
    </figure>
  );
}
