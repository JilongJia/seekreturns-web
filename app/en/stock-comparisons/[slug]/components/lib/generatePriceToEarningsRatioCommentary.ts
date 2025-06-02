import type { PriceToEarningsRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToEarningsRatioAnalysis";

type GeneratePriceToEarningsRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToEarningsRatioValue: number;
  stockOneAnalysisResult: PriceToEarningsRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToEarningsRatioValue: number;
  stockTwoAnalysisResult: PriceToEarningsRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToEarningsRatioCommentary({
  stockOneSymbol,
  stockOnePriceToEarningsRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToEarningsRatioValue,
  stockTwoAnalysisResult,
}: GeneratePriceToEarningsRatioCommentaryParams): string {
  const stockOnePriceToEarningsRatioString =
    stockOnePriceToEarningsRatioValue.toFixed(2);
  const stockTwoPriceToEarningsRatioString =
    stockTwoPriceToEarningsRatioValue.toFixed(2);

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
      return `${stockOneSymbol}’s Price-to-Earnings (P/E) ratio of ${stockOnePriceToEarningsRatioString} and ${stockTwoSymbol}’s P/E ratio of ${stockTwoPriceToEarningsRatioString} both indicate negative earnings. For ${stockOneSymbol}, this signifies current unprofitability, raising questions about its operational efficiency or market conditions. ${stockTwoSymbol}’s negative P/E also reflects a lack of current earnings, a key concern for its financial health and investor appeal.`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}’s Price-to-Earnings (P/E) ratio of ${stockOnePriceToEarningsRatioString} indicates negative earnings, signaling current unprofitability. ${stockTwoSymbol}, with a very high P/E ratio of ${stockTwoPriceToEarningsRatioString}, appears to have a valuation that either is significantly stretched or reflects high expectations for substantial future growth.`;
    case "Negative_Other":
      return `${stockOneSymbol}’s Price-to-Earnings (P/E) ratio of ${stockOnePriceToEarningsRatioString} is negative, highlighting a lack of current profitability. This situation is a concern for its immediate financial performance and can impact investor confidence.`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}’s Price-to-Earnings (P/E) ratio of ${stockOnePriceToEarningsRatioString} is very high, indicating its stock trades at a significant premium to its earnings, possibly due to strong investor sentiment or high growth expectations. ${stockTwoSymbol}’s P/E ratio of ${stockTwoPriceToEarningsRatioString} is negative, signaling it is currently unprofitable.`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}’s Price-to-Earnings (P/E) ratio of ${stockOnePriceToEarningsRatioString} and ${stockTwoSymbol}’s P/E ratio of ${stockTwoPriceToEarningsRatioString} are both very high. For ${stockOneSymbol}, this elevated P/E suggests that significant expectations for future earnings growth are already built into its stock price, or it may be overvalued. ${stockTwoSymbol}’s very high P/E also implies its valuation is rich, possibly indicating market optimism about its prospects or a risk of being overstretched.`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}’s Price-to-Earnings (P/E) ratio of ${stockOnePriceToEarningsRatioString} is very high. This often means that its current market price reflects high investor confidence in its future earnings potential, but it could also suggest the stock is expensive relative to its current earnings power.`;
    case "Other_Negative":
      return `${stockTwoSymbol}’s Price-to-Earnings (P/E) ratio of ${stockTwoPriceToEarningsRatioString} is negative. This indicates the company is currently not generating profit, a key factor that can weigh on its stock valuation and investor sentiment.`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}’s Price-to-Earnings (P/E) ratio of ${stockTwoPriceToEarningsRatioString} is very high. This signifies that its stock is trading at a premium, likely reflecting market optimism about its future growth, though it also implies a higher risk if these growth expectations are not met.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
