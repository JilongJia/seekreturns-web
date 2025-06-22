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

export function DividendPayoutRatioCommentary({
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
        In the {industryName} industry, the Dividend Payout Ratio is often not a
        primary performance metric.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return (
      <P>
        Dividend Payout Ratio data for {stockSymbol} is currently unavailable.
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle specific numerical cases first
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Dividend Payout Ratio of{" "}
        {formattedMetricValue}. This typically means the company paid a dividend
        despite reporting a net loss, a situation that may signal financial
        instability.
      </P>
    );
  }

  if (metricValue === 0) {
    return (
      <P>
        {stockSymbol} has a Dividend Payout Ratio of 0%, indicating it does not
        currently pay a dividend. This is a common strategy for growth-oriented
        companies that reinvest all profits back into the business.
      </P>
    );
  }

  if (metricValue > 1) {
    return (
      <P>
        {stockSymbol}’s Dividend Payout Ratio of {formattedMetricValue} is above
        100%. This means the company is paying out more in dividends than it
        earned, a practice that is often unsustainable and could indicate a risk
        to future dividend stability.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Dividend Payout Ratio of {formattedMetricValue}, but
        industry benchmark data for the {industryName} sector is unavailable for
        comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        At {formattedMetricValue}, {stockSymbol}’s Dividend Payout Ratio is
        exceptionally high, exceeding the typical range for the {industryName}{" "}
        industry. While this provides a significant return to shareholders, it
        may limit funds for reinvestment and could be difficult to sustain.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        At {formattedMetricValue}, {stockSymbol}’s Dividend Payout Ratio is
        below the typical range for the {industryName} industry. This
        conservative approach prioritizes retaining earnings, likely to fund
        internal growth and strengthen the company’s financial position.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Dividend Payout Ratio of {formattedMetricValue} is in
        the upper quartile for the {industryName} industry. This indicates a
        strong commitment to shareholder returns but also suggests that a
        smaller portion of earnings is retained for reinvestment compared to
        many peers.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Dividend Payout Ratio of {formattedMetricValue} is in
        the lower quartile for the {industryName} industry. This suggests a
        conservative dividend policy, with a strategic focus on reinvesting
        profits for future growth.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
    return (
      <P>
        {stockSymbol}’s Dividend Payout Ratio of {formattedMetricValue} is
        within the typical range for the {industryName} industry, suggesting a
        balanced approach between shareholder payouts and company reinvestment.
      </P>
    );
  }
}
