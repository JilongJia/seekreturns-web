import type { MetricCode } from "@/app/data/fmp/metricCodes";
import { formatMetricValue } from "./formatMetricValue";
import { P } from "./P";

type IndustryMetricStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

type MetricCommentaryProps = {
  metricCode: MetricCode;
  stockSymbol: string;
  industryName: string;
  metricValue: number | null;
  industryMetricStats: IndustryMetricStats | null;
  isMetricApplicable: boolean;
};

export function PriceToSalesRatioCommentary({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  metricCode,
}: MetricCommentaryProps) {
  // 1. 检查指标是否适用
  if (!isMetricApplicable) {
    return (
      <P>
        在 {industryName} 行业，市销率（P/S Ratio）通常不是一个主要的估值指标。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>抱歉，我们暂时无法提供 {stockSymbol} 的市销率（P/S）数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，但因缺少 {industryName}{" "}
        行业的基准，我们无法提供其在行业内的估值背景。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 4. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的市销率 {formattedMetricValue} 远超 {industryName}{" "}
        行业的普遍范围。这反映出市场对其销售额给予了显著的溢价，这很可能是由投资者对公司未来增长和市场份额提升的强烈预期所驱动的。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的市销率 {formattedMetricValue} 低于 {industryName}{" "}
        行业的正常范围。这可能暗示其股价相对于公司的营收规模来说被低估了，但也可能反映了市场对公司未来销售增长乏力或盈利困难的担忧。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的市销率 {formattedMetricValue}{" "}
        位于行业的前四分之一。这表明与同行相比，投资者愿意为公司每一元的销售额支付更高的价格，显示出对公司增长前景的乐观态度。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的市销率 {formattedMetricValue}{" "}
        处于行业的后四分之一。这反映了市场对其收入的估值较为保守。如果未来销售能够加速增长，这可能构成一个投资机会；反之，这也可能体现了市场对其业绩的疑虑。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的市销率 {formattedMetricValue} 与 {industryName}{" "}
        的同行水平相当，表明市场对其销售额的估值符合行业常规水平。
      </P>
    );
  }
}
