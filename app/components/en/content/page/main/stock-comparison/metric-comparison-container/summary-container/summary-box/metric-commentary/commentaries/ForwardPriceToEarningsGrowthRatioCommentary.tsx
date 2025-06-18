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
  // 1. Check if the metric is applicable
  if (!isMetricApplicable) {
    return (
      <P>
        The Forward PEG Ratio is not a primary valuation metric for companies in
        the {industryName} industry.
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

  // 3. Handle specific numerical cases
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Forward PEG Ratio of {formattedMetricValue}
        . This typically results from negative earnings or forecasts of
        declining future earnings, making the ratio not meaningful for
        valuation.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Forward PEG Ratio of {formattedMetricValue}, but
        industry benchmarks for the {industryName} sector are unavailable for
        comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is
        exceptionally high for the {industryName} industry. This indicates its
        stock price is very high relative to its expected earnings growth,
        signaling significant overvaluation risk.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is below the
        typical range for the {industryName} industry. This strongly suggests
        that the stock may be undervalued, as its price appears low given its
        future growth prospects.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is in the
        upper quartile for the {industryName} industry. This suggests the stock
        is expensive relative to its growth forecast compared to its peers,
        which may indicate overvaluation and warrant caution.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is in the
        lower quartile for the {industryName} industry. This is a positive
        indicator, suggesting that the stock may be undervalued as its price is
        attractive relative to its expected earnings growth.
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol}’s Forward PEG Ratio of {formattedMetricValue} is within
        the middle range for the {industryName} industry. This suggests a
        reasonable balance between the stock‘s price and its expected growth,
        aligning with the valuation norms of its peers.
      </P>
    );
  }
}
