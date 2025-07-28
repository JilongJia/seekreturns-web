import styles from "./GrowthComparisonBarChartFigcaption.module.css";

type GrowthComparisonBarChartFigcaptionProps = {
  metricName: string;
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export function GrowthComparisonBarChartFigcaption({
  metricName,
  stockOneSymbol,
  stockTwoSymbol,
}: GrowthComparisonBarChartFigcaptionProps) {
  return (
    <figcaption className={styles.figcaption}>
      {stockOneSymbol}与{stockTwoSymbol}的{metricName}
      对比，涵盖最新季度（同比）、TTM（同比）、3年及5年复合年增长率。
    </figcaption>
  );
}
