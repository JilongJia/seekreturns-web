import type { ForwardPEGRatioAnalysisResult } from "@/app/lib/stock-analysis/getForwardPEGRatioAnalysis";

type GenerateForwardPEGRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneForwardPEGRatioValue: number;
  stockOneAnalysisResult: ForwardPEGRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoForwardPEGRatioValue: number;
  stockTwoAnalysisResult: ForwardPEGRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generateForwardPEGRatioCommentary({
  stockOneSymbol,
  stockOneForwardPEGRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoForwardPEGRatioValue,
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
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} and ${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} are both in the negative range. For ${stockOneSymbol}, a negative PEG ratio often stems from negative current earnings or forecasts of declining earnings, making its valuation difficult to assess relative to growth. Similarly, ${stockTwoSymbol}’s negative PEG suggests underlying issues with profitability or growth expectations, raising questions about its stock price compared to future prospects.`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is negative. This typically points to concerns such as negative earnings or projections of contracting growth, complicating valuation. ${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is very high, indicating its stock price may be significantly outpacing its expected earnings growth and potentially signaling an overstretched valuation.`;
    case "Negative_Other":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is negative. This usually reflects challenges like negative earnings or expectations of future earnings decline, making it difficult to positively interpret its valuation against growth prospects.`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is very high, suggesting its stock might be overvalued if its price has substantially outrun its future earnings growth forecast. ${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is negative, often an indicator of issues such as negative current earnings or anticipated earnings contraction, which calls its fundamental valuation into question.`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} and ${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} are both considered very high. For ${stockOneSymbol}, this elevated ratio implies its stock price may incorporate highly optimistic growth assumptions that could be challenging to realize. ${stockTwoSymbol}’s very high PEG also suggests its valuation is quite rich relative to its expected earnings growth, potentially indicating overvaluation.`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}’s Forward PEG ratio of ${stockOneForwardPEGRatioString} is very high. This suggests that investors have priced in a substantial amount of future earnings growth, potentially making the stock vulnerable if these high expectations are not met or if growth slows.`;
    case "Other_Negative":
      return `${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is negative. Such a figure commonly arises from negative earnings or forecasts of diminishing profitability, making standard valuation comparisons based on growth particularly challenging.`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}’s Forward PEG ratio of ${stockTwoForwardPEGRatioString} is very high. This signifies that its current stock price is notably elevated compared to its anticipated earnings growth rate, possibly indicating that the market has already factored in, or even exceeded, realistic future performance expectations.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
