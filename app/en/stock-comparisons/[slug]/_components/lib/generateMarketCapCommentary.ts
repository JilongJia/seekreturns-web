type GenerateMarketCapCommentaryParams = {
  stockOneSymbol: string;
  stockOneMarketCap: number;
  stockOneCurrency: string;
  stockTwoSymbol: string;
  stockTwoMarketCap: number;
  stockTwoCurrency: string;
};

export function generateMarketCapCommentary({
  stockOneSymbol,
  stockOneMarketCap,
  stockOneCurrency,
  stockTwoSymbol,
  stockTwoMarketCap,
  stockTwoCurrency,
}: GenerateMarketCapCommentaryParams): string {
  if (stockOneMarketCap <= 0 || stockTwoMarketCap <= 0) {
    return "";
  }

  const stockOneMarketCapString = (stockOneMarketCap / 1e9).toLocaleString(
    "en",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
  const stockTwoMarketCapString = (stockTwoMarketCap / 1e9).toLocaleString(
    "en",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  const ratio = stockOneMarketCap / stockTwoMarketCap;

  if (ratio > 1.5) {
    return `${stockOneSymbol}’s market capitalization of ${stockOneMarketCapString} billion ${stockOneCurrency} is substantially larger than ${stockTwoSymbol}’s ${stockTwoMarketCapString} billion ${stockTwoCurrency}, indicating a significant difference in their market valuations.`;
  }

  if (ratio < 1 / 1.5) {
    return `${stockTwoSymbol}’s market capitalization of ${stockTwoMarketCapString} billion ${stockTwoCurrency} is significantly greater than ${stockOneSymbol}’s ${stockOneMarketCapString} billion ${stockOneCurrency}, highlighting its more substantial market valuation.`;
  }

  return `${stockOneSymbol}’s market capitalization stands at ${stockOneMarketCapString} billion ${stockOneCurrency}, while ${stockTwoSymbol}’s is ${stockTwoMarketCapString} billion ${stockTwoCurrency}, indicating their market valuations are broadly comparable.`;
}
