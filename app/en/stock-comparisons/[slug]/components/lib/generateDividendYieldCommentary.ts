type GenerateDividendYieldCommentaryParams = {
  stockOneSymbol: string;
  stockOneDividendYield: number;
  stockTwoSymbol: string;
  stockTwoDividendYield: number;
};

export function generateDividendYieldCommentary({
  stockOneSymbol,
  stockOneDividendYield,
  stockTwoSymbol,
  stockTwoDividendYield,
}: GenerateDividendYieldCommentaryParams): string {
  const stockOneDividendYieldString = (stockOneDividendYield * 100).toFixed(2);
  const stockTwoDividendYieldString = (stockTwoDividendYield * 100).toFixed(2);

  if (stockOneDividendYield <= 0 && stockTwoDividendYield <= 0) {
    return `Neither ${stockOneSymbol} nor ${stockTwoSymbol} currently pays a dividend; this often suggests they are reinvesting earnings for growth, prioritizing long-term expansion over immediate cash returns to shareholders.`;
  }

  if (stockOneDividendYield <= 0 && stockTwoDividendYield > 0) {
    return `${stockOneSymbol} currently offers no dividend yield, suggesting it may be reinvesting available cash back into the business for future growth, while ${stockTwoSymbol} provides a ${stockTwoDividendYieldString}% dividend yield, offering investors a component of income return.`;
  }

  if (stockOneDividendYield > 0 && stockTwoDividendYield <= 0) {
    return `${stockOneSymbol} provides a ${stockOneDividendYieldString}% dividend yield, potentially offering a blend of income and growth, whereas ${stockTwoSymbol} currently does not pay a dividend, possibly retaining profits to fund operations or growth initiatives.`;
  }

  const ratio = stockOneDividendYield / stockTwoDividendYield;

  if (ratio > 1.5) {
    return `${stockOneSymbol}’s dividend yield of ${stockOneDividendYieldString}% is notably higher than ${stockTwoSymbol}’s ${stockTwoDividendYieldString}%, suggesting a stronger emphasis on returning cash to shareholders.`;
  }

  if (ratio < 1 / 1.5) {
    return `${stockTwoSymbol} provides a dividend yield of ${stockTwoDividendYieldString}%, which is significantly higher than ${stockOneSymbol}’s ${stockOneDividendYieldString}%, highlighting its commitment to more generous shareholder payouts.`;
  }

  return `Both ${stockOneSymbol} and ${stockTwoSymbol} offer dividend yields in a similar range (${stockOneDividendYieldString}% and ${stockTwoDividendYieldString}%, respectively), indicating comparable approaches to shareholder distributions.`;
}
