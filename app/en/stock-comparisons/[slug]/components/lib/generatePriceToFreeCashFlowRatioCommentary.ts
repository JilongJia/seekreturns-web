import type { PriceToFreeCashFlowRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToFreeCashFlowRatioAnalysis";

export type GeneratePriceToFreeCashFlowRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToFreeCashFlowRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: PriceToFreeCashFlowRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToFreeCashFlowRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: PriceToFreeCashFlowRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToFreeCashFlowRatioCommentary({
  stockOneSymbol,
  stockOnePriceToFreeCashFlowRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToFreeCashFlowRatioValue,
  stockTwoIndustry,
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
      return `Both ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) and ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) are experiencing a free cash flow deficit. This indicates they are currently spending more cash than they generate from operations after capital expenditures.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}’s P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} points to a cash burn situation, a concern for its cash generation. ${stockTwoSymbol}, with a very high P/FCF of ${stockTwoPriceToFreeCashFlowRatioString}, suggests the market places a high premium on its free cash flow.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} reveals an outflow in free cash flow. This means the company is currently using more cash than it’s generating post-capital expenditures.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) is not generating positive free cash flow. ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) also exhibits a free cash flow deficit. Both situations highlight significant concerns about their ability to generate sufficient cash from operations post-investment.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `A free cash flow deficit for ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) is a concern. ${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} is considered very high for the ${stockTwoIndustry} industry, indicating a strong market valuation of its cash flows.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `The P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} for ${stockOneSymbol} suggests the company is spending more cash than it generates post-investments, raising questions about its cash-generating capabilities.`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} is very high, indicating a rich valuation on its free cash flow. ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is currently dealing with a free cash flow shortfall. These situations highlight different types of financial scrutiny.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `A notable characteristic for ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) and ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is their very high P/FCF ratios. This implies investors assign a substantial premium to their free cash flows, possibly expecting strong future growth or stability.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `The P/FCF ratio for ${stockOneSymbol} is very high at ${stockOnePriceToFreeCashFlowRatioString}, suggesting the market values its free cash flow generation quite optimistically.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s very high P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} suggests a high market valuation of its cash flow. ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is struggling with an inability to generate positive free cash flow.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) and ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}, which is very high for the ${stockTwoIndustry} industry) trade at elevated P/FCF multiples, indicating strong market confidence in their cash-generating abilities or future prospects.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A very high P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} for ${stockOneSymbol} signifies that investors are paying a high premium for its current free cash flow.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is currently experiencing a cash burn, indicating it’s spending more cash than it’s taking in from operations after capex.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} is very high, suggesting the market places a substantial premium on its ability to generate free cash flow.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `For ${stockTwoSymbol} (${stockTwoPriceToFreeCashFlowRatioString}), the current lack of positive free cash flow is a point of concern for its financial health.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `For the ${stockTwoIndustry} industry, ${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} is considered very high, implying a rich valuation relative to its free cash flow.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) is not generating positive free cash flow. ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is also facing a cash flow deficit, indicating cash burn for both.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `An outflow in free cash flow (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) is a significant issue for ${stockOneSymbol}. ${stockTwoSymbol}’s P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString} is also very high, pointing to different financial characteristics.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} signals a cash burn situation, a concerning sign for its cash generation.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `Reports of negative free cash flow from both ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) and ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) indicate a critical issue for their financial sustainability.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `While ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}) is experiencing a free cash flow deficit, ${stockTwoSymbol}’s P/FCF of ${stockTwoPriceToFreeCashFlowRatioString} is considered very high for the ${stockTwoIndustry} industry.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `The P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} for ${stockOneSymbol}, indicating an inability to generate positive FCF, is a critical concern, suggesting the company is using more cash than it generates.`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} is very high for the ${stockOneIndustry} industry, indicating a strong market premium on its FCF. ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) currently reports an outflow in free cash flow.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString}, very high for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}, also very high) both demonstrate that the market highly values their free cash flow generation.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `For a company in the ${stockOneIndustry} industry, ${stockOneSymbol}’s P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} is considered very high, reflecting a strong market valuation of its free cash flow.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `The P/FCF for ${stockOneSymbol} (${stockOnePriceToFreeCashFlowRatioString}) is notably high for the ${stockOneIndustry} industry. ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is experiencing a cash flow deficit, a point of concern.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Relative to their respective industries, both ${stockOneSymbol} (P/FCF: ${stockOnePriceToFreeCashFlowRatioString} for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString} for the ${stockTwoIndustry} industry) exhibit very high P/FCF ratios, suggesting strong market optimism about their cash flow prospects.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A P/FCF ratio of ${stockOnePriceToFreeCashFlowRatioString} for ${stockOneSymbol} is considered very high within the ${stockOneIndustry} industry, possibly due to strong growth expectations for its cash flows.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) currently is not generating positive free cash flow, indicating it is spending more cash than generating.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `The market places a high premium on ${stockTwoSymbol}’s free cash flow, as shown by its very high P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString}.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol}’s reported outflow in free cash flow (P/FCF: ${stockTwoPriceToFreeCashFlowRatioString}) is a critical concern for its cash generation capabilities.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} shows a P/FCF ratio of ${stockTwoPriceToFreeCashFlowRatioString}, which is very high for the ${stockTwoIndustry} sector, indicating a substantial market valuation of its free cash flow.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
