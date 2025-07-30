import { storage } from "./client";
import { unstable_cache } from "next/cache";

export type StockAdjustedClosesPricePoint = {
  date: string;
  adjClose: number | null;
};

export type StockAdjustedClosesData = {
  symbol: string;
  series: StockAdjustedClosesPricePoint[];
};

export const fetchStockAdjustedCloses = unstable_cache(
  async (symbol: string): Promise<StockAdjustedClosesData | null> => {
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

      const sanitizedString = dataString.replace(/NaN/g, "null");

      const data = JSON.parse(sanitizedString);

      return data as StockAdjustedClosesData;
    } catch (error) {
      console.error(
        `Error fetching or parsing adjusted close data for ${symbol} from Cloud Storage:`,
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
