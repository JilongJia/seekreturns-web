import type { DebtToEquityRatioAnalysisResult } from "@/app/lib/stock-analysis/getDebtToEquityRatioAnalysis";

type GenerateDebtToEquityRatioCommentaryParams = {
  stockOneSymbol: string;
  stockOneDebtToEquityRatioValue: number;
  stockOneAnalysisResult: DebtToEquityRatioAnalysisResult;
  stockTwoSymbol: string;
  stockTwoDebtToEquityRatioValue: number;
  stockTwoAnalysisResult: DebtToEquityRatioAnalysisResult;
};

type DescriptiveDebtToEquityRatioCategory = "Negative" | "VeryHigh" | "Other";

export function generateDebtToEquityRatioCommentary({
  stockOneSymbol,
  stockOneDebtToEquityRatioValue,
  stockOneAnalysisResult,
  stockTwoSymbol,
  stockTwoDebtToEquityRatioValue,
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

  const decisionKey = `${stockOneDescriptiveCategory}_${stockTwoDescriptiveCategory}`;

  switch (decisionKey) {
    case "Negative_Negative":
      return `${stockOneSymbol}’s Debt-to-Equity (D/E) ratio of ${stockOneDebtToEquityRatioString} and ${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString} both reflect negative shareholder equity. For ${stockOneSymbol}, this condition is a serious indicator of financial fragility, raising concerns about its operational viability. ${stockTwoSymbol}’s negative equity also points to critical solvency challenges and may impede its ability to meet long-term financial commitments.`;
    case "Negative_VeryHigh":
      return `${stockOneSymbol}’s Debt-to-Equity (D/E) ratio of ${stockOneDebtToEquityRatioString} indicates negative shareholder equity, a critical concern for its financial stability and solvency. ${stockTwoSymbol}, with a very high D/E ratio of ${stockTwoDebtToEquityRatioString}, is operating with substantial leverage, indicating notable financial risk.`;
    case "Negative_Other":
      return `${stockOneSymbol}’s Debt-to-Equity (D/E) ratio of ${stockOneDebtToEquityRatioString} indicates negative shareholder equity. This is a significant red flag, suggesting its liabilities exceed its assets and posing a considerable threat to its long-term financial health.`;
    case "VeryHigh_Negative":
      return `${stockOneSymbol}’s Debt-to-Equity (D/E) ratio of ${stockOneDebtToEquityRatioString} is very high, signifying a heavy reliance on debt and a high degree of financial leverage. ${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString} reflects negative shareholder equity, a severe condition that undermines its financial foundation.`;
    case "VeryHigh_VeryHigh":
      return `${stockOneSymbol}’s Debt-to-Equity (D/E) ratio of ${stockOneDebtToEquityRatioString} and ${stockTwoSymbol}’s D/E ratio of ${stockTwoDebtToEquityRatioString} are both very high. ${stockOneSymbol}’s high leverage suggests an aggressive financial posture that could be risky, especially in volatile market conditions. Similarly, ${stockTwoSymbol}’s significant debt burden may pressure its financial flexibility and debt servicing capacity.`;
    case "VeryHigh_Other":
      return `${stockOneSymbol}’s Debt-to-Equity (D/E) ratio of ${stockOneDebtToEquityRatioString} is very high. This indicates that the company is significantly financed by debt, which can amplify returns but also substantially increases its financial risk profile and vulnerability to earnings fluctuations.`;
    case "Other_Negative":
      return `${stockTwoSymbol}’s Debt-to-Equity (D/E) ratio of ${stockTwoDebtToEquityRatioString} indicates negative shareholder equity. This is a critical issue, signaling deep financial instability and potentially jeopardizing its ongoing operations and ability to secure credit.`;
    case "Other_VeryHigh":
      return `${stockTwoSymbol}’s Debt-to-Equity (D/E) ratio of ${stockTwoDebtToEquityRatioString} is very high. This signals a considerable debt load relative to equity, potentially heightening its risk during economic downturns or if interest rates rise, and may affect its financial resilience.`;
    case "Other_Other":
      return "";
    default:
      return "";
  }
}
