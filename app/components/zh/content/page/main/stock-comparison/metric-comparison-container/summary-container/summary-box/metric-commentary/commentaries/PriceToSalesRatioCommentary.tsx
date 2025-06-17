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

export function PriceToSalesRatioCommentary({
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
        The P/S Ratio isn’t typically a primary valuation metric for companies
        in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return <P>P/S Ratio data for {stockSymbol} is currently unavailable.</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a P/S Ratio of {formattedMetricValue}, but industry
        benchmarks for the {industryName} industry are currently unavailable for
        comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 4. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is exceptionally
        high, placing it well beyond the typical range for the {industryName}{" "}
        industry. This reflects a significant premium on its sales, likely
        driven by strong investor expectations for future growth and market
        share gains.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is below the typical
        range for the {industryName} industry. This could imply the stock is
        undervalued relative to its revenue stream, or it may reflect market
        concerns about future sales growth or profitability challenges.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry. This suggests investors are
        paying a premium for each dollar of the company’s sales compared to its
        peers, indicating optimism about its growth prospects.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This indicates a more
        conservative valuation on its revenues, which may signal an opportunity
        if sales growth accelerates or market skepticism about its future
        performance.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is valued in line
        with its peers in the {industryName} industry, suggesting the market’s
        valuation of its sales is typical for the sector.
      </P>
    );
  }
}
