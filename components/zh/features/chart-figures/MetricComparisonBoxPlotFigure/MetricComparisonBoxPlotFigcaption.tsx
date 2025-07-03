import styles from "./MetricComparisonBoxPlotFigcaption.module.css";

type MetricComparisonBoxPlotFigcaptionProps = {
  metricName: string;
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOneIndustryName: string;
  stockTwoIndustryName: string;
};

export function MetricComparisonBoxPlotFigcaption({
  metricName,
  stockOneSymbol,
  stockTwoSymbol,
  stockOneIndustryName,
  stockTwoIndustryName,
}: MetricComparisonBoxPlotFigcaptionProps) {
  if (stockOneIndustryName === stockTwoIndustryName) {
    return (
      <figcaption className={styles.figcaption}>
        {stockOneSymbol} 与 {stockTwoSymbol}：{metricName}
        指标与 {stockOneIndustryName} 行业基准的对比。
      </figcaption>
    );
  }

  return (
    <figcaption className={styles.figcaption}>
      {stockOneSymbol} 与 {stockTwoSymbol}：{metricName}
      指标分别与其所属的 {stockOneIndustryName} 及 {stockTwoIndustryName}{" "}
      行业基准的对比。
    </figcaption>
  );
}
