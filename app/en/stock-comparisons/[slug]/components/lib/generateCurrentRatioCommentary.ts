import type { CurrentRatioAnalysisResult } from "@/app/lib/stock-analysis/getCurrentRatioAnalysis";

type GenerateCurrentRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneCurrentRatioValue: number;
  stockOneAnalysisResult: CurrentRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoCurrentRatioValue: number;
  stockTwoAnalysisResult: CurrentRatioAnalysisResult;
};

type DescriptiveCurrentRatioCategory = "Low" | "Other";

export function generateCurrentRatioCommentary({
  stockOneSymbol,
  stockOneCurrentRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoCurrentRatioValue,
  stockTwoAnalysisResult,
}: GenerateCurrentRatioCommentaryParams): string {
  const stockOneCurrentRatioString = stockOneCurrentRatioValue.toFixed(2);
  const stockTwoCurrentRatioString = stockTwoCurrentRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveCurrentRatioCategory;
  if (stockOneAnalysisResult.category === "Low") {
    stockOneDescriptiveCategory = "Low";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveCurrentRatioCategory;
  if (stockTwoAnalysisResult.category === "Low") {
    stockTwoDescriptiveCategory = "Low";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Low_Low":
      return `${stockOneSymbol}’s current ratio of ${stockOneCurrentRatioString} and ${stockTwoSymbol}’s current ratio of ${stockTwoCurrentRatioString} are both considered low. For ${stockOneSymbol}, this level suggests it might encounter challenges in using its current assets to satisfy its immediate financial obligations. ${stockTwoSymbol}’s low current ratio also points to potential constraints on its liquidity, meaning it could find it difficult to cover short-term liabilities with its available assets.`;
    case "Low_Other":
      return `${stockOneSymbol}’s current ratio of ${stockOneCurrentRatioString} is considered low. This may signal potential challenges with its short-term liquidity, implying that its current assets might offer a limited buffer for meeting its immediate debts and could affect its capacity to smoothly manage upcoming financial duties.`;
    case "Other_Low":
      return `${stockTwoSymbol}’s current ratio of ${stockTwoCurrentRatioString} falls into the low category. This can indicate potential stress on the company's ability to address its short-term liabilities, suggesting that its liquid assets may not provide a strong safety margin over its immediate financial commitments, possibly impacting its operational flexibility.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
