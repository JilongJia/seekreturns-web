import industryMetricsData from "@/app/data/stock-comparisons/industry-metrics.json";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

type IndustryMetric = {
  industry: IndustryCode;
} & Record<MetricCode, number[]>;

type IndustryMetricsData = IndustryMetric[];

type GetIndustryMetricParams = {
  industryCode: IndustryCode;
  metricCode: MetricCode;
};

const allIndustryMetrics = industryMetricsData as IndustryMetricsData;

export function getIndustryMetric({
  industryCode,
  metricCode,
}: GetIndustryMetricParams): number[] {
  const industryMetrics = allIndustryMetrics.find(
    (item) => item.industry === industryCode,
  );

  return (industryMetrics?.[metricCode] as number[]) || [];
}
