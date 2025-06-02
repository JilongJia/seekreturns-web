import type { QuickRatioAnalysisResult } from "@/app/lib/stock-analysis/getQuickRatioAnalysis";

type GenerateQuickRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneQuickRatioValue: number;
  stockOneAnalysisResult: QuickRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoQuickRatioValue: number;
  stockTwoAnalysisResult: QuickRatioAnalysisResult;
};

type DescriptiveQuickRatioCategory = "Low" | "Other";

export function generateQuickRatioCommentary({
  stockOneSymbol,
  stockOneQuickRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoQuickRatioValue,
  stockTwoAnalysisResult,
}: GenerateQuickRatioCommentaryParams): string {
  const stockOneQuickRatioString = stockOneQuickRatioValue.toFixed(2);
  const stockTwoQuickRatioString = stockTwoQuickRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveQuickRatioCategory;
  if (stockOneAnalysisResult.category === "Low") {
    stockOneDescriptiveCategory = "Low";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveQuickRatioCategory;
  if (stockTwoAnalysisResult.category === "Low") {
    stockTwoDescriptiveCategory = "Low";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Low_Low":
      return `${stockOneSymbol}的速动比率（${stockOneQuickRatioString}）与${stockTwoSymbol}的速动比率（${stockTwoQuickRatioString}）均处于较低水平。这意味着${stockOneSymbol}在不依赖存货销售的情况下，其最易变现的资产可能难以覆盖短期债务，短期偿付压力较大。${stockTwoSymbol}的低速动比率同样显示其即时清偿能力可能不足，若短期债务集中到期，公司可能需要通过快速销售存货或寻求外部融资来缓解流动性紧张。`;
    case "Low_Other":
      return `${stockOneSymbol}的速动比率（${stockOneQuickRatioString}）偏低。这可能表明公司在应对即时债务支付需求时，其不含存货的速动资产储备不够充裕，短期财务灵活性受到一定限制。`;
    case "Other_Low":
      return `${stockTwoSymbol}的速动比率（${stockTwoQuickRatioString}）偏低。此数据暗示该公司在满足短期负债偿还时，可能较大程度上需要依赖存货的顺利变现，其应对突发性资金需求的能力或显不足。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
