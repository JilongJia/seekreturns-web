import type { PriceToFreeCashFlowRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToFreeCashFlowRatioAnalysis";

type GeneratePriceToFreeCashFlowRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToFreeCashFlowRatioValue: number;
  stockOneAnalysisResult: PriceToFreeCashFlowRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToFreeCashFlowRatioValue: number;
  stockTwoAnalysisResult: PriceToFreeCashFlowRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToFreeCashFlowRatioCommentary({
  stockOneSymbol,
  stockOnePriceToFreeCashFlowRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToFreeCashFlowRatioValue,
  stockTwoAnalysisResult,
}: GeneratePriceToFreeCashFlowRatioCommentaryParams): string {
  const stockOnePriceToFreeCashFlowRatioString =
    stockOnePriceToFreeCashFlowRatioValue.toFixed(2);
  const stockTwoPriceToFreeCashFlowRatioString =
    stockTwoPriceToFreeCashFlowRatioValue.toFixed(2);

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
      return `${stockOneSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockOnePriceToFreeCashFlowRatioString} and ${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} both indicate negative free cash flow. For ${stockOneSymbol}, this means it’s spending more cash than it generates from core operations after accounting for capital expenditures, a key concern for its financial health. ${stockTwoSymbol}’s negative free cash flow also signals a cash flow deficit, raising questions about its ability to fund ongoing operations and investments without external financing.`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockOnePriceToFreeCashFlowRatioString} reflects a free cash flow deficit, which is a notable concern for its operational cash generation. In contrast, ${stockTwoSymbol}’s very high P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} implies that investors are valuing its free cash flow at a significant premium, likely due to expectations of robust future growth or strong cash flow stability.`;
    case "Negative_Other":
      return `${stockOneSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockOnePriceToFreeCashFlowRatioString} signifies a negative free cash flow. This indicates the company is currently consuming more cash than it produces from its operations after covering capital investments, a critical issue for its financial self-sufficiency.`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockOnePriceToFreeCashFlowRatioString} is very high, suggesting the market has placed a substantial valuation on its free cash flow, possibly anticipating strong future performance. ${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString}, however, indicates a free cash flow deficit, meaning it’s currently not generating positive cash flow after capital expenditures.`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockOnePriceToFreeCashFlowRatioString} and ${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} are both very high. For ${stockOneSymbol}, this high ratio indicates investors are paying a significant premium for each dollar of its free cash flow, likely driven by expectations of strong future growth or superior cash flow quality. ${stockTwoSymbol}’s very high P/FCF also suggests a rich market valuation relative to its current free cash flow, possibly reflecting optimism about its long-term prospects or industry leadership.`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockOnePriceToFreeCashFlowRatioString} is very high. This often signifies that the market holds a very positive outlook on its ability to generate free cash flow, potentially due to anticipated strong growth, high profitability, or a robust business model.`;
    case "Other_Negative":
      return `${stockTwoSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockTwoPriceToFreeCashFlowRatioString} signals a negative free cash flow. This implies that the company’s operational cash inflows, after deducting capital expenditures, are insufficient to cover its spending, posing a risk to its financial flexibility and sustainability.`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}’s Price-to-Free-Cash-Flow (P/FCF) ratio of ${stockTwoPriceToFreeCashFlowRatioString} is very high. This indicates that investors are valuing its free cash flow generously, possibly reflecting confidence in its future growth trajectory, market position, or the quality of its cash generation.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
