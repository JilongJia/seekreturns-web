type GenerateArticleInfoParams = {
  symbolOne: string;
  symbolTwo: string;
};

export function generateArticleInfo({
  symbolOne,
  symbolTwo,
}: GenerateArticleInfoParams) {
  const title = `${symbolOne} vs. ${symbolTwo}: A Head-to-Head Stock Comparison`;
  const description = `Explore a head-to-head stock comparison of ${symbolOne} versus ${symbolTwo}. This analysis covers their performance, company overviews, valuation metrics, dividend yields, and financial strength.`;

  return {
    title: title,
    description: description,
    images: [],
  };
}
