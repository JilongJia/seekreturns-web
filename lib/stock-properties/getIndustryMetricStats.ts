import { quantile } from "d3-array";

import { industryMetricStatistics } from "@/data/industry-metric-statistics";
import type { GicsIndustry } from "@/constants/gics/types";
import type { ComparableMetricKey } from "@/constants/stock-properties";

export type MetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

export function getIndustryMetricStats(
  gicsIndustry: GicsIndustry | null,
  metricKey: ComparableMetricKey,
): MetricStats | null {
  if (gicsIndustry === null) {
    return null;
  }

  const industryData = industryMetricStatistics[gicsIndustry];

  if (!industryData) {
    return null;
  }

  const metricValues = industryData[metricKey];

  if (!metricValues) {
    return null;
  }

  return calculateMetricStats(metricValues);
}

function calculateMetricStats(
  metricValues: (number | null)[],
): MetricStats | null {
  const filteredValues = metricValues.filter((v): v is number => v !== null);

  if (filteredValues.length <= 1) {
    return null;
  }

  const sortedValues = [...filteredValues].sort((a, b) => a - b);

  const q1 = quantile(sortedValues, 0.25);
  const median = quantile(sortedValues, 0.5);
  const q3 = quantile(sortedValues, 0.75);

  if (q1 === undefined || median === undefined || q3 === undefined) {
    return null;
  }

  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const whiskerMin = sortedValues.find((d) => d >= lowerFence);
  const whiskerMax = [...sortedValues].reverse().find((d) => d <= upperFence);

  if (whiskerMin === undefined || whiskerMax === undefined) {
    return null;
  }

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
