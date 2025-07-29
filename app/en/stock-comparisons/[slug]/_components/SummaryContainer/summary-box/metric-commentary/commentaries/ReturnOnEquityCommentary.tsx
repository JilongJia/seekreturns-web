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

export function ReturnOnEquityCommentary({
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
        Return on Equity is often not a primary performance indicator in the{" "}
        {industryName} industry.
      </P>
    );
  }

  // 2. Check if the stock's ROE data is available.
  if (metricValue === null) {
    return (
      <P>Return on Equity data for {stockSymbol} is currently unavailable.</P>
    );
  }

  // 3. Handle the special case: Negative ROE.
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Return on Equity of {formattedMetricValue}.
        This indicates the company is generating a loss for its shareholders,
        which can be a result of unprofitability or negative shareholder equity
        and is often a sign of financial distress.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available.
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a Return on Equity of {formattedMetricValue}, but
        industry benchmarks for the {industryName} industry are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks.
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Return on Equity of {formattedMetricValue} is
        exceptionally high, placing it well beyond the typical range for the{" "}
        {industryName} industry. This demonstrates a superior ability to
        generate profit from shareholder investments, though it could also be
        inflated by high financial leverage.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        A Return on Equity of {formattedMetricValue} places {stockSymbol} below
        the typical range for the {industryName} industry. This suggests
        challenges in efficiently using shareholder capital to generate profit,
        which could point to operational issues or a conservative capital
        structure.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        In the upper quartile for the {industryName} industry, {stockSymbol}’s
        Return on Equity of {formattedMetricValue} signals a highly effective
        use of shareholder capital to drive profitability compared to most of
        its peers.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Return on Equity of {formattedMetricValue} is in the
        lower quartile for the {industryName} industry. This indicates a less
        efficient generation of profit from its equity base when compared to its
        competitors.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3).
    return (
      <P>
        {stockSymbol}’s Return on Equity of {formattedMetricValue} is on par
        with the norm for the {industryName} industry, indicating its
        profitability relative to shareholder equity is typical for the sector.
      </P>
    );
  }
}
