import { storage } from "./client";
import { unstable_cache } from "next/cache";

export type PricePoint = {
  date: string;
  adjClose: number;
};

export type StockAdjustedCloseData = {
  symbol: string;
  series: PricePoint[];
};

export const fetchStockAdjustedCloseData = unstable_cache(
  async (symbol: string): Promise<StockAdjustedCloseData | null> => {
    console.log(
      `CACHE MISS: Hitting Cloud Storage for adjusted close data: ${symbol}`,
    );

    const bucketName = "seekreturns-stock-data";
    const filePath = `adjusted-close/${symbol.toUpperCase()}.json`;

    try {
      const fileContents = await storage
        .bucket(bucketName)
        .file(filePath)
        .download();

      const dataString = fileContents[0].toString("utf8");
      const data = JSON.parse(dataString);

      return data as StockAdjustedCloseData;
    } catch (error) {
      console.error(
        `Error fetching adjusted close data for ${symbol} from Cloud Storage:`,
        error,
      );
      return null;
    }
  },
  ["stock_adjusted_close_data"],
  {
    revalidate: 86400,
  },
);
