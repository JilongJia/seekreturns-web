import type { MetricCode } from "@/app/data/fmp/metricCodes";

import { PriceToEarningsRatioInterpreter } from "./metric-interpretation/PriceToEarningsRatioInterpreter";

type MetricInterpretationProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
  whichStock: "one" | "two";
};

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

const METRIC_INTERPRETERS: Partial<
  Record<MetricCode, (props: MetricInterpretationProps) => JSX.Element>
> = {
  priceToEarningsRatioTTM: PriceToEarningsRatioInterpreter,
};

export function MetricInterpretation({
  metricCode,
  stockSymbol,
  industryName,
  metricValue,
  industryMetricStats,
  isMetricApplicable,
  whichStock,
}: MetricInterpretationProps) {
  const interpreter = METRIC_INTERPRETERS[metricCode];

  if (!interpreter) {
    return null;
  }

  return interpreter({
    metricCode,
    stockSymbol,
    industryName,
    metricValue,
    industryMetricStats,
    isMetricApplicable,
    whichStock,
  });
}
