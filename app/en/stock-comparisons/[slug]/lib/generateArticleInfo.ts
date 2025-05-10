type GenerateArticleInfoParams = {
  symbolOne: string;
  symbolTwo: string;
};

type Image = {
  "@type": "ImageObject";
  url: string;
  caption: string;
  width: number;
  height: number;
};

export function generateArticleInfo({
  symbolOne,
  symbolTwo,
}: GenerateArticleInfoParams) {
  const title = `${symbolOne} vs. ${symbolTwo}: A Head-to-Head Stock Comparison`;
  const description = `Explore a head-to-head stock comparison of ${symbolOne} versus ${symbolTwo}. This analysis covers their company overviews, performance, valuation metrics, dividend yields, and financial strength.`;
  const images: Image[] = [];

  return {
    title: title,
    description: description,
    images: images,
  };
}
