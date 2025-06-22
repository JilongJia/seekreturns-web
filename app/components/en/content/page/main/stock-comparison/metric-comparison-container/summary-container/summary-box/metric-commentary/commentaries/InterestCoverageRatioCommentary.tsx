import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { formatMetricValue } from "./formatMetricValue";
import { P } from "./P";

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricCommentaryProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
};

export function InterestCoverageRatioCommentary({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  metricCode,
}: MetricCommentaryProps) {
  // 1. Check if the metric is applicable to the industry
  if (!isMetricApplicable) {
    return (
      <P>
        The Interest Coverage Ratio is often not a primary indicator of debt
        servicing capacity in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return (
      <P>
        Interest Coverage Ratio data for {stockSymbol} is currently unavailable.
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle specific numerical cases first
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Interest Coverage Ratio of{" "}
        {formattedMetricValue}. This indicates that its earnings were
        insufficient to cover even its operational costs, let alone its interest
        payments, signaling significant financial distress.
      </P>
    );
  }

  if (metricValue < 1) {
    return (
      <P>
        {stockSymbol}’s Interest Coverage Ratio of {formattedMetricValue} is a
        critical concern. A value below 1.0 means operating earnings are
        insufficient to cover interest expenses, indicating severe financial
        strain and high default risk.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has an Interest Coverage Ratio of {formattedMetricValue},
        but industry benchmarks for the {industryName} sector are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        With an Interest Coverage Ratio of {formattedMetricValue}, {stockSymbol}{" "}
        demonstrates a superior capacity to service its debt, placing it well
        above the typical range for the {industryName} industry. This stems from
        either robust earnings or a conservative debt load.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Interest Coverage Ratio of {formattedMetricValue} is
        below the typical range for the {industryName} industry. This suggests a
        weaker ability to meet debt obligations compared to its peers and may
        indicate a higher level of financial risk.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Interest Coverage Ratio of {formattedMetricValue} is in
        the upper quartile for the {industryName} industry, signifying a strong
        and healthy capacity to meet its interest payments from operating
        profits.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        In the lower quartile for the {industryName} industry, {stockSymbol}’s
        Interest Coverage Ratio of {formattedMetricValue} indicates a tighter
        cushion for servicing debt, suggesting less financial flexibility than
        many of its competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Interest Coverage Ratio of {formattedMetricValue} is
        positioned comfortably within the norm for the {industryName} industry,
        indicating a standard and healthy capacity to cover its interest
        payments.
      </P>
    );
  }
}
