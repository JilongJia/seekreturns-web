import type { DebtToEquityRatioAnalysisResult } from "@/app/lib/stock-analysis/getDebtToEquityRatioAnalysis";

type GenerateDebtToEquityRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneDebtToEquityRatioValue: number;
  stockOneAnalysisResult: DebtToEquityRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoDebtToEquityRatioValue: number;
  stockTwoAnalysisResult: DebtToEquityRatioAnalysisResult;
};

type DescriptiveDebtToEquityRatioCategory = "Negative" | "VeryHigh" | "Other";

export function generateDebtToEquityRatioCommentary({
  stockOneSymbol,
  stockOneDebtToEquityRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoDebtToEquityRatioValue,
  stockTwoAnalysisResult,
}: GenerateDebtToEquityRatioCommentaryParams): string {
  const stockOneDebtToEquityRatioString =
    stockOneDebtToEquityRatioValue.toFixed(2);
  const stockTwoDebtToEquityRatioString =
    stockTwoDebtToEquityRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveDebtToEquityRatioCategory;
  if (stockOneAnalysisResult.category === "Negative") {
    stockOneDescriptiveCategory = "Negative";
  } else if (stockOneAnalysisResult.category === "VeryHigh") {
    stockOneDescriptiveCategory = "VeryHigh";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveDebtToEquityRatioCategory;
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
      return `${stockOneSymbol}的产权比率（${stockOneDebtToEquityRatioString}）与${stockTwoSymbol}的产权比率（${stockTwoDebtToEquityRatioString}）均反映其股东权益为负值。对${stockOneSymbol}而言，此状况是其财务结构极端脆弱的信号，表明公司可能依赖债权人资金维持运营，偿债能力面临严峻考验。${stockTwoSymbol}的负股东权益同样揭示了其资产不足以抵偿负债的困境，持续经营能力令人担忧。`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}的产权比率（${stockOneDebtToEquityRatioString}）显示其股东权益为负，这是对其财务健康状况的严重警示，可能意味着公司资不抵债。${stockTwoSymbol}的产权比率（${stockTwoDebtToEquityRatioString}）则非常高，表明其财务杠杆过大，依赖外部融资的程度较高，面临较大的财务风险。`;
    case "Negative_Other":
      return `${stockOneSymbol}的产权比率（${stockOneDebtToEquityRatioString}）为负，直接反映了其股东权益为负的事实。这一指标是衡量公司财务稳定性的重要警示，通常意味着公司总负债已超过总资产，偿付能力堪忧。`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}的产权比率（${stockOneDebtToEquityRatioString}）处于极高水平，说明公司债务规模远超净资产，财务风险较高，对债权人的保障程度较低。而${stockTwoSymbol}的产权比率（${stockTwoDebtToEquityRatioString}）为负，表明其股东权益已为负值，处境更为严峻，可能已陷入资不抵债的困境。`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}的产权比率（${stockOneDebtToEquityRatioString}）与${stockTwoSymbol}的产权比率（${stockTwoDebtToEquityRatioString}）均处于非常高的水平。这表明${stockOneSymbol}的财务杠杆较高，更多地依赖借贷资金进行运营和扩张，这在市场环境不利时可能放大亏损风险。${stockTwoSymbol}的高产权比率也反映了其债务融资比例偏高，虽然可能带来较高的股本回报潜力，但也使其在经济下行或利率上升时更为脆弱。`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}的产权比率（${stockOneDebtToEquityRatioString}）非常高。这通常意味着公司在融资结构上对债务的依赖程度较大，可能追求较高的财务杠杆效应，但也因此承担了较高的利息支出压力和信用风险。`;
    case "Other_Negative":
      return `${stockTwoSymbol}的产权比率（${stockTwoDebtToEquityRatioString}）为负，揭示了其股东权益为负值的严重问题。这种情况通常是公司长期亏损或巨额债务的体现，财务稳定性和持续经营能力面临极大挑战。`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}的产权比率（${stockTwoDebtToEquityRatioString}）非常高。这表明其债务水平相对于股东投入而言处在较高位置，公司可能利用债务融资来加速发展，但同时也使其财务结构更为激进，对外部经济环境变化的敏感度增加。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
