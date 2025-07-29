import { P } from "@/components/zh/ui/P";
import type { MetricStats } from "@/lib/stock";

type MetricCommentaryProps = {
  stockSymbol: string;
  industryName: string;
  isMetricApplicable: boolean;
  metricValue: number | null;
  formattedMetricValue: string;
  industryMetricStats: MetricStats | null;
};

export function PriceToSalesRatioCommentary({
  stockSymbol,
  industryName,
  isMetricApplicable,
  metricValue,
  formattedMetricValue,
  industryMetricStats,
}: MetricCommentaryProps) {
  // 1. 检查指标是否适用
  if (!isMetricApplicable) {
    return (
      <P>
        在 {industryName} 行业，市销率（P/S
        Ratio）通常不被视为一项核心估值指标。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>抱歉，我们暂时无法提供 {stockSymbol} 的市销率（P/S）数据。</P>;
  }

  // 3. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，但因缺少 {industryName}{" "}
        行业的基准数据，我们无法提供其在行业内的估值背景。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 4. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，远超 {industryName}{" "}
        行业的普遍范围。这反映出市场对其销售额给予了极高的溢价，其估值已计入了非常乐观的增长预期，因此伴随着较高的风险。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，低于 {industryName}{" "}
        行业的正常范围。这可能暗示其股价相对于公司的营收规模被低估，但也可能反映了市场对公司未来销售增长乏力或盈利能力的深度担忧。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，位于 {industryName}{" "}
        行业的前四分之一。这表明其股价相对于销售收入而言较为昂贵，市场可能已经提前计入了未来的高增长。若公司业绩无法支撑这一高估值，股价则面临回调风险。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的后四分之一。这是一个积极的估值信号，表明其股价相对于它所产生的销售收入可能被低估，为投资者提供了潜在的价值发现机会。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的市销率为 {formattedMetricValue}，与 {industryName}{" "}
        行业的同行水平相当。这表明市场对其销售额的估值符合行业常规，处于一个公允的估值区间。
      </P>
    );
  }
}
