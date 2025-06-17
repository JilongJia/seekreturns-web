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

export function DividendPayoutRatioCommentary({
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
        在评估 {industryName}{" "}
        行业的公司时，股息支付率通常不被用作分析其资本配置策略的主要依据。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的股息支付率数据当前不可用。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 优先处理特殊数值情况
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的股息支付率为负数（{formattedMetricValue}
        ）。这通常意味着公司在录得净亏损的情况下依然派发了股息。此时，该比率可能更多地反映了公司的财务压力，而非其真实的股息政策健康度。
      </P>
    );
  }

  if (metricValue === 0) {
    return (
      <P>
        {stockSymbol} 的股息支付率为
        0%，表明公司目前不派发股息。这通常意味着公司将所有利润进行再投资，以支持未来的业务增长。
      </P>
    );
  }

  if (metricValue > 1) {
    return (
      <P>
        {stockSymbol} 的股息支付率（{formattedMetricValue}）超过了
        100%。这意味着公司派发的股息金额超过了其盈利所得，这种状况通常难以持续，并可能对未来股息的稳定性构成风险。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的股息支付率为 {formattedMetricValue}，但我们缺少{" "}
        {industryName} 行业的参考基准，无法评估其在同业中的水平。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue} 在 {industryName}{" "}
        行业中属于极高水平。这显示出公司高度重视股东回报，但同时也可能限制了可用于再投资和驱动未来增长的内部资金。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue} 显著低于{" "}
        {industryName}{" "}
        行业的常见范围。这反映了公司相对保守的分红策略，倾向于将更多利润留存下来，用于推动内部增长项目。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue}{" "}
        位于行业前列（高于75%的同行）。这体现了公司相对慷慨的股息政策，与同行相比，更倾向于将利润以股息形式回馈给股东。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue}{" "}
        处于行业后段（低于75%的同行）。这表明公司的经营策略更侧重于将利润用于再投资，以促进业务扩张，而非大规模派发股息。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue} 处于 {industryName}{" "}
        行业的中等水平。这表明公司在“向股东派发股息”与“为未来发展保留资金”之间采取了较为均衡的策略，符合该行业的普遍做法。
      </P>
    );
  }
}
