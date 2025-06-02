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
      return `${stockOneSymbol}的预期PEG比率（${stockOneForwardPEGRatioString}）与${stockTwoSymbol}的预期PEG比率（${stockTwoForwardPEGRatioString}）均为负值。对${stockOneSymbol}而言，这通常意味着公司目前盈利为负或预期盈利将出现下滑，其基于增长的估值逻辑难以成立。${stockTwoSymbol}的负预期PEG比率同样反映了其盈利能力或增长前景存在根本性问题，投资者需警惕其估值风险。`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}的预期PEG比率（${stockOneForwardPEGRatioString}）为负值，通常表明其当前盈利状况不佳或未来增长预期悲观。而${stockTwoSymbol}的预期PEG比率（${stockTwoForwardPEGRatioString}）则非常高，可能意味着市场对其未来增长寄予过高期望，其股价相对于预期盈利增长而言可能偏贵。`;
    case "Negative_Other":
      return `${stockOneSymbol}的预期PEG比率（${stockOneForwardPEGRatioString}）为负。这多半源于公司当前的亏损状态或其盈利增长前景不被看好，使得其股票估值相对于预期增长显得缺乏吸引力。`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}的预期PEG比率（${stockOneForwardPEGRatioString}）非常高，这可能暗示其股价已包含了非常乐观的增长预期，估值水平相对较高。${stockTwoSymbol}的预期PEG比率（${stockTwoForwardPEGRatioString}）则为负值，通常反映了公司盈利能力疲弱或增长预期不佳的基本面问题。`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}的预期PEG比率（${stockOneForwardPEGRatioString}）与${stockTwoSymbol}的预期PEG比率（${stockTwoForwardPEGRatioString}）均处在极高水平。这可能表明${stockOneSymbol}的股价已充分甚至超前反映了其未来的盈利增长潜力，投资者可能为其增长支付了较高溢价。${stockTwoSymbol}的预期PEG比率同样很高，意味着市场对其未来盈利增长的预期非常乐观，但也可能使其面临估值回调的风险，如果未来增长未能达到预期。`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}的预期PEG比率（${stockOneForwardPEGRatioString}）非常高。这通常说明市场对其未来盈利增长给予了很高的期望值，其当前股价可能已较大程度地消化了这些预期，因此估值显得较为昂贵。`;
    case "Other_Negative":
      return `${stockTwoSymbol}的预期PEG比率（${stockTwoForwardPEGRatioString}）为负。这种情况一般与公司当前未能实现盈利或其未来盈利增长不被看好有关，对其估值造成负面影响。`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}的预期PEG比率（${stockTwoForwardPEGRatioString}）非常高。这可能意味着其当前股价相较于预期的盈利增长速度而言显得偏高，市场可能对其未来的成长性抱有超出一般的乐观预期。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
