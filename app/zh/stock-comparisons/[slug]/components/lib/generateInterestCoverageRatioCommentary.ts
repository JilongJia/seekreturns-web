import type { InterestCoverageRatioAnalysisResult } from "@/app/lib/stock-analysis/getInterestCoverageRatioAnalysis";

type GenerateInterestCoverageRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneInterestCoverageRatioValue: number;
  stockOneAnalysisResult: InterestCoverageRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoInterestCoverageRatioValue: number;
  stockTwoAnalysisResult: InterestCoverageRatioAnalysisResult;
};

type DescriptiveInterestCoverageRatioCategory =
  | "Negative"
  | "CriticallyLow"
  | "Other";

export function generateInterestCoverageRatioCommentary({
  stockOneSymbol,
  stockOneInterestCoverageRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoInterestCoverageRatioValue,
  stockTwoAnalysisResult,
}: GenerateInterestCoverageRatioCommentaryParams): string {
  const stockOneICRString = stockOneInterestCoverageRatioValue.toFixed(2);
  const stockTwoICRString = stockTwoInterestCoverageRatioValue.toFixed(2);

  if (
    stockOneAnalysisResult.type === "DataNotAvailable" ||
    stockOneAnalysisResult.type === "IndicatorNotApplicable" ||
    stockTwoAnalysisResult.type === "DataNotAvailable" ||
    stockTwoAnalysisResult.type === "IndicatorNotApplicable"
  ) {
    return "";
  }

  let stockOneDescriptiveCategory: DescriptiveInterestCoverageRatioCategory;
  if (stockOneAnalysisResult.category === "Negative") {
    stockOneDescriptiveCategory = "Negative";
  } else if (stockOneAnalysisResult.category === "CriticallyLow") {
    stockOneDescriptiveCategory = "CriticallyLow";
  } else {
    stockOneDescriptiveCategory = "Other";
  }

  let stockTwoDescriptiveCategory: DescriptiveInterestCoverageRatioCategory;
  if (stockTwoAnalysisResult.category === "Negative") {
    stockTwoDescriptiveCategory = "Negative";
  } else if (stockTwoAnalysisResult.category === "CriticallyLow") {
    stockTwoDescriptiveCategory = "CriticallyLow";
  } else {
    stockTwoDescriptiveCategory = "Other";
  }

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Negative_Negative":
      return `${stockOneSymbol}的利息保障倍数（${stockOneICRString}）与${stockTwoSymbol}的利息保障倍数（${stockTwoICRString}）均为负值。这意味着${stockOneSymbol}的经营活动未能产生足够的利润来支付其利息费用，对其持续经营和偿债能力构成了严重威胁。${stockTwoSymbol}同样面临经营利润无法覆盖利息的窘境，这通常是财务状况恶化的显著标志，可能导致债务违约风险。`;
    case "Negative_CriticallyLow":
      return `${stockOneSymbol}的利息保障倍数（${stockOneICRString}）为负，清晰地表明其经营利润不足以支付利息费用，这是一个重大的财务警讯。${stockTwoSymbol}的利息保障倍数（${stockTwoICRString}）则处于极低水平，显示其盈利对利息的覆盖能力非常脆弱，短期内偿债压力巨大。`;
    case "Negative_Other":
      return `${stockOneSymbol}的利息保障倍数（${stockOneICRString}）为负。此状况通常因公司经营亏损所致，表明其主营业务无法产生足够利润来承担借款成本，财务稳定性堪忧。`;
    case "CriticallyLow_Negative":
      return `${stockOneSymbol}的利息保障倍数（${stockOneICRString}）极低，说明其经营盈利对利息费用的覆盖非常勉强，偿债能力令人担忧。${stockTwoSymbol}的情况更为严峻，其利息保障倍数（${stockTwoICRString}）为负，直接反映其经营利润已无法覆盖利息支出。`;
    case "CriticallyLow_CriticallyLow":
      return `${stockOneSymbol}的利息保障倍数（${stockOneICRString}）与${stockTwoSymbol}的利息保障倍数（${stockTwoICRString}）均处于极低水平。这表明${stockOneSymbol}的经营利润仅能勉强覆盖或略高于其利息支出，财务缓冲空间极小，一旦盈利下滑则可能无法按时付息。${stockTwoSymbol}同样利息覆盖能力薄弱，其盈利水平对债务成本的保障不足，显示出较高的财务风险，尤其在经济下行周期中。`;
    case "CriticallyLow_Other":
      return `${stockOneSymbol}的利息保障倍数（${stockOneICRString}）极低。这意味着其通过经营活动产生的利润对其债务利息的保障程度非常有限，公司的财务弹性较差，应对突发经营困难的能力可能不足。`;
    case "Other_Negative":
      return `${stockTwoSymbol}的利息保障倍数（${stockTwoICRString}）为负。这直接反映出公司当前的经营利润尚不能覆盖其需支付的利息，是财务困境的一个明确信号，需要警惕其潜在的债务风险。`;
    case "Other_CriticallyLow":
      return `${stockTwoSymbol}的利息保障倍数（${stockTwoICRString}）处于极低水平。这说明其经营所得利润相对于利息支出而言较为微薄，偿付利息的能力较为紧张，公司的财务健康状况需密切关注。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
