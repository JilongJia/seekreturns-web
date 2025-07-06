type GenerateAdrCommentaryParams = {
  stockOneSymbol: string;
  stockOneIsAdr: boolean | null;
  stockTwoSymbol: string;
  stockTwoIsAdr: boolean | null;
};

export function generateAdrCommentary({
  stockOneSymbol,
  stockOneIsAdr,
  stockTwoSymbol,
  stockTwoIsAdr,
}: GenerateAdrCommentaryParams): string {
  if (stockOneIsAdr == null || stockTwoIsAdr == null) {
    return "";
  }

  if (stockOneIsAdr && stockTwoIsAdr) {
    return `${stockOneSymbol}与${stockTwoSymbol}均为美国存托凭证（ADR）。这意味着美国投资者可以便捷地通过美国本土交易所投资这两家外国公司，而无需直接参与海外市场的交易。`;
  }

  if (stockOneIsAdr && !stockTwoIsAdr) {
    return `${stockOneSymbol}是以美国存托凭证（ADR）的形式在美国上市的外国公司，为美国投资者提供了投资其股票的便捷渠道。相较而言，${stockTwoSymbol}是一家在美国本土注册和交易的公司。`;
  }

  if (!stockOneIsAdr && stockTwoIsAdr) {
    return `${stockTwoSymbol}通过美国存托凭证（ADR）的方式供美国投资者交易，使其可以直接投资这家外国公司的业务。而${stockOneSymbol}是一家纯粹的美国本土公司。`;
  }

  return "";
}
