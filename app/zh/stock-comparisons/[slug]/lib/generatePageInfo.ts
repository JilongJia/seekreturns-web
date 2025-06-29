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
  const title = `${symbolOne}与${symbolTwo}：股票综合比较`;
  const pathname = `/zh/stock-comparisons/${slug}`;

  const description = `${symbolOne}与${symbolTwo}深度对比分析。从公司概况、历史表现、盈利能力、财务实力、成长性、股息和估值等多维度比较，辅助您的判断。`;

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
