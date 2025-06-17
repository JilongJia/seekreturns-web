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

export function ForwardPriceToEarningsGrowthRatioCommentary({
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
        The Forward PEG Ratio is not typically a primary valuation metric for
        companies in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if the stock's Forward PEG data is available
  if (metricValue === null) {
    return (
      <P>Forward PEG Ratio data for {stockSymbol} is currently unavailable.</P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle the special case: Negative Forward PEG
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Forward PEG Ratio of {formattedMetricValue}
        . This typically results from either negative earnings (a current loss)
        or forecasts of declining future earnings, making the ratio not
        meaningful for valuation purposes.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Forward PEG Ratio of {formattedMetricValue}, but
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
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is well
        above the typical range for the {industryName} industry. This suggests
        its stock price is high relative to its expected earnings growth, which
        could indicate overvaluation or reflect very high market expectations
        for its future.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is below the
        typical range for the {industryName} industry. This can suggest that the
        stock is potentially undervalued, offering its future growth at a lower
        price compared to its peers.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is in the
        upper quartile for the {industryName} industry, indicating that
        investors are paying a premium for its expected growth compared to many
        of its competitors.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is in the
        lower quartile for the {industryName} industry. This suggests its future
        growth may be undervalued by the market, as its stock price is more
        modest relative to its growth forecast than its peers.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is typical
        for the {industryName} industry, suggesting its valuation is reasonably
        aligned with its growth prospects, consistent with sector norms.
      </P>
    );
  }
}
