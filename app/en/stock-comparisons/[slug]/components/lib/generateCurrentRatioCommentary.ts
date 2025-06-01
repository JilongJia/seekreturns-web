import type { CurrentRatioAnalysisResult } from "@/app/lib/stock-analysis/getCurrentRatioAnalysis";

export type GenerateCurrentRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneCurrentRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: CurrentRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoCurrentRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: CurrentRatioAnalysisResult;
};

type DescriptiveCurrentRatioCategory = "Low" | "Other";

export function generateCurrentRatioCommentary({
  stockOneSymbol,
  stockOneCurrentRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoCurrentRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- Stock 1: DefaultStandardApplied ---

    case "DefaultStandardApplied_Low_DefaultStandardApplied_Low":
      return `Both ${stockOneSymbol} (Current Ratio: ${stockOneCurrentRatioString}) and ${stockTwoSymbol} (Current Ratio: ${stockTwoCurrentRatioString}) exhibit low current ratios. This suggests that each company might face challenges in comfortably meeting their upcoming short-term financial responsibilities.`;

    case "DefaultStandardApplied_Low_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s current ratio of ${stockOneCurrentRatioString} is low, indicating potential pressure on its short-term liquidity. This suggests its current assets may not provide a substantial cushion over its immediate obligations.`;

    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `${stockOneSymbol} shows a low current ratio of ${stockOneCurrentRatioString}. Similarly, ${stockTwoSymbol}’s ratio of ${stockTwoCurrentRatioString} is considered low, especially within the ${stockTwoIndustry} sector. Both companies could experience constraints on their working capital.`;

    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `With a current ratio of ${stockOneCurrentRatioString}, ${stockOneSymbol} appears to have limited capacity to cover its short-term liabilities with its current assets.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Low":
      return `${stockTwoSymbol}’s current ratio of ${stockTwoCurrentRatioString} is low. This may indicate that its readily available assets might not sufficiently cover upcoming liabilities, potentially straining its financial flexibility.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";

    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `${stockTwoSymbol}’s current ratio of ${stockTwoCurrentRatioString} is deemed low for the ${stockTwoIndustry} industry. This highlights potential difficulties for the company in managing its short-term financial duties compared to its industry peers.`;

    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---

    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Low":
      return `${stockOneSymbol}’s current ratio of ${stockOneCurrentRatioString} is considered low for the ${stockOneIndustry} sector. When combined with ${stockTwoSymbol}’s low ratio of ${stockTwoCurrentRatioString}, it suggests that both companies may have vulnerabilities in their short-term financial stability.`;

    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Other":
      return `For a company in the ${stockOneIndustry} industry, ${stockOneSymbol}’s current ratio of ${stockOneCurrentRatioString} is on the lower side. This implies that its cushion of current assets over short-term debts might be less than optimal for its specific sector.`;

    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `Both companies display current ratios that are low relative to their respective industries: ${stockOneSymbol} (CR: ${stockOneCurrentRatioString}) in the ${stockOneIndustry} sector, and ${stockTwoSymbol} (CR: ${stockTwoCurrentRatioString}) in the ${stockTwoIndustry} sector. This suggests each might encounter difficulties in meeting near-term liabilities when compared to industry norms.`;

    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol}’s current ratio of ${stockOneCurrentRatioString} is deemed low against benchmarks for the ${stockOneIndustry} industry. This raises considerations about its capacity to comfortably satisfy short-term creditor obligations within its operational context.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Low":
      return `${stockTwoSymbol} has a current ratio of ${stockTwoCurrentRatioString}, which is low. This suggests a potential imbalance between its current assets and its maturing short-term financial responsibilities.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";

    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `Relative to the ${stockTwoIndustry} industry, ${stockTwoSymbol}’s current ratio of ${stockTwoCurrentRatioString} is considered low. This could point to a more constrained working capital situation for ${stockTwoSymbol} than is typical for its peers.`;

    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
