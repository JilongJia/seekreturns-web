import { adminDb } from "./admin";
import { unstable_cache } from "next/cache";
import type { IndustryCode } from "@/app/data/fmp/industryCodes";

export type ProfileData = {
  companyName: string | null;
  country: string | null;
  sector: string | null;
  industry: IndustryCode | null;
  ceo: string | null;
  price: number | null;
  marketCap: number | null;
  beta: number | null;
  exchange: string | null;
  ipoDate: string | null;
  isAdr: boolean | null;
  currency: string | null;
};

export type KeyMetricsData = {
  evToEBITDATTM: number | null;
  evToSalesTTM: number | null;
  returnOnEquityTTM: number | null;
  returnOnAssetsTTM: number | null;
  returnOnInvestedCapitalTTM: number | null;
  netDebtToEBITDATTM: number | null;
};

export type RatiosData = {
  priceToEarningsRatioTTM: number | null;
  forwardPriceToEarningsGrowthRatioTTM: number | null;
  priceToSalesRatioTTM: number | null;
  priceToBookRatioTTM: number | null;
  priceToFreeCashFlowRatioTTM: number | null;
  netProfitMarginTTM: number | null;
  grossProfitMarginTTM: number | null;
  operatingProfitMarginTTM: number | null;
  currentRatioTTM: number | null;
  quickRatioTTM: number | null;
  debtToEquityRatioTTM: number | null;
  debtToAssetsRatioTTM: number | null;
  interestCoverageRatioTTM: number | null;
  dividendYieldTTM: number | null;
  dividendPayoutRatioTTM: number | null;
};

export type StockData = ProfileData &
  KeyMetricsData &
  RatiosData & {
    updatedDate: string;
  };

export const fetchStockData = unstable_cache(
  async (symbol: string): Promise<StockData | null> => {
    console.log(`CACHE MISS: Hitting Firestore for ${symbol}`);
    const docRef = adminDb.collection("stocks").doc(symbol.toUpperCase());

    try {
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        console.warn(`No stock data found in Firestore for symbol: ${symbol}`);
        return null;
      }

      return docSnap.data() as StockData;
    } catch (error) {
      console.error(
        `Error fetching stock data for ${symbol} from Firestore:`,
        error,
      );
      return null;
    }
  },

  ["stock_data"],

  {
    revalidate: 86400,
  },
);
