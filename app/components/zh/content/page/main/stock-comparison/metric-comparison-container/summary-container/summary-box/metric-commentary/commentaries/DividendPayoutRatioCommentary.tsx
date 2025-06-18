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
        {stockSymbol} 的股息支付率为负（{formattedMetricValue}
        ）。这通常意味着公司在录得净亏损的情况下依然派发股息，可能预示着财务压力。
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
        100%。这意味着公司派发的股息金额超过了其盈利，这种状况通常难以持续，并可能对未来股息的稳定性构成风险。
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
        {stockSymbol} 的股息支付率 {formattedMetricValue} 位于 {industryName}{" "}
        行业的前四分之一。虽然这表明公司对股东回报的承诺较高，但也意味着用于业务再投资的留存收益相对较少，可能会影响未来的增长潜力。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue} 位于 {industryName}{" "}
        行业的后四分之一。这通常表明公司采取了更为保守的股息政策，优先将大部分利润留存下来用于未来的增长和扩张。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3） (for GREEN status)
    return (
      <P>
        {stockSymbol} 的股息支付率 {formattedMetricValue} 处于 {industryName}{" "}
        行业的中等水平。这表明公司在股东派息与业务再投资之间采取了均衡策略，符合该行业的普遍做法。
      </P>
    );
  }
}
