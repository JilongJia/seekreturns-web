type GenerateBetaCommentaryParams = {
  stockOneSymbol: string;
  stockOneBeta: number | null;
  stockTwoSymbol: string;
  stockTwoBeta: number | null;
};

export function generateBetaCommentary({
  stockOneSymbol,
  stockOneBeta,
  stockTwoSymbol,
  stockTwoBeta,
}: GenerateBetaCommentaryParams): string {
  if (
    stockOneBeta == null ||
    stockTwoBeta == null ||
    stockOneBeta === 0 ||
    stockTwoBeta === 0
  ) {
    return "";
  }

  const stockOneBetaString = stockOneBeta.toFixed(2);
  const stockTwoBetaString = stockTwoBeta.toFixed(2);

  const ratio = stockOneBeta / stockTwoBeta;

  if (stockOneBeta > 0 && stockTwoBeta > 0) {
    if (ratio > 1.5) {
      return `${stockOneSymbol}的Beta值（${stockOneBetaString}）显著较高，预示其股价相对于市场的波动幅度远大于${stockTwoSymbol}（Beta ${stockTwoBetaString}），这意味着更高的潜在回报及相应风险。`;
    }
    if (ratio < 1 / 1.5) {
      return `${stockTwoSymbol}的Beta值（${stockTwoBetaString}）较高，表明其对市场变动更为敏感，而${stockOneSymbol}（Beta ${stockOneBetaString}）则展现出相对更强的稳定性。`;
    }
    return `${stockOneSymbol}（Beta ${stockOneBetaString}）与${stockTwoSymbol}（Beta ${stockTwoBetaString}）的Beta值较为接近，说明两者股价相对于整体市场的波动风险水平相似。`;
  }

  if (stockOneBeta > 0 && stockTwoBeta < 0) {
    return `${stockOneSymbol}的Beta值（${stockOneBetaString}）为正，表示其股价大体上随市场同向运动；而${stockTwoSymbol}的Beta值（${stockTwoBetaString}）为负，通常与市场走势相反，可为投资组合提供一定的风险分散效果。`;
  }

  if (stockOneBeta < 0 && stockTwoBeta > 0) {
    return `${stockTwoSymbol}的Beta值（${stockTwoBetaString}）为正，暗示其股价倾向于跟随市场波动；而${stockOneSymbol}（Beta ${stockOneBetaString}）的Beta值为负，使其股价往往逆市而动，可能被视为一种潜在的防御性配置。`;
  }

  if (stockOneBeta < 0 && stockTwoBeta < 0) {
    if (ratio > 1.5) {
      return `${stockOneSymbol}（Beta ${stockOneBetaString}）与${stockTwoSymbol}（Beta ${stockTwoBetaString}）的Beta值均为负，但${stockOneSymbol}与市场的负相关性更为显著，或能在市场调整时提供更强的对冲作用。`;
    }
    if (ratio < 1 / 1.5) {
      return `尽管${stockOneSymbol}（Beta ${stockOneBetaString}）与${stockTwoSymbol}（Beta ${stockTwoBetaString}）的Beta值同为负，但${stockTwoSymbol}显示出与市场更强的反向运动特性，可能具备更优的避险潜质。`;
    }
    return `${stockOneSymbol}（Beta ${stockOneBetaString}）和${stockTwoSymbol}（Beta ${stockTwoBetaString}）的Beta值均为负且幅度相近，预期两者在一定程度上均会与市场主流趋势反向变动，或可用于分散投资组合风险。`;
  }

  return "";
}
