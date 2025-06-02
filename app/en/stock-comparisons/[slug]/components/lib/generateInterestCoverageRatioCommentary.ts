import type { InterestCoverageRatioAnalysisResult } from "@/app/lib/stock-analysis/getInterestCoverageRatioAnalysis";

type GenerateInterestCoverageRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneInterestCoverageRatioValue: number;
  stockOneAnalysisResult: InterestCoverageRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoInterestCoverageRatioValue: number;
  stockTwoAnalysisResult: InterestCoverageRatioAnalysisResult;
};

type DescriptiveInterestCoverageRatioCategory =
  | "Negative"
  | "CriticallyLow"
  | "Other";

export function generateInterestCoverageRatioCommentary({
  stockOneSymbol,
  stockOneInterestCoverageRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoInterestCoverageRatioValue,
  stockTwoAnalysisResult,
}: GenerateInterestCoverageRatioCommentaryParams): string {
  const stockOneICRString = stockOneInterestCoverageRatioValue.toFixed(2);
  const stockTwoICRString = stockTwoInterestCoverageRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveInterestCoverageRatioCategory;
  if (stockOneAnalysisResult.category === "Negative") {
    stockOneDescriptiveCategory = "Negative";
  } else if (stockOneAnalysisResult.category === "CriticallyLow") {
    stockOneDescriptiveCategory = "CriticallyLow";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveInterestCoverageRatioCategory;
  if (stockTwoAnalysisResult.category === "Negative") {
    stockTwoDescriptiveCategory = "Negative";
  } else if (stockTwoAnalysisResult.category === "CriticallyLow") {
    stockTwoDescriptiveCategory = "CriticallyLow";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Negative_Negative":
      return `${stockOneSymbol}’s Interest Coverage Ratio (ICR) of ${stockOneICRString} and ${stockTwoSymbol}’s ICR of ${stockTwoICRString} are both negative. For ${stockOneSymbol}, a negative ICR means its operating earnings are insufficient to cover its interest expenses, a critical indicator of financial distress. ${stockTwoSymbol}’s negative ICR likewise signals severe difficulty in servicing its debt and raises concerns about its ongoing financial stability.`;
    case "Negative_CriticallyLow":
      return `${stockOneSymbol}’s Interest Coverage Ratio (ICR) of ${stockOneICRString} is negative, signifying its operating earnings are not covering its interest payments, which is a major financial concern. ${stockTwoSymbol}’s ICR of ${stockTwoICRString} is critically low, indicating its earnings provide very little cushion for its interest obligations, posing a high risk to its debt servicing ability.`;
    case "Negative_Other":
      return `${stockOneSymbol}’s Interest Coverage Ratio (ICR) of ${stockOneICRString} is negative. This implies its operating earnings are insufficient to meet its interest expenses, a serious situation that threatens its financial stability and capacity to honor debt commitments.`;
    case "CriticallyLow_Negative":
      return `${stockOneSymbol}’s Interest Coverage Ratio (ICR) of ${stockOneICRString} is critically low, suggesting its ability to meet interest obligations from operating earnings is strained. ${stockTwoSymbol} is in a more precarious position with a negative ICR of ${stockTwoICRString}, meaning its operating earnings do not cover its interest expenses at all.`;
    case "CriticallyLow_CriticallyLow":
      return `${stockOneSymbol}’s Interest Coverage Ratio (ICR) of ${stockOneICRString} and ${stockTwoSymbol}’s ICR of ${stockTwoICRString} are both critically low. For ${stockOneSymbol}, this indicates its operating earnings offer a very slim margin over interest expenses, posing a significant risk to its debt servicing capabilities. ${stockTwoSymbol}’s critically low ICR also highlights a precarious financial situation, with minimal capacity to absorb any decline in earnings before having difficulty with interest payments.`;
    case "CriticallyLow_Other":
      return `${stockOneSymbol}’s Interest Coverage Ratio (ICR) of ${stockOneICRString} is critically low. This signifies that its operating income provides a very thin cushion over its interest expenses, highlighting a vulnerable financial state and considerable risk regarding its ability to consistently service its debt.`;
    case "Other_Negative":
      return `${stockTwoSymbol}’s Interest Coverage Ratio (ICR) of ${stockTwoICRString} is negative. This signals that its current operating earnings are insufficient to meet its interest obligations, a critical red flag for its financial health and capacity to manage its debt.`;
    case "Other_CriticallyLow":
      return `${stockTwoSymbol}’s Interest Coverage Ratio (ICR) of ${stockTwoICRString} is critically low. This indicates that its margin of safety for covering interest payments is very narrow, suggesting potential difficulties in meeting these obligations if earnings decrease even slightly.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
