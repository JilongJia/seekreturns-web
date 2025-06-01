import type { DebtToEquityRatioAnalysisResult } from "@/app/lib/stock-analysis/getDebtToEquityRatioAnalysis";

export type GenerateDebtToEquityRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneDebtToEquityRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: DebtToEquityRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoDebtToEquityRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: DebtToEquityRatioAnalysisResult;
};

type DescriptiveDebtToEquityRatioCategory = "Negative" | "VeryHigh" | "Other";

export function generateDebtToEquityRatioCommentary({
  stockOneSymbol,
  stockOneDebtToEquityRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoDebtToEquityRatioValue,
  stockTwoIndustry,
  stockTwoAnalysisResult,
}: GenerateDebtToEquityRatioCommentaryParams): string {
  const stockOneDebtToEquityRatioString =
    stockOneDebtToEquityRatioValue.toFixed(2);
  const stockTwoDebtToEquityRatioString =
    stockTwoDebtToEquityRatioValue.toFixed(2);

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

  let stockOneDescriptiveCategory: DescriptiveDebtToEquityRatioCategory;
  if (stockOneAnalysisResult.category === "Negative") {
    stockOneDescriptiveCategory = "Negative";
  } else if (stockOneAnalysisResult.category === "VeryHigh") {
    stockOneDescriptiveCategory = "VeryHigh";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveDebtToEquityRatioCategory;
  if (stockTwoAnalysisResult.category === "Negative") {
    stockTwoDescriptiveCategory = "Negative";
  } else if (stockTwoAnalysisResult.category === "VeryHigh") {
    stockTwoDescriptiveCategory = "VeryHigh";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- Stock 1: DefaultStandardApplied ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `A critical financial situation is apparent for both ${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}) and ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}), as both report negative shareholder equity, pointing to severe solvency risks.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}’s D/E ratio of ${stockOneDebtToEquityRatioString} indicates negative equity, a serious financial health concern. ${stockTwoSymbol} also demonstrates high risk with a D/E ratio of ${stockTwoDebtToEquityRatioString} that is very high.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `The D/E ratio for ${stockOneSymbol} is ${stockOneDebtToEquityRatioString}, reflecting negative shareholder equity. This is a significant red flag for its financial stability and solvency.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s negative D/E ratio of ${stockOneDebtToEquityRatioString} raises major solvency concerns. ${stockTwoSymbol} also has a negative D/E of ${stockTwoDebtToEquityRatioString}, a dire situation indicating critical financial instability for both companies.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `A D/E ratio of ${stockOneDebtToEquityRatioString} signifies negative equity for ${stockOneSymbol}, a critical issue. ${stockTwoSymbol}’s D/E of ${stockTwoDebtToEquityRatioString} is considered very high for the ${stockTwoIndustry} industry, highlighting substantial financial vulnerabilities for both firms.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `Negative shareholder equity is indicated by ${stockOneSymbol}’s D/E ratio of ${stockOneDebtToEquityRatioString}, posing a considerable threat to its financial soundness.`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} is operating with a very high debt load (D/E: ${stockOneDebtToEquityRatioString}). ${stockTwoSymbol} faces an even more precarious situation with negative equity (D/E: ${stockTwoDebtToEquityRatioString}), indicating severe issues for both.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `Exceptionally aggressive leverage is evident in both ${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}) and ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}), as both exhibit very high D/E ratios, signaling substantial financial risk.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `An exceptionally heavy debt burden and considerable financial risk are signified by ${stockOneSymbol}’s very high D/E ratio of ${stockOneDebtToEquityRatioString}.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s very high D/E ratio of ${stockOneDebtToEquityRatioString} points to high financial risk. ${stockTwoSymbol}, with a negative D/E of ${stockTwoDebtToEquityRatioString}, is in a critical state of negative equity, highlighting significant concerns for both.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `High leverage characterizes ${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}). ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}) also shows very high leverage, especially for the ${stockTwoIndustry} industry. Both indicate substantial financial risk.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `The D/E ratio for ${stockOneSymbol} (${stockOneDebtToEquityRatioString}) is very high, reflecting a significant reliance on debt and notable financial risk.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString} indicates negative shareholder equity, a sign of significant financial instability.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol}’s financial structure shows a very high D/E ratio of ${stockTwoDebtToEquityRatioString}, signaling a heavy debt load and considerable financial risk.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `Negative shareholder equity for ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}) is a critical issue, indicating severe financial distress.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `For the ${stockTwoIndustry} industry, ${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString} is considered very high, suggesting an aggressive debt structure that could impact its financial resilience.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}) reports negative equity, a critical financial concern. ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}) also shows negative equity, signaling severe financial distress for both.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `The negative D/E ratio of ${stockOneDebtToEquityRatioString} for ${stockOneSymbol} underscores critical financial health issues. ${stockTwoSymbol}’s D/E of ${stockTwoDebtToEquityRatioString} is also very high, presenting distinct and significant vulnerabilities for both entities.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s D/E ratio of ${stockOneDebtToEquityRatioString}, indicating negative shareholder equity, is a severe financial concern.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `Negative shareholder equity is a critical indicator of financial instability for both ${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}) and ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}).`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `A D/E ratio of ${stockOneDebtToEquityRatioString}, indicating negative equity for ${stockOneSymbol}, is an alarming sign. ${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString} is also considered very high for the ${stockTwoIndustry} industry, representing substantial financial risks for both.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `A D/E ratio of ${stockOneDebtToEquityRatioString} for ${stockOneSymbol}, reflecting negative equity, is a major concern for its financial stability.`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `The D/E ratio for ${stockOneSymbol} (${stockOneDebtToEquityRatioString}) is very high for the ${stockOneIndustry} industry, indicating high financial risk. ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}) faces critical issues due to negative equity.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}, very high for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}, also very high) are operating with exceptionally high leverage, a risky financial position.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `A D/E ratio of ${stockOneDebtToEquityRatioString}, considered very high for the ${stockOneIndustry} industry, suggests ${stockOneSymbol} carries an exceptionally heavy debt burden.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s D/E ratio (${stockOneDebtToEquityRatioString}), very high for the ${stockOneIndustry} industry, is a concern. ${stockTwoSymbol}’s D/E (${stockTwoDebtToEquityRatioString}) indicates negative equity. Both situations underscore critical financial issues.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (D/E: ${stockOneDebtToEquityRatioString}, very high for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (D/E: ${stockTwoDebtToEquityRatioString}, very high for the ${stockTwoIndustry} industry) exhibit very high D/E ratios, pointing to aggressive leverage and substantial financial risk based on their industry contexts.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `Within the ${stockOneIndustry} industry, ${stockOneSymbol}’s D/E ratio of ${stockOneDebtToEquityRatioString} is very high, highlighting a considerable debt load and associated financial risks.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString}, indicating negative shareholder equity, is a significant concern for its financial stability.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `A very high D/E ratio of ${stockTwoDebtToEquityRatioString} for ${stockTwoSymbol} suggests an exceptionally heavy debt burden that poses considerable financial risk.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `For ${stockTwoSymbol}, a D/E ratio of ${stockTwoDebtToEquityRatioString} reflecting negative equity is a critical sign of financial distress.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `The D/E ratio for ${stockTwoSymbol} (${stockTwoDebtToEquityRatioString}) is considered very high for the ${stockTwoIndustry} industry, pointing to an aggressive debt structure and potential resilience issues.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
