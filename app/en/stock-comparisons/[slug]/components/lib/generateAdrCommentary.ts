type GenerateAdrCommentaryParams = {
  stockOneSymbol: string;
  stockOneIsAdr: boolean;
  stockTwoSymbol: string;
  stockTwoIsAdr: boolean;
};

export function generateAdrCommentary({
  stockOneSymbol,
  stockOneIsAdr,
  stockTwoSymbol,
  stockTwoIsAdr,
}: GenerateAdrCommentaryParams): string {
  if (stockOneIsAdr && stockTwoIsAdr) {
    return `${stockOneSymbol} and ${stockTwoSymbol} are both American Depositary Receipts (ADRs). This provides U.S. investors with straightforward access to investing in these foreign-listed companies without directly engaging with overseas stock exchanges.`;
  }

  if (stockOneIsAdr && !stockTwoIsAdr) {
    return `${stockOneSymbol} trades as an American Depositary Receipt (ADR), offering U.S. investors a convenient way to access its foreign-listed shares. In contrast, ${stockTwoSymbol} is a standard domestic listing.`;
  }

  if (!stockOneIsAdr && stockTwoIsAdr) {
    return `${stockTwoSymbol} is an American Depositary Receipt (ADR), allowing U.S. investors direct exposure to its non-U.S. operations. ${stockOneSymbol}, on the other hand, is a domestic entity.`;
  }

  return "";
}
