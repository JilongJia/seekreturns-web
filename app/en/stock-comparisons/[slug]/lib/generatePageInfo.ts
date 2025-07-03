type GeneratePageInfoParams = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  slug: string;
};

export function generatePageInfo({
  stockOneSymbol,
  stockTwoSymbol,
  slug,
}: GeneratePageInfoParams) {
  const title = `${stockOneSymbol} vs. ${stockTwoSymbol}: A Head-to-Head Stock Comparison`;
  const pathname = `/en/stock-comparisons/${slug}`;

  const description = `See the full head-to-head analysis of ${stockOneSymbol} vs. ${stockTwoSymbol}. We compare profitability, financial strength, growth, and valuation to inform your final view.`;

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
