import type { PriceToEarningsRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToEarningsRatioAnalysis";

export type GeneratePriceToEarningsRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToEarningsRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: PriceToEarningsRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToEarningsRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: PriceToEarningsRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToEarningsRatioCommentary({
  stockOneSymbol,
  stockOnePriceToEarningsRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToEarningsRatioValue,
  stockTwoIndustry,
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
      return `目前，${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）和 ${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）均未实现盈利，其市盈率均为负值即是证明。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）报告盈利为负，表明其尚未盈利。相比之下，${stockTwoSymbol} 的市盈率高达 ${stockTwoPriceToEarningsRatioString}，暗示其估值可能被显著拉伸。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `由于市盈率为 ${stockOnePriceToEarningsRatioString}，${stockOneSymbol} 显示为负盈利，这一点关乎其当前的财务表现，值得关注。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）显示盈利为负。同样，${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）也报告盈利为负。这两种情况都突显了对其当前盈利能力的担忧。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 显示其未盈利。而 ${stockTwoSymbol} 的市盈率 ${stockTwoPriceToEarningsRatioString} 在 ${stockTwoIndustry} 行业中被认为非常高，这表明两家公司各自面临着不同的财务隐忧。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 为负，标志着该公司盈利为负，并引发对其当前盈利能力的疑问。`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 非常高，指向一个可能过高的估值。另一方面，${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）则处于未盈利状态。两种情况均需投资者审慎对待。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）和 ${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）均呈现非常高的市盈率。这可能表明市场已充分计价其未来的大幅增长，或者也可能暗示两者均存在估值过高的风险。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的市盈率高达 ${stockOnePriceToEarningsRatioString}，这表明其市场估值已计入了相当可观的未来增长预期，或者可能已有些偏高。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 相当高。与此同时，${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）正努力摆脱未盈利的困境。这些不同情况指出了两者各自独特的估值或业绩问题。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）和 ${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}，此比率在 ${stockTwoIndustry} 行业中属于非常高水平）均以非常高的市盈率进行交易，这表明市场对两者的预期都相当乐观。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 非常高，表明其估值较为昂贵，可能反映了市场对其高增长的期待或一定程度的估值偏高。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）报告盈利为负，这引发了对其当前盈利能力的担忧。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的市盈率 ${stockTwoPriceToEarningsRatioString} 异常之高，表明其估值可能在很大程度上依赖于未来的增长，或者可能已被高估。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）盈利为负，就其当前盈利能力而言，这是一个值得严重关注的问题。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `对于 ${stockTwoIndustry} 行业，${stockTwoSymbol} 的市盈率（${stockTwoPriceToEarningsRatioString}）被认为非常高，这可能意味着与同业相比，其估值偏高。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）报告盈利为负。${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）也未能盈利，表明两家公司均面临财务挑战。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）的未盈利状况值得关注。${stockTwoSymbol} 的市盈率 ${stockTwoPriceToEarningsRatioString} 也非常高，这突显了两家公司不同类型的财务警示信号。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 表明其盈利为负，就其当前盈利能力而言，这是一个显著的隐忧。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）和 ${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）均明显处于未盈利状态，其负市盈率便是证明。这不禁让人对其财务表现产生严重疑问。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `尽管 ${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}）面临未盈利的困境，${stockTwoSymbol} 的市盈率 ${stockTwoPriceToEarningsRatioString} 在 ${stockTwoIndustry} 行业中却被认为非常高。这些情况代表了两者不同的财务风险。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 为负，这是一个值得关注的问题，表明其目前未能实现盈利。`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 非常高，暗示其估值较为昂贵。${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）目前则未能盈利。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市盈率: ${stockOnePriceToEarningsRatioString}，在 ${stockOneIndustry} 行业中属非常高水平）和 ${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}，同样非常高）的市盈率倍数均处于高位，暗示市场预期乐观。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `对于 ${stockOneIndustry} 行业的一家公司而言，${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 被认为非常高，这可能表明其估值有些过于乐观。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的市盈率（${stockOnePriceToEarningsRatioString}）显著偏高。${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）则报告盈利为负。这些不同情况分别揭示了两家公司各自的财务担忧。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `相对于各自所在的行业（${stockOneSymbol} 市盈率: ${stockOnePriceToEarningsRatioString}，${stockOneIndustry}行业；${stockTwoSymbol} 市盈率: ${stockTwoPriceToEarningsRatioString}，${stockTwoIndustry}行业），两家公司的市盈率都非常高，预示着市场对两者均抱有乐观情绪。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `在 ${stockOneIndustry} 行业内，${stockOneSymbol} 的市盈率 ${stockOnePriceToEarningsRatioString} 被认为非常高，这可能意味着其增长前景已在股价中得到了充分甚至过度的反映。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（市盈率: ${stockTwoPriceToEarningsRatioString}）目前未能盈利，其负市盈率反映了这一点。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的估值似乎偏高，其市盈率高达 ${stockTwoPriceToEarningsRatioString}。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的市盈率 ${stockTwoPriceToEarningsRatioString} 为负，表明其未能实现盈利，这是一个显著的财务隐忧。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的市盈率 ${stockTwoPriceToEarningsRatioString} 在 ${stockTwoIndustry} 行业中处于非常高的水平，可能暗示其估值较为昂贵。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
