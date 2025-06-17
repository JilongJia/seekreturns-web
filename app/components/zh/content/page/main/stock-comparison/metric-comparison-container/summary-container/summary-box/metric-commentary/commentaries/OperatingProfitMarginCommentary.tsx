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

export function OperatingProfitMarginCommentary({
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
        Operating Profit Margin isn’t typically a primary measure of operational
        efficiency for companies in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return (
      <P>
        Operating Profit Margin data for {stockSymbol} is currently unavailable.
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. Handle specific case: Negative Value
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} has a negative Operating Profit Margin of{" "}
        {formattedMetricValue}. This signifies the company is unprofitable at
        the operational level, as its core business expenses exceed its revenue.
      </P>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} has an Operating Profit Margin of {formattedMetricValue},
        but industry benchmarks for the {industryName} industry are currently
        unavailable for comparison.
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Operating Profit Margin of {formattedMetricValue} is
        exceptionally high, placing it well above the typical range for the{" "}
        {industryName} industry. This demonstrates outstanding efficiency in
        managing its core operations, which can be a result of strong pricing
        power or superior cost control.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Operating Profit Margin of {formattedMetricValue} is
        below the typical range for the {industryName} industry, suggesting
        significant challenges in generating profit from its core business
        activities relative to its peers.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Operating Profit Margin of {formattedMetricValue} is in
        the upper quartile for the {industryName} industry. This signals a
        strong ability to translate revenue into operating profit, outperforming
        most of its competitors in core business efficiency.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Operating Profit Margin of {formattedMetricValue} is in
        the lower quartile for the {industryName} industry. This indicates
        weaker profitability from core business activities, which may stem from
        operational inefficiencies or competitive pressures on pricing.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
    return (
      <P>
        {stockSymbol}’s Operating Profit Margin of {formattedMetricValue} hovers
        around the midpoint for the {industryName} industry, indicating that its
        efficiency in managing core business operations is characteristic of the
        sector.
      </P>
    );
  }
}
