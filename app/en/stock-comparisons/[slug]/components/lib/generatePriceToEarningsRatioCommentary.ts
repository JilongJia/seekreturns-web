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
    // --- Stock 1: DefaultStandardApplied ---
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `Unprofitability currently marks both ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) and ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}), as indicated by their negative P/E ratios.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) is reporting negative earnings, signaling unprofitability. In contrast, ${stockTwoSymbol} has a very high P/E of ${stockTwoPriceToEarningsRatioString}, suggesting its valuation is significantly stretched.`;
    case "DefaultStandardApplied_Negative_DefaultStandardApplied_Other":
      return `With a P/E ratio of ${stockOnePriceToEarningsRatioString}, ${stockOneSymbol} is showing negative earnings, a point of concern for its current financial performance.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) shows negative earnings. Similarly, ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) also reports negative earnings. Both situations highlight concerns about current profitability.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockOneSymbol} is unprofitable with a P/E of ${stockOnePriceToEarningsRatioString}. ${stockTwoSymbol}’s P/E of ${stockTwoPriceToEarningsRatioString} is deemed very high for the ${stockTwoIndustry} sector, indicating distinct financial concerns for each company.`;
    case "DefaultStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `The P/E ratio for ${stockOneSymbol} stands at ${stockOnePriceToEarningsRatioString}, signifying negative earnings and raising questions about its current profitability.`;

    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} displays a very high P/E ratio of ${stockOnePriceToEarningsRatioString}, pointing to a possibly overextended valuation. ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}), on the other hand, is unprofitable. Both situations warrant investor attention.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `Very high P/E ratios are presented by ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) and ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}). This may indicate that substantial future growth is priced in or could imply overvaluation risks for both entities.`;
    case "DefaultStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `The P/E ratio for ${stockOneSymbol} is very high at ${stockOnePriceToEarningsRatioString}, suggesting its market valuation has factored in considerable future growth expectations or might be overstretched.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `${stockOneSymbol}’s P/E of ${stockOnePriceToEarningsRatioString} is quite elevated. Meanwhile, ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) is struggling with unprofitability. These differing circumstances point to unique valuation or performance concerns for each.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Both ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) and ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}, which is very high for the ${stockTwoIndustry} industry) are trading at very high P/E multiples, suggesting that market expectations for both are quite optimistic.`;
    case "DefaultStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A very high P/E ratio of ${stockOnePriceToEarningsRatioString} for ${stockOneSymbol} indicates its valuation is rich, possibly reflecting high growth anticipation or a degree of overvaluation.`;

    case "DefaultStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) is reporting negative earnings, which raises concerns about its current profitability.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `${stockTwoSymbol}’s P/E ratio of ${stockTwoPriceToEarningsRatioString} is exceptionally high, suggesting its valuation might be considerably dependent on future growth or it could be overvalued.`;
    case "DefaultStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) shows negative earnings, which is a significant concern regarding its current profitability.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `The P/E ratio for ${stockTwoSymbol} (${stockTwoPriceToEarningsRatioString}) is considered very high for the ${stockTwoIndustry} industry, suggesting a potentially stretched valuation compared to its peers.`;
    case "DefaultStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    // --- Stock 1: IndustrySpecificStandardApplied ---
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Negative":
      return `${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) is reporting negative earnings. ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) is also unprofitable, indicating financial challenges for both.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_VeryHigh":
      return `Unprofitability is a concern for ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}). ${stockTwoSymbol}’s P/E of ${stockTwoPriceToEarningsRatioString} is also very high, highlighting different types of financial flags for these companies.`;
    case "IndustrySpecificStandardApplied_Negative_DefaultStandardApplied_Other":
      return `${stockOneSymbol}’s P/E ratio of ${stockOnePriceToEarningsRatioString} indicates negative earnings, a notable concern regarding its current profitability.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Negative":
      return `A state of unprofitability is evident for both ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) and ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}), as indicated by their negative P/E ratios. This raises serious questions about their financial performance.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_VeryHigh":
      return `While ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}) faces unprofitability, ${stockTwoSymbol}’s P/E of ${stockTwoPriceToEarningsRatioString} is considered very high for the ${stockTwoIndustry} industry. These represent distinct financial risks.`;
    case "IndustrySpecificStandardApplied_Negative_IndustrySpecificStandardApplied_Other":
      return `The negative P/E ratio of ${stockOnePriceToEarningsRatioString} for ${stockOneSymbol} is a concern, indicating it is currently unprofitable.`;

    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Negative":
      return `${stockOneSymbol}’s P/E ratio of ${stockOnePriceToEarningsRatioString} is very high for the ${stockOneIndustry} industry, implying a rich valuation. ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) is currently unprofitable.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_VeryHigh":
      return `${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString}, very high for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}, also very high) both trade at elevated P/E multiples, suggesting optimistic market expectations.`;
    case "IndustrySpecificStandardApplied_VeryHigh_DefaultStandardApplied_Other":
      return `For a company in the ${stockOneIndustry} industry, ${stockOneSymbol}’s P/E ratio of ${stockOnePriceToEarningsRatioString} is considered very high, suggesting its valuation might be overly optimistic.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Negative":
      return `The P/E for ${stockOneSymbol} (${stockOnePriceToEarningsRatioString}) is notably high for the ${stockOneIndustry} industry. ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) reports negative earnings. These distinct situations highlight different financial concerns for each company.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_VeryHigh":
      return `Relative to their respective industries, both ${stockOneSymbol} (P/E: ${stockOnePriceToEarningsRatioString} for the ${stockOneIndustry} industry) and ${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString} for the ${stockTwoIndustry} industry) exhibit very high P/E ratios, pointing to optimistic market sentiment for both.`;
    case "IndustrySpecificStandardApplied_VeryHigh_IndustrySpecificStandardApplied_Other":
      return `A P/E ratio of ${stockOnePriceToEarningsRatioString} for ${stockOneSymbol} is considered very high within the ${stockOneIndustry} industry, which could mean its growth prospects are heavily priced in.`;

    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Negative":
      return `${stockTwoSymbol} (P/E: ${stockTwoPriceToEarningsRatioString}) is currently unprofitable, as shown by its negative earnings.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_VeryHigh":
      return `The valuation of ${stockTwoSymbol} appears stretched, with a very high P/E ratio of ${stockTwoPriceToEarningsRatioString}.`;
    case "IndustrySpecificStandardApplied_Other_DefaultStandardApplied_Other":
      return "";
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Negative":
      return `${stockTwoSymbol}’s negative P/E ratio of ${stockTwoPriceToEarningsRatioString} indicates unprofitability, which is a significant financial concern.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_VeryHigh":
      return `${stockTwoSymbol} shows a P/E ratio of ${stockTwoPriceToEarningsRatioString}, which is very high for the ${stockTwoIndustry} sector, suggesting a potentially rich valuation.`;
    case "IndustrySpecificStandardApplied_Other_IndustrySpecificStandardApplied_Other":
      return "";

    default:
      return "";
  }
}
