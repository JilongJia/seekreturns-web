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

export function NetProfitMarginCommentary({
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
        对于 {industryName} 行业，净利润率可能不是衡量其盈利能力的最关键指标。
      </P>
    );
  }

  // 2. 检查公司的净利润率数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的净利润率数据目前无法获得。</P>;
  }

  // 3. 处理特殊情况：负净利润率
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的净利润率为负数 {formattedMetricValue}
        ，表明公司目前处于净亏损状态，其总成本费用超过了营业收入。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的净利润率为 {formattedMetricValue}，但因缺少{" "}
        {industryName}{" "}
        行业的比较基准，我们无法评估其盈利能力在行业中的具体位置。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的净利润率为 {formattedMetricValue}
        ，达到了非常高的水平，远超 {industryName}{" "}
        行业的同行。这展示了公司卓越的运营效率和成本控制能力，可能意味着其拥有强大的竞争优势或“护城河”。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的净利润率为 {formattedMetricValue}，低于 {industryName}{" "}
        行业的普遍水平。这可能表明公司在成本控制方面面临挑战，或者身处一个竞争激烈的市场环境，导致其定价能力受到限制。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的净利润率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的前25%，标志着其盈利能力强劲，并且比大多数同行更有效地控制了成本。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的净利润率为 {formattedMetricValue}，位于 {industryName}{" "}
        行业的后25%。这说明其盈利能力相对较弱，与竞争者相比，公司从单位销售额中保留下来的利润更少。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的净利润率为 {formattedMetricValue}，处于 {industryName}{" "}
        行业的核心区间（即中间50%的公司）。这表明其将销售收入转化为利润的能力与该行业的典型水平保持一致。
      </P>
    );
  }
}
