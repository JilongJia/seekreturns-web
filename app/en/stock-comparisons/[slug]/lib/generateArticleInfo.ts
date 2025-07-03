type GenerateArticleInfoParams = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

type Image = {
  "@type": "ImageObject";
  url: string;
  caption: string;
  width: number;
  height: number;
};

export function generateArticleInfo({
  stockOneSymbol,
  stockTwoSymbol,
}: GenerateArticleInfoParams) {
  const title = `${stockOneSymbol} vs. ${stockTwoSymbol}: A Head-to-Head Stock Comparison`;
  const description = `Explore a head-to-head stock comparison of ${stockOneSymbol} versus ${stockTwoSymbol}. This analysis covers their company overviews, historical performance, profitability, financial strength, growth, dividend, and valuation.`;
  const images: Image[] = [];

  return {
    title: title,
    description: description,
    images: images,
  };
}
