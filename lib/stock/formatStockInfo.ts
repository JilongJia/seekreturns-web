import type { StockInfoKey, StockInfoData } from "@/constants/stock/types";

type Lang = "en" | "zh";

export type FormatOptions = {
  lang: Lang;
  currency?: string | null;
};

export function formatStockInfo(
  key: StockInfoKey,
  value: StockInfoData[StockInfoKey],
  options: FormatOptions,
): string {
  if (value === null || value === undefined) {
    return "--";
  }

  const { lang, currency } = options;
  const locale = lang === "zh" ? "zh-CN" : "en-US";

  switch (key) {
    case "marketCapitalization":
      const displayCurrency = currency || "";
      if (lang === "zh") {
        return `${(Number(value) / 1e8).toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}亿 ${displayCurrency}`;
      }
      return `${(Number(value) / 1e9).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} billion ${displayCurrency}`;

    case "listingDate":
      return new Date(value as string).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    // Percentages (Ratios like 0.15 that are multiplied by 100)
    case "priceReturnDaily5d":
    case "priceReturnDaily13w":
    case "priceReturnDaily26w":
    case "priceReturnDaily52w":
    case "priceReturnDailyMtd":
    case "priceReturnDailyYtd":
    case "dailyReturnStandardDeviation3m":
    case "returnOnEquityTtm":
    case "returnOnAssetsTtm":
    case "netProfitMarginTtm":
    case "operatingProfitMarginTtm":
    case "grossProfitMarginTtm":
    case "dividendYieldTtm":
    case "dividendPayoutRatioTtm":
    case "revenueGrowthMrqYoy":
    case "revenueGrowthTtmYoy":
    case "revenueGrowth3yCagr":
    case "revenueGrowth5yCagr":
    case "epsGrowthMrqYoy":
    case "epsGrowthTtmYoy":
    case "epsGrowth3yCagr":
    case "epsGrowth5yCagr":
      return Number(value).toLocaleString(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    // Ratios, Multiples, and other numbers
    case "beta":
    case "priceToEarningsRatioTtm":
    case "priceToSalesRatioTtm":
    case "priceToBookRatioMrq":
    case "priceToFreeCashFlowRatioTtm":
    case "currentRatioMrq":
    case "quickRatioMrq":
    case "debtToEquityRatioMrq":
    case "interestCoverageRatioTtm":
      return Number(value).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

    // Volume (in Millions)
    case "averageTradingVolume10d":
    case "averageTradingVolume3m":
      if (lang === "zh") {
        return `${(Number(value) * 100).toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}万`;
      }
      return `${Number(value).toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}M`;

    // Default case for string keys
    default:
      return String(value);
  }
}
