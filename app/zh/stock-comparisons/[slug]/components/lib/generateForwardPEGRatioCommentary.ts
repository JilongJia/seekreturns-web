import type { ForwardPEGRatioAnalysisResult } from "@/app/lib/stock-analysis/getForwardPEGRatioAnalysis";

export type GenerateForwardPEGRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneForwardPEGRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: ForwardPEGRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoForwardPEGRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: ForwardPEGRatioAnalysisResult;
};

type DescriptiveCategory = "Negative" | "VeryHigh" | "Other";

export function generateForwardPEGRatioCommentary({
  stockOneSymbol,
  stockOneForwardPEGRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoForwardPEGRatioValue,
  stockTwoIndustry,
  stockTwoAnalysisResult,
}: GenerateForwardPEGRatioCommentaryParams): string {
  const stockOneForwardPEGRatioString = stockOneForwardPEGRatioValue.toFixed(2);
  const stockTwoForwardPEGRatioString = stockTwoForwardPEGRatioValue.toFixed(2);

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
      return `${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}）和 ${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率均存在问题。这类比率通常表明公司盈利为负、增长预测不佳，或存在其他使其估值与增长前景受到质疑的因素。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 表现不佳，可能暗示其盈利或增长前景存在问题。与此同时，${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 非常高，这表明其估值可能已大幅领先于其预期的增长速度。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 状况不佳，这可能源于其盈利为负或增长前景黯淡。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 令人担忧。${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 也显示存在问题。这些情况表明两家公司在估值相对于增长前景方面均存在显著的隐忧。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的预期PEG比率（${stockOneForwardPEGRatioString}）不理想。${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 在 ${stockTwoIndustry} 行业中被认为非常高，这预示着两家公司各自在估值或增长方面存在不同的隐患。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 状况不佳，这可能暗示其基本盈利能力或增长预期方面存在潜在问题。`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 非常高，表明其当前股价相对于其增长预测可能过于乐观。${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率则不理想，这通常是由于盈利为负或增长存在问题。两者均体现出估值方面的担忧。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}）和 ${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）均呈现非常高的预期PEG比率。这可能表明它们的股价已大幅领先于预期的盈利增长，或暗示存在估值过高的风险。`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的预期PEG比率非常高，为 ${stockOneForwardPEGRatioString}，这意味着其股价可能已过度反映了未来的增长预期，甚至可能偏高。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 非常高，暗示其相对于增长的估值偏高。${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）则面临预期PEG比率不佳的困境。这些不同情况都引发了对两家公司估值的疑问。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}）和 ${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}，此比率在 ${stockTwoIndustry} 行业中属于非常高水平）均显示出非常高的预期PEG比率。这表明它们的估值可能已显著超出预期的盈利增长。`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 非常高，这表明其估值已充分（甚至过度）计入了未来的增长预期，可能处于估值偏高的位置。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 不理想，通常反映了公司盈利为负或增长前景面临挑战。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 非常高，表明其估值与其预期的盈利增长相比可能过于激进。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的预期PEG比率（${stockTwoForwardPEGRatioString}）状况不佳，就其估值相对于增长前景而言，这是一个值得重点关注的问题。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `对于 ${stockTwoIndustry} 行业而言，${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 被认为非常高，这可能意味着其股价已超前反映了其增长预期。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}）的预期PEG比率不理想。${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率同样存在问题，给两家公司的估值都敲响了警钟。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 不理想，是一个值得关注的问题。${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 也处于非常高的水平，凸显了两者各自面临的不同类型的估值挑战。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 不理想，就其估值相对于预期增长而言，这是一个令人担忧的信号。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}）和 ${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率均不理想，这预示着它们的盈利或增长前景可能存在问题，从而对其估值产生负面影响。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `尽管 ${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}）的预期PEG比率不佳，${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 在 ${stockTwoIndustry} 行业中却被认为非常高。这些因素给两家公司都带来了显著的估值风险。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 不理想，引发了对其估值相对于增长前景的担忧。`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 非常高。相比之下，${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率不理想，表明其增长或盈利前景存在问题。两种情况均引人关注其估值。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol}（预期PEG比率: ${stockOneForwardPEGRatioString}，在 ${stockOneIndustry} 行业中属非常高水平）和 ${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}，同样非常高）均表明它们的股价可能已大幅超越预期的盈利增长。`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `对于 ${stockOneIndustry} 行业的一家公司而言，${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 被认为非常高，这意味着其估值在很大程度上依赖于未来的增长。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `在 ${stockOneIndustry} 行业中，${stockOneSymbol} 的预期PEG比率（${stockOneForwardPEGRatioString}）显著偏高。而 ${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率不佳，同样值得关注。两者代表了不同类型的估值考量。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `相对于各自所在的行业（${stockOneSymbol} 预期PEG比率: ${stockOneForwardPEGRatioString}，${stockOneIndustry}行业；${stockTwoSymbol} 预期PEG比率: ${stockTwoForwardPEGRatioString}，${stockTwoIndustry}行业），两家公司的预期PEG比率都非常高。这表明在各自的行业背景下，它们的估值相对于增长预期可能都偏高。`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `在 ${stockOneIndustry} 行业内，${stockOneSymbol} 的预期PEG比率 ${stockOneForwardPEGRatioString} 被认为非常高，这可能意味着其增长潜力已经完全或过度地反映在当前价格中。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol}（预期PEG比率: ${stockTwoForwardPEGRatioString}）的预期PEG比率不理想，暗示其盈利或增长前景可能存在问题。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的预期PEG比率（${stockTwoForwardPEGRatioString}）非常高，表明其股价可能已显著领先于预期的盈利增长。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 表现不佳，就其估值相对于预期增长而言，这是一个重要的警示信号。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} 的预期PEG比率 ${stockTwoForwardPEGRatioString} 在 ${stockTwoIndustry} 行业中处于非常高的水平，表明其估值可能过于乐观。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
