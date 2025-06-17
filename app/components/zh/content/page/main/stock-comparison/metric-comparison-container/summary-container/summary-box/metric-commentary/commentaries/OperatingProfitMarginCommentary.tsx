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

export function OperatingProfitMarginCommentary({
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
        在 {industryName}{" "}
        行业，营业利润率通常不被视为衡量其核心运营效率的主要标准。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的营业利润率数据暂无法提供。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负值
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的营业利润率为负（{formattedMetricValue}
        ）。这标志着公司在核心经营层面已经亏损，其主营业务的成本和费用超过了收入。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的营业利润率为 {formattedMetricValue}，但缺少{" "}
        {industryName}{" "}
        行业的参考数据，因此我们无法提供其运营效率的行业背景分析。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的营业利润率 {formattedMetricValue} 极其出色，远高于{" "}
        {industryName}{" "}
        行业的普遍范围。这体现了公司在核心业务管理上拥有卓越的效率，可能得益于其强大的市场定价能力或出色的成本控制体系。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的营业利润率 {formattedMetricValue} 低于 {industryName}{" "}
        行业的正常水平，这表明与同行相比，公司通过其核心业务活动创造利润的能力面临较大挑战。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的营业利润率 {formattedMetricValue} 位于 {industryName}{" "}
        行业的前25%。这表明公司将收入转化为营业利润的能力很强，在核心业务效率方面跑赢了多数竞争对手。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的营业利润率 {formattedMetricValue} 处于 {industryName}{" "}
        行业的后25%。这反映出其核心业务的盈利能力较弱，原因可能在于运营效率不高，或是在定价方面承受着较大的竞争压力。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的营业利润率 {formattedMetricValue} 在 {industryName}{" "}
        行业中处于中等位置，表明公司管理核心业务的效率是该行业的典型代表。
      </P>
    );
  }
}
