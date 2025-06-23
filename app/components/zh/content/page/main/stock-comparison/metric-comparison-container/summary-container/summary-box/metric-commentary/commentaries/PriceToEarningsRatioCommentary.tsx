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

export function PriceToEarningsRatioCommentary({
  isMetricApplicable,
  industryName,
  metricValue,
  stockSymbol,
  industryMetricStats,
  metricCode,
}: MetricCommentaryProps) {
  // 1. 检查指标是否适用于该行业
  if (!isMetricApplicable) {
    return (
      <P>
        在评估 {industryName} 行业的公司时，市盈率（P/E
        Ratio）通常不作为首要的估值参考指标。
      </P>
    );
  }

  // 2. 检查公司的市盈率数据是否可用
  if (metricValue === null) {
    return <P>我们目前未能获取 {stockSymbol} 的市盈率（P/E）数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负市盈率
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的市盈率（P/E）为负数 {formattedMetricValue}
        ，这表明该公司处于净亏损状态。负市盈率在估值比较中不具备可靠的参考价值。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，但由于 {industryName}{" "}
        行业的基准数据缺失，我们无法进行直接的行业对比。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，在 {industryName}{" "}
        行业中处于极高水平。这既可能反映了市场对其抱有强烈的信心和高增长预期，也可能暗示着股价存在被严重高估的风险。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，低于 {industryName}{" "}
        行业的通常水平。这可能意味着公司价值被低估，但也可能折射出市场对公司未来盈利增长或其特定经营挑战的深度顾虑。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，位列 {industryName}{" "}
        行业前25%。这种高估值意味着市场对其未来增长寄予厚望，但同时也带来了风险：如果未来的盈利无法达到预期，股价可能面临较大的回调压力。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，位于 {industryName}{" "}
        行业的后25%。这是一个值得关注的积极迹象，因为它可能表明公司的价值相对于其盈利能力被市场低估，或为投资者提供了一个具吸引力的潜在买入点。
      </P>
    );
  } else {
    return (
      <P>
        {stockSymbol} 的市盈率为 {formattedMetricValue}，与 {industryName}{" "}
        行业的通常水平相当。这表明其估值与同行相比，既没有明显的溢价，也没有显著的折价，处于一个公允的区间。
      </P>
    );
  }
}
