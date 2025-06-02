import type { PriceToBookRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToBookRatioAnalysis";

type GeneratePriceToBookRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToBookRatioValue: number;
  stockOneAnalysisResult: PriceToBookRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToBookRatioValue: number;
  stockTwoAnalysisResult: PriceToBookRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToBookRatioCommentary({
  stockOneSymbol,
  stockOnePriceToBookRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToBookRatioValue,
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

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Negative_Negative":
      return `${stockOneSymbol}’s Price-to-Book (P/B) ratio of ${stockOnePriceToBookRatioString} and ${stockTwoSymbol}’s P/B ratio of ${stockTwoPriceToBookRatioString} both indicate negative book values. For ${stockOneSymbol}, this signals that its liabilities exceed its assets, a critical financial concern. ${stockTwoSymbol}’s negative book value also points to significant issues with its financial stability and potential solvency risks.`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}’s Price-to-Book (P/B) ratio of ${stockOnePriceToBookRatioString} indicates a negative book value, which is a serious red flag for its financial health. In contrast, ${stockTwoSymbol} has a very high P/B ratio of ${stockTwoPriceToBookRatioString}, suggesting the market values its net assets at a significant premium, possibly due to strong intangible assets or expectations of high future growth.`;
    case "Negative_Other":
      return `${stockOneSymbol}’s Price-to-Book (P/B) ratio of ${stockOnePriceToBookRatioString} reflects a negative book value (meaning negative shareholder equity). This is a significant indicator of financial distress and raises substantial concerns about its solvency.`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}’s Price-to-Book (P/B) ratio of ${stockOnePriceToBookRatioString} is very high, indicating that investors are willing to pay a substantial premium over its accounting net asset value. ${stockTwoSymbol}, with a P/B ratio of ${stockTwoPriceToBookRatioString}, shows a negative book value, which is a critical concern for its financial solvency.`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}’s Price-to-Book (P/B) ratio of ${stockOnePriceToBookRatioString} and ${stockTwoSymbol}’s P/B ratio of ${stockTwoPriceToBookRatioString} are both very high. For ${stockOneSymbol}, this typically means the market assigns a much greater value to the company than its net accounting worth, often due to factors like robust intangible assets or superior growth prospects. ${stockTwoSymbol}’s high P/B also suggests investors have high expectations for its future performance and are pricing it well above its book value.`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}’s Price-to-Book (P/B) ratio of ${stockOnePriceToBookRatioString} is very high. This often indicates that the market values the company significantly above its net asset value, usually reflecting strong profitability, valuable intangible assets (like brand or patents), or high expectations for future growth.`;
    case "Other_Negative":
      return `${stockTwoSymbol}’s Price-to-Book (P/B) ratio of ${stockTwoPriceToBookRatioString} indicates a negative book value. This is a serious warning sign regarding its financial stability and raises critical questions about its solvency and overall financial health.`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}’s Price-to-Book (P/B) ratio of ${stockTwoPriceToBookRatioString} is very high. This suggests that investors are valuing its assets and growth potential at a considerable premium to its stated book value, often due to strong return on equity, significant intangible assets, or optimistic growth forecasts.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
