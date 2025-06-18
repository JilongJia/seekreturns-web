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

export function PriceToEarningsRatioCommentary({
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
        The P/E Ratio is not typically the primary metric used for valuation in
        the {industryName} industry.
      </P>
    );
  }

  // 2. Check if the stock's P/E data is available
  if (metricValue === null) {
    return <P>P/E Ratio data for {stockSymbol} is currently unavailable.</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle the special case: Negative P/E
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative P/E Ratio of {formattedMetricValue}. This
        occurs when a company has negative earnings (a net loss) and makes the
        ratio unsuitable for valuation analysis.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a P/E Ratio of {formattedMetricValue}. A direct
        industry comparison is not possible, as benchmark data for the{" "}
        {industryName} industry is unavailable.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        At {formattedMetricValue}, {stockSymbol}’s P/E Ratio is exceptionally
        high, exceeding the typical maximum for the {industryName} industry.
        This suggests the stock may be significantly overvalued compared to its
        peers and implies high market expectations that could be difficult to
        meet.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        At {formattedMetricValue}, {stockSymbol}’s P/E Ratio is below the
        typical range for the {industryName} industry. This may indicate that
        the stock is potentially undervalued, or it could reflect specific
        market concerns about the company‘s future prospects.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry. This high valuation relative
        to peers suggests potential overvaluation risk and places significant
        pressure on the company to deliver exceptional future growth.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This suggests the stock may be
        undervalued compared to its peers, potentially presenting an attractive
        entry point for investors.
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is within the middle
        range for the {industryName} industry. This suggests its valuation is in
        line with the sector average, representing neither a significant premium
        nor a discount compared to its peers.
      </P>
    );
  }
}
