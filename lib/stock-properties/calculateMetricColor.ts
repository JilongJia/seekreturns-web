import type { ComparableMetricKey } from "@/constants/stock-properties";
import type { MetricStats } from "./getIndustryMetricStats";

export type MetricColor = "green" | "red" | "yellow" | "neutral";

type MetricColorRule = (value: number, stats: MetricStats) => MetricColor;

const METRIC_COLOR_RULES: Record<ComparableMetricKey, MetricColorRule> = {
  // Higher is better
  returnOnEquityTtm: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";
    return "yellow";
  },
  netProfitMarginTtm: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";
    return "yellow";
  },
  operatingProfitMarginTtm: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";
    return "yellow";
  },
  interestCoverageRatioTtm: (value, stats) => {
    if (value < 1) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";
    return "yellow";
  },
  currentRatioMrq: (value, stats) => {
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";
    return "yellow";
  },

  // Lower is better
  debtToEquityRatioMrq: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";
    return "yellow";
  },
  priceToEarningsRatioTtm: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";
    return "yellow";
  },
  priceToSalesRatioTtm: (value, stats) => {
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";
    return "yellow";
  },
  priceToBookRatioMrq: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";
    return "yellow";
  },

  // Special cases
  dividendYieldTtm: (value, stats) => {
    if (value > stats.max) return "yellow";
    if (value === 0) return "yellow";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";
    return "yellow";
  },
  dividendPayoutRatioTtm: (value, stats) => {
    if (value < 0 || value > 100) return "red";
    if (value === 0) return "yellow";
    if (value >= stats.q1 && value <= stats.q3) return "green";
    return "yellow";
  },
};

export function calculateMetricColor(
  metricKey: ComparableMetricKey,
  metricValue: number | null,
  metricStats: MetricStats | null,
): MetricColor {
  if (metricValue === null || metricStats === null) {
    return "neutral";
  }

  const rule = METRIC_COLOR_RULES[metricKey];
  return rule(metricValue, metricStats);
}
