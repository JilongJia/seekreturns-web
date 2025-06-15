import type { MetricCode } from "@/app/data/fmp/metricCodes";

type MetricColor = "lime" | "rose" | "amber" | "stone";

type MetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricColorRule = (value: number, stats: MetricStats) => MetricColor;

const METRIC_COLOR_RULES: Partial<Record<MetricCode, MetricColorRule>> = {
  priceToEarningsRatioTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value < stats.q1) return "lime";
    if (value > stats.q3) return "rose";

    return "amber";
  },

  forwardPriceToEarningsGrowthRatioTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value < stats.q1) return "lime";
    if (value > stats.q3) return "rose";

    return "amber";
  },
  priceToSalesRatioTTM: (value, stats) => {
    if (value < stats.q1) return "lime";
    if (value > stats.q3) return "rose";

    return "amber";
  },
  priceToBookRatioTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value < stats.q1) return "lime";
    if (value > stats.q3) return "rose";

    return "amber";
  },

  debtToEquityRatioTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value < stats.q1) return "lime";
    if (value > stats.q3) return "rose";

    return "amber";
  },

  currentRatioTTM: (value, stats) => {
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
  },

  returnOnEquityTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
  },

  returnOnInvestedCapitalTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
  },

  netProfitMarginTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
  },

  operatingProfitMarginTTM: (value, stats) => {
    if (value < 0) return "rose";
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
  },

  dividendYieldTTM: (value, stats) => {
    if (value > stats.max) return "amber";
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
  },

  dividendPayoutRatioTTM: (value, stats) => {
    if (value < 0 || value > 1) return "rose";
    if (value > stats.q3) return "amber";
    if (value >= stats.q1 && value <= stats.q3) return "lime";

    return "amber";
  },

  interestCoverageRatioTTM: (value, stats) => {
    if (value < 1) return "rose";
    if (value > stats.q3) return "lime";
    if (value < stats.q1) return "rose";

    return "amber";
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
    return "stone";
  }

  const rule = METRIC_COLOR_RULES[metricCode];

  if (rule) {
    return rule(metricValue, metricStats);
  }

  return "amber";
}
