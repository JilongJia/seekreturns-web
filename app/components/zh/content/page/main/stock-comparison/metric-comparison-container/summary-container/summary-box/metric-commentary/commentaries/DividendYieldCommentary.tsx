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

export function DividendYieldCommentary({
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
        对于 {industryName} 行业的公司，股息率通常不是投资者首要的考量因素。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>目前无法获取 {stockSymbol} 的股息率数据。</P>;
  }

  // 3. 处理特殊情况：零股息率 (此处的分析非常出色)
  if (metricValue === 0) {
    return (
      <P>
        {stockSymbol} 当前不派发股息，因此其股息率为
        0%。对于注重成长的公司而言，这是一种常见的策略，因为它们倾向于将全部利润再投资于业务发展。然而，在以获取稳定收入为目标的成熟行业中，这种情况可能较不典型。
      </P>
    );
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的股息率为 {formattedMetricValue}，但因缺少 {industryName}{" "}
        行业的对比基准，我们无法判断其在行业中的具体水平。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的股息率为 {formattedMetricValue}，处于极高水平，远超{" "}
        {industryName}{" "}
        行业的正常范围。虽然这对于追求稳定现金流的投资者而言极具吸引力，但异常高的股息率有时也是一个警示信号，可能反映了股价的下跌，或是市场对该股息未来可持续性的担忧。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的股息率为 {formattedMetricValue}，低于 {industryName}{" "}
        行业的普遍范围。这通常意味着股东的回报更多地来源于股价上涨带来的资本增值，而非股息收入。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的股息率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的前四分之一水平。这意味着它能提供比大多数同行更具吸引力的现金回报，显示了公司对股东回报的坚定承诺。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的股息率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的后四分之一水平。这暗示公司的策略可能更倾向于将利润留存用于再投资和业务增长，而不是提供高额的股息收入。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的股息率为 {formattedMetricValue}，与 {industryName}{" "}
        行业中同行的水平基本一致，为投资者提供了该领域标准的股息回报。
      </P>
    );
  }
}
