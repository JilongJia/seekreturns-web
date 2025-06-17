import type { MetricCode } from "@/app/data/fmp/metricCodes";

export type FormatMetricValueParams = {
  metricValue: number | null | undefined;
  metricCode: MetricCode;
};

const percentageMetrics: Set<MetricCode> = new Set([
  "returnOnEquityTTM",
  "returnOnAssetsTTM",
  "returnOnInvestedCapitalTTM",
  "netProfitMarginTTM",
  "grossProfitMarginTTM",
  "operatingProfitMarginTTM",
  "dividendYieldTTM",
  "dividendPayoutRatioTTM",
]);

export function formatMetricValue({
  metricValue,
  metricCode,
}: FormatMetricValueParams): string {
  if (metricValue === null || metricValue === undefined) return "--";

  if (percentageMetrics.has(metricCode)) {
    return metricValue.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return metricValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
