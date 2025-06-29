import { quantile } from "d3-array";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POSITIVE_METRICS = new Set([
  "evToEBITDATTM",
  "evToSalesTTM",
  "netDebtToEBITDATTM",
  "priceToEarningsRatioTTM",
  "forwardPriceToEarningsGrowthRatioTTM",
  "priceToSalesRatioTTM",
  "priceToBookRatioTTM",
  "priceToFreeCashFlowRatioTTM",
  "currentRatioTTM",
  "quickRatioTTM",
  "debtToEquityRatioTTM",
  "debtToAssetsRatioTTM",
]);

const NON_NEGATIVE_METRICS = new Set([
  "dividendYieldTTM",
  "dividendPayoutRatioTTM",
]);

const DIVIDEND_METRICS = new Set([
  "dividendYieldTTM",
  "dividendPayoutRatioTTM",
]);

const NON_ZERO_METRICS = new Set([
  "returnOnEquityTTM",
  "returnOnAssetsTTM",
  "returnOnInvestedCapitalTTM",
  "netProfitMarginTTM",
  "grossProfitMarginTTM",
  "operatingProfitMarginTTM",
  "interestCoverageRatioTTM",
]);

type MetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type CalculateMetricStatsParams = {
  metricCode: string;
  metricValues: number[] | null;
};

export function calculateMetricStats({
  metricCode,
  metricValues,
}: CalculateMetricStatsParams): MetricStats | null {
  if (metricValues == null) {
    return null;
  }

  let filteredValues: number[];

  if (NON_NEGATIVE_METRICS.has(metricCode)) {
    filteredValues = metricValues.filter((v) => v >= 0);
  } else if (NON_ZERO_METRICS.has(metricCode)) {
    filteredValues = metricValues.filter((v) => v !== 0);
  } else {
    filteredValues = metricValues.filter((v) => v > 0);
  }

  if (filteredValues.length <= 1) {
    return null;
  }

  const sortedValues = [...filteredValues].sort((a, b) => a - b);

  const q1 = quantile(sortedValues, 0.25)!;
  const median = quantile(sortedValues, 0.5)!;
  const q3 = quantile(sortedValues, 0.75)!;

  let iqr: number;
  let lowerBound: number;
  let upperBound: number;

  if (DIVIDEND_METRICS.has(metricCode)) {
    const p05 = quantile(sortedValues, 0.05)!;
    const p95 = quantile(sortedValues, 0.95)!;

    iqr = p95 - p05;
    lowerBound = p05;
    upperBound = p95;
  } else {
    iqr = q3 - q1;
    lowerBound = q1;
    upperBound = q3;
  }

  const lowerFence = lowerBound - 1.5 * iqr;
  const upperFence = upperBound + 1.5 * iqr;

  const whiskerMin = sortedValues.find((d) => d >= lowerFence)!;
  const whiskerMax = [...sortedValues].reverse().find((d) => d <= upperFence)!;

  const finalMax = whiskerMax < q3 ? upperFence : whiskerMax;
  const finalMin = whiskerMin > q1 ? lowerFence : whiskerMin;

  return {
    min: finalMin,
    q1,
    median,
    q3,
    max: finalMax,
  };
}
