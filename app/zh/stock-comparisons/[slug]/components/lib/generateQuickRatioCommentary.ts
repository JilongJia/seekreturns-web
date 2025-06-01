import type { QuickRatioAnalysisResult } from "@/app/lib/stock-analysis/getQuickRatioAnalysis";

export type GenerateQuickRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneQuickRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: QuickRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoQuickRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: QuickRatioAnalysisResult;
};

type DescriptiveQuickRatioCategory = "Low" | "Other";

export function generateQuickRatioCommentary({
  stockOneSymbol,
  stockOneQuickRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoQuickRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- 股票一：应用通用标准 ---
    case "DefaultStandardApplied_Low_DefaultStandardApplied_Low":
      return `${stockOneSymbol}（速动比率: ${stockOneQuickRatioString}）和 ${stockTwoSymbol}（速动比率: ${stockTwoQuickRatioString}）的即时流动性似乎均显不足。两者偏低的速动比率表明，其可快速变现的资产（不包括存货）可能难以覆盖短期内到期的债务。`;
    case "DefaultStandardApplied_Low_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的速动比率 ${stockOneQuickRatioString} 偏低，这引发了对其仅用最具流动性的资产（不包括存货）来履行即期偿债义务能力的疑问。`;
    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `${stockOneSymbol} 的速动比率 ${stockOneQuickRatioString} 表现偏低。同样，${stockTwoSymbol} 的速动比率 ${stockTwoQuickRatioString} 在其所属的 ${stockTwoIndustry} 行业中也被认为是偏低的，这表明两家公司可能都需要依赖销售存货来偿还短期债务。`;
    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `从 ${stockOneSymbol} 较低的速动比率 ${stockOneQuickRatioString} 来看，该公司在不清算存货的情况下满足短期债务的能力似乎有限。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Low":
      return `对于 ${stockTwoSymbol} 而言，其速动比率 ${stockTwoQuickRatioString} 偏低。这突出表明该公司在履行短期财务义务时，可能依赖于将存货转化为现金。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `${stockTwoSymbol} 的速动比率 ${stockTwoQuickRatioString}，在其所属的 ${stockTwoIndustry} 行业中被视为偏低。与同业相比，这可能表明其即时偿债能力较为紧张。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Low":
      return `${stockOneSymbol} 在 ${stockOneIndustry} 行业中速动比率 ${stockOneQuickRatioString} 偏低，加之 ${stockTwoSymbol} 的速动比率 ${stockTwoQuickRatioString} 也处于低位，这预示两家公司在不清算存货的情况下应付即期债权人要求时都可能面临挑战。`;
    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Other":
      return `考虑到 ${stockOneIndustry} 行业的背景，${stockOneSymbol} 的速动比率 ${stockOneQuickRatioString} 偏低，这暗示其即时流动性（即不含存货的资产）可能存在隐患。`;
    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `根据各自的行业基准，${stockOneSymbol}（速动比率: ${stockOneQuickRatioString}，${stockOneIndustry}行业）和 ${stockTwoSymbol}（速动比率: ${stockTwoQuickRatioString}，${stockTwoIndustry}行业）均录得偏低的速动比率。这可能表明它们对存货等流动性较差的流动资产存在过度依赖。`;
    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的速动比率（${stockOneQuickRatioString}）相对于 ${stockOneIndustry} 行业的常规水平而言偏低，表明其最易变现的资产（扣除存货后）可能不足以应付其即期负债。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Low":
      return `对 ${stockTwoSymbol} 的考察显示其速动比率 ${stockTwoQuickRatioString} 偏低。这可能意味着该公司在不动用存货销售的情况下，应对即期负债的能力有所下降。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `在 ${stockTwoIndustry} 行业中，${stockTwoSymbol} 的速动比率 ${stockTwoQuickRatioString} 被评为偏低，这可能反映出其即时流动性低于行业同类公司的普遍预期。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
