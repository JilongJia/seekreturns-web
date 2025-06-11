import metricNamesData from "@/app/data/stock-comparisons/metric-names.json";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

export type MetricNameType =
  | "shortNameEN"
  | "longNameEN"
  | "shortNameZH"
  | "longNameZH";

type MetricName = {
  metric: MetricCode;
  shortNameEN: string;
  longNameEN: string;
  shortNameZH: string;
  longNameZH: string;
};

type GetMetricNameParams = {
  metricCode: MetricCode;
  nameType: MetricNameType;
};

const allMetricNames = metricNamesData as MetricName[];

export function getMetricName({
  metricCode,
  nameType,
}: GetMetricNameParams): string {
  const metricRecord = allMetricNames.find(
    (item) => item.metric === metricCode,
  );

  return metricRecord?.[nameType] || metricCode;
}
