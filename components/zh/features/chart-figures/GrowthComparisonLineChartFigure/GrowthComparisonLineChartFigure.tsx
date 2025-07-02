import { GrowthComparisonLineChart } from "./GrowthComparisonLineChart";

import styles from "./GrowthComparisonLineChartFigure.module.css";

type GrowthPoint = {
  time: string;
  value: number;
};

type GrowthComparisonLineChartFigureProps = {
  metricName: string;
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneGrowthSeries: GrowthPoint[];
  stockTwoGrowthSeries: GrowthPoint[];
};

export function GrowthComparisonLineChartFigure({
  metricName,
  stockOneSymbol,
  stockTwoSymbol,
  stockOneGrowthSeries,
  stockTwoGrowthSeries,
}: GrowthComparisonLineChartFigureProps) {
  return (
    <figure className={styles.figure}>
      <GrowthComparisonLineChart
        stockOneSymbol={stockOneSymbol}
        stockOneGrowthSeries={stockOneGrowthSeries}
        stockTwoSymbol={stockTwoSymbol}
        stockTwoGrowthSeries={stockTwoGrowthSeries}
      />
      <figcaption className={styles.figcaption}>
        {stockOneSymbol} 与 {stockTwoSymbol}
        ：年度{metricName}对比。
      </figcaption>
    </figure>
  );
}
