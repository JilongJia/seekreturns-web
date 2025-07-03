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

export function CurrentRatioCommentary({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  metricCode,
}: MetricCommentaryProps) {
  // 1. Check if the metric is applicable
  if (!isMetricApplicable) {
    return (
      <P>
        For the {industryName} industry, the Current Ratio is often not the most
        suitable measure of short-term liquidity.
      </P>
    );
  }

  // 2. Check if the stock's data is available
  if (metricValue === null) {
    return (
      <P>Current Ratio data for {stockSymbol} is currently unavailable.</P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Current Ratio of {formattedMetricValue}, but
        industry benchmarks for the {industryName} sector are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 4. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Current Ratio of {formattedMetricValue} is exceptionally
        high, placing it well outside the typical range for the {industryName}{" "}
        industry. This indicates a very strong liquidity position, though such a
        high ratio may also suggest that the company is not using its assets
        efficiently to generate profits.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Current Ratio of {formattedMetricValue} is notably low,
        falling beneath the typical range for the {industryName} industry. This
        suggests a heightened liquidity risk and could indicate potential
        challenges in meeting its short-term obligations.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Current Ratio of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry. This signifies a strong
        liquidity position, suggesting the company is well-equipped to cover its
        immediate liabilities compared to its peers.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Current Ratio of {formattedMetricValue} falls into the
        lower quartile for the {industryName} industry. This indicates a tighter
        liquidity situation and a more constrained capacity to handle short-term
        debt than many of its competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Current Ratio of {formattedMetricValue} aligns with the
        median group of the {industryName} industry, indicating that its
        short-term liquidity is in line with its sector peers.
      </P>
    );
  }
}
