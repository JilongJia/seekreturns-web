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
    return `${stockOneSymbol}与${stockTwoSymbol}目前均不派发股息。这通常表明两家公司倾向于将盈利再投资于业务增长，优先考虑长期发展而非向股东提供即期现金回报。`;
  }

  if (stockOneDividendYield <= 0 && stockTwoDividendYield > 0) {
    return `${stockOneSymbol}当前不支付股息，可能更侧重于将资金用于推动自身增长；而${stockTwoSymbol}则提供${stockTwoDividendYieldString}%的股息率，能为投资者带来一部分现金收益。`;
  }

  if (stockOneDividendYield > 0 && stockTwoDividendYield <= 0) {
    return `${stockOneSymbol}提供${stockOneDividendYieldString}%的股息率，在为股东创造现金回报的同时，也可能兼顾企业成长；相较之下，${stockTwoSymbol}目前不派发股息，或将利润保留用于公司运营或未来的扩张计划。`;
  }

  const ratio = stockOneDividendYield / stockTwoDividendYield;

  if (ratio > 1.5) {
    return `${stockOneSymbol}的股息率（${stockOneDividendYieldString}%）显著高于${stockTwoSymbol}的（${stockTwoDividendYieldString}%），这通常反映出其在利润分配上对股东更为侧重。`;
  }

  if (ratio < 1 / 1.5) {
    return `${stockTwoSymbol}的股息率（${stockTwoDividendYieldString}%）明显优于${stockOneSymbol}的（${stockOneDividendYieldString}%），表明其在向股东返还价值方面可能更为积极或慷慨。`;
  }

  return `${stockOneSymbol}的股息率（${stockOneDividendYieldString}%）与${stockTwoSymbol}的（${stockTwoDividendYieldString}%）大致相当，显示两家公司在股息政策和股东回报方面的考量可能比较接近。`;
}
