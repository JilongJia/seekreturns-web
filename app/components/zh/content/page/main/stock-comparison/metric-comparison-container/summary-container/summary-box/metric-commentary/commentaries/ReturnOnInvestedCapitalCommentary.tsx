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

export function ReturnOnInvestedCapitalCommentary({
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
        在 {industryName}{" "}
        行业，投入资本回报率（ROIC）并非衡量资本运用效率的核心标准。
      </P>
    );
  }

  // 2. 检查公司的ROIC数据是否可用
  if (metricValue === null) {
    return <P>我们无法获取 {stockSymbol} 的投入资本回报率（ROIC）数据。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负ROIC
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的投入资本回报率（ROIC）为负数 {formattedMetricValue}
        。这表明其经营活动未能从所有投入的资本（包括股权和债务）中创造利润，是效率低下甚至价值毁灭的信号。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的投入资本回报率为 {formattedMetricValue}，但因缺少{" "}
        {industryName} 行业的比较数据，我们无法衡量其资本效率在同业中的位置。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的投入资本回报率为 {formattedMetricValue}
        ，表现极为出色，远超 {industryName}{" "}
        行业。这证明了公司在有效配置资本和创造价值方面拥有杰出的能力。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的投入资本回报率为 {formattedMetricValue}，低于{" "}
        {industryName}{" "}
        行业的普遍水平。这表明公司在利用其总资本基础来产生足够回报方面存在困难，可能指向其在运营或战略层面存在效率问题。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的投入资本回报率为 {formattedMetricValue}
        ，位于行业前25%。这标志着与同行相比，公司能更高效地运用其全部资本（含债务）来创造利润。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的投入资本回报率为 {formattedMetricValue}
        ，处于行业后25%的水平。这说明与大多数竞争对手相比，公司将投入的资本转化为利润的效率偏低。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的投入资本回报率为 {formattedMetricValue}，与{" "}
        {industryName}{" "}
        行业的基准水平一致，反映出公司从其资本基础中获取利润的效率处于行业标准水平。
      </P>
    );
  }
}
