import { quantile } from "d3-array";

type MetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type CalculateMetricStatsParams = {
  metricValues: number[] | null;
};

export function calculateMetricStats({
  metricValues,
}: CalculateMetricStatsParams): MetricStats | null {
  if (metricValues == null) {
    return null;
  }

  const positiveValues = metricValues.filter((v) => v > 0);

  if (positiveValues.length < 4) {
    return null;
  }

  const sortedValues = [...positiveValues].sort((a, b) => a - b);

  const q1 = quantile(sortedValues, 0.25)!;
  const median = quantile(sortedValues, 0.5)!;
  const q3 = quantile(sortedValues, 0.75)!;

  const iqr = q3 - q1;

  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const whiskerMin = sortedValues.find((d) => d >= lowerFence)!;
  const whiskerMax = [...sortedValues].reverse().find((d) => d <= upperFence)!;

  return {
    min: Math.max(whiskerMin, 0),
    q1,
    median,
    q3,
    max: whiskerMax,
  };
}
