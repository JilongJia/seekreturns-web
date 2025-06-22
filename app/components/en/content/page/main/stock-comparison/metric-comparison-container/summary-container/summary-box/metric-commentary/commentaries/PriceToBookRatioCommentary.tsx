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

export function PriceToBookRatioCommentary({
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
        The P/B Ratio is often not a primary valuation metric for the{" "}
        {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return <P>P/B Ratio data for {stockSymbol} is currently unavailable.</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle specific case: Negative Book Value
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative P/B Ratio of {formattedMetricValue},
        indicating its liabilities exceed its assets and result in negative
        shareholder equity. This is a critical warning sign of financial
        distress.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a P/B Ratio of {formattedMetricValue}, but industry
        benchmarks for the {industryName} industry are currently unavailable for
        comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        At {formattedMetricValue}, {stockSymbol}’s P/B Ratio is at an extreme
        premium to the {industryName} industry. This signifies that the market’s
        valuation is heavily reliant on future potential rather than its current
        net asset value, which can be a high-risk proposition.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is below the
        established floor for the {industryName} industry. This may signal that
        the market is deeply pessimistic or has overlooked the company,
        potentially offering its asset base at a significant discount.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is in the upper tier
        for the {industryName} industry. This indicates that investors are
        paying a premium relative to the company’s net assets, a valuation that
        hinges on its ability to generate superior profits.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. From a value investing
        perspective, this is favorable, as it suggests the stock is trading at a
        discount to its net asset value and may offer a greater margin of
        safety.
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is within the
        conventional range for the {industryName} industry. This shows a
        balanced market view, where the stock’s price is neither at a
        significant premium nor a discount to the book value of its peers.
      </P>
    );
  }
}
