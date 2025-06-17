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

export function ReturnOnInvestedCapitalCommentary({
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
        Return on Invested Capital is not a primary measure of capital
        efficiency for companies in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if the stock's ROIC data is available
  if (metricValue === null) {
    return (
      <P>
        Return on Invested Capital data for {stockSymbol} is currently
        unavailable.
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle the special case: Negative ROIC
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Return on Invested Capital of{" "}
        {formattedMetricValue}. This indicates that its operations are failing
        to generate a profit on the total capital invested, signaling
        significant inefficiency or value destruction.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Return on Invested Capital of {formattedMetricValue}
        , but industry benchmarks for the {industryName} sector are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Return on Invested Capital of {formattedMetricValue} is
        exceptionally high, placing it well beyond the typical range for the{" "}
        {industryName} industry. This demonstrates an outstanding ability to
        deploy capital efficiently and create significant value.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Return on Invested Capital of {formattedMetricValue} is
        below the typical range for the {industryName} industry. This suggests
        challenges in generating adequate returns from the company’s total
        capital base, pointing to potential operational or strategic
        inefficiencies.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Return on Invested Capital of {formattedMetricValue} is
        in the upper quartile for the {industryName} industry, signifying a
        highly effective use of its capital to generate profits when compared to
        its peers.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Return on Invested Capital of {formattedMetricValue} is
        in the lower quartile for the {industryName} industry. This indicates a
        less efficient conversion of invested capital into profit compared to
        most of its competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Return on Invested Capital of {formattedMetricValue} is
        in line with the benchmark for the {industryName} industry, reflecting a
        standard level of efficiency in generating profits from its capital
        base.
      </P>
    );
  }
}
