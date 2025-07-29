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

export function ReturnOnEquityCommentary({
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
        行业，净资产收益率（ROE）并非衡量企业经营表现的首要指标。
      </P>
    );
  }

  // 2. 检查公司的ROE数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的净资产收益率（ROE）数据目前缺失。</P>;
  }

  // 3. 处理特殊情况：负ROE
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的净资产收益率（ROE）为负数 {formattedMetricValue}
        。这说明公司正在为股东创造亏损。其原因可能是公司经营不善导致亏损，也可能是公司净资产为负（即资不抵债），这通常是财务困境的一个信号。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的净资产收益率为 {formattedMetricValue}，但因缺少{" "}
        {industryName}{" "}
        行业的参考基准，我们无法评估其为股东创造回报的效率在行业内的水平。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的净资产收益率为 {formattedMetricValue}，在 {industryName}{" "}
        行业中异常之高。这体现了公司利用股东资本创造利润的卓越能力，但投资者也需注意，极高的
        ROE 有时也可能是由过高的财务杠杆（即高负债）所驱动的，这会增加风险。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的净资产收益率为 {formattedMetricValue}，低于{" "}
        {industryName}{" "}
        行业的平均水平。这可能暗示公司在利用股东资本创造利润方面效率不高，或反映了公司采用了较为保守的资本结构（即债务水平较低）。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的净资产收益率为 {formattedMetricValue}
        ，处于行业前四分之一（高于75%的同行）。这标志着与大多数同行相比，公司能更高效地利用股东的资金来创造利润。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的净资产收益率为 {formattedMetricValue}
        ，处于行业后四分之一水平（低于75%的同行）。这表明，与竞争对手相比，其利用自有资本创造利润的效率有待提高。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的净资产收益率为 {formattedMetricValue}，与 {industryName}{" "}
        行业的标准水平持平，表明其相对于股东权益的盈利能力是该行业的典型表现。
      </P>
    );
  }
}
