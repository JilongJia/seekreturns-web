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

export function ForwardPriceToEarningsGrowthRatioCommentary({
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
        在 {industryName} 行业中，预期市盈增长率（Forward
        PEG）通常不作为核心的估值工具。
      </P>
    );
  }

  // 2. 检查公司的预期PEG数据是否可用
  if (metricValue === null) {
    return <P>我们暂时无法获取 {stockSymbol} 的预期市盈增长率数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负数PEG
  // 优化: 统一数值展示格式，不再使用括号
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率（Forward PEG）为负数{" "}
        {formattedMetricValue}
        。这通常是由于公司当前处于亏损状态，或市场预期其未来盈利将下滑，导致该指标失去了估值参考意义。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}，但因缺少{" "}
        {industryName} 行业的对比基准，我们无法就其估值水平与同行进行比较。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}，远高于{" "}
        {industryName}{" "}
        行业的普遍水平。这暗示其股价相对于盈利增长预期而言可能被严重高估，构成了显著的估值风险。
      </P>
    );
  } else if (metricValue < min) {
    // 优化: 精简语句，避免信息重复
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}，低于{" "}
        {industryName}{" "}
        行业的正常范围。这是一个强烈的信号，表明市场可能低估了公司的增长前景，其股价或未充分反映未来的增长潜力。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}，处于{" "}
        {industryName}{" "}
        行业的前25%。这表明与同行相比，其股价相对于盈利增长预期显得较为昂贵，可能预示着估值偏高，需要公司未来的业绩增长来验证。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}，位于{" "}
        {industryName}{" "}
        行业的后25%，这是一个积极的信号。它表明相对于未来的盈利增长预期，其当前股价具有吸引力，可能为投资者提供了以较低成本买入增长潜力的机会。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的预期市盈增长率为 {formattedMetricValue}，处于{" "}
        {industryName}{" "}
        行业的中位区间。这表明其估值与其增长预期基本匹配，符合该行业的一般标准。
      </P>
    );
  }
}
