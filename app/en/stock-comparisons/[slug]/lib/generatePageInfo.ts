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

  const description = `See the full head-to-head analysis of ${symbolOne} vs. ${symbolTwo}. We compare profitability, growth, valuation, and financial strength to inform your final view.`;

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
