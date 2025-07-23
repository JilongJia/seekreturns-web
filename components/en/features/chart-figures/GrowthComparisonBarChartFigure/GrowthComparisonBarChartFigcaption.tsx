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
      {stockOneSymbol} vs. {stockTwoSymbol}: A side-by-side comparison of their{" "}
      {metricName} for the MRQ (YoY), TTM (YoY), 3-Year CAGR, and 5-Year CAGR
      periods.
    </figcaption>
  );
}
