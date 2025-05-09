import { fetchPriceSeriesData } from "@/app/lib/fmp/fetchPriceSeriesData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Chart } from "./performance_comparison_section/Chart";

type PerformanceComparisonSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function PerformanceComparisonSection({
  stockOneSymbol,
  stockTwoSymbol,
}: PerformanceComparisonSectionProps) {
  const seriesOne = await fetchPriceSeriesData(stockOneSymbol);
  const seriesTwo = await fetchPriceSeriesData(stockTwoSymbol);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const stockOnePriceSeries =
    seriesOne?.filter((pt) => new Date(pt.date) >= oneYearAgo) ?? null;
  const stockTwoPriceSeries =
    seriesTwo?.filter((pt) => new Date(pt.date) >= oneYearAgo) ?? null;

  if (!stockOnePriceSeries || !stockTwoPriceSeries) {
    return (
      <Section ariaLabelledby="performance-comparison">
        <H2 id="performance-comparison">历史表现比较</H2>
        <P>暂时无法加载历史表现数据。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="performance-comparison">
      <H2 id="performance-comparison">历史表现比较</H2>
      <P>
        下图展示了 {stockOneSymbol} 和 {stockTwoSymbol}{" "}
        过去一年的历史表现，假设初始投资均为 1 万美元，以比较其投资回报表现。
      </P>
      <P>将鼠标悬停在图表曲线上，可查看某日的投资价值和总回报率（%）。</P>
      <P>数据已根据股息和股票拆分进行调整。</P>
      <Chart
        data={{
          stockOne: {
            symbol: stockOneSymbol,
            priceSeries: stockOnePriceSeries,
          },
          stockTwo: {
            symbol: stockTwoSymbol,
            priceSeries: stockTwoPriceSeries,
          },
        }}
      />
    </Section>
  );
}
