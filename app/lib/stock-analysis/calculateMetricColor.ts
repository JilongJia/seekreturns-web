type MetricColor = "green" | "red" | "yellow" | "stone";

type MetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type CalculateMetricColorParams = {
  metricValue: number | null;
  metricStats: MetricStats | null;
};

export function calculateMetricColor({
  metricValue,
  metricStats,
}: CalculateMetricColorParams): MetricColor {
  if (metricValue == null || metricStats == null) {
    return "stone";
  }

  if (metricValue <= 0 || metricValue > metricStats.max) {
    return "red";
  }

  if (metricValue >= metricStats.q1 && metricValue <= metricStats.q3) {
    return "green";
  }

  return "yellow";
}
