import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { formatNumber } from "@/app/components/en/content/page/main/stock-comparison/lib/formatNumber";

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricInterpretationProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
  whichStock: "one" | "two";
};

export function PriceToEarningsRatioInterpreter({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  whichStock,
}: MetricInterpretationProps) {
  // 1. Check if the metric is applicable to the industry
  if (!isMetricApplicable) {
    return (
      <>
        The P/E Ratio is not typically the primary metric used to value
        companies in the {industryName} industry.
      </>
    );
  }

  // 2. Check if the stock's P/E data is available
  if (metricValue === null) {
    return <>P/E Ratio data for {stockSymbol} is currently unavailable.</>;
  }

  const formattedMetricValue = formatNumber({ number: metricValue });

  // 3. Handle the special case: Negative P/E
  if (metricValue < 0) {
    return (
      <>
        {stockSymbol} has a negative P/E Ratio of {formattedMetricValue},
        indicating a net loss. A negative P/E is not considered a reliable
        indicator for valuation comparisons.
      </>
    );
  }

  // 4. Check if industry benchmark data is available
  if (!industryMetricStats) {
    return (
      <>
        {stockSymbol} has a P/E Ratio of {formattedMetricValue}, but a direct
        industry comparison is not possible as benchmarks for the {industryName}{" "}
        sector are unavailable.
      </>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. & 6. Handle cases based on industry benchmarks
  if (metricValue > max) {
    if (whichStock === "one") {
      return (
        <>
          {stockSymbol}’s P/E Ratio of {formattedMetricValue} is significantly
          above the typical industry range, often indicating high growth
          expectations or potential overvaluation.
        </>
      );
    } else {
      return (
        <>
          {stockSymbol} has a P/E Ratio of {formattedMetricValue}. This is well
          outside the upper valuation boundary for its industry, which can
          signal strong market confidence or that the stock may be overvalued.
        </>
      );
    }
  } else if (metricValue < min) {
    if (whichStock === "one") {
      return (
        <>
          {stockSymbol}’s P/E Ratio of {formattedMetricValue} is significantly
          below its industry’s typical range, which can indicate potential
          undervaluation or specific business challenges.
        </>
      );
    } else {
      return (
        <>
          {stockSymbol} has a P/E Ratio of {formattedMetricValue}. This
          valuation is considerably lower than its industry peers, sometimes
          reflecting perceived risks or that the stock may be undervalued.
        </>
      );
    }
  } else if (metricValue > q3) {
    if (whichStock === "one") {
      return (
        <>
          {stockSymbol}’s P/E Ratio of {formattedMetricValue} places it in the
          top quartile of its industry, indicating a premium valuation compared
          to its peers.
        </>
      );
    } else {
      return (
        <>
          {stockSymbol} has a P/E Ratio of {formattedMetricValue}, positioning
          it in the upper tier of the {industryName} sector with a valuation
          higher than most of its competitors.
        </>
      );
    }
  } else if (metricValue < q1) {
    if (whichStock === "one") {
      return (
        <>
          {stockSymbol}’s P/E Ratio of {formattedMetricValue} falls into the
          bottom quartile of its industry, reflecting a more conservative
          valuation than its peers.
        </>
      );
    } else {
      return (
        <>
          {stockSymbol} has a P/E Ratio of {formattedMetricValue}, placing it in
          the lower tier of its industry, which reflects a more cautious market
          valuation compared to its competitors.
        </>
      );
    }
  } else {
    // This covers the range between Q1 and Q3.
    if (whichStock === "one") {
      return (
        <>
          {stockSymbol}’s P/E Ratio of {formattedMetricValue} is within the
          central range for the {industryName} industry, indicating a typical
          valuation relative to its peers.
        </>
      );
    } else {
      return (
        <>
          {stockSymbol} has a P/E Ratio of {formattedMetricValue}, aligning it
          with the typical valuation range for competitors in the {industryName}{" "}
          sector.
        </>
      );
    }
  }
}
