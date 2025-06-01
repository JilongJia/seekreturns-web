import type { PriceToBookRatioAnalysisResult } from "@/app/lib/stock-analysis/getPriceToBookRatioAnalysis";

export type GeneratePriceToBookRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOnePriceToBookRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: PriceToBookRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoPriceToBookRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: PriceToBookRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generatePriceToBookRatioCommentary({
  stockOneSymbol,
  stockOnePriceToBookRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoPriceToBookRatioValue,
  stockTwoIndustry,
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
      return `${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}）和 ${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）均报告其账面价值为负。这预示着两家公司的财务稳定性和偿付能力均面临严重问题。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 表明其账面价值为负，这是一个关键的财务隐患。与此不同，${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 非常高，这表明市场对其净资产给予了较高的溢价。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 表明其股东权益为负，这对该公司的财务健康状况而言是一个重要的危险信号。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 反映其账面价值为负，这是一个主要的财务隐患。${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）同样显示账面价值为负，这对两家公司而言都是一个关键问题。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的账面价值为负（市净率: ${stockOnePriceToBookRatioString}），这引发了对其偿付能力的疑问。对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 被认为非常高，表明市场对其净资产给予了高额溢价。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 显示其账面价值为负，这是财务困境的严重标志。`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 非常高，意味着投资者为其账面价值支付了显著的溢价。${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）则账面价值为负，存在严重的偿付能力问题。两者均呈现出不同的风险点。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}）和 ${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）的显著特点是其非常高的市净率。这通常表明市场对这两家公司的估值远高于其会计账面净值，可能归因于其强大的无形资产或较高的增长预期。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的市净率高达 ${stockOnePriceToBookRatioString}，表明市场对其净资产给予了大幅溢价，这通常反映了其较高的净资产收益率或良好的增长前景。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 非常高的市净率（${stockOnePriceToBookRatioString}）显示市场给予了其较高的估值。而 ${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）则因账面价值为负而面临严峻的财务问题。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}）与 ${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}，在 ${stockTwoIndustry} 行业中属非常高水平）的股价均远高于其账面价值。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 非常高，标志着市场对其会计净值给予了很强的估值溢价。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）报告其账面价值为负，这是财务状况不稳定的严重信号。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 非常高，表明投资者对其资产和未来前景的估值远超其会计账面价值。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的市净率（${stockTwoPriceToBookRatioString}）显示其账面价值为负，这是一个关键的财务隐患。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 被认为非常高，表明市场对其净资产给予了很高的溢价。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}）显示账面价值为负，这是一个严重的财务警示。${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）的账面价值同样为负，凸显了两家公司均面临偿付能力风险。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的账面价值为负（市净率: ${stockOnePriceToBookRatioString}）是一个关键问题。${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 也非常高，表明两家公司各自面临着不同的财务考量。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 表明其账面价值为负，是财务稳定性的一个重要隐患。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}）和 ${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）均报告其账面价值为负，这是财务健康方面的一个严重危险信号。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `尽管 ${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}）存在账面价值为负的问题，${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 在 ${stockTwoIndustry} 行业中却被认为非常高。两者分别代表了不同形式的财务极端状况。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 为负，这是一个关键问题，预示着潜在的偿付危机。`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 非常高。相比之下，${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）的账面价值为负，这是一个严重的财务问题。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（市净率: ${stockOnePriceToBookRatioString}，在 ${stockOneIndustry} 行业中属非常高水平）和 ${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}，同样非常高）均表明市场对它们的估值远高于其净资产价值。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `对于 ${stockOneIndustry} 行业的一家公司而言，${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 被认为非常高，这表明市场对其账面价值给予了很高的溢价。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的市净率（${stockOnePriceToBookRatioString}）显著偏高。${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）则报告其账面价值为负，这是一个关键的财务问题。这些情况都突显了对两家公司不同方面的财务担忧。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `相对于各自所在的行业（${stockOneSymbol} 市净率: ${stockOnePriceToBookRatioString}，${stockOneIndustry}行业；${stockTwoSymbol} 市净率: ${stockTwoPriceToBookRatioString}，${stockTwoIndustry}行业），两家公司的市净率都非常高，反映了显著的市场溢价。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `在 ${stockOneIndustry} 行业内，${stockOneSymbol} 的市净率 ${stockOnePriceToBookRatioString} 被认为非常高，这可能源于其较高的净资产收益率、无形资产价值或强劲的增长预期。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（市净率: ${stockTwoPriceToBookRatioString}）的账面价值为负，表明其财务状况严重不稳定。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `市场对 ${stockTwoSymbol} 给予了较高溢价，其非常高的市净率 ${stockTwoPriceToBookRatioString} 便证明了这一点。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 为负，就其财务偿付能力而言，这是一个关键的风险点。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的市净率 ${stockTwoPriceToBookRatioString} 在 ${stockTwoIndustry} 行业中处于非常高的水平，表明市场对其净资产价值给予了大幅溢价。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
