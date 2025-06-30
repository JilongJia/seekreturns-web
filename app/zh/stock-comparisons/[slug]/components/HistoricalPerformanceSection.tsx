import { H2 } from "@/app/components/zh/content/page/main/article/H2";
import { P } from "@/app/components/zh/content/page/main/article/P";
import { Section } from "@/app/components/zh/content/page/main/article/Section";
import { Chart } from "./historical-performance-section/Chart";

type PriceSeries = Array<{ date: string; price: number }>;

type HistoricalPerformanceSectionProps = {
  stockOneSymbol: string;
  stockTwoSymbol: string;
  stockOnePriceSeries: PriceSeries | null;
  stockTwoPriceSeries: PriceSeries | null;
};

export function HistoricalPerformanceSection({
  stockOneSymbol,
  stockTwoSymbol,
  stockOnePriceSeries,
  stockTwoPriceSeries,
}: HistoricalPerformanceSectionProps) {
  if (
    !stockOnePriceSeries ||
    stockOnePriceSeries.length === 0 ||
    !stockTwoPriceSeries ||
    stockTwoPriceSeries.length === 0
  ) {
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
        此图表通过追踪$10,000的初始投资在每只股票中的增长情况，来比较{" "}
        {stockOneSymbol} 和 {stockTwoSymbol}{" "}
        的表现。请使用选项卡选择所需的时间周期。
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
        defaultTimeRange="1Y"
      />
    </Section>
  );
}
