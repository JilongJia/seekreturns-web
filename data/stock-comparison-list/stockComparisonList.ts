import stockComparisonData from "./stock-comparison-list.json";
import type { StockComparisonItem } from "./types";

export const stockComparisonList: StockComparisonItem[] =
  stockComparisonData as StockComparisonItem[];
