import type { InterestCoverageRatioAnalysisResult } from "@/app/lib/stock-analysis/getInterestCoverageRatioAnalysis";

export type GenerateInterestCoverageRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneInterestCoverageRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: InterestCoverageRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoInterestCoverageRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: InterestCoverageRatioAnalysisResult;
};

type DescriptiveInterestCoverageRatioCategory =
  | "Negative"
  | "CriticallyLow"
  | "Other";

export function generateInterestCoverageRatioCommentary({
  stockOneSymbol,
  stockOneInterestCoverageRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoInterestCoverageRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- Stock 1: DefaultStandardApplied ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `A dire financial picture emerges for ${stockOneSymbol} (ICR: ${stockOneICRString}) and ${stockTwoSymbol} (ICR: ${stockTwoICRString}), as both show negative interest coverage. This indicates operating earnings are insufficient to meet interest expenses, a severe warning for both.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_CriticallyLow":
      return `${stockOneSymbol}’s negative ICR of ${stockOneICRString} highlights an inability to cover interest with operating earnings. ${stockTwoSymbol}’s ICR of ${stockTwoICRString} is also critically low, placing both under extreme pressure to service their debts.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `The interest coverage ratio for ${stockOneSymbol} is ${stockOneICRString}, signaling negative operating earnings. This means its income cannot cover interest payments, a critical financial vulnerability.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s ICR of ${stockOneICRString} (negative operating earnings) is deeply concerning. ${stockTwoSymbol} mirrors this with an ICR of ${stockTwoICRString}, also negative, signaling severe distress regarding debt obligations.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_CriticallyLow":
      return `Negative operating earnings are evident for ${stockOneSymbol} (ICR: ${stockOneICRString}). ${stockTwoSymbol}’s ICR of ${stockTwoICRString} is critically low for the ${stockTwoIndustry} industry, suggesting both firms face significant challenges in meeting interest payments.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `An ICR of ${stockOneICRString} for ${stockOneSymbol} indicates negative operating earnings, making it unable to meet interest expenses—a serious financial red flag.`;

    case "DefaultStandardApplied_CriticallyLow_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s ICR of ${stockOneICRString} is critically low, struggling to meet interest obligations. ${stockTwoSymbol} is in a worse state with a negative ICR of ${stockTwoICRString}, unable to cover interest from operations.`;
    case "DefaultStandardApplied_CriticallyLow_DefaultStandardApplied_CriticallyLow":
      return `Both ${stockOneSymbol} (ICR: ${stockOneICRString}) and ${stockTwoSymbol} (ICR: ${stockTwoICRString}) possess critically low interest coverage ratios, creating a high risk of difficulty in fulfilling their debt interest commitments.`;
    case "DefaultStandardApplied_CriticallyLow_DefaultStandardApplied_Other":
      return `The ICR for ${stockOneSymbol} (${stockOneICRString}) is critically low. This implies its operating income barely covers, or possibly fails to cover, its interest expenses, indicating a precarious financial position.`;
    case "DefaultStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s ICR (${stockOneICRString}) is critically low. ${stockTwoSymbol} faces even more severe issues, with a negative ICR of ${stockTwoICRString}, highlighting an inability to cover interest from operations.`;
    case "DefaultStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_CriticallyLow":
      return `Both ${stockOneSymbol} (ICR: ${stockOneICRString}) and ${stockTwoSymbol} (ICR: ${stockTwoICRString}, critically low for the ${stockTwoIndustry} industry) demonstrate that their operating earnings are insufficient to comfortably manage their respective interest payments.`;
    case "DefaultStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Other":
      return `A critically low interest coverage ratio of ${stockOneICRString} for ${stockOneSymbol} suggests its operating income is stretched thin over interest expenses, posing substantial financial risk.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}’s interest coverage ratio of ${stockTwoICRString} reveals negative operating earnings, making it unable to cover interest payments—a critical financial issue.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_CriticallyLow":
      return `${stockTwoSymbol}’s ICR of ${stockTwoICRString} is critically low, indicating that its operating income does not sufficiently cover interest expenses, which is a financial concern.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `An ICR of ${stockTwoICRString} for ${stockTwoSymbol} signifies negative operating earnings, a particularly alarming sign regarding its capacity to service debt.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_CriticallyLow":
      return `Within the ${stockTwoIndustry} industry, ${stockTwoSymbol}’s ICR of ${stockTwoICRString} is critically low, suggesting its operating income is inadequate for its interest obligations.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} (ICR: ${stockOneICRString}) shows negative interest coverage, a major concern. ${stockTwoSymbol} echoes this with a negative ICR of ${stockTwoICRString}, signaling severe financial distress for both.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_CriticallyLow":
      return `The negative ICR of ${stockOneICRString} for ${stockOneSymbol} is a critical issue. ${stockTwoSymbol}’s ICR of ${stockTwoICRString} is also critically low. Both companies face profound challenges in servicing their debt.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `An ICR of ${stockOneICRString} for ${stockOneSymbol} indicates its operating earnings are negative, a critical situation concerning its ability to meet interest payments.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `Negative interest coverage plagues both ${stockOneSymbol} (ICR: ${stockOneICRString}) and ${stockTwoSymbol} (ICR: ${stockTwoICRString}), a critical warning regarding their operational profitability and debt servicing capacity.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_CriticallyLow":
      return `${stockOneSymbol}’s negative ICR of ${stockOneICRString} represents a major financial concern. ${stockTwoSymbol}’s ICR of ${stockTwoICRString} (critically low for the ${stockTwoIndustry} industry) also points to high financial risk.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `For ${stockOneSymbol}, an ICR of ${stockOneICRString} signifies negative operating earnings, posing a severe threat to its ability to cover interest expenses.`;

    case "IndustrySpecificStandardApplied_CriticallyLow_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s ICR of ${stockOneICRString} (critically low for the ${stockOneIndustry} industry) presents a concern. ${stockTwoSymbol} is in a more dire state with a negative ICR of ${stockTwoICRString}.`;
    case "IndustrySpecificStandardApplied_CriticallyLow_DefaultStandardApplied_CriticallyLow":
      return `A critically low ICR for ${stockOneSymbol} (${stockOneICRString}, for the ${stockOneIndustry} industry) and a similarly low ICR for ${stockTwoSymbol} (${stockTwoICRString}) both signal a high risk of difficulty meeting interest payments.`;
    case "IndustrySpecificStandardApplied_CriticallyLow_DefaultStandardApplied_Other":
      return `The interest coverage ratio for ${stockOneSymbol} (${stockOneICRString}) is critically low for the ${stockOneIndustry} industry, as its operating income scarcely covers (or fails to cover) interest costs.`;
    case "IndustrySpecificStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s ICR of ${stockOneICRString} is critically low for the ${stockOneIndustry} industry. ${stockTwoSymbol} (ICR: ${stockTwoICRString}) reports negative coverage, indicating even more severe operational issues relative to its interest obligations.`;
    case "IndustrySpecificStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_CriticallyLow":
      return `Both ${stockOneSymbol} (ICR: ${stockOneICRString}, critically low for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (ICR: ${stockTwoICRString}, critically low for the ${stockTwoIndustry} industry) have operating earnings that are insufficient to comfortably meet their interest payment duties.`;
    case "IndustrySpecificStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Other":
      return `Operating income for ${stockOneSymbol} (ICR: ${stockOneICRString}) barely covers (or is less than) its interest expenses, a status considered critically low for the ${stockOneIndustry} industry.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} faces a critical financial concern, as its ICR of ${stockTwoICRString} indicates negative operating earnings, insufficient to cover its interest payments.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_CriticallyLow":
      return `${stockTwoSymbol}’s interest coverage ratio of ${stockTwoICRString} is critically low, implying its operating income provides inadequate coverage for interest expenses and signaling significant financial risk.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `The ICR for ${stockTwoSymbol} (${stockTwoICRString}) shows negative operating earnings, a particularly troubling sign regarding its debt servicing ability.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_CriticallyLow":
      return `An ICR of ${stockTwoICRString} for ${stockTwoSymbol} is considered critically low within the ${stockTwoIndustry} industry, suggesting that its operational earnings are not enough to meet interest obligations.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
