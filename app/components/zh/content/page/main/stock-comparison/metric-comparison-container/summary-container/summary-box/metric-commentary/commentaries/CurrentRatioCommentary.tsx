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

export function CurrentRatioCommentary({
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
        对于 {industryName}{" "}
        行业的公司而言，流动比率通常不被视作衡量短期偿债能力的核心指标。
      </P>
    );
  }

  // 2. 检查公司数据是否可用
  if (metricValue === null) {
    return <P>我们目前无法获取 {stockSymbol} 的流动比率数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的流动比率为 {formattedMetricValue}。然而，我们暂时缺少{" "}
        {industryName} 行业的相关数据，因此无法进行横向对比分析。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 4. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的流动比率高达 {formattedMetricValue}，显著高于{" "}
        {industryName}{" "}
        行业的普遍范围。这表明公司短期内偿还债务的能力非常强，但另一方面也可能反映出其资产利用效率有待提高，未能将流动资产充分转化为利润。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的流动比率为 {formattedMetricValue}，这一数值明显低于{" "}
        {industryName}{" "}
        行业的正常范围。这可能预示着公司面临较大的流动性风险，在满足短期债务需求方面或将遇到挑战。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的流动比率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的前25%水平。这说明公司的短期偿债能力强于大多数同行，财务流动性状况良好。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的流动比率为 {formattedMetricValue}，位于 {industryName}{" "}
        行业的后25%区间。这表明与众多竞争对手相比，公司的流动性相对紧张，应对短期债务的能力可能受到一定限制。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的流动比率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的中位区间，表明其短期流动性水平与业内大多数公司保持一致，表现稳健。
      </P>
    );
  }
}
