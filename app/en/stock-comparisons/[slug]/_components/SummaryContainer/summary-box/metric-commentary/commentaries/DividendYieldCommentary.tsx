import { P } from "@/components/en/ui/P";
import type { MetricStats } from "@/lib/stock-properties";

type MetricCommentaryProps = {
  stockSymbol: string;
  industryName: string;
  isMetricApplicable: boolean;
  metricValue: number | null;
  formattedMetricValue: string;
  industryMetricStats: MetricStats | null;
};

export function DividendYieldCommentary({
  stockSymbol,
  industryName,
  isMetricApplicable,
  metricValue,
  formattedMetricValue,
  industryMetricStats,
}: MetricCommentaryProps) {
  // 1. Check if the metric is applicable.
  if (!isMetricApplicable) {
    return (
      <P>
        For companies in the {industryName} industry, Dividend Yield is often
        not a primary investment consideration.
      </P>
    );
  }

  // 2. Check if data is available.
  if (metricValue === null) {
    return (
      <P>Dividend Yield data for {stockSymbol} is currently unavailable.</P>
    );
  }

  // 3. Handle specific case: Zero Yield.
  if (metricValue === 0) {
    return (
      <P>
        {stockSymbol} currently does not pay a dividend, resulting in a yield of
        0%. This is a common strategy for growth-focused companies that
        prioritize reinvesting earnings, though it may be less typical in
        mature, income-oriented sectors.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available.
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Dividend Yield of {formattedMetricValue}, but
        industry benchmarks for the {industryName} sector are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks.
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is
        exceptionally high, placing it well above the typical range for the{" "}
        {industryName} industry. While this may seem attractive, an unusually
        high yield can sometimes be a warning sign, reflecting a falling stock
        price or market concerns about the dividend’s sustainability.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is below the
        typical range for the {industryName} industry. This indicates that
        shareholder returns are likely driven more by potential capital
        appreciation than by dividend income.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        With a Dividend Yield of {formattedMetricValue}, {stockSymbol} offers a
        more attractive income stream than most of its peers in the{" "}
        {industryName} industry, signaling a strong commitment to shareholder
        returns.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This suggests the company’s
        strategy likely favors retaining earnings for growth over providing a
        high dividend income.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is consistent
        with its peers in the {industryName} industry, providing a dividend
        return that is standard for its sector.
      </P>
    );
  }
}
