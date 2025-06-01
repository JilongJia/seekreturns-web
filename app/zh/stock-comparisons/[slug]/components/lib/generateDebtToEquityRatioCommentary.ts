import type { DebtToEquityRatioAnalysisResult } from "@/app/lib/stock-analysis/getDebtToEquityRatioAnalysis";

export type GenerateDebtToEquityRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneDebtToEquityRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: DebtToEquityRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoDebtToEquityRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: DebtToEquityRatioAnalysisResult;
};

type DescriptiveDebtToEquityRatioCategory = "Negative" | "VeryHigh" | "Other";

export function generateDebtToEquityRatioCommentary({
  stockOneSymbol,
  stockOneDebtToEquityRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoDebtToEquityRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- 股票一：应用通用标准 ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `对 ${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}）和 ${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}）而言，财务状况均显严峻。两家公司均报告股东权益为负，这指向了严重的偿付能力风险。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 表明其股东权益为负，这是一个严重的财务健康问题。${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 则非常高，同样显示出较高的财务风险。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的负债权益比率为 ${stockOneDebtToEquityRatioString}，反映其股东权益为负。这对该公司的财务稳定性和偿付能力而言是一个重要的危险信号。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 为负，引发了对其偿付能力的重大担忧。${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 同样为负，这种严峻状况表明两家公司均面临严重的财务不稳定性。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 意味着其股东权益为负，这是一个关键问题。对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 被认为非常高。这些情况凸显了两家公司都存在显著的财务脆弱性。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 表明其股东权益为负，这对该公司的财务稳健性构成了相当大的威胁。`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的债务负担非常沉重（负债权益比率: ${stockOneDebtToEquityRatioString}）。而 ${stockTwoSymbol} 的股东权益为负（负债权益比率: ${stockTwoDebtToEquityRatioString}），其处境更为不稳定。这表明两家公司都存在严重问题。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}）和 ${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}）均表现出极高的杠杆水平。两者的负债权益比率都非常高，预示着巨大的财务风险。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 极高的负债权益比率（${stockOneDebtToEquityRatioString}）意味着该公司债务负担异常沉重，并面临相当大的财务风险。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 非常高，指向较高的财务风险。${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 则为负，使其股东权益处于负值状态，凸显了两家公司均面临的重大隐忧。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}）呈现高杠杆特征。${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}）同样显示出非常高的杠杆水平，特别是对于 ${stockTwoIndustry} 行业而言。这表明两者均存在显著的财务风险。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的负债权益比率（${stockOneDebtToEquityRatioString}）非常高，反映出该公司对债务的严重依赖以及显著的财务风险。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 表明其股东权益为负，这是财务状况显著不稳定的迹象。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的财务结构显示其负债权益比率（${stockTwoDebtToEquityRatioString}）非常高，预示着沉重的债务负担和相当大的财务风险。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的股东权益为负（负债权益比率: ${stockTwoDebtToEquityRatioString}），这是一个关键问题，表明该公司正处于严重的财务困境。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 被认为非常高，这表明其债务结构较为激进，可能会影响公司的财务韧性。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}）报告股东权益为负，这是一个关键的财务警示。${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}）同样股东权益为负，预示两家公司均面临严峻的财务困境。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 为负，凸显了其财务健康的严重问题。${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 也非常高，表明两家公司各自面临着不同但均显著的财务脆弱性。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 表明其股东权益为负，这是一个严重的财务问题。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `对 ${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}）和 ${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}）来说，股东权益为负均是财务不稳定的一个关键指标。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 为负，这是一个令人警惕的信号。同时，在 ${stockTwoIndustry} 行业中，${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 也被认为非常高，显示两者均承担着巨大的财务风险。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 反映其股东权益为负，这对该公司的财务稳定性构成了重大威胁。`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的负债权益比率（${stockOneDebtToEquityRatioString}）非常高，表明其财务风险较大。${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}）则因股东权益为负而面临更为严峻的问题。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}，在 ${stockOneIndustry} 行业中属非常高水平）和 ${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}，同样非常高）均在以极高的杠杆运营，这是一个风险较高的财务状况。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `对于 ${stockOneIndustry} 行业的一家公司而言，${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 被认为非常高，表明该公司承担着异常沉重的债务负担。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的负债权益比率（${stockOneDebtToEquityRatioString}）在其所属的 ${stockOneIndustry} 行业中非常高，值得关注。${stockTwoSymbol} 的负债权益比率（${stockTwoDebtToEquityRatioString}）则显示其股东权益为负。两种情况都凸显了这两家公司面临的关键财务问题。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `在各自的行业背景下，${stockOneSymbol}（负债权益比率: ${stockOneDebtToEquityRatioString}，${stockOneIndustry}行业非常高）和 ${stockTwoSymbol}（负债权益比率: ${stockTwoDebtToEquityRatioString}，${stockTwoIndustry}行业非常高）的负债权益比率都非常高，表明两家公司均采用了激进的杠杆策略，财务风险巨大。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的负债权益比率 ${stockOneDebtToEquityRatioString} 非常高，这凸显了其沉重的债务负担及相关的财务风险。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 显示其股东权益为负，这是对其财务稳定性的一个严重警告。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的负债权益比率 ${stockTwoDebtToEquityRatioString} 非常高，表明其债务负担异常沉重，并可能带来巨大的财务风险。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `对 ${stockTwoSymbol} 而言，其负债权益比率 ${stockTwoDebtToEquityRatioString} 反映股东权益为负，这是财务困境的一个明确信号。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `在 ${stockTwoIndustry} 行业中，${stockTwoSymbol} 的负债权益比率（${stockTwoDebtToEquityRatioString}）被认为非常高，指向一种激进的债务结构和潜在的财务韧性问题。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
