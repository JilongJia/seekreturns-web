type GenerateMarketCapCommentaryParams = {
  stockOneSymbol: string;
  stockOneMarketCap: number | null;
  stockOneCurrency: string | null;
  stockTwoSymbol: string;
  stockTwoMarketCap: number | null;
  stockTwoCurrency: string | null;
};

export function generateMarketCapCommentary({
  stockOneSymbol,
  stockOneMarketCap,
  stockOneCurrency,
  stockTwoSymbol,
  stockTwoMarketCap,
  stockTwoCurrency,
}: GenerateMarketCapCommentaryParams): string {
  if (
    stockOneMarketCap == null ||
    stockOneMarketCap <= 0 ||
    stockTwoMarketCap == null ||
    stockTwoMarketCap <= 0 ||
    stockOneCurrency == null ||
    stockTwoCurrency == null
  ) {
    return "";
  }

  const stockOneMarketCapString = (stockOneMarketCap / 1e8).toLocaleString(
    "zh",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
  const stockTwoMarketCapString = (stockTwoMarketCap / 1e8).toLocaleString(
    "zh",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  const ratio = stockOneMarketCap / stockTwoMarketCap;

  if (ratio > 1.5) {
    return `${stockOneSymbol}的市值（${stockOneMarketCapString}亿${stockOneCurrency}）显著高于${stockTwoSymbol}的市值（${stockTwoMarketCapString}亿${stockTwoCurrency}），显示出其在公司规模上的明显领先地位。`;
  }

  if (ratio < 1 / 1.5) {
    return `${stockTwoSymbol}的市值（${stockTwoMarketCapString}亿${stockTwoCurrency}）远超${stockOneSymbol}的市值（${stockOneMarketCapString}亿${stockOneCurrency}），表明${stockTwoSymbol}在体量上占据显著优势。`;
  }

  return `${stockOneSymbol}的市值约为${stockOneMarketCapString}亿${stockOneCurrency}，而${stockTwoSymbol}的市值则为${stockTwoMarketCapString}亿${stockTwoCurrency}左右，两者规模大体相当。`;
}
