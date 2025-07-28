import { P } from "@/components/zh/ui/P";
import type { MetricStats } from "@/lib/stock-properties";

type MetricCommentaryProps = {
  stockSymbol: string;
  industryName: string;
  isMetricApplicable: boolean;
  metricValue: number | null;
  formattedMetricValue: string;
  industryMetricStats: MetricStats | null;
};

export function InterestCoverageRatioCommentary({
  stockSymbol,
  industryName,
  isMetricApplicable,
  metricValue,
  formattedMetricValue,
  industryMetricStats,
}: MetricCommentaryProps) {
  // 1. 检查指标是否适用于该行业
  if (!isMetricApplicable) {
    return (
      <P>
        在 {industryName}{" "}
        行业，利息保障倍数通常不被视为评估公司偿债能力的核心指标。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的利息保障倍数数据目前不可用。</P>;
  }

  // 3. 优先处理特殊数值情况
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为负数 {formattedMetricValue}
        。这表明公司产生了经营性亏损，其盈利甚至不足以覆盖自身的运营成本，更不用说支付利息，是公司陷入严重财务困境的信号。
      </P>
    );
  }

  if (metricValue < 1) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}
        。该数值低于
        1.0，意味着公司的营业利润不足以完全覆盖其利息支出，这表明公司财务状况紧张，存在较高的债务违约风险。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}，但因缺乏{" "}
        {industryName} 行业的基准数据，我们无法为其在同业中的表现提供定位参考。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}，表现优异，远超{" "}
        {industryName}{" "}
        行业的通常范围。这反映了公司拥有卓越的债务偿付能力，可能源于其强劲的盈利表现，或是审慎的债务管理策略。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}，低于{" "}
        {industryName}{" "}
        行业的普遍水平。这暗示与同行相比，公司应对债务的能力偏弱，其财务风险也相应更高。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}，位于{" "}
        {industryName}{" "}
        行业的前四分之一，标志着公司利用经营利润来支付利息的能力十分强健。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}，处于{" "}
        {industryName}{" "}
        行业的后四分之一。这表明公司偿付利息的缓冲空间相对紧张，其财务弹性可能不及多数竞争对手。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的利息保障倍数为 {formattedMetricValue}，处于{" "}
        {industryName}{" "}
        行业的中游位置，表明其覆盖利息支出的能力符合行业标准，财务状况稳健。
      </P>
    );
  }
}
