import metricApplicabilitiesData from "@/app/data/stock-comparisons/metric-applicabilities.json";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";
import type { MetricCode } from "@/app/data/fmp/metricCodes";

type MetricApplicability = {
  industry: IndustryCode;
} & Record<MetricCode, boolean>;

type MetricApplicabilitiesData = MetricApplicability[];

type GetMetricApplicabilityParams = {
  industryCode: IndustryCode | null;
  metricCode: MetricCode;
};

const allMetricApplicabilities =
  metricApplicabilitiesData as MetricApplicabilitiesData;

export function getMetricApplicability({
  industryCode,
  metricCode,
}: GetMetricApplicabilityParams): boolean {
  if (industryCode == null) {
    return false;
  }

  const metricApplicabilities = allMetricApplicabilities.find(
    (item) => item.industry === industryCode,
  );
  return (metricApplicabilities?.[metricCode] as boolean) ?? false;
}
