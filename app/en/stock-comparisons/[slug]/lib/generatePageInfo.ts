type GeneratePageInfoParams = {
  symbolOne: string;
  symbolTwo: string;
  slug: string;
};

export function generatePageInfo({
  symbolOne,
  symbolTwo,
  slug,
}: GeneratePageInfoParams) {
  const title = `${symbolOne} vs. ${symbolTwo}: A Head-to-Head Stock Comparison`;
  const pathname = `/en/stock-comparisons/${slug}`;

  const description = `Compare ${symbolOne} and ${symbolTwo} financial strength, dividends, valuation & more. Get our detailed side-by-side stock analysis to inform your view.`;

  const publishedDate = new Date("2025-05-05");
  const modifiedDate = new Date();

  const alternateLanguageUrls = {
    "x-default": `/en/stock-comparisons/${slug}`,
    en: `/en/stock-comparisons/${slug}`,
    zh: `/zh/stock-comparisons/${slug}`,
  };

  return {
    title: title,
    pathname: pathname,
    description: description,
    publishedDate: publishedDate,
    modifiedDate: modifiedDate,
    alternateLanguageUrls: alternateLanguageUrls,
  };
}
