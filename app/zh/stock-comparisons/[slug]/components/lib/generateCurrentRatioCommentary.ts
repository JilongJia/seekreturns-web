import type { CurrentRatioAnalysisResult } from "@/app/lib/stock-analysis/getCurrentRatioAnalysis";

export type GenerateCurrentRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneCurrentRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: CurrentRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoCurrentRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: CurrentRatioAnalysisResult;
};

type DescriptiveCurrentRatioCategory = "Low" | "Other";

export function generateCurrentRatioCommentary({
  stockOneSymbol,
  stockOneCurrentRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoCurrentRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- 股票一：应用通用标准 ---

    case "DefaultStandardApplied_Low_DefaultStandardApplied_Low":
      return `${stockOneSymbol}（流动比率: ${stockOneCurrentRatioString}）和 ${stockTwoSymbol}（流动比率: ${stockTwoCurrentRatioString}）的流动比率均表现偏低。这表明两家公司在顺利偿还即期债务方面可能面临挑战。`;

    case "DefaultStandardApplied_Low_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的流动比率 ${stockOneCurrentRatioString} 偏低，可能反映其短期流动性承压。这意味着该公司的流动资产可能难以完全覆盖其短期债务。`;

    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `${stockOneSymbol} 的流动比率 ${stockOneCurrentRatioString} 较低。同时，${stockTwoSymbol} 的流动比率 ${stockTwoCurrentRatioString} 在其所属的 ${stockTwoIndustry} 行业中也处于偏低水平。两家公司的营运资金可能都面临一定压力。`;

    case "DefaultStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `考虑到 ${stockOneSymbol} 的流动比率为 ${stockOneCurrentRatioString}，该公司利用流动资产覆盖其短期负债的能力似乎较为有限。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Low":
      return `${stockTwoSymbol} 的流动比率 ${stockTwoCurrentRatioString} 偏低。这可能说明其易变现资产不足以覆盖即将到期的负债，其财务灵活性或将因此受限。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";

    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的流动比率 ${stockTwoCurrentRatioString} 被认为是偏低的。这突出表明，与行业内其他公司相比，该公司在管理短期财务责任方面可能存在困难。`;

    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---

    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Low":
      return `对于 ${stockOneIndustry} 行业而言，${stockOneSymbol} 的流动比率 ${stockOneCurrentRatioString} 偏低。同时 ${stockTwoSymbol} 的流动比率 ${stockTwoCurrentRatioString} 也处于低位，这表明两家公司的短期财务稳定性可能均存在不足。`;

    case "IndustrySpecificStandardApplied_Low_DefaultStandardApplied_Other":
      return `对于一家 ${stockOneIndustry} 行业的公司而言，${stockOneSymbol} 的流动比率 ${stockOneCurrentRatioString} 处于较低水平。这意味着其流动资产超出短期负债的缓冲，对于其所在行业而言可能不够理想。`;

    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Low":
      return `参照各自行业标准，${stockOneSymbol}（流动比率: ${stockOneCurrentRatioString}，${stockOneIndustry}行业）和 ${stockTwoSymbol}（流动比率: ${stockTwoCurrentRatioString}，${stockTwoIndustry}行业）的流动比率均偏低。这可能意味着，与行业通常水平相比，它们在应对近期负债方面都可能遇到困难。`;

    case "IndustrySpecificStandardApplied_Low_IndustrySpecificStandardApplied_Other":
      return `相对于 ${stockOneIndustry} 行业的基准，${stockOneSymbol} 的流动比率 ${stockOneCurrentRatioString} 被认为偏低。这可能影响其在自身运营环境下轻松履行短期偿债义务的能力。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Low":
      return `${stockTwoSymbol} 的流动比率 ${stockTwoCurrentRatioString} 偏低。这可能暗示其流动资产与即将到期的短期财务责任之间存在一定程度的不平衡。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";

    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Low":
      return `在 ${stockTwoIndustry} 行业中，${stockTwoSymbol} 的流动比率 ${stockTwoCurrentRatioString} 被认为偏低。这可能意味着与同行业其他公司相比，${stockTwoSymbol} 的营运资本状况更为紧张。`;

    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
