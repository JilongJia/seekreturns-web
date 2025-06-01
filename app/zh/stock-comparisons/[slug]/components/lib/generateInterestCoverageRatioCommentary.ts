import type { InterestCoverageRatioAnalysisResult } from "@/app/lib/stock-analysis/getInterestCoverageRatioAnalysis";

export type GenerateInterestCoverageRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneInterestCoverageRatioValue: number;
  stockOneIndustry: string;
  stockOneAnalysisResult: InterestCoverageRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoInterestCoverageRatioValue: number;
  stockTwoIndustry: string;
  stockTwoAnalysisResult: InterestCoverageRatioAnalysisResult;
};

type DescriptiveInterestCoverageRatioCategory =
  | "Negative"
  | "CriticallyLow"
  | "Other";

export function generateInterestCoverageRatioCommentary({
  stockOneSymbol,
  stockOneInterestCoverageRatioValue,
  stockOneIndustry,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoInterestCoverageRatioValue,
  stockTwoIndustry,
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

  const stockOneAnalysisResultType = stockOneAnalysisResult.type;
  const stockTwoAnalysisResultType = stockTwoAnalysisResult.type;

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

  const decisionKey = `${stockOneAnalysisResultType}_${stockOneDescriptiveCategory}_${stockTwoAnalysisResultType}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    // --- 股票一：应用通用标准 ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `对 ${stockOneSymbol}（利息保障倍数: ${stockOneICRString}）和 ${stockTwoSymbol}（利息保障倍数: ${stockTwoICRString}）而言，财务前景均堪忧。两者均显示利息保障倍数为负，表明其经营利润不足以覆盖利息支出，这对双方都是一个严重的警示信号。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_CriticallyLow":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString} 为负，凸显其经营利润无法覆盖利息支出。${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 也处于极低水平，使两家公司在偿付债务方面均承受巨大压力。`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的利息保障倍数为 ${stockOneICRString}，预示其经营利润为负。这意味着该公司的收入无法覆盖利息支付，这是一个关键的财务薄弱环节。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString}（经营利润为负）的状况令人深感忧虑。${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 同样为负，反映了类似情况，预示着两家公司在履行偿债义务方面均面临严重困境。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_CriticallyLow":
      return `${stockOneSymbol}（利息保障倍数: ${stockOneICRString}）的经营利润明显为负。而 ${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 对于 ${stockTwoIndustry} 行业而言属于极低水平，这表明两家公司在按时支付利息方面均面临重大挑战。`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString} 表明其经营利润为负，使其无法支付利息费用——这是一个严重的财务危险信号。`;

    case "DefaultStandardApplied_CriticallyLow_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString} 极低，难以履行其利息支付义务。${stockTwoSymbol} 的情况更为糟糕，其利息保障倍数 ${stockTwoICRString} 为负，表明其经营活动已无法覆盖利息支出。`;
    case "DefaultStandardApplied_CriticallyLow_DefaultStandardApplied_CriticallyLow":
      return `${stockOneSymbol}（利息保障倍数: ${stockOneICRString}）和 ${stockTwoSymbol}（利息保障倍数: ${stockTwoICRString}）的利息保障倍数均处于极低水平，这使其在履行债务利息承诺方面面临较高风险。`;
    case "DefaultStandardApplied_CriticallyLow_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的利息保障倍数（${stockOneICRString}）极低。这意味着其经营收入几乎无法覆盖（甚至可能无法覆盖）利息支出，财务状况岌岌可危。`;
    case "DefaultStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的利息保障倍数（${stockOneICRString}）处于极低水平。${stockTwoSymbol} 则面临更严重的问题，其利息保障倍数 ${stockTwoICRString} 为负，凸显其经营活动已无力覆盖利息。`;
    case "DefaultStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_CriticallyLow":
      return `${stockOneSymbol}（利息保障倍数: ${stockOneICRString}）和 ${stockTwoSymbol}（利息保障倍数: ${stockTwoICRString}，在 ${stockTwoIndustry} 行业中属极低水平）均表明其经营利润不足以轻松应对各自的利息支付。`;
    case "DefaultStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString} 极低，表明其经营收入在支付利息费用方面捉襟见肘，构成了重大的财务风险。`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 显示其经营利润为负，使其无法覆盖利息支付——这是一个关键的财务问题。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_CriticallyLow":
      return `${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 处于极低水平，表明其经营收入未能充分覆盖利息支出，这是一个财务隐忧。`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 表明其经营利润为负，这对于其偿债能力而言是一个尤其令人担忧的信号。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_CriticallyLow":
      return `在 ${stockTwoIndustry} 行业中，${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 属于极低水平，暗示其经营收入不足以应付其利息支付义务。`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- 股票一：应用行业特定标准 ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}（利息保障倍数: ${stockOneICRString}）的利息保障倍数为负，是一个主要风险点。${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 也为负，反映了类似情况，预示着两家公司均面临严重的财务困境。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_CriticallyLow":
      return `${stockOneSymbol} 的负利息保障倍数 ${stockOneICRString} 是一个关键问题。${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 也处于极低水平。两家公司在偿还债务方面都面临着深远的挑战。`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString} 表明其经营利润为负，这对该公司能否按期支付利息构成了严峻的考验。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `负的利息保障倍数困扰着 ${stockOneSymbol}（利息保障倍数: ${stockOneICRString}）和 ${stockTwoSymbol}（利息保障倍数: ${stockTwoICRString}），这是对其经营盈利能力和偿债能力的严重警告。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_CriticallyLow":
      return `${stockOneSymbol} 的负利息保障倍数 ${stockOneICRString} 构成了一个重大的财务隐患。${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString}（在 ${stockTwoIndustry} 行业中属极低水平）也指向了较高的财务风险。`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `对 ${stockOneSymbol} 而言，其利息保障倍数 ${stockOneICRString} 表明经营利润为负，这对该公司覆盖利息支出的能力构成了严重威胁。`;

    case "IndustrySpecificStandardApplied_CriticallyLow_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString}（在 ${stockOneIndustry} 行业中属极低水平）令人担忧。${stockTwoSymbol} 则因利息保障倍数 ${stockTwoICRString} 为负而处于更为严峻的境地。`;
    case "IndustrySpecificStandardApplied_CriticallyLow_DefaultStandardApplied_CriticallyLow":
      return `${stockOneSymbol} 的利息保障倍数（${stockOneICRString}，对 ${stockOneIndustry} 行业而言极低）以及 ${stockTwoSymbol} 同样较低的利息保障倍数（${stockTwoICRString}），均预示着较高的利息支付困难风险。`;
    case "IndustrySpecificStandardApplied_CriticallyLow_DefaultStandardApplied_Other":
      return `对于 ${stockOneIndustry} 行业而言，${stockOneSymbol} 的利息保障倍数（${stockOneICRString}）极低，因为其经营收入几乎不足以（或无法）覆盖利息成本。`;
    case "IndustrySpecificStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} 的利息保障倍数 ${stockOneICRString} 在 ${stockOneIndustry} 行业中属于极低水平。${stockTwoSymbol}（利息保障倍数: ${stockTwoICRString}）则报告利息覆盖为负，表明其相对于利息义务的经营问题更为严重。`;
    case "IndustrySpecificStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_CriticallyLow":
      return `${stockOneSymbol}（利息保障倍数: ${stockOneICRString}，在 ${stockOneIndustry} 行业中极低）和 ${stockTwoSymbol}（利息保障倍数: ${stockTwoICRString}，在 ${stockTwoIndustry} 行业中极低）的经营利润均不足以轻松履行其利息支付责任。`;
    case "IndustrySpecificStandardApplied_CriticallyLow_IndustrySpecificStandardApplied_Other":
      return `${stockOneSymbol} 的经营收入（利息保障倍数: ${stockOneICRString}）几乎无法覆盖（或低于）其利息支出，这种状况在 ${stockOneIndustry} 行业中被认为是极低的。`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} 面临一个关键的财务问题，其利息保障倍数 ${stockTwoICRString} 表明经营利润为负，不足以覆盖其利息支付。`;
      return `${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 极低，这意味着其经营收入未能为利息支出提供足够的保障，预示着显著的财务风险。`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} 的利息保障倍数（${stockTwoICRString}）显示其经营利润为负，这对于其偿债能力而言是一个尤其令人不安的迹象。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_CriticallyLow":
      return `在 ${stockTwoIndustry} 行业中，${stockTwoSymbol} 的利息保障倍数 ${stockTwoICRString} 被认为极低，这表明其经营性收益不足以应付利息。`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
