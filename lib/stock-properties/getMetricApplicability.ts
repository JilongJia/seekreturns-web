import { metricApplicability } from "@/constants/stock-properties";
import type { GicsIndustry } from "@/constants/gics/types";
import type { ComparableMetricKey } from "@/constants/stock-properties";

export function getMetricApplicability(
  gicsIndustry: GicsIndustry | null,
  metricKey: ComparableMetricKey,
): boolean {
  // If the industry is unknown, we default to the metric being applicable.
  if (gicsIndustry === null) {
    return true;
  }

  const industryRule = metricApplicability.find(
    (rule) => rule.industry === gicsIndustry,
  );

  // 2. If no specific rule is found for the industry, default to applicable.
  if (!industryRule) {
    return true;
  }

  const isApplicable = industryRule[metricKey];

  // 3. If the key is not on the rule object (isApplicable is undefined), default to true.
  return isApplicable ?? true;
}
