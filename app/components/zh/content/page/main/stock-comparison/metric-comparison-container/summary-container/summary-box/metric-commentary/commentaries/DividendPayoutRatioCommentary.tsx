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
        The Dividend Payout Ratio isn’t typically a primary metric for capital
        allocation in the {industryName} industry.
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
        {formattedMetricValue}. This indicates the company paid a dividend
        despite having a net loss, making the ratio a potential sign of
        financial stress rather than a meaningful measure of its dividend
        policy.
      </P>
    );
  }

  if (metricValue === 0) {
    return (
      <P>
        {stockSymbol} has a Dividend Payout Ratio of 0%, indicating it does not
        currently pay a dividend. This typically means all profits are being
        reinvested for growth.
      </P>
    );
  }

  if (metricValue > 1) {
    return (
      <P>
        {stockSymbol}’s Dividend Payout Ratio of {formattedMetricValue} exceeds
        100%. This means the company is paying out more in dividends than it
        earned, which is often unsustainable and poses a risk to the dividend’s
        stability.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Dividend Payout Ratio of {formattedMetricValue}, but
        industry benchmarks for the {industryName} industry are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s payout ratio of {formattedMetricValue} is notably high,
        positioning it beyond the typical range for the {industryName} industry.
        This signals a strong focus on shareholder returns, but may limit funds
        available for reinvestment and future growth.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s payout ratio of {formattedMetricValue} is quite low,
        falling below the common range for the {industryName} industry. This
        highlights a conservative dividend policy, prioritizing the retention of
        earnings for internal growth initiatives.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s payout ratio of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry. This reflects a generous
        dividend policy compared to its peers, favoring shareholder payouts over
        retaining capital.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s payout ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This suggests a corporate
        strategy that emphasizes reinvesting profits for expansion rather than
        distributing them as dividends.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
    return (
      <P>
        {stockSymbol}’s payout ratio of {formattedMetricValue} falls within the
        middle range for the {industryName} industry, suggesting a balanced
        approach to capital allocation that is common for the sector.
      </P>
    );
  }
}
