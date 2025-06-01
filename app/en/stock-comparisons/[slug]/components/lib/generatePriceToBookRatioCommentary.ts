import type { PriceToBookRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToBookRatioAnalysis";

export type GeneratePriceToBookRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToBookRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: PriceToBookRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToBookRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: PriceToBookRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToBookRatioCommentary({
  stockOneSymbol,
  stockOnePriceToBookRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToBookRatioValue,
  stockTwoIndustry,
  stockTwoAnalysisResult,
}: GeneratePriceToBookRatioCommentaryParams): string {
  const stockOnePriceToBookRatioString =
    stockOnePriceToBookRatioValue.toFixed(2);
  const stockTwoPriceToBookRatioString =
    stockTwoPriceToBookRatioValue.toFixed(2);

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

  let stockOneDescriptiveCategory: DescriptiveCategory;
  if (stockOneAnalysisResult.category === "Negative") {
    stockOneDescriptiveCategory = "Negative";
  } else if (stockOneAnalysisResult.category === "VeryHigh") {
    stockOneDescriptiveCategory = "VeryHigh";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveCategory;
  if (stockTwoAnalysisResult.category === "Negative") {
    stockTwoDescriptiveCategory = "Negative";
  } else if (stockTwoAnalysisResult.category === "VeryHigh") {
    stockTwoDescriptiveCategory = "VeryHigh";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `Negative book values are reported by ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) and ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}). This signals serious concerns regarding the financial stability and solvency of both companies.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}’s P/B ratio of ${stockOnePriceToBookRatioString} indicates a negative book value, a critical financial concern. In contrast, ${stockTwoSymbol} has a very high P/B ratio of ${stockTwoPriceToBookRatioString}, suggesting the market places a high premium on its net assets.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} has a P/B ratio of ${stockOnePriceToBookRatioString}, indicating negative shareholder equity, which is a significant red flag regarding its financial health.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s P/B ratio of ${stockOnePriceToBookRatioString} reflects a negative book value, a major financial concern. ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) also shows a negative book value, a critical issue for both companies.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `A negative book value for ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) raises solvency questions. ${stockTwoSymbol}’s P/B ratio of ${stockTwoPriceToBookRatioString} is considered very high for the ${stockTwoIndustry} industry, indicating a high market premium over its net assets.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `The P/B ratio of ${stockOnePriceToBookRatioString} for ${stockOneSymbol} signals negative book value, a serious indicator of financial distress.`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s P/B ratio of ${stockOnePriceToBookRatioString} is very high, meaning investors pay a significant premium over its book value. ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) has a negative book value, a critical solvency concern. Both present distinct risks.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `Very high P/B ratios characterize ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) and ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}). This typically suggests the market values both companies substantially more than their net accounting worth, possibly due to strong intangibles or high growth expectations.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `The P/B ratio for ${stockOneSymbol} is very high at ${stockOnePriceToBookRatioString}, indicating the market assigns a substantial premium to its net assets, often reflecting strong ROE or growth prospects.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s very high P/B ratio of ${stockOnePriceToBookRatioString} suggests a high market premium. ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) faces critical financial issues with a negative book value.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) and ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}, which is very high for the ${stockTwoIndustry} industry) trade at significant premiums to their book values.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A very high P/B ratio of ${stockOnePriceToBookRatioString} for ${stockOneSymbol} signifies a strong market valuation premium over its accounting net worth.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) reports a negative book value, which is a serious indicator of financial instability.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol}’s P/B ratio of ${stockTwoPriceToBookRatioString} is very high, suggesting investors value its assets and future prospects at a significant premium to its accounting book value.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `The P/B ratio for ${stockTwoSymbol} (${stockTwoPriceToBookRatioString}) indicates negative book value, a critical financial concern.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `For the ${stockTwoIndustry} industry, ${stockTwoSymbol}’s P/B ratio of ${stockTwoPriceToBookRatioString} is considered very high, indicating a strong market premium over its net assets.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) shows a negative book value, a severe financial warning. ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) also has a negative book value, highlighting solvency risks for both.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `A negative book value (P/B: ${stockOnePriceToBookRatioString}) is a critical issue for ${stockOneSymbol}. ${stockTwoSymbol}’s P/B ratio of ${stockTwoPriceToBookRatioString} is very high, indicating distinct financial considerations for each company.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s P/B ratio of ${stockOnePriceToBookRatioString} indicates a negative book value, a significant financial stability concern.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `Both ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) and ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) report negative book values, a serious red flag for financial health.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `While ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}) suffers from a negative book value, ${stockTwoSymbol}’s P/B of ${stockTwoPriceToBookRatioString} is considered very high for the ${stockTwoIndustry} industry, representing different forms of financial extremity.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `The negative P/B ratio of ${stockOnePriceToBookRatioString} for ${stockOneSymbol} is a critical concern, signaling potential insolvency.`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s P/B ratio of ${stockOnePriceToBookRatioString} is very high for the ${stockOneIndustry} industry. In contrast, ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) has a negative book value, a severe financial problem.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString}, very high for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}, also very high) both show that the market values them substantially above their net asset values.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `For a company in the ${stockOneIndustry} industry, ${stockOneSymbol}’s P/B ratio of ${stockOnePriceToBookRatioString} is considered very high, suggesting a strong market premium over its book value.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `The P/B ratio for ${stockOneSymbol} (${stockOnePriceToBookRatioString}) is notably high for the ${stockOneIndustry} industry. ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) reports a negative book value, a critical financial issue. These highlight distinct areas of financial concern for both companies.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Relative to their respective industries, both ${stockOneSymbol} (P/B: ${stockOnePriceToBookRatioString} for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString} for the ${stockTwoIndustry} industry) exhibit very high P/B ratios, reflecting significant market premiums.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A P/B ratio of ${stockOnePriceToBookRatioString} for ${stockOneSymbol} is considered very high within the ${stockOneIndustry} industry, possibly due to high ROE, intangible assets, or growth expectations.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (P/B: ${stockTwoPriceToBookRatioString}) has a negative book value, indicating serious financial instability.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `The market places a high premium on ${stockTwoSymbol}, as evidenced by its very high P/B ratio of ${stockTwoPriceToBookRatioString}.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol}’s negative P/B ratio of ${stockTwoPriceToBookRatioString} is a critical concern regarding its financial solvency.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} shows a P/B ratio of ${stockTwoPriceToBookRatioString}, which is very high for the ${stockTwoIndustry} sector, indicating a substantial market premium over its net asset value.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
