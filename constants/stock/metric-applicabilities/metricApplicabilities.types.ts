import type { GicsIndustry } from "@/constants/gics";

export type MetricApplicability = {
  industry: GicsIndustry;
  returnOnEquityTtm: boolean;
  netProfitMarginTtm: boolean;
  operatingProfitMarginTtm: boolean;
  currentRatioMrq: boolean;
  debtToEquityRatioMrq: boolean;
  interestCoverageRatioTtm: boolean;
  dividendYieldTtm: boolean;
  dividendPayoutRatioTtm: boolean;
  priceToEarningsRatioTtm: boolean;
  priceToBookRatioMrq: boolean;
  priceToSalesRatioTtm: boolean;
};
