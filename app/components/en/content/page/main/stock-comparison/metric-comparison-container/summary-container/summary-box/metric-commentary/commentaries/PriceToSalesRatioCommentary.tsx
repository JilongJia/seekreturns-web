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
        The P/S Ratio is not a primary valuation tool for most companies in the{" "}
        {industryName} industry.
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
        {stockSymbol} has a P/S Ratio of {formattedMetricValue}, but a direct
        comparison is not possible as benchmarks for the {industryName} industry
        are unavailable.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 4. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        With a P/S Ratio of {formattedMetricValue}, {stockSymbol} trades at a
        valuation that eclipses even the highest in the {industryName} industry.
        This implies the market has priced in exceptionally optimistic scenarios
        for future revenue growth, posing a considerable valuation risk.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} falls below the
        typical floor for the {industryName} industry. This could suggest the
        stock is overlooked or deeply undervalued relative to its sales, but may
        also reflect significant market concerns over its future.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is in the upper
        echelon for the {industryName} industry. This means the company is
        valued richly on its revenue stream compared to its peers, suggesting
        the stock is priced for a high level of future performance.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This indicates its revenue is
        valued more conservatively than most of its peers, which could present a
        compelling opportunity if the market has overlooked its sales-generating
        capabilities.
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol}’s P/S Ratio of {formattedMetricValue} aligns with the
        market consensus for the {industryName} industry. This suggests its
        valuation, based on sales, is seen as standard and is on par with its
        competitors.
      </P>
    );
  }
}
