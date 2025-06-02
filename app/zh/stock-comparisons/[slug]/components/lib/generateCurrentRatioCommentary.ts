import type { CurrentRatioAnalysisResult } from "@/app/lib/stock-analysis/getCurrentRatioAnalysis";

type GenerateCurrentRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneCurrentRatioValue: number;
  stockOneAnalysisResult: CurrentRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoCurrentRatioValue: number;
  stockTwoAnalysisResult: CurrentRatioAnalysisResult;
};

type DescriptiveCurrentRatioCategory = "Low" | "Other";

export function generateCurrentRatioCommentary({
  stockOneSymbol,
  stockOneCurrentRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoCurrentRatioValue,
  stockTwoAnalysisResult,
}: GenerateCurrentRatioCommentaryParams): string {
  const stockOneCurrentRatioString = stockOneCurrentRatioValue.toFixed(2);
  const stockTwoCurrentRatioString = stockTwoCurrentRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveCurrentRatioCategory;
  if (stockOneAnalysisResult.category === "Low") {
    stockOneDescriptiveCategory = "Low";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveCurrentRatioCategory;
  if (stockTwoAnalysisResult.category === "Low") {
    stockTwoDescriptiveCategory = "Low";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Low_Low":
      return `${stockOneSymbol}的流动比率（${stockOneCurrentRatioString}）与${stockTwoSymbol}的流动比率（${stockTwoCurrentRatioString}）均显偏低。对${stockOneSymbol}而言，这可能预示着公司在短期内满足到期债务需求方面存在挑战，其营运资金的流动性需要关注。${stockTwoSymbol}同样面临相似状况，其流动资产对其短期负债的覆盖可能不足，或对其短期偿付能力构成压力。`;

    case "Low_Other":
      return `${stockOneSymbol}的流动比率（${stockOneCurrentRatioString}）偏低。这可能表明其短期偿债能力面临一定考验，流动资产为其短期债务提供的缓冲空间或许不足，需要关注其营运资金管理效率。`;

    case "Other_Low":
      return `${stockTwoSymbol}的流动比率（${stockTwoCurrentRatioString}）偏低。这可能意味着其流动资产对即期负债的保障程度不高，公司在应对短期资金周转需求时可能面临一定压力，其日常运营的财务弹性值得留意。`;

    case "Other_Other":
      return "";

    default:
      return "";
  }
}
