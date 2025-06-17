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

export function DividendYieldCommentary({
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
        Dividend Yield is not a primary investment consideration for companies
        in the {industryName} industry.
      </P>
    );
  }

  // 2. Check if data is available
  if (metricValue === null) {
    return (
      <P>Dividend Yield data for {stockSymbol} is currently unavailable.</P>
    );
  }

  // 3. Handle specific case: Zero Yield
  if (metricValue === 0) {
    return (
      <P>
        {stockSymbol} currently does not pay a dividend, resulting in a yield of
        0%. This is a common strategy for growth-focused companies that
        prioritize reinvesting all earnings back into the business, though it
        may be less typical in mature, income-oriented sectors.
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 4. Check if industry benchmark data is available
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

  // 5. Handle cases based on industry benchmarks
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is
        exceptionally high, placing it well above the typical range for the{" "}
        {industryName} industry. While this may seem attractive to income
        investors, an unusually high yield can sometimes be a warning sign,
        reflecting a falling stock price or market concerns about the dividend’s
        future sustainability.
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is below the
        typical range for the {industryName} industry, indicating that
        shareholder returns are likely driven more by capital appreciation than
        by dividend income.
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is in the upper
        quartile for the {industryName} industry, offering a more attractive
        income stream than most of its peers and signaling a strong commitment
        to shareholder returns.
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is in the lower
        quartile for the {industryName} industry. This suggests that the
        company’s strategy likely favors retaining earnings for growth and
        reinvestment over providing a high dividend income.
      </P>
    );
  } else {
    // This covers the interquartile range (Q1 to Q3)
    return (
      <P>
        {stockSymbol}’s Dividend Yield of {formattedMetricValue} is consistent
        with its sector peers in the {industryName} industry, providing a
        dividend return that is standard for the category.
      </P>
    );
  }
}
