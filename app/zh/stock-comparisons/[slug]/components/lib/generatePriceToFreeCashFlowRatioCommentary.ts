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
      return `${stockOneSymbol}的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）与${stockTwoSymbol}的P/FCF比率（${stockTwoPriceToFreeCashFlowRatioString}）均显示自由现金流为负。这表明${stockOneSymbol}在支付了资本性支出后，其经营活动产生的现金不足以覆盖其现金流出，可能需要依赖外部融资或消耗储备来维持运营。${stockTwoSymbol}的负自由现金流状况同样值得警惕，暗示公司在内部现金生成方面面临挑战，对其长期财务稳定性和投资能力构成压力。`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）为负，表明公司自由现金流出现净流出，这对其日常运营和未来发展所需资金是一个不利信号。而${stockTwoSymbol}的P/FCF比率（${stockTwoPriceToFreeCashFlowRatioString}）则非常高，可能反映市场对其未来现金流增长潜力寄予厚望，但也可能意味着其当前股价相对其自由现金流而言已较高。`;
    case "Negative_Other":
      return `${stockOneSymbol}的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）为负。这意味着公司在满足了再投资需求（即资本性支出）后，未能产生正向的自由现金流，这可能限制其分红、偿债或进行其他战略投资的能力。`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）非常高，显示市场对其每单位自由现金流给予了较高的估值，可能基于对其未来强劲增长的预期。${stockTwoSymbol}的P/FCF比率（${stockTwoPriceToFreeCashFlowRatioString}）则为负，表明其目前未能产生正的自由现金流，其内部资金生成能力不足。`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）与${stockTwoSymbol}的P/FCF比率（${stockTwoPriceToFreeCashFlowRatioString}）均处在非常高的水平。这通常表明市场高度看好${stockOneSymbol}未来产生充裕自由现金流的能力，愿意为此支付较高溢价，但也可能意味着估值偏贵，安全边际较低。${stockTwoSymbol}的高P/FCF比率同样反映了投资者对其现金流前景的乐观态度，可能是对其业务模式、成长性或行业地位的认可，但高估值也伴随着对未来业绩实现的高要求。`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）非常高。这可能意味着其股价相对于其当前自由现金流而言较为昂贵，市场可能已充分预期了其未来的现金流增长，投资者应关注这种高增长预期的可持续性。`;
    case "Other_Negative":
      return `${stockTwoSymbol}的P/FCF比率（${stockTwoPriceToFreeCashFlowRatioString}）为负，表明该公司在满足运营和投资需求后，自由现金流为净支出。这可能对其财务灵活性和未来投资扩张能力造成制约。`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}的P/FCF比率（${stockTwoPriceToFreeCashFlowRatioString}）非常高。这显示市场对其自由现金流的估值较高，可能是由于预期其现金流将持续稳定增长，或其产生的现金流质量较高（例如，具有较高的可预测性和持续性）。`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
