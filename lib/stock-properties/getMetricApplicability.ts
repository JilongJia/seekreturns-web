import { metricApplicability } from "@/constants/stock-properties";
import type { GicsIndustry } from "@/constants/gics/types";
import type { ComparableMetricKey } from "@/constants/stock-properties";

export function getMetricApplicability(
  gicsIndustry: GicsIndustry,
  metricKey: ComparableMetricKey,
): boolean {
  // Find the applicability rule object for the given industry.
  const industryRule = metricApplicability.find(
    (rule) => rule.industry === gicsIndustry,
  );

  // If no rule is found for that industry, the metric is not applicable.
  if (!industryRule) {
    return false;
  }

  // Return the boolean value for the metric key from the rule object.
  return industryRule[metricKey] || false;
}
