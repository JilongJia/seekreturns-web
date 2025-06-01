import type { ForwardPEGRatioAnalysisResult } from "@/app/lib/stock-analysis/getForwardPEGRatioAnalysis";

export type GenerateForwardPEGRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneForwardPEGRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: ForwardPEGRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoForwardPEGRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: ForwardPEGRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generateForwardPEGRatioCommentary({
  stockOneSymbol,
  stockOneForwardPEGRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoForwardPEGRatioValue,
  stockTwoIndustry,
  stockTwoAnalysisResult,
}: GenerateForwardPEGRatioCommentaryParams): string {
  const stockOneForwardPEGRatioString = stockOneForwardPEGRatioValue.toFixed(2);
  const stockTwoForwardPEGRatioString = stockTwoForwardPEGRatioValue.toFixed(2);

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
    // --- Stock 1: DefaultStandardApplied ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `Both ${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}) and ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) have problematic Forward PEG ratios, often indicating negative earnings, negative growth forecasts, or other factors that question their valuation relative to growth.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is unfavorable, suggesting issues with its earnings or growth outlook. Meanwhile, ${stockTwoSymbol}’s very high PEG ratio of ${stockTwoForwardPEGRatioString} points to a valuation that may be significantly outpacing its expected growth.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} has a Forward PEG ratio of ${stockOneForwardPEGRatioString}, which is unfavorable as it may stem from negative earnings or poor growth prospects.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is concerning. ${stockTwoSymbol} also shows a problematic PEG ratio of ${stockTwoForwardPEGRatioString}, signaling notable issues for both regarding their valuation relative to growth.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `The Forward PEG for ${stockOneSymbol} (${stockOneForwardPEGRatioString}) is unfavorable. ${stockTwoSymbol} has a PEG ratio of ${stockTwoForwardPEGRatioString}, considered very high for the ${stockTwoIndustry} industry, signaling distinct valuation or growth concerns for both.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `An unfavorable Forward PEG ratio of ${stockOneForwardPEGRatioString} for ${stockOneSymbol} suggests potential issues with its underlying earnings or growth expectations.`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is very high, indicating its price may be too optimistic relative to its growth forecast. ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) has an unfavorable PEG, often due to negative earnings or growth issues. Both present valuation concerns.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}) and ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) exhibit very high Forward PEG ratios. This suggests their stock prices might be significantly ahead of their expected earnings growth, potentially indicating overvaluation.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `The Forward PEG ratio for ${stockOneSymbol} is very high at ${stockOneForwardPEGRatioString}, implying its stock price heavily factors in future growth, possibly to an overstretched degree.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s very high Forward PEG of ${stockOneForwardPEGRatioString} implies a rich valuation relative to growth. ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) faces issues with an unfavorable PEG. These distinct situations raise valuation questions for both.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}) and ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}, which is very high for the ${stockTwoIndustry} industry) display very high Forward PEG ratios. This signals that their valuations may be significantly ahead of anticipated earnings growth.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A very high Forward PEG ratio of ${stockOneForwardPEGRatioString} for ${stockOneSymbol} suggests a valuation that has substantially priced in future growth, potentially indicating an overvalued position.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is unfavorable, often reflecting negative earnings or challenging growth prospects.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is very high, indicating its valuation might be too aggressive compared to its expected earnings growth.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `The Forward PEG for ${stockTwoSymbol} (${stockTwoForwardPEGRatioString}) is unfavorable, a significant concern regarding its valuation relative to growth.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `For the ${stockTwoIndustry} industry, ${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is considered very high, suggesting its stock price may have outrun its growth expectations.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}) presents an unfavorable Forward PEG ratio. ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) also has a problematic PEG, raising valuation flags for both companies.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `The unfavorable Forward PEG of ${stockOneForwardPEGRatioString} for ${stockOneSymbol} is a concern. ${stockTwoSymbol}’s PEG ratio of ${stockTwoForwardPEGRatioString} is also very high, highlighting different valuation challenges for each.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is unfavorable, a point of concern regarding its valuation relative to expected growth.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `Both ${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}) and ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) exhibit unfavorable Forward PEG ratios, signaling potential issues with their earnings or growth prospects that impact their valuations.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `While ${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}) has an unfavorable Forward PEG, ${stockTwoSymbol}’s PEG of ${stockTwoForwardPEGRatioString} is considered very high for the ${stockTwoIndustry} industry. These factors represent notable valuation risks for both companies.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `An unfavorable Forward PEG ratio of ${stockOneForwardPEGRatioString} for ${stockOneSymbol} raises concerns about its valuation relative to its growth prospects.`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is very high for the ${stockOneIndustry} industry. ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) shows an unfavorable PEG, indicating problems with its growth or earnings outlook. Both situations pose valuation concerns.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString}, very high for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}, also very high) both indicate that their stock prices may be significantly outpacing expected earnings growth.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `For a company in the ${stockOneIndustry} industry, ${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is considered very high, implying its valuation heavily banks on future growth.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `The PEG ratio for ${stockOneSymbol} (${stockOneForwardPEGRatioString}) is notably high for the ${stockOneIndustry} industry. ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) has an unfavorable PEG. Both represent different types of valuation concerns.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Relative to their respective industries, both ${stockOneSymbol} (PEG: ${stockOneForwardPEGRatioString} for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString} for the ${stockTwoIndustry} industry) exhibit very high Forward PEG ratios. This suggests their valuations may be stretched compared to growth expectations within their sectors.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A Forward PEG ratio of ${stockOneForwardPEGRatioString} for ${stockOneSymbol} is considered very high within the ${stockOneIndustry} industry, which might mean its growth potential is already fully, or overly, priced in.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (PEG: ${stockTwoForwardPEGRatioString}) has an unfavorable Forward PEG ratio, suggesting issues with its earnings or growth outlook.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `The Forward PEG ratio for ${stockTwoSymbol} (${stockTwoForwardPEGRatioString}) is very high, indicating its stock price may be significantly ahead of its expected earnings growth.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol}’s unfavorable Forward PEG ratio of ${stockTwoForwardPEGRatioString} is a significant concern regarding its valuation relative to expected growth.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} shows a Forward PEG ratio of ${stockTwoForwardPEGRatioString}, which is very high for the ${stockTwoIndustry} sector, suggesting a valuation that may be too optimistic.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
