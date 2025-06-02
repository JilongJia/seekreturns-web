import type { QuickRatioAnalysisResult } from "@/app/lib/stock-analysis/getQuickRatioAnalysis";

type GenerateQuickRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneQuickRatioValue: number;
  stockOneAnalysisResult: QuickRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoQuickRatioValue: number;
  stockTwoAnalysisResult: QuickRatioAnalysisResult;
};

type DescriptiveQuickRatioCategory = "Low" | "Other";

export function generateQuickRatioCommentary({
  stockOneSymbol,
  stockOneQuickRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoQuickRatioValue,
  stockTwoAnalysisResult,
}: GenerateQuickRatioCommentaryParams): string {
  const stockOneQuickRatioString = stockOneQuickRatioValue.toFixed(2);
  const stockTwoQuickRatioString = stockTwoQuickRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveQuickRatioCategory;
  if (stockOneAnalysisResult.category === "Low") {
    stockOneDescriptiveCategory = "Low";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveQuickRatioCategory;
  if (stockTwoAnalysisResult.category === "Low") {
    stockTwoDescriptiveCategory = "Low";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Low_Low":
      return `${stockOneSymbol}’s quick ratio of ${stockOneQuickRatioString} and ${stockTwoSymbol}’s quick ratio of ${stockTwoQuickRatioString} are both considered low. For ${stockOneSymbol}, this low ratio indicates that its most liquid assets (excluding inventory) may not be sufficient to cover its immediate liabilities, suggesting potential pressure on its short-term solvency. ${stockTwoSymbol}’s low quick ratio also points to constrained immediate liquidity, potentially highlighting a heavy reliance on converting inventory to meet its short-term financial obligations.`;
    case "Low_Other":
      return `${stockOneSymbol}’s quick ratio of ${stockOneQuickRatioString} is low. This suggests potential difficulty in meeting its immediate financial responsibilities with its most liquid assets (excluding inventory), possibly indicating a greater dependence on inventory turnover to service short-term debts.`;
    case "Other_Low":
      return `${stockTwoSymbol}’s quick ratio of ${stockTwoQuickRatioString} is low. This indicates that its readily available liquid assets, excluding inventory, might provide a thin cushion for its short-term obligations, highlighting potential constraints on its immediate debt-paying ability without selling inventory.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
