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
        The P/B Ratio isn’t typically a primary valuation metric for companies
        in the {industryName} industry.
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
        indicating negative shareholder equity where liabilities exceed assets.
        This is a critical red flag for financial instability.
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
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is exceptionally
        high, placing it well beyond the typical valuation range for the{" "}
        {industryName} industry. This suggests that investors are willing to pay
        a significant premium over its book value, likely due to high
        expectations for future growth and profitability.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is below the typical
        range for the {industryName} industry. This could indicate that the
        stock is potentially undervalued relative to its assets, or it may
        reflect market concerns about the company’s future profitability or the
        quality of its asset base.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry, indicating investors assign a
        premium valuation to its asset base compared to most of its peers.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This suggests the market has a
        more cautious valuation of its asset base, which could be an opportunity
        for value investors or a sign of underlying issues.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
    return (
      <P>
        {stockSymbol}’s P/B Ratio of {formattedMetricValue} reflects the
        benchmark for the {industryName} industry, indicating that its market
        valuation relative to its book value is standard for the sector.
      </P>
    );
  }
}
