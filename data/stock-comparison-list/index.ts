import jsonData from "./stock-comparison-list.json";
import type { StockComparisonItem } from "./types";

export const stockComparisonList: StockComparisonItem[] =
  jsonData as StockComparisonItem[];
export type { StockComparisonItem };
