import { fetchPriceSeriesData } from "@/app/lib/fmp/fetchPriceSeriesData";

import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Chart } from "./historical-performance-section/Chart";

type HistoricalPerformanceSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
};

export async function HistoricalPerformanceSection({
  stockOneSymbol,
  stockTwoSymbol,
}: HistoricalPerformanceSectionProps) {
  const [seriesOne, seriesTwo] = await Promise.all([
    fetchPriceSeriesData(stockOneSymbol),
    fetchPriceSeriesData(stockTwoSymbol),
  ]);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const filteredSeriesOne = seriesOne?.filter(
    (pt) => new Date(pt.date) >= oneYearAgo,
  );
  const filteredSeriesTwo = seriesTwo?.filter(
    (pt) => new Date(pt.date) >= oneYearAgo,
  );

  const stockOnePriceSeries =
    filteredSeriesOne && filteredSeriesOne.length > 0
      ? filteredSeriesOne
      : null;
  const stockTwoPriceSeries =
    filteredSeriesTwo && filteredSeriesTwo.length > 0
      ? filteredSeriesTwo
      : null;

  if (!stockOnePriceSeries || !stockTwoPriceSeries) {
    return (
      <Section ariaLabelledby="historical-performance">
        <H2 id="historical-performance">历史表现</H2>
        <P>暂时无法加载历史表现数据。</P>
      </Section>
    );
  }

  return (
    <Section ariaLabelledby="historical-performance">
      <H2 id="historical-performance">历史表现</H2>
      <P>
        下图展示了{stockOneSymbol}和{stockTwoSymbol}
        过去一年的历史表现，假设初始投资均为1万美元，以比较其投资回报表现。
      </P>
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
