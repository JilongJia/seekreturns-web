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
      return `${stockOneSymbol}的市盈率（${stockOnePriceToEarningsRatioString}）与${stockTwoSymbol}的市盈率（${stockTwoPriceToEarningsRatioString}）均为负值，表明两家公司当前均未实现盈利。对${stockOneSymbol}而言，这意味着公司可能正经历经营困难或处于投资期，其短期盈利能力面临考验。${stockTwoSymbol}的负市盈率同样反映了其现阶段的亏损状况，投资者需要关注其扭亏为盈的前景和时间表。`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}的市盈率（${stockOnePriceToEarningsRatioString}）为负，显示公司目前处于亏损状态，其盈利能力有待改善。而${stockTwoSymbol}的市盈率（${stockTwoPriceToEarningsRatioString}）则非常高，可能意味着市场对其增长前景极为乐观，但也使其股价显得相对昂贵，并可能包含了较高的增长预期。`;
    case "Negative_Other":
      return `${stockOneSymbol}的市盈率（${stockOnePriceToEarningsRatioString}）为负值，表明该公司当前未能产生正向盈利。这通常是投资者评估其财务健康度和未来潜力时的一个重要负面信号。`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}的市盈率（${stockOnePriceToEarningsRatioString}）处于非常高的水平，这可能反映了市场对公司未来高增长的强烈预期，或者是其当前盈利水平相对较低所致，估值可能偏高。${stockTwoSymbol}的市盈率（${stockTwoPriceToEarningsRatioString}）则为负，说明其目前未能盈利，其基本面存在不确定性。`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}的市盈率（${stockOnePriceToEarningsRatioString}）与${stockTwoSymbol}的市盈率（${stockTwoPriceToEarningsRatioString}）均显著偏高。这可能表明市场对${stockOneSymbol}的未来增长抱有极高期望，其当前股价已将这些乐观预期纳入考量，但也可能存在估值过高的风险。${stockTwoSymbol}的高市盈率同样暗示其股价相对于当前盈利而言较为昂贵，投资者可能预期其盈利将有大幅提升，否则高估值难以持续。`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}的市盈率（${stockOnePriceToEarningsRatioString}）非常高。这通常意味着其股价相对于当前的盈利水平而言显得较为昂贵，市场可能已经消化了对公司未来强劲增长的预期，投资者需警惕估值回调的可能。`;
    case "Other_Negative":
      return `${stockTwoSymbol}的市盈率（${stockTwoPriceToEarningsRatioString}）为负，直接反映出该公司目前未能实现盈利。这是评估其当前经营效益和财务状况时的一个关键考量点，可能对其股价表现构成压力。`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}的市盈率（${stockTwoPriceToEarningsRatioString}）非常高。这可能表明市场对其未来的盈利增长潜力给予了较高的估值，或者其当前盈利基数较小。投资者应关注其增长是否能支撑如此高的估值水平。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
