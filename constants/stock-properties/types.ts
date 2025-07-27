export type ProfileData = {
  symbol: string;
  companyName: string | null;
  country: string | null;
  sector: string | null;
  industryGroup: string | null;
  industry: string | null;
  subIndustry: string | null;
  marketCapitalization: number | null;
  currency: string | null;
  ticker: string | null;
  ipoDate: string | null;
  exchange: string | null;
  securityType: string | null;
};

export type HistoricalPerformanceData = {
  priceReturnDaily5d: number | null;
  priceReturnDaily13w: number | null;
  priceReturnDaily26w: number | null;
  priceReturnDaily52w: number | null;
  priceReturnDailyMtd: number | null;
  priceReturnDailyYtd: number | null;
  averageTradingVolume10d: number | null;
  averageTradingVolume3m: number | null;
  dailyReturnStandardDeviation3m: number | null;
  beta: number | null;
};

export type ProfitabilityData = {
  returnOnEquityTtm: number | null;
  returnOnAssetsTtm: number | null;
  netProfitMarginTtm: number | null;
  operatingProfitMarginTtm: number | null;
  grossProfitMarginTtm: number | null;
};

export type FinancialStrengthData = {
  currentRatioMrq: number | null;
  quickRatioMrq: number | null;
  debtToEquityRatioMrq: number | null;
  interestCoverageRatioTtm: number | null;
};

export type GrowthData = {
  revenueGrowthMrqYoy: number | null;
  revenueGrowthTtmYoy: number | null;
  revenueGrowth3yCagr: number | null;
  revenueGrowth5yCagr: number | null;
  epsGrowthMrqYoy: number | null;
  epsGrowthTtmYoy: number | null;
  epsGrowth3yCagr: number | null;
  epsGrowth5yCagr: number | null;
};

export type DividendData = {
  dividendYieldTtm: number | null;
  dividendPayoutRatioTtm: number | null;
};

export type ValuationData = {
  priceToEarningsRatioTtm: number | null;
  priceToSalesRatioTtm: number | null;
  priceToBookRatioMrq: number | null;
  priceToFreeCashFlowRatioTtm: number | null;
};

export type StockPropertyData = ProfileData &
  HistoricalPerformanceData &
  ProfitabilityData &
  FinancialStrengthData &
  GrowthData &
  DividendData &
  ValuationData;

export type ProfileKey = keyof ProfileData;
export type HistoricalPerformanceKey = keyof HistoricalPerformanceData;
export type ProfitabilityKey = keyof ProfitabilityData;
export type FinancialStrengthKey = keyof FinancialStrengthData;
export type GrowthKey = keyof GrowthData;
export type DividendKey = keyof DividendData;
export type ValuationKey = keyof ValuationData;

export type ComparableMetricKey =
  | "returnOnEquityTtm"
  | "netProfitMarginTtm"
  | "operatingProfitMarginTtm"
  | "currentRatioMrq"
  | "debtToEquityRatioMrq"
  | "interestCoverageRatioTtm"
  | "dividendYieldTtm"
  | "dividendPayoutRatioTtm"
  | "priceToEarningsRatioTtm"
  | "priceToBookRatioMrq"
  | "priceToSalesRatioTtm";

export type PropertyKey =
  | ProfileKey
  | HistoricalPerformanceKey
  | ProfitabilityKey
  | FinancialStrengthKey
  | GrowthKey
  | DividendKey
  | ValuationKey;
