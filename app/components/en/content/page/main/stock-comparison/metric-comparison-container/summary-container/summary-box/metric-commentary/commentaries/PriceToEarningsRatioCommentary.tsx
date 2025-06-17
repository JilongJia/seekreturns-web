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

export function PriceToEarningsRatioCommentary({
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
        The P/E Ratio is not typically the primary metric used to value
        companies in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if the stock's P/E data is available
  if (metricValue === null) {
    return <P>P/E Ratio data for {stockSymbol} is currently unavailable.</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle the special case: Negative P/E
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative P/E Ratio of {formattedMetricValue},
        indicating it has a net loss. A negative P/E is not a reliable indicator
        for valuation comparisons.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a P/E Ratio of {formattedMetricValue}, but a direct
        industry comparison is not possible as benchmarks for the {industryName}{" "}
        industry are unavailable.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is exceptionally
        high, placing it well outside the typical range for the {industryName}{" "}
        industry. This can signal strong market confidence and high growth
        expectations, or it could suggest potential overvaluation.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is below the typical
        range for the {industryName} industry. This could indicate potential
        undervaluation, or it may reflect market concerns about the company’s
        future earnings growth or specific business challenges.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry. This indicates investors are
        assigning it a premium valuation compared to its peers, likely due to
        strong confidence in its growth trajectory or competitive advantages.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This reflects a more
        conservative valuation than many of its peers, which could suggest an
        investment opportunity or be a reflection of a less certain growth
        outlook.
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is comparable to the
        norm for the {industryName} industry, suggesting its valuation is
        neither at a significant premium nor a discount to its peers.
      </P>
    );
  }
}
