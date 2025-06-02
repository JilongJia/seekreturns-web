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
      return `${stockOneSymbol}的市净率（${stockOnePriceToBookRatioString}）与${stockTwoSymbol}的市净率（${stockTwoPriceToBookRatioString}）均反映其股东权益为负值。对${stockOneSymbol}而言，这意味着其总负债超过总资产，是财务状况极端不稳定的表现，可能面临严重的偿付危机。${stockTwoSymbol}的负股东权益同样揭示了其资不抵债的窘境，投资者应高度警惕其持续经营风险。`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}的市净率（${stockOnePriceToBookRatioString}）表明其股东权益为负，这是一个严重的财务问题，可能影响公司的持续经营能力。相比之下，${stockTwoSymbol}的市净率（${stockTwoPriceToBookRatioString}）非常高，显示市场对其净资产（可能因为其独特的品牌价值、技术优势或强劲的增长预期）给予了显著的估值溢价。`;
    case "Negative_Other":
      return `${stockOneSymbol}的市净率（${stockOnePriceToBookRatioString}）反映其股东权益为负值。这通常是公司财务健康状况的严重警示信号，暗示其可能已陷入资不抵债的困境，偿付风险极高。`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}的市净率（${stockOnePriceToBookRatioString}）处于非常高的水平，意味着投资者愿意为其每单位净资产支付远超其账面记录的金额，这可能基于对其未来盈利能力或无形资产价值的高度认可。而${stockTwoSymbol}的市净率（${stockTwoPriceToBookRatioString}）则因股东权益为负而失去常规比较意义，突显了其面临的严重偿付能力挑战。`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}的市净率（${stockOnePriceToBookRatioString}）与${stockTwoSymbol}的市净率（${stockTwoPriceToBookRatioString}）均处在非常高的水平。这通常表明市场对${stockOneSymbol}的资产质量、盈利能力或未来增长前景抱有很高期望，因此给予了远超其账面净资产的估值。${stockTwoSymbol}的高市净率也反映了投资者对其未来价值的乐观判断，可能包含了对其品牌、技术、市场地位等无形资产的较高评价，但也可能意味着股价相对较高，安全边际较小。`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}的市净率（${stockOnePriceToBookRatioString}）非常高。这往往说明市场认为该公司拥有显著的账面价值之外的价值来源，例如卓越的管理团队、强大的品牌效应、领先的技术或良好的成长性预期。`;
    case "Other_Negative":
      return `${stockTwoSymbol}的市净率（${stockTwoPriceToBookRatioString}）因股东权益为负而不具备传统的正面解读价值。这种情况是公司财务状况面临严峻挑战的直接体现，通常意味着其负债已超过资产，投资者需特别关注其偿债风险。`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}的市净率（${stockTwoPriceToBookRatioString}）非常高。这表示其股价远高于每股净资产，市场可能预期该公司未来有较高的盈利增长，或者其拥有的无形资产（如商誉、专利等）价值未在账面充分体现，从而给予较高估值。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
