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

export function NetProfitMarginCommentary({
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
        In the {industryName} industry, Net Profit Margin is often not the
        primary profitability metric.
      </P>
    );
  }

  // 2. Check if the stock's Net Profit Margin data is available
  if (metricValue === null) {
    return (
      <P>Net Profit Margin data for {stockSymbol} is currently unavailable.</P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle the special case: Negative Net Profit Margin
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Net Profit Margin of {formattedMetricValue}
        , indicating the company is operating at a net loss as its expenses
        exceeded its revenues.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Net Profit Margin of {formattedMetricValue}, but
        industry benchmarks for the {industryName} sector are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Net Profit Margin of {formattedMetricValue} is
        exceptionally high, placing it well beyond the typical range for the{" "}
        {industryName} industry. This demonstrates outstanding operational
        efficiency and a strong competitive advantage in converting revenue into
        profit.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Net Profit Margin of {formattedMetricValue} is below the
        typical range for the {industryName} industry. This suggests the company
        may be facing challenges with cost control or operating in a highly
        competitive environment that limits its pricing power.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        A Net Profit Margin of {formattedMetricValue} places {stockSymbol} in
        the upper quartile for the {industryName} industry, signifying strong
        profitability and more effective cost management than most of its peers.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        Falling into the lower quartile for the {industryName} industry,{" "}
        {stockSymbol}’s Net Profit Margin of {formattedMetricValue} indicates
        weaker profitability. This means the company retains a smaller portion
        of each dollar in sales as profit compared to its competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Net Profit Margin of {formattedMetricValue} is aligned
        with the median group of its peers in the {industryName} industry. This
        indicates its ability to convert revenue into profit is typical for the
        sector.
      </P>
    );
  }
}
