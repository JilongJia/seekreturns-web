import type { GicsIndustry } from "@/constants/gics";

export type StatisticalMetricKey =
  | "returnOnEquityTtm"
  | "netProfitMarginTtm"
  | "operatingProfitMarginTtm"
  | "currentRatioMrq"
  | "debtToEquityRatioMrq"
  | "interestCoverageRatioTtm"
  | "dividendYieldTtm"
  | "dividendPayoutRatioTtm"
  | "priceToEarningsRatioTtm"
  | "priceToSalesRatioTtm"
  | "priceToBookRatioMrq";

export type IndustryMetricStatistics = Record<
  GicsIndustry,
  Record<StatisticalMetricKey, (number | null)[]>
>;
