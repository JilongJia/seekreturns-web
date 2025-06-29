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
  const title = `${symbolOne}与${symbolTwo}：股票综合比较`;
  const description = `${symbolOne}与${symbolTwo}股票对比解读：本报告围绕公司概况、历史表现、盈利能力、财务实力、成长性、股息和估值等核心方面，进行数据对比与分析，力求为投资者提供清晰的比较视角与决策依据。`;
  const images: Image[] = [];

  return {
    title: title,
    description: description,
    images: images,
  };
}
