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

export function PriceToBookRatioCommentary({
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
        对于 {industryName} 这样偏向轻资产或以知识产权为核心的行业，市净率（P/B
        Ratio）通常不被看作是主要的估值方法。
      </P>
    );
  }

  // 2. 检查数据是否可用
  if (metricValue === null) {
    return <P>{stockSymbol} 的市净率（P/B）数据暂缺。</P>;
  }

  const formattedMetricValue = formatMetricValue({ metricCode, metricValue });

  // 3. 处理特殊情况：负净值
  if (metricValue < 0) {
    return (
      <P>
        {stockSymbol} 的市净率（P/B）为负数（{formattedMetricValue}
        ），这表示其股东权益为负值，即公司的总负债已超过其总资产。这是财务状况极不稳定的一个关键危险信号。
      </P>
    );
  }

  // 4. 检查行业基准数据是否可用
  if (!industryMetricStats) {
    return (
      <P>
        {stockSymbol} 的市净率为 {formattedMetricValue}，但由于缺少{" "}
        {industryName} 行业的横向比较数据，我们无法判断其估值高低。
      </P>
    );
  }

  const { min, q1, q3, max } = industryMetricStats;

  // 5. 基于行业基准进行分析
  if (metricValue > max) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 极高，远超 {industryName}{" "}
        行业的普遍估值范围。这表明市场对其估值主要基于未来的高增长预期或无形资产（如品牌价值），而非其实物资产，这可能伴随着较高的估值风险。
      </P>
    );
  } else if (metricValue < min) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 低于 {industryName}{" "}
        行业的通常范围。这背后可能有两个原因：一是其股价相对于资产价值被市场严重低估；但也可能反映了市场对公司未来盈利能力或其资产质量存在着深度担忧。
      </P>
    );
  } else if (metricValue > q3) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 处于 {industryName}{" "}
        行业的前25%。这意味着其股价远高于公司的账面价值，其估值的合理性高度依赖于公司未来能否利用其资产创造出超额回报，否则可能面临估值回调的风险。
      </P>
    );
  } else if (metricValue < q1) {
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 位于 {industryName}{" "}
        行业的后25%。对于价值投资者而言，这通常是一个积极信号，因为它意味着股价可能低于其资产的内在价值，为投资提供了潜在的“安全边际”。
      </P>
    );
  } else {
    // 覆盖了四分位距（Q1到Q3）
    return (
      <P>
        {stockSymbol} 的市净率 {formattedMetricValue} 处于 {industryName}{" "}
        行业的中等区间，表明其市值相对于账面价值的水平符合行业基准，估值既不显昂贵也不显便宜。
      </P>
    );
  }
}
