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

export function DebtToEquityRatioCommentary({
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
        The Debt-to-Equity Ratio is not a primary measure of financial leverage
        for companies in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return (
      <P>
        Debt-to-Equity Ratio data for {stockSymbol} is currently unavailable.
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle specific numerical cases first
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a Debt-to-Equity Ratio of {formattedMetricValue},
        which indicates negative shareholder equity where liabilities exceed
        assets. This is a critical sign of financial distress.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
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

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Debt-to-Equity Ratio of {formattedMetricValue} is
        exceptionally high, falling well outside the typical range for the{" "}
        {industryName} industry. This suggests an aggressive reliance on debt
        financing, which can magnify returns but also significantly elevates the
        company’s financial risk.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Debt-to-Equity Ratio of {formattedMetricValue} is
        unusually low, falling beneath the typical leverage range for the{" "}
        {industryName} industry. This highlights a highly conservative capital
        structure, suggesting the company prioritizes financial stability over
        aggressive growth funded by debt.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Debt-to-Equity Ratio of {formattedMetricValue} is in the
        upper quartile for the {industryName} industry, indicating that its
        leverage is higher than the majority of its peers. While this can boost
        shareholder equity growth, it also exposes the company to greater
        financial vulnerability.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Debt-to-Equity Ratio of {formattedMetricValue} is in the
        lower quartile for the {industryName} industry. This points to a
        conservative financing strategy with low reliance on debt, resulting in
        lower financial risk but potentially limiting the scale of its strategic
        investments compared to more leveraged competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
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
