import { adminDb } from "./admin";
import { unstable_cache } from "next/cache";
import type { StockInfoData } from "@/constants/stock";

export const fetchStockInfo = unstable_cache(
  async (symbol: string): Promise<StockInfoData | null> => {
    console.log(`CACHE MISS: Hitting Firestore for stock data: ${symbol}`);

    const docRef = adminDb
      .collection("stockProfileAndFinancials")
      .doc(symbol.toUpperCase());

    try {
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        console.warn(`No stock data found in Firestore for symbol: ${symbol}`);
        return null;
      }

      return docSnap.data() as StockInfoData;
    } catch (error) {
      console.error(
        `Error fetching stock data for ${symbol} from Firestore:`,
        error,
      );
      return null;
    }
  },
  ["stock_info_data"],
  {
    revalidate: 86400,
  },
);
