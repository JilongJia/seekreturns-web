import { P } from "@/components/en/ui/P";
import type { MetricStats } from "@/lib/stock";

type MetricCommentaryProps = {
  stockSymbol: string;
  industryName: string;
  isMetricApplicable: boolean;
  metricValue: number | null;
  formattedMetricValue: string;
  industryMetricStats: MetricStats | null;
};

export function DebtToEquityRatioCommentary({
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
        The Debt-to-Equity Ratio is often not the primary focus for assessing
        leverage in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available.
  if (metricValue === null) {
    return (
      <P>
        Debt-to-Equity Ratio data for {stockSymbol} is currently unavailable.
      </P>
    );
  }

  // 3. Handle specific numerical cases first.
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a Debt-to-Equity Ratio of {formattedMetricValue},
        which indicates negative shareholder equity where liabilities exceed
        assets. This is a critical sign of financial distress.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available.
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Debt-to-Equity Ratio of {formattedMetricValue}, but
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
        With a Debt-to-Equity Ratio of {formattedMetricValue}, {stockSymbol}{" "}
        operates with exceptionally high leverage compared to the {industryName}{" "}
        industry norm. This suggests an aggressive reliance on debt financing,
        which can magnify returns but also significantly elevates financial
        risk.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        At {formattedMetricValue}, {stockSymbol}’s Debt-to-Equity Ratio is
        unusually low for the {industryName} industry. This highlights a
        conservative capital structure, suggesting the company prioritizes
        financial stability over aggressive growth funded by debt.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s leverage is in the upper quartile of the {industryName}{" "}
        industry, with a Debt-to-Equity Ratio of {formattedMetricValue}. While
        this approach can boost equity growth, it also exposes the company to
        greater financial vulnerability.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        Falling into the lower quartile for the {industryName} industry,{" "}
        {stockSymbol}’s Debt-to-Equity Ratio of {formattedMetricValue} points to
        a conservative financing strategy. This results in lower financial risk
        but potentially limits strategic investments compared to more leveraged
        competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Debt-to-Equity Ratio of {formattedMetricValue} is
        typical for the {industryName} industry, indicating its use of leverage
        is in line with the sector norm. This suggests a balanced approach to
        its capital structure.
      </P>
    );
  }
}
