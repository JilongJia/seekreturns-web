type GenerateBetaCommentaryParams = {
  stockOneSymbol: string;
  stockOneBeta: number;
  stockTwoSymbol: string;
  stockTwoBeta: number;
};

export function generateBetaCommentary({
  stockOneSymbol,
  stockOneBeta,
  stockTwoSymbol,
  stockTwoBeta,
}: GenerateBetaCommentaryParams): string {
  const stockOneBetaString = stockOneBeta.toFixed(2);
  const stockTwoBetaString = stockTwoBeta.toFixed(2);

  if (stockOneBeta === 0 && stockTwoBeta === 0) {
    return "";
  }

  if (stockOneBeta === 0) {
    if (stockTwoBeta < 0) {
      return `${stockTwoSymbol}, with its beta of ${stockTwoBetaString}, shows a propensity to move contrary to broader market directions, a quality that can be valuable for portfolio risk balancing, while ${stockOneSymbol} (beta: ${stockOneBetaString}) shows no correlation.`;
    } else {
      return `${stockOneSymbol} (beta: ${stockOneBetaString}) typically moves independently of the overall market, while ${stockTwoSymbol}’s beta of ${stockTwoBetaString} suggests it tends to follow broader market trends.`;
    }
  }

  if (stockTwoBeta === 0) {
    if (stockOneBeta < 0) {
      return `${stockOneSymbol}’s beta of ${stockOneBetaString} indicates its performance often opposes the general market flow, making it a consideration for defensive strategies, while ${stockTwoSymbol} (beta: ${stockTwoBetaString}) is uncorrelated with the market.`;
    } else {
      return `${stockTwoSymbol} (beta: ${stockTwoBetaString}) generally shows no correlation with market movements, whereas ${stockOneSymbol}’s beta of ${stockOneBetaString} indicates a tendency to move in line with the market.`;
    }
  }

  const ratio = stockOneBeta / stockTwoBeta;

  if (stockOneBeta > 0 && stockTwoBeta > 0) {
    if (ratio > 1.5) {
      return `${stockOneSymbol}’s beta of ${stockOneBetaString} points to significantly higher volatility compared to ${stockTwoSymbol} (beta: ${stockTwoBetaString}), suggesting ${stockOneSymbol} has greater potential for both gains and losses relative to market movements.`;
    }
    if (ratio < 1 / 1.5) {
      return `${stockTwoSymbol} carries a higher beta at ${stockTwoBetaString}, indicating it’s more sensitive to market moves, while ${stockOneSymbol} (beta: ${stockOneBetaString}) exhibits greater stability.`;
    }
    return `With betas of ${stockOneBetaString} for ${stockOneSymbol} and ${stockTwoBetaString} for ${stockTwoSymbol}, both stocks show similar sensitivity to overall market movements.`;
  }

  if (stockOneBeta > 0 && stockTwoBeta < 0) {
    return `${stockOneSymbol} has a positive beta (${stockOneBetaString}), indicating it generally moves with the broader market, whereas ${stockTwoSymbol} has a negative beta (${stockTwoBetaString}), often moving inversely, which can offer diversification or hedging benefits.`;
  }

  if (stockOneBeta < 0 && stockTwoBeta > 0) {
    return `${stockTwoSymbol}’s positive beta (${stockTwoBetaString}) suggests market-aligned movements, while ${stockOneSymbol} with a negative beta (${stockOneBetaString}) tends to move counter to overall market trends, potentially acting as a defensive asset.`;
  }

  if (stockOneBeta < 0 && stockTwoBeta < 0) {
    if (ratio > 1.5) {
      return `Both ${stockOneSymbol} (beta: ${stockOneBetaString}) and ${stockTwoSymbol} (beta: ${stockTwoBetaString}) tend to move inversely to the market, but ${stockOneSymbol} exhibits a significantly stronger negative correlation, potentially offering more pronounced hedging characteristics during market downturns.`;
    }
    if (ratio < 1 / 1.5) {
      return `While both ${stockOneSymbol} (beta: ${stockOneBetaString}) and ${stockTwoSymbol} (beta: ${stockTwoBetaString}) show a tendency to move against the market, ${stockTwoSymbol} demonstrates a notably stronger inverse relationship, suggesting enhanced defensive qualities.`;
    }
    return `With negative betas of ${stockOneBetaString} for ${stockOneSymbol} and ${stockTwoBetaString} for ${stockTwoSymbol}, both stocks generally move counter to broader market trends to a similar degree, potentially serving as portfolio hedges.`;
  }

  return "";
}
