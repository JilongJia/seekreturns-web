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
    // --- 股票一：应用通用标准 ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）和 ${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）目前均面临自由现金流赤字。这表明在扣除资本性支出后，它们当前的现金支出超出了经营活动所产生的现金。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 指向了现金消耗的情况，其现金生成能力令人担忧。而 ${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 非常高，表明市场对其自由现金流给予了显著的溢价。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 显示其自由现金流为净流出。这意味着该公司在资本性支出之后，当前消耗的现金超过了其产生的现金。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）未能产生正向的自由现金流。${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）同样呈现自由现金流赤字。这两种情况均突显了市场对其在投资后通过经营活动产生充足现金的能力的显著担忧。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的自由现金流出现赤字（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}），这是一个值得关注的问题。${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 在 ${stockTwoIndustry} 行业中被认为非常高，这表明市场对其现金流的估值较高。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 表明该公司在投资后的现金支出大于其产生的现金，这引发了对其现金生成能力的疑问。`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 非常高，反映其自由现金流的估值偏高。${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）目前则面临自由现金流短缺的困境。这些情况凸显了不同类型的财务审视点。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）和 ${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）的一个显著特点是它们都具有非常高的P/FCF比率。这通常意味着投资者对其自由现金流给予了可观的溢价，可能预期其未来会有强劲的增长或保持稳定。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的P/FCF比率高达 ${stockOnePriceToFreeCashFlowRatioString}，表明市场对其自由现金流的产生能力抱有相当乐观的估值。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 非常高的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）暗示市场对其现金流给予了高估值。${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）则在产生正向自由现金流方面遇到困难。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）和 ${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}，此比率在 ${stockTwoIndustry} 行业中属于非常高水平）均以较高的P/FCF倍数交易，这表明市场对其现金生成能力或未来前景抱有强烈信心。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 非常高，这意味着投资者正在为其当前的自由现金流支付高昂的溢价。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）目前正经历现金消耗，表明其在资本支出后的现金支出超过了经营所得。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 非常高，这可能表明市场对其产生自由现金流的能力给予了极高的估值。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `对 ${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）而言，目前未能产生正向自由现金流是其财务健康方面的一个关注点。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 被认为非常高，这意味着其估值相对于自由现金流而言可能偏高。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）未能产生正向的自由现金流。${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）也面临现金流赤字，表明两家公司均在消耗现金。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的自由现金流为净流出（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}），这是一个显著问题。${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 亦非常高，指出了两者不同的财务特征。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 显示其正处于现金消耗状态，这是其现金生成方面一个令人担忧的信号。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `来自 ${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）和 ${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）的负自由现金流报告，均表明其财务可持续性面临关键问题。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `尽管 ${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}）正经历自由现金流赤字，${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 在 ${stockTwoIndustry} 行业中却被认为非常高。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 显示其未能产生正向自由现金流，这是一个严重问题，表明公司使用的现金多于其产生的现金。`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 非常高，表明市场对其自由现金流给予了显著溢价。${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）目前则报告自由现金流为净流出。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}，在 ${stockOneIndustry} 行业中属非常高水平）和 ${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}，同样非常高）均表明市场高度看好其自由现金流的产生能力。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `对于 ${stockOneIndustry} 行业的一家公司而言，${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 被认为非常高，这反映了市场对其自由现金流的强烈看好。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的P/FCF比率（${stockOnePriceToFreeCashFlowRatioString}）显著偏高。${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）则正经历现金流赤字，值得关注。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `相对于各自所在的行业（${stockOneSymbol} P/FCF比率: ${stockOnePriceToFreeCashFlowRatioString}，${stockOneIndustry}行业；${stockTwoSymbol} P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}，${stockTwoIndustry}行业），两家公司的P/FCF比率都非常高，这表明市场对其现金流前景抱有强烈的乐观预期。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `在 ${stockOneIndustry} 行业内，${stockOneSymbol} 的P/FCF比率 ${stockOnePriceToFreeCashFlowRatioString} 被认为非常高，这可能源于市场对其现金流的强劲增长预期。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}）目前未能产生正向自由现金流，表明其现金支出大于所产生的现金。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `市场对 ${stockTwoSymbol} 的自由现金流给予了较高溢价，其非常高的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 即是体现。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 报告的自由现金流为净流出（P/FCF比率: ${stockTwoPriceToFreeCashFlowRatioString}），这对该公司的现金生成能力而言是一个关键的隐患。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的P/FCF比率 ${stockTwoPriceToFreeCashFlowRatioString} 在 ${stockTwoIndustry} 行业中处于非常高的水平，表明市场对其自由现金流给予了可观的估值。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
