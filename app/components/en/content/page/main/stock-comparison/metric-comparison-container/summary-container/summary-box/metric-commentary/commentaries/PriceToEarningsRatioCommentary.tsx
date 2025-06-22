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
        The P/E Ratio is often not the primary metric for valuation in the{" "}
        {industryName} industry.
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
        occurs when a company has negative earnings (a net loss), making the
        ratio unsuitable for valuation analysis.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has a P/E Ratio of {formattedMetricValue}, but a direct
        industry comparison is not possible as benchmark data for the{" "}
        {industryName} sector is unavailable.
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
        {stockSymbol}’s P/E Ratio of {formattedMetricValue} is below the typical
        range for the {industryName} industry. This may indicate that the stock
        is potentially undervalued, or it could reflect market concerns about
        the company’s future prospects.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        A P/E Ratio of {formattedMetricValue} places {stockSymbol} in the upper
        quartile for the {industryName} industry. This high valuation relative
        to peers suggests the market holds elevated expectations for the
        company’s future growth.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        In the lower quartile for the {industryName} industry, {stockSymbol}’s
        P/E Ratio of {formattedMetricValue} suggests the stock may be
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
