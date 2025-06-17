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
        {stockOneSymbol} vs. {stockTwoSymbol}: A comparison of their{" "}
        {metricName} against the {stockOneIndustryName} industry benchmark.
      </figcaption>
    );
  }

  return (
    <figcaption className={styles.figcaption}>
      {stockOneSymbol} vs. {stockTwoSymbol}: A comparison of their {metricName}{" "}
      against their respective {stockOneIndustryName} and {stockTwoIndustryName}{" "}
      industry benchmarks.
    </figcaption>
  );
}
