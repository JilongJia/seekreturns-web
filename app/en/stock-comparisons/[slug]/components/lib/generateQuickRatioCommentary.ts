import type { QuickRatioAnalysisResult } from "@/app/lib/stock-analysis/getQuickRatioAnalysis";

export type GenerateQuickRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneQuickRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: QuickRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoQuickRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: QuickRatioAnalysisResult;
};

type DescriptiveQuickRatioCategory = "Low" | "Other";

export function generateQuickRatioCommentary({
  stockOneSymbol,
  stockOneQuickRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoQuickRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- Stock 1: DefaultStandardApplied ---
    case "DefaultStandardApplied_Low_DefaultStandardApplied_Low":
      return `Immediate liquidity appears constrained for both ${stockOneSymbol} (Quick Ratio: ${stockOneQuickRatioString}) and ${stockTwoSymbol} (Quick Ratio: ${stockTwoQuickRatioString}). Their low quick ratios suggest a potential shortfall in highly liquid assets (excluding inventory) to cover pressing short-term debts.`;
    case "DefaultStandardApplied_Low_DefaultStandardApplied_Other":
      return `${stockOneSymbol} presents a low quick ratio of ${stockOneQuickRatioString}, raising questions about its capacity to meet immediate liabilities using only its most liquid assets (excluding inventory).`;
    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `${stockOneSymbol} shows a low quick ratio of ${stockOneQuickRatioString}. Similarly, ${stockTwoSymbol}’s quick ratio of ${stockTwoQuickRatioString} is considered low for the ${stockTwoIndustry} industry, indicating both might rely on inventory sales to service short-term debt.`;
    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `The ability of ${stockOneSymbol} to satisfy short-term obligations without selling inventory appears limited, as shown by its low quick ratio of ${stockOneQuickRatioString}.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Low":
      return `For ${stockTwoSymbol}, the quick ratio of ${stockTwoQuickRatioString} is low. This highlights a potential dependence on converting inventory to cash to satisfy its short-term financial obligations.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `${stockTwoSymbol}’s quick ratio stands at ${stockTwoQuickRatioString}, a level deemed low for the ${stockTwoIndustry} industry. This may indicate a tighter position for immediate debt coverage compared to its peers.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---
    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Low":
      return `A low quick ratio of ${stockOneQuickRatioString} for ${stockOneSymbol} (low for the ${stockOneIndustry} industry) combined with ${stockTwoSymbol}’s low ratio of ${stockTwoQuickRatioString}, signals that both companies might find it challenging to meet immediate creditor demands without liquidating inventory.`;
    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Other":
      return `Considering the ${stockOneIndustry} industry context, ${stockOneSymbol}’s quick ratio of ${stockOneQuickRatioString} is low, suggesting a potential vulnerability in its immediate liquidity (assets excluding inventory).`;
    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `Low quick ratios, based on their respective industry benchmarks, are registered by ${stockOneSymbol} (Quick Ratio: ${stockOneQuickRatioString}, for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (Quick Ratio: ${stockTwoQuickRatioString}, for the ${stockTwoIndustry} industry). This points to a possible over-reliance on less liquid current assets like inventory.`;
    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `The quick ratio for ${stockOneSymbol} (${stockOneQuickRatioString}) is low relative to norms in the ${stockOneIndustry} industry, indicating that its most readily available assets (net of inventory) may be insufficient for its immediate liabilities.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Low":
      return `An examination of ${stockTwoSymbol} reveals a low quick ratio of ${stockTwoQuickRatioString}. This could mean it has a reduced capacity to address immediate liabilities without needing to sell off inventory.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `Within the ${stockTwoIndustry} sector, ${stockTwoSymbol}’s quick ratio of ${stockTwoQuickRatioString} is assessed as low, potentially reflecting less immediate liquidity than typically expected for its industry peers.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
