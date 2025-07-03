import type { MetricCode } from "@/app/data/fmp/metricCodes";

export type MetricColor = "green" | "red" | "yellow" | "neutral";

type MetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricColorRule = (value: number, stats: MetricStats) => MetricColor;

const METRIC_COLOR_RULES: Partial<Record<MetricCode, MetricColorRule>> = {
  returnOnEquityTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  returnOnInvestedCapitalTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  netProfitMarginTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  operatingProfitMarginTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  currentRatioTTM: (value, stats) => {
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  debtToEquityRatioTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";

    return "yellow";
  },

  interestCoverageRatioTTM: (value, stats) => {
    if (value < 1) return "red";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  dividendYieldTTM: (value, stats) => {
    if (value > stats.max) return "yellow";
    if (value === 0) return "yellow";
    if (value > stats.q3) return "green";
    if (value < stats.q1) return "red";

    return "yellow";
  },

  dividendPayoutRatioTTM: (value, stats) => {
    if (value < 0 || value > 1) return "red";
    if (value === 0) return "yellow";
    if (value >= stats.q1 && value <= stats.q3) return "green";
    if (value > stats.q3) return "yellow";

    return "yellow";
  },

  priceToEarningsRatioTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";

    return "yellow";
  },

  forwardPriceToEarningsGrowthRatioTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";

    return "yellow";
  },

  priceToSalesRatioTTM: (value, stats) => {
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";

    return "yellow";
  },

  priceToBookRatioTTM: (value, stats) => {
    if (value < 0) return "red";
    if (value < stats.q1) return "green";
    if (value > stats.q3) return "red";

    return "yellow";
  },
};

type CalculateMetricColorParams = {
  metricCode: MetricCode;
  metricValue: number | null;
  metricStats: MetricStats | null;
};

export function calculateMetricColor({
  metricCode,
  metricValue,
  metricStats,
}: CalculateMetricColorParams): MetricColor {
  if (metricValue == null || metricStats == null) {
    return "neutral";
  }

  const rule = METRIC_COLOR_RULES[metricCode];

  if (rule) {
    return rule(metricValue, metricStats);
  }

  return "yellow";
}
